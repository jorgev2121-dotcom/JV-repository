# CHECK-7 - third independent check of panel v5 (after fix round 5)

**OPUS 5.5 · PANEL V5 CHECKER 3** · ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-06. Configured model: Opus 5.5 (the serving model may differ).
Checked: branch `claude/panel-v5-port` at commit 0290517 (fix round 5, groups B and C). Briefs and CHECK-5 and CHECK-6 read from `origin/claude/chaude-code-max20-kp2o46`.
I did not build v5. I did not run or reuse the builder's tests. Every result below comes from my own scripts, data and fixtures (kept in my scratchpad, not committed, because this file is my only new file). Times in this file are Eastern unless marked.

## Section A - Verdict

**FAIL. I found 13 flaws. Of the 20 CHECK-6 flaws: 15 FIXED, 5 PARTIAL, 0 NOT FIXED. Of the 18 CHECK-5 flaws: 16 FIXED, 2 PARTIAL, 0 NOT FIXED. Of the nine brief defects: 7 FIXED, 2 PARTIAL, 0 NOT FIXED.**

The builder claimed 18 of 20 CHECK-6 flaws FIXED. We disagree on four: N1, N2, N3 and N10.

The four worst flaws:
1. **Green "heartbeat: OK" sits above 15 of 15 red window cards (flaw 1).** When the heartbeat file is fresh but every window reports "unknown", every card is red NO DATA and the strip is green. The same happens when only one window is reported (13 red cards) and when the chat windows have no proof (5 red cards). This is CHECK-6 flaw N1 again, for the heartbeat.
2. **The LOCAL steps put client personal data into Google Drive (flaw 2).** The LOCAL card says the data "never leaves the PC". Its steps say: save the packet as a file in `G:\My Drive\VTES-Inbox-LOCAL`. Google Drive for desktop uploads that file to Google's servers, where any Drive-connected assistant (Claude's Drive connector, Gemini) can read it.
3. **The personal-data guard misses most ways of writing a Social Security number (flaw 3).** It blocks "123-45-6789" and "Social Security Number: 123 45 6789". It does not block "123456789", which is what dictation tends to produce. In my test, that form and 10 others went into every packet for every Claude window, Codex and Grok: 335 of 335 routes each.
4. **A task stuck in the Windows "Queued" state shows calm blue forever (flaw 4).** A task due every 2 minutes, queued since Oct 3, shows blue "QUEUED". The strip shows grey, never red. This is the RI-002 pattern the hung-task rule was meant to end.

What is good, measured:
1. **The real v3 is safe.** In all 26 of my VERIFY scenarios, the SHA-256 of every file in the fake Desktop (holding the real v3 launcher), the whole fixture and the package source was identical before and after.
2. **No script in the package copies, moves, deletes or writes.** My grep found no such command in VERIFY-v5.ps1, the page, its scripts, its data files or the four documents. The page has no storage, no network call and no cookie.
3. **Nothing of v3 is lost.** 92 of 92 survival items are present and working, and 144 of 144 packet pairs match v3 word for word apart from the time stamp.
4. **The RAMBO paste button is on the first screen, and all 18 tabs can be reached,** in all 10 window sizes I measured, with the shipped data and with fresh data (20 of 20 runs).
5. **The Drive copy of v3 matches.** Drive reports 24,463 bytes for file 104sYoYpR0AzmrtMerxklubRx8Y6yAYFd. The start, middle and end of the Drive bytes match the repo copy, whose SHA-256 is 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3. I compared three samples, not every byte (the two earlier checkers compared every byte).
6. **The PowerShell archive hash matches the published release checksum.** That closes an item CHECK-5 and CHECK-6 left UNVERIFIED.

## Section B - The 13 flaws, worst first

Each flaw is classified as: **mislead** (can mislead the page), **damage** (can damage a file), **leak** (can leak personal data) or **edge** (edge case with a PC check).

**Flaw 1. Green heartbeat strip above red window cards.**
- Class: mislead.
- File: package/vtes5-live.js line 133. Only DOWN, STALE, BAD CLOCK and NOT OK count as unhealthy. A window shown as red NO DATA (state "unknown", a chat window with no proof, a proof 20 days old) counts as healthy. Windows missing from the file are not counted at all (line 131).
- My worlds, with every other file fresh and good:
  - Every window "unknown": the strip says green "OK - as of Oct 6, 1:59 PM EDT"; 15 of 15 cards are red.
  - Only LLM-01 reported: green strip; 13 of 15 cards red.
  - Chat windows with no proof: green strip; 5 of 15 cards red.
  - Grok's proof 20 days old: green strip; 2 cards red.
