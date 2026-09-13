# TASK REGISTER — the canonical intake log ("the CD"). Capture-first: nothing is worked before it's written here.
**TRK-2026-9776 · established 2026-09-04 on owner directive: "any request for a task automatically added to the register, so nothing gets forgotten."**

## THE RULE (standing, both Code seats)
**No task is acted on before it is written here.** The instant Jorge (or a seat) requests a task, the
receiving seat **appends a row to this file first, then works it.** A task that lives only in a
conversation dies when the conversation does (charter §10, OD-01). This is the intake gate — same
principle as orphan-onboarding's "write the row before any analysis."

- **Auto-capture is a hard rule for ☁️ Cloud and 🖥️ RAMBO** — on receiving any ask, log it here immediately.
- **Paste-tier surfaces (Chat, Cowork, phone, other LLMs) can't write here themselves** — so a task from
  them must be **echoed into this register** by whichever Code seat sees it. That is the honest limit of
  "automatic."
- Each row: **date · requested-by · task · owner-seat · status (NOT STARTED / IN PROGRESS / BLOCKED-why / DONE) · pointer** (the mailbox order or TRK).
- RED/GREEN and the caps still govern *doing*; this register only guarantees nothing is *lost*.

## ACCOUNTABILITY — both seats check this every cycle (owner directive 2026-09-04)
This file is the **accountability tracker.** On every heartbeat, each seat **reads the OPEN table and
flags what's falling through the cracks:**
- **Aging:** anything `NOT STARTED` or `IN PROGRESS` with no movement in **>48h**, or `BLOCKED` on the
  same reason for **>48h**, gets flagged.
- **Ownership:** every OPEN row must name a live owner-seat and a next step; a row with neither is itself a defect.
- **Surfacing:** stale/stuck items go to Jorge **only if they need his click**, batched; otherwise the
  seats clear or advance them between themselves (mutual aid). "Quiet" is only honest when the OPEN table
  has nothing aging.
- Update each row's status the moment it changes; move finished rows to DONE with proof. A row marked DONE
  without proof is not done (charter Rule 2).
This is the SCOREKEEPER function in its simplest form — the watchdog that catches the silent death the
backlog is full of.

---

## OPEN (as of 2026-09-04)
| Date | By | Task | Owner | Status | Pointer |
|---|---|---|---|---|---|
| 09-04 | Jorge | **GitHub sign-in on desktop** (closes the two-way loop) | Jorge | BLOCKED — owner click | OWNER-ACTIONS popup |
| 09-04 | Jorge | Build the OWNER-ACTIONS popup (sign-in + connect chrome) | RAMBO | ORDERED | HANDOFF_…owner-actions-button-popup |
| 09-04 | Jorge | Desktop cleanup by type + orphan OCR + **6 OPH numbers** | RAMBO | IN PROGRESS | WORK-ORDER_DESKTOP-CLEANUP-AND-ICONS |
| 09-04 | Jorge | **1Password single-source migration** (per-site loop) | RAMBO | ORDERED | WORK-ORDER_1PASSWORD-SINGLE-SOURCE-MIGRATION |
| 09-04 | Jorge | Document the **10–12 stored tasks** into the repo | RAMBO | ORDERED | HANDOFF_…document-the-10-12-stored-tasks |
| 09-04 | Jorge | Wire **Grok API** (find existing key, second-opinion bus) | RAMBO | ORDERED | HANDOFF_…wire-existing-LLM-api-key |
| 09-04 | Jorge | Build the desktop **VS Code chat panel** — the "sexy window" replacing the black terminal (owner reminded 2x — WANTED) | RAMBO | PRIORITY — not started | FINDING_…replace-terminal-with-chat-panel |
| 09-04 | Jorge | Build the **Conductor** (after loop proven) | RAMBO | QUEUED | ORCHESTRATOR-SPEC_CONDUCTOR-01 |
| 09-04 | Cloud | Audit what else the 6pm pre-guardrail filing moved | RAMBO | ORDERED | FINDING_…reconcile-from-desktop-transcript |
| 09-04 | Jorge | **AI-BUILD LIBRARY** — keep inventoried; run the multi-LLM flaw-review pass on each item | both seats | ESTABLISHED — reviews pending Grok | AI-BUILD-LIBRARY.md |
| 09-04 | Cloud | **SessionStart hook** — prints TASK-REGISTER OPEN every session | Cloud | DONE (self-tested) | .claude/settings.json |

