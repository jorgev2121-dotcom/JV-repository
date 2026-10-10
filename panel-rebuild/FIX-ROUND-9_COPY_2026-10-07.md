# FIX ROUND 9 - panel v5 (TRK-2026-9910-B). Answer to CHECK-10 (8 flaws that mislead, 0 that damage, 0 that leak, 44 edge cases).

☁️ **CODE · CLOUD / WEB EXECUTOR · builder.** Configured model: Sonnet 5.5 (the serving model may differ; not Opus). Branch `claude/panel-v5-port`. No pull request, no Drive write, no PC, nothing outbound, nothing installed. `panel-rebuild/v3-live/` was not touched. VERIFY-v5.ps1 is still read-only (no write command; test-no-write-commands.js).

## Section A - Answer first

**All 8 of CHECK-10's flaws are fixed, and I do not claim zero flaws.** A seventh check will find something. The stop rule holds: nothing I know of can mislead the page, damage a file or leak personal data. Every pure edge case that needs a PC check is a documented limit with its exact check (KNOWN-LIMITS.md).

**The pattern was one thing, for the third time: words that claim more than the code does.** Charter Rule 4 says no more sentence patches. So this round does not patch the 8 sentences first. It makes the surface of claims small, and then it enforces what is left.

1. **Tier 2 - the page Read me is cut to 10 sentences of at most 20 words.** It names no count, no rule of the checker and no number of lines. The line under the note box and the Read me carry the same three plain sentences: the tick box is the real protection; the checker is a second layer that catches many layouts and can miss some; it cannot catch names, addresses, email addresses or phone numbers. File: package/vtes5-ui.js (readItems, GUARD_TEXT), build-v5.js. Test: test-claims-r9.js (Read me checks).
2. **Tier 2 - the documents are split by purpose.** INSTALL-BY-HAND.md is only a numbered list of steps, each at most 40 words, with no history. KNOWN-LIMITS.md, DESKTOP-WORK.md, DATA-CONTRACT.md and PORT-REPORT.md start with the header HISTORY AND LIMITS - nothing here is an install step, and every stale sentence is deleted. Double quotes in these documents are reserved for page and VERIFY strings. File: those five documents. Test: test-quotematch-r9.js, check-xrefs-r9.js.
3. **Tier 3 - the keyword extraction is replaced by a plain one.** test-claims-r9.js reads every sentence of the page's visible text in 25 states (and of INSTALL-BY-HAND.md) that holds a digit or one of: never, always, only, cannot, can not, does not, do not, every, all, none, exactly, blocked, ready, one click, catches, misses. Each must map to a test that passes, or to an exempt reason, or be the unchanged text of the real v3. The test fails on any other sentence and on any entry that matches no sentence. The numbers are in Section D.
4. **Tier 2 - the list of v3 changes is generated, not counted.** gen-text-diff-r9.js opens the real v3 page and the v5 page in a browser, diffs the lines a person sees (including the card address lines, the Open labels and the run-time status lines) and writes the list, plus every build patch with its kind, into PORT-REPORT.md Section F. The page says only that every card, bot, queued item, picker row, repairs row and tab from v3 is still here and that the text changes are listed in PORT-REPORT.md, with no number. File: gen-text-diff-r9.js, patch-table-r9.js, build-v5.js. Test: test-claims-r9.js (the file must equal a fresh diff; every build patch must be in the list).

## Section B - The flaws of CHECK-10, one entry each (file, test, tier)

