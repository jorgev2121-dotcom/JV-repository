# CHECK-9 - fifth independent check of panel v5 (after fix round 7) - INTERIM (final draft; the type-fuzz re-run is still going, its numbers are marked PENDING)

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 5 · 2026-10-06. Configured model: Opus 5.5 (the serving model may differ).
Checked: branch `claude/panel-v5-port` at commit 09d5d04 (fix round 7). I did not build v5. I did not run or reuse the builder's tests. Every number below comes from my own scripts and data, kept in my scratchpad and not committed. Three helpers inside my session ran parts C, D, E and F with their own new scripts; their numbers are marked "helper run". I re-ran a sample of each helper's key claims myself; those are marked "re-checked". Times are Eastern.

## Section A - Verdict

**FAIL. 11 flaws that can mislead or damage, 0 that leak, 21 edge cases.**

The 11 are:
- 4 that mislead on the page itself;
- 6 small wording errors in VERIFY's own messages and in the install documents;
- 1 damage risk in the install steps.

**This is much closer than any earlier round.** The four class fixes held under my attacks. What is left is mostly words that say more than the page does.

**Re-check of the 25 CHECK-8 flaws:** FIXED 19, PARTIAL 6, NOT FIXED 0. **The 5 CHECK-6 partials:** FIXED 3, PARTIAL 2.

What held, measured:
1. **The page no longer freezes, and green never sits over red.**
   - Type-fuzz: PENDING (re-run in progress).
   - 152 of 152 hand-made worlds and 400 of 400 seeded random worlds kept the RAMBO button, Read me first and Live status, and never showed a strip entry, badge or WHOLE PAGE line greener than the worst card.
   - 150 of 152 hand-made worlds recovered within 61 seconds after the data was fixed, without a reload. The other 2 recovered when re-run alone (2 of 2). They had failed because my harness was overloaded.
2. **The watchdog works.**
   - A paint that throws turns WHOLE PAGE and 7 of 7 strip entries red "PAGE NOT REFRESHING - DO NOT TRUST".
   - With no paint at all, the page stays green for 3 minutes, then turns red at the next 15-second check (195 seconds).
   - It recovers once paints work again.
3. **The clock tests pass, 7 of 7.**
   - Forward 40 minutes, 3 hours or 2 days, or a 3-hour sleep and wake, turns the stale reports red within one minute.
   - Back 10 minutes or 1 day gives BAD CLOCK on 7 of 7 reports.
   - Back 1 minute stays green, which is inside the documented 2-minute grace.
4. **8 simulated hours, data rewritten every 10 minutes: no growth.**
   - Memory stayed at 1.81 to 1.86 MB.
   - There were 764 page elements and 13 script tags every hour, and 0 page errors.
5. **No injected script ran.** In every world: 0 network calls, 0 cookie or storage writes.
6. **The tick works (helper run, re-checked).**
   - Unticked: 6,026 of 6,026 personal-data packet attempts on non-LOCAL routes were blocked. Every button was off. Even with the off-switch removed by script, the click handlers re-check: 0 of 6,026 got out.
   - Ticked before typing: the tick reset every time, so 6,026 of 6,026 were blocked.
   - 0 of 25 tricks let a changed note out. They included keyboard typing, paste, undo, dictation-style input, setting the value with no event, and keyboard-only Enter and Space.
7. **VERIFY is sound when run as the install document says (helper run, re-checked).**
   - 195 valid scenarios: 192 gave the answer written down beforehand. The 3 that did not are flaw 5 below, and one wrong prediction of my own.
   - Whole fixture identical before and after in 201 of 201 runs, fake Desktop with the real v3 included.
   - UTF-16 from a PowerShell 5.1 redirect is caught for 12 of 12 files.
   - Every data file that tried to run code was refused under -AfterWriters.
   - The real v3 SHA-256 is 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3, as required.
8. **Nothing of v3 is lost (helper run).**
   - 288 of 288 packets are identical apart from the time stamp.
   - Every card, bot, queued item, picker row, repairs row and tab is present: 9 of 9, 6 of 6, 6 of 6, 6 of 6, 9 of 9, 12 of 12, 17 of 17. v5 adds MIAMI-DADE.
   - Every one of 43 text changes has a documented reason.

## Section B - The 11 mislead and damage flaws, worst first

