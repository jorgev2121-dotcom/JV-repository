# Apply-ProjectPermissions_2026-09-20.ps1
# TRK-2026-9946 - merges the owner-approved permission rules into the PROJECT
# .claude\settings.json of JV-repository. Merge, never replace: every key the live
# file already has (model, hooks, statusLine, mcpServers ...) is preserved; only
# permissions.allow / ask / deny gain entries and permissions.defaultMode becomes
# acceptEdits. Backs up first. Rolls back on a parse failure.
#
# Owner authorization (verbatim, 2026-09-20, cloud session):
#   "Owner's directive. Approval to proceed."   then   "Execute. I'm out of the middle."
#
# Run:  powershell -File <this file>      (add -ExecutionPolicy Bypass only if policy blocks it)

$ErrorActionPreference = 'Stop'
$stamp = '20260920'

$repo = $null
if ($PSScriptRoot) { $repo = Resolve-Path (Join-Path $PSScriptRoot '..\..') }
if (-not $repo -or -not (Test-Path (Join-Path $repo 'CLAUDE.md'))) {
    $repo = (git rev-parse --show-toplevel 2>$null)
}
if (-not $repo -or -not (Test-Path (Join-Path $repo 'CLAUDE.md'))) {
    throw 'Cannot locate JV-repository root (no CLAUDE.md two levels above this script, and git rev-parse failed).'
}
$repo = "$repo"
Write-Host "Repo: $repo"

$stagedPath = Join-Path $repo 'mailbox\to-desktop\claude-settings_PROJECT_2026-09-20.json'
if (-not (Test-Path $stagedPath)) {
    # Desktop checkout is behind and cannot fast-forward; pull ONLY this file from the remote branch.
    git -C $repo fetch origin claude/new-session-1j77e1
    git -C $repo checkout origin/claude/new-session-1j77e1 -- mailbox/to-desktop/claude-settings_PROJECT_2026-09-20.json
}
$staged = Get-Content -Raw -LiteralPath $stagedPath | ConvertFrom-Json
Write-Host ("Staged rules: allow={0} ask={1} deny={2}" -f $staged.permissions.allow.Count, $staged.permissions.ask.Count, $staged.permissions.deny.Count)

$claudeDir = Join-Path $repo '.claude'
if (-not (Test-Path $claudeDir)) { New-Item -ItemType Directory -Path $claudeDir | Out-Null }
$target = Join-Path $claudeDir 'settings.json'

if (Test-Path $target) {
    $backup = "$target.bak-$stamp"
    Copy-Item -LiteralPath $target -Destination $backup -Force
    Write-Host "Backup: $backup"
    $cur = Get-Content -Raw -LiteralPath $target | ConvertFrom-Json
} else {
    $backup = $null
    $cur = [pscustomobject]@{}
    Write-Host 'No existing project settings.json - creating one.'
}

if ($cur.PSObject.Properties['permissions']) { $perm = $cur.permissions } else { $perm = [pscustomobject]@{} }

foreach ($k in 'allow','ask','deny') {
    $old = @()
    if ($perm.PSObject.Properties[$k]) { $old = @($perm.$k) }
    $merged = @(($old + @($staged.permissions.$k)) | Select-Object -Unique)
    if ($perm.PSObject.Properties[$k]) { $perm.$k = $merged }
    else { $perm | Add-Member -NotePropertyName $k -NotePropertyValue $merged }
    Write-Host ("{0}: {1} -> {2}" -f $k, $old.Count, $merged.Count)
}
if ($perm.PSObject.Properties['defaultMode']) { $perm.defaultMode = 'acceptEdits' }
else { $perm | Add-Member -NotePropertyName defaultMode -NotePropertyValue 'acceptEdits' }

if ($cur.PSObject.Properties['permissions']) { $cur.permissions = $perm }
else { $cur | Add-Member -NotePropertyName permissions -NotePropertyValue $perm }
if (-not $cur.PSObject.Properties['$schema']) {
    $cur | Add-Member -NotePropertyName '$schema' -NotePropertyValue 'https://json.schemastore.org/claude-code-settings.json'
}

$json = $cur | ConvertTo-Json -Depth 30
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($target, $json, $utf8NoBom)

try {
    $check = Get-Content -Raw -LiteralPath $target | ConvertFrom-Json
    Write-Host ("PARSE OK: {0}  defaultMode={1} allow={2} ask={3} deny={4}" -f $target, $check.permissions.defaultMode, $check.permissions.allow.Count, $check.permissions.ask.Count, $check.permissions.deny.Count)
    Write-Host 'DONE - TRK-2026-9946. Paste this whole console output back to cloud (TO-CLOUD.md is fine).'
} catch {
    if ($backup) { Copy-Item -LiteralPath $backup -Destination $target -Force; Write-Host "ROLLED BACK to $backup" }
    throw "Post-write parse failed: $($_.Exception.Message)"
}