- This breaks DATA-CONTRACT.md's own rule for the strip: green only when no reported window is "down, stale or not trusted".

**Flaw 2. The LOCAL lane stores client personal data in the cloud.**
- Class: leak.
- Files: package/vtes5-ui.js line 38 (LOCAL step 3: "open Google Drive, open the folder VTES-Inbox-LOCAL ... press Ctrl+V and save"). The page's LOCAL card (VTES-LLM-LAUNCHER_v5.html line 151) says "all client personal data. Never leaves the PC", and its address is `G:\My Drive\VTES-Inbox-LOCAL`.
- The v3 address line was already in Google Drive. Fix round 5 turned it into a click-by-click instruction for client data.
- "G:\My Drive" is Google Drive for desktop. Files saved there are uploaded to Google.

**Flaw 3. The personal-data guard is easy to miss.**
- Class: leak.
- File: package/vtes5-ui.js line 190 (`PII_RE`).
- Method: 14 notes, each pressed through 369 routes (10 big copy buttons, the top RAMBO button, "Copy packet and open" and "Just show" for all 13 x 13 From and To pairs, 14 "Hand work here", 6 queued items, and LOCAL followed by RAMBO). That is 5,166 copy actions.
- Blocked from every non-LOCAL packet (0 of 335): "SSN 123-45-6789" and "Social Security Number: 123 45 6789".
- Carried into every non-LOCAL packet (335 of 335 each), including every Claude window, Codex and Grok:
  - "123456789" (nine digits, no word before it)
  - "SSN123-45-6789" (no space)
  - "ss# 123456789"
  - "S.S.N. 123456789"
  - "SSN 123-45-6789ext"
  - "123.45.6789" and "123 - 45 - 6789"
  - the number with en dashes, with non-breaking hyphens, or in full-width digits
  - a card number "4111 1111 1111 1111" with a date of birth and an address
- Control: a phone number and a folio were carried, as they should be.
- The builder discloses this (KNOWN-LIMITS 34). Disclosed is not fixed. The Codex steps (vtes5-ui.js lines 26 to 28) also tell Jorge to paste the Codex packet into the Claude Code tab.

**Flaw 4. Hung tasks that never turn red.**
- Class: mislead.
- File: package/vtes5-live.js line 305 (Queued) and line 317 (Running with no start time).
- World queued3d: a task due every 2 minutes, state Queued, last ran Oct 3. It shows blue "QUEUED - the scheduler says this task is queued to start (last ran Oct 3, 2:00 PM EDT)". The RAMBO card is blue, and the strip is grey.
- World hungRunningNoStart: state Running, code 267009, no last-run time. It shows blue "RUNNING NOW" forever.
- Both are disclosed (KNOWN-LIMITS 38 and 39). The hung case CHECK-6 named (Running with a start time) is fixed: it shows "RUNNING FOR 72 HOURS - CHECK".

**Flaw 5. VERIFY prints OK when the v5 folder is a link into the Desktop or into a git checkout.**
- Class: edge (Windows junctions and links). The real v3 is not touched, but files end up on the Desktop or in a checkout with no warning.
- File: VERIFY-v5.ps1 lines 122 to 129. The WRONG PLACE check reads the typed path only, and the folder itself is never checked for being a link.
- S12: the folder `G:\My Drive\MY-DESK\VTES-PANEL\v5link` is a link to `Desktop\v5`. Exit 0, "OK: all 11 of 11".
- S13b: the folder is a link into the git checkout's package. Exit 0, "OK: all 11 of 11".

**Flaw 6. Miami-Dade "proof checked" turns green for a check months old.**
- Class: mislead.
- File: package/vtes5-ui.js line 242. Only the whole file's age (7 days) is checked. A source's own check date is never read.
- World mdProofNoDate: source 01 with `proof_ok: true` and a check dated 2026-01-01 shows green "proof checked".
- DESKTOP-WORK.md line 31 promises green "only for sources re-checked in the last 7 days". DATA-CONTRACT.md file 7 has no field for the check date.

