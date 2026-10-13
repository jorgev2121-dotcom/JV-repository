# Mail WATCHLIST — read by the hourly watch (trig_01VTtAhauH65mx7o1CxPx2jj), step 0

Built 2026-10-13 after the Tomas Hernandez miss (RI-020 recurrence). The hourly watch searches **both** mailboxes
(Gmail jorgev2121@gmail.com and Outlook Jorge@TEAMUSASALES.COM) for mail received after the time in
`inbox-sweep/last-mail-check.txt`, and matches it against the senders and keywords below.

**Rule:** any match that HAS ATTACHMENTS, or whose words say a placeholder is filled ("signed", "sealed", "approved",
"attached", "permit number", "receipt", "paid"), is an ARRIVAL. Each arrival:
1. Gets one line in `inbox-sweep/ARRIVALS.md` (date, mailbox, sender, subject, attachment names, job, which placeholder it fills).
2. Is written as a NEW file `_ARRIVALS_<date>.md` in the job's Drive folder (new file only; nothing is moved or renamed).
3. Is told to Jorge once, by push and by Gmail to jorgev2121@gmail.com only: what arrived, and what is still missing.
4. Is added to the desktop order queue to save the actual attachment bytes into the job folder (the cloud can read attachment text but cannot download the files).

**Matching rule (2026-10-13):** first look the sender up in `inbox-sweep/PEOPLE-INDEX.md` to get their jobs. Then use the email words (address, folio, permit or case number) to pick ONE job. If two or more jobs still match, mark the arrival AMBIGUOUS and ask Jorge. Never file against a fuzzy match.

Add a line here whenever a placeholder names a new person we are waiting on. Remove it when the job closes.

## Waiting-on senders

- tomtechengineer@gmail.com · Tomas Hernandez, P.E. (TomTech) · TUS-26-1018 Einar (sealed as-built) and TUS-25-1023 14598 SW 110 St (corrected re-seal)
- jdrafters@gmail.com · Julio Silva, drafter · TUS-26-1018 Einar plans · TUS-26-1033 Medley plans and proposal
- mzsolutions.org · Miguel Zaldivar, MZ Solutions (contractor/qualifier) · TUS-26-1018 COI and signed application
- jlibio@ppines.com · Officer Joseph Libio, Pembroke Pines code enforcement · case 260301031
- ppines.com · City of Pembroke Pines (permits, receipts)
- cfelipe87@live.com, elmija74@gmail.com · Medley clients · TUS-26-1033 signed proposal, POA, payment
- fabregat28@gmail.com · Jorge Fabregat, architect · TUS-26-1033
- synergyn-us.com · Synergyn engineering · TUS-26-1033
- townofmedley.com · Town of Medley (Elio Alvarez) · TUS-26-1033
- miamidade.gov · Miami-Dade County · all county jobs

## Job keywords (subject or body)

- 8621 Pasadena · Einar · Suarez · 260301031 · TUS-26-1018
- 7265 NW 74 · Miami Art House · Medley · TUS-26-1033
- 14598 SW 110 · Miguelez · 2026-012823 · TUS-25-1023
- TRK-2026- · TUS-26- · TUS-25-
