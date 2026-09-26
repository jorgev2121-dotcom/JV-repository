# DAILY WORKER SYSTEM — TRK-2026-9411
**Fired by:** Chat discussion · **Date:** 2026-09-26 · **Status:** QUEUED — Execute after TRK-2026-9410 (compliance hook)
**TRK:** TRK-2026-9411
**Priority:** HIGH — Unblocks overnight protocol
**Executor:** CLOUD

---

## TASK SUMMARY

Build a system that manages daily recurring batch jobs (counting, enumeration, report generation, OCR on known TRKs, file writes to new destinations). The system tracks job queue depth, fires jobs on a schedule, logs results per item, and surfaces results immediately.

---

## SCOPE

**Design:**

1. **Job registry:** Define which jobs run daily and on what schedule (e.g., 11 PM to 6 AM for batch work).

2. **Queue management:** 
   - Queue never empty: at least 12 hours of work queued at all times
   - Refilling the queue is itself a queue item
   - Dead run detection: heartbeat checks if output file has grown; hung process detected within one cycle

3. **Result logging:** Each job writes results to a dated file as it completes. A job killed at item 40 leaves 39 results on disk.

4. **Integration with OVERNIGHT-QUEUE.md:** This system operationalizes the protocol that was written but never activated.

**Reference:** CLAUDE.md Rule 8 (Nights Are for Long Runs), NIGHT-PROTOCOL.md, OVERNIGHT-QUEUE.md

---

## EXECUTION CHECKLIST

- [ ] Job registry structure designed (JSON, YAML, or TOML)
- [ ] Queue manager script written (job dispatch, heartbeat, result logging)
- [ ] Integration with existing overnight queue tested
- [ ] First 12-hour batch queued and scheduled
- [ ] Daily activation verified (queue never empty)
- [ ] Status reports validated (denominator present, e.g., "412 of 3,180")

---

## TIMELINE

**Duration:** ~4 hours (design + build + test)  
**Start:** After TRK-2026-9410 deployed  
**Priority:** HIGH — unblocks all continuous night work

---

**Reason for existence:** Current overnight work is mentioned but never institutionalized. This makes it durable and auditable.

---

**Questions:** Ready to implement the daily worker foundation?
