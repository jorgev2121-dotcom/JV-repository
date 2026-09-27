# Gateway decision — one endpoint for every LLM, agent and bot
**2026-09-27 · cloud · RI-038 (logged 6+ times) · related: TRK-2026-9952f (agent handoff)**

## The ask (Jorge, 2026-09-27)
LiteLLM as the single gateway for all LLMs, agents and bots; wire every provider; agents hand
off to each other through it; leave it running unattended.

## Objection (Rule 3) and recurrence gate (Rule 4)
1. **Self-hosted LiteLLM on the PC is RI-038**: 7+ SOS alerts on 09-23 alone, 4 flap windows,
   two failed revival directives, root cause = low RAM + watchdog killing slow starts.
   Patching it again is Tier 1 on a logged recurring issue — a charter violation.
2. **Earlier today Jorge dropped the LiteLLM-in-front-of-Claude-Code plan** ("breaks RI-038 and
   risks per-token billing"). Putting *every* agent behind it is the same risk, larger.
3. **A router does not do agent handoff.** LiteLLM only forwards model calls. It carries no
   sessions, context or tasks between agents. Handoff has to live in a shared place that
   survives restarts; the repo mailbox and Drive VTES-Inbox/Outbox already do this.

## Three options, ranked by durability
- **Tier 1 — revive self-hosted LiteLLM on the PC.** Fails the way it already failed (RAM,
  watchdog). Lifespan: days. **Not proposed.**
- **Tier 2 — remove the router.** Each bot calls its provider directly with a try/fallback
  (Grok → Gemini → local Ollama), verified by a real round-trip. Nothing extra to go down.
  Lifespan: permanent. Downside: no single endpoint.
- **Tier 3 / replace — a hosted gateway (OpenRouter).** One URL, one key, hundreds of models,
  failover run by the vendor, not on the PC. Meets "one endpoint" durably. Downside: a
  ~5% fee on pass-through spend; needs a signup + card (RED — Jorge's yes).

## Recommendation
**Hosted gateway (OpenRouter) for bots and night runs; Claude Code stays on the flat-fee Max
plan with no router in front (Jorge's decision of today stands). Handoff stays in the
repo mailbox / VTES-Inbox, which every agent already reads (AGENTS.md, GEMINI.md).**
Local Ollama remains the free last fallback.

## What is waiting
- One yes/no from Jorge on the recommendation (signup + card are RED).
- Once yes: desktop lane creates the account key on the PC, stores it in 1Password (never in
  chat or the repo), points bots at `https://openrouter.ai/api/v1`, and proves each bot with a
  real round-trip — not a /health ping.
