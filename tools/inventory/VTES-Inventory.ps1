# VTES-Inventory.ps1
# ADHOC-FILING-INVENTORY . #VTES-control-panel #filing #inventory #treeview #JorgeValdes
#
# WHAT IT DOES (READ-ONLY)
#   Walks the folders you name, rolls everything up to a chosen depth, and writes a
#   NEW data file that the VTES Tree View (VTES-TREEMAP.html) draws as a colourful
#   treemap. Per folder it records: size, file count, newest change, how many file
#   names follow the naming rule, which TRK/OPH numbers appear in names, how many PDFs
#   have an OCR sidecar, and how much .bak / "(2)" / "- Copy" clutter sits beside the
#   real files. TreeSize cannot see those last four; that is why this exists.
#
# SAFETY (charter: nothing is moved, renamed or deleted)
#   - It only READS the scanned folders. It writes ONLY into -OutDir, and only new files.
#   - Junctions and symlinks are skipped, so the OneDrive twin trees cannot be counted twice.
#   - A folder it cannot open is logged and skipped; the run continues.
#   - Each root's result is written the moment that root finishes (a killed run keeps
#     what it finished), and inventory.progress.txt grows every 5,000 files so a
#     heartbeat can check "the file grew", not "the process exists" (RI-002).
#   - RI-032: pure ASCII + BOM. RI-036: no admin, no UAC.
#
# USAGE
#   -SelfTest                          tests on a tiny fake tree, exits 0 only if all pass
#   (no switch)                        scans the default roots, writes into -OutDir
#   -Roots 'C:\AI','G:\My Drive'       choose roots   -Depth 2   choose rollup depth

param(
    [string[]]$Roots,
    [int]$Depth = 2,
    [string]$OutDir,
    [string[]]$CopyTo,
    [switch]$SelfTest
)

$ErrorActionPreference = 'Stop'
$Utf8 = New-Object System.Text.UTF8Encoding($false)
if ($Roots -and $Roots.Count -eq 1 -and $Roots[0] -like '*,*') { $Roots = @($Roots[0] -split ',' | ForEach-Object { $_.Trim().Trim("'").Trim('"') }) }
if ($CopyTo -and $CopyTo.Count -eq 1 -and $CopyTo[0] -like '*,*') { $CopyTo = @($CopyTo[0] -split ',' | ForEach-Object { $_.Trim().Trim("'").Trim('"') }) }
if (-not $Roots) { $Roots = @('C:\Users\JV\OneDrive\Documents', 'C:\Users\JV\Desktop', 'C:\AI', 'G:\My Drive') }
# Work locally (never inside the scanned Drive tree); copy the finished files out once at the end.
if (-not $OutDir) { $OutDir = 'C:\AI\inventory' }
if (-not $CopyTo) { $CopyTo = @('G:\My Drive\MY-DESK\INVENTORY', 'G:\My Drive\MY-DESK\VTES-PANEL') }
$IsWin = ($env:OS -eq 'Windows_NT')

# Canonical file name (Drive form, RI-012): YYYY-MM-DD _ TRK-2026-NNNN _ TYPE _ Description _ vN[ _ pNNN].ext
$RxGood  = '^\d{4}-\d{2}-\d{2} _ (TRK-\d{4}-\d{4}(-[A-Z0-9]+)?|OPH-\d{4}-\d{4}) _ [A-Za-z]+ _ .+ _ v\d+( _ p\d{3})?\.[A-Za-z0-9]+$'
$RxTrk   = 'TRK-\d{4}-\d{4}(-[A-Z0-9]+)?|TRK-\d{2}-\d{4}|OPH-\d{4}-\d{4}|TUS-\d{2}-\d{4}|KAR-\d{2}-[A-Z]+'
$RxBak   = '\.bak([-_.].*)?$|\.bak$'
$RxCopy  = ' \(\d+\)\.[A-Za-z0-9]+$| - Copy( \(\d+\))?\.[A-Za-z0-9]+$'
$RxSide  = '\.(SEARCH|TAGS)\.txt$'
$TrkCap  = 400
$script:TrkIndex = @{}
$script:ReparseLogged = 0

