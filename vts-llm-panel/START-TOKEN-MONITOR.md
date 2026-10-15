# START TOKEN MONITOR — Desktop Instructions
**TRK-2026-9953 · VTS Multi-LLM Panel**

---

## What this does

Checks whether each LLM (Gemini, Grok, OpenAI, Claude) is reachable and writes
the result to `control-panel/panel-data.json`. PANEL.html reads that file.

---

## One-time run (test it now)

1. Open PowerShell
2. Paste and press Enter:

```powershell
cd C:\Users\JV\JV-repository
python vts-llm-panel\health_monitor.py
```

Expected output — models without API keys show `NO-KEY`, models with keys show
`LIVE` or `DEAD`. Either way the file is written and PANEL.html will load without
error.

---

## Watch mode (runs every 5 minutes, keeps panel live)

```powershell
cd C:\Users\JV\JV-repository
python vts-llm-panel\health_monitor.py --watch 300
```

Leave that PowerShell window open. Press `Ctrl+C` to stop.

---

## What to expect

- First run with no API keys: all four models show `NO-KEY`. Panel loads — no error.
- After Gemini key is wired: Gemini shows `LIVE`, becomes the active model.
- File written: `control-panel\panel-data.json`

---

## Adding API keys (do this first if you have them)

Run `vts-llm-panel\ADD-GEMINI-KEY.ps1` — it prompts for the key, saves it
permanently, and then runs a health check automatically.

---

*TRK-2026-9953 · Written by Cowork 2026-09-30*
