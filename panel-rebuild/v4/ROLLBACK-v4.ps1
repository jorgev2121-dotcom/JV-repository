# ROLLBACK-v4.ps1 - removes what INSTALL-v4.ps1 created, and ONLY that. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032). Fix round 3.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File ROLLBACK-v4.ps1 -NewDir "<parent of v3>\vtes-panel-v4" [-DryRun]
# It reads <NewDir>\v4-install-record.txt (INSTALL wrote it before it copied anything), PRINTS every file, folder and stub it is going to remove, then removes
# exactly those. It refuses anything the record does not list: a path outside the new folder, a path with .. in it, a record that names a different folder.
# A file that is in the new folder but NOT in the record is never touched, and then the folder itself stays. It never reads, writes or deletes anything in the v3 folder.
# Exit codes: 0 rolled back completely, 2 no folder or no record, 3 the record is not trustworthy (nothing removed), 4 removed what the record lists but something else is left.
param([string]$NewDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$SEP = [IO.Path]::DirectorySeparatorChar
function Sha([string]$p) { try { return (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() } catch { return 'unreadable' } }
function Real-Path([string]$p) {
    $full = [IO.Path]::GetFullPath($p)
    for ($round = 0; $round -lt 40; $round++) {
        $root = [IO.Path]::GetPathRoot($full)
        $parts = @($full.Substring($root.Length).Split(@([char]'\', [char]'/'), [StringSplitOptions]::RemoveEmptyEntries))
        $cur = $root; $moved = $false
        for ($i = 0; $i -lt $parts.Count; $i++) {
            $next = Join-Path $cur $parts[$i]
            $item = Get-Item -LiteralPath $next -Force -ErrorAction SilentlyContinue
            if ($item -and ($item.LinkType -eq 'SymbolicLink' -or $item.LinkType -eq 'Junction')) {
                $t = $item.Target; if ($t -is [array]) { $t = $t[0] }
                if (-not [IO.Path]::IsPathRooted([string]$t)) { $t = Join-Path $cur ([string]$t) }
                $new = [string]$t
                for ($j = $i + 1; $j -lt $parts.Count; $j++) { $new = Join-Path $new $parts[$j] }
                $full = [IO.Path]::GetFullPath($new); $moved = $true; break
            }
            $cur = $next
        }
        if (-not $moved) { return $full }
    }
    throw ('too many links while resolving ' + $p)
}
function Refuse([string]$why) { Write-Host ('REFUSED: ' + $why + ' NOTHING WAS REMOVED.'); exit 3 }

if ($NewDir -eq '') { Write-Host 'STOP: ROLLBACK requires -NewDir "<parent of v3>\vtes-panel-v4". Nothing was removed.'; exit 2 }
if (-not (Test-Path -LiteralPath $NewDir -PathType Container)) { Write-Host ('STOP: folder not found: ' + $NewDir + '. Nothing was removed.'); exit 2 }
$real = (Real-Path $NewDir).TrimEnd([char]'\', [char]'/')
$record = Join-Path $real 'v4-install-record.txt'
if (-not (Test-Path -LiteralPath $record -PathType Leaf)) {
    Write-Host ('STOP: ' + $real + ' has no v4-install-record.txt, so I cannot tell what INSTALL created there. THIS ROLLBACK CHANGED NOTHING. (A folder that is not in a record is never removed.)')
    exit 2
}
$recNew = $null; $files = New-Object System.Collections.Generic.List[string]; $dirs = New-Object System.Collections.Generic.List[string]; $stubs = New-Object System.Collections.Generic.List[string]
foreach ($l in @(Get-Content -LiteralPath $record)) {
    if ($l -eq '') { continue }
    $i = $l.IndexOf('|'); if ($i -lt 1) { Refuse ('the record has a line I cannot read: ' + $l + '.') }
    $kind = $l.Substring(0, $i); $val = $l.Substring($i + 1)
    switch ($kind) {
        'NEWDIR' { $recNew = $val }
        'FILE'   { $files.Add($val) }
        'DIR'    { $dirs.Add($val) }
        'STUB'   { $stubs.Add($val) }
        default  { }
    }
}
if (-not $recNew) { Refuse 'the record does not name the folder it belongs to.' }
if ((Real-Path $recNew).TrimEnd([char]'\', [char]'/') -ne $real) { Refuse ('the record belongs to ' + $recNew + ', not to ' + $real + '.') }
# every listed path must be a plain relative path that stays inside the new folder
$okName = '^[A-Za-z0-9._-]+([\\/][A-Za-z0-9._-]+)*$'
foreach ($rel in @($files + $dirs)) {
    if ($rel -notmatch $okName -or $rel -match '(^|[\\/])\.\.($|[\\/])') { Refuse ('the record lists a path that is not a plain path inside the new folder: ' + $rel + '.') }
}
foreach ($st in $stubs) {
    if ((Split-Path -Leaf $st) -notmatch '^Rollback_Panel-v4_[0-9_-]+\.ps1$' -or (Split-Path -Leaf (Split-Path -Parent $st)) -ne 'Undo_Manifests') { Refuse ('the record lists a stub that is not a Rollback_Panel-v4 file in an Undo_Manifests folder: ' + $st + '.') }
}
function Abs([string]$rel) { return (Join-Path $real ($rel -replace '[\\/]', [string]$SEP)) }
$toRemove = @($files | Where-Object { Test-Path -LiteralPath (Abs $_) -PathType Leaf })
Write-Host ('Rollback of ' + $real + '. The record lists ' + $files.Count + ' file(s), ' + $dirs.Count + ' sub-folder(s), ' + $stubs.Count + ' stub(s).')
Write-Host 'I WILL REMOVE (and nothing else):'
foreach ($f in $toRemove) { Write-Host ('  file   ' + (Abs $f)) }
foreach ($d in $dirs) { if (Test-Path -LiteralPath (Abs $d) -PathType Container) { Write-Host ('  folder ' + (Abs $d) + ' (only if empty afterwards)') } }
foreach ($st in $stubs) { if (Test-Path -LiteralPath $st -PathType Leaf) { Write-Host ('  stub   ' + $st) } }
Write-Host ('  folder ' + $real + ' (only if empty afterwards)')
$listed = @{}; foreach ($f in $files) { $listed[(($f -replace '[\\/]', '/')).ToLower()] = $true }; foreach ($d in $dirs) { $listed[(($d -replace '[\\/]', '/')).ToLower()] = $true }
if ($DryRun) { Write-Host 'DRY RUN: nothing was removed.'; exit 0 }
foreach ($f in $toRemove) { Remove-Item -LiteralPath (Abs $f) -Force; Write-Host ('removed ' + $f) }
foreach ($st in $stubs) { if (Test-Path -LiteralPath $st -PathType Leaf) { Remove-Item -LiteralPath $st -Force; Write-Host ('removed stub ' + $st) } }
foreach ($d in @($dirs | Sort-Object -Descending)) {
    $p = Abs $d
    if (Test-Path -LiteralPath $p -PathType Container) {
        if (@(Get-ChildItem -LiteralPath $p -Force).Count -eq 0) { Remove-Item -LiteralPath $p -Force; Write-Host ('removed folder ' + $d) } else { Write-Host ('kept folder ' + $d + ' (something that is not in the record is inside)') }
    }
}
# what is left in the new folder? Anything left was not created by INSTALL (it is not in the record) and is not touched.
$left = @(Get-ChildItem -LiteralPath $real -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName.Substring($real.Length + 1) })
if ($left.Count -eq 0) {
    Remove-Item -LiteralPath $real -Force; Write-Host ('removed folder ' + $real)
    Write-Host 'v4 rolled back completely: the new folder and everything INSTALL put in it are gone. The v3 folder was never written to by v4 and was not touched by this rollback.'
    exit 0
}
Write-Host ('LEFT IN PLACE (not in the record, so not removed): ' + ($left -join ', '))
Write-Host ('v4 rolled back, but the folder ' + $real + ' stays because of the files above. Tell the desktop executor.')
exit 4
