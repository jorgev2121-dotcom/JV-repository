# CHECK-10 - sixth independent check of panel v5 (after fix round 8) - FINAL

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 6 · 2026-10-07. Configured model: claude-opus-5-5 (the serving model may differ).

Checked: branch `claude/panel-v5-port` at commit 0204fca, on my branch `claude/panel-v5-check6`. I did not build v5. I did not run or reuse the builder's tests. Every number below comes from scripts I or my helpers wrote, kept in my scratchpad and not committed.

Five helpers inside my session ran parts B, C, D, E with G, and F with their own new scripts. Their numbers are marked "helper run". Where I re-ran a key claim myself, it says "re-checked".

## Section A - Verdict

**FAIL. 8 flaws that mislead, 0 that damage, 0 that leak, 44 edge cases.**

All 8 are words that say more than the page or VERIFY does. None of them makes a card green when it should not be, and none lets personal data out while the tick box is unticked.

- 3 of the 8 are about the second-layer digit guard. They matter only if the tick is ticked by mistake.
- 3 of the 8 appear only in a state the page is not in today: a confirmed local folder, a proven Grok, or VERIFY run with `-AfterWriters`.

**What held, measured:**

1. **No false green from a correct writer (helper run).**
   - 162 of 162 hand-made worlds, 400 of 400 seeded random worlds and 2,447 type-fuzz worlds, each run in four phases on one page:
     - opened bad;
     - fixed;
     - made bad while green;
     - fixed again.
   - Results:
     - 0 invariant breaks: no strip entry, badge or WHOLE PAGE line was greener than the worst card.
     - Recovery inside 61 seconds in 3,009 of 3,009.
     - 0 injected scripts ran.
     - 0 network calls.
     - 0 cookie or storage writes.
2. **The tick holds (helper run, re-checked in part).**
   - Unticked: 4,323 of 4,323 personal-data sends on non-LOCAL routes were blocked, even with the off-switch removed by script.
   - Every From and To pair: 624 of 624 were refused.
   - 30 of 30 ways of changing the note after a tick sent nothing. They included typing, paste, undo, dictation-style input, drag-and-drop, IME composition, and a script setting the text with no event.
3. **Clock, watchdog and soak (helper run).**
   - Clock jumps: 6 of 6 behaved as the contract says.
   - The watchdog went red in 5 of 5 planted failures.
   - 8 simulated hours with data rewritten 48 times:
     - memory flat at 1.15 to 1.69 MB;
     - 769 page elements every hour;
     - 0 page errors.
4. **VERIFY (helper run, re-checked).**
   - It ran under PowerShell 7.4.6 for Linux. The archive's SHA-256 is 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561, which matches the release's hashes.sha256.
   - 168 scenarios, each with its answer written down beforehand: 164 matched. The other 4 are 3 edge items and 1 wrong prediction of the helper's own.
   - The whole fixture, including a fake Desktop holding the real v3, was identical before and after in 168 of 168.
   - Nothing hung: the slowest run took 1.51 seconds.
   - Re-checked by me: a fresh copy prints the single OK line with exit 0, and a UTF-16 data file prints the exact "EDITED ... saved as UTF-16" words that INSTALL-BY-HAND.md quotes.
5. **Install steps (helper run).**
   - The git steps were run in a scratch clone: `git fetch` wrote 3 files, all inside `.git`, and changed no branch and no working file.
   - The pinned hashes are real (re-checked):
     - VERIFY-v5.ps1 is dd99ad8a...cff43;
     - MANIFEST.sha256 is b7b88ecd...67e0;
     - all 11 manifest lines check out;
     - the package is 12 files.
   - Step 6d never overwrites.
   - The real v3 SHA-256 is 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3, as required.
6. **Nothing of v3 is lost (helper run).**
   - Every card, role, bot, queued item, picker row, To and From option, repairs row, tab, link and button is there: 9, 6, 6, 6, 9, 12, 12, 12, 17, 24 and 21, each N of N.
   - The packets are identical apart from the time stamp:
     - 144 of 144 From and To pairs with a note;
     - 144 of 144 with an empty note.
7. **Window sizes (helper run).**
   - At 12 normal window sizes from 360 x 640 to 1920 x 1080, plus real 200% zoom, every check passes:
     - the RAMBO button is on the first screen;
     - there is no sideways scroll;
     - all 18 tabs are reachable;
     - no text is under 14 px;
     - the tick box has its name and works by keyboard and by mouse.
   - Failures appear only with large browser text (edge).

