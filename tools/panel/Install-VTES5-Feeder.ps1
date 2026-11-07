<#
Install-VTES5-Feeder.ps1 - registers CU-VTES5-Feeder for the current user. No admin needed. Re-runnable.
Copies VTES5-Feeder.ps1 to C:\AI\panel and runs it every 2 minutes, hidden, at below-normal priority.
The window is hidden by a tiny wscript launcher (powershell -WindowStyle Hidden alone still flashes a
console every 2 minutes). The launcher passes the feeder's exit code back to the scheduler, so
Last Run Result is the feeder's own result (0 = all files written).
Undo: Unregister-ScheduledTask -TaskName CU-VTES5-Feeder -Confirm:$false
#>
param([string]$PanelDir = 'G:\My Drive\MY-DESK\VTES-PANEL\v5-live')
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath (Join-Path $PanelDir 'data') -PathType Container)) {
  throw ('The panel data folder was not found: ' + (Join-Path $PanelDir 'data') + '. Nothing was installed.')
}
$dest = 'C:\AI\panel'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Force (Join-Path $PSScriptRoot 'VTES5-Feeder.ps1') $dest
$feeder = Join-Path $dest 'VTES5-Feeder.ps1'
$vbs = Join-Path $dest 'VTES5-Feeder-hidden.vbs'
$cmd = 'powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "' + $feeder + '" -PanelDir "' + $PanelDir + '"'
$vbsText = "' runs VTES5-Feeder.ps1 with no visible window and returns its exit code. Written by Install-VTES5-Feeder.ps1`r`n" +
           'WScript.Quit CreateObject("WScript.Shell").Run("' + $cmd.Replace('"', '""') + '", 0, True)' + "`r`n"
[IO.File]::WriteAllText($vbs, $vbsText, [Text.Encoding]::ASCII)
$action = New-ScheduledTaskAction -Execute 'wscript.exe' -Argument ('//B //Nologo "' + $vbs + '"')
$t1 = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$t2 = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 2) -RepetitionDuration (New-TimeSpan -Days 3650)
$set = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 2) `
        -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -Priority 7
$pr  = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName 'CU-VTES5-Feeder' -Action $action -Trigger @($t1, $t2) -Settings $set -Principal $pr `
  -Description 'Feeds live data into the VTES panel v5 (data\vtes5-*.js) every 2 minutes. tools/panel/VTES5-Feeder.ps1. TRK-2026-9910-B family.' -Force | Out-Null
Start-ScheduledTask -TaskName 'CU-VTES5-Feeder'
Get-ScheduledTask -TaskName 'CU-VTES5-Feeder' | Select-Object TaskName, State
(Get-ScheduledTaskInfo -TaskName 'CU-VTES5-Feeder').NextRunTime
