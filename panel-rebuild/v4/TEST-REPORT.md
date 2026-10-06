# TEST-REPORT - panel v4 (TRK-2026-9910-B, 2026-10-06)

**Answer first: launcher v4 passes 80 of 80 click-everything checks and 55 of 55 live-state checks. The unchanged v3 panel page still fails 4 of 30 (carried over, not fixed here).**

How it was run: headless Chromium (Playwright, executablePath /opt/pw-browsers/chromium), pages served from an "install image" = the unchanged v3 files from branch executor-tray-icon-1cazza plus the v4 files on top (make-test-image.sh). Raw results are in the .json files listed below.

## Before (v3, repo copy) - before-v3.json
- VTES-LLM-LAUNCHER.html + VTES-PANEL.html: **71 of 79 pass, 8 fail.**
- The 8 failures: vtes-status.js, vtes-alerts.js, vtes-reviews.js, vtes-budget.js (launcher) and vtes-alerts.js, vtes-reviews.js, vtes-budget.js, vtes-verify.js (panel) answered HTTP 404. Those files are written on the PC and are not in the repo.
- The test could not see the real v3 failures that Jorge describes (dead vtes:// links, missing Open buttons), because in this repo copy vtes:// is plain text and the missing buttons are non-links. They are recorded in 01_INVENTORY.md as DEAD / MISLABELED by reading the file, not by this count.

## After (v4)
1. test-everything.js on VTES-LLM-LAUNCHER_v4.html - after-v4.json: **80 of 80 pass.** 1 page load, 2 local links, 31 https links (syntax only), 46 buttons clicked with no JavaScript error.
2. test-everything.js on VTES-PANEL.html (v3 page, not changed by v4) - after-v4-panel-unchanged.json: **26 of 30 pass, 4 fail.** FAIL: vtes-verify.js, vtes-alerts.js, vtes-reviews.js, vtes-budget.js return 404 in the cloud tree. Reason: PC-written files, same as before. Not fixed, because the brief covers the launcher; listed in KNOWN-LIMITS.md.
3. test-states.js - states-v4.json: **55 of 55 pass** across three worlds:
   - NONE (shipped, empty data): every data badge red NO DATA, no executor chip green, every card state red, vtes:// not clickable and RAMBO shows its one-step fix, Miami says "unknown of 300", token monitor and housekeeping say NO DATA with no numbers, completion says NO DATA, timing says "interval unknown".
   - FRESH (fixture files, fixed clock): six badges green, LLM-01 and LLM-02 green from the heartbeat, Grok red DOWN, Cowork (absent from heartbeat) still red NO DATA, "every 5 minutes" read from the file, vtes:// link appears only after vtes_scheme_registered is true, token, housekeeping, completion (75%, 9 of 12 checks), repairs and "7 of 300" all read from files.
   - STALE (heartbeat and tokens a day old): "STALE since" shown in red, old token numbers flagged, no executor chip green.
   - All worlds: 7-sentence read-me-first open at the top, age stamp present, 22 Miami-Dade proof links, Grok card says no bots and gives its next step, no typed timing sentence (every 2 minutes, every 15 minutes), no placeholder address, RAMBO card name starts "Claude Code Desktop Executor / RAMBO", and the paste buttons on RAMBO, Cowork and iPhone each produce a visible result and a filled packet.

## Total
Launcher v4 and its states: 135 of 135 pass. Everything tested, including the unchanged panel page: 161 of 165 pass. The 4 failures are all VTES-PANEL.html legacy data files.

## What these tests do NOT prove
- https links are syntax-checked only; the cloud did not load grok.com, chatgpt.com, Drive or the 22 proof files. UNVERIFIED that they open.
- The clipboard was stubbed; the packet text was checked in the page, not in a real clipboard.
- INSTALL-v4.ps1 and ROLLBACK-v4.ps1 were NOT run: no PowerShell exists in the cloud container. Pure-ASCII was checked; syntax was not machine-checked.
- Other v3 pages (BUDGET, CAPTURE, INTERVIEW, MUNICIPALITIES, PORTAL, PROGRAMS, QUOTE, REMINDERS, TASKS, TREEMAP, WHERE) were not retested.

Rerun: `sh make-test-image.sh /tmp/img && node test-everything.js /tmp/img VTES-LLM-LAUNCHER_v4.html out.json && node test-states.js /tmp/img out2.json`

TRK-2026-9910-B · v1 · 2026-10-06 · TEST-REPORT (Sonnet 5.5 engineer)
