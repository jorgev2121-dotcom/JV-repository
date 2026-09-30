<#
.SYNOPSIS
  The gas gauge for Claude: counts tokens used in the last 5 hours and 7 days from Claude Code's own local logs, turns them into percent-of-plan, and warns BEFORE the plan goes dark.
.DESCRIPTION
  TRK-2026-9910-B · #gauge #token-manager #rotator #never-go-dark · Part of the Governor's desk (VTES-BUDGET.html).
  READ: %USERPROFILE%\.claude\projects\**\*.jsonl (Claude Code writes one line per model reply with usage numbers). Reads only; never edits those logs.
  WRITE (panel folder only): vtes-budget.js (the meters) and vtes-alerts.js (warnings; empty when all is well). Sends nothing anywhere.
  COUNTED: input + output + cache-creation tokens per reply (each reply counted once, even if logged several times). Cache reads are not counted.
  HONEST LIMITS: Claude's apps do not publish the plan caps, so percent is relative to a CAP you calibrate once: open the usage screen, then run
     VTES-Gauge.ps1 -Calibrate short=45 week=30        (the percents the app shows right now)
  The script then solves cap = tokens / percent and saves it in vtes-gauge-config.json. Until then it reports tokens only and says NOT CALIBRATED.
  It sees Claude Code on THIS machine only. Usage in the Claude app, Cowork or on the phone is not in these logs, so the real plan meter can be higher: the alert says so.
  Codex, Grok, Gemini and Copilot have no local log it can read: their meters stay manual.
  Warn at 75% used, HOLD at 90%. Schedule every 15 minutes. -SelfTest runs 9 checks on synthetic logs.
#>
param([string]$Logs = '', [string]$Dir = '', [string[]]$Calibrate = @(), [switch]$SelfTest)
$ErrorActionPreference = 'Stop'
if (-not $Dir) { $Dir = $PSScriptRoot }
if (-not $Logs) { $h = if ($env:USERPROFILE) { $env:USERPROFILE } else { $HOME }; $Logs = Join-Path (Join-Path $h '.claude') 'projects' }