## Section B - The 8 mislead flaws, worst first

**Flaw 1. A card number written with its expiry date gets past the guard. Class: mislead (second layer).**
- The Read me (package/vtes5-ui.js line 260) says the guard leaves the note out for "a card number, in many layouts". The line under the note box says "Do not type ... card numbers here".
- Re-checked by me, 3 of 3 carried:
  - "4111 1111 1111 1111 12/29";
  - "card: 4111 1111 1111 1111 / 12 / 29";
  - "4111.1111.1111.1111.1229".
- Helper run: 13 of 22 card numbers beside another number were carried, on all 33 non-LOCAL routes.
- Cause: the card rules need exactly 13 to 19 digits, or the 4-4-4-4 shape alone (vtes5-ui.js lines 345, 346, 393, 433). Not disclosed in KNOWN-LIMITS.

**Flaw 2. The Read me says the guard "knows English and Spanish", but common Spanish forms get through. Class: mislead (second layer).**
- Re-checked by me:
  - "SSN novecientos ochenta y siete sesenta y cinco cuatro tres dos uno" is carried, even with the SSN label. So is "seguro social novecientos ...".
  - The word list has cien and ciento but not doscientos to novecientos (vtes5-ui.js line 359).
  - Spanish dates of birth are carried: "fecha de nacimiento: 3 de marzo de 1980" and "DOB enero 2 1970". The label is known; Spanish month names are not.
- Jorge's clients are in Miami. These are realistic notes.

**Flaw 3. Plain IDs beside their own label get through. Class: mislead (second layer, weaker).**
- The Read me says the guard "looks for a Social Security, licence, passport, bank or date-of-birth label near digits".
- Re-checked by me, 4 of 4 carried:
  - "DL 12345678";
  - "driver's license A1234567";
  - "passport AB1234567";
  - "birth: 04/12/1975".
- Helper run: 113 of 307 labelled notes were carried: SSN 0 of 24, licence 41 of 84, passport 24 of 36, bank 20 of 72, date of birth 28 of 91.
- The Read me also says "It can still miss some spellings". I count it because a plainly written date of birth after the word "birth" is not an odd spelling.

**Flaw 4. "34 lines of text were changed ... the list is in PORT-REPORT.md" is not a count of lines. Class: mislead (low). This is CHECK-9 flaw 3 again, PARTIAL.**
- File: vtes5-ui.js lines 251 to 253. The number comes from build-v5.js, which counts patches named in TEXTWHY.
- My count: 42 visible v3 lines do not appear unchanged in v5. The helpers counted 33 to 36 with stricter matching.
- Every count agrees that at least 11 are missing from the PORT-REPORT.md list:
  - the 8 "Address: vtes://llm-0N" card lines;
  - 3 role addresses;
  - the "Open X" link labels.
- Four build patches never reach the list either: tabs-status, tabs-add, win-grok and queued-status.
- Each change is disclosed somewhere else (PORT-REPORT Section B, KNOWN-LIMITS 21 and 32). The sentence and its number are what is wrong.

**Flaw 5. Once a local-only folder is confirmed, the LOCAL card gives the client-data save step to RAMBO. Class: mislead (contradiction; it could lead to a leak if followed).**
- File: vtes5-ui.js lines 39 to 41. The steps "For RAMBO: right-click ... name it JOB-something.md ... Open it, press Ctrl+V and save" are given to RAMBO.
- Two lines above (line 34), the same card says "Do NOT paste this packet into any Claude window ... client personal data goes to LOCAL only". RAMBO is Claude.
- DESKTOP-WORK.md items 9 and 11 (lines 35 and 39) say the person saves the file by hand and does NOT hand it to RAMBO. The person gets no save step of their own.
- Helper run, re-checked in the code. It does not show today: the card is BLOCKED until a folder is confirmed.

**Flaw 6. The Grok card can say it is red while it is green. Class: mislead (contradiction).**
- File: vtes5-ui.js line 70: "Next step: RAMBO sends Grok one test message and records the result; until then this card stays red." It is fixed text.
- Helper run, re-checked in the code: with the test reply recorded, the card is green UP and still prints this sentence. It tells RAMBO to do a step that is already done.

