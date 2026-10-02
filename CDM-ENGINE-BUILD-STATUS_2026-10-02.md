# CDM engine build — status, 2026-10-02

**Context:** Jorge approved "go ahead and start the engine build" (the remaining JOB-0100
order after all three CSV merges closed DONE 2026-10-01). Before writing anything new,
checked Drive for what already exists — found Cowork has been actively building and
iterating this exact engine, independently of this session, up through TODAY:

- `CDM_STAGE1-REFERENCE-ENGINE_v0` (9/30) → `v1` (9/30, fixed a rounding-order defect)
- `CDM_STAGE1-ENGINE_v2-SEEDLOADED` (10/1) → `CDM_STAGE1-ENGINE_v3` (10/2, TODAY) — now
  reads the 43 merged seed PART files directly (sha256-validated, fails closed on any
  mismatch) instead of carrying constants as typed literals.
- v3's own file header says explicitly: "Built because the cloud Code lane has not
  ported the engine... This is the port, done on the Cowork side, so the lane's
  remaining job is to run it, wire an intake form to it, and own its result."

**Decision: do not write a second, parallel engine.** The original ownership handoff
(8/31) explicitly warned against two executors grabbing the same job (TRK-2026-9250
collision), and OPEN-ITEMS already flagged the same risk for this exact build (RI-048).
Writing my own version now would duplicate real, already-iterated work for no reason.

**What this session is actually doing, consistent with never trusting self-grading:**
independently run Cowork's v3 engine, myself, against the real merged seed files
(the same rulebook/registry/calibration PARTs this session already verified byte-exact
during the merge work) — not read Cowork's own result file and take it on faith.

## Status

| Step | Status |
|---|---|
| Downloaded and saved `CDM_STAGE1-ENGINE_v3_2026-10-02.py` locally, sha256-verified (76,086 B, `6838af2f...`) | DONE |
| Downloaded `CDM_STAGE1-HANDOFF-PACK_v1` (traces every constant/function/test to its seed row and PART file) | DONE |
| Assemble all 43 PART CSVs (11 rulebook, 26 registry [25 + new PART-26], 6 calibration) into one folder | IN PROGRESS — dispatched to a background agent |
| Run `python3 CDM_STAGE1-ENGINE_v3_2026-10-02.py <folder>` and capture full output, independently | PENDING |
| Verify PASS/FAIL per test row myself against the answer key, not just trust the exit code | PENDING |
| Report real numbers to Jorge, denominator included | PENDING |

No claim of DONE until the actual run output is in hand and checked.
