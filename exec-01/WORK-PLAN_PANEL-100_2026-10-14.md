# WORK PLAN · VTES Control Panel to 100%
#EXEC-01 #WORK-PLAN #VTES-PANEL #ORANGE-TREE

**Written:** 2026-10-14, 08:56 AM Eastern, by EXEC-01 (cloud lane). Charter section 5.
**Panel:** https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj. Source file: control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html.

**Answer first:**
1. **Live today: 84 of 116 built (72%), page v48.** The repo copy shows 87, because PLAUD's 3 pieces are built but not yet published.
2. **29 pieces are left after PLAUD. 24 of them need the PC.** Only 5 can be built from the cloud.
3. **So the cloud alone can reach about 92 of 116 (79%). The last 24 wait on the PC**, and the PC is held back by the home-made 6-a-day cap.
4. **One yes from Jorge unblocks the PC:** remove that cap (RED-ASKS item 1).

---

## Section A — What "100%" means

**Definition:** all 116 pieces in the page's `var BUILD` list are marked built, **and** each tab has an automatic test that passes with no page errors, **and** the page is published. A piece counts as built only when its test passes. A tab with no test is not at 100%, even when every piece is ticked.

**How a test passes:** each test opens the page in a headless browser (Playwright) and checks it.
- Newer tests print PASS or FAIL lines and end with "RESULT".
- Older tests print values and the page errors. They pass when the page errors list is empty and the values are present.
- All tests live in `tools/panel/test/`. Run them as: `node <test>.js <full panel path> <png path>`.

**Baseline test run (today, 12:52 to 12:58 UTC, by EXEC-01):**
1. 32 browser tests ran. **Every check of how the page works passed. No page errors.**
2. 7 suites print one FAIL line each: "BUILD count went up vs git HEAD". That check only means something on the run that builds a piece. Once the piece is committed, it reads FAIL by design. **It is not a broken feature.**
3. 22 older tests print values instead of PASS or FAIL lines. All 22 ended cleanly with no page errors. They are weaker tests and are flagged to be upgraded.
4. 8 tabs have no test of their own: OCR, MYASKS, JOBS, CAPSULES, SESSIONS, AGENTS, BACKUP, TRACKER. Writing those tests is in the step order (Section D).
5. The PC feeder has its own test: `run-feeder-test.ps1` plus `check-feeder-output.js`. It needs PowerShell, which this cloud box does not have, so it was not run today.

### All 116 pieces, by tab, with their test

### MENU · 12 of 12
- **Test:** panel-map-test, menu-coming-next-test, search-voice-test, hover-tips-test, menu-glossary-test, view-controls-test, phone-width-test
1. Hub and work-flow arrows · BUILT
2. Five branch boxes · BUILT
3. Completion % on every box · BUILT
4. Greyed future pages with dates (BILLING, BOOKS, PROJECTS, COUNTY MONITOR, LAUNCHER) · BUILT
5. Every page by hashtag and keyword · BUILT
6. Hover description on every button · BUILT
7. Voice buttons: Speak, Read, Speechify · BUILT
8. Search reaches Google Drive · BUILT
9. Glossary hover for in-house words (TRK, OPH, MDC…) · BUILT
10. Text size A- / A+ · BUILT
11. High contrast · BUILT
12. Read aloud (falls back to Speechify) · BUILT

### OCR · 4 of 8
- **Test:** none found (write ocr-test before 100%)
13. Google Drive count (89%) · BUILT
14. Gmail count · BUILT
15. Outlook + OneDrive count · BUILT
16. PC sources: PaperPort, Downloads, Dropbox, C: drive · NOT BUILT · needs PC
17. Latest-version audit · NOT BUILT · cloud
18. Per-job OCR + email-circle check · BUILT
19. Cloud lane for text PDFs · NOT BUILT · cloud
20. 24/7 PC runner for scans · NOT BUILT · needs PC

### TODAY · 3 of 5
- **Test:** today-stamp-test, money-lock-test
21. Dated summary with proof · BUILT
22. Money items · BUILT
23. Money items fed live from the PC · NOT BUILT · needs PC
24. Last updated on page · BUILT
25. Auto daily rewrite · NOT BUILT · needs PC

### TASKS · 3 of 4
- **Test:** approve-all-test, approve-all-test2, decide-keeps-comment-test
26. Tasks with lane and status · BUILT
27. Approve / deny · BUILT
28. Reassign lane · BUILT
29. Tasks read from the PC registry · NOT BUILT · needs PC

