# FIX ROUND 7 - panel v5 (TRK-2026-9910-B). Answer to CHECK-8 (25 flaws).

☁️ **CODE · CLOUD / WEB EXECUTOR · builder.** Configured model: Sonnet 5.5 (the serving model may differ). Branch `claude/panel-v5-port`. No pull request, no Drive write, nothing outbound, nothing installed.

## Section A - Answer first

**This round fixed the four CLASSES behind the last seven checks, not the 25 instances.** Charter Rule 4 says a recurring class gets no patches. The counts per independent check were 21, 14, 16, 18, 20, 13 and 25, and they were not coming down, because each round patched the instance each checker found and the next checker found a new route to the same class.

**It is not finished, and I do not claim zero flaws.** Honest count for the 25: FIXED 23, PARTIAL 2, NOT FIXED 0, DOCUMENTED LIMIT 0. A fifth independent check will find something; the point of this round is that what it finds should be in a smaller space.

**What changed in plain words:**
1. The page can no longer stop painting and keep showing stale green. Every data file is cleaned once, in one place. Each panel is drawn on its own. A watchdog turns the whole page red if a redraw fails or is more than 3 minutes old.
2. Every note that is not for LOCAL now needs a tick: "This note has NO client personal data". Until it is ticked the copy and show buttons are switched off. The digit guard is now the second layer, not the only one.
3. VERIFY now treats the seven data files and the settings file as data, and checks them strictly. A fresh install must be exact. The phrase "expected edit" is gone.
4. The words on the page are cross-checked against the facts by a script, and the jargon is out of Jorge's lines.

## Section B - The tier of each class fix (charter Rule 4)

- **Class 1, the page can stop painting (CHECK-8 flaw 1, and the family the order lists with it).** Tier 2 (remove the cause): one sanitiser, so no code reads a raw data file; the paint is wrapped per panel so it cannot stop. Tier 3 (enforce): the watchdog, and the type-fuzz test.
- **Class 2, personal data (flaws 2, 3, 15).** Tier 2: the confirmation tick, so the guard no longer has to be complete. The digit guard stays as a second layer. It is a pattern guard and can never be complete; the page now says so.
- **Class 3, the install check says OK for a bad install (flaws 4, 9, 16 to 19).** Tier 2: VERIFY checks data files as data and the fresh install is exact. Tier 3: 148 scenarios, each with the whole fixture hashed before and after.
- **Class 4, words that disagree with the facts (CHECK-8 flaws 5 to 8, 10 to 14 and 20 to 25).** Tier 3 (enforce): two scripts compare the page text and the documents with the facts on every run.

## Section C - The 25 CHECK-8 flaws, one entry each