| 09-04 | Jorge | **ENABLE ALL-NIGHT RUNS** — elevated re-register heartbeat to run logged-off | Jorge | PENDING — owner elevation click | OWNER-ACTIONS popup ③ |
| 09-04 | Cloud | Pre-approve the GREEN command set (allow-list, NOT bypass) for smooth night runs | RAMBO | PENDING | Rule 9 / fewer-permission-prompts |
| 09-04 | Cloud | Test the wake-nudge webhook (plain curl wakes Cloud?) | RAMBO | PENDING | HANDOFF_…wake-nudge-webhook |
| 09-02 | Jorge | **Plaza — DRAFT letter to the Association** (Quanny/Silvio), NOT SENT. Dedupe CLEAR (Cloud 09-13: no dupe/not sent in Gmail/Outlook/Drive). **3 file defects (owner 09-13): no name/TRK on file, no hashtags, opens as raw HTML not text+images.** RAMBO to stamp TRK-2026-1582 + title + footer, add body hashtags, export clean text+images PDF (HTML = source only), confirm single desktop copy. Send stays owner decision (RED). | RAMBO (fix file) + Jorge (send) | FIX ORDERED — then send decision (RED) | HANDOFF_…plaza-association-letter-fix-name-hashtags-render |
| 09-02 | Jorge | **Plaza Unit 220** permit-extension request — unsent in Outlook Drafts | Jorge/RAMBO | AWAITING SEND | Unit-220 extension draft |
| 09-02 | Cloud | **Plaza Unit 721** — expired permit, ~151-day reissue window (to ~2027-01-31) | RAMBO | FLAGGED — time-sensitive | Plaza report §5 |
| 09-01 | Cloud | **Plaza — 4 Impact Windows COIs all expired**, none names The Plaza | RAMBO | LOGGED — surface if Association asks | GC-Insurance-Cert report |
| 09-04 | Jorge | **3 safe follow-up emails** (close NOV; Plaza follow-up; Monroe permit) | Cloud | HOLD — awaiting owner "send" | Gmail drafts |
| 09-04 | Jorge | **4 attachment emails** (Miami Art House ×2; Unit 404 docs; MZ COI) | RAMBO | TO SEND (attachments) | Gmail drafts |
| 09-04 | Jorge | **Local business tax license** login + pay (Miami-Dade Clerk/consenthub). RAMBO building a one-click CC-payment popup (portal-registration skill); **login w/ temp pw + card entry stay owner-attended (RED)** — Cloud can't drive the county portal, credentials never stored. | RAMBO (popup) + Jorge (RED click) | POPUP ORDERED — pay is owner click | HANDOFF_…business-tax-license-payment-popup |
| 09-13 | Jorge | **Alec microfilm/jackets ALREADY in email** — Cloud confirmed 2 Outlook emails from `mirandar@mdcpa.net` (8/21, attachments): 1055 NW 73 ST (30-3111-035-3740) + 2745 NW 28 ST (30-3128-011-0800), both matching the Alec 8/18 order batch. Paid + delivered, unfiled. Ordered RAMBO to PULL+file (not re-order), enhance per tax-jacket, then re-count X of Y jackets in hand. | RAMBO (pull+file) | ORDERED | HANDOFF_…alec-microfilm-already-in-email-pull-and-file |
| 09-04 | Cloud | **Multi-LLM flaw-review pass** on AI-BUILD-LIBRARY items | both seats | PENDING GROK (independent reviewer) | AI-BUILD-LIBRARY |
| 09-04 | Cloud | Reconcile the stray branch `claude/chaude-code-max20-kp2o46` — **MEASURED 2026-09-04 03:37: 82 ahead / 87 behind, merge-base `3b7fa67`; the same 3 registers conflict (`OPEN-ITEMS.md`, `PASTE-LOG.md`, `RECURRING-ISSUES.md`) → AP-0026 CONFIRMED STILL OPEN.** The ordered pull was attempted, conflicted, and was **aborted clean** — HEAD unchanged at `793974f`, both dirty files preserved, nothing lost. | Jorge | BLOCKED — owner call (AP-0026) | branch cleanup |
| 09-04 | Jorge | **OCR sweep 2022→present** (needs an interactive desktop window) | RAMBO | BLOCKED — interactive | OCR sweep |
| 09-04 | Jorge | **Alec big jacket books** (10362, 1840) | RAMBO | NOT STARTED | Alec DD books |
| 09-12 | Jorge | **Alec DD — portal unformatted + jacket/microfilm not filed.** Cloud verified portal (TRK-2026-9047, stage 07-OWNER-REVIEW, $100.25 delivered-not-billed): header broken (blank title/addr, "TRK NOT ASSIGNED" though 9047 is the real TRK); only jacket ORDER proofs on file — no ENHANCED/FINAL jacket, no microfilm folder; capsule 01–05 are empty shells; `_TAGS.txt` empty. Ordered RAMBO to (1) repopulate header w/ 9047, (2) count jackets-in-hand vs ordered + locate microfilm, (3) build ORIGINAL+ENHANCED+FINAL per tax-jacket skill, (4) file+enhance microfilm, (5) then $100.25 money gate (RED). | RAMBO (build) + Cloud (verify) | ORDERED | HANDOFF_…alec-dd-jacket-microfilm-status-and-finish |
| 09-13 | Jorge | **AP-0002 — microfilm PAID (owner correction 09-13): $44.94 on 8/21/2026, Team USA card.** NOT a money problem — corrected from "deadline passed/verify payable." Remaining work = the delivered doc is in the inbox un-OCR'd (see inbox sweep row). | — | RESOLVED — paid; doc → OCR sweep | inbox-paid-reports-OCR-sweep |
| 09-13 | Jorge | **Generator ROOT-FIX (approved)** — stamp name+TRK+hashtags+render on EVERY generated file; fail-closed on blanks; backfill Alec portal + Plaza letter. Rule 4 (recurrence ×2). | RAMBO | ORDERED | HANDOFF_…generator-root-fix-stamp-name-trk-hashtags-render |
| 09-13 | Jorge | **Paid reports/microfilm inbox OCR sweep — RUN OVERNIGHT, hand owner the filed set.** All paid (incl. $44.94 8/21 Team USA card), delivered by email, never OCR'd. **Owner also wants 2 fully-enhanced tax jackets FIRST as his stop/go sample** (the 2 mdcpa.net: 1055 NW 73 ST + 2745 NW 28 ST) → dropped to Drive + mailbox/to-cloud for morning review before the rest files. Queue-A SAFE (identity known from subject). Per-item writes (stall risk: last run died hr 4). Filing = RED. | RAMBO (overnight) + Cloud (deliver 2 samples AM) | ORDERED — overnight, top of queue | HANDOFF_…inbox-paid-reports-OCR-sweep + OVERNIGHT-QUEUE ⭐ |
| 09-13 | Jorge | **Reconcile the 33 approval cards** — **LOW PRIORITY; JOB LOST.** Cards tied to the lost deal (esp. the 1 money + its sign-ins) get **CANCELLED, not deferred** (don't spend/sign for a job we didn't win). GREEN cleared autonomously; duplicates closed (Alec microfilm found, HOA $555 paid); any remaining RED for a LIVE job batched to one owner click. Which job was lost = Cloud to confirm w/ owner. Cloud can't open the desktop board. | RAMBO (sweep) + Jorge (confirm lost job) | ORDERED — low priority | HANDOFF_…reconcile-33-approvals-board-deferred-EOY |
| 09-04 | Jorge/RAMBO | **OCR inventory — AUTHORITATIVE (RAMBO, 03:47): OCR'd 8,774 of 9,758 client docs = 89.9%, remaining 984** (raw 29,379/29.9% includes 19,621 pipeline scratch — 17,413 TaxJacket `_QUARANTINE` PNGs + 1,016 thumbs). **Does NOT reconcile with Cloud's Drive-only 59%** (Cloud's 3,641 denominator ≈2× RAMBO's 1,877; canonical 01-JOBS reads 91.8%). Reconcile whose denominator is right before either number reaches a brief. | Cloud to reconcile | DONE w/ proof; reconcile OPEN | DONE_OCR-INVENTORY-DENOMINATOR |
| 09-04 | RAMBO | **PaperPort = 569 files at 0% OCR — 58% of ALL remaining work, never touched** (`2023 PaperPort - NOT SORTED YET`=475; `2022 …`=94). GREEN + night-eligible (NOT interactive) — re-test the "OCR BLOCKED-interactive" assumption. | RAMBO | NOT STARTED — proposed tonight | DONE_OCR-INVENTORY-DENOMINATOR |
| 09-04 | RAMBO | **Mojibake twin `01-JOBS` on G:** — 5 unreadable files (BOM-less-script defect); merge/delete is a filing decision. | Jorge | OPEN — owner call | DONE_OCR-INVENTORY-DENOMINATOR |
| 09-12 | Jorge | **Entity cross-reference layer** — tag every sender/recipient/CC + phone# to the job's TRK; resolve one-person-many-identities (Javi Vasquez case); PEOPLE-REGISTER.csv; owner confirms merges. **RECOVERY 2026-09-12: prior art FOUND — a fuller version was filed 2026-08-19 as TRK-2026-1582 / DIR-0047 (Identity-Hashtags & Discretion protocol + `IDENTITY-MAP_People-Addresses-Circles`). The people register was already started.** Build order rewritten to RECONCILE onto it, not rebuild. Full 2026-08-19 library files are on OneDrive — RAMBO must retrieve (Cloud can't reach). Fuzzy/typo factor added to protocol; RAMBO to confirm whether the original file already contains it. | RAMBO (retrieve+build) + Cloud (email side) | ORDERED — reconcile prior art | HANDOFF_…build-people-register-reconcile-prior-identity-map (TRK-2026-9780) |

