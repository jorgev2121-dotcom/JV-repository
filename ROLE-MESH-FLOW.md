# Role Mesh Flow — who does what, who hands to whom, and what it costs
**2026-09-29 · cloud · approved by Jorge ("We do this") · rules: CLAUDE.md Article 5 (cost gate)**

Every role says **SUBSCRIPTION** (flat fee, already paid) or **API** (metered — estimate + Jorge's
approval before any paid run, via `tools/llm_cost_gate.py`). API figures below are **estimates**:
prices are placeholders until the desktop copies real ones into `tools/llm_prices.json`, and volumes
are assumptions stated on each line.

## The roles
1. **Owner — Jorge.** Approves RED items and spend, types passwords, clicks consent screens. Nothing else.
2. **Planner / QC — Claude Code CLOUD.** Research, writes work into `mailbox/to-desktop/WORK-QUEUE.md`,
   checks proof. **SUBSCRIPTION** (Claude plan; tier NEEDS JORGE to confirm).
3. **Executor — 🖥️ DESKTOP EXECUTOR (on your PC).** Runs scripts, git, files, one step at a time
   (checkpoint mode). **SUBSCRIPTION** (same Claude plan).
4. **Hands on screen — COWORK.** Browser clicks, consent screens, apps with no command line.
   **SUBSCRIPTION** (same Claude plan).
5. **OCR reader — Tesseract on the PC.** Reads scans at night. **LOCAL, $0.**
6. **Volume worker — Gemini through `vts-llm-panel`.** Page sorting, first-draft summaries, Wally call
   sheets. **API, free tier = $0.** Paid only above Google's free daily limit, and only with approval.
   - Night page sorting, assumed 500 pages/night × 30 nights, ~1,500 tokens in / 200 out each:
     **$0 inside the free limit; up to ~$14/month if every page went paid** (Gemini 2.5 Flash,
     placeholder $0.30 / $2.50 per million tokens).
   - Wally call sheets, $70 list = 500 records, ~2,000 in / 500 out each: **~$0.95 one time if paid, else $0.**
6b. **More free workers (added 2026-09-29):** Groq, Cerebras, Mistral, OpenRouter free models — same
   panel, tried after Gemini, before any paid key. **API, $0.** Free tiers may train on inputs: no client PII.
7. **Second opinion — Gemini, 1 in 20 filing suggestions.** **API, free tier = $0** (≈25 checks/night).
8. **Paid backup — Grok / OpenAI API keys.** Only if Gemini fails AND a cost estimate is APPROVED.
   Blocked by code otherwise. **API, $0 unless approved per run.** (Grok key noted DEAD in the panel.)
9. **Local fallback — Ollama on the PC.** **LOCAL, $0** (unreliable under low RAM, RI-038).
10. **Planner emails — x.ai Automations (Daily Planner, Weekly Review).** **SUBSCRIPTION** (Grok plan;
    tier NEEDS JORGE).
11. **OpenRouter.** **ON HOLD** — $10.80 one-time top-up, not approved (GW-0001).

**Projected new monthly spend: $0 at planned volumes, ceiling ~$15/month** only if the free limit is
exceeded and Jorge approves paid overflow.

## The flow (one direction, one step at a time)
1. Jorge asks (any window).
2. Cloud writes the task + proof rule into WORK-QUEUE (the repo is the mailbox; nothing lives only in chat).
3. Cloud runs the cost gate: SUBSCRIPTION/LOCAL → go; API paid → `approvals/<RUN-ID>.md` for Jorge.
4. Desktop does ONE step, writes proof to TO-CLOUD.md, stops, asks "next step?".
5. Screen-only steps go to Cowork; passwords/consent go to Jorge.
6. Cloud checks the proof, marks DONE / BLOCKED in OPEN-ITEMS, queues the next step.

## Known gap
Cloud cannot message the desktop directly yet (SendMessage: "not reachable", RI-031, 2026-09-29),
so step 2→4 still needs Jorge to paste a short pointer. That is the last piece keeping him in the middle.
