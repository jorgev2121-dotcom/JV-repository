<#
.SYNOPSIS
  Checks every CODE file of the VTES control panel against MANIFEST.sha256 and writes vtes-verify.js for the Panel home page.
.DESCRIPTION
  TRK-2026-9910-B · #VTES-control-panel #integrity #sha256 · Tier 3 enforcement: re-applies the check on a schedule.
  -Build      write MANIFEST.sha256 from the files as they are NOW (run only from a known-good git checkout).
  -Check      (default) compare; writes vtes-verify.js ({ at, ok, checked, bad:[], missing:[] }); exit 0 = all match, 1 = problem.
  -SelfTest   8 checks in a temp folder. Prints RESULT.
  Code files are fingerprinted. DATA files (vtes-reminders.js, programs-data.js, vtes-status.js, vtes-verify.js, vtes-budget.js) may change; they only have to exist (vtes-status/verify/budget are optional).
  Reads and writes only inside the panel folder. Sends nothing anywhere.
#>
param([string]$Dir = '', [switch]$Build, [switch]$Check, [switch]$SelfTest)
$ErrorActionPreference = 'Stop'
$CodeFiles = 'VTES-PANEL.html','VTES-LLM-LAUNCHER.html','VTES-BUDGET.html','VTES-MUNICIPALITIES.html','VTES-PROGRAMS.html','VTES-REMINDERS.html','VTES-TREEMAP.html','vtes-common.js','vtes-subs.js','vtes-modules.js','municipalities-data.js','Write-VtesStatus.ps1','Export-ProgramsData.ps1','VTES-RedBell.ps1','Verify-VtesPanel.ps1','VTES-Gauge.ps1','VTES-CaptureReview.ps1','VTES-TASKS.html','VTES-PORTAL.html','VTES-CAPTURE.html','VTES-WHERE.html','VTES-INTERVIEW.html','tasks-data.js','portal-workflow.js','portal-jobs.js','capture-jobs.js','where-data.js'
$DataRequired = 'vtes-reminders.js','programs-data.js'

function Get-Sha([string]$p) { (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() }
function Build-Manifest([string]$dir, [string[]]$files) {
  $lines = @()
  foreach ($f in $files) { $p = Join-Path $dir $f; if (Test-Path -LiteralPath $p) { $lines += ((Get-Sha $p) + '  ' + $f) } }
  [IO.File]::WriteAllText((Join-Path $dir 'MANIFEST.sha256'), (($lines -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
  return $lines.Count
}
function Check-Manifest([string]$dir, [string[]]$dataReq) {
  $mf = Join-Path $dir 'MANIFEST.sha256'
  $bad = @(); $missing = @(); $checked = 0
  if (-not (Test-Path -LiteralPath $mf)) { $missing += 'MANIFEST.sha256' }
  else {
    foreach ($ln in (Get-Content -LiteralPath $mf -Encoding UTF8)) {
      if ($ln -match '^([0-9a-f]{64})  (.+)$') {
        $h = $Matches[1]; $f = $Matches[2]; $p = Join-Path $dir $f
        if (-not (Test-Path -LiteralPath $p)) { $missing += $f; continue }
        $checked++; if ((Get-Sha $p) -ne $h) { $bad += $f }
      }
    }
  }
  foreach ($d in $dataReq) { if (-not (Test-Path -LiteralPath (Join-Path $dir $d))) { $missing += $d } }
  $ok = ($bad.Count -eq 0 -and $missing.Count -eq 0 -and $checked -gt 0)
  $q = { param($a) '[' + (($a | ForEach-Object { '"' + $_ + '"' }) -join ',') + ']' }
  $js = 'window.VTES_VERIFY = {"at":"' + [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ') + '","ok":' + ($ok.ToString().ToLower()) + ',"checked":' + $checked + ',"bad":' + (& $q $bad) + ',"missing":' + (& $q $missing) + '};'
  [IO.File]::WriteAllText((Join-Path $dir 'vtes-verify.js'), $js + "`n", (New-Object Text.UTF8Encoding($false)))
  return [pscustomobject]@{ Ok = $ok; Checked = $checked; Bad = $bad; Missing = $missing }
}

if ($SelfTest) {
  $t = Join-Path ([IO.Path]::GetTempPath()) ('vtes-verify-test-' + [guid]::NewGuid().ToString('N')); New-Item -ItemType Directory -Path $t | Out-Null
  $pass = 0; $fail = 0; function T($n, $c) { if ($c) { $script:pass++; Write-Host "PASS $n" } else { $script:fail++; Write-Host "FAIL $n" } }
  $files = 'a.html', 'b.js'; Set-Content (Join-Path $t 'a.html') 'alpha' -Encoding UTF8; Set-Content (Join-Path $t 'b.js') 'beta' -Encoding UTF8; Set-Content (Join-Path $t 'data.js') 'x' -Encoding UTF8
  $n = Build-Manifest $t $files; T 'manifest lists 2 files' ($n -eq 2)
  $r = Check-Manifest $t @('data.js'); T 'clean folder passes' ($r.Ok -and $r.Checked -eq 2)
  T 'verify js says ok true' ((Get-Content (Join-Path $t 'vtes-verify.js') -Raw) -match '"ok":true')
  Set-Content (Join-Path $t 'b.js') 'betA' -Encoding UTF8; $r = Check-Manifest $t @('data.js'); T 'one changed character is caught by name' ((-not $r.Ok) -and ($r.Bad -contains 'b.js'))
  T 'verify js says ok false and names b.js' (((Get-Content (Join-Path $t 'vtes-verify.js') -Raw) -match '"ok":false') -and ((Get-Content (Join-Path $t 'vtes-verify.js') -Raw) -match 'b\.js'))
  Set-Content (Join-Path $t 'b.js') 'beta' -Encoding UTF8; Remove-Item (Join-Path $t 'a.html'); $r = Check-Manifest $t @('data.js'); T 'deleted file is reported missing' ($r.Missing -contains 'a.html')
  Set-Content (Join-Path $t 'a.html') 'alpha' -Encoding UTF8; Remove-Item (Join-Path $t 'data.js'); $r = Check-Manifest $t @('data.js'); T 'missing data file is reported' ($r.Missing -contains 'data.js')
  Set-Content (Join-Path $t 'data.js') 'changed freely' -Encoding UTF8; $r = Check-Manifest $t @('data.js'); T 'data files may change' $r.Ok
  Remove-Item -Recurse -Force $t
  Write-Host "RESULT: $pass passed, $fail failed"; if ($fail) { exit 1 } else { exit 0 }
}

if (-not $Dir) { $Dir = $PSScriptRoot }
if ($Build) { $n = Build-Manifest $Dir $CodeFiles; Write-Host "MANIFEST.sha256 written: $n files"; exit 0 }
$r = Check-Manifest $Dir $DataRequired
if ($r.Ok) { Write-Host "OK: $($r.Checked) code files match"; exit 0 }
Write-Host ("PROBLEM: changed = " + ($r.Bad -join ', ') + " ; missing = " + ($r.Missing -join ', ')); exit 1