### MYASKS · 1 of 2
- **Test:** none found (write myasks-test)
30. Done / blocked / not done · BUILT
31. Auto-sweep new asks from chats · NOT BUILT · cloud

### ORCHESTRATOR · 7 of 10
- **Test:** job-queue-test, t11, status-reports-orch-test
32. Job number + receipt · BUILT
33. Line position, never interrupts · BUILT
34. Urgent to the front · BUILT
35. 5-min accept / 15-min proof · BUILT
36. STALE / TROUBLED / STALLED · BUILT
37. Worker picks up queued jobs · NOT BUILT · needs PC
38. Correlation-ID handshake back · NOT BUILT · needs PC
39. Two-message live test · NOT BUILT · cloud
40. Failed lane · BUILT
41. Recovery route suggestion · BUILT

### LLMS · 4 of 5
- **Test:** orphans-llms-test, money-lock-test
42. Buttons per AI · BUILT
43. Fixed IDs LLM-01…09 and scarce/free label · BUILT
44. 13-provider health ping tile (file from PC) · NOT BUILT · needs PC
45. Dollar counter and quote calculator · BUILT
46. Cost gate before paid runs · BUILT

### HANDOFFS · 7 of 7
- **Test:** handoff-packet-test, handoffs-test
47. Who handed what to whom · BUILT
48. Lanes table · BUILT
49. Task-type picker, cheapest lane · BUILT
50. From / To lists · BUILT
51. Copy packet button · BUILT
52. Personal-data tick box + digit checker · BUILT
53. LOCAL safe-folder rule · BUILT

### STATUS · 4 of 9
- **Test:** status-reports-orch-test, connect-v13-mocktest
54. PC awake from Drive · BUILT
55. RAM guard heartbeat · NOT BUILT · needs PC
56. OCR coverage count from Drive · BUILT
57. OCR 24/7 runner heartbeat · NOT BUILT · needs PC
58. Age line per feed · BUILT
59. Watchdog "not refreshing" banner · BUILT
60. Free RAM tile · NOT BUILT · needs PC
61. Health X of Y · NOT BUILT · needs PC
62. Miami-Dade n of 300 · NOT BUILT · needs PC

### APPROVALS · 4 of 5
- **Test:** approvals-clock-test, approvals-onecard-test, approvals-readaloud-test, t12, decide-keeps-comment-test
63. Approve / defer / note · BUILT
64. One card at a time mode · BUILT
65. Read aloud · BUILT
66. Waiting clock, overdue after 24 h · BUILT
67. Approvals fed from the PC · NOT BUILT · needs PC

### REPORTS · 3 of 4
- **Test:** status-reports-orch-test, panel-map-test
68. R-01 to R-50 ready / needs work · BUILT
69. Snips and notes · BUILT
70. Repairs running log · BUILT
71. Live repair rows · NOT BUILT · needs PC

### ORPHANS · 2 of 2
- **Test:** orphans-llms-test
72. OPH numbers and hashtags · BUILT
73. Resolve to TRK button · BUILT

### JOBS · 1 of 2
- **Test:** none dedicated (write jobs-test)
74. Status per property · BUILT
75. Live from job folders · NOT BUILT · needs PC

### CAPSULES · 2 of 3
- **Test:** none found (write capsules-test)
76. Folder rules text · BUILT
77. Capsule tree links · BUILT
78. Tag index search (_TAG-INDEX.json) · NOT BUILT · needs PC

### PLAUD · 3 of 3 in repo · 0 of 3 published
- **Test:** plaud-test
79. List recordings · BUILT in repo, not yet published (WIP commit dcc9f10)
80. Transcript links · BUILT in repo, not yet published (WIP commit dcc9f10)
81. File to TRK suggestion · BUILT in repo, not yet published (WIP commit dcc9f10)

### CLIENTS · 3 of 3
- **Test:** clients-test
82. Client list · BUILT
83. Contact sheet per TRK · BUILT
84. Last email per client · BUILT

### LINKS · 7 of 8
- **Test:** links-test, emails-menu-test, emails-window-test
85. Drive, GitHub, job search · BUILT
86. 22 Miami-Dade proof links · BUILT
87. Proof-checked badge (7 days) · NOT BUILT · cloud
88. Chronology link · BUILT
89. Emails drop-down (Gmail + Outlook) · BUILT
90. 209 documents in 7 groups · BUILT
91. Drive links instead of G: paths · BUILT
92. Updated stamp and filter · BUILT

### WINDOWS · 2 of 2
- **Test:** rules-bridges-windows-test
93. Window labels and paste IDs · BUILT
94. Picture cards per window · BUILT

