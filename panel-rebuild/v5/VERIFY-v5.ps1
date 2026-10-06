# VERIFY-v5.ps1 - READ-ONLY check of an installed copy of the launcher v5 package. TRK-2026-9910-B (fix round 4). ASCII only.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File VERIFY-v5.ps1 -Path "C:\full\path\of\the\folder" [-ExpectManifestSha256 <64 hex>]
#
# What it does: reads MANIFEST.sha256 inside the folder, recomputes the SHA-256 of every file the manifest lists, and prints either
#   OK ...                    (every file is there, readable, identical, and nothing else is in the folder), or
#   PROBLEMS (n) and one line per difference: MISSING, EDITED, UNREADABLE, EXTRA FILE, EXTRA FOLDER, LINK, BAD MANIFEST LINE, ...
# What it never does: this script contains no command that writes, copies, moves or deletes anything (a test, V30b, scans this source for such commands). It only opens files for reading.
# It cannot speak for PowerShell itself: the PowerShell program may keep its own cache files outside the checked folder (flaw N18). The checked folder, its parent and the Desktop were identical before and after in every test run.
# A file it cannot read or cannot hash is a PROBLEM (UNREADABLE). It is never counted as identical.
# Exit codes: 0 = OK, 1 = at least one problem, 2 = it could not even start (no full path, folder missing, manifest missing or unreadable).
# Data files (data\vtes5-*.js) are expected to change once a PC writer has started writing them; they are reported as EDITED like any other file, tagged (data file).
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
try { $manLines = [IO.File]::ReadAllLines($manPath) } catch { Stop-Early ('MANIFEST.sha256 cannot be read: ' + $_.Exception.Message) }
try { $manSha = Get-Sha $manPath } catch { Stop-Early ('MANIFEST.sha256 cannot be hashed: ' + $_.Exception.Message) }
Write-Host ('Folder: ' + $root)
Write-Host ('MANIFEST.sha256 SHA-256: ' + $manSha)
if ($ExpectManifestSha256 -ne '') {
    if ($manSha -ne $ExpectManifestSha256.ToLower()) { $problems.Add('MANIFEST CHANGED: its SHA-256 is ' + $manSha + ' but the order expects ' + $ExpectManifestSha256.ToLower() + ' (so the manifest itself is not the one from the package)') }
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

# 4. every listed file: present, a plain file, readable, identical
$okCount = 0
foreach ($rel in $entries.Keys) {
    $tag = ''; if ($rel -like 'data/*') { $tag = ' (data file)' }
    $full = Join-Path $root ($rel.Replace('/', [string][IO.Path]::DirectorySeparatorChar))
    try {
        $it = Get-Item -LiteralPath $full -Force -ErrorAction Stop
    } catch {
        $problems.Add('MISSING: ' + $rel + $tag + ' (not in the folder, or not reachable: ' + $_.Exception.GetType().Name + ')'); continue
    }
    if ($it.PSIsContainer) { $problems.Add('NOT A FILE: ' + $rel + ' is a folder'); continue }
    if ($it.Attributes -band [IO.FileAttributes]::ReparsePoint) { $problems.Add('LINK: ' + $rel + ' is a link, not a plain file (not followed)'); continue }
    try { $got = Get-Sha $full } catch { $problems.Add('UNREADABLE: ' + $rel + $tag + ' cannot be read, so it cannot be checked (' + $_.Exception.GetType().Name + ')'); continue }
    if ($got -ne $entries[$rel]) { $problems.Add('EDITED: ' + $rel + $tag + ' has SHA-256 ' + $got + ' but the manifest says ' + $entries[$rel]); continue }
    $okCount++
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
    Write-Host ('OK: all ' + $okCount + ' of ' + $entries.Count + ' package files are present, readable and identical (SHA-256), and nothing else is in the folder.')
    Write-Host 'This script contains no write command.'
    exit 0
}
Write-Host ('PROBLEMS (' + $problems.Count + '); ' + $okCount + ' of ' + $entries.Count + ' package files are identical:')
foreach ($p in $problems) { Write-Host ('  ' + $p) }
Write-Host 'This script contains no write command, so it changed nothing in the folder.'
exit 1