**Flaw 7. The token panel is green while it shows a reset time in the past.**
- Class: mislead.
- File: package/vtes5-ui.js line 210.
- World tokensResetPast: green "Reporting", with "Window resets: Oct 3, 2:00 PM EDT" (three days ago) shown as a plain value.

**Flaw 8. Old state numbers shown as plain values.**
- Class: mislead.
- File: package/vtes5-ui.js lines 221 and 230 (Health panel) and 234 (live repair rows). A state file that is STALE is still used.
- World stateStale (30 hours old): "Open items: 4. In progress: 2. Blocked: 1." and the money list are printed in plain bold. A red "STALE since Oct 5, 8:00 AM EDT" badge sits next to a green "Report" badge. The token panel prints "These numbers are old" in the same case; this panel does not.

**Flaw 9. A disabled-task code is worded as a failure.**
- Class: mislead (small).
- File: package/vtes5-live.js line 322.
- Code 267010 is the Windows scheduler's "task disabled" code. With state Ready it shows "FAILED - the last run ... ended with result code 267010". Red is right; the word is wrong.

**Flaw 10. "JOB-something.md" will be saved as "JOB-something.md.txt".**
- Class: edge (PC check).
- Files: package/vtes5-ui.js line 38 (LOCAL) and line 47 (RAMBO): "click New, click Text Document, name it JOB-something.md".
- With Windows' default setting (file name extensions hidden), that gives `JOB-something.md.txt`. A watcher for `JOB-*.md` never sees it, and nothing tells Jorge.

**Flaw 11. VERIFY can never say OK again once a PC writer runs, and the install steps then say "do not use the folder".**
- Class: mislead.
- DESKTOP-WORK.md line 20 says a written data file is reported as "EDITED (data file), which is expected".
- INSTALL-BY-HAND.md line 28 says any PROBLEMS line means "Do not use the folder ... report BLOCKED".
- My S06: one written data file gives exit 1 and PROBLEMS. A later check by RAMBO will either block the panel or teach RAMBO to ignore PROBLEMS.

**Flaw 12. The install steps do not say where the package and VERIFY come from on the PC.**
- Class: edge (PC check).
- File: INSTALL-BY-HAND.md line 16 ("in the repo checkout: panel-rebuild\v5\package"). VERIFY-v5.ps1 is not in the package, and step 9 does not say where it is.
- The package exists only on branch `claude/panel-v5-port`. Getting it means changing branches in the PC's checkout, a step that is not written down.
- The repo has no `.gitattributes`. Git for Windows by default turns LF line endings into CRLF on checkout. My S19 (all package files with CRLF): "MANIFEST CHANGED" plus 11 EDITED, 0 of 11 identical. The install would be BLOCKED for a reason RAMBO cannot see.

**Flaw 13. A wrong cross-reference.**
- Class: mislead (documents).
- File: KNOWN-LIMITS.md line 6 says the Desktop shortcut is "DESKTOP-WORK item 9". It is item 10. Item 9 is the LOCAL helper.

## Section C - The 20 CHECK-6 flaws, re-checked

