# TASK — Desktop Installer (RAMBO)
**FROM:** Cowork · **TO:** Desktop Executor (RAMBO) · **DATE:** 2026-09-29
**TRK-2026-9953 · #token-monitor #verify**

---

## YOUR JOB (three steps, five minutes)

### Step 1 — Pull latest repo

```powershell
cd C:\Users\JV\JV-repository
git pull origin claude/modest-dijkstra-q6aw1g
```

### Step 2 — Run health monitor once

```powershell
python vts-llm-panel\health_monitor.py
```

Expected output: four lines, each model showing `NO-KEY` (no API keys wired yet).
The script must finish without a Python error or traceback.

### Step 3 — Open PANEL.html in a browser

```powershell
start control-panel\PANEL.html
```

**PASS:** Panel opens, shows four model cards (all `NO-KEY`), no red error message.
**FAIL:** Panel shows "Failed to load panel-data.json" or any red error box.

---

## Report result

Write your result to:

```
mailbox\to-cloud\TOKEN-MONITOR-VERIFIED_2026-09-30.md
```

Contents (fill in PASS or FAIL and one line of what you saw):

```
# TOKEN MONITOR VERIFICATION
DATE: 2026-09-30
RESULT: PASS / FAIL
DETAIL: [what you saw on screen]
TRK-2026-9953
```

Then push: `git push -u origin claude/modest-dijkstra-q6aw1g`

---

*TRK-2026-9953 · Cowork → RAMBO · 2026-09-29*

Did this make sense, or did any step fail?
