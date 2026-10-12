<#
OCR-QueueA-Runner.ps1  -  TRK-2026-9960 family  -  2026-10-12  -  written by the cloud, installed by Rambo 1
Free OCR lane. Zero AI tokens. Queue A only (NIGHT-PROTOCOL section 5): PDFs already inside a job folder,
so the TRK is known from the path. Writes ONLY new <name>.SEARCH.txt sidecars. Never changes, moves or renames a PDF.
Runs for at most -MaxMinutes, then exits; the scheduled task starts it again every 15 minutes.
Resumable: a PDF that already has a .SEARCH.txt is skipped.
#>
param(
  [string]$Root      = 'G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH',
  [string]$Heartbeat = 'G:\My Drive\VTES-Outbox\_OCR-HEARTBEAT.md',
  [string]$WorkDir   = 'C:\AI\ocr',
  [int]$MaxMinutes   = 13
)
$ErrorActionPreference = 'Stop'
New-Item -ItemType Directory -Force -Path $WorkDir | Out-Null
$Log  = Join-Path $WorkDir 'OCR-QueueA-LOG.csv'
$Lock = Join-Path $WorkDir 'runner.lock'
$Tmp  = Join-Path $WorkDir 'tmp'
New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
if (-not (Test-Path $Log)) { 'time,trk,file,pages,chars,method,result,error' | Set-Content -Path $Log -Encoding UTF8 }

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

$trkRx = '^(TRK-20\d\d-\d{4}(-[A-Z0-9]+)?|TUS-\d\d-\d{4}|OPH-20\d\d-\d{4})'
$started = Get-Date
$doneThisRun = 0; $failThisRun = 0; $lastErr = 'none'; $current = ''

function Write-Heartbeat([int]$done, [int]$total, [string]$state) {
  $now = Get-Date
  $body = @"
# OCR HEARTBEAT - Queue A (free lane, zero AI tokens)
Written: $($now.ToString('yyyy-MM-dd HH:mm:ss')) (Miami time) by CU-OCR-QueueA-24x7 on $env:COMPUTERNAME
State: $state
Progress: **$done of $total** Queue A PDFs have a .SEARCH.txt sidecar
This run: $doneThisRun done, $failThisRun failed, started $($started.ToString('HH:mm'))
Current file: $current
Last error: $lastErr
Tools: ocrmypdf=$([bool]$ocrmypdf) pdftotext=$([bool]$pdftotext) pdftoppm=$([bool]$pdftoppm) tesseract=$([bool]$tesseract)

Stale for more than 15 minutes = the runner is dead. The cloud alerts Jorge.
"@
  $t = "$Heartbeat.tmp"
  try { Set-Content -Path $t -Value $body -Encoding UTF8; Move-Item -Force $t $Heartbeat } catch { }
}

try {
  # Build the Queue A list: PDFs under a top-level folder whose name starts with a job number.
  $jobs = Get-ChildItem -LiteralPath $Root -Directory | Where-Object { $_.Name -match $trkRx }
  $all = @()
  foreach ($j in $jobs) {
    $trk = ([regex]::Match($j.Name, $trkRx)).Value
    Get-ChildItem -LiteralPath $j.FullName -Recurse -File -Filter *.pdf -ErrorAction SilentlyContinue |
      Where-Object { $_.FullName -notmatch '\\_Superseded\\' } |
      ForEach-Object { $all += [pscustomobject]@{ Trk = $trk; File = $_ } }
  }
  $total = $all.Count
  $pending = $all | Where-Object { -not (Test-Path -LiteralPath ($_.File.FullName -replace '\.pdf$', '.SEARCH.txt')) } |
             Sort-Object { $_.File.LastWriteTime }
  $done = $total - @($pending).Count
  $lastBeat = Get-Date
  Write-Heartbeat $done $total 'RUNNING'

  foreach ($p in $pending) {
    if (((Get-Date) - $started).TotalMinutes -ge $MaxMinutes) { break }
    if (Test-Path 'C:\AI\state\PAUSE-NEW-WORK.flag') { $lastErr = 'paused by RAM guard (low memory)'; break }
    $pdf = $p.File.FullName; $current = $pdf
    $side = $pdf -replace '\.pdf$', '.SEARCH.txt'
    $txt = Join-Path $Tmp 'out.txt'; Remove-Item $txt -ErrorAction SilentlyContinue
    $method = ''; $err = ''
    try {
      # 1. Text layer first (fast, exact). 2. OCR if the text layer is empty.
      if ($pdftotext) { & $pdftotext -layout $pdf $txt 2>$null; $method = 'text-layer' }
      $len = 0; if (Test-Path $txt) { $len = (Get-Content -Raw $txt -ErrorAction SilentlyContinue).Trim().Length }
      if ($len -lt 50) {
        if ($ocrmypdf) {
          & $ocrmypdf --skip-text --sidecar $txt --output-type none $pdf - 2>$null; $method = 'ocrmypdf'
        } elseif ($pdftoppm -and $tesseract) {
          Remove-Item (Join-Path $Tmp 'pg*') -ErrorAction SilentlyContinue
          & $pdftoppm -r 300 -png $pdf (Join-Path $Tmp 'pg') 2>$null
          $parts = foreach ($img in (Get-ChildItem (Join-Path $Tmp 'pg*.png') | Sort-Object Name)) {
            & $tesseract $img.FullName stdout --oem 1 --psm 6 2>$null
          }
          Set-Content -Path $txt -Value ($parts -join "`n") -Encoding UTF8; $method = 'tesseract'
        } else { throw 'no OCR tool found (need ocrmypdf, or pdftoppm + tesseract)' }
      }
      $body = if (Test-Path $txt) { Get-Content -Raw $txt } else { '' }
      $stamp = "$($p.Trk) · OCR-SIDECAR · $((Get-Date).ToString('yyyy-MM-dd')) · source: $($p.File.Name) · method: $method"
      $tmpSide = "$side.tmp"
      Set-Content -LiteralPath $tmpSide -Value ($stamp + "`r`n#" + $p.Trk + "`r`n`r`n" + $body) -Encoding UTF8
      Move-Item -LiteralPath $tmpSide -Destination $side
      $chars = $body.Length; $result = 'ok'; $doneThisRun++; $done++
    } catch {
      $err = ($_.Exception.Message -replace '[,\r\n]', ' '); $lastErr = "$($p.File.Name): $err"
      $chars = 0; $result = 'fail'; $failThisRun++
    }
    "$((Get-Date).ToString('s')),$($p.Trk),""$($p.File.Name -replace '"','')"",,$chars,$method,$result,$err" | Add-Content -Path $Log -Encoding UTF8
    if (((Get-Date) - $lastBeat).TotalMinutes -ge 1) { Write-Heartbeat $done $total 'RUNNING'; $lastBeat = Get-Date }
  }
  $current = ''
  Write-Heartbeat $done $total ($(if ($done -ge $total) { 'ALL DONE - waiting for new PDFs' } else { 'PAUSED until next 15-minute start' }))
} catch {
  $lastErr = $_.Exception.Message
  Write-Heartbeat 0 0 "CRASHED: $lastErr"
} finally {
  Remove-Item $Lock -ErrorAction SilentlyContinue
}
