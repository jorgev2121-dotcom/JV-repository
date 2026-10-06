# DESKTOP-WORK - everything v4 needs from the PC. The desktop executor (RAMBO) does all of it. Nothing here is for Jorge. TRK-2026-9910-B (fix round 2)

Charter Rule 1 and Article 4: no technical task goes back to Jorge. Each item says what to do, how to prove it, and what Jorge has to do (nothing).

WORKAROUND-CERT for the old "Jorge copies the Cowork address into vtes-addresses.json" step: that step is removed. Tried: asking Jorge (rejected, a technical task). Done instead: RAMBO finds the Claude desktop app shortcut and fills the entry itself (item 3). Simplest owner action: none.

**Never run `Verify-VtesPanel.ps1 -Build` in the live folder.** Its own help says "run only from a known-good git checkout": rebuilding the manifest in the live folder approves whatever is already there, including a tampered file. Items 1 to 3 need no rebuild at all. If a rebuild is ever truly needed, run it from a known-good checkout of the repo, copy that one MANIFEST.sha256 over, and run INSTALL-v4.ps1 again.

1. **Pick the live folder.**
   - What: find the folder the launcher shortcut Jorge double-clicks really opens (right-click the shortcut, Properties, Target). The real v3 may be named VTES-CONTROL-PANEL.html (the retired Drive page redirects to it) or VTES-LLM-LAUNCHER.html; INSTALL knows both.
   - Rule: INSTALL-v4.ps1 now REQUIRES `-LiveDir` and never picks a folder. It refuses any folder inside a git checkout (it finds a .git in the folder or a parent). If the real v3 sits in a git checkout (for example `C:\Users\JV\JV-repository`), do NOT install there: report it to the cloud keeper in the mailbox; do not copy files around on your own.
   - Prove: the folder path written into the report, and `INSTALL-v4.ps1 -LiveDir "<folder>" -DryRun` printing "Live folder: ..." and the v3 launcher file name.
2. **Install v4 beside v3.**
   - What: run `INSTALL-v4.ps1 -LiveDir "<folder>" -DryRun`, read it, then the same without -DryRun. It writes the install record FIRST, then copies. Then add a second Desktop shortcut "VTES Launcher v4" to VTES-LLM-LAUNCHER_v4.html (leave the v3 shortcut alone). The Panel home page (vtes-modules.js) still opens v3: do not edit it.
   - Prove: "Record written first", "v3 untouched (SHA256 identical before and after)" and "OK: 32 code files match". If it prints FAILED, run the ROLLBACK command it prints; the record already exists.
   - Undo: `<folder>\_Rollback\ROLLBACK-v4.ps1 -LiveDir "<folder>"`. Prove: "Every file v4 or its helpers could touch is byte-identical to before v4 (N of N)".
3. **Address book.**
   - What: fill url or run for LLM-01 (the Claude desktop app, Code tab) and LLM-03 (the Claude desktop app; whether it lands on the Cowork tab is UNVERIFIED, test it); add an entry for LLM-09 in vtes-addresses.json. Then `VTES-Open.ps1 -Install` (no admin).
   - Prove: `VTES-Open.ps1 llm-01 -DryRun` prints a target.
4. **Poller and the status writer.**
   - What: write `data\vtes4-heartbeat.js` (contract item 1): interval_sec (1 to 3600), vtes_scheme_registered, addresses_filled (read from vtes-addresses.json every tick), executors for the twelve ids, each with its own last_seen, proof_at for chat-only windows. Then run `EDIT-VtesStatus-v4.ps1 -LiveDir "<folder>"` once: it adds LLM-09, LOCAL, CHIEF to Write-VtesStatus.ps1 with a backup, a record entry and a manifest-line update. No Verify -Build.
   - Note: Write-VtesStatus.ps1 always writes "up" and checks nothing. The page therefore shows its entries as grey "WRITER SAYS UP, NOT PROVEN". Green needs the poller's own heartbeat. Do not tell Jorge a window is up on the strength of vtes-status.js.
   - Prove: `Verify-VtesPanel.ps1 -Dir "<folder>"` prints OK; `Write-VtesStatus.ps1 -SelfTest` prints "8 passed, 0 failed"; the page shows RAMBO green only after the heartbeat file lists LLM-01 with a fresh last_seen.
5. **Grok.**
   - What: send Grok one test message; if it answers, record state "up" with proof_at in the heartbeat for LLM-07. Until then the card stays red, which is true. The Grok Bots box stays NOT BUILT until a proven BOTS report exists.
   - Prove: the Grok card turns green and shows the test time, or stays red with the reason.
6. **The five writers (contract items 2 to 6).** Each is its own piece of work, each with its own proof:
   - 6a. State writer (`data\vtes4-state.js`, every day): proof = the Health panel shows open, in-progress and blocked numbers and the money and repairs lists, with the file's time.
   - 6b. Daily health report (`data\vtes4-health.js`, ok:true/false required): proof = the strip shows "health: OK" only when ok is exactly true, red NOT OK when false.
   - 6c. Token monitor (`data\vtes4-tokens.js`, every 30 minutes at most): proof = the Token monitor panel shows a burn rate per hour and the program table, measured, never estimated.
   - 6d. Housekeeping agent (`data\vtes4-housekeeping.js`): proof = the panel shows a last-report time and "Delivered: yes", and the email is in Jorge's inbox.
   - 6e. Miami-Dade counter (`data\vtes4-miamidade.js`, ids "01" to "22"): proof = "Counted so far: n of 300" and green "proof checked" marks only for sources whose proof was re-checked in the last 7 days.
7. **Re-test on the PC.**
   - What: open VTES-LLM-LAUNCHER_v4.html from file:// (double-click), press the RAMBO button, paste into Notepad, confirm the packet text. Then leave the page open for one hour with the writers running and compare the RAMBO chip with the RAMBO card.
   - Prove: the pasted text starts with HANDOFF and its time ends in EDT or EST; the chip and the card agree.

Did the desktop executor finish all items? Each is DONE only with its proof line.