**Flaw 7. VERIFY's after-writers OK line miscounts. Class: mislead (wording; the answer itself is right).**
- File: VERIFY-v5.ps1 line 406.
- Re-checked by me with PowerShell 7.4.6, one data file rewritten and `-AfterWriters`: it prints "10 page and script files are identical (SHA-256)". The package has 3 page and script files.
- `$okCount` also counts the unchanged data and settings files.

**Flaw 8. Grey "NOT PROVEN" is defined too narrowly, and WHOLE PAGE can say grey with 0 grey items. Class: mislead (low).**
- The Read me (vtes5-ui.js line 255) says "Grey NOT PROVEN means only the simple status writer said up, and it checks nothing." KNOWN-LIMITS line 78 says the same.
- Helper run: three worlds with no status writer at all each give "WHOLE PAGE: NOT PROVEN - 0 red and 0 grey of 44 cards and marks; 0 of 7 reports red". The worlds were:
  - Miami-Dade fresh but not counted;
  - one bot running;
  - health 9 of 10.
- Re-checked in the code: line 628 counts only cards and marks, not the report verdicts that made it grey.

## Section C - Edge cases (documented limits, style, or needs a faulty writer or a PC; not failures)

The guard and privacy:
1. A run of 10 to 12 digits is carried ("ref 1234567890", "FedEx 123456789012"), and so is a 13-digit run without a folio shape. The Read me says "nine digits in a row". KNOWN-LIMITS 34 says "exactly 9", and the Read me hedges.
2. English "double four" and number words over 999 are carried. KNOWN-LIMITS 53, which disclosed the over-999 case, is marked SUPERSEDED, and item 63 does not repeat it.
3. Understatement on the safe side: the gate line (VTES-LLM-LAUNCHER_v5.html line 99) says the page cannot catch "any identifier written in words", but spelled-out English and Spanish digits are caught. The Read me says other-script digits are missed, but 5 of 5 were caught.
4. Undisclosed false alarms (they fail closed). Helper run: 13 of 42 in a second batch. Examples:
   - "Bank of America appointment 10/12/2026";
   - a 16-digit FedEx number;
   - "Amazon order 113-1234567-1234567";
   - "ZIPs 33186 33187 33189";
   - "The driver dropped 2 boxes at 14598 SW 110 ST" (my run).
5. An SSN regrouped to look like a ZIP+4 after a state code, or like a permit number, is carried. This is disclosed in KNOWN-LIMITS 34.
6. The guard takes up to 411 ms on a 20,000-character note. A 1 MB note is refused in 300 to 376 ms (KNOWN-LIMITS 66).
7. After the note or To changes with no event, the tick and the Copy button look active for up to 1 second. The click is still refused: 0 of 8 got out.
8. Changing From keeps the tick. The Read me promises only the note and To.

Local folder (all need a faulty writer):

9. With both proof fields, any drive letter (D:\, Z:\), "C:\GDrive\VTES", Cyrillic or full-width lookalikes, or a non-text label is CONFIRMED. The code comment at vtes5-ui.js lines 13 to 15 says other drives are refused. Without proof, only the two allow-listed names pass. One of them can hide a network path after a line break (vtes5-ui.js line 12 has no multi-line flag).

Data and colour (faulty writer, or a data file that is itself code):

10. A file marked UNREADABLE (a throwing getter) still drives green bot and window cards. The strip entry and WHOLE PAGE are red. Code: vtes5-live.js lines 247, 320 and 426. KNOWN-LIMITS 50 says such a file is "not trusted at all".
11. "10-07-2026" passes the NO ZONE rule because "-2026" reads as an offset (vtes5-live.js line 159). It is harmless: it is read as midnight. KNOWN-LIMITS 65 says "never green".
12. A zone-less time is grey NO ZONE even when it is days old. Before round 8 it was red STALE. PowerShell's `Get-Date -Format s` writes no zone, so a writer that dies would show grey, not red. Disclosed in KNOWN-LIMITS 65.
13. After one failed redraw, some lines stay red until a reload (vtes5-ui.js lines 193 to 196 and 214). It fails red, not green.
14. A data file that clears every timer leaves the page green for good. This is disclosed in KNOWN-LIMITS 66(j).
15. The page accepts `status_dir_url` "a//" and values over 200 characters differently from VERIFY. Both are harmless. FIX-ROUND-8 says it is "exactly the same rule".

VERIFY and install (helper run):

