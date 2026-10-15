<#
OCR-Census.ps1  -  2026-10-15  -  written by the cloud. Zero AI tokens. Read-only on every PDF and sidecar.
Counts EVERY PDF (not a sample) by OCR protocol level and by document year, and writes:
  G:\My Drive\VTES-Outbox\_OCR-CENSUS.md   plain-words report with denominators (the cloud copies it to the panel)
  C:\AI\ocr\ocr-census.csv                 one row per PDF
Writes only those two files. Runs hourly from the same installer as the runner.
#>
param(
  [string]$Root      = 'G:\My Drive',
  [string]$JobsRoot  = 'G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH',
  [string]$Out       = 'G:\My Drive\VTES-Outbox\_OCR-CENSUS.md',
  [string]$Csv       = 'C:\AI\ocr\ocr-census.csv',
  [int]$PhaseOneFrom = 2022
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'OCR-L3-Lib.ps1')
New-Item -ItemType Directory -Force -Path (Split-Path $Csv) | Out-Null

$levels = @('L3', 'L2', 'L1', 'L0', 'EMPTY', 'NONE')
$names = @{
  L3 = 'Latest protocol (L3: header, circled emails and phones, 5+ hashtags)'
  L2 = 'L2 (header and tags file, no circle)'
  L1 = 'L1 (TRK stamped, no tags file)'
  L0 = 'L0 (plain text, no TRK)'
  EMPTY = 'Sidecar exists but holds no usable text'
  NONE = 'No OCR at all'
}
$rows = Get-ChildItem -LiteralPath $Root -Recurse -File -Filter *.pdf -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch '\\_Superseded\\|/_Superseded/|\\VTES-' } |
  ForEach-Object {
    [pscustomobject]@{
      Year = Get-DocYear $_
      InJobs = $_.FullName.StartsWith($JobsRoot)
      Level = Get-OcrLevel $_.FullName
      Path = $_.FullName
    }
  }
$rows | Export-Csv -LiteralPath $Csv -NoTypeInformation -Encoding UTF8

function Pct([int]$a, [int]$b) { if ($b -eq 0) { return '0%' } ; return ('{0:0.0}%' -f (100.0 * $a / $b)) }
function Block([object[]]$set, [string]$title) {
  $n = @($set).Count
  $o = @("## $title", "Total PDFs: **$n**", '')
  $i = 1
  foreach ($l in $levels) {
    $k = @($set | Where-Object { $_.Level -eq $l }).Count
    $o += "$i. $($names[$l]): **$k of $n**, $(Pct $k $n)"; $i++
  }
  $o += ''
  return $o
}

$p1 = @($rows | Where-Object { $_.Year -ge $PhaseOneFrom })
$now = Get-Date
$md = @(
  "# OCR census - every PDF counted, not a sample",
  "Counted: $($now.ToString('yyyy-MM-dd HH:mm')) (Miami time) on $env:COMPUTERNAME by OCR-Census.ps1. Zero AI tokens.",
  "Document year = the date at the front of the filename, or the file's own date if the name has none.",
  ''
)
$md += Block $p1 "Phase 1: documents dated $PhaseOneFrom-01-01 to today"
$md += Block @($p1 | Where-Object { $_.InJobs }) "Phase 1, inside the job folders only (the runner's queue)"
$md += Block @($rows) "All years, all of My Drive"
$md += '## By year, latest protocol only'
$i = 1
foreach ($y in (@($rows | ForEach-Object { $_.Year }) | Sort-Object -Unique -Descending)) {
  $ys = @($rows | Where-Object { $_.Year -eq $y }); $k = @($ys | Where-Object { $_.Level -eq 'L3' }).Count
  $md += "$i. $y : $k of $($ys.Count) at L3, $(Pct $k $ys.Count). No OCR at all: $(@($ys | Where-Object { $_.Level -eq 'NONE' }).Count)."; $i++
}
$md += ''
$md += 'Next count: in one hour. The runner works Phase 1 first, then one year at a time going back.'
$tmp = "$Out.tmp"
Set-Content -LiteralPath $tmp -Value ($md -join "`r`n") -Encoding UTF8
Move-Item -LiteralPath $tmp -Destination $Out -Force
