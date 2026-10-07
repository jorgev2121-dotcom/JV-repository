# PORT-REPORT - the live layer ported onto Jorge's real launcher (v5) (TRK-2026-9910-B, 2026-10-06)

**Updated in fix round 8 (2026-10-07, after CHECK-9): see FIX-ROUND-8.md.** Section F at the end is new: the generated list of every line of v3 text the build changes, adds to or removes (34 lines). The Read me on the page prints that number. Tests in Section A item 6 are now 264,474 of 264,474.

**Updated in fix round 6 (2026-10-06, after CHECK-7): see FIX-ROUND-6.md.** The test total in Section A item 6 and the page size are the round-6 ones. Every other number or verdict below is from round 5 unless it says otherwise; FIX-ROUND-6.md gives the current verdict of each CHECK-7 flaw.

**Updated in fix round 5 (the same day, after CHECK-6): every copy and delete command was removed (v5 is installed by hand, INSTALL-BY-HAND.md), VERIFY-v5.ps1 was fixed, and 14 page and verify flaws were fixed (the 6 installer flaws are gone by removal); see FIX-ROUND-5.md for every flaw with its verdict. Round 4 (FIX-ROUND-4.md) removed the installer and rollback scripts. The numbers below are the round-5 numbers.**

SONNET 5.5 · PANEL V5 PORT. Window: CODE, CLOUD / WEB EXECUTOR. Model: Sonnet 5.5 (not Opus; the order assigned this work to me). Branch claude/panel-v5-port. Work only in panel-rebuild/v3-live/ and panel-rebuild/v5/. No Drive writes, no PC, no pull request.

## Section A - Answer first
1. **I read your real v3 launcher from Drive and it is a byte-exact copy:** 24,463 bytes, SHA-256 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3, the same as the manifest. The Drive connector can return the file's bytes, so no unescaping of the markdown version was needed.
2. **Of the 9 defects in the brief, my own count after fix round 4: 6 FIXED (1, 2, 3, 4, 8, 9), 3 PARTIAL (5, 6, 7), 0 NOT FIXED.** The independent check CHECK-5 counted 5 FIXED and 4 PARTIAL before round 4; the checker decides. Of 5 more I found in the real v3: 4 FIXED, 1 PARTIAL, plus 1 NOT FIXED on purpose. The PARTIALs are about things this package cannot create (live data writers on the PC, the ten old panel sections), one labelled typed schedule the order told me to keep, and typed text. Section B has each one with evidence.
3. **Nothing of v3 was removed:** 166 of 166 comparison checks on the real page (all 9 LLM cards, 6 roles, 6 bots, 6 queued items, 9 picker rows, 17 tabs, 6 sections, 12 repair rows, the packet text). Twenty-six intentional text edits are listed in Section B (the card-text ones are also listed in the test file).
4. **There is no script that copies, moves or deletes, anywhere (fix round 5, charter Rule 4, Tier 2).** The installer and rollback went in round 4; the copy and delete commands that replaced them went in round 5, because the second independent check found six flaws in them. v5 is put in place by hand in File Explorer (INSTALL-BY-HAND.md) and checked by the read-only VERIFY-v5.ps1 (214 of 214 checks under PowerShell 7.4.6, the whole test area identical before and after every scenario). There is nothing to undo: the real v3 is never touched. Deleting the v5 folder is your decision, by hand, with your yes.
5. **I do not claim zero flaws.** Section D lists what I know is still open. One flaw means failure, so every open one is named.
6. **Tests: 111472 of 111472 pass** (the round-7 total; every count is listed in FIX-ROUND-7.md, Section D) and 37 of 37 deliberate breaks were caught. The page is 34,479 bytes. See TEST-REPORT.md.

## Section B - Every defect, with its verdict and evidence
Evidence names a row in test-v3-before-RESULT.json ("before/after"), a click check, or a data world.

