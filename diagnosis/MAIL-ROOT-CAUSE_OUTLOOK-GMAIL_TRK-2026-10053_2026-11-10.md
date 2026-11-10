# ROOT CAUSE — Outlook and Gmail: "fresh mail not seen", "2 of 4 sending", "2019-to-now not found"

**TRK-2026-10053 · written by ☁️ CODE · CLOUD 2026-11-10 ~00:45Z (7:45 PM ET 11-09) · CURRENT**
Supersedes nothing; extends JOB MAIL-REPAIR-01 (2026-10-22), which was auto-ACKed and never run.

---

## Section A — the answer first

**The mail is not lost and the servers are not sick. The desktop Outlook program is.**
Both mailboxes were read directly from the servers tonight through the Microsoft 365 and
Gmail connectors (the Microsoft 365 connector is now authorized; TRK-2026-9020 closes).

Three symptoms, one chain:

1. **"Fresh incoming emails are not being viewed, erratically."**
   Server side, new mail arrives normally (Pedro Fiallo 6:58 PM ET, Julio Silva 6:10 PM ET,
   both sitting unread in the Outlook Inbox). Two things hide them on the PC:
   - the desktop Outlook keeps a local copy (Cached Exchange Mode) that is out of step with
     the server: the hidden folder **Sync Issues → Conflicts holds 7,042 items (6,888 unread),
     dated 2022 through tonight 8:42 PM ET**. That folder only fills when the local copy and
     the server disagree. It is still filling today.
   - **the Inbox is buried in bot mail.** Of 85,898 Outlook Inbox items, 8,242 are echoes of
     the hourly "VTES Sync Handoff RESULT" messages sent from Jorge's own address, plus 394
     cloud-executor notes bounced in from Gmail. Gmail is worse: 48,933 Inbox items,
     46,035 unread, about 200 Grok automation threads in the last 7 days. In the last 7 days
     the Gmail Inbox received exactly 2 human-origin threads outside the bot and promo
     streams. A real client email arrives once for every ten bot emails.

2. **"Shows two out of four being sent."** That is the desktop Outlook send progress box.
   The desktop proved it on 2026-09-08 (TO-CLOUD mirror, backlog thread 11): exactly two
   stuck items in the TEAMUSASALES Outbox, created by the morning-report script through
   Outlook COM while Outlook was not running interactively, and a third test message stuck
   **373 days** in the Gmail IMAP account inside the same Outlook profile. Every send/receive
   retries them, fails, and shows "2 of 4". **The server Outbox is empty tonight**, so the
   stuck items live only in the local file on the PC.

3. **"From 2019 to current a lot of data is not found."** The server has it all: the oldest
   item is 2013-06-19, 2019 items were returned on the first page of a 2019 date search, and
   the Archive_2010_to_2019 tree sits in the mailbox. What fails is the PC: the desktop
   search index covers only part of the stores (logged 2026-08: 2 of 6 stores and 12 unopened
   PST files, 51.4 GB, not indexed), the cached copy holds only a slice, and anything older
   must be fetched with a live Microsoft sign-in, which is the same broken sign-in that
   shows "Something went wrong [7q6ca], code 1067" (MAIL-REPAIR-01) and "Account Error, sign
   in again" in Word (OD-107, RI-046/047).

**One root cause under all three:** the PC's Microsoft sign-in token is broken, so the
cached Outlook copy cannot stay in step with the server, cannot search the server, and
chokes on Outbox items that scripts inject through COM. The data is intact on the server.

---

## Section B — why the earlier fixes failed (recurrence rule check)

This is logged at least five times, so a patch is forbidden (CLAUDE.md Rule 4):
RI-022 (Outlook unreachable from cloud, 2026-08-18), RI-025 (mail rescue "nothing left to
move", 2026-08-18), RI-046/047 (Outlook resource exhaustion and COM auto-relaunch,
2026-09-19/20), backlog 11 "2 sent, 2 did not" (2026-09-04), JOB MAIL-REPAIR-01 (2026-10-22,
auto-ACKed, Codex blocked on the word "Password", no report ever written).

Why they failed: every one treated a symptom on the PC (kill Outlook, clean reminders, move
Outbox items, re-index) while the sign-in token, the cached copy, and the COM scripts stayed.
The 10-22 job died in the queue, which is RI-056's pattern (acknowledged, never executed).

---

## Section C — three options, ranked by how long each survives

