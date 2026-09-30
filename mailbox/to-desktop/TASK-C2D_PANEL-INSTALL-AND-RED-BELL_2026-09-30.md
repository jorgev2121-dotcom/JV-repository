# TASK-C2D — PANEL (modules) INSTALL + RED BELL + PROGRAMS IMPORT — 2026-09-30
**From:** LLM-02 Cloud Executor · **To:** LLM-01 RAMBO · **TRK-2026-9910-B** · #panel #red-bell #heartbeat #PASTE-D
(No new TRK. Green: copies files, schedules checks, writes one shortcut. Nothing is moved, deleted, sent or spent.) This is the same work as **dispatch card D-001** (`dispatch/D-001_PANEL-INSTALL-AND-SCHEDULE.md`). If you are silent it passes to Codex, then Cowork.

**Jorge's words, condensed:** build the control panel as modules wired as in the diagram; put a big red reminder button on the desktop, in the tray, and on the iPhone; put the token manager (the Governor) on the diagram.

## Get the files (git, not Drive) and verify
`git fetch origin claude/executor-tray-icon-1cazza && git checkout claude/executor-tray-icon-1cazza && git pull`. **Every panel file is listed in `tools/vtes-panel/MANIFEST.sha256`.** After copying, run `Verify-VtesPanel.ps1`: it must print `OK: 28 code files match`. If it names a file, stop and report.

## Steps
1. **ACK first** (this alone stamps you alive).
2. Copy the folder `tools/vtes-panel/` to `G:\My Drive\MY-DESK\VTES-PANEL\` (older launcher goes to `_Superseded\` first).
3. Self-tests with **Windows PowerShell 5.1** (`powershell.exe`): `Verify-VtesPanel.ps1 -SelfTest` (8 passed), `Write-VtesStatus.ps1 -SelfTest` (8 passed), `Export-ProgramsData.ps1 -SelfTest` (6 passed), `VTES-RedBell.ps1 -SelfTest` (7 passed), `VTES-Gauge.ps1 -SelfTest` (9 passed), `VTES-CaptureReview.ps1 -SelfTest` (10 passed). Paste the seven RESULT lines. Cloud ran them on PowerShell 7 only.
4. Schedule `Verify-VtesPanel.ps1` daily 07:00 as `VTES-Panel-Verify`; stamp yourself every 10 minutes (`Write-VtesStatus.ps1 -Id LLM-01 -Note "RAMBO heartbeat"`, task `VTES-Heartbeat-LLM-01`).
5. **Governor heartbeat (honest version):** task `VTES-Heartbeat-LLM-09`, hourly: stamp `-Id LLM-09` **only if** `C:\Users\JV\OneDrive\Documents\ClaudeMemory\Governor\GOVERNOR-STATUS.txt` was written in the last 2 hours. If the file is stale the tab must stay red. Report the file's real last-write time now.
6. **Red bell:** run `VTES-RedBell.ps1 -CreateShortcut` (puts `VTES REMINDERS (red)` on the REAL Desktop), then add `powershell.exe -NoProfile -WindowStyle Hidden -File "G:\My Drive\MY-DESK\VTES-PANEL\VTES-RedBell.ps1"` to the same Run-key mechanism the D/C/X tray script uses. **Screenshot the tray icon and the desktop shortcut.** It has never run on Windows: report anything odd (icon blank, count wrong: the file currently has 11 open items).
7. When your `AI-PROGRAMS-CLASSIFICATION_PROPOSED_*.csv` exists (filing order, step 8), run `Export-ProgramsData.ps1 -Csv <that file>`; the Programs page then shows real dates. The header should be `Name,Path,LastModified,ScheduledTask,LastRunResult,ProposedState`.
8. Open `VTES-PANEL.html` in Chrome: integrity box green, bell shows the count. Screenshot.
9. Report `RESULT_PANEL-INSTALL_2026-09-30.md` in VTES-Outbox: seven self-test lines, OK line, the three screenshots, task names (rollback = delete those tasks, the shortcut, and the Run-key entry).

## Do NOT
Edit any panel file; put a key or password anywhere; stamp a window other than your own (LLM-09 only by the honest rule in step 5).

Did the red bell appear in the tray?
