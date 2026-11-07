# ORDER — Two named executors: RAMBO 1 (Claude) and RAMBO 2 (Codex)
From: cloud | 2026-10-12 | For: RAMBO, Claude lane ONLY (Codex: do not take this file)
Run AFTER MSG-CLOUD-TO-CODE_RAISE-CLAUDE-RUN-CAP_RAMBO1_2026-10-12.md.
Queue position 4 of 7.
Jorge, 2026-10-12: "yes, Rambo 1 and Rambo 2". (He first asked for four clones. The cloud advised against it: clones share one counter and one Claude allowance, so they'd only hit the cap faster. He agreed to this instead.)

## The split
- **RAMBO 1 = the Claude lane (this agent).** It takes CLIENT work only: anything touching a capsule, a client document, email, Drive job folders, OCR of client files, or filing. It also takes anything that needs G:\ (Drive) access.
- **RAMBO 2 = the Codex lane (ChatGPT plan, separate allowance).** It takes NON-CLIENT work only: panel/board/launcher HTML and JS, scripts in its own working folder, generators, tests and drafts. No client details. The Charter section 12 / CODEX-PII rule stays exactly as it is.

## Change the watcher/router (back up every file first as .bak-20261012)
1. Route each inbox order by its content. Client or Drive work goes to RAMBO 1. Non-client work goes to RAMBO 2, **even when RAMBO 1 is free**. That saves Claude runs for client work.
2. When RAMBO 1 hits its daily run counter, client/Drive orders WAIT in the queue for RAMBO 1. They do NOT go to RAMBO 2, and a RAMBO 2 decline must NOT mark an order handled. (Two orders were lost this way on 2026-10-11.)
3. Every report file names its lane: `EXECUTED_RAMBO1_...` or `EXECUTED_RAMBO2_...`.
4. On the v5 panel and the old panel, show two tiles: "RAMBO 1 (Claude, client work)" and "RAMBO 2 (Codex, non-client)". Each shows its status (working / idle / waiting for counter reset at …), runs used today out of the cap, and its queue count.

## Report
EXECUTED_RAMBO1_RAMBO-1-AND-2-LANES_<date>.md with: the files changed (plus their backups), one test order routed to each lane with its result, and the screenshot path of the panel tiles.

Will you confirm both lanes processed a test order?
