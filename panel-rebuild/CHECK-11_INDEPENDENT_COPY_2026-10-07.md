# CHECK-11 - seventh independent check of panel v5 (after fix round 9) - FINAL

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 7 · 2026-10-07. Configured model: claude-opus-5-5 (the serving model may differ).

Checked: commit 894e6ac of `claude/panel-v5-port`, on my branch `claude/panel-v5-check7`. I did not build v5. I did not run or reuse the builder's tests. Every number below comes from scripts that I or my five helpers wrote, kept in my scratchpad and not committed. "Helper run" marks a helper's number. "Re-checked" means I ran it again myself.

## Section A - Verdict

**FAIL, narrowly. 2 flaws that mislead (both low), 0 that damage, 0 that leak, 38 edge cases.**

Round 9 mostly worked. **All 8 of CHECK-10's flaws are fixed, measured.** Making the claim surface smaller removed almost every wrong sentence:
- the 10-sentence Read me, 9 of 10 true;
- the short install list, with all 10 quoted VERIFY lines matching the real output.

The 2 flaws that remain were left by the cut, not by new code:
1. VERIFY still points to a step that was deleted.
2. A v3 packet line that nobody listed tells the LOCAL lane to send its answer back to a Claude window.

**What held, measured:**

1. **No false green (helper run).**
   - 11,040 of 11,040 page states, in four phases each (opened bad, fixed, made bad while green, fixed again):
     - 128 hand-made worlds;
     - 400 seeded random worlds;
     - 2,232 type-fuzz worlds (93 fields, 24 bad values each, including a throwing getter, 10,000-level nesting, a circular object and a million-entry list).
   - 0 strip entries, badges or WHOLE PAGE lines were greener than the worst card.
   - Recovery inside 61 seconds: 5,520 of 5,520.
   - 0 injected scripts ran, 0 network calls, 0 storage writes.
   - The watchdog went red in every planted failure the page could detect.
   - 8 simulated hours: memory flat at 1.45 to 1.55 MB; 778 to 785 page elements.
2. **The tick holds (helper run).**
   - Unticked: 0 of 6,256 personal-note sends on non-LOCAL routes carried the note.
   - Every From and To pair: 0 of 3,744.
   - Bypass attempts: 0 of 217 leaked. They included typing, paste, undo, IME, script set with and without events, drag and drop, keyboard only, From, To or kind changes, and clicks 0 to 1,500 ms after a silent change.
3. **VERIFY (helper run, re-checked).**
   - PowerShell 7.4.6 for Linux. The archive SHA-256 is 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561, which matches the release's own hashes.sha256.
   - 178 real runs: the whole fixture, including a fake Desktop holding the real v3, was identical before and after in 178 of 178. strace shows no writes outside PowerShell's own cache.
   - 0 false OK.
   - The "OK (after writers)" counts add up to 11 in 9 of 9 runs.
   - I re-checked the day-one OK line and the UTF-16 EDITED line myself, word for word.
4. **Nothing of v3 is lost (helper run).**
   - 156 of 156 items.
   - 288 of 288 packets identical apart from the stamp, plus 18 of 18 task kinds.
   - 47 of 47 links work.
   - At 12 window sizes and 4 at 200% zoom, 16 of 16 pass every check: the RAMBO button on the first screen and not covered, no sideways scroll, no text under 14 px, the tick box usable by keyboard and mouse.
5. **Install steps (re-checked).**
   - The pinned SHA-256 values are real: VERIFY f291b8c4...ce089 and MANIFEST 816e2efa...4ad0.
   - 11 of 11 manifest lines match, and the package is 12 files.
   - The real v3 is 28d3ed5e...411fe3, as required.
   - 31 numbered steps, the longest 38 words.

## Section B - The 2 mislead flaws

