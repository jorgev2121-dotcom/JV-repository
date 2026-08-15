# HANDOFF.md — Desktop ↔ Cloud Protocol

**One channel. Not five.**

---

## 1. Why this file exists

As of 2026-08-15 Jorge had at least four separate sync channels in play:

1. Google Drive "Board" (Code ↔ iPhone, ~30 sec)
2. OneDrive `ClaudeMemory\mailbox\` (Code → Cowork, ~5 min)
3. Chat archive read at session start (one-way)
4. This git repository

**Every additional channel is another place for state to diverge.** That is RI-005
restated. The fix is consolidation, not a fifth channel.

**This repository is the single channel for rules and state.**
Google Drive remains the source of truth for **job files** — that is what it is good
at, and that does not change.

---

## 2. Why the repo and not a local mailbox

A local mailbox path such as `ClaudeMemory\mailbox\claude\outbox\` **cannot work as a
cloud↔desktop channel**, for one hard reason:

**Cloud sessions cannot write to a Windows path.** A cloud session runs in an
ephemeral container with no access to Jorge's PC. If the mailbox lives on the C:
drive, the cloud half of the "bridge" can never reach it — the channel is
write-only from one side and therefore not a channel at all.

OneDrive would only partially fix this, and only after the Microsoft 365 connector
is authorized — which it currently is not.

**The repository has none of those problems:**

| Property | Local/OneDrive mailbox | This repo |
|---|---|---|
| Cloud sessions can write | ❌ | ✅ |
| Desktop sessions can write | ✅ | ✅ |
| Requires connector authorization | ✅ | ❌ |
| Version history / who-changed-what | ❌ | ✅ |
| `CLAUDE.md` auto-loads for both sides | ❌ | ✅ |

Proven working 2026-08-15: a cloud session wrote `CLAUDE.md`,
`RECURRING-ISSUES.md` and `OPEN-ITEMS.md` and pushed them to GitHub, where any
desktop session can pull them.

---

## 3. The protocol

Two directories. Plain markdown files. No software to build.

```
mailbox/
  to-desktop/    ← cloud writes here; desktop reads and executes
  to-cloud/      ← desktop writes here; cloud reads
  done/          ← either side moves finished messages here
```

**Message filename:** `TRK-2026-NNNN_short-description.md`
**Every message must contain:**

1. **FROM** — which session wrote it (cloud or desktop) and the date
2. **TASK** — what needs doing, in plain language
3. **WHY** — one line of context
4. **DONE WHEN** — the specific evidence that proves completion

**Rules:**

1. Read your inbox at session start, before anything else.
2. When a task is complete, move the file to `done/` and append the verification
   evidence to the bottom of it. Per `CLAUDE.md` Rule 2, no evidence means not done.
3. If blocked, leave the file in place and append a `BLOCKED:` line stating what was
   tried, why it failed, and the one small thing needed.
4. Mirror every message as a row in `OPEN-ITEMS.md`. The mailbox is the transport;
   `OPEN-ITEMS.md` is the ledger.

**Latency:** whatever the polling interval is. `git pull` at session start, and again
whenever a session has been running a long time. This is not instant messaging and
does not need to be.

---

## 4. Decisions taken 2026-08-15

Recorded so no future session re-litigates them.

**Extend the OneDrive mailbox for cloud↔code? — NO.**
Cloud cannot write to a Windows path. Use this repo instead. Same mailbox *pattern*,
on a substrate that actually spans both sides.

**Formalise the Google Drive Board protocol? — NOT YET.**
It already works for iPhone at ~30 seconds. Leave it alone. Revisit only after the
repo channel has been running for a few weeks.

**Expose Claude Skills via HTTPS endpoints? — DEFERRED.**
Standing up and maintaining HTTPS endpoints is a server to keep alive, certificates
to renew, and auth to manage. For a one-man non-technical operation that is a
maintenance burden which will rot and then fail silently. Revisit only if a concrete
need survives a month of the simpler setup.

**iPhone access? — NO CHANGE NEEDED.**
The Drive Board already delivers this. Do not rebuild what works.

---

## 5. Migration still outstanding

`OneDrive\Documents\ClaudeMemory\` — including `DIRECTIVE-REGISTER.md` — has not yet
been migrated into this repo. Until it is, there are two brains.

Only a desktop session can do this: cloud has no access to OneDrive, and the
Microsoft 365 connector is unauthorized. Tracked as `TRK-2026-9017`.
