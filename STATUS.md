# STATUS — where everything stands

**Last updated: 2026-08-20 (evening ET), by the cloud executor.** Refreshed because the desktop flagged
this file as 5 days stale and cannot push its own fix.

**Read this first.** This is the one-screen version. The live detail lives in three places:
- **`OWNER-QUEUE.md`** — the canonical register of every decision waiting on Jorge (authored by the
  desktop in the Drive mailbox; the repo copy is a pointer). Sections: open questions / answered-not-yet-
  executed / blocked / closed.
- **`OPEN-ITEMS.md`** — the full running ledger of findings and work, newest at the relevant spot.
- **`MORNING-REPORT_2026-08-19.md`** — the plain-language summary Jorge reads first.

---

## The one live action waiting on Jorge

**Pay the $44 City of Miami microfilm, then confirm it.** There's a one-click button on his real desktop
(`PAY THE 44 DOLLARS - City of Miami.hta`): press 1 to pay (Transaction ID 1330901), press 2 to send the
"I paid" reply to the City. **No deadline** — real target is 2026-09-05. Do NOT send any duplicate
microfilm email (second $44).

Everything else on the board is "no rush" or already handled.

---

## What's genuinely settled

- **The two executors work as a pair.** Desktop's git push is broken (TRK-2026-9082), so cloud carries the
  repo: it mirrors the desktop's mailbox reports into `OPEN-ITEMS.md` + the morning report every hour, and
  answers what the desktop can't reach (e.g. Google Calendar). The OWNER-QUEUE co-edit collision is fixed
  (cloud owns the repo copy as a pointer).
- **The money review is essentially done *for the QuickBooks series* — but that is not the whole invoice
  universe.** 128 invoices priced (~$135,000 billed over the years); an exhaustive page-by-page OCR re-audit
  confirmed the QuickBooks `\d{4}` list holds at **129 numbers** with nothing hidden. Honest split: ~51
  paid, a few overdue, ~66 "no receipt on this machine either way" (NOT unpaid). **⚠ 2026-08-21 correction
  (9463/9464): Jorge also bills on a SECOND series, `INV-YYYY-NNNNN`, outside QuickBooks — 3 invoices found,
  all delivered, $5,822.14, all to Miguel Zaldivar (MZ Solutions / TEDC), his current largest client. Wrong
  shape for every `\d{4}` sweep, so it was invisible. Billed total is really ≥ ~$140,905, and the `INV-`
  series has never been fully swept.** The one live-looking collectible on the whole board: **$1,800 Edison
  Tower acceptance payment**, out 34 days, no payment visible (not proven unpaid — bank window unread).
- **The real answer to "who owes me" is the QuickBooks login (OD-22)** — but note it's a *partial* book:
  in 2019 QuickBooks held only 2 customers while the bank shows ~8× that flowing through, so much billing
  happened outside it.

## The biggest root cause found (2026-08-20)

- **The invisible desktop folder.** Most tools/approvals the machine built for Jorge were written to
  `C:\Users\JV\Desktop` — which is NOT his real desktop (`OneDrive\Desktop`) and never shows on screen. 19
  of 21 of today's artifacts landed there unseen. This likely explains years of "we agreed and it never got
  done." Fix = OD-30 (re-point the ~10 daily writers). **The repo/morning-report channel already bypasses
  it — that's why the owner-facing view rides cloud's side.**

## Money leads surfaced for Jorge (received ≠ owed; none claimed as receivable)

- Zelle/bank sweeps found **~$43k+ of client payments already received** never tied to invoices, incl.
  **Karibe Dance Studio (~$10,697)** with no file. A ~$3,500 net on the refunded Adolfo Moreno job, still
  uninvoiced. And **~$7,593 of county permit fees fronted on a credit card in 2025** (with ~$3,634 of
  interest carrying it) against only 3 invoices on record for that year — the QuickBooks session should
  check whether those fees were re-billed.

---

## The pattern worth remembering

Name the observable before claiming the result. A log read is not an output; a process alive is not a
connection; "N of N files" is not "all the pages"; a zero from a column is a claim about the column; a
banner is not a source. Both windows have caught themselves and each other on exactly these this month.

**Why two agents beat one: not two opinions, but two vantage points where one can falsify the other.** A
single agent agrees with itself.
