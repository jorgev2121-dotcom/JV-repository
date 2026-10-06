# ROLLBACK-v4.ps1 - undoes INSTALL-v4.ps1 (and EDIT-VtesStatus-v4.ps1) exactly, however many times they ran. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032). Fix round 2.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File ROLLBACK-v4.ps1 -LiveDir "C:\path\to\live\panel\folder"
# Reads <LiveDir>\_Rollback\v4-install-record.txt, which INSTALL wrote BEFORE it copied anything. For every tracked file it puts the folder back to the
# state the record holds: a file that did not exist is removed; a file that existed is restored from NAME.pre-v4.
# It never overwrites a later legitimate change: a file whose SHA256 is neither the one INSTALL left nor the original is KEPT and reported.
# MANIFEST.sha256 is never replaced by its backup: only the four v4 lines are taken out (and the Write-VtesStatus.ps1 line is put back if it was edited),
# so a later legitimate rebuild of the manifest survives.
# A data file that has meanwhile received a real report is KEPT (never deleted).
# It does NOT run Verify-VtesPanel.ps1 (that would rewrite vtes-verify.js); it does a read-only manifest check instead.
param([string]$LiveDir = '')
$ErrorActionPreference = 'Stop'
$SEP = [IO.Path]::DirectorySeparatorChar
if ($LiveDir -eq '') { $LiveDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path) }
function Abs([string]$rel) { return (Join-Path $LiveDir ($rel -replace '[\\/]', [string]$SEP)) }
function Sha([string]$p) { try { return (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() } catch { return 'unreadable' } }
$rbDir = Join-Path $LiveDir '_Rollback'; $record = Join-Path $rbDir 'v4-install-record.txt'
if (-not (Test-Path -LiteralPath $record)) {
    Write-Host 'STOP: no install record in that folder, so I cannot tell what v4 changed here. THIS ROLLBACK CHANGED NOTHING.'
    $left = @('VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js', 'data') | Where-Object { Test-Path -LiteralPath (Abs $_) }
    if ($left) { Write-Host ('Files that look like v4 are present: ' + ($left -join ', ') + '. Report this to the desktop executor.') }
    exit 2
}
$pre = @{}; $after = @{}; $touch = @{}; $editline = @{}; $v3 = @(); $stubs = @(); $codeNames = @('VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js')
foreach ($l in @(Get-Content -LiteralPath $record)) {
    if ($l -eq '') { continue }
    $p = $l.Split('|')
    switch ($p[0]) {
        'PRE'      { $pre[$p[1]] = $p[2] }
        'AFTER'    { $after[$p[1]] = $p[2] }
        'TOUCH'    { $touch[$p[1]] = $true }
        'EDITLINE' { $editline[$p[1]] = @($p[2], $p[3]) }
        'V3HASH'   { $v3 += , @($p[1], $p[2]) }
        'STUB'     { $stubs += $p[1] }
    }
}
$notes = New-Object System.Collections.Generic.List[string]
function Note([string]$t) { $notes.Add($t); Write-Host ('NOTE: ' + $t) }
function Is-RealReport([string]$rel, [string]$path) {
    $txt = Get-Content -LiteralPath $path -Raw
    if ($rel -like 'data?*' -and $txt -match '"at"\s*:\s*"') { return $true }
    if ($rel -eq 'vtes-status.js' -and $txt -notmatch '^\s*window\.VTES_STATUS\s*=\s*window\.VTES_STATUS\s*\|\|\s*\{\}\s*;\s*$') { return $true }
    return $false
}
# 1. every tracked file except the manifest, which has its own rule below
foreach ($rel in @($pre.Keys | Sort-Object)) {
    if ($rel -eq 'MANIFEST.sha256') { continue }
    $p = Abs $rel; $bak = $p + '.pre-v4'; $exists = Test-Path -LiteralPath $p -PathType Leaf
    $cur = if ($exists) { Sha $p } else { 'absent' }
    $ours = $after.ContainsKey($rel) -and ($cur -eq $after[$rel])
    $touched = $touch.ContainsKey($rel) -or $after.ContainsKey($rel)
    if ($pre[$rel] -eq 'absent') {
        if (-not $exists) { continue }
        if (-not $touched) { Note ($rel + ' appeared after v4 was installed and is not ours; kept.'); continue }
        if (Is-RealReport $rel $p) { Note ($rel + ' now holds a real report; kept (never deleted).'); continue }
        if ($ours -or (-not $after.ContainsKey($rel))) { Remove-Item -LiteralPath $p -Force; Write-Host ('removed ' + $rel) }
        else { Note ($rel + ' was changed after v4 wrote it (not the file INSTALL left); kept.') }
    } else {
        if (-not $touched) { if (Test-Path -LiteralPath $bak) { Remove-Item -LiteralPath $bak -Force }; continue }
        if ($cur -eq $pre[$rel]) { if (Test-Path -LiteralPath $bak) { Remove-Item -LiteralPath $bak -Force }; continue }
        if (-not (Test-Path -LiteralPath $bak)) { Note ('the backup of ' + $rel + ' (.pre-v4) is missing, so it cannot be restored; left as it is.'); continue }
        if ($ours -or (-not $after.ContainsKey($rel))) { Copy-Item -LiteralPath $bak -Destination $p -Force; Remove-Item -LiteralPath $bak -Force; Write-Host ('restored ' + $rel) }
        else { Note ($rel + ' was changed after v4 wrote it (probably a legitimate later change); kept as it is now. The backup stays as ' + $rel + '.pre-v4.') }
    }
}
# 2. the manifest: take out only the four v4 lines; put the edited Write-VtesStatus.ps1 line back to its old hash if that file was restored
$mf = Abs 'MANIFEST.sha256'
if ($pre.ContainsKey('MANIFEST.sha256') -and $pre['MANIFEST.sha256'] -ne 'absent' -and (Test-Path -LiteralPath $mf) -and ($touch.ContainsKey('MANIFEST.sha256') -or $after.ContainsKey('MANIFEST.sha256'))) {
    $lines = @(Get-Content -LiteralPath $mf -Encoding UTF8)
    $out = @()
    foreach ($ln in $lines) {
        $drop = $false; foreach ($n in $codeNames) { if ($ln -match ('^[0-9a-f]{64}  ' + [regex]::Escape($n) + '$')) { $drop = $true } }
        if ($drop) { continue }
        foreach ($k in $editline.Keys) { if ($ln -eq ($editline[$k][1] + '  ' + $k) -and (Sha (Abs $k)) -eq $pre[$k]) { $ln = $editline[$k][0] + '  ' + $k } }
        $out += $ln
    }
    [IO.File]::WriteAllText($mf, (($out -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
    if ((Sha $mf) -eq $pre['MANIFEST.sha256']) { Write-Host 'MANIFEST.sha256: v4 lines taken out; the file is byte-identical to before v4' }
    else { Note 'MANIFEST.sha256 differs from before v4 only because it was changed legitimately after the install (for example a rebuild). Only the v4 lines were taken out; your later changes were kept.' }
    $mb = $mf + '.pre-v4'; if (Test-Path -LiteralPath $mb) { Remove-Item -LiteralPath $mb -Force }
}
if (-not ($touch.ContainsKey('MANIFEST.sha256') -or $after.ContainsKey('MANIFEST.sha256'))) { $mb = $mf + '.pre-v4'; if (Test-Path -LiteralPath $mb) { Remove-Item -LiteralPath $mb -Force } }
# 3. stubs, empty folders
foreach ($s in $stubs) { if (Test-Path -LiteralPath $s) { Remove-Item -LiteralPath $s -Force; Write-Host ('removed stub ' + $s) } }
$dataDir = Join-Path $LiveDir 'data'
if ((Test-Path -LiteralPath $dataDir -PathType Container) -and @(Get-ChildItem -LiteralPath $dataDir -Force).Count -eq 0) { Remove-Item -LiteralPath $dataDir -Force }
# 4. audit: every tracked file against the record, and v3 against its fingerprints
$exact = 0; $total = 0
foreach ($rel in @($pre.Keys | Sort-Object)) {
    $total++; $p = Abs $rel; $cur = if (Test-Path -LiteralPath $p -PathType Leaf) { Sha $p } else { 'absent' }
    if ($cur -eq $pre[$rel]) { $exact++ } else { Write-Host ('AUDIT: ' + $rel + ' is not byte-identical to before v4 (see the notes).') }
}
$bad = $false
foreach ($v in $v3) {
    $f = Abs $v[0]
    if ((Test-Path -LiteralPath $f) -and (Sha $f) -eq $v[1]) { Write-Host ('v3 check OK (same SHA256 as before v4): ' + $v[0]) } else { $bad = $true; Write-Host ('v3 check FAILED: ' + $v[0]) }
}
# read-only manifest check (does not write vtes-verify.js)
if (Test-Path -LiteralPath $mf) {
    $chk = 0; $prob = @()
    foreach ($ln in @(Get-Content -LiteralPath $mf -Encoding UTF8)) { if ($ln -match '^([0-9a-f]{64})  (.+)$') { $chk++; $f = Abs $Matches[2]; if (-not (Test-Path -LiteralPath $f) -or (Sha $f) -ne $Matches[1]) { $prob += $Matches[2] } } }
    if ($prob.Count -eq 0) { Write-Host ('manifest check (read-only): OK, ' + $chk + ' code files match') } else { Write-Host ('manifest check (read-only): PROBLEM with ' + ($prob -join ', ')); $bad = $true }
}
Remove-Item -LiteralPath $record -Force
Remove-Item -LiteralPath (Join-Path $rbDir 'ROLLBACK-v4.ps1') -Force -ErrorAction SilentlyContinue
if ((Test-Path -LiteralPath $rbDir) -and @(Get-ChildItem -LiteralPath $rbDir -Force).Count -eq 0) { Remove-Item -LiteralPath $rbDir -Force }
if ($bad) { Write-Host 'ROLLED BACK, but a check failed (see above): tell the desktop executor.'; exit 4 }
if ($exact -eq $total -and $notes.Count -eq 0) { Write-Host ('v4 rolled back. Every file v4 or its helpers could touch is byte-identical to before v4 (' + $exact + ' of ' + $total + '). v3 is exactly as it was.'); exit 0 }
Write-Host ('v4 rolled back WITH NOTES: ' + $exact + ' of ' + $total + ' tracked files are byte-identical to before v4; the others are explained in the notes above.')
exit 0
