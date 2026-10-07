# VERIFY-v5.ps1 - READ-ONLY check of an installed copy of the launcher v5 package. TRK-2026-9910-B (fix round 9). ASCII only.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File VERIFY-v5.ps1 -Path "C:\full\path\of\the\folder" [-ExpectManifestSha256 <64 hex>] [-AfterWriters]
#
# USAGE
#   -Path                  the full path of the installed folder (required).
#   -ExpectManifestSha256  the SHA-256 of the package's MANIFEST.sha256, from the order (optional, catches a doctored manifest).
#   -AfterWriters          (optional) use ONLY after a PC writer has started. Without it the check is EXACT: every one of the files, the seven data files and the settings
#                          file included, must be byte-for-byte the shipped one. With it, a data or settings file whose bytes differ from the manifest is allowed ONLY if it passes
#                          the strict shape check below; it is then reported as "changed by a PC writer (passes the strict shape check)".
#   Exit codes (each one is tested): 0 = OK. 1 = at least one problem was found (a manifest that is a link or not a plain file is also 1). PowerShell ITSELF also exits 1, before this script
#     starts, when the command line is wrong: a wrong switch, or no -Path (with no keyboard answer possible; in a window where PowerShell can ask, it may ask for the path instead - not tested).
#     2 = this script could not start its check: -Path is a relative path or a short name, has "." or ".." in it, the folder does not exist, or MANIFEST.sha256 is missing, is a folder, is too big, holds NUL bytes or cannot be read.
#
# What it does: reads MANIFEST.sha256 inside the folder, recomputes the SHA-256 of every file the manifest lists, and prints either
#   OK ...                    (every file is there and readable and identical, and nothing else is in the folder), or
#   PROBLEMS (n) and one line per difference: MISSING, UNREACHABLE, UNREADABLE, EDITED, TOO BIG, NOT A PLAIN FILE, CASE DUPLICATE, EXTRA FILE, EXTRA FOLDER, LINK, BAD MANIFEST LINE, ...
# What it never does: this script contains no command that writes, copies, moves or deletes anything (a test scans this source for such commands). It only opens plain files for reading.
# It cannot speak for PowerShell itself: the PowerShell program may keep its own cache files outside the checked folder. The checked folder, its parent and the Desktop were identical before and after in every test run.
#
# Fix round 9 (CHECK-10 flaw 7): the OK (after writers) line counts page and script files and data and settings files separately, each only if it was compared by hash and is identical; the counts add up to the manifest.
# Fix round 8 (checker 5): (F5) the exit-code line above says what really happens. (F6) when any LINK finding exists (LINK, LINK IN PATH) the PROBLEMS line gives NO count of identical files, because files may
# have been read through a link; every sentence says only what happened ("it was not opened", "files were read through it"). (F9) a data or settings file with any byte above 127 is refused: a writer must
# write accents as JSON \u00e9 escapes. (E14) every name or path is printed with control characters escaped (\n, \r, \t, \xNN), so a file name cannot fake a line such as "OK:". (E15) the settings file's
# status_dir_url must be empty or a relative folder path: only letters, digits, dot, underscore, dash and slash; not starting with a slash; no empty part (two slashes in a row) and no part made only of dots.
#
# Fix round 7 (CHECK-8 flaws 4, 9, 16, 17, 18, 19): the seven data files data/vtes5-*.js and the settings file vtes5-config.js are DATA and are checked STRICTLY:
#   - size from the file length FIRST (at most 1048576 bytes; the file is not read if it is bigger, and an empty file is refused); UTF-8 only; no byte-order mark; no UTF-16; no NUL byte; no CR;
#   - the whole text must be exactly the fixed wrapper  window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.<name> = <ONE JSON object>;  and at most ONE trailing LF
#     (the settings file: window.VTES5_CONFIG = <ONE JSON object>;  with an optional first line that is one closed /* comment */). <name> must match the file name (bots.js assigns .bots).
#     The wrapper is anchored at the start AND the end, and the middle is checked as strict JSON (a hand-written token and structure check, then ConvertFrom-Json), so anything after
#     the closing semicolon, any function call, comment, second statement or other script is refused. A JSON object cannot carry script out of the wrapper.
#   - the settings file must hold status_dir_url as a string.
#   - size caps for every file in the manifest: 2 MB for the page (.html), 1 MB for every other file. A bigger file is refused from its length, before it is read or hashed.
#   - a file that is not a plain file (named pipe, socket, device, link) is refused WITHOUT being opened: the type is read from the directory entry (the item's UnixStat.ItemType on
#     Linux and macOS, the Device or ReparsePoint attribute on Windows). MANIFEST.sha256 gets the same test BEFORE it is followed.
#   - upper and lower case: two names in the same folder that differ only in case (VTES5-UI.JS beside vtes5-ui.js) are a PROBLEM, and names are matched exactly (ordinal) against the manifest.
#   - a file that is there but cannot be reached or read is UNREACHABLE or UNREADABLE, never MISSING.
#   - the line-ending (CRLF) test reads the file in one go instead of byte by byte.
# Fix round 6: the folder itself, and every folder above it, is checked for being a link, junction or symbolic link (LINK IN PATH). A file that differs ONLY because its line endings are
# Windows style (CRLF) is reported as one plain sentence naming that cause (LINE ENDINGS CHANGED (CRLF)), not as many EDITED lines.
param(
    [Parameter(Mandatory = $true)][string]$Path,
    [string]$ExpectManifestSha256 = '',
    [switch]$AfterWriters
)
Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'
$isUnix = ([IO.Path]::DirectorySeparatorChar -eq '/')
$problems = New-Object System.Collections.Generic.List[string]
$capData = 1048576      # data and settings files
$capScript = 1048576    # scripts and the manifest
$capPage = 2097152      # the page