**The nine in the brief**
1. **RAMBO has no Open button. FIXED, with one limit.** A web page cannot launch a desktop app, so v5 gives LLM-01, LLM-03, LLM-05, LLM-06 (Codex CLI, fix round 4: its chatgpt.com Open button is gone), the roles RAMBO, LOCAL, CODEX, GROK, COWORK and the top of the page (directly under the title, fix round 4) a big "Copy packet for ..." button and the click path in numbered plain words, and says on the card why there is no Open button. Evidence: before/after row 1 (v3: "Hand work here" only; v5: copy button plus steps), 9 click checks (each puts the right packet on the clipboard). Limit: the click-path words come from v3's how-to line; "pick the session named RAMBO" is my wording, marked UNVERIFIED on the card.
2. **vtes:// shown as plain text. FIXED.** A link appears only when the heartbeat says registered AND that window's address-book entry is filled; otherwise one sentence says what is missing. Evidence: data worlds W1 (0 links, 8 sentences) and W2 (links on LLM-01 and LLM-03 only), mutation M5 caught. Limit: that the link opens the right window is UNVERIFIED (needs the PC).
3. **PANEL, INDEX and 10 tabs go to the stale 2026-09-02 snapshot. PARTIAL.** All 12 are labelled "OLD PANEL, snapshot of 2026-09-02, not live" on the tab or button itself (10 click checks, 2 corner checks, before/after row 3). They still go to the snapshot, as the brief ordered; building those ten sections natively is a later job (KNOWN-LIMITS 1).
4. **LLM-02 hard-coded session address. FIXED.** It now opens the sessions list https://claude.ai/code and says UNVERIFIED which session is current. Before/after row 4. The old address no longer appears anywhere.
5. **Contradictory typed timings. PARTIAL (changed from FIXED by CHECK-5).** All five typed intervals and the "Hourly." sentence are gone from cards and bots (before/after row 5: v3 had 6 matches, v5 has 0). Every "check-in interval" and "scheduled every" sentence is read from the heartbeat or bots file, or says unknown (W1, W2, W6). Two disclosed leftovers: the bot's task name CU-TokenMonitor-Hourly contains "Hourly" because that is its real name; and repair row 10 still says "runs 7:00 AM daily" because the order says keep every row, now followed by the visible label "(typed note 2026-10-02; the note gives no time zone, so this page cannot say which clock it means)" (round 5: "Eastern time" was removed, because the page cannot know it).
6. **Bots have no state. PARTIAL.** The page is fixed: a live line on each of the 6 bots, the token monitor's burn rate, window and week use, window reset and programs, and the housekeeping report's last-sent time, each red NO DATA when absent, and never invented (W1, W2, W3, W10, before/after row 6; the new bots file is in DATA-CONTRACT.md). **But no writer for these files exists yet, so until RAMBO builds them (DESKTOP-WORK items 5 and 7) you will see red NO DATA.** That is the true state. The housekeeping agent has still never sent a report.
7. **Everything typed as if live. PARTIAL.** The two claims v3 stated as fact are now labelled typed notes with their date ("Proven 2026-10-01", the 75% quota forecast; I also say its "Saturday" has passed) and the Grok "31 days unproven" claim is labelled (before/after row 7, W11). **Not labelled one by one:** the other descriptions and how-to lines, which are descriptions rather than statuses, and facts inside them such as "Jorge asked twice" (KNOWN-LIMITS 14).
8. **Repairs log hand-maintained. FIXED.** All 12 rows kept word for word, the section says TYPED LOG and when it was last typed, and live rows come only from the state data file (NO DATA until it exists). Before/after row 8, survives test.
9. **Stamps without a zone. FIXED.** The packet's first line reads "Oct 6, 2:00 PM EDT" (EST in winter, year added when it is not this year). Before/after row 9, W12.

**Five more, found by reading the real v3**
- **D1 STATUS tab went to a one-line message. FIXED.** It now goes to a "Live status" block (age line, the 7 file badges, health, state, money). Before/after row D1.
- **D8 the GROK role "Hand work here" button threw a page error.** (GROK was not in the To list.) **FIXED:** v5 adds GROK; error in v3, none in v5; click check on all 13 To entries. Before/after row D8.
- **D9 the packet box label said "editable" but the box is read only. FIXED** (label corrected; the box stays read only because the buttons rebuild the packet). Before/after row D9.
- **D10 every button was in tiny 13-pixel type** because v3's `font:700 16px inherit` is invalid CSS. **FIXED** (17 pixels bold; the big copy buttons 20). Before/after row D10.
- **D3 the To list lacked GROK, COWORK and CHIEF. PARTIAL:** GROK added; the COWORK button sends to LLM-03; CHIEF has no window to receive a packet, so it has no button.
- **D4 the packet's "No tables, no bullet lists" while the packet is dash lines. NOT FIXED, on purpose:** the packet text must survive unchanged.

