<#
Install-OCR-QueueA.ps1 v2 (2026-10-15) - registers CU-OCR-QueueA-24x7 (every 15 min, protocol L3) and CU-OCR-Census (hourly)
for the current user. No admin needed. Re-runnable.
Undo: Unregister-ScheduledTask -TaskName CU-OCR-QueueA-24x7 -Confirm:$false; Unregister-ScheduledTask -TaskName CU-OCR-Census -Confirm:$false
#>
$ErrorActionPreference = 'Stop'
$dest = 'C:\AI\ocr'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
foreach ($f in 'OCR-QueueA-Runner.ps1','OCR-L3-Lib.ps1','OCR-Census.ps1') { Copy-Item -Force (Join-Path $PSScriptRoot $f) $dest }
$runner = Join-Path $dest 'OCR-QueueA-Runner.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$runner`""
$t1 = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$t2 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 15) -RepetitionDuration (New-TimeSpan -Days 3650)
$set = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 20) `
        -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -Priority 7
$pr  = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'CU-OCR-QueueA-24x7' -Action $action -Trigger @($t1, $t2) -Settings $set -Principal $pr `
  -Description 'Free OCR lane, Queue A only, protocol L3, Phase 1 (2022 to today) first. Writes sidecars, tags files, _OCR-HEARTBEAT.md. TRK-2026-9960 family.' -Force | Out-Null
Get-ScheduledTask -TaskName 'CU-OCR-QueueA-24x7' | Select-Object TaskName, State
(Get-ScheduledTaskInfo -TaskName 'CU-OCR-QueueA-24x7').NextRunTime

# Hourly census: every PDF counted by protocol level and year, written to VTES-Outbox\_OCR-CENSUS.md
$census = Join-Path $dest 'OCR-Census.ps1'
$a2 = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$census`""
$c1 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(2) -RepetitionInterval (New-TimeSpan -Hours 1) -RepetitionDuration (New-TimeSpan -Days 3650)
$s2 = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 45) -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -Priority 7
Register-ScheduledTask -TaskName 'CU-OCR-Census' -Action $a2 -Trigger $c1 -Settings $s2 -Principal $pr `
  -Description 'Hourly OCR census by protocol level and year. Read-only. TRK-2026-9960 family.' -Force | Out-Null
Get-ScheduledTask -TaskName 'CU-OCR-Census' | Select-Object TaskName, State
