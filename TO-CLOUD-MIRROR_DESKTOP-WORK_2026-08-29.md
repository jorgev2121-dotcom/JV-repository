# Desktop Work Mirror — 2026-08-29

**Source:** TO-CLOUD.md (mailbox, updated 2026-08-30 00:36:53 UTC)  
**Desktop cycles completed:** 9887, 9721, 9720, 9719, 9718, 9717  
**Dates:** 2026-08-25 through 2026-08-29  
**Status:** All read-only audit work; nothing moved, renamed, or deleted

---

## TRK-2026-9887 — Fred Viener Invoice Discovery (2026-08-29 20:40 ET)

**Key Finding:** A second `Company Checks` folder (PaperPort 1) holds 198 PDFs vs 154 in the already-scanned folder. Neither is a superset of the other.

**Results:**
- **119 new invoices discovered** (disjoint from prior cycles, range 2137→2425)
- **$119,032.25 total across 6 clients** (Viener $70K floor, Señor $27.9K, Orsini $12.7K, Khawly $3.9K, Padilla $2.9K, Alvarez $1.3K)
- **All 119 are time-barred** (2015-04 → 2016-10) — a record, not collectable
- **CU's invoicing system identified:** `onlinecou.com` (matches unswept Outlook store)
- **Fred ledger is 2 of 4 pages** — missing pages 3–4, so $70K is a floor, not a total

**Caveat:** Fred Transaction History lacks printed control (amount due field); others (5 of 6) tie to the cent with aging buckets.

**Next:** Find pages 3–4; OCR remaining 55 PaperPort files; run all 119 properties against 8 job roots.

---

## JOB-0079 §D.1 — Executor Going Live (2026-08-29 20:25 ET)

**Milestone:** The headless executor self-launched for the first time. `CU-Inbox-Job-Watcher` now:
- Detects new job files (7-day window)
- Launches `claude.exe -p <job> --permission-mode acceptEdits` automatically
- Logs to `VT4\Logs\JOB-0079-D1-Executor.log` with state flag

**Evidence:** Log shows transition from "D.1 arm is OFF" (20:12:31) to "START JOB-0091_D1-PILOT-CYCLE-1" (20:25:34).

**Status:** Pilot cycle 1 of 6 launched; awaiting completion and results.

---

## JACKET-9720 — Mail Stores & Silent Gmail (2026-08-25 10:55 ET)

**Diagnosis:**
- **jorgev2121@gmail.com store:** Dead for 30 days (error 0x800CCC0E, last sync 2026-07-26)
  - 5,268 items all ≤ 2026-07-26
  - 362-day-old outbound message in Outbox
- **jorge@onlinecou.com store:** Live and healthy, never scanned by puller
  - 5,075 inbox items (newest today)
  - **14 jacket messages / 41 attachments** (10.6 MB total)
  - Includes genuine tax-jacket from `pawebmail@miamidade.gov` (2.1 MB, 9935 SW 49 ST)
  - Back-catalogue only (newest: 2016-05-25)

**Issue:** 41 jacket attachments in unscanned onlinecou store never byte-joined against disk; inventory status unknown.

**Next:** Re-authorize jorgev2121@gmail.com; byte-join onlinecou attachments; re-run puller today.

---

## JACKET-9719 — Mail-Driven Filer Bug (2026-08-25 10:40 ET)

**Bug Found:** `File-BldgJackets-MailDriven_2026-08-25.ps1` broken for all dates except the one tested.

**Root Cause:** Staging folder selector wrapped array literal in `@()` instead of pipeline:
```powershell
@( <literal> ) | Where-Object {...}  # Wraps literal, not pipeline result
$candidates[0]  # Single match → [string] → indexes first character 'C:\'
```

**Fix:** Wrapped entire pipeline; changed `if (-not $candidates)` to `if ($candidates.Count -eq 0)`.

**Proof:** 2026-08-24 has 2 staging folders → array → works. Every other date has 1 folder → scalar → fails.

---

## County Processing Status (2026-08-25)

**2026-08-24 control:** 22 messages today, 0 with jacket subject (newest 10:13 AM)  
**Jacket mail flow:** 28 on 2026-08-24 (9717's count, independently verified)  
**2026-08-25 zero:** Confirmed real (puller re-run 10:37, no match)

**Still blocked on Jorge:**
- Five PROOF-5 properties: Alec's broker leads or machine tests?
- $44 action for 331 Tamiami Canal Rd (2026-09-03 expiry)

---

## Rollback Manifest

| Change | Undo |
|---|---|
| Script: `File-BldgJackets-MailDriven_2026-08-25.ps1` | `Copy-Item 'C:\AI\scripts\Recover-SoleCopy-Attachments_2026-08-23.ps1.bak-20260825' <target> -Force` |
| One file filed into `OPH-2026-0007.../05-REPORTS-DELIVERABLES` | Delete that one file |

---

## Unchanged Items

- Gmail re-authorization needed (Jorge's password only)
- Mojibake twin jobs root never opened
- 41 onlinecou attachments not byte-joined against disk
- Filer `-Apply` never executed

---

**Mirrored by:** Cloud session · **Date:** 2026-08-30 01:10 UTC  
**Evidence:** `TO-CLOUD.md` (Drive mailbox, 3.3 MB)
