# LEDGER — everything ordered for the VTES control panel, launcher, registry, orchestrator, token monitor, tray and ticker

Compiled 2026-10-06 by the cloud ledger agent. Read-only: nothing was written to Drive, Gmail or the PC. #VTES-control-panel #ledger #LLM-registry #JorgeValdes

## Section A — The answer first

**Both things happened. Orders fell through the cracks AND some were never deliverable. There are four distinct ways an order died.**

1. **Sent to a lane that cannot receive.** The Phase 2 order says "Assigned to: Cowork". The executors file (EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md, Drive 1ewQGj43s0tYzGlbp2E3DS4idmtt5Ztmi) says Cowork has "no channel exists; cannot receive". The spec behind it was first given to Grok on 2026-09-11, and the same file says Grok "cannot write files". The order then reached RAMBO only because it was filed into the Code inbox.
2. **Sent into a channel nobody reads.** PASTE-D-065, D-066 and D-067, the Windows launcher section, and the token-monitor check live as repo files under mailbox/to-desktop, mostly on unmerged branches. The poller reads Drive VTES-Inbox, not the repo. No ACK for any of them exists in Drive. OPEN-ITEMS 2026-10-01 20:15Z already warned: "nothing runs unless Jorge pastes".
3. **Receipt treated as progress.** An auto-ACK from VTES-LOCAL-POLLER means "received", nothing more. Eleven items below have an ACK and no EXECUTED or BLOCKER file.
4. **No owner at all.** Nobody is named to refresh or monitor the panel (RECURRING-ISSUES.md, 2026-10-06 entry: "Named owner needed: today there is none").

**One more thing that makes every repair harder: there are three panel files, and the records disagree on which is real.** The Desktop file VTES-CONTROL-PANEL-HOME.html is where RAMBO made the 10-02 edits. The repo copy C:\Users\JV\JV-repository\VTES-CONTROL-PANEL.html (footer "Built 2026-09-02 08:52") is where RAMBO made the 10-04 RED-7 edit. The Drive launcher copies were turned into redirect stubs on 10-02 that point at that stale repo copy and call it "the one real panel" (Drive 1uuH8C6gA-FtPhGoKIbRmhcN2GNtl6tBt). A third, ControlPanel.html, is named in the Phase 2 order. Cloud cannot see the PC, so this stays unresolved.

**How to read the numbers.** Days overdue are as of 2026-10-06. Where the order gave a due date I use it. Where it gave none, I say "no due date" and count days since it was ordered. Items are listed with the most recently overdue first, so the oldest orders are at the bottom. BLOCKED items are counted under NOT STARTED because the count line has no BLOCKED slot.

**Can the lane receive?** Facts used: RAMBO via Drive VTES-Inbox: YES (poller back 2026-10-01 20:25Z, ACKs seen through 2026-10-06 03:38Z; STATE-OF-PLAY 10-05 23:34 shows RAMBO active). RAMBO via repo mailbox: NO unless someone pastes or pulls. Cowork: NO. CODEX: no inbox watcher, runs only when someone types `codex exec`, and ChatGPT sign-in is still pending (registry LLM-06; RED-5 asked to remind Jorge). LOCAL (Ollama): yes, but 15 of 20 triage jobs ended BLOCKED on 10-02 and a panel job timed out for lack of RAM (Drive 1jRBPv0HDs3Pc_O_7_QWTjrVrneqRe8ML).

## Section B — The ledger, newest-overdue first

1. **Cross-LLM diagnosis, stages 2 and 3 (this review).** Ordered by Jorge, filed by cloud 2026-10-06 03:36Z to RAMBO and a Codex lane; Drive 1g6PV61OhnGbqgS544j9ujo03Wr7hpwp_. Due: none. Lane: RAMBO, can receive. Evidence: ACK_..._AUTO 2026-10-06 03:38Z only (Drive 1Y9yeV7QVHs-PDA5G25Yn4M8L-Cls8jVj). Status: **RECEIPT-ONLY**. Days overdue: 0.

2. **Panel-age line in the daily HEALTH report.** Jorge said yes, logged in OPEN-ITEMS row "addendum 2026-10-06 03:40Z". Due: none. Lane: none named; RECURRING-ISSUES says the owner "needs to be named". Evidence: HEALTH-2026-10-05 (Drive 1nC1DsAsLp373PyM00BZaEuxhnecO14IB) has no panel-age line; I found no order file to RAMBO for it (UNVERIFIED that none exists in the Inbox). Status: **FELL THROUGH** (born without an owner). Days overdue: 0.

