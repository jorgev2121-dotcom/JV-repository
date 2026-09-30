# LLM WINDOW REGISTRY — every AI window, bot and agent Jorge runs, findable by search
**TRK-2026-9910-B · created 2026-09-30 by ☁️ Cloud · #LLM-registry #VTES-control-panel #JorgeValdes #CU-Inspections #TRK-2026-9910**

**Why this file exists:** Jorge runs ~5 LLM subscriptions across many windows and cannot
tell them apart or find the right one on demand. This registry gives every window a fixed
ID, a plain-English name, a one-line job description, hashtags, and how to open it — so a
search in Drive, Gmail, OCR sidecars, 1Password, or the VTES launcher lands on the right one.

**Naming standard (use everywhere — window titles, 1Password items, file footers):**
`LLM-NN · emoji · Platform · Role`  → example: `LLM-01 · 🖥️ · Claude Code Desktop · RAMBO`

**Search standard:** the ID (`LLM-01`) is the identity; the hashtags are the categories.
Put both in the BODY of anything that belongs to that window, never only in a filename.

**Billing standard (owner directive 2026-09-30):** every window below runs on a
SUBSCRIPTION. API keys are used only as a "click-over" convenience, never as the main
engine. The API-metered router (`vts-llm-panel`, TRK-2026-9200) is therefore parked.

---

## The windows

### LLM-01 · 🖥️ · Claude Code Desktop · RAMBO
- **What it is:** Claude Code running on Jorge's Windows PC. Nickname RAMBO.
- **Its job:** the ONLY hands on the PC — files, OneDrive, Chrome, 1Password, YubiKey,
  printer, Miami-Dade county sites, OCR, tax jackets. Runs unattended every 15 minutes
  (VTES-LOCAL-POLLER / JOB-0079) and executes anything dropped in VTES-Inbox.
- **Billing:** Claude subscription (Max). No API key.
- **Handoff:** IN = `G:\My Drive\VTES-Inbox` (TASK-C2D / MSG-*-TO-CODE files) ·
  OUT = `G:\My Drive\VTES-Outbox` (RESULT_ / EXECUTED_ / BLOCKER_ files).
- **Paste ID prefix:** `PASTE-D`
- **Open it:** the beige Claude desktop app → **Code** tab, or the green **D** tray icon
  (TRK-2026-9740). Window title should read `DESKTOP - Claude Code`.
- **Hashtags:** `#LLM-01 #EXEC-DESKTOP #RAMBO #PASTE-D #claude-code`

### LLM-02 · ☁️ · Claude Code Cloud · REPO KEEPER
- **What it is:** Claude Code running remotely at claude.ai/code (this session).
- **Its job:** holds the git repo, QC on desktop results, research and sourcing, Plaud
  daily sync, dispatching orders to RAMBO through Drive, morning/status reporting.
  Cannot touch the PC, county sites, or OneDrive.
- **Billing:** Claude subscription. No API key.
- **Handoff:** writes to VTES-Inbox, reads VTES-Outbox; repo `JV-repository`.
- **Paste ID prefix:** `PASTE-C`
- **Open it:** https://claude.ai/code → session titled with this repo, or the blue **C**
  tray icon.
- **Hashtags:** `#LLM-02 #EXEC-CLOUD #PASTE-C #claude-code`

### LLM-03 · 🤝 · Claude Cowork · ANALYST
- **What it is:** the Cowork window in the Claude desktop app.
- **Its job:** long documents and analysis (CDM / Comparative Decision Model owner,
  COWORK-CDM-OWNER-01), can drive Chrome with Jorge's permission, writes
  `MSG-COWORK-TO-CODE` orders into VTES-Inbox.
- **Billing:** Claude subscription.
- **Handoff:** VTES-Inbox / VTES-Outbox; `COWORK-CDM-PROGRESS.md`.
- **Paste ID prefix:** `PASTE-X`
- **Open it:** Claude desktop app → **Cowork** tab, or the orange **X** tray icon.
- **Hashtags:** `#LLM-03 #COWORK #PASTE-X #CDM`

### LLM-04 · 💬 · Claude Chat · THE COCKPIT
- **What it is:** the plain Claude conversation (desktop app "Chat" or claude.ai).
- **Its job:** Jorge's primary conversation and decision seat — the "executive chair."
  Dictate here, approve here, ask "where do things stand" here. It does not execute;
  it reads the same OPEN-ITEMS and Drive files and tells the executors what to do.
