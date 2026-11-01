#Requires -Version 7.0
<#
.SYNOPSIS
    VT ES Health Monitor — Watchdog for queue-runner.ps1
    TRK-2026-9957

.DESCRIPTION
    Runs every 5 minutes via Task Scheduler.
    Checks each IN_PROGRESS task: if its output file has not grown in HungMinutes,
    the task is HUNG. Health monitor resets it to PENDING and logs the incident.
    A process in the task list is NOT proof of progress. Output file growth is.
    (RI-002: this rule exists because processes appeared alive while producing nothing.)
#>

param(
    [string]$RepoRoot    = "C:\Users\JV\source\JV-repository",
    [string]$DriveRoot   = "G:\My Drive\VTES",
    [string]$LogDir      = "C:\Logs\HealthMonitor",
    [int]   $HungMinutes = 15
)

$QueueFile  = Join-Path $RepoRoot "queue\queue.jsonl"
$OutputDir  = Join-Path $DriveRoot "output"
$HungLog    = Join-Path $LogDir "hung_$(Get-Date -Format 'yyyy-MM-dd').log"

foreach ($dir in @($LogDir)) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

function Write-Log([string]$Msg, [string]$Level="INFO") {
    $line = "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') [$Level] $Msg"
    Write-Output $line
    Add-Content -Path $HungLog -Value $line
}

Write-Log "Health monitor sweep"

if (-not (Test-Path $QueueFile)) { Write-Log "Queue not found: $QueueFile" "ERROR"; exit 1 }

$allTasks = [System.Collections.Generic.List[PSCustomObject]]::new()
Get-Content $QueueFile | ForEach-Object {
    try { $allTasks.Add(($_ | ConvertFrom-Json)) } catch {}
}

$inProgress = $allTasks | Where-Object { $_.status -eq "in_progress" }
Write-Log "$($inProgress.Count) tasks in progress"

$hungCount = 0
foreach ($task in $inProgress) {
    $outFile = Join-Path $OutputDir "$($task.id)_output.txt"

    if (-not (Test-Path $outFile)) {
        Write-Log "HUNG $($task.id) — output file missing, resetting to pending" "WARN"
        $task.status     = "pending"
        $task.lastUpdate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        $hungCount++
        continue
    }

    $lastWrite = (Get-Item $outFile).LastWriteTime
    $ageMin    = ((Get-Date) - $lastWrite).TotalMinutes

    if ($ageMin -gt $HungMinutes) {
        Write-Log "HUNG $($task.id) — output file not grown for $([int]$ageMin)m (limit ${HungMinutes}m), resetting to pending" "WARN"
        $task.status     = "pending"
        $task.lastUpdate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        $hungCount++
    } else {
        Write-Log "OK   $($task.id) — output grew $([int]$ageMin)m ago"
    }
}

if ($hungCount -gt 0) {
    $allTasks | ForEach-Object { $_ | ConvertTo-Json -Compress } | Set-Content $QueueFile
    Write-Log "$hungCount hung task(s) reset to pending" "WARN"
} else {
    Write-Log "All in-progress tasks are healthy"
}

Write-Log "Health monitor sweep complete"
