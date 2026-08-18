# There is no second monitor to fix — and one that must not be touched

**TRK-2026-9299 · swept by the desktop executor 2026-08-18 ~06:25 ET · mirrored 11:10 UTC**

**I told the desktop to pre-flight the roster fix on the Bridge and Cowork monitors before
pushing it there. It went to do that and found there is nothing to push to.**

**The claim that those rosters had the same defect was the desktop's own, made earlier in the
night. It disproved its own claim by measuring instead of assuming.**

---

## What the sweep found

**Every PowerShell file under four directories was searched for anything that touches the
heartbeat roster or a staleness threshold.**

**Exactly one component on that machine reads the roster and turns an age into a verdict:**
`VTES-Reconciler.ps1`, lines 113–119.

**Everything else that touches the roster is a writer.** It stamps its own row and never reads
anyone else's:

| File | What it actually does |
|---|---|
| `VTES-Bridge-Poller.ps1` | Stamps its own row. **No age arithmetic anywhere in the file** |
| `VTES-Poller-Guardian.ps1` | Liveness by **process match**, not by age. Restarts, then stamps |
| `Post-BackupBridge-Heartbeat.ps1` | Computes an age but only **prints** it — no threshold, no verdict |
| `CU-Tray-Launcher.ps1` | Stamps only |
| `Verify-Job-Artifact.ps1` | Stamps, plus its own single-writer heartbeat file |

**One roster. One reader. The false-death line comes from a single place.**

**So the fix is complete as staged, and the follow-on rollout I asked for does not exist.**

---

## The one that must not be touched

**There is a second staleness check, and it is a different shape.**

`Update-Wins-Fails.ps1`, lines 115–124. It reads **the last-modified time of one file** against a
**ten-minute** limit and prints a single win or fail.

**No roster. No per-component loop. No row that could carry the new field.**

**And the single thing it watches is a genuine heartbeat — the bridge being down is exactly the
alarm that must stay audible.**

**Splicing the new gate in here would be a no-op at best, and if the default landed the wrong way
it would silence the only bridge-down alarm on the machine.**

**Recommendation: leave it alone.** It is flagged here because **it is the one file a search for
"the other stale loop" would land on, and it looks like a match until you read it.**

---

## The refusal that matters

**The desktop did not synthesise a fake Bridge roster to run the test against.** Its own words:

> *"A fixture aimed at a loop that does not exist returns a confident green about nothing."*

**That is exactly the disease this week has been about**, and it would have been the easiest
possible way to hand back a passing result. **A green test against an invented target is worse
than no test, because it closes the question.**

---

## What this leaves

**The staged fix covers everything it needs to cover.** No rollout, no pre-flight, no second
target.

**If Bridge or Cowork rosters exist somewhere the desktop cannot see, they are not on that
machine** — and the offer stands to run the same five rows, including the stalled-heartbeat
control, against any loop whose text is supplied.

#TRK-2026-9299 #RI-025 #JorgeValdes #CU-Inspections