| 09-13 | Jorge | **Set default app so job-portal `.html` auto-opens in the browser** (opened in wrong app). GREEN desktop mechanic. Cloud can't touch associations — RAMBO to set `.html` → Chrome durably; owner can also do it in 4 clicks now. | RAMBO | ORDERED | HANDOFF_…set-html-portal-default-app |

| 09-13 | Jorge | **DD REPORT STANDARD (owner, 09-13)** — applies to every jacket/microfilm/report: (1) every data claim backed by a **SNIP** (reports were ~5 scrapes, unsupported); (2) **keep working papers** (raw scrapes+snips = supporting/original set); (3) **Cloud narrative on BOTH jacket AND microfilm, comparing them**; (4) **tax jacket = 2 PDFs: ORIGINAL + ENHANCED**; (5) client verdict states plainly **is something wrong or not, and what**. | RAMBO (produce) + Cloud (narratives) | STANDARD SET | HANDOFF_…alec-dd-report-standards-snip-narrative-2pdf |
| 09-13 | Jorge | **DD WRITE-UP TEMPLATE ratified (fixed for every DD write-up)** — incl. the **permit-code translation** (codes on the page behind the permit app → plain per-permit narrative = "the house as permitted"), **permits-vs-tax-jacket comparison**, and the **microfilm-gap rule** (MDC microfilm only ~1961–1978; PA addition in a gap = UNDETERMINED → county walk-through inspection, never rounded to "clean"). Added to tax-jacket skill too. | Cloud (template) + RAMBO (apply) | RATIFIED — template live | DD-WRITEUP-TEMPLATE.md (TRK-2026-9781) + tax-jacket skill |

