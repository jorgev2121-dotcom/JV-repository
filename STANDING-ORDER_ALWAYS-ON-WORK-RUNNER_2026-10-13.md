# STANDING ORDER — Always-on work runner, throttled (2026-10-13)

**Owner words (Jorge, 2026-10-13):** "Set it to run. And throttle bandwidth, RAM, with all pending tasks, so that we are always working, to never fall behind and/or get caught up."

This replaces the panel-only builder. The trigger is trig_01EdLXoKjFM3nNsVywHHYz7T, now named "VTES always-on work runner (hourly)". It runs every hour at :41.

## Objection (Rule 3) and how this order handles it

Running everything at full speed can burn through the usage limit. Then *everything* stops, including the mail watch and urgent client work. That is why this order has a throttle instead of an "always maximum" setting.

## The throttle (checked at the start of every run)

1. **Budget:** read `rate_limit_info` from `get_session` (no session id).
   - **"allowed":** full speed. Up to **4 items** this run, in parallel, one helper (Agent) per item.
   - **"allowed_warning":** half speed. **1 item.** Helpers use Sonnet or Haiku; Opus only judges.
   - **"rejected" or overage:** **pause.** Do no work items; log "paused, budget", and keep the hourly mail watch only.
2. **Cloud RAM and bandwidth:** never more than 4 helpers at once. Never download more than 25 MB per run.
3. **PC RAM:** PC jobs go to RAMBO, behind the existing CU-RAM-Guard. Never send more than 2 PC orders per hour.
4. **Paid API keys:** never use them without the cost gate (Article 5).

## Which work, in order (one queue, refilled every run)

1. **P0:** errors Jorge called out, and anything blocking a deadline in the next 7 days. The current one is Einar, which must comply by 11-16.
2. **Panel pieces:** the cloud pieces in `var BUILD`, highest tab priority first. Test, flip, republish (same rules as STANDING-ORDER_PANEL-BUILDER).
3. **GREEN items in OVERNIGHT-QUEUE.md** that are not marked DONE. Examples: HASHTAG-PEOPLE, the BAK-RENAME plan, the OneDrive duplicate report, the people index.
4. **GREEN items in OPEN-ITEMS.md** that the cloud can do.

**RED items are never run:** filing, moving, renaming or deleting client documents; outbound email to third parties; spending; credentials. Prepare them only, and list them for Jorge's morning yes.

## Every run

- Each helper writes its result to a file **the moment it finishes**.
- Append one line to `control-panel/BUILDER-LOG.md`: time · budget status · items done "N of M" · panel "N of 116 (P%)" · queue depth · anything blocked and why.
- **Keep the queue at least 12 hours deep** (NIGHT-PROTOCOL rule 1). If fewer than 12 items are queued, the run's last item is refilling the queue from OPEN-ITEMS.
- Message Jorge **only** when a tab reaches 100%, a P0 item is done, something is blocked, or the budget pauses the runner.
- **Commit and push** every run.

## Addendum 2026-10-13 14:40Z — the cloud runner takes the stuck Cowork and Grok lanes

Jorge confirmed: "Everything is approved, and/or rerouted if stuck." The panel check shows tasks/state with 138 of 138 approved, and 10 moved to RAMBO.

**Stuck lanes found:**
- **Grok bot:** the bots were never connected (10-12 finding), so nothing ever picks up these items.
- **Cowork:** nothing hands Cowork its items automatically.

**Rule from now on:** every APPROVED task in the Cowork or Grok lane is work for this runner. The runner works on Claude Max, a flat fee, so there is no API cost and no quote needed.

Queue position: after P0 and the panel pieces, before the OVERNIGHT-QUEUE items.

The same RED limits apply: it prepares filing, outbound mail and spending, and never executes them. It writes the result per task, and updates the task's log in tasks/state by merging, never replacing.

## Addendum 2026-10-13 14:55Z — capsules are priority 1 after P0
Each run, build up to 4 job capsules per STANDING-ORDER_ENCAPSULATE-EVERY-JOB_2026-10-13.md, one helper per job, until all 40 are done. Panel pieces come after.

## Addendum 2026-10-13 15:10Z — the runner processes owner DECISIONS (RI-049 Tier 2)
Each run, read control-panel/DECISIONS-CENSUS_2026-10-13.md. Take up to 4 OPEN decisions marked CLOUD-DOABLE, one helper each. Carry out exactly what Jorge decided. Write runner-results/DECISION_<id>.md with proof, plus a NEW Drive file EXECUTED_CLOUD_<decision file name> in VTES-Outbox so the PC never redoes it. Bundle the PC ones into a single desktop order (at most one per hour). Put RED ones on the morning list. **Do not message Jorge per batch: one summary at 6 PM ET (his choice).**

## Added 2026-10-14 (owner yes A-20260929-07, via panel 10:38 AM)
- Every 4th hourly cycle (runs at 00:41, 04:41, 08:41, 12:41, 16:41, 20:41 UTC): re-check every link in MY-DESK LINK-REGISTER (v2) and write a NEW LINK-CHECK-LATEST_<date>_<HHMM>.md (count N of M OK + any broken). Tell Jorge only if a link breaks.

## Added 2026-10-15 · JOB PER COST, in dollars (owner: "job per cost, in dollars, not tokens") and cheapest-first
1. Before each job: read get_session usage.cost_usd. After it: read it again. Write one doc to the panel db `costs` {at, job, result ("done ..." / "blocked ..."), lane, usd = after - before, proof}. One job, one row. Never estimate; use the meter.
2. Cheapest first: free tools and PC scripts first, Haiku helpers, Sonnet if needed, Opus for judgment only. No new helper agents until Sat 10-17 noon without Jorge's yes.
3. Other assistants (Gemini, ChatGPT/Codex, Grok) log their jobs in the same table when they report, so all are judged the same way.