3. **Relabel the dead CLAUDE button honestly (RED-7, first file).** Jorge approved 2026-10-04 14:47 ET. Lane: RAMBO. Evidence: EXECUTED_DECISION_RED-7_2026-10-04-144745.md (Drive 1mwtFkTNNcoSPwxDHfI2DVXacnW4qnc3F): button now reads "CLAUDE (use taskbar/Alt+Tab)", backup .bak-20261004. **Caveat:** the edit went into the repo copy VTES-CONTROL-PANEL.html, not the Desktop HOME.html. Status: **DONE with proof** (location of the live copy unverified). Days overdue: 0.

4. **RED-7 comment: add a last-refresh timestamp, top right of the header, on all pages (e.g. "SUN 2:51 ET 2026-10-04").** Jorge, 2026-10-04 14:51 and 14:52 ET, two later RED-7 files. Due: none. Lane: RAMBO, can receive. Evidence: ACKs for both files (Drive 1A-Ph9HtJ_Ir-AJCGWJMvjTaOoWt6PXRu, 1m_w1OZG1m2zJfC1QKxwPOYaL6c2wPhnM); the only EXECUTED file covers the first click, which had no comment. A third RED-7 click came 2026-10-05 23:03 with no comment. Status: **RECEIPT-ONLY**. Days overdue: 2 since ordered; no due date.

5. **RED-6: re-enable the panel builder task.** Approved by Jorge 2026-10-04 14:47 ET and again 2026-10-05 23:03 ET. Re-ordered by cloud in the registry note and in the cross-LLM order (Order 4). Lane: RAMBO, can receive. Evidence: ACK_DECISION_RED-6 on 10-04 (Drive 1nDyjeS5o8uthYSjWUfdm7fjA4seZViP8) and on 10-06 03:08Z (1L085WCh4pLnFFNN4rGKSrLztU6z6O3Qh). A title search for RED-6 finds no EXECUTED file. Status: **RECEIPT-ONLY**, two receipts, no execution. Days overdue: 2 since first approval; no due date.

6. **Phase 2-A: tree/index restructure, link count unchanged at 128.** Phase 2 order filed 2026-09-26 14:52 ET by Cowork (Drive 16S1yuc6bxT8GeuFxqsYk8LirBKyDO2wS); spec chain: owner directive 2026-09-11, assigned to Grok, rerouted to Cowork per DIR-0091. Due 2026-10-03. Lane named: "Cowork + RAMBO (desktop for build, Cowork for testing)". Cowork cannot receive; RAMBO can, via Drive. Evidence: ACK_..._AUTO dated 2026-10-01 04:25 PM ET (Drive 14xLs51upovlarjPh9f3lu-bUmNfIwAGe), five days after filing because the poller was dead 09-24 to 10-01. No validation report SPEC_VTES-Panel-Rebuild_VALIDATION-REPORT_2026-09-26.md and no ControlPanel.html.bak-20260926 found in Drive (searched by title). The HISTORY doc of 10-02 states "not built". Status: **RECEIPT-ONLY**. Days overdue: **3**.

7. **Phase 2-B: frozen header, scrolling body.** Same order and evidence as item 6. Current reality: the header covers the tab row and hides ALL (see item 13), so the opposite of this spec is live. Status: **RECEIPT-ONLY**. Days overdue: **3**.

8. **Phase 2-C: hover text on all 128 tiles.** Same order and evidence as item 6. Status: **RECEIPT-ONLY**. Days overdue: **3**.

9. **Phase 2-D: hashtags and lane colors (data-tags, data-lane, red/blue/green/purple icons).** Same order and evidence as item 6. The launcher cards carry hashtags, but the launcher is not the panel. Status: **RECEIPT-ONLY**. Days overdue: **3**.

