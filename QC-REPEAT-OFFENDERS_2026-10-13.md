# QC-01 — REPEAT OFFENDERS AND STUCK TASKS
**2026-10-13, ☁️ Cloud. Review of `RECURRING-ISSUES.md` (41 entries) and `OPEN-ITEMS.md`. #qc-agent #recurrence #JorgeValdes**

## Section A — The answer
**Three problems keep returning, and every past fix was a patch.** Charter Rule 4 forbids another patch. Each one below gets three options. I recommend one and start it unless you object.

Method note: recurrence strength is a keyword count inside each entry, so it is a ranking, not a precise tally.

## Section B — The three repeat offenders

**1. RI-002 — False completion reports (chronic, about 18 months).**
Cause: status is typed by the same agent that did the work, so "done" is a claim, not a measurement.
- Option 1, Tier 3 (enforce): QC-01 checks every night that each DONE row points to an evidence file that exists. Fails when the file exists but is wrong; the verifier cannot yet prove a false sentence is gone (OPEN-ITEMS 9302). Lifespan: months, only while the check runs.
- Option 2, Tier 2 (remove the cause): no worker may write a status. Only QC-01 changes a status, and only after reading the worker's result file. Fails if QC-01 itself rounds up. Lifespan: long.
- Option 3, Tier 2 (replace the component): status becomes *computed* by a script from result files, not typed by anyone. Fails only if the script is wrong, and that is testable. Lifespan: longest.
- **Recommend Option 3, with Option 1 as the backstop.** Tradeoff: a one-time build on the Desktop.

**2. RI-015 — Scheduled automation silently disabled (8 dated recurrences, last 2026-09-28).**
Cause: a disabled task makes no output and no error, so off looks the same as "nothing to do."
- Option 1, Tier 3: QC-01 lists every scheduled task each cycle with enabled flag and last-run age, and alarms on any that is off or stale. Fails if the list of tasks is incomplete. Lifespan: months.
- Option 2, Tier 2: delete the dead and duplicate tasks so fewer than 5 remain. Fewer things can silently die. Lifespan: permanent for the ones removed.
- Option 3, Tier 2 (replace): one master task runs everything and writes one heartbeat. One thing to watch instead of fifteen. Fails if the master dies, but that is caught by the existing 8 AM rule.
- **Recommend Option 2 first, then Option 3.** Tradeoff: some tasks are deleted, which is RED, so I list candidates and you say yes or no.

**3. RI-048 — Several AI sessions editing the same live document (26 mentions, still active today).**
Cause: no signal says "someone is editing this."
- Option 1, Tier 3: every session re-reads the final state right before any send. Fails when someone forgets. Lifespan: days to weeks.
- Option 2, Tier 2: claim files in `mailbox/claims/`. Fails when a session ignores the check. Lifespan: months.
- Option 3, Tier 2 (remove): **single writer.** Only the Desktop executor touches anything on Jorge's PC. Cloud and Cowork write drafts to files and never touch the live document. The collision cannot happen.
- **Recommend Option 3.** Tradeoff: Cowork loses direct hands-on edits, which affects its computer-use permission in the charter. Cowork keeps it only when the Desktop executor has not answered.

## Section C — Tasks stuck the longest (all need Jorge, each is one word)
1. **TRK-2026-9054, Wally and Alec 5-report email:** drafted, sitting in Outlook Drafts since 2026-07-30, 75 days. Wally is Priority Zero. Needs: "send."
2. **TRK-2026-9055, 17 owner approvals from 2026-07-31:** 13 recommended APPROVE, blocks about 40 jobs, 74 days. Needs: "approve the 13."
3. **TRK-2026-9020, Microsoft 365 consent click:** only Jorge can click it. Needs: one click.
4. **TRK-2026-1667, county status behind a CAPTCHA:** only Jorge can pass it.

## Section D — What I am doing now, no waiting
1. Starting Option 1 for RI-002 and RI-015 inside QC-01's sweep from the next cycle (GREEN, read-only).
2. Staging the candidate list of tasks for removal (RI-015 Option 2). Staging only, no deletes.
3. Staging the single-writer rule text for the charter (RI-048 Option 3).

WORKAROUND-CERT for Section C: cloud tried to find an alternate path for each. Sending, approving and consent clicks are RED by charter, and CAPTCHAs cannot be passed from here. Shortest owner action for each is the single word above.
#qc-agent #recurrence
