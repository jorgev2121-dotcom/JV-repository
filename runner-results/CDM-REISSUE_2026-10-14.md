# CDM-REISSUE 2026-10-14 — runner proof (cloud Code lane)

The REPLY was filed in VTES-Outbox (folder 1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN) as REPLY-TO-COWORK_CDM-REISSUE_2026-10-14.md:
- Drive ID **11E6tCLW3ZsdDBD55zF-oDR6Uuh_5LgQi**
- 12,913 B, sha256 a4ea02a267e394305770aa47385daaa3271dd328e5282cfc026e8ae9adfc32e3
- Drive byte count matches the local file.

The full text of that reply follows, as the proof of record. The merge scripts lived only in session scratch, not in the repo: m_stack.py, m_top15.py, m_rb.py, m_cal.py, m_man.py, split.py and rb_parts.py. This file records their outputs and hashes.

Status by order:
1. Order 1: BLOCKED.
2. Order 2: EXECUTED-WITH-PROOF.
3. Order 3: EXECUTED-WITH-PROOF (111 rows).
4. Order 4: BLOCKED.
5. Order 5: manifest EXECUTED-WITH-PROOF; engine regression PARTIAL.

---

# REPLY-TO-COWORK — CDM-REISSUE 2026-10-14

Reply to: MSG-COWORK-TO-CODE_CDM-REISSUE_2026-10-14.md (Inbox 1T-59xqcHNJwvgiuVJVNcWr2WVyzYhSGL), which supersedes Inbox 1bRZIQWwGb3k_bcHmpO3W4QGpzfkVdP1u.
Executor: cloud Code lane (VTES runner helper). Author of record: Team USA Sales, Inc. / Jorge Valdes.
Rules kept: NEW files only. Nothing was overwritten, moved, renamed or deleted. Nothing outbound except this reply. No spending. No git commit, no email.

## Order 0 — Executor health

EXECUTOR-HEALTH | lane: cloud Code lane | cap state: allowed | started 2026-10-14T02:42Z | closed 2026-10-14T03:55Z

## Scorecard (one line per order)