**Flaw 1. The Read me promises more than the digit guard does. Class: mislead.**
- File: package/vtes5-ui.js line 241. It says the page leaves out a Social Security, card, bank, licence or passport number, or a date of birth, "written in many ways, including spelled out in words, split with commas, or hidden in base64 or hex".
- This matters only when the tick is ticked by mistake. Then:
  - Helper run: 26 of 125 such notes were carried, each on 46 of 46 non-LOCAL routes.
  - Re-checked by me, 5 of 7 spot spellings had no reason to block:
    - "SSN **123**-45-6789" and "SSN 123 apples 45 pears 6789", even with the word SSN;
    - "FL DL S530 4607 5123 0";
    - "Maria Fakename 12345-6789", read as a ZIP+4 because any capitalised word counts as a city (lines 297 and 313 to 315);
    - "DOB: January second nineteen seventy".
  - The helper also found hex with no 0x in front, a lower-case passport letter, digit runs over 19, and other languages carried (lines 287 to 395).
- Not a leak under the stop rule: the tick is the first layer, and it held 6,026 of 6,026. But the sentence is untrue, and it may make Jorge trust a wrong tick.

**Flaw 2. A queued item says the packet is ready when the button is switched off. Class: mislead.**
- File: VTES-LLM-LAUNCHER_v5.html line 228 (the status text) and line 119 ("now one click each").
- Re-checked by me: after "Send to RAMBO" the status says "Packet ready for RAMBO. Press Copy packet and open." But Copy packet and open is disabled, and the packet box shows "NOT ALLOWED YET".
- 5 of 6 queued items need a tick first (helper run). Only the LOCAL one does not.

**Flaw 3. The Read me says "Everything from v3 is still here except one link". Class: mislead.**
- File: package/vtes5-ui.js line 234.
- Helper run: 43 v3 texts were changed or removed, each with a documented reason. Examples:
  - the AirDrop and Notes steps;
  - the Windows Terminal codex line;
  - the typed "runs every 2 minutes" sentences;
  - the old LLM-02 session link.
- The cards and buttons survive. The sentence does not match.

**Flaw 4. Once the PC sets up the one-click shortcuts, four desktop cards say two opposite things. Class: mislead (contradiction).**
- File: package/vtes5-ui.js line 107 (the link) and line 129 (the sentence).
- My run, with shortcuts registered and address entries filled: LLM-01, LLM-03, LLM-05 and LLM-06 each show "Open ... with one click (a shortcut the PC set up)". Right below it they say "A web page cannot open a desktop app, so there is no Open button."
- LLM-05 then says "Open Claude iPhone with one click" on the PC, which this page cannot know works.
- The shipped data has no shortcuts, so today the cards are consistent. The contradiction appears the day the desktop executor finishes that job.

**Flaws 5 to 10. Small wording errors in VERIFY and the documents. Class: mislead (wording; each still fails safe).**
5. VERIFY-v5.ps1 line 11 says a wrong switch or a missing path exits with code 2. Re-checked: both exit with code 1. A relative path does give 2.
6. VERIFY-v5.ps1 lines 334 and 353 say a linked folder is "not followed". Helper run: it reads the files behind the link and prints "11 of 11 package files are identical" under PROBLEMS. The answer is still PROBLEMS.
7. INSTALL-BY-HAND.md line 22 promises the words "BAD DATA FILE ... saved as UTF-16". On day one VERIFY prints "EDITED ... It is also not a valid data file: ... saved as UTF-16" (helper run). It is still PROBLEMS.
8. INSTALL-BY-HAND.md line 9 still says "VERIFY now says OK when only the eight data and settings files changed". That was round 6; today it is PROBLEMS (helper run, scenario 003).
9. DATA-CONTRACT.md line 30 says the data files are "Pure ASCII". VERIFY accepts a data file holding "café" under -AfterWriters (helper run).
10. INSTALL-BY-HAND.md line 21 says `git fetch` "only updates the checkout's list of remote branches". It also writes objects into the checkout's .git folder. No working file and no branch changes.