# every line printed goes through here: a control character in a file or folder name (newline, carriage return, tab, escape, any byte below 32, DEL, 0x80-0x9F, U+2028/9) is shown as \n \r \t \xNN \uNNNN
function Protect-Text([string]$s) {
    $sb = New-Object System.Text.StringBuilder
    foreach ($ch in $s.ToCharArray()) {
        $c = [int]$ch
        if ($c -eq 10) { [void]$sb.Append('\n') }
        elseif ($c -eq 13) { [void]$sb.Append('\r') }
        elseif ($c -eq 9) { [void]$sb.Append('\t') }
        elseif ($c -lt 32 -or ($c -ge 127 -and $c -le 159)) { [void]$sb.Append('\x' + $c.ToString('x2')) }
        elseif ($c -eq 8232 -or $c -eq 8233) { [void]$sb.Append('\u' + $c.ToString('x4')) }
        else { [void]$sb.Append($ch) }
    }
    return $sb.ToString()
}
function Say([string]$s) { Write-Host (Protect-Text $s) }

function Stop-Early([string]$why) {
    Say ('CANNOT CHECK: ' + $why)
    Say 'This script contains no write command, so it changed nothing in the folder.'
    exit 2
}

# what is this directory entry? Never opens it. Returns: link | folder | file | other:<kind>
function Get-Kind($it) {
    if ($it.Attributes -band [IO.FileAttributes]::ReparsePoint) { return 'link' }
    if ($it.PSIsContainer) { return 'folder' }
    $us = $it.PSObject.Properties['UnixStat']
    if ($us -ne $null -and $us.Value -ne $null) {
        $k = [string]$us.Value.ItemType
        if ($k -eq 'File') { return 'file' }
        if ($k -eq 'Directory') { return 'folder' }
        if ($k -eq 'SymbolicLink') { return 'link' }
        return ('other:' + $k)
    }
    if ($it.Attributes -band [IO.FileAttributes]::Device) { return 'other:Device' }
    return 'file'
}
function Get-KindWords([string]$kind) {
    $k = $kind.Replace('other:', '')
    switch ($k) {
        'NamedPipe' { return 'a named pipe' }
        'Socket' { return 'a socket' }
        'CharacterDevice' { return 'a device' }
        'BlockDevice' { return 'a device' }
        'Device' { return 'a device' }
        default { return ('not a plain file (' + $k + ')') }
    }
}
function Get-Cap([string]$rel) {
    if ($rel.ToLowerInvariant().EndsWith('.html')) { return $capPage }
    if ($rel -ceq 'vtes5-config.js' -or $rel.StartsWith('data/', [StringComparison]::Ordinal)) { return $capData }
    return $capScript
}
function Get-ShaBytes([byte[]]$bytes) {
    $sha = [System.Security.Cryptography.SHA256]::Create()
    try { $b = $sha.ComputeHash($bytes) } finally { $sha.Dispose() }
    return (($b | ForEach-Object { $_.ToString('x2') }) -join '')
}
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
# the SHA-256 the file would have with LF line endings (every CR that is followed by an LF is left out, in memory only): used only to name the CRLF cause.
# The caller has already checked the size cap. One bulk read, one bulk replace (Latin-1 maps every byte to one character and back, so nothing else changes).
function Get-ShaLf([byte[]]$bytes) {
    if ([Array]::IndexOf($bytes, [byte]13) -lt 0) { return '' }
    $l1 = [Text.Encoding]::GetEncoding(28591)
    $s = $l1.GetString($bytes).Replace("`r`n", "`n")
    return (Get-ShaBytes ($l1.GetBytes($s)))
}

