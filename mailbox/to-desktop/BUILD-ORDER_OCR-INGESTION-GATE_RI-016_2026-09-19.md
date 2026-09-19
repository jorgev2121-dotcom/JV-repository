# 🖥️ RAMBO BUILD ORDER — OCR ingestion gate + TRK stamping + nightly enforcement (Option 2/3)
**2026-09-19 · RI-016 durable fix · owner selected Option 2/3 ("2/3 Execute this"). TRK-2026-9047 family.**
**This is the DURABLE fix for "DD reports failing to use OCR to make the matches." Build AFTER the Alec DD package ships (that package already carries the stopgap OCR-match gate).**

## The disease (why a patch won't do)
RI-016 (OPEN since 2026-08-15): OCR runs but the output isn't tied to a TRK/folio, so reports can't match documents. Logged repeatedly (RI-015 silent OCR, RI-019 ingestion gate). Per charter Rule 4, patches are forbidden — this is the Tier-2/3 fix the owner picked.

## Build these three parts (test each — TEST-BEFORE-SHIP)
### Part 1 — Stamp TRK at OCR time (Tier 2)
- When the OCR pipeline emits a `.SEARCH.txt` sidecar, **write the TRK/folio into the sidecar header AND the source filename**, derived from the containing job folder path.
- Folio format check: **MDC folio = 13 digits.** Normalize `TRK-26-` → `TRK-2026-` on sight.
- **Exact match only for writing.** Fuzzy match is for SEARCH, never for filing. A wrong match is worse than a failed one (filing stays RED).

### Part 2 — Ingestion GATE (Tier 3 — the part that stops silent failure)
- The pipeline **refuses to emit a sidecar with no TRK.** No TRK derivable from the folder → the file is routed to an **`_OCR-NEEDS-TRK` quarantine** and logged, NOT silently emitted untagged.
- A gate that blocks is the point: option 2 alone still lets a misconfigured run produce unstamped sidecars silently; the gate makes that impossible.

### Part 3 — Nightly enforcement sweep (Tier 3)
- A nightly job re-scans existing sidecars; any without a TRK is re-stamped from its folder or moved to `_OCR-NEEDS-TRK`.
- **Report a denominator every night** (X of N sidecars now TRK-stamped) — an unverifiable run counts as a failed run (charter §11). Feed this into the Automation Registry health board.

## Observability (ED-003)
Give this automation an Execution Profile in `atlas/automations/AUTOMATION-REGISTRY.md`: name, trigger, frequency, runs-on, dependencies, failure mode (must be LOGGED/ALERTED, never silent), human approval (No), current health.

## RED / GREEN
- GREEN: build, stamp, quarantine, nightly re-stamp (writing only to sidecars/new quarantine folder).
- RED: any move/rename/delete of a CLIENT document stays the owner's click.

## Report back (mailbox/to-cloud)
Denominator before/after (sidecars TRK-stamped X of N), gate test result, and the first nightly sweep count.

**CLOSING QUESTION:** After the gate is live, what percentage of sidecars carry a TRK, and did the gate correctly quarantine an untagged test file?

#ocr-ingestion-gate #RI-016 #stamp-trk-at-ocr-time #nightly-enforcement #TEST-BEFORE-SHIP #TRK-2026-9047 #cloud-to-desktop
