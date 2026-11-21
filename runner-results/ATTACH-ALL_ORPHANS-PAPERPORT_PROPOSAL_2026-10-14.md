# ATTACH-ALL: orphans and PaperPort 188 — filing proposal, 2026-10-14

**Proposal only — nothing filed. Filing runs with Jorge's yes per batch.**
No TRK or OPH numbers were issued. No money amounts, card or bank numbers are in this file.

## Section A. Counts

1. **Orphans in the repo register: 9 of 9 listed** (OPH-2026-0001 to 0009). 4 are already resolved NON-JOB (0002, 0003, 0004, 0006). Of the 5 open: **0 certain matches, 1 AMBIGUOUS (0007), 4 NO-MATCH (0001, 0005, 0008, 0009).**
2. **PaperPort 188: item-by-item list BLOCKED.** The 188-row table exists only on Jorge's PC. Only RAMBO's summary counts reached Drive: 8 exact, 12 non-job, 168 no match. Those counts are unverified from here.
3. The older "~700 orphans" figure in the standing order is not backed by any list in the repo. Only the 9 registered OPH rows exist here.

## Section B. BLOCKED: PaperPort 188 per-document list

**Where I looked:**
1. Repo: `ORPHAN-REGISTER.md` (9 rows plus a reservation line for OPH-2026-0100 to 1999; no 0100-0287 rows), `ORPHAN-NUMBERING.md`, `ORPHAN-ONBOARDING-SWEEP.md`, `runner-results/`, `control-panel/`, `mailbox/`, `reports/`, `inbox-sweep/`. Also all remote branches (grep for OPH-2026-0100 to 0287 and `PAPERPORT-OPH-TABLE`): only the reservation line.
2. Drive search by title and full text for PaperPort and OPH-TABLE. Found only the summaries `EXECUTED_MSG-CLOUD-TO-CODE_PAPERPORT-OCR-SWEEP_v2_2026-10-10.md` and `EXECUTED_CODEX_..._PAPERPORT-OCR-TABLES-TO-DRIVE_2026-10-13_...md`, plus 2023-PaperPort `.TAGS.txt` sidecars (a different set of about 480 files, not the 188).
3. **Why it failed:** the Codex lane built `PAPERPORT-OPH-TABLE_2026-10-10.md`, `_IDENTITY-EVIDENCE_2026-10-10.csv` and `_FILING-PROPOSALS_2026-10-10.md` in `C:\AI\codex-work\...` and wrote "They are not in Drive. Drive access was denied." RAMBO's run also holds the CSV at `C:\VTES\OCR-MIRROR\PaperPort\_IDENTITY-EVIDENCE_2026-10-10.csv`.

**Smallest action (WORKAROUND-CERT):** tried repo, all branches, Drive title and full-text. Cloud cannot read the PC disk. The desktop window needs to copy those two files into Drive "Shared Folders for all LLMs" (or the repo `mailbox/`). One yes from Jorge, then the desktop does it. Then I can match all 188 rows by evidence.

## Section C. PaperPort: group results reported by RAMBO (unverified, group level)

1. Group A, exact TRK match: 8. 6 to TRK-2026-1667, 1 to TRK-2026-1283, 1 to TRK-2026-9365.
2. Group C, non-job: 12 (W9s, vehicle registrations, a personal budget note, workers-comp audits, test files).
3. Group B, no match, stays orphan: 168.
4. Group D, duplicate check against 01-JOBS: not run.

Flags I found when cross-checking against the census:
1. **TRK-2026-9365 is in the 9xxx internal admin band.** CLAUDE.md reserves it, never for jobs. In OPEN-ITEMS it is a Medley print-run task. That match is not a job match.
2. **The two files named "10980 SW 202 DR APT 29" conflict.** The census lists 10980 SW 202 Dr Cutler Bay as TRK-2026-1310, while RAMBO assigned them to TRK-2026-1667. Cannot tell which is right from here.
3. **TRK-2026-1283 is the live number for 14598 SW 110 ST.** The registry shows TUS-25-1023 and a void-pending TRK-2026-1614 for the same address, the known near-miss. Double check before filing.

