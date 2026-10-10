# CHECK-6 - second independent check of panel v5 (after fix round 4)

OPUS 5.5 · PANEL V5 CHECKER 2 · ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-06. Configured model: Opus 5.5 (the serving model may differ).
Checked: branch `claude/panel-v5-port` at commit afe93eb (fix round 4, group C). Briefs read from `origin/claude/chaude-code-max20-kp2o46`.
I did not build v5. I did not run or reuse the builder's tests. Every result below comes from my own scripts, with my own data, clock and fixtures. The scripts are in my scratchpad (not committed, because this file is my only new file).

## Section A - Verdict

**FAIL. I found 20 flaws: 19 new ones, plus F14, which is still open. Of the 18 CHECK-5 flaws: 13 FIXED, 5 PARTIAL, 0 NOT FIXED. Of the nine brief defects: 5 FIXED, 4 PARTIAL, 0 NOT FIXED.**

The four worst flaws:
1. **The undo command can delete the whole Desktop, including the real v3 launcher (N4).** It checks only two things: the path is a full path, and the folder holds a file named MANIFEST.sha256 and a file named VTES-LLM-LAUNCHER_v5.html. In my test, a v5 page and its manifest had been saved on the fake Desktop. I then pointed the undo at the Desktop. It deleted everything there: v3, a shortcut and a subfolder, with exit code 0. Pointed at the package source in the git checkout, it deleted that too.
2. **The LOCAL card sends client personal data to Claude (N10).** LOCAL is the "private, never leaves the PC" lane. Its steps say: copy the packet, then press the blue RAMBO button. That button builds a new packet addressed to LLM-01 (Claude Code Desktop), with the same note. My test note held a made-up Social Security number. It went into the RAMBO packet. That breaks the page's own rule: "Client personal data goes to LOCAL only."
3. **A green "bots: OK" sits above six red FAILED bots (N1).** The strip at the top is green whenever the bots file is fresh, whatever it says. The heartbeat badge is the same: green "OK" while every window is DOWN. The data contract's own rule (line 7) says green needs "content says good".
4. **A task stuck for three days shows as "RUNNING NOW" in neutral blue (N2).** The fix for F2 never times out. That is RI-002 again: "a process in the task list is not a run making progress".

What is good, measured:
1. **The Drive copy of the real v3 is byte-identical to the repo copy.** I read it through the Drive connector: 24,463 bytes, SHA-256 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3.
2. **Nothing of v3 is missing.** 248 of 248 items are present and working. 221 are identical, and the other 27 differ, each for a stated reason. All 144 From-and-To packet pairs are identical apart from the time stamp.
3. **The RAMBO paste button is on the first screen** in all 11 window sizes I measured, including 1366 x 657, 1280 x 609, 1280 x 720 and 390 x 844.
4. **VERIFY-v5.ps1 is sound.** In all 22 of its runs, the SHA-256 of every file in the test area was identical before and after. Edited, missing, extra, unreadable, linked and malformed cases were each reported. None was ever called OK.

## Section B - The 18 CHECK-5 flaws, re-checked

Each flaw is classified as: **mislead** (can mislead the page), **damage** (can damage a file) or **edge** (edge case with a PC check).

1. **F1, the installer could put v5 on the Desktop: PARTIAL.** The installer is gone. The new copy command refuses a short name, "./v5", "../v5", a Desktop path, the Desktop itself, a lower-case "desktop" and ".." tricks (my I03 to I06, I14, I15). But it follows a link: through a link named DeskLink that points at the Desktop, it installed v5 into the Desktop that holds v3 (I07). The Desktop hash list changed. See N5. Class: edge.
2. **F2, a running task shown as FAILED: FIXED.** 267009 shows blue "RUNNING NOW". 267011 shows grey "NOT YET RUN". Result 1 is still red, and result 0 is green. The fix opened a new flaw, N2.
3. **F3, green badges on reports that say the opposite: PARTIAL.** CHECK-5's three cases are fixed. "Not delivered" is red, a missing delivered field is red, counted null is grey "NOT COUNTED", and an empty token file is red. But the same failure remains for other content. See N1 and N3. Class: mislead.
4. **F4, edited files deleted with no warning: PARTIAL.** There is no rollback script now. But the undo command itself still deletes an edited data file and an added note with no check and no copy (U03). Saving them first is a step in words only. See N6, and N4, which is worse. Class: damage.
5. **F5, RAMBO button below the first screen: FIXED in every size I measured.** The button's top and bottom edge, against the visible height:
   - 1366 x 657: 133 to 176 of 657.
   - 1280 x 609: 133 to 176 of 609.
   - 1280 x 720: 133 to 176 of 720.
   - 390 x 844: 133 to 222 of 844.
   - At 1536 x 730 (a 1920 x 1080 laptop at 125% zoom), 1504 x 700 and 1600 x 789, the bar wraps and the button sits at 346 to 393, still visible.
   - Nothing covers it: I hit-tested its centre.
   - The fix's cost is N11. Still UNVERIFIED in Jorge's real browser.
