# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: FIX Sort-Inbox — it MOVES good mail out of the inbox; owner wants the original LEFT in the inbox
**2026-09-14 · owner: "it's moving good email into subfolders and not leaving the original in the inbox — revise." The Sort-Inbox automation (the one that logged "1,794 emails moved 2026-05-01"). Desktop-only = RAMBO.**

**STEP 1 — STOP THE BLEEDING FIRST (do this immediately):** pause/disable the Sort-Inbox MOVE rule/script so it
stops relocating mail out of the inbox while we revise it. Confirm it's paused before anything else.

**STEP 2 — REVISE so the inbox stays the master.** Owner's rule: **the original stays in the inbox.** Preferred
fix (recommend): **categorize/label in place instead of moving** — apply an Outlook Category (color/label) or a
flag so the mail is sorted-and-findable BUT still sits in the inbox. The folder view becomes a filter, not a
relocation. (Fallback if owner insists mail also live in the folder: COPY to the subfolder and KEEP the original
in the inbox — note this duplicates mail and can drift; categorize is cleaner.)
- **Never remove a message from the inbox as part of "sorting"** unless the owner explicitly says archive/delete.

**STEP 3 — MAKE WHAT'S ALREADY MOVED RECOVERABLE.** The prior runs moved ~1,794+ messages into subfolders and
the owner can't see them in the inbox. From the Sort-Inbox log, produce a plain list of **which folders got which
mail**, so nothing is lost — and offer to move the good ones back to the inbox (owner decides; moving client/job
mail back is fine, it's his own inbox, but confirm scope before a mass move).

**STEP 4 — LOG THE RECURRENCE.** Add a dated line to RECURRING-ISSUES.md: an inbox automation that hides mail by
moving it is the same class of defect as a filing move that loses a doc — the fix is "sort in place, never hide."

**RED or GREEN:** pausing the rule + switching to categorize-in-place + producing the moved-mail list = GREEN
(his own mailbox, reversible, no outbound). A mass move-back is GREEN too but confirm scope first. No auto-delete of mail, ever.

**CLOSING QUESTION:** Is the Sort-Inbox mover paused, is it revised to CATEGORIZE-in-place (original stays in inbox), and where did the already-moved mail go — do you want it moved back?

#outlook #sort-inbox #stop-moving-mail #categorize-in-place #inbox-is-master #recurrence #cloud-to-desktop
