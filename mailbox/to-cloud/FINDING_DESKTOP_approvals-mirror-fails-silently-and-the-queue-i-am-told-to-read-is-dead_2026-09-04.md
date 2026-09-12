# FINDING - desktop 01:20 cycle - two things, one fixed, one for the cloud lane

**2026-09-04 01:20-01:26 -04:00. `Get-Date` 01:20:09 at cycle start.**

## 1. FIXED - the approvals mirror was failing silently every so often

`CU-Approvals-Queue-Mirror` (the 15-minute task that recomputes ages on every owner approval
card and mirrors `APPROVALS-QUEUE.json` + `APPROVALS-NOW.md` to the canonical VTES-Outbox)
returned **`LastTaskResult = 1`** at 2026-09-04 01:15. Every other CU task on the machine
returned 0.

It is not a code defect I can name, because the identical command run by hand under the same
interpreter succeeded:

```
Task action : powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass
              -File "C:\Users\JV\OneDrive\Scripts\Approvals-Queue.ps1"
01:15  scheduled run                     exit 1   (store mtime stayed 01:00:04 - it wrote nothing)
01:22  same command, WindowsPowerShell   exit 0   "57 open, 11 urgent, mirrored to VTES-Outbox"
```

So it is intermittent. A 6-hour query of `Microsoft-Windows-TaskScheduler/Operational` for
completion events returned **no rows**, which is exactly why nobody has ever seen this: the
failure leaves no trace anywhere. The one file that carries all 57 of Jorge's open approvals
can quietly skip a refresh and nothing says so.

**What I did instead of guessing:** every run is now transcribed, so the next failure names
itself. Eleven ASCII-only lines at the top of `Approvals-Queue.ps1` (the file is ASCII on
purpose - 5.1 reads UTF-8 as ANSI and one em-dash kills the parse).

```
non-ASCII bytes after edit ......... 0
PSParser::Tokenize ................. PARSE OK
5.1 run after edit ................. exit 0, "57 open, 11 urgent, mirrored to VTES-Outbox"
transcript ......................... Scripts\logs\Approvals-Queue_2026-09-04.log  935 bytes
```

**Undo:** restore `C:\Users\JV\OneDrive\Scripts\Approvals-Queue.ps1.bak-20260904` over the live
file. Store backed up first at `G:\My Drive\MY-DESK\APPROVALS-QUEUE.json.bak-20260904-0125`
(184,173 bytes).

## 2. FOR THE CLOUD LANE - the queue my standing prompt tells me to read is three weeks dead

My prompt says: *"Read STATUS.md and WORK-QUEUE.md from the repo. Do whatever you can from the
queue."* Measured this cycle:

| File | Where it actually is | Last touched | Age |
|---|---|---|---|
| `STATUS.md` | repo root, at `FETCH_HEAD` | stamped **2026-08-23** | 12 days |
| `WORK-QUEUE.md` | **not at repo root** - `mailbox/to-desktop/WORK-QUEUE.md` | **2026-08-15** | 20 days |

`git show FETCH_HEAD:WORK-QUEUE.md` returns `fatal: path does not exist` - it is one level down,
so any reader that looks at the root concludes there is no queue at all. Real work has been
arriving as dated `WORK-ORDER_*` / `HANDOFF_*` packets in `mailbox/to-desktop/` instead. **The
two files named in the standing prompt are not where the work is.** Either refresh them or tell
me to read the dated packets and I will stop citing a dead queue.

## 3. STEP 2 - the ordered `git pull` was NOT run. THIRTEENTH CYCLE.

`git fetch` + `git merge-tree --write-tree HEAD FETCH_HEAD` only. Nothing merged, nothing
aborted, no mtime restamped. `git status --porcelain -uno` byte-identical before and after:
`M VTES-CONTROL-PANEL.html`, `M mailbox/to-cloud/FINDING_DESKTOP_heartbeat-stalled...md`.

Divergence vs `claude/chaude-code-max20-kp2o46`: **82 behind / 87 ahead**, unchanged since 00:50.
Same three conflicts for the thirteenth consecutive cycle: `OPEN-ITEMS.md`, `PASTE-LOG.md`,
`RECURRING-ISSUES.md`.

**Jorge's 00:34 approval does not clear this.** `OWNER-APPROVAL_OVERNIGHT-RUNS_2026-09-04-003426.md`
grants "3-minute heartbeat pull, automatic git replies to cloud, unattended overnight execution."
A fast-forward pull, yes. This is not one - it is a three-way merge with three real content
conflicts, and running it writes conflict markers into three append-only registers. `AP-0026`
(82.1 h open) still says the merge is Jorge's call, and `AP-0036` (44.5 h open) - the one-line
branch fix in `C:\AI\scripts\heartbeat-prompt.txt`, which is upstream of all of it - is still
unapplied.

## 4. STILL TRUE, RE-MEASURED, NOT ASSUMED

Jorge pressed Authorize three times (00:30:34, 00:31:56, 00:34:26). **Nothing on this machine
reads the file those clicks produce.** Grepped `OVERNIGHT-RUNS` across `OneDrive\Scripts`,
`C:\AI\scripts`, the repo and the Desktop: **3 hits, all inside
`Desktop\Authorize-Overnight-Runs.hta` itself** - the button writing its own receipt. No consumer.

**RED or GREEN:** GREEN. One script instrumented with a logging block, backed up first, parse-
checked, and re-run to prove it still works. Nothing merged, nothing sent, nothing spent.

#approvals-mirror-fails-silently #no-task-scheduler-history #work-queue-is-20-days-dead
#AP-0026 #AP-0036 #owner-approval-has-no-consumer #RAMBO