**From the v4 checkers' list (CHECK-4), as they apply to v5**
- F1, F2, F5, F6, F7, F14, F15 of CHECK-4 (install and rollback edge cases): the installer they described no longer exists (fix round 4). The package is copied into a new folder by hand and checked by a read-only script (INSTALL-BY-HAND.md).
- F3 build time in the future, F4 Grok bots "UP" without proof, F8 slow ticks, F13 tiny intervals, F16 redraw wiping a selection: ported and tested (W4, W11, W6, W13). F9 (wrong state in the reload gap): ported as the same swap design; v5 has no site-check timer, so the original race cannot occur; there is no separate test that provokes it (PARTIAL evidence: W8, W9, W14 pass).
- F10, F11 (the reminders bell) and F12 (site-check pings): not applicable, v3 has no bell and no pings (KNOWN-LIMITS 19).

**Intentional edits to v3 text (complete list, fix rounds 4 and 5 included).** The first nine were in the port; 10 to 19 were added in round 4; 20 to 26 in round 5.
1. " Runs every 2 minutes and executes anything in VTES-Inbox." -> " Executes anything dropped in VTES-Inbox." 2. CU-Orchestrator "Runs every 2 minutes" -> "runs". 3. ", runs jobs on Ollama, every 5 minutes." -> ", runs jobs on Ollama." 4. "or escalates. Every 15 minutes." -> "or escalates." 5. "Hourly. Finds any lane" -> "Finds any lane". 6. "The 15-minute poller" -> "The poller". 7. queued item 6 "ran in the last 15 minutes" -> "ran on its last scheduled run". 8. the 75% Max-quota sentence moved into a labelled typed note. 9. "Proven 2026-10-01." moved into a labelled typed note.
10. The packet box label "editable before pasting" -> "read only: use the buttons above to copy it" (D9). 11. LLM-02 session address -> https://claude.ai/code (defect 4). 12. Packet stamps in Eastern form (defect 9). 13. GROK added to the To and From lists (D8).
14. **(F18) The CODEX and GROK role addresses now print the words `<task>` and `<question>`:** v3 swallowed them as HTML tags and printed `codex exec ""` and `Second-Opinion.ps1 -Prompt ""`.
15. (F12) LLM-06 Codex CLI no longer has `url` https://chatgpt.com. 16. (F13) LLM-05 how-to line: "Send the packet with AirDrop or Notes first." -> "Get the packet onto the iPhone first (see the steps on this card)." 17. (F14, changed in round 5) the line shown after "Copy packet and open" for CODEX and RAMBO is click-by-click or says the desktop executor does it; for LOCAL it says not to give the packet to any Claude window (N10). 18. (F15, changed in round 5) repair row 10 gains the visible label "(typed note 2026-10-02; the note gives no time zone, so this page cannot say which clock it means)". 19. (F17) the footer sentence "your v3 file is untouched ..." was removed.
20. (round 5, F14) the bots section lead: "Check any of them with Get-ScheduledTask." -> "The desktop executor (RAMBO) checks the tasks on the PC; you type nothing." 21. (round 5, F14) the LLM-06 how-to line "Windows Terminal, type codex, Enter, then Ctrl+V. First time: shortcut ..." -> "You type no command: the desktop executor runs Codex for you (see the steps on this card). First time only: the shortcut ...". 22. (round 5, F14) the CODEX and GROK role addresses are prefixed "For RAMBO only (typed in v3; the desktop executor runs it, you type nothing):" (round 5 wrote "Address (typed ..."; round 6 changed it to the sentence quoted here, which is what the page shows; CHECK-8 flaw 10 found the old quote) (the address text itself is unchanged). 23. (round 5, N10) every hand-off packet whose note looks like a Social Security number leaves that note out unless the packet is for LOCAL (the packet says why). 24. (round 5, N11) on windows up to 1700 pixels (round 7: was 1500) the 8 live tabs show before the 10 OLD PANEL tabs (screen order only; the page-source order and the tab names are unchanged), with a scroll bar and a hint line. 25. (round 5, N12) the PANEL and INDEX corner buttons and the old-panel tab names are at least 14 px. 26. (round 5, N1) the status strip colours follow the content (a bad bot, a down window, impossible numbers), not just the age of the file.

