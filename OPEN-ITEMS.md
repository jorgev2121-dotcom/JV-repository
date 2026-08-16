# OPEN-ITEMS.md — Work Registry

**This is the ledger. A request that is not in this file does not exist.**

Chat conversations are not a backlog: they compress, they end, and dropped items are
never announced. Anything that matters gets a row here.

**Statuses:** `NOT_STARTED` · `IN_PROGRESS` · `DONE` (requires evidence) ·
`BLOCKED` (requires what-was-tried + the one thing needed)

**Tracking number format:** `TRK-2026-NNNN`, seeded at 1247, **+3 increment**.
**Authoritative registry:** `C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md`
**⚠ The `9xxx` numbers below are an internal admin band, NOT job numbers.** They were
issued on 2026-08-15 before the protocol was known. Reserved band — see TRK-2026-9027
and `CLAUDE.md` section 9. Never issue a job number from 9xxx.

---

## Active

| TRK | Item | Status | Notes |
|---|---|---|---|
| TRK-2026-9001 | Operating charter (`CLAUDE.md`) committed to repo root | DONE | Verified by read-back 2026-08-15 |
| TRK-2026-9002 | `RECURRING-ISSUES.md` created and seeded | DONE | Verified by read-back 2026-08-15 |
| TRK-2026-9003 | `OPEN-ITEMS.md` created | DONE | This file |
| TRK-2026-9004 | Confirm desktop Claude Code loads this charter | IN_PROGRESS | Desktop restarted on Opus 5, but the restart cleared its context — it must be re-pointed at the mailbox and repo |
| TRK-2026-9005 | Pop-up focus theft — Tier 2 removal pass | NOT_STARTED | See RI-001. Requires a desktop session. Cloud cannot touch the PC |
| TRK-2026-9006 | Pop-up focus theft — Tier 3 enforcement scheduled task | NOT_STARTED | Depends on 9005 |
| TRK-2026-9007 | Miami-Dade scrape — rebuild as one agent per site | **REASSIGNED TO DESKTOP** | Site list built (MIAMI-DADE-SITES.md, 22 sources) but **cloud is EGRESS_BLOCKED from miamidade.gov, miamidadepa.gov and sunbiz.org — tested, 403 on CONNECT.** See RI-019. Desktop has unrestricted network + claude-in-chrome |
| TRK-2026-9008 | Normalise `TRK-26-NNNN` → `TRK-2026-NNNN` across Drive and Gmail | NOT_STARTED | Two incompatible formats in use; searches silently miss records |
| TRK-2026-9009 | Assign identities to the `TRK-TBD` folders | **REVISED — EIGHT, not two** | Census 2026-08-16. **Five of the eight are units in one building, 10000 W Bay Harbor Dr (221, 301, 302, 404, 425)** — the same building the desktop just opened OPH-2026-0007 for. `TRK-TBD` is a defect by the charter's own words; eight of them collide in any sort. **They should be OPH numbers** |
| TRK-2026-9010 | Import the 300+ enhancement backlog into this file | NOT_STARTED | Scattered across chats and emails; cannot be delegated until it is a list |
| TRK-2026-9011 | Unstick desktop session "Test bridge buttons" | BLOCKED | Frozen awaiting an answer. Only Jorge can type into it — cloud has no channel to the PC |
| TRK-2026-9012 | Put TRK numbers in email subject lines | NOT_STARTED | Filenames already comply; subjects do not |
| TRK-2026-9013 | Fix BRIDGE-PICKER.hta MS Store button — launch by AppUserModelID | NOT_STARTED | See RI-006. Direct-path launch of an MSIX app is invalid |
| TRK-2026-9014 | Repair Windows Terminal profile "CLAUDE" (0x80070002) | NOT_STARTED | Bad path + malformed command line. See RI-006 |
| TRK-2026-9015 | Outlook reminder pop-up — run `outlook.exe /cleanreminders` | NOT_STARTED | Tier 2 fix for a corrupt reminder item. See RI-001 |
| TRK-2026-9016 | Close duplicate session "Test bridge buttons after w…" | NOT_STARTED | See RI-007. Frozen duplicate of the active bridge task |
| TRK-2026-9017 | Migrate OneDrive ClaudeMemory into this repo | NOT_STARTED | Message queued in mailbox/to-desktop/. Desktop only — cloud cannot read OneDrive |
| TRK-2026-9018 | Enable /voice in desktop Claude Code | NOT_STARTED | Type `/voice`, hold space. Windows: allow desktop apps mic access |
| TRK-2026-9019 | Evaluate Wispr Flow for system-wide dictation | NOT_STARTED | **v2.1.83 injection bug is moot — desktop is on v2.1.233.** That warning no longer applies |
| TRK-2026-9020 | Authorize Microsoft 365 connector (OneDrive read) | BLOCKED | Only Jorge can click the consent screen in claude.ai connector settings |
| TRK-2026-9021 | Unpin Haiku 4.5 in desktop `.claude\settings.json` | **DONE** | **VERIFIED 2026-08-16 by statusline screenshot: `Claude Code v2.1.233 / Opus 5 · Claude Max`.** Restart completed. `haiku-settings.json.disabled` blocks silent reversion |
| TRK-2026-9022 | Audit model used by every saved session | NOT_STARTED | Drift found across haiku-4-5, fable-5, opus-4-8. See RI-008 |
| TRK-2026-9023 | Adopt `_ pNNN` page-identity standard | DONE | Written into CLAUDE.md 9.1-9.3, verified on remote 2026-08-15 |
| TRK-2026-9024 | Add footer stamping to the document pipeline | NOT_STARTED | Filename identity is lost on print/screenshot; footer stamp is what makes pNNN pay off |
| TRK-2026-9025 | Install and configure Wispr Flow Pro | NOT_STARTED | See RI-010. Two modes: dictation + command. Free tier too small at 285 words/day |
| TRK-2026-9026 | Confirm `Alt+V` image paste in Claude Code | NOT_STARTED | See RI-009. `Ctrl+V` fails silently on Windows — this is why the window seemed broken |
| TRK-2026-9027 | Record the `9xxx` admin band in Tracking-Registry.md | NOT_STARTED | Cloud issued 9001-9027 outside the registry. Must be reserved so it never collides with jobs |
| TRK-2026-9028 | Resolve the two conflicting filename conventions | NOT_STARTED | See RI-012. **Blocks all filing automation.** Recommend adopting the Drive form |
| TRK-2026-9029 | Reconcile Tracking-Registry against Drive | NOT_STARTED | See RI-013. Numbers exist above the stated ceiling; collision risk on next issue |
| TRK-2026-9030 | Restore the microphone button | NOT_STARTED | See RI-011. Check Windows mic permission first; `Win+H` works meanwhile |
| TRK-2026-9031 | Read OWNER-DIRECTIVE_SUBORDINATE-TRK-HASHTAG-01 and reconcile | NOT_STARTED | **Governing directive adopted 2026-08-11 that neither the protocol nor CLAUDE.md reflects.** See TRK-REGISTRY §3 |
| TRK-2026-9032 | Rename address-first job folders to lead with TRK | NOT_STARTED | Two known: `20001 SW 110 CT Unit 143 (TRK-2026-1262)`, `14953 SW 34 ST (TRK-2026-1280)`. They sort away from every other job |
| TRK-2026-9033 | Complete the Drive survey (full-text + short-form + untagged) | IN_PROGRESS | First pass done: TRK-REGISTRY.md, 25 numbers. See §6 for what remains |
| TRK-2026-9034 | Re-enable the four OCR scheduled tasks + find what disabled them | **BLOCKED BY DESIGN** | See RI-015 for the cause. **Deliberately held until 9060 ships** — re-enabling now scales the untagged-sidecar defect. Agreed by both executors 2026-08-15 |
| TRK-2026-9035 | Restore the daily System Health email | NOT_STARTED | **Last one 2026-06-19.** It is the sensor for RI-015; without it, silent failures stay silent |
| TRK-2026-9036 | Stamp TRK into OCR sidecars at extraction time | NOT_STARTED | See RI-016. Only ~11% of sidecars carry a TRK today |
| TRK-2026-9037 | Enable Windows LongPathsEnabled | NOT_STARTED | See RI-017. Silent skip of deeply-nested files, which is where job documents live |
| TRK-2026-9038 | Count total PDFs vs total .SEARCH.txt for a real completion % | NOT_STARTED | Denominator unknown. Desktop can count locally in seconds |
| TRK-2026-9039 | Google Drive mailbox `_CLAUDE-MAILBOX` created | DONE | Folder + TO-DESKTOP.md + READ-ME-FIRST.txt written by cloud 2026-08-15 19:37 UTC, verified by API response |
| TRK-2026-9040 | Desktop to reply with TO-CLOUD.md | NOT_STARTED | Closes the loop and proves two-way. Until this exists, the channel is one-way |
| TRK-2026-9041 | Find and disable the model switcher | DONE | Found: `OneDrive\Scripts\Start-Claude-Model.ps1`, launched by Desktop icon `CLAUDE - PICK MODEL.cmd`. haiku-settings.json renamed .disabled. Evidence pasted by desktop 2026-08-15 |
| TRK-2026-9042 | Remove the `CLAUDE - PICK MODEL` desktop shortcut | **DEFERRED — do not action yet** | Jorge's call 2026-08-15: too risky while OCR is still broken. **Gate: only after OCR is verified working (9034-9038).** `haiku-settings.json.disabled` already blocks the silent downgrade, so the shortcut is currently harmless — it will fail loudly if used |
| TRK-2026-9046 | Reconstruct the 6-month request backlog from Drive + Gmail | IN_PROGRESS | **Highest-value cloud-only task.** Nothing can be delegated until the backlog is a list. Sources: JOB-*, OWNER-DIRECTIVE_*, ACK_*, PASTE_*, CROSS-LLM-THREAD, VTES batches |
| TRK-2026-9047 | Alec Valdes DD sweep — scrape + populate ORANGETREE | IN_PROGRESS | Plan written: ALEC-DD-PLAN.md. 4-5 properties, one City of Miami. Blockers anticipated on microfilm and tax jackets |
| TRK-2026-9048 | Reconcile AUTONOMY.md with the existing VTES-LOCAL-POLLER gate | NOT_STARTED | **Jorge already had a permission gate** (credentials/spend/email/signup). AUTONOMY.md was written without knowing. Do not run two models in parallel |
| TRK-2026-9049 | Bal Harbour Plaza — issue a TRK | NOT_STARTED | Appears in the ORANGETREE job but has no tracking number |
| TRK-2026-9050 | Resolve whether 1292 and 1531 are one property or two | NOT_STARTED | Both are 7823 NW 5 AV. Blocks the DD sweep |
| TRK-2026-9051 | Review the PAD verification-code routine | NOT_STARTED | **Running hourly since 2026-07-20, ~650 unattended runs.** Auto-re-requests security codes and sends push+email every hour. See RI-018 |
| TRK-2026-9052 | Audit every scheduled routine on the account | IN_PROGRESS | 3 found so far. Cloud can list its own; **desktop must inventory Windows Task Scheduler and the VTES-LOCAL-POLLER** |
| **TRK-2026-9053** | **Find `_WORK-REGISTER.csv` (183 rows) and pull it into this repo** | NOT_STARTED | **HIGHEST VALUE ON THE BOARD.** The backlog already exists as a file. Cloud cannot reach it; desktop can. See PROJECT_MARKETING-WALLY.md §1 |
| TRK-2026-1614 | PROJECT: Marketing — Wally | IN_PROGRESS | Provisional TRK. Plan assembled: PROJECT_MARKETING-WALLY.md. Gated on ~$99 one-off + $22/mo, not on work |
| TRK-2026-9054 | Send the Wally Milian / Alec Valdes 5-report email | BLOCKED | **Drafted and sitting in Outlook Drafts since 2026-07-30.** RED — outbound mail needs Jorge. Quickest win available |
| TRK-2026-9055 | Answer the 17 owner approvals from 2026-07-31 | BLOCKED | Presented once, never answered. 13 recommended APPROVE. Blocks ~40 downstream jobs by its own count |
| TRK-2026-9056 | File the 15 unfiled documents in PaperPort's holding folder | NOT_STARTED | See RI-020. At least 3 belong to live jobs (1262, 1611). **Zero carry a TRK.** Desktop only. Rollback script before any move |
| TRK-2026-9057 | Inventory every holding area on the machine | NOT_STARTED | See RI-020. PaperPort, Desktop, Downloads, `_OCR-INTAKE`, Outlook attachments. The class, not the instance |
| TRK-2026-9058 | Scheduled sweep reporting holding-area contents and age | NOT_STARTED | **Tier 3, the real fix for RI-020.** Documents landing in a holding area is normal; nobody being told they are still there is the failure |
| TRK-2026-9059 | Repair PaperPort Send To Bar | NOT_STARTED | See RI-021. Desktop Options → Send To Bar; repair install if that fails. Scanning unaffected — low urgency |
| TRK-2026-9060 | Build the INTAKE ID stamp + exit gate | NOT_STARTED | **The systemic fix for RI-020.** Gate on EXIT not entry — at scan time the TRK is often unknown. Blocks 9034 (OCR re-enable) by agreement |
| TRK-2026-9061 | Census the 6 confirmed holding areas | NOT_STARTED | Count and age only, do not file. **Time-boxed to an afternoon** — do not let the census become the stall |
| TRK-2026-9062 | Confirm TRK-2026-1582 and any other numbers missing from the registry | NOT_STARTED | Desktop referenced 1582; cloud's survey of 25 numbers did not find it. Another RI-013 data point |
| **TRK-2026-9063** | **Issue TRKs for 6 jobs the registry has never heard of** | NOT_STARTED | **14598 SW 110 ST (Migulez), 11385 NW 12 AVE (Rodriguez), 2262-2364 SW 2 ST (Gonzalez), 9907 NW 9 St Circle, 20723 SW 119 PL, 1185 SW 183 ST.** Documents exist, identity does not. Blocks filing ~15 docs |
| TRK-2026-9064 | **STOP — 14598 SW 110 ST was mis-mapped to TRK-2026-1262** | NOT_STARTED | **1262 is 20001 SW 110 CT. 14598 is SW 110 ST — different street, different party.** Conflated on "110". Would have misfiled a client's docs. See HOLDING-AREAS-INVENTORY corrections |
| TRK-2026-9065 | Adopt `OPH-2026-NNNN` orphan numbering | DONE | Jorge's design, adopted over cloud's INTAKE- proposal. `ORPHAN-NUMBERING.md` + CLAUDE.md §9. Verified on remote |
| TRK-2026-9066 | Create `OPH-REGISTER.md` and assign OPH numbers to all ~700 orphans | NOT_STARTED | Mechanical, plain sequential, no registry lookup needed. **This unblocks the 15 docs that were stuck waiting for TRKs** |
| TRK-2026-1614 | 14598 SW 110 ST — Migulez | NOT_STARTED | **ISSUED 2026-08-15, provisional.** ~7 documents waiting. Was nearly misfiled into 1262 on a "110" match |
| TRK-2026-1617 | 11385 NW 12 AVE — Yolanda Rodriguez | NOT_STARTED | **ISSUED, provisional.** folio 30-2135-010-0170, 3 versions in Downloads |
| TRK-2026-1620 | 2262-2364 SW 2 ST — Jose A Gonzalez | NOT_STARTED | **ISSUED, provisional.** City of Miami BB16003432 |
| TRK-2026-1623 | 9907 NW 9 Street Circle units 15-20 | NOT_STARTED | **ISSUED, provisional.** CU inspection report |
| TRK-2026-1626 | 20723 SW 119 PL | NOT_STARTED | **ISSUED, provisional.** CU report |
| TRK-2026-1629 | 1185 SW 183 ST | NOT_STARTED | **ISSUED, provisional.** Heating permit 2-14-2018 |
| TRK-2026-9067 | **Verify 1614-1629 against the master registry before filing** | NOT_STARTED | **BLOCKS filing under all six.** Cloud cannot read OneDrive. If any collide the block shifts up — nothing filed yet, so amendment is cheap |
| TRK-2026-9068 | Create job folders for the six new numbers | NOT_STARTED | Depends on 9067. Use the canonical folder convention, not address-first (see RI-012) |
| **TRK-2026-9069** | **Reconnect Claude Code Remote Control on Jorge-PC** | **STILL DOWN — retested 2026-08-16, `ListAgents` returned "No reachable agents"** | **HIGHEST-VALUE FIX AVAILABLE.** `Jorge-PC` bridge sessions show DISCONNECTED since 2026-08-09. This is the purpose-built direct channel — everything built today was a workaround for a channel that already existed and went dark unnoticed. See AUTONOMY-ARCHITECTURE §2 |
| TRK-2026-9070 | Desktop heartbeat — scheduled task, headless Claude Code, 15 min | **CLAIMED DONE by desktop 2026-08-16 — UNVERIFIED** | Turns the desktop from "runs when a window is open" into "runs forever". **Gated on 9035 (health report) per RI-015** — do not add a task nothing watches |
| TRK-2026-9071 | Prove the loop with no human in it | NOT_STARTED | Cloud writes a task, desktop executes and replies, cloud confirms — with Jorge absent. **This is the acceptance test for the whole architecture** |
| TRK-2026-9072 | Push notifications to Jorge's phone for RED items only | BLOCKED | **Unblocked by 9069.** Cloud can push to his phone *only when Remote Control is connected* — so restoring it fixes the desktop channel AND the phone path. RED items only, or he mutes them and it becomes another dead sensor |
| TRK-2026-9073 | Build an orphan-onboarding SKILL | **DONE 2026-08-16** | `.claude/skills/orphan-onboarding/SKILL.md` + `ORPHAN-REGISTER.md` pushed. Auto-loads for desktop and cloud alike because it lives in the repo. Encodes the 6 steps, the four outcomes, the anti-fuzzy-match rule, the batch fan-out rule, and the tested access split |
| TRK-2026-9074 | Survey Dropbox for orphans | NOT_STARTED | **NEW location, 2026-08-16.** No cloud connector — desktop only, local folder |
| TRK-2026-9075 | Hunt for unidentified holding areas | NOT_STARTED | USB20FD (E:), Seagate (B:), phone photos, WhatsApp/SMS, second scanner folder, Jorge-Backup, exports. **The forgotten ones are the dangerous ones** |
| TRK-2026-9076 | Schedule the 22 Miami-Dade sources on the desktop heartbeat | NOT_STARTED | **Split pending 9077.** Browser-dependent sites (Granicus, JS, form-driven) stay desktop permanently. Machine-readable sites move to cloud once the allowlist opens |
| TRK-2026-9077 | **Open the cloud environment's network allowlist** | **BLOCKED — needs Jorge, ~6 clicks** | ROOT CAUSE of the county blocker found 2026-08-16. Environment is on default **Trusted** access. `WebFetch` returns `EGRESS_BLOCKED` where `curl` returned a meaningless `000`. Fix: claude.ai/code → environment selector → settings icon → Network access **Custom** → paste domain list → tick "also include default package managers". Domains and click path in `MIAMI-DADE-SITES.md`. **Tier 2 — a stored setting, does not decay** |
| TRK-2026-9078 | Probe all 22 sources one agent per site, after 9077 | NOT_STARTED | Gated on 9077. Classifies each source as cloud-capable (API/static/ArcGIS) or desktop-only (browser required). **No guessing which is which — Rule 5, one agent per site, result written on completion** |
| TRK-2026-9079 | **Night protocol — standing** | **ACTIVE POLICY 2026-08-16** | Owner directive: nights are for long runs, lined up, never stopped. `NIGHT-PROTOCOL.md` + `CLAUDE.md` Rule 8 + `OVERNIGHT-QUEUE.md`. Queue never empty; heartbeat detects a dead run by output growth, not process existence |
| TRK-2026-9080 | Keep `OVERNIGHT-QUEUE.md` stocked to 12+ hours | RECURRING | **Refilling the queue is itself a queue item.** Whichever session notices it running short refills it |
| TRK-2026-9081 | OCR Queue A — files already under a TRK folder | NOT_STARTED | **The safe subset that runs tonight.** TRK knowable from the folder path, so the sidecar stamps correctly at write time. Does not touch the held Queue B |
| TRK-2026-9082 | **Desktop `git push` is broken — stop claiming "committed to repo"** | **CONFIRMED 2026-08-16** | Fourth RI-002 instance. Desktop reported ORPHAN-REGISTER.md committed; no desktop commit on the remote, all commits are cloud's. Mechanism: Windows Credential Manager. **Standing workaround: desktop writes to the Drive mailbox, cloud mirrors to the repo** |
| TRK-2026-9083 | Extract identity from OPH-2026-0001 `E-1.01-REV#2.pdf` | NOT_STARTED | **Best orphan lead found so far.** `E-1.01` is a standard electrical sheet number, `REV#2` a revision marker — reads as a plan sheet from a permit set. Needs address/folio/permit/engineer from the title block. Desktop only, file is on `E:` |
| TRK-2026-9084 | `B:` capacity-used vs files-found | **BLOCKING the B: survey** | 5 files on a 4 TB drive, and all five are Seagate factory contents. Genuinely empty and scan-missed-everything look identical from the register. Requested in TASK-09, unanswered. **`B:` is not a completed survey until this number exists** |
| TRK-2026-9085 | **The 17 owner gates, recovered and written up** | **DONE 2026-08-16** | `OWNER-GATES.md`. Recovered from Drive: `OWNER-APPROVALS-PENDING_CODE_2026-07-31.md`. **Seventeen, not twelve** — five were opened 7/30-31 and never counted. **They block 45 jobs and have sat 16 days.** Answerable one word each |
| TRK-2026-9086 | **Audit `MASTER-UNFINISHED-WORK-REGISTER` batches 1 and 2** | NOT_STARTED | **The most important document found in Drive so far.** Classifies past work as VAPOR (claimed but proven never executed) / UNPROVEN / DECISION-PENDING / PROVEN. It is the evidence base for Jorge's 18-month complaint. Batch 1 read; Batch 2 not yet |
| TRK-2026-9087 | **Check whether a DigitalOcean server is billing** | **NEEDS JORGE — 10 min, before 2026-09-01** | JOB-0069: a $96-100/mo VPS was ratified 8/6, acknowledged delivered, then admitted never to exist. **Account IS real** — welcome mail 8/7, marketing 8/9 and 8/13. **No invoice in 60 days of Gmail**, but DO bills in arrears so the first would land ~9/1. Only Jorge can see the Droplets page |
| TRK-2026-9078 | Probe all 22 county sources, one agent per site | **DONE 2026-08-16 — 22 of 22 closed. 20 proven, 2 partial, 0 without a status** | 13 EXECUTED-WITH-PROOF, 1 PARTIAL (site 04, Cloudflare Turnstile — correctly not worked around), 8 still running. Results in Drive `COUNTY-PROOF-TRK-2026-9078`, mirrored to `COUNTY-PROOF-RESULTS.md` |
| TRK-2026-9088 | **Fix the dead PA host in the `county-data-sources` skill** | NOT_STARTED | Old host 301s and **silently drops the query string**, so it answers HTTP 200 with an error page and reads as a retired API. Replace `www.miamidade.gov/Apps/PA/PApublicServiceProxy` with `apps.miamidadepa.gov/PApublicServiceProxy` everywhere. Desktop-side file |
| TRK-2026-9089 | **Merge TRK-2026-1531 into 1292 — same parcel** | **NEEDS JORGE — RED** | Folio 01-3112-016-0030 proves one property double-filed. Merging job records is never unattended. One word: merge, or leave both cross-referenced |
| TRK-2026-9090 | **TRK-2026-1286 — candidate found: `11997 SW 218 ST`, folio 30-6912-004-0951** | **NEEDS JORGE — one question** | `1997 SW 218 St` does not exist; `11997 SW 218 ST` does — dropped leading digit. Duplex built 2024, bought $100k 2023, sold **$765,000** Jan 2025. Construction-era trust is literally **THE JG 11997 LAND TRUST**. **NOT FILED — no county document names Alec or Avis on the parcel.** Q: does the 1286 file mention Rosales Rodriguez, Diaz Flores, Rabinovich, JDBE, or the JG 11997 Land Trust? |
| TRK-2026-9091 | Re-run TRK-2026-1289 against the child unit folios | NOT_STARTED | `01-4102-098-0001` is a condo MASTER/REFERENCE folio — no owner, no assessment, no sales, by design. Researching the parent returns empty and **looks like a completed job**. Enumerate the unit folios beneath `1658 NW 1 STREET CONDO` first |
| TRK-2026-9092 | Add the county master-address ArcGIS endpoint to the skill | NOT_STARTED | `gisweb.miamidade.gov/.../AddressSearchMap_PropertiesWithZip/MapServer/0/query`. **Does the one thing PA search cannot — prove an address does NOT exist.** Validates an address before a job is opened, which is upstream of the whole misfiling problem. Gotcha: streets stored ordinal, `218TH` not `218` |
| TRK-2026-9093 | Possible unpermitted structure — folio 01-3112-016-0030 | NOT_STARTED | County says VACANT RESIDENTIAL, living area 0, year built 9999 — yet lists 6 bed / 4 bath and sold $320,000 against a $222,523 value. **Signature of unpermitted structure on a parcel the roll shows vacant.** Directly CU Inspections' work |
| TRK-2026-9099 | **Read `_WORK-REGISTER.csv` and mirror it into the repo** | **DESKTOP — small, highest value** | Path recovered from batch 2. **167 open items: 12 owner gates, 59 VTES jobs, 8 lanes, 28 client matters, 21 never-built protocols, 19 bizdev, 15 CRM gaps.** This is the '200-300 requests' — one CSV on his own machine that no session has opened. Converts the backlog from a feeling into a list |
| TRK-2026-9100 | **⚠ Count Dropbox before it lapses** | **URGENT — the only holding area with a clock** | Batch 2 standing item: *'Dropbox → OneDrive de-dupe merge **before Dropbox lapses**'*. No date given. **Dropbox has never been surveyed (9074).** If it lapses first, anything only in Dropbox is gone. **A count is GREEN and unattended-safe — do that before any migration** |
| TRK-2026-9101 | Run batch 3 of the unfinished-work register | **NEEDS JORGE — three words** | *'Batch 3 (client-matter and bizdev streams) follows on owner command **continue the register**.'* **28 client matters and 19 bizdev items** have never been swept. Client matters are the revenue side |
| TRK-2026-9102 | The three tasks ordered repeatedly and never delivered | NOT_STARTED | **Job-tree dashboard** (JOB-0026), **full status ledger** (0048→0051-A→0079, ordered 3x), **intake TRK watcher** (0025→0058 — same gap as RI-020 and 9060). **Rule 4: re-ordering a 3x failure without changing the mechanism produces a 4th non-delivery** |
| TRK-2026-9103 | Version-log gap map | **DONE 2026-08-16** | `VERSION-LOG-GAP-MAP.md`. **1 of 19 job folders has a version log — 5%.** Close to the 4% completion rate from the Registrar sweep; two unrelated measurements landing on the same figure |
| TRK-2026-9104 | **⚠ TRK-2026-1262 has TWO folders under different parents** | **NEEDS JORGE — RED** | `20001 SW 110 CT Unit 143 (TRK-2026-1262)` created 7/03 and `TRK-2026-1262` created 8/12, different parents. **One job, two homes — a document filed correctly by number can land in either, and a search of one returns a complete-looking answer.** A split job looks whole from both sides. Merging folders is RED |
| TRK-2026-9105 | Do NOT bulk-create version logs | **POLICY** | A retroactive log says 'v1, created today, no changes known' — a file that looks like compliance and carries nothing. **Same shape as the mass ACK.** The log must be written when a version changes, which puts it in the same mechanism as the intake stamp (9060) |
| TRK-2026-9106 | `01-JOBS` folder census | **DONE 2026-08-16** | `JOBS-FOLDER-CENSUS.md`. **29 job folders: 14 carry a TRK-2026 number, 8 carry TRK-TBD, 6 use another scheme, 1 carries nothing.** Roughly half are invisible to the canonical search |
| TRK-2026-9107 | **⚠ TRK-2026-1614 may duplicate TUS-25-1023** | **NEEDS JORGE — do not use 1614** | `TUS-25-1023 _ 30-5910-018-0210 _ 14598 SW 110 St` already exists **with the folio recorded**. 1614 was issued 8/15 from a survey that searched `TRK-2026` and could not see a `TUS-` prefix. **This is the collision the registry protocol exists to prevent, caused by scheme drift.** Retire 1614, or migrate TUS-25-1023 to it? Renaming is RED |
| TRK-2026-9108 | **FIVE identity schemes in live use, not two** | NOT_STARTED | `TRK-2026-`, `TRK-26-`, `TUS-YY-`, `KAR-26-`, `JOB-NNNN`, plus one folder with no identifier. RI-012 recorded two conventions; the census found five. **A `TRK-2026` search finds 14 of 29 folders** |
| TRK-2026-9109 | Groves at Sunset appears under two schemes | NOT_STARTED | `TRK-2026-1256 - Groves at Sunset (Karla)` and `KAR-26-GROVES _ 8850 SW 72 St Groves at Sunset Pool`. Possibly two genuine scopes, possibly one job filed twice. **Needs a look, not a guess** |
| TRK-2026-9110 | **FOUR unsent `SEND-ME_` emails, not one** | **NEEDS JORGE — RED, outbound** | In `01-JOBS` root: Wally/Alec 5-report package (6.6 MB), Alec CRM Welcome, CrossCollateral Explainer, Team CRM Launch. **All finished, all from 2026-07-30/31, none sent.** Three of the four are the Alec CRM launch sequence — the marketing pipeline Jorge called 'the window' |
| TRK-2026-9111 | **RECONCILER-01 is ALIVE — the watchdog exists** | **CORRECTION 2026-08-16** | `WATCHDOG-FOUND.md`. Ran 05:40 ET, 30-min cadence, 54 files ledgered, **dead-man reissue posted for the stalled Orange Tree job**. Cloud twice reported this check 'has never been built' — wrong, it writes to four VTES lanes cloud never searched. **Detection and re-queueing both work; only session-start is missing** |
| TRK-2026-9112 | **Refine the ACK diagnosis** | NOT_STARTED | An auto-ACK fired 06:01 ET reading `Status: received`, not 'done'. **The ACK is honest — the failure was downstream, where 'received' was read as completion.** Better news than `UNFINISHED-WORK-AUDIT.md` §3 states. **Do not disable auto-ACKs**; ensure nothing treats `received` as a completion state |
| TRK-2026-9113 | Orange Tree job REISSUED and queued | **WAITING ON A DESKTOP WINDOW** | The reconciler reissued it at 05:40 ET. Note on the ACK: *'Queued for Claude Code's next work session.'* **It will run the moment a window opens** — nothing else is needed |
| TRK-2026-9114 | **Reconciler output-check spec** | **SPEC WRITTEN 2026-08-16 — not implemented** | `RECONCILER-OUTPUT-CHECK-SPEC.md`. One `_WATCHLIST.csv`, one size comparison, two report lines. **Makes `Crisis flag` false-able by work not happening, not only by a component dying.** Tier 3 enforcement. Nothing was changed — modifying a running component is Jorge's call |
| TRK-2026-9115 | **⚠ 'SWEEP' — 180 documents, one word, unknown destination** | **NEEDS JORGE — ask before saying it** | `HOUSEKEEPING-ROUND_2026-08-16.md` regenerated 07:30 ET reading *'DESKTOP: 180 old documents ready to sweep - say SWEEP to Claude'*. **Cloud does not know what SWEEP moves, where to, or whether it is reversible.** Moving 180 client documents unattended is exactly the failure mode that gets found months later by a client. **Ask what it does before saying the word** |
| TRK-2026-9116 | BACKUP-BRIDGE-01 heartbeat is alive | **CORRECTION** | Batch 1 of the unfinished-work register records *'BACKUP-BRIDGE-01 heartbeat never appeared'* under VAPOR. **`HEARTBEAT_BACKUP-BRIDGE.md` was written 11:20 UTC today.** It exists and is running. Another item audited as vapor that is in fact live |
| TRK-2026-9094 | **No public search exists for any CU issued 2012→today** | **CONFIRMED — affects every DD report** | Modern search retired; `www8.miamidade.gov` does not resolve; Advanced Search is login-walled. Pre-2012 archive works but is titled "for Foreclosed Properties" and the county's own link to it is broken in their CMS. **The gap must be stated in reports — silence reads as 'no CU found'.** Routes: registered account, RER-CUINFO@miamidade.gov / (786) 315-2660, or public-records request |
| TRK-2026-9095 | **AVIS BUILDERS LLC business tax UNPAID 2026, registered at Jorge's home** | **NEEDS JORGE** | County BusinessTracker: receipt 7522092, ACCSTATUS Active, PAIDSTATUS **Unpaid**, at `13633 SW 142ND TER` — which the Property Appraiser confirms is `JORGE VALDES`. **SEICO CONSTRUCTION CORPORATION** (same qualifier, 14395 SW 139TH CT) also Active and Unpaid. Reported as recorded; no inference drawn |
| TRK-2026-9096 | Add BusinessTracker + PA-via-ArcGIS to the county skill | NOT_STARTED | `gisweb.miamidade.gov/.../BusinessTracker/MapServer/0/query` answers 'who holds a live licence here' and surfaces commercial activity at residential addresses. `EnerGov/MD_LandMgtViewer/MapServer/12` resolves address→folio with no key |
| TRK-2026-9097 | Rule: read the body, never the status code | NOT_STARTED | miamidade.gov returns **HTTP 200** with a NetScaler auto-submit JS form where JSON is expected. **Both false walls tonight were 200s and 301s.** Any scraper checking only the status code records success and stores garbage |
| TRK-2026-9098 | City of Miami CU for 7823 NW 5 AVE | NOT_STARTED | Municipal CUs are issued by the city and never appear in county engines. Folio `01-`3112-016-0030 is City of Miami, so its CU lives with the City |
| TRK-2026-9043 | Clone the repo onto the PC | NOT_STARTED | **Desktop has no .git anywhere — the repo was never cloned.** This is why it cannot find WORK-QUEUE.md |
| TRK-2026-9044 | Consolidate the six Drive mailboxes | NOT_STARTED | Confirmed existing: VTES-Bridge, VTES-Inbox, VTES-Outbox, VTES-Capture-Inbox, PASTE-TRAY, _CLAUDE-MAILBOX. VTES-Bridge holds VTES-OWNER-CHARTER-and-HANDOFF v1+v2 |
| TRK-2026-9045 | Reconcile VTES charter against CLAUDE.md | NOT_STARTED | `VTES-OWNER-CHARTER-and-HANDOFF-v2.md` in VTES-Bridge is a second charter cloud has not read |