10. **Phase 2-E: live progress ticker.** Same order; the order says RAMBO writes the polling logic, polling G:\My Drive\VTES-Outbox\EXECUTION-STATUS_*.md every 30 seconds; fallback "Coming Oct 10". Due 2026-10-03 (fallback 2026-10-10, not yet due). Evidence: only one EXECUTION-STATUS file exists in Drive, EXECUTION-STATUS_ROLODEX-30-JOBS_2026-09-26_1500.md (Drive 1FM2K6CW1LaHgN0EPNfKjs0OyoMz-Un4M). Nothing newer, so the ticker would have nothing live to read. Status: **RECEIPT-ONLY**. Days overdue: **3** against the main due date.

11. **"Windows" launcher section on the panel (desktop folder, PowerShell 7, JSON, Drive folders, etc.) with a vtes:// opener.** Jorge's request 2026-10-01, filed by cloud as PASTE-D-066 (serene-sagan numbering) in WORK-QUEUE_Panel-Windows-Launcher-Section_2026-10-01.md on branch claude/serene-sagan-k5us5v. Due: rides on Phase 2 (2026-10-03). Lane: "Code Desktop or Cowork (ONE owner)": Cowork cannot receive, and the repo file is on an unmerged branch. Evidence: no ACK, no claim file (CLAIM_ControlPanel_* search empty). Status: **FELL THROUGH**. Days overdue: 3.

12. **PASTE-D-065: wire the panel's LLM button to LLM-LINKS.html.** Jorge, 2026-10-02; filed by cloud. Branch claude/nifty-turing-2dzkhv, mailbox/to-desktop/WORK-QUEUE_LLM-Button-Links_2026-10-02.md. Due: none. Lane: Desktop Code via repo mailbox, which nobody polls. Evidence: cloud half exists (vtes-panel/LLM-LINKS.html on that branch, 7 subscription cards plus the last 50 Claude chats, a snapshot); Drive full-text search for "PASTE-D-065" finds only the HISTORY doc and TO-CLOUD.md, no ACK or result. **Number collision:** the same ID was issued on 2026-10-01 for county screenshots (branch serene-sagan). Status: **FELL THROUGH** (desktop half never delivered). Days overdue: 4 since ordered; no due date.

13. **PASTE-D-066: header hides the ALL tab.** Jorge's screenshot, 2026-10-02; file mailbox/to-desktop/WORK-QUEUE_Panel-Header-Hides-ALL-Tab_2026-10-02.md on branch nifty-turing. Same channel problem and same collision (D-066 was also the Windows launcher section, item 11). No ACK or result. The launcher REPAIRS log claims "Sticky header hid every anchor target - added scroll-margin-top FIXED" on 10-02; that is a different defect (anchor offset), so ALL-pill clipping is not shown fixed. Status: **FELL THROUGH**. Days overdue: 4; no due date.

14. **PASTE-D-067: copy the live panel and every backup into Drive (PANEL-VERSIONS_2026-10-02) for Gemini.** Jorge, 2026-10-02; branch nifty-turing, WORK-QUEUE_Copy-Panel-To-Drive_2026-10-02.md. PASTE-LOG says "Block not yet issued to Jorge". Drive search for PANEL-VERSIONS returns nothing. Also a collision: D-067 was issued 10-01 for the COU classifier. Status: **FELL THROUGH**. Days overdue: 4; no due date.

15. **vtes:// address registration: `VTES-Open.ps1 -Install`, plus addresses for LLM-01, 03, 05.** Part of TRK-2026-9910-B v2, ordered by cloud 2026-09-30 (Drive 1RBf6Z1xolzDCfSTGxagCYIOhYKqQFaRk). Lane: RAMBO, can receive. Evidence: RESULT_TRK-2026-9910-B_v2_2026-10-02.md (Drive 14bBX_MoZ62UmXKWwreblQDOkXmUVM0XV): steps 1-3 done with hashes; **step 4 not run, waiting for Jorge's yes** (HKCU registry write); LLM-01, 03 and 05 have "no address yet"; tray "V" badge and the 1Password items (RED) not started. Status: **NOT STARTED — BLOCKED on one yes.** Days overdue: 4 since RAMBO asked; no due date.