**Flaw 11. Step 6d can overwrite an existing VERIFY-v5.ps1. Class: damage (install-step gap; needs a PC to happen).**
- File: INSTALL-BY-HAND.md line 24.
- Step 6d saves VERIFY-v5.ps1 into the parent folder `G:\My Drive\MY-DESK\VTES-PANEL\`, which already exists. Nothing says what to do if a VERIFY-v5.ps1 is already there.
- A literal executor overwrites it. The charter says to move an old version to `_Superseded` first.

## Section C - Edge cases (documented limits, not failures under the stop rule)

1. **The local-folder name check still passes cloud folders.** My run and a helper run: the LOCAL save line turns green CONFIRMED for these labels:
   - `C:\Users\JV\Box\...`, `pCloud Drive`, `MEGAsync`, `Nextcloud`;
   - `C:\Users\JV\AppData\Local\Google\DriveFS\...`;
   - the short name `C:\Users\JV\ONEDRI~1\...`.
   File: vtes5-ui.js lines 12 to 16. It is a deny list on C:\, not the "allow rule" FIX-ROUND-7 describes. It needs the desktop executor to write a wrong label.
2. **A Miami-Dade source with id "101" turns source 01 green.** Also, when the same id is listed twice, the last row wins: "01 PROOF NOT OK" followed by "1 proof ok" shows green. File: vtes5-ui.js line 523. Needs a faulty writer.
3. **A `__proto__` key is not ignored inside an object.** A health file whose good values sit under `"__proto__"` shows green, but FIX-ROUND-7 says `__proto__` keys are ignored. File: vtes5-live.js line 29 reads inherited values. Needs a strange writer; the values are in the file.
4. **A time with no zone is accepted.** `"at": "2026-10-06T13:59:00"` is green, read as the browser's own zone. The contract requires a zone. On the PC this is Eastern, so the answer would be right.
5. **The guard is slow on long notes.** A 20,000-character note took 675 ms in my run and up to 3.5 s in a busy helper run. Notes over 20,000 characters are refused at once.
6. **After a LOCAL packet is shown, a refused button leaves it in the packet box.** The packet is headed "-> LOCAL", and only a hand copy takes it out (helper run; vtes5-ui.js line 166).
7. **The top RAMBO button stays off after the tick when To is not RAMBO.** This is documented as KNOWN-LIMITS item 52 (helper run).
8. **Search finds words a card no longer shows** ("hourly", "2 minutes"), on purpose (flaw 20 fix). Also, "airdrop" no longer finds LLM-05 and "gemini.md" no longer finds LLM-08 (helper run; vtes5-ui.js line 631).
9. **Large browser text on phones:** the corner PANEL / INDEX box covers one footer line, because the 96 px padding is fixed and the box grows to 108 to 129 px (helper run).
10. **Large browser text at 360 x 640:** the RAMBO button starts at 645 px, just below the first screen. At 390 x 844 the corner box covers 42% of it, but its centre can still be clicked (helper run).
11. **Large browser text at 1920 x 1080:** the tab bar is 424 px, 39% of the screen (helper run).
12. **The tick box itself is 26 x 26 px,** under the 44 x 44 phone guidance. Its label is the larger tap target, 77 to 100 px tall on phones (helper run). Its screen-reader name is right.
13. **A hard link from the install to a file on the Desktop, or in the git checkout, gives OK** (helper run). Making one needs `mklink /H` on the PC.
14. **A file name holding a new line can print a fake "OK:" line under PROBLEMS.** Linux only: Windows forbids such names (helper run).
15. **Under -AfterWriters, the settings file may name a network share.** `status_dir_url` set to `file://other-pc/share/` passes, and the page would then load a script from it (vtes5-live.js lines 371 to 381; helper run). Needs a wrong writer and the -AfterWriters switch.
16. **The strict shape check does not check field types.** This is documented in KNOWN-LIMITS (helper run).
17. **Without -ExpectManifestSha256, a doctored manifest passes.** This is documented in KNOWN-LIMITS item 27 (helper run).
18. **INSTALL-BY-HAND.md line 22 names the data files without `data/`.** A literal `git show` of `package/vtes5-heartbeat.js` fails with "does not exist". That fails safe (helper run).
19. **A data file is code.** One that clears every timer can stop the watchdog too. VERIFY's day-one exact check and the -AfterWriters shape check are the defence (my run).
20. **Two sentences are too long to listen to.** Read me item 8 is 44 words; the Grok typed note is 43 words.
21. **v3's own card text keeps words Jorge may not know:** CLI, API, "the bus", headless, PII. They come from his v3 page, which he called "my house".

## Section D - The 25 CHECK-8 flaws, re-checked