# strict JSON object check. Returns '' when $t is exactly one valid JSON object, otherwise one plain reason. Pure text work, no file access.
$tokPattern = '\G(?:[ \t\r\n]+|"(?>[^"\\\x00-\x1f]+|\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4}))*"|-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?|true|false|null|[\[\]{}:,])'
$tokRe = New-Object System.Text.RegularExpressions.Regex($tokPattern, [System.Text.RegularExpressions.RegexOptions]::None, [TimeSpan]::FromSeconds(30))
function Test-JsonObject([string]$t) {
    $ms = $tokRe.Matches($t)
    $expect = 0
    $stack = New-Object System.Collections.Generic.List[string]
    $state = 'TOP'   # TOP first token must be {; V value; VE value or ]; K key; KE key or }; C colon; A after a value; END
    foreach ($m in $ms) {
        if ($m.Index -ne $expect) { return ('it holds something that is not JSON near character ' + $expect) }
        $expect = $m.Index + $m.Length
        $s = $m.Value; $c = $s[0]
        if ($c -eq ' ' -or $c -eq "`t" -or $c -eq "`r" -or $c -eq "`n") { continue }
        if ($state -eq 'END') { return 'it holds more than one JSON value' }
        if ($state -eq 'TOP') {
            if ($c -ne '{') { return 'the value is not one JSON object (it must start with a curly bracket)' }
            $stack.Add('O'); $state = 'KE'; continue
        }
        if ($state -eq 'KE' -and $c -eq '}') { $stack.RemoveAt($stack.Count - 1); $state = 'A'; if ($stack.Count -eq 0) { $state = 'END' }; continue }
        if ($state -eq 'VE' -and $c -eq ']') { $stack.RemoveAt($stack.Count - 1); $state = 'A'; if ($stack.Count -eq 0) { $state = 'END' }; continue }
        if ($state -eq 'KE' -or $state -eq 'K') {
            if ($c -ne '"') { return 'an object key is not a quoted string' }
            $state = 'C'; continue
        }
        if ($state -eq 'C') {
            if ($c -ne ':') { return 'a colon is missing after an object key' }
            $state = 'V'; continue
        }
        if ($state -eq 'V' -or $state -eq 'VE') {
            if ($c -eq '{') { if ($stack.Count -ge 100) { return 'it is nested more than 100 levels deep' }; $stack.Add('O'); $state = 'KE'; continue }
            if ($c -eq '[') { if ($stack.Count -ge 100) { return 'it is nested more than 100 levels deep' }; $stack.Add('A'); $state = 'VE'; continue }
            if ($c -eq '}' -or $c -eq ']' -or $c -eq ':' -or $c -eq ',') { return 'a value is missing (a stray comma, colon or bracket)' }
            $state = 'A'; continue
        }
        if ($state -eq 'A') {
            $top = $stack[$stack.Count - 1]
            if ($c -eq ',') { if ($top -eq 'O') { $state = 'K' } else { $state = 'V' }; continue }
            if ($c -eq '}' -and $top -eq 'O') { $stack.RemoveAt($stack.Count - 1); if ($stack.Count -eq 0) { $state = 'END' }; continue }
            if ($c -eq ']' -and $top -eq 'A') { $stack.RemoveAt($stack.Count - 1); if ($stack.Count -eq 0) { $state = 'END' }; continue }
            return 'two values are not separated by a comma, or a bracket does not match'
        }
        return 'it is not valid JSON'
    }
    if ($expect -ne $t.Length) { return ('it holds something that is not JSON near character ' + $expect) }
    if ($state -ne 'END') { return 'the JSON object is not finished (a bracket is not closed)' }
    return ''
}