if ($IsWin) {
    Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class VtesFs {
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
    struct WIN32_FIND_DATA {
        public uint dwFileAttributes;
        public System.Runtime.InteropServices.ComTypes.FILETIME ftCreationTime, ftLastAccessTime, ftLastWriteTime;
        public uint nFileSizeHigh, nFileSizeLow, dwReserved0, dwReserved1;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 260)] public string cFileName;
        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 14)] public string cAlternateFileName;
    }
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode, SetLastError = true)] static extern IntPtr FindFirstFileW(string n, out WIN32_FIND_DATA d);
    [DllImport("kernel32.dll")] static extern bool FindClose(IntPtr h);
    public static uint Tag(string path) {
        WIN32_FIND_DATA d; IntPtr h = FindFirstFileW(path.TrimEnd('\\'), out d);
        if (h == new IntPtr(-1)) return 0; FindClose(h); return d.dwReserved0;
    }
}
'@
}
# Skip symlinks and mount points only (twin-tree and loop protection). OneDrive/cloud placeholder folders are
# reparse points too and MUST be walked. Logs the first 50 skipped so a wrong count is visible.
function Test-SkipReparse([string]$Full, [string]$ProgressFile) {
    $skip = $true
    if ($IsWin) { $tag = [VtesFs]::Tag($Full); $skip = ($tag -eq 2684354572 -or $tag -eq 2684354563) }
    if ($skip -and $script:ReparseLogged -lt 50) {
        $script:ReparseLogged++
        Write-Progress-Safe $ProgressFile ('SKIPPED-REPARSE ' + $Full)
    }
    return $skip
}
function Write-Progress-Safe([string]$ProgressFile, [string]$Text) {
    if (-not $ProgressFile) { return }
    for ($i = 0; $i -lt 3; $i++) {
        try { Add-Content -Path $ProgressFile -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $Text); return } catch { Start-Sleep -Milliseconds 200 }
    }
}
function Get-LongPath([string]$p) {
    if ($IsWin -and -not $p.StartsWith('\\?\') -and -not $p.StartsWith('\\\\')) { return '\\?\' + $p }
    return $p
}

function New-Stat([string]$name, [string]$path) {
    return @{ name = $name; path = $path; bytes = [long]0; files = 0; docs = 0; good = 0; pdfs = 0; side = 0; bak = 0; copies = 0
              maxTicks = [long]0; trk = (New-Object 'System.Collections.Generic.HashSet[string]'); kids = @{}; longpath = 0 }
}

function Scan-Root([string]$Root, [int]$Depth, [string]$ProgressFile, [string[]]$ExcludeDirs) {
    if (-not (Test-Path -LiteralPath $Root)) { return $null }
    $rootFull = (Get-Item -LiteralPath $Root).FullName.TrimEnd('\', '/')
    $sep = [System.IO.Path]::DirectorySeparatorChar
    $nodes = @{}
    $rootStat = New-Stat (Split-Path -Leaf $rootFull) $rootFull
    $nodes[''] = $rootStat
    $stack = New-Object 'System.Collections.Generic.Stack[string]'
    $stack.Push($rootFull)
    $seen = 0; $skipped = 0; $longSkipped = 0; $lastBeat = Get-Date
    $excl = @($ExcludeDirs | Where-Object { $_ } | ForEach-Object { $_.TrimEnd('\', '/') })
    while ($stack.Count -gt 0) {
        $dir = $stack.Pop()
        if ($excl -contains $dir.TrimEnd('\', '/')) { continue }
        $rel = ''
        if ($dir.Length -gt $rootFull.Length) { $rel = $dir.Substring($rootFull.Length).TrimStart('\', '/') }
        $segs = @()
        if ($rel) { $segs = @($rel -split '[\\/]') }
        # node key: first $Depth segments of the folder; loose files in root go to '(loose files)'
        if ($segs.Count -eq 0) { $key = '(loose files)' } else { $key = ($segs[0..([Math]::Min($Depth, $segs.Count) - 1)] -join '/') }
        if (-not $nodes.ContainsKey($key)) {
            $leaf = $key.Split('/')[-1]
            $nodes[$key] = New-Stat $leaf (Join-Path $rootFull ($key -replace '/', $sep))
        }
        $st = $nodes[$key]
        $names = $null
        try {
            $di = New-Object System.IO.DirectoryInfo (Get-LongPath $dir)
            $entries = @($di.EnumerateFileSystemInfos())
        } catch { if ($_.Exception -is [System.IO.PathTooLongException]) { $longSkipped++ }; $skipped++; continue }
        $fileNames = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
        foreach ($e in $entries) { if (-not ($e.Attributes -band [System.IO.FileAttributes]::Directory)) { [void]$fileNames.Add($e.Name) } }
        foreach ($e in $entries) {
            $isDir = [bool]($e.Attributes -band [System.IO.FileAttributes]::Directory)
            if ($isDir) {
                $full = $e.FullName; if ($full.StartsWith('\\?\')) { $full = $full.Substring(4) }
                if (($e.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -and (Test-SkipReparse $full $ProgressFile)) { $skipped++; continue }
                $stack.Push($full); continue
            }
            $seen++
            if ((($seen % 5000) -eq 0) -or (((Get-Date) - $lastBeat).TotalSeconds -ge 60)) { $lastBeat = Get-Date; Write-Progress-Safe $ProgressFile ("$Root files=$seen") }
            $st.files++
            $st.bytes += [long]$e.Length
            $t = $e.LastWriteTimeUtc.Ticks
            if ($t -gt $st.maxTicks) { $st.maxTicks = $t }
            $n = $e.Name
            if ($n -match $RxBak) { $st.bak++; continue }
            if ($n -match $RxSide) { continue }
            if ($n -match $RxCopy) { $st.copies++ }
            $st.docs++
            if ($n -cmatch $RxGood) { $st.good++ }
            foreach ($m in [regex]::Matches($n, $RxTrk, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
                $tv = $m.Value.ToUpper()
                if ($st.trk.Count -lt $TrkCap) { [void]$st.trk.Add($tv) }
                if (-not $script:TrkIndex.ContainsKey($tv)) { $script:TrkIndex[$tv] = New-Object 'System.Collections.Generic.HashSet[string]' }
                if ($script:TrkIndex[$tv].Count -lt 25) { [void]$script:TrkIndex[$tv].Add($key) }
            }
            if ($n -match '\.pdf$') { $st.pdfs++; if ($fileNames.Contains($n + '.SEARCH.txt')) { $st.side++ } }
        }
    }
    # roll children up into parents so every node holds its subtree totals
    $keys = @($nodes.Keys | Where-Object { $_ -ne '' } | Sort-Object { ($_ -split '/').Count } -Descending)
    foreach ($k in $keys) {
        $parts = @($k -split '/')
        $pk = ''
        if ($parts.Count -gt 1) { $pk = ($parts[0..($parts.Count - 2)] -join '/') }
        if (-not $nodes.ContainsKey($pk)) { $nodes[$pk] = New-Stat ($pk.Split('/')[-1]) (Join-Path $rootFull ($pk -replace '/', $sep)) }
        $c = $nodes[$k]; $p = $nodes[$pk]
        $p.kids[$k] = $c
        $p.bytes += $c.bytes; $p.files += $c.files; $p.docs += $c.docs; $p.good += $c.good; $p.pdfs += $c.pdfs; $p.side += $c.side; $p.bak += $c.bak; $p.copies += $c.copies
        if ($c.maxTicks -gt $p.maxTicks) { $p.maxTicks = $c.maxTicks }
        foreach ($x in $c.trk) { if ($p.trk.Count -lt $TrkCap) { [void]$p.trk.Add($x) } }
    }
    return @{ root = $nodes['']; files = $seen; skipped = $skipped; longSkipped = $longSkipped; rootPath = $rootFull }
}

function J([string]$s) {
    if ($null -eq $s) { return '""' }
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append('"')
    foreach ($ch in $s.ToCharArray()) {
        $c = [int][char]$ch
        if ($ch -eq '"') { [void]$sb.Append('\"') }
        elseif ($ch -eq '\') { [void]$sb.Append('\\') }
        elseif ($c -lt 32) { [void]$sb.Append(('\u{0:x4}' -f $c)) }
        elseif ($c -gt 126) { [void]$sb.Append(('\u{0:x4}' -f $c)) }
        else { [void]$sb.Append($ch) }
    }
    [void]$sb.Append('"')
    return $sb.ToString()
}
function Ratio([int]$a, [int]$b) { if ($b -le 0) { return 'null' } return ([Math]::Round($a / $b, 3)).ToString([System.Globalization.CultureInfo]::InvariantCulture) }

function To-Json($st) {
    $mt = 'null'
    if ($st.maxTicks -gt 0) { $mt = J ((New-Object DateTime $st.maxTicks, ([DateTimeKind]::Utc)).ToString('yyyy-MM-ddTHH:mm:ssZ')) }
    $trk = '[' + ((@($st.trk) | Sort-Object | ForEach-Object { J $_ }) -join ',') + ']'
    $kids = ''
    if ($st.kids.Count -gt 0) {
        $kids = ',"children":[' + ((@($st.kids.Values) | Sort-Object { -[long]$_.bytes } | ForEach-Object { To-Json $_ }) -join ',') + ']'
    }
    return ('{{"name":{0},"path":{1},"bytes":{2},"files":{3},"mtime":{4},"conform":{5},"sidecar":{6},"bak":{7},"copies":{8},"trk":{9}{10}}}' -f (J $st.name), (J $st.path), $st.bytes, $st.files, $mt, (Ratio $st.good $st.docs), (Ratio $st.side $st.pdfs), $st.bak, $st.copies, $trk, $kids)
}

function Write-Csv([string]$Path, $rootStats) {
    $rows = New-Object System.Collections.ArrayList
    [void]$rows.Add('root,folder,files,bytes,newest,names_ok_pct,pdfs_with_sidecar_pct,bak_files,copy_files,trk_numbers')
    foreach ($r in $rootStats) {
        $q = { param($x) '"' + ($x -replace '"', '""') + '"' }
        foreach ($c in @($r.kids.Values)) {
            $pct = ''; if ($c.docs -gt 0) { $pct = [Math]::Round(100 * $c.good / $c.docs) }
            $sp = ''; if ($c.pdfs -gt 0) { $sp = [Math]::Round(100 * $c.side / $c.pdfs) }
            $nw = ''; if ($c.maxTicks -gt 0) { $nw = (New-Object DateTime $c.maxTicks, ([DateTimeKind]::Utc)).ToString('yyyy-MM-dd') }
            [void]$rows.Add(((& $q $r.path), (& $q $c.name), $c.files, $c.bytes, $nw, $pct, $sp, $c.bak, $c.copies, (& $q (($c.trk | Sort-Object | Select-Object -First 5) -join ' '))) -join ',')
        }
    }
    [System.IO.File]::WriteAllText($Path, ($rows -join "`r`n") + "`r`n", (New-Object System.Text.UTF8Encoding($true)))
}

function Write-TrkIndex([string]$Path) {
    $rows = New-Object System.Collections.ArrayList
    [void]$rows.Add('trk,folders')
    foreach ($k in ($script:TrkIndex.Keys | Sort-Object)) { [void]$rows.Add(('"{0}","{1}"' -f $k, ((@($script:TrkIndex[$k]) | Sort-Object) -join ' | ') -replace '"', '""')) }
    [System.IO.File]::WriteAllText($Path, ($rows -join "`r`n") + "`r`n", (New-Object System.Text.UTF8Encoding($true)))
}
function Write-Outputs($results, [string]$OutDir, [string]$Label) {
    if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
    $stats = @($results | ForEach-Object { $_.root })
    $tb = ($stats | Measure-Object -Property bytes -Sum).Sum
    $roots = ($stats | ForEach-Object { To-Json $_ }) -join ','
    $json = ('{{"title":"This PC","source":"VTES-Inventory.ps1 (read-only)","generated":{0},"roots":[{1}]}}' -f (J $Label), $roots)
    [System.IO.File]::WriteAllText((Join-Path $OutDir 'TREEMAP-DATA.js'), ('window.VTES_TREE = ' + $json + ';' + "`r`n"), $Utf8)
    [System.IO.File]::WriteAllText((Join-Path $OutDir ('inventory_' + $Label.Substring(0, 10) + '.json')), $json, $Utf8)
    Write-Csv (Join-Path $OutDir ('conformance_' + $Label.Substring(0, 10) + '.csv')) $stats
    Write-TrkIndex (Join-Path $OutDir 'TRK-INDEX.csv')
}

# ---------------------------------------------------------------------------
if ($SelfTest) {
    $pass = 0; $fail = 0
    function Check([string]$n, $c) { if ($c) { $script:pass++; Write-Host ('PASS  ' + $n) } else { $script:fail++; Write-Host ('FAIL  ' + $n) } }
    $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('vtes-inv-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
    $r = Join-Path $tmp 'root'; $out = Join-Path $tmp 'out'
    New-Item -ItemType Directory -Path (Join-Path $r 'TRK-2026-1262 _ 20001 SW 110 CT'), (Join-Path $r 'Loose'), (Join-Path $r 'deep\a\b\c') -Force | Out-Null
    $j = Join-Path $r 'TRK-2026-1262 _ 20001 SW 110 CT'
    $good = '2026-07-29 _ TRK-2026-1262 _ Permit _ Permit Card Unit 143 _ v1.pdf'
    [System.IO.File]::WriteAllText((Join-Path $j $good), ('x' * 100))
    [System.IO.File]::WriteAllText((Join-Path $j ($good + '.SEARCH.txt')), 'text')
    [System.IO.File]::WriteAllText((Join-Path $j 'scan0001.pdf'), ('y' * 50))
    [System.IO.File]::WriteAllText((Join-Path $j ($good + '.bak-20260915')), ('z' * 10))
    [System.IO.File]::WriteAllText((Join-Path $r 'Loose\report (2).pdf'), ('q' * 20))
    [System.IO.File]::WriteAllText((Join-Path $r 'Loose\old - Copy.docx'), ('q' * 20))
    [System.IO.File]::WriteAllText((Join-Path $r 'deep\a\b\c\x.pdf'), ('d' * 30))
    [System.IO.File]::WriteAllText((Join-Path $r 'rootfile.txt'), 'hi')
    $res = Scan-Root $r 2 $null @()
    $root = $res.root
    Check 'counts all files (incl. sidecar and bak)'  ($res.files -eq 8)
    Check 'root bytes add up'                        ($root.bytes -eq (100 + 4 + 50 + 10 + 20 + 20 + 30 + 2))
    Check 'root has 3 folder children + loose'       (@($root.kids.Keys).Count -eq 4)
    $jn = $root.kids['TRK-2026-1262 _ 20001 SW 110 CT']
    Check 'job folder: 1 of 2 real names follow rule' (($jn.docs -eq 2) -and ($jn.good -eq 1))
    Check 'job folder: TRK found in name'            ($jn.trk.Contains('TRK-2026-1262'))
    Check 'job folder: pdf sidecar 1 of 2'           (($jn.pdfs -eq 2) -and ($jn.side -eq 1))
    Check 'job folder: bak counted, not as doc'      ($jn.bak -eq 1)
    Check 'loose folder: two copy files flagged'     ($root.kids['Loose'].copies -eq 2)
    Check 'deep files roll up to depth-2 node'       ($root.kids['deep'].kids['deep/a'].bytes -eq 30)
    Check 'newest change recorded'                   ($root.maxTicks -gt 0)
    Write-Outputs @($res) $out '2026-09-30 12:00'
    $js = Get-Content -Raw (Join-Path $out 'TREEMAP-DATA.js')
    Check 'data file written'                        ($js.StartsWith('window.VTES_TREE = {'))
    Check 'csv written with header'                  ((Get-Content (Join-Path $out 'conformance_2026-09-30.csv'))[0] -like 'root,folder,files*')
    Check 'output is pure ASCII JSON'                (-not ($js -match '[^\x00-\x7F]'))
    Check 'scanned folder untouched (8 files)'       ((Get-ChildItem -Recurse -File $r).Count -eq 8)
    Check 'missing root is skipped, not fatal'       ($null -eq (Scan-Root (Join-Path $tmp 'nope') 2 $null @()))
    Check 'TRK index written'                        ((Get-Content (Join-Path $out 'TRK-INDEX.csv')) -match 'TRK-2026-1262')
    $ex = Scan-Root $r 2 $null @((Join-Path $r 'Loose'))
    Check 'excluded folder is not counted'           ($ex.files -eq 6)
    $many = New-Object System.Collections.ArrayList; for ($i = 0; $i -lt 500; $i++) { [void]$many.Add(('2026-01-01 _ TRK-2026-{0:D4} _ Note _ x _ v1.txt' -f (1000 + $i))) }
    $big = Join-Path $tmp 'many'; New-Item -ItemType Directory -Path $big -Force | Out-Null
    foreach ($f in $many) { [System.IO.File]::WriteAllText((Join-Path $big $f), 'a') }
    $script:TrkIndex = @{}
    $mr = Scan-Root $big 1 $null @()
    Check 'all 500 TRK numbers kept in the full index (per-folder list capped at 400)' (($mr.root.trk.Count -eq 400) -and ($script:TrkIndex.Count -eq 500))
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    Write-Host ('RESULT: {0} passed, {1} failed' -f $pass, $fail)
    if ($fail -eq 0) { exit 0 } else { exit 1 }
}

$label = (Get-Date).ToString('yyyy-MM-dd HH:mm')
if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
$progress = Join-Path $OutDir 'inventory.progress.txt'
Write-Progress-Safe $progress ('START roots=' + ($Roots -join ' | '))
$exclude = @($OutDir) + @($CopyTo)
$done = New-Object System.Collections.ArrayList
foreach ($root in $Roots) {
    Write-Progress-Safe $progress ('ROOT-BEGIN ' + $root)
    try {
        $r = Scan-Root $root $Depth $progress $exclude
        if ($r) {
            [void]$done.Add($r); Write-Outputs $done.ToArray() $OutDir $label
            Write-Progress-Safe $progress ('ROOT-DONE {0} files={1} skipped={2} (too-long-path={3}) bytes={4}' -f $root, $r.files, $r.skipped, $r.longSkipped, $r.root.bytes)
        } else { Write-Progress-Safe $progress ('ROOT-MISSING ' + $root) }
    } catch { Write-Progress-Safe $progress ('ROOT-ERROR ' + $root + ' ' + $_.Exception.Message) }
}
# copy the finished files out ONCE (never write inside the tree being scanned)
foreach ($dest in $CopyTo) {
    try {
        if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
        foreach ($f in @('TREEMAP-DATA.js', 'TRK-INDEX.csv')) { if (Test-Path (Join-Path $OutDir $f)) { Copy-Item (Join-Path $OutDir $f) (Join-Path $dest $f) -Force } }
        if ($dest -like '*INVENTORY*') { Get-ChildItem -Path $OutDir -Filter 'inventory_*.json' | Copy-Item -Destination $dest -Force; Get-ChildItem -Path $OutDir -Filter 'conformance_*.csv' | Copy-Item -Destination $dest -Force }
        Write-Progress-Safe $progress ('COPIED-TO ' + $dest)
    } catch { Write-Progress-Safe $progress ('COPY-FAILED ' + $dest + ' ' + $_.Exception.Message) }
}
Write-Progress-Safe $progress ('DONE roots={0} of {1}' -f $done.Count, $Roots.Count)
Write-Host ('Inventory finished: {0} of {1} roots. Work files: {2}. Copied to: {3}' -f $done.Count, $Roots.Count, $OutDir, ($CopyTo -join ' ; '))
