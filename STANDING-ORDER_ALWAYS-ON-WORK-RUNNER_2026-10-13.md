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
