# D-001 — Install the panel on the PC and schedule its checks
**DISPATCH-001 · TRK-2026-9910-B · 2026-09-30 · #dispatch #install #panel #PASTE-X** · State: OPEN
**From:** LLM-02 Cloud · **Assignee line (build/install):** LLM-01 RAMBO → LLM-06 Codex → LLM-03 Cowork → BOTS · **Reviewer:** a different company than whoever builds (Gemini LLM-08 or Grok LLM-07, by paste).
**ACK deadline:** 30 minutes (PC agent) or 2 hours (Cowork). **Max hops:** 2.

**Task (Jorge's words, condensed):** build and install the control panel as modules; the panel must stay healthy without him.

**Do:** 1) Get the files from git branch claude/executor-tray-icon-1cazza, folder tools/vtes-panel/. 2) Copy the whole folder to G:\My Drive\MY-DESK\VTES-PANEL\ (move any older launcher to _Superseded first). 3) Run, with Windows PowerShell 5.1 (powershell.exe): Verify-VtesPanel.ps1 -SelfTest (expect RESULT: 8 passed, 0 failed); Write-VtesStatus.ps1 -SelfTest (8 passed); Export-ProgramsData.ps1 -SelfTest (6 passed); VTES-RedBell.ps1 -SelfTest (expect the lines it prints, all PASS). 4) Run Verify-VtesPanel.ps1 (no switch): expect OK with 15 code files. 5) Schedule Verify-VtesPanel.ps1 daily at 07:00 as a task named VTES-Panel-Verify (current user, no admin). 6) Open VTES-PANEL.html in Chrome: integrity box must be green. Screenshot it.

**Done-when (proof):** the four self-test result lines pasted; the OK line; the screenshot; the task name. **Not done without them.**
**Forbidden:** editing any panel file; anything outbound; any password or key. **Rollback:** delete task VTES-Panel-Verify; delete the copied folder.
**Escalation:** no ACK by the deadline, or a failed self-test, moves this card down the line once. Second failure returns it to Jorge with a WORKAROUND-CERT.

Want a different first assignee for this card?
