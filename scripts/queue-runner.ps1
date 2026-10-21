#Requires -Version 7.0
<#
.SYNOPSIS
    VT ES Autonomous Queue Runner — JOB-0079 §D.1
    TRK-2026-9959

.DESCRIPTION
    Reads queue/queue.jsonl. Executes GREEN and YELLOW tasks automatically.
    RED tasks are written to needs-owner-approval.txt — never auto-executed.
    Writes one output file per task. Health monitor checks output file growth.

.NOTES
    Run via Task Scheduler (see TaskScheduler/QueueRunner.xml).
    Requires PowerShell 7 (pwsh.exe) — NOT powershell.exe (5.1 returns silent false zero).
    TRK-2026-9132: PS 5.1 broken for this use. Always call pwsh.exe.
#>

param(
    [string]$RepoRoot      = "C:\Users\JV\source\JV-repository",
    [string]$DriveRoot     = "G:\My Drive\VTES",
    [string]$LogDir        = "C:\Logs\QueueRunner",
    [int]   $HungMinutes   = 15,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$QueueFile    = Join-Path $RepoRoot "queue\queue.jsonl"
$OutputDir    = Join-Path $DriveRoot "output"
$ApprovalLog  = Join-Path $DriveRoot "needs-owner-approval.txt"
$NightReport  = Join-Path $DriveRoot "night-report_$(Get-Date -Format 'yyyy-MM-dd').txt"
$timestamp    = Get-Date -Format "yyyy-MM-dd_HHmm"
$runLog       = Join-Path $LogDir "run_$timestamp.log"

# ── Logging ──────────────────────────────────────────────────
function Write-Log {
    param([string]$Msg, [string]$Level = "INFO")
    $line = "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') [$Level] $Msg"
    Write-Output $line
    if (-not $DryRun) { Add-Content -Path $runLog -Value $line }
}

# ── Setup ─────────────────────────────────────────────────────
foreach ($dir in @($OutputDir, $LogDir, (Split-Path $ApprovalLog))) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

Write-Log "=== Queue Runner started | DryRun=$DryRun ==="

# ── Read queue ────────────────────────────────────────────────
if (-not (Test-Path $QueueFile)) {
    Write-Log "Queue file not found: $QueueFile" "ERROR"
    exit 1
}

$allTasks = [System.Collections.Generic.List[PSCustomObject]]::new()
Get-Content $QueueFile | ForEach-Object {
    try { $allTasks.Add(($_ | ConvertFrom-Json)) } catch { Write-Log "Bad line in queue: $_" "WARN" }
}

$pending = $allTasks | Where-Object { $_.status -eq "pending" } | Sort-Object {
    switch ($_.priority) { "critical" {0} "high" {1} "medium" {2} default {3} }
}

Write-Log "Queue: $($allTasks.Count) total | $($pending.Count) pending"

# ── Counters for night report ─────────────────────────────────
$ran = 0; $skippedRed = 0; $skippedBlocked = 0; $failed = 0

# ── Process tasks ─────────────────────────────────────────────
foreach ($task in $pending) {
    $id    = $task.id
    $color = ($task.color ?? "yellow").ToLower()

    # BLOCKED tasks stay blocked — log and skip
    if ($task.note -match "^BLOCKED") {
        Write-Log "SKIP $id (BLOCKED: $($task.note))" "WARN"
        $skippedBlocked++
        continue
    }

    # RED tasks go to approval log — never auto-executed
    if ($color -eq "red") {
        $line = "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') | RED | $id | $($task.desc) | NOTE: $($task.note)"
        if (-not $DryRun) { Add-Content -Path $ApprovalLog -Value $line }
        Write-Log "RED task $id — queued for owner approval" "WARN"
        $skippedRed++
        continue
    }

    # GREEN / YELLOW — auto-execute
    Write-Log "STARTING $id [$color] $($task.desc)"

    # Mark IN_PROGRESS
    if (-not $DryRun) {
        $task.status     = "in_progress"
        $task.lastUpdate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        Save-Queue -Tasks $allTasks -Path $QueueFile
    }

    # Output file — health monitor watches this file for growth
    $outFile = Join-Path $OutputDir "${id}_output.txt"
    $startTime = Get-Date

    if (-not $DryRun) {
        Set-Content -Path $outFile -Value @(
            "START: $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss')"
            "TASK:  $($task.desc)"
            "TRK:   $($task.trk)"
            "COLOR: $color"
            "AGENT: $($task.agent)"
            "---"
        )
    }

    # ── TASK DISPATCH ───────────────────────────────────────
    # Replace this block with actual role-protocol dispatch.
    # Each task's 'agent' field determines which role protocol runs.
    # Role protocol files live in G:\My Drive\_ROLE-PROTOCOLS\
    $succeeded = $false
    try {
        $roleProtocolPath = "G:\My Drive\_ROLE-PROTOCOLS\$($task.agent)-protocol.txt"
        if (Test-Path $roleProtocolPath) {
            Write-Log "  Protocol: $roleProtocolPath"
            # Future: invoke the role protocol here
            # For now: write a placeholder result
            if (-not $DryRun) {
                Add-Content -Path $outFile -Value "PROTOCOL: $roleProtocolPath"
                Add-Content -Path $outFile -Value "RESULT: placeholder — wire actual execution here"
            }
            $succeeded = $true
        } else {
            Write-Log "  No protocol file for agent '$($task.agent)' — marking PENDING" "WARN"
            # No protocol = cannot run = leave as pending, don't fail it
            if (-not $DryRun) {
                $task.status     = "pending"
                $task.lastUpdate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
                Save-Queue -Tasks $allTasks -Path $QueueFile
            }
            continue
        }
    } catch {
        Write-Log "  EXCEPTION running $id : $_" "ERROR"
        $succeeded = $false
    }
    # ── END DISPATCH ─────────────────────────────────────────

    $finalStatus = if ($succeeded) { "done" } else { "failed" }
    $elapsed = (Get-Date) - $startTime

    if (-not $DryRun) {
        Add-Content -Path $outFile -Value "END: $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') | STATUS: $finalStatus | ELAPSED: $([int]$elapsed.TotalSeconds)s"
        $task.status     = $finalStatus
        $task.lastUpdate = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        Save-Queue -Tasks $allTasks -Path $QueueFile
    }

    if ($succeeded) { $ran++ } else { $failed++ }
    Write-Log "DONE $id → $finalStatus ($([int]$elapsed.TotalSeconds)s)"
}

# ── Night report (Rule 8: always a denominator) ───────────────
$total     = $allTasks.Count
$doneCount = ($allTasks | Where-Object { $_.status -eq "done" }).Count
$report = @"
NIGHT REPORT — $(Get-Date -Format 'yyyy-MM-dd HH:mm')
Run: $ran tasks completed | $failed failed | $skippedRed awaiting owner approval | $skippedBlocked blocked
Progress: $doneCount of $total total tasks done ($([math]::Round($doneCount/$total*100,1))%)
Queue file: $QueueFile
Log: $runLog
"@

Write-Log $report
if (-not $DryRun) { Set-Content -Path $NightReport -Value $report }

Write-Log "=== Queue Runner finished ==="

# ── Helper: save queue back to JSONL ─────────────────────────
function Save-Queue {
    param([System.Collections.Generic.List[PSCustomObject]]$Tasks, [string]$Path)
    $Tasks | ForEach-Object { $_ | ConvertTo-Json -Compress } | Set-Content -Path $Path
}
