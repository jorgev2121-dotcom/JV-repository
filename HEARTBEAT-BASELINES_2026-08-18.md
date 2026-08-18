# Heartbeat baselines — so a hang can be told from a run

**TRK-2026-9300 · cloud session · 2026-08-18 05:15 UTC**

**`NIGHT-PROTOCOL.md` rule 3, and `RI-002` logged three times, both say the same thing:**

> *A dead run is detected by whether the **output file has grown** — not whether the process
> exists. A process in the task list is not a run making progress.*

**Nobody has ever written down the sizes to compare against.** That is what this file is for.

---

## Baselines recorded 2026-08-18

| Component | Output file | Size | Timestamp | Cadence |
|---|---|---|---|---|
| **RECONCILER** | `VTES-Outbox\RECONCILER-REPORT_20260818.md` | **464 bytes** | 04:40 UTC | 30 min |
| **UNATTENDED-EXECUTOR** | roster entry only | — | 251 min stale at 04:40 | none — `green-unmonitored` |
| **JOB-VERIFIER** | `checks.json` / EXECUTED-WITH-PROOF files | 27 checks | last run 19:55 ET | on demand |

---

## How to use this

**At each hourly check, fetch `RECONCILER-REPORT_<date>.md` by ID and compare its size and
`modifiedTime` against the row above, then update the row.**

- **Grown** → alive, working.
- **Same size, new timestamp** → running but producing nothing. **Note it.**
- **Same size, same timestamp, three cycles** → **hung. Log it, do not wait for a fourth.**

---

## Two distinctions this file exists to protect

**1. Idle is not dead.** `JOB-VERIFIER` at 84 minutes stale is correct behaviour — nothing has
needed verifying. **A stale line that fires on idle components trains everyone to ignore the
stale line**, which is how a real death gets missed.

**2. On the roster is not monitored.** `UNATTENDED-EXECUTOR` was added tonight with status
`green-unmonitored` — its own entry says nothing restarts it and nothing alarms if it dies.
**It has now been recorded. It has not been monitored.** No later report may describe it as
monitored on the strength of appearing in a list.

---

## The open question

**Does the `VTES-Outbox` ledger recurse into subfolders?**

If it counts only the top level, tonight's entire proof of concept — 5 client-ready reports,
103 images, every raw county response, all inside `VTES-Outbox\PROOF-5` — **is outside the
ledger and would not be noticed if it vanished.**

**Asked of the reconciler at 05:15 UTC. A count with no stated depth is RI-025: a number true
of a rule nobody wrote down.**

#TRK-2026-9300 #NightProtocol #RI-002 #RI-025 #JorgeValdes #CU-Inspections
