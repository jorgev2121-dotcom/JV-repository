# KNOWN-LIMITS - what the cloud could not test or did not do, and the exact PC check for each (TRK-2026-9910-B, port v5)

Section A - Things not done on purpose (the brief)
1. **The 10 old-panel tabs (APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES) and the PANEL / INDEX buttons still go to `file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html`,** the snapshot of 2026-09-02. They are labelled "OLD PANEL, snapshot of 2026-09-02, not live" on the tab itself. Building those ten sections natively in v5 is a later job. PC check: click one; if the file is not there the browser shows a "file not found" page.
2. **The ten sections' content is not live.** Nothing on this page reads their data.
3. **No Desktop shortcut.** INSTALL never creates one. That is a separate order for Jorge's yes (DESKTOP-WORK item 9).

Section B - Things the cloud cannot test (with the PC check)
4. **Windows.** Everything ran on Linux: headless Chromium for the page, PowerShell 7.4.6 for Linux for INSTALL and ROLLBACK. NOT run on Windows, Windows PowerShell 5.1, Edge or Chrome on the PC. PC check: copy the v5 package to `C:\temp\v5test`, run INSTALL with -DryRun and then for real with `-TargetDir C:\temp\v5test-out -V3File <the real v3 file>`, then ROLLBACK, and compare `Get-FileHash` of every file in the Desktop folder before and after.
5. **Windows junctions, `subst` drives and mapped drives (git refusal and the v3-folder refusal).** The code follows symbolic links and junctions (LinkType) and also asks git itself when git is installed; only Linux symbolic links were run (S6b, S6d, S6e). PC check: `cmd /c mklink /J C:\temp\pj <a folder inside a git checkout>`, then INSTALL -TargetDir C:\temp\pj\v5 -DryRun must print "inside a git checkout".
6. **The v3 folder fingerprint covers only the files directly in that folder,** not its sub-folders (the Desktop can hold thousands). The tests hash the whole fixture recursively, and INSTALL writes nothing outside the new folder (plus an optional stub in Undo_Manifests, which is outside both). PC check: none needed beyond item 4.
7. **The three other Desktop pages were never seen.** The PowerShell fixture uses stand-ins of the sizes in the brief (889, 35,553 and 9,880 bytes of random text) next to the real v3 launcher. The 889-byte, 35,553-byte and 9,880-byte real files are not part of this work.
8. **vtes:// registration.** Nothing here can register it. Until VTES-Open.ps1 -Install runs on the PC AND the heartbeat says vtes_scheme_registered=true AND the entry is filled, cards show one sentence saying what is missing. PC check: Win+R, type vtes://llm-01, press Enter.
9. **Clipboard.** The page tries the old copy route first, then the browser clipboard; tests replaced both with recorders. PC check: press the blue RAMBO button, then Ctrl+V into Notepad.
10. **Third-party links** (claude.ai/code, claude.ai, chatgpt.com, grok.com, gemini, 22 Drive proof files and the Drive index) were checked for form and opened as aborted requests only. PC check: click each once.
11. **Time.** The 2-hour, 10-hour and 60-second tests use Playwright's simulated clock. A real browser over real time is UNVERIFIED. PC check: leave the page open for an hour with the writers running; the RAMBO state line and the Live status block must agree.
12. **A test-only hook is in INSTALL-v5.ps1:** the environment variable `VTES5_TEST_FAIL_BEFORE` stops the copy before the named file, to prove a half-failed install can be rolled back (S3). It does nothing when unset. PC check: `Get-ChildItem Env:VTES5_TEST_FAIL_BEFORE` must find nothing.
13. **Folder names.** An accent and a space were tested (S16); `#`, `%` and `\` characters in names were not.

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
25. The tab bar is taller than in v3 because each old tab carries its label; on windows narrower than 1150 pixels it is no longer sticky so it cannot cover the page.

TRK-2026-9910-B · v1 · 2026-10-06 · KNOWN-LIMITS (port v5)

Section F - Added at the end
26. **A folder that was moved or renamed after the install cannot be rolled back by name:** the record names the old path and ROLLBACK refuses (exit 3, nothing removed). Move it back, then roll back (scenario S21).
27. **Fingerprinting a big Desktop folder takes time:** INSTALL hashes every file directly in the v3 folder, twice. Tested with 205 files and a 20 MB file (S22).
