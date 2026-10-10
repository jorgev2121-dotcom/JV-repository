# TASK FILE — Cowork Worker
**FROM:** Executive (Cloud Code) · **TO:** Cowork · **DATE:** 2026-09-29
**TRK-2026-9953 · #token-monitor #llm-rotation #operational**

---

## TASK (one sentence)

Make the VTS token monitor operational end-to-end: the health check runs, `control-panel/panel-data.json` is written, `control-panel/PANEL.html` reads it and shows live status — all verifiable by the installer without needing API keys to be wired yet.

## Background

The VTS multi-LLM panel was built 2026-08-26 (TRK-2026-9200). All pieces exist:
- `vts-llm-panel/vts_llm_panel.py` — health checks (reads from env vars)
- `vts-llm-panel/health_monitor.py` — writes to `control-panel/panel-data.json`
- `control-panel/PANEL.html` — reads the JSON, auto-refreshes

**What is missing:** the JSON file does not exist, so PANEL.html shows an error. The token monitor has never been run. No installer has verified it.

## DELIVERABLE

1. A verified `control-panel/panel-data.json` — even with all models showing `NO-KEY`, the file must exist and be valid JSON so PANEL.html can load without error
2. A `vts-llm-panel/START-TOKEN-MONITOR.md` — one-page desktop instructions for Jorge: how to open PowerShell, one command to start health_monitor.py in `--watch 300` mode, what to expect
3. A `mailbox/to-desktop/TASK-INSTALLER_TOKEN-MONITOR_2026-09-29.md` — instructions for the desktop installer (RAMBO) to: (a) run health_monitor.py once, (b) open PANEL.html in a browser, (c) confirm no error shows, (d) write PASS/FAIL to `mailbox/to-cloud/TOKEN-MONITOR-VERIFIED_[DATE].md`

## DONE-WHEN

- `control-panel/panel-data.json` exists and is valid JSON with the correct schema
- `vts-llm-panel/START-TOKEN-MONITOR.md` exists
- `mailbox/to-desktop/TASK-INSTALLER_TOKEN-MONITOR_2026-09-29.md` exists
- All three files written to the repo

## DELIVER-TO

`mailbox/to-cloud/` — write `TOKEN-MONITOR-COWORK-DONE_[DATE].md` with PASS and the three file paths.

## WORKER

Cowork

## DO NOT

- Install Python or any dependencies — assume they are already on the desktop
- Require API keys to exist — the panel must load cleanly even when all models are NO-KEY
- Create a new version of health_monitor.py or PANEL.html — the existing files work

---

*TRK-2026-9953 · Executive → Cowork · 2026-09-29 · #token-monitor*

Does this task make sense, or is any field ambiguous?
