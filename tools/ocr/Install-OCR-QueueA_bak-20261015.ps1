<#
Install-OCR-QueueA.ps1 - registers CU-OCR-QueueA-24x7 for the current user. No admin needed. Re-runnable.
Undo: Unregister-ScheduledTask -TaskName CU-OCR-QueueA-24x7 -Confirm:$false
#>
$ErrorActionPreference = 'Stop'
$dest = 'C:\AI\ocr'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Force (Join-Path $PSScriptRoot 'OCR-QueueA-Runner.ps1') $dest
$runner = Join-Path $dest 'OCR-QueueA-Runner.ps1'
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$runner`""
$t1 = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$t2 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 15) -RepetitionDuration (New-TimeSpan -Days 3650)
$set = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 20) `
        -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -Priority 7
$pr  = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'CU-OCR-QueueA-24x7' -Action $action -Trigger @($t1, $t2) -Settings $set -Principal $pr `
  -Description 'Free OCR lane, Queue A only, writes .SEARCH.txt sidecars + _OCR-HEARTBEAT.md. TRK-2026-9960 family.' -Force | Out-Null
Get-ScheduledTask -TaskName 'CU-OCR-QueueA-24x7' | Select-Object TaskName, State
(Get-ScheduledTaskInfo -TaskName 'CU-OCR-QueueA-24x7').NextRunTime