6. **F6, one card, two answers: FIXED.** CHIEF, RAMBO and LOCAL show one line, with the worse colour. For example, CHIEF is red when CU-Orchestrator is disabled. The wording is N14.
7. **F7, a bot's interval: FIXED.** A daily bot that last ran 20 hours ago is green. At 40 hours it is red LATE. An 8-day interval is grey "cannot be judged".
8. **F8, stub overwrite: FIXED.** No such code exists any more, and nothing writes to Undo_Manifests.
9. **F9, OLD PANEL label too small: PARTIAL.** The tab label is now 14 px, weight 800, dark brown on amber. But the old-panel tab names themselves shrank from 18 px in v3 to 13 px. And the "OLD, snapshot of 2026-09-02, not live" label on the PANEL and INDEX buttons is 12 px. See N12. Class: mislead.
10. **F10, search got noisier: FIXED.** v3 against v5 card counts: "rambo" 9 and 9, "bot" 6 and 6, "proven" 1 and 1. 29 of my 35 words give the same cards. The 6 that differ:
    - "hourly", "every 15 minutes", "airdrop" and "minutes" lose cards, because that typed text was removed on purpose.
    - "typed" gains the repairs card, which now carries the "TYPED LOG" label.
11. **F11, unreadable reported as identical: FIXED.** I ran VERIFY as the unprivileged user "nobody". An unreadable file or data file shows UNREADABLE. An unreadable manifest gives CANNOT CHECK. An unreadable data folder lists its files as MISSING (not reachable). None was ever called OK.
12. **F12, Codex card opened chatgpt.com: FIXED.** There are 0 links to chatgpt.com. "Copy packet and open" for LLM-06 opens nothing, and the card has a copy button. The step order is N16.
13. **F13, AirDrop on a Windows PC: FIXED.** The word does not appear on the page.
14. **F14, technical commands handed to Jorge: PARTIAL (I agree with the builder).** Still on the page:
    - The bots lead line, "Check any of them with Get-ScheduledTask" (VTES-LLM-LAUNCHER_v5.html line 100).
    - `codex exec "<task>"` and `Second-Opinion.ps1 -Prompt "<question>"`.
    - "Open Windows Terminal. Type codex and press Enter."
    - Class: mislead.
15. **F15, times with no zone: FIXED.** The only clock time on the page without "EDT" or "EST" is "7:00 AM daily", followed by "(typed note 2026-10-02, Eastern time)". The label itself is N15.
16. **F16, documents disagree on test counts: FIXED.** The eight result files give 98, 129, 166, 16, 144, 75, 145 and 28, which add up to 801. That is the number in all three reports.
17. **F17, unlabelled footer claim: FIXED.** The footer now reads "TRK-2026-9910-B · v5 · built Oct 6, 6:38 AM EDT · CURRENT."
18. **F18, unlisted text change: FIXED.** My survival diff shows `codex exec "<task>"` (v3 showed `codex exec ""`), and it is now in the list of intentional edits.

**Tally: FIXED 13 (F2, F5, F6, F7, F8, F10, F11, F12, F13, F15, F16, F17, F18). PARTIAL 5 (F1, F3, F4, F9, F14). NOT FIXED 0.** The builder claimed 16 FIXED and 2 PARTIAL. We disagree on F1, F3, F4 and F9.

## Section C - The nine brief defects

1. **RAMBO has no Open button: FIXED.** All 10 big copy buttons copied the right packet: the top RAMBO button, plus RAMBO, Cowork twice, iPhone, Codex CLI, LOCAL, CODEX and GROK. Each packet had all six labels and the stamp "Oct 6, 2:00 PM EDT", and each button printed its steps. (N10 is about where the LOCAL steps send the packet.)
2. **vtes:// shown as plain text: FIXED.**
   - Registered, with LLM-01 filled: exactly 1 link, vtes://llm-01.
   - Registered, but the heartbeat 30 minutes old: 0 links.
   - Not registered: 0 links.
   - Shipped data: 0 links.
