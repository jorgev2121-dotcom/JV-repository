# KNOWN-LIMITS - what the cloud could not test or did not do, and the exact PC check for each (TRK-2026-9910-B, port v5)

Section A - Things not done on purpose (the brief)
1. **The 10 old-panel tabs (APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES) and the PANEL / INDEX buttons still go to `file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html`,** the snapshot of 2026-09-02. They are labelled "OLD PANEL, snapshot of 2026-09-02, not live" on the tab itself. Building those ten sections natively in v5 is a later job. PC check: click one; if the file is not there the browser shows a "file not found" page.
2. **The ten sections' content is not live.** Nothing on this page reads their data.
3. **No Desktop shortcut.** Nothing in the package or in INSTALL-AND-UNDO.md creates one. That is a separate order for Jorge's yes (DESKTOP-WORK item 9).

Section B - Things the cloud cannot test (with the PC check)
4. **Windows.** Everything ran on Linux: headless Chromium for the page, PowerShell 7.4.6 for Linux for VERIFY-v5.ps1 and for the install and delete commands. NOT run on Windows, Windows PowerShell 5.1, Edge or Chrome on the PC. PC check: copy the package to `C:\temp\v5test-src`, follow INSTALL-AND-UNDO.md Section A with the new folder `C:\temp\v5test-out`, expect `OK: all 11 of 11 package files`, then do Section B, and compare `Get-FileHash` of every file in the Desktop folder before and after.
5. **The install command cannot see git or the v3 folder.** There is no installer code any more (fix round 4). The command refuses a path that is not a full path, a path with a Desktop folder in it, a missing parent folder and an existing folder. It does NOT detect a full path inside a git checkout or inside the folder that holds the real v3 launcher; INSTALL-AND-UNDO.md Section A step 1 is a check in words for the desktop executor. PC check: none needed beyond item 4; do step 1 of the document before every install.
6. **Nothing fingerprints the v3 folder any more.** The old installer hashed the files in it before and after. The tests of fix round 4 hash the whole fixture recursively (including a copy of the real v3 launcher) before and after every scenario, and the page and package never write there; on the PC the proof is `Get-FileHash` of the Desktop folder before and after the install (item 4).
7. **The three other Desktop pages were never seen.** The PowerShell fixture uses stand-ins of the sizes in the brief (889, 35,553 and 9,880 bytes of random text) next to the real v3 launcher. The 889-byte, 35,553-byte and 9,880-byte real files are not part of this work.
8. **vtes:// registration.** Nothing here can register it. Until VTES-Open.ps1 -Install runs on the PC AND the heartbeat says vtes_scheme_registered=true AND the entry is filled, cards show one sentence saying what is missing. PC check: Win+R, type vtes://llm-01, press Enter.
9. **Clipboard.** The page tries the old copy route first, then the browser clipboard; tests replaced both with recorders. PC check: press the blue RAMBO button, then Ctrl+V into Notepad.
10. **Third-party links** (claude.ai/code, claude.ai, chatgpt.com, grok.com, gemini, 22 Drive proof files and the Drive index) were checked for form and opened as aborted requests only. PC check: click each once.
11. **Time.** The 2-hour, 10-hour and 60-second tests use Playwright's simulated clock. A real browser over real time is UNVERIFIED. PC check: leave the page open for an hour with the writers running; the RAMBO state line and the Live status block must agree.
12. **No test hook exists in any shipped file.** The installer and its test-only environment variable were deleted with it.
13. **Folder names.** A space, square brackets and a trailing slash were tested for VERIFY (V26); an accent, `#`, `%` and `\` characters in names were not. The copy command uses `Copy-Item -Path` with a `*`, which treats `[` and `]` in the PACKAGE path as wildcards: keep the package path free of brackets.

Section C - Things that are typed, not live
14. **Descriptions, how-to lines, the 6 queued items, the 9 picker lines and the 12-row repairs log are typed text from v3** and are not checked by this page. The repairs log and the two claims v3 stated as fact (Codex "Proven 2026-10-01", RAMBO "About 75% of the Max quota ... Saturday") are labelled; the other descriptions are not labelled one by one (they are descriptions, not statuses), and statements in them such as "Chat only; cannot write files" or "Jorge asked twice" are UNVERIFIED.
15. **The click paths** ("pick the session named RAMBO", "orange X icon", "green D icon") are written out from v3's how-to lines and the registry brief; whether they match the PC today is UNVERIFIED. The step "pick the one named RAMBO" is my wording and is marked UNVERIFIED on the card.
16. **Bot names still contain "Hourly"** (CU-TokenMonitor-Hourly) because that is the real task name. No sentence on the page claims an hourly schedule.
17. **Grok.** "Unproven for 31 days" is a typed note from the registry brief of 2026-10-06, labelled as such, not checked.
18. **Green for a bot means the Windows scheduler said the task ran and ended with result 0,** not that its work was right.

Section D - Things not carried over from v4 (the v4 page was a different, larger file)
19. The v4 Map, Console and Dir views, the reminders bell, and the "site answers" ping marks are NOT in v5. The bell needed vtes-reminders.js that v3 does not have; the site marks needed network calls and v3's header promises no internet is needed.
20. LLM-10 Copilot is not on Jorge's v3 page, so it has no card; the heartbeat may include it and the page ignores it.

Section E - Small things left as v3 had them
21. The hand-off picker offers LLM-01 to LLM-09, LOCAL, CODEX, RAMBO and now GROK (13 entries); COWORK's button sends to LLM-03; CHIEF has no Hand-work button (no window to receive it).
22. The packet's HOW TO ANSWER block says "No tables, no bullet lists" while the packet itself uses dash lines. Kept unchanged because the packet text must survive.
23. LLM-09 (Thin API router) is a standby bridge with nothing to open or paste into; it has no Copy-packet button, only Hand work here, and its state line.
24. The search box filters the cards only, not the Live status block, the panels or the Miami-Dade list.
25. **Tab bar (fix round 4).** On windows up to 1500 pixels wide the tab bar is ONE row that scrolls sideways, so the RAMBO paste button, which now sits directly under the page title, is on the first screen (measured at 1366x657, 1280x609, 1280x720 and 390x844 in headless Chromium). The 18 tabs no longer all show at once on those windows: scroll the bar. Wider windows keep the wrapped bar. Under 1150 pixels the bar is not sticky. Whether the button is on the first screen of Jorge's real browser window (toolbars, zoom, scaling) is UNVERIFIED: PC check, open the page without scrolling and say whether the blue RAMBO button is visible.

TRK-2026-9910-B · v1 · 2026-10-06 · KNOWN-LIMITS (port v5)

Section F - Added in fix round 4
26. **VERIFY-v5.ps1 reports data files as EDITED once a PC writer replaces them.** That is expected for `data\vtes5-*.js` (they are tagged "(data file)") and for `vtes5-config.js` if the status folder line was edited; it is a problem for any other file. A new manifest is needed only if the package itself is rebuilt.
27. **The manifest hash in INSTALL-AND-UNDO.md protects against a changed manifest only if the order carries the same hash.** Without `-ExpectManifestSha256` a doctored manifest that matches a doctored file passes (test V24a shows it). The document passes the hash; the executor must not drop it.
28. **VERIFY was run in PowerShell 7.4.6 for Linux only.** It uses only commands and .NET calls that exist in Windows PowerShell 5.1, but that is UNVERIFIED. The unreadable-file proof used `chmod 000` and a run as the unprivileged user `nobody`; Windows access-denied behaviour is UNVERIFIED (PC check: remove read permission for the user on one package file, run VERIFY, expect UNREADABLE).
29. **Scheduler result codes 267009 and 267011** are the Windows Task Scheduler's own values for "running" and "not yet run" (0x41301 and 0x41303). The page trusts them as given. PC check from the independent checker: while a task runs, `(Get-ScheduledTaskInfo -TaskName CU-Inbox-Job-Watcher).LastTaskResult` prints 267009. Unverified on this PC.
30. **Repair row 10's suffix "(typed note 2026-10-02, Eastern time)"** is the wording the order set. The page cannot check that the 7:00 AM in that row is Eastern time.
31. **Typed claims still not labelled one by one** (the independent checker's examples): LLM-05 "Say \"AP-0088: GO\" from the car and it counts.", COWORK "No inbound channel exists.", LLM-08 "Gemini CLI can run headless on the PC." These are descriptions typed in v3; they are unverified.
32. **Other typed commands remain on cards as v3 printed them:** the "Address:" lines (`codex exec "<task>"`, `Second-Opinion.ps1 -Prompt "<question>"`, the JOB-*.md folder lines) and the how-to text of LLM-01 and others. Fix round 4 removed only the instructions that told Jorge to run or save something himself.
33. **Fix round 4 edited text the order did not list as a v3 phrase:** LLM-06 `url` (chatgpt.com removed), LLM-05 "AirDrop or Notes" sentence, the GROK/LOCAL/CODEX/RAMBO "how" lines shown after "Copy packet and open", and the footer sentence. The card-text ones are in the intentional-edit list of test-v3-survives.js; all of them are listed in PORT-REPORT.md Section B and FIX-ROUND-4.md.

TRK-2026-9910-B · v2 · 2026-10-06 · KNOWN-LIMITS (port v5, fix round 4)
