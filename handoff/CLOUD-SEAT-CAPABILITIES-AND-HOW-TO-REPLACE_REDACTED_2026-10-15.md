# What the Claude cloud seat does, and how Gemini or ChatGPT can do the same when it goes dark
Redacted copy for other AI assistants: no client names, no account addresses, no folder IDs, no phone numbers, no money, no passwords or keys. Written 2026-10-15 by the cloud seat (EXEC-01). Jorge decides who gets this.

## Section A. Why this matters now
1. Claude usage is running out. Several scheduled Claude jobs already stopped with "usage limit reached", including the morning inbox triage.
2. When the cloud seat goes dark nothing important is lost, because the state lives in the Drive folders and the GitHub repository. Whoever takes over reads those, says "I'm on", and continues.

## Section B. The cloud seat's duties and how to do each without Claude
1. **Hourly mail watch.** Search both mailboxes (Gmail and Outlook) for mail newer than the time in `inbox-sweep/last-mail-check.txt`. Watched senders and keywords are in `inbox-sweep/WATCHLIST.md`. For anything with an attachment or a "here is the document" line: add a line to `inbox-sweep/ARRIVALS.md`, tell Jorge once in plain words, then write the new time into last-mail-check.txt. Never file, send to third parties or pay.
   - Gemini: use scheduled actions (7:30 AM and 3:30 PM on weekdays are already assigned) plus Gmail search. Outlook needs the Microsoft connector; if it is missing, say so in the reply.
2. **Panel inbox.** Read new owner comments and approved items from the panel database, answer each within 2 hours, and mark an item done only with proof. If the panel cannot be reached, use the Tasks tab of the shared Sheet.
3. **Self-test every 6 hours.** Run the checks in `selftest/CHECKS.md` and log "N of 10 passing" in `selftest/SELFTEST-LOG.md`.
4. **PC relay.** Work for the PC goes to `mailbox/to-desktop/WORK-QUEUE.md`. Orders that carry no client details may go to Codex. Orders with client details never go to Codex (it refuses them). Receipts come back as files starting EXECUTED_ or BLOCKER_ in the Outbox folder. An ACK is only a receipt.
5. **Reports Jorge reads.** Drafts only. Plaza biweekly report and the Medley owner report on the 5th, 15th and 25th are drafted, never sent. Every report starts with the contact sheet (page 1) and the scope of work (page 2).
6. **Bal Harbour renewals.** Follow the skill file `.claude/skills/bal-harbour-renewals/SKILL.md`. Renewals need only the general contractor's signature. Unit and permit number must match across the email and its attachment.
7. **Audit.** The auditor must be a different assistant from the one that did the work. Check that each "done" has a proof file, a timestamp that fits, and a rollback.
8. **Model discipline.** Do not run the two most expensive Claude models (Fable 5.1 and Opus 5.5). See `control-panel/MODEL-BLOCK-POLICY_2026-10-15.md`.

## Section C. What only Claude could do, and the workaround
1. Build and republish the claude.ai control panel pages. Workaround: a Google Sheet panel any assistant can write to.
2. Read the Claude app's shared panel database. Workaround: the Sheet's Tasks, Shift Log and Replies tabs.
3. Edit Claude scheduled tasks. Workaround: Gemini scheduled actions or Apps Script triggers.

## Section D. Traps learned the hard way
1. Use the file's own created time, never an estimate.
2. Search results show about 5 rows per page. Use the page token.
3. A running process is not progress. Check that the output file grew.
4. A receipt naming no unit or permit is not proof of payment.
5. Money amounts stay out of packet documents. Money is locked behind the code 0000 on viewing pages.
6. Never infer which job a document belongs to from a fuzzy match. Exact keys only: tracking number, permit number, folio.
7. The same word can mean two things: "extension" and "renewal" are different applications at Bal Harbour. Renewal is correct for expired permits.

## Section E. How to say "I'm on"
Reply once with: what you understood, which roles you accept, your gaps, and the one setup click Jorge must do. Then write "on shift" in the Shift Log. Do not start RED work without Jorge's yes.
- Device on record: Brother MFC-L3770CDW (color laser multifunction with document feeder), per Jorge 2026-10-15; used by PaperPort. Feeder duplex ability not verified by cloud.