### SESSIONS · 1 of 2
- **Test:** none found (write sessions-test)
95. What each lane is doing · BUILT
96. Live from heartbeats · NOT BUILT · needs PC

### BRIDGES · 2 of 2
- **Test:** rules-bridges-windows-test
97. Fallback ladder text · BUILT
98. Live inbox count · BUILT

### AGENTS · 1 of 2
- **Test:** agents-split-test (CONNECT groups only; write agents-test)
99. Who gets which task · BUILT
100. Housekeeping tile · NOT BUILT · needs PC

### USAGE · 1 of 2
- **Test:** money-lock-test, hover-tips-test
101. Pay-per-use table · BUILT
102. Live token monitor tile · NOT BUILT · needs PC

### RULES · 2 of 2
- **Test:** rules-bridges-windows-test
103. Where the charter lives · BUILT
104. Owner directives list · BUILT

### BACKUP · 2 of 3
- **Test:** none found (write backup-test)
105. Export · BUILT
106. Import · BUILT
107. Auto nightly backup to Drive · NOT BUILT · needs PC

### CONNECT · 3 of 6
- **Test:** connect-v13-mocktest, agents-split-test, executor-buttons-test
108. RAMBO, Codex, Poller, Job-Watcher · BUILT
109. Old greens turn amber · BUILT
110. Cloud / desktop split buttons · BUILT
111. Orchestrator, Token Monitor, Local-Executor heartbeats · NOT BUILT · needs PC
112. Bot verdicts OK/FAILED/LATE/STUCK · NOT BUILT · needs PC
113. Correlation-ID handshake per agent · NOT BUILT · needs PC

### TRACKER · 3 of 3
- **Test:** none found (write tracker-test)
114. Fuel gauge per task · BUILT
115. Approve schedule · BUILT
116. Sweeper every 2 h · BUILT

---

## Section B — Baseline, with evidence

1. **Built and live: 84 of 116 (72%).** Evidence: control-panel/BUILDER-LOG.md, line "2026-10-14T12:00Z … 84 of 116 (72%) … published v48".
2. **Built in the repo, not yet live: 3** (PLAUD). Evidence: git commit dcc9f10 "WIP: panel PLAUD in progress (not published)". The BUILD list in the repo file counts 87.
3. **Not built: 29.**
   - **Cloud, 5:** OCR latest-version audit; OCR cloud lane for text PDFs; MYASKS auto-sweep of new asks; ORCHESTRATOR two-message live test; LINKS proof-checked badge.
   - **PC, 24:** OCR PC sources; OCR 24/7 runner; TODAY live money items; TODAY auto daily rewrite; TASKS from the PC registry; ORCHESTRATOR worker pickup; ORCHESTRATOR correlation-ID handshake; LLMS 13-provider health tile; STATUS RAM guard heartbeat; STATUS OCR runner heartbeat; STATUS free RAM; STATUS health X of Y; STATUS Miami-Dade n of 300; APPROVALS fed from the PC; REPORTS live repair rows; JOBS live from job folders; CAPSULES tag index search; SESSIONS live from heartbeats; AGENTS housekeeping tile; USAGE live token monitor; BACKUP auto nightly backup; CONNECT 3 missing heartbeats; CONNECT bot verdicts; CONNECT correlation-ID per agent.
4. **Tabs at 100% (live):** MENU, HANDOFFS, ORPHANS, CLIENTS, WINDOWS, BRIDGES, RULES, TRACKER. PLAUD joins them when published.
5. **Evidence for test results:** the test outputs from today's run sit in this session's scratch folder. They are not in the repo. Rerun any test with the command in Section A to reproduce.

---

## Section C — Root causes (found, not guessed)

1. **Most of what is left needs the PC.** 24 of the last 29 pieces are marked `pc` in `var BUILD`. They need files that only the PC writes: heartbeats, RAM, the scheduler, local folders.

2. **The PC is stalled by its own counter, not by Anthropic.**
   - CAP-REACHED_2026-10-14: "6 of 6 sessions used" at 12:12 AM, 12 minutes after reset.
   - Jorge's usage page on 10-12 showed 18% of the week used.
   - The 10-12 order to raise the cap waits in the same capped queue, so it can never run. RECURRING-ISSUES logs this 4 times (10-09, 10-10, 10-11, 10-14). Patches are forbidden.

3. **The overflow lane cannot do PC work.** Once the cap is hit, orders go to Codex. Codex refuses client details and has no Drive write access. 7 of its 10-13 receipts are named EXECUTED but say BLOCKED or PARTIAL (AUDIT_QC-01_2026-10-14).

