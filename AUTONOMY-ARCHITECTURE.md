# AUTONOMY-ARCHITECTURE — how to get Jorge out of the loop

**Written 2026-08-15 in response to: "what is your solution? Anything better than
Google Drive? Get me out of the loop, acting autonomously, leaving only marginal
calls for my involvement."**

---

## 1. The reframe — Google Drive is not the weak link

Replacing Drive with anything else changes nothing, and it is worth being precise
about why.

**The substrate works.** A cloud session created a folder in Drive, wrote to it, and
the desktop read it — proven the same day. GitHub works too. Files move fine.

**The bottleneck is that only one endpoint has a heartbeat.**

- **Cloud has one.** Hourly scheduled triggers, day and night. It wakes itself.
- **The desktop has none.** It runs only while a window is open on the PC. When that
  window closes, it is not slow — it is *dead*. Cloud writes into an empty room.

**A faster mailbox does not help a correspondent who is asleep.** Swapping Drive for
Dropbox, a database, or a message queue leaves the desktop exactly as unreachable.

**Give the desktop a clock and the problem is ~90% solved, on any substrate.**

---

## 2. THE FINDING — the purpose-built channel exists and it lapsed

Session history shows something neither party remembered:

```
Jorge-PC   environment_kind: bridge   tags: remote-control-repl
           connection_status: DISCONNECTED     last seen 2026-08-09
Jorge-PC   environment_kind: bridge   tags: remote-control-repl
           connection_status: DISCONNECTED     last seen 2026-08-03
plus several  remote-control-sdk  sessions, now archived
```

**Jorge already had Claude Code Remote Control running on his PC. It has been
disconnected since 2026-08-09 — six days.**

That is not a file-sharing workaround. **It is the mechanism built for exactly this
problem.** With it live:

- `ListAgents` from cloud lists the desktop as a reachable peer
- `SendMessage` delivers **directly** to it — no file, no polling, no Jorge
- The desktop can reply the same way

Everything built today — the Drive mailbox, the relaying, Jorge pasting screenshots
between windows — **was a workaround for a channel that already existed and had simply
gone dark.** Nobody noticed, because nothing was watching. **That is RI-015 again: a
service stopped and there was no sensor.**

**This is the single highest-value fix available. Reconnect it.**

---

## 3. The architecture, ranked

### TIER 1 — Remote Control  ← restore this first
Direct agent-to-agent messaging. Cloud sees the desktop in `ListAgents` and messages
it. Latency: seconds. No polling, no files, no Jorge.
**Status: disconnected since 2026-08-09. Needs reconnecting on the PC.**

### TIER 2 — Desktop heartbeat  ← build this regardless
A Windows Scheduled Task running Claude Code **headless** on a timer:

```
claude -p "Read G:\My Drive\_CLAUDE-MAILBOX\TO-DESKTOP.md and the repo work queue.
           Execute what you can. Write results to TO-CLOUD.md and push."
```

Every 15 minutes. **This converts the desktop from "runs when Jorge opens a window"
into "runs forever."** Combined with cloud's hourly triggers, the loop closes with
nobody in it.

**Why build it even if Tier 1 is restored:** Remote Control delivers a *message*, but
something still has to be awake to act on it. A heartbeat means the desktop is always
awake. The two are complementary — Tier 1 is the phone line, Tier 2 is having someone
in the office.

**⚠ PRECONDITION, from Jorge's own history.** RI-015: four OCR scheduled tasks sat
disabled for two months and nobody noticed, because the daily health email died on
2026-06-19 — *the sensor failed before the thing it watched.* **Restore the health
report BEFORE adding another scheduled task**, or this becomes the next silent
failure. The report must include "when did each task last run."

### TIER 3 — The file substrate  ← already working, leave it
Drive for live messages, the repo for rules and durable state.

**Keep the files even after Tier 1 works.** Remote Control carries conversation; files
carry memory. A conversation with no memory is precisely the eighteen-month failure —
things discussed, agreed, and lost when the window closed. **Direct messaging without
a written record would recreate it in faster form.**

---

## 4. What Jorge is left with

Only **RED** items under `AUTONOMY.md` — spend, credentials, outbound email,
deletions, and genuine product decisions. Everything else runs without him.

Those go to **one place**: `OWNER-QUEUE.md` in the Drive mailbox. One line each,
answerable in a word, readable on a phone. **Not chat messages — chat is where his
last seventeen approvals went to die.**

And the 48-hour rule: an unanswered question does not stall the work. The executor
records what it is doing in the absence of an answer and proceeds on the safest
reversible option.

---

## 5. Why two agents beat one — the mechanism, not the sentiment

Recorded because it justifies the cost of running both.

Four times on 2026-08-15 the two executors corrected each other:

1. **Desktop out-diagnosed cloud** on the orphaned-documents root cause — *"the filing
   convention exists for outputs, not inputs"* — while running on the smallest model.
2. **Cloud corrected desktop's** entry-gate design; at scan time the job is often not
   yet known, so the gate belongs on exit.
3. **Cloud caught a misfiling** — `14598 SW 110 ST` was about to be filed into
   `TRK-2026-1262` because both addresses contain "110".
4. **Desktop found six holding areas** cloud could not see; cloud resolved an UNKNOWN
   from a registry desktop did not have.

**The value is not two opinions. It is two vantage points, where one can falsify the
other.** Each agent states things confidently that it has not verified — RI-014 and
RI-019 are both cloud doing exactly that. **A second agent that can actually go and
look is worth more than a single smarter agent that cannot.**

**One agent, however capable, agrees with itself.** That is the eighteen-month problem
stated in one line.

---

## 6. Order of operations

1. **Restore the health report.** The sensor comes first, always.
2. **Reconnect Remote Control on Jorge-PC.**
3. **Add the desktop heartbeat** — scheduled task, headless, 15 minutes.
4. **Verify the loop with no human**: cloud writes a task, desktop executes and
   replies, cloud confirms — with Jorge not present.
5. **Then hand the whole backlog to the loop.**

**Steps 1–3 need the desktop. Cloud cannot touch the PC.**
