# 05 - Build task 1: the Token + LLM Monitor (one agent, owner directive 2026-09-23)

**Why:** Jorge was left stranded more than once when an AI hit its limit mid-task (the 2026-08-26
Claude weekly limit at 99%; LiteLLM flapping, RI-038). The monitor was specified as the "FOREMAN" in
`../ROUNDTABLE-CHANNEL.md` (2026-08-26) and TRK-2026-9949, but **it was never built**. It is ONE agent
that does both jobs:

## A. Fuel (tokens / usage limits)

1. Keep one ledger file, `LLM-FUEL-LEDGER.md` (Drive mailbox + repo). For each AI: plan, limit type
   (weekly / daily / credits), used %, reset time, source of the number, and when it was last checked.
2. Sources:
   - Claude: `ccusage` on the desktop (WORK-QUEUE item 14, PASTE-D-051) and the claude.ai usage page.
   - Grok and ChatGPT: their account usage pages.
   - Gemini: AI Studio quota.
   **If a number cannot be read, mark it UNKNOWN. Never guess.**
3. **Staged thresholds, not one cutoff:**
   - 70%: warn in the roundtable.
   - 85%: the role holder writes a state snapshot (`HANDOFF/02-WORK-IN-FLIGHT.md`) after every task.
   - 95%: hand the role to the next AI in the roster.
4. **Never swap in the middle of judgment work** (a legal document, a client email). Finish the step,
   snapshot, then swap.

## B. Health (is each AI and route actually answering?)

1. Every 15 minutes, send each route a tiny test prompt: Claude cloud, the desktop via the mailbox
   ACK time, Cowork, Grok, and any local router. Record the answer time.
2. **Alive means it answered, not that its process exists** (RI-002). Three silent checks in a row
   means DOWN: log it and route around it.

## C. The roster (who takes over from whom)

1. Orchestrator: **Grok** (Jorge's choice, 2026-09-23). Backup: Claude (Opus). Second backup: ChatGPT
   or Gemini.
2. Executors (they touch files and the PC): Claude Code desktop, then Codex CLI (install pending
   Jorge's sign-in).
3. Consultants: Claude, ChatGPT, Gemini, plus a light model (Claude Haiku / GPT mini / Gemini
   Flash) for cheap bulk work.

## D. Done means

1. The ledger updates at least twice a day, with a timestamp.
2. One real forced handoff has been tested end to end, and the next AI continued from the files
   without asking Jorge anything.
3. Jorge gets a one-line daily status: who holds the role, the fuel %, and who is DOWN.
