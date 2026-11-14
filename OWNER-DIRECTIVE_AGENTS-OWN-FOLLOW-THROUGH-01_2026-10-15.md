# OWNER-DIRECTIVE AGENTS-OWN-FOLLOW-THROUGH-01 · 2026-10-15

Jorge, 2026-10-15: *"The button which says nothing for owner as a pending open task is reporting erroneously. I monitor and click activity status at least three times a day, so no way that was my fault. That's a bug in the system. Hand it off to an appropriate agent and establish a workflow protocol so this does not come back to me again. This should be resolved by an agentic agent."*

## What went wrong
1. Once Jorge approved or tapped an item, it left "Waiting on you". Nothing then tracked whether an agent did it.
2. No scheduled check read the panel database. One request sat 5 days at "queued", 11 approvals of 10-14 have no done record, and one tap had no reply.
3. So "Nothing waiting on you" was literally true and still misleading. The stall was the agents' fault, never Jorge's.

## The rule, binding on every agent
1. **Jorge's click ends Jorge's part.** From that moment the item belongs to an agent until it is DONE with proof, or answered with a reason.
2. **Owner of follow-through: EXEC-01** (the hourly Cloud check, scheduled task "Mail arrivals + Rambo queue + panel + Orange Tree watch"). Every hour it reads the panel database: task-comments with status "new", approvals marked approved with no doneAt, and orchestrator items "queued". It does each one (GREEN), routes it (PC work goes to WORK-QUEUE, a RED step gets a one-line ask), and writes the result back (`doneAt` + `result`, or a reply doc).
3. **Service level: answered within 2 hours.** Anything older shows red on the panel's "⚙️ waiting on agents" counter and is reported as an agent fault.
4. **Auditor: the SELF-TEST** (selftest/CHECKS.md, every 6 hours), with an end-to-end probe. A failure alerts Jorge once and is fixed by the agents. Jorge is never the bug detector.
5. **The panel shows two counters, always:** "waiting on you" (Jorge's part) and "waiting on agents" (ours, with the age of the oldest).

## Known weak spot (checked against the record, 2026-10-15 02:40Z)
- This Cloud session is NOT out of usage. Its weekly meter reads "allowed, warning", resets Sat 10-17 12:00 PM ET, and it is not using overage.
- Two Cowork scheduled tasks DID fail with the stated reason USAGE_LIMIT_REACHED: the Watchdog (10-14 23:14Z) and the CDM build (10-15 01:13Z). Jorge bought a $250 credit; those runs did not draw on it. Self-test check 6 now names any run that fails like this, so it is caught from the record and not guessed.
- Rule for every agent: never state a usage or limit problem without quoting the record (get_session rate_limit_info or a run's failure_reason) and its time.
- Belt and braces: a free PC watchdog (no Claude) flags any panel item older than 2 hours. WORK-QUEUE item 28.
