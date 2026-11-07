<#
OCR-L3-Lib.ps1  -  shared rules for the free OCR lane  -  2026-10-15  -  written by the cloud
Dot-sourced by OCR-QueueA-Runner.ps1 and OCR-Census.ps1. Zero AI tokens.

The OCR protocol levels (control-panel/OCR-PROTOCOL-AUDIT_2026-10-12.md):
  NONE   no .SEARCH.txt next to the PDF
  EMPTY  sidecar holds under 50 characters of real text
  L0     text only, no TRK
  L1     TRK stamped in the sidecar, no tags file
  L2     L1 + a .TAGS.txt with at least 4 hashtags
  L3     LATEST: L3 header (line 1 ends "· L3"), circle lines for emails and phones,
         and a .TAGS.txt with at least 5 hashtags including the TRK
Phase 1 = documents dated 2022-01-01 to today. Then 2021, 2020 ... one year at a time.
#>

$script:TrkRx   = '(TRK-20\d\d-\d{4}(-[A-Z0-9]+)?|TUS-\d\d-\d{4}|OPH-20\d\d-\d{4})'
$script:EmailRx = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
$script:PhoneRx = '(?<!\d)\(?\d{3}\)?[ .-]?\d{3}[ .-]\d{4}(?!\d)'
$script:FolioRx = '(?<!\d)\d{2}-\d{4}-\d{3}-\d{4}(?!\d)'
$script:PermitRx = '(?<![A-Z0-9])(?:[A-Z]{1,4}\d{6,12}|\d{4}-\d{5,7})(?![A-Z0-9])'

function Get-DocYear([System.IO.FileInfo]$f) {
  # The date at the front of the filename wins (DATE _ TRK _ TYPE ...). Otherwise the file's own date.
  $m = [regex]::Match($f.Name, '^(19|20)\d\d(?=-\d\d-\d\d)')
  if ($m.Success) { return [int]$m.Value }
  return $f.LastWriteTime.Year
}

function Get-SidecarPath([string]$pdf) {
  # Drive's own convention is "<name>.pdf.SEARCH.txt". The 10-12 runner wrote "<name>.SEARCH.txt". Both count.
  $a = "$pdf.SEARCH.txt"; $b = ($pdf -replace '\.pdf$', '.SEARCH.txt')
  if ((-not (Test-Path -LiteralPath $a)) -and (Test-Path -LiteralPath $b)) { return $b }
  return $a
}
function Get-TagsPath([string]$pdf)    { return ($pdf -replace '\.pdf$', '.pdf.TAGS.txt') }

function Get-OcrLevel([string]$pdf) {
  $side = Get-SidecarPath $pdf
  if (-not (Test-Path -LiteralPath $side)) { return 'NONE' }
  $raw = Get-Content -LiteralPath $side -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
  if (-not $raw) { return 'EMPTY' }
  $lines = $raw -split "`r?`n"
  $body = ($lines | Where-Object { $_ -notmatch '^\s*#' -and $_ -notmatch "$script:TrkRx\s*·" }) -join "`n"
  if ($body.Trim().Length -lt 50) { return 'EMPTY' }
  $head = ($lines | Select-Object -First 12) -join "`n"
  if ($head -notmatch $script:TrkRx) { return 'L0' }
  $tags = Get-TagsPath $pdf
  $n = 0; $hasTrk = $false
  if (Test-Path -LiteralPath $tags) {
    $t = Get-Content -LiteralPath $tags -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    $n = ([regex]::Matches([string]$t, '#[^\s#]+')).Count
    $hasTrk = ([string]$t) -match "#$script:TrkRx"
  }
  if ($n -lt 4) { return 'L1' }
  $isL3 = ($lines[0] -match '· L3\s*$') -and ($head -match '(?m)^# circle-emails:') -and ($head -match '(?m)^# circle-phones:')
  if ($isL3 -and $n -ge 5 -and $hasTrk) { return 'L3' }
  return 'L2'
}

function Get-Slug([string]$s) {
  $x = ($s -replace '[^A-Za-z0-9]+', '-').Trim('-')
  if ($x.Length -gt 40) { $x = $x.Substring(0, 40).Trim('-') }
  return $x
}

function New-L3Content([string]$trk, [System.IO.FileInfo]$f, [string]$jobFolder, [string]$method, [int]$pagesDone, [bool]$capped, [string]$body, [string]$runId) {
  # Returns @{ Sidecar = text; Tags = text } for one PDF. Never touches the PDF.
  $emails  = @([regex]::Matches($body, $script:EmailRx) | ForEach-Object { $_.Value.ToLower() } | Select-Object -Unique)
  $phones  = @([regex]::Matches($body, $script:PhoneRx) | ForEach-Object { ($_.Value -replace '\D', '') } | Select-Object -Unique)
  $folios  = @([regex]::Matches($body, $script:FolioRx) | ForEach-Object { $_.Value } | Select-Object -Unique)
  $permits = @([regex]::Matches($body, $script:PermitRx) | ForEach-Object { $_.Value } | Select-Object -Unique | Select-Object -First 10)
  $year = Get-DocYear $f
  $now = (Get-Date).ToString('yyyy-MM-ddTHH:mm')
  $cap = if ($capped) { "capped at 12 of more pages" } else { "all pages" }
  $head = @(
    "$trk · OCR · $now · L3",
    "# source: $method",
    "# run: $runId",
    "# pages: $pagesDone ($cap)",
    "# unit / permit / folio: $(($permits + $folios) -join ', ')",
    "# original: $($f.FullName)",
    "# circle-emails: $($emails -join ', ')",
    "# circle-phones: $($phones -join ', ')",
    "#$trk #OCR-L3 #Y$year #$(Get-Slug $method) #$(Get-Slug $jobFolder)"
  )
  $tagList = @("#$trk", '#OCR-L3', "#Y$year", "#$(Get-Slug $method)", "#$(Get-Slug $jobFolder)")
  $tagList += $folios  | ForEach-Object { "#folio-$_" }
  $tagList += $permits | ForEach-Object { "#permit-$_" }
  $tagLine = (@($tagList | Select-Object -Unique)) -join ' '
  $tags = @(
    "$trk · TAGS · $now · L3",
    "# What these mean: #TRK = the job. #OCR-L3 = read under the latest OCR protocol. #Y = the document's year.",
    "# The method tag says how the text was read. The folder tag is the job folder. #folio- and #permit- were found in the text.",
    $tagLine
  )
  return @{ Sidecar = (($head -join "`r`n") + "`r`n`r`n" + $body); Tags = ($tags -join "`r`n") }
}

function Write-NewOrBackedUp([string]$path, [string]$text, [string]$bakDir) {
  # A file that exists is copied to the backup folder first (NAME_bak-YYYYMMDD.ext), off Drive. Then written atomically.
  if (Test-Path -LiteralPath $path) {
    New-Item -ItemType Directory -Force -Path $bakDir | Out-Null
    $leaf = Split-Path $path -Leaf
    $ext = [IO.Path]::GetExtension($leaf); $stem = $leaf.Substring(0, $leaf.Length - $ext.Length)
    Copy-Item -LiteralPath $path -Destination (Join-Path $bakDir ("{0}_bak-{1}{2}" -f $stem, (Get-Date).ToString('yyyyMMdd-HHmmss'), $ext)) -Force
  }
  $tmp = "$path.tmp"
  Set-Content -LiteralPath $tmp -Value $text -Encoding UTF8
  Move-Item -LiteralPath $tmp -Destination $path -Force
}
