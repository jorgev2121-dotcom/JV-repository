# KNOWN-LIMITS - what the cloud could not test, and the exact PC check for each (TRK-2026-9910-B)

1. **Source of v3 unverified.** The Drive file VTES-LLM-LAUNCHER_v3.html is an 889-byte "retired" redirect page. I built from the repo copy (2026-09-30). The "27 cards, 22 tabs" in the brief could not be confirmed; the repo copy has 10 cards. PC check: open the live launcher, count cards; if it has cards this build lacks, tell the cloud keeper which.
2. **Live folder path unknown.** INSTALL-v4.ps1 now looks in five likely folders and STOPS unless exactly one holds a v3 launcher; then the desktop executor chooses with -LiveDir (DESKTOP-WORK.md item 1). It installs BESIDE v3 and never edits it. PC check: -DryRun first.
3. **INSTALL and ROLLBACK were executed in the cloud this round, with PowerShell 7.4.6 on Linux,** against a copy of the v3 folder (results in TEST-REPORT.md). NOT run on Windows or on Windows PowerShell 5.1. PC check: -DryRun, a real run on a copy of the folder, then ROLLBACK, then compare SHA256 of the v3 launcher.
4. **vtes:// registration.** Nothing here can register it. Until VTES-Open.ps1 -Install runs on the PC AND the heartbeat says vtes_scheme_registered=true, the cards show "not available yet" with the one fix. PC check: Win+R, type vtes://llm-02, press Enter: the Cloud session should open.
5. **Tray icons.** Not part of this package; only two exist. PC check: hover each icon and read its title; the cards name them (green D, blue C, orange X) from the registry, UNVERIFIED on the PC.
6. **The six data writers do not exist yet.** Until the desktop builds them (DATA-CONTRACT.md) every light is red NO DATA. That is the true state, not a defect. PC check: after each writer runs once, open data\vtes4-NAME.js and see a real "at" time.
7. **Tray/RAMBO "Open" from the page** cannot launch a desktop app from a browser. The RAMBO card therefore offers a Paste button plus the click path, not an Open button.
8. **Clipboard.** Real copy to the clipboard depends on the PC browser. PC check: press the RAMBO paste button, then Ctrl+V into Notepad.
9. **Legacy v3 data files** vtes-alerts.js, vtes-reviews.js, vtes-budget.js, vtes-verify.js: not in the repo, 404 in the cloud, still loaded by the unchanged VTES-PANEL.html. The v4 launcher no longer loads them (the bell count now reads only vtes-reminders.js, which is typed reminder content, not a status). PC check: see whether they exist on the PC.
10. **The Map and the INFO descriptions inherited from the repo copy are still typed text.** Round 1 labels every typed status, capability word and subscription note as a "typed note from 2026-09-30" and takes them out of green. They are labelled, not checked: prices, billing dates and the can / partly / later words are UNVERIFIED. The Map has no CHIEF node because its reach would have to be invented.
11. **Third-party links** (claude.ai, chatgpt.com, grok.com, gemini, copilot, 22 Drive proofs, Drive Inbox/Outbox folders) were only syntax-checked. PC check: click each once.
12. **Facts taken from the brief and registry, not re-read at the source:** Grok unproven 31 days, Cowork cannot receive via Drive, executor tray colors. Marked UNVERIFIED on the cards where used.

13. **The live v3 page has never been seen by the cloud (flaw 1).** This package is built on the 2026-09-30 repo copy; a later round ports onto the live v3 HTML. Do not install v4 as a replacement for v3: it is installed beside it only.
14. **No writer exists for any data file** except the old Write-VtesStatus.ps1 (read from the repo branch, live copy UNVERIFIED). Until DESKTOP-WORK.md items 4 and 6 are done, a vtes:// link can never appear (the flag addresses_filled does not exist) and every light is red. That is safe and true.
15. **Chat-only windows (Chat, iPhone, Grok, Gemini, Copilot) cannot turn green without a recorded test reply.** The page says so on each card.
16. **Windows PowerShell 5.1** not tested (see TEST-REPORT.md).

TRK-2026-9910-B · v2 · 2026-10-06 · KNOWN-LIMITS (Sonnet 5.5 engineer)
