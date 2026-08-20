# Mirror — a fourth payment channel (checks), and the "26-month hole" was an empty column

**Cloud TRK-2026-9336 mirroring desktop CHECKS-9434 (07:55) + GAP-9435 (07:56, which corrects 9434 15 min
later), 2026-08-20.** Source in `_CLAUDE-MAILBOX`: `CHECKS-9434_…` (1KZEPZ6czLlbSTgqV_xEcBhsn_tti-1Pf),
`GAP-9435_…` (1MAZspEbRl5HOGttcZkW5R8Q7-IxFfnzg) + ledgers. Read-only both sides. **Nothing moved,
numbered, filed, or booked.** Net: the money picture is *calmer* than 9434 first made it look.

## The fourth channel: paper checks + direct deposits (CHECKS-9434)
Beyond QuickBooks, Zelle, and email, a fourth channel was never swept: **6 mobile check deposits
($8,050) + 2 direct deposits ($1,500) = $9,550 into Chase …8020 (Team USA), none on any invoice/spine/
ledger.** Honest limits stated up front: **the payer is not named** (a QuickDeposit alert is anonymous —
could be Jorge funding his own company, per the $29,712 owner-capital finding), the alerts are
**threshold-gated (>$500 only, a floor)**, and 2020 is unobserved. Two incidental finds: a **second Chase
deposit account …5709** nobody had read, and **Jorge wrote a $12,000 check (#1048, 2022-07-20, outbound)**
+ 7 wires.

## The correction that matters (GAP-9435): the gap is an empty COLUMN, not missing work
CHECKS-9434 said the spine had "26 months with no invoices" (2020–2022). **That was wrong, and the desktop
caught it on itself 15 minutes later.** The invoices exist on disk with dates, clients and amounts — they
were just blank in the money sheet's `date` column because nobody had opened the files:
- **13 consecutive invoices 5984–5999 are real, $25,120 total, dated 2022-01-27 → 2022-04-15** — inside
  the window called empty. Includes **invoice 5985 = a $15,000 job** (Rene & Belkis Lezcano, 5035 SW 112
  Pl, phased $5k/$5k/$5k plan-processing).
- **The mechanism is the key insight: Jorge invoices on completion/draw, not on work.** 2021 work shows up
  as a 2022 invoice date (e.g. invoice 6002 bills 5 months of 2021 Habitat county submittals). **So "he
  wasn't billing in 2021" read off invoice dates alone is wrong by ~two quarters.** The real undated gap
  shrinks to ~21 months, and half of it is now documented from disk.
- Method lesson (logged): *a zero read from a column is a claim about the column* — 9434's control tested
  that `date` had *some* values (48 in 2019), not that it had values *where it was about to claim a zero*.

## The $15,000 Lezcano job — one to verify, NOT to claim
Invoice 5985, $15,000, phased. A 2022-04-29 QuickBooks reminder in the same folder shows the balance down
to **$10,000 — so the first $5,000 draw was collected.** The desktop explicitly **refuses to call the
other $10,000 owed** (a reminder is not a statement; it's 2022 data; and this operation was already burned
reading "reminder sent" as "unpaid" — 6093 turned out paid). **Recorded for the QuickBooks (OD-22) session
to confirm, not surfaced to Jorge as a receivable.** Trap caught: the agreement's filename says "2021" but
every signature is dated 2022 — the filename is wrong by a year (RI-013 shape again).

## Where this leaves the next steps (desktop-side, no owner action tonight)
- **Chase-login idea DOWNGRADED by the desktop itself** — it was proposed because 2020–2021 looked
  undocumented; half of it is now documented from disk for free. Re-decide after the blanks are filled.
- **Cheapest money work = fill the 11 remaining blank money-sheet rows** by opening files already on disk
  (5903, 5908, 5931, 5986, 5992-5995 area, 6003, 6013, 6015, 6038, 6076, 6083) — no login, no owner action.
- Two files need OCR: 5986 (image-only) and 5992 (mojibake shape).
- **Nothing called paid; folder `(PAID)` tags are not evidence; the $9,550 checks still have no named
  payer.** Nothing needs Jorge tonight.

*TRK-2026-9434 · TRK-2026-9435 · #fourth-channel-checks #9550-anonymous #the-hole-was-an-empty-column
#25120-inside-the-gap #5985-is-15000-lezcano #invoiced-on-completion-not-on-work #chase-idea-downgraded
#verify-not-claim #JorgeValdes #CU-Inspections*
