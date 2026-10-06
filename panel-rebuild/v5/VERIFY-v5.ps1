# VERIFY-v5.ps1 - READ-ONLY check of an installed copy of the launcher v5 package. TRK-2026-9910-B (fix round 6). ASCII only.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File VERIFY-v5.ps1 -Path "C:\full\path\of\the\folder" [-ExpectManifestSha256 <64 hex>]
#
# What it does: reads MANIFEST.sha256 inside the folder, recomputes the SHA-256 of every file the manifest lists, and prints either
#   OK ...                    (every file is there and readable, every page and script file is identical, any data or settings file a PC writer rewrote is listed as expected, and nothing else is in the folder), or
#   PROBLEMS (n) and one line per difference: MISSING, EDITED, UNREADABLE, EXTRA FILE, EXTRA FOLDER, LINK, BAD MANIFEST LINE, ...
# What it never does: this script contains no command that writes, copies, moves or deletes anything (a test, V30b, scans this source for such commands). It only opens files for reading.
# It cannot speak for PowerShell itself: the PowerShell program may keep its own cache files outside the checked folder (flaw N18). The checked folder, its parent and the Desktop were identical before and after in every test run.
# A file it cannot read or cannot hash is a PROBLEM (UNREADABLE). It is never counted as identical.
# Exit codes: 0 = OK, 1 = at least one problem, 2 = it could not even start (no full path, folder missing, manifest missing or unreadable).
# Fix round 6 (flaw 11): exactly EIGHT files are expected to change once a PC writer starts: the seven data files data/vtes5-*.js and the settings file vtes5-config.js (list in DATA-CONTRACT.md,
# 'Files that change by design'). A change to one of them is printed as "EDITED (data file) - expected" and does NOT make the answer PROBLEMS. A change to any other file is a problem.
# Fix round 6 (flaw 5): the folder itself, and every folder above it, is checked for being a link, junction or symbolic link. One found is a PROBLEM (LINK IN PATH). Still read-only: it only looks.
# Fix round 6 (flaw 12): a file that differs ONLY because its line endings are Windows style (CRLF) is reported as one plain sentence naming that cause (LINE ENDINGS CHANGED (CRLF)), not as many EDITED lines.
param(
    [Parameter(Mandatory = $true)][string]$Path,
    [string]$ExpectManifestSha256 = ''
)
Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'
$isUnix = ([IO.Path]::DirectorySeparatorChar -eq '/')
$problems = New-Object System.Collections.Generic.List[string]

function Stop-Early([string]$why) {
    Write-Host ('CANNOT CHECK: ' + $why)
    Write-Host 'This script contains no write command, so it changed nothing in the folder.'
    exit 2
}

