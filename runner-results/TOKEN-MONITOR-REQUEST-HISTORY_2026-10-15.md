# Token and LLM monitor ("usage governor"): every request, and why it never went live · 2026-10-15
Sources: OPEN-ITEMS.md, RECURRING-ISSUES.md, ROUNDTABLE-CHANNEL / MODEL-SPLIT-ARCHITECTURE, OWNER-QUEUE mirrors, orders/pending.

## Requests, timestamped (8, plus tonight = 9)
1. 2026-08-26 · FOREMAN / dispatcher spec (ROUNDTABLE-CHANNEL.md) and MODEL-SPLIT-ARCHITECTURE ("should Jorge cut $200 Claude and spread it").
2. 2026-09-01 to 09-11 · OD-89 "restart the LiteLLM router so the Grok route loads" sat in the owner queue (09-03, 09-09, 09-11 mirrors). Router said to be "90% built".
3. 2026-09-23 · TRK-2026-9949 Token Monitor, dictated: hand work to another LLM before one runs out.
4. 2026-09-23 · TRK-2026-9952d tokens-to-dollars report; TRK-2026-9952 LLM-USAGE-INVENTORY built (the only piece delivered: a table, not a monitor).
5. 2026-09-26 · Cowork directive LLM-SUBSCRIPTION-MONITOR-AGENT: auto-acknowledged, never executed, 0 of 4 deliverables.
6. 2026-09-28 · TRK-2026-9412 token/LLM cost monitoring agent and TRK-2026-9416 cost optimization (9router branch orders), folded in as duplicates.
7. 2026-10-12 · "Confirm token and LLM monitor agent is in place ... rotate the LLM between roles so we don't run out." Found NOT built. Order USAGE-GOVERNOR written; it is STILL in orders/pending/ and never reached the PC.
8. 2026-10-14 · Panel plan items 102 (live token tile) and 111 (Token Monitor heartbeat): NOT BUILT, assigned to the PC.
9. 2026-10-15 · tonight, after the Fable weekly limit hit 100%.

## Why it never went live
1. Every build step was assigned to the PC lane, which was capped or stalled. The 10-12 order never left the repo: its delivery waited on a PC receipt that the capped PC never produced (circular).
2. Each repeat was filed as "same as before, folded in" instead of escalated. Nobody owned it to the end.
3. Real wall: consumer plans (Claude Max, ChatGPT, Gemini) have no usage feed, and Gemini and Grok have no wired executor, so "rotation" had nowhere to rotate to. That wall was used as a reason to stop instead of building the part that was possible.
4. The only "governor" actually built was the PC's home-made run counter, which throttled on a false limit and made things worse.

## Could tonight have been prevented? Partly, yes.
The cloud can read Claude's real weekly status every hour (get_session: "allowed_warning" since at least 10-14) and every scheduled run's failure reason. A cloud-side check needing no PC would have warned before the Fable tasks failed and moved them to Sonnet. The cloud cannot see the per-model Fable percentage directly; it sees it only when a run is refused.

## Fix, now (Tier 2, cloud-side, no PC, no new agent): selftest/CHECKS.md check 10 USAGE GOVERNOR, run every hour by WATCH.