| 09-13 | Cloud | **Cowork bridge limit (found 09-13):** Cowork can't read/write the git mailbox (private repo, not on its machine or Drive). Fix: hand Cowork instructions INLINE; Cowork returns outputs to **Google Drive**; RAMBO/Cloud bridge to repo+capsule. Jacket email is in **Outlook (not Gmail)** — if a Cowork window lacks Outlook, RAMBO supplies the file. Cowork's activity-log/snip UI links dead → work around, report optional. | Cloud/RAMBO (bridge) | NOTED — flow corrected | (this turn) |
| 09-13 | Jorge | **ONE report A-to-Z TONIGHT — 1055 NW 73 ST (30-3111-035-3740), Alec DD.** Owner assigned to Cowork: COWORK-A = tax jacket (image enhancement, his priority) + permit-code translation + 2 PDFs; COWORK-B = microfilm narrative + jacket comparison + gap rule. **Cowork = brain/attempt; RAMBO = authoritative enhancement on desktop + review; filing RED.** City-side scraping done (DD master); 3 county properties' permit history blocked (EPS login/reCAPTCHA — browser-attended). | Cowork ×2 (brains) + RAMBO (hands/review) | ASSIGNED — tonight | COWORK-A_… + COWORK-B_… |

| 09-13 | Jorge | **Microfilm missing-year ranges — quote from the APPLICATION page.** Cloud VERIFIED+quoted the county GS1-SL retention disclosure (10 yrs after CO, "cannot guarantee all records"); owner's operational timeline recorded (1961–73 missing / 73–78 partial / 78–~85-86 handwritten / ~85-86+ computerized). Exact printed years need the county order page — **Cloud egress-blocked from miamidade.gov → RAMBO/browser quotes verbatim.** | RAMBO (quote) + Cloud (lock into template) | ORDERED | HANDOFF_…microfilm-years-quote-and-einar-broward-electrical-subpermit + DD-WRITEUP-TEMPLATE |
| 09-13 | Jorge | **Einar Suarez — electrical SUBPERMIT. IDENTIFIED by reverse lookup:** 8621 Pasadena Blvd, Pembroke Pines FL 33024; owners Einar H. Suarez & Barbara Rodriguez; Broward folio 5141-09-12-0810; **file TUS-26-1018**; 15 openings; City of Pembroke Pines Bldg Dept. **Filled Pembroke permit + NOC already on file (June 2026)** — subpermit references that master; NOC coverage question answered by reading the on-file NOC. RAMBO: read elec plan → fee schedule → total; char-count fields; submit/sign = RED. **Electrical contractor EC license NOT on file (master = MZ/Miguel CGC1528486 = building only) — recover from working-papers zip / prior MZ job / DBPR-by-name; need electrician's NAME from owner/Miguel.** | RAMBO (recover+prep) + Jorge (electrician name, RED submit) | ORDERED — EC license to recover | HANDOFF_…einar-broward-electrical-subpermit |
| 09-13 | Jorge | **Form character-count standard** — county/muni forms have fixed char-space per field; count tolerances, never overflow, abbreviate/reword to fit. Applies to every form fill. | both seats | STANDARD SET | (in the einar handoff) |
| 09-13 | Jorge | **`permit-expert` SKILL created (TRK-2026-9782) — ONE MODULE PER MUNICIPALITY**, each sourced from the county/city's OWN published procedure (never memory; UNVERIFIED items can't fill a real form). Seeded modules: miami-dade, city-of-miami, pembroke-pines, broward-county. Cloud egress-blocked from county sites → RAMBO fetches source docs; build one municipality at a time (Rule 5). This IS the "expert bot." | Cloud (skill) + RAMBO (fetch/encode) + owner (ratify) | CREATED — modules to fill per job | .claude/skills/permit-expert/SKILL.md |
| 09-13 | Jorge | **14598 SW 110 St electrical subpermit** (Miami-Dade, folio 30-5910-018-0210, owner Eduardo Miguelez, cases P057595/P057596; GC MZ/Miguel CGC1528486, Eng Synergyn/Monica Valdes). Filled master APPLICATION + NOC on file but **marked "TEST SAMPLE" — no ISSUED master permit # in files.** RAMBO: get issued master # (desktop package / county by folio), recover electrician EC license, fill subpermit (master # top-right), confirm it's a real submission not the test. Submit=RED. | RAMBO (prep) + Jorge (master #? / electrician) | ORDERED | HANDOFF_…14598-SW-110-electrical-subpermit-master-number |
| 09-13 | Jorge | **Claude "new release with bots" — integrate.** Owner says he signed up; wants integration for the microfilm-years/expert language. **Cloud UNVERIFIED what feature this is — must confirm before claiming integration (no guessing on Claude features).** | Cloud (verify) + Jorge (say which feature) | OPEN — needs identification | (this reply) |