## Section C - What you now have
Folder panel-rebuild/v5/: `package/` (the complete install: VTES-LLM-LAUNCHER_v5.html (34,479 bytes), vtes5-live.js, vtes5-ui.js, vtes5-config.js, 7 data files and MANIFEST.sha256); VERIFY-v5.ps1 (read-only, ASCII); INSTALL-BY-HAND.md; FIX-ROUND-5.md (and FIX-ROUND-4.md, history); DATA-CONTRACT.md; DESKTOP-WORK.md; KNOWN-LIMITS.md; TEST-REPORT.md; build-v5.js (rebuilds the page and the manifest from the real v3 copy and refuses if its SHA-256 differs); the tests and their result files. The real v3 copy is in panel-rebuild/v3-live/ with INVENTORY_REAL-V3_2026-10-06.md.

## Section D - What is NOT done or NOT proven (so nothing hides)
1. **No data writers exist.** Until RAMBO builds them (DESKTOP-WORK), every light on the page is red NO DATA. The page is honest; it is not yet informative.
2. **Not run on Windows, PowerShell 5.1, Edge, a real clipboard or real time.** The exact PC check for each is in KNOWN-LIMITS.md.
3. **The ten old-panel sections are still the stale snapshot** (labelled).
4. **Typed text is only partly labelled** (item 7 above).
5. **The Desktop shortcut for v5 is not made:** that is a separate order for your yes.
6. **The three other Desktop pages were never seen;** the PowerShell fixture uses stand-ins for them next to the real v3 launcher.
7. **Charter end-of-session items not done by me:** I did not read or update OPEN-ITEMS.md or RECURRING-ISSUES.md (the order limits my work to panel-rebuild/v5/). For the cloud keeper: the dated line is in FIX-ROUND-5.md Section D item 6.
8. **I changed one queued item's wording** (a typed "last 15 minutes" in the CHIEF packet) because it was a typed interval; it is in the list of 9 intentional edits.

## Section E - Counts and one question
**Brief defects: FIXED 6, PARTIAL 3, NOT FIXED 0. Found in v3: FIXED 4 (D1, D8, D9, D10), PARTIAL 1 (D3), NOT FIXED 1 on purpose (D4). CHECK-5 flaws F1 to F18 (my count after round 4, unchanged): FIXED 16, PARTIAL 2 (F5, F14), NOT FIXED 0; CHECK-6's 20 flaws (N1 to N19 and F14): FIXED 18, PARTIAL 2, NOT FIXED 0 (FIX-ROUND-5.md). Tests: round-5 totals are history (see FIX-ROUND-6.md); VERIFY 214 of 214 with the whole test area identical every time; nothing lost 166 of 166; packet pairs 144 of 144.**

Jorge, shall the independent checker audit round 5 now? (yes/no)

TRK-2026-9910-B · PORT-REPORT · v5 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5