- **Billing:** Claude subscription.
- **Handoff:** by relaying into VTES-Inbox (or by telling LLM-02 in chat).
- **Open it:** Claude desktop app → **Chat**, or https://claude.ai
- **Hashtags:** `#LLM-04 #CHAT #COCKPIT #owner-seat`

### LLM-05 · 📱 · Claude iPhone · VOICE
- **What it is:** the Claude app on Jorge's iPhone.
- **Its job:** dictation on the go, voice approvals ("AP-0088: GO"), quick questions.
  Same account as LLM-04, so anything said here is visible to the cockpit.
- **Billing:** Claude subscription.
- **Open it:** iPhone → Claude app.
- **Hashtags:** `#LLM-05 #IPHONE #voice #dictation`

### LLM-06 · 🧭 · Codex CLI · BACKUP EXECUTOR
- **What it is:** OpenAI's Codex command-line agent on the PC (ChatGPT subscription).
- **Its job:** second pair of hands when Claude's weekly limit is hit — same VTES-Inbox
  orders, same GREEN/RED rules (`AGENTS.md` makes the charter model-neutral).
- **Billing:** ChatGPT subscription. No API key.
- **Status:** install prepared, **waiting on Jorge's one-line "yes, install Codex CLI"**
  (TRK-2026-9952g) — the desktop correctly refused to install without it.
- **Open it:** Windows Terminal → `codex` (after install).
- **Hashtags:** `#LLM-06 #CODEX #BACKUP-EXEC #openai`

### LLM-07 · 🔮 · Grok (SuperGrok) · SECOND OPINION
- **What it is:** xAI's Grok — Jorge's nickname for it: "Fabian."
- **Its job:** second-opinion analysis, live-web answers, sanity checks on Claude's
  work. Chat only — the old API key is dead and is not being replaced (subscription rule).
- **Billing:** SuperGrok subscription.
- **Handoff:** paste the file or the Drive link into the chat; results go back to Drive
  by Jorge's copy or by LLM-02 filing them.
- **Open it:** https://grok.com
- **Hashtags:** `#LLM-07 #GROK #FABIAN #second-opinion`

### LLM-08 · ♊ · Gemini · VOLUME DRAFTER
- **What it is:** Google Gemini (chat) and Gemini CLI (free on the Google account).
- **Its job:** cheap/free volume work — drafting, summarizing, Drive-native reads.
  Gemini CLI can run headless on the PC under `GEMINI.md`.
- **Billing:** Google account (free tier / Google One). No API key needed for CLI login.
- **Open it:** https://gemini.google.com, or Windows Terminal → `gemini`.
- **Hashtags:** `#LLM-08 #GEMINI #google #volume`

### LLM-09 · 🧰 · VTS LLM Panel (API router) · PARKED
- **What it is:** `vts-llm-panel/vts_llm_panel.py` (TRK-2026-9200), a free-first API
  router with real health checks.
- **Why parked:** it runs on API keys = metered billing, which the 2026-09-30 directive
  rules out as a primary engine. Keep only as an optional click-over.
- **Hashtags:** `#LLM-09 #API-ROUTER #parked`

---

## The bus — how they hand off to each other (subscription-only, no API)

1. **Google Drive is the bus.** `VTES-Inbox` = orders in, `VTES-Outbox` = proof out. Every
   agent that can read Drive (LLM-01, -02, -03, -06, -08) already speaks it; the chat-only
   windows (LLM-04, -05, -07) join by Jorge pasting a Drive link or LLM-02 filing on their behalf.
2. **The repo is the memory.** `OPEN-ITEMS.md` (newest rows at the bottom) is the ledger every
   window reads on start. `AGENTS.md` / `GEMINI.md` make the charter apply to any model.
3. **The registry ID travels with the work.** Any file, email, or note produced by a window
   carries its `LLM-NN` and hashtags in the body, so any later search finds who did it.

## Where each search finds a window

- **VTES launcher (`tools/vtes-panel/VTES-LLM-LAUNCHER.html`):** type an ID, hashtag, name
  or job word → the matching card appears with a one-click open button.
- **1Password:** one item per window, titled with the naming standard, URL filled, tags =
  the hashtags (titles/URLs/tags only — never a secret). Type `LLM-07` in 1Password → Grok.
- **Google Drive / Gmail / OCR sidecars:** search the ID or hashtag; anything the window
  produced carries it in the body.
- **Tray icons (TRK-2026-9740):** D / C / X = LLM-01 / LLM-02 / LLM-03.

*Footer: TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #LLM-registry #VTES-control-panel*