16. **LLM launcher v3: build, deploy, browser test.** Built by cloud 2026-10-02 09:35 ET (HANDOFF Drive 1dIk8pQ-PMHNiyM65bP-XSJ7DBYHBgqjB), then "never opened in a browser". Evidence it later ran: a LOCAL job JOB-PANEL-20261002-164524.md (Drive 1vYWc3AHjmMIrrC8LAUPCBCNhPhEDv7y8) holds a handoff packet stamped 4:42:17 PM and the REPAIRS log (footer "TRK-2026-9910-B v3 2026-10-02"). Against that: both Drive launcher copies were replaced by redirect stubs at 18:42Z on 10-02 pointing at the stale repo panel. Where v3 lives now is **UNVERIFIED**. Status: **PARTIAL**. Days overdue: 4; no due date.

17. **Restore the missing top buttons (LLMs, bots, executor roles) on the live panel.** Jorge, 2026-10-02 09:28 ET, via Chat → Cowork → RAMBO. Lane: RAMBO, received. Evidence: EXECUTED_MSG-COWORK-TO-CODE_DESKTOP-EXECUTOR-SHORTCUT-AND-PANEL-RESTORE_2026-10-02.md (Drive 1JSGu5FeScaOoSH32stuCb8GLE31GfABv): order 3 "PARTIAL", an LLMS tab and two tiles added, no earlier version with those buttons found; RAMBO asks Jorge to name one missing button in a sentence. Status: **PARTIAL**. Days overdue: 4; no due date.

18. **Desktop Executor shortcut and a "Desktop Executor" tile at the top of the panel.** Same order as item 17, orders 1-2. Evidence: same EXECUTED file: .lnk files created (1441 and 1017 bytes), panel grew 15,174 to 16,402 bytes, backup .bak-20261002-a. Taskbar pin impossible on this Windows build. Status: **DONE with proof.** Days overdue: 0.

The six launcher items shown NOT READY. Ordered by Jorge 2026-10-02 09:28 ET (screenshot); v3 turned each into a "Send" card that only makes it dispatchable (HANDOFF section 4, point 4: "functionally unbuilt"). No due dates. Days overdue: 4 for each unless noted.

19. **Email attachments (build, review, send).** Card routes to RAMBO; send stays Jorge's. Evidence: no file. Status: **NOT STARTED.**

20. **Mini LLM control panel.** Older than the screenshot: ordered by Cowork 2026-09-13 (MSG-COWORK-TO-CODE_LLM-MINI-PANEL-01, Drive 1SJNGPupOxdoNwx9cMcsdmsed6eHjEIMO). RAMBO's reply the same day (Drive 1-qvetvQkj4SyiqG7Si2qvNkS0l2vr78N): approval card AP-0087 filed, build NOT STARTED, "gated". Jorge approved AP-0087 via Cowork chat on 2026-09-13 (Drive 1Gwi2QzZpN1bTqc2Nk9aLOSoYDaLQLVmJ: "execute now"). No build file in Drive since (searched MINI-PANEL). Whether RAMBO ever received that approval is UNVERIFIED. The v3 card now sends it to CODEX, which has no inbox and no sign-in yet. Status: **NOT STARTED.** Days overdue: **23** since 09-13.

21. **ALEC DD review links.** Card says "Owed to you twice already"; routes to RAMBO. Evidence: no file. Status: **NOT STARTED.**