# strict data/settings file check. $rel is the manifest path. Returns '' when the file is acceptable DATA, otherwise ONE plain sentence naming the file and the reason.
function Test-DataFile([string]$full, [string]$rel, [long]$len, [byte[]]$bytes) {
    $nm = $rel.Replace('/', '\')
    if ($len -eq 0 -or $bytes.Length -eq 0) { return ($nm + ' is empty (0 bytes); do not use this folder') }
    if ($bytes.Length -ge 2 -and (($bytes[0] -eq 255 -and $bytes[1] -eq 254) -or ($bytes[0] -eq 254 -and $bytes[1] -eq 255))) {
        return ($nm + ' is saved as UTF-16 (a Windows PowerShell redirect does that); do not use this folder')
    }
    if ([Array]::IndexOf($bytes, [byte]0) -ge 0) {
        if ($bytes.Length -ge 2 -and (($bytes[1] -eq 0 -and $bytes[0] -ne 0) -or ($bytes[0] -eq 0 -and $bytes[1] -ne 0))) { return ($nm + ' is saved as UTF-16 (a Windows PowerShell redirect does that); do not use this folder') }
        return ($nm + ' contains NUL bytes, so it is not a plain text data file; do not use this folder')
    }
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) { return ($nm + ' starts with a UTF-8 byte-order mark (BOM); it must be plain UTF-8 without one; do not use this folder') }
    if ([Text.Encoding]::GetEncoding(28591).GetString($bytes) -cmatch '[\x80-\xff]') { return ($nm + ' contains characters that are not plain ASCII (a writer must write accents as \u00e9 escapes); do not use this folder') }
    $text = (New-Object System.Text.UTF8Encoding($false, $true)).GetString($bytes)
    if ($text.IndexOf([char]13) -ge 0) { return ($nm + ' holds a Windows line ending (CR); the file must use LF only, and end with a semicolon and at most one LF; do not use this folder') }
    $name = ''
    if ($rel -ceq 'vtes5-config.js') {
        $re = '(?s)\A(?:/\*(?:(?!\*/)[^\n]){0,400}\*/\n)?window\.VTES5_CONFIG = (.*);\n?\z'
    } else {
        $name = [IO.Path]::GetFileNameWithoutExtension($rel).Substring(6)
        $re = '(?s)\Awindow\.VTES_DATA = window\.VTES_DATA \|\| \{\}; window\.VTES_DATA\.' + [regex]::Escape($name) + ' = (.*);\n?\z'
    }
    $m = [regex]::Match($text, $re)
    if (-not $m.Success) {
        if ($name -ne '') { return ($nm + ' is not the one assignment "window.VTES_DATA.' + $name + ' = {...};" that the page expects (wrong wrapper, wrong name, or text after the closing semicolon); do not use this folder') }
        return ($nm + ' is not the one assignment "window.VTES5_CONFIG = {...};" that the page expects (wrong wrapper, or text after the closing semicolon); do not use this folder')
    }
    $mid = $m.Groups[1].Value
    $why = ''
    try { $why = Test-JsonObject $mid } catch { $why = 'the JSON check could not finish (' + $_.Exception.GetType().Name + ')' }
    if ($why -ne '') { return ($nm + ' does not hold one valid JSON object: ' + $why + '; do not use this folder') }
    try { $obj = ConvertFrom-Json -InputObject $mid } catch { return ($nm + ' does not hold one valid JSON object (ConvertFrom-Json refuses it); do not use this folder') }
    if ($obj -eq $null -or $obj.GetType().Name -ne 'PSCustomObject') { return ($nm + ' does not hold one JSON object; do not use this folder') }
    if ($name -eq '') {
        $p = $obj.PSObject.Properties['status_dir_url']
        if ($p -eq $null -or $p.Value -isnot [string]) { return ($nm + ' must hold status_dir_url as a text string; do not use this folder') }
        $u = [string]$p.Value
        $uok = ($u -ceq '')
        if (-not $uok) {
            $uok = ($u -cmatch '^[A-Za-z0-9._-]+(/[A-Za-z0-9._-]+)*/?\z')
            if ($uok) { foreach ($part in $u.Split('/')) { if ($part -ne '' -and $part.Trim('.') -eq '') { $uok = $false } } }
        }
        if (-not $uok) { return ($nm + ' holds a status_dir_url that is not allowed: it must be empty, or a relative folder path made only of letters, digits, dot, underscore, dash and slash (for example status/), not starting with a slash, with no empty part and no part made only of dots (so no ".."); a file: or http: address, a drive letter or a network path is refused; do not use this folder') }
    }
    return ''
}

