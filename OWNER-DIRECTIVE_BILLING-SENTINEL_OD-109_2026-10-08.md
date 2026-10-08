OWNER-DIRECTIVE_BILLING-SENTINEL_OD-109_2026-10-08
TRK: PROVISIONAL — RAMBO must assign from registry before any job folder is created.
Issued: 2026-10-08 by Jorge Valdes (dictated).
Status: ACTIVE — binding on Desktop (RAMBO), Cloud, and Cowork.

---

# OD-109 — BILLING SENTINEL: Bank + Municipality Monitoring + Auto-Invoice

## The problem this solves (one sentence)

Fees paid on behalf of clients — permit fees, re-inspection fees, microfilm, plan review,
CU fees, process fees, code enforcement — are currently paid and silently forgotten;
clients are never billed and the money is gone.

## The directive

Build a system called BILLING SENTINEL that:

1. Downloads bank and credit card transactions daily.
2. Monitors all active municipality/permitting portals daily for fee assessments and
   status changes on Jorge's active jobs.
3. Matches bank payments to portal fee records and to TRK job numbers.
4. Auto-generates draft invoices for every matched reimbursable payment.
5. Queues them for one-click approval by Jorge — he reviews and clicks Send, nothing else.
6. Displays the live billing queue on the VTES control panel (new BILLING tab).

Nothing is sent, filed, or deleted without Jorge's one-click approval.
No passwords are changed. No bank PINs are changed.

---

## Architecture — three interlocking loops

### Loop A: Bank Feed (daily, unattended after one-time setup)

Sources:
- All checking, savings, and business accounts
- All credit cards used for job-related expenses
- Method: Plaid API (primary) — uses the bank's own OAuth login, no password stored
- Fallback: OFX direct download via RAMBO + 1Password for institutions not on Plaid

What it does:
- Downloads all new transactions since the last run
- Flags any transaction matching known municipal/vendor payees:
  Miami-Dade County, RERPD, Miami Building, Clerk of Courts, City of Miami,
  Miami Beach, Broward County, microfilm vendors, plan review services,
  Florida Dept of Business and Professional Regulation (DBPR)
- Tags each with: account, date, amount, payee name, raw description
- Writes to BILLING-LEDGER.csv (one row per transaction, one file per month)

### Loop B: Municipality Monitor (daily, per active TRK)

Sources: the existing 22-source catalog from TRK-2026-9078, already proven 20/22.
RAMBO runs this — cloud is egress-blocked from county sites.

Per active TRK job, check:

| Portal | What to watch for |
|---|---|
| Miami-Dade Building Permit Search (Site 06) | New permit issued, new inspection scheduled, fee assessed, inspection result |
| EPS e-permitting (Site 07) | Application status change, plan review comments, new fee |
| CU Certificates of Use (Site 12) | Certificate issued or expired |
| Code Enforcement (Sites 08, 09, 10) | New citation, new hearing, fine assessed |
| Unsafe Structures (Site 11) | New case opened, status change |
| DERM Environmental (Sites 13, 14) | New violation, fee assessed |
| Tax Collector (Site 03) | Tax bill posted, delinquency flag |
| City of Miami iBuild (Site 17) | Permit status, fee |
| Miami Beach permits (Site 18) | Permit status, fee |
| Broward / Pembroke Pines (Site 22) | Permit status, fee |

Method:
- Each site check compares current result against last-known state (stored in BILLING-MONITOR-STATE.json)
- If different: log the change as a BILLING EVENT with: TRK, site, date, description, dollar amount if shown
- If no change: log "checked, no change" with timestamp

### Loop C: Billing Intelligence (runs after Loops A and B)

Matching rules:
1. If Loop B found a fee assessment AND Loop A found a matching payment → MATCHED. Generate invoice.
2. If Loop A found a payment to a known municipal payee but no Loop B match → UNMATCHED. Flag for Jorge: "I found a payment but no portal record — which job?"
3. If Loop B found a fee assessment but no Loop A payment → PENDING. Flag: "This fee was assessed; watch for the payment."
4. If a TRK job has a MATCHED event older than 30 days with no invoice sent → ESCALATE: "This was matched 30 days ago and has not been invoiced."

