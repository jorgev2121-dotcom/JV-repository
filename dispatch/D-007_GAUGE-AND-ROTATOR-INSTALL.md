# D-007 — Install the gas gauge, calibrate it, schedule it
**DISPATCH-007 · TRK-2026-9910-B · 2026-09-30 · #dispatch #gauge #governor #rotator #PASTE-X** · State: OPEN
**From:** LLM-02 Cloud · **Assignee line:** RAMBO (Desktop Code) → LLM-03 Cowork. **Reviewer:** a different window than the installer. **ACK deadline:** 2 hours. **Max hops:** 2.

**What:** `tools/vtes-panel/VTES-Gauge.ps1` reads Claude Code's own session logs on the PC, totals tokens over 5 hours and 7 days, and writes `vtes-budget.js` and `vtes-alerts.js` into the panel folder. The Budget page shows the gas gauge, and the Governor (LLM-09) routes around a window that is nearly full. If the gauge file goes missing or older than 2 hours, the red bell says so ("never go dark").

**Steps:**
1. Copy `tools/vtes-panel/` to the panel folder (see D-001). Run `VTES-Gauge.ps1 -SelfTest`. It must print `RESULT: 9 passed, 0 failed`.
2. Run it once for real. Open `vtes-budget.js` and confirm real numbers, not zeros.
3. **Calibrate (needs one look by Jorge):** in Claude, Settings, Usage shows percent used for the 5-hour and weekly windows. Run `VTES-Gauge.ps1 -Calibrate short=NN week=NN` with those two percentages. Until then the gauge shows tokens only, never a percent.
4. Schedule it every 15 minutes (Task Scheduler), as a normal user, no admin.
5. Run `Verify-VtesPanel.ps1 -Build` then `-Check`; expect `OK: 28 code files match`.

**Done-when (proof):** the self-test line, the first `vtes-budget.js` contents, the calibration file `vtes-gauge-config.json` (shows the two percentages), the scheduled-task listing, and the Budget page screenshot showing RUNNING. **Forbidden:** reading or copying any API key or token value; sending anything off the PC.
**Not proven on Windows.** Report honestly.

Is the Claude usage screen easy to find, or should Cowork read it for you?
