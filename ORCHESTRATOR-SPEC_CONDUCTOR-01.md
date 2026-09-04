# SPEC — THE CONDUCTOR: a deterministic, always-on local orchestrator (redundancy for an expensive brain)
**TRK-2026-9775 · drafted by ☁️ CLOUD 2026-09-04 · owner ask: redundancy for Claude (expensive + gets locked out); an orchestrator that watches time/tokens/subscriptions and keeps working without extra spend; an overnight runner.**
**BUILD AFTER the loop is proven once (Rule-10 sequencing). This is the "prove-the-loop + watchdog" foundation, not a new autonomous agent.**

## The core principle
**The always-on part is dumb code with NO LLM. The brains are swappable.** A Claude lockout or a hit cap
must change *which worker runs*, never *whether work runs*. The Conductor is PowerShell/Python on RAMBO's
PC — it costs zero tokens to run and is never itself rate-limited.

## What the Conductor is (and is NOT)
- **IS:** a local scheduler + monitor + queue-runner + failover router. Deterministic. Always on.
- **IS NOT:** an autonomous Claude agent roaming overnight. That is the expensive, silent-failure-prone
  thing to avoid — it would hit the same lockout and burn the same budget.

## Four parts
1. **Budget & availability monitor.** Tracks measurable API $ spent today per provider vs OD-BUDGET-01
   ($40/day), the clock, and which brains answer a health-ping (Claude? Grok? none?). Writes a live
   `CONDUCTOR-STATUS.md`. **Honest limit:** there is no clean API to read how much of a Claude *subscription*
   is left — so the monitor **reacts** to a lockout (a call returns a usage/rate error → fail over) and
   **caps measurable API spend**; it cannot predict the subscription meter in advance. Reactive failover +
   a hard spend cap is enough to "keep working all the time."
2. **Queue runner.** Pulls the next GREEN item from `OVERNIGHT-QUEUE.md`, picks the **cheapest capable
   worker**, runs it, and **writes the per-item result the moment it completes** (a kill at item 40 leaves
   39 results, never zero — Rule 11).
3. **Liveness watchdog.** Detects a hung run by **output-file growth, not process existence** (RI-002);
   after 3 stale cycles it kills, logs, and advances. This is the SCOREKEEPER's job too — see below.
4. **The failover ladder — this is the redundancy.** When Claude is locked out or near a cap:
   1. **Run code-only work first** — OCR, scraping, counting, filing-prep, report generation. **Zero LLM.**
      Most of the backlog is this; it never needs Claude at all.
   2. **Judgment work → Grok API** (a different provider, unaffected by a Claude lockout).
   3. **If no brain is available**, park the LLM item, keep running code items, and note it. **Never halt
      the night.**
   - **Everything RED still waits for the morning click.** The Conductor prepares; it never executes an
     irreversible action.

## How it answers each of your three asks
- **Redundancy for an expensive main actor:** Claude becomes *one interchangeable brain*, not the spine.
  The spine is free local code + a cheap fallback brain.
- **Orchestrator watching time/tokens/subscriptions:** part 1, the monitor, with the honest limit stated.
- **Overnight agent when you're away:** parts 2–4 — but as a deterministic runner renting a brain by the
  sip, inside RED/GREEN, not a free-roaming autonomous LLM.

## Build order (incremental — it extends the heartbeat RAMBO already built)
- **Phase 0 (done):** heartbeat + repo sync + RED/GREEN default.
- **Phase 1:** the monitor + `CONDUCTOR-STATUS.md` + the cheapest-worker router (local PowerShell/Python).
- **Phase 2:** wire Grok API as the fallback brain (already in motion) + the code-only long-run queue.
- **Phase 3:** the SCOREKEEPER verifier rides on top — proves "done" is really done, catches silent deaths.
- **Gate:** Phase 1 starts once the two-way loop is proven once (your GitHub sign-in) so the Conductor can
  report what it does.

## Why this hasn't been built before (recurrence note, Rule 4)
Discussed many times, never built, because (a) the build-freeze (lifted OD-THAW-01), and (b) the desktop
couldn't even pull work orders across the branch conflict — the foundation didn't work. **Both are now
fixed.** This is the first time the base exists to build it. Build it as deterministic code (Tier-2/durable),
not as another Claude agent (Tier-1, decays and gets locked out).

**Is this the shape you want — a dumb always-on Conductor with swappable brains and a code-first failover — before I turn it into RAMBO's build order?**

#TRK-2026-9775 #conductor #orchestrator #redundancy #failover #overnight #no-LLM-spine #RED-GREEN
