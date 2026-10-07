# PORT-REPORT - the live layer ported onto Jorge's real launcher (v5) (TRK-2026-9910-B)

**HISTORY AND LIMITS - nothing here is an install step.** The only install document is INSTALL-BY-HAND.md. Text in double quotes in this file is a page string or a VERIFY string, tested word for word by test-quotematch-r9.js. The test totals of every round are in FIX-ROUND-9.md (round 9) and the older FIX-ROUND files (history, each marked superseded); this file carries no test total, so it cannot go stale.

SONNET 5.5 · PANEL V5 PORT. Window: CODE, CLOUD / WEB EXECUTOR. Branch claude/panel-v5-port. Work only in panel-rebuild/v3-live/ and panel-rebuild/v5/. No Drive writes, no PC, no pull request.

## Section A - Answer first
1. **Your real v3 launcher was read from Drive and is a byte-exact copy:** SHA-256 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3. The build refuses any other file.
2. **Nothing of v3 was removed.** Every card, bot, queued item, picker row, repairs row and tab is still there (test-v3-survives.js). The lines of v3 text that changed are listed in Section F, generated from the real pages, not counted by hand.
3. **There is no script that copies, moves or deletes, anywhere.** v5 is put in place by hand in File Explorer (INSTALL-BY-HAND.md) and checked by the read-only VERIFY-v5.ps1. The real v3 is never touched. Deleting the v5 folder is Jorge's decision, by hand, with his yes.
4. **I do not claim zero flaws.** KNOWN-LIMITS.md lists what is open, with the exact PC check for each.

## Section B - The nine defects in the brief, and five more found in v3
1. **RAMBO has no Open button. FIXED, with one limit.** A web page cannot launch a desktop app, so the cards that need one have a big Copy packet button and the click path in numbered plain words, and the card says why there is no Open button. The click-path words come from v3's how-to lines; whether they match the PC today is UNVERIFIED.
2. **vtes:// shown as plain text. FIXED.** A link appears only when the heartbeat says the shortcuts are registered AND that window's address-book entry is filled; otherwise one sentence says what is missing. That the link opens the right window is UNVERIFIED (needs the PC).
3. **PANEL, INDEX and 10 tabs go to the stale 2026-09-02 snapshot. PARTIAL.** All 12 are labelled on the tab or button itself. They still go to the snapshot, as the brief ordered.
4. **LLM-02 hard-coded session address. FIXED.** It opens the sessions list and says UNVERIFIED which session is current.
5. **Contradictory typed timings. PARTIAL.** Every typed interval is gone from cards and bots. Every check-in interval sentence is read from the heartbeat or bots file, or says unknown. Two leftovers: the bot task name CU-TokenMonitor-Hourly contains Hourly because that is its real name; repair row 10 keeps its typed 7:00 AM, with a visible label.
6. **Bots have no state. PARTIAL.** The page shows a live line on each bot, the token monitor and the housekeeping report, each red NO DATA when absent. No writer for these files exists yet (DESKTOP-WORK item 5 (bots report) and item 7 (the five other writers)), so red NO DATA is the true state.
7. **Everything typed as if live. PARTIAL.** The two claims v3 stated as fact and the Grok history are labelled typed notes with their date. The other descriptions and how-to lines are not labelled one by one (KNOWN-LIMITS, Section C).
8. **Repairs log hand-maintained. FIXED.** All 12 rows kept word for word, the section says TYPED LOG, and live rows come only from the state data file.
9. **Stamps without a zone. FIXED.** The packet's first line carries the Eastern zone.
- **D1 STATUS tab went to a one-line message. FIXED:** it goes to the Live status block.
- **D8 the GROK role Hand work here button threw a page error. FIXED:** GROK is in the To list.
- **D9 the packet box label said editable but the box is read only. FIXED.**
- **D10 every button was in tiny type. FIXED.**
- **D3 the To list lacked GROK, COWORK and CHIEF. PARTIAL:** GROK added; the COWORK button sends to LLM-03; CHIEF has no window to receive a packet.
- **D4 the packet says no bullet lists while it uses dash lines. NOT FIXED, on purpose:** the packet text must survive unchanged.

## Section C - What you have
Folder panel-rebuild/v5/: `package/` (the whole install: the page, vtes5-live.js, vtes5-ui.js, vtes5-config.js, seven data files and MANIFEST.sha256); VERIFY-v5.ps1 (read-only, ASCII); INSTALL-BY-HAND.md; DATA-CONTRACT.md; DESKTOP-WORK.md; KNOWN-LIMITS.md; the FIX-ROUND files; build-v5.js (rebuilds the page and the manifest from the real v3 copy); the tests and their result files. The real v3 copy is in panel-rebuild/v3-live/.

## Section D - What is NOT done or NOT proven
1. **No data writers exist.** Until RAMBO builds them, every light on the page is red NO DATA.
2. **Not run on Windows, PowerShell 5.1, Edge, a real clipboard or real time.** The exact PC check for each is in KNOWN-LIMITS.md.
3. **The ten old-panel sections are still the stale snapshot** (labelled).
4. **The Desktop shortcut for v5 is not made:** that is a separate order for Jorge's yes.
5. **Charter end-of-session items:** OPEN-ITEMS.md and RECURRING-ISSUES.md are not updated by this work (the order limits it to panel-rebuild/v5/); the cloud keeper does that.

Jorge, shall the independent checker audit this round? (yes/no)

TRK-2026-9910-B · PORT-REPORT · v5 · 2026-10-07 · CURRENT · #VTES-control-panel #panel-v5

## Section F - Every line of v3 text that changed, and every patch (generated by gen-text-diff-r9.js, fix round 9)
The page prints no number for this list. It says only that the text changes are listed here. test-claims-r9.js recomputes the list from the real v3 page and the v5 page and fails if this file differs.
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