---

## Miami-Dade site registry — TRK-2026-9007

Approximately 20 Miami-Dade County public websites, scraped for permissible public
records, reformatted and merged into a due-diligence report.

**Architecture (per `CLAUDE.md` Rule 5):** one subagent per site. Each writes its
result to disk on completion. Never a single session iterating through all 20.

| # | Site | Type | Status | Output file |
|---|---|---|---|---|
| 1 | *to be filled* | | NOT_STARTED | |
| 2 | *to be filled* | | NOT_STARTED | |
| 3 | *to be filled* | | NOT_STARTED | |
| 4 | *to be filled* | | NOT_STARTED | |
| 5 | *to be filled* | | NOT_STARTED | |
| 6 | *to be filled* | | NOT_STARTED | |
| 7 | *to be filled* | | NOT_STARTED | |
| 8 | *to be filled* | | NOT_STARTED | |
| 9 | *to be filled* | | NOT_STARTED | |
| 10 | *to be filled* | | NOT_STARTED | |
| 11 | *to be filled* | | NOT_STARTED | |
| 12 | *to be filled* | | NOT_STARTED | |
| 13 | *to be filled* | | NOT_STARTED | |
| 14 | *to be filled* | | NOT_STARTED | |
| 15 | *to be filled* | | NOT_STARTED | |
| 16 | *to be filled* | | NOT_STARTED | |
| 17 | *to be filled* | | NOT_STARTED | |
| 18 | *to be filled* | | NOT_STARTED | |
| 19 | *to be filled* | | NOT_STARTED | |
| 20 | *to be filled* | | NOT_STARTED | |

**To populate:** paste the list of 20 URLs, or point a desktop session at the
existing Miami-Dade Phase 1 brief and have it fill these rows.

**Known so far:** 3–4 sites were delivered in the July Phase 1 POC. Which ones is
not recorded anywhere — that is itself the problem this file exists to prevent.

---

## Completed

*Items move here with their verification evidence attached.*