3. **PANEL, INDEX and 10 tabs go to the stale snapshot: PARTIAL.** All 12 are labelled "OLD". But the labels are 12 to 14 px, and on windows 1500 px wide or less, all 10 old-panel tabs are off-screen until you scroll sideways (N11, N12).
4. **LLM-02 hard-coded session: FIXED.** It opens https://claude.ai/code, and the old session id appears in no package file.
5. **Typed timings: PARTIAL.** Repair row 10, "runs 7:00 AM daily", remains with a label (the brief also says keep every row). The label adds a claim (N15).
6. **Bots have no state: PARTIAL.** Each bot has a live line, but N1, N2 and N17 apply.
7. **Typed text shown as live: PARTIAL.** These are still unlabelled:
   - "Say "AP-0088: GO" from the car and it counts."
   - "No inbound channel exists."
   - "Gemini CLI can run headless on the PC."
   - A new one: "No Grok bot has been built (asked for many times, never built)", shown as fact whenever the data is missing or stale (N13).
8. **Repairs log hand-maintained: FIXED.** All 12 rows are word for word, OPEN is still marked, and the lead says TYPED LOG. With no data there are no live rows.
9. **Stamps with no zone: FIXED.** The packet stamp reads "Oct 6, 2:00 PM EDT".

## Section D - New flaws, worst first

**N4. The undo command can delete the wrong folder, including the Desktop that holds v3.**
- Class: damage.
- File: INSTALL-AND-UNDO.md line 52 (UNDO-CMD). Its only guards are a full path and two file names. Unlike the install command, it has no Desktop check.
- U04: I put a copy of VTES-LLM-LAUNCHER_v5.html and MANIFEST.sha256 on the fake Desktop, then ran the undo on the Desktop. Exit 0. The whole Desktop was deleted: v3, Wally.lnk and the subfolder.
- U05: run on the package source folder inside the git checkout. Exit 0, and the source was deleted.
- Line 58 says "Never the folder that holds the real v3 launcher" in words only.

**N10. The LOCAL (private) lane routes client personal data through Claude.**
- Class: mislead (privacy).
- File: vtes5-ui.js line 34 (LOCAL steps). The page's WIN entry for LOCAL says the same: "Hand the packet to the desktop executor (RAMBO) with the blue RAMBO button at the top".
- Test: my note was "SSN 123-45-6789 client Jane". I pressed "Copy packet for LOCAL", then the RAMBO button, as the steps say. The second packet is "LLM-04 -> LLM-01 (Claude Code Desktop)" and carries the same note.
- This contradicts the page's own lines "Client personal data goes to LOCAL only" and "PII never leaves the machine".
- The GROK steps (line 44) also route through RAMBO.

**N1. Green strip badges on reports that say bad.**
- Class: mislead.
- File: vtes5-live.js line 108 (any fresh heartbeat, bots or state file gives green), shown by vtes5-ui.js line 227 (the strip).
- World allBotsFail: all 6 bots end with result 1. The strip shows green "bots: OK - as of Oct 6, 1:59 PM EDT", above six red "FAILED" lines.
- World allDown: every window is "down". The strip shows green "heartbeat: OK".
- This breaks DATA-CONTRACT.md line 7: green needs a fresh file "AND its content says good".

**N2. A hung task shows as "RUNNING NOW" forever.**
- Class: mislead.
- File: vtes5-live.js line 243. It returns RUNNING before any lateness check.
- World hung: CU-Inbox-Job-Watcher runs every 2 minutes, but last started Oct 3. It shows blue "RUNNING NOW ... (last ran Oct 3, 2:00 PM EDT)". The RAMBO card shows the same blue.

**N3. Stale or impossible content still shows green.**
- Class: mislead.
- Files: vtes5-live.js lines 85 to 108. There is no age, future or range check on the content fields.
- Housekeeping: a last report from Aug 27 (40 days ago) shows green "Reported". A last report dated Oct 9, in the future, also shows green, with no BAD CLOCK.
- Health: "2 of 10 health checks passed (20%)" with "Daily report sent: Jun 18" shows green "Report". "14 of 10 (140%)" also shows green.
- Miami-Dade: "450 of 300" and "-3 of 300" show green "Counted".
- Tokens: "-5 tokens" per hour and "250%" show green "Reporting".
- This is the "health email dead since June" pattern from the charter.

