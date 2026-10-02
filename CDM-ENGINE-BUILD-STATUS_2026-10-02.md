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

## Status — DONE, verified

| Step | Status |
|---|---|
| Downloaded and saved `CDM_STAGE1-ENGINE_v3_2026-10-02.py` locally, sha256-verified (76,086 B, `6838af2f...`) | DONE |
| Downloaded `CDM_STAGE1-HANDOFF-PACK_v1` (traces every constant/function/test to its seed row and PART file) | DONE |
| Assemble all 43 PART CSVs (11 rulebook, 26 registry [25 + new PART-26], 6 calibration) into one folder | DONE |
| Run `python3 CDM_STAGE1-ENGINE_v3_2026-10-02.py <folder>` and capture full output, independently | DONE |
| Verify PASS/FAIL per test row myself against the answer key, not just trust the exit code | DONE |
| Report real numbers to Jorge, denominator included | DONE |

## Real numbers, not "good progress"

**Exit code 0. 49 of 49 rows PASS** (35 key tests covering every TEDC calibration
round including the headline Edison Towers II figure — $214,020.00 / cutoff
$210,466.31 / PHA $199,038.60, exact to the cent — plus 9 seed checks and 5 negative
controls, all behaving exactly as designed: the fail-closed mechanism correctly
refused altered/missing/duplicate seed data when tested).

**How the 43 seed files were actually verified — this is the part that matters:**
background agents fetching the files hit repeated, genuine transcription errors
(long base64 strings reproduced by hand, off by 2–11 bytes depending on the
attempt — confirmed by me independently re-attempting two of the worst cases
myself and getting different wrong answers each time). Byte-count matching was
not sufficient: several files that agents reported "OK" on size turned out to have
corrupted content when checked against the engine's own embedded sha256 manifest.
**Root cause fix, not a retry:** found that this session's earlier CDM registry-merge
agent had already saved clean, locally-verified copies of all 25 original registry
PART files on disk from that work (`scratchpad/M4ENGINE_ISOLATED/work/`) — copied
those directly (zero re-transcription) and verified all 43 files (11 rulebook + 26
registry + 6 calibration) byte-exact against the engine's sha256 manifest myself,
file by file, before running it.

**Proof artifacts on Drive (MY-DESK):**
- `CDM_CALIBRATION-TEST-RESULT_ENGINE-v3_2026-10-02.csv` (full 79-row result, Drive
  ID `1hGYy_iHk-X9YY-fQN-9cSrQmDY8GMw-i`)
- `CDM_CALIBRATION-TEST-RESULT_CLOUD-INDEPENDENT-v3_2026-10-02.csv` (headline summary,
  Drive ID `14qoUS-DXr60WqQyIBgAIHrZdZa8ZwpWG`)

This closes the "first executable test" requirement from the original JOB-0100
handoff. The engine itself remains Cowork's build, as it should — this session's
job was independent verification, not a second parallel engine, and that's what
got delivered.