1. Freeze with stale green: **FIXED** (Section A items 1 and 2).
2. 14 SSN and card spellings carried: **FIXED** as a leak, by the tick (6,026 of 6,026 blocked unticked). The guard still misses spellings (flaw 1).
3. Other personal data passes: **PARTIAL**, now honestly disclosed on the page. The guard's own claims are too wide (flaw 1).
4. VERIFY OK for a botched install: **FIXED** (helper run; UTF-16, 0 bytes, 200 MB and injected code are all PROBLEMS).
5. Stale Miami-Dade count shown plain: **FIXED** (vtes5-ui.js line 529; the stale world is red).
6. LOCAL says BLOCKED and CONFIRMED: **FIXED**. My run with a confirmed folder: 0 BLOCKED sentences on the LOCAL card or in the LOCAL status.
7. Read me says every button survived: **PARTIAL**. The new sentence is still untrue (flaw 3).
8. Documents count 11 and list 12: **FIXED**. One stale round-6 sentence remains (flaw 8).
9. Manifest as a link: **FIXED** (helper run).
10. Document quote does not match: **FIXED**. PORT-REPORT edit 22 now quotes vtes5-ui.js line 147 word for word.
11. Local-folder name check easy to pass: **PARTIAL** (edge 1).
12. A data file changes the clock: **FIXED**. VTES5_NOW is gone from the code.
13. Jargon: **PARTIAL**. The new words are plain; v3's own words remain (edge 21).
14. Grey worded NOT FINE: **FIXED** (vtes5-ui.js line 555 says NOT PROVEN).
15. Ordinary notes blocked: **FIXED**. 45 of 46 carried after the tick; the 1 is a disclosed false alarm (helper run).
16. Pipe hang: **FIXED**. 17. Case duplicates: **FIXED**. 18. MISSING for UNREACHABLE: **FIXED**. 19. Slow on huge files: **FIXED**, a 200 MB file is refused in under 3 s. (16 to 19 are all helper runs.)
20. "hourly": **FIXED** (helper run). There is a new small search edge (edge 8).
21. Hand-off lines point to the wrong place: **FIXED**.
22. Tall tab bar: **FIXED** at normal text size (helper run). It is tall with large text (edge 11).
23. Links say where they go: **FIXED**, 27 of 27 (helper run).
24. Corner box covers the footer: **PARTIAL**. Fixed at normal text size, not with large text (edge 9).
25. Browser text size: **PARTIAL**. It now works, but large text pushes the RAMBO button off a small phone's first screen (edge 10).

**Tally: FIXED 19, PARTIAL 6, NOT FIXED 0.**

**The five CHECK-6 partials:**
- N1 (green over red): FIXED.
- N2 (hung tasks): FIXED (my world bots:running-4h is red STUCK).
- N3 (stale numbers): FIXED.
- N10 (personal data): PARTIAL (flaw 1).
- F14 (jargon): PARTIAL (edge 21).

**Tally: FIXED 3, PARTIAL 2.**

## Section E - Methods and counts, N of N

1. **Type-fuzz (my run):** 22 bad values for each of 79 fields of the 7 data files, 1,738 cases. The values were: an object, an array, [null], [{}], a string, a number, NaN, Infinity, -1, true, null, undefined, an empty string, a 2 MB string, a throwing getter, `__proto__` and constructor keys, injected HTML and script, right-to-left and zero-width text, 10,000 levels deep (object and array), circular, and 1,000,000 entries. Each case was run three ways: opened bad; opened green then made bad; then fixed, with recovery checked after 61 seconds. Result: PENDING.
2. **Hand-made worlds (my run): 152.**
   - Each of the 7 files: missing, a folder in its place, empty, syntax error, throwing at load, assigning then throwing, no wrapper, setting the whole data object to null, an array, a string, a proxy that throws, stale, future, a number time, and a time with no zone.
   - 47 meaning worlds: Miami-Dade ids, counts and proof dates; token reset, percent and entries; health counts; housekeeping; state; failed, disabled, extra, running, queued, late and too many bots; missing proof, down, empty and interval cases for windows; 10 local-folder labels; and a `__proto__` literal.
   - 0 colour-rule breaks, 0 missing frames, 0 missing v3 parts.