# 1. a FULL path only. A short name would be resolved against whatever folder the program started in.
$isFull = ($Path -match '^[A-Za-z]:[\\/]') -or ($Path -match '^\\\\[^\\]') -or ($isUnix -and $Path.StartsWith('/'))
if (-not $isFull) { Stop-Early ('"' + $Path + '" is not a full path. Give the whole path, for example C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5') }
# flaw N19: "." and ".." in the path are refused with a plain sentence (they used to scramble the file names in the answer)
foreach ($seg in ($Path -split '[\\/]')) { if ($seg -eq '..' -or $seg -eq '.') { Stop-Early ('the path "' + $Path + '" contains "' + $seg + '". Give the plain full path with no "." or ".." in it') } }
$root = $Path.TrimEnd('\', '/')
if (-not (Test-Path -LiteralPath $root -PathType Container)) { Stop-Early ('the folder "' + $root + '" does not exist (or is not a folder)') }

# 2. the manifest: its type is checked BEFORE it is followed or opened
$manPath = Join-Path $root 'MANIFEST.sha256'
$manItem = $null
try { $manItem = Get-Item -LiteralPath $manPath -Force -ErrorAction Stop }
catch [System.Management.Automation.ItemNotFoundException] { Stop-Early ('MANIFEST.sha256 is missing from "' + $root + '"') }
catch { Stop-Early ('MANIFEST.sha256 is UNREACHABLE (it is present but cannot be reached: ' + $_.Exception.GetType().Name + ')') }
$manKind = Get-Kind $manItem
if ($manKind -eq 'folder') { Stop-Early ('MANIFEST.sha256 is missing from "' + $root + '" (a folder has that name)') }
if ($manKind -ne 'file') {
    $what = 'a link'; if ($manKind.StartsWith('other:')) { $what = Get-KindWords $manKind }
    Say ('Folder: ' + $root)
    Say ('PROBLEMS (1); the package files were not checked, because the manifest cannot be trusted:')
    Say ('  LINK OR NOT A PLAIN FILE: MANIFEST.sha256 is ' + $what + ', not a plain file. It was not opened. Use a real MANIFEST.sha256 file.')
    Say 'This script contains no write command, so it changed nothing in the folder.'
    exit 1
}
if ($manItem.Length -gt $capScript) { Stop-Early ('MANIFEST.sha256 is ' + $manItem.Length + ' bytes, more than the limit of ' + $capScript + '; it was not read') }
try { $manBytes = [IO.File]::ReadAllBytes($manPath) } catch { Stop-Early ('MANIFEST.sha256 cannot be read: ' + $_.Exception.Message) }
$manSha = Get-ShaBytes $manBytes
if ([Array]::IndexOf($manBytes, [byte]0) -ge 0) { Stop-Early 'MANIFEST.sha256 holds NUL bytes (it may be saved as UTF-16, which a Windows PowerShell redirect does); it is not a plain text manifest' }
$manText = (New-Object System.Text.UTF8Encoding($false, $false)).GetString($manBytes)
if ($manText.Length -gt 0 -and $manText[0] -eq [char]0xFEFF) { $manText = $manText.Substring(1) }
$manLines = $manText -split "`r`n|`n|`r"
Say ('Folder: ' + $root)
Say ('MANIFEST.sha256 SHA-256: ' + $manSha)
if ($ExpectManifestSha256 -ne '') {
    if ($manSha -ne $ExpectManifestSha256.ToLower()) {
        $manLf = ''; try { $manLf = Get-ShaLf $manBytes } catch { $manLf = '' }
        if ($manLf -eq $ExpectManifestSha256.ToLower()) { $problems.Add('LINE ENDINGS CHANGED (CRLF): MANIFEST.sha256 differs from the package ONLY because its line endings are Windows style (CRLF) instead of LF. Its words are right, but it is not the file from the package (see the same sentence below).') }
        else { $problems.Add('MANIFEST CHANGED: its SHA-256 is ' + $manSha + ' but the order expects ' + $ExpectManifestSha256.ToLower() + ' (so the manifest itself is not the one from the package)') }
    }
}

# 3. parse the manifest strictly
$entries = [ordered]@{}
$seenCI = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::OrdinalIgnoreCase)
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
    if ($rel -ceq 'MANIFEST.sha256') { $problems.Add('BAD MANIFEST LINE ' + $n + ': the manifest lists itself'); continue }
    if (-not $seenCI.Add($rel)) { $problems.Add('BAD MANIFEST LINE ' + $n + ': "' + $rel + '" is listed twice (upper and lower case are not told apart)'); continue }
    $entries[$rel] = $h
}
if ($entries.Count -eq 0) { $problems.Add('BAD MANIFEST: it lists no files') }

