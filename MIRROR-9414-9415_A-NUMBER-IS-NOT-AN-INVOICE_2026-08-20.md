# Mirror — the invoice count was inflated by payables, folios, and misread digits

**Cloud TRK-2026-9336 mirroring desktop PST-9414 (01:55) + OVERLAP-9415 (01:57), 2026-08-20.** Source in
`_CLAUDE-MAILBOX`: `PST-9414_…` (1oVig8TcYf_qsZFxjZBIydX-j0NA1JDS6), `OVERLAP-9415_…`
(1R0DH6CLYBfKr0zWcKlEZ0JuRX0SllJXl). Read-only both sides. **Nothing moved, opened, numbered, or filed.**
This deflates the "money outside the ledger" alarm: much of it isn't Jorge's money.

## The `1.6-Invoices` folder is mostly someone else's bills (PST-9414)
Opened all 110 emails. **Exactly ONE is an invoice Jorge sent out.**
- 47 are 2014 FIELD INSPECTION reports (work product, not billing).
- **50 are ARONSON ESTATES invoices billing Jorge $65–$90 each — PAYABLES (money Jorge OWES)**, series
  5149→6034, 2015–2019. They belong in bookkeeping, not the A/R spine.
- **THE TRAP: 6018, 6022, 6034 exist in BOTH ARONSON's series AND Jorge's** — same digits, opposite money
  direction, **15× amount gap** ($90 payable vs $1,400 Cesar Garcia receivable). A filename harvest books
  a $90 bill Jorge owes as a $1,400 receivable, three times over.
- **Standing rule: an invoice number is Jorge's only if the document names TEAM USA SALES / CU Inspections
  as the issuer. The number alone proves nothing.**

## Three "invoiced jobs" were never invoiced (OVERLAP-9415)
They entered the spine on a four-digit run that isn't an invoice number:
- `9211 W Calusa Club Dr` → **folio** 30-5902-002-1140 (10 files, zero invoices).
- `14598 SW 110 ST` (Miguelez) → **folio** 30-5910-018-0210; only invoice-like file is
  `Inv_6531_from_ARONSON_ESTATES` — a bill TO Jorge. (The same property that caused the 1614/1283 registry
  churn is now also wrongly carried as billed work.)
- `5959 SW 49 ST` → its own **street number** (3 files, zero invoices).
- A 4th caught in place: 6007 is `9455 W Flagler ST C107`, not Garden Walk (whose folio is 30-6007-…).

**The method fails wider:** of 72 filename-extracted "invoice numbers," 16 are outside the series — condo
unit numbers (1001/1416/1422/1501), street numbers, years (2019/2023/2024), a vendor bill (4099), a
statement ref (C1620). Same root cause as the number-substring misfiling already on the books — now shown
to inflate the **money** counts, not just filing.

## More vendors' bills hiding in the tree
- **ORSINI IT** (`billing@orsiniit.com`) — 21 "Payment Received" emails (MS-2014xxxx). Payables. A sweep
  keyed on "Payment Received — Invoice #" books all 21 as Jorge's collected revenue.
- **Air Guide Air Conditioning** — invoice 4099, a payable, filed in the spine tree.

## The overlap, measured — 51 is really ≤46
24 + 12 + 15 = 51 double-counts. Set A∩C = 1 (`14953 SW 65 Terrace`); Set B∩A ≥1 (6093 = Garden Walk
Townhomes, has a folder); minus the 3 false-invoice folders → **≤46, still an over-count** (7 Zaldivar
invoices + 3 address-less folders untested). **There is no defensible count to issue tracking numbers from.**

## Corrections to earlier cycles (self-caught)
- **Invoice 6093 was PAID** (Garden Walk, 2025-06-23) — 9412 inferred "outstanding" from reminders sent and
  never joined against payments-received. So 9412's "$18,515.85 / 12" → **$17,940.85 / 11**.
- **The real receivable count is 56, not 55** — 9414 found invoice **5903** (TEAM USA, 2019-12-05) in the
  gap between 5844 and 6002; no count had seen it (amount is inside the PST PDF).
- **4 more genuine TEAM USA invoices exist in email, uncounted: 5908, 5931 (unverified), 5933, 6083** —
  and 6083 is above 6079, inside the exact band 9412 swept and missed.

## What this means (and what it doesn't)
The "33 untracked billed jobs / $75k" framing is contaminated: some is other companies' bills, some is
folios/unit numbers, some is already paid. **The honest position is unchanged: only QuickBooks (OD-22)
gives a trustworthy receivable figure, only $4,800/4 is provably actionable, and nothing should be
numbered off the filename method until the spine is re-derived from the ISSUER.** Nothing at risk tonight.

*TRK-2026-9414 · TRK-2026-9415 · #a-number-is-not-a-series #folio-is-not-an-invoice #aronson-orsini-payables
#issuer-not-filename #6093-was-paid #count-is-56 #JorgeValdes #CU-Inspections*