**Flaw 1. VERIFY sends the reader to a step that no longer exists. Class: mislead (low). New in round 9.**
- File: VERIFY-v5.ps1 line 342.
- Re-checked by me with PowerShell 7.4.6: a copy with one CRLF file prints "Get the exact bytes again (INSTALL-BY-HAND.md, Section A, step 6). Do not edit these files."
- Round 9 removed Section A. Step 6 is now "In File Explorer click View, then Show, then File name extensions."
- The right step is 27, which says to fetch the bytes into a NEW folder. VERIFY's own sentence does not say "new folder", and step 26 forbids writing over the folder.
- How a person could act wrongly: RAMBO, following the tool's printed instruction, re-saves the files over the same folder, or looks for a step that is not there.
- Why the builder's tests missed it: check-xrefs-r9.js reads references in the documents, not in VERIFY's printed strings. Helper E found the same line on its own.

**Flaw 2. The LOCAL packet tells the local model to send its answer back to a Claude window. Class: mislead (low; it could lead to a leak if followed). Inherited from v3; not disclosed.**
- File: VTES-LLM-LAUNCHER_v5.html line 213, `packet()`.
- Every packet ends with "RETURN PATH: write your answer so Jorge can paste it back to " + From. The default From is LLM-04, Claude Chat.
- Helper run, re-checked in the code: To=LOCAL with a made-up personal note copies this line in 44 of 44 heartbeat states.
- The same packet's FACTS LIVE IN line says results live in the Drive folder VTES-Outbox.
- How a person could act wrongly: Jorge pastes the LOCAL answer, which can hold client data, into Claude Chat, as the packet asks. The LOCAL card says "Do NOT send client personal data to RAMBO or to any Claude window."
- No document names it: "RETURN PATH" appears in none of the v5 documents. KNOWN-LIMITS item 32 covers only the HOW TO ANSWER line.
- It matters only once a local-only folder is confirmed. Today the card says STOP HERE. The page itself never sends anything to Claude.

## Section C - Edge cases (documented limits, style, or needs a faulty writer or a PC; not failures)

The checker (second layer):
1. Wrongly ticked, 12 of 136 personal notes were carried (helper run).
   - 6 are disclosed in KNOWN-LIMITS 40, and 3 are names, addresses or emails, which the page says it cannot catch.
   - The other 3 are undisclosed:
     - look-alike letters in card groups ("4111 llll 1111 1111");
     - "Maria (b. 04/12/1975)";
     - a bare 13-digit bank number.
2. Further misses in a probe of 57 Miami spellings (helper run), none claimed as caught by the page:
   - "nació el 12/04/1975", "fecha nac.", "F.N.", "cumpleaños 5 de mayo 1982" (re-checked);
   - "b-day", "birth 1975/04/12";
   - "Medicare 1EG4-TE5-MK73".
3. "DOB 12-Apr-1975" is carried. KNOWN-LIMITS 37 says month names beside a date-of-birth label are blocked: the document overstates. The cause is that the date pattern (vtes5-ui.js line 335) needs a space between day and month.
4. False alarms: 6 of 79 ordinary notes were held back (fail closed): USPS 22-digit, FedEx 15-digit, "Pages 1 2 3 4 5 6 7 8 9" and "Contractor license CGC1512345". Disclosed in KNOWN-LIMITS 37 and 38.
5. Checker time on a 20,000-character note:
   - letter runs: up to 1,283 ms (helper run), quadratic in the look-alike pass (line 327);
   - 943 ms on four-digit groups (re-checked).
   - KNOWN-LIMITS 40 says about 400 ms.
   - The round-8 PC check "paste 20,000 characters ... say how many seconds" was deleted in round 9.
   - It runs only on tick and click, not on every keystroke.
6. "1111 " repeated 4,000 times is carried. The four-groups rule needs 20 digits or fewer in the run, but such a run is not a valid card.
7. After a refused press, a LOCAL packet shown earlier stays in the packet box (header LOCAL, nothing copied).

