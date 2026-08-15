# HOLDING-AREAS-INVENTORY

**Compiled by:** Desktop Claude Code, 2026-08-15
**Preserved into the repo by:** Cloud, 2026-08-15 — the desktop's `git push` timed out
for the third time, so this existed only on the PC. Relayed via the Drive mailbox.

**⚠ CONTAINS TRK MIS-ASSOCIATIONS. See the corrections section before filing anything.**

---

## Summary

**~700+ documents across 6 holding areas. Roughly 1% carry a tracking number.**

| Holding area | Files | Job docs | TRK found | Path |
|---|---|---|---|---|
| Downloads | 30 | 7 | 1 (3%) | `C:\Users\JV\Downloads\` |
| PaperPort Business Cards | 30 | 12 | 0 (0%) | `...\My PaperPort Documents\Business Cards\` |
| Google Drive root | 8 | 4 | 2 (25%) | `G:\My Drive\` |
| Outlook inbox | 635 emails | ~150–300 est. | unknown | MAPI, inbox only |
| PaperPort scanner | 15 | 15 | 0 (0%) | PaperPort application folder |
| **Totals** | **~700+** | **~190–340** | **~3 (1%)** | |

**Note on the Outlook estimate.** "~150–300 job docs" and "30–50%" are the desktop's
**estimates, not counts.** Recorded as estimates deliberately — RI-014 and RI-019 were
both cases of a guess hardening into a fact through repetition.

---

## ⚠ CORRECTIONS BY CLOUD — do not file on the original associations

### 1. `14598 SW 110 ST` is NOT TRK-2026-1262

The inventory maps four items to `TRK-2026-1262`:

- `14598 SW 110 ST Migulez - Well Recertification - Legalization App 14598.pdf`
- `14598_SW_110_ST_As-Built_Engineering_Findings*.docx` (3 versions)
- `14598_REVIEW-APPROVAL-PACKAGE_2026-07-08.pdf` (3 versions)
- `14598_recent_emails.xlsx`

**`TRK-2026-1262` is `20001 SW 110 CT Unit 143`.** Confirmed from the Drive job folder
name and from every filed document under that number.

**`14598 SW 110 ST` is a different property**, associated with a different party
(Migulez), and it appears to have **no tracking number at all.**

**The two were conflated because both contain "110".** `SW 110 CT` and `SW 110 ST` are
different streets. This is precisely the fuzzy match `CLAUDE.md` section 9 forbids, and
acting on it would have filed one client's engineering findings and legalisation
application into another client's job folder.

**Required:** 14598 SW 110 ST needs its own TRK issued from the registry, and roughly
seven documents move with it. **Until that number exists, these stay UNFILED.**

### 2. One UNKNOWN resolved from cloud's registry

`TeamUSA-Invoice_INV-2026-03761_DueDiligence_Edison-Tower-DERM_2026-07-13.pdf`
→ marked "UNKNOWN TRK (Edison Tower project)"

**It is `TRK-2026-1294` — Edison Towers II, 661 NW 58 St, Miami 33127 (TEDC).**
Confirmed against `TRK-REGISTRY.md`, recovered from the Drive folder name.

**This is the collaboration working as intended:** the desktop can see the files, cloud
holds the registry. Neither could have made this match alone.

---

## Still UNKNOWN — properties with no tracking number found

Each of these appears to be a real job with no TRK anywhere:

| Property / party | Source |
|---|---|
| `14598 SW 110 ST` — Migulez | PaperPort cards, Downloads, Drive root (~7 docs) |
| `11385 NW 12 AVE` — folio 30-2135-010-0170, Yolanda Rodriguez | Downloads (3 versions) |
| `2262-2364 SW 2 ST` — Jose A Gonzalez, City of Miami BB16003432 | PaperPort cards |
| `9907 NW 9 Street Circle` units 15–20 | PaperPort cards |
| `20723 SW 119 PL` | PaperPort cards |
| `1185 SW 183 ST` — heating permit 2-14-2018 | Downloads |

**Six properties with documents and no identity.** Each needs a registry-issued number
before anything can be filed. This is a larger finding than the orphaned files
themselves: **jobs exist that the tracking system has never heard of.**

---

## Contacts recovered from business cards — check before the $99 skip-trace

| Contact | Property | TRK |
|---|---|---|
| Migulez | 14598 SW 110 ST | **none — needs one** |
| Jennifer Ting Chen | Bay Harbor 10000 Building | TRK-2026-1582 |
| Reyna Jovel | Bay Harbor NOC | TRK-2026-1582 |
| Jose A Gonzalez | 2262-2364 SW 2 ST, City of Miami | none |
| Einar Suarez | 8621 Pasadena Blvd, Pembroke Pines | none |
| Yolanda Rodriguez | 11385 NW 12 AVE | none |

**`TRK-2026-1582` = Bay Harbor 10000 Building.** That number was missing from cloud's
registry — another confirmed gap for RI-013.

---

## Root cause — desktop's, confirmed

**Ingestion pipelines do not apply tracking numbers at source.** Scan produces
`Document (1).pdf`. Email attachments land with a sender name. Downloads take the
browser's default. Filing happens afterwards, and without an anchor documents get
best-guessed into a folder, or never filed at all.

See `RECURRING-ISSUES.md` RI-020 for the full treatment and the exit-gate design.