1. **N1, green strip over bad content: PARTIAL.** The bots part is fixed: all six bots failing gives a red "bots" entry. The heartbeat part is not (my flaw 1).
2. **N2, hung task shown blue forever: PARTIAL.** Running for 3 days with a start time gives "RUNNING FOR 72 HOURS - CHECK", stuck colour, red strip. Queued, or Running with no start time, stays blue forever (flaw 4).
3. **N3, stale or impossible content green: PARTIAL.** Health 30 hours old is red, a future file is red BAD CLOCK, and CHECK-6's impossible numbers are red. Still green or plain: the token reset time in the past (flaw 7), an old per-source Miami-Dade check (flaw 6), and old state numbers (flaw 8).
4. **N4, undo could delete the Desktop: FIXED.** There is no undo command anywhere (my grep).
5. **N5, install through a link: FIXED for the install** (no install command). VERIFY's new WRONG PLACE check misses links (flaw 5).
6. **N6, undo deletes edited files: FIXED.** No delete exists.
7. **N7, install says success after copying nothing: FIXED.** VERIFY says OK only with 11 of 11 files present and identical (S01, S02, S20); missing, edited and extra files are listed (S03 to S05).
8. **N8, half-delete with a hidden file: FIXED.** No delete exists. A hidden `desktop.ini` is listed as EXTRA FILE (S05).
9. **N9, undo through a link: FIXED.** No delete exists.
10. **N10, LOCAL routes personal data through Claude: PARTIAL.** The LOCAL steps no longer say to press the RAMBO button, and LOCAL followed by RAMBO no longer carries the obvious number. But the guard misses most forms (flaw 3), and the LOCAL steps now save the data to Google Drive (flaw 2).
11. **N11, tabs hidden on laptops: FIXED in headless Chromium.** 18 of 18 tabs reachable at every size I measured. See Section F.
12. **N12, small OLD labels: FIXED.** No text containing "OLD" is under 14 px.
13. **N13, Grok claim the page cannot know: FIXED.** It is now a live sentence plus a dated typed note.
14. **N14, one sentence, two answers: FIXED.** For example: "The window is up ..., but its bot CU-Inbox-Job-Watcher is NOT FINE: DISABLED".
15. **N15, a label claimed "Eastern time": FIXED.** The row now says the note gives no time zone.
16. **N16, Codex steps out of order: FIXED.** Step 1 is "First time only: ... sign in".
17. **N17, Queued shown red NO DATA: FIXED.** It is blue QUEUED. But it never times out (flaw 4).
18. **N18, VERIFY claimed "Nothing was written anywhere": FIXED.** It now says "This script contains no write command".
19. **N19, ".." in the path gave scrambled output: FIXED.** My S15 gives exit 2 with one plain sentence.
20. **F14, technical commands handed to Jorge: PARTIAL.** "Get-ScheduledTask" and "type codex" are gone. `codex exec "<task>"` and `Second-Opinion.ps1 -Prompt "<question>"` still print, labelled "the desktop executor (RAMBO) runs it, you type nothing".

**Tally: FIXED 15, PARTIAL 5 (N1, N2, N3, N10, F14), NOT FIXED 0.**

## Section D - The 18 CHECK-5 flaws, re-checked

1. F1, installer could put v5 on the Desktop: FIXED (no installer). VERIFY's link gap is my flaw 5.
2. F2, a running task shown as FAILED: FIXED. 267009 is blue RUNNING NOW, and 267011 is grey NOT YET RUN.
3. F3, green on reports that say the opposite: PARTIAL (flaws 1, 6, 7).
4. F4, rollback deleted edited files: FIXED (no rollback).
5. F5, RAMBO button below the first screen: FIXED (Section F).
6. F6, one card, two answers: FIXED (one line, the worse colour).
7. F7, a bot's interval: FIXED. A daily bot that last ran 20 hours ago is green; at 40 hours it is red LATE.
8. F8, stub overwrite: FIXED (no such code).
9. F9, small OLD label: FIXED (14 px or more).
10. F10, noisier search: FIXED. 28 of my 30 search words give the same cards as v3. "typed" and "hourly" differ, for stated reasons.
11. F11, unreadable called identical: FIXED. An unreadable file is UNREADABLE (S22). An unreadable manifest gives CANNOT CHECK (S23). An unreadable folder lists its files as MISSING (S24).
12. F12, Codex opened chatgpt.com: FIXED. 0 links to chatgpt.com, and "Copy packet and open" for LLM-06 opens nothing.
13. F13, AirDrop: FIXED. The word is not on the page.
14. F14, technical commands: PARTIAL (as in Section C item 20).
15. F15, times with no zone: FIXED. The only clock time with no zone is repair row 10, and it is labelled.
16. F16, documents disagree on counts: FIXED for the totals. The nine result files add up to 1067 as stated. My flaw 13 is a different mismatch.
17. F17, unlabelled footer claim: FIXED.
18. F18, unlisted text change: FIXED. My survival diff found no change missing from the builder's list.

**Tally: FIXED 16, PARTIAL 2 (F3, F14), NOT FIXED 0.**

## Section E - The nine brief defects

