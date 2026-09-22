# 🖥️ RAMBO — RECONNECT REMOTE CONTROL (next action, top priority)
**2026-09-22 · owner: "make Remote Control RAMBO's next action." TRK-2026-9800 family. Precedes the desktop cleanup (TRK-2026-9771).**

## What "Remote Control" is (plain terms)
**Remote Control is the direct machine-to-machine link that lets the Cloud seat and the Desktop seat (RAMBO) talk to each other, and lets Cloud push a notification to Jorge's phone.** It has been **DOWN since 2026-08-09.** While it's down, Cloud and RAMBO can only pass work through files (repo + Drive), and Jorge is the hand-carrier between windows. Reconnecting it = the two seats see each other in `ListAgents` and message directly, seconds not hours, and phone push turns on.

## The task
1. On the PC, **re-establish the Claude Code Remote Control / device connection** (the same link that showed the desktop as a peer before 2026-08-09).
2. Confirm the desktop appears as a reachable peer (a `ListAgents`-style check).
3. Send one test message Cloud↔Desktop to prove the round trip.
4. Confirm phone push fires on a RED test item.
5. Report PASS/FAIL to `mailbox/to-cloud/` with what was reconnected and how.

## Why first
It's the top blocker on the infrastructure register (I1) and the highest-leverage fix — it unblocks desktop observability (heartbeat health), direct handoffs, AND phone push in one action. **Then** proceed to the desktop cleanup (TRK-2026-9771) and the Alec DD order.

## RED / GREEN
- GREEN: reconnecting the link, test messages, a test push.
- RED: any new credential, install that needs a paid account, or a settings change that touches money/client files.

## TEST-BEFORE-SHIP
Don't report DONE until the round-trip message and the phone push both actually fire — a link that "looks connected" but doesn't deliver is the RI-015 dead-sensor pattern.

**CLOSING QUESTION:** Is Remote Control reconnected, did a Cloud↔Desktop test message round-trip, and did the phone push arrive?

#remote-control #reconnect #next-action #infrastructure-I1 #TEST-BEFORE-SHIP #cloud-to-desktop
