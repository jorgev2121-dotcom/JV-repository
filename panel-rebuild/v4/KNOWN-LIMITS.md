# KNOWN-LIMITS - what the cloud could not test, and the exact PC check for each (TRK-2026-9910-B)

1. **Source of v3 unverified.** The Drive file VTES-LLM-LAUNCHER_v3.html is an 889-byte "retired" redirect page. I built from the repo copy (2026-09-30). The "27 cards, 22 tabs" in the brief could not be confirmed; the repo copy has 10 cards. PC check: open the live launcher, count cards; if it has cards this build lacks, tell the cloud keeper which.
2. **Live folder path unknown.** INSTALL-v4.ps1 needs -LiveDir. It looks for %USERPROFILE%\JV-repository\tools\vtes-panel and stops if the launcher is not there. PC check: run with -DryRun first; it lists every file it would copy or back up and changes nothing.
3. **INSTALL and ROLLBACK scripts never executed** (no PowerShell here). PC check: INSTALL-v4.ps1 -DryRun, then real run, then open the launcher; then run ROLLBACK-v4.ps1 once on a copy of the folder and confirm the v3 launcher returns.
4. **vtes:// registration.** Nothing here can register it. Until VTES-Open.ps1 -Install runs on the PC AND the heartbeat says vtes_scheme_registered=true, the cards show "not available yet" with the one fix. PC check: Win+R, type vtes://llm-02, press Enter: the Cloud session should open.
5. **Tray icons.** Not part of this package; only two exist. PC check: hover each icon and read its title; the cards name them (green D, blue C, orange X) from the registry, UNVERIFIED on the PC.
6. **The six data writers do not exist yet.** Until the desktop builds them (DATA-CONTRACT.md) every light is red NO DATA. That is the true state, not a defect. PC check: after each writer runs once, open data\vtes4-NAME.js and see a real "at" time.
7. **Tray/RAMBO "Open" from the page** cannot launch a desktop app from a browser. The RAMBO card therefore offers a Paste button plus the click path, not an Open button.
8. **Clipboard.** Real copy to the clipboard depends on the PC browser. PC check: press the RAMBO paste button, then Ctrl+V into Notepad.
9. **Legacy v3 data files** vtes-alerts.js, vtes-reviews.js, vtes-budget.js, vtes-verify.js: not in the repo, 404 in the cloud, still loaded by the unchanged VTES-PANEL.html. The v4 launcher no longer loads them (the bell count now reads only vtes-reminders.js, which is typed reminder content, not a status). PC check: see whether they exist on the PC.
10. **Not audited line by line:** the Map view and the INFO descriptions inherited from v3. They contain no typed timing and the Map dots use the same live state, but subscription prices and descriptions there are v3 text, UNVERIFIED.
11. **Third-party links** (claude.ai, chatgpt.com, grok.com, gemini, copilot, 22 Drive proofs, Drive Inbox/Outbox folders) were only syntax-checked. PC check: click each once.
12. **Facts taken from the brief and registry, not re-read at the source:** Grok unproven 31 days, Cowork cannot receive via Drive, executor tray colors. Marked UNVERIFIED on the cards where used.

TRK-2026-9910-B · v1 · 2026-10-06 · KNOWN-LIMITS (Sonnet 5.5 engineer)
