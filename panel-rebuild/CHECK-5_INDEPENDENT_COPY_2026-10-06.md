# CHECK-5 - independent check of panel v5 (port onto Jorge's real v3 launcher)

OPUS 5.5 · PANEL V5 CHECKER · ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-06. Configured model: Opus 5.5.
Checked: branch `claude/panel-v5-port` at commit d5a8e39 (the builder's last commit). Briefs read from `origin/claude/chaude-code-max20-kp2o46`.
I did not build v5. I did not run or reuse the builder's tests. Every result below comes from my own scripts. They are kept in my scratchpad, not committed, because this file is my only new file.

## Section A - Verdict

**FAIL. I found 18 flaws. Of the nine defects in the brief: 5 FIXED, 4 PARTIAL, 0 NOT FIXED.**

The good news, measured:
1. **The repo copy of the real launcher is byte-identical to the Drive file.** Both are 24,463 bytes with SHA-256 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3.
2. **Nothing of v3 is missing.** All 9 LLM cards, 6 role cards, 6 bots, 6 queued items, 9 picker rows, 17 tabs, 12 repair rows, PANEL, INDEX, the search box and the hand-off form are present and work. Every one of the 144 From-and-To packet pairs matches v3 word for word, apart from the time stamp.
3. **The page stays honest with no data.** With the shipped data files there are 0 green lights and 0 vtes:// links. Memory stayed flat over 10 simulated hours (600 reloads). Typed text, the To choice and a selection inside a card all survived 6 simulated hours of live data.

The four worst flaws:
1. **The installer can put v5 on the Desktop.** If -TargetDir is a short name, not a full path, PowerShell's current folder is ignored. The name is resolved against the folder the program was started from, so a window opened from the Desktop installs onto the Desktop (scenario S24). -V3File is optional, and without it nothing stops an install inside the Desktop (scenario S11). (F1.)
2. **A running bot shows in red as FAILED.** Windows reports result code 267009 while a task is still running, and 267011 when it has not run yet. The page calls both FAILED. The builder's own test treats 267009 as a failure. (F2.)
3. **Green lights on reports that say something went wrong.** The housekeeping report says "not delivered", yet its badge is green "Reported" and the strip shows OK. The Miami-Dade count is unknown, yet the badge is green "Counted". An empty token report shows green "Reporting". (F3.)
4. **On a normal 1366 x 768 laptop, the RAMBO paste button is not on the first screen.** Inside a browser window the button starts at pixel 707 of a 657-pixel view. "Read me first" says the button is "right under this list". (F5.)

## Section B - The nine defects in the port brief

Browser evidence comes from headless Chromium (/opt/pw-browsers/chromium), with the page opened from file://. The clock was fixed at Oct 6, 2026, 2:00 PM EDT unless stated otherwise, and outside links were blocked.

1. **RAMBO has no Open button. PARTIAL.**
   - Each of these 8 big "Copy packet for ..." buttons put the right packet on the clipboard (all six labels plus my test note) and showed the steps: LLM-01, LLM-03, LLM-05, LOCAL, CODEX, RAMBO, GROK and COWORK.
   - The top RAMBO button did the same. It also works with the keyboard: 2 Tab presses from the search box, then Enter.
   - Why PARTIAL: LLM-06 "Codex CLI" is a desktop terminal program, yet its card still has "Open Codex CLI", which opens chatgpt.com, and it has no copy button (F12).
   - Also, the top button is below the first screen on common laptops (F5).
2. **vtes:// shown as plain text. FIXED.**
   - Shipped data: 0 links. Registered with only LLM-01 filled: exactly one link (vtes://llm-01).
   - Registered but the heartbeat 30 minutes old: 0 links.
3. **PANEL, INDEX and 10 tabs go to the stale snapshot. FIXED** for the labelling.
   - All 12 say "OLD PANEL, snapshot of 2026-09-02, not live". The name a screen reader announces has a proper space.
   - The label is printed in 10-pixel type (F9).
4. **LLM-02 hard-coded session address. FIXED.** The Open button and "Copy packet and open" both open https://claude.ai/code. The old session address appears nowhere on the page.
5. **Contradictory typed timings. PARTIAL.**
   - The five typed intervals and the word "Hourly." are gone from the cards and bots.
   - The "Check-in interval" sentence reads "every 2 minutes" from my heartbeat file (interval_sec 120).
   - What remains on the page: repair row 10, "Burn-rate agent installed, runs 7:00 AM daily". It is a typed schedule with no time zone, and it conflicts with "Read me first" item 8 (F15). The brief asks for both "remove every typed interval" and "keep every row", so this needs the keeper's call.
6. **Bots have no state. PARTIAL.**
   - Each of the 6 bots has a live line: red NO DATA with no file, green with my fresh file.
   - But a running task shows as FAILED (F2). Two cards show green UP and red for their own bot at the same time (F6). A bot that runs daily can never be green, and the page breaks the contract's rule for that case (F7).
7. **Typed text shown as if live. PARTIAL** (the builder agrees). "Proven 2026-10-01" and the 75% quota note are now labelled typed notes. Still unlabelled, for example:
   - LLM-05: "Say "AP-0088: GO" from the car and it counts."
   - COWORK: "No inbound channel exists."
   - LLM-08: "Gemini CLI can run headless on the PC."
   - The footer: "your v3 file is untouched" (F17).
8. **Repairs log hand-maintained. FIXED.**
   - All 12 rows are word for word, and the OPEN row is still marked. The lead line says TYPED LOG.
   - Live rows appear only from the state file (my fixture row was shown); with no file they show NO DATA.
9. **Stamps without a zone. FIXED.**
   - The packet stamp reads "Oct 6, 2:00 PM EDT".
   - In winter, on a PC set to Pacific time, it reads "Jan 15, 9:00 AM EST".
   - For comparison, v3 printed "10/6/2026, 2:00:03 PM".

**Tally: FIXED 5 (defects 2, 3, 4, 8, 9). PARTIAL 4 (defects 1, 5, 6, 7). NOT FIXED 0.** The builder claimed 6 FIXED and 3 PARTIAL. We disagree on defects 1 and 5, and agree that 6 and 7 are PARTIAL. On defect 3 the builder said PARTIAL and I say FIXED for the labelling, with the tiny type counted separately as F9.

## Section C - Flaws, worst first

**F1. The installer can write into the folder that holds the real v3 launcher.**
- Files:
  - INSTALL-v5.ps1 line 86 uses `[IO.Path]::GetFullPath($TargetDir)`. A short name is resolved against the folder the program started in, not the folder set with Set-Location.
  - Lines 105 to 109 run the "not inside the v3 folder" check only when -V3File is given.
  - DESKTOP-WORK.md line 7 shows -V3File as optional (in brackets).
- S24: PowerShell started from the Desktop, `Set-Location Work`, then `INSTALL-v5.ps1 -TargetDir v5rel` with no -V3File. Exit 0. The new folder `Desktop/v5rel` holds 12 files, and the Desktop hash list changed.
- S11: `-TargetDir Desktop/VTES-PANEL-v5` with no -V3File. Exit 0, and the Desktop hash list changed.
- With -V3File the same moves are refused (S10, S12, S13, S23, S28).

**F2. A running task, or one that has not run yet, is shown in red as FAILED.**
- File: vtes5-live.js line 209 treats any result other than 0 as FAILED. Windows uses 267009 (0x41301) for "task is currently running" and 267011 (0x41303) for "task has not yet run".
- World W5: CU-Inbox-Job-Watcher with state Running and result 267009 gives "FAILED - the last run (Oct 6, 1:59 PM EDT) ended with result code 267009".
- The builder's TEST-REPORT.md line 31 and test-v5-worlds.js lines 122 to 124 assert this wrong behaviour as correct.
- CU-Inbox-Job-Watcher launches headless Claude runs that take minutes. While one runs, the page says it failed.

**F3. Green badges on reports that say the opposite, or say nothing.**
- Files:
  - vtes5-live.js line 76: any fresh file is "OK" (health is the only exception).
  - vtes5-ui.js lines 181 (housekeeping), 208 (Miami-Dade), 173 (tokens) and 213 (the strip).
- W2: housekeeping `report_delivered:false` gives a green "Reported - as of Oct 6, 1:55 PM EDT" next to a red "NO / UNKNOWN". DATA-CONTRACT.md says delivered=false shows red.
- W3: `counted:null` gives a green "Counted - as of ..." next to "Counted so far: unknown of 300".
- W4: a token file with only schema, at and writer gives a green "Reporting - as of ...", while every number says NO DATA.

**F4. A file edited after the install is deleted by the rollback with no warning and no copy.**
- File: ROLLBACK-v5.ps1 lines 67 and 76. The record holds no SHA-256 values, so the rollback cannot tell an edited file from an untouched one.
- S20: I appended an edit to VTES-LLM-LAUNCHER_v5.html and wrote real writer data into data/vtes5-heartbeat.js. The dry run and the rollback said nothing about the change and deleted both. There were 0 backups anywhere afterwards.
- The charter forbids silently replacing an old version.

**F5. The RAMBO paste button is not on the first screen of common laptops or phones.**
- Files: vtes5-ui.js line 237 opens "Read me first" by default, and line 238 places the button after it. vtes5.css lines 13 and 22 cover the taller tab bar.
- Measured, as the button's top pixel against the visible height:

| Window size (pixels) | Button top | Visible height | On first screen? |
|---|---|---|---|
| 1366 x 657 (a 1366 x 768 laptop with a browser bar) | 707 | 657 | No |
| 1280 x 720 | 764 | 720 | No |
| 1280 x 609 | 764 | 609 | No |
| 1366 x 768 (full screen) | 707 to 754 | 768 | Yes |
| 1920 x 969 | 599 | 969 | Yes |
| 390 x 844 (phone) | 1407 | 844 | No |

- On the phone the tab bar alone is 720 pixels tall.
- "Read me first" item 4 says "press the big blue RAMBO button right under this list".

**F6. One card, two answers.**
- File: vtes5-ui.js lines 83 and 84 put the window state and the bot line on the same role card without reconciling them.
- W7, CHIEF card: green "State of CHIEF: UP" and red "Bot CU-Orchestrator: DISABLED".
- W7, RAMBO card: green "State of LLM-01: UP" and red "Bot CU-Inbox-Job-Watcher: DISABLED".
- LOCAL card: green UP and red "Bot CU-Local-Executor: FAILED".

**F7. The contract and the page disagree on a bot's interval.**
- DATA-CONTRACT.md line 13 says a per-bot interval_sec outside 1 to 3600 "makes that whole file red NOT OK".
- vtes5-live.js line 202 makes only that one bot grey.
- W6: CU-Propagation-Check with interval_sec 86400 was grey "lateness cannot be judged", and the other 5 bots stayed green.
- A daily task can never be green under either rule.

**F8. One installer stamp overwrites another install's stub, and a rollback then removes the wrong stub.**
- File: INSTALL-v5.ps1 lines 18 and 166 to 169. The stub is named to the minute and written with WriteAllText, which overwrites. ROLLBACK-v5.ps1 line 77 then removes it.
- S22: two installs, a5 then b5, in the same minute with Undo_Manifests present. The a5 stub was overwritten and now points at b5. Rolling back a5 deleted the only stub, while b5 is still installed.
- This breaks INSTALL-v5.md's promise that it "never touches any other existing file".

**F9. The honest "OLD PANEL" label is in 10-pixel type.**
- File: vtes5.css line 22 (`.tab small{font-size:10px}`, tab text 13px).
- Jorge has dyslexia, and the label is the only warning on the tab.

**F10. Search got noisier.**
- Files: vtes5-ui.js lines 15 to 29 (every "What fixes it" sentence names RAMBO). The searched text now includes the state lines.
- Same query, v3 count against v5 count:

| Search word | v3 cards | v5 cards | What changed |
|---|---|---|---|
| "rambo" | 9 | 15 | Cowork, Chat, iPhone, Codex, Grok and Gemini now match |
| "bot" | 6 | 12 | 6 more cards match |
| "proven" | 1 | 3 | 2 more cards match |

**F11. INSTALL reports "identical" for a file it could not read.**
- File: INSTALL-v5.ps1 line 22 returns the word 'unreadable' as the hash, and line 179 compares 'unreadable' with 'unreadable'.
- S15b: one file in the v3 folder was unreadable to the installing user. The output said "v3 untouched: SHA256 of all 4 files in the v3 folder is identical before and after". That is proof the script never took.

**F12. A fake link: "Open Codex CLI" opens chatgpt.com.**
- File: the v5 page, LLM-06 entry in the LLMS array (`url:'https://chatgpt.com'`), and vtes5-ui.js line 69.
- Codex CLI is a terminal program on the PC. "Read me first" item 5 says desktop windows have a Copy button, not an Open button. This card has the opposite.

**F13. A step that cannot work on this PC.**
- File: vtes5-ui.js line 24, the iPhone step 1: "The packet stays on this PC. Send it to the iPhone with AirDrop or Notes."
- AirDrop does not exist on Windows. v3 had the words; v5 made them a numbered instruction.

**F14. Technical commands are handed to Jorge, against charter Rules 1 and 7.**
- File: vtes5-ui.js line 40 tells him: "On the PC, run Second-Opinion.ps1 -Prompt ...". Line 32 tells him to save "JOB-something.md ... with a CLASS: line and a PROMPT: line".
- Neither has click-by-click steps.

**F15. Times and schedules with no zone.**
- On the page: repair row 10, "runs 7:00 AM daily" (VTES-LLM-LAUNCHER_v5.html line 116). This contradicts "Read me first" item 8, "Every time is Eastern time with the zone".
- In the installer's own files: `STARTED|2026-10-06_0946` in the record, and `"at": "2026-10-06_0946"` in vtes5-config.js. Both come from INSTALL-v5.ps1 lines 18, 119 and 148.

**F16. The documents disagree about the PowerShell tests.**
- INSTALL-v5.md line 21: "73 PowerShell checks ... 19 scenario groups".
- TEST-REPORT.md and PORT-REPORT.md: 81 checks, 22 groups. The result file says 81.
- ROLLBACK-v5.md line 17 still says "S1 to S17".

**F17. Unlabelled typed claim in the footer.**
- File: build-v5.js line 24 writes "your v3 file is untouched and stays where it is as the rollback" into every page.
- The page cannot check this, and the claim is not labelled as typed.

**F18. "Nothing else differs" is not true.**
- The CODEX and GROK role addresses changed. v3 swallowed `<task>` and `<question>` as HTML, so it showed `codex exec ""`. v5 shows `codex exec "<task>"`.
- The change is an improvement, but it is missing from the list of 9 intentional edits (build-v5.js; PORT-REPORT.md line 8).

## Section D - Survival diff, every v3 item

Method: my script `survive.js` opens the REAL v3 (repo copy, byte-identical to Drive) and v5 side by side. It extracts every item from v3 at runtime, then finds and exercises the same item in v5. The shipped v5 data files were used.

Result: **181 checks. 160 identical. 21 different: 16 with a reason (14 stated by the builder, 2 not stated, F18), and 5 without a reason (F10).**

**LLM cards**
1. LLM-01 Claude Code Desktop: present and working. "Runs every 2 minutes" was removed (defect 5). The new copy button works.
2. LLM-02 Claude Code Cloud: present and working. Its Open button now goes to claude.ai/code (defect 4).
3. LLM-03 Claude Cowork: identical and working. The copy button was added.
4. LLM-04 Claude Chat: identical and working.
5. LLM-05 Claude iPhone: identical and working. The copy button was added (see F13).
6. LLM-06 Codex CLI: identical and working (see F12).
7. LLM-07 Grok: identical and working. A labelled Grok note was added.
8. LLM-08 Gemini: identical and working.
9. LLM-09 Thin API router: identical and working.

**Role cards**
10. LOCAL: identical and working. The copy button works.
11. CODEX: "Proven 2026-10-01" became a typed note (defect 7). The address now shows `<task>` (F18).
12. CLAUDE / RAMBO: the 75% sentence became a typed note (defect 7).
13. GROK: the address now shows `<question>` (F18). "Hand work here" now works; in v3 it threw a page error.
14. COWORK: identical. The copy button and "Hand work here" were added, and both go to LLM-03.
15. CHIEF: "Runs every 2 minutes" was removed (defect 5). It has no button, as in v3.

**Bots**
16. CU-Inbox-Job-Watcher: identical, and a live line was added.
17. CU-Local-Executor: "every 5 minutes" was removed (defect 5).
18. CU-TokenMonitor-Hourly: identical.
19. CU-Orchestrator: "Every 15 minutes." was removed (defect 5).
20. CU-Propagation-Check: "Hourly." was removed (defect 5).
21. VTES-LOCAL-POLLER: "15-minute" was removed (defect 5).

**Queued items**
22. to 26. Queued items 1 to 5: identical. Each button fills To, From, the note and the status exactly as in v3.
27. Queued item 6 (Orchestrator / Chief seat): "in the last 15 minutes" became "on its last scheduled run" (a disclosed edit).

**Picker rows**
28. to 36. Picker rows 1 to 9: identical. Each sets the same To value and suggestion as v3.

**Tabs**
37. to 42. LLMS, EXECUTORS, BOTS, HAND OFF and QUEUED (tabs 1 to 5) and REPAIRS (tab 17): identical, and each jumps to a section that exists.
43. STATUS: now jumps to the new "Live status" block instead of the empty #status anchor.
44. to 53. APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS and RULES (tabs 7 to 16): same address, now labelled OLD PANEL (see F9).
54. MIAMI-DADE: a new 18th tab, which works.

**Hand-off form and packet**
55. Packet text: 144 of 144 From-and-To pairs are identical apart from the stamp. WHO, TASK, HOW TO ANSWER, HARD RULES, FACTS LIVE IN and RETURN PATH are all kept.
56. "Copy packet and open", for 12 of 12 To entries: same status text, one copy each, and the same page opened. The one difference is LLM-02, which now opens claude.ai/code (defect 4).
57. "Just show the packet": identical.
58. Hand-off labels: one changed, "editable" became "read only" (D9, disclosed).
59. Hand-off defaults (kind 5, From LLM-04, To LLM-01, suggestion line) and the personal-data warning line: identical.
60. The To and From lists: 12 of 12 v3 entries are identical, and GROK was added.

**Repairs, corner buttons and search**
61. to 72. Repair rows 1 to 12: identical, and row 12 is still marked OPEN.
73. PANEL corner button: same address, labelled OLD.
74. INDEX corner button: same address, labelled OLD.
75. Search box: same placeholder and type, and it still gets focus on load. 21 queries were tried:
    - 14 give the same cards as v3.
    - "LLM-01" and "llm-07" each add one role card (understandable).
    - "HOURLY" and "every 15 minutes" lose a card because the typed text was removed (defect 5).
    - "rambo", "bot" and "proven" are noisier (F10).

## Section E - My counts, N of N

1. **Survival checks:** 181 in total, 160 identical. Method as in Section D.
2. **Controls on the v5 page:** my method counts every `a[href]`, `button`, `select`, `summary`, `input` and `textarea`, not de-duplicated.
   - Shipped data: **86**. That is 8 in-page tabs, 12 old-panel links, 5 Open links, 23 Drive links, 9 big copy buttons, 14 "Hand work here" buttons, 6 queued buttons, 2 hand-off buttons, 3 pick lists, 1 summary and 3 text fields.
   - With one vtes:// link registered: 87.
   - The builder counts 87 with 2 vtes:// links and 13 "Hand work here" buttons, because it de-duplicates COWORK's button with LLM-03's. That explains the gap; it is not a flaw.
   - v3 had 51 controls by my method.
3. **Data worlds:** 12 worlds, 21 checks, 12 pass, 9 flawed.
   - The flawed ones are F2 (2 checks), F3 (3), F6 (2), F7 (1) and the typed-interval and zone check (1).
   - My first regex for times without a zone over-matched. I re-checked by hand: the only time with no zone on the page is "runs 7:00 AM daily".
4. **Usability runs:** 6 window sizes, keyboard, screen-reader names, 9 copy buttons, the copy-failure path, and 6 hours of typed text and selection. The flaws are F5 and F9. The rest pass.
5. **Memory:** measured after forced garbage collection, over 10 simulated hours and 600 reloads.
   - Heap went from 0.95 MB at the start to 1.28 MB at hour 10.
   - Page elements stayed at 1,719 at both ends. There were 12 script tags at the start and 12 at the end.
6. **Miami-Dade:** all 22 proof ids match the index document "00 START HERE - Miami-Dade 22 sources" exactly, in the same order.
   - I opened the index and 3 proof files (SITE-01, SITE-04, SITE-22) by Drive metadata. All exist and are dated 2026-08-16, which matches the page's "typed note from 2026-08-16".
   - The other 19 were not opened one by one.
7. **PowerShell 7.4.6 for Linux:** downloaded from the PowerShell GitHub release into my scratchpad (archive SHA-256 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561).
   - I ran **30 scenarios**. In each one I took the SHA-256 of EVERY file in the fake Desktop holding the real v3, recursively, plus the folder list, before and after.
   - **The Desktop was identical in 27 of 30.** It changed in 3:
     - S11 and S24: v5 was installed inside the Desktop (F1).
     - S21: my test edited the v3 file on purpose. The rollback kept that edit, which is correct.
   - Other flaws: S20 (F4), S22 (F8) and S15b (F11).
   - Passed cleanly:
     - S01 single install
     - S02 double install (refused, first install unchanged)
     - S03 half-failed install (test hook)
     - S04 package file unreadable (refused)
     - S04b real failure part-way, at the stub step (rollback gave a clean folder)
     - S05 target already exists as a folder, S06 as a file
     - S07 target in a git checkout
     - S08 git checkout reached through a link
     - S09 target is the Desktop itself
     - S10, S12, S13 and S28 inside the Desktop, with -V3File
     - S14 no -TargetDir
     - S15 read-only parent folder
     - S16 spaces and brackets in the name
     - S17 rollback with no record
     - S18 rollback pointed at the Desktop
     - S19 rollback twice
     - S23 relative path with -V3File (refused)
     - S25 dry runs
     - S26 doctored record (refused)
     - S27 -V3File missing
   - The only fixture changes outside the Desktop were PowerShell's own cache files under the fake home folder, not the script.
8. **Byte check:** the Drive bytes equal the repo copy (cmp: identical, 24,463 bytes).

## Section F - UNVERIFIED, with the exact PC check for each

1. **Does the RAMBO button show on Jorge's first screen (F5)?** PC check: open v5 in the usual browser window, do not scroll, and say whether the blue "Copy packet for RAMBO" button is visible.
2. **The running-task code (F2).** PC check: while CU-Inbox-Job-Watcher runs, `(Get-ScheduledTaskInfo -TaskName CU-Inbox-Job-Watcher).LastTaskResult` must print 267009.
3. **Short-name -TargetDir under Windows PowerShell 5.1 (F1).** PC check: open PowerShell from the Desktop, `Set-Location C:\temp`, then `INSTALL-v5.ps1 -TargetDir v5test -DryRun`. If the "New folder" line names the Desktop, F1 is real on the PC.
4. **Windows PowerShell 5.1, junctions and subst drives.** Everything here ran on 7.4.6 for Linux. PC check: KNOWN-LIMITS items 4 and 5, as written.
5. **The real clipboard and Edge or Chrome.** PC check: press the RAMBO button, then paste into Notepad. The first line must end in EDT.
6. **The click paths (green D icon, orange X icon, Codex sign-in shortcut, Second-Opinion.ps1).** PC check: follow each card's steps once, and say which step does not match the screen.
7. **The 19 Miami-Dade proof files not opened one by one.** PC check: click each "open proof file" link once.
8. **The PowerShell archive hash** was recorded but not compared with a published checksum.

## Section G - For the cloud keeper (charter end of session)

I touched no file but this one, so OPEN-ITEMS.md and RECURRING-ISSUES.md are not updated. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-06: panel v5 independent check FAIL (18 flaws). Installer path checks recur: the git and link refusals now hold, but a short-name -TargetDir and the optional -V3File let v5 land on the Desktop."

Jorge, shall the builder fix F1 to F18 before anything is installed? (yes/no)

TRK-2026-9910-B · CHECK-5 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5 #independent-check
