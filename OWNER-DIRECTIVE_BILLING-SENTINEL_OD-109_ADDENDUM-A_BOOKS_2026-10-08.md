OD-109 ADDENDUM A — THE BOOKS (P&L, Balance Sheet, AR/AP, daily refresh)
TRK: PROVISIONAL (same project as OD-109; RAMBO assigns from registry)
Issued: 2026-10-08 by Jorge Valdes (dictated). Status: ACTIVE.

---

## What Jorge asked for (rewritten)

About six months ago Jorge saved his full 2025 bank history and Chase card statements.
He wants them found, every transaction sorted into categories automatically, and a
2025 P&L and balance sheet built from them. Then keep the books current by pulling new
transactions about every 24 hours. Show what clients owe him (AR) and what he owes (AP).
QuickBooks is available as a tool. Sending invoices is optional, later.

## Where the data is (found 2026-10-08 by cloud, from earlier desktop reports)

All on Jorge's PC in `C:\Users\JV\Downloads`, downloaded 2026-07-26. Not on Google Drive.

1. 8 Chase business-checking exports (`Chase*.CSV`), 2025-01 to 2026-07 (accounts ending
   5615 = CU Inspections, and 8020). 95 credits, $142,423 already read (TRK-2026-9452).
2. `stmt.csv` — Bank of America personal account, all of 2025, 142 transactions.
   Parse checked to the cent: start $1,217.74, end $15,266.73 (TRK-2026-9466).
3. Card exports: `Discover-AllAvailable-20260726.csv`, `Last year (2025).CSV`,
   `Year to date.CSV` (a Chase card), `activity.csv` (Amex-shaped). Plus the two Chase
   cards that carry county fees (CARD-9457, COUNTY-9458).

**Gap:** no bank data on disk before 2025, and nothing after 2026-07-21.

## What was done before, and what was never done

Earlier desktop runs (August 2026) used these files only to check which invoices were
paid. **Nobody ever built a P&L or a balance sheet from them.** That is the new work.

Key facts already established:
- QuickBooks Online is a LIVE, PAID subscription ($38/month, 19 months, never missed).
- Most 2025 revenue was billed outside QuickBooks (the invoice record explains ~8%).
- The $232,900 SBA loan shows no payment on record 2025-01 to 2026-07 (not proof of
  default; could be paid from another account).

## Decision: QuickBooks Online is the engine. RAMBO operates it. Jorge never opens it.

**Objection to a home-built system:** building our own categorizer and statements
duplicates a tool Jorge already pays for, and becomes one more fragile thing to keep alive.

**Why QuickBooks Online wins:**
- Built-in bank feeds pull Chase and BofA transactions daily on their own once connected.
  This also replaces OD-109 Loop A (Plaid). One fewer moving part.
- Bank rules auto-categorize repeat payees (county, Zelle clients, software).
- P&L, Balance Sheet, AR Aging, AP Aging are standard reports.
- Reports can be scheduled to email on a timer (plan support to be confirmed by RAMBO).
  RAMBO or cloud reads the email and puts the numbers on the VTES panel.
- History before the feed's reach is loaded by uploading the CSVs above into QuickBooks.

**What stays home-built:** only OD-109's billing match (portal fee vs bank payment vs
job TRK). QuickBooks does not know job numbers or county portals.

## Build order

Phase B0 — Draft books from disk (GREEN, starts now, no login).
  RAMBO reads the CSVs above, sorts every row into categories with a rule table,
  writes a DRAFT 2025 P&L per company + a cash-position summary + an AR list.
  Business and personal accounts kept separate; owner draws/capital flagged, not counted
  as income or expense. Output to a NEW folder `G:\My Drive\FINANCE\BOOKS-DRAFT-2025\`.
  Clearly stamped DRAFT, not tax-grade.

Phase B1 — QuickBooks login (RED: credential use). Needs Jorge's one-word yes.
  RAMBO reads the QuickBooks login from 1Password, signs in, and reports the plan,
  which companies exist, what bank feeds are already connected, and last activity.
  Jorge may need to read one code off his phone once.

Phase B2 — Connect bank feeds inside QuickBooks (Jorge clicks the bank's own popup,
  about 2 minutes per bank). From here transactions arrive daily by themselves.

Phase B3 — Upload the 2025 CSV history into QuickBooks; apply the B0 rule table as
  QuickBooks bank rules.

Phase B4 — Schedule P&L, Balance Sheet, AR Aging to email daily. RAMBO posts them to
  a FINANCE tab on the VTES panel (folds into round 11 with the BILLING tab).

## Honest limits

- **A balance sheet needs more than bank data:** loan balances (SBA), card balances,
  and starting equity. The draft will list those as UNVERIFIED lines until confirmed.
- 2023–2024 bank data is not on disk.
- Draft books are for monitoring, not for filing taxes.

## Constraints (unchanged from OD-109)

No password or PIN changed. Nothing sent without Jorge's click. No client document filed.
QuickBooks login only after Jorge's yes. Card numbers: nickname + last 4 only.

OD-109-A · BOOKS · v1 · 2026-10-08 · CURRENT
