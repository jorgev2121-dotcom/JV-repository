# BRIEF — independent checker for panel v4 (adversarial, read-only)

Authority: Jorge Valdes, 2026-10-06: "yes, start the second checker automatically." You are the SECOND, independent check after the cloud keeper's own check. You did not build v4 and you do not trust its test report.

## Rules
1. Read CLAUDE.md first. Open with the banner "CHECKER · PANEL V4 (cloud session)".
2. Read-only on everything except ONE new file: `panel-rebuild/v4/CHECK-2_INDEPENDENT.md` on your own branch. Do not edit v4 files. Do not touch Drive, the PC, Gmail or anything outside the repo.
3. Never invent a fact. Anything you could not run is UNVERIFIED with the exact PC check for the desktop.
4. Jorge's standard: one flaw means the work fails. Your job is to find the flaw, not to approve. Report every flaw you find, ranked, none hidden.

## What to check (source: panel-rebuild/BRIEF_FABLE-ENGINEER_PANEL-V4_2026-10-06.md and REQUIREMENTS_FROM-JORGE_2026-10-06.md)
1. Re-run the engineer's link test yourself from scratch with your own script (headless Chromium, Playwright, executablePath /opt/pw-browsers/chromium; never run "playwright install"). Request or click EVERY tab, link, button and address on EVERY v4 page. Report "N of N", your count against the engineer's count. A mismatch is itself a flaw.
2. RAMBO / LLM-01: shown plainly as "Claude Code Desktop Executor / RAMBO", with a working Open or Paste button. Same for every other window and executor.
3. No hand-typed status. Search the HTML for any fixed word like Live, Ready, Active, OK. Each must come from the data file, with a red NO DATA or STALE state when the data is missing or old. Test it: delete or age the sample data and confirm the page goes red.
4. No contradictory times or counts anywhere on the pages.
5. Anything not working yet (for example vtes:// before registration) is labeled in plain words with the one fixing step, and does not look clickable.
6. INSTALL-v4.ps1 and ROLLBACK-v4.ps1: read every line. Does the install back up first? Does rollback restore exactly? Any admin rights, deletes, network calls, or passwords? Any non-ASCII byte in PowerShell files (RI-032)? Does v3 stay untouched?
7. DATA-CONTRACT.md: could the desktop produce each file as written? Anything ambiguous?
8. Requirements 1 to 11 in the requirements file: for each, PASS, FAIL or UNVERIFIED with evidence.
9. Plain-language "read me first" panel: readable aloud by text-to-speech (short numbered sentences)?

## Output
`CHECK-2_INDEPENDENT.md`: verdict first (PASS only if zero flaws found, otherwise FAIL with the count), then the numbered flaw list with file and line, then the N-of-N results, then the UNVERIFIED list with PC checks. End with one yes/no question for Jorge. Commit, push to your branch, no pull request.

TRK-2026-9910-B · v1 · 2026-10-06 · BRIEF (cloud keeper)
