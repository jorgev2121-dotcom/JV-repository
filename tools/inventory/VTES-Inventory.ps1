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
    [switch]$SelfTest
)

$ErrorActionPreference = 'Stop'
$Utf8 = New-Object System.Text.UTF8Encoding($false)
if (-not $Roots) { $Roots = @('C:\Users\JV\OneDrive\Documents', 'C:\Users\JV\Desktop', 'C:\AI', 'G:\My Drive') }
if (-not $OutDir) { $OutDir = 'G:\My Drive\MY-DESK\INVENTORY' }

# Canonical file name (Drive form, RI-012): YYYY-MM-DD _ TRK-2026-NNNN _ TYPE _ Description _ vN[ _ pNNN].ext
$RxGood  = '^\d{4}-\d{2}-\d{2} _ (TRK-\d{4}-\d{4}(-[A-Z0-9]+)?|OPH-\d{4}-\d{4}) _ [A-Za-z]+ _ .+ _ v\d+( _ p\d{3})?\.[A-Za-z0-9]+$'
$RxTrk   = 'TRK-\d{4}-\d{4}(-[A-Z0-9]+)?|TRK-\d{2}-\d{4}|OPH-\d{4}-\d{4}|TUS-\d{2}-\d{4}|KAR-\d{2}-[A-Z]+'
$RxBak   = '\.bak([-_.].*)?$|\.bak$'
$RxCopy  = ' \(\d+\)\.[A-Za-z0-9]+$| - Copy( \(\d+\))?\.[A-Za-z0-9]+$'
$RxSide  = '\.(SEARCH|TAGS)\.txt$'

function New-Stat([string]$name, [string]$path) {
    return @{ name = $name; path = $path; bytes = [long]0; files = 0; docs = 0; good = 0; pdfs = 0; side = 0; bak = 0; copies = 0
              maxTicks = [long]0; trk = (New-Object 'System.Collections.Generic.HashSet[string]'); kids = @{} }
}

function Scan-Root([string]$Root, [int]$Depth, [string]$ProgressFile) {
    if (-not (Test-Path -LiteralPath $Root)) { return $null }
    $rootFull = (Get-Item -LiteralPath $Root).FullName.TrimEnd('\', '/')
    $sep = [System.IO.Path]::DirectorySeparatorChar
    $nodes = @{}
    $rootStat = New-Stat (Split-Path -Leaf $rootFull) $rootFull
    $nodes[''] = $rootStat
    $stack = New-Object 'System.Collections.Generic.Stack[string]'
    $stack.Push($rootFull)
    $seen = 0; $skipped = 0
    while ($stack.Count -gt 0) {
        $dir = $stack.Pop()
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
            $di = New-Object System.IO.DirectoryInfo $dir
            $entries = @($di.EnumerateFileSystemInfos())
        } catch { $skipped++; continue }
        $fileNames = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
        foreach ($e in $entries) { if (-not ($e.Attributes -band [System.IO.FileAttributes]::Directory)) { [void]$fileNames.Add($e.Name) } }
        foreach ($e in $entries) {
            $isDir = [bool]($e.Attributes -band [System.IO.FileAttributes]::Directory)
            if ($isDir) {
                if ($e.Attributes -band [System.IO.FileAttributes]::ReparsePoint) { $skipped++; continue }
                $stack.Push($e.FullName); continue
            }
            $seen++
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
            foreach ($m in [regex]::Matches($n, $RxTrk)) { if ($st.trk.Count -lt 12) { [void]$st.trk.Add($m.Value) } }
            if ($n -match '\.pdf$') { $st.pdfs++; if ($fileNames.Contains($n + '.SEARCH.txt')) { $st.side++ } }
            if (($seen % 5000) -eq 0 -and $ProgressFile) { try { Add-Content -Path $ProgressFile -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + "  $Root files=$seen") } catch { } }
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
        foreach ($x in $c.trk) { if ($p.trk.Count -lt 12) { [void]$p.trk.Add($x) } }
    }
    return @{ root = $nodes['']; files = $seen; skipped = $skipped }
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

function Write-Outputs($results, [string]$OutDir, [string]$Label) {
    if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
    $stats = @($results | ForEach-Object { $_.root })
    $tb = ($stats | Measure-Object -Property bytes -Sum).Sum
    $roots = ($stats | ForEach-Object { To-Json $_ }) -join ','
    $json = ('{{"title":"This PC","source":"VTES-Inventory.ps1 (read-only)","generated":{0},"roots":[{1}]}}' -f (J $Label), $roots)
    [System.IO.File]::WriteAllText((Join-Path $OutDir 'TREEMAP-DATA.js'), ('window.VTES_TREE = ' + $json + ';' + "`r`n"), $Utf8)
    [System.IO.File]::WriteAllText((Join-Path $OutDir ('inventory_' + $Label.Substring(0, 10) + '.json')), $json, $Utf8)
    Write-Csv (Join-Path $OutDir ('conformance_' + $Label.Substring(0, 10) + '.csv')) $stats
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
    $res = Scan-Root $r 2 $null
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
    Check 'missing root is skipped, not fatal'       ($null -eq (Scan-Root (Join-Path $tmp 'nope') 2 $null))
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    Write-Host ('RESULT: {0} passed, {1} failed' -f $pass, $fail)
    if ($fail -eq 0) { exit 0 } else { exit 1 }
}

$label = (Get-Date).ToString('yyyy-MM-dd HH:mm')
if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }
$progress = Join-Path $OutDir 'inventory.progress.txt'
Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  START roots=' + ($Roots -join ' | '))
$done = New-Object System.Collections.ArrayList
foreach ($root in $Roots) {
    Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ROOT-BEGIN ' + $root)
    try {
        $r = Scan-Root $root $Depth $progress
        if ($r) { [void]$done.Add($r); Write-Outputs $done.ToArray() $OutDir $label
                  Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + ('  ROOT-DONE {0} files={1} skipped={2} bytes={3}' -f $root, $r.files, $r.skipped, $r.root.bytes)) }
        else { Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ROOT-MISSING ' + $root) }
    } catch { Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ROOT-ERROR ' + $root + ' ' + $_.Exception.Message) }
}
Add-Content -Path $progress -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + ('  DONE roots={0} of {1}' -f $done.Count, $Roots.Count))
Write-Host ('Inventory finished: {0} of {1} roots. Output: {2}' -f $done.Count, $Roots.Count, $OutDir)
