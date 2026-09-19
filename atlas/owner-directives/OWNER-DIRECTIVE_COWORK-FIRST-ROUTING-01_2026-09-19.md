# 🤝 OWNER DIRECTIVE — COWORK-FIRST ROUTING (OD-COWORK-FIRST-01)
**Ratified by Jorge 2026-09-19 · TRK-2026-9800 family · applies to every seat.**

## The directive (owner's words, paraphrased)
**Default to handing a task to Cowork or a bot — anything that can take it A-to-Z — because they finish end-to-end. Code (Cloud/Desktop Claude Code) tends to DRIFT and never finish. Use Code only when special circumstances make it the more practical tool.**

## Why (owner's reason)
The failure mode being routed around is **completion**, not capability. Cowork and bots carry a task from start to finish; Code has a history of drifting mid-task (the context-exhaustion / RI-005 / Rule-5 pattern). **A task that finishes beats a task that's done "better" but never ships.**

## The rule (sharpened — capability-based, per Cloud's objection, owner to confirm)
**Route each task to the seat that can carry it A-to-Z for THAT task:**
1. **DEFAULT = Cowork / bot** whenever it can own the task end-to-end (research, drafting, report assembly, standalone deliverables).
2. **Code ONLY when its powers are actually required:** repo commits + git, spawning subagents, or work that must land in the repo/Drive with version control.
3. **RAMBO (Desktop Code) stays the ONLY seat that touches the PC** (Rule 10) — unchanged; PC/1Password/portal/OCR/Tray work is RAMBO by necessity, not preference.
4. **When Code MUST be used, its anti-drift is mandatory:** Rule 5 fan-out (one subagent per item) + write each result to a file the moment it completes. No single Code session grinding a batch in sequence.

## The one open risk (flagged, not assumed)
**Cowork's repo/Drive board access is UNCONFIRMED** (INTEGRATION-MAP Tier 2). A Cowork task that can't save its output to the board would break the durability rule (charter §10). **Before Cowork-first is fully trusted, confirm Cowork can read AND write the repo or Drive.** Until then: Cowork-first for deliverables it can hand back (file/paste), Code for anything that must be committed.

## How each seat routes going forward
- On any new task, the receiving seat asks: **"Can Cowork/a bot own this A-to-Z?"** If yes → hand it off. If it needs repo/git/subagents → Code. If it needs the PC → RAMBO.
- The handoff still follows the mailbox + register pattern so nothing lives only in a chat.

*Footer: TRK-2026-9800 · v1 · p001 · 2026-09-19 · original · OD-COWORK-FIRST-01 · #routing #cowork-first #anti-drift #JorgeValdes*
