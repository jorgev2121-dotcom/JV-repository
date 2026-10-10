# Report — pop-ups (RI-001) and the panel header: every request, what was done, why it never held
TRK-2026-9952q · 2026-10-10 · from the repo record only. Requests made in chats this repo never saw are NOT counted.

## Section A — Panel header: 5 recorded requests
1. 2026-09-11 — Owner directive: restructure the panel. Given to Grok, then rerouted to Cowork. Lane could not touch the PC. Nothing built.
2. 2026-09-26 — Phase 2-B "frozen header, scrolling body" filed by Cowork. Cowork has no way to reach the PC. Only an automatic receipt came back, 5 days later. Counted as done. It was not.
3. 2026-10-02 — Screenshot: header covers the tab row and hides ALL (PASTE-D-066). The order named a file retired that same day. No result ever came back.
4. 2026-10-04 — Timestamp in the header. Receipt only, never executed.
5. 2026-10-06 — Header misreports active and inactive windows. Led to the v4/v5 rebuild. Built and checked, never installed.
Today's screenshot is the 6th appearance of the same fault.

**Why it never worked:** (1) orders went to lanes with no hands on the PC; (2) a receipt was counted as completion; (3) the target file changed under the orders; (4) the fix was never installed on the file you open; (5) no screenshot proof was ever required.
**What you should have done differently:** nothing. Your screenshots were correct. The failure was ours: no order should close without a screenshot of your live window.

## Section B — Pop-ups (RI-001): requests and outcomes
Roughly two years. The repo holds these entries:
1. 2026-08-15 — modal error boxes (launcher failures, Outlook reminder). Logged. Fixes not done.
2. 2026-08-16 — PaperPort dialog back 3 times in a day. Clicking OK proven useless.
3. 2026-08-18 — a trap found the cause: our own scheduled tasks open a PowerShell window every 3-5 minutes, which steals focus and drops keystrokes. Two tasks convicted by name (CU-Bus-Dispatcher, CU-Records-Watch).
4. 2026-08-18 — "-WindowStyle Hidden" was found to create the window and then hide it. That is why twelve earlier repairs failed. Fix: launch through Run-Hidden.vbs. It was left waiting for your button. **No record shows it was closed.**
5. 2026-08-20 — Adobe Acrobat pop-up. Resolved by removal.
6. 2026-10-10 — PDF Viewer error at login from a renamed Startup file. Job sent (9952n).
Still open and never executed: Outlook reminder fix (9015), PaperPort Send To Bar (9059), Windows Terminal profile (9014).

**Why you are still dealing with it a year later:**
1. Every fix was a setting. Something puts the setting back. Removal was proposed but only partly done.
2. The one fix that found the real cause (wrap the tasks in Run-Hidden) waited on you and was never verified with a before and after table.
3. Each session started with no memory, so each recurrence looked new.
4. New tasks are added faster than old ones are wrapped. Any task launched without Run-Hidden brings the problem back.

## Section C — The permanent fix (Tier 2 plus Tier 3)
1. Wrap or remove EVERY scheduled task that launches PowerShell directly (51 were counted on 08-18).
2. A nightly check lists any task that launches a console without Run-Hidden, and fails loudly.
3. Close only on a before and after table of foreground-steal counts.

Shall I send the desktop the job to wrap all 51 tasks and add the nightly check, yes or no?
