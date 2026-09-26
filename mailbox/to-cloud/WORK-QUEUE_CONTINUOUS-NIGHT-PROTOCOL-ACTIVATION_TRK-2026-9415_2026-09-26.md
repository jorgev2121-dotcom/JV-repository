# CONTINUOUS NIGHT PROTOCOL ACTIVATION — TRK-2026-9415
**Fired by:** Chat discussion · **Date:** 2026-09-26 · **Status:** QUEUED
**TRK:** TRK-2026-9415
**Priority:** FOUNDATIONAL — Enables all unattended batch work
**Executor:** CLOUD (scheduler/monitor)

---

## TASK SUMMARY

Operationalize the NIGHT-PROTOCOL.md rules into a running system. The protocol describes how to queue, run, and monitor overnight batch work; this task makes it live and continuous.

---

## SCOPE

**Implementation:**

1. **Queue refiller:** Ensure the work queue is never empty. At least 12 hours of queued work at all times. "Refilling the queue" is itself a queue item.

2. **Heartbeat monitor:** Check if running jobs are making progress. A stalled process (alive but output file not growing) is detected within one cycle and killed.

3. **Result logging:** Each completed job writes its result file as it finishes. A killed run leaves N completed results + a failure log.

4. **Green vs Red eligibility:** Enforce the rules:
   - **GREEN at night:** counting, enumeration, read-only survey, report generation, OCR where TRK is known, writes to new files
   - **RED at any hour:** filing, moving, renaming, deleting client documents; outbound; spend; credentials; registry edits

5. **Standing jobs to queue:**
   - TRK-2026-9413 (22,875 PDF OCR) — nightly, GREEN
   - TRK-2026-9414 Phase 1+ (email forensic rebuild) — nightly, GREEN
   - Daily contact/document enumeration scans — nightly, GREEN
   - OCR sidecar stamping backfill — nightly, GREEN
   - Daily health email generation (TRK-2026-9035) — nightly, GREEN

6. **Standing report:** Every night ends with a denominator report (e.g., "412 of 3,180 documents processed"). A night with no report counts as a failed night.

**Reference:** NIGHT-PROTOCOL.md, Rule 8 (CLAUDE.md), OVERNIGHT-QUEUE.md, TRK-2026-9411 (daily worker system)

---

## EXECUTION CHECKLIST

- [ ] Night protocol rules extracted and coded (GREEN/RED decision engine)
- [ ] Queue manager integrated with TRK-2026-9411 (daily worker)
- [ ] Heartbeat detection implemented (file growth monitoring)
- [ ] Result logging per job verified (N completed items on disk)
- [ ] First night run executed (10+ jobs queued, results logged)
- [ ] Denominator report generated and reviewed
- [ ] Standing job list populated (initial 5+ jobs)
- [ ] Queue refiller activated (ensures queue never empty)

---

## TIMELINE

**Duration:** ~5 hours (design + integration)  
**Start:** After TRK-2026-9410 + TRK-2026-9411  
**Priority:** FOUNDATIONAL — unblocks all continuous work

---

## DEPENDENCIES

- TRK-2026-9410 (compliance hook) — ensures queued jobs are tracked
- TRK-2026-9411 (daily worker system) — provides job dispatch mechanism
- NIGHT-PROTOCOL.md (rules + standing list)

---

**Reason for existence:** Current overnight work is mentioned but never runs continuously. This makes it systematic and reliable.

---

**Questions:** Ready to activate continuous night protocol?