**N5. The install command lands in the Desktop through a link, and installs into a git checkout.**
- Class: edge.
- File: INSTALL-AND-UNDO.md line 19. It checks only the typed text of the path.
- I07: DeskLink pointing at the Desktop. The Desktop changed: a new v5 folder holding 12 files.
- I08: inside the git checkout. Exit 0, and git shows "?? v5/".
- The port brief asked to "refuse a git checkout using real paths". This is disclosed in KNOWN-LIMITS 5.

**N6. The undo command deletes edited data files and notes with no copy.**
- Class: damage.
- File: INSTALL-AND-UNDO.md line 52.
- U03: I edited data/vtes5-bots.js and added NOTE.txt, then ran the undo. Exit 0, both deleted, no copy anywhere.
- The save step (line 48) is words only.

**N11. The tab bar hides 11 of 18 tabs on laptops.**
- Class: edge. It is disclosed in KNOWN-LIMITS 25, but disclosed is not fixed.
- File: VTES-LLM-LAUNCHER_v5.html line 65.
- At 1366 x 657, 1280 x 720 and 1440 x 789: 7 or 8 of 18 tabs fully visible. At 390 x 844: 3 of 18. v3 showed 17 of 17 at every size.
- The hidden tabs include REPAIRS, MIAMI-DADE and all 10 old-panel tabs, whose label is their only warning.

**N12. Smaller type on the old-panel warnings.**
- Class: mislead.
- File: VTES-LLM-LAUNCHER_v5.html line 58 (`.tab.panel{font-size:13px}`). In v3 the same tabs were 18 px.
- File: line 223. The PANEL and INDEX buttons, which now carry the OLD label, are 12 px.

**N13. "No Grok bot has been built (asked for many times, never built)" is a claim the page cannot know.**
- Class: mislead.
- File: vtes5-ui.js line 5. It is shown whenever the heartbeat has no fresh proof for "BOTS", for example when the heartbeat is simply 400 minutes old.

**N7. The install command says success after copying nothing.**
- Class: edge (step 3, VERIFY, catches it).
- File: INSTALL-AND-UNDO.md line 19. `Copy-Item -Path (Join-Path $Pkg '*')` treats square brackets as a wildcard.
- I10: package path "pkg [x]". Exit 0, and the new folder has 0 files.
- Line 15 says "It stops at the first error".

**N8. The undo command half-deletes when a hidden file is inside.**
- Class: edge (Windows creates hidden desktop.ini and Thumbs.db files).
- File: INSTALL-AND-UNDO.md line 52 (no -Force, on purpose).
- U09: exit 1, the data folder gone, and 6 files left behind.

**N9. Undo through a link reports success, but the folder stays.**
- Class: edge.
- U08: the undo removed only the link, with exit 0. The 6 package items are still in the real folder. Step 4's check (Test-Path prints False) passes anyway.

**N14. One sentence, two answers.**
- Class: mislead.
- File: vtes5-ui.js line 56. It reads "its bot CU-Orchestrator is not fine: RUNNING NOW ... (result code 267009 means running, not failed)".

**N15. A label claims more than was typed.**
- Class: mislead.
- File: VTES-LLM-LAUNCHER_v5.html line 121. It reads "(typed note 2026-10-02, Eastern time)". The words "Eastern time" were added on 2026-10-06, not typed on 2026-10-02. The page cannot know the task's zone (KNOWN-LIMITS 30).

**N16. The Codex steps are in the wrong order.**
- Class: mislead.
- File: vtes5-ui.js line 27. "First time only: ... sign in" comes after "Type codex ... Press Ctrl+V".

**N17. The Windows scheduler state "Queued" shows red NO DATA.**
- Class: edge.
- File: vtes5-live.js line 240 accepts only Ready and Running. Windows also reports Queued.

**N18. VERIFY prints "Nothing was written anywhere", which it cannot know.**
- Class: edge.
- In every one of my 44 root scenarios, PowerShell itself rewrote `~/.cache/powershell/StartupProfileData-NonInteractive`.
- The script writes nothing in the checked folders: the area was identical in all 22 VERIFY runs.

**N19. VERIFY with ".." in the path gives scrambled output.**
- Class: edge.
- VERIFY-v5.ps1 line 103 cuts names by the typed length.
- V13: "/F/repo/x/../package" gives PROBLEMS (13) with names like "FEST.sha256". This fails safe (never a false OK), but it reads as nonsense.

## Section E - My counts, N of N, and my method

