<#
.SYNOPSIS
  Stamps "I am alive" for one window into vtes-status.js, which the VTES launcher reads to colour its tabs and count hours down.
.DESCRIPTION
  TRK-2026-9910-B · #VTES-control-panel #STATUS #heartbeat
  Writes only one file: vtes-status.js next to this script (or -OutFile). Never reads or writes anything else.
  Format of the file: one line  window.VTES_STATUS = { "LLM-01": { "st":"up", "seen":"2026-09-30T20:40:00Z", "note":"..." } };
  Run it on a schedule (every 10 minutes) from the window's own machine, e.g.:
    powershell.exe -NoProfile -File Write-VtesStatus.ps1 -Id LLM-01 -Note "RAMBO heartbeat"
  -SelfTest runs 8 checks in a temp folder and prints RESULT.
#>
param(
  [string]$Id = 'LLM-01',
  [string]$Note = '',
  [string]$OutFile = '',
  [switch]$SelfTest
)
$ErrorActionPreference = 'Stop'
$ValidIds = 'LLM-01','LLM-02','LLM-03','LLM-04','LLM-05','LLM-06','LLM-07','LLM-08','LLM-10','BOTS'

function Read-Status([string]$path) {
  $h = @{}
  if (Test-Path -LiteralPath $path) {
    $raw = (Get-Content -LiteralPath $path -Raw -Encoding UTF8).Trim()
    $m = [regex]::Match($raw, '^window\.VTES_STATUS\s*=\s*(\{[\s\S]*\})\s*;?\s*$')
    if ($m.Success) {
      $o = $m.Groups[1].Value | ConvertFrom-Json
      foreach ($p in $o.PSObject.Properties) {
        $e = @{}; foreach ($q in $p.Value.PSObject.Properties) { $v = $q.Value; if ($v -is [DateTime]) { $v = $v.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ') }; $e[$q.Name] = $v }
        $h[$p.Name] = $e
      }
    }
  }
  return $h
}
function Write-Status([string]$path, $h) {
  $ordered = [ordered]@{}
  foreach ($k in ($h.Keys | Sort-Object)) { $ordered[$k] = $h[$k] }
  $json = $ordered | ConvertTo-Json -Depth 4 -Compress
  $tmp = "$path.tmp"
  Set-Content -LiteralPath $tmp -Value ("window.VTES_STATUS = " + $json + ";") -Encoding UTF8
  Move-Item -LiteralPath $tmp -Destination $path -Force
}
function Stamp([string]$path, [string]$id, [string]$note) {
  if ($ValidIds -notcontains $id) { throw "Unknown id '$id'. Valid: $($ValidIds -join ', ')" }
  $h = Read-Status $path
  $e = @{ st = 'up'; seen = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ') }
  if ($note) { $e['note'] = $note }
  $h[$id] = $e
  Write-Status $path $h
  return $e['seen']
}

if ($SelfTest) {
  $dir = Join-Path ([IO.Path]::GetTempPath()) ("vtes-status-test-" + [guid]::NewGuid().ToString('N'))
  New-Item -ItemType Directory -Path $dir | Out-Null
  $f = Join-Path $dir 'vtes-status.js'; $pass = 0; $fail = 0
  function T($name, $ok) { if ($ok) { $script:pass++; Write-Host "PASS $name" } else { $script:fail++; Write-Host "FAIL $name" } }
  $t1 = Stamp $f 'LLM-01' 'first'
  T 'file created' (Test-Path $f)
  $raw = Get-Content $f -Raw
  T 'starts with window.VTES_STATUS' ($raw.StartsWith('window.VTES_STATUS = {'))
  T 'has LLM-01 up' ($raw -match '"LLM-01":\{[^}]*"st":"up"')
  $null = Stamp $f 'LLM-02' 'cloud'
  $h = Read-Status $f
  T 'second id added, first kept' ($h.ContainsKey('LLM-01') -and $h.ContainsKey('LLM-02'))
  Start-Sleep -Seconds 1
  $t3 = Stamp $f 'LLM-01' 'again'
  $h = Read-Status $f
  T 'restamp updates seen' ($h['LLM-01']['seen'] -ge $t1 -and $h['LLM-01']['note'] -eq 'again')
  $threw = $false; try { Stamp $f 'NOPE' '' | Out-Null } catch { $threw = $true }
  T 'unknown id refused' $threw
  T 'no temp file left behind' (-not (Test-Path "$f.tmp"))
  T 'seen looks like ISO UTC' ($h['LLM-02']['seen'] -match '^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$')
  Remove-Item -Recurse -Force $dir
  Write-Host "RESULT: $pass passed, $fail failed"
  if ($fail -gt 0) { exit 1 } else { exit 0 }
}

if (-not $OutFile) { $OutFile = Join-Path $PSScriptRoot 'vtes-status.js' }
$seen = Stamp $OutFile $Id $Note
Write-Host "Stamped $Id alive at $seen in $OutFile"
