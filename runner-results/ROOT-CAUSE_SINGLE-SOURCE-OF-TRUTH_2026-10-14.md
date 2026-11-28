# ROOT CAUSE — why there is still no single source of truth per job

**Date:** 2026-10-14. **Written by:** cloud lane, read-only diagnosis (CLAUDE.md Rule 6).
**Owner's question:** "why I am still unsuccessful, or you are still unsuccessful, at keeping a single source of truth for each of the projects, task or similar."

Nothing was changed while writing this. No number was issued. No file was moved.

---

## Section A — The answer, first

1. **It is not you. It is how the system is built.**
2. **There is no single source of truth because there are at least four writers, and each one keeps its own copy.** The PC, the cloud, Cowork and Codex each write numbers, tags and job files into their own places.
3. **No one copy is in charge, and no one process owns issuing numbers.** Every rule says "check the registry first", but there are three registries, and the most important one sits on the PC where the cloud cannot see it.
4. **The PC is the only machine that can see the master, and the PC is throttled to 6 runs a day.** So the master goes stale, and everyone else works from old copies.
5. **Old conventions are never retired.** Each fix adds a new standard next to the old one. Nothing removes the old one. So two or three forms live side by side forever.
6. **Every fix so far has been a rule or a reminder (Tier 1).** Agents have no memory, so a reminder only works until the next agent that did not read it.

**The load-bearing sentence: copies multiply because writing a new copy is always easier than finding and fixing the one true copy, and nothing stops it.**

---

## Section B — Question 1: what is actually causing this?

Seven mechanisms. Each one is tied to a failure found today.

### Mechanism 1 — Three registries, three writers, no owner

1. The charter says the master TRK registry is `C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md` (CLAUDE.md §9). Only the PC can read it.
2. The repo has its own `TRK-REGISTRY.md`, built by the cloud on 2026-08-15 "by surveying Drive." It was last changed 2026-09-10.
3. Drive holds **three copies of the master mirror** (`MASTER-REGISTRY-MIRROR_Tracking-Registry.md`), plus a **folder** with the same name created 2026-10-08. **The newest file copy was last modified 2026-08-20.** That is 8 weeks stale. (Drive search, 2026-10-14.)
4. **Numbers in daily use are in no registry the cloud can read.** The repo `TRK-REGISTRY.md` has no row for TRK-2026-1650, 1667, 1684 or 2221. All four are live job numbers in Drive folders, emails and capsules.
5. The 2026-08-20 reconciliation (`RECONCILE-9401_MASTER-vs-REPO-REGISTRY_2026-08-20.md`) said the master's next number was 1593. Numbers well above that (1650, 1667, 1684, 2221) were issued after that date, outside every registry the cloud can check.

**Failure explained — job 1310 vs 1667 for the same address (10980 SW 202 Dr, Cutler Bay):**
1. 1310 was used first, in an email on 2026-07-07 (`TO-CLOUD_MIRROR_2026-09-08.md`, line 4309).
2. 1667 first appears 2026-09-03, ten weeks later. Someone issued a fresh number without finding 1310.
3. A desktop cycle on 09-08 concluded "1310 is the master, 1667 is a later duplicate." **That decision was never executed.** Five weeks later the folder 1667 still sits inside 1310, most PDFs are stamped 1667, and the old tags carry both plus a malformed `#TRK-2026-10052` (`runner-results/HASHTAG-PEOPLE-V2_2026-10-14.md`; `control-panel/hashtag-census/_FIX-LIST.md`).
4. The email sweep and the PaperPort sweep each hit the same question again today and stopped (`runner-results/ATTACH-ALL_EMAIL_PROPOSAL_2026-10-14.md`, flag 1; `runner-results/ATTACH-ALL_ORPHANS-PAPERPORT_PROPOSAL_2026-10-14.md`, Section C).

### Mechanism 2 — Numbers issued outside the registry