3. **Random worlds (my run):** 400, seeded (seed 9009), each with 1 to 4 random changes. 0 breaks. WHOLE PAGE was green in 4 of them, each judged correct by my own rules.
4. **Clock and watchdog (my run):** 12 of 12 checks pass (Section A, items 2 to 4).
5. **Privacy (helper run):**
   - 177 notes (131 personal-data spellings, 46 ordinary) x 50 routes x 3 tick modes = 26,550 cases.
   - Plus 4,056 From x To clicks and 25 tick attacks.
   - The guard's slowness was re-checked in my run.
6. **VERIFY (helper run):** PowerShell 7.4.6 for Linux.
   - The archive's SHA-256 is 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561, which matches the release's hashes.sha256.
   - 201 runs, whole fixture hashed before and after.
   - Write-command grep: 0 hits in code. VERIFY is ASCII, with 0 CR and 0 NUL.
   - Pinned hashes in INSTALL-BY-HAND.md are real: MANIFEST.sha256 is f7a8c3c2...16f7 and VERIFY-v5.ps1 is d94027fa...2134.
   - Re-checked by me: a fresh copy gives the single OK line with exit 0, UTF-16 gives PROBLEMS, and a wrong switch exits 1.
7. **Survival and window sizes (helper run):**
   - 22 setups: 13 window sizes from 360 x 640 to 1920 x 1080, 200% zoom, CSS zoom and 5 large-text sizes.
   - 19 of 22 pass every check.
   - 0 sideways scroll in all 22. All tabs are reachable in all 22. No text is under 14 px.
8. **Old test changes (part I):**
   - I read verify-r7-OLD-TEST-CHANGES.txt and FIX-ROUND-7 Section E. Each change follows from a new rule, and the no-tick case is covered by new tests.
   - One coverage loss is honestly disclosed. Unreadable files are now tested with dropped read rights, not as a different user.
   - I found no silent weakening.
9. **Install document (part H, helper run):**
   - No step puts files on the Desktop, switches the branch, pulls or deletes.
   - The git commands are exact, and the file count is 12 everywhere except one stale sentence (flaw 8).
   - Gaps are flaws 10 and 11 and edge 18.
10. The builder's own tests were not run, by order.

## Section F - UNVERIFIED here: the one-line PC check for RAMBO (never a task for Jorge)

1. **PowerShell 5.1:** run the day-one VERIFY line once on a fresh install and paste the single OK line.
2. **Junctions:** make a test junction loop under a scratch copy, run VERIFY, and say whether it stops within 60 seconds with LINK.
3. **Saving with your own tools:** after step 6, run `Get-FileHash` on all 12 files and compare them with MANIFEST.sha256.
4. **The parent folder:** before step 6d, run `Test-Path 'G:\My Drive\MY-DESK\VTES-PANEL\VERIFY-v5.ps1'`. If it says True, stop and report BLOCKED (flaw 11).
5. **The real browser:** open v5 at the usual size and say whether the blue RAMBO button is visible without scrolling.
6. **Dictation:** dictate a made-up number "one two three, four five, six seven eight nine" into the note box, and paste what appears.
7. **The local-only folder:** run `(Get-Item 'C:\VTES-LOCAL-ONLY').Attributes` and say which sync apps are installed (Box, pCloud, MEGA, Nextcloud) (edge 1).
8. **The scheduler code:** while CU-Inbox-Job-Watcher runs, `(Get-ScheduledTaskInfo -TaskName CU-Inbox-Job-Watcher).LastTaskResult` should print 267009.
9. **Is Google Drive a link?** Run `(Get-Item 'G:\My Drive').Attributes` and paste the answer.

## Section G - For the cloud keeper (charter end of session)

I changed only this file in the repository. OPEN-ITEMS.md and RECURRING-ISSUES.md are not updated. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-06: panel v5 CHECK-9 FAIL, small (4 page mislead, 6 wording, 1 install-step damage risk, 0 leak, 21 edge). The round-7 class fixes held: 0 freezes or green-over-red in the worlds run so far, the tick blocked 6,026 of 6,026, VERIFY exact. What recurs is words claiming more than the code does (the Read me twice, a queued status line, shortcut cards). Next fix should be a Tier 3 check that every Read me claim is tested."

Shall the builder fix these 11 before anything is installed? (yes/no)

TRK-2026-9910-B · CHECK-9 · v1 · 2026-10-06 · INTERIM · #VTES-control-panel #panel-v5 #independent-check
