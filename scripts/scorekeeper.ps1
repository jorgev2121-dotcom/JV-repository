#Requires -Version 7.0
<#
.SYNOPSIS
    JOB-0084 SCOREKEEPER — twice-daily queue progress report.
    TRK-2026-9959 | Version 1 | 2026-10-08

.DESCRIPTION
    Reads queue/queue.jsonl.
    Computes done/total per priority and per color (GREEN/YELLOW/RED).
    Writes a dated scorecard to G:\My Drive\VTES\scorecard\SCORECARD-{date}-{slot}.txt
    Rule 8: always a denominator — "X of Y", never "good progress."

.NOTES
    Runs twice daily: morning (07:00) and evening (19:00) via Task Scheduler.
    GREEN task: creates new files only.
    Requires PowerShell 7 (pwsh.exe).
#>

param(
    [string]$RepoRoot  = "C:\Users\JV\source\JV-repository",
    [string]$DriveRoot = "G:\My Drive\VTES",
    [string]$LogDir    = "C:\Logs\Scorekeeper",
    [switch]$DryRun
)

$QueueFile    = Join-Path $RepoRoot "queue\queue.jsonl"
$ScorecardDir = Join-Path $DriveRoot "scorecard"
$slot         = if ((Get-Date).Hour -lt 12) { "AM" } else { "PM" }
$dateStr      = Get-Date -Format "yyyy-MM-dd"
$CardFile     = Join-Path $ScorecardDir "SCORECARD-$dateStr-$slot.txt"
$RunLog       = Join-Path $LogDir "scorekeeper_${dateStr}_$slot.log"

foreach ($dir in @($ScorecardDir, $LogDir)) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

function Write-Log([string]$Msg, [string]$Level="INFO") {
    $line = "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') [$Level] $Msg"
    Write-Output $line
    if (-not $DryRun) { Add-Content -Path $RunLog -Value $line }
}

Write-Log "=== Scorekeeper $slot run | DryRun=$DryRun ==="

if (-not (Test-Path $QueueFile)) {
    Write-Log "Queue not found: $QueueFile" "ERROR"; exit 1
}

$tasks = [System.Collections.Generic.List[PSCustomObject]]::new()
Get-Content $QueueFile | ForEach-Object {
    try { $tasks.Add(($_ | ConvertFrom-Json)) } catch {}
}

$total     = $tasks.Count
$done      = ($tasks | Where-Object { $_.status -eq "done" }).Count
$failed    = ($tasks | Where-Object { $_.status -eq "failed" }).Count
$blocked   = ($tasks | Where-Object { $_.status -eq "blocked" }).Count
$inProg    = ($tasks | Where-Object { $_.status -eq "in_progress" }).Count
$pending   = ($tasks | Where-Object { $_.status -eq "pending" }).Count

$critical  = $tasks | Where-Object { $_.priority -eq "critical" }
$critDone  = ($critical | Where-Object { $_.status -eq "done" }).Count

$redTasks  = $tasks | Where-Object { $_.color -eq "red" }
$redPend   = ($redTasks | Where-Object { $_.status -ne "done" -and $_.status -ne "failed" }).Count

$pct = if ($total -gt 0) { [math]::Round($done / $total * 100, 1) } else { 0 }

# Identify the critical-path blocker (first pending critical RED task)
$critBlocker = $tasks | Where-Object { $_.priority -eq "critical" -and $_.color -eq "red" -and $_.status -ne "done" } | Select-Object -First 1

$scorecard = @"
═══════════════════════════════════════════════════════
SCORECARD — $dateStr $slot
Generated: $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss')
═══════════════════════════════════════════════════════

OVERALL PROGRESS
  $done of $total tasks done ($pct%)
  $inProg in progress · $pending pending · $blocked blocked · $failed failed

CRITICAL TASKS
  $critDone of $($critical.Count) critical tasks done

OWNER-GATED (RED)
  $redPend tasks awaiting owner action

CRITICAL-PATH BLOCKER
$(if ($critBlocker) { "  $($critBlocker.id) [$($critBlocker.color.ToUpper())] $($critBlocker.desc)" } else { "  None — all critical RED items resolved" })

QUEUE FILE: $QueueFile

$(if ($pct -ge 80) { "STATUS: STRONG — >80% done" } elseif ($pct -ge 50) { "STATUS: ON TRACK — >50% done" } elseif ($pct -ge 25) { "STATUS: EARLY — <50% done" } else { "STATUS: STARTING — <25% done" })
═══════════════════════════════════════════════════════
TRK-2026-9959 · SCOREKEEPER · $dateStr $slot · CURRENT
"@

Write-Log $scorecard
Write-Log ""
Write-Log "$done of $total tasks done ($pct%)"
if ($critBlocker) { Write-Log "BLOCKER: $($critBlocker.id) — $($critBlocker.desc)" "WARN" }

if (-not $DryRun) {
    Set-Content -Path $CardFile -Value $scorecard
    Write-Log "Scorecard written: $CardFile"
}

Write-Log "=== Scorekeeper finished ==="
