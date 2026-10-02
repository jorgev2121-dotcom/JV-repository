# WORK QUEUE — Reactivate executors so they listen to VTES-Inbox

**FROM:** Cloud (claude.ai/code), 2026-10-02. **TO:** Desktop Claude Code (DESKTOP-OTB90LR).
**Pointer:** PASTE-D-064. **Owner request:** Jorge Valdes, 2026-10-02.
Builds on PASTE-D-063 (`OWNER-ORDER_PASTE-D-063_executor-takeover_2026-09-28.md`).

## 0. State your model, one line, first.

## 1. Conflict to respect — do NOT silently override D-063

D-063 (owner, 2026-09-28) says: **keep `CU-Inbox-Job-Watcher` Disabled.**
It was disabled on purpose.
Jorge's 2026-10-02 request is read as:

1. **Reactivate the listener that does the VTES-Inbox pickup:**
   `VTES-LOCAL-POLLER` (runs `VTES-Bridge-Poller.ps1` every 5 min and at logon)
   and `CU-Uptime-Heartbeat`.
2. **Leave `CU-Inbox-Job-Watcher` Disabled** unless Jorge says "enable the old watcher".
   If unsure what he meant, ask him one yes/no. Do not guess.

## 2. Steps

1. `git pull --ff-only`. If refused, report ahead/behind counts. Never force.
2. Run `mailbox/to-desktop/Executor-Takeover_PASTE-D-063.ps1` if not already run.
   It writes its own undo script first.
3. Check: `Get-ScheduledTask CU-Uptime-Heartbeat, VTES-LOCAL-POLLER, CU-Inbox-Job-Watcher`.
   Expected: first two Ready/Running, third Disabled.
4. **Proof it listens (Rule 2):** drop `PILOT-LISTEN-TEST_2026-10-02.md` containing
   `LISTEN-NONCE-HERON-2210-20261002` into `G:\My Drive\VTES-Inbox`. Within 10 minutes a
   result carrying that nonce must appear in `G:\My Drive\VTES-Outbox`. Paste the listing.
5. Write `EXECUTOR-STATUS.txt` to VTES-Outbox. A safety-check refusal: skip that step,
   record it, carry on.

## 3. Access permissions (owner preference, 2026-10-02)

Jorge asked for Claude Cowork and Desktop Executor access permissions.

- **Desktop Executor:** cloud was blocked from editing `.claude/settings.json` (it is a
  self-permission change). Desktop must add it locally. Suggested allow list: read repo;
  edit `mailbox/`, `OPEN-ITEMS.md`, `PASTE-LOG.md`; read VTES-Inbox; write VTES-Outbox;
  read-only git; `git pull --ff-only`. Suggested deny: force push, `rm -rf`.
- **Cowork:** permissions live in the Cowork app. Cloud cannot change them (IMPOSSIBLE).
- **Still RED, never granted:** filing/moving/deleting client documents, anything outbound,
  spend, credentials, registry edits.

## 4. Done means

Proof from step 4 pasted, task states pasted, `OPEN-ITEMS.md` updated. Otherwise BLOCKED
with what was tried.

Did this reach you and make sense?

*#PASTE-D-064 #executor-reactivate #VTES-Inbox*
