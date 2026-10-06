# INSTALL-v4.ps1 - puts VTES panel v4 in a NEW folder next to the v3 folder. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032). Fix round 3.
# DESIGN (Tier 2, charter Rule 4): v4 never writes inside the v3 folder. It does not touch v3's MANIFEST.sha256, does not run Verify-VtesPanel.ps1 and does not
# edit Write-VtesStatus.ps1. It only READS the v3 folder (to find the v3 launcher and to fingerprint every file before and after, as evidence).
# Run by the desktop executor, not by Jorge. Usage (from the folder that holds this file):
#   powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v4.ps1 -LiveDir "C:\path\to\the\v3\panel\folder" [-DryRun]
# -LiveDir is REQUIRED (the folder the Desktop shortcut for the v3 launcher really opens). This script never picks a folder by itself.
# What it does:
#  1. checks: the v3 folder exists and holds a v3 launcher; neither the v3 folder nor the place the new folder would go (real path, links and junctions
#     followed, AND the path as typed) is inside a git checkout; the new folder <parent of v3>\vtes-panel-v4 does NOT exist yet (if it does, STOP).
#  2. creates that new folder, writes the install record in it FIRST (v4-install-record.txt: every folder and file it is about to create), then copies
#     the package in, and writes vtes4-config.js holding the address of the v3 folder so v4 can read v3's vtes-status.js and vtes-reminders.js.
#  3. checks that every copied file has the same SHA256 as its source, and that every file in the v3 folder has the same SHA256 as before.
# Undo: ROLLBACK-v4.ps1 -NewDir "<parent of v3>\vtes-panel-v4" (removes only what the record lists).
# TEST-ONLY hook: the environment variable VTES4_TEST_FAIL_BEFORE=<package file name> makes the copy stop right before that file (to prove a half-failed install can be undone). Unset in real use.
param([string]$LiveDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Now  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$UP   = $env:USERPROFILE; if (-not $UP) { $UP = $HOME }
$SEP  = [IO.Path]::DirectorySeparatorChar
$NEWNAME = 'vtes-panel-v4'
function Sha([string]$p) { try { return (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() } catch { return 'unreadable' } }
function Local([string]$rel) { return ($rel -replace '[\\/]', [string]$SEP) }
function Stop-Here([string]$msg, [int]$code) { Write-Host ('STOP: ' + $msg + ' Nothing was changed.'); exit $code }

# the REAL path: every folder on the way that is a symbolic link or a junction is replaced by where it points (flaw F5)
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
# the folder that holds .git (a folder or a file), looking in the folder and every parent; $null when none
function Git-Root([string]$p) {
    $w = $p
    while ($w) {
        if (Test-Path -LiteralPath (Join-Path $w '.git')) { return $w }
        $par = Split-Path -Parent $w
        if ((-not $par) -or ($par -eq $w)) { break }
        $w = $par
    }
    return $null
}
# a second, independent question put to git itself (it also sees through drive aliases): true when git says the folder is inside a work tree
function Git-Says-Inside([string]$p) {
    $g = Get-Command git -ErrorAction SilentlyContinue
    if (-not $g) { return $false }
    $saved = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
    try { $o = & git -C $p rev-parse --is-inside-work-tree 2>$null } catch { $o = $null } finally { $ErrorActionPreference = $saved }
    return (@($o) -contains 'true')
}
function Js([string]$s) {
    $sb = New-Object Text.StringBuilder
    foreach ($c in $s.ToCharArray()) { $n = [int]$c; $cs = [string]$c
        if ($cs -eq '\') { [void]$sb.Append('\\') } elseif ($cs -eq '"') { [void]$sb.Append('\"') } elseif ($n -lt 32 -or $n -gt 126) { [void]$sb.Append('\u' + $n.ToString('x4')) } else { [void]$sb.Append($cs) } }
    return $sb.ToString()
}
function File-Url([string]$p) {
    if ($SEP -eq '\') { $p = $p.Replace('\', '/') }
    $enc = { param($rest) (@($rest.Split('/') | ForEach-Object { [Uri]::EscapeDataString($_) }) -join '/') }
    if ($p.StartsWith('//')) { $q = $p.TrimStart('/'); return ('file://' + (& $enc $q) + '/') }
    if ($p -match '^[A-Za-z]:') { return ('file:///' + $p.Substring(0, 2) + (& $enc $p.Substring(2)) + '/') }
    return ('file://' + (& $enc $p) + '/')
}

if ($LiveDir -eq '') { Stop-Here 'INSTALL requires -LiveDir "the v3 panel folder the Desktop shortcut really opens". It never picks a folder by itself.' 2 }
if (-not (Test-Path -LiteralPath $LiveDir -PathType Container)) { Stop-Here ('folder not found: ' + $LiveDir + '.') 2 }
$typed = [IO.Path]::GetFullPath($LiveDir).TrimEnd([char]'\', [char]'/')
$real  = (Real-Path $LiveDir).TrimEnd([char]'\', [char]'/')
$parent = Split-Path -Parent $real
if ((-not $parent) -or ($parent -eq $real)) { Stop-Here ('the v3 folder ' + $real + ' has no parent folder to put the new folder in.') 2 }
$NewDir = Join-Path $parent $NEWNAME
# refuse anything inside a git checkout: the typed path, the real path of the v3 folder, and the real parent where the new folder would go
foreach ($chk in @(@('the v3 folder as typed', $typed), @('the v3 folder (real path)', $real), @('the place the new folder would go (real path)', $parent))) {
    $gr = Git-Root $chk[1]
    if ($gr) { Stop-Here ($chk[0] + ' (' + $chk[1] + ') is inside a git checkout (found .git in ' + $gr + '). v4 will not install into a git working copy.') 2 }
    if (Git-Says-Inside $chk[1]) { Stop-Here ($chk[0] + ' (' + $chk[1] + ') is inside a git checkout (git says so). v4 will not install into a git working copy.') 2 }
}
# the real v3 launcher names: VTES-LLM-LAUNCHER*.html (repo names) and VTES-CONTROL-PANEL*.html (the name the retired Drive page points at)
$v3Present = @(Get-ChildItem -LiteralPath $real -File | Where-Object { ($_.Name -like 'VTES-LLM-LAUNCHER*.html' -or $_.Name -like 'VTES-CONTROL-PANEL*.html') -and $_.Name -notlike '*_v4*' -and $_.Name -notlike '*.bak*' } | ForEach-Object { $_.Name })
if ($v3Present.Count -eq 0) { Stop-Here 'no v3 launcher in that folder (looked for VTES-LLM-LAUNCHER*.html and VTES-CONTROL-PANEL*.html).' 2 }
# the new folder must not exist (a link that points nowhere counts as existing)
if ([IO.Directory]::Exists($NewDir) -or [IO.File]::Exists($NewDir) -or (Get-Item -LiteralPath $NewDir -Force -ErrorAction SilentlyContinue)) {
    Stop-Here ($NewDir + ' already exists. v4 never installs into or over an existing folder. If it is an old v4 install, run ROLLBACK-v4.ps1 -NewDir "' + $NewDir + '" first; otherwise choose by hand.') 2
}

# package files (source relative to this script -> same path in the new folder)
$map = @('VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js',
         'data\vtes4-heartbeat.js', 'data\vtes4-state.js', 'data\vtes4-health.js', 'data\vtes4-tokens.js', 'data\vtes4-housekeeping.js', 'data\vtes4-miamidade.js')
foreach ($m in $map) { if (-not (Test-Path -LiteralPath (Join-Path $Here (Local $m)) -PathType Leaf)) { Stop-Here ('package file missing: ' + $m + '.') 3 } }
foreach ($m in $map) { try { $fs = [IO.File]::OpenRead((Join-Path $Here (Local $m))); $fs.Close() } catch { Stop-Here ('package file ' + $m + ' cannot be read: ' + $_.Exception.Message) 3 } }
$cfgText = '/* vtes4-config.js - written by INSTALL-v4.ps1 ' + $Now + '. TRK-2026-9910-B. Where the v3 folder is, so v4 can read its vtes-status.js and vtes-reminders.js. v4 never writes there. */' + "`n" +
    'window.VTES4_CONFIG = { "v3_dir": "' + (Js $real) + '", "v3_dir_url": "' + (Js (File-Url $real)) + '", "written_by": "INSTALL-v4.ps1", "at": "' + $Now + '" };' + "`n"

function V3-Hashes {
    $h = @{}; $prefixLen = $real.Length + 1
    foreach ($f in @(Get-ChildItem -LiteralPath $real -Recurse -File -Force -ErrorAction SilentlyContinue)) { $h[$f.FullName.Substring($prefixLen)] = Sha $f.FullName }
    return $h
}
if ($DryRun) {
    Write-Host ('DRY RUN. v3 folder (real path): ' + $real + '. v3 launcher file(s): ' + ($v3Present -join ', '))
    Write-Host ('  would create the new folder ' + $NewDir + ' (it does not exist now) and in it:')
    foreach ($m in $map) { Write-Host ('    ' + $m) }
    Write-Host '    vtes4-config.js (the address of the v3 folder), v4-install-record.txt'
    Write-Host '  would write nothing inside the v3 folder.'
    Write-Host 'DRY RUN: nothing was changed.'; exit 0
}

# ---- the record is written FIRST and updated before every step, so a half-failed install can always be rolled back
$record = Join-Path $NewDir 'v4-install-record.txt'
$R = New-Object System.Collections.Generic.List[string]
function Rec-Save { $tmp = $record + '.tmp'; [IO.File]::WriteAllText($tmp, (($R.ToArray() -join "`n") + "`n"), (New-Object Text.ASCIIEncoding)); Move-Item -LiteralPath $tmp -Destination $record -Force }
$before = V3-Hashes
Write-Host ('v3 folder fingerprinted (read only): ' + $before.Count + ' files, SHA256 of each')
try {
    New-Item -ItemType Directory -Path $NewDir | Out-Null
    $R.Add('VERSION|3|record format 3'); $R.Add('NEWDIR|' + $NewDir); $R.Add('LIVEDIR|' + $real); $R.Add('STARTED|' + $Now)
    $R.Add('FILE|v4-install-record.txt'); Rec-Save
    Write-Host ('Record written first: ' + $record)
    $made = @{}
    foreach ($m in $map) {
        if ($env:VTES4_TEST_FAIL_BEFORE -eq $m) { throw ('test-only stop before ' + $m) }
        $dst = Join-Path $NewDir (Local $m); $dd = Split-Path -Parent $dst
        if ($dd -ne $NewDir -and -not $made.ContainsKey($dd)) { $R.Add('DIR|' + ($m.Split(@([char]'\'))[0])); Rec-Save; New-Item -ItemType Directory -Path $dd | Out-Null; $made[$dd] = $true }
        $R.Add('FILE|' + ($m -replace '\\', '/')); Rec-Save
        Copy-Item -LiteralPath (Join-Path $Here (Local $m)) -Destination $dst
        Write-Host ('COPY  ' + $m)
    }
    $R.Add('FILE|vtes4-config.js'); Rec-Save
    [IO.File]::WriteAllText((Join-Path $NewDir 'vtes4-config.js'), $cfgText, (New-Object Text.ASCIIEncoding))
    Write-Host 'WROTE vtes4-config.js (address of the v3 folder)'
    # charter: a rollback stub in Undo_Manifests when that folder exists (outside both folders; listed in the record)
    $undo = Join-Path $UP (Local 'OneDrive\Documents\Reports\Undo_Manifests')
    if (Test-Path -LiteralPath $undo -PathType Container) {
        $stubPath = Join-Path $undo ('Rollback_Panel-v4_' + $Now + '.ps1')
        $R.Add('STUB|' + $stubPath); Rec-Save
        $stub = @('# Rollback_Panel-v4_' + $Now + '.ps1 - runs the v4 rollback (removes only what the install record lists). ASCII only.', ('& "' + (Join-Path $Here 'ROLLBACK-v4.ps1') + '" -NewDir "' + $NewDir + '"'))
        [IO.File]::WriteAllText($stubPath, (($stub -join "`n") + "`n"), (New-Object Text.ASCIIEncoding))
    }
    # ---- checks: every copied file equals its source; every file in the v3 folder equals what it was
    $bad = @()
    foreach ($m in $map) { if ((Sha (Join-Path $NewDir (Local $m))) -ne (Sha (Join-Path $Here (Local $m)))) { $bad += $m } }
    if ($bad.Count -gt 0) { throw ('copied file differs from its source: ' + ($bad -join ', ')) }
    Write-Host ('new folder check: ' + $map.Count + ' of ' + $map.Count + ' copied files have the same SHA256 as the package')
    $after = V3-Hashes; $changed = @(); $alarm = $false
    foreach ($k in @(@($before.Keys) + @($after.Keys) | Sort-Object -Unique)) { if ($before[$k] -ne $after[$k]) { $changed += $k; foreach ($n in $v3Present) { if ($k -eq $n) { $alarm = $true } } } }
    if ($changed.Count -eq 0) { Write-Host ('v3 untouched: SHA256 of all ' + $before.Count + ' files in the v3 folder is identical before and after') }
    else {
        Write-Host ('NOTE: these v3 files differ between the start and the end of this run: ' + ($changed -join ', ') + '. INSTALL never writes in the v3 folder; a live writer of v3 (for example the status writer rewriting vtes-status.js) may have run in between.')
        if ($alarm) { Write-Host 'ALARM: a v3 LAUNCHER file changed during the install. Stop and report this.' }
    }
    $R.Add('DONE|' + $Now); Rec-Save
    if ($alarm) { exit 4 }
    Write-Host ('DONE. Open ' + (Join-Path $NewDir 'VTES-LLM-LAUNCHER_v4.html') + ' (add a second Desktop shortcut for it; leave the v3 shortcut alone). Rollback: ' + (Join-Path $Here 'ROLLBACK-v4.ps1') + ' -NewDir "' + $NewDir + '"')
    Write-Host 'Every light is red NO DATA until the writers in DATA-CONTRACT.md exist. That is the true state.'
} catch {
    Write-Host ('FAILED part-way: ' + $_.Exception.Message)
    if (Test-Path -LiteralPath $record) { Write-Host ('The record was written BEFORE the first copy, so the rollback still works: ' + (Join-Path $Here 'ROLLBACK-v4.ps1') + ' -NewDir "' + $NewDir + '"') }
    else { Write-Host 'The new folder was not created, so there is nothing to roll back. The v3 folder was not touched.' }
    exit 5
}
