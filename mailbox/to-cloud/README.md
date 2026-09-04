# mailbox/to-cloud/ — Desktop → Cloud lane
**TRK-2026-9772 · new 2026-09-04.** RAMBO (desktop) drops files here for ☁️ CLOUD to action.
Cloud reads this folder on its heartbeat (and whenever Jorge opens the Cloud seat).

**Use the filename grammar + five-line body from `HANDOFF-PROTOCOL_TWO-SEAT-01.md`:**
```
HANDOFF_DESKTOP-TO-CLOUD_<slug>_<YYYY-MM-DD>.md   — a task only Cloud can do (Gmail/Drive/Outlook/GitHub)
FINDING_DESKTOP_<slug>_<YYYY-MM-DD>.md            — something Cloud should know/relay to Jorge
DONE_<JOB>_<slug>_<YYYY-MM-DD>.md                 — a close-out Cloud should record/relay
```
Body: WHAT I FOUND · WHY IT'S YOURS · EXACT NEXT ACTION · RED or GREEN · CLOSING QUESTION.

This lane replaces the 1 MB Drive `TO-CLOUD.md` for machine handoffs (that file stays as the
human-readable running log). One file per message keeps it cheap for Cloud to pull and route.
