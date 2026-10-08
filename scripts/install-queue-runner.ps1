#Requires -Version 7.0
<#
.SYNOPSIS
    One-click installer for VT ES Queue Runner and Health Monitor.
    TRK-2026-9959

.DESCRIPTION
    Registers both Task Scheduler tasks from the XML files in this repo.
    Run this ONCE from PowerShell 7 (pwsh.exe).
    No Administrator rights needed for S4U logon type.

.EXAMPLE
    pwsh -ExecutionPolicy Bypass -File .\install-queue-runner.ps1
#>

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$tsDir    = Join-Path $repoRoot "TaskScheduler"

$tasks = @(
    @{ Name="VTES-QueueRunner";   Xml="QueueRunner.xml"   }
    @{ Name="VTES-HealthMonitor"; Xml="HealthMonitor.xml" }
    @{ Name="VTES-Relay";         Xml="Relay.xml"         }
    @{ Name="VTES-Scorekeeper";   Xml="Scorekeeper.xml"   }
)

foreach ($t in $tasks) {
    $xmlPath = Join-Path $tsDir $t.Xml
    if (-not (Test-Path $xmlPath)) {
        Write-Error "XML not found: $xmlPath"
        continue
    }
    $xml = Get-Content $xmlPath -Raw
    try {
        Register-ScheduledTask -Xml $xml -TaskName $t.Name -TaskPath "\VTES\" -Force | Out-Null
        Write-Host "REGISTERED: $($t.Name)" -ForegroundColor Green
    } catch {
        Write-Host "FAILED:     $($t.Name) — $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Verify in Task Scheduler: taskschd.msc → Task Scheduler Library → VTES"
Write-Host "All four tasks should show Status: Ready:"
Write-Host "  VTES-QueueRunner   — nightly 10:00 PM"
Write-Host "  VTES-HealthMonitor — every 5 minutes"
Write-Host "  VTES-Relay         — every hour"
Write-Host "  VTES-Scorekeeper   — 7:00 AM and 7:00 PM"
Write-Host ""
Write-Host "To test queue-runner now (dry run):"
Write-Host "  pwsh -File `"$repoRoot\scripts\queue-runner.ps1`" -DryRun"
Write-Host ""
Write-Host "To test scorekeeper now:"
Write-Host "  pwsh -File `"$repoRoot\scripts\scorekeeper.ps1`" -DryRun"
