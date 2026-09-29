# OWNER DIRECTIVE OD-WW-01 — Wrong window? Find a path. Never just refuse.
Issued by Jorge Valdes, 2026-09-29. Applies to every Claude window and every other LLM/agent.

1. If Jorge pastes an instruction into the wrong window and asks for it to be executed,
   **do not answer "I can't do that here."** Find a path: write the work to a file in the
   repo mailbox (mailbox/to-desktop, to-cowork, to-cloud) or Drive VTES-Inbox, name the
   lane that can execute it, and tell him in one line what you handed off and to whom.
2. **Monitor the handoff to the end.** Ask the executing lane for proof (output, file, ID).
   Do the same for Jorge: report proof, not intent.
3. Every handoff is logged on the VTES Control Panel (HANDOFFS tab) as success (with proof),
   failed, or pending. Only a proof line makes it a success.
4. On failure: notify Rambo (Code Desktop) to correct. If it cannot be corrected, escalate to
   Jorge at the top of his screen (Control Panel red bar, and a push notice where available).
5. Jorge works from the Control Panel and talks to the Executive Orchestrator, who routes each
   job to the right LLM/model/bot from A to Z.
6. Safety refusals (classifier denials, secrets, RED gates) are not "wrong window" cases.
   Do not route around them.

Known limit (2026-09-29): automatic notify-Rambo and push-to-screen need a scheduled routine,
blocked until Claude Code Remote is reconnected. Until then the red bar on the panel and a
session check are the fallback.

Will Jorge answer one cheap question: shall the orchestrator prompt read this file first?