function Get-Tokens([string]$root, [datetime]$nowUtc) {
  $seen = @{}; $files = 0; $lines = 0
  if (-not (Test-Path -LiteralPath $root)) { return [pscustomobject]@{ Short = 0; Week = 0; Replies = 0; Files = 0; Found = $false } }
  $cut5 = $nowUtc.AddHours(-5); $cut7 = $nowUtc.AddDays(-7); $t5 = 0L; $t7 = 0L
  foreach ($f in (Get-ChildItem -LiteralPath $root -Recurse -Filter *.jsonl -File -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTimeUtc -ge $cut7 })) {
    $files++
    foreach ($ln in [IO.File]::ReadLines($f.FullName)) {
      if ($ln.IndexOf('"usage"') -lt 0 -or $ln.IndexOf('"assistant"') -lt 0) { continue }
      $lines++
      try { $o = $ln | ConvertFrom-Json } catch { continue }
      if ($o.type -ne 'assistant' -or -not $o.message -or -not $o.message.usage) { continue }
      $ts = [datetime]::Parse($o.timestamp, [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::AdjustToUniversal -bor [Globalization.DateTimeStyles]::AssumeUniversal)
      if ($ts -lt $cut7) { continue }
      $u = $o.message.usage
      $n = [long]($u.input_tokens) + [long]($u.output_tokens) + [long]($u.cache_creation_input_tokens)
      $key = if ($o.message.id) { [string]$o.message.id } else { "$($f.Name):$lines" }
      if ($seen.ContainsKey($key)) { if ($n -le $seen[$key].N) { continue } else { $old = $seen[$key]; $t7 -= $old.N; if ($old.T -ge $cut5) { $t5 -= $old.N } } }
      $seen[$key] = @{ N = $n; T = $ts }
      $t7 += $n; if ($ts -ge $cut5) { $t5 += $n }
    }
  }
  return [pscustomobject]@{ Short = $t5; Week = $t7; Replies = $seen.Count; Files = $files; Found = $true }
}
function Get-Pct($tokens, $cap) { if ($cap -and $cap -gt 0) { return [math]::Min(100, [math]::Round(100.0 * $tokens / $cap, 0)) } else { return $null } }
function Read-Config([string]$p) { if (Test-Path -LiteralPath $p) { return (Get-Content -LiteralPath $p -Raw -Encoding UTF8 | ConvertFrom-Json) } else { return [pscustomobject]@{ short_cap = 0; week_cap = 0 } } }
function Write-Outputs([string]$dir, $tok, $cfg, [datetime]$nowUtc) {
  $p0 = Get-Pct $tok.Short $cfg.short_cap; $p1 = Get-Pct $tok.Week $cfg.week_cap
  $stamp = $nowUtc.ToString('yyyy-MM-ddTHH:mm:ssZ')
  $m = @("`"tokens5h`":$($tok.Short)", "`"tokens7d`":$($tok.Week)", "`"replies`":$($tok.Replies)", "`"src`":`"gauge`"", "`"at`":`"$stamp`"", "`"calibrated`":$((($cfg.short_cap -gt 0) -or ($cfg.week_cap -gt 0)).ToString().ToLower())")
  if ($p0 -ne $null) { $m += "`"m0`":$p0" }; if ($p1 -ne $null) { $m += "`"m1`":$p1" }
  $js = 'window.VTES_BUDGET = {"claude":{' + ($m -join ',') + '},"at":"' + $stamp + '"};'
  [IO.File]::WriteAllText((Join-Path $dir 'vtes-budget.js'), $js + "`n", (New-Object Text.UTF8Encoding($false)))
  $alerts = @(); $worst = 0
  foreach ($pair in @(@('5-hour window', $p0), @('weekly', $p1))) { if ($pair[1] -ne $null -and $pair[1] -gt $worst) { $worst = $pair[1]; $lab = $pair[0] } }
  if ($worst -ge 75) {
    $lvl = if ($worst -ge 90) { 'HOLD' } else { 'WARN' }
    $title = "Claude $lab is $worst% used ($lvl): move jobs down the line before it goes dark"
    $detail = 'Everyday work: Gemini. Hard work: Codex once signed in. News: Grok. Build and install: Codex, then Cowork. The gauge sees Claude Code on this PC only; the app, Cowork and phone may add more.'
    $alerts += "{ id: 'A-claude-gauge', kind: 'gauge', title: '$title', due: '', detail: '$detail', src: 'VTES-Gauge.ps1', done: false }"
  }
  [IO.File]::WriteAllText((Join-Path $dir 'vtes-alerts.js'), ('window.VTES_ALERTS = [' + ($alerts -join ",`n") + '];' + "`n"), (New-Object Text.UTF8Encoding($false)))
  return [pscustomobject]@{ P0 = $p0; P1 = $p1; Alerts = $alerts.Count }
}

if ($SelfTest) {
  $t = Join-Path ([IO.Path]::GetTempPath()) ('vtes-gauge-test-' + [guid]::NewGuid().ToString('N')); $logs = Join-Path $t 'logs\proj'; New-Item -ItemType Directory -Path $logs -Force | Out-Null
  $pass = 0; $fail = 0; function T($n, $c) { if ($c) { $script:pass++; Write-Host "PASS $n" } else { $script:fail++; Write-Host "FAIL $n" } }
  $now = [datetime]::Parse('2026-09-30T20:00:00Z', [Globalization.CultureInfo]::InvariantCulture, [Globalization.DateTimeStyles]::AdjustToUniversal -bor [Globalization.DateTimeStyles]::AssumeUniversal)
  function L($id, $ago, $in, $out, $cc, $cr) { $ts = $now.AddMinutes(-$ago).ToString('yyyy-MM-ddTHH:mm:ss.000Z'); return ('{"type":"assistant","timestamp":"' + $ts + '","message":{"id":"' + $id + '","usage":{"input_tokens":' + $in + ',"output_tokens":' + $out + ',"cache_creation_input_tokens":' + $cc + ',"cache_read_input_tokens":' + $cr + '}}}') }
  $rows = @(
    (L 'm1' 30 100 400 500 99999), (L 'm1' 30 100 900 500 99999),     # same reply twice, second is the final count: 1500
    (L 'm2' 200 50 50 0 5000),                                          # 100, inside 5h
    (L 'm3' 400 1000 0 0 0),                                            # 1000, outside 5h, inside 7d
    (L 'm4' (60 * 24 * 8) 7777 0 0 0),                                  # too old
    '{"type":"user","timestamp":"2026-09-30T19:00:00.000Z","message":{"content":"hi"}}', 'not json at all "usage" "assistant"')
  Set-Content -LiteralPath (Join-Path $logs 's1.jsonl') -Value $rows -Encoding UTF8
  (Get-Item (Join-Path $logs 's1.jsonl')).LastWriteTimeUtc = $now
  $tok = Get-Tokens (Join-Path $t 'logs') $now
  T 'a reply logged twice is counted once, at its final size (1500 + 100 = 1600 in 5h)' ($tok.Short -eq 1600)
  T 'week window adds the 6.7-hour-old reply (1600 + 1000 = 2600); 8-day-old is excluded' ($tok.Week -eq 2600)
  T 'three distinct replies counted' ($tok.Replies -eq 3)
  T 'missing log folder reports Found=false' (-not (Get-Tokens (Join-Path $t 'nope') $now).Found)
  $cfg = [pscustomobject]@{ short_cap = 2000; week_cap = 10000 }
  $r = Write-Outputs $t $tok $cfg $now; T 'percent = tokens / cap (1600/2000 = 80)' ($r.P0 -eq 80 -and $r.P1 -eq 26)
  T 'an 80% reading raises exactly one WARN alert' ($r.Alerts -eq 1 -and ((Get-Content (Join-Path $t 'vtes-alerts.js') -Raw) -match "WARN"))
  $r = Write-Outputs $t $tok ([pscustomobject]@{ short_cap = 1700; week_cap = 10000 }) $now; T 'at 94% the alert says HOLD' ((Get-Content (Join-Path $t 'vtes-alerts.js') -Raw) -match 'HOLD')
  $r = Write-Outputs $t $tok ([pscustomobject]@{ short_cap = 100000; week_cap = 100000 }) $now; T 'low use gives an empty alerts file' (((Get-Content (Join-Path $t 'vtes-alerts.js') -Raw).Trim()) -eq 'window.VTES_ALERTS = [];')
  $b = Get-Content (Join-Path $t 'vtes-budget.js') -Raw; T 'budget file has the meters and a timestamp' (($b -match 'window\.VTES_BUDGET = \{"claude":\{') -and ($b -match '"at":"2026-09-30T20:00:00Z"') -and ($b -match '"tokens5h":1600'))
  Remove-Item -Recurse -Force $t; Write-Host "RESULT: $pass passed, $fail failed"; if ($fail) { exit 1 } else { exit 0 }
}

$nowUtc = [DateTime]::UtcNow; $cfgPath = Join-Path $Dir 'vtes-gauge-config.json'; $tok = Get-Tokens $Logs $nowUtc; $cfg = Read-Config $cfgPath
if ($Calibrate.Count -gt 0) {
  $set = @{ short_cap = [double]$cfg.short_cap; week_cap = [double]$cfg.week_cap }
  foreach ($c in $Calibrate) { if ($c -match '^(short|week)=(\d+(\.\d+)?)$') { $pct = [double]$Matches[2]; if ($pct -gt 0 -and $pct -le 100) { if ($Matches[1] -eq 'short') { $set.short_cap = [math]::Round($tok.Short * 100 / $pct) } else { $set.week_cap = [math]::Round($tok.Week * 100 / $pct) } } } }
  [IO.File]::WriteAllText($cfgPath, ([pscustomobject]$set | ConvertTo-Json), (New-Object Text.UTF8Encoding($false))); $cfg = Read-Config $cfgPath
  Write-Host "Calibrated: 5-hour cap = $($cfg.short_cap) tokens, weekly cap = $($cfg.week_cap) tokens (saved in vtes-gauge-config.json)"
}
$r = Write-Outputs $Dir $tok $cfg $nowUtc
Write-Host ("Gauge: 5h tokens {0}, 7d tokens {1}, replies {2}, files {3}; 5h {4}%, week {5}%; alerts {6}" -f $tok.Short, $tok.Week, $tok.Replies, $tok.Files, $(if ($r.P0 -ne $null) { $r.P0 } else { 'NOT CALIBRATED' }), $(if ($r.P1 -ne $null) { $r.P1 } else { 'NOT CALIBRATED' }), $r.Alerts)
