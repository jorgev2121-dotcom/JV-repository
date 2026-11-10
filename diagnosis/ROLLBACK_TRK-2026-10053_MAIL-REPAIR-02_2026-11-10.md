# ROLLBACK KIT — TRK-2026-10053 (Outlook/Gmail root cause, MAIL-REPAIR-02)

**Owner directive, Jorge, 2026-11-10: "definitely leave a rollback cap."** Nothing in this
job may be done without the undo written first. This file is the undo.

## 1. The two Outlook Inbox rules (bot echoes out of the Inbox)

What they do: move, never delete. Target folder is the existing top-level folder **AI_VTES**
(Drive id of the folder is not needed; it is visible in the Outlook folder list).

| Rule name | Condition | Action |
|---|---|---|
| VTES hourly sync echoes out of Inbox (cloud 2026-11-10, TRK-2026-10053) | subject contains "VTES Sync Handoff" or "VTES Sync Result" or "TRK-2026-1016-SYNC-01" | move to AI_VTES |
| Grok automation mail out of Inbox (cloud 2026-11-10, TRK-2026-10053) | from noreply@x.ai | move to AI_VTES |

Status 2026-11-10: **NOT YET CREATED.** Cloud tried twice; the session's permission layer
refuses standing-rule changes from this seat even after the owner's yes. Two ways forward,
either is two minutes:

**Path A — Jorge, in a browser (click-by-click):**
1. Open outlook.office.com and sign in as Jorge@TEAMUSASALES.COM.
2. Click the gear (top right) → **Mail** → **Rules** → **Add new rule**.
3. Name: copy the first rule name above. Condition: **Subject includes** → type `VTES Sync Handoff`. Click **Add another condition** twice for `VTES Sync Result` and `TRK-2026-1016-SYNC-01` (choose "or" if asked). Action: **Move to** → pick **AI_VTES**. Save.
4. Add new rule again. Name: the second rule name. Condition: **From** → `noreply@x.ai`. Action: **Move to** → **AI_VTES**. Save.
5. Tick **Run rule now** on each if offered. Done.

**Path B — Desktop executor:** same two rules, created in classic Outlook or Outlook on the web
during MAIL-REPAIR-02 step 2, logged with timestamps.

### UNDO for the rules (one click each)
- Outlook on the web → gear → Mail → Rules → the trash icon next to each rule name above.
- Or from the cloud seat: the Microsoft 365 connector has a delete-rule tool; record the two
  rule ids here when they are created so the cloud can delete them by id: `rule-1 id: ____` ·
  `rule-2 id: ____`.
- To put moved mail back: in AI_VTES, sort by subject, select the echo messages, **Move → Inbox**.
  Nothing is deleted by the rules, so nothing is lost.

## 2. Desktop steps (MAIL-REPAIR-02) — undo for each

| Step | Undo |
|---|---|
| Move stuck Outbox items to Drafts | They are in Drafts; open and click Send again, or drag back to Outbox. Nothing deleted. |
| Patch `C:\AI\system\morning_report.ps1` and the mail rescue (stop COM Send) | Restore the `.bak-YYYYMMDD` copy made before the edit (`copy *.bak-YYYYMMDD morning_report.ps1`). |
| Remove bellsouth / onlinecou / Gmail-IMAP accounts from the Outlook profile | Rollback script exported first: `G:\My Drive\VTES-Outbox\MAIL-REPAIR-02\ROLLBACK\` holds the registry export of `HKCU\Software\Microsoft\Office\16.0\Outlook\Profiles` and a one-click `.reg` restore. Their mail is on their own servers and already imported into this mailbox, so no mail is lost either way. |
| New Outlook profile (Option 2) | The old profile is left in place, never deleted. Control Panel → Mail → Show Profiles → pick the old one. |
| Cached-mode slider to All | Set it back to 12 months in Account Settings → Change → slider. |
| Windows Search rebuild | Self-healing; nothing to undo. |

## 3. What is not reversible and therefore is NOT in this job
Deleting any mail, folder, PST, or OST. Closing any mail account at its provider. None of
these are ordered anywhere in TRK-2026-10053.

Footer: TRK-2026-10053 · v1 · 2026-11-10 · CURRENT · #Outlook #Rollback #RI-057
