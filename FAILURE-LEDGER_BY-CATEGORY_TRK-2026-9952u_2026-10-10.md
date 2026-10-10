# Failure ledger by category — what failed, what should have happened, why it didn't, why it failed again, what proves the next fix holds
TRK-2026-9952u · 2026-10-10 · ☁️ cloud reading of the repo record.
**Denominators:** OPEN-ITEMS.md holds 757 rows covering 625 distinct tracking numbers. RECURRING-ISSUES.md holds 41 logged recurring problems. A crude status read of the 757 rows found: DONE 73, CLOSED 17, EXECUTED 8, IN PROGRESS 74, BLOCKED 33, WAITING 14, RUNNING 13, PARKED 9, STAGED 8, PARTIAL 3, NOT STARTED 1, AT JORGE 1, and **503 rows whose status wording could not be classified by machine**. Do not read these as a success rate. They are not one.
Category assignment below uses the titles in RECURRING-ISSUES.md; the details are in each RI entry. Where I did not read the detail I say so.

## Category 1 — Hand-off and channel failures (RI-005, 007, 023, 024, 037)
- **Failed:** work sent to a window that could not receive it, a question that appeared off Jorge's screen, two executors on one output folder, sessions with no shared memory.
- **Should have happened:** one channel, verified end to end (Drive jobs with an EXECUTED/BLOCKER result), and a daily check that every order has a result.
- **Why not implemented:** the channel was discovered late (RI-037: desktop cannot see git; Drive is the real channel).
- **Why it failed again:** receipts (ACK) were counted as results. Example: RED-6 approved twice, two receipts, no execution.
- **What would show the next fix holds:** a daily count "orders sent / results returned" with names of the gap. Not a promise.

## Category 2 — False completion (RI-002, 019, 022, 025, 027, 028)
- **Failed:** "done" reported without proof; capability claimed without testing; absence reported from a record, not the folder; checks that prove presence, never removal; three liveness tests all wrong at once.
- **Should have happened:** DONE requires verification output (this is already Charter Rule 2).
- **Why not implemented:** the rule existed in text. Nothing enforced it. Windows kept reporting what a file said, not what the screen did.
- **Why it failed again:** the checker was another AI reading another AI's report.
- **Next fix holds if:** the proof is a screenshot of Jorge's live window or a file listing, produced by a script, not an opinion.

## Category 3 — Automation dying silently (RI-015, 018, 038)
- **Failed:** scheduled tasks disabled for weeks, a poller dead 09-24 to 10-01, unattended routines nobody watched, a health check that showed false green.
- **Should have happened:** an alarm when an output file stops growing.
- **Why not implemented:** the heartbeat existed for some jobs, not all.
- **Why it failed again:** the monitor itself had no monitor.
- **Next fix holds if:** the alarm reaches Jorge's phone, and a missing alarm for 24 hours is itself reported.

## Category 4 — Pop-ups and focus theft (RI-001, 006)
- **Failed:** about two years. Cause found 2026-08-18: scheduled tasks open a PowerShell console every 3–5 minutes (hidden windows are created then hidden). Tier 2 wrap of 51 tasks waited on Jorge's button.
- **Should have happened:** wrap or remove all console-launching tasks the same day.
- **Next fix holds if:** the before/after steal counts fall to near zero and a nightly guard catches new offenders. Job 9952r is sent. Not yet proven.

## Category 5 — Batch and pipeline work (RI-004, 016, 017, 020)
- **Failed:** batches deliver the first few items (Miami-Dade scrape 3–4 of 20); OCR output not attached to tracking numbers; long file paths break OCR; job files outside the filing system.
- **Should have happened:** one template per site (folder, scrape, enhance, assembler) and one subagent per item with a result file each.
- **Why not implemented:** each request was built as a one-off.
- **Next fix holds if:** one pilot site runs end to end on the PC and is shown to Jorge as a folder listing and a sample report, then copied.

## Category 6 — Filing and numbering (RI-012, 013)
- **Failed:** two filename conventions, a registry range that doesn't match real numbers.
- **Should have happened:** one convention, reconciled registry before any new number.
- **Next fix holds if:** a script that rejects non-conforming names. I did not read the full detail.

## Category 7 — Windows tooling traps (RI-032 to 036, 009 to 011)
- **Failed:** encoding, window-handle and UAC-prompt traps that made scripts fail silently; screenshot paste; dictation tools.
- **Should have happened:** a tested template for headless scripts.
- **Next fix holds if:** the template is the only way new scripts are created.

## Category 8 — Upward delegation (RI-003) and the control panel itself
- **Failed:** hard tasks handed back to Jorge. Panel header requested at least 5 times (see REPORT_POPUPS-AND-HEADER-HISTORY).
- **Next fix holds if:** the panel shows the same numbers as this ledger and every button's result appears on it.

## What no fix has yet proven
**Nothing in this ledger proves the next fix will hold.** The honest test is the one named under each category. Until each test is run and shown to Jorge, treat every fix as unproven.