1. **Flaw 1 - A one-entry list freezes the page with stale green. FIXED.**
   - File: package/vtes5-live.js (the sanitiser, `sanitizeAll`), package/vtes5-ui.js (`paintAll`, `paintPanels`, `watchdog`), build-v5.js (the separate start-up script that sets the timers first and draws the RAMBO button, Read me first and Live status before any data is read).
   - Test: test-frozen-r7.js (the checker's scenarios, before and after), test-fuzz-r7.js (every field of every file x 15 bad values, 91 hand worlds, 300 seeded random worlds), test-watchdog-r7.js.
   - Tier: Tier 2 (the paint cannot stop) and Tier 3 (watchdog and fuzz).
2. **Flaw 2 - The guard carries 14 spellings of a Social Security or card number. FIXED.**
   - File: package/vtes5-ui.js (`looseReasons`, `encodedReasons`, `normNote`), and the tick (`allow`, `applyGate`).
   - Test: test-pii-unit-r7.js (all 14 carried spellings and the 53 blocked ones, now 168 personal notes), test-privacy-matrix-r7.js (95 personal, 40 ordinary and 8 cannot-catch notes x 369 routes, with the tick unticked and wrongly ticked).
   - Tier: Tier 2 (the tick) with the guard as the second layer.
3. **Flaw 3 - Other personal data passes, and the page did not say so. PARTIAL.**
   - File: package/vtes5-ui.js (`otherReasons`: licence, passport, bank and IBAN shapes, birth phrases; the Read me and the grey line under the note box, via build-v5.js `gate-line`).
   - Test: test-pii-unit-r7.js, test-privacy-matrix-r7.js. PARTIAL because names, home addresses, email addresses and phone numbers still cannot be caught by any digit guard: they are stopped only by the tick and the person. The page now says exactly that on the Read me and under the note box (KNOWN-LIMITS item 53).
   - Tier: Tier 2 (the tick) and honest wording.
4. **Flaw 4 - VERIFY said OK for a botched install of 8 of 11 files. FIXED.**
   - File: VERIFY-v5.ps1 (strict data check, exact fresh install, `-AfterWriters`).
   - Test: test-verify.sh scenarios S20 (UTF-16), S61 (0 bytes), S64 (200 MB), S74 (injected script) and 140 more; verify-r7-BEFORE-RESULT.txt shows the same scenarios against the old script.
   - Tier: Tier 2 (data files are checked as data) and Tier 3 (148 scenarios, whole fixture hashed before and after).
5. **Flaw 5 - A stale Miami-Dade count was printed as a plain number. FIXED.**
   - File: package/vtes5-ui.js (`miami`).
   - Test: test-words-r7.js (9, stale count is an OLD red mark).
   - Tier: Tier 3 (enforced by the same pass that raises every badge to its worst mark).
6. **Flaw 6 - The LOCAL card said BLOCKED and CONFIRMED at the same time. FIXED.**
   - File: build-v5.js (`how-local`, `local-a`), package/vtes5-ui.js (`localSteps`).
   - Test: test-words-r7.js (2, no BLOCKED outside the live line when the folder is CONFIRMED).
   - Tier: Tier 3 (a script compares the typed lines with the live line).
7. **Flaw 7 - The Read me said every v3 button was still there, and one was not. FIXED.**
   - File: package/vtes5-ui.js (`READ`).
   - Test: check-xrefs-r7.js (the phrase is banned, the removed link is named, and the LLM-06 card really has no address).
   - Tier: Tier 3 (checked on every run).
8. **Flaw 8 - The documents counted 11 files and listed 12. FIXED.**
   - File: INSTALL-BY-HAND.md, DESKTOP-WORK.md.
   - Test: check-xrefs-r7.js (the package folder, the manifest, step 6b and DESKTOP-WORK agree: 12 files, the 11 in the manifest plus the manifest).
   - Tier: Tier 3 (checked on every run).
9. **Flaw 9 - VERIFY said OK when MANIFEST.sha256 is a link. FIXED.**
   - File: VERIFY-v5.ps1 (the manifest's type is checked before it is followed).
   - Test: test-verify.sh S65 (and a dangling link).
   - Tier: Tier 2 (the check order is changed) and Tier 3.
10. **Flaw 10 - A document quote did not match the page. FIXED.**
   - File: PORT-REPORT.md (edit 22 now quotes the page word for word).
   - Test: check-xrefs-r7.js (the quote is checked against package/vtes5-ui.js).
   - Tier: Tier 3 (checked on every run).
11. **Flaw 11 - The local-folder name check was easy to pass. FIXED.**
   - File: package/vtes5-ui.js (`pathOk`, `CLOUD_RE`, `localFolder`), package/vtes5-live.js (new field `not_synced_proof`), DATA-CONTRACT.md.
   - Test: test-words-r7.js (8, 13 labels plus 3 proof cases: G:, shared drives, Desktop, Documents, OneDrive, Dropbox, My Drive are refused; a plain C:\ path is accepted).
   - Tier: Tier 2 (an allow rule, not a deny list).
12. **Flaw 12 - A data file could change the page's clock. FIXED.**
   - File: package/vtes5-live.js (the `VTES5_NOW` hook is removed).
   - Test: test-words-r7.js (6).
   - Tier: Tier 2 (the hook is removed).
13. **Flaw 13 - Words that are not for Jorge outside the For RAMBO lines. FIXED.**
   - File: package/vtes5-ui.js, package/vtes5-live.js, build-v5.js; the typed repairs log is the one exemption (Jorge's own history, labelled TYPED LOG).
   - Test: test-words-r7.js (1, on 5 worlds and 628 to 646 text pieces each), check-xrefs-r7.js.
   - Tier: Tier 3 (checked on every run).
14. **Flaw 14 - A grey strip entry said NOT FINE. FIXED.**
   - File: package/vtes5-ui.js (`enforce`).
   - Test: test-words-r7.js (7).
   - Tier: Tier 3.
15. **Flaw 15 - The guard blocked some ordinary notes. FIXED.**
   - File: package/vtes5-ui.js (`maskPhones`, `coreReasons`: ZIP+4 after a city, ZIP then phone).
   - Test: test-pii-unit-r7.js ('Miami 33186-1234' and 'Miami FL 33186 305-555-1234' are carried; my 40 ordinary notes are carried; the 5 disclosed false alarms are still blocked on purpose).
   - Tier: Tier 3 (tested on every run). The 40 ordinary notes are mine: I did not have the checker's 40 (KNOWN-LIMITS item 54).
16. **Flaw 16 - VERIFY could hang on a named pipe (Linux and macOS). FIXED.**
   - File: VERIFY-v5.ps1 (the type is read from the directory entry and the item is never opened).
   - Test: test-verify.sh S56 and S57, each under `timeout 60`. Windows PowerShell 5.1 UNVERIFIED (KNOWN-LIMITS item 55).
   - Tier: Tier 2 and Tier 3.
17. **Flaw 17 - VERIFY ignored upper and lower case. FIXED.**
   - File: VERIFY-v5.ps1 (CASE DUPLICATE, ordinal compare).
   - Test: test-verify.sh S66.
   - Tier: Tier 3.
18. **Flaw 18 - VERIFY used MISSING for files it could not reach. FIXED.**
   - File: VERIFY-v5.ps1 (UNREACHABLE).
   - Test: test-verify.sh S76 (read-override rights dropped).
   - Tier: Tier 3.
19. **Flaw 19 - VERIFY was slow on a huge file. FIXED.**
   - File: VERIFY-v5.ps1 (size cap checked from the file length before any read; the CRLF check is one bulk read).
   - Test: test-verify.sh S63 and S64 (a 200 MB file is refused as TOO BIG without being read or hashed, and each scenario must finish in under 58 seconds).
   - Tier: Tier 2.
20. **Flaw 20 - One search word found fewer cards. FIXED.**
   - File: package/vtes5-ui.js (`SEARCHX`).
   - Test: test-words-r7.js (4: hourly, 2 minutes, 15 minutes, 5 minutes).
   - Tier: Tier 3.
21. **Flaw 21 - Two hand-off lines pointed to the wrong place. FIXED.**
   - File: build-v5.js (the LLM-05 and LLM-06 lines now name the card and section 2).
   - Test: test-words-r7.js (5).
   - Tier: Tier 3.
22. **Flaw 22 - The tab bar was tall on some screens. FIXED.**
   - File: vtes5.css (the bar scrolls under 1700 px wide: 87 px at 1536 x 730, was 268).
   - Test: test-words-r7.js (10); test-fixes-r5.js (all 18 tabs still reachable).
   - Tier: Tier 3.
23. **Flaw 23 - Most internet links did not say where they go. FIXED.**
   - File: package/vtes5-ui.js (`hostOf`, the proof-file and index link text).
   - Test: test-words-r7.js (3: every external link names its destination).
   - Tier: Tier 3.
24. **Flaw 24 - The PANEL / INDEX corner box covered the footer on phones. FIXED.**
   - File: vtes5.css (`body{padding-bottom:96px}`).
   - Test: test-words-r7.js (10, at 390 px).
   - Tier: Tier 3.
25. **Flaw 25 - Sizes were fixed in pixels, so the browser's text size had no effect. PARTIAL.**
   - File: build-v5.js (every pixel font size in the style blocks becomes rem).
   - Test: test-words-r7.js (10: root size at 200%, and a 650 x 450 viewport for 200% zoom; the RAMBO button stays on the first screen). PARTIAL because the real browser text-size setting is UNVERIFIED on the PC (KNOWN-LIMITS item 60, Section I).
   - Tier: Tier 2 (the fixed sizes are replaced).

**Tally: FIXED 23, PARTIAL 2, NOT FIXED 0, DOCUMENTED LIMIT 0.**

## Section D - Results, N of N

Every test file below was run on the FINAL build (page size 34,479 bytes).

- Frozen-page scenarios (CHECK-8 flaw 1, re-created): 24 of 24 pass (before, on the round-6 package: 6 of 24). `test-frozen-r7.js`.
- Type-fuzz, hand worlds and seeded random worlds: 2536 of 2536 pass (type-fuzz 2145 of 2145, hand worlds 91 of 91, random worlds 300 of 300). Before, on the round-6 package: 2341 of 2536 (type-fuzz 1991 of 2145, hand 91 of 91, random 259 of 300). `test-fuzz-r7.js`.
- Watchdog and per-panel paint: 13 of 13 pass. `test-watchdog-r7.js`.
- Privacy matrix, 95 personal + 40 ordinary + 8 cannot-catch notes x 369 routes. NO-TICK mode: 51909 of 51909 route checks right (nothing leaves on a non-LOCAL route). WRONG-TICK mode (the tick is ticked by mistake): personal notes 34485 of 34485, ordinary notes 14520 of 14520; the cannot-catch notes (names, addresses, emails) were carried on 2680 of 2904 route checks, as disclosed. Tick behaviour and page errors: 100916 of 100916 summary checks pass. `test-privacy-matrix-r7.js`.
- Digit guard on its own: 252 of 252 pass. `test-pii-unit-r7.js`.
- Words and layout cross-check: 42 of 42 pass. `test-words-r7.js`.
- Documents against facts: 34 of 34 pass. `check-xrefs-r7.js`.
- VERIFY under PowerShell 7.4.6 for Linux: 1095 of 1095 checks pass, 148 of 148 scenarios as expected, whole fixture identical before and after in 148 of 148. `test-verify.sh`.
- No write command anywhere: 37 of 37. `test-no-write-commands.js`.
- Older suites, all re-run on the final build: click 99 of 99; worlds 129 of 129; v3 survives 166 of 166; v3 before 16 of 16; v3 packets 144 of 144 (144 of 144 pairs identical apart from the stamp); fixes round 4 75 of 75; fixes round 5 194 of 194; fixes round 6 27 of 27; survival of the 92 v3 items 92 of 92; invariant 249 of 249; privacy matrix round 6 5166 of 5166; digit guard round 6 113 of 113; cross-references round 6 53 of 53.

**Total 111472 of 111472.** The builder's 37 deliberate breaks: 37 of 37 were caught.

**BEFORE and AFTER (the checker's frozen-green scenarios).** The same 24 frozen-page scenarios (11 shapes, each opened green then made bad, and opened bad then fixed; see `test-frozen-r7.js`) on the round-6 package: 6 of 24 pass. On this package: 24 of 24 pass. The type-fuzz and hand and random worlds (2,536 cases at the time of the first run) on the round-6 package: 2341 of 2536 pass; on this package: 2536 of 2536 pass.

## Section E - Older tests that changed, and why

No test was weakened silently. Each change below is a consequence of a rule this round adds. The tests that now check the new rule are named beside it.

Each entry: the file, what changed, why, and which new test now covers the rule.

1. `test-fixes-r6.js`, the "flaw 11" block (five checks). It checked that VERIFY lists exactly eight "expected-change" files and that the documents quote the sentence `EDITED (data file) - expected` and say the answer is still OK. Round 7 removes that allowance on purpose (CHECK-8 flaw 4), so the block now checks that the eight names in VERIFY, DATA-CONTRACT.md and the manifest still agree, that the documents quote the NEW sentence (`changed by a PC writer (passes the strict shape check)`), that none says "- expected", and that INSTALL-BY-HAND.md calls the day-one OK line the only good answer. Covered by: test-verify.sh (148 scenarios).
2. `test-fixes-r6.js`, "flaw 2, confirmed folder (fixture)": it looked for the label `VTES-LOCAL-ONLY (fixture)`. The fixture label is now `C:\VTES-LOCAL-ONLY`, because a label that is not a plain C:\ path is refused unless RAMBO also writes who verified it and a not-synced proof (flaw 11). Covered by: test-words-r7.js (16 label cases).
3. `test-v5-lib.js`: the shared fixture's `local_only_folder.label` changed to `C:\VTES-LOCAL-ONLY` (same reason as 2). Nothing else in the helper changed.
4. `test-v5-click.js`: (a) the five queued items now tick the confirmation box before the packet is read (a queued item fills the note box; the packet shows only after the tick); (b) the "note box" check ticks the box; (c) the new tick box is a new item on the page and is clicked and checked. Covered by: test-privacy-matrix-r7.js.
5. `test-v5-worlds.js`, W2: the sentence "the address book entry for LLM-0N is empty" became "the shortcuts are set up, but this window's entry is still empty" (plain words, no jargon, flaw 13). The check still counts the six cards.
6. `test-v3-survives.js`: the list of intentional v3 edits changed in four strings: the LOCAL address line, the LLM-05 and LLM-06 pointers (they now name their card and section, flaw 21), and the GEMINI.md words (jargon, flaw 13). v3's text is still checked word for word apart from this list.
7. `test-v3-packets.js`: the 144 From-and-To packets are built after the confirmation tick is set (v3 has no such box). Result: 144 of 144 identical apart from the stamp, as before.
8. `test-fixes-r4.js`: (a) "result 1 is still red FAILED with its code" accepts "error number 1" instead of "result code 1" (the words "result code" are jargon, flaw 13); (b) the two checks that look up a strip entry by its label look for the new plain labels (`Miami-Dade`, `token use`).
9. `test-fixes-r5.js`: (a) the N10 personal-data tests tick the box first (a person who ticks by mistake), so they still test the digit guard; the no-tick case is tested by test-privacy-matrix-r7.js; (b) strip entries are looked up by their plain labels; (c) the LOCAL steps check skips lines that start "For RAMBO:" (notes for the desktop executor, shown small and marked, not instructions to the person); (d) a comment records that the tab bar now scrolls under 1700 px, so 1536 and 1600 px wide take the "bar scrolls, hint shown" branch of the same test. No expectation about tabs was loosened: all 18 tabs are still reachable and the RAMBO button is still on the first screen.
10. `test-survival-92-r6.js`: (a) the hand-off form's setup ticks the box on the v5 page; (b) item 73, "the personal-data warning line", no longer demands the grey line be word for word v3's: it now demands that both pages keep "Client personal data goes to LOCAL only" and that v5 also says what the guard cannot catch (flaw 3). 92 of 92 v3 items are still present and working.
11. `test-privacy-matrix-r6.js`: every route ticks the box and sets To to the route's destination first (a person who ticks by mistake). 14 notes x 369 routes still pass. The no-tick case is test-privacy-matrix-r7.js.
12. `test-verify.sh`: rewritten by the helper that rebuilt VERIFY. The old scenarios V04, V36, V37, V39 changed (an edited data file is now PROBLEMS unless `-AfterWriters` and a valid shape), V14 was strengthened, and others only lost wording. The full list with reasons is `verify-r7-OLD-TEST-CHANGES.txt`.
13. `check-docs-agree.js`: rewritten for the round-7 result files and FIX-ROUND-7.md (25 flaws). The old file checked FIX-ROUND-6.md numbers that are history now. The new one checks more, not less (every result file, the 37 breaks, the 25 verdicts with a file, a test and a tier each, the page size, the pinned hashes).
14. `run-mutations.sh`: 26 deliberate breaks became 37 (M27 to M37 are new). The first 26 were not changed.
15. `test-fuzz-r7.js` (new this round, corrected before the final run): data files that are broken ON PURPOSE (they throw, have a syntax error, have no wrapper, or are a folder) raise their own load error, which the page cannot prevent; that single error is not counted, any other uncaught error is. The BEFORE run on the round-6 package was repeated with the same corrected test.


## Section F - What I could not do, or did not do

1. **Windows PowerShell 5.1 and the real PC browser: not run.** VERIFY was tested under PowerShell 7.4.6 for Linux only; the page under headless Chromium on Linux only. The exact one-line check for each PC item is in KNOWN-LIMITS.md, Section I (items 1 to 15), written for the desktop executor, never for Jorge.
2. **A pattern guard cannot be complete.** The tick is the first layer. Names, home addresses, email addresses, phone numbers and any identifier written in words are not caught by the guard, and the page says so. A person who ticks by mistake can still send such a note.
3. **The tick has design choices a checker may dislike:** LOCAL and an empty note need no tick; a big copy button or the top RAMBO button works only when To already equals its destination. They are listed in KNOWN-LIMITS item 52.
4. **My 40 ordinary notes are my own,** not the checker's. A note outside my kinds may be blocked by mistake (KNOWN-LIMITS item 54).
5. **The watchdog can show red for up to a minute after a computer wakes from sleep.** That is honest, not a fault (KNOWN-LIMITS item 51).
6. **The fuzz test cannot prove there is no other bad input.** It covers every documented field with 15 bad values, 91 hand worlds and 300 random worlds (KNOWN-LIMITS item 61).
7. **VERIFY tests used dropped read rights instead of the user nobody** (the user switch could not start in this cloud session). Same proof for an unreadable file, not for a different user.
8. **Sub-builder disclosure.** I delegated the VERIFY rewrite and its 148-scenario test to a helper session working in the same checkout, because it was independent of the page code. I read its report and re-ran `test-no-write-commands.js` and its own result file; I did not re-read every line of the script. The PowerShell it ran may have made a start-up telemetry call before the opt-out was read (unverifiable).
9. **Nothing was installed, sent, copied, moved or deleted.** No pull request. No Drive write. v3-live was not touched.


## Section G - For the cloud keeper (charter end of session)

Suggested dated line for `RECURRING-ISSUES.md`: "2026-10-06: panel v5 CHECK-8 fixed by classes, not instances (FIX-ROUND-7.md). Green-means-good recurred a fifth time by a new route (a one-entry list stopped the paint). Tier 2: one sanitiser and a per-panel paint, Tier 3: a watchdog and a type-fuzz test. Personal data: a mandatory tick on every non-LOCAL route. VERIFY: data files are checked as data."

Did that read clearly, and may I now hand this to the next checker? (yes/no)

TRK-2026-9910-B · FIX-ROUND-7 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5 #fix-round-7
