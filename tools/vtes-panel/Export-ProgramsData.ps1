<#
.SYNOPSIS
  Turns RAMBO's program inventory CSV into programs-data.js for VTES-PROGRAMS.html (merging with what is already there).
.DESCRIPTION
  TRK-2026-9910-B · #programs #inventory. Input: AI-PROGRAMS-CLASSIFICATION_PROPOSED_*.csv. Columns are matched by name, loosely:
  Name|Program, Path|Where|FullName, LastModified|Modified, ScheduledTask|Task, LastRunResult|LastResult, ProposedState|State|Class (ACTIVE, INACTIVE, EARLIER-VERSION).
  ACTIVE -> "PROVEN-RUN" (the order says ACTIVE only with a run in the last 30 days, with proof). INACTIVE -> BUILT + tag inactive. EARLIER-VERSION -> DISABLED + tag earlier-version.
  CSV rows replace same-named entries; older entries stay. Writes only programs-data.js in the panel folder. -SelfTest runs 6 checks.
#>
param([string]$Csv = '', [string]$Dir = '', [switch]$SelfTest)
$ErrorActionPreference = 'Stop'
function Pick($row, [string[]]$names) { foreach ($n in $names) { $p = $row.PSObject.Properties | Where-Object { $_.Name -ieq $n } | Select-Object -First 1; if ($p -and "$($p.Value)".Trim()) { return "$($p.Value)".Trim() } }; return '' }
function Read-Existing([string]$file) {
  if (-not (Test-Path -LiteralPath $file)) { return @() }
  $raw = Get-Content -LiteralPath $file -Raw -Encoding UTF8; $i = $raw.IndexOf('window.VTES_PROGRAMS = '); if ($i -lt 0) { return @() }
  $j = $raw.Substring($i + 'window.VTES_PROGRAMS = '.Length).Trim().TrimEnd(';'); $o = $j | ConvertFrom-Json; return @($o.entries)
}
function Convert-Rows($rows) {
  $out = @()
  foreach ($r in $rows) {
    $name = Pick $r 'Name','Program'; if (-not $name) { continue }
    $cls = (Pick $r 'ProposedState','State','Class').ToUpper(); $state = 'BUILT'; $tags = @('inventory')
    if ($cls -eq 'ACTIVE') { $state = 'PROVEN-RUN'; $tags += 'active' } elseif ($cls -eq 'INACTIVE') { $tags += 'inactive' } elseif ($cls -like 'EARLIER*') { $state = 'DISABLED'; $tags += 'earlier-version' } else { $state = 'UNKNOWN' }
    $task = Pick $r 'ScheduledTask','Task'; $res = Pick $r 'LastRunResult','LastResult'; $mod = Pick $r 'LastModified','Modified'
    $what = ('Modified ' + $(if ($mod) { $mod } else { 'unknown' }) + '; task: ' + $(if ($task) { $task } else { 'none' }) + '; last run: ' + $(if ($res) { $res } else { 'unknown' }))
    $kind = if ($task) { 'scheduled-task' } elseif ($name -match '\.(hta|lnk|cmd|bat)$') { 'shortcut' } else { 'script' }
    $out += [pscustomobject]@{ name = $name; kind = $kind; where = (Pick $r 'Path','Where','FullName'); what = $what; state = $state; source = 'PC inventory (RAMBO)'; tags = @($tags + 'pc') }
  }
  return $out
}
function Write-Data([string]$file, $entries) {
  $obj = [ordered]@{ asOf = (Get-Date).ToString('yyyy-MM-dd'); source = 'PC inventory (RAMBO) merged with the repo survey'; entries = @($entries) }
  $js = "// programs-data.js · TRK-2026-9910-B · written by Export-ProgramsData.ps1`nwindow.VTES_PROGRAMS = " + ($obj | ConvertTo-Json -Depth 6) + ";`n"
  [IO.File]::WriteAllText($file, $js, (New-Object Text.UTF8Encoding($false)))
}
function Run([string]$csv, [string]$dir) {
  $file = Join-Path $dir 'programs-data.js'; $old = Read-Existing $file; $new = Convert-Rows (Import-Csv -LiteralPath $csv)
  $names = @{}; foreach ($n in $new) { $names[$n.name.ToLower()] = 1 }
  $keep = @($old | Where-Object { -not $names.ContainsKey($_.name.ToLower()) })
  Write-Data $file (@($new) + $keep); return @{ New = @($new).Count; Kept = $keep.Count }
}
if ($SelfTest) {
  $t = Join-Path ([IO.Path]::GetTempPath()) ('vtes-prog-test-' + [guid]::NewGuid().ToString('N')); New-Item -ItemType Directory -Path $t | Out-Null
  $pass = 0; $fail = 0; function T($n, $c) { if ($c) { $script:pass++; Write-Host "PASS $n" } else { $script:fail++; Write-Host "FAIL $n" } }
  Write-Data (Join-Path $t 'programs-data.js') @([pscustomobject]@{ name = 'Old One'; kind = 'script'; where = 'x'; what = 'w'; state = 'BUILT'; source = 's'; tags = @('a') }, [pscustomobject]@{ name = 'Same Name'; kind = 'script'; where = 'x'; what = 'old'; state = 'BUILT'; source = 's'; tags = @('a') })
  $csv = Join-Path $t 'in.csv'; Set-Content $csv "Name,Path,LastModified,ScheduledTask,LastRunResult,ProposedState`nSame Name,C:\AI\a.ps1,2026-09-01,CU-A,0,ACTIVE`nDead.hta,C:\AI\d.hta,2025-01-01,,,EARLIER-VERSION`nOdd,C:\AI\o.ps1,,,,INACTIVE" -Encoding UTF8
  $r = Run $csv $t; T 'three rows converted' ($r.New -eq 3); T 'older unmatched entry kept' ($r.Kept -eq 1)
  $o = Read-Existing (Join-Path $t 'programs-data.js'); T 'four entries total' (@($o).Count -eq 4)
  T 'ACTIVE becomes PROVEN-RUN and replaces the old Same Name' ((@($o | Where-Object { $_.name -eq 'Same Name' }).Count -eq 1) -and (($o | Where-Object { $_.name -eq 'Same Name' }).state -eq 'PROVEN-RUN'))
  T 'EARLIER-VERSION becomes DISABLED, hta is a shortcut' ((($o | Where-Object { $_.name -eq 'Dead.hta' }).state -eq 'DISABLED') -and (($o | Where-Object { $_.name -eq 'Dead.hta' }).kind -eq 'shortcut'))
  T 'file starts as a JS assignment' ((Get-Content (Join-Path $t 'programs-data.js') -Raw) -match 'window\.VTES_PROGRAMS = \{')
  Remove-Item -Recurse -Force $t; Write-Host "RESULT: $pass passed, $fail failed"; if ($fail) { exit 1 } else { exit 0 }
}
if (-not $Csv) { throw 'Give -Csv <path to AI-PROGRAMS-CLASSIFICATION_PROPOSED csv>' }
if (-not $Dir) { $Dir = $PSScriptRoot }
$r = Run $Csv $Dir; Write-Host "programs-data.js updated: $($r.New) from the CSV, $($r.Kept) older entries kept"
