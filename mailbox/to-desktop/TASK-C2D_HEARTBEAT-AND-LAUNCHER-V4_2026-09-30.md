# TASK-C2D — HEARTBEAT + LAUNCHER v4 (status colors, Map) — 2026-09-30
**From:** LLM-02 Cloud Executor · **To:** LLM-01 RAMBO · **TRK-2026-9910-B** · #heartbeat #STATUS #VTES-control-panel #PASTE-D
(No new TRK: uses TRK-2026-9910-B. Green: writes only one new file. Nothing is moved, deleted or sent.)

**Why:** Jorge wants the launcher tabs coloured by connectivity with hours down. The page can see web chats itself (is the site reachable). It cannot see YOU. So you stamp "alive" into one small file, every 10 minutes. No stamp for 6 hours turns your tab amber; 24 hours turns it red with the hours counted. Today your tab is red: no sign of life since about 9/24.

## Get the files from git, then check fingerprints (stop if either differs)
`git fetch origin claude/executor-tray-icon-1cazza && git checkout claude/executor-tray-icon-1cazza && git pull`
- `tools/vtes-panel/VTES-LLM-LAUNCHER.html` — 96491 bytes — SHA-256 `5993aa9ca052203f01f9b70c8701db86930bfe5d8fd5f1297ad2fc3dfaeae6a1`
- `tools/vtes-panel/Write-VtesStatus.ps1` — 3744 bytes — SHA-256 `e084b057a8cb63756874f7d6ea2da5d45c078184a2becc7a4809ce8f321fba73`

## Steps
1. **ACK first** (a line in VTES-Outbox is enough). That alone stamps you alive.
2. Copy both files to `G:\My Drive\MY-DESK\VTES-PANEL\` (replace the old launcher; move the old one to `_Superseded\` first).
3. Run `powershell.exe -NoProfile -File Write-VtesStatus.ps1 -SelfTest`. Expected: `RESULT: 8 passed, 0 failed`. Paste it (cloud ran it on PowerShell 7 only; 5.1 is the real test).
4. Run `powershell.exe -NoProfile -File Write-VtesStatus.ps1 -Id LLM-01 -Note "RAMBO heartbeat"`. It must create `vtes-status.js` beside the launcher.
5. Schedule that same command every 10 minutes (Task Scheduler, current user, no admin). Name it `VTES-Heartbeat-LLM-01`. List it in your report (rollback = delete that task).
6. Open the launcher in Chrome from that folder. **Screenshot the strip**: your tab must be green ("UP · seen <1h ago").
7. Also stamp LLM-06 (Codex) only after Jorge signs in to ChatGPT; do not stamp it before.
8. Report in VTES-Outbox: `RESULT_HEARTBEAT-LAUNCHER-V4_2026-09-30.md` with the self-test line, the screenshot, and the task name.

## Do NOT
Edit the launcher. Put any key or password in vtes-status.js. Stamp a window other than the one you are.

Did the green tab show up?

*HEARTBEAT-LAUNCHER-V4 · v1 · 2026-09-30 · CURRENT · TRK-2026-9910-B*
