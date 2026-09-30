# TASK-C2D — CAPTURE-AND-REVIEW POP-UP (OD-CR-01) + GAS GAUGE — 2026-09-30
**From:** LLM-02 Cloud Executor · **To:** LLM-01 RAMBO · **TRK-2026-9910-B** · #OD-CR-01 #capture #review #gauge #PASTE-D
(No new TRK. Green: creates one folder, schedules two tasks, opens browser pages, **opens an Outlook draft but never sends**. Nothing is moved, deleted, sent or spent.) Same work as **dispatch cards D-006 and D-007**. If you are silent for 2 hours it passes to Cowork.

**Jorge's words, condensed (standing directive OD-CR-01):** capture the county permit and citation pages as PDFs, attach the PDF to a new Outlook email from Jorge@teamusasales.com with the To line blank, pop it up flashing on top of every window so he cannot miss it, and let him review and press Send.

## Do this AFTER the panel install order (`TASK-C2D_PANEL-INSTALL-AND-RED-BELL`), because it uses the same folder.

1. **ACK first.**
2. `git pull` on the branch. Run `Verify-VtesPanel.ps1 -Build` then `-Check`: expect `OK: 28 code files match`. Self-tests in Windows PowerShell 5.1: `VTES-CaptureReview.ps1 -SelfTest` (10 passed) and `VTES-Gauge.ps1 -SelfTest` (9 passed). **Paste both RESULT lines.**
3. Create `G:\My Drive\MY-DESK\CAPTURE-INBOX\` (new folder only).
4. **Prove the pop-up once with a harmless test file:** make a one-page PDF named `2026-09-30 _ TRK-2026-9910-B _ Portal-PDF _ TEST popup _ v1.pdf`, run `VTES-CaptureReview.ps1 -Pdf <that file> -Trk TRK-2026-9910-B -What "TEST ONLY - press Discard"`. Open another window on top first. **Screenshot showing the review window above it.** Press "Make email draft": an Outlook draft must appear from Jorge@teamusasales.com with the PDF attached and the **To line empty**. **Do not press Send.** Close the draft without saving. Then press Discard in the review window.
5. Schedule `VTES-CaptureReview.ps1 -Watch` at logon (task `VTES-Capture-Watch`). Report the task listing.
6. **Real captures (D-006):** #20001 case 20260245510 and permit 2026061642; #10980 process C2026170181 (fee page: ADD only, never Pay) and its folio page at the Property Appraiser. Use the Capture Desk page for numbers, links and the file-name builder. Save into CAPTURE-INBOX. The watcher pops each one up for Jorge. **If a page says OPEN, the PDF says OPEN. Report it as OPEN.**
7. **Gauge (D-007):** run `VTES-Gauge.ps1` once, check `vtes-budget.js` has real numbers, schedule every 15 minutes (`VTES-Gauge-15min`). For calibration ask Jorge for the two percentages on Claude's Settings, Usage screen (this is the one thing only he can read; if he prefers, Cowork can read the screen), then `VTES-Gauge.ps1 -Calibrate short=NN week=NN`.
8. Report `RESULT_CAPTURE-REVIEW-AND-GAUGE_2026-09-30.md` in VTES-Outbox: the RESULT lines, the test screenshot, the draft screenshot, the task listings, the PDF names captured, the first `vtes-budget.js`, and anything that did not work on Windows. Rollback = delete the two scheduled tasks and the CAPTURE-INBOX folder.

## Do NOT
Call Send, Reply or Forward in any form; fill the To line; open a review window without the file attached; put a key, password or card number in any file; edit a panel file (report the problem instead).

Did the test window come up on top of your other window?
