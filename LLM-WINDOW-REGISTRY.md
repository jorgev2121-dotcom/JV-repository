# LLM WINDOW REGISTRY — every AI window, bot and agent Jorge runs, findable by search
**TRK-2026-9910-B · created 2026-09-30 by ☁️ Cloud · #LLM-registry #VTES-control-panel #JorgeValdes #CU-Inspections #TRK-2026-9910**

**Why this file exists:** Jorge runs ~5 LLM subscriptions across many windows and cannot
tell them apart or find the right one on demand. This registry gives every window a fixed
ID, a plain-English name, a one-line job description, hashtags, and how to open it — so a
search in Drive, Gmail, OCR sidecars, 1Password, or the VTES launcher lands on the right one.

**Naming standard (use everywhere — window titles, 1Password items, file footers):**
`LLM-NN · emoji · Platform · Role`  → example: `LLM-01 · 🖥️ · Claude Code Desktop · RAMBO`

**Address standard (TRK-2026-9910-B):** every window has a fixed address `vtes://llm-NN` that works like
a web link (launcher, email, Drive doc, bookmark, Win+R, 1Password URL field). `tools/vtes-panel/VTES-Open.ps1 -Install`
registers it (HKCU only, no UAC); `vtes-addresses.json` holds where each one goes. Windows with a real web address
(LLM-02 has a permanent per-session link) forward to it. Change an address by editing the JSON only.

**Search standard:** the ID (`LLM-01`) is the identity; the hashtags are the categories.
Put both in the BODY of anything that belongs to that window, never only in a filename.

**Billing standard (owner directive 2026-09-30, clarified the same day):** every window below
runs on a SUBSCRIPTION. API keys are allowed ONLY as a thin routing bridge (a few cents of
routing, not the work itself), and every API run is PRICED FIRST and sent to Jorge for approval
or deferral with options (standing rule, TRK-2026-9952e). My earlier 'parked' wording was an
over-reading and is withdrawn.

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
- **Address:** `vtes://llm-01` → the Claude desktop app, Code tab (shortcut filled in by RAMBO)

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
- **Address:** `vtes://llm-02` → https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf

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
- **Address:** `vtes://llm-03` → your Cowork window address (paste it into vtes-addresses.json)

### LLM-04 · 💬 · Claude Chat · THE COCKPIT
- **What it is:** the plain Claude conversation (desktop app "Chat" or claude.ai).
- **Its job:** Jorge's primary conversation and decision seat — the "executive chair."
  Dictate here, approve here, ask "where do things stand" here. It does not execute;
  it reads the same OPEN-ITEMS and Drive files and tells the executors what to do.
- **Billing:** Claude subscription.
- **Handoff:** by relaying into VTES-Inbox (or by telling LLM-02 in chat).
- **Open it:** Claude desktop app → **Chat**, or https://claude.ai
- **Hashtags:** `#LLM-04 #CHAT #COCKPIT #owner-seat`
- **Address:** `vtes://llm-04` → https://claude.ai

### LLM-05 · 📱 · Claude iPhone · VOICE
- **What it is:** the Claude app on Jorge's iPhone.
- **Its job:** dictation on the go, voice approvals ("AP-0088: GO"), quick questions.
  Same account as LLM-04, so anything said here is visible to the cockpit.
- **Billing:** Claude subscription.
- **Open it:** iPhone → Claude app.
- **Hashtags:** `#LLM-05 #IPHONE #voice #dictation`
- **Address:** `vtes://llm-05` → the Claude app on the iPhone (no PC address)

### LLM-06 · 🧭 · Codex CLI · BACKUP EXECUTOR
- **What it is:** OpenAI's Codex command-line agent on the PC (ChatGPT subscription).
- **Its job:** second pair of hands when Claude's weekly limit is hit — same VTES-Inbox
  orders, same GREEN/RED rules (`AGENTS.md` makes the charter model-neutral).
- **Billing:** ChatGPT subscription. No API key.
- **Status:** **INSTALLED 2026-09-26** (codex-cli 0.157.1, by RAMBO; EXECUTED file for TRK-2026-9952g v2 is
  in VTES-Outbox). Only Jorge's ChatGPT sign-in remains: desktop shortcut `Codex - sign in (Jorge)`.