Words on the page and in the documents (helper run unless marked):
8. Read me sentence 5 ("tick the box ..., then press the big blue button") works for 2 of 9 task kinds (re-checked). The other 7 set To away from LLM-01. The button stays off and says why; nothing leaks.
9. WHOLE PAGE's "N of 7 reports red" counts each file's own verdict, not the raised strip colour (re-checked): "0 of 7 reports red" beside a red strip entry that itself says "the report itself is fresh". This happens in 2,192 of 11,040 states. The line is always red when it should be. Blue RUNNING NOW boxes are counted as "grey".
10. KNOWN-LIMITS 43 says every line naming RAMBO or Claude starts with "Do NOT". Two "For RAMBO:" setup lines do not; neither hands client data to anyone.
11. PORT-REPORT Section F: 0 changed lines are missing from the list. 3 entries are paired wrongly (items 36, 4 and 41).
12. DATA-CONTRACT double-quotes "says OK", "says good" and "last report", which are not page strings, against its own header rule.
13. FIX-ROUND-9 says "those five documents" and names four. The fifth with the header is TEST-REPORT.md.
14. PORT-REPORT Section D item 1 says every light is red NO DATA; the shipped page has 22 grey marks.
15. A stale or BAD CLOCK heartbeat makes the address line say "the PC has not reported whether the shortcuts are set up", although it did report.
16. The LOCAL card cites "KNOWN-LIMITS item 43 (LOCAL)" for the VTES-Inbox-LOCAL fact, which is item 44.
17. KNOWN-LIMITS 55 says a mixed-ending file is not named LINE ENDINGS CHANGED (CRLF); VERIFY does name it that. The advice is still right.
18. DESKTOP-WORK says a link is "NOT A PLAIN FILE"; VERIFY prints "LINK: ...".
19. A manifest that alone has CRLF says "(see the same sentence below)" with no such sentence below.
20. A chmod-000 file is reported UNREADABLE, but the cause shown is "(MethodInvocationException)".

Data and colour (each needs a faulty writer, a data file that is itself code, or a wrong PC clock):

21. With both proof fields, a LOCAL label with no drive ("VTES-LOCAL", 42, true) is CONFIRMED, and the step says "Open the local-only folder named "VTES-LOCAL"". DESKTOP-WORK item 11 tells RAMBO to write a C:\ path.
22. "C:\GDrive\VTES" with proof is CONFIRMED (re-checked). Disclosed in KNOWN-LIMITS 43.
23. An UNREADABLE file still shows some content:
    - 7 one-click links (heartbeat);
    - 22 green "proof checked" marks (Miami-Dade);
    - plain numbers in the token, state and housekeeping panels.
    The badges and WHOLE PAGE stay red. KNOWN-LIMITS 50 names only cards.
24. A build stamp in the future (PC clock behind the build time) leaves WHOLE PAGE green beside a red BAD CLOCK age line.
25. A data file that sets VTES5U to null, fakes executor() or freezes Date stays green (disclosed, KNOWN-LIMITS 51).
26. A token `window_resets_at` in 2099 is green: the reset rule has no upper limit.
27. Up to 60 seconds of old colour after a change (re-read once a minute, by design).

VERIFY and install (helper run unless marked):

28. A folder name with `*` or `?` also lists a sibling folder. It fails closed (PROBLEMS). Windows forbids those characters.
29. Hard links and a doctored manifest without the expected hash give OK (disclosed, KNOWN-LIMITS 21 and 54).
30. In my reading of INSTALL-BY-HAND, steps 27 to 29 come after step 26 ("PROBLEMS ... report BLOCKED") with "Stop at the first BLOCKED". They can never be reached, which is harmless.
31. Step 29 names only data/vtes5-bots.js. A UTF-16 copy of any other data file falls to step 26, which is safe.
32. Step 10 says git fetch writes only inside `.git`. A credential prompt may write to Windows' own credential store. UNVERIFIED.
33. Step 6's menu path (View, Show) is Windows 11 wording.
34. A clone made with `--single-branch` would not update origin/claude/panel-v5-port. VERIFY's pinned manifest hash then fails closed.