# 4. every listed file: present, a plain file, not too big, readable, identical. The eight DATA files are also checked for their shape (see the header).
$dataSet = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::Ordinal)
foreach ($d in @('data/vtes5-heartbeat.js', 'data/vtes5-bots.js', 'data/vtes5-state.js', 'data/vtes5-health.js', 'data/vtes5-tokens.js', 'data/vtes5-housekeeping.js', 'data/vtes5-miamidade.js', 'vtes5-config.js')) { [void]$dataSet.Add($d) }
$okCount = 0
$okPage = 0     # fix round 9 (CHECK-10 flaw 7): page and script files compared by hash and identical
$okData = 0     # data and settings files compared by hash and identical
$changedList = New-Object System.Collections.Generic.List[string]
$crlf = New-Object System.Collections.Generic.List[string]
foreach ($rel in $entries.Keys) {
    $isData = $dataSet.Contains($rel)
    $tag = ''; if ($isData) { $tag = ' (data file)'; if ($rel -ceq 'vtes5-config.js') { $tag = ' (settings file)' } }
    $full = Join-Path $root ($rel.Replace('/', [string][IO.Path]::DirectorySeparatorChar))
    $it = $null
    try {
        $it = Get-Item -LiteralPath $full -Force -ErrorAction Stop
    } catch {
        $absent = $_.Exception -is [System.Management.Automation.ItemNotFoundException]
        if ($absent) {
            # a folder above it that cannot be listed means "present but not reachable", not "missing"
            $par = [IO.Path]::GetDirectoryName($full)
            try { [void][IO.Directory]::GetFileSystemEntries($par) } catch [System.UnauthorizedAccessException] { $absent = $false } catch { }
        }
        if ($absent) { $problems.Add('MISSING: ' + $rel + $tag + ' (not in the folder)') }
        else { $problems.Add('UNREACHABLE: ' + $rel + $tag + ' cannot be reached (' + $_.Exception.GetType().Name + '), so it cannot be checked. It may be there, but it is not counted as identical.') }
        continue
    }
    $kind = Get-Kind $it
    if ($kind -eq 'folder') { $problems.Add('NOT A FILE: ' + $rel + ' is a folder'); continue }
    if ($kind -eq 'link') { $problems.Add('LINK: ' + $rel + ' is a link, not a plain file (it was not opened)'); continue }
    if ($kind -ne 'file') { $problems.Add('NOT A PLAIN FILE: ' + $rel + $tag + ' is ' + (Get-KindWords $kind) + ', not a plain file. It was not opened.'); continue }
    $len = [long]$it.Length
    $cap = Get-Cap $rel
    if ($len -gt $cap) { $problems.Add('TOO BIG: ' + $rel + $tag + ' is ' + $len + ' bytes, more than the limit of ' + $cap + '. It was not read and not hashed.'); continue }
    try { $bytes = [IO.File]::ReadAllBytes($full) } catch { $problems.Add('UNREADABLE: ' + $rel + $tag + ' cannot be read, so it cannot be checked (' + $_.Exception.GetType().Name + ')'); continue }
    $got = Get-ShaBytes $bytes
    $shape = ''
    if ($isData) { $shape = Test-DataFile $full $rel $len $bytes }
    if ($got -ne $entries[$rel]) {
        if ($isData -and $AfterWriters) {
            if ($shape -eq '') { $changedList.Add('changed by a PC writer (passes the strict shape check): ' + $rel + ' (SHA-256 ' + $got + ')') }
            else { $problems.Add('BAD DATA FILE: ' + $shape) }
            continue
        }
        $lf = ''; try { $lf = Get-ShaLf $bytes } catch { $lf = '' }
        if ($lf -eq $entries[$rel]) { $crlf.Add($rel); continue }
        $extra = ''; if ($shape -ne '') { $extra = ' It is also not a valid data file: ' + $shape + '.' }
        $problems.Add('EDITED: ' + $rel + $tag + ' has SHA-256 ' + $got + ' but the manifest says ' + $entries[$rel] + '.' + $extra); continue
    }
    if ($shape -ne '') { $problems.Add('BAD DATA FILE: ' + $shape); continue }
    $okCount++
    if ($isData) { $okData++ } else { $okPage++ }
}
if ($crlf.Count -gt 0) {
    $problems.Add('LINE ENDINGS CHANGED (CRLF): ' + $crlf.Count + ' file(s) differ from the package ONLY because their line endings are Windows style (CRLF) instead of the package''s LF: ' + ($crlf -join ', ') + '. The usual cause is git for Windows (core.autocrlf = true) converting the files when they were checked out, or a tool re-saving them. The words in the files are not wrong, but the folder is not the package. Get the exact bytes again (INSTALL-BY-HAND.md, Section A, step 6). Do not edit these files.')
}