Invoice format (auto-generated, never sent without Jorge's click):
- From: CU Inspections of South Florida / Team USA Sales, Inc.
- To: [client name from TRK job file]
- Line item: "Reimbursement — [fee type] paid on behalf of [property address]"
- Amount: [exact amount from bank record]
- Date paid: [transaction date]
- Attachment 1: bank statement export showing the transaction
- Attachment 2: county portal screenshot or record showing the fee was assessed
- Footer stamp: TRK-2026-#### · BILLING-SENTINEL · [date] · DRAFT

---

## The example: job #10980

Jorge paid ~$300+ for a permit fee on job #10980.

BILLING SENTINEL would:
1. Find the transaction in the bank statement (Loop A).
2. Find the corresponding fee record on the county portal for the permit tied to #10980 (Loop B).
3. Match them (Loop C).
4. Generate a draft invoice: "Reimbursement — Permit Fee $312.50 paid 2026-10-05 for [address]."
5. Attach the bank statement line and the portal screenshot.
6. Queue it. Jorge clicks Approve. Done.

---

## VTES Control Panel — new BILLING tab

To be built as a new tab in panel v5 (post-install, round 11 or standalone update).

Section 1 — THE NUMBER (large, red if nonzero):
  "$ X.XX in unbilled reimbursements detected"

Section 2 — Pending Invoice Queue
  One row per draft invoice. Columns: TRK, property, fee type, amount, date paid, [APPROVE] button.
  Clicking APPROVE writes the invoice to VTES-Outbox for RAMBO to send.

Section 3 — Municipality Activity (last 48 hours)
  One row per detected portal change. Columns: TRK, portal, event description, $ if known.

Section 4 — Account Health
  One row per connected bank account. Columns: institution, account type, last sync, balance.
  Red if last sync > 25 hours.

Section 5 — Unmatched Payments
  Payments flagged by Loop A with no Loop B match. Jorge picks the TRK in one click.

---

## Retroactive sweep (one-time, run overnight)

After setup, run a single retroactive sweep:
- Bank transactions: up to 24 months back (Plaid limit; OFX gives 12-18 months)
- Municipality portals: pull full permit/case history for all active TRKs
- Match everything, generate draft invoices for all historical unbilled events
- Jorge reviews the full list: one click per invoice to approve, or skip

Expected yield from 12 months retroactive: unknown until the sweep runs.
Best-case estimate: dozens of missed reimbursements ranging $50 to $1,500 each.

---

## Owner involvement — what Jorge does

| Step | Jorge's action | Time |
|---|---|---|
| Initial bank account link (Plaid) | Click through the bank's own login popup, once per institution | ~2 min per bank |
| 1Password credential check for non-Plaid banks | Confirm RAMBO can read each credential | 1 click per bank |
| Review retroactive draft invoices | Click APPROVE or SKIP on each | ~30 sec per invoice |
| Ongoing: review daily invoice queue | Click APPROVE to send | 1 click per invoice |
| Respond to UNMATCHED PAYMENT alerts | Pick the TRK from a dropdown | 1 click |

Jorge is never asked to type a password, change a PIN, or make a technical decision.

---

## Build order

Phase 1 — Account inventory (1Password read + Plaid connection list): 2 hours RAMBO
Phase 2 — Bank feed loop (Loop A): 3-4 hours RAMBO
Phase 3 — Municipality monitor loop (Loop B): 4-6 hours RAMBO (builds on TRK-2026-9078)
Phase 4 — Billing intelligence + invoice gen (Loop C): 8-12 hours RAMBO
Phase 5 — VTES panel BILLING tab: 3-4 hours
Phase 6 — Retroactive sweep: runs overnight, 2-4 hours RAMBO

Total RAMBO build time: approximately 3 nights.
Total Jorge time: approximately 20-30 minutes across the full setup.

---

## Constraints (non-negotiable)

- No passwords changed. No PINs changed. Credentials are READ from 1Password, never altered.
- No bank transaction or invoice is sent without Jorge's explicit one-click approval.
- No client document is filed, moved, or deleted unattended.
- No municipality portal login is attempted (all sources used are public/anonymous per existing methodology).
- Loop B uses RAMBO only (cloud is egress-blocked from county sites).
- Filing is RED. Invoice drafts are written to VTES-Outbox; Jorge sends from the panel.

---

## Registry note

TRK for this project: PROVISIONAL. RAMBO must read the next available number from
C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md before creating
any job folder or assigning a permanent number. Do not use any number from the
9xxx admin band. Do not invent a number.

OD-109 · BILLING-SENTINEL · v1 · 2026-10-08 · CURRENT
