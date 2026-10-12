# Test harness (pwsh 7 on Linux or Windows): fake sources + stubbed Get-ScheduledTask / Get-CimInstance, then runs the feeder with -DryRunDir.
# Usage: pwsh -File run-feeder-test.ps1 -Root <scratch folder> -Out <output folder> [-Empty]
param([string]$Root, [string]$Out, [switch]$Empty)
$ob = Join-Path $Root 'Outbox'; $ib = Join-Path $Root 'Inbox'; $ot = Join-Path $Root 'OT'
# safety: only ever deletes a folder this harness created itself (it holds the marker file)
if (Test-Path -LiteralPath $Root) {
  if (-not (Test-Path -LiteralPath (Join-Path $Root '.feeder-test-root'))) { throw "$Root exists and was not made by this harness; pick an empty scratch folder" }
  Remove-Item -Recurse -Force -LiteralPath $Root
}
New-Item -ItemType Directory -Force $Root | Out-Null; '' | Set-Content (Join-Path $Root '.feeder-test-root')
New-Item -ItemType Directory -Force $ob, $ib, $ot, $Out | Out-Null
if (-not $Empty) {
  "# UPTIME`nWritten: now" | Set-Content (Join-Path $ob '_UPTIME-HEARTBEAT.md')
  "# OCR HEARTBEAT`nState: RUNNING`nProgress: **12 of 340** Queue A PDFs" | Set-Content (Join-Path $ob '_OCR-HEARTBEAT.md') -Encoding UTF8
  "# RAM GUARD`nLevel: **GREEN** - free RAM 5.2 GB" | Set-Content (Join-Path $ob '_RAM-GUARD-HEARTBEAT.md')
  (Get-Item (Join-Path $ob '_RAM-GUARD-HEARTBEAT.md')).LastWriteTime = (Get-Date).AddMinutes(-9)
  "seq,file,status`n1,a.md,DONE`n2,b.md,NEW`n3,c.md,DONE" | Set-Content (Join-Path $ib '_LEDGER.csv')
  "seq,file`n1,x.md" | Set-Content (Join-Path $ob '_LEDGER.csv')
  "x" | Set-Content (Join-Path $ob 'EXECUTED_RAMBO1_PANEL-CANDIDATES_2026-10-12.md')
  "x" | Set-Content (Join-Path $ob 'EXECUTED_RAMBO2_CODEX_SWEEP_2026-10-11.md'); (Get-Item (Join-Path $ob 'EXECUTED_RAMBO2_CODEX_SWEEP_2026-10-11.md')).LastWriteTime = (Get-Date).AddDays(-1)
  "x" | Set-Content (Join-Path $ob ('CAP-REACHED_RAMBO1_Caf' + [char]0xE9 + '.md'))
  "<html>" | Set-Content (Join-Path $ot '_ORANGE-TREE-INDEX.html'); (Get-Item (Join-Path $ot '_ORANGE-TREE-INDEX.html')).LastWriteTime = (Get-Date).AddHours(-30)
  "burn_per_hour: 12345`nwindow_used_pct: 18.5`nweek_used_pct: 40`nwindow_resets_at: 2099-01-01T05:00:00-05:00" | Set-Content (Join-Path $ob '_USAGE-GOVERNOR-HEARTBEAT.md')
}
function global:Get-CimInstance { param($ClassName) [pscustomobject]@{ FreePhysicalMemory = 5452595; TotalVisibleMemorySize = 16670000 } }
function global:Get-ScheduledTask {
  $tr10 = [pscustomobject]@{ Enabled = $true; Repetition = [pscustomobject]@{ Interval = 'PT10M' }; CimClass = [pscustomobject]@{ CimClassName = 'MSFT_TaskTimeTrigger' } }
  $daily = [pscustomobject]@{ Enabled = $true; Repetition = [pscustomobject]@{ Interval = '' }; CimClass = [pscustomobject]@{ CimClassName = 'MSFT_TaskDailyTrigger' }; DaysInterval = 1 }
  $logon = [pscustomobject]@{ Enabled = $true; Repetition = $null; CimClass = [pscustomobject]@{ CimClassName = 'MSFT_TaskLogonTrigger' } }
  @(
    [pscustomobject]@{ TaskName = 'CU-Orchestrator'; TaskPath = '\'; State = 'Ready'; Triggers = @($tr10, $logon) },
    [pscustomobject]@{ TaskName = 'CU-Propagation-Check'; TaskPath = '\'; State = 'Disabled'; Triggers = @($daily) },
    [pscustomobject]@{ TaskName = 'AI-Never-Run'; TaskPath = '\'; State = 'Ready'; Triggers = @($logon) },
    [pscustomobject]@{ TaskName = 'CU-VTES5-Feeder'; TaskPath = '\'; State = 'Running'; Triggers = @($tr10) },
    [pscustomobject]@{ TaskName = 'OneDrive Standalone'; TaskPath = '\'; State = 'Ready'; Triggers = @() }
  )
}
function global:Get-ScheduledTaskInfo { param($TaskName, $TaskPath)
  switch ($TaskName) {
    'CU-Orchestrator' { [pscustomobject]@{ LastRunTime = (Get-Date).AddMinutes(-4); NextRunTime = (Get-Date).AddMinutes(6); LastTaskResult = [uint32]0 } }
    'CU-Propagation-Check' { [pscustomobject]@{ LastRunTime = (Get-Date).AddDays(-3); NextRunTime = $null; LastTaskResult = [uint32]2147942402 } }
    default { [pscustomobject]@{ LastRunTime = [datetime]'1999-11-30'; NextRunTime = $null; LastTaskResult = [uint32]267011 } }
  }
}
& (Join-Path (Split-Path -Parent $PSScriptRoot) 'VTES5-Feeder.ps1') -DryRunDir $Out -OutboxDir $ob -InboxDir $ib -OrangeTreeIndex (Join-Path $ot '_ORANGE-TREE-INDEX.html')
"EXIT=$LASTEXITCODE"
