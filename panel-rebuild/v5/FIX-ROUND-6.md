# FIX-ROUND-6 - what changed after the third independent check CHECK-7 (TRK-2026-9910-B, 2026-10-06)

**SUPERSEDED by FIX-ROUND-7.md (2026-10-06, after CHECK-8): the numbers in this file are the round-6 numbers.**

☁️ CODE · CLOUD / WEB EXECUTOR. SONNET 5.5 · PANEL V5 FIX ROUND 6. Model: claude-sonnet-5-5 (not Opus; the serving model may differ). Branch claude/panel-v5-port. Work only in panel-rebuild/v5/ (v3-live did not change), plus one new root file `.gitattributes`. No pull request, no Drive write, no PC, nothing sent, nothing installed.

## Section A - Answer first
1. **CHECK-7 found 13 flaws. My own count after this round: FIXED 12, PARTIAL 1, NOT FIXED 0. Counting the five CHECK-6 partials the same way: FIXED 16, PARTIAL 2, NOT FIXED 0.** The checker decides, not me. I do not claim zero flaws.
2. **"Green means good" broke a fourth time, so I did not patch it.** The cause was one design fault: every card, strip entry and panel decided its own colour with its own code, so they could disagree. Round 6 removes that (charter Rule 4, Tier 2): one function now turns a state into a colour, and nothing else picks a colour. It also enforces it (Tier 3): after every paint, one pass reads the page itself and raises every badge and strip entry to the worst card or mark that uses the same file. A new line, WHOLE PAGE, is the worst of everything. A test proves it from the page's own DOM on 28 named worlds and 150 seeded random worlds.
3. **Personal data: two flaws, two removals.** The instruction to save client data into a folder inside Google Drive is gone; the LOCAL card now says BLOCKED - UNVERIFIED until the desktop executor confirms a folder outside every syncing folder. The Social Security guard is now a fail-closed check on the digits: the checker's 14 notes through all 369 routes give 5166 of 5166 right (before: 1481 of 5166, the checker's 335-of-369 leak reproduced exactly).
4. **Totals: Total 6828 of 6828 pass** across 15 test files, and 26 of 26 deliberate breaks were caught. Every number is in a result file in this folder. Details in Section D.
5. **What I could not prove, and who must check it on the PC:** KNOWN-LIMITS.md Section I is the plain list, with the exact PC check for each of the 12 items. The three that matter most: does the Google Drive folder itself count as a link on the PC (VERIFY would then refuse the install), Windows junctions (only Linux links were tested), and whether the CU-Local-Executor bot still watches a Google Drive folder.
6. **Nothing is handed to Jorge.** Every open step is for the desktop executor (RAMBO). The one yes or no is at the end.