1. **Survival items: 248 of 248 present and working, 221 identical.**
   - Method: my script opens the real v3 (the Drive bytes) and v5 side by side, takes every item from v3 at run time, and checks or clicks the same item in v5.
   - What was counted: 27 cards by field, 6 queued buttons, 9 picker rows, 17 tabs, 144 packet pairs, 12 repair rows plus the OPEN mark, PANEL, INDEX, the search box, and the hand-off form (defaults, labels, lists, 12 "Copy packet and open", "Just show", 13 "Hand work here").
2. **Controls on the v5 page: 86 with the shipped data.** I count every a[href], button, select, input, textarea and summary, not de-duplicated:
   - 47 links: 8 in-page, 12 old-panel, 23 Drive or Docs, 4 web.
   - 32 buttons: 10 copy, 14 "Hand work here", 6 queued, 2 hand-off.
   - 3 pick lists, 1 search box, 2 text boxes and 1 summary.
   - This matches CHECK-5's 86. The builder's 87 is a different method.
3. **Data worlds: 29.** These are 19 worlds plus 7 for the F3 and F6 cases and 3 for vtes://. 16 behave correctly. 13 show flaws: N1 (2 worlds), N2 (1), N3 (7), N13 (1), N14 (1) and N17 (1).
4. **Window sizes: 11 for v5 and the same 11 for v3.** The RAMBO button is visible in 11 of 11. Tabs fully visible: 18 of 18 above 1500 px, 7 or 8 of 18 at laptop sizes, 3 of 18 on the phone.
5. **Memory: 10 simulated hours, 600 reloads, with the data changing every tick.**
   - Heap went from 1.76 to 2.30 MB.
   - Page elements stayed at 1,734, script tags at 12 and event listeners at 32.
   - After the 10 hours, the typed text, the To choice (LLM-07) and a text selection inside a card were all still in place.
   - Pressing F5 to reload the page was not tested (v3 behaves the same way).
6. **PowerShell 7.4.6 for Linux:** downloaded from the PowerShell GitHub release into my scratchpad (archive SHA-256 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561).
   - **49 scenarios:** install 15, undo 11, VERIFY 18, plus VERIFY 5 more run as "nobody".
   - The commands are the exact text from INSTALL-AND-UNDO.md. Only the drive-letter regex was swapped for "^/", because Linux has no drive letters (diff checked).
   - In each scenario I took the SHA-256 of every file in the fake Desktop holding the real v3, plus the folder list and modes, before and after.
   - **The Desktop was identical in 40 of 44 root scenarios. A command changed it in 2:** I07 (install through a link) and U04 (undo deleted it).
   - In U10 and U11 the change was my own setup step, copying files onto the Desktop. There the command refused (U10) or removed only a link (U11).
   - VERIFY changed the test area in 0 of 22 runs. One run (V02) first showed a change, because my edit was inside the measured step. Re-run correctly, it was identical.
   - VERIFY has 0 non-ASCII bytes and no write command.
   - For the unreadable cases I used a temporary folder /tmp/c6nobody, because "nobody" cannot reach my scratchpad. I deleted it afterwards.

## Section F - Survival diff, every v3 item

