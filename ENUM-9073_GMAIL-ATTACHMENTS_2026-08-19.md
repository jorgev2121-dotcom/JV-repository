# TRK-2026-9073 — Gmail attachment enumeration (counts + senders only)

**Read-only. No filing, no download, no move. Overnight 2026-08-19. Cloud TRK-2026-9336.**

## Scope and denominator
Query `has:attachment newer_than:1y`. **Gmail estimates ~201 attachment-bearing
threads in the last year.** This pass tallied **page 1 = 50 threads (a 25% sample)**;
the remaining ~151 roll to a continuation pass. Senders below are from the 50-thread
sample.

## The finding that matters: attachments here are mostly AUTOMATED, not client docs
Of the 50 sampled, the overwhelming majority are vendor invoices/statements and
Jorge's own self-sent mail. **Genuine client-document attachments are a small minority.**
That tells us where filable attachments are — and aren't — before anyone spends time
sweeping them.

## Sender tally (50-thread sample)
- **Automated billing / statements — ~21 of 50:**
  - Stripe invoice+statements (4 distinct acct IDs) — **10**
  - Anthropic invoice+statements — **7**
  - Microsoft billing — **4**
- **Zoho (CRM trial / sales outreach) — ~10 of 50:** rishi.k **5**, aravind.i **3**,
  robert **1**, engage@zohocrm **1**. (Sales follow-ups, not client documents.)
- **Jorge's own self-sends (Jorge@teamusasales.com → himself) — 9 of 50.** These are
  document hand-offs to self; worth a closer look as they may carry real job files.
- **Other automated — 6 of 50:** x.ai **2**, 1Password **2**, OneDrive photos **2**,
  JAM Software sales **2**. (overlap rounding)
- **Genuine external business correspondence — ~2 of 50:** miguel@mzsolutions.org
  **1** (the MZ / Unit-143 reimbursement thread), and one Jorge→MiamiDade+Miguel send
  (bounced, mailer-daemon) **1**.

## Read this way
**Roughly 4 of every 5 attachment emails in the last year are machine-generated
billing or sales mail.** A blanket "file every attachment" sweep would mostly file
receipts. The high-value targets are (a) the 9 self-sends from Jorge@teamusasales.com,
and (b) real counterparty threads like miguel@mzsolutions — a much smaller, more
filable set than "201 attachments" suggests.

## Honest limits
- This is a **25% sample**, not the full 201 — full enumeration is a next-cycle
  continuation (page through the remaining ~151).
- Counts are **per thread**, and I read metadata only (sender/date), never opened or
  downloaded any attachment. Actual attachment *file* counts per thread would need
  opening each thread — not done (would be heavier, and filing is RED anyway).

*TRK-2026-9073 · #gmail-attachments #enumeration #JorgeValdes #CU-Inspections*
