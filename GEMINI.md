# Read CLAUDE.md first — it is the operating charter for EVERY agent, not only Claude.

Any AI working in this repository (Claude, Codex, Gemini, Copilot, Cursor, or any other) follows `CLAUDE.md` in full.
It is written for Claude, but every rule applies to you unchanged. That includes the window banner, ending every message with a question, TRK numbering, and GREEN/RED.

**Taking over a role mid-stream? Read these, in this order:**
1. `CLAUDE.md` — the rules.
2. `OPEN-ITEMS.md` — what is in progress or blocked right now (newest rows at the bottom).
3. `mailbox/to-desktop/WORK-QUEUE.md` — the desktop executor's queue.
4. `LLM-HANDOFF_2026-08-26.md` — who Jorge is and how the roles fit together.

The state lives in these files, not in any agent's memory. That is what makes the role replaceable.

**Sending a job to the PC through Drive (`VTES-Inbox\MSG-CLOUD-TO-CODE_*.md`)?** The PC's headless executor
accepts only two exit files: `VTES-Outbox\EXECUTED_<exact job filename>` or `VTES-Outbox\BLOCKER_<exact job filename>`.
Any other name counts as FAILED-VERIFICATION (TRK-2026-9952l). Always put that exit contract in the job.

#TRK-2026-9952f