## Section D. Batch 1 (orphans, 9 rows)

| Item | Proposed job | Evidence | Confidence |
|---|---|---|---|
| OPH-2026-0001 `E-1.01-REV#2.pdf` | NO-MATCH | Plan sheet number only. Address, folio, permit not yet extracted from the title block. No census hit possible. | none |
| OPH-2026-0002 Seagate `MediaID.bin` | NON-JOB (already resolved 2026-08-16) | Seagate device metadata | high |
| OPH-2026-0003 `Start_Here_Chromebook.pdf` | NON-JOB (already resolved) | Seagate device documentation | high |
| OPH-2026-0004 `Start_Here_Win.exe` | NON-JOB (already resolved) | Seagate bundled installer | high |
| OPH-2026-0005 `B:\Warranty.pdf` | NO-MATCH (likely NON-JOB, unread) | Same drive as the three Seagate factory files. Contents never read; if it names a property it could attach to a job. | low |
| OPH-2026-0006 PaperPort "JV A-P and creating a budget" | NON-JOB (already resolved) | Internal accounts-payable and budget note named by Jorge; route to OneDrive cabinet | high |
| OPH-2026-0007 Bal Harbour + Plaza, HOA-questioned units (a folder, 176 documents) | **AMBIGUOUS**: TRK-2026-1265 (proposed in the 10-13 capsule) vs TRK-2026-1582 | Capsule: same building (10185 Collins Ave), contractor, Village and people as 1265; one report already stamped 1265. Against: the register row says 10000 W Bay Harbor Dr, and the registry says 1582 is Bay Harbor 10000. The two descriptions of the building disagree. Units 305 and 1515 may stay OPH. | medium |
| OPH-2026-0008 HOA architectural-review application, 10510 SW 153 CT Unit 1 | NO-MATCH | Only name known is Courtesy Property Management (the HOA manager). No folio or permit number; address absent from `_JOBS.tsv`, `_FOLDERS.tsv` and PEOPLE-INDEX. Needs handwriting read of page 1 or the Gmail body. | none |
| OPH-2026-0009 Sandra Suleta 2015 permit set (31 PDFs) | NO-MATCH | Client name, process 2015095890 and prefix X2018226249 have zero hits in registry, census or people index. Needs county lookup. | none |

## Section E. Batch 2 (PaperPort group rows, 8 rows; document names only where the Drive summary gave them)

| Item | Proposed job | Evidence | Confidence |
|---|---|---|---|
| `Document (10).pdf` | TRK-2026-1667 | RAMBO group A exact match; text not seen by me | medium, unverified |
| `Document (45).pdf` | TRK-2026-1667 | same | medium, unverified |
| `Document (46).pdf` | TRK-2026-1667 | same | medium, unverified |
| `Document (49).pdf` | TRK-2026-1667 | same | medium, unverified |
| `10980 SW 202 DR APT 29` permit app, file 1 | **AMBIGUOUS**: 1667 vs 1310 | RAMBO says 1667; census says that address is 1310 | low |
| `10980 SW 202 DR APT 29` permit app, file 2 | **AMBIGUOUS**: 1667 vs 1310 | same | low |
| One document (name not in the summary) | TRK-2026-1283 | RAMBO group A; 14598 SW 110 ST has conflicting numbers (see Section C) | low |
| One document (name not in the summary) | **AMBIGUOUS / invalid** | RAMBO matched to 9365, an admin-band number, not a job | none |

The other 180 PaperPort rows (12 non-job, 168 no match) cannot be listed until the table is copied off the PC.

## Section F. Notes

1. Nothing was moved, renamed, copied or deleted. Only this file was created. Not committed.
2. The repo `ORPHAN-REGISTER.md` is behind the PC: its high-water mark says OPH-2026-0010, while RAMBO reports OPH-2026-0100 to 0287 issued and the register at 0288. Reconcile before issuing anything new.
3. Known unrelated duplicates: the five `TRK-TBD` units at 10000 W Bay Harbor Dr (221, 301, 302, 404, 425) have no OPH numbers; they are not in this list.

Shall I go ahead once the desktop copies the 188 table into Drive?
