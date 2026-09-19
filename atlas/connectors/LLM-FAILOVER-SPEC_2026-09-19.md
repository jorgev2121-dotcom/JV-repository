# 🔁 LLM FAILOVER SPEC — swap when one hits its limit
**TRK-2026-9800 · 2026-09-19 · ☁️ Cloud · owner: prepare + test a way to replace an LLM when it hits usage limits.**
**Owner of this at runtime: the "usage-control + handoff" agent (SCOREKEEPER / token-agent, JOB-0084 — not yet built; until then Cloud/RAMBO do it manually).**

## The trigger
An LLM returns a **limit signal**: "out of credits / usage limit reached / rate limit" (e.g., ChatGPT 2026-09-19). That seat is **BLOCKED**; do not burn owner time retrying it.

## The failover order (route the work to the next capable seat)
1. **Claude (Code Cloud / RAMBO)** — default worker; repo/git/PC powers. Primary.
2. **Cowork** — for A-to-Z deliverables (per OD-COWORK-FIRST-01), once its board-access test passes.
3. **Grok / API** — only after RAMBO fixes the retired model string (TRK-2026-9748); currently DOWN.
4. **ChatGPT** — when not blocked; currently BLOCKED until ~Oct renewal / add-credits.
5. **Gemini** — not wired (no confirmed plan/key).

## The rule
- **Match the task to a seat that is (a) not at its limit and (b) capable A-to-Z.** Never hand a blocked seat more work.
- **Log the swap** in the register + the provider's spec status line, so the blocked window is visible and we don't retry.
- **Stay within plan limits (owner intent):** prefer the cheapest capable seat; API delegation = metered new spend (OD-BUDGET-01). Don't add credits/upgrade without an owner RED click.

## Status flags (live)
- ChatGPT = **BLOCKED** (out of credits, ~Oct renewal). Grok-API = **DOWN** (retired model string). Cowork = **PENDING TEST**. Claude = **PRIMARY/active**. Gemini = **not wired**.

## TEST CHECKLIST (TEST-BEFORE-SHIP — who runs each)
| # | Test | Runs on | PASS/FAIL |
|---|---|---|---|
| F-1 | Detect a limit signal and mark the seat BLOCKED in its spec | usage-control agent / Cloud | pending |
| F-2 | Re-route the blocked task to the next capable seat, work completes | Cloud + Cowork | pending (needs Cowork test) |
| F-3 | Grok-API reachable after model-string fix | RAMBO | pending (TRK-2026-9748) |
| F-4 | No retries against a blocked seat for the full block window | usage-control agent | pending |

## RED / GREEN
- GREEN: detecting limits, routing to a non-blocked seat, logging.
- RED: adding credits, upgrading a plan, creating a new paid API account.

`TRK-2026-9800 · v1 · p001 · 2026-09-19 · original · #llm-failover #usage-control #handoff`
