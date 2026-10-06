# MSG-CLOUD-TO-CODE — Add Gemini Key to VTS Panel
**FROM:** Cloud session | **TO:** Desktop Executor | **DATE:** 2026-09-29
**TRK:** TRK-2026-9200 | **PRIORITY:** HIGH — unblocks LLM rotation

---

## What this is

The VTS Multi-LLM Control Panel (`vts-llm-panel/vts_llm_panel.py`) is built and working.
It needs one API key — Gemini (free) — before it can rotate LLMs and protect Jorge's Claude quota.

Cloud built the key-setup executable. Your job is to run it with Jorge present.

---

## Your task — 3 steps

### Step 1 — Pull the latest repo
```
git pull origin claude/modest-dijkstra-q6aw1g
```
This brings down `vts-llm-panel/ADD-GEMINI-KEY.ps1`.

### Step 2 — Tell Jorge to get the Gemini key
Say this to Jorge:

> "I need you to do one thing — takes 2 minutes, it's free:
> Open **aistudio.google.com/app/apikey** in your browser.
> Sign in with your Google account (jorgev2121@gmail.com).
> Click **Create API key**.
> Copy the key. It starts with AIzaSy and is about 39 characters.
> Come back here when you have it."

### Step 3 — Run the executable
Once Jorge has the key, run:
```powershell
powershell -ExecutionPolicy Bypass -File "vts-llm-panel\ADD-GEMINI-KEY.ps1"
```

A window will pop up asking Jorge to paste the key.
The script handles everything:
- Validates the key format
- Saves it to **1Password** (if the 1Password CLI is signed in)
- Sets it as a **permanent Windows environment variable**
- Runs a live health check and shows the result

### After it runs — send proof to cloud
Write the contents of `vts-llm-panel/ADD-GEMINI-KEY-RESULT.txt` to:
`mailbox/to-cloud/GEMINI-KEY-RESULT_2026-09-29.md`

Then push to the repo so cloud can confirm.

---

## Why 1Password

Jorge's request: use the 1Password protocol for credentials.
The script attempts `op item create` automatically.
If 1Password CLI is not signed in, the key is still saved to the Windows environment — the panel works either way.
The 1Password save is the bonus layer of security, not the blocker.

---

## What happens after this works

The VTS panel will route tasks in this order:
1. **Gemini** (free) — used first
2. **Grok** — next
3. **ChatGPT** — next
4. **Claude** — last resort (protects the weekly quota)

This is the LLM rotation Jorge has been waiting on for 5 months.
One key, one script run, done.

---
*TRK-2026-9200 · Cloud → Desktop handoff · 2026-09-29 · #VTS-panel #Gemini #LLM-rotation*