## Fix round 7 - what the port changed (CHECK-8, 25 flaws)
Only the page and its text changed; v3's file is never touched (its SHA-256 is still 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3 and the build refuses any other v3).
1. (class 1) vtes5-live.js: every data file passes through ONE sanitiser at load and at every reload; the page's old test clock hook is gone. vtes5-ui.js: each card and each panel is drawn on its own, a failing one shows its own red box, and a watchdog turns the page red when a redraw fails or is more than 3 minutes old.
2. (class 1) the build adds a separate start-up script after v3's script: timers first, then the RAMBO button, Read me first and Live status, then the first paint, each in its own try/catch.
3. (class 2) a confirmation tick under the note box ("This note has NO client personal data (...)"); the copy, open and show buttons for every destination except LOCAL are switched off until it is ticked; the grey line under the note box and the Read me now say what the digit guard cannot catch.
4. (class 2) the digit guard was extended (commas, colons, brackets, many spaces, spelled and mixed digits in English and Spanish, base64 and hex, bank, licence and passport shapes and words, birth phrases, invisible characters) and two false alarms were fixed (ZIP+4 with a city, ZIP then phone).
5. (class 4) the Read me sentence about v3 now names the one removed link; the LOCAL typed lines no longer say BLOCKED beside a live CONFIRMED; the local-only folder rule is an allow rule; grey strip entries say NOT PROVEN; a stale Miami-Dade count is an OLD mark; jargon moved to "For RAMBO" lines; the removed interval words are searchable again; the LLM-05 and LLM-06 lines name their card and section; external link text names the destination.
6. (class 4) layout: the tab bar scrolls under 1700 px (87 px tall at 1536 x 730), the corner box no longer covers the footer, and every pixel font size is rem.

## Section F - Every line of v3 text the build changes, adds to or removes (generated by build-v5.js; fix round 8)
The Read me on the page prints the number of lines in this list (34). The cards, bots, queued items, picker rows, repairs rows and tabs themselves are all still there (test-v3-survives.js).
<!-- CHANGE-LIST-BEGIN -->
GENERATED by gen-text-diff-r9.js from the lines a person sees on the real v3 page and on the v5 page (every state). Times are ignored when comparing.

