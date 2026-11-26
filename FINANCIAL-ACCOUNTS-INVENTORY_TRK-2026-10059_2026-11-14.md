# Financial accounts inventory for QuickBooks — TRK-2026-10059

**Written by:** ☁️ Cloud, 2026-11-14 about 4:15 PM ET.
**Purpose:** one list of every bank account, credit card, debit card, loan and payment channel Team USA Sales / CU Inspections uses, so the QuickBooks chart of accounts can be filled in one pass the moment the QuickBooks connector is re-authorized.
**Rule (Article 5 of CLAUDE.md):** nickname and last-4 only. No full account numbers anywhere in this file.
**TRK note:** 10059 = the 11-12 checkpoint's 10056 + 3. Registry is on the desktop (not reachable from cloud). Verify before reuse.

---

## Section A — What QuickBooks already has (from Jorge's paste, 2026-11-14)

These five credit cards are already in the QuickBooks chart of accounts with balances. Nothing to add, only to confirm the bank feed is connected for each.

1. **Team INK Credit Card** (Chase Ink Business) — balance owed $10,674.53
2. **Discover** — balance owed $8,203.00
3. **Barclay** (Barclays US) — balance owed $6,227.80
4. **American Express** — balance owed $1,744.85. Amex emails show the account as "ending 12001" (Amex uses 5 digits). Card member since 1992.
5. **Amazon** — balance owed $205.50. Issuer not yet confirmed (Synchrony "Amazon Store Card" or Chase "Amazon Visa"). Check the back of the card.

## Section B — Bank accounts NOT yet confirmed in QuickBooks (business)

Evidence: Chase statement notices in Outlook (Jorge@TeamUSASales.com), the desktop's own bank-CSV profiling (OPEN-ITEMS: "Chase 8020 / 5615 / 5709, the three current accounts"), and Intuit's own receipt.

