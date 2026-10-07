# TEST-REPORT - launcher v5 (port onto Jorge's real v3) (TRK-2026-9910-B)

**HISTORY AND LIMITS - nothing here is an install step.** This file carries no test total: every number is generated from the result files into FIX-ROUND-9.md, Section D, by numbers-r9.js, and checked by check-docs-agree-r9.js. All tests are the builder's own; none uses a checker's scripts.

## How the page is tested
Headless Chromium (/opt/pw-browsers, Playwright). The page is opened from `file://`, copied with its scripts and data folder into a temporary folder, with a fake clock fixed at 2026-10-06 2:00 PM ET. Outside requests are aborted, so no test depends on the internet. Clipboard writes are recorded by the test. VERIFY is run under PowerShell 7.4.6 for Linux (the release archive downloaded into its own empty folder and checked against the release's hashes.sha256), and the whole fixture is hashed before and after every scenario.

## The tests, by purpose (every one is run by run-all-r9.sh)
- **Everything is clickable and nothing of v3 is lost:** test-v5-click.js, test-v3-survives.js, test-v3-before.js, test-v3-packets.js, test-survival-92-r6.js.
- **Colour follows the data (never greener than the worst card):** test-v5-worlds.js, test-invariant-r6.js, test-frozen-r7.js, test-fuzz-r7.js, test-watchdog-r7.js.
- **One test per fix of each round:** test-fixes-r4.js, test-fixes-r5.js, test-fixes-r6.js, test-edge-r8.js, test-fixes-r9.js.
- **Words that claim what the page does (round 9):** test-claims-r9.js (a plain extractor over every sentence with a digit or one of sixteen words, with its registry in claims-registry-r9.js), test-quotematch-r9.js (every double-quoted text in the documents must be on the page or in VERIFY's real output), test-state-text-r8.js (sentences about ready, Press and one click against the real buttons), test-words-r7.js, check-xrefs-r9.js, check-docs-agree-r9.js.
- **Personal data:** test-pii-unit-r6.js, r7, r8 and r9 (the checker alone) and test-privacy-matrix-r6.js, r7, r8 and r9 (every note on every route, unticked and wrongly ticked). The notes are in pii-notes-r7.js, r8 and r9.
- **VERIFY:** test-verify.sh (the older scenarios), test-verify-r9.sh (the round-9 scenarios), test-no-write-commands.js (no copy, move, delete or write command anywhere).
- **The tests can fail:** run-mutations.sh breaks the live layer in many ways, one at a time, and the named test must go red (mutation-RESULT.txt). The round-9 tests were also run on the round-8 tree: those BEFORE results are in the files named test-*-BEFORE-RESULT.* .

## What cannot be tested from the cloud
The PC, Windows PowerShell 5.1, a real clipboard, real time, vtes:// registration and the outside sites. The exact PC check for each is in KNOWN-LIMITS.md.

Did the last full run print N of N for every row of FIX-ROUND-9.md, Section D? (yes/no)

TRK-2026-9910-B · TEST-REPORT · v5 · 2026-10-07 · CURRENT · #VTES-control-panel #panel-v5