## DONE (recent)
| Date | Task | Proof |
|---|---|---|
| 09-04 | HOA $555 paid (by phone) — AP-0001 closed | owner report |
| 09-04 | HOA $180/mo = bank ACH auto-debit + monthly verify reminder | calendar 6jbgnb2hjs693fgsqvbm8gm9k4 |
| 09-04 | File the nine client docs into capsules | RAMBO DONE report |
| 09-04 | Desktop heartbeat VTES-Repo-Heartbeat live (3-min) | RAMBO DONE report |
| 09-04 | Four Claude launcher icons built | RAMBO DONE report |
| 09-04 | **⚡ URGENT — frozen "onlineservices.miamidade" window KILLED.** It was not a browser tab: an orphaned COM-activated `iexplore` (PID 13644, parent 36076 `IEXPLORE.EXE -Embedding` under svchost), started 2026-09-01 17:57:14, **29 CPU-hours over 57 hours at 83.3% of one core.** Chrome's Official Records tab measured 0.1% — innocent. | Re-verified 2026-09-04 03:38: `Get-Process iexplore` returns **NONE — kill held**. Chrome/Edge/Outlook untouched. |
| 09-04 | **Desktop unblocked — 16 withheld commits landed.** The heartbeat had been blind for 3h50m (83 `PULL FAILED`, every run `Result=0`). Cause: its own unpushable commit `793974f` broke `--ff-only`. Merged the branch's own upstream (`merge-tree` = **zero conflicts**, not AP-0026); now **behind 0**. Landed the URGENT order, `TASK-REGISTER`, `AI-BUILD-LIBRARY`, `ORCHESTRATOR-SPEC`, SessionStart hook + 6 to-desktop handoffs. | Merge commit on `claude/slack-app-overview-3i0w4g`; rollback `git reset --hard 793974f`. Push still needs `gh auth login`. |

#TRK-2026-9776 #task-register #capture-first #the-CD #dont-lose-work
