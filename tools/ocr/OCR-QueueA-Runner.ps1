<#
OCR-QueueA-Runner.ps1  v2 (L3)  -  TRK-2026-9960 family  -  2026-10-15  -  written by the cloud
Free OCR lane. Zero AI tokens. Queue A only (NIGHT-PROTOCOL section 5): PDFs inside a job folder, so the TRK
is known from the path. Never changes, moves or renames a PDF. Writes only sidecars and tags files.

What changed from v1 (2026-10-12): v1 wrote L1 sidecars (older protocol). v2 writes the LATEST protocol, L3:
  L3 header + circled emails and phones + folio/permit line + a .TAGS.txt with 5 or more hashtags.
  It also UPGRADES older sidecars to L3 using the text they already hold (no re-reading of the page).
  An older sidecar or tags file is copied to C:\AI\ocr\_bak first (NAME_bak-DATE.ext), never lost.
Order of work (owner directive 2026-10-15): Phase 1 = documents dated 2022-01-01 to today, first.
  Then 2021, then 2020, one year at a time. Inside a year: no-text files first, then upgrades.
Runs for at most -MaxMinutes, then exits; the scheduled task starts it again every 15 minutes. Resumable.
#>
param(
  [string]$Root      = 'G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH',
  [string]$Heartbeat = 'G:\My Drive\VTES-Outbox\_OCR-HEARTBEAT.md',
  [string]$WorkDir   = 'C:\AI\ocr',
  [int]$PhaseOneFrom = 2022,
  [int]$MaxMinutes   = 13,
  [int]$PageCap      = 12
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'OCR-L3-Lib.ps1')
New-Item -ItemType Directory -Force -Path $WorkDir | Out-Null
$Log  = Join-Path $WorkDir 'OCR-QueueA-LOG.csv'
$Lock = Join-Path $WorkDir 'runner.lock'
$Tmp  = Join-Path $WorkDir 'tmp'
$Bak  = Join-Path $WorkDir '_bak'
$Done = Join-Path $WorkDir 'l3-done.txt'
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
if (-not (Test-Path $Log)) { 'time,trk,year,file,level_before,pages,chars,method,result,error' | Set-Content -Path $Log -Encoding UTF8 }
if (-not (Test-Path $Done)) { New-Item -ItemType File -Path $Done | Out-Null }

# One runner at a time. A lock older than 30 minutes is treated as dead and taken over.
if (Test-Path $Lock) {
  if (((Get-Date) - (Get-Item $Lock).LastWriteTime).TotalMinutes -lt 30) { exit 0 }
}
Set-Content -Path $Lock -Value $PID

function Find-Tool([string[]]$names) {
  foreach ($n in $names) { $c = Get-Command $n -ErrorAction SilentlyContinue; if ($c) { return $c.Source } }
  return $null
}
$ocrmypdf  = Find-Tool @('ocrmypdf')
$pdftotext = Find-Tool @('pdftotext')
$pdftoppm  = Find-Tool @('pdftoppm')
$tesseract = Find-Tool @('tesseract', 'C:\Program Files\Tesseract-OCR\tesseract.exe')

$runId = 'OCR-L3-' + (Get-Date).ToString('yyyyMMdd-HHmm') + '-' + $env:COMPUTERNAME
$started = Get-Date
$doneThisRun = 0; $failThisRun = 0; $lastErr = 'none'; $current = ''; $phaseNow = ''

function Write-Heartbeat([int]$l3, [int]$total, [string]$state) {
  $now = Get-Date
  $body = @"
# OCR HEARTBEAT - Queue A (free lane, zero AI tokens, protocol L3)
Written: $($now.ToString('yyyy-MM-dd HH:mm:ss')) (Miami time) by CU-OCR-QueueA-24x7 on $env:COMPUTERNAME
State: $state
Progress: **$l3 of $total** Queue A PDFs are at the latest protocol (L3)
Working on: $phaseNow
This run: $doneThisRun done, $failThisRun failed, started $($started.ToString('HH:mm'))
Current file: $current
Last error: $lastErr
Tools: ocrmypdf=$([bool]$ocrmypdf) pdftotext=$([bool]$pdftotext) pdftoppm=$([bool]$pdftoppm) tesseract=$([bool]$tesseract)

Stale for more than 15 minutes = the runner is dead. The cloud alerts Jorge.
The full count by protocol level and by year is in _OCR-CENSUS.md, next to this file.
"@
  $t = "$Heartbeat.tmp"
  try { Set-Content -Path $t -Value $body -Encoding UTF8; Move-Item -Force $t $Heartbeat } catch { }
}

function Read-Pdf([string]$pdf) {
  # 1. Text layer first (fast, exact). 2. OCR the first $PageCap pages if the text layer is empty.
  $txt = Join-Path $Tmp 'out.txt'; Remove-Item $txt -ErrorAction SilentlyContinue
  $method = ''; $pages = 0; $capped = $false
  if ($pdftotext) { & $pdftotext -layout $pdf $txt 2>$null; $method = 'text-layer' }
  $len = 0; if (Test-Path $txt) { $raw = Get-Content -Raw $txt -ErrorAction SilentlyContinue; if ($null -ne $raw) { $len = ([string]$raw).Trim().Length } }
  if ($len -lt 50) {
    Remove-Item (Join-Path $Tmp 'pg*') -ErrorAction SilentlyContinue
    if ($pdftoppm -and $tesseract) {
      & $pdftoppm -r 300 -l ($PageCap + 1) -png $pdf (Join-Path $Tmp 'pg') 2>$null
      $imgs = @(Get-ChildItem (Join-Path $Tmp 'pg*.png') | Sort-Object Name)
      if ($imgs.Count -gt $PageCap) { $capped = $true; $imgs = $imgs[0..($PageCap - 1)] }
      $parts = foreach ($img in $imgs) { & $tesseract $img.FullName stdout --oem 1 --psm 6 2>$null }
      Set-Content -Path $txt -Value ($parts -join "`n") -Encoding UTF8; $method = 'tesseract'; $pages = $imgs.Count
    } elseif ($ocrmypdf) {
      & $ocrmypdf --skip-text --pages "1-$PageCap" --sidecar $txt --output-type none $pdf - 2>$null; $method = 'ocrmypdf'
    } else { throw 'no OCR tool found (need pdftoppm + tesseract, or ocrmypdf)' }
  }
  $body = if (Test-Path $txt) { [string](Get-Content -Raw $txt) } else { '' }
  return @{ Body = $body; Method = $method; Pages = $pages; Capped = $capped }
}

