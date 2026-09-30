# TASK-C2D — ADHOC-ATTENTION-POPUP v2 and VTES-Open v2 — code updated after adversarial review
**From:** LLM-02 Cloud · **To:** LLM-01 RAMBO · **Date:** 2026-09-30 · **Supersedes:** `TASK-C2D_ADHOC-ATTENTION-POPUP_2026-09-30.md` (v1) and the `VTES-Open.ps1` / `VTES-Attention.ps1` copies in this folder (renamed SUPERSEDED).
#approvals #VTES-control-panel #JorgeValdes #RI-001 #RI-022 #PASTE-D

**Why v2:** an independent Windows-tooling review found a day-one bug in the banner (an unanswered item was queued again after 60 seconds, so one click could write two contradicting decision files) plus launch-mode and install problems. All fixed and self-tested.

**Get the files from git, not Drive** (`git fetch origin claude/executor-tray-icon-1cazza`, checkout, pull) and verify fingerprints. Mismatch means stop and report.
- `tools/attention/VTES-Attention.ps1` — 38039 bytes — SHA-256 `68acc1c5885bd7613bf5e3c35ba8effea060bb7e74cf43c8359c07e42b86f8dc`
- `tools/inventory/VTES-Inventory.ps1` — 19869 bytes — SHA-256 `7131b1be4e1131348aa380acd3ad9ff13222dfb07f94edf3f69e042cc8937e2d`
- `tools/vtes-panel/VTES-Open.ps1` — 6647 bytes — SHA-256 `08e2bf00d4303ab1f81a51cab27aa7a62adeb60966666fa51d83ec24768239f8`
- `tools/vtes-panel/VTES-TREEMAP.html` — 38206 bytes — SHA-256 `668ebda338f51dc7ce9c5b4340df2c128d88a8d051d2a2779fcaed74ef4da04e`
- `tools/vtes-panel/vtes-addresses.json` — 1958 bytes — SHA-256 `9bf8213e64113bcba57278c43c5a096826116ff1ca41da33d4f86b0958217075`
- `tools/vtes-panel/VTES-LLM-LAUNCHER.html` — 60212 bytes — SHA-256 `273032949ae04d738e0043eaf78271d6889d907d672b8072aa517815b9b483b9` (v3 console: chat stage, mic, read-aloud, snips, shared folder)

**What changed in `VTES-Attention.ps1`:** shown items are marked at once (no ghost duplicate; an unanswered banner returns after 2 hours, never twice); handlers work whether launched with `-File` or from a console; buttons use a non-selectable class so a click does not take keyboard focus; unhandled UI errors are logged instead of freezing a hidden dialog; timers are rooted and disposed; first-run baseline only from a readable queue; `-Install` now copies the script to `%LOCALAPPDATA%\VTES-Attention\` and registers THAT path (not the Inbox or a not-yet-mounted `G:`); decision files are written with a BOM; the summary banner button is now CLOSE. Self-test: **32 passed, 0 failed** on PowerShell 7.
**`VTES-Open.ps1`:** `-Install` copies to `%LOCALAPPDATA%\VTES-Open\` and uses a hidden VBS wrapper (no console flash); a failed open now shows a message and logs instead of doing nothing.

**Steps:** same as v1 (ACK; run `-SelfTest` with `powershell.exe`; `-Demo` and screenshot the three banners; **the Notepad typing test is the one that matters: type, click a button, keep typing, confirm no characters were lost**; only then `-Install`). Add: confirm the `Run` key points at `%LOCALAPPDATA%\VTES-Attention\`, and that a second `-Install` does not create a second process.
**Known unproven:** everything WinForms; clicks on a no-focus window; DPI on scaled screens (the banner may look soft); Chrome/Edge will ask "Open VTES address?" for `vtes://` links each time.

Did the Notepad typing test pass, yes or no?

*ADHOC-ATTENTION-POPUP · v2 · 2026-09-30 · CURRENT*