1. The PC issued **OPH-2026-0100 to 0287** (188 PaperPort items) on about 2026-10-10. The repo `ORPHAN-REGISTER.md` still says "Next OPH to issue: OPH-2026-0010" and has no row for any of them.
2. The 188-row table was written by the Codex lane into `C:\AI\codex-work\...`. Codex wrote: "They are not in Drive. Drive access was denied." (`ATTACH-ALL_ORPHANS-PAPERPORT_PROPOSAL_2026-10-14.md`, Section B.)
3. Same disease, earlier: the cloud issued TRK-2026-1614 to 1629 on 2026-08-15 from a phantom "1611" (`TRK-REGISTRY.md` §1b). The cloud issued the whole 9xxx admin band outside the registry (CLAUDE.md §9, drift item 4).
4. The 9xxx band then leaked onto client jobs. A DD-BOOK sidecar generator stamped `#TRK-2026-9490` and `#TRK-2026-9754` on about 9 jobs (`_FIX-LIST.md`). RAMBO matched a PaperPort file to TRK-2026-9365, an admin number.
5. `ORPHAN-NUMBERING.md` predicted this exact failure on 2026-08-15: "A second series maintained the same way inherits the same disease." It did.

### Mechanism 3 — PC-only data the cloud cannot see

1. The master registry, the PC's OPH register, the 188-row PaperPort table, and the PC portal files all live on the PC.
2. The cloud cannot read the PC disk. The PC cannot reliably read the repo (RI-037: its clone is stale and on the wrong branch).
3. So each side builds its own picture from what it can see, and the two pictures drift.

### Mechanism 4 — The PC is throttled, so the master cannot be kept fresh

1. A home-made counter limits the PC to **6 headless runs a day** (down from 12). It was spent 12 minutes after midnight on 10-14 (`exec-01/PRE-MORTEM_2026-10-14.md`, item 1).
2. When the counter is spent, orders go to Codex, which has no Drive write access (RECURRING-ISSUES 2026-10-11, 10-12, 10-13, 10-14).
3. So the only writer of the master is also the writer that runs least. The master falls behind by design.
4. Codex labels failed work as done. **7 Codex receipts are named EXECUTED but the text says BLOCKED or PARTIAL** (`exec-01/PRE-MORTEM_2026-10-14.md`, item 3; `exec-01/RED-ASKS_2026-10-14.md`). A reader trusting the filename believes records were updated when they were not. This is a false source of truth about the state of the work itself.

### Mechanism 5 — Agents have no memory, so every rule is a reminder

1. Each session starts blank (RI-005). Rules only work if read and obeyed every single time.
2. The 2026-08-30 git "one-time fix" did not stick for exactly this reason. RI-037 (2026-09-04) says: "it is a step a session must remember to run ... that makes it Tier 1 in practice."
3. The same is true of "check the registry before issuing." It is a step to remember, and new numbers keep appearing without it.

### Mechanism 6 — New standards are added, old ones are never retired

1. **Tag files:** `_TAGS.txt` (29 of 40 jobs), `_HASHTAGS.txt` (11 of 40), per-document `.TAGS.txt`, and since today `_HASHTAGS_v2.txt` (40 of 40). That is four conventions. The v2 run added a new file and left the old ones in place (`control-panel/hashtag-census/_SUMMARY_2026-10-13.md`; `HASHTAG-PEOPLE-V2_2026-10-14.md`).
2. **Filenames:** RI-012 (2026-08-15) found two filename conventions and five folder patterns. It is still OPEN. The short form `TRK-26-NNNN`, the forbidden dot form `TRK-2026-1531.002`, and `#ORPH-` instead of `#OPH-` are all still in use today (`_FIX-LIST.md`).
3. **Backups:** the `name.ext.bak-DATE` form was banned on 2026-10-13. **2,710 files** still use it (`control-panel/BAK-RENAME-PLAN_2026-10-14.md`, `BAK-RENAME-PLAN-SUBFOLDERS_2026-10-14.md`). The PC builders still hard-code the old form.
4. **Panels:** at least five versions of "the panel" were built by different AIs, with no record of which one is real (RECURRING-ISSUES 2026-10-12).

### Mechanism 7 — Copy-on-write instead of edit-in-place