4. **The tool that feeds most PC pieces is written, but never installed.**
   - `tools/panel/VTES5-Feeder.ps1` writes 7 data files every 2 minutes: heartbeat, bots, state, health, tokens, housekeeping, miamidade.
   - The install order went to RAMBO on 10-12 (orders/sent/MSG-CLOUD-TO-CODE_WIRE-VTES-PANEL-V5_RAMBO1_2026-10-12_v2.md). No EXECUTED receipt for it was found. RAMBO has been silent since 10-10.
   - **Unknown:** whether the cloud panel (v13) can read those Drive files directly. This must be tested once they exist.

5. **APPROVAL-DURABILITY-01 check: partly met.**
   - The rule: the approval queue is data in Drive. Each panel window or icon is only a disposable view. No approval may exist only inside a local window.
   - **Met:** the panel saves each approval to its shared database (`approvals/<id>` and `tasks/state`), with merge writes. The browser's local storage is only a cache. So no approval lives only in one window.
   - **Not met:** that shared database is not in Drive. The PC's queue is a separate Drive file (`G:\My Drive\MY-DESK\APPROVALS-QUEUE.json`). The piece that joins them, "Approvals fed from the PC", is not built. Today the cloud runner bridges the gap by writing EXECUTED_CLOUD files to VTES-Outbox.
   - **Fix (GREEN, new files only):** each runner hour, write the panel's approvals to one new Drive file in VTES-Outbox. Then Drive holds every approval, and PC lanes can read them.

6. **Some pieces have no test.** 8 tabs have no test of their own, so "built" there rests on a tick mark, not on proof.

---

## Section D — Step order, owner touches, tools

**Step order:**
1. **Publish PLAUD** (cloud, GREEN). 84 → 87. Next runner hour.
2. **Build the 5 cloud pieces** (cloud, GREEN), one or two per runner hour. Start with the OCR latest-version audit: its data is done (commit a346544). 87 → 92.
3. **Write the missing tests** for OCR, MYASKS, JOBS, CAPSULES, SESSIONS, AGENTS, BACKUP, TRACKER. Upgrade the 22 older tests to PASS/FAIL lines (cloud, GREEN). No count change. It makes the count trustworthy.
4. **Approvals to Drive** (cloud, GREEN): the hourly Drive approvals file in Section C, item 5.
5. **Remove the PC cap** (RED, Jorge's yes; RED-ASKS item 1). This is the gate for everything after it.
6. **Install the feeder** on the PC (YELLOW for EXEC-01, because a PC scheduled task is added). Rollback is already written in tools/panel/README.md: remove the CU-VTES5-Feeder task. Save it as a rollback script in exec-01/rollback before running.
7. **Wire the feeder files into v13** (cloud): RAM, health, Miami-Dade, tokens, housekeeping, bot verdicts, heartbeats. About 12 of the 24 PC pieces.
8. **The remaining PC pieces**, about 12: OCR sources and runner, TODAY live money and daily rewrite, TASKS registry, ORCHESTRATOR pickup and handshakes, APPROVALS from the PC, REPORTS live rows, JOBS live folders, CAPSULES tag index, BACKUP nightly. Build them as RAMBO orders, at most 2 per hour (runner throttle).
9. **Re-check the `pc` marks.** Some may only need Drive, such as "JOBS live from job folders". Any that the cloud can read from Drive move to the cloud queue.

**Estimated owner touches:** 2.
1. One "yes" to remove the cap (RED-ASKS item 1).
2. Probably one paste into a hand-opened PC Claude window, so the counter can be edited. The counter does not limit a window Jorge opens himself.
3. No layout review is needed unless a re-layout is proposed. None is proposed.

**Free tools proposed:** none new.
- Reuse what exists: VTES5-Feeder.ps1 (already written and tested), Windows Task Scheduler, Playwright (already used by the tests).
- No new install, no paid service.

**Time estimate:** steps 1 to 4 take about 4 to 6 runner hours, so done by about 3 PM Eastern today if the budget stays "allowed". Steps 6 to 8 depend on when the cap is removed. After that, about 2 working days at 2 PC orders an hour. Unknown until the PC answers.

---

## Section E — Layout

1. **The current Orange Tree layout stays exactly as it is.** This plan only fills in pieces inside it.
2. **No re-layout is proposed.** If one ever is, EXEC-01 shows Jorge the layout first and waits for his review before building (charter section 3, rule 10).

Shall EXEC-01 start with step 1 at the next runner hour?