1. RAMBO has no Open button: **FIXED.** The big top button and 10 card buttons copy the right packet with the steps.
2. vtes:// shown as plain text: **FIXED.** Registered with LLM-01 filled gives exactly one link, vtes://llm-01. A heartbeat 30 minutes old gives 0 links. The shipped data gives 0 links.
3. PANEL, INDEX and 10 tabs go to the stale snapshot: **FIXED.** All 12 are labelled OLD at 14 px or more, and all can be reached.
4. LLM-02 hard-coded session: **FIXED.** It opens https://claude.ai/code.
5. Typed timings: **FIXED.** Only repair row 10 keeps "7:00 AM daily", because the brief says keep every row, and it is labelled.
6. Bots have no state: **PARTIAL** (flaw 4).
7. Typed text shown as live: **PARTIAL.** Three typed claims are still unlabelled (KNOWN-LIMITS 31), for example "No inbound channel exists."
8. Repairs log hand-maintained: **FIXED.** All 12 rows are kept, the OPEN mark is kept, and the log is labelled TYPED LOG.
9. Stamps with no zone: **FIXED.** The packet stamp ends "Oct 6, 2:00 PM EDT".

## Section F - My counts, N of N, and my methods

1. **Survival: 92 of 92 items present and working. 64 identical, 27 changed for a stated reason, 1 label reworded (disclosed), 0 lost.**
   - Method: my script opens the real v3 and v5 side by side. It reads every item from v3's own lists at run time (LLMS, ROLES, BOTS, QUEUED, PICK, TABS, WIN) and from v3's page, then finds and presses the same item in v5.
   - One item per card, bot, queued item, picker row, tab, repair row and corner button. Plus one item each for the 144 packet pairs, the stamp, the search box, the 30 search words, the 7 parts of the hand-off form, 12 "Copy packet and open", "Just show" and page errors.
