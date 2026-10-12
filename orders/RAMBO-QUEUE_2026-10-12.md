# RAMBO QUEUE — 2026-10-12 (master list, updated by the cloud each time an item finishes)
**The full A–Z overnight plan with lanes and target times: orders/OVERNIGHT-RUN-PLAN_2026-10-12.md. Follow that order.** New since the list below: RAM guard (plan item C, tools/ramguard) and the panel feeder (plan item F, tools/panel). Rambo 1 may run 2 items at once ONLY on different folders, each holding C:\AI\state\LOCK_<item>.lock.

Lanes: Claude and Codex only (Jorge, 2026-10-12).
- RAMBO 1 = Claude, on the PC. Runs ONE order at a time, so two sessions never edit the same file (RI-048).
- RAMBO 2 = Codex, on the PC. Non-client work only, with no Drive access.
- CLOUD = this session. Checks every hour, relays proof, and re-sends anything Codex swallows.

## Rambo 1, in this order (one after another)
1. Raise the Claude run counter from 12 to 40, and switch only on real limits. SENT 01:08Z. Status: WAITING (counter resets at midnight ET)
2. **Control panel (CRITICAL):** step 0 finds Copilot's design on the PC (asks Copilot directly, plus a disk search), screenshots every candidate, and STOPS for Jorge to pick. Then it wires the picked design: feeder every 2 minutes, stale tiles in red, desktop shortcut. v2 SENT 01:23Z + ADDENDUM-1 01:24Z (Copilot = Microsoft Copilot app; it may exist only inside the chat). Status: WAITING
2b. **OCR running 24/7 on the free lane (NEW):** Rambo 1 builds one Windows task that OCRs every PDF in the job folders, around the clock, at zero AI cost. It writes a heartbeat every 5 minutes and shows on the panel. HELD
3. **Joey / Grok bots check (NEW):** find out whether Joey can receive work at all (a watched folder, a command line, chat only, or an API key), then send one test. Read-only. HELD
4. Split the work into Rambo 1 and Rambo 2 lanes, plus two panel tiles. HELD (sent automatically when 1 proves Claude is back)
5. Usage governor: check what exists, then build the real-limit switch, the usage log and the heartbeat. HELD
6. Orange Tree live deploy, v3: OCR, the big red timestamp and alerts. HELD
7. File the 32 remaining email attachments. HELD
8. Desktop and taskbar AI icons: inventory and screenshot, then one proposed clean layout. Nothing is moved until Jorge says yes. HELD
9. 1Password "one source of truth" and sign-in status: read-only check of the CLI switch and the duplicate Copilot account entry. Finish what the PC can do alone; name the one owner click only if it is unavoidable. HELD

## Running at the same time (parallel)
- CLOUD, all night: relays each proof to Jorge by phone and email, re-sends any order Codex swallows, and alerts if the panel or governor heartbeat stops.
- RAMBO 2 (Codex): nothing queued. Every order above needs Drive or client files, which Codex can't touch.
- Why Rambo 1 does not run two at once: two Claude sessions on the same PC collided on a live email on 09-28 (RI-048). One at a time is slower but safe.

## Expected timing (estimate, not a promise)
Items 1–2 by about 1 AM ET. Items 3–5 by about 3:30 AM. Item 6 by about 5:30 AM. Item 7 by about 7:30 AM.
