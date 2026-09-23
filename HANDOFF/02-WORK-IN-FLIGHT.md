# 02 - Work in flight (snapshot 2026-09-23, ~16:45 UTC)

**The full list is `../OPEN-ITEMS.md` (newest rows at the bottom).** These are the items this
session was actively driving.

## 1. Unit 29 re-sign package - TRK-2026-1667 (also TRK-2026-1310) - IN PROGRESS, URGENT

- **Who:** 10980 SW 202nd Dr, Unit 29, Cutler Bay. Owner 10960 SW 200TH AVENUE LLC, signer Eli Bleeman.
  Property manager Cinde Velazquez (cvelazquez@asdenproperties.com). Contractor MZ Solutions /
  Miguel Zaldivar (CGC1528486, qualifier last 4 = 4053). Engineer Pedro Fiallo PE 76100.
- **Status:** the county rejected permit process UP26075409 (smudged notary seal; it was also a New
  Jersey notary). Jorge is re-sending the package to Cinde from Outlook.
- **Before it goes out:** settle Eli's title (the signed original says **President**; the new forms say
  **Vice President**) and the value of work (**$11,500** original vs **$15,000** new). The source is
  Sunbiz, which the desktop can reach.
- **Files to attach:** permit application v5 (qualifier 4053), NOC v4, and the Certificate of Company
  Resolution v8 (repo: `.claude/skills/owner-authorization-poa/examples/TRK-2026-1667_LLC_reference.pdf`).
  **v8 names Jade De Armas.** Jorge first asked to leave her off this job, then asked for her to be
  added. v8 follows the later request.
- **Complete job folder on Drive:** id `1rZBZDVN8NMVxYz7Y-5K9NtzqkXJ91bWY`. Index and gap list:
  `../jobs/TRK-2026-1667_10980-SW-202-Dr-Unit-29/INDEX-AND-GAP-REPORT.md`.
- **Still to do:**
  1. Upload the 18 OCR sidecars from `../jobs/.../ocr/` to Drive folder 07 (`1oqBoXUaW1mGQ6AW_mQnzKA1wHSDCfaHN`).
  2. Upload resolution v8 to folder 01 (`1A1hRxIjARzMG2afWg1BV31IuA3-HTbX-`).
  3. Read the email-attachment harvest result in folder 05.
  4. Get the missing items: Sunbiz, Eli's driver's license, COI, executed MZ proposal, county
     rejection notice.
  5. Build the Team USA agreement and invoice for the job; its portal says "delivered, not billed".

## 2. Skills built today - DONE, awaiting merge

Draft PR https://github.com/jorgev2121-dotcom/JV-repository/pull/11 (branch `claude/fervent-bell-jp8xnx`).
The skills are listed in `03-SKILLS-INDEX.md`. **The master resolution template is locked** (v8, from
attorney Jacqueline R. Hernandez-Valdes's template).

## 3. E-signature and online notary research - DONE (reply 1:13 PM ET)

The reply is saved at `../.claude/skills/onboarding-package/ESIGN-RON-RESEARCH_2026-09-23.md`.
Recommendation: Zoho Sign ($10/month) and BlueNotary ($37/month for 2 sessions) or Proof ($25/session).
Florida RON is legal; the Miami-Dade Clerk e-records; City of Miami accepts RON. Nine cities are still UNCONFIRMED.

## 3b. (old) E-signature research as originally sent

Drive mailbox `MSG-CLOUD-TO-COWORK_ESIGN-AND-REMOTE-NOTARY-RESEARCH_TRK-2026-9961_2026-09-23.md`.
**Caution:** the desktop poller acknowledged it as queued for *Claude Code desktop*, not Cowork.
Confirm that Cowork actually got it.

## 4. Sunbiz is blocked in the cloud - BLOCKED on one setting

The fix: Jorge adds `search.sunbiz.org` to the cloud environment's allowed domains, or the desktop runs
`../.claude/skills/sunbiz-signer-check/sunbiz_lookup.py`.

## 4b. Jobs sent to the desktop today (Drive mailbox), pending

1. Save 2 Outlook attachments (county reviewer comments C2026170181 + signed scan 3225_001.pdf):
   **FAILED-VERIFICATION, attempt 1 of 2, re-queued.**
2. Payment pop-up for the Unit 29 county upfront fee C2026170181: sent 1:13 PM ET, no result yet.
   **The payment pop-up rule is now standing policy** (CLAUDE.md §12 Art. 5).
3. **Sunbiz titles: the most recent filing wins** (skill rule, 2026-09-23). Jorge: the Unit 29 re-sign
   email already went out as written.

## 5. Standing infrastructure faults (see ../OPEN-ITEMS.md and module 08)

- RI-038: the LiteLLM router flapped 3+ times today. Recommendation: remove it.
- The backup executor (Codex CLI) install is waiting on Jorge's one sign-in.
- TRK-2026-9955: the dictation tray tasks are dead on the PC.