1. **TO-CLOUD.md: 403 copies, about 3.4 GB**, in `_CLAUDE-MAILBOX`. A PC writer still adds 28 to 54 a day (`control-panel/BUILDER-LOG.md`, 06:05Z; BAK-RENAME part 2, Section A).
2. **Field Inspections in OneDrive:** two near-identical trees (`Field Inspections Scanned Copy` and `Field Inspections _ Inspection _ COU _ CU _ Team/Field Inspections Scanned Copy`). 16 of 21 top folders are the same size. A name search finds 2,745 to 2,821 look-alike folders (`runner-results/ONEDRIVE-DUP-COMPARE_2026-10-14.md`).
3. **Capsules vs portals vs PC copies:** each job now has (a) a PC-built `_PORTAL_*.html` with `file:///` links that only work on the PC, refreshed daily, (b) a cloud-built `CAPSULE-ENHANCED_*.html` in the repo `reports/` and in Drive, (c) a 2026-08-24 `JOBS-CAPSULE-INDEX`, and (d) today's `_CAPSULE-INDEX_2026-10-14.html`. Plus nightly portal and stage backups, 1,052 and 1,078 of them (`BUILDER-LOG.md` 19:00Z; `runner-results/CAPSULE-INDEX_2026-10-14.md`).
4. **TRK-TBD folders:** the 2026-08-24 tax-jacket intake created new capsules labelled TRK-TBD for 535 NW 7 ST, 13920 SW 34 ST and 15601 SW 137 AVE, although each already had a number (1532, 1567, 1650). **The intake creates a new folder instead of matching the existing job** (RECURRING-ISSUES 2026-10-10). Five Bay Harbor unit folders are still TRK-TBD too (`ORPHAN-REGISTER.md`, OPH-0007).

**Why copy-on-write wins every time:** writing a new file is always allowed (GREEN). Fixing, merging or renaming the old one is filing, so it is RED and waits for you. The system's own safety rule makes the duplicate the easy path.

---

## Section C — Question 2: why did the previous fixes fail?

Dated attempts, and why each one decayed.

1. **2026-08-15 — repo `TRK-REGISTRY.md` built from a Drive survey.** It was meant to sit beside the master for comparison. It became a second registry. The cloud issued 1614 to 1629 from it, from a phantom number. *Failed because it was a copy, not a replacement.*
2. **2026-08-15 — RI-012 and RI-013 logged, "reconcile before issuing anything new."** Both are still OPEN. *Failed because it was a rule with no owner and no deadline.*
3. **2026-08-15 — OPH scheme adopted, "cheap, plain-sequential, no registry lookup."** Cheap issuing with no single issuer let the PC issue 0100 to 0287 while the repo says 0010. *Failed because "cheap to issue" also meant "anyone can issue."*
4. **2026-08-15 — TRK-2026-9017, migrate ClaudeMemory into the repo.** Still NOT_STARTED after 2 months (`OPEN-ITEMS.md`, line 80). It is desktop-only, and the desktop is capped. *Failed because the one machine that can do it runs least.*
5. **2026-08-19/20 — master mirror published to Drive, reconciled (TRK-2026-9336, OD-11 closed).** It was a one-time copy, never refreshed. The newest Drive mirror is dated 2026-08-20. *Failed because a snapshot is not a sync.*
6. **2026-08-30 and 2026-09-04 — RI-037 git sync fix, "one-time."** Recurred 10+ times, because it relied on each session remembering. *The log itself calls it "Tier 1 in practice."*
7. **2026-09-08 — 1310-vs-1667 decided on evidence (1310 is the master).** Never executed. The rename is RED and waited in a queue that the capped PC never reached. *Failed because the decision was made but no one owned the action.*
8. **2026-10-10 — "jacket intake must search the registry by folio and address before creating a capsule."** A rule text, Tier 1. No code change to the intake was recorded.
9. **2026-10-12 — raise the PC counter from 12 to 40.** Never applied. The fix order sat in the same capped queue. On 10-14 the counter went down to 6 (RECURRING-ISSUES, 2026-10-14, 4th time).
10. **2026-10-13 — backup naming fixed in CLAUDE.md §9.** The PC builders still write the old form. *Failed because the rule changed in the repo, but the code that writes files lives on the PC.*
11. **2026-10-14 — HASHTAG-PEOPLE v2.** Done well (40 of 40, verified), but it added a fourth tag convention. Retiring the old files waits for your yes. *Same pattern: add, never remove.*

**The common thread:** every fix either (a) added another copy, (b) wrote another rule, or (c) needed the PC, which is capped. **None removed a writer or a copy.**

---

## Section D — Question 3: three options, ranked by how long each will last

### Option 1 — Tier 2, REPLACE: one Number Desk, one issuer (lasts longest)