# 1. a FULL path only. A short name would be resolved against whatever folder the program started in.
$isFull = ($Path -match '^[A-Za-z]:[\\/]') -or ($Path -match '^\\\\[^\\]') -or ($isUnix -and $Path.StartsWith('/'))
if (-not $isFull) { Stop-Early ('"' + $Path + '" is not a full path. Give the whole path, for example C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5') }
# flaw N19: "." and ".." in the path are refused with a plain sentence (they used to scramble the file names in the answer)
foreach ($seg in ($Path -split '[\\/]')) { if ($seg -eq '..' -or $seg -eq '.') { Stop-Early ('the path "' + $Path + '" contains "' + $seg + '". Give the plain full path with no "." or ".." in it') } }
$root = $Path.TrimEnd('\', '/')
if (-not (Test-Path -LiteralPath $root -PathType Container)) { Stop-Early ('the folder "' + $root + '" does not exist (or is not a folder)') }

# 2. the manifest
$manPath = Join-Path $root 'MANIFEST.sha256'
if (-not (Test-Path -LiteralPath $manPath -PathType Leaf)) { Stop-Early ('MANIFEST.sha256 is missing from "' + $root + '"') }
function Get-Sha([string]$file) {
    $fs = $null; $sha = $null
    try {
        $fs = New-Object System.IO.FileStream($file, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        $sha = [System.Security.Cryptography.SHA256]::Create()
        $b = $sha.ComputeHash($fs)
        return (($b | ForEach-Object { $_.ToString('x2') }) -join '')
    } finally {
        if ($sha) { $sha.Dispose() }
        if ($fs) { $fs.Dispose() }
    }
}
# the SHA-256 the file would have with LF line endings (every CR that is followed by an LF is left out, in memory only): used only to name the CRLF cause
function Get-ShaLf([string]$file) {
    $bytes = [IO.File]::ReadAllBytes($file)
    $keep = New-Object System.Collections.Generic.List[byte]
    for ($i = 0; $i -lt $bytes.Length; $i++) {
        if ($bytes[$i] -eq 13 -and ($i + 1) -lt $bytes.Length -and $bytes[$i + 1] -eq 10) { continue }
        $keep.Add($bytes[$i])
    }
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try { $b = $sha.ComputeHash($keep.ToArray()) } finally { $sha.Dispose() }
    return (($b | ForEach-Object { $_.ToString('x2') }) -join '')
}
try { $manLines = [IO.File]::ReadAllLines($manPath) } catch { Stop-Early ('MANIFEST.sha256 cannot be read: ' + $_.Exception.Message) }
try { $manSha = Get-Sha $manPath } catch { Stop-Early ('MANIFEST.sha256 cannot be hashed: ' + $_.Exception.Message) }
Write-Host ('Folder: ' + $root)
Write-Host ('MANIFEST.sha256 SHA-256: ' + $manSha)
if ($ExpectManifestSha256 -ne '') {
    if ($manSha -ne $ExpectManifestSha256.ToLower()) {
        $manLf = ''; try { $manLf = Get-ShaLf $manPath } catch { $manLf = '' }
        if ($manLf -eq $ExpectManifestSha256.ToLower()) { $problems.Add('LINE ENDINGS CHANGED (CRLF): MANIFEST.sha256 differs from the package ONLY because its line endings are Windows style (CRLF) instead of LF. Its words are right, but it is not the file from the package (see the same sentence below).') }
        else { $problems.Add('MANIFEST CHANGED: its SHA-256 is ' + $manSha + ' but the order expects ' + $ExpectManifestSha256.ToLower() + ' (so the manifest itself is not the one from the package)') }
    }
}

# 3. parse the manifest strictly
$entries = [ordered]@{}
$n = 0
foreach ($line in $manLines) {
    $n++
    if ($line.Trim() -eq '') { continue }
    if ($line -notmatch '^([0-9a-f]{64})  (.+)$') { $problems.Add('BAD MANIFEST LINE ' + $n + ': not "<64 hex>  <path>"'); continue }
    $h = $Matches[1]; $rel = $Matches[2]
    $segs = $rel.Split('/')
    if ($rel -match '^[A-Za-z]:' -or $rel.StartsWith('/') -or $rel.Contains('\') -or ($segs -contains '..') -or ($segs -contains '.') -or ($segs -contains '')) {
        $problems.Add('BAD MANIFEST LINE ' + $n + ': the path "' + $rel + '" is not a plain relative path inside the folder (not checked)'); continue
    }
    if ($rel -eq 'MANIFEST.sha256') { $problems.Add('BAD MANIFEST LINE ' + $n + ': the manifest lists itself'); continue }
    if ($entries.Contains($rel)) { $problems.Add('BAD MANIFEST LINE ' + $n + ': "' + $rel + '" is listed twice'); continue }
    $entries[$rel] = $h
}
if ($entries.Count -eq 0) { $problems.Add('BAD MANIFEST: it lists no files') }

# 4. every listed file: present, a plain file, readable, identical. Exactly these eight may legitimately change once a PC writer starts (DATA-CONTRACT.md, "Files that change by design").
$expectedEdit = @{
    'data/vtes5-heartbeat.js' = 'data file'; 'data/vtes5-bots.js' = 'data file'; 'data/vtes5-state.js' = 'data file'; 'data/vtes5-health.js' = 'data file';
    'data/vtes5-tokens.js' = 'data file'; 'data/vtes5-housekeeping.js' = 'data file'; 'data/vtes5-miamidade.js' = 'data file'; 'vtes5-config.js' = 'settings file'
}
$okCount = 0
$expectedList = New-Object System.Collections.Generic.List[string]
$crlf = New-Object System.Collections.Generic.List[string]
foreach ($rel in $entries.Keys) {
    $tag = ''; if ($expectedEdit.ContainsKey($rel)) { $tag = ' (' + $expectedEdit[$rel] + ')' }
    $full = Join-Path $root ($rel.Replace('/', [string][IO.Path]::DirectorySeparatorChar))
    try {
        $it = Get-Item -LiteralPath $full -Force -ErrorAction Stop
    } catch {
        $problems.Add('MISSING: ' + $rel + $tag + ' (not in the folder, or not reachable: ' + $_.Exception.GetType().Name + ')'); continue
    }
    if ($it.PSIsContainer) { $problems.Add('NOT A FILE: ' + $rel + ' is a folder'); continue }
    if ($it.Attributes -band [IO.FileAttributes]::ReparsePoint) { $problems.Add('LINK: ' + $rel + ' is a link, not a plain file (not followed)'); continue }
    try { $got = Get-Sha $full } catch { $problems.Add('UNREADABLE: ' + $rel + $tag + ' cannot be read, so it cannot be checked (' + $_.Exception.GetType().Name + ')'); continue }
    if ($got -ne $entries[$rel]) {
        if ($expectedEdit.ContainsKey($rel)) { $expectedList.Add('EDITED' + $tag + ' - expected: ' + $rel + ' was rewritten by a PC writer (SHA-256 ' + $got + ')'); continue }
        $lf = ''; try { $lf = Get-ShaLf $full } catch { $lf = '' }
        if ($lf -eq $entries[$rel]) { $crlf.Add($rel); continue }
        $problems.Add('EDITED: ' + $rel + $tag + ' has SHA-256 ' + $got + ' but the manifest says ' + $entries[$rel]); continue
    }
    $okCount++
}
if ($crlf.Count -gt 0) {
    $problems.Add('LINE ENDINGS CHANGED (CRLF): ' + $crlf.Count + ' file(s) differ from the package ONLY because their line endings are Windows style (CRLF) instead of the package''s LF: ' + ($crlf -join ', ') + '. The usual cause is git for Windows (core.autocrlf = true) converting the files when they were checked out, or a tool re-saving them. The words in the files are not wrong, but the folder is not the package. Get the exact bytes again (INSTALL-BY-HAND.md, Section A, step 6). Do not edit these files.')
}

# 5. anything in the folder that the manifest does not list
$listed = @{}
foreach ($rel in $entries.Keys) { $listed[$rel] = $true }
$listedDirs = @{}
foreach ($rel in $entries.Keys) { $parts = $rel.Split('/'); for ($i = 1; $i -lt $parts.Length; $i++) { $listedDirs[($parts[0..($i - 1)] -join '/')] = $true } }
try {
    $all = @(Get-ChildItem -LiteralPath $root -Recurse -Force -ErrorAction Stop)
} catch {
    $all = @(); $problems.Add('UNREADABLE FOLDER: the folder list could not be read completely, so "nothing extra is in it" cannot be proven (' + $_.Exception.GetType().Name + ')')
}
$rootFull = [IO.Path]::GetFullPath($root).TrimEnd('\', '/')
foreach ($it in $all) {
    $itFull = [IO.Path]::GetFullPath($it.FullName)
    if (-not $itFull.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) { $problems.Add('PATH MISMATCH: ' + $it.FullName + ' does not start with ' + $rootFull + ' (not checked)'); continue }
    $rel = $itFull.Substring($rootFull.Length).TrimStart('\', '/').Replace('\', '/')
    if ($rel -eq 'MANIFEST.sha256') { continue }
    $isLink = [bool]($it.Attributes -band [IO.FileAttributes]::ReparsePoint)
    if ($it.PSIsContainer) {
        if ($isLink) { $problems.Add('LINK: the folder ' + $rel + ' is a link (not followed, not in the manifest)'); continue }
        if (-not $listedDirs.ContainsKey($rel)) { $problems.Add('EXTRA FOLDER: ' + $rel + ' is not part of the package') }
    } else {
        if (-not $listed.ContainsKey($rel)) {
            if ($isLink) { $problems.Add('LINK: ' + $rel + ' is a link and is not in the manifest') } else { $problems.Add('EXTRA FILE: ' + $rel + ' is not part of the package') }
        }
    }
}

# 5a. flaw 5 (fix round 6): the folder, and every folder above it, must not be a link, junction or symbolic link (the files would really live somewhere else, for example on the Desktop or in a git checkout)
$walk = $root
while ($true) {
    $wi = $null
    try { $wi = Get-Item -LiteralPath $walk -Force -ErrorAction Stop } catch { break }
    if ($wi.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        $tgt = ''; try { $tgt = (@($wi.Target) -join ' ') } catch { $tgt = '' }
        if ($tgt -eq '') { $tgt = 'a place this script could not read' }
        $who = 'the parent folder ' + $walk; if ($walk -eq $root) { $who = 'the folder itself' }
        $problems.Add('LINK IN PATH: ' + $who + ' is a link or junction (it points to ' + $tgt + '), so the files may really live somewhere else, for example on the Desktop or inside a git checkout. Not followed. Use a real folder path.')
    }
    $wp = [IO.Path]::GetDirectoryName($walk)
    if ([string]::IsNullOrEmpty($wp) -or $wp -eq $walk) { break }
    $walk = $wp
}

# 5b. flaw N5: is this folder in a place it must never be? (read-only: it only looks)
if ($root -match '[\\/]Desktop([\\/]|$)') { $problems.Add('WRONG PLACE: the folder is inside a Desktop folder. The Desktop is a launchpad, never storage.') }
$up = $root
while ($true) {
    $parent = [IO.Path]::GetDirectoryName($up)
    if ([string]::IsNullOrEmpty($parent) -or $parent -eq $up) { break }
    if (Test-Path -LiteralPath (Join-Path $parent '.git')) { $problems.Add('WRONG PLACE: the folder is inside a git checkout (found .git in ' + $parent + ')'); break }
    $up = $parent
}

# 6. the answer
if ($problems.Count -eq 0) {
    if ($expectedList.Count -eq 0) {
        Write-Host ('OK: all ' + $okCount + ' of ' + $entries.Count + ' package files are present, readable and identical (SHA-256), and nothing else is in the folder.')
    } else {
        Write-Host ('OK: all ' + $entries.Count + ' of ' + $entries.Count + ' package files are present and readable. ' + $okCount + ' page and script files are identical (SHA-256). ' + $expectedList.Count + ' data or settings file(s) were rewritten by a PC writer, which is expected (listed below). Nothing else is in the folder.')
        foreach ($e in $expectedList) { Write-Host ('  ' + $e) }
    }
    Write-Host 'This script contains no write command.'
    exit 0
}
Write-Host ('PROBLEMS (' + $problems.Count + '); ' + $okCount + ' of ' + $entries.Count + ' package files are identical:')
foreach ($p in $problems) { Write-Host ('  ' + $p) }
foreach ($e in $expectedList) { Write-Host ('  (expected, not a problem) ' + $e) }
Write-Host 'This script contains no write command, so it changed nothing in the folder.'
exit 1