16. ConvertFrom-Json refuses valid JSON whose keys differ only in case. It fails closed (VERIFY-v5.ps1 line 212).
17. An empty `-Path ""` exits 1 from PowerShell itself; the header's exit-code list does not say so.
18. `-Path "/"` prints `the folder "" does not exist`.
19. Get-FileHash prints upper case and the pinned hashes are lower case. The document does not say case does not matter. The risk is a false BLOCKED.
20. In step 6d's "different hash" branch, the new copy is not checked against the pinned hash.
21. Step 6b gives no exact byte-safe save command. If every file goes through a 5.1 redirect, VERIFY prints CANNOT CHECK (NUL in the manifest), not the quoted EDITED line. It is still BLOCKED.
22. Step 8 gives a false BLOCKED if the PC's current branch tracks origin/claude/panel-v5-port.
23. KNOWN-LIMITS Section I items 5, 11 and 15 ask RAMBO to make test copies and junctions. INSTALL-BY-HAND line 3 says there is no copy command "Anywhere". Item 11 does not say where the copy goes.
24. On Windows PowerShell 5.1, `Get-ChildItem -Recurse` (VERIFY line 347) may follow junctions. The answer is still PROBLEMS. UNVERIFIED.

Stale or loose document sentences (helper run):

25. KNOWN-LIMITS 34 quotes the old gate line, calls it "still the real rule", and says licence and passport numbers are never caught. That is now false in the safe direction.
26. KNOWN-LIMITS 25 says windows wider than 1500 px keep the wrapped bar. It does not wrap up to 1700 px.
27. KNOWN-LIMITS lines 42 and 58 and INSTALL-BY-HAND line 54 say VERIFY was tested "as the user nobody". The builder's harness dropped capabilities instead. My helper did run 5 scenarios as nobody.
28. KNOWN-LIMITS line 46 quotes stale card text.
29. KNOWN-LIMITS line 67 says mixed line endings are EDITED. VERIFY says LINE ENDINGS CHANGED (CRLF). Both are PROBLEMS.
30. KNOWN-LIMITS line 78 says no file names appear outside For RAMBO lines. PORT-REPORT.md, ORCHESTRATOR-BOARD.html and the v3 file name appear.
31. Sentence length (CHECK-9 edge e20, PARTIAL): KNOWN-LIMITS 65 says page sentences are at most 25 words. At least 5 step lines are 27 to 33 words (vtes5-ui.js lines 34, 36, 65, 75, 81).
32. Mismatched words in DATA-CONTRACT.md and DESKTOP-WORK.md:
    - DATA-CONTRACT lines 8, 16 and 37: typed-note labels, the Grok card "can never say both", and "the only place" for an every-N-minutes sentence.
    - DESKTOP-WORK line 7 says UNREACHABLE where VERIFY prints UNREADABLE.
    - DESKTOP-WORK line 25 says the Grok card shows the test time, but it shows `last_seen`.
33. "How to open (typed instruction from v3...)" sits on lines v5 rewrote (LLM-02, LLM-05, LLM-06).
34. v3's own typed leads are now partly untrue:
    - "Five lanes. Two are not Claude." The page shows 6 role cards.
    - "Press the big button: the packet is copied and the window opens." With a note, the button is off until the tick.
35. The Read me's "NO DATA means nothing on the PC has reported yet": a fresh file can also give NO DATA, with its own reason shown.
36. The LLM-01 address line stitches a sentence starting with lower case: "...vtes://llm-01. fill in the address book entry".

Page behaviour and size (helper run):

37. The Read me's "tick, then press RAMBO" does not work when To is RAMBO rather than LLM-01: the button stays off and says why. This is disclosed as KNOWN-LIMITS 66(c).
38. A one-click vtes:// link will likely trigger the browser's own "Open this app?" prompt, so it may be two clicks. UNVERIFIED on the PC and not in KNOWN-LIMITS.
39. Changing browser text size while the page is open hides section headings under the tab bar: 8 of 8 jumps, until a reload. Not in KNOWN-LIMITS.
40. With Very large text (24 px):
    - the RAMBO button is off the first screen at 375 x 667;
    - at 390 x 844 it is partly covered by the corner box, though its centre still works.
    This is wider than KNOWN-LIMITS 66(e) says.
41. With 32 px text, phone widths scroll sideways by 62 px, because of the "Open Gemini (gemini.google.com)" label.
42. The STATUS tab link moved from #status to #livestatus. This is not in the Section F list (it is in Section B D1).
43. The search box shows focus only by a border colour change (outline 0).
44. v3's own jargon remains: CLI, API, headless, PII. This is CHECK-9 edge 21, unchanged.

