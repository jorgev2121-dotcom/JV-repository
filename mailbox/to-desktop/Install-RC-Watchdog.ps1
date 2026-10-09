# Install-RC-Watchdog.ps1 - registers scheduled task "Claude-RC-Watchdog" for the current user.
# Copies RC-Watchdog.ps1 to %USERPROFILE%\ClaudeWatchdog, runs at logon + every 10 min.
# Undo: Unregister-ScheduledTask -TaskName Claude-RC-Watchdog -Confirm:$false
param([string]$Source = (Join-Path $PSScriptRoot 'RC-Watchdog.ps1'), [string]$WorkDir = (Get-Location).Path)

$dir = Join-Path $env:USERPROFILE 'ClaudeWatchdog'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$dest = Join-Path $dir 'RC-Watchdog.ps1'
if ((Resolve-Path $Source).Path -ne $dest) { Copy-Item -Path $Source -Destination $dest -Force }

$taskArgs = "-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$dest`" -WorkDir `"$WorkDir`""
$action   = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $taskArgs
$atLogon  = New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME"
$every10  = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 10)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive -RunLevel Limited
$settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable `
    -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit (New-TimeSpan -Minutes 2)

Register-ScheduledTask -TaskName 'Claude-RC-Watchdog' -Action $action -Trigger @($atLogon, $every10) `
    -Principal $principal -Settings $settings -Force | Out-Null

# Keep the PC awake on AC power so the watchdog has something to keep alive.
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0

'--- VERIFY ---'
Get-ScheduledTask -TaskName 'Claude-RC-Watchdog' | Select-Object TaskName, State
& $dest -WorkDir $WorkDir -TestDecision
& $dest -WorkDir $WorkDir
Start-Sleep -Seconds 2
Get-Content (Join-Path $dir 'rc-watchdog.log') -Tail 2
powercfg /query SCHEME_CURRENT SUB_SLEEP STANDBYIDLE | Select-String 'Current AC'
