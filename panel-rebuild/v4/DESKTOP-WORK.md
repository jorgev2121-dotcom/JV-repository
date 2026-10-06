# DESKTOP-WORK - everything v4 needs from the PC. The desktop executor (RAMBO) does all of it. Nothing here is for Jorge. TRK-2026-9910-B

Charter Rule 1 and Article 4: no technical task goes back to Jorge. Each item says what to do, how to prove it, and what Jorge has to do (nothing).

WORKAROUND-CERT for the old "Jorge copies the Cowork address into vtes-addresses.json" step: that step is removed. Tried: asking Jorge (rejected, a technical task). Done instead: RAMBO finds the Claude desktop app shortcut and fills the entry itself (item 3). Simplest owner action: none.

1. Pick the live folder. Find the folder the launcher shortcut Jorge double-clicks really opens (right-click the shortcut, Properties, Target). Candidates the install script knows: G:\My Drive\VTES-PANEL, <profile>\JV-repository\tools\vtes-panel, <profile>\OneDrive\Documents\VTES-PANEL, Desktop. Proof: the folder path, written into the report.
2. Install v4 beside v3. Run `INSTALL-v4.ps1 -DryRun`, read it, then `INSTALL-v4.ps1 -LiveDir "<that folder>"`. Proof: the line "v3 untouched (SHA256 identical before and after)" and "OK: N code files match" from Verify-VtesPanel.ps1. Then add a second shortcut "VTES Launcher v4" on the Desktop pointing at VTES-LLM-LAUNCHER_v4.html (leave the v3 shortcut alone). The Panel home page (vtes-modules.js) still opens v3: do not edit it in this round.
3. Address book. Fill url or run for LLM-01 (the Claude desktop app, Code tab), LLM-03 (the Claude desktop app; whether it lands on the Cowork tab is UNVERIFIED, test it) and add an entry for LLM-09 in vtes-addresses.json. Then `VTES-Open.ps1 -Install` (no admin). Proof: `VTES-Open.ps1 llm-01 -DryRun` prints a target.
4. Poller. Write the heartbeat file (contract item 1): interval_sec, vtes_scheme_registered, addresses_filled (read from vtes-addresses.json every tick), executors for the twelve ids. Extend Write-VtesStatus.ps1 (add LLM-09, LOCAL, CHIEF to $ValidIds) instead of building a second heartbeat system. After editing it run `Verify-VtesPanel.ps1 -Build`, then `INSTALL-v4.ps1` again so the four v4 lines come back into MANIFEST.sha256.
5. Grok. Send Grok one test message; if it answers, record state "up" with proof_at in the heartbeat. Until then the card stays red, which is true.
6. State, health, tokens, housekeeping, Miami-Dade writers (contract items 2-6).
7. Re-test: open VTES-LLM-LAUNCHER_v4.html from file:// (double-click), press the RAMBO button, paste into Notepad, confirm the packet text. This is the clipboard check the cloud cannot do.

Did the desktop executor finish all seven? Each one is DONE only with its proof line.
