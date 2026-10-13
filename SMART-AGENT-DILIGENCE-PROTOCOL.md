# SMART-AGENT DILIGENCE PROTOCOL — your request, your schedule, the right agent

**Owner directive OD-DILIGENCE-01, Jorge Valdes, 2026-10-10.** He called it "the most important task to complete in order to achieve one center of truth." It applies to every LLM and agent.
#smart-agent #diligence #orchestrator #budget #ocr #JorgeValdes

## Section A — The loop for every request Jorge makes, in any chat

1. **Catch it.** The task sweeper (every 2 hours, `TASK-SWEEPER-PROTOCOL.md`) finds the request and logs it on the panel TRACKER.
2. **Propose a schedule.** The task gets `status: proposed`, a done-by time, testing hours and an assigned agent.
3. **Jorge approves or changes it on the TRACKER.** "✅ Approve schedule" or "✏️ Change schedule". Either one sets `schedule_approved: true` and logs who did it.
4. **The orchestrator dispatches only approved tasks, on the approved schedule.** Two exceptions start at once and get approved afterwards: errors Jorge called out (P0), and repairs under `AUTO-REPAIR-FORWARD-PROTOCOL.md`.
5. **Proof closes it.** The gauge reaches 100% only with a receipt.

## Section B — Who does what (the smart agent and the working agents)

1. **Smart agent: Claude Opus (Cloud Code).** It frames the questions, especially about Jorge's complaints. It writes the due-diligence instructions, judges the findings, decides the fix, and writes any script.
2. **Diligence agents (cheaper; they gather facts and report back, and never decide):** Claude Haiku or Sonnet subagents in the cloud, Gemini (free) for bulk reading, LOCAL (Ollama, free) and Codex on the PC. Each one writes its findings to a file, with a denominator.
3. **Working agents (execute the smart agent's fix):** RAMBO for the PC, Cowork for screen work with Jorge present, Codex for code on the ChatGPT pool, Grok bots once a working key exists.
4. **Hand-back path:** smart agent → diligence agent (instructions) → findings file → smart agent (decision, script) → working agent (execute, receipt) → smart agent (checks the proof) → TRACKER.

## Section C — Orchestrator and budget manager pick the agent

**The budget signal is real, not guessed.** Every session record carries `rate_limit_info` (status `allowed`, `allowed_warning`, or limited). On 2026-10-10 several Claude sessions read `seven_day: allowed_warning`, which means the weekly Claude pool is getting low.

1. **Default to the cheapest agent that can do the job.** Free first (LOCAL, Gemini), then Haiku, then Sonnet, then Opus. Opus does only Section B step 1.
2. **When the Claude pool shows `allowed_warning`,** diligence moves to Gemini, LOCAL or Codex, and Opus is kept for decisions.
3. **Paid API calls** (Grok key, OpenRouter, any API) are priced first and need Jorge's yes. That rule is unchanged.
4. **Speed up when there is room:** when the pool reads `allowed` and the PC has headroom (Section D), add parallel workers. One agent per item for more than 5 items (charter Rule 5).

## Section D — OCR runs 24 hours a day, 7 days a week, until done

1. **Scope: only folders where the job number is already known from the folder path.** That is GREEN at any hour. Bulk OCR outside that scope made unattributed sidecars before (`OVERNIGHT-QUEUE.md` §0), so it stays held.
2. **A governor protects the PC, so speed never costs stability.** Add a worker only while CPU is under 60% and free RAM is over 4 GB. Drop a worker when CPU is over 85% or free RAM is under 2 GB. Pause when Jorge is actively using Outlook or dictating.
3. **The heartbeat checks that output is growing** (charter Rule 8). Three cycles with no growth means hung: restart it and log it.
4. **Report with a denominator,** for example "1,240 of 3,180 PDFs, 39%". It shows on the TRACKER gauge.
5. **First step (diligence, read-only):** RAMBO counts PDFs in scope, existing `.SEARCH.txt` sidecars, and the state of the four OCR tasks (CU-BulkOCR, CU-OCR-Intake, CU-OCR-Watch, CU-Inspections-Auto-Filing-OCR). The smart agent then writes the 24/7 runner with the governor.

## Section E — Computer stability is the first case run through this loop

1. **Diligence:** the read-only Windows deep diagnostic (sent to RAMBO 2026-10-10, tracker T-20261010-06), plus the 9 Windows problems already logged in the repo.
2. **Smart agent:** reads the report, ranks the causes, and proposes fixes by durability (Tier 2 removal first). It writes the scripts.
3. **Jorge:** approves the schedule on the TRACKER.
4. **Working agent:** RAMBO executes. Each fix is re-checked by re-running the diagnostic, so before and after are compared.

Footer: SMART-AGENT-DILIGENCE-PROTOCOL · v1 · 2026-10-10 · CURRENT · #smart-agent
