#Requires -Version 7.0
<#
.SYNOPSIS
    JOB-0082 One-Click Relay — routes work between cloud and desktop sessions.
    TRK-2026-9959 | Version 1 | 2026-10-08

.DESCRIPTION
    Reads the cloud-to-desktop mailbox (mailbox\to-desktop\WORK-QUEUE.md).
    Packages each undelivered item as a self-contained PASTE-D block.
    Writes the relay packet to mailbox\outbox\RELAY-{timestamp}.md.
    Marks delivered items so they are not re-sent on the next run.

    Direction: Cloud → Desktop (primary use).
    The desktop can also write to mailbox\to-cloud\ for the reverse direction.

.NOTES
    Run via Task Scheduler or manually.
    No network access required. Operates on local files only.
    GREEN task: creates new files only, never modifies existing content.
#>

param(
    [string]$RepoRoot  = "C:\Users\JV\source\JV-repository",
    [string]$LogDir    = "C:\Logs\Relay",
    [switch]$DryRun
)

$MailboxIn   = Join-Path $RepoRoot "mailbox\to-desktop\WORK-QUEUE.md"
$OutboxDir   = Join-Path $RepoRoot "mailbox\outbox"
$timestamp   = Get-Date -Format "yyyy-MM-dd_HHmm"
$PacketFile  = Join-Path $OutboxDir "RELAY-$timestamp.md"
$RunLog      = Join-Path $LogDir "relay_$timestamp.log"

foreach ($dir in @($OutboxDir, $LogDir)) {
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
}

function Write-Log([string]$Msg, [string]$Level="INFO") {
    $line = "$(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') [$Level] $Msg"
    Write-Output $line
    if (-not $DryRun) { Add-Content -Path $RunLog -Value $line }
}

Write-Log "=== Relay started | DryRun=$DryRun ==="

if (-not (Test-Path $MailboxIn)) {
    Write-Log "No mailbox file: $MailboxIn" "WARN"
    Write-Log "=== Relay finished — nothing to relay ==="
    exit 0
}

$content = Get-Content $MailboxIn -Raw
if ($content -match '^\s*$') {
    Write-Log "Mailbox is empty." "INFO"
    Write-Log "=== Relay finished — nothing to relay ==="
    exit 0
}

# Extract undelivered PASTE-D blocks (lines not already marked DELIVERED)
$lines   = Get-Content $MailboxIn
$pending = $lines | Where-Object { $_ -notmatch '<!--DELIVERED-->' -and $_.Trim() -ne '' }

if (-not $pending) {
    Write-Log "All items already delivered." "INFO"
    exit 0
}

Write-Log "$($pending.Count) line(s) pending relay."

$packet = @"
# RELAY PACKET — $timestamp
# Source: mailbox\to-desktop\WORK-QUEUE.md
# Destination: Desktop Executor
# Items: $($pending.Count)
# ---
# Paste this block into the Desktop Claude Code window.

$($pending -join "`n")

---
RELAY-ID: $timestamp
SENT: $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ssZ')
"@

if (-not $DryRun) {
    Set-Content -Path $PacketFile -Value $packet
    Write-Log "Packet written: $PacketFile" "INFO"

    # Mark delivered in the source mailbox
    $updated = $lines | ForEach-Object {
        if ($pending -contains $_) { "$_ <!--DELIVERED $timestamp-->" } else { $_ }
    }
    Set-Content -Path $MailboxIn -Value $updated
    Write-Log "Source mailbox marked as delivered." "INFO"
} else {
    Write-Log "[DRY RUN] Would write packet to: $PacketFile"
    Write-Log "[DRY RUN] Would mark $($pending.Count) item(s) as DELIVERED in mailbox."
}

Write-Log "=== Relay finished | $($pending.Count) item(s) relayed ==="