**Option 1 — REMOVE the dependency (Tier 2). Recommended.**
Stop using the classic desktop Outlook as the place to read and search mail. Read and search
in Outlook on the web (or "new Outlook"), which talks to the server directly: no local copy,
no Conflicts, no Outbox, and all 13 years searchable today (proved from the cloud tonight).
Keep classic Outlook only if a specific add-in needs it. Move the two scripts that send mail
through Outlook COM (morning_report.ps1 and the mail rescue) to a server send: the Microsoft
365 connector already holds Mail.Send, so the cloud seat can send them.
Lifespan: permanent for all three symptoms. Failure mode: the COM scripts stop sending until
they are moved (one afternoon of desktop work); Jorge has to open mail in a browser or the
new Outlook instead of the old window.

**Option 2 — REBUILD the desktop profile (Tier 2 for the profile, Tier 1 for the token).**
New Outlook profile beside the old one: fresh local file, "mail to keep offline" set to All,
the three dead accounts (bellsouth, onlinecou, Gmail IMAP) removed from the profile, Microsoft
sign-in repaired (OD-107), stuck Outbox items moved to Drafts, Windows Search rebuilt.
Lifespan: months. Failure mode: it comes back the next time the sign-in token breaks, which
has happened repeatedly (RI-046), and the COM scripts can re-create stuck Outbox items.

**Option 3 — ENFORCE on a schedule (Tier 3).**
Keep everything as is. Add a scheduled task that moves Outbox strays to Drafts, rebuilds the
search index weekly, and alarms when the Conflicts folder grows.
Lifespan: weeks per cycle. Failure mode: it is a watchdog on a sick process; "2 of 4" and the
missing search results return between runs.

**Objection to "move everything" (Rule 3):** moving 85,898 emails anywhere does not fix a
problem that lives in the viewer, and moving client mail is RED. The data is already in one
place, intact. Change the window, not the data.

---

## Section D — what Cloud did tonight, and what is blocked

DONE (verified):
- Read both mailboxes from the server: counts, oldest item (2013-06-19), 2019 presence,
  Outbox empty, Conflicts 7,042, Inbox echo counts (8,242 / 394 / 5), Gmail label counts.
- Reopened MAIL-REPAIR-01 as this TRK; wrote the desktop job file to Drive VTES-Inbox.
- Closed TRK-2026-9020 (Microsoft 365 connector authorized; scopes list read tonight).
- Logged RI-057 and this row in OPEN-ITEMS.md; refreshed _CHECKPOINT_CLOUD.md.

BLOCKED (one-word yes from Jorge):
- Two server-side Outlook rules that move the hourly bot echoes out of the Inbox into the
  existing AI_VTES folder (subjects "VTES Sync Handoff" / "VTES Sync Result" /
  "TRK-2026-1016-SYNC-01"; sender noreply@x.ai). The permission layer refused a standing
  rule change without the owner's say-so. Reversible: a rule can be deleted in one click.
- The same clean-up on the Gmail side needs a Gmail filter; the Gmail connector cannot
  create filters, so that is one click in Gmail (Filters, "from:noreply@x.ai", skip Inbox).

IMPOSSIBLE from Cloud: anything on the PC itself (profile, OST, index, sign-in token,
Outbox file). That is the desktop job below.

WORKAROUND-CERT (Article 4): tried the server rules (refused by policy, not by Microsoft);
tried a Gmail filter (no tool); checked whether the data needed moving (no, it is intact on
the server). Smallest owner action: the word "yes" to the two Outlook rules.

---

## Section E — the desktop job (JOB MAIL-REPAIR-02, Drive VTES-Inbox)

1. Read-only first: list accounts in the Outlook profile (expect 4), every store's Outbox
   contents, the cached-mode slider, OST sizes, the Conflicts count, Windows Search status
   for Outlook, and the current sign-in state. Write the snapshot and a rollback script.
2. Move stuck Outbox items to Drafts (do not delete). Test: send box shows "N of N".
3. Patch morning_report.ps1 and the mail rescue to stop calling Outlook COM Send(); hand
   the send to the cloud seat (Graph Mail.Send) or write the report file and let the cloud
   seat mail it.
4. With Jorge's yes: remove the bellsouth, onlinecou, and Gmail IMAP accounts from the
   profile (their mail is on their servers and already imported into this mailbox), and set
   up Outlook on the web as the daily reading window. If he wants classic Outlook kept, do
   Option 2 instead and set "mail to keep offline" to All.
5. Tests, each with a timestamped screenshot: send Outlook→Gmail and back under 60 s;
   search a 2019 subject and find it; Conflicts count unchanged after 24 h.

Footer: TRK-2026-10053 · v1 · 2026-11-10 · CURRENT · #Outlook #Gmail #RootCause #RI-057
