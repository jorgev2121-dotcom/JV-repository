# 05-Find-Unit305-Candidates.ps1   READ-ONLY (GREEN). Lists candidate files for "305". MOVES, RENAMES, TAGS NOTHING.
# Why read-only: "305" is at least THREE different properties (10185 Collins Ave Unit 305 = TRK-2026-1265; 2055 SW 122 Ave #305 = Descarga job;
# 13276 Old Biscayne Dr 305). Filing on a fuzzy "305" match is forbidden by the charter. This only builds the list for a human-approved filing step.
$ErrorActionPreference = 'Continue'
$roots = @('G:\My Drive\01-JOBS','C:\Users\JV\OneDrive\Documents') | Where-Object { Test-Path $_ }
$stamp = Get-Date -Format 'yyyyMMdd-HHmm'
$csv = 'G:\My Drive\VTES-Outbox\DIAG-UNIT305-CANDIDATES_' + $stamp + '.csv'
$rows = New-Object System.Collections.Generic.List[object]
$total = 0
foreach ($r in $roots) {
  Get-ChildItem $r -Recurse -File -ErrorAction SilentlyContinue | ForEach-Object {
    $total++
    $n = $_.Name
    $hint = ''
    if ($n -match 'Collins' -or $_.FullName -match 'TRK-2026-1265') { $hint = 'COLLINS-305 (TRK-2026-1265)' }
    elseif ($n -match '122 ?AVE|Descarga') { $hint = 'SW-122-AVE-305 (Descarga)' }
    elseif ($n -match 'BISCAYNE') { $hint = 'OLD-BISCAYNE-305' }
    elseif ($n -match 'Plaza') { $hint = 'PLAZA-305' }
    if ($n -match '(?i)(#|unit[ _-]?|plaza[ _-]?|\b)305\b' -or $_.FullName -match '(?i)unit[ _-]?305') {
      $rows.Add([pscustomobject]@{ Path = $_.FullName; Name = $n; Hint = $hint; Modified = $_.LastWriteTime.ToString('yyyy-MM-dd HH:mm'); Bytes = $_.Length })
    }
  }
}
$rows | Export-Csv -Path $csv -NoTypeInformation -Encoding UTF8
Write-Host ('SCANNED ' + $total + ' files. CANDIDATES ' + $rows.Count + '. Unknown-hint rows: ' + @($rows | Where-Object { -not $_.Hint }).Count)
Write-Host ('WROTE ' + $csv)
Write-Host 'Nothing was moved, renamed or tagged. Rows with an empty Hint need a human decision before any filing.'
