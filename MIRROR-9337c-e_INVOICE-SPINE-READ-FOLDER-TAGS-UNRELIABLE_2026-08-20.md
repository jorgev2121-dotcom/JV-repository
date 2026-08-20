# Mirror — the 43-invoice spine is fully read, and the folder "PAID" tag is worthless

**Cloud TRK-2026-9336 mirroring the desktop's overnight invoice-forensics chain (2026-08-19 23:18 →
2026-08-20 00:0x), which executed my OD-18 answer and then corrected it.** Source files in
`_CLAUDE-MAILBOX`: `PAIDSPLIT-9337c` (1Vpwer9gr_wkUeiubeNniUbKjepPAg7tb), `AGED-9337d`
(1ZQeO-vmkU5eU4A9l0YmIw_JDTiI_fSUm) + its `.tsv`, `SPINE-9337e` (1Re7utEO-RVJx-Uq70OlDmTDoTbeHfhOM) + its
`.tsv`. **Read-only on both sides. Nothing moved, numbered, filed, or edited.**

## THE HEADLINE THAT CHANGES MY OD-18 ANSWER
I told the desktop to "number the UNPAID invoices for collections." **The desktop proved you cannot build
the unpaid list from filenames** — so it opened the actual PDFs instead. Result: the `(PAID)` folder tag
has a **0% corroboration rate**, wrong in both directions:
- **0 of 11 "(PAID)"-folder invoices carry ANY payment evidence on the document** (SPINE-9337e). The PAID
  claim rests entirely on a human typing `(PAID)` into a folder name — in one case (`9150 Fontainebleau
  …Michelle PAID)`) with the opening bracket missing, proving it was hand-typed.
- **3 of the 32 "unmarked" invoices are actually PAID** (6032, 6034 = QuickBooks "Deposited"; 6068 prints
  "Paid") — none of their folders say PAID (AGED-9337d).
- **2 folders marked HOLD/DRAFT were actually SENT and overdue** (6058, 6066) — correcting the earlier
  "6066 is a draft, not a receivable."

**Every document-proven payment sits in a folder that does NOT say PAID; every folder that says PAID has
nothing behind it.** The tag is not an accounts-receivable system and cannot be used as one.

## The full 43-spine, read both halves (SPINE-9337e)
| Evidence class | Invoices | Amount |
|---|---:|---:|
| PROVEN PAID (document says so) | 3 | $2,201.06 |
| PROVEN SENT + OVERDUE (document says so) | 4 | $4,800.00 |
| No document-level status at all | 36 | $49,948.68 |
| **Total spine face value** | **43** | **$56,949.74** |

**$56,949.74 is face value, NOT a receivable — it must never be reported as money owed.** Only 7 of 43
invoices have any status a machine can verify. **The only figure actionable today is $4,800 across 4
invoices** (6050, 6058, 6059, 6066) — and even that is frozen at a QuickBooks screenshot from early 2024,
~19 months ago. Not time-sensitive tonight.

## The real denominator is bigger, and the spine is a biased sample (PAIDSPLIT-9337c)
- The invoice spine lives in `From Contacts Mistake\TEAM CU ORDERS-USE THIS ONE`, which holds **85 job
  folders**, not 34 (24 marked PAID, 4 HOLD, 57 no marker). The 34 invoiced folders are **40% of the
  orders tree.**
- **13 PAID-marked folders have no invoice-numbered file at all** → the 43-number spine systematically
  misses paid jobs. "43 is a floor, not a ceiling" now has a number under it.

## The forensic win worth keeping (AGED-9337d)
`_QB Invoice #6059.pdf` was captured with the QuickBooks invoice LIST still on screen, surviving as an
**off-canvas text layer** — invisible on open, readable to a machine. Rebuilding rows by y-coordinate
recovered true statuses for 8 invoices (Sent/Overdue/Deposited). Two traps disarmed: (a) the QuickBooks
**status-filter dropdown** ("Overdue / Not due yet / Deposited") prints as loose text and was first
misread as an invoice's status — fixed by discarding any line with ≥2 status words; (b) **6 of 35 PDFs
were mojibake or image-only** (silent failures that look like blank invoices) — re-OCR'd at 300 dpi,
rescuing **$7,682.50** of invoice value from being reported unreadable.

## Desktop's own corrections to its earlier report (BILLED-9337b) — logged for honesty
1. "12 folders say (PAID)" → **11** invoice-bearing, **24** total. 2. "6 have no folder" → the prose said
6 but listed **7**. 3. `_2931 SW 117 Ave` is two folders holding the same invoice (6042) → 34 folders is
**≤ 33 distinct addresses**. (Three self-corrections in one chain — the negative-control discipline is
working.)

## THE ONE REAL OWNER DECISION — OD-21 (BLOCKED on a credential)
**To turn the $56,949 face-value spine into a real aged-receivables list, the source of truth is
QuickBooks — and the desktop cannot log in without Jorge's password.** The filename/PDF read has gone as
far as it can (7 of 43 verifiable). This is a genuine BLOCKED, not a hard task: **the smallest owner
action is Jorge approving/entering the QuickBooks login** (a credential — owner-gated, never automated).
Until then, no trustworthy collections list exists, and **nothing should be numbered off the filename
guess** (superseding the filename-based half of my OD-18 answer — the *shape* was right, the *source*
wasn't).

## What I did / did NOT do
Mirrored the chain, corrected the money framing in the morning report, logged OPEN-ITEMS, answered the
desktop. **Issued no number, built no collections list, opened no PDF myself, moved/filed nothing.** The
$56,949.74 is face value and is recorded as such, never as a receivable.

*TRK-2026-9337 (c/d/e) · #invoice-spine-read #folder-tag-unreliable #4800-actionable #OD-21-quickbooks
#face-value-not-receivable #JorgeValdes #CU-Inspections*
