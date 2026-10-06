# INSTALL-v5.ps1 - puts the VTES launcher v5 in a NEW folder that you name. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032).
# DESIGN (Tier 2, charter Rule 4): v5 never writes inside the folder that holds Jorge's real v3 launcher (the Desktop is a launchpad, never storage). It only READS that folder:
# it fingerprints the files in it (SHA-256) before and after, as evidence. It never edits, moves or deletes any existing file, and it never touches any manifest.
# Run by the desktop executor, not by Jorge. Usage (from the folder that holds this file):
#   powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v5.ps1 -TargetDir "G:\My Drive\MY-DESK\VTES-PANEL\v5" [-V3File "C:\Users\JV\Desktop\VTES-LLM-LAUNCHER_v3.html"] [-StatusDir "<folder holding vtes-status.js>"] [-DryRun]
# -TargetDir is REQUIRED: the NEW folder to create. It must not exist. This script never picks a folder by itself.
# -V3File is optional but recommended: the real v3 launcher. It is only read: its SHA-256 and the SHA-256 of every file directly in its folder are compared before and after.
# -StatusDir is optional: a folder that holds vtes-status.js (the old status-only writer's file). The page reads it, never writes there. Without it the page does not look for that file.
# What it does:
#  1. checks: the new folder does not exist; neither it nor its parent (real path, links and junctions followed, AND the path as typed) is inside a git checkout; it is not inside the v3 folder.
#  2. creates the new folder, writes the install record in it FIRST (v5-install-record.txt: every folder and file it is about to create), copies the package in, and writes vtes5-config.js.
#  3. checks that every copied file has the same SHA-256 as its source, and that every file directly in the v3 folder has the same SHA-256 as before.
# Undo: ROLLBACK-v5.ps1 -NewDir "<the new folder>" (removes only what the record lists).
# TEST-ONLY hook: the environment variable VTES5_TEST_FAIL_BEFORE=<package file name> makes the copy stop right before that file (to prove a half-failed install can be undone). Unset in real use.
param([string]$TargetDir = '', [string]$V3File = '', [string]$StatusDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Now  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$UP   = $env:USERPROFILE; if (-not $UP) { $UP = $HOME }
$SEP  = [IO.Path]::DirectorySeparatorChar
$REAL_V3_SHA = '28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3'
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
# text file encoding: plain ASCII when the text is pure ASCII (always true for the package), UTF-8 with a byte-order mark otherwise (a folder name with an accent), so the path survives
function Enc([string]$t) { foreach ($c in $t.ToCharArray()) { if ([int]$c -gt 126) { return (New-Object Text.UTF8Encoding($true)) } }; return (New-Object Text.ASCIIEncoding) }
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


if ($TargetDir -eq '') { Stop-Here 'INSTALL requires -TargetDir "the NEW folder to create". It never picks a folder by itself.' 2 }
$typed = [IO.Path]::GetFullPath($TargetDir).TrimEnd([char]'\', [char]'/')
$leaf = Split-Path -Leaf $typed
$typedParent = Split-Path -Parent $typed
if ((-not $typedParent) -or (-not $leaf)) { Stop-Here ('the target ' + $typed + ' has no parent folder to be created in.') 2 }
if (-not (Test-Path -LiteralPath $typedParent -PathType Container)) { Stop-Here ('the parent folder ' + $typedParent + ' does not exist. Create it first or choose another place; this script creates only the one new folder.') 2 }
$realParent = (Real-Path $typedParent).TrimEnd([char]'\', [char]'/')
$NewDir = Join-Path $realParent $leaf
# the new folder must not exist (a link that points nowhere counts as existing)
if ([IO.Directory]::Exists($typed) -or [IO.File]::Exists($typed) -or (Get-Item -LiteralPath $typed -Force -ErrorAction SilentlyContinue)) {
    Stop-Here ($typed + ' already exists. v5 never installs into or over an existing folder. If it is an old v5 install, run ROLLBACK-v5.ps1 -NewDir "' + $typed + '" first; otherwise choose another name.') 2
}
# refuse anything inside a git checkout: the target as typed, and the real parent where the new folder would be created
foreach ($chk in @(@('the target as typed', $typed), @('the place the new folder would be created (real path)', $realParent))) {
    $gr = Git-Root $chk[1]
    if ($gr) { Stop-Here ($chk[0] + ' (' + $chk[1] + ') is inside a git checkout (found .git in ' + $gr + '). v5 will not install into a git working copy.') 2 }
    if (Git-Says-Inside $chk[1]) { Stop-Here ($chk[0] + ' (' + $chk[1] + ') is inside a git checkout (git says so). v5 will not install into a git working copy.') 2 }
}
# the real v3 launcher (optional): only read
$v3Dir = $null; $v3Name = $null; $v3Sha = $null
if ($V3File -ne '') {
    if (-not (Test-Path -LiteralPath $V3File -PathType Leaf)) { Stop-Here ('the v3 launcher file was not found: ' + $V3File + '.') 2 }
    $v3Full = (Real-Path $V3File); $v3Dir = (Split-Path -Parent $v3Full).TrimEnd([char]'\', [char]'/'); $v3Name = Split-Path -Leaf $v3Full; $v3Sha = Sha $v3Full
    if (($NewDir.TrimEnd([char]'\', [char]'/') + $SEP).StartsWith($v3Dir + $SEP, [StringComparison]::OrdinalIgnoreCase)) { Stop-Here ('the new folder ' + $NewDir + ' would be inside the folder that holds the v3 launcher (' + $v3Dir + '). v5 never writes there. Choose a place outside it.') 2 }
}
if ($StatusDir -ne '' -and -not (Test-Path -LiteralPath $StatusDir -PathType Container)) { Stop-Here ('the status folder was not found: ' + $StatusDir + '.') 2 }

# package files (source relative to this script -> same path in the new folder)
$map = @('VTES-LLM-LAUNCHER_v5.html', 'vtes5-live.js', 'vtes5-ui.js',
         'data\vtes5-heartbeat.js', 'data\vtes5-bots.js', 'data\vtes5-state.js', 'data\vtes5-health.js', 'data\vtes5-tokens.js', 'data\vtes5-housekeeping.js', 'data\vtes5-miamidade.js')
foreach ($m in $map) { if (-not (Test-Path -LiteralPath (Join-Path $Here (Local $m)) -PathType Leaf)) { Stop-Here ('package file missing: ' + $m + '.') 3 } }
foreach ($m in $map) { try { $fs = [IO.File]::OpenRead((Join-Path $Here (Local $m))); $fs.Close() } catch { Stop-Here ('package file ' + $m + ' cannot be read: ' + $_.Exception.Message) 3 } }
$statusUrl = ''; if ($StatusDir -ne '') { $statusUrl = File-Url ((Real-Path $StatusDir).TrimEnd([char]'\', [char]'/')) }
$cfgText = '/* vtes5-config.js - written by INSTALL-v5.ps1 ' + $Now + '. TRK-2026-9910-B. status_dir_url: a folder holding vtes-status.js, read only (empty = the page does not look for it). */' + "`n" +
    'window.VTES5_CONFIG = { "status_dir_url": "' + (Js $statusUrl) + '", "written_by": "INSTALL-v5.ps1", "at": "' + $Now + '" };' + "`n"

function V3-Hashes {
    $h = @{}
    if ($v3Dir) { foreach ($f in @(Get-ChildItem -LiteralPath $v3Dir -File -Force -ErrorAction SilentlyContinue)) { $h[$f.Name] = Sha $f.FullName } }
    return $h
}
if ($DryRun) {
    Write-Host ('DRY RUN. New folder (does not exist now): ' + $NewDir)
    if ($v3Dir) { Write-Host ('  v3 launcher: ' + $v3Name + ' in ' + $v3Dir + ' (SHA256 ' + $v3Sha + ')') } else { Write-Host '  no -V3File given: the v3 folder will not be fingerprinted.' }
    Write-Host '  would create the new folder and in it:'
    foreach ($m in $map) { Write-Host ('    ' + $m) }
    Write-Host '    vtes5-config.js, v5-install-record.txt'
    Write-Host '  would write nothing inside the v3 folder.'
    Write-Host 'DRY RUN: nothing was changed.'; exit 0
}

# ---- the record is written FIRST and updated before every step, so a half-failed install can always be rolled back
$record = Join-Path $NewDir 'v5-install-record.txt'
$R = New-Object System.Collections.Generic.List[string]
function Rec-Save { $tmp = $record + '.tmp'; $txt = (($R.ToArray() -join "`n") + "`n"); [IO.File]::WriteAllText($tmp, $txt, (Enc $txt)); Move-Item -LiteralPath $tmp -Destination $record -Force }
$before = V3-Hashes
if ($v3Dir) {
    Write-Host ('v3 folder fingerprinted (read only): ' + $before.Count + ' files directly in ' + $v3Dir + ', SHA256 of each')
    if ($v3Sha -eq $REAL_V3_SHA) { Write-Host 'v3 launcher SHA256 equals the real v3 launcher this package was built from (28d3ed5e...).' }
    else { Write-Host 'NOTE: the v3 launcher SHA256 differs from the real v3 launcher this package was built from (28d3ed5e...). That is allowed (it may have been edited since); it is still not touched.' }
}
try {
    New-Item -ItemType Directory -Path $NewDir | Out-Null
    $R.Add('VERSION|1|record format 1 (v5)'); $R.Add('NEWDIR|' + $NewDir); $R.Add('STARTED|' + $Now)
    $R.Add('FILE|v5-install-record.txt'); Rec-Save
    Write-Host ('Record written first: ' + $record)
    $made = @{}
    foreach ($m in $map) {
        if ($env:VTES5_TEST_FAIL_BEFORE -eq $m) { throw ('test-only stop before ' + $m) }
        $dst = Join-Path $NewDir (Local $m); $dd = Split-Path -Parent $dst
        if ($dd -ne $NewDir -and -not $made.ContainsKey($dd)) { $R.Add('DIR|' + ($m.Split(@([char]'\'))[0])); Rec-Save; New-Item -ItemType Directory -Path $dd | Out-Null; $made[$dd] = $true }
        $R.Add('FILE|' + ($m -replace '\\', '/')); Rec-Save
        Copy-Item -LiteralPath (Join-Path $Here (Local $m)) -Destination $dst
        Write-Host ('COPY  ' + $m)
    }
    $R.Add('FILE|vtes5-config.js'); Rec-Save
    [IO.File]::WriteAllText((Join-Path $NewDir 'vtes5-config.js'), $cfgText, (New-Object Text.ASCIIEncoding))
    Write-Host 'WROTE vtes5-config.js'
    # charter: a rollback stub in Undo_Manifests when that folder exists (outside the new folder and the v3 folder; listed in the record)
    $undo = Join-Path $UP (Local 'OneDrive\Documents\Reports\Undo_Manifests')
    if (Test-Path -LiteralPath $undo -PathType Container) {
        $stubPath = Join-Path $undo ('Rollback_Panel-v5_' + $Now + '.ps1')
        $R.Add('STUB|' + $stubPath); Rec-Save
        $stub = @('# Rollback_Panel-v5_' + $Now + '.ps1 - runs the v5 rollback (removes only what the install record lists). ASCII only.', ('& "' + (Join-Path $Here 'ROLLBACK-v5.ps1') + '" -NewDir "' + $NewDir + '"'))
        $stxt = (($stub -join "`n") + "`n"); [IO.File]::WriteAllText($stubPath, $stxt, (Enc $stxt))
    }
    # ---- checks: every copied file equals its source; every file directly in the v3 folder equals what it was
    $bad = @()
    foreach ($m in $map) { if ((Sha (Join-Path $NewDir (Local $m))) -ne (Sha (Join-Path $Here (Local $m)))) { $bad += $m } }
    if ($bad.Count -gt 0) { throw ('copied file differs from its source: ' + ($bad -join ', ')) }
    Write-Host ('new folder check: ' + $map.Count + ' of ' + $map.Count + ' copied files have the same SHA256 as the package')
    $alarm = $false
    if ($v3Dir) {
        $after = V3-Hashes; $changed = @()
        foreach ($k in @(@($before.Keys) + @($after.Keys) | Sort-Object -Unique)) { if ($before[$k] -ne $after[$k]) { $changed += $k; if ($k -eq $v3Name) { $alarm = $true } } }
        if ($changed.Count -eq 0) { Write-Host ('v3 untouched: SHA256 of all ' + $before.Count + ' files in the v3 folder is identical before and after') }
        else {
            Write-Host ('NOTE: these v3-folder files differ between the start and the end of this run: ' + ($changed -join ', ') + '. INSTALL never writes in the v3 folder; another program may have changed them in between.')
            if ($alarm) { Write-Host 'ALARM: the v3 LAUNCHER file changed during the install. Stop and report this.' }
        }
    }
    $R.Add('DONE|' + $Now); Rec-Save
    if ($alarm) { exit 4 }
    Write-Host ('DONE. Open ' + (Join-Path $NewDir 'VTES-LLM-LAUNCHER_v5.html') + ' (a Desktop shortcut for it is a separate order for Jorge''s yes; leave the v3 file alone). Rollback: ' + (Join-Path $Here 'ROLLBACK-v5.ps1') + ' -NewDir "' + $NewDir + '"')
    Write-Host 'Every light is red NO DATA until the writers in DATA-CONTRACT.md exist. That is the true state.'
} catch {
    Write-Host ('FAILED part-way: ' + $_.Exception.Message)
    if (Test-Path -LiteralPath $record) { Write-Host ('The record was written BEFORE the first copy, so the rollback still works: ' + (Join-Path $Here 'ROLLBACK-v5.ps1') + ' -NewDir "' + $NewDir + '"') }
    else { Write-Host 'The new folder was not created, so there is nothing to roll back. The v3 folder was not touched.' }
    exit 5
}
