# DESKTOP-WORK - everything v4 needs from the PC. The desktop executor (RAMBO) does all of it. Nothing here is for Jorge. TRK-2026-9910-B (fix round 3)

Charter Rule 1 and Article 4: no technical task goes back to Jorge. Each item says what to do, how to prove it, and what Jorge has to do (nothing).

WORKAROUND-CERT for the old "Jorge copies the Cowork address into vtes-addresses.json" step: that step is removed. Tried: asking Jorge (rejected, a technical task). Done instead: RAMBO finds the Claude desktop app shortcut and fills the entry itself (item 3). Simplest owner action: none.

**How v4 is installed (changed in fix round 3).** v4 goes into a NEW folder beside the v3 folder (`<parent of v3>\vtes-panel-v4`). INSTALL-v4.ps1 never writes inside the v3 folder, never touches MANIFEST.sha256, never runs Verify-VtesPanel.ps1 and never edits Write-VtesStatus.ps1. It only reads the v3 folder. A small file `vtes4-config.js` in the new folder holds the address of the v3 folder, so v4 can read v3's `vtes-status.js` and `vtes-reminders.js`. **Never run `Verify-VtesPanel.ps1 -Build` in the live folder** (it approves whatever is there, including a tampered file); nothing in this package needs it.

1. **Pick the v3 folder.**
   - What: find the folder the launcher shortcut Jorge double-clicks really opens (right-click the shortcut, Properties, Target). The real v3 may be named VTES-CONTROL-PANEL.html (the retired Drive page redirects to it) or VTES-LLM-LAUNCHER.html; INSTALL knows both.
   - Rule: INSTALL-v4.ps1 REQUIRES `-LiveDir` and never picks a folder. It refuses when the real path of the v3 folder (links and junctions followed), the path as typed, or the folder where the new one would go is inside a git checkout. If the real v3 sits in a git checkout (for example `C:\Users\JV\JV-repository`), do NOT install there: report it to the cloud keeper in the mailbox; do not copy files around on your own. It also refuses if `<parent>\vtes-panel-v4` already exists (it never installs over or into an existing folder).
   - Prove: the folder path in the report, and `INSTALL-v4.ps1 -LiveDir "<folder>" -DryRun` printing "v3 folder (real path): ..." and the v3 launcher file name and "would write nothing inside the v3 folder".
2. **Install v4 beside v3.**
   - What: run `INSTALL-v4.ps1 -LiveDir "<folder>" -DryRun`, read it, then the same without -DryRun. Then add a second Desktop shortcut "VTES Launcher v4" to `<parent>\vtes-panel-v4\VTES-LLM-LAUNCHER_v4.html` (leave the v3 shortcut alone). The Panel home page (vtes-modules.js) still opens v3: do not edit it. **From now on every v4 data writer (item 4 and 6) writes into `<parent>\vtes-panel-v4\data\`, not into the v3 folder.**
   - Prove: "Record written first", "new folder check: 10 of 10 copied files have the same SHA256 as the package" and "v3 untouched: SHA256 of all N files in the v3 folder is identical before and after". If it prints FAILED, run the ROLLBACK command it prints; the record already exists.
   - Undo: `ROLLBACK-v4.ps1 -NewDir "<parent>\vtes-panel-v4"` (add -DryRun to only list). It prints every file it will remove, removes only what the install record lists, and leaves anything else (and the folder) in place. Prove: "v4 rolled back completely".
3. **Address book.**
   - What: fill url or run for LLM-01 (the Claude desktop app, Code tab) and LLM-03 (the Claude desktop app; whether it lands on the Cowork tab is UNVERIFIED, test it); add an entry for LLM-09 in vtes-addresses.json. Then `VTES-Open.ps1 -Install` (no admin).
   - Prove: `VTES-Open.ps1 llm-01 -DryRun` prints a target.
4. **Poller (and, separately, an optional edit of the status writer).**
   - 4a. What: write `<parent>\vtes-panel-v4\data\vtes4-heartbeat.js` (contract item 1): interval_sec (1 to 3600; the page calls the file stale after 3 x interval_sec, 3 minutes to 3 hours), vtes_scheme_registered, addresses_filled (read from vtes-addresses.json every tick), executors for the twelve ids, each with its own last_seen, proof_at for chat-only windows, and for BOTS (the Grok bots) `proof_at` = the moment a bot finished a real task. Prove: the page shows RAMBO green only after the heartbeat file lists LLM-01 with a fresh last_seen, and a chat window only with a fresh proof_at.
   - 4b. OPTIONAL, its own hand-made order, NOT part of INSTALL: let Write-VtesStatus.ps1 also stamp LLM-09, LOCAL and CHIEF. Nothing in v4 depends on it (its entries are never proof; the page shows them as grey "WRITER SAYS UP, NOT PROVEN"). If you do it: (i) copy `Write-VtesStatus.ps1` to `Write-VtesStatus.ps1.bak-YYYYMMDD` in the same folder first (charter); (ii) add the three ids to the allowed list by hand; (iii) run `Write-VtesStatus.ps1 -SelfTest` (must print "8 passed, 0 failed"); (iv) `Verify-VtesPanel.ps1` will now say "PROBLEM: changed = Write-VtesStatus.ps1" because the manifest still holds the old hash: that is correct and must stay visible. Do NOT run `-Build` in the live folder; tell the cloud keeper in the mailbox, who updates the repo copy and manifest from a known-good checkout; (v) undo = copy the .bak back and prove its SHA256 equals the one noted before the edit. Prove: the self-test line and the noted SHA256 values.
   - Note: Write-VtesStatus.ps1 always writes "up" and checks nothing. Do not tell Jorge a window is up on the strength of vtes-status.js.
5. **Grok.**
   - What: send Grok one test message; if it answers, record state "up" with proof_at in the heartbeat for LLM-07. Until then the card stays red, which is true. The Grok Bots box stays NOT BUILT until the heartbeat holds `executors.BOTS` with state "up", a fresh last_seen AND a proof_at (a finished bot task), see DATA-CONTRACT rule 5.
   - Prove: the Grok card turns green and shows the test time, or stays red with the reason.
6. **The five writers (contract items 2 to 6).** Each is its own piece of work, each with its own proof:
   - 6a. State writer (`<new folder>\data\vtes4-state.js`, every day): proof = the Health panel shows open, in-progress and blocked numbers and the money and repairs lists, with the file's time.
   - 6b. Daily health report (`data\vtes4-health.js`, ok:true/false required): proof = the strip shows "health: OK" only when ok is exactly true, red NOT OK when false.
   - 6c. Token monitor (`data\vtes4-tokens.js`, every 30 minutes at most): proof = the Token monitor panel shows a burn rate per hour and the program table, measured, never estimated.
   - 6d. Housekeeping agent (`data\vtes4-housekeeping.js`): proof = the panel shows a last-report time and "Delivered: yes", and the email is in Jorge's inbox.
   - 6e. Miami-Dade counter (`data\vtes4-miamidade.js`, ids "01" to "22"): proof = "Counted so far: n of 300" and green "proof checked" marks only for sources whose proof was re-checked in the last 7 days.
7. **Re-test on the PC.**
   - What: open VTES-LLM-LAUNCHER_v4.html from file:// (double-click), press the RAMBO button, paste into Notepad, confirm the packet text. Then leave the page open for one hour with the writers running and compare the RAMBO chip with the RAMBO card.
   - Prove: the pasted text starts with HANDOFF and its time ends in EDT or EST; the chip and the card agree.

Did the desktop executor finish all items? Each is DONE only with its proof line.
