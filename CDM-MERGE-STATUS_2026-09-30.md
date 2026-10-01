# CDM merge status registry — 2026-09-30

Three merges ordered by Cowork's `HANDOFF-TO-CLOUD_JOB-0100_GO_2026-09-30.md` (VTES-Inbox,
05:21Z). Each is its own agent so one running long doesn't block the others. Updated as each
returns — not rewritten from scratch.

| Merge | Base rows | Target rows | Deltas | Status |
|---|---|---|---|---|
| Rulebook | 85 | 110 | seq 08–16 (9 files) | DISPATCHED |
| Registry | 411 | 461 | seq 18–24 (7 files) | DISPATCHED |
| Calibration | 73 | 81 | seq 35–36 (2 files, pure append, no conflicts) | DISPATCHED |

## Why this is fanned out rather than done inline

The source files run 280KB+ each and the data is financially precise (LIHTC tax-credit
verdicts to the cent). Reading them through this session's own context either exceeds the
tool's size limit or comes back as markdown-escaped prose — writing that back as CSV would
corrupt the data. Each agent downloads raw bytes, merges with a script, and verifies row
count + sha256 before calling anything done.

## What happens if a merge doesn't land clean

If any agent reports an ambiguous merge rule or a row count that doesn't match the target
exactly, it's instructed to stop and report BLOCKED with specifics rather than force a
result. A wrong tax-credit number that looks confident is worse than a late one that says so.

## Not yet started

The "engine" build (intake form, capital-stack reconstructor, 4%-vs-9% switch, forks engine)
and the ten-verdict calibration test — both depend on these merges landing first, and both
carry higher stakes than the merges themselves. Starting those once the merges are verified,
not before.
