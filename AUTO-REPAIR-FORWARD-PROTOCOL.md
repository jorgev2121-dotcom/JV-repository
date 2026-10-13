# AUTO-REPAIR-FORWARD PROTOCOL — find it, forward it, tell Jorge

**Owner directive OD-AUTO-REPAIR-01, Jorge Valdes, 2026-10-10 (his words):**
> "When something like this is detected, it is to be automatically forwarded to Rambo or an equivalent executor so it may be fixed. The owner should be notified of what's happening and that proactive action has been taken, and report back status of projected completion of repairs."

**Applies to every LLM and agent:** Claude Code (Cloud and Desktop), Cowork, Chat, iPhone, Codex, Gemini, Grok, and every bot.
#auto-repair #standing-protocol #JorgeValdes

## Section A — The rule in four steps

1. **Detect.** Any agent that finds something broken, not installed, stale, or never run (a dead task, a missing install, an approved order never executed, a status that lies) has found a repair.
2. **Forward at once. Don't ask first.** Send the repair to the executor that can do it:
   - Something on the PC → **RAMBO**. Use a direct message to the live "Jorge-PC" session if it shows LIVE on the CONNECT page. If not, write an order file in Drive VTES-Inbox.
   - If RAMBO is down → Codex, with the same order file.
   - Repo, pages or cloud → Cloud Code.
3. **Track it.** Add a task to the panel TRACKER (artifact 321Zo6, collection `tracker`) with assignee, urgency, `build_due` (the projected completion) and test hours. Something Jorge called an error is P0.
4. **Tell Jorge, in one short note:** what was found, who it was sent to, and when it should be fixed. It's a notice, not a question for permission. It goes in the chat he is using, plus the tracker.

## Section B — The one limit: GREEN and RED still apply

- **GREEN repairs** (read-only checks, new files, re-running something he already approved) are forwarded and done with no further step.
- **RED repairs** (installs, deleting, moving client files, anything outbound, spend, credentials) are still forwarded at once. But the order says **"needs Jorge's yes"** and the note to Jorge asks for that one word. A RED repair he has already approved in his own words (like PASTE-D-065) counts as GREEN when re-sent; quote his words in the order.
- **Why the limit stays:** a cloud session's install order was blocked once (2026-10-09) because no owner words were attached. Quoting his approval is what makes the forward go through.

## Section C — Proof

A repair is DONE only when the executor's receipt (EXECUTED_ with verify output) is on file and the tracker gauge reads 100% with a proof line. Without a receipt it stays IN PROGRESS on the tracker, past its due time in red. It is never dropped.

## Section D — First use

2026-10-10 15:35Z: Cloud found PASTE-D-065 (RC watchdog) never run. It was forwarded to RAMBO by direct message with Jorge's words. Tracker T-20261010-07.

Footer: AUTO-REPAIR-FORWARD-PROTOCOL · v1 · 2026-10-10 · CURRENT · #auto-repair