2. **Packet pairs: 144 of 144 identical** apart from the time stamp (every From and To pair of v3's 12 windows).
3. **Privacy: 14 notes x 369 routes = 5,166 copy actions.** 2 notes blocked everywhere they should be. 11 forms of a fake Social Security number and 1 card number carried in 335 of 335 non-LOCAL routes each. 1 control note carried correctly.
4. **Data worlds: 22. 12 behave correctly. 10 show flaws:** flaw 1 (4 worlds), flaw 4 (2), flaw 6 (1), flaw 7 (1), flaw 8 (1), flaw 9 (1). With the shipped data there are 0 green marks.
5. **Window sizes: 10 sizes x 2 data sets = 20 runs. 20 of 20 pass.**
   - RAMBO button, top to bottom edge, against the visible height:
     - 1366 x 657: 210 to 253 of 657.
     - 1280 x 609: 210 to 253 of 609.
     - 1280 x 720: 210 to 253 of 720.
     - 390 x 844: 282 to 371 of 844.
     - 1536 x 730: 351 to 398 of 730.
   - Also passed: 1440 x 789, 1920 x 969, 1024 x 600, 360 x 640 and 800 x 600.
   - The button's centre is hit-testable in every run.
   - All 18 tabs can be brought fully into view in every run. Tabs visible before scrolling: 9 at 1366, 3 on a phone, 18 at 1536 and wider. The hint line shows whenever tabs are hidden. The page never scrolls sideways.
6. **Memory: 8 simulated hours, data rewritten every 10 simulated minutes.**
   - Heap went from 1.02 to 1.28 MB. Page elements stayed at 736, and script tags at 12.
   - Typed text, the To choice (LLM-07) and a text selection inside a card were all kept every hour.
   - Pressing F5 to reload the page loses typed text, as it did in v3. The page stores nothing.
7. **VERIFY under PowerShell 7.4.6 for Linux: 26 scenarios.**
   - The archive was downloaded from the PowerShell GitHub release into my scratchpad. Its SHA-256, 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561, matches the release's own hashes.sha256.
   - The fake Desktop holds the real v3 launcher, a stand-in home page, a shortcut and a subfolder.
   - Before and after every scenario, I took the SHA-256 of every file, plus every path, type, mode and link target, in three places: the whole fixture, the Desktop and the package source. **All three were identical in 26 of 26 scenarios.**
   - 24 of 26 gave the right answer. The 2 that did not are S12 and S13b (flaw 5).
   - The scenarios that gave the right answer:
     - clean, and with a trailing slash
     - an edited page, a missing file, a hidden extra file, a written data file
     - a wrong expected hash
     - a doctored manifest: OK without the expected hash, as disclosed in KNOWN-LIMITS 27; caught with it
     - inside the Desktop, the OneDrive Desktop, a lower-case "desktop" and the git checkout
     - a parent folder that is a link into git
     - a short name, a path with "..", an empty folder, a missing folder
     - a file that is a link to v3
     - CRLF line endings, and a name with spaces, brackets, # and %
     - three unreadable cases run as the user "nobody"
   - PowerShell itself rewrote its own cache in the home folder, outside every checked folder (as CHECK-6 found).
8. **Write commands:** 0 found in VERIFY-v5.ps1, the 4 package scripts, the page, the 7 data files, INSTALL-BY-HAND.md, DESKTOP-WORK.md, KNOWN-LIMITS.md and DATA-CONTRACT.md.
   - Searched for: Copy-Item, Move-Item, Remove-Item, Rename-Item, New-Item, Set-Content, Add-Content, Out-File, Tee-Object, WriteAll, copy, xcopy, robocopy, del, rmdir, rm, mv, Start-Process, registry and scheduler cmdlets, and > or >> redirects.
   - VERIFY's only object creation is an in-memory list and a read-only file stream.
   - VERIFY-v5.ps1 has 0 non-ASCII bytes.
9. **The builder's 1067 tests and 18 deliberate breaks were not re-run,** by order. The nine result files do add up to 1067.

## Section G - Survival diff, every v3 item

1. LLM-01 Claude Code Desktop: present and working. "Runs every 2 minutes and" removed (defect 5). Copy button for RAMBO added.
2. LLM-02 Claude Code Cloud: present. Opens claude.ai/code instead of one old session (defect 4).
3. LLM-03 Claude Cowork: identical. Copy button added.
4. LLM-04 Claude Chat: identical.
5. LLM-05 Claude iPhone: present. The AirDrop "how" line was replaced (F13). Copy button added.
6. LLM-06 Codex CLI: present. The chatgpt.com link was removed (F12), and the "how" line was rewritten (F14).
7. LLM-07 Grok: identical. A live Grok sentence and a dated typed note were added.
8. LLM-08 Gemini: identical.
9. LLM-09 Thin API router: identical.
10. Role LOCAL: identical text. Copy button and new steps added (see flaws 2 and 10).
11. Role CODEX: "Proven 2026-10-01." moved into a labelled typed note.
12. Role CLAUDE / RAMBO: the 75% quota sentence moved into a labelled typed note.
13. Role GROK: identical text. "Hand work here" now works; in v3 it set nothing.
14. Role COWORK: identical text. Copy button and "Hand work here" (to LLM-03) added.
15. Role CHIEF: "Runs every 2 minutes" removed (defect 5). No button, as in v3.
16. Bot CU-Inbox-Job-Watcher: identical, and a live line was added.
17. Bot CU-Local-Executor: ", every 5 minutes" removed.
18. Bot CU-TokenMonitor-Hourly: identical.
19. Bot CU-Orchestrator: "Every 15 minutes." removed.
20. Bot CU-Propagation-Check: "Hourly." removed.
21. Bot VTES-LOCAL-POLLER: "15-minute" removed.
22. to 26. Queued items 1 to 5: identical. Each fills To, From, the note and the status exactly as v3 does.
27. Queued item 6: "in the last 15 minutes" became "on its last scheduled run" (disclosed).
28. to 36. Picker rows 1 to 9: identical To and suggestion line.
37. to 41. Tabs LLMS, EXECUTORS, BOTS, HAND OFF and QUEUED: identical, and each target exists.
42. Tab STATUS: now goes to #livestatus instead of #status. Both targets exist.
43. to 52. Tabs APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS and RULES: same address, now labelled OLD PANEL.
53. Tab REPAIRS: identical. The MIAMI-DADE tab was added and works.
54. Packet text: 144 of 144 pairs identical apart from the stamp.
55. Packet stamp: now Eastern with the zone (defect 9).
56. to 64. Repair rows 1 to 9: identical.
65. Repair row 10: identical text, plus the no-zone label.
66. and 67. Repair rows 11 and 12: identical. Row 12 is still marked OPEN.
68. PANEL corner button: same address, labelled OLD, 14 px.
69. INDEX corner button: same address, labelled OLD, 14 px.
70. Search box: same type and placeholder, and it gets focus on load.
71. Search results: 28 of 30 words give the same cards. "typed" and "hourly" differ, for stated reasons.
72. to 78. Hand-off form, 7 parts:
    - The defaults (kind, From LLM-04, To, suggestion line) and the personal-data warning line are identical.
    - The buttons are identical.
    - The label "editable before pasting" became "read only" (disclosed).
    - The To list keeps all 12 v3 entries and adds GROK.
79. to 90. "Copy packet and open", the 12 To entries of v3:
    - 6 are identical.
    - 6 differ for stated reasons: LLM-02, LLM-05, LLM-06, LOCAL, CODEX and RAMBO.
91. "Just show the packet": identical.
92. Page errors after all of the above: 0.

## Section H - The INSTALL-BY-HAND.md question

1. **Could it lead RAMBO to put files on the Desktop?** Not as written: every path must start with `G:\My Drive\MY-DESK\VTES-PANEL\`. Whether "MY-DESK" is itself a synced or redirected Desktop is UNVERIFIED (PC check 4). If the target turns out to be a link into the Desktop, VERIFY still says OK (flaw 5).
2. **Could it lead RAMBO into a git checkout?** The package source is in one (step 6), and getting this branch onto the PC is not written down (flaw 12).
3. **Could it lead RAMBO to delete something?** No. Every step says do not delete, and deleting the v5 folder needs Jorge's yes.
4. **Two gaps:** a later VERIFY run blocks the panel (flaw 11), and the steps do not say where VERIFY-v5.ps1 is (flaw 12).

## Section I - UNVERIFIED, with the exact PC check for each

1. **Real browser, first screen and tab bar.** PC check: open v5 at the usual window size without scrolling. Say whether the blue "Copy packet for RAMBO" button and the amber hint line under the tabs are visible.
2. **Windows result codes and states.** PC check: while CU-Inbox-Job-Watcher runs, `(Get-ScheduledTaskInfo -TaskName CU-Inbox-Job-Watcher).LastTaskResult` prints 267009. Also check whether any task has ever shown the state Queued.
3. **Line endings in the PC checkout (flaw 12).** PC check: in `C:\Users\JV\JV-repository`, run `git config core.autocrlf`. If it prints true, the package will fail VERIFY after checkout.
4. **What "MY-DESK" is.** PC check: in File Explorer, right-click `G:\My Drive\MY-DESK`, choose Properties. Say whether it is a normal folder, or a shortcut or link to the Desktop.
5. **Junctions under Windows PowerShell 5.1 (flaw 5).** PC check: `New-Item -ItemType Junction` a test folder under VTES-PANEL pointing to a scratch folder on the Desktop that holds a copy of the package, then run VERIFY on it. If it prints OK, flaw 5 is real on the PC.
6. **File name extensions (flaw 10).** PC check: in File Explorer, View, Show, is "File name extensions" ticked? If not, "New Text Document" named JOB-x.md is saved as JOB-x.md.txt.
7. **Google Drive sync of VTES-Inbox-LOCAL (flaw 2).** PC check: right-click `G:\My Drive\VTES-Inbox-LOCAL` and say whether Drive shows it as synced. If it does, any file in it is in Google's cloud.
8. **The real clipboard.** PC check: press the RAMBO button and paste into Notepad. The first line must end in EDT.
9. **Click paths (green D icon, orange X icon, "Codex - sign in (Jorge)" shortcut).** PC check: follow each card's steps once, and name any step that does not match the screen.
10. **The Drive bytes of v3.** I compared size and three samples, not every byte. PC check: none needed if the keeper accepts the two earlier full byte matches.

## Section J - For the cloud keeper (charter end of session)

I touched no file but this one, so OPEN-ITEMS.md and RECURRING-ISSUES.md are not updated. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-06: panel v5 CHECK-7 FAIL (13 flaws). The scripts are gone and the real v3 stayed identical in 26 of 26 VERIFY runs, but green-means-good recurred a fourth time (green heartbeat strip over 15 red cards; a task queued for 3 days stays blue). Client personal data: the guard catches 2 of 13 forms, and the LOCAL steps save it into Google Drive."

Jorge, shall the builder fix these 13 flaws before anything is installed? (yes/no)

TRK-2026-9910-B · CHECK-7 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5 #independent-check