1. **Flaw 1 - a card number with its expiry or other digits got past the checker. FIXED.** File: package/vtes5-ui.js (cardReasons: date shapes mm/yy, mm/yyyy and mm-yy are taken out; every stretch of whole digit groups of 13 to 19 digits is tested with the Luhn check, wherever it sits; four groups of four digits in a run of at most 20 digits are blocked; a list of five-digit ZIP codes and an order number shaped 3-7-7 are no longer taken for cards). Test: test-fixes-r9.js (F1), test-pii-unit-r9.js, test-privacy-matrix-r9.js (every route, unticked and wrongly ticked). Tier 3 (the checker is the second, fail-closed layer; the tick is the first).
2. **Flaw 2 - common Spanish forms got through. FIXED.** File: package/vtes5-ui.js (HUNDW: doscientos to novecientos; tens joined with y; month names enero to diciembre; de in a date; Spanish day words). Test: test-fixes-r9.js (F2), test-pii-unit-r9.js. Tier 3. The Read me no longer says the checker knows English and Spanish; it says it can miss some.
3. **Flaw 3 - plain IDs beside their own label got through. FIXED, with false alarms that fail closed.** File: package/vtes5-ui.js (idLabelReasons: a DL, driver licence, passport, bank, account or routing label with, among the next three words, a word of 6 to 12 letters and digits holding a digit; a birth, DOB or born label with such a word or a date mm/dd/yyyy or mm-dd-yyyy; letter-and-digit groups written apart such as DL: B 4321 5678). Test: test-fixes-r9.js (F3), test-pii-unit-r9.js, test-privacy-matrix-r9.js. Tier 3. The ordinary notes of CHECK-10 that can be carried are carried (Bank of America appointment 10/12/2026, ZIPs 33186 33187 33189, The driver dropped 2 boxes at 14598 SW 110 ST, Amazon order 113-1234567-1234567). A 16-digit number written as one group, four groups of four digits and a number whose stretches happen to pass the Luhn check are still held back (fail closed); the page names this only as "some ordinary notes with long numbers may be held back" (KNOWN-LIMITS.md, Section E).
4. **Flaw 4 - the Read me count of changed lines was not a count of lines. FIXED.** The page prints no number. PORT-REPORT.md Section F is generated from the real pages (the changed lines, including the address lines, the Open labels and the run-time lines) and from the patch table (tabs-status, tabs-add, win-grok and queued-status included). File: gen-text-diff-r9.js, patch-table-r9.js. Test: test-claims-r9.js. Tier 2.
5. **Flaw 5 - a confirmed local folder handed the client-data save to RAMBO. FIXED.** The steps are written for the person (open the folder in File Explorer, turn on file name extensions, make the file, name it, paste, save). Every line that names RAMBO or a Claude window starts with Do NOT, and no sentence that talks about saving names RAMBO, Claude or the desktop executor. File: package/vtes5-ui.js (localSteps, localFolder). Test: test-fixes-r9.js (F5, three states), test-claims-r9.js (the LOCAL lines in seven states), test-fixes-r5.js. Tier 2.
6. **Flaw 6 - the Grok card said it stays red while it was green. FIXED.** The next-step sentence is computed from the card's colour: none when green; red only when red; not green otherwise. File: package/vtes5-ui.js (grokNext). Test: test-fixes-r9.js (F6, four states), test-claims-r9.js (five states). Tier 2.
7. **Flaw 7 - VERIFY's after-writers OK line miscounted. FIXED.** It counts page and script files, identical data and settings files, and changed data and settings files apart; each count comes from files compared by hash, and the three add up to the manifest. File: VERIFY-v5.ps1. Test: test-verify-r9.sh (eight real scenarios with 1 to 8 data files rewritten), test-fixes-r9.js (F7). Before: the same scenarios fail on the round-8 VERIFY (test-verify-r9-BEFORE-RESULT.txt). Tier 2.
8. **Flaw 8 - WHOLE PAGE could say grey with 0 grey items. FIXED.** The line now counts the grey reports as well (N red and N grey of N cards and marks; N of N reports red and N of N reports grey); a page made grey only by a report says so. The Read me and KNOWN-LIMITS say only that grey means not proven. File: package/vtes5-ui.js (enforce). Test: test-fixes-r9.js (F8), test-claims-r9.js (WHOLE PAGE in every state). Tier 2.
9. **e9 - the local-folder rule. FIXED.** Even with proof, a label that names a drive other than C:, has a non-ASCII letter or has a line break is refused (the pattern now has the multi-line flag). A label with no drive letter still needs proof. File: package/vtes5-ui.js (CLOUD_RE, badName). Test: test-fixes-r9.js (e9: twenty checks, with and without proof). Tier 2.
10. **edge 10 - an UNREADABLE file left green bot and window cards. FIXED.** A window check-in file or bots file with unreadable parts is not trusted: every window, bot and the LOCAL line that uses it is red. File: package/vtes5-live.js, package/vtes5-ui.js. Test: test-fixes-r9.js (e10), test-claims-r9.js (green-needs-proof). Tier 2.
11. **edge 8 - changing From kept the tick. FIXED.** The tick is bound to the note, To and From. File: package/vtes5-ui.js. Test: test-fixes-r9.js (e8), test-claims-r9.js (tick-claims). Tier 2.
12. **edge 31 - step lines longer than 25 words. FIXED.** Every step line (except lines marked For RAMBO) is at most 25 words. File: package/vtes5-ui.js. Test: test-fixes-r9.js (e31), test-claims-r9.js. Tier 3.
13. **items 38-41 (the browser prompt for vtes://, a text-size change hides headings until reload, large text off the first screen on small phones, sideways scroll at 32 px). DOCUMENTED LIMIT.** File: KNOWN-LIMITS.md, Section I (each with its exact PC check for RAMBO). Test: test-quotematch-r9.js and check-xrefs-r9.js read the file. Tier 3 (they cannot be fixed or tested from the cloud).

Everything else in CHECK-10 Section C stays a documented limit (KNOWN-LIMITS.md). The stale document sentences of its items 25 to 36 are deleted, not marked, and the quote-match test now catches the same kind of sentence.

**Tally: flaws 1 to 8 FIXED 8, PARTIAL 0, NOT FIXED 0; edge items done now: 4 FIXED (e9, edge 10, edge 8, edge 31); undisclosed items: 4 DOCUMENTED LIMIT.**

## Section C - What the numbers mean

- **The surface got smaller, as the pattern needed.** The Read me is 10 sentences (it was 34). INSTALL-BY-HAND.md is a numbered list; the other documents carry a header that says they hold no install step. The claims test counts what is left (Section D).
- **The enforcement can fail.** BEFORE results: the new tests run on the round-8 tree (git commit 0204fca) are red where CHECK-10 was right: the Read me has 34 sentences and a typed count, the LOCAL line hands the save to RAMBO, the Grok sentence says red beside a green card, WHOLE PAGE says grey with 0 grey items, 61 double-quoted texts in the documents are not on the page or in VERIFY, 33 personal notes were carried, the after-writers line miscounted. The files are named in Section D. Deliberate breaks M54 to M69 break each fix; the tests catch them (mutation-RESULT.txt).
- **What a plain extractor cannot do.** It cannot tell whether a test proves the right thing; a person (the checker) still has to read test-claims-r9.js and claims-registry-r9.js. The exempt list is one place, claims-registry-r9.js, with a reason for each entry; v3's unchanged text is counted separately and listed in test-claims-r9-RESULT.json.

- **PowerShell evidence.** The Linux release powershell-7.4.6-linux-x64.tar.gz was downloaded into its own empty folder; its SHA-256 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561 is the line for that file in the release's hashes.sha256. `$PSVersionTable.PSVersion` printed 7.4.6. In every VERIFY scenario the SHA-256 of every file of the whole fixture (the package copy, its parent, a fake Desktop holding the real v3 launcher, VERIFY itself) was taken before and after and was identical (the last lines of test-verify-r8-RESULT.txt and test-verify-r9-RESULT.txt).

## Section D - Numbers (all N of N, from the final build; every number is generated from the result files)

<!-- NUMBERS-BEGIN -->
Generated by numbers-r9.js from the result files. Every row is N of N.

1. test-v5-click.js - click everything: 99 of 99
2. test-v5-worlds.js - data worlds: 129 of 129
3. test-v3-survives.js - nothing of v3 is lost: 166 of 166
4. test-v3-before.js - before and after rows: 16 of 16
5. test-v3-packets.js - packet pairs identical to v3 apart from the stamp: 144 of 144
6. test-fixes-r4.js - round-4 page fixes: 75 of 75
7. test-fixes-r5.js - round-5 page fixes: 194 of 194
8. test-fixes-r6.js - round-6 page and document fixes: 27 of 27
9. test-survival-92-r6.js - survival items: 92 of 92
10. test-invariant-r6.js - colour rule in named and random worlds: 249 of 249
11. test-pii-unit-r6.js - digit checker, round 6: 113 of 113
12. test-frozen-r7.js - frozen-page scenarios: 24 of 24
13. test-watchdog-r7.js - watchdog: 13 of 13
14. test-pii-unit-r7.js - digit checker, round 7: 252 of 252
15. test-words-r7.js - words on the page: 44 of 44
16. test-pii-unit-r8.js - digit checker, round 8: 203 of 203
17. test-state-text-r8.js - sentences that say ready, Press or one click match the real button: 4,689 of 4,689
18. test-edge-r8.js - round-8 edge items: 56 of 56
19. test-pii-unit-r9.js - digit checker, round 9: 302 of 302
20. test-fixes-r9.js - one test per CHECK-10 flaw and edge item: 48 of 48
21. test-quotematch-r9.js - double-quoted texts in the documents found word for word: 27 of 27
22. test-claims-r9.js - independent claims extractor: 13 of 13
23. test-privacy-matrix-r6.js - privacy matrix, round 6: 5,166 of 5,166
24. test-privacy-matrix-r7.js - privacy matrix, round 7: 100,190 of 100,190
25. test-privacy-matrix-r8.js - privacy matrix, round 8: 146,654 of 146,654
26. test-privacy-matrix-r9.js - privacy matrix, round 9 (unticked and wrongly ticked, every route): 216,350 of 216,350
27. test-fuzz-r7.js - type-fuzz and random worlds: 2,536 of 2,536
28. test-verify.sh - VERIFY checks, 216 older scenarios: 1,684 of 1,684
29. test-verify.sh (scenarios) - VERIFY scenarios as expected: 216 of 216
30. test-verify-r9.sh - VERIFY checks, new scenarios: 477 of 477
31. test-verify-r9.sh (scenarios) - VERIFY new scenarios as expected: 60 of 60
32. test-no-write-commands.js - no write command anywhere: 37 of 37
33. check-xrefs-r9.js - cross-references and document shape: 36 of 36
34. run-mutations.sh - deliberate breaks caught: 69 of 69

**Claims surface (test-claims-r9.js, the independent extractor)**
- AFTER (this build): sentences read 808, checkable 431, proven by a test 247, exempt with a reason 97, unchanged text of the real v3 87, unmapped 0, false 0.
- BEFORE (the same test on the round-8 tree): sentences read 851, checkable 463, proven 193, exempt 75, unchanged v3 87, unmapped 87, false 21.

**BEFORE and AFTER (the new tests run on the round-8 tree, then on this build)**
- test-claims-r9.js: BEFORE 2 of 122; AFTER 13 of 13.
- test-quotematch-r9.js: BEFORE 93 of 154; AFTER 27 of 27.
- test-pii-unit-r9.js: BEFORE 259 of 302; AFTER 302 of 302.
- test-privacy-matrix-r9.js: BEFORE 202,364 of 216,350; AFTER 216,350 of 216,350.
- test-fixes-r9.js: BEFORE 14 of 48; AFTER 48 of 48.

**Privacy matrix r9, in detail:** 202 personal-data notes, 88 ordinary notes, 16 cannot-catch notes, 369 routes; unticked: 111,078 of 111,078; wrongly ticked, personal notes: 73,326 of 73,326; wrongly ticked, ordinary notes: 31,944 of 31,944; page errors 0.

Total checks (the rows above, scenario and break counts left out because they are counted inside the others): 480,105 of 480,105
<!-- NUMBERS-END -->

## Section E - Older tests I changed or retired

Listed one by one, with the reason, in FIX-ROUND-9-OLD-TEST-CHANGES.txt. In short: the wording of several old checks follows the new words (same fact under test), the after-writers VERIFY line in two scenarios, one ordinary note became a documented false alarm, and four tests of the old keyword method or of the old document structure are replaced by round-9 tests. Nothing was loosened to get green.

## Section F - For the cloud keeper (charter end of session)

OPEN-ITEMS.md and RECURRING-ISSUES.md are outside the folder this order lets me write. Suggested dated line for RECURRING-ISSUES.md: "2026-10-07: panel v5 CHECK-10 FAIL, small: 8 mislead, 0 damage, 0 leak. Third recurrence of words that claim more than the code. Fixed at the cause (Tier 2: the Read me is 10 sentences, INSTALL-BY-HAND.md is numbered steps, the list of v3 changes is generated; Tier 3: a plain extractor that reads every sentence with a digit or sixteen plain words, and a quote-match test for the documents)."

Shall the independent checker audit this round now? (yes/no)

TRK-2026-9910-B · FIX-ROUND-9 · v1 · 2026-10-07 · CURRENT · #VTES-control-panel #panel-v5