function Get-OldBody([string]$side) {
  # The text an older sidecar already holds, without its old header lines.
  $lines = (Get-Content -LiteralPath $side -Raw -Encoding UTF8) -split "`r?`n"
  return (($lines | Where-Object { $_ -notmatch '^\s*#' -and $_ -notmatch "$script:TrkRx\s*·" }) -join "`n").Trim()
}

try {
  $doneSet = @{}; Get-Content $Done -ErrorAction SilentlyContinue | ForEach-Object { if ($_) { $doneSet[$_] = 1 } }
  $jobs = Get-ChildItem -LiteralPath $Root -Directory | Where-Object { $_.Name -match "^$script:TrkRx" }
  $all = @()
  foreach ($j in $jobs) {
    $trk = ([regex]::Match($j.Name, "^$script:TrkRx")).Value
    Get-ChildItem -LiteralPath $j.FullName -Recurse -File -Filter *.pdf -ErrorAction SilentlyContinue |
      Where-Object { $_.FullName -notmatch '\\_Superseded\\|/_Superseded/' } |
      ForEach-Object { $all += [pscustomobject]@{ Trk = $trk; Job = $j.Name; File = $_; Year = (Get-DocYear $_) } }
  }
  $total = $all.Count
  $pending = @($all | Where-Object { -not $doneSet.ContainsKey($_.File.FullName) })
  # Phase 1 (2022 to today) first, then one year at a time going back.
  $pending = @($pending | Sort-Object @{ Expression = { if ($_.Year -ge $PhaseOneFrom) { 0 } else { 1 } } },
                                       @{ Expression = { if ($_.Year -ge $PhaseOneFrom) { 0 } else { -$_.Year } } },
                                       @{ Expression = { $_.File.LastWriteTime }; Descending = $true })
  $l3 = $total - $pending.Count
  $lastBeat = Get-Date
  Write-Heartbeat $l3 $total 'RUNNING'

  foreach ($p in $pending) {
    if (((Get-Date) - $started).TotalMinutes -ge $MaxMinutes) { break }
    if (Test-Path 'C:\Users\JV\OneDrive\Documents\ClaudeMemory\Governor\PAUSE-HEAVY-JOBS.flag') { $lastErr = 'paused by RAM guard (low memory)'; break }
    $pdf = $p.File.FullName; $current = $pdf
    $phaseNow = if ($p.Year -ge $PhaseOneFrom) { "Phase 1 ($PhaseOneFrom to today), year $($p.Year)" } else { "Year $($p.Year)" }
    $before = Get-OcrLevel $pdf
    $method = ''; $err = ''; $chars = 0; $pages = 0
    try {
      if ($before -eq 'L3') {
        $result = 'already-L3'
      } else {
        $side = Get-SidecarPath $pdf
        if ($before -in @('NONE', 'EMPTY')) {
          $r = Read-Pdf $pdf; $body = $r.Body; $method = $r.Method; $pages = $r.Pages; $capped = $r.Capped
        } else {
          $body = Get-OldBody $side; $method = 'upgrade-of-existing-text'; $capped = $false
        }
        $c = New-L3Content $p.Trk $p.File $p.Job $method $pages $capped $body $runId
        Write-NewOrBackedUp $side $c.Sidecar $Bak
        Write-NewOrBackedUp (Get-TagsPath $pdf) $c.Tags $Bak
        $chars = $body.Length; $result = 'ok'; $doneThisRun++; $l3++
      }
      Add-Content -Path $Done -Value $pdf -Encoding UTF8
    } catch {
      $err = ("$($_.Exception.Message) @line $($_.InvocationInfo.ScriptLineNumber)" -replace '[,\r\n]', ' '); $lastErr = "$($p.File.Name): $err"
      $result = 'fail'; $failThisRun++
    }
    "$((Get-Date).ToString('s')),$($p.Trk),$($p.Year),""$($p.File.Name -replace '"','')"",$before,$pages,$chars,$method,$result,$err" | Add-Content -Path $Log -Encoding UTF8
    if (((Get-Date) - $lastBeat).TotalMinutes -ge 1) { Write-Heartbeat $l3 $total 'RUNNING'; $lastBeat = Get-Date }
  }
  $current = ''
  Write-Heartbeat $l3 $total ($(if ($l3 -ge $total) { 'ALL DONE - waiting for new PDFs' } else { 'PAUSED until next 15-minute start' }))
} catch {
  $lastErr = $_.Exception.Message
  Write-Heartbeat 0 0 "CRASHED: $lastErr"
} finally {
  Remove-Item $Lock -ErrorAction SilentlyContinue
}
