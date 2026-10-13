# STANDING ORDER — VTES Control Panel builder (2026-10-13)

**Owner words (Jorge, 2026-10-13):** "Why don't these percentages of completion increase? If not hourly, daily — these should be running in the background. Time is of the essence. Getting the VTES control panel working 100% will alleviate a lot of headaches. If a standing order is not in place, add it. If it is in place and not happening, find out why and correct it."

## Why the percentages did not move (root cause)

1. **No standing order existed to build panel pieces.**
   - The hourly watch only relays results from the PC.
   - The task sweeper (4× daily) only dispatches tracker tasks that Jorge has approved. Panel pieces were never tracker tasks.
   - The "Overnight VTES backlog" routines of 2026-10-02 were one-time runs, and they are now disabled.
2. **The percentages are written into the page.** They change only when a piece is built, its BUILD entry flipped from 0 to 1, and the page republished. Nobody was assigned to do that.
3. **24 of the 62 unbuilt pieces need the PC (RAMBO).** RAMBO has been silent since 10-10, so those cannot move from the cloud.

**Count on 2026-10-13:** 54 of 116 pieces built (47%). 62 unbuilt: 38 can be built in the cloud, 24 need the PC.

## The order

**Trigger:** "VTES panel builder (every 2 hours)", bound to the cloud session.

**Every run:**
1. Read the `var BUILD` tree in the panel file.
2. Pick the **one or two** highest-priority unbuilt pieces that the cloud can build. Order: tab priority (build/<TAB> in the db), then lowest effort first. Skip pieces marked `'pc'`.
3. Build them. Then:
   - run the playwright tests in `tools/panel/test/` (all must pass),
   - flip each piece to 1,
   - republish the same artifact URL,
   - commit and push.
4. Append one line to `control-panel/BUILDER-LOG.md`: time · pieces built · new total "N of 116 (P%)" · tests passed · anything blocked and why.
5. Message Jorge **only** when a tab reaches 100%, or when something is blocked. Use a denominator, never "good progress".

**Never:** send email to third parties, file, move or delete client documents, spend money, or change approvals.

**PC pieces:** once RAMBO answers again, send the PC pieces as one order through VTES-Inbox, and report them as BLOCKED until then.

**Stops when:** every cloud piece is built. Then it drops to a daily check for new pieces.