22. **Out-of-turn progress flashes.** Card "Gated on your GO". Evidence: no file; it overlaps the Phase 2 ticker (item 10). Status: **NOT STARTED** (waiting on Jorge's GO).

23. **24/7 back-to-back runs.** Card says starting background processes needs approval. Night-run protocol exists (CLAUDE.md Rule 8), but nothing here is the panel feature. Status: **NOT STARTED** (waiting on approval).

24. **Orchestrator / Chief seat.** First ordered as JOB-0052 on 2026-07-30 (Drive 14byLUhJ1HjEAOk0EjP4h__Bao8bxtZe8): not built for about 63 days (OPEN-ITEMS rows 9138, 9141). Now CU-Orchestrator exists and runs: HEALTH-2026-10-05 shows Ready, LastResult 0; STATE-OF-PLAY 10-05 23:34 shows ORCHESTRATOR active 5 minutes earlier. Defects: silent sign-off blockers on 10-02, 10-04 and 10-05, handover written by RAMBO on its behalf, four false flags in three days, and the v3 card routes it to the LOCAL lane that judged wrongly. Status: **PARTIAL.** Days overdue: 4 for the launcher card; 68 since the original order.

25. **Phase 2-F: system tray icon with an Open Panel / Execution Status / Exit menu.** Same Phase 2 order. The order's own fallback was "Coming Sept 30". Template named: vtes_tray.py, "already built 2026-09-26": **I found no such file** in Drive or the repo (UNVERIFIED; the only tray script in Drive is VTES-Tray.ps1, 9-29, Drive 1oEzF15pD604qLiARIMePGQRiTg72_Ucm, a different file). The icon file on the PC cannot be checked from the cloud. Earlier tray work (TRK-2026-9740, ordered 2026-08-26) has an auto-ACK only in my search; I did not read that order. Status: **RECEIPT-ONLY.** Days overdue: **6** against "Sept 30".

26. **LLM Subscriptions Panel and tray icon (MSG-CHAT-TO-CODE_LLM-SUBSCRIPTIONS-PANEL-AND-TRAY-01).** Jorge via Chat, 2026-09-29; five orders A to E (copy files, link from the panel, tray icon at startup, check plan tags, dictation test). Lane: RAMBO, can receive. Proof demanded: PROOF_TRAY_20260929.png and a REPLY-TO-CHAT. Evidence: ACK_..._AUTO 2026-10-01 20:25Z only (Drive 1rs35AY-EPqwgq-m7jEkcnpuXlPp7Jk2j); no PROOF_TRAY or REPLY found. RAMBO's 10-02 edit added a tile linking the Subscriptions Panel HTML, which is a link, not orders B or C. Status: **RECEIPT-ONLY.** Days overdue: 7; no due date.

27. **Token monitor verification (cloud health_monitor.py + PANEL.html + panel-data.json).** Built 2026-09-29/30; Cowork wrote TASK-INSTALLER_TOKEN-MONITOR_2026-09-29.md for RAMBO ("three steps, five minutes"). Channel: repo mailbox/to-desktop, reached the working branch only through PR #19, merged by Jorge 2026-10-05 16:53 ET. Requires `git pull`, and the desktop git push fix (RI-002, "not yet confirmed by Jorge" in shift-brief/CURRENT.md) is also open. Evidence: no TOKEN-MONITOR-VERIFIED file in mailbox/to-cloud or Drive; panel-data.json is still the 09-30 seed with every model NO-KEY. Note: a separate desktop agent, CU-TokenMonitor-Hourly, is live (Ready, LastResult 0 in HEALTH 10-05); whether it meters correctly is UNVERIFIED. Status: **FELL THROUGH.** Days overdue: 7 since 09-29; no due date.

28. **Gemini API key (ADD-GEMINI-KEY.ps1).** MSG-CLOUD-TO-CODE_ADD-GEMINI-KEY_2026-09-29, priority HIGH; also "Gemini bus lane undelivered x3" since 2026-07-30 (JOB-0050). Lane: Jorge must create the key; shift-brief/CURRENT.md lists it BLOCKED. One thing needed: Jorge signs in at aistudio.google.com/app/apikey and pastes a key. **Possible shorter path (UNVERIFIED):** the registry says Gemini CLI logs in with the Google account and needs no API key; that was not tested. Status: **NOT STARTED — BLOCKED on Jorge.** Days overdue: 7 (68 since first asked).

29. **Refresher for Nodes 1-11 plus a named monitor.** Ordered in JOB-0090-R / APPROVAL-DURABILITY-01 (panel must be a regenerating view of Drive data); last build 2026-09-02 08:52. The history doc says the refresher was "switched off 2026-09-24". **The records conflict:** RAMBO's reply of 2026-09-01 says "Nothing regenerates this file" and the only panel task, MasterAgent Control Panel (Logon, User), is Disabled. So the refresher may never have existed. Lane/owner: none. Evidence: RECURRING-ISSUES.md 2026-10-06, third sighting in five weeks; header numbers disagree ("125 of 131 off" on the panel 10-02, "90 of 119" in the launcher log, "94 Disabled of 131" in HEALTH 10-05). The remedy is RED-6 (item 5) plus the HEALTH line (item 2). Status: **FELL THROUGH.** Days overdue: 12 since the stated switch-off (34 since the last build).

30. **PANEL-ADHD-REDESIGN-01 (read-aloud on every section, one location, tree index, approval cards inline).** Jorge, spoken 2026-09-07, via Chat to RAMBO (Drive 1X9qLraB3q5eYOuqKg_5F9jIHzrOrvXMl). Lane: RAMBO. Evidence: ACK_..._AUTO 2026-09-07 only (Drive 1mb2T44h_EzXdwjn78PsKMQCGaNTI0EqH); no REPLY or EXECUTED found. It overlaps Phase 2 and was never closed. Status: **RECEIPT-ONLY.** Days overdue: 29; no due date.

31. **Remote Control status line on the panel STATUS node and in _UPTIME-HEARTBEAT (JOB-0090-R-A, Order 3).** Chat to RAMBO, 2026-09-01. RAMBO's reply that day (Drive 1Kue6i9OvYlXHWbCFPJitv_ok4_tzINwO): "NOT EXECUTED". The data now exists: REMOTE-CONTROL-STATUS.md says CONNECTED, checked 2026-10-05 23:33, by CU-ClaudeRemote-Guard every 5 minutes. No evidence the panel shows it; the live panel could not be read. Status: **NOT STARTED** on the panel. Days overdue: 35; no due date.

32. **Panel findability: "vtes" in Windows search opens the panel (JOB-0090-R-A, Order 1).** Evidence: same REPLY, close-out PARTIAL overall, Order 1 landed: Desktop and Start Menu shortcuts read back "resolves: True", rollback script named. **Caveat:** the shortcut points at the repo copy, a snapshot. Status: **DONE with proof** for the shortcut. Days overdue: 0.

33. **Remote Control revived (JOB-0090-R-A, Order 2).** Handled by another lane. Evidence: REMOTE-CONTROL-STATUS.md (Drive 1z3ZrMHNBQ53ZnPqhjvLOp_nFIbaWx0Et), CONNECTED, session Jorge-PC, PID 46320, 2026-10-05 23:33; HEALTH-2026-10-05 agrees. **shift-brief/CURRENT.md still says "down since 2026-08-09", which this contradicts; the brief is stale.** Status: **DONE with proof.** Days overdue: 0.

34. **Window registry v2 (LLM-01 to LLM-09, IDs, hashtags, addresses).** Written by cloud 2026-09-30 (Drive 142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2) and copied to the PC by RAMBO with hashes (RESULT_TRK-2026-9910-B_v2). Known drift: registry says RAMBO runs every 15 minutes, the launcher card says every 2 minutes. Status: **DONE with proof** (file exists; correctness of each window's status not checked here). Days overdue: 0.

35. **JOB-0050: the three lists (Work Register, Agent and Orchestrator Status, 30 started-not-finished jobs) on the control panel, with item counts and a Register button, then hand the register to the Orchestrator.** Cowork, owner directive, 2026-07-30 (Drive 1wu9gu97S_p-uq7H_KrIUElzTXPBC1KIP). Due: none; the order demanded ACK_JOB-0050_2026-07-30.md with proof. Lane: Code, can receive. Evidence: no ACK_JOB-0050 anywhere in Drive (title search finds only the order). A Work Register packet was filed to Drive on 2026-09-30 (Drive 1XTxmj1iFahWmNlgnXFeSw9OO1su5TTWi), but nothing shows the lists on the panel. Part 2 was overtaken by CU-Orchestrator (item 24). Status: **FELL THROUGH.** Days overdue: **68** since ordered.

## Section C — What I could not check

1. The live panel, the Desktop launcher, the scheduled-task list and the PC's Inbox backlog cannot be read from the cloud.
2. I did not open TO-CLOUD.md (8.5 MB), the TRK-2026-9740 order, or the JOB-0090-R wired/dead table.
3. Drive ACK and EXECUTED searches were by title and full text; a result filed under an unrelated name would be missed.

PC check for the desktop: list `G:\My Drive\VTES-Outbox` for any EXECUTED_, RESULT_ or BLOCKER_ file mentioning PANEL, LAUNCHER, D-065, D-066, D-067 or RED-6, and report the size, last-modified time and footer line of the three panel files.

35 items: 5 done with proof, 3 partial, 11 receipt-only, 8 not started, 8 fell through

Yes or no: may the desktop run the one-time vtes:// registration (`VTES-Open.ps1 -Install`, current user only, one-command undo) that has waited for your word since 2026-10-02?

TRK-2026-9960 · v1 · 2026-10-06 · LEDGER (stage 1, cloud agent)
