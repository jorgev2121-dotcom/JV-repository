# PASTE-LOG.md — Numbered paste blocks

**Problem this solves:** Jorge runs several Claude windows at once. When a reply
contains a block of text to paste somewhere, it is easy to lose track of which block
belongs in which window, and whether it was ever pasted at all.

---

## The scheme

Every paste block gets a permanent ID. **Numbers never reset and are never reused** —
the same rule as tracking numbers.

```
PASTE-D-001    →  paste into DESKTOP Claude Code
PASTE-C-001    →  paste into CLOUD Claude (claude.ai/code)
PASTE-X-001    →  paste somewhere else (named in the block)
```

**D** = Desktop. **C** = Cloud. **X** = elsewhere.

Reading sections in a reply are labelled **Section A, Section B, Section C**. Those
are for navigation only — they are never pasted anywhere.

**How to use it:** say "done with PASTE-D-002" or "PASTE-D-001 failed." That is
enough to identify it exactly, with no description needed.

---

## Rules

1. Every paste block in a reply carries its ID **on the first line inside the block**,
   so the ID travels with the text even when copied.
2. A paste is `ISSUED` until Jorge confirms. Confirmation is required — per
   `CLAUDE.md` Rule 2, an unconfirmed paste is not done.
3. If a block is replaced, the old ID is marked `SUPERSEDED` and points at the new
   one. Old IDs are never silently reused.
4. Anything requiring more than one window gets one ID per window, never a combined
   block.

---

## Issued