### F1. Lines of v3 that are not on the v5 page unchanged (48)
1. v3 said "2026-10-02 AGENTS Burn-rate agent installed, runs 7:00 AM daily ADDED"; v5 says "2026-10-02 AGENTS Burn-rate agent installed, runs 7:00 AM daily (typed note 2026-10-02; the note gives no time zone, so this page cannot say which clock it means) ADDED".
2. v3 said "5. Queued items: now one click each"; v5 says "5. Queued items: one click fills the note box".
3. v3 said "Address: Drop JOB-*.md into G:\My Drive\VTES-Inbox"; v5 says "For RAMBO only (typed in v3; the desktop executor runs it, you type nothing): Drop JOB-*.md into G:\My Drive\VTES-Inbox".
4. v3 said "Address: Drop JOB-*.md with CLASS: and PROMPT: into G:\My Drive\VTES-Inbox-LOCAL"; v5 says "For RAMBO only (typed in v3; the desktop executor runs it, you type nothing): Drop JOB-*.md into G:\My Drive\VTES-Inbox".
5. v3 said "Address: Second-Opinion.ps1 -Prompt ''"; no single v5 line replaces it (removed, moved, or now shown in several lines).
6. v3 said "Address: codex exec ''"; no single v5 line replaces it (removed, moved, or now shown in several lines).
7. v3 said "Address: vtes://llm-01"; no single v5 line replaces it (removed, moved, or now shown in several lines).
8. v3 said "Address: vtes://llm-02"; no single v5 line replaces it (removed, moved, or now shown in several lines).
9. v3 said "Address: vtes://llm-03"; no single v5 line replaces it (removed, moved, or now shown in several lines).
10. v3 said "Address: vtes://llm-04"; no single v5 line replaces it (removed, moved, or now shown in several lines).
11. v3 said "Address: vtes://llm-05"; no single v5 line replaces it (removed, moved, or now shown in several lines).
12. v3 said "Address: vtes://llm-06"; no single v5 line replaces it (removed, moved, or now shown in several lines).
13. v3 said "Address: vtes://llm-07"; no single v5 line replaces it (removed, moved, or now shown in several lines).
14. v3 said "Address: vtes://llm-08"; no single v5 line replaces it (removed, moved, or now shown in several lines).
15. v3 said "CU-Orchestrator is chartered and Runs every 2 minutes on the free lane: closes, re-queues or escalates each Outbox result. An ACK with no artifact is flagged as a RECEIPT."; v5 says "CU-Orchestrator is chartered and runs on the free lane: closes, re-queues or escalates each Outbox result. An ACK with no artifact is flagged as a RECEIPT.".
16. v3 said "Cheap bulk drafting and summarizing. Gemini CLI can run headless on the PC under GEMINI.md."; v5 says "Cheap bulk drafting and summarizing. Gemini CLI can run headless on the PC.".
17. v3 said "Classify, tag, extract, summarise, rename, and all client personal data. Never leaves the PC."; v5 says "Classify, tag, extract, summarise, rename, and all client personal data (typed in v3: 'Never leaves the PC' - only true once a local-only folder outside Google Drive and OneDrive is confirmed; see the LOCAL save step on this card).".
18. v3 said "Claude desktop app, Code tab (or green D tray icon), then Ctrl+V."; v5 says "How to open (typed instruction from v3, not checked by this page): Claude desktop app, Code tab (or green D tray icon), then Ctrl+V.".
19. v3 said "Claude desktop app, Cowork tab (or orange X tray icon), then Ctrl+V."; v5 says "How to open (typed instruction from v3, not checked by this page): Claude desktop app, Cowork tab (or orange X tray icon), then Ctrl+V.".
20. v3 said "Confirm CU-Orchestrator ran in the last 15 minutes and list any open RECEIPT items it flagged."; v5 says "Confirm CU-Orchestrator ran on its last scheduled run and list any open RECEIPT items it flagged.".
21. v3 said "Copied. Codex CLI is opening. Windows Terminal, type codex, Enter, then Ctrl+V. First time: shortcut 'Codex - sign in (Jorge)'."; no single v5 line replaces it (removed, moved, or now shown in several lines).
22. v3 said "Copied. On the iPhone, open the Claude app. Send the packet with AirDrop or Notes first."; v5 says "Copied. On the iPhone, open the Claude app. Get the packet onto the iPhone first (see the steps on the LLM-05 card in section 2).".
23. v3 said "Copied. Save the packet as JOB-*.md in G:\My Drive\VTES-Inbox-LOCAL with CLASS: and PROMPT: lines."; no single v5 line replaces it (removed, moved, or now shown in several lines).
24. v3 said "Copied. Save the packet as JOB-*.md in G:\My Drive\VTES-Inbox."; v5 says "For RAMBO only (typed in v3; the desktop executor runs it, you type nothing): Drop JOB-*.md into G:\My Drive\VTES-Inbox".
25. v3 said "Copied. Windows Terminal: codex exec '<task>' then paste."; no single v5 line replaces it (removed, moved, or now shown in several lines).
26. v3 said "Files, OneDrive, Chrome, 1Password, printer, county sites, OCR, tax jackets. Runs every 2 minutes and executes anything in VTES-Inbox."; v5 says "Files, OneDrive, Chrome, 1Password, printer, county sites, OCR, tax jackets. Executes anything dropped in VTES-Inbox. Check-in interval: every 5 minutes (read from the PC check-in report).".
27. v3 said "Free executor. Watches VTES-Inbox-LOCAL, runs jobs on Ollama, every 5 minutes."; v5 says "Free executor. Watches VTES-Inbox-LOCAL, runs jobs on Ollama.".
28. v3 said "Hourly. Finds any lane or agent not documented in the shared files and files a BLOCKER."; v5 says "Finds any lane or agent not documented in the shared files and files a BLOCKER.".
29. v3 said "INDEX"; no single v5 line replaces it (removed, moved, or now shown in several lines).
30. v3 said "Maintained by hand in VTES-LLM-LAUNCHER_v3.html. Repairs and enhancements across Jorge's windows."; v5 says "TYPED LOG. Maintained by hand in VTES-LLM-LAUNCHER_v3.html; the last row was typed on 2026-10-02. Nothing in this table is checked by this page. Repairs and enhancements across Jorge's windows.".
31. v3 said "No card numbers, passwords or Social Security numbers in this box. Client personal data goes to LOCAL only."; v5 says "NOT ALLOWED YET: this note has not been confirmed. Tick the box under the note box in section 1: 'This note has NO client personal data'. Client personal data goes to LOCAL only.".
32. v3 said "On the iPhone, open the Claude app. Send the packet with AirDrop or Notes first."; v5 says "Copied. On the iPhone, open the Claude app. Get the packet onto the iPhone first (see the steps on the LLM-05 card in section 2).".
33. v3 said "Open Claude ChatHand work here"; v5 says "Open Claude Chat (claude.ai)Hand work here".
34. v3 said "Open Claude Code CloudHand work here"; v5 says "Open Claude Code sessions list (claude.ai/code)Hand work here".
35. v3 said "Open Codex CLI"; v5 says "Copy packet for Codex CLI".
36. v3 said "Open GeminiHand work here"; v5 says "Open Claude Chat (claude.ai)Hand work here".
37. v3 said "Open Grok (SuperGrok)Hand work here"; v5 says "Open Grok (SuperGrok) (grok.com)Hand work here".
38. v3 said "Reads every Outbox result, judges it on the free lane, closes, re-queues or escalates. Every 15 minutes."; v5 says "Reads every Outbox result, judges it on the free lane, closes, re-queues or escalates.".
39. v3 said "Separate ChatGPT pool. Proven 2026-10-01."; v5 says "Separate ChatGPT pool.".
40. v3 said "Standby. Nothing to open."; no single v5 line replaces it (removed, moved, or now shown in several lines).
41. v3 said "TRK-2026-9910-B v3 2026-10-02 CURRENT. Registry: LLM-WINDOW-REGISTRY_v2.md. Lanes: EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md. #VTES-control-panel #LLM-registry"; v5 says "TRK-2026-9910-B · v5 · built Oct 6, 1:00 PM EDT · CURRENT. For RAMBO: registry LLM-WINDOW-REGISTRY_v2.md, lanes EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md. #VTES-control-panel #LLM-registry".
42. v3 said "The 15-minute poller that wakes RAMBO to execute what is in VTES-Inbox (JOB-0079)."; v5 says "The poller that wakes RAMBO to execute what is in VTES-Inbox (JOB-0079).".
43. v3 said "The packet (editable before pasting)"; no single v5 line replaces it (removed, moved, or now shown in several lines).
44. v3 said "These run by themselves on the PC. Check any of them with Get-ScheduledTask."; no single v5 line replaces it (removed, moved, or now shown in several lines).
45. v3 said "These were grayed out as NOT READY. Each now sends a ready packet to the right lane. Items that need your call say so in the packet and wait for your GO."; v5 says "Each button puts the item in the note box and chooses the right lane. Then tick the box under the note box (not needed for LOCAL) and copy the packet. Items that need your call say so in the packet and wait for your GO.".
46. v3 said "Use only for what needs Claude. About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday."; v5 says "Typed note, not live: on 2026-10-01 v3 said about 75% of the Max quota was used and forecast it to run out on a Saturday. That date has passed. The live burn rate is in the Token monitor panel under Bots.".
47. v3 said "Windows Terminal, type codex, Enter, then Ctrl+V. First time: shortcut 'Codex - sign in (Jorge)'."; no single v5 line replaces it (removed, moved, or now shown in several lines).
48. v3 said "← PANEL"; no single v5 line replaces it (removed, moved, or now shown in several lines).

