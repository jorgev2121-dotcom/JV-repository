# Financial accounts inventory for QuickBooks — TRK-2026-10059 — v3

**Written by:** ☁️ Cloud, 2026-11-14 about 6:30 PM ET (v3). v1 and v2 earlier the same day.
**Purpose:** one list of every bank account, credit card, debit card, loan and payment channel Team USA Sales / CU Inspections uses, with everything QuickBooks needs to add each one, so the chart of accounts can be filled in one pass.
**Rule (Article 5 of CLAUDE.md, and TRK-2026-9346 Section A):** nickname and last-4 only. No full account numbers, no card expirations, no security codes, no usernames, no passwords anywhere in this file. Those stay in Jorge's own workbook (Section I says where it is).
**TRK note:** 10059 = the 11-12 checkpoint's 10056 + 3. Registry is on the desktop (not reachable from cloud). Verify before reuse.

**v3 source:** Jorge's own workbook `ACCOUNTS -BUDGETS - REVISED 2026-06-02 -JV-JORGE.xlsx` ("up to date as of 2025-08-26", last revised 2026-06-02), which he emailed to himself 2026-11-07. Read from the Outlook copy. It settles most of v2's open questions. The sheet's own sensitive content is covered in Section I and RI-058.

---

## Section A — The two companies (QuickBooks "Company settings")

- **Team USA Sales, Inc.** — EIN 46-2171268. Owner Jorge Valdes. Business address on file 13633 SW 142nd Terrace, Miami FL 33186-8347. Cell 305-300-4500.
- **CU Inspections of South Florida, Inc.** — EIN 27-0951646. Same owner, same address.

QuickBooks holds ONE company per file. Today's QuickBooks company appears to be Team USA Sales (it pays the Intuit subscription from the Team account). CU Inspections money that lands in Chase 5615 is either a second QuickBooks company or a separate bank account inside the same company. **Owner decision needed (one word): "one company" or "two".** Recommendation: one company, two bank accounts, until a CPA says otherwise. Tradeoff: simpler now, a little re-sorting if the companies ever file separately.

## Section B — Bank accounts (QuickBooks type: Bank → Checking)

All three Chase accounts use Chase Florida routing 267084131. Bank of America uses routing 063100277. Routing numbers are public and are safe here.

1. **Chase — TEAM USA SALES — checking ending 8020.** BUSINESS. The operating account. Pays the Intuit subscription (Intuit receipt 2026-10-21), the Chase Ink card and the recurring debits in Section G. Debit card: Chase TEAM Visa debit ending 0058 (received 2024-05-07). Statement notice 2026-11-01. **Add to QuickBooks: Bank / Checking / "Chase Team USA Sales 8020".**
2. **Chase — CU INSPECTIONS OF SO. FLORIDA — checking ending 5615.** BUSINESS (the sheet names it "Chase - CU Inspections of So. Florida"). Receives client Zelle payments (79 found in the 9431 sweep). Debit card: Chase CU Inspections Visa debit ending 7675. Chase sent an overdraft / declined-transaction notice 2026-11-13 at 11:29 PM ET. Statement data on disk 2025-01-02 → 2026-07-21. **Add to QuickBooks: Bank / Checking / "Chase CU Inspections 5615".**
3. **Chase — PERSONAL — checking ending 5709.** PERSONAL (the sheet names it "Chase - Personal"). Debit card ending 3691 (replaced 2024-10-26). **Keep OUT of the business books.** Money moving between 8020 and 5709 is Owner Draw (out) or Owner Contribution (in).
4. **Bank of America — personal checking ending 8939.** PERSONAL. Debit card ending 6767. 17 transfers totaling $29,712.84 went from this account INTO Team USA / CU Inspections 2025-08 → 2026-08. **Keep OUT of QuickBooks; book those transfers as Owner Contribution (equity) on the Chase side.** The sheet also lists a $1,500.99 debit to "BOA" on the 20th from 8020 — that is a transfer back to the personal side (likely the mortgage), so it is Owner Draw, not an expense.
5. **Chase account ending 8662** — named in OLDER bank exports only, not on the 2025 sheet. Treat as closed. Unverified.
6. **Dade County Federal Credit Union, account ending 0517** — in older exports only. Business or personal unconfirmed. DCFCU phone (from their own email): 305-471-5080. DCFCU also carries the auto loan in Section D. A recurring DCFCU payment was processed 2026-11-11 (confirmation O82BFT2J94).
7. **Bank of America — Avis Builders LLC — debit ending 8087 (Alec J. Valdes).** NOT Jorge's company. Listed on the sheet for convenience only. **Never in Jorge's QuickBooks.**

## Section C — Credit cards (QuickBooks type: Credit Card)

### Already in QuickBooks (from Jorge's paste 2026-11-14), with what the sheet adds

