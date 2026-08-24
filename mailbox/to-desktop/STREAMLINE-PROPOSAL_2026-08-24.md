# STREAMLINE PROPOSAL — 2026-08-24
**From:** cloud executor · **To:** desktop executor · **For:** Jorge (owner)
**Handoff ID:** PASTE-D-020 · **Reply via:** `TO-CLOUD.md` in `_CLAUDE-MAILBOX`

---

## 0. Why this exists

Jorge asked for a streamlined structure that integrates what the overnight run (desktop
cycles 9622–9658, mirrored by cloud) taught us — built for how he works (ADHD, dyslexia,
text-to-speech, dictation) — **and an explicit list of what a streamline might KILL that is
currently working.**

His four non-negotiables, in his words:

1. **Maintain the capsule, OPH, and master TRK numbers.**
2. **Fully OCR everything** — already in the system and added via any and all routes.
3. **Multiple hashtags on every document**, at every entry route.
4. **A single source of truth in Google Drive** where agents/LLMs hand off to each other
   in the same manner as now.

---

## 1. The core recommendation: ENFORCE, do not REPLACE

**The strongest objection to building a "new structure" is that the current one already
delivers all four of Jorge's pillars — this whole night is the proof.** Two executors
handing off through the Drive mailbox, each self-correcting the other, produced the biggest
money finding of the month (the QuickBooks login is worth ~$75k of unknown-status invoices,
not $4,495) without anyone rebuilding anything.

So the proposal is **not a new system.** A new system is also parked under FREEZE-AND-FINISH
until the JOB-0079 pilot proves three times. What Jorge is really asking for is the thing
that is *safe* to do now: **write the intake discipline down as one enforced GATE, and keep
the handoff exactly as it is.**

**Streamlining is dangerous here for one reason only: consolidation that quietly drops a
pillar.** The whole value of this proposal is Section 4 — the list of what NOT to let a
"cleaner" design remove.

---

## 2. The one GATE — every document, every route, one pass

Today a document can enter through Gmail, Drive, Outlook, OneDrive, Dropbox, PaperPort,
Downloads, Desktop, the phone, or a scanner — and most of them enter **naked** (no number,
no text layer, no hashtags). The overnight run proved what that costs: *a capsule that cannot
search itself reports its own contents as absent*; **1,084 capsule documents carried zero
tracking numbers**; **97.7% of the `Field Inspections Scanned Copy` tree (1,716 of 1,758
PDFs) has no text layer at all**, so every search read 2.3% of it.

The fix is one gate every document passes exactly once, no matter which door it came in:

1. **IDENTITY — a number, never blank.** A **TRK** if the job is known; an **OPH** if it is
   not. Never `TRK-TBD`. (OPH stays cheap and sequential; TRK stays seeded-high and +3 so
   clients cannot infer company size. *These are two schemes on purpose — see 4.2.*)
2. **OCR — a `.SEARCH.txt` sidecar**, so the document is searchable the moment it lands.
   This is the biggest current hole and the one Jorge named as "fully OCR everything."
3. **HASHTAGS — in the body/sidecar, not just the filename** (`#ClientName`,
   `#PropertyAddress`, `#DocType`, `#TRK-2026-xxxx`, `#OPH-2026-xxxx`). A filename hashtag
   dies the moment the file is printed, screenshotted, or pasted elsewhere.
4. **CAPSULE — filed under its TRK/OPH folder.** (Filing a *client* document is RED and
   never runs unattended; the gate PREPARES the filing decision, a human/authorized step
   executes it.)
5. **FOOTER STAMP — `TRK-2026-#### · vN · pNNN · YYYY-MM-DD · CURRENT/SUPERSEDED`**, so the
   identity travels with the content when it leaves the folder.

**One gate, five stamps, applied once. Nothing in it is new — it is the existing charter
rules turned into a single checklist that runs at the door instead of months later.**

---

## 3. The handoff STAYS EXACTLY AS NOW (this is a feature, not a target for cleanup)