## Section B - The 13 flaws of CHECK-7, each with its verdict (table-free)
1. **Flaw 1 - green heartbeat strip above red window cards. FIXED.**
   File: package/vtes5-ui.js (`enforce`, `paintAll`), package/vtes5-live.js (`clsOfState`, heartbeat verdict now judges the file only).
   Test: test-invariant-r6.js worlds hbAllUnknown, hbOnlyLLM01, hbChatNoProof, grokProof20d (the checker's four) plus every other world; mutation M12.
   Tier: Tier 2 (one colour function; the second opinion in `verdict('heartbeat')` was removed) and Tier 3 (`enforce` after every paint). A window missing from the heartbeat file is NO DATA, red, and drags the strip red.
2. **Flaw 2 - the LOCAL lane stores client personal data in the cloud. FIXED on the page; the lane itself is UNVERIFIED on the PC.**
   File: package/vtes5-ui.js (`localFolder`, `localSteps`), build-v5.js (v3's "Never leaves the PC" text and its Drive address are replaced), DESKTOP-WORK.md item 11 (local-only folder), DATA-CONTRACT.md file 1 (heartbeat) (`local_only_folder`).
   Test: test-fixes-r6.js (flaw 2 group, 7 checks), test-invariant-r6.js worlds localFolderMissing and localFolderCloud, mutation M24.
   Tier: Tier 2 (the instruction to save into `G:\My Drive\VTES-Inbox-LOCAL` is removed, not reworded). The card is red BLOCKED - UNVERIFIED until RAMBO writes `local_only_folder` (and refuses a name that looks like Google Drive or OneDrive). **What is not fixed:** v3 says the bot CU-Local-Executor watches that Drive folder; until RAMBO re-points it (DESKTOP-WORK item 11 (local-only folder)), the existing lane uploads what it is given. That is KNOWN-LIMITS item 35 (LOCAL lane).
3. **Flaw 3 - the personal-data guard is easy to miss. FIXED, with false alarms that are disclosed.**
   File: package/vtes5-ui.js (`piiReasons`, `guardNote`).
   Test: test-privacy-matrix-r6.js (14 notes x 369 routes = 5166 route checks, 5166 right; before 1481 of 5166); test-pii-unit-r6.js (113 of 113); mutations M25, M26.
   Tier: Tier 3 (fail closed on the digits). Blocked: any run of 9 digits written any way, a card-like run, an SSN word beside 9 digits, nine spelled digit words, a date of birth beside a long number. Carried on purpose: phone numbers, folio numbers shaped 2-4-3-4, ZIP+4 after a state code, a year-first permit number. **The price:** another 9-digit number (an invoice number, `Order 12345 6789`) is left out too, and the page says why. **Not caught at all:** names, addresses, driver licence numbers (KNOWN-LIMITS item 34 (personal-data guard)).
4. **Flaw 4 - hung tasks that never turn red. FIXED.**
   File: package/vtes5-live.js (`bot`: one limit for Running, Queued and Running with no start time).
   Test: test-invariant-r6.js worlds queued3d, queuedNoTime, hungRunningNoStart, running72h, running30min; test-fixes-r5.js N2 cases (updated); mutations M13, M17, M20.
   Tier: Tier 3 (the limit is the larger of 3 x the task's interval and 1 hour). A task with no time at all is counted from when the page first saw it (memory only; KNOWN-LIMITS item 43 (first sight)).
5. **Flaw 5 - VERIFY prints OK when the folder is a link. PARTIAL.**
   File: VERIFY-v5.ps1 (step 5a, LINK IN PATH: the folder and every folder above it are checked for the reparse-point attribute).
   Test: test-verify.sh V40 to V43 (the folder itself, a parent, a link into a git checkout's package, a link into the Desktop), PowerShell 7.4.6 for Linux, symbolic links; whole fixture identical before and after.
   Tier: Tier 3 (checked on every run, read-only). **PARTIAL because Windows junctions were not run:** only Linux symbolic links were tested, and VERIFY may flag a legitimate parent such as `G:\My Drive` itself. KNOWN-LIMITS item 46 (link checks), KNOWN-LIMITS Section I item 4 (link) and KNOWN-LIMITS Section I item 5 (junctions) give the exact PC check.
6. **Flaw 6 - Miami-Dade "proof checked" turns green for a check months old. FIXED.**
   File: package/vtes5-ui.js (`mdProof`), DATA-CONTRACT.md file 7 (miamidade) (new field `checked_at`).
   Test: test-invariant-r6.js worlds mdProofNoDate, mdProofOld, mdProofFresh; test-v5-worlds.js W2 and W7 (updated); mutation M22.
   Tier: Tier 3 (one date rule). Green only with `proof_ok` true and `checked_at` inside 7 days; no date is grey; older is red PROOF OLD; future is red BAD CLOCK. No writer writes `checked_at` yet (KNOWN-LIMITS item 44 (Miami-Dade check dates)).
7. **Flaw 7 - token panel green while its reset time is in the past. FIXED.**
   File: package/vtes5-live.js (`dateJudge`, type "due"; tokens verdict), package/vtes5-ui.js (`dateVal`, `tokens`).
   Test: test-invariant-r6.js world tokensResetPast; mutation M19.
   Tier: Tier 2 (one generic freshness rule used by every date shown as a value). A reset time already gone by is red PAST, the badge and strip go red, and the panel says the numbers belong to a finished window.
8. **Flaw 8 - old state numbers shown as plain values. FIXED.**
   File: package/vtes5-ui.js (`valR` with the `fresh` argument; `health`, `housekeeping`, `repairsLive`).
   Test: test-invariant-r6.js worlds stateStale, healthStale; mutation M23.
   Tier: Tier 2 (a number from a file that is not fresh can no longer be printed plain: it is a red mark `OLD n` plus the sentence "These numbers are old. Do not trust them.").
9. **Flaw 9 - a disabled-task code worded as a failure. FIXED.**
   File: package/vtes5-live.js (`RES_DISABLED`).
   Test: test-invariant-r6.js world code267010Ready; test-fixes-r4.js F2 (the sample failure code is now 2147942402); mutation M21.
   Tier: Tier 1 on purpose, and not recurring: it is a wording fix of one code, not a class. Result code 267010 reads "DISABLED - the scheduler says this task is turned off".
10. **Flaw 10 - "JOB-something.md" saved as "JOB-something.md.txt". FIXED (text); the PC behaviour is UNVERIFIED.**
   File: package/vtes5-ui.js (RAMBO card, LOCAL steps), INSTALL-BY-HAND.md step 5 (file name extensions) and step 7 (read the names back), DESKTOP-WORK.md item 12 (JOB files).
   Test: test-fixes-r6.js flaw 10 group (3 checks).
   Tier: Tier 2 (the "New Text Document" route is removed for RAMBO: it creates the file with its exact name and reads the name back; the by-hand route says turn on File name extensions first). KNOWN-LIMITS Section I item 6 (file name extensions) is the PC check.
11. **Flaw 11 - VERIFY can never say OK again once a PC writer runs. FIXED.**
   File: VERIFY-v5.ps1 (`$expectedEdit`, exactly eight files), DATA-CONTRACT.md "Files that change by design", INSTALL-BY-HAND.md step 10 (report the answer), DESKTOP-WORK.md item 2 (install).
   Test: test-verify.sh V04, V36, V37, V39, V45; test-fixes-r6.js flaw 11 group (the list in VERIFY, the contract and the manifest is the same eight files).
   Tier: Tier 2 (the cause was one rule that treated a changed data file like a changed script). A data or settings file rewritten by a writer prints "EDITED (data file) - expected" and the answer is OK, exit 0; any other changed file is PROBLEMS.
12. **Flaw 12 - the install steps do not say where the package and VERIFY come from. FIXED; the Windows steps are UNVERIFIED.**
   File: INSTALL-BY-HAND.md step 6 (exact bytes) (git fetch, then `git show origin/claude/panel-v5-port:<path>`, never switch the checkout, never pull; VERIFY-v5.ps1 saved beside the folder; its SHA-256 pinned), `.gitattributes` (`panel-rebuild/v5/** -text`), VERIFY-v5.ps1 (LINE ENDINGS CHANGED (CRLF) as its own sentence), build-v5.js (v3's two CRLF line ends are normalised so the check is exact).
   Test: test-fixes-r6.js flaw 12 group (git show bytes equal the manifest for all 11 files; a clone with core.autocrlf=true keeps LF with the attribute and gets CRLF without it); test-verify.sh V38 and V39.
   Tier: Tier 2 (the CRLF cause removed at the source by `.gitattributes`) plus Tier 3 (VERIFY names it if it happens anyway). **Not run:** saving the bytes from Windows PowerShell 5.1 (KNOWN-LIMITS item 48 (git show)).
13. **Flaw 13 - a wrong cross-reference. FIXED.**
   File: KNOWN-LIMITS.md item 3 (Desktop shortcut) (now "DESKTOP-WORK item 10 (Desktop shortcut)"), every other reference in the four documents and on the page.
   Test: check-xrefs-r6.js (50 of 50 checks; 42 references all resolve and match their tag); check-xrefs-r6-BEFORE-RESULT.txt shows it catches the original mistake.
   Tier: Tier 3 (every cross-reference must name the item AND carry a word of its title, so a wrong or moved number fails by machine).

## Section C - The five CHECK-6 partials CHECK-7 kept open
14. **N1 - green strip over bad content. FIXED.**
   File: package/vtes5-ui.js (`enforce`). Test: test-invariant-r6.js. Tier: Tier 2 and Tier 3 (flaw 1). The bots half was fixed in round 5; the heartbeat half is flaw 1.
15. **N2 - a hung task shown blue forever. FIXED.**
   File: package/vtes5-live.js (`bot`). Test: test-invariant-r6.js and test-fixes-r5.js N2. Tier: Tier 3 (flaw 4).
16. **N3 - stale or impossible content green or plain. FIXED.**
   File: package/vtes5-live.js (`dateJudge`), package/vtes5-ui.js (`valR`, `dateVal`, `mdProof`). Test: test-invariant-r6.js worlds tokensResetPast, mdProofOld, stateStale. Tier: Tier 2 (flaws 6, 7, 8).
17. **N10 - LOCAL routes personal data through Claude. PARTIAL.**
   File: package/vtes5-ui.js. Test: test-privacy-matrix-r6.js, test-fixes-r6.js. Tier: Tier 2 and Tier 3 (flaws 2 and 3). PARTIAL because the guard is digits only (names and addresses pass) and the LOCAL lane has no confirmed safe folder yet: both are named in KNOWN-LIMITS item 34 (personal-data guard) and KNOWN-LIMITS item 35 (LOCAL lane).
18. **F14 - technical commands handed to Jorge. FIXED.**
   File: package/vtes5-ui.js (`.v5forrambo` lines), build-v5.js. Test: test-fixes-r6.js F14 group (no card holds a .ps1 name, `codex exec`, `Get-ScheduledTask`, `-Install`, `powershell` or `git` outside a line that starts "For RAMBO"); test-fixes-r5.js F14 (updated). Tier: Tier 2 (the commands stay only on lines marked For RAMBO, in small italics).

**Tally: FIXED 16, PARTIAL 2, NOT FIXED 0.** (The 13 flaws alone: FIXED 12, PARTIAL 1, NOT FIXED 0.)

## Section D - Every count, with its denominator
1. 98 of 98 click checks (test-v5-click-RESULT.json): every control on the page is pressed.
2. 129 of 129 data-world checks (test-v5-worlds-RESULT.json).
3. 166 of 166 nothing-of-v3-was-lost checks (test-v3-survives-RESULT.json).
4. 16 of 16 before-and-after checks on the real v3 (test-v3-before-RESULT.json).
5. 144 of 144 packet pairs identical to v3 apart from the stamp (test-v3-packets-RESULT.json).
6. 75 of 75 round-4 page fixes (test-fixes-r4-AFTER-RESULT.json).
7. 192 of 192 round-5 page fixes (test-fixes-r5-AFTER-RESULT.json).
8. 27 of 27 round-6 page and document checks (test-fixes-r6-RESULT.json): the For-RAMBO rule, the LOCAL card in three states, hidden extensions, the eight files, and the git bytes.
9. 249 of 249 invariant checks (test-invariant-r6-RESULT.json): 28 named worlds and 150 random worlds; random outcomes green 48, grey 0, red 102.
10. 5166 of 5166 privacy routes: 14 notes x 369 routes (test-privacy-matrix-r6-RESULT.json); before the fix 1481 of 5166 pass (test-privacy-matrix-r6-BEFORE-RESULT.json).
11. 113 of 113 digit-guard spellings and keep-carrying notes (test-pii-unit-r6-RESULT.json).
12. 92 of 92 v3 items present and working (test-survival-92-r6-RESULT.json): the 92 items of CHECK-7 Section G, rebuilt from the real v3 file at run time, pressed on v3 and v5 side by side.
13. 274 of 274 VERIFY scenarios under PowerShell 7.4.6 for Linux (test-verify-RESULT.txt), the fixture identical before and after every one.
14. 37 of 37 no-write-command checks (test-no-write-commands-RESULT.txt): VERIFY, the page, the data files and the four documents hold no copy, move, delete or write command.
15. 50 of 50 cross-reference checks (check-xrefs-r6-RESULT.txt).
16. **Total 6828 of 6828.** Deliberate breaks caught: 26 of 26 - mutation-RESULT.txt (M1 to M26; M12, M13, M15, M17 and M18 were re-pointed at the round-6 code, M19 to M26 are new).
17. Documents agree with the result files (check-docs-agree-RESULT.txt; it also checks that INSTALL-BY-HAND.md carries the real SHA-256 of the manifest and of VERIFY-v5.ps1). The page is 31,591 bytes; MANIFEST.sha256 lists 11 files and every hash matches.

## Section E - What I changed in the older tests, and why (so nobody thinks a test was weakened to pass)
1. **test-v5-lib.js** (the good fixture): now holds a confirmed local-only folder and all 22 Miami-Dade sources with a check date, so "everything good is green" still tests something. The old two-source fixture would now be red, correctly.
2. **test-v5-worlds.js** W2, W7, W15: the strip count is read from the seven file entries only (WHOLE PAGE is a new eighth element); Miami-Dade now expects 22 checked sources.
3. **test-fixes-r4.js** F2: the sample "other failure" code was 267010; it is now 2147942402 because 267010 is DISABLED. F6: counts the state lines with a data-state attribute (the LOCAL card has a second line, the save step). F10: the word `inbox` no longer finds the LOCAL card, because that card no longer names the Drive folder. F14: the LOCAL steps test matches the new text.
4. **test-fixes-r5.js** N1: one window down is now red, not grey (a red card must make the entry red). N2: 7 minutes of a 2-minute task is no longer stuck (the limit is the larger of 3 x interval and 1 hour); a 70-minute case was added. N10: `Order 12345 6789` is no longer a carried control (it is a nine-digit run: a documented false alarm); `Order 12345` is. F14: accepts the "For RAMBO only" wording.
5. **test-v3-survives.js**: three intentional text edits added to the list (the LOCAL description, the LOCAL address, one picker line), each one the removal of a claim or instruction that put client data in Google Drive.
6. **test-no-write-commands.js**: the install document must now say `git show`, never switching the checkout, and where VERIFY is; the old "drag and drop" check was replaced. A variable named `cp` in the page tripped the scan once and was renamed.

## Section F - What is still open (so nothing hides)
1. Flaw 5 is PARTIAL and N10 is PARTIAL (above).
2. Everything in KNOWN-LIMITS.md Section I is UNVERIFIED on the PC.
3. The tests ran on Linux (headless Chromium, PowerShell 7.4.6 for Linux). Windows PowerShell 5.1, Edge, Chrome, the real clipboard and real elapsed time were not run.
4. Writers: no PC writer yet produces `local_only_folder` or the per-source `checked_at`; until they do, the LOCAL card and the Miami-Dade entry stay red or grey. That is the truth, not a defect.
5. The guard cannot see names, addresses or licence numbers.

## Section G - Charter items
1. Recurrence: this is the fourth time "green means good" was broken. RECURRING-ISSUES.md has a dated line for it (2026-10-06), and the fix is Tier 2 plus Tier 3, not a patch.
2. OPEN-ITEMS.md has a line for round 6.
3. No escalation to Jorge was needed, so there is no WORKAROUND-CERT. The next owner step is one yes or no.

Shall I have the desktop executor start the install (INSTALL-BY-HAND.md) now that the independent checker can re-check this round? (yes/no)

TRK-2026-9910-B · FIX-ROUND-6 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