| ID | Date | Destination | Subject | Status |
|---|---|---|---|---|
| PASTE-D-001 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Bridge picker: MS Store button fails; launch by AppUserModelID. Terminal profile repair. Outlook `/cleanreminders`. Load the charter. | SUPERSEDED by PASTE-D-003 |
| PASTE-D-002 | 2026-08-15 | Desktop — same window | Stop building the OneDrive mailbox; use the repo. Pull the branch, read the charter, execute TRK-2026-9017. | SUPERSEDED by PASTE-D-003 |
| PASTE-D-003 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Consolidates D-001 and D-002 into one block: load charter, execute TRK-2026-9017, fix bridge button, repair terminal profile, clear Outlook reminder. | SUPERSEDED by PASTE-D-005 |
| PASTE-D-004 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | **Run BEFORE D-003.** Unpin Haiku 4.5 from `.claude\settings.json` and restart on Opus. See RI-008. | SUPERSEDED by PASTE-D-005 |
| PASTE-D-005 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Single pointer block. Merges D-003 + D-004. Fix model, restart, then work `mailbox/to-desktop/WORK-QUEUE.md` top to bottom. Survives restart because the work lives in the repo. | SUPERSEDED by PASTE-D-006 |
| PASTE-D-006 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | Fix model, restart, pull repo, work WORK-QUEUE.md. | SUPERSEDED by PASTE-D-007 |
| PASTE-D-007 | 2026-08-15 | Desktop — "Investigate Claude Code se…" | **One sentence.** "Check the mailbox in Drive." Everything else now lives in `G:\My Drive\_CLAUDE-MAILBOX\TO-DESKTOP.md`, written by cloud directly. | SUPERSEDED by PASTE-D-008 |
| PASTE-D-008 | 2026-08-16 | Desktop — "Investigate Claude Code se…" | Pull the repo for the new `orphan-onboarding` skill, then work `TASK-07` (heartbeat) and `TASK-08` (orphan sweep + the 22 county sites) from the Drive mailbox. | ISSUED |
| PASTE-D-009 | 2026-08-17 | Desktop — live executor session, C:\Users\JV | **One pointer.** Read `G:\My Drive\VTES-Inbox\TONIGHT-QUEUE_2026-08-17_ORDERED.md` and work it top to bottom. Four items, shortest first: verifier→roster · jacket hunt (9230) · **the 22×5 proof of concept (9250)** · tray launchers (9246). Nothing filed while Jorge is out. | ISSUED |
| PASTE-D-019 | 2026-08-21 | Desktop — live executor session | **Re-do TRK-2026-9246 to the REAL desktop.** Jorge asked (2026-08-21) for a Claude Code launcher icon. The earlier 9246 launchers landed in the invisible `C:\Users\JV\Desktop` (DESKTOP-9450) — put a launcher shortcut on `%OneDrive%\Desktop` instead, pin it to the taskbar, verify the path exists, and report it. Additive; nothing in `C:\Users\JV\Desktop`. Always-on notification-tray daemon deferred under FREEZE. | ISSUED |
| PASTE-D-020 | 2026-08-24 | Desktop — live executor session | **Streamline proposal + "what it might kill" review.** Points the desktop at `mailbox/to-desktop/STREAMLINE-PROPOSAL_2026-08-24.md`. Core = ENFORCE (a one-pass intake gate: TRK/OPH + OCR sidecar + body hashtags + capsule + footer stamp) not REPLACE; keep the Drive-mailbox handoff exactly as now; fix TRK-9082 rather than design around it. Asks the desktop to agree/rebut, add anything the streamline would kill, name the smallest FREEZE-safe first step, and reply via TO-CLOUD.md. | ISSUED |
| PASTE-D-021 | 2026-08-24 | Desktop — live executor session | **Alabama Jack's / Rick Santander contact + email (JOB-0086, OD-69).** Outlook via Windows index (no COM): find the `ricksmobile@mail.com` "Tempost" thread and report its date; check whether an Outlook contact with that email was created in Aug 2026 (report created-date); if a card exists, add/verify phone **786-663-3311** + surname **Santander**; if none, import the built-but-unimported `Rick-Santander-ORPH-2026-0587.vcf` from the 2026-08-21 unsent Draft and add the phone. Report via TO-CLOUD.md. Contact save/verify only — send no email. | SUPERSEDED by PASTE-D-022 |
| PASTE-D-022 | 2026-08-24 | Desktop — live executor session | **Save Rick Santander contact + DRAFT the invoice email (JOB-0086). Supersedes D-021 — Jorge confirmed the contact is correct; price confirmed $4,750.** (1) Save/verify the Outlook contact: Rick Santander · ricksmobile@mail.com · **786-663-3311** · Alabama Jack's · 58000 Card Sound Rd (import the built-but-unimported `Rick-Santander-ORPH-2026-0587.vcf` if no card exists). (2) Pull the repo, render `jobs/JOB-0086_Alabama-Jacks/INVOICE_JOB-0086_Alabama-Jacks_2026-0823-AJ.html` to PDF (MOVED 2026-08-24 into the job folder + hashtags stamped). (3) Create an Outlook **DRAFT** from `Jorge@TEAMUSASALES.COM` **to** `ricksmobile@mail.com` with the invoice PDF attached — **DO NOT SEND** (Jorge's gate). Also report the date of the existing `ricksmobile` "Tempost" thread. Report via TO-CLOUD.md. | ISSUED |
| PASTE-D-023 | 2026-08-24 | Desktop — live executor session | **Contact-dedup rule + first case (Jorge, live).** Rule for every duplicate: keep the bucket with the MOST notes, merge ALL notes from the duplicates into that keeper, then remove the extras. **Back up contacts first (VCF export); merge, do not hard-delete without the backup** (client records = handle like RED). First case Jorge flagged: **Miall Mulkay · elmija74@gmail.com · Mulkay Productions** (a Miami Art House / TUS-26-1033 client), a duplicate of entry #4 in the contact-cleanup list — find all entries for that name/email and merge per the rule. Report before/after via TO-CLOUD.md. | ISSUED |
| PASTE-D-024 | 2026-08-24 | Desktop — live executor session | ~~Add a statusLine block to settings.json~~ **CORRECTED by desktop 9667 — the original would have DESTROYED a working statusline.** `settings.json` already has a `statusLine` → `~/.claude/statusline-command.sh` that prints the model + folder; replacing it loses both. **Do this instead (live session, not headless — `.claude/` is blocked headless):** edit **line 6 only** of `C:\Users\JV\.claude\statusline-command.sh` to `echo "🖥️ CODE · DESKTOP EXECUTOR \| Jorge / CU Inspections \| [$model] \| $folder"`; **write UTF-8, NO BOM** (PS7 `[System.IO.File]::WriteAllText(...UTF8Encoding $false)`, never PS5.1 Set-Content/Out-File, or the emoji becomes `??` a 3rd time); back up first; then RUN it and look at the rendered line. Keep charter §10 banner + 🖥️ prefix regardless. | SUPERSEDED (see corrected instruction here) |
| PASTE-D-025 | 2026-08-24 | Desktop — live executor session | **One pointer — do the queued Desktop work in order, label first.** Pull the repo, then work these from PASTE-LOG.md and report each via TO-CLOUD.md: **D-024** (set the 🖥️ statusline first), then **D-022** (save Rick Santander's contact + draft, don't send, the Alabama Jack's $4,750 invoice email), then **D-023** (merge duplicate contacts per Jorge's rule, Miall Mulkay first, back up first). | ISSUED |
| PASTE-D-027 | 2026-08-29 | Desktop — live executor session | **One pointer.** Pull the repo and work `mailbox/to-desktop/WORK-ORDER_M365-RESET_PAPERPORT_OVERLAY_2026-08-29.md` (TRK-2026-9716): (1) M365 password reset for `jorge@teamusasales.com` via authenticator + straight into 1Password — ATTENDED, Jorge present; (2) PaperPort generic-thumbnail diagnosis (extends D-026, RI-021); (3) Tier-2 removal of the dead ABCD window-labeler overlay. Screenshots in `mailbox/to-desktop/screens_2026-08-29/`. Report via TO-CLOUD.md. | ISSUED |
| PASTE-D-026 | 2026-08-24 | Desktop — live executor session | **PaperPort intake sweep + business-card contacts.** (1) Confirm the PaperPort folder path (`C:\Users\JV\Documents\My PaperPort Documents`) and enumerate it — report the count and which files are image-only (blank thumbnails). (2) Run the intake gate on each: OCR the image-only ones → identity (TRK if job known, else OPH; never TRK-TBD) → hashtags in a `.SEARCH.txt` sidecar → note which already exist filed elsewhere (safe to remove from PaperPort) vs not. **Do NOT delete anything — report the list for Jorge's OK.** (3) Business cards: find the card scans in PaperPort, OCR them, extract name/company/phone/email/address, and CREATE the contacts in **Outlook (desktop)** + push to **Gmail/Google Contacts**. Back up contacts first; dedup per Jorge's rule (keep the fuller card, merge notes, no hard-delete, no duplicates). Report via TO-CLOUD.md. | ISSUED |

