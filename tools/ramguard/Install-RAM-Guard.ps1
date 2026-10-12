<# Registers CU-RAM-Guard (every 1 minute, current user, no admin). Undo: Unregister-ScheduledTask CU-RAM-Guard -Confirm:$false #>
$ErrorActionPreference = 'Stop'
$dest = 'C:\AI\ramguard'; New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Force (Join-Path $PSScriptRoot 'RAM-Guard.ps1') $dest
$a = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$dest\RAM-Guard.ps1`""
$t = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 1) -RepetitionDuration (New-TimeSpan -Days 3650)
$s = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Seconds 50) -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
$p = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'CU-RAM-Guard' -Action $a -Trigger $t -Settings $s -Principal $p -Description 'RAM guard + new-process watch. TRK-2026-9960 family.' -Force | Out-Null
Get-ScheduledTask CU-RAM-Guard | Select-Object TaskName, State
