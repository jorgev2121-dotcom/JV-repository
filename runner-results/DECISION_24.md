# EXECUTED-WITH-PROOF (cloud) — DECISION 24 · TRK-2026-1294 · CDM rulebook page cites

Jorge approved on 10/8/2026. Carried out by ☁️ Cloud on 2026-10-13.
Job: TRK-2026-1294 · Edison Towers II, 661 NW 58 St · TEDC · JOB-0100 modules 3 and 6.
Author of record: Team USA Sales, Inc. / Jorge Valdes.
Writing only. Nothing was emailed, moved, renamed, overwritten or deleted.

#TRK-2026-1294 #CDM #JOB-0100 #rulebook #owner-decision #executed

---

## Section A — The answer first

**The page cites for RFA 2025-203 and RFA 2026-203 are now finished. One older round, 2020-203, is still open, because its PDF is not on Drive.**

1. **New file:** a rulebook delta with 13 rows. Every cite in it carries its "of N" page count. Drive id `1KnHFzc6VJyPdGvxmGE5LK76fsJ-eqxyi`, in MY-DESK.
2. **One wrong cite was found and corrected.** The rulebook said the 2026-203 goals and sorting order were on "pp. 158-159 of 174". They are really on pages 81 to 82 of 159. Pages 158 to 159 are about referral agencies.
3. **One wrong assumption was found and corrected.** The rulebook assumed that 2025-203 picks winners the same way 2024-203 did, with Permit Ready chosen first. It doesn't. In 2025 and 2026, Permit Ready is only a fallback. This changes the odds math, because the three named goals now get all three seats.
4. **One rule changed in 2026.** Developers now need only one finished project since 2006, not three. There is also a new developer-experience tiebreaker, and a new award limit.

---

## Section B — What the decision asked, and where it stood

1. The decision points at the RAMBO reply of 2026-09-05, `REPLY-TO-CHAT_CDM-RULEBOOK-PAGE-CITES_2026-09-05.md`, Drive id `1NOME0v9_Xewuh1JK0Po6DKPqcbyQ9KXQ`. That reply closed as PARTIAL.
2. **What was still unfinished:** Order B (the 2020-203 and 2025-203 instruments were not on disk) and Order C (the 2026-203 text was not on disk). The rows X-05, X-06, X-07, X-16 and X-17 still said "RFA INSTRUMENT NOT ON DISK" for 2020, 2025 and 2026. Row GAP-01 still said BLOCKED.
3. **What changed since then:** on 2026-09-19 the desktop filed the 2025-203 and 2026-203 PDFs to MY-DESK. Nobody had used them to finish these rows.

---

## Section C — What was done

1. I downloaded both RFA PDFs from Drive and checked their sha256 hashes. Both match the hashes the rulebook already records in its row CHART-203-2024-2026, so they are the same documents the desktop read.
   - 2025-203: `1xMiv5gOTj0poFn8lj93f1yFjBP0rbGCD`, 1,415,441 bytes, sha256 `26921e72…`, 163 PDF pages.
   - 2026-203: `1bO_EAp47mEOO2Fc8IJXc0wYAvZ2tyezg`, 1,714,688 bytes, sha256 `90e78ffe…`, 174 PDF pages.
2. I pulled the text page by page, read each printed "Page N of M" footer, and found each rule.
3. I rebuilt the latest merged rulebook from its 11 parts (v15, dated 2026-09-30, 110 rows, no duplicate rows) and compared it row by row.
4. I wrote the delta. It follows the rulebook's own merge rules, X-37, so old wording is kept and new text is added beside it.

