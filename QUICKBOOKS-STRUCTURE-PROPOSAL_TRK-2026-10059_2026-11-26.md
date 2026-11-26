# QuickBooks structure for two companies and the owner — proposal (TRK-2026-10059)

**Written by:** ☁️ Cloud, 2026-11-26 (Eastern). **Status: PROPOSAL. Nothing in QuickBooks was changed for this.**
**Asked by Jorge:** "a better structure ... as relates to the two businesses and the owner without having to add more expense to QuickBooks."
**Not tax advice.** One confirming call to the CPA (Gregorio Herrera) before the feeds are moved.

## Section A — What is wrong with today's set-up

Today one paid file (TEAM USA SALES, INC., Simple Start) holds bank feeds for three different owners:
- Team USA Sales (Jorge 100%): Chase 8020, Ink 4981.
- CU Inspections of South Florida (Jorge 50%, Christopher Forry 50%, files its own 1120-S): Chase 5615.
- Jorge personally: Chase 5709, BOA 8939, Amazon Visa 7343, and (added by cloud 11-26) BankAmericard 5383.

Result: Team USA's balance sheet shows cash and debts that belong to another company and to a person. CU Inspections has a second shareholder, so its books cannot live inside Team USA's file. Every CU and personal row has to be hand-pushed to an intercompany or shareholder account forever.

## Section B — Options compared

1. **RECOMMENDED — one file per owner, $0 added.**
   - Team USA Sales keeps the paid Simple Start file, with only its own accounts: Chase 8020, Ink 4981, SBA EIDL, and the old business cards.
   - CU Inspections gets its own company on the QuickBooks Free plan ($0), under the same Intuit login. Secondary sources (2026) say Free allows 1 user, 1 connected bank, 2 invoices a month. CU has exactly one bank account (5615), so it fits.
   - Jorge personal: no QuickBooks at all. Personal accounts are disconnected from the Team USA file. The Budget workbook stays the personal record.
   - Money that crosses between the three is booked once on each company's own side, using the accounts already created 11-23 (Due to / Due from CU, Loan from Shareholder, Due from Shareholder, Shareholder Distribution). It shows up in 8020's own feed, so nothing is lost.
   - Failure mode: the Free plan's limits (2 invoices a month) pinch if CU starts billing more; then CU moves to Simple Start at $38. Lifespan: years.
2. **Keep everything in the one file (today).** $0. Failure mode: wrong balance sheet, two tax returns fed from mixed books, endless manual reclassifying. Lifespan: until the CPA or an auditor objects.
3. **Upgrade Team USA to Plus for classes/locations.** About $140 a month versus $38. Costs more and still does not fix the legal problem, because a class is not a separate company. Rejected.
4. **CU Inspections on Wave's free plan.** $0 but no automatic bank feed on the free tier in 2026; statements uploaded by hand. Rejected: hand work dies in the backlog.

## Section C — What changes under option 1

- Team USA file: disconnect feeds for 5615, 5709, 8939, 7343. Exclude (not categorize) their pending rows. Make those four accounts inactive once their balances are moved out. Cloud-created account 106 (BankAmericard 5383, a consumer card in Jorge's name) becomes unnecessary; the $11,400 it pays onto the Ink card is booked as Loan from Shareholder when the payment posts on 4981.
- Live rows left to categorize in the Team USA file: 8020 = 116 and Ink 4981 = 49, total 165 (was 266).
- CU file: created by Jorge (sign-up is an owner click), then one bank link for 5615. Cloud can categorize there once the connector is pointed at it.

## Section D — Not verified

- The Free plan's existence and limits come from 2026 review sites, not from Intuit's own pricing page (not reachable in search results).
- Whether Intuit lets an existing subscriber add a second company on the Free plan under the same login.
- Whether the QuickBooks Labs connector works with a Free-plan company.
- Whether Amazon Visa 7343 is personal or business.

TRK-2026-10059 · v1 · 2026-11-26 · CURRENT
#TeamUSASales #CU-Inspections #QuickBooks #JorgeValdes