**What it is:**
1. **One registry file in Google Drive**, holding both TRK and OPH rows. Drive is the only place both the PC and the cloud can read.
2. **One issuer: the cloud hourly runner.** It is the lane that actually runs (BUILDER-LOG shows a run every hour, 24 runs on 10-13/14). No other agent mints a number. The PC, Cowork and Codex ask for a number by dropping a request in VTES-Inbox, and get it back within the hour.
3. **Every other copy becomes a generated, read-only view**, stamped "GENERATED — do not edit." That means the repo `TRK-REGISTRY.md`, the repo `ORPHAN-REGISTER.md`, the C: master, and the PC OPH register. The old editable copies go to `_Superseded`.
4. **Issuing a new number becomes GREEN** (append-only, one writer, never reused). Voids, merges and renames stay RED, decided by you in one batch.
5. **Retire, don't add.** For each duplicated standard, one winner, and the losers quarantined in the same step: `_HASHTAGS_v2.txt` wins over `_TAGS.txt` and `_HASHTAGS.txt`; the Drive filename form wins (RI-012's own recommendation); `NAME_bak-DATE.ext` wins.
6. Intake code (tax jacket, PaperPort, email) must ask the Number Desk "does this folio or address already have a number?" before it creates any folder.

**Expected failure mode:** a PC script keeps writing to its old local copy out of habit. Fix built in: the old copy is moved away, so the script fails loudly instead of writing silently. Second risk: the cloud runner stops. That is caught by the existing hourly watch.
**Realistic lifespan:** permanent, as long as the Drive file and the runner exist. Years.
**Owner touches:**
1. One "yes" to adopt it.
2. One sitting (about 15 minutes, yes/no cards) to settle the disputed numbers: 1310 vs 1667, OPH-0007 (1265 or 1582), the three TRK-TBD folders that already have numbers, the void of 1614, and the 9xxx admin-band rule.
3. One "yes" to quarantine the retired tag files and the 2,710 backups (already planned).
**Dependency:** the PC must copy its OPH table and the current master into Drive once. That needs one PC run, so the headless cap should be removed first (already approved by you 10-14, WORK-QUEUE item 23).

### Option 2 — Tier 3, ENFORCE: keep the copies, run a nightly reconciler

**What it is:** keep all registries as they are. Every night, a job compares the C: master, the repo registry, the PC OPH register and the Drive folder names. It lists every number that disagrees and puts it on your morning list.
**Expected failure mode:** it detects drift but never prevents it. It needs the PC to read the master, and the PC is capped, so it will often run blind. It also becomes another writer and another report. Scheduled tasks here have died silently before (RI-015, 8 times).
**Realistic lifespan:** weeks to a few months, until the scheduled task stops or the PC side goes quiet.
**Owner touches:** a growing morning list of mismatches, every day.

### Option 3 — Tier 1, SUPPRESS: another rule ("always check the registry first")

**What it is:** add stronger wording to CLAUDE.md and the skills.
**Expected failure mode:** the next agent that did not read it, or could not see the master, issues a number anyway. That is exactly what produced 1614, 1667 and OPH-0100 to 0287.
**Realistic lifespan:** days.
**Owner touches:** none now, all of them later.
**Listed only for comparison. Proposing this alone for a logged recurring issue is a charter violation (Rule 4).**

---

## Section E — Recommendation

**Option 1: one Number Desk in Drive, with the cloud runner as the only issuer, and every other copy turned into a read-only view.**

1. **Tradeoff in one line:** it needs one PC run to hand over its private copies, and one 15-minute sitting from you to settle the disputed numbers; after that, nothing depends on anyone remembering a rule.
2. **Order of work:**
   1. Remove the PC headless cap (already approved, WORK-QUEUE item 23).
   2. The PC copies the master registry and its OPH 0100–0287 table into Drive (order already queued: `orders/pending/MSG-CLOUD-TO-CODE_PAPERPORT-188-TABLE-TO-DRIVE_2026-10-14.md`).
   3. The cloud builds the single Drive registry from the master, the repo and the PC table, and lists every conflict as a yes/no card.
   4. You answer the cards in one sitting.
   5. Old copies are moved to `_Superseded` and replaced by generated views.
   6. Intake code is changed to ask the Number Desk before creating a folder.
3. **What I will not do without your yes:** issue, void or merge any number, rename any folder, or move any file. All of that is RED.

#ROOT-CAUSE #single-source-of-truth #TRK #OPH #registry #RI-012 #RI-013 #RI-037

Shall I write up Option 1 as a build order for the morning?