### F2. Lines that are new on v5: the Read me, Live status, state lines on every card, the panels, the Miami-Dade section and the tick box. They are not listed one by one.

### F3. Every patch the build makes (51 patches and 1 style change), with its kind
1. title [TEXT]: the page title says v5 and carries the TRK number.
2. css [CODE]: adds the v5 style rules (vtes5.css).
3. scripts [ADD]: loads the config file, the seven data files, vtes5-live.js and vtes5-ui.js, and holds the build time.
4. tabhint [ADD]: adds the line under the tab bar that says when some tabs are off the edge.
5. top [ADD]: adds the slot for the Read me, Live status and the WHOLE PAGE line.
6. leadlead [TEXT]: the repairs lead says TYPED LOG: nothing in the table is checked by the page.
7. botslead [TEXT]: the bots lead says the lines are read from data files and the desktop executor checks the tasks.
8. repairslive [ADD]: adds the slot for the live repair rows under the typed table.
9. sect7 [TEXT]: the footer stamp says v5 and the real build time, and a Miami-Dade section sits above it.
10. tabs-status [LINK]: the STATUS tab goes to #livestatus (the new Live status heading), not to #status.
11. tabs-add [ADD]: adds a MIAMI-DADE tab at the end of the page tabs.
12. tabs-render [TEXT]: each old-panel tab says OLD PANEL, snapshot of 2026-09-02, not live.
13. panel-btn [TEXT]: the PANEL button says OLD, snapshot, not live.
14. index-btn [TEXT]: the INDEX button says OLD, snapshot, not live.
15. url-llm02 [TEXT]: LLM-02 opens the sessions list, because the typed session address may be an old session.
16. t-llm01 [TEXT]: a typed schedule (every 2 minutes) is removed: nothing proves it.
17. t-chief [TEXT]: a typed schedule (every 2 minutes) is removed.
18. t-localexec [TEXT]: a typed schedule (every 5 minutes) is removed.
19. t-orch [TEXT]: a typed schedule (every 15 minutes) is removed.
20. t-prop [TEXT]: a typed schedule (hourly) is removed.
21. t-poller [TEXT]: a typed schedule (15-minute) is removed.
22. t-queued [TEXT]: a typed schedule (15 minutes) is removed.
23. t-rambo [TEXT]: a typed quota forecast is moved into a dated typed note.
24. t-codex [TEXT]: a typed claim (Proven 2026-10-01) is moved into a dated typed note.
25. d9 [TEXT]: the packet box label said editable but the box is read only.
26. stamp [TEXT]: packet time stamps now carry the Eastern time zone.
27. win-grok [ADD]: adds a GROK row to the window list, so the picker and the packet can name it.
28. guard [CODE]: the note passes through the digit checker before it is put into a packet.
29. render [CODE]: the live cards replace the static cards (same data, same order).
30. search [CODE]: the search matches only the text v3 matched, never the live state lines.
31. rambo-slot [ADD]: adds the slot for the big RAMBO button under the page title.
32. url-llm06 [TEXT]: the Codex CLI card no longer opens chatgpt.com, because Codex runs on the PC.
33. airdrop [TEXT]: AirDrop does not exist on a Windows PC.
34. how-local [TEXT]: the old LOCAL instruction saved client data in a Google Drive folder, which uploads it.
35. local-j [TEXT]: the LOCAL description claimed it never leaves the PC, which is true only for a confirmed local-only folder.
36. local-a [TEXT]: the LOCAL address told you to drop files in a Google Drive folder.
37. local-pick [TEXT]: the picker line claimed personal data never leaves the machine.
38. how-codex [TEXT]: a typed command is removed: the desktop executor runs Codex.
39. how-rambo [TEXT]: the RAMBO how-to line is written as click steps.
40. how-llm06 [TEXT]: a typed command is removed from the LLM-06 line.
41. row10 [TEXT]: repair row 10 labels its typed schedule as a typed note with no time zone.
42. gate-line [TEXT]: the line under the note box carries the three guard sentences, and the tick box is added under it.
43. refresh-gate [CODE]: the packet box shows the reason instead of a packet while the tick is missing.
44. show-gate [CODE]: Just show the packet is refused until the tick is made (not needed for LOCAL).
45. go-gate [CODE]: Copy packet and open is refused until the tick is made (not needed for LOCAL).
46. queued-head [TEXT]: the queued heading no longer says one click each.
47. queued-lead [TEXT]: the queued lead no longer says the page sends a ready packet, and drops a sentence about an older page.
48. queued-status [TEXT]: the status line after a queued button is worked out from the real state of the Copy packet and open button (run-time line).
49. gemini [TEXT]: the file name GEMINI.md is removed from the Gemini line.
50. footer-rambo [TEXT]: registry file names move into a For RAMBO line.
51. init [CODE]: a start-up script of its own draws the top block and sets the timers.
52. rem [CODE]: every pixel font size in the style blocks becomes rem (16 px = 1 rem), so the browser text-size setting works.
<!-- CHANGE-LIST-END -->
