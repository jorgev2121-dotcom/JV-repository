# Panel build: HANDOFFS packet builder (picker, client-data box, safe-folder rule) — 2026-10-14

Panel: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html` (edited in place, not republished, not committed).
Test: `tools/panel/test/handoffs-test.js`.

## Section A — Result

1. **BUILD now 72 of 116 = 62%.** It was 69 of 116 (59%) at git HEAD. Up by exactly 3.
2. **HANDOFFS is now at 100%** (7 of 7).
3. All five tests pass: handoffs, phone-width, menu-glossary, orphans-llms, money-lock. The older handoff-packet-test still passes too.

## Section B — What was built

1. **Task-type picker, cheapest lane.** A "Task type" drop-down with six types. Picking one fills the To lane and shows one reason line.
   - Read-only survey (no client files) goes to Local Ollama (no token charge).
   - Code / panel work goes to Codex.
   - OCR of job files goes to the Desktop executor, because the scans are on the PC.
   - Drafting and Filing prep (proposals only) go to the Cloud executor.
   - Outbound email (RED) goes to the Cloud executor, and the line and the packet say "Prepare only — Jorge's yes".
   - The four client-data types tick the client-data box by themselves, and only ever pick Claude cloud or Claude desktop.
2. **Client-data tick box and digit checker.** The box reads "This packet has client names, addresses or money".
   - While you type, the checker looks for 123-45-6789 style, 4111-1111-1111-1111 style, or any run of 9 or more digits.
   - If it finds one, a red warning shows the last 4 digits only, and Copy is greyed out and refuses.
   - Removing the number or ticking the box unblocks Copy.
   - TRK numbers, folio numbers, phone numbers and dates pass.
   - Ticking the box takes Codex, ChatGPT and Gemini off the To list, and adds a "Client data: YES · LOCAL lanes only" line to the packet.
3. **LOCAL safe-folder rule.** A green line at the top of the builder reads: "Packets with client data go only to LOCAL lanes (Claude desktop / Claude cloud) and the safe folder; never to free external AIs."

**Judgment call:** with the box ticked, Cowork, Chat, iPhone and Local Ollama stay on the To list. They are not external AIs. The picker itself still only picks Claude cloud or Claude desktop when the box is ticked, which matches the rule line.

## Section C — How the tests were run

- `node tools/panel/test/<test>.js <abs panel path> <png>` for each test.
- handoffs-test compares with `git show HEAD:` and expects +3 (69 → 72).
- orphans-llms-test expects +2, but its two pieces are already in git HEAD. So it was run with a third argument: the current panel with only its two pieces set back to 0, kept in the session scratchpad. That isolates its own +2 (70 → 72).
- Money lock: locked on all 26 tabs with 0 amounts visible, 34 masks, opens only with 0000, relocks.
- 375px and 390px: every tab fits with no sideways scroll, including HANDOFFS with the builder filled in.

Did the reason lines and the warning read clearly to you?