**The delta, `CDM_LIHTC-9PCT-RULEBOOK_v16-CLOUD-DELTA_2026-10-13.csv`:**
- Drive id `1KnHFzc6VJyPdGvxmGE5LK76fsJ-eqxyi`, in MY-DESK (folder `1aYWNOHk8tcdmugP38pbF7S_Ma2azATzN`).
- 17,945 bytes, 13 rows, 16 columns. sha256 `d9c4ce9ec270d52a1e317e6f74c34a8ae2072fa24dce2d181bc6242f2fcacc0d`.
- **Verified:** I downloaded the Drive copy and hashed it. It is byte-identical to the local build.
- It adds to these rows: X-05, X-06, X-07, X-12, X-16, X-17, R-2025-203, R-2026-203, CAPR-2025-203, CAPR-2026-203, X-18 and GAP-01. It adds one new log row, GAP-23. After merging, the rulebook should have 111 rows.

**The cites, in plain words:**
1. **Credit multiplier: 8.5 in both rounds.** 2025: page 117 of 152. 2026: page 123 of 159.
2. **Tie-break order.** 2025 has 6 steps and adds Permit Ready at step d (page 77 of 152). 2026 has 7 steps and adds developer experience at step e (page 82 of 159).
3. **Goals.** Both rounds have three: Family in an opportunity area, Urban Center or MetroRail, and Elderly. Permit Ready is not a goal. 2025: pages 76 to 79 of 152. 2026: pages 81 to 84 of 159.
4. **Limit of 3 Priority 1 applications per principal, with at most one Permit Ready.** 2025: pages 11 to 12 of 152. 2026: page 14 of 159.
5. **Ten-year de-obligation bar in both rounds.** 2025: page 76 of 152. 2026: page 81 of 159.
6. **Developer experience.** 2025 still requires three finished projects (page 9 of 152). 2026 requires one finished project since 2006 (page 9 of 159). The new 2026 preference is on page 10 of 159, and the new award limit is on page 83 of 159.
7. **Credits available.** 2025: $10,909,420 (page 77 of 152). 2026: $10,935,850 (page 83 of 159).
8. **Group A/B cut-off.** In 2026 the 80% times 1.05 sentence is on page 126 of 159, not 125. Rows X-28-B, X-31, X-33, X-35 and X-36 carry "p. 125" and should read "pp. 125 to 126".

---

## Section D — What is still open, said plainly

**2020-203: BLOCKED for the cloud lane.**
- **What I tried:**
  - Searched Drive for any 2020-203 PDF. Only a short excerpt exists, id `1LMLevsRKvyixx2COXWUcHgGTuWvBubi9`.
  - Fetched floridahousing.org with curl. The proxy refused it (403).
  - Fetched it with WebFetch. The DNS lookup failed.
  - Ran a web search. No copy of the PDF turned up.
- **Why that's enough to stop:** the desktop already read the full 2020-203 PDF, because row X-28-B cites pages 105 to 106 of 137.
- **Smallest next action:** the desktop lane copies that one PDF into MY-DESK. This is not a task for Jorge.

**Not done, on purpose:**
1. **I did not merge the delta into a new full rulebook.** By standing practice, Cowork owns the merge and re-proves it.
2. **I did not copy anything into the client capsule folder.** That is a filing decision.

---

## Proof lines

1. Decision read: `DECISION_24_TRK-2026-1294_APPROVE-1.md`, Drive id `1T8cqaILDUpO7n2ZdODobCJYlcMoYZT9w`.
2. Source read: `REPLY-TO-CHAT_CDM-RULEBOOK-PAGE-CITES_2026-09-05.md`, Drive id `1NOME0v9_Xewuh1JK0Po6DKPqcbyQ9KXQ`.
3. Rulebook base read: v15 PART-1 to PART-11, MY-DESK, 2026-09-30. 110 rows, 16 columns, 0 duplicate ids.
4. Output: Drive id `1KnHFzc6VJyPdGvxmGE5LK76fsJ-eqxyi`. sha256 `d9c4ce9e…` on both the local and the Drive copy.
5. No email was sent. No file was moved, renamed, overwritten or deleted. No money was spent.

TRK-2026-1294 · CDM rulebook delta · v16-CLOUD · 2026-10-13 · CURRENT

**Status: CLOSED for 2025-203 and 2026-203. 2020-203 is BLOCKED, and it needs one desktop file copy.** The PC must not re-run this decision.

Shall Cowork merge this delta into the rulebook on its next run?
