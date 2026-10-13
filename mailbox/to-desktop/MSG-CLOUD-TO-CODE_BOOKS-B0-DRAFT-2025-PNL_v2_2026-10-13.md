# MSG-CLOUD-TO-CODE_BOOKS-B0-DRAFT-2025-PNL_v2_2026-10-13
OD-109-A · BOOKS · Phase B0 · v2 · 2026-10-13 · CURRENT (supersedes v1 of 2026-10-08)

**LANE: CLAUDE / RAMBO ONLY. Not a Codex job.**
Why v2 exists: v1 never ran. On 2026-10-09 01:26 ET the watcher sent it to the Codex lane; Codex refused it on the word "delete"
in the NEVER list and wrote "Left for Claude"; nothing returned it to the Claude lane (RI-015, 8th instance). The same fix worked for
the PaperPort sweep: its v2 ran on the Claude lane and finished 2026-10-10 (188 of 188). If the Claude lane is capped, WAIT; do not hand this to Codex. This job holds Jorge's bank data, which stays on the local Claude lane (Charter section 12).

To: RAMBO (Desktop Executor) · From: Cloud Keeper (CODE · CLOUD / WEB EXECUTOR)
Class: GREEN — read local files, write NEW files only. No login, no send, no move.
Authorization: Jorge Valdes, 2026-10-08 ("analyze ... put together a balance sheet and a profit and loss retroactively").
Needs/wants rule approved by Jorge 2026-10-08 ("Yes, use it"), spec OD-109-A section 2.
Owner rule 2026-10-08: "when in doubt, don't guess, ask me ... leave it as an uncategorized transaction." So any row you are not sure of is UNKNOWN, never a guess.
Spec: repo file OWNER-DIRECTIVE_BILLING-SENTINEL_OD-109_ADDENDUM-A_BOOKS_2026-10-08.md (branch claude/modest-brown-rqbnkp)

GOAL: a DRAFT 2025 P&L and cash summary built from the bank and card exports already on this PC.

Step 1. Inventory (read only). In C:\Users\JV\Downloads list every bank/card export:
 Chase*.CSV (8 files), stmt.csv (BofA), Discover-AllAvailable-20260726.csv,
 "Last year (2025).CSV", "Year to date.CSV", activity.csv, and any other *.csv/*.qfx/*.ofx
 that looks like a bank or card file. Also check OneDrive for any 2023-2024 statements.
 For each: file name, institution, account last-4, first and last date, row count, bytes.

Step 2. Copy (never move) those files into a NEW folder:
 G:\My Drive\FINANCE\BOOKS-DRAFT-2025\_SOURCE\
 If the folder exists, stop and report BLOCKED. Hash each copy and compare to the original.

Step 3. Build a rule table (RULES.tsv): payee pattern -> category -> company -> type -> need/want/business.
 Types: INCOME, EXPENSE, OWNER-DRAW, OWNER-CAPITAL, TRANSFER (between own accounts),
 LOAN-PAYMENT, CARD-PAYMENT, REIMBURSABLE (fees paid for clients), PERSONAL, UNKNOWN.
 Transfers between Jorge's own accounts must net to zero, never count as income or expense.
 BofA (personal) rows are PERSONAL unless they are owner draw/capital to or from the companies.
 Cards first (owner priority 2026-10-08).

Step 4. Apply it. Write LEDGER-2025.tsv: one row per transaction with date, account
 (nickname + last 4 only), amount, raw description, category, company, type, need/want/business/UNSURE, rule-matched (Y/N).

Step 5. Write the draft reports (new files, in G:\My Drive\FINANCE\BOOKS-DRAFT-2025\):
 a. PNL-2025-DRAFT.md — per company (CU Inspections / Team USA Sales) and combined.
 b. CASH-2025-DRAFT.md — opening and closing balance per account, checked against each file's own stated balances.
 c. BALANCE-SHEET-2025-12-31-DRAFT.md — cash per account; card balances; SBA loan and other liabilities marked UNVERIFIED.
 d. REIMBURSABLE-2025.md — every county/permit/microfilm payment, for OD-109 billing match.
 e. UNCATEGORIZED_2026-10-13.md — every row the rules could not place, largest first, one line each:
    date · account nickname + last 4 · amount · raw description · your best two guesses (labelled GUESS, not applied).
    The cloud reads this file every 3 days and asks Jorge a few at a time with buttons.
 Stamp every report: "DRAFT — monitoring only, not tax-grade" and the footer
 RPT-BOOKS-0001 · OD-109-A · BOOKS-B0 · v2 · [date] · DRAFT

Step 6. Proof. For each account, sum of LEDGER rows must equal the file's own totals (to the cent). Paste each check, pass or fail, into the receipt.

Step 7. Receipt to VTES-Outbox: EXECUTED_BOOKS-B0_<date>.md (or BLOCKER_BOOKS-B0_<date>.md).
 Include: inventory table, the combined 2025 net figure, % of rows categorized, the 10 largest UNKNOWN rows, and the totals checks.

NEVER: log in to QuickBooks or any bank; send anything; move, rename or delete any original file; print full card or account numbers.

END — What share of 2025 rows did the rules categorize, as a percentage?

OD-109-A · MSG-B0 · v2 · 2026-10-13 · CURRENT
MSG-CLOUD-TO-CODE_BOOKS-B0-DRAFT-2025-PNL_v2_2026-10-13.md
