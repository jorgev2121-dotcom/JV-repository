# ROUNDTABLE PROTOCOL — how work moves between LLMs when one of them fails
**TRK-2026-9910-B · v1 · 2026-09-30 · #roundtable #dispatch #handoff #budget #governor #PASTE-X**

**Answer first: build and install jobs now pass automatically down a fixed line — Desktop (RAMBO), then Codex, then Cowork, then Grok Bots — whenever the one ahead is red, silent, or out of room. The builder never checks its own work; a different company reviews it.** One honest limit: a subscription chat window cannot be pushed to. "Automatic" means the job sits in a shared folder and whichever agent polls that folder picks it up. Only agents that can run on a timer (Codex CLI, Gemini CLI, Claude Code, a Cowork scheduled task) can poll today.

## Section A — What already exists (do not rebuild)
1. **The Board of 5** (BOARD-STRUCTURE_v1): motions in, votes back, 3-of-5 carries when Jorge is silent. Hard gates (passwords, UAC, payments, sends) are never voted.
2. **The Drive floor**: VTES-Inbox (orders in), VTES-Outbox (proof out), 00-CONTINUITY-BOARD (mirror of all board traffic).
3. **The Governor** (token manager) on the PC: hourly task CU-Governor-Hourly, monthly re-map, spending status. It watches **dollars**. Nothing watched **subscription room** or duplicate charges until the Budget page.
4. **CU-Bus-Dispatcher** (API courier from July, keys in Windows Credential Manager): metered billing. Under the 9/30 rule it stays priced-first, sent to Jorge to approve.

## Section B — The new piece: dispatch cards
A card is one small markdown file: `dispatch/D-NNN_<topic>.md` in the repo, mirrored to `VTES-Inbox/DISPATCH/`. Numbers are plain counters (DISPATCH-001, 002…). They are **not** TRKs.
Every card carries: who it is from; the **assignee line** (ordered, from the Budget page); the task in Jorge's words; **done-when with proof**; who **reviews** (a different company than the builder); the **ACK deadline**; the forbidden list; rollback.

**States:** OPEN → ACKED → WORKING → DELIVERED → VERIFIED (or REJECTED) → CLOSED. A card moves only by writing a file beside it: `D-NNN.ACK_<agent>.md`, `D-NNN.RESULT_<agent>.md`, `D-NNN.REVIEW_<agent>.md`.

## Section C — The automatic hand-off rule
1. Assign by the router (Budget page): job type, then skip anything red, not signed in, not set up, or out of room.
2. **Build and install line:** Desktop (RAMBO) → Codex → Cowork → Grok Bots.
3. **The card moves down one place when any of these happens:** the assignee's tab is red (no sign of life for 24 hours); no ACK within 30 minutes (PC agents) or 2 hours (others) of the card being posted; the assignee is out of room (under 10%).
4. **Maximum two hops.** After two failed hops the card comes back to Jorge with a WORKAROUND-CERT: what was tried, why each failed, the smallest action for him.
5. **Nobody marks their own card VERIFIED.** The reviewer is from a different company, reads the proof file, and runs the self-test named on the card.
6. **If builder and reviewer disagree,** a motion goes to the Board. Three of five carries when Jorge is silent; Jorge's word overrides at any time.

## Section D — What works today, and what does not (three levels)
1. **Level 0 — works now:** Jorge carries the card (the launcher's handoff packet or a PASTE block). Always available.
2. **Level 1 — needs one sign-in:** Codex CLI polling the Inbox on a timer. Codex is installed; it waits for Jorge's ChatGPT sign-in.
3. **Level 2 — unverified:** a Cowork scheduled task that reads `VTES-Inbox/DISPATCH/`. Needs Cowork to confirm it can schedule and read Drive.
4. **Level 3 — unverified:** Grok Bot. xAI says bots get their own computer and can sign in to tools (included with SuperGrok since 8/27). Not set up. Whether a bot can watch a folder is not confirmed.

## Section E — Why builders fail and what this changes
The 9/30 record shows the PC session silent since about 9/24, a drop that was never ACKed, and three "DONE" claims that were receipts only. So: **ACK first** (an ACK stamps the heartbeat), **proof or it is not done** (fingerprints, self-test lines, screenshots), **a verify script** (Verify-VtesPanel.ps1) that catches a wrong character the same day, and **a second company reviews**.

## Section F — Forbidden on any card (RED, never delegated)
Sending mail, spending, cancelling a plan, deleting or filing a client document, editing the TRK registry, entering a password, passing a CAPTCHA. A card that needs one stops at BLOCKED and names Jorge's smallest action.

Cards written today: D-001 (Codex: install and schedule), D-002 (Cowork: Tyler family, six jurisdictions), D-003 (Grok Bots: eTRAKiT family, waiting on setup), D-004 (Cowork: two web searches cloud cannot run).

Should the cards go out as written, or do you want to read D-001 first?