## Section D - CHECK-9's 11 flaws and 7 edge items, re-checked

1. Read me promises more than the guard: **PARTIAL.** CHECK-9's 5 spot spellings are all caught now (5 of 5, my run). New over-claims are flaws 1 to 3.
2. Queued line says ready while the button is off: **FIXED.** 0 of 16 mismatches (my run). 600 random UI actions gave 0 violations (helper run).
3. "Everything from v3 is still here except one link": **PARTIAL** (flaw 4).
4. One-click cards contradict themselves: **FIXED.** 0 of 9 cards contradict themselves, and the iPhone card has no link (my run). 10 of 10 (helper run).
5. VERIFY exit-code header: **FIXED.** Matches the runs, with one small gap (edge 17).
6. "not followed" for links: **FIXED** (helper run: no count is printed when a link is found).
7. Day-one UTF-16 words: **FIXED** (re-checked, word for word).
8. Stale round-6 OK sentence: **FIXED** (INSTALL-BY-HAND line 11 now says it is no longer true).
9. "Pure ASCII": **FIXED** (helper run: any byte above 127 is refused).
10. What `git fetch` writes: **FIXED** (helper run in a scratch clone).
11. Step 6d overwrite: **FIXED in words.** It never overwrites (helper run), with a small gap (edge 20).

**Tally: FIXED 9, PARTIAL 2, NOT FIXED 0.**

The 7 edge items the builder fixed:
- e1 allow rule: **PARTIAL.** Without proof it is a true allow list; with proof any C:\ or other drive passes (edge 9).
- e2 Miami-Dade ids: **FIXED**, 34 of 34.
- e3 own-property reads: **FIXED**, 10 of 10.
- e4 no-zone time is grey: **PARTIAL** (edge 11).
- e14 control characters: **FIXED.** No line starts with OK in any failing run.
- e15 status_dir_url: **FIXED.** 32 values gave 0 reads outside the package.
- e20 sentence length: **PARTIAL** (edge 31).

**Tally: FIXED 4, PARTIAL 3.**

## Section E - Regression sweep: CHECK-8's 25 and CHECK-7's 13

**CHECK-8:**
- **FIXED:** 1 freeze, 2 SSN spellings (66 SSN spellings, only 4 disguised ones carried, and only with a wrong tick), 4 VERIFY botched install, 5 stale Miami-Dade count, 6 BLOCKED and CONFIRMED at once, 8 file count (12 everywhere), 9 manifest link, 10 document quote, 12 data file changes the clock (VTES5_NOW gone), 14 "NOT FINE" for grey (now NOT PROVEN), 16 pipe hang (under 1 second), 17 case duplicates, 18 MISSING for unreachable, 19 slow on huge files (slowest 1.51 seconds), 20 "hourly" search, 21 hand-off lines, 22 tall tab bar at normal text, 23 links say where they go.
- **PARTIAL:**
  - 3: other personal data (flaws 1 to 3);
  - 7: v3 survival sentence (flaw 4);
  - 11: local-folder name check (edge 9);
  - 13: jargon (edge 44);
  - 15: ordinary notes blocked (edge 4);
  - 24 and 25: large text (edges 40 and 41).
- **Tally: FIXED 18, PARTIAL 7, NOT FIXED 0.**

**CHECK-7:** all 13 **FIXED**. The colour rule held in 3,009 worlds. LOCAL never sends client data to Drive: 0 of 35 Drive sentences do. Hung tasks go red STUCK. VERIFY gives no count through a link. The Miami-Dade, token and state panels follow the contract. 267010 says DISABLED. The .md.txt warning is there. The cross-reference is right.

## Section F - Regressions in the round-8 diff (09d5d04..0204fca)

I read every changed line of vtes5-live.js, vtes5-ui.js, the page, VERIFY-v5.ps1 and the documents.

1. **Logic.**
   - The tick gate re-checks the live note text at click time (vtes5-ui.js line 462). That is why every bypass failed.
   - `queuedText` and `oneClick` are single sources and are correct.
   - New gaps: noZone (edges 11 and 12), the after-writers count (flaw 7), the static Grok sentence (flaw 6), the steps for a confirmed LOCAL folder (flaw 5).
2. **Fragile patterns.**
   - The card rule (flaw 1) and Spanish hundreds (flaw 2).
   - CITY_END is a fixed list: a ZIP+4 after any other city is a false alarm. This is disclosed.
   - The bare "driver" label blocks ordinary delivery notes (edge 4).
