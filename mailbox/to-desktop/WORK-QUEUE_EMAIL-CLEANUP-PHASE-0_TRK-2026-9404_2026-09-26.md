# EMAIL CLEANUP — PHASE 0 (LLM + EMAIL ORGANIZATION)
**Fired by:** Cloud Session · **Date:** 2026-09-26 · **Status:** QUEUED — Execute after contact extraction jobs (TRK-2026-9401, TRK-2026-9402, TRK-2026-9403) or in parallel
**TRK:** TRK-2026-9404
**Priority:** NEXT — Queue after ROLODEX Phase 1 / Cowork Phase 2 completes OR run in parallel if bandwidth available

---

## TASK SUMMARY

Organize all Gmail and Outlook emails into a clean folder structure that matches the contact graph (once TRK-2026-9403 unified contact list is ready). Create subfolders under Gmail inbox + Outlook inbox organized by tracking number (TRK-2026-NNNN). Move or copy emails into their matching TRK folder so all communication on a job is grouped together. This prepares emails for forensic rebuild (OCR'd bodies, OCR'd attachments, hashtag cross-reference).

---

## PHASE 0 SCOPE

**This is Phase 0 — LLM guidance + email organization structure setup.**

**Not included in this phase:**
- Full OCR of email bodies and attachments (that comes later, in forensic rebuild)
- Email parsing or automated filing (too risky for client documents — manual verification required)

**What to do:**
1. **Structure setup:** Create folder hierarchy in Gmail `Labels` and Outlook folders:
   - Root: `01-JOBS` (to match Drive structure)
   - Subfolders: `TRK-2026-1262`, `TRK-2026-1263`, etc. (one per active job)
   - Within each TRK folder: `_INBOX`, `_SENT`, `_OTHER` (to keep thread direction clear)

2. **Email organization (manual verification required):**
   - Use the unified contact graph (TRK-2026-9403) once it's ready to identify which job each contact belongs to
   - **For each job number:** Search Gmail and Outlook for that TRK number in subject, body, or from-address
   - **Move or copy** matching emails into the corresponding TRK folder (Gmail Labels, Outlook actual folders)
   - **Flag uncertain emails** (cc only, no clear TRK) for Jorge to review before moving

3. **Synchronization:**
   - Gmail Labels and Outlook folders should mirror each other (same TRK numbers, same structure)
   - This ensures desktop (Outlook) and cloud (Gmail) stay aligned when contact extraction runs
   - Once both are organized, they become the canonical source for forensic email rebuild

---

## DEPENDENCIES

**Blocker:** Unified contact graph (TRK-2026-9403) should be complete before starting Phase 0 email filing. Contact graph tells you which TRK each email belongs to.

**Estimated contact graph ready:** 2026-09-26 ~20:10 UTC (30 min from now)

---

## WHY THIS MATTERS

Once emails are organized by TRK folder, the forensic rebuild (Phase 1+) can:
- Find all communication on a single job in one place
- OCR email bodies + attachments with the TRK already known
- Cross-reference by hashtag (`#TRK-XXXX`) across jobs and years
- Rebuild the complete history of a job from email alone

---

## EXECUTION CHECKLIST

- [ ] Contact graph (TRK-2026-9403) received and reviewed
- [ ] Gmail Labels created for all active TRKs (`01-JOBS/TRK-2026-NNNN/_INBOX/_SENT/_OTHER`)
- [ ] Outlook folders created (matching structure)
- [ ] Gmail inbox searched and emails moved to matching TRK folders by subject/body/sender
- [ ] Outlook inbox searched and emails moved to matching TRK folders
- [ ] Uncertain emails (cc-only, no clear TRK) flagged for Jorge review
- [ ] Folder structure verified (both Gmail and Outlook aligned)
- [ ] Report written: `EMAIL-CLEANUP-PHASE-0_TRK-2026-9404_2026-09-26.md` with folder count, emails moved, flags raised
- [ ] Status update to mailbox when complete

---

## TIMELINE

**Start:** After contact graph ready OR parallel to Cowork Phase 2 if bandwidth exists  
**Duration:** ~2–4 hours (depends on email volume and how many TRK folders need creation)  
**Deliverable:** Organized Gmail + Outlook with all emails sorted by TRK number

---

**Questions:** Is there anything unclear about the folder structure or organization approach? Ready to start?