# 5. anything in the folder that the manifest does not list. Names are matched exactly (ordinal), and two names that differ only in case are a problem.
$listed = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::Ordinal)
foreach ($rel in $entries.Keys) { [void]$listed.Add($rel) }
$listedDirs = New-Object 'System.Collections.Generic.HashSet[string]' ([StringComparer]::Ordinal)
foreach ($rel in $entries.Keys) { $parts = $rel.Split('/'); for ($i = 1; $i -lt $parts.Length; $i++) { [void]$listedDirs.Add(($parts[0..($i - 1)] -join '/')) } }
try {
    $all = @(Get-ChildItem -LiteralPath $root -Recurse -Force -ErrorAction Stop)
} catch {
    $all = @(); $problems.Add('UNREADABLE FOLDER: the folder list could not be read completely, so "nothing extra is in it" cannot be proven (' + $_.Exception.GetType().Name + ')')
}
$rootFull = [IO.Path]::GetFullPath($root).TrimEnd('\', '/')
$byCase = @{}
foreach ($it in $all) {
    $itFull = [IO.Path]::GetFullPath($it.FullName)
    if (-not $itFull.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) { $problems.Add('PATH MISMATCH: ' + $it.FullName + ' does not start with ' + $rootFull + ' (not checked)'); continue }
    $rel = $itFull.Substring($rootFull.Length).TrimStart('\', '/').Replace('\', '/')
    $ck = $rel.ToUpperInvariant()
    if ($byCase.ContainsKey($ck)) { $problems.Add('CASE DUPLICATE: "' + $byCase[$ck] + '" and "' + $rel + '" differ only in upper and lower case. A Windows folder cannot hold both, so this is not an install made on Windows.') }
    else { $byCase[$ck] = $rel }
    if ($rel -ceq 'MANIFEST.sha256') { continue }
    $kind = Get-Kind $it
    if ($kind -eq 'folder') {
        if (-not $listedDirs.Contains($rel)) { $problems.Add('EXTRA FOLDER: ' + $rel + ' is not part of the package') }
    } elseif ($kind -eq 'link') {
        if ($it.PSIsContainer) { $problems.Add('LINK: the folder ' + $rel + ' is a link, not a real folder, and it is not in the manifest') }
        elseif (-not $listed.Contains($rel)) { $problems.Add('LINK: ' + $rel + ' is a link and is not in the manifest') }
    } else {
        if (-not $listed.Contains($rel)) {
            if ($kind -ne 'file') { $problems.Add('EXTRA FILE: ' + $rel + ' is ' + (Get-KindWords $kind) + ' and is not part of the package (not opened)') }
            else { $problems.Add('EXTRA FILE: ' + $rel + ' is not part of the package') }
        }
    }
}

# 5a. the folder, and every folder above it, must not be a link, junction or symbolic link (the files would really live somewhere else, for example on the Desktop or in a git checkout)
$walk = $root
while ($true) {
    $wi = $null
    try { $wi = Get-Item -LiteralPath $walk -Force -ErrorAction Stop } catch { break }
    if ($wi.Attributes -band [IO.FileAttributes]::ReparsePoint) {
        $tgt = ''; try { $tgt = (@($wi.Target) -join ' ') } catch { $tgt = '' }
        if ($tgt -eq '') { $tgt = 'a place this script could not read' }
        $who = 'the parent folder ' + $walk; if ($walk -eq $root) { $who = 'the folder itself' }
        $problems.Add('LINK IN PATH: ' + $who + ' is a link or junction (it points to ' + $tgt + '), so the files may really live somewhere else, for example on the Desktop or inside a git checkout. The files were read through it, so no count of identical files is given. Use a real folder path.')
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
    if ($changedList.Count -eq 0) {
        Say ('OK: all ' + $okCount + ' of ' + $entries.Count + ' package files are present, readable and identical (SHA-256), and nothing else is in the folder.')
    } else {
        Say ('OK (after writers): all ' + $entries.Count + ' of ' + $entries.Count + ' package files are present and readable. ' + $okPage + ' page and script files are identical (SHA-256). ' + $okData + ' data or settings file(s) are identical (SHA-256). ' + $changedList.Count + ' data or settings file(s) were changed by a PC writer and pass the strict shape check (listed below). Nothing else is in the folder.')
        foreach ($e in $changedList) { Say ('  ' + $e) }
    }
    Say 'This script contains no write command.'
    exit 0
}
$linkFound = (@($problems | Where-Object { $_.StartsWith('LINK: ') -or $_.StartsWith('LINK IN PATH: ') }).Count -gt 0)
if ($linkFound) { Say ('PROBLEMS (' + $problems.Count + '); no count of identical files is given, because a link was found:') }
else { Say ('PROBLEMS (' + $problems.Count + '); ' + $okCount + ' of ' + $entries.Count + ' package files are identical:') }
foreach ($p in $problems) { Say ('  ' + $p) }
foreach ($e in $changedList) { Say ('  (not a problem) ' + $e) }
Say 'This script contains no write command, so it changed nothing in the folder.'
exit 1