6. **Chase business checking ending 8020** — this is the account Intuit bills the QuickBooks subscription to (Intuit receipt 2026-10-21, "payment account ending 8020"). Statement notice 2026-11-01. Most likely the Team USA Sales operating account.
7. **Chase checking ending 5615 = CU INSPECTIONS account** (Jorge's own 2022 budget workbook labels transfers "to 5615 (CU)"). Receives client Zelle payments (many proven 2025–2026). Chase sent an overdraft / declined-transaction notice 2026-11-13 at 11:29 PM ET. Statement data on disk 2025-01-02 → 2026-07-21.
8. **Chase checking ending 5709 = JORGE'S PERSONAL Chase account** (the 2022 budget workbook labels transfers "to 5709 (personal)"). Statement notice 2026-10-21. Data on disk 2025-01-21 → 2026-07-21. **Do not connect to the business books**; treat money moving between 8020 and 5709 as owner draw / owner contribution, like BofA 8939.
9. **Chase account ending 8662** — named in OLDER bank exports only. Possibly closed or renumbered. Unverified.
10. **Dade County Federal Credit Union, account ending 0517** — named in older bank exports. Business or personal unconfirmed. DCFCU phone (from their own email): 305-471-5080.

Chase business customer service (public number, verify on the back of the debit card): 1-800-242-7338.
Chase routing number used by Intuit for the 8020 account: 267084131 (Chase Florida).

**Debit cards:** none identified by number yet. Each Chase checking account normally carries one debit card; QuickBooks does not need debit cards as separate accounts (they post to the checking account they draw on).

### Source found 2026-11-14 — Jorge's own 2022 budget workbook
`Dropbox /Transfer 07082025 gks/From Contacts Mistake/515 Misc DOCS - File & folder/TeamUSASales_Budget 2022.xlsx` (13 sheets, one per month). It is the ancestor of the "$$$Budget" workbook Jorge keeps on the PC. As of 2022 it listed, with credit limits and rates:
- Chase Credit Card (Ink): limit $28,000, 20.99%
- Discover: limit $12,000, 22.99%
- Barclay Card (American Airlines): limit $8,600, 19.99%
- American Express: limit $7,200, on a 60-month payment plan at 7.99% (ended ~2026)
- Home Depot (Citi) ending 6354: limit $2,000, 26.99%
- Macy's: limit $1,200, 25.24% — **not in QuickBooks today; status unknown**
- Amazon: limit $500, autopay statement balance
- Mazda Financial Services auto loan $438.41/month and Progressive auto insurance (2022; the auto loan today is DCFCU ending 0040)
- Fixed monthly business items then: Intuit QuickBooks, Microsoft 365, AT&T, Dropbox, Sunpass, MDC RER permit fees, county recording fees

## Section C — Loans (liabilities QuickBooks should carry)

11. **SBA EIDL loan, $232,900 original** — long-term liability. Last payment visible on the business account 2022-12-29 (−$1,232). No payment observed 2025-01 → 2026-07 (OPEN-ITEMS 9697). Open question: which account pays it, and is it current. SBA loan servicing (public): 1-833-853-5638.
12. **DCFCU auto loan ending 0040** — a returned autopay was reset 2026-10-26 (Christofer Placencio, DCFCU, sent the contract and receipts). Probably PERSONAL. Jorge decides whether it belongs in the business books.

## Section D — Cards found in the business mailbox that are NOT in QuickBooks

All three send notices to Jorge@TeamUSASales.com. Business or personal is Jorge's call; if business, add them.

13. **Citi / AAdvantage Platinum Select, card ending 6889** — cardmember since 2018, autopay on, statement closes ~27th. Citi (public): 1-800-950-5114.
14. **Home Depot Consumer Credit Card (issued by Citi), ending 6354** — minimum-payment alerts Oct–Nov 2026. (public): 1-800-677-0232.
15. **U.S. Bank Shield Visa, ending 9915** — NEW card, welcome email 2026-10-14. (public): 1-800-285-8585.

## Section E — PERSONAL account that must stay OUT of the business books

16. **Bank of America checking ending 8939** — Jorge's known personal account (statements monthly to Gmail since 2022, proven 2014→2025). 17 transfers totaling $29,712.84 went from this account INTO Team USA / CU Inspections 2025-08 → 2026-08. **Do not connect this account to QuickBooks.** Record those transfers as **Owner Contribution** (equity) on the Chase side.

## Section F — Payment channels (not accounts, but QuickBooks needs them as payment methods)

- **Zelle** (through Chase 5615, mostly) — the main way clients pay; 79 third-party inbound payments found in the 9431 sweep. Never says "invoice."
- **Paper check** — e.g. Tacolcy paid on Regions Bank checks; deposited to Chase.
- **ACH / wire** — e.g. Iberostar paid invoice 6096 by ACH with the invoice number in the memo.
- **Stripe / PayPal / Square** — mentioned in notes; no payout to a Jorge account proven. Unverified; leave out until seen.

---

## Section G — What QuickBooks actually needs (and what it does not)

QuickBooks does **not** take a contact list and "populate." Two things fill it:

1. **Chart of accounts entries** — name, type (Bank / Credit Card / Long Term Liability), last-4. Cloud can create these through the connector in one pass once it is re-authorized. Items 6, 7, 8, 11 are the business ones to add now.
2. **Bank feeds** — QuickBooks pulls transactions only after Jorge signs into each bank INSIDE QuickBooks (Transactions → Bank transactions → Link account). That sign-in is an OAuth click only the owner can do. Phone numbers are irrelevant to this step.

Bank customer-service numbers above are public numbers from memory, included for Jorge's convenience; confirm against the back of each card.

## Section H — Status

**2026-11-26 update:** QuickBooks connector live. Chart already holds 8020, 5615, 5709, 8939, Amazon Visa 7343, INK 4981 and the four older cards; 8 bank feeds connected, 6 healthy, 2 legacy-2021 dead. Cloud created `SBA EIDL Loan (8008)` (id 105). 645 bank-feed rows wait for review. Amazon Visa (7343) is typed as a Bank account and should be a Credit Card.

### Earlier status (2026-11-14)

- Connector check 2026-11-14: QuickBooks Labs and QuickBooks (Intuit) connectors both answer "sign in again." Nothing read or written in QuickBooks.
- This file is the prepared input. When the connector is back: create items 6, 7, 8 (Bank), 11 (Long Term Liability), plus any of 13–15 Jorge marks business; verify the five cards' feeds; record BofA transfers as Owner Contribution.

TRK-2026-10059 · v3 · 2026-11-26 · CURRENT
v2 change: 5615 = CU Inspections, 5709 = personal, Macy's card added, 2022 limits added (source: TeamUSASales_Budget 2022.xlsx).
#TeamUSASales #CU-Inspections #QuickBooks #ChartOfAccounts #JorgeValdes