1. LLM-01 Claude Code Desktop: present and working. "Runs every 2 minutes" was removed (defect 5). The vtes:// line became a plain sentence (defect 2). There is a copy button for RAMBO.
2. LLM-02 Claude Code Cloud: present. It opens claude.ai/code (defect 4). vtes:// line as in item 1.
3. LLM-03 Claude Cowork: present. vtes:// line as in item 1. There is a copy button.
4. LLM-04 Claude Chat: present and working. vtes:// line as in item 1.
5. LLM-05 Claude iPhone: present. The AirDrop sentence was replaced (F13). There is a copy button.
6. LLM-06 Codex CLI: present. The chatgpt.com link was removed (F12). There is a copy button.
7. LLM-07 Grok: present. A labelled Grok note was added (see N13).
8. LLM-08 Gemini: present and working. vtes:// line as in item 1.
9. LLM-09 Thin API router: identical.
10. Role LOCAL: identical text. A copy button was added (see N10).
11. Role CODEX: "Proven 2026-10-01" became a typed note. The address now shows "<task>" (F18).
12. Role CLAUDE / RAMBO: the 75% sentence became a typed note.
13. Role GROK: the address now shows "<question>". "Hand work here" works now; in v3 it threw a page error.
14. Role COWORK: identical text. A copy button and "Hand work here" were added.
15. Role CHIEF: "Runs every 2 minutes" was removed. No button, as in v3.
16. Bot CU-Inbox-Job-Watcher: identical, and a live line was added.
17. Bot CU-Local-Executor: "every 5 minutes" was removed.
18. Bot CU-TokenMonitor-Hourly: identical.
19. Bot CU-Orchestrator: "Every 15 minutes." was removed.
20. Bot CU-Propagation-Check: "Hourly." was removed.
21. Bot VTES-LOCAL-POLLER: "15-minute" was removed.
22. to 26. Queued items 1 to 5: identical, and each button fills To, From, the note and the status exactly as in v3.
27. Queued item 6: "in the last 15 minutes" became "on its last scheduled run" (disclosed).
28. to 36. Picker rows 1 to 9: identical To and suggestion line.
37. to 41. Tabs LLMS, EXECUTORS, BOTS, HAND OFF and QUEUED: identical, and each jumps to a section that exists.
42. Tab STATUS: now goes to #livestatus. v3 went to an empty #status.
43. to 52. Tabs APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS and RULES: same address, now labelled OLD PANEL (see N11 and N12).
53. Tab REPAIRS: identical. A new MIAMI-DADE tab was added, and it works.
54. Packet text: 144 of 144 pairs identical apart from the stamp.
55. to 66. Repair rows 1 to 12: identical, except that row 10 has the added label (N15). The OPEN row is still marked.
67. PANEL corner button: same address, labelled OLD.
68. INDEX corner button: same address, labelled OLD.
69. Search box: same placeholder and type, and it gets focus on load.
70. Hand-off defaults (kind 5, From LLM-04, To LLM-01, suggestion and warning line): identical.
71. Hand-off labels: one changed, "editable" became "read only" (disclosed).
72. From and To lists: all 12 v3 entries kept, and GROK was added.
73. "Copy packet and open", 12 To entries: 6 identical. 6 differ for stated reasons: LLM-02 (defect 4), LLM-05 (F13), LLM-06 (F12), and LOCAL, CODEX and RAMBO (F14).
74. "Just show the packet": identical.
75. "Hand work here", 13 buttons: 12 identical, and GROK was repaired.

## Section G - UNVERIFIED, with the exact PC check for each

1. **First screen in Jorge's real browser (F5).** PC check: open v5 in the usual window, do not scroll, and say whether the blue "Copy packet for RAMBO" button is visible.
2. **Hidden tabs (N11).** PC check: at the usual window size, say whether a sideways scroll bar shows under the tab row, and whether REPAIRS can be reached.
3. **Real Windows result codes.** PC check: while CU-Inbox-Job-Watcher runs, `(Get-ScheduledTaskInfo -TaskName CU-Inbox-Job-Watcher).LastTaskResult` prints 267009, and a never-run task prints 267011. Also check whether any task ever shows the state "Queued" (N17).
4. **Windows PowerShell 5.1, junctions, 8.3 short names (for example C:\Users\JV\DESKTO~1) and OneDrive Desktop redirection, with both commands.** PC check: run the install command in a dry copy, with -WhatIf added to New-Item and Copy-Item, against `C:\Users\JV\DESKTO~1\v5test`. If it is not refused, N5 is real on the PC.
5. **Hidden files in an installed folder (N8).** PC check: after an install, look for desktop.ini or Thumbs.db inside the folder with `Get-ChildItem -Force`.
6. **The real clipboard and the Codex terminal paste.** PC check: press "Copy packet for Codex CLI", paste into codex in Windows Terminal, and say whether a "multi-line paste" warning appears. If one does, the steps do not mention it.
7. **The click paths (green D icon, orange X icon, the "Codex - sign in (Jorge)" shortcut).** PC check: follow each card's steps once, and name the step that does not match the screen.
8. **The PowerShell archive hash** was recorded, not compared with a published checksum.

## Section H - For the cloud keeper (charter end of session)

I touched no file but this one, so OPEN-ITEMS.md and RECURRING-ISSUES.md are not updated. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-06: panel v5 CHECK-6 FAIL (20 flaws). Installer removed (Tier 2), but the undo command can delete the Desktop holding v3 when a v5 page and manifest sit there, and fresh-but-bad reports still show green (the strip, hung tasks, stale last-report times). Green-means-fresh has now recurred in three checks."

Jorge, shall the builder fix these 20 flaws before anything is installed? (yes/no)

TRK-2026-9910-B · CHECK-6 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5 #independent-check