Page size and text (disclosed): 35. Very large text puts the RAMBO button off the first screen at 360 x 640 and 375 x 667 (KNOWN-LIMITS 60). 36. At 32 px text the page scrolls sideways by 62 px (KNOWN-LIMITS 61). 37. The checkbox control itself is 13.33 px; it carries no text. 38. Changing From after Just show leaves the old packet in the box until the next press (my run, e8); nothing is copied.

## Section D - CHECK-10's 8 flaws and 4 edge items, re-checked

1. Card with expiry: **FIXED.** 10 of 10 card notes held back (re-checked), including CHECK-10's 3.
2. Spanish forms: **FIXED.** 7 of 8 held back (re-checked). The page no longer claims Spanish.
3. Labelled IDs: **FIXED.** 12 of 12 held back. 12 of 12 ordinary notes carried, including CHECK-10's 4 false alarms (re-checked).
4. Count of changed lines: **FIXED.** The page prints no number. Section F misses 0 changed lines (helper's own diff).
5. LOCAL save handed to RAMBO: **FIXED.** 0 lines in 4 states (re-checked) and in 44 states (helper run).
6. Grok sentence: **FIXED.** No sentence when green. "stays red" in 4 of 4 red states (re-checked). 18 of 18 states (helper run).
7. After-writers count: **FIXED.** 9 of 9 add up (helper run).
8. WHOLE PAGE grey with 0 grey: **FIXED.** It now says "1 of 7 reports grey" (re-checked). Wording of the report count is edge 9.

The 4 edge items:
- e9 local-folder rule: **FIXED**, 25 of 25 bad labels refused with and without proof (re-checked). Edge 21 remains.
- edge 10 unreadable file: **FIXED** for cards and bots, 16 of 16 (helper run). Edge 23 remains.
- edge 8 tick and From: **FIXED**, also with no event (re-checked).
- edge 31 step length: **FIXED**, 0 of 34 step lines over 25 words (re-checked).

**Tally: FIXED 8 of 8, PARTIAL 0, NOT FIXED 0. Edge items FIXED 4 of 4.**

Regression sweep of CHECK-9, CHECK-8 and CHECK-7 (by class, from the runs above):
- Colour rule and freeze (CHECK-8 1, CHECK-7): held in 11,040 states.
- Tick and SSN (CHECK-8 2 and 3): 0 of 6,256 unticked.
- VERIFY (botched install, pipe hang, case duplicates, links, UTF-16, exit codes, ASCII): 178 of 178.
- Queued and one-click lines (CHECK-9 2 and 4): 0 contradictions in 46 states (helper run).
- v3 survival (CHECK-9 3, CHECK-8 7): 156 of 156.
- Large text (CHECK-8 24 and 25): still edge, now disclosed.

**No regression found except flaw 1, which round 9's own document cut created.**

## Section E - Regressions in the round-9 diff (0204fca..894e6ac)

I read every changed line of the page, vtes5-live.js, vtes5-ui.js, VERIFY-v5.ps1 and the documents.

1. **Logic.**
   - The tick is now bound to note, To and From, and every press re-checks all three at click time (lines 516 and 517).
   - grokNext and localSteps are computed from state.
   - The UNREADABLE rule is added to executor() and bot().
   - VERIFY's three counts are correct.
   - No false-green path found.
2. **Fragile patterns.**
   - cardReasons and idLabelReasons are linear.
   - The look-alike pass is quadratic on 20,000 letters (edge 5).
   - The bare word "driver" is a label (fail closed).
3. **Accessibility.** The tick box has its name and works by keyboard and mouse (16 of 16).
4. **Older tests (FIX-ROUND-9-OLD-TEST-CHANGES.txt, 12 entries).**
   - Each keeps the same fact or is replaced.
   - One note moved from ordinary to false alarm, which is disclosed.
   - No silent weakening found.
5. **Deleted text.**
   - Every PC check of CHECK-10 Section H is still in KNOWN-LIMITS.
   - Lost: the PC check for checker speed (edge 5), and VERIFY's pointer target (flaw 1).

## Section F - Methods and counts, N of N

1. **Claims (part B, helper run).**
   - 46 page states, 26,879 sentences read, 572 unique kept (473 page, 99 INSTALL-BY-HAND.md).
   - 372 checkable: 362 proven true, 10 false (all edge). 160 not provable here.
   - Read me: 9 of 10 true.
   - Documents: 23 of 26 quotes match, 27 of 27 numbers true, 37 of 37 cross-references resolve.
2. **Invariant and fuzz (part C, helper run).** 11,040 states, 9 clock jumps, 15 watchdog plants, the 8-hour soak.
3. **Privacy (part D, helper run).** 136 personal and 79 ordinary notes on 50 routes, 44 LOCAL states, 217 bypass attempts.
4. **VERIFY (part E, helper run).**
   - 178 scenarios with expected answers recorded first: 170 matched; 6 were the helper's own wording guesses, and 2 are findings.
   - 3,894 fixture entries hashed per run.
   - Parser scan: 0 write commands and 0 redirections. ASCII only, 0 CR, 0 NUL.
5. **Survival and sizes (part F, helper run).** 156 items, 288 packets, 47 links, 16 window setups and 288 tab clicks.
6. **Mine.**
   - 31 guard notes, 4 LOCAL states, 5 Grok states, 5 WHOLE PAGE worlds, 46 folder labels, 4 unreadable variants and 9 task kinds;
   - the tick and From checks, step lengths, checker timing and the diff review;
   - hashes and 3 VERIFY runs.

## Section G - UNVERIFIED here: the one-line PC check for RAMBO (never a task for Jorge)

1. **PowerShell 5.1:** run the day-one VERIFY line from INSTALL-BY-HAND step 23 once on a fresh install and paste the output.
2. **Junctions:** make a junction loop in a scratch folder outside the install, run VERIFY on it, and report whether it ends within 60 seconds with a LINK line.
3. **The one-click link:** click one vtes:// link once the shortcuts exist, and report whether the browser asks "Open ...?" first.
4. **Is Drive a link?** Run `(Get-Item 'G:\My Drive').Attributes` and paste the answer.
5. **Checker speed:** paste 20,000 letters O into the note box, tick, press Just show the packet, and say how many seconds it takes.
6. **Dictation:** dictate 'novecientos ochenta y siete, sesenta y cinco, cuatro tres dos uno' into the note box and paste what appears.
7. **git fetch writes:** run `git fetch origin claude/panel-v5-port` and say whether any sign-in window appeared.
8. **The writers' time format:** paste one `at` value each writer really writes.

## Section H - For the cloud keeper (charter end of session)

I changed only this file in the repository. OPEN-ITEMS.md and RECURRING-ISSUES.md were not updated by me. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-07: panel v5 CHECK-11 FAIL, narrow: 2 mislead (low), 0 damage, 0 leak, 38 edge. All 8 CHECK-10 flaws fixed. The smaller claim surface worked (Read me 9 of 10 true, 10 of 10 VERIFY quotes exact). The class recurs a fourth time in a new place: text outside the documents. VERIFY's printed pointer to a deleted step, and a v3 packet line, were never in the claim surface. Next fix: put VERIFY's printed strings and the packet text into the same claim and cross-reference tests."

Shall the builder fix these 2 before anything is installed? (yes/no)

TRK-2026-9910-B - CHECK-11 - v1 - 2026-10-07 - CURRENT · #VTES-control-panel #panel-v5 #independent-check