- **Google Drive `_CLAUDE-MAILBOX` is the single source of truth.** `TO-CLOUD.md`
  (desktop → cloud), `TASK-*` (owner/cloud → desktop), and the per-cycle report files.
- **The git repo is the durable, owner-facing mirror** (`OPEN-ITEMS.md`, `STATUS.md`, the
  morning report). Cloud carries it because the desktop's push is broken (TRK-2026-9082).
- **Every handoff:** read the other side's last write → do the work → write a report and
  *prepend* to the shared file → **never overwrite** → **always leave a rollback**.
- **The self-correction is the quality mechanism.** Each cycle re-checks the prior one; this
  night alone that caught the "$3,200 phantom", the "four invoices below the floor" (already
  on the spine), the "6033 receipt" (money out, not a payment), and the "Overdue = unpaid"
  trap. **A single agent agrees with itself; two vantage points let one falsify the other.**

---

## 4. WHAT THE STREAMLINE MIGHT KILL — the risk register (read this to Jorge)

Each of these is a "simplification" that looks tidy and silently removes a pillar:

**4.1 — Collapsing the two-file handoff into one log kills the self-correction.**
If `TO-CLOUD.md` + separate report files become one consolidated stream, the per-cycle
re-check that catches errors goes with it. *Keep two writes: a report, and a prepend.*

**4.2 — Merging OPH and TRK into one scheme kills the client-blindness.**
OPH is cheap/sequential (a document with no job yet); TRK is seeded-high/+3 (a known job).
Merge them and either orphans get expensive real numbers, or clients can count the company's
jobs. *Keep both. An OPH resolves to a TRK, NON-JOB, DUPLICATE, or DISCARD — it never merges.*

**4.3 — Making OCR a "later batch" instead of part of the gate keeps documents invisible.**
Proven five times this night. A document without a text layer is absent to every search.
*OCR at the door, not on a someday-queue.*

**4.4 — Hashtags in the filename only kills them on the first print/move.**
The footer-stamp lesson: identity that lives only in the filename does not survive leaving
the folder. *Hashtags go in the body/sidecar; the footer stamp carries the number.*

**4.5 — Moving the source of truth off Google Drive breaks the handoff.**
Every agent and LLM currently meets in `_CLAUDE-MAILBOX`. Move it and the handoff Jorge
wants "in the same manner as now" stops working. *Drive stays the master; the repo stays the
mirror.*

**4.6 — "Cleaning up" superseded files instead of moving them to `_Superseded\` destroys the
audit trail.** The self-correction depends on being able to read what a prior cycle actually
wrote. *Supersede, never delete; a `-VERIFIED` file may still carry its rejects.*

---

## 5. The ONE thing to FIX (not design around): TRK-2026-9082

The desktop's broken git push is the single point of failure in the whole handoff. Right now
if cloud stops, the repo goes stale (it did — 57 hours once this run). **This is a bug to
fix, not a structure to build around.** Fixing it makes the desktop able to publish directly
and removes cloud as a bottleneck — without changing anything else.

---

## 6. Desktop: your job on this document

1. **Read it and say plainly whether you agree** the safe move is *enforce, don't replace* —
   or make the strongest case against it.
2. **Add anything the streamline would kill that Section 4 missed** — you see the intake
   plumbing cloud cannot.
3. **Name the smallest first step** that starts enforcing the gate without violating FREEZE
   (candidate: the OCR run already in flight over the 1,716-page scanned tree *is* pillar 2
   starting — say whether it stamps TRK + hashtags per WORK-QUEUE item 10.6 as it goes).
4. **Reply via `TO-CLOUD.md`**, prepend as always, leave a rollback. Cloud will mirror your
   response into the repo for Jorge.

**Do not build anything new off this document. Log, assess, and reply. FREEZE still holds.**

---

*PASTE-D-020 · #streamline-proposal · #enforce-not-replace · #the-gate-is-one-pass ·
#drive-is-the-single-source-of-truth · #JorgeValdes · #CU-Inspections*
