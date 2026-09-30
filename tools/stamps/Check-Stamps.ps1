<#
.SYNOPSIS
    Check-Stamps.ps1 - READ-ONLY checker for the TRK / OPH stamp and hashtags.

.DESCRIPTION
    Scans text-like files (.md .txt .htm .html .js, and *.SEARCH.txt sidecars,
    which are .txt) under a folder and reports, per file:
      1. HasTrk        a TRK-2026-NNNN id (optional suffix) is in the BODY
      2. HasOph        an OPH-2026-NNNN id is in the BODY
      3. ShortFormDrift  the short form TRK-26-NNNN appears (body or filename)
      4. HasStamp      a stamp line:  TRK-2026-#### . v[N] . [date] . CURRENT|SUPERSEDED
                       (page variant:  TRK-2026-#### . v[N] . pNNN . [date] . CURRENT)
      5. HashtagCount  hashtags in the body (letters-first, or 4+ digits like #20001)
      6. TrkInFilenameNotBody  the filename carries a TRK that the body does not
                       (charter violation, CLAUDE.md section 9)

    SAFETY: it never modifies, moves, renames or deletes any scanned file.
    It writes exactly one NEW CSV (never overwrites: if -Out exists, a numbered
    name is used). No network. Nothing is sent anywhere.

.PARAMETER Path
    Folder to scan recursively.

.PARAMETER Out
    Where to write the CSV. Default: a new file in the system temp folder.

.PARAMETER SelfTest
    Builds its own temp files covering every case and prints
    "RESULT: N passed, M failed".

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File Check-Stamps.ps1 -Path "G:\My Drive\01-JOBS" -Out "$env:TEMP\stamps.csv"

    TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #hashtag-protocol #stamps
    File is saved as UTF-8 WITH BOM so Windows PowerShell 5.1 reads it correctly (RI-032).
#>
[CmdletBinding()]
param(
    [string]$Path,
    [string]$Out,
    [switch]$SelfTest
)

Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'

# ---------------------------------------------------------------- settings
$script:MaxBytes   = 10MB
$script:Extensions = @('.md', '.txt', '.htm', '.html', '.js')
$RxNone = [System.Text.RegularExpressions.RegexOptions]::None

# TRK-2026-NNNN with optional suffix (-JULIA, -PZ1515, or a single letter as in 9952g)
$script:RxTrk = New-Object System.Text.RegularExpressions.Regex('(?<![A-Za-z0-9])TRK-2026-\d{4}(?:-[A-Za-z0-9]+|[a-z])?(?!\d)', $RxNone)
$script:RxOph = New-Object System.Text.RegularExpressions.Regex('(?<![A-Za-z0-9])OPH-2026-\d{4}(?!\d)', $RxNone)
# Short form drift: TRK-26-NNNN
$script:RxShort = New-Object System.Text.RegularExpressions.Regex('(?<![A-Za-z0-9])TRK-26-\d{4}(?!\d)', $RxNone)
# Stamp line. \u00B7 is the middle dot. Case-sensitive on purpose.
$script:RxStamp = New-Object System.Text.RegularExpressions.Regex('(?:TRK|OPH)-2026-\d{4}(?:-[A-Za-z0-9]+|[a-z])?[ \t]*\u00B7[ \t]*v\d+(?:[ \t]*\u00B7[ \t]*(p\d{3}))?[ \t]*\u00B7[ \t]*\d{4}-\d{2}-\d{2}[ \t]*\u00B7[ \t]*(?:CURRENT|SUPERSEDED)', $RxNone)
# Hashtag: not glued to a word, entity, URL or quote. Letters first, or 4+ digits (property numbers).
$script:RxTag = New-Object System.Text.RegularExpressions.Regex('(?<![\w&/"''=#\\])#(?:[A-Za-z][A-Za-z0-9_-]*|\d{4,}[A-Za-z0-9_-]*)', $RxNone)
$script:RxStyle  = New-Object System.Text.RegularExpressions.Regex('<style[\s\S]*?</style>', 'IgnoreCase')
$script:RxScript = New-Object System.Text.RegularExpressions.Regex('<script[\s\S]*?</script>', 'IgnoreCase')

# ---------------------------------------------------------------- helpers
function Read-TextSafe {
    param([string]$FilePath)
    $sr = $null
    try {
        $sr = New-Object System.IO.StreamReader($FilePath, [System.Text.Encoding]::UTF8, $true)
        return $sr.ReadToEnd()
    } finally {
        if ($sr -ne $null) { $sr.Dispose() }
    }
}

function Get-UniqueOutPath {
    param([string]$Wanted)
    $dir  = [System.IO.Path]::GetDirectoryName($Wanted)
    $base = [System.IO.Path]::GetFileNameWithoutExtension($Wanted)
    $ext  = [System.IO.Path]::GetExtension($Wanted)
    if (-not $ext) { $ext = '.csv' }
    $cand = Join-Path $dir ($base + $ext)
    $n = 2
    while (Test-Path -LiteralPath $cand) {
        $cand = Join-Path $dir ($base + '_' + $n + $ext)
        $n++
    }
    return $cand
}

function Test-StampFile {
    # Inspects ONE file. Read-only. Returns one row object.
    param([System.IO.FileInfo]$File)

    $name = $File.Name
    $kind = 'Text'
    if ($name -like '*.SEARCH.txt') { $kind = 'Sidecar' }

    $row = [ordered]@{
        Path                  = $File.FullName
        Kind                  = $kind
        Ext                   = $File.Extension.ToLowerInvariant()
        SizeBytes             = $File.Length
        Status                = ''
        HasTrk                = $false
        TrkIds                = ''
        HasOph                = $false
        ShortFormDrift        = $false
        HasStamp              = $false
        StampIsPage           = $false
        HashtagCount          = 0
        HasHashtag            = $false
        TrkInFilename         = $false
        TrkInFilenameNotBody  = $false
        Failing               = ''
    }

    if ($File.Length -gt $script:MaxBytes) {
        $row.Status  = 'SKIPPED-TOO-LARGE'
        $row.Failing = 'not read (over 10 MB)'
        return [pscustomobject]$row
    }

    $text = $null
    try {
        $text = Read-TextSafe -FilePath $File.FullName
    } catch {
        $row.Status  = 'UNREADABLE'
        $row.Failing = 'could not read file'
        return [pscustomobject]$row
    }
    if ($text -eq $null) { $text = '' }

    # --- TRK / OPH in body
    $trkMatches = $script:RxTrk.Matches($text)
    $ids = @()
    foreach ($m in $trkMatches) { if ($ids -notcontains $m.Value) { $ids += $m.Value } }
    $row.HasTrk = ($ids.Count -gt 0)
    $row.TrkIds = ($ids -join ';')
    $row.HasOph = $script:RxOph.IsMatch($text)

    # --- drift (body or filename)
    $row.ShortFormDrift = ($script:RxShort.IsMatch($text) -or $script:RxShort.IsMatch($name))

    # --- stamp line
    $sm = $script:RxStamp.Match($text)
    $row.HasStamp = $sm.Success
    if ($sm.Success -and $sm.Groups[1].Success -and $sm.Groups[1].Value) { $row.StampIsPage = $true }

    # --- hashtags (html: ignore style/script blocks)
    $tagText = $text
    if ($row.Ext -eq '.html' -or $row.Ext -eq '.htm') {
        $tagText = $script:RxStyle.Replace($tagText, ' ')
        $tagText = $script:RxScript.Replace($tagText, ' ')
    }
    $row.HashtagCount = $script:RxTag.Matches($tagText).Count
    $row.HasHashtag   = ($row.HashtagCount -ge 1)

    # --- TRK in filename but not in body
    $fnMatches = $script:RxTrk.Matches($name)
    if ($fnMatches.Count -gt 0) {
        $row.TrkInFilename = $true
        $bodyCores = @{}
        foreach ($m in $trkMatches) { $bodyCores[$m.Value.Substring(0, 13)] = $true }   # 'TRK-2026-NNNN'
        foreach ($m in $fnMatches) {
            if (-not $bodyCores.ContainsKey($m.Value.Substring(0, 13))) { $row.TrkInFilenameNotBody = $true }
        }
    }

    # --- verdict
    $fail = @()
    if (-not ($row.HasTrk -or $row.HasOph)) { $fail += 'no-id' }
    if (-not $row.HasStamp)                 { $fail += 'no-stamp' }
    if (-not $row.HasHashtag)               { $fail += 'no-hashtag' }
    if ($row.TrkInFilenameNotBody)          { $fail += 'trk-filename-only' }
    if ($row.ShortFormDrift)                { $fail += 'short-form-drift' }
    if ($fail.Count -eq 0) { $row.Status = 'PASS' } else { $row.Status = 'FAIL' }
    $row.Failing = ($fail -join ';')
    return [pscustomobject]$row
}

function Invoke-StampScan {
    param([string]$ScanPath, [string]$OutPath)

    if (-not (Test-Path -LiteralPath $ScanPath -PathType Container)) {
        throw "Folder not found: $ScanPath"
    }
    $outDir = [System.IO.Path]::GetDirectoryName($OutPath)
    if (-not (Test-Path -LiteralPath $outDir -PathType Container)) {
        throw "Output folder not found: $outDir"
    }

    $enumErr = @()
    $all = @(Get-ChildItem -LiteralPath $ScanPath -Recurse -File -Force -ErrorAction SilentlyContinue -ErrorVariable enumErr)
    $files = @($all | Where-Object {
        ($script:Extensions -contains $_.Extension.ToLowerInvariant()) -and
        ($_.FullName -notmatch '[\\/]\.git[\\/]')
    })

    $rows = New-Object System.Collections.ArrayList
    $i = 0
    foreach ($f in $files) {
        [void]$rows.Add((Test-StampFile -File $f))
        $i++
        if (($i % 250) -eq 0) { Write-Progress -Activity 'Check-Stamps (read-only)' -Status ("{0} of {1}" -f $i, $files.Count) -PercentComplete ([int](100 * $i / $files.Count)) }
    }
    Write-Progress -Activity 'Check-Stamps (read-only)' -Completed

    $final = Get-UniqueOutPath -Wanted $OutPath
    if ($rows.Count -gt 0) {
        $rows | Export-Csv -LiteralPath $final -NoTypeInformation -Encoding UTF8 -NoClobber
    } else {
        '"Path","Status"' | Out-File -LiteralPath $final -Encoding UTF8 -NoClobber
    }

    return [pscustomobject]@{
        Rows         = $rows.ToArray()
        OutPath      = $final
        ScanPath     = $ScanPath
        EnumErrors   = @($enumErr).Count
        OtherFiles   = ($all.Count - $files.Count)
    }
}

function Format-Count {
    param([int]$N)
    return $N.ToString('N0', [System.Globalization.CultureInfo]::InvariantCulture)
}

function Get-SummaryLines {
    param($Result)
    $rows = @($Result.Rows)
    $total = $rows.Count
    $read  = @($rows | Where-Object { $_.Status -eq 'PASS' -or $_.Status -eq 'FAIL' })
    $n     = $read.Count
    $skipped    = @($rows | Where-Object { $_.Status -eq 'SKIPPED-TOO-LARGE' }).Count
    $unreadable = @($rows | Where-Object { $_.Status -eq 'UNREADABLE' }).Count

    $pass      = @($read | Where-Object { $_.Status -eq 'PASS' }).Count
    $withTrk   = @($read | Where-Object { $_.HasTrk }).Count
    $withOph   = @($read | Where-Object { $_.HasOph }).Count
    $withId    = @($read | Where-Object { $_.HasTrk -or $_.HasOph }).Count
    $withStamp = @($read | Where-Object { $_.HasStamp }).Count
    $withTag   = @($read | Where-Object { $_.HasHashtag }).Count
    $drift     = @($read | Where-Object { $_.ShortFormDrift }).Count
    $fnTrk     = @($read | Where-Object { $_.TrkInFilename }).Count
    $fnOnly    = @($read | Where-Object { $_.TrkInFilenameNotBody }).Count
    $sidecars  = @($read | Where-Object { $_.Kind -eq 'Sidecar' })
    $scWithTrk = @($sidecars | Where-Object { $_.HasTrk }).Count

    $L = New-Object System.Collections.ArrayList
    [void]$L.Add(("SUMMARY: PASS {0} of {1} files read (id + stamp + hashtag, no drift, no filename-only TRK)." -f (Format-Count $pass), (Format-Count $n)))
    [void]$L.Add(("Scanned folder: {0}" -f $Result.ScanPath))
    [void]$L.Add(("Text-like files found: {0}. Read: {1}. Skipped over 10 MB: {2}. Unreadable: {3}." -f (Format-Count $total), (Format-Count $n), (Format-Count $skipped), (Format-Count $unreadable)))
    [void]$L.Add(("Other file types ignored (not text-like): {0}. Folders that could not be listed: {1}." -f (Format-Count $Result.OtherFiles), (Format-Count $Result.EnumErrors)))
    [void]$L.Add(("1. TRK-2026-NNNN in body: {0} of {1}. OPH in body: {2} of {1}. Either id: {3} of {1}." -f (Format-Count $withTrk), (Format-Count $n), (Format-Count $withOph), (Format-Count $withId)))
    [void]$L.Add(("2. Stamp line present: {0} of {1}." -f (Format-Count $withStamp), (Format-Count $n)))
    [void]$L.Add(("3. At least one hashtag: {0} of {1}." -f (Format-Count $withTag), (Format-Count $n)))
    [void]$L.Add(("4. Short-form TRK-26- drift: {0} of {1}." -f (Format-Count $drift), (Format-Count $n)))
    [void]$L.Add(("5. TRK in filename but NOT in body (violation): {0} of {1} files that carry a TRK in the filename." -f (Format-Count $fnOnly), (Format-Count $fnTrk)))
    [void]$L.Add(("6. OCR sidecars (*.SEARCH.txt) with a TRK in body: {0} of {1}." -f (Format-Count $scWithTrk), (Format-Count $sidecars.Count)))
    [void]$L.Add(("CSV written (new file, nothing overwritten): {0}" -f $Result.OutPath))
    [void]$L.Add('READ-ONLY: no scanned file was modified, moved, renamed or deleted.')
    return $L.ToArray()
}

# ---------------------------------------------------------------- self test
function Invoke-SelfTest {
    $script:tPass = 0
    $script:tFail = 0
    function Assert-That {
        param([string]$Name, [bool]$Condition)
        if ($Condition) { $script:tPass++; Write-Host ("  PASS  " + $Name) }
        else            { $script:tFail++; Write-Host ("  FAIL  " + $Name) -ForegroundColor Red }
    }

    $dot  = [string][char]0x00B7
    $root = Join-Path ([System.IO.Path]::GetTempPath()) ('stamps-selftest-' + [guid]::NewGuid().ToString('N'))
    $scan = Join-Path $root 'scan'
    $outd = Join-Path $root 'out'
    New-Item -ItemType Directory -Path $scan -Force | Out-Null
    New-Item -ItemType Directory -Path $outd -Force | Out-Null
    $utf8Bom   = New-Object System.Text.UTF8Encoding($true)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

    function New-TestFile { param([string]$Name, [string]$Body, $Enc) [System.IO.File]::WriteAllText((Join-Path $scan $Name), $Body, $Enc); }

    $stamp = "TRK-2026-1262 $dot v2 $dot 2026-09-30 $dot CURRENT"
    $page  = "TRK-2026-1247 $dot v3 $dot p047 $dot 2026-08-15 $dot CURRENT"
    $oph   = "OPH-2026-0042 $dot v1 $dot 2026-09-30 $dot SUPERSEDED"

    New-TestFile 'good.md'       ("# Good`nBody text`n$stamp #JorgeValdes #CU-Inspections`n") $utf8Bom
    New-TestFile 'page.md'       ("Page text`n$page #MDC #20001`n") $utf8NoBom
    New-TestFile 'empty-ids.txt' ("Nothing useful here. No id, no tag.`n") $utf8NoBom
    New-TestFile 'short.md'      ("See TRK-26-1234 for details #JorgeValdes`n") $utf8NoBom
    New-TestFile '2026-07-29 _ TRK-2026-1262 _ Report _ Job File Summary _ v1.md' ("Filename has the TRK, body does not. #JorgeValdes`n") $utf8NoBom
    New-TestFile '2026-07-29 _ TRK-2026-1300 _ Report _ Both _ v1.md' ("Body has it too: TRK-2026-1300 #JorgeValdes`n") $utf8NoBom
    New-TestFile 'plan.PDF.SEARCH.txt' ("Sidecar text TRK-2026-1536 #10980 #Property-Address`n") $utf8NoBom
    New-TestFile 'orphan.md'     ("$oph #OPH-2026-0042`n") $utf8Bom
    New-TestFile 'colors.html'   ("<html><style>.a{color:#fff;background:#10980}</style><body><a href=`"#top`">x</a><p>plain</p></body></html>") $utf8NoBom
    New-TestFile 'suffix.md'     ("TRK-2026-0708-JULIA and TRK-2026-9952g #JorgeValdes`n") $utf8NoBom
    New-TestFile 'numeric.txt'   ("#1 priority, #20001 and #10980 are tags.`n") $utf8NoBom
    New-TestFile 'bad-stamp.md'  ("TRK-2026-1262 - v2 - 2026-09-30 - CURRENT #JorgeValdes`n") $utf8NoBom
    New-TestFile 'page.js'       ("// TRK-2026-9910-B #hashtag-protocol`nvar x = 1;`n") $utf8NoBom
    [System.IO.File]::WriteAllBytes((Join-Path $scan 'ignored.pdf'), [byte[]](1,2,3,4))
    New-Item -ItemType Directory -Path (Join-Path $scan 'sub\deeper') -Force | Out-Null
    [System.IO.File]::WriteAllText((Join-Path $scan 'sub\deeper\nested.md'), ("nested $stamp #a1`n"), $utf8NoBom)

    # read-only proof: hash everything before
    $hashBefore = @{}
    foreach ($f in Get-ChildItem -LiteralPath $scan -Recurse -File) {
        $hashBefore[$f.FullName] = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
    }
    $countBefore = $hashBefore.Count

    # no-overwrite proof: pre-create the -Out file
    $outWanted = Join-Path $outd 'result.csv'
    [System.IO.File]::WriteAllText($outWanted, 'PRECIOUS', $utf8NoBom)

    $res  = Invoke-StampScan -ScanPath $scan -OutPath $outWanted
    $rows = @($res.Rows)
    function Get-Row { param([string]$Leaf) return @($rows | Where-Object { $_.Path -like ('*' + $Leaf) })[0] }

    $g = Get-Row 'good.md'
    Assert-That 'good.md: id, stamp, hashtag, PASS (UTF-8 BOM decodes the middle dot)' ($g.HasTrk -and $g.HasStamp -and $g.HasHashtag -and $g.Status -eq 'PASS')
    $p = Get-Row 'page.md'
    Assert-That 'page.md: page-variant stamp with p047 detected' ($p.HasStamp -and $p.StampIsPage)
    Assert-That 'good.md: plain stamp is not flagged as page' (-not $g.StampIsPage)
    $e = Get-Row 'empty-ids.txt'
    Assert-That 'empty-ids.txt: no id, no stamp, no hashtag, FAIL' ((-not $e.HasTrk) -and (-not $e.HasStamp) -and (-not $e.HasHashtag) -and $e.Status -eq 'FAIL')
    $s = Get-Row 'short.md'
    Assert-That 'short.md: TRK-26-1234 flagged as drift and is not a full TRK' ($s.ShortFormDrift -and (-not $s.HasTrk) -and $s.Status -eq 'FAIL')
    $fo = Get-Row 'Job File Summary _ v1.md'
    Assert-That 'filename-only TRK: violation flagged' ($fo.TrkInFilename -and $fo.TrkInFilenameNotBody -and $fo.Failing -like '*trk-filename-only*')
    $fb = Get-Row 'Both _ v1.md'
    Assert-That 'TRK in filename and body: no violation' ($fb.TrkInFilename -and (-not $fb.TrkInFilenameNotBody))
    $sc = Get-Row 'plan.PDF.SEARCH.txt'
    Assert-That 'sidecar: Kind=Sidecar, TRK and hashtags found' ($sc.Kind -eq 'Sidecar' -and $sc.HasTrk -and $sc.HashtagCount -eq 2)
    $o = Get-Row 'orphan.md'
    Assert-That 'OPH stamp accepted (SUPERSEDED), HasOph true, no TRK' ($o.HasOph -and $o.HasStamp -and (-not $o.HasTrk))
    $h = Get-Row 'colors.html'
    Assert-That 'html: css colors, anchors and style blocks are not hashtags' ($h.HashtagCount -eq 0)
    $x = Get-Row 'suffix.md'
    Assert-That 'suffixes -JULIA and 9952g recognised as full TRKs' (($x.TrkIds -like '*TRK-2026-0708-JULIA*') -and ($x.TrkIds -like '*TRK-2026-9952g*'))
    $nu = Get-Row 'numeric.txt'
    Assert-That 'numeric tags #20001 and #10980 count; #1 does not' ($nu.HashtagCount -eq 2)
    $bs = Get-Row 'bad-stamp.md'
    Assert-That 'stamp with hyphens instead of middle dots is NOT a stamp' (-not $bs.HasStamp)
    $js = Get-Row 'page.js'
    Assert-That '.js scanned; admin suffix TRK-2026-9910-B read in full' ($js.TrkIds -eq 'TRK-2026-9910-B')
    $ne = Get-Row 'nested.md'
    Assert-That 'recursion reaches sub\deeper\nested.md' ($ne -ne $null -and $ne.Status -eq 'PASS')
    Assert-That '.pdf is ignored (not in the rows)' (@($rows | Where-Object { $_.Path -like '*ignored.pdf' }).Count -eq 0)
    Assert-That 'row count is 14 text-like files' ($rows.Count -eq 14)

    # read-only proof: hash everything after
    $hashAfter = @{}
    foreach ($f in Get-ChildItem -LiteralPath $scan -Recurse -File) {
        $hashAfter[$f.FullName] = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
    }
    $same = ($hashAfter.Count -eq $countBefore)
    foreach ($k in $hashBefore.Keys) { if (-not $hashAfter.ContainsKey($k) -or $hashAfter[$k] -ne $hashBefore[$k]) { $same = $false } }
    Assert-That 'READ-ONLY: every scanned file has the same SHA-256 and none added or removed' $same

    Assert-That 'NO-OVERWRITE: existing -Out file untouched' (([System.IO.File]::ReadAllText($outWanted)) -eq 'PRECIOUS')
    Assert-That 'NO-OVERWRITE: a new numbered CSV was written instead' (($res.OutPath -ne $outWanted) -and (Test-Path -LiteralPath $res.OutPath) -and ($res.OutPath -like '*result_2.csv'))
    $csv = @(Import-Csv -LiteralPath $res.OutPath)
    Assert-That 'CSV has one row per scanned file' ($csv.Count -eq 14)

    $sum = @(Get-SummaryLines -Result $res)
    Assert-That 'summary states denominators ("of 14")' (($sum[0] -like 'SUMMARY: PASS * of 14 files read*') -and ($sum[4] -like '*of 14*'))
    Assert-That 'summary never says "good progress"' (@($sum | Where-Object { $_ -like '*good progress*' }).Count -eq 0)

    # empty folder gives a header-only CSV and a 0 of 0 summary, not a crash
    $emptyDir = Join-Path $root 'emptyscan'
    New-Item -ItemType Directory -Path $emptyDir | Out-Null
    $r2 = Invoke-StampScan -ScanPath $emptyDir -OutPath (Join-Path $outd 'empty.csv')
    $s2 = @(Get-SummaryLines -Result $r2)
    Assert-That 'empty folder: 0 of 0, no crash' ($s2[0] -like 'SUMMARY: PASS 0 of 0 files read*')

    # missing folder throws
    $threw = $false
    try { [void](Invoke-StampScan -ScanPath (Join-Path $root 'nope') -OutPath (Join-Path $outd 'x.csv')) } catch { $threw = $true }
    Assert-That 'missing folder is an error, not a silent 0' $threw

    # clean up only our own temp folder
    try { Remove-Item -LiteralPath $root -Recurse -Force } catch { Write-Host ("  note: could not remove " + $root) }

    Write-Host ''
    Write-Host ("RESULT: {0} passed, {1} failed" -f $script:tPass, $script:tFail)
    if ($script:tFail -gt 0) { return 1 } else { return 0 }
}

# ---------------------------------------------------------------- main
if ($SelfTest) {
    $code = Invoke-SelfTest
    exit $code
}

if (-not $Path) {
    Write-Host 'Usage:'
    Write-Host '  Check-Stamps.ps1 -Path <folder> [-Out <file.csv>]   (read-only scan)'
    Write-Host '  Check-Stamps.ps1 -SelfTest'
    Write-Host 'Want me to run the self-test first? Re-run with -SelfTest.'
    exit 2
}

if (-not $Out) {
    $Out = Join-Path ([System.IO.Path]::GetTempPath()) ('stamps-check_' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.csv')
}
$Out = [System.IO.Path]::GetFullPath($Out)

$result = Invoke-StampScan -ScanPath $Path -OutPath $Out
foreach ($line in (Get-SummaryLines -Result $result)) { Write-Host $line }
exit 0

# Question for the next session: did the self-test print 'RESULT: 25 passed, 0 failed' on the PC?