---

## Confirmed

*Blocks move here once Jorge reports the result, with the outcome recorded.*

| **PASTE-D-010** | 2026-08-18 06:30 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Reply on the Clerk two-line framing, the corrected liveness rule for snapshot files, and the `FileNotContains` gap | `PASTE-D-010_REPLY-TWO-LINES-AND-MY-BASELINE-WAS-WRONG_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-011** | 2026-08-18 07:24 UTC | Desktop → Cloud (inbound) | Run counter staged; the reconciler's stale list is producing false deaths | `PASTE-D-011_YES-RUN-COUNTER-STAGED-AND-YOUR-STALE-LIST-IS-FALSE_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-012** | 2026-08-18 08:20 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Bundle the run counter and `kind` field as one change; my liveness check was measuring Drive sync | `PASTE-D-012_ONE-CHANGE-AND-MY-MEASURING-CHANNEL-WAS-ALSO-WRONG_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-013** | 2026-08-18 08:42 UTC | Desktop → Cloud (inbound) | Bundled stager built; Drive is not dropping runs — the cause was aliasing | `PASTE-D-013_TWO-RUNS-ONE-CODE_AND-DRIVE-IS-NOT-DROPPING-RUNS_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-014** | 2026-08-18 09:25 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Hold the `kind` rollout for a positive control, not a clock; morning report consolidated | `PASTE-D-014_HOLD-BUT-NOT-FOR-24-HOURS_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-015** | 2026-08-18 09:10 UTC | Desktop → Cloud (inbound) | Positive control run green without applying: 5 of 5, live roster untouched; the 3-of-4 read-back trap | `PASTE-D-015_POSITIVE-CONTROL-RUN-GREEN-WITHOUT-APPLYING_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-016** | 2026-08-18 10:15 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Pre-flight the fixture on Bridge and Cowork; night closed from the cloud side | `PASTE-D-016_PREFLIGHT-YES-AND-THE-NIGHT-IS-CLOSED_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-017** | 2026-08-18 10:23 UTC | Desktop → Cloud (inbound) | Pre-flight run: there is no second loop; `Update-Wins-Fails.ps1` must not get the gate; passcode direct not mailbox | `PASTE-D-017_PREFLIGHT-RUN-THERE-IS-NO-SECOND-LOOP_TRK-2026-9299_2026-08-18.md` |
| **PASTE-D-018** | 2026-08-18 11:15 UTC | Desktop (via Drive `_CLAUDE-MAILBOX`) | Agreed on all four; the disproved claim was the desktop's own; passcode protocol adopted | `PASTE-D-018_AGREED-ON-ALL-FOUR-AND-THE-CLAIM-WAS-YOURS_TRK-2026-9299_2026-08-18.md` |
| **PASTE-X-002** | 2026-08-24 | Jorge → email (First Service Residential / The Plaza Condominiums) | Rewritten friendly-professional follow-up to Quanny & Silvio re: reactivating expired permits + window/door order | (chat only — email body, not a file) |
| **PASTE-X-003** | 2026-08-24 | Jorge → email (MDC Building Support / Code Compliance) | Follow-up requesting closure of code case/NOV 20260245510 (permit 2026061642 finaled 08-07) + a copy of the closed-case page as proof; drafted in Gmail, not sent | (Gmail draft threadId 1a035b50bb25a74b) |