8. **Chase Ink Business — "Team INK Credit Card"** — QuickBooks balance owed $10,674.53. Current card issued 2025-08-01, **ending 2690** (the sheet also writes it once as 2698; check the plastic). Limit $42,999 (raised from $28,000). Earlier cards: ending 0012 (2024-07-20 to 2025-08) and ending 9687 (closed 2024-07-15). Autopay $650 on the 7th from 8020. Carries Lively (mom's phone, $39.99), Microsoft AI subscriptions ($30.99), Netflix (mom, $21.99), PayPal (~$199.99 budget). **Those mom-and-Netflix lines are personal: code them Owner Draw.**
9. **Discover it — ending 6118** — QuickBooks balance owed $8,203.00. Limit $12,000. 0% term plan ($624 on the 28th from 8020) ended 2025-07-28; the $624 autopay may still be running. **Discover accounts moved to Capital One on 2026-10-19** (Discover emails 2026-09-02 and 09-26). When the QuickBooks bank feed drops, re-link it under Capital One, not Discover.
10. **Barclays — "Barclay" (AAdvantage) — ending 7669** — QuickBooks balance owed $6,227.80. Limit $9,000. **The sheet says it WAS REPLACED BY CITI on 2026-06-02.** The Citi AAdvantage Platinum Select ending 6889 (Section C, item 13) is almost certainly the same debt under its new issuer. **Action: rename the QuickBooks "Barclay" account to "Citi AAdvantage 6889", re-link the feed to Citi, and do not create a second account.** Confirm with one glance: the Citi statement balance should be near $6,227.80.
11. **American Express — ending 12001** (Amex uses 5 digits) — QuickBooks balance owed $1,744.85. Limit $10,000 (was $7,200 in 2022). Cardmember since 1992. The 7.99% term plan ($140/month) ended 2025-05-23. Sheet note: "CC can not be used" as of 2023 — probably stale; the account is still billing.
12. **Amazon — Chase Amazon Prime Visa — ending 7343** — QuickBooks balance owed $205.50. Limit $500. Issuer is **Chase** (settles v2's open question; it is NOT the Synchrony store card). Autopay on statement balance. Budget line $199.99 on the 16th. Personal-looking purchases get Owner Draw.

### Found in the business mailbox, NOT in QuickBooks yet

13. **Citi AAdvantage Platinum Select — ending 6889.** See item 10: this is the Barclays replacement, so it belongs in QuickBooks as the renamed Barclay account. Autopay on, statement closes about the 27th. Sheet shows $300.94 to "Citi CC" on the 23rd from 8020. Citi (public): 1-800-950-5114.
14. **Home Depot Consumer Credit Card (Citi) — ending 6354.** Limit $2,000. Minimum-payment alerts Oct–Nov 2026. Business if used for job materials. **Owner decision: business or personal.** Home Depot card (public): 1-800-677-0232.
15. **U.S. Bank Shield Visa — ending 9915.** New, welcome email 2026-10-14. Not on the 2025 sheet. **Owner decision: business or personal.** U.S. Bank (public): 1-800-285-8585.
16. **Macy's store card** — limit $500 (sheet). No number on the sheet. Personal unless told otherwise. Leave out.
17. **CreditFirst / Firestone (CFNA) — ending 554.** Limit $2,200. New to the inventory (not in v2). Vehicle work; business only if the vehicle is. **Owner decision.**
18. **Citi card "TBA" replacing Barclays** — the sheet's placeholder row from 2026-06-02; it is item 13 now that the number is known.

## Section D — Loans (QuickBooks type: Long Term Liability, or Other Current Liability for auto loans)

19. **SBA EIDL loan — loan number ending 8008.** Original $232,900 per earlier work; the sheet's "44000" next to the application number is an Excel date (2020-06-18), not an amount. Last payment visible on the business account 2022-12-29 (−$1,232). No payment observed 2025-01 → 2026-07. **Open question: is it current.** SBA servicing (public): 1-833-853-5638. **Add to QuickBooks: Long Term Liability / "SBA EIDL loan 8008".**
20. **DCFCU auto loan — ending 0040.** Returned autopay reset 2026-10-26 (Christofer Placencio, DCFCU). The sheet shows "Kia $606 on the 20th from 8020" — likely this loan. Probably PERSONAL; if the vehicle is used for inspections, a CPA may allow part of it. **Owner decision.**
21. **Nissan Finance — Altima — $379.74 (sheet also says $380) on the 18th from 8020.** Auto loan paid from the BUSINESS account. Same business-or-personal decision as item 20.
22. **Mortgages (FCI Lender Services, Selene Finance, Rushmore) and the Twin Lakes HOA** — the home at 13633 SW 142nd Terrace. PERSONAL. Keep out of QuickBooks unless a CPA sets a home-office percentage.

## Section E — Recurring debits from Chase 8020 (the sheet's "Chase Team Checking Auto Debits")

Monthly, about $4,999.93 total. Useful as QuickBooks recurring-transaction templates. Each line needs a business-or-personal mark; cloud's suggestion in brackets.

- 7th — $650 — Chase Ink card payment [business, card payment]
- 15th — $256 — AT&T cell [business, Telephone]
- 15th — $32 — Microsoft 365 [business, Software]
- 18th — $380 — Nissan Finance [owner decides]
- 20th — $606 — Kia / DCFCU auto loan [owner decides]
- 20th — $10 — Apple [owner decides]
- 20th — $35 — Intuit QuickBooks [business, Software]
- 20th — $1,500.99 — "BOA" transfer [Owner Draw]
- 23rd — $300.94 — Citi credit card [business, card payment, if item 13 is business]
- 24th — $413 — Progressive insurance [business if the vehicle is; Insurance]
- 28th — $92 — Aetna [owner decides; health insurance is usually an owner item]
- 28th — $624 — Discover payment [card payment]
- 30th — $100 — "Chaude" (Claude subscription) [business, Software]
- 16th — about $199.99 — Amazon [per purchase]
- 4th — about $199.99 — PayPal via the Ink card [per purchase]

## Section F — Payment channels (QuickBooks "Payment methods")

- **Zelle** (into Chase 5615 mostly) — the main way clients pay. Never says "invoice."
- **Paper check** — e.g. Tacolcy paid on Regions Bank checks; deposited to Chase.
- **ACH / wire** — e.g. Iberostar paid invoice 6096 by ACH with the invoice number in the memo.
- **Stripe / PayPal / Square** — mentioned in notes; no payout to a Jorge account proven. Leave out until seen.

## Section G — QuickBooks entry cards (type what is on each line, nothing else is needed)

QuickBooks "New account" asks for: Account type, Detail type, Name, and optionally Description and Opening balance. It does **not** need the full account number, the card expiration, the security code, or any password. Bank feeds connect by signing in at the bank's own page inside QuickBooks; 1Password fills that sign-in and nobody reads it.

1. Bank · Checking · "Chase Team USA Sales 8020" · description "Operating account, routing 267084131"
2. Bank · Checking · "Chase CU Inspections 5615" · description "Client Zelle deposits, routing 267084131"
3. Long Term Liabilities · Notes Payable · "SBA EIDL loan 8008" · opening balance = the current payoff from the SBA portal
4. Rename existing "Barclay" → Credit Card · "Citi AAdvantage 6889" (same balance, new issuer)
5. Existing "Discover" — re-link the feed under Capital One after 2026-10-19
6. Existing "Amazon" — description "Chase Amazon Prime Visa 7343"
7. Existing "Team INK Credit Card" — description "Chase Ink Business 2690"
8. Existing "American Express" — description "Amex ending 12001"
9. Equity · Owner's Equity · "Owner Contribution" (for the BofA 8939 transfers in) and "Owner Draw" (for 5709, BOA $1,500.99, mom's phone, Netflix)
10. Only after Jorge's yes: Credit Card · "Home Depot 6354" · "U.S. Bank Shield 9915" · "CFNA Firestone 554"; Other Current Liability · "DCFCU auto loan 0040" · "Nissan Finance Altima"

## Section H — Status

- Connector check 2026-11-14 (twice, 4:15 PM and 6:00 PM ET): QuickBooks Labs and QuickBooks (Intuit) connectors both answer "sign in again." Nothing read or written in QuickBooks. Cloud cannot start that sign-in; it is one click for Jorge in claude.ai connector settings.
- When the connector is back, cloud creates Section G items 1, 2, 3, 9 in one pass and renames item 4; items 5 to 8 are feed and description fixes; item 10 waits for the yes/no list.

## Section I — Where the secrets are, and why they are not here

Jorge's workbook `ACCOUNTS -BUDGETS - REVISED 2026-06-02 -JV-JORGE.xlsx` holds, in plain text: his date of birth, driver's licence number, Social Security number, passport number, every card above with full number, expiration and security code, the four bank accounts with full numbers, and about twenty usernames and passwords (banks, mortgages, utilities, insurance, Amazon). Copies exist in Outlook Sent Items (2026-11-07), the Gmail inbox (2026-11-07 and an earlier version 2026-01-21), and `C:\Users\JV\OneDrive\Documents\` (three copies found 2026-09-03).

That file is the one place to read a full number from when a form truly demands one. It is open on Jorge's own screen in one click. Copying its values into this repo, a chat, or a report would create one more unprotected copy, which is exactly what TRK-2026-9346 Section A forbids. This is the second time the file has been flagged (first 2026-09-03), so it is logged as RI-058 with three options; the recommended one is to move every row into 1Password and then delete the copies (RED, Jorge's click).

---

TRK-2026-10059 · v3 · 2026-11-14 · CURRENT
v3 change: read Jorge's own ACCOUNTS-BUDGETS workbook. Amazon = Chase Prime Visa 7343. Barclay was replaced by Citi 6889 (rename, do not duplicate). Discover moved to Capital One 2026-10-19. Ink card now ending 2690, limit $42,999. Debit cards named for all four checking accounts. EINs for both corporations. Recurring debit list from 8020. New items: CFNA Firestone 554, Nissan Finance, mortgages (personal). SBA "44000" is a date, not an amount. Section I added.
v2 change: 5615 = CU Inspections, 5709 = personal, Macy's card added, 2022 limits added (source: TeamUSASales_Budget 2022.xlsx).
#TeamUSASales #CU-Inspections #QuickBooks #ChartOfAccounts #JorgeValdes
