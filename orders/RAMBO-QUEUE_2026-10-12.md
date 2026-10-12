# RAMBO QUEUE — 2026-10-12 (master list, updated by the cloud each time an item finishes)

Lanes: Claude and Codex only (Jorge, 2026-10-12).
- RAMBO 1 = Claude, on the PC. Runs ONE order at a time, so two sessions never edit the same file (RI-048).
- RAMBO 2 = Codex, on the PC. Non-client work only, with no Drive access.
- CLOUD = this session. Watches every 3 hours, relays proof, and re-sends anything Codex swallows.

## Rambo 1, in this order (one after another)
1. Raise the Claude run counter from 12 to 40, and switch only on real limits. SENT 01:08Z. Status: WAITING (counter resets at midnight ET)
2. **Wire the VTES control panel v5 (CRITICAL):** feeder every 2 minutes, stale tiles in red, desktop shortcut. SENT 01:16Z. Status: WAITING
3. Split the work into Rambo 1 and Rambo 2 lanes, plus two panel tiles. HELD (sent automatically when 1 proves Claude is back)
4. Usage governor: check what exists, then build the real-limit switch, the usage log and the heartbeat. HELD
5. Orange Tree live deploy, v3: OCR, the big red timestamp and alerts. HELD
6. File the 32 remaining email attachments. HELD

## Running at the same time (parallel)
- CLOUD, all night: relays each proof to Jorge by phone and email, re-sends any order Codex swallows, and alerts if the panel or governor heartbeat stops.
- RAMBO 2 (Codex): nothing queued. Every order above needs Drive or client files, which Codex can't touch.
- Why Rambo 1 does not run two at once: two Claude sessions on the same PC collided on a live email on 09-28 (RI-048). One at a time is slower but safe.

## Expected timing (estimate, not a promise)
Items 1–2 by about 1 AM ET. Items 3–4 by about 3 AM. Item 5 by about 5 AM. Item 6 by about 7 AM.