- **Open it:** Windows Terminal → `codex`.
- **Hashtags:** `#LLM-06 #CODEX #BACKUP-EXEC #openai`
- **Address:** `vtes://llm-06` → terminal shortcut: Codex - sign in (Jorge)

### LLM-07 · 🔮 · Grok (SuperGrok) · SECOND OPINION
- **What it is:** xAI's Grok — Jorge's nickname for it: "Fabian."
- **Its job:** second-opinion analysis, live-web answers, sanity checks on Claude's
  work. Chat on subscription. The old API key is dead; a replacement is allowed only as a priced, approved routing bridge.
- **Billing:** SuperGrok subscription.
- **Handoff:** paste the file or the Drive link into the chat; results go back to Drive
  by Jorge's copy or by LLM-02 filing them.
- **Open it:** https://grok.com
- **Hashtags:** `#LLM-07 #GROK #FABIAN #second-opinion`
- **Address:** `vtes://llm-07` → https://grok.com

### LLM-08 · ♊ · Gemini · VOLUME DRAFTER
- **What it is:** Google Gemini (chat) and Gemini CLI (free on the Google account).
- **Its job:** cheap/free volume work — drafting, summarizing, Drive-native reads.
  Gemini CLI can run headless on the PC under `GEMINI.md`.
- **Billing:** Google account (free tier / Google One). No API key needed for CLI login.
- **Open it:** https://gemini.google.com, or Windows Terminal → `gemini`.
- **Hashtags:** `#LLM-08 #GEMINI #google #volume`
- **Address:** `vtes://llm-08` → https://gemini.google.com

### LLM-09 · 🧰 · Thin API router (bridge) · STANDBY
- **What it is:** a routing bridge only. Candidates: `vts-llm-panel/vts_llm_panel.py` (TRK-2026-9200),
  LiteLLM (RI-038), or a hosted router. Not the main engine.
- **Rule:** each API run is priced first and sent to Jorge for approval or deferral with options.
- **Verified price anchor** (platform.claude.com, read 2026-09-30): Claude Haiku 4.5 is $1 in / $5 out per
  million tokens; Sonnet 5.5 is $2 / $10. A handoff of 5,000 tokens in and 1,000 out costs about 1 cent
  (Haiku) or 2 cents (Sonnet). Gemini and OpenRouter prices could NOT be fetched (egress blocked): unverified.
- **Hashtags:** `#LLM-09 #API-ROUTER #standby`

---

## The bus — how they hand off to each other (subscription-only, no API)

1. **Google Drive is the bus.** `VTES-Inbox` = orders in, `VTES-Outbox` = proof out. Every
   agent that can read Drive (LLM-01, -02, -03, -06, -08) already speaks it; the chat-only
   windows (LLM-04, -05, -07) join by Jorge pasting a Drive link or LLM-02 filing on their behalf.
2. **The panel is the click.** `VTES-LLM-LAUNCHER.html` has a "Hand work to another window" box:
   pick From and To, say what you want, press one button. It copies a ready-made handoff packet and
   opens the destination. No API, no Drive wait.
3. **The repo is the memory.** `OPEN-ITEMS.md` (newest rows at the bottom) is the ledger every
   window reads on start. `AGENTS.md` / `GEMINI.md` make the charter apply to any model.
4. **The registry ID travels with the work.** Any file, email, or note produced by a window
   carries its `LLM-NN` and hashtags in the body, so any later search finds who did it.

## Where each search finds a window

- **VTES launcher (`tools/vtes-panel/VTES-LLM-LAUNCHER.html`):** type an ID, hashtag, name
  or job word → the matching card appears with a one-click open button.
- **1Password:** one item per window, titled with the naming standard, URL filled, tags =
  the hashtags (titles/URLs/tags only — never a secret). Type `LLM-07` in 1Password → Grok.
- **Google Drive / Gmail / OCR sidecars:** search the ID or hashtag; anything the window
  produced carries it in the body.
- **Tray icons (TRK-2026-9740):** D / C / X = LLM-01 / LLM-02 / LLM-03.

*Footer: TRK-2026-9910-B · v2 · 2026-09-30 · CURRENT · #LLM-registry #VTES-control-panel*
