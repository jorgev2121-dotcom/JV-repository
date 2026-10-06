# DESKTOP-WORK - everything v5 needs from the PC. The desktop executor (RAMBO) does all of it. Nothing here is for Jorge. TRK-2026-9910-B (port v5)

Charter Rule 1 and Article 4: no technical task goes back to Jorge. Each item says what to do, how to prove it, and what Jorge has to do (nothing, except where an item says it needs his yes).

WORKAROUND-CERT for "how does Jorge get the new launcher": tried to put it on the Desktop (rejected: the charter says the Desktop is a launchpad, never storage, and v3 must stay untouched as the rollback). Done instead: a NEW folder named by `-TargetDir`; a Desktop shortcut is a separate order for Jorge's yes. Simplest owner action: one yes or no.

**How v5 is installed.** `INSTALL-v5.ps1 -TargetDir "<new folder>" [-V3File "C:\Users\JV\Desktop\VTES-LLM-LAUNCHER_v3.html"] [-StatusDir "<folder>"]`. It creates the one new folder, copies 10 files into it, and writes `vtes5-config.js` and `v5-install-record.txt`. It never writes inside the folder that holds the v3 launcher, never touches any manifest, and refuses a git checkout (real paths, links and junctions followed). It fingerprints (SHA-256) the files directly in the v3 folder before and after and says whether they are identical.

1. **Choose the target.**
   - What: pick a NEW folder name that does not exist, for example `G:\My Drive\MY-DESK\VTES-PANEL\v5` or `C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5`. Its parent folder must already exist. It must not be inside the folder that holds the v3 launcher and must not be inside a git checkout (for example `C:\Users\JV\JV-repository`).
   - Prove: `INSTALL-v5.ps1 -TargetDir "<path>" -V3File "C:\Users\JV\Desktop\VTES-LLM-LAUNCHER_v3.html" -DryRun` prints "DRY RUN. New folder (does not exist now)", the v3 launcher SHA256 and "would write nothing inside the v3 folder".
2. **Install.**
   - What: run the same command without `-DryRun`. If the v3 launcher SHA256 line says it differs from 28d3ed5e..., that is allowed (the file may have been edited since); write the difference in the report.
   - Prove: paste the lines "Record written first", "new folder check: 10 of 10 copied files have the same SHA256 as the package", "v3 untouched: SHA256 of all N files in the v3 folder is identical before and after". If it prints FAILED or ALARM, run the ROLLBACK command it prints and report; do not retry on your own.
   - Undo: `ROLLBACK-v5.ps1 -NewDir "<the new folder>"` (add -DryRun to only list). Prove: "v5 rolled back completely".
3. **Address book.**
   - What: fill url or run for LLM-01 (the Claude desktop app, Code tab) and LLM-03 (the Claude desktop app; whether it lands on the Cowork tab is UNVERIFIED, test it) in vtes-addresses.json. Then `VTES-Open.ps1 -Install` (no admin).
   - Prove: `VTES-Open.ps1 llm-01 -DryRun` prints a target.
4. **Poller (heartbeat file).**
   - What: write `<new folder>\data\vtes5-heartbeat.js` (DATA-CONTRACT file 1): interval_sec (1 to 3600; the page calls the file stale after 3 x interval_sec, 3 minutes to 3 hours), vtes_scheme_registered, addresses_filled (read from vtes-addresses.json every tick), executors for LLM-01 to LLM-09, LOCAL and CHIEF, each with its own last_seen, plus proof_at for the chat-only windows (LLM-04, 05, 07, 08) and for BOTS.
   - Prove: the page shows RAMBO green only after the heartbeat lists LLM-01 with a fresh last_seen; a chat window only with a fresh proof_at; every "Check-in interval" sentence on the page equals interval_sec.
5. **Bots report (new file).**
   - What: write `<new folder>\data\vtes5-bots.js` (DATA-CONTRACT file 2) from the Windows scheduler for the six tasks CU-Inbox-Job-Watcher, CU-Local-Executor, CU-TokenMonitor-Hourly, CU-Orchestrator, CU-Propagation-Check, VTES-LOCAL-POLLER: state, last run time, last result code, next run time, and the task's own repeat interval in seconds.
   - Prove: the six bot lines under section 4 show the scheduler's last run and result; a task you disable on purpose shows red DISABLED within two ticks; then re-enable it.
6. **Grok.** Send Grok one test message; if it answers, record state "up" with proof_at in the heartbeat for LLM-07. Until then the card stays red, which is true. The Grok bot box stays "No Grok bot has been built" until `executors.BOTS` has state up, a fresh last_seen AND proof_at (a finished bot task). Prove: the Grok card turns green and shows the test time, or stays red with the reason.
7. **The five other writers (contract files 3 to 7),** each its own work and proof:
   - 7a. State writer (`data\vtes5-state.js`, daily): proof = the Live status block shows open, in-progress and blocked numbers and the money list; the live repair rows appear under the typed repairs log.
   - 7b. Daily health report (`data\vtes5-health.js`, ok:true/false required). Proof = "health: OK" only when ok is exactly true.
   - 7c. Token monitor (`data\vtes5-tokens.js`, every 30 minutes at most). Proof = the Token monitor panel under Bots shows a burn rate per hour and the program table, measured, never estimated.
   - 7d. Housekeeping agent (`data\vtes5-housekeeping.js`). Proof = the panel shows a last-report time and "Delivered: yes", and the email is in Jorge's inbox.
   - 7e. Miami-Dade counter (`data\vtes5-miamidade.js`, ids "01" to "22"). Proof = "Counted so far: n of 300" and green "proof checked" only for sources re-checked in the last 7 days.
8. **Re-test on the PC.**
   - What: open `<new folder>\VTES-LLM-LAUNCHER_v5.html` from file:// (double-click), press the blue RAMBO button, paste into Notepad, confirm the packet text. Click one old-panel tab and one https Open button. Leave the page open for one hour with the writers running; compare the RAMBO state line with the Live status block.
   - Prove: the pasted text starts with HANDOFF and its time ends in EDT or EST; the card and the strip agree.
9. **NEEDS JORGE'S YES (separate order, not part of INSTALL): a Desktop shortcut "VTES Launcher v5"** to `<new folder>\VTES-LLM-LAUNCHER_v5.html`. The v3 file and its shortcut stay as they are.

Did the desktop executor finish all items? Each is DONE only with its proof line.