3. **Speed.** The new label and hex passes add little. The worst case is 411 ms at the 20,000-character cap.
4. **Accessibility.** The disabled state is exposed on 11 of 11 switched-off buttons, and 32 of 32 buttons have names (helper run).
5. **Old test changes.** I read FIX-ROUND-8-OLD-TEST-CHANGES.txt (12 entries) and verify-r8-OLD-TEST-CHANGES.txt (6 entries). Each has a stated reason, and most are equal or stricter.
   - One coverage move is disclosed: mutation M24 now relies on test-words-r7.js.
   - One harness change stamps a test-only build time.
   - **No silent weakening found.**
6. **Method note.** The builder's claims test reported "76 of 76, 0 false". My helper's own extractor found 1,034 checkable sentences and 34 false. Keyword-based extraction (KNOWN-LIMITS 62) is still the weak point of that Tier 3 test.

## Section G - Methods and counts, N of N

1. **Claims (part B, helper run).**
   - 1,591 sentences read from the page in 5 states, KNOWN-LIMITS, DATA-CONTRACT, DESKTOP-WORK, INSTALL-BY-HAND and VERIFY (header and printed strings).
   - 1,034 checkable: 789 proven true, 34 false, 173 not provable here (mostly need the PC).
   - 214 behaviour checks.
2. **Invariant and fuzz (part C, helper run).** 3,009 data worlds in 4 phases; 6 clock jumps; 5 watchdog plants; 214 round-8 path probes; 8-hour soak. A harness self-test caught 3 of 3 planted breaks.
3. **Privacy (part D, helper run, re-checked by me on 160 guard notes).**
   - 131 personal-data notes and 2,022 ordinary-note route checks on 33 non-LOCAL routes plus 3 LOCAL routes.
   - Unticked: 4,323 of 4,323 blocked. Wrongly ticked: 594 carried (18 notes).
4. **VERIFY (part E, helper run, re-checked by me on 3 scenarios).** 168 scenarios, 168 of 168 fixtures identical. The parser scan of VERIFY found no write command and no redirect. ASCII only, 0 CR, 0 NUL.
5. **Survival and sizes (part F, helper run).** 288 packets compared; 37 window setups; 70 tab stops.
6. **Mine.** Guard probes (160 notes in 5 batches), queued and one-click worlds, the v3 line count, sentence lengths, the diff review, the hash checks, and 3 VERIFY runs.

## Section H - UNVERIFIED here: the one-line PC check for RAMBO (never a task for Jorge)

1. **PowerShell 5.1:** run the day-one VERIFY line from INSTALL-BY-HAND step 9 once on a fresh install, and paste the output.
2. **Junctions:** under a scratch folder outside the install, make a junction loop. Run VERIFY on it, and report whether it ends within 60 seconds with a LINK line.
3. **The one-click link:** once the shortcuts are set up, click one vtes:// link. Report whether the browser asks "Open ...?" first.
4. **Is Google Drive a link?** Run `(Get-Item 'G:\My Drive').Attributes` and paste the answer.
5. **The parent folder:** before step 6d, run `Test-Path -LiteralPath 'G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1'` and paste True or False.
6. **Dictation:** dictate the made-up number "novecientos ochenta y siete, sesenta y cinco, cuatro tres dos uno" into the note box, and paste what appears.
7. **The real browser:** open v5 at the usual size and report whether the blue RAMBO button is visible without scrolling.
8. **The writers' time format:** paste one `at` value each writer really writes, to show whether it carries a zone (edge 12).

## Section I - For the cloud keeper (charter end of session)

I changed only this file in the repository. OPEN-ITEMS.md and RECURRING-ISSUES.md were not updated by me. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-07: panel v5 CHECK-10 FAIL, small: 8 mislead, 0 damage, 0 leak, 44 edge. Colour rule, tick and VERIFY all held (3,009 worlds, 4,323 of 4,323 blocked unticked, 168 of 168 fixtures identical). The class recurs a third time: words claim more than the code. The Tier 3 claims test missed 34 false sentences because it picks sentences by keyword. Next fix should drive every claim from the code, or remove the claim."

Shall the builder fix these 8 before anything is installed? (yes/no)

TRK-2026-9910-B - CHECK-10 - v1 - 2026-10-07 - CURRENT · #VTES-control-panel #panel-v5 #independent-check