1. Order 1, capital stack v12: **BLOCKED** (hash mismatch, so not uploaded).
2. Order 2, TOP15 v10: **EXECUTED-WITH-PROOF** (3 parts; Drive hash re-read on 2 of 3).
3. Order 3, rulebook v16: **EXECUTED-WITH-PROOF** at **111 rows, not 123** (the delta's own merge rule says 111).
4. Order 4, calibration v16: **BLOCKED** (PART-7 has 5 rows, not 4, and REF-08 collides with v15).
5. Order 5, registry manifest v36: manifest **EXECUTED-WITH-PROOF**. Engine v3 regression **PARTIAL**: proven from the 2026-10-02 run, not re-run in the cloud.
6. Order 6, close-out: this file.

## Order 1 — Capital stack v12: BLOCKED

Inputs were verified first:
- v11 19laI83ikKeVLT2PqcPzlMvRhLSaKtf1p: 204,053 B, sha256 3486fedcfe538608da7307d947b31d6ce9f907139af75e55fb8a999ad2466810. It round-trips under QUOTE_ALL CRLF.
- Delta 1xpg4GhX5ziz3f3yYFhpyZ4BVFkh-t47v: 28,081 B, sha256 a38fad9e2db9102250717db7efdb0a55e881c5b10e44cdd2fd394b6a52231d9c.

Merge as written:
- SUBJ-01 is replaced by the delta row.
- CS-148..CS-170 go after CS-147.
- KEY-64..KEY-70 go after KEY-63.
- Output is QUOTE_ALL CRLF.

Result: **251 rows and 251 unique ids, as expected. But the file is 231,462 B with sha256 c760d334e7c3ad23017b589564d2c6f5ee67b6450b419264d27f00379eb1e335.** The order expects 231,397 B and sha 34ead5f4…. That is 65 B over.

Diagnosis: the only row that differs from v11 is SUBJ-01. In three cells the delta row is not the same as the base row:
- deal_status: 146 B longer.
- engine_use: base is a single space, delta is empty.
- note: 186 B longer. It includes "merge_action REPLACE. " and the "WAS:" text.

I tried 20 variants of those three cells, such as dropping "merge_action REPLACE.", dropping "WAS:" and keeping the single space. None of them produces 231,397 B.

Per the order ("stop and write BLOCKER on any hash mismatch"), **nothing was uploaded for v12.**

Smallest next action (Cowork): one of these.
- State the exact SUBJ-01 cell values used to compute 34ead5f4….
- Or re-issue SUBJ-01 as a full replacement row.
- Or accept 231,462 B / c760d334….

On any of these, cloud can upload the file in one pass.

## Order 2 — TOP15 v10: EXECUTED-WITH-PROOF

Inputs:
- v9 1R0EHRSRU3Ixt9TWTQcSU7pd8yp9Nc-W4: 96,803 B, sha 8cf60e59…, 17 rows × 40 columns, round-trips.
- Delta 1I0oPfoSRrqDotE28_10IIXoeWOaJpF8U: 34,400 B, sha256 8c16be9b8450e5a2ae79be0ffb6fb0fc50b0dc561a0b772774f7fde6b0e84e98. It holds 24 NEW ROW, 10 APPEND, 1 LEGEND and 1 OPEN row.

Recipe used:
1. Add a column v10_delta_row_ids.
2. For each APPEND row, append "; "+value to the cell (rank, column). The ranks touched are 15, 1, 4, 10 and 5.
3. Each NEW, LEGEND and OPEN row becomes a new row, inserted after the v9 PATTERN row in this order:
   - 6 PATTERN rows (PAT-205-01..06)
   - 18 PEER-2026-205-MD rows
   - LEGEND-v10
   - OPEN-v10

**Merged file: 43 rows × 41 columns, CRLF QUOTE_ALL, 130,233 B, sha256 d7bdd42c4ea601e5f45599c2a4c882f1bcb1de0eed697ca053b8fb9db57c9d3f.** The order gave no expected hash, so please re-prove the placement on your side.

Parts in MY-DESK (LF, each with a header). For each part: MY-DESK id / capsule id, size, sha256, data rows.
- PART-1-of-3: 1wTquAz5fHroxGBTARezV8AVJwGFYYRUQ / 1o0XwRdrI5lO5r2UYJUduK0kcxhDtZWSB. 51,245 B, 006cdc17adebfd431ba7e587740cc049dc0ce1fe6f858236d8581af8a7eb91ff, 10 rows. **Drive bytes re-downloaded and hash matched.**
- PART-2-of-3: 1qY_qyqW8Hh_EWLXzKbkm1fs4tc5Nx309 / 1vMMXX_0T29dK5xtiTjPbpddY5Lg2JN2R. 51,233 B, 034dcacbf87061ef84845438b42f7b67957009a28159dba3beb17bbe02a23abb, 10 rows. **Drive bytes re-downloaded and hash matched.**
- PART-3-of-3: 1iJNwH2uY93N9mm2jzuZYYeVVsVODZYzt / 12Mxn2O7WyjQtVgJupdGz5q6gAHwO_HgN. 29,489 B, 66d2bfc5cd8523bb40765a43cdd43ca559ca4e885c4df1fd60599e0debc46197, 23 rows. Drive byte count matched; hash not re-read.

Rebuild recipe:
1. Read the three parts in order with a CSV reader. Some v9 cells contain line breaks inside quotes, so do not split on lines.
2. Drop the repeated headers.
3. Write QUOTE_ALL with line terminator CRLF.

Result is 130,233 B, sha d7bdd42c…. Do not use a plain LF→CRLF swap: it would also change the line breaks inside cells. I verified this recipe locally byte-for-byte.

## Order 3 — Rulebook v16: EXECUTED-WITH-PROOF (111 rows, not 123)

Inputs:
- The 11 v15 PARTs, 110 rows, 16 columns, no duplicates. Each part's size matched Drive.
- Delta 1KnHFzc6VJyPdGvxmGE5LK76fsJ-eqxyi, sha d9c4ce9e….

The delta's own GAP-23 notes say: "apply every IN-PLACE APPEND by rule_id to the current merged rulebook (v15, 110 rows) ... append GAP-23 at the end; **expected result 111 data rows**". So 12 of its 13 rows are in-place appends, not new rows. The order's 123 assumed all 13 were new.

**Merged: 111 rows × 16 columns, CRLF, 585,258 B, sha256 24d0b3e034dd7434674ef666741157962b0b68449e56489d61afcd45c4536a08.**

Only v15 parts 1, 2 and 4 change. Each was split in two to stay under about 60 KB. Parts 3 and 5–11 are byte-identical to v15 and were server-copied. GAP-23 is its own part.

For each part below: MY-DESK id / capsule id, size, sha256, rows.

New parts:
- PART-1A-of-12: 10dvpMP4VAJb5jE2-TOQrQkRxlRItDasL / 1VsY2FHj4S5WGbKsLhpI4GuokjIuTUxui. 22,683 B, 9455284faedce5ef74d82e9c0848cfcacb241bec2ad5c754ebe2e3b14c893820, 12 rows.
- PART-1B-of-12: 1gLpIru3hSQlqufFqt2U8l0zM0B3U6AHC / 1axI2RhzFH-lNlePb996b8etGoVUc_075. 38,675 B, dab0e680c3c4da7a0cfaebb8e5edde250be0d6b08d9f6695c7b87f77ff8cb4b3, 13 rows. **Drive bytes re-downloaded and hash matched.**
- PART-2A-of-12: 15YMkOAWXQfxCywMCIEmQ8iB8IDq8v7-1 / 1nQ_K2Zd9cckAaV365t-MnX4oE_DcE2gQ. 23,624 B, 293d25dce16186585daa64c29973b9437352f637915d1e2f104e0ba5234b784c, 10 rows.
- PART-2B-of-12: 1sFCEHOrt8XKBUB4EBTqC782-6s5Y5cMd / 1B9y__KNSaz2at0r6pBP0xhnQtsyBSJNT. 36,207 B, 3eb6a112b6f48d88afad6ba08b01c43d15d9c0c939180610c5696d89c39fbd42, 11 rows.

Copy of v15 part 3:
- PART-3-of-12: 1j6GhWqKTaJ-9pmrD-QGgE13TnyRxLp99 / 1J5ksLQtX4XdxoBYYVgdVsZSM7AG6mazT. 58,463 B, 0076720a92e5c633ac7f1e697c100b04fab1b06820b67509ac3e96e4a931237c, 13 rows.

New parts:
- PART-4A-of-12: 1UPkHZB3u8WmXSln0-V7lnTq5lP5UvWeF / 1q8qy77nmc4RiVGp-4kd7qb9owW5DuKxP. 38,180 B, 53a3e2164c4d8658da56de27b2c4bbca489795454b39e86282d41f4968c9c990, 5 rows.
- PART-4B-of-12: 1dvKNGxQtjGsj8y3AuCmzja0jqK6CgQET / 1EfsXXGo6alA28QWwGfQ-BZYR1dp1YemC. 19,507 B, 1917d8925313ec89fef8c845b0bc46ab30fd14c935166c7b35c8bc74a4c23cda, 5 rows.

Copies of v15 parts 5–11:
- PART-5-of-12: 1gpeCAJXXIevbJbwSVAro0C6P4TTRLw7_ / 1VjzX5XGGi2rsHkAVvYybHEhsZiZgtx9_. 58,233 B, 74c9ee76…, 7 rows.
- PART-6-of-12: 1LELoah_WEyjRVCnT2a-7pXy9zuwKX_FU / 1PkSQXa2TipBfKwF3Tx-KHd2NzIQy7SrW. 58,153 B, e97fbaec…, 8 rows.
- PART-7-of-12: 1_SAEqDZ8RyDC0JSZjxxOqToMhLpRvPiv / 1_JaAjnmb9TnkVGdPM_6ynDLp5hutC4Ae. 51,793 B, aec840d9…, 9 rows.
- PART-8-of-12: 11HCHHvxV_yJFdnakb-T0yajGbSeF98lG / 1_zCZAKPIF01us7j7ILLJ67_5VxQpUPru. 54,212 B, d981ae7b…, 6 rows.
- PART-9-of-12: 1ED-tmdyrOfeNzWL59E7_FG28i54Fi2Ga / 1IjZ48x7J0VXYZUQI86019EE6q1c4qMbd. 53,294 B, 7af49139…, 5 rows.
- PART-10-of-12: 1weEEEdVOzINVJaarDD8_0rzbiX69wpc5 / 1VC0qW4P0IAcIdvmtHIXaeeUkzSFEpM0G. 47,784 B, e8fc645a…, 4 rows.
- PART-11-of-12: 17o9yUhl82oQ04M2uHfR18F9-X0Hd_pZP / 1W8GL4wHdbgDuWwKwGjQjHOqg9xpMXIQR. 26,295 B, 4ab9c96e…, 2 rows.

New part:
- PART-12-of-12 (GAP-23): 1_ZNKRjvQRaoVkngtrDSH30OFzd-dIwQ3 / 1tlEITXTldmuNmXaZhC0j2IxpcrW5Eo6f. 1,305 B, accfcf15adca26f579038e1688bca16c915c68d7828874fc0c4979fd1261242e, 1 row.

The set is 15 files, labelled "of-12" after the 12 positions. Every Drive byte count matches the local file.

Append rule used for each "IN-PLACE APPEND to <cols> of <id>":
- A value beginning ";" is concatenated directly.
- A value beginning "|" is joined with a space.
- Any other value is joined with " | ".
- The notes column receives the delta row's notes.
- "(no change)" is skipped.

Rebuild recipe:
1. Join in this order: 1A, 1B, 2A, 2B, 3, 4A, 4B, 5, 6, 7, 8, 9, 10, 11, 12.
2. Drop the repeated headers.
3. Write minimal-quoting CSV with CRLF.

Result is 585,258 B, sha 24d0b3e0…, 111 rows, unique rule_id. Verified locally.

## Order 4 — Calibration v16: BLOCKED

All six v15 PARTs were read; each size matched Drive.

PART-7 1UaMzH75zMkFSJ2b88VRBS3_q95-w8QhA:
- 17,087 B, sha256 beb3f5672f155a38cf64d3120fab041b828d921336525cda68f3fae2eab4972c.
- Its Drive title is "...v16-COWORK-DELTA_2026-10-04.csv".
- It holds **5 rows, not 4**: CAL-23, REF-08, X37-A8-01, X37-A8-02, GAP-23.

The other two deltas:
- PART-8 17IGFyrj9eu4n63dB9gKpSrCZMFqp-on-: 9 rows, sha be776f70….
- PART-9 1T5qcmyx8IDN8yH-sHM0g52Hd0ed8XwbA: 7 rows, sha d09c4d8a…. This matches the expected hash.

Totals: 80 + 5 + 9 + 7 = **101 rows, 100 unique ids.**

The duplicate is **REF-08**. PART-7's REF-08 ("Bond rules by round…") is a different row from the REF-08 already in v15 PART-5 (10x0QhKhD18MM_1RwnEwdeoXiThzGfsrK, from v13-COWORK-DELTA_2026-09-20).

Nothing was uploaded. A local candidate exists with both REF-08 rows kept (403,007 B, sha b28a2b69…), but I treat it as not deliverable.

Smallest next action (Cowork): one word on REF-08. Either:
- "rename" (for example REF-08-B), or
- "replace" (the PART-7 row supersedes v15's).

Please also confirm that PART-7's 5 rows are intended. Cloud can then merge to 100 rows in one pass.

## Order 5 — Registry manifest v36: EXECUTED-WITH-PROOF; engine regression PARTIAL

Base v30 1NHEt-_7cC7iqvPPvONd1tIBkmbJkOLCu: 31,493 B, sha 43d2f39848a7c5f29a09d4302fee660153ff8e617a6bac265a20d2efd45c8d8f. That matches. It has 44 parts and 710 ids.

Deltas were applied in order (REPLACE = exact line swap, asserted unique; APPEND at end):
- v31 1wX5Gfrq41q04qalpd5vtyIoMttGM9q_F → 32,101 B, e7c1ee1f…. Matches its CHECK. 45 parts, 722 ids.
- v32 1VQyRn8vuzzpB1iFg3tOZFNy5JOKOlhoD → 32,740 B, ca9206e1…. Matches its CHECK. 46 parts, 735 ids.
- v33 1hgquptFe2vPLRHczELNzaXGjpukQUJd1 → 33,395 B, 25599787…. 47 parts, 748 ids.
- v34 1KVW7p3UEwry3WYEOaSjMnqu6yeGmnxx9 → 33,982 B, aabac2a3…. 48 parts, 759 ids (E-111 → PART-48).
- v35 10Kwi-3do4zpvECWPawnEZwh9Il9Eu48c → 34,579 B, 48a458f6…. 49 parts, 772 ids.
- v36 1UNiDbRdKMp5CI0maN5B7oDzO8lZVpjKw → **35,116 B, sha256 7cb215aa0cef06a4546b1e7cb97e38602692b98b0f43f5889bec1bcad1f01771. 50 parts, 783 effective ids, 0 duplicates.** This matches the expectation.

PART-47..50 rows are present. PART-50 is listed with 1SUyC8NmS-4Lz_kB4O14Z9SMqcWhYQqtK, 43,204 B, f55d6a9f….

Uploaded (LF, single file):
- MY-DESK CDM_M4-REGISTRY-MANIFEST_v36_2026-10-14.csv: **1ngPYNNamVbYUGVPrZtDk9cSbEtiqCHwa**, 35,116 B.
- Capsule copy: **1byP2ztfdZf4SbxqAN607ur5NrgvaTXrT**, 35,116 B.
- Drive byte count matches.

Engine v3 regression, PARTIAL:
- Engine 1zQo3c2zrzx9mFEsmMudYweQfIXLJ3bUO was downloaded: 76,086 B, sha 6838af2f….
- The engine is content-addressed. It reads exactly 43 PART files by sha256: rulebook v15 1–11, calibration v15 1–6 and registry 1–26. It reads nothing from PARTs 27–50.
- **All 26 registry rows in v36 carry the same drive_id, bytes and sha256 as the engine's SEED_MANIFEST (26 of 26).** All 17 rulebook and calibration seeds are on hand locally with matching hashes. So v31–v36 cannot change the engine's input.
- The 2026-10-02 result CDM_CALIBRATION-TEST-RESULT_ENGINE-v3_2026-10-02.csv (1hGYy_iHk-X9YY-fQN-9cSrQmDY8GMw-i, 15,048 B; copies 1ftL-QxwqIKyQC8cHNlth3PEL9RYlsA0h and capsule 1HRWhP0-7ZWhAAxwOMsvoFawbBkXrJZVB) was read in full. **It has 49 of 49 PASS rows:**
  - 35 KEY rows (v1 16, v2 12, v3 7)
  - 9 SEED CHECK rows
  - 5 NEGATIVE CONTROL rows
  - plus 29 SEED BINDING rows (BOUND) and 1 SUPERSEDE (LOGGED)
- **Not re-run in the cloud.** The 26 registry seed files (about 490 KB) would each have to be re-transcribed through the connector.

Smallest next action (desktop lane, not Jorge):
1. Put the 43 seed PARTs in one folder.
2. Run `python3 CDM_STAGE1-ENGINE_v3_2026-10-02.py <folder>`.
3. Confirm 49 PASS.

## Order 6 — Close-out

Every merged file was written as a NEW file. Nothing was edited in place. Nothing was overwritten, moved, renamed or deleted.

Proof file in the repo: runner-results/CDM-REISSUE_2026-10-14.md.

Two answers from Cowork would unblock the rest: the SUBJ-01 cell values for Order 1 and the REF-08 word for Order 4. Shall cloud run both as soon as they land?

---

# ADDENDUM 2026-10-14 (answers pass, cloud Code subagent)

Receipt: BLOCKER_CLOUD_CDM-REISSUE-ANSWERS_2026-10-14.md, Drive id 1OvZ_klTPHM3nrVTU8kgYCgAa5p76r4dm, 3,336 B, in Outbox 1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN.

Read: answers 1ReIVBSq2t1L1vpqiGY0wpqXFzQVNfi3a and R1 10T89rgl0n9GlcrK9RFJCKYAjao1KM5Aa.

Decisions now known:
- Order 1: ACCEPT 231,462 B, sha c760d334e7c3ad23017b589564d2c6f5ee67b6450b419264d27f00379eb1e335.
- Order 4: rename REF-08 to REF-08-B (case_id cell only); add PART-10; target 108 rows.
- Manifest v37: v36 + delta 1twUupk7AGauBH3yy6hLLvgs5TA1rRvck, expect 51 parts and 794 ids.

Status:
- Order 1: BLOCKED. Nothing uploaded.
- Order 4 (calibration v16): BLOCKED. Nothing uploaded.
- Manifest v37: BLOCKED. Nothing uploaded.
- Order 5: unchanged; desktop line.

Why: the Drive connector gives escaped text or base64 into chat only, with no path to disk, and the earlier merge scripts were scratch-only. Hand re-typing 17 to 230 KB cannot be hash-proved for calibration or v37, so it was not done. RED items reached: none. Nothing was filed, moved or sent.

Build recipes with source ids are in the receipt. A lane with a shell and Drive bytes on disk can finish all three in one pass.
