# 04-Repair-Ollama-Settings_RAMBO-ONLY.ps1   CHANGES SETTINGS. Run ONLY after reading DIAG-OLLAMA report. Default = preview.
# Usage:  powershell -File 04-Repair-Ollama-Settings_RAMBO-ONLY.ps1            (preview, changes nothing)
#         powershell -File 04-Repair-Ollama-Settings_RAMBO-ONLY.ps1 -Apply     (applies, writes rollback script first)
param([switch]$Apply)
$want = @{ 'OLLAMA_KEEP_ALIVE' = '5m'; 'OLLAMA_MAX_LOADED_MODELS' = '1'; 'OLLAMA_NUM_PARALLEL' = '1' }
$undoDir = 'C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests'
$undo = Join-Path $undoDir ('Rollback_OllamaSettings_' + (Get-Date -Format 'yyyy-MM-dd_HHmm') + '.ps1')
$lines = @('# Rollback for Ollama settings. TRK-2026-10017')
foreach ($k in $want.Keys) {
  $old = [Environment]::GetEnvironmentVariable($k,'User')
  Write-Host ('{0}: now [{1}] -> will be [{2}]' -f $k, $old, $want[$k])
  if ($old) { $lines += ("[Environment]::SetEnvironmentVariable('{0}','{1}','User')" -f $k, $old) } else { $lines += ("[Environment]::SetEnvironmentVariable('{0}',`$null,'User')" -f $k) }
}
if (-not $Apply) { Write-Host 'PREVIEW ONLY. Nothing changed. Add -Apply to apply.'; return }
New-Item -ItemType Directory -Force -Path $undoDir | Out-Null
$lines | Set-Content -Path $undo -Encoding ASCII
foreach ($k in $want.Keys) { [Environment]::SetEnvironmentVariable($k, $want[$k], 'User') }
try { & ollama ps 2>&1 | Select-Object -Skip 1 | ForEach-Object { $n = ($_ -split '\s+')[0]; if ($n) { & ollama stop $n 2>&1 | Out-Null; Write-Host ('stopped idle model ' + $n) } } } catch {}
Write-Host ('APPLIED. Rollback script: ' + $undo)
Write-Host 'Restart the Ollama app (tray icon > Quit, then start it) so it reads the new settings, then re-run 02-Check-Ollama.ps1.'
