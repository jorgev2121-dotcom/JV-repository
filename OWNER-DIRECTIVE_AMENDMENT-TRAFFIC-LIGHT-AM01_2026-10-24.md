# OWNER DIRECTIVE AMENDMENT OD-AM-01 — Repetitive work runs as self-healing flows; the traffic light decides who handles a failure

**Issued by Jorge Valdes by voice, Plaud recording of 2026-10-23 (id `of_b435867f44e6440281618e90e5551261`, minutes 7:16 to 8:19). Rewritten in Claude's words and adopted 2026-10-24.**
**It is an AMENDMENT TO ALL owner directives and protocols, present and future, as Jorge ordered. Name checked: `OD-AM-01` was unused.**

#OD-AM-01 #amendment #traffic-light #self-healing #PAD #JorgeValdes

---

## Section A — Jorge's words, in plain language

Everything he does is repetitive. So any repetitive job should become an automatic flow (a bot, a PowerShell scheduled task, or a Power Automate Desktop flow). The flow should repair itself when it can. When it fails anyway, a real agent takes the failure. The traffic light decides who:

- **GREEN and YELLOW:** the agent handles it.
- **RED:** the agent stops and hands it to Jorge.

## Section B — The amendment (applies to every other directive)

**1. Build the flow, not the chore.** If a job has been done by hand or by an agent twice, the third time it becomes a scheduled flow. The agent proposes it with a one-line reason, builds it, and logs it in `OVERNIGHT-QUEUE.md` or the flow list. Jorge is never asked to do a repeat task twice.

**2. Every flow has four parts.**
- **Run:** does the job and writes a result per item the moment it finishes.
- **Heartbeat:** proves it is alive by output growth, not by the process existing (RI-002). Three cycles with no growth = hung.
- **Self-heal:** the known repairs are scripted: retry with backoff, restart the task, re-read a stale file, skip and log a bad item, switch to the backup route. Each repair is logged with time and what it fixed.
- **Hand-off:** when self-heal fails, the failure goes to an agent, then, by color, possibly to Jorge.

**3. The traffic light.**
- **GREEN** = reversible and inside the directives: reading, counting, creating a file that did not exist, retrying, restarting. The flow or agent just does it and logs it.
- **YELLOW** = reversible but with a side effect worth a look: a re-run that overwrites a derived file (with a `.bak-YYYYMMDD` copy first), a changed schedule, a skipped bad item, a Drive Doc created in Jorge's own folder. The agent does it, writes a one-line note in the daily digest, and keeps the undo path.
- **RED** = anything the charter already marks RED, or hard to undo: filing, moving, renaming or deleting client documents, anything outbound (send, post, submit), spend or signup, credentials and passwords, registry edits, deleting a recording. **The agent stops, prepares the decision, and asks Jorge with the smallest possible question.** A RED item never waits silently: it is put in the red bell and the daily digest.
- **If the color is unclear, treat it as RED.**

**4. Agents, not blame.** An "authentic agent" means a real, logged agent session that attempts the repair and reports what it tried. A failure that nobody attempted is a charter fault.

**5. PAD honesty clause (charter Rule 3).** Power Automate Desktop flows are recorded with clicks, need a signed-in screen, and break silently when a window changes. Therefore: **prefer PowerShell scheduled tasks and Drive routines; use PAD only for steps that need a click on a screen that has no other door.** Any flow, PAD or not, still needs the heartbeat. The cloud cannot build or test PAD flows or Windows tasks; it writes the spec and marks the result **unproven on Windows** until the desktop shows output.

**6. Three honest states still apply.** A flow is DONE only with output as proof, BLOCKED with what was tried, IN PROGRESS with what remains.

**7. Precedence.** This amendment applies on top of OD-01, OD-CR-01, OD-WW-01, OD-API-01, OD-PL-01 and all earlier directives. Where a directive says "an agent never sends", "no per-token spend without a quote", or "filing is RED", that stays RED. The amendment never turns a RED action GREEN.

## Section C — First flows covered

1. Plaud intake (OD-PL-01).
2. Capture-and-review (OD-CR-01): the capture is GREEN, the Outlook draft is YELLOW, **Send is RED and always Jorge's**.

#OD-AM-01 #amendment #traffic-light #self-healing #PAD
