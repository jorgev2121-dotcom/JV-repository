# DECISIONS CENSUS — 2026-10-13

Read-only census of the VTES-Inbox decision files against their VTES-Outbox close-outs. Nothing in Drive was changed.
Agent: Claude Code cloud subagent (Opus 5.5). TRK: none issued (this is a census, not a job).

## Section A — Totals

**Headline: 100 decision files, 48 unique decisions. Taking the superseded stubs into account, 30 are really closed, 4 failed, and 14 are still open.**

1. **Files found:** 100 `DECISION_*` files in VTES-Inbox (`1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F`). Both list pages were read to the end, and no id appeared twice. A few unrelated files (MSG-/PASTE- names that only contain "DECISION") were left out.
2. **Unique decisions:** 48. That is DECISION_01 to 40 minus 29, plus RED-1 to RED-7 and TEST. Number 29 has only one file and is counted once.
3. **Duplicates:** 45 of the 48 decisions were filed more than once, which makes 52 extra copies. The worst ones:
   - RED-7 was filed 5 times.
   - RED-2 was filed 4 times.
   - 08 and 23 were filed 3 times each.
   - Every other duplicated decision has 2 files: the original `_APPROVE` and a re-filed `_APPROVE-1`.
4. **Mechanical status, using your rule on file names only:**
   - CLOSED: 76 files
   - FAILED: 10 files
   - OPEN: 14 files
5. **Correction, which is the load-bearing part:** 35 of the `EXECUTED_` close-outs are only 378 to 430 bytes. They are **not real executions.** Each one is an automatic stub that says "SUPERSEDED by …_APPROVE-1.md … Closed automatically by DECISIONS-FIRST-SELECTION-FIX, TRK-2026-9960/RI-056, 2026-10-06". The work moved to the newer file, so status has to be judged by that newer file.
6. **Real status, per decision:**
   - **CLOSED for real: 30.**
     - 24 have a real EXECUTED or BLOCKER file: 01–14, 23, 38, 39, 40, RED-1, RED-2, RED-3, RED-4, RED-6, RED-7.
     - 6 more are 32–37. Their `-1` re-file failed, but the original already had a real close-out on 2026-10-08. 32, 34 and 36 were EXECUTED-WITH-PROOF. 33, 35 and 37 were BLOCKER.
   - **FAILED for real: 4.** These are 28, 29, 30 and 31. Each live `-1` file failed verification twice ("Attempt 2 of 2 … left alone"), and the original's close-out is only a stub.
   - **OPEN: 14.** These are 15–22, 24–27, RED-5 and TEST. Each live `-1` file has only an ACK_ in the Outbox, and the original's close-out is only a stub.
7. **The 18 live open or failed items fall into four groups:**
   - CLOUD-DOABLE: 9
   - PC: 5
   - RED: 3
   - JUNK: 1 (the TEST file)
   - The 6 failed re-runs (32–37) are listed separately in Section E as duplicates to close.

**Caveat:** the Drive reader only returns the opening of each decision's ask, so the "work asked" lines below are summaries of that opening. The source report each one names is the full ask.

## Section B — CLOUD-DOABLE (9)

All 9 can be done with Drive, Gmail or Outlook-web, or the repo.

- **15 · JOB-0110 / TRK-2026-1265** · APPROVE · Fill the one gap named in the 09-03 owners-of-record report for the 8 Bal Harbour units, which is the Sunbiz officer lookup. Read-only web lookup plus a new report file. · OPEN · `1EkyIUSN-IlYVadOVdYambfhE9qWpVnIa`
- **17 · TUS-26-1033** · APPROVE · Build the owner approval board and status reply. Reply in `REPLY-TO-CHAT_OWNER-APPROVAL-BOARD-AND-STATUS-01.md` with a three-state close-out and "X of N" counts. · OPEN · `1FtUFLGXuw3LzUrffCZI8-7OUv9yKuGIs`
- **18 · TRK-2026-1294** · APPROVE · CDM reissue #1. RAMBO declined to take JOB-0100 as builder. Approval routes JOB-0100 builder work to the cloud lane. · OPEN · `1sFJ1bUekVCytp9WOzrQc5obBXD_LGQFu`
- **20 · TRK-2026-9757** · APPROVE · PASTE-D-049 close-out. The repo fast-forward is reported done. Verify it in git and record the close. · OPEN · `18Loe0CTzwX-t1Tlmv-EA1TdM2WWG-Ji_`
- **21 · JOB-0110** · APPROVE · Bal Harbour expired-permit reissue clock. Deliverable 3(b) is still open; it is research and a written answer. If it turns into contacting the building department, that part is RED. · OPEN · `1jOn9LbcLSzPXe7OYKwNYPNaETgRSCEUR`
- **22 · JOB-0098** · APPROVE · The stand-down on items 5–7 of CHAT-HANDOFF-20260831-01 needs explaining. Write Jorge the one-paragraph "why not taken" and close. · OPEN · `12cr7vm1IlX9HWqal2E6KhUpBef8Uc2nb`
- **24 · TRK-2026-1294** · APPROVE · Finish the CDM rulebook page cites, with author of record Team USA Sales / Jorge Valdes. Document work in Drive. · OPEN · `1T8cqaILDUpO7n2ZdODobCJYlcMoYZT9w`
- **31 · (no TRK)** · APPROVE · Standing-rules file CLAUDE.md, owner directive 01. It already exists in this repo, so verify it and close with the repo path as proof. · FAILED ×2 · `1jK_ozeFwPwST5VJ4a-Qtsjsj7beAhpQw`
- **RED-5** · APPROVE (daily yes/no) · "Remind me to run codex login at the next natural break". Setting the reminder is cloud work; the login itself is Jorge's. · OPEN · `1KiRpE-1tbon8CY2CR1efst_lJH_HUXc7`

## Section C — PC (5)

These need Windows, local files or desktop state.

- **16 · JOB-0110** · APPROVE · "No prior application in capsule". RAMBO desktop finding that needs a search of the local capsule. · OPEN · `1V2aT4OeFsTPAm5uYWbwIXSPyZSUWygoi`
- **25 · TRK-2026-1684** · APPROVE · The chain-of-title PDFs carry a watermark text layer, so every search gives a false zero. Re-scan the local PDFs while ignoring that layer. · OPEN · `1JE14jFjqEIdBBo9keBClyAmbfjlZmm9j`
- **27 · TRK-2026-1002** · APPROVE · All 4 impact-window certificates are expired, and the Plaza order was acknowledged but never started. Start that order in the desktop lane. · OPEN · `1AqZQPEvV7KuuTr5XNtuQwQsEiTDzFBBK`
- **29 · TRK-2026-9970** · APPROVE · The 330 GB transfer tree holds 5 invoices that neither book knows about. Follow-on to local PowerShell/Python inventory scripts under `C:\Users\JV\OneDrive\Documents\Reports\GKS-9970`. · FAILED ×2 · `1TCE_-qIDFfZGJn7TFOtZk-rWbXMJvMA0`
- **30 · JOB-0096** · APPROVE · System audit 01, a desktop system audit. The directive lives on the Continuity Board, Drive id `1g-8Rh9NOz4gU86Wg18hIMBNKihYYpm-i`. · FAILED ×2 · `13bS0-pv8PREkqPSmk5r2Xr3BKG2mXZ4X`

## Section D — RED (3)

These involve outbound contact, filing, spend or credentials, so they need Jorge.

- **19 · TRK-2026-9771** · APPROVE · Six orphans were onboarded (OPH-2026-0010 to 0015), and the Plaza permit block is a two-root split. The follow-on is filing or matching client documents, which is RED. Prepare it at night and execute it in the morning. · OPEN · `1gEy0QFEl54O5SXjIv0peTAPL0tL_psrU`
- **26 · TRK-2026-1265** · APPROVE · Plaza of Bal Harbour owners of record. Act on the two units the contact sheet ranked first and second "to file". This is filing or outbound to third parties. · OPEN · `1HNRTq4W7JV-jYKTswuRCokOeXEVvNMJZ`
- **28 · TRK-2026-9972** · APPROVE · An HOA payment is due, and it needs the portal login and bank numbers. That is spend plus credentials, which are Jorge's by rule. · FAILED ×2 · `1wfarm9VR3-vFOyY7nsL_XyLPo-NwA7Pq`

## Section E — Close as duplicate or junk (7)

**Recommendation: close the six failed re-runs (32–37) as DUPLICATE.** Each one asks for work that already has a real close-out from 2026-10-08. Re-running them is what produced the FAILED-VERIFICATION files.

1. **32 · JOB-0092 · OCR queue drain.** Already EXECUTED-WITH-PROOF on 10-08 as a "stale re-approval of completed work". · `1agIiR5urRrG78ZUML3Hs1i6en2fjiwsv`
2. **33 · 1Password Watchtower remediation.** Has a real BLOCKER. It is RED because it involves credentials. · `1VgiG_8EA0KTH8ctXl212jJP1TZtNmjqx`
3. **34 · JOB-0079 · Job contact cleanup.** Already EXECUTED on 10-08. · `1i_oDQ_NXPwBgN0yTVlOEOi_xcxcM4dRS`
4. **35 · JOB-0102 · Turn on Virtual Machine Platform.** Has a real BLOCKER. It needs a PC with admin rights, so Jorge has to click "Yes" on the UAC prompt. · `1eZ53mRoxo7ChM_h9C_rPOn-_AmgAY6FP`
5. **36 · TRK-2026-1294 · RFA pull.** Already EXECUTED on 10-08. · `1rHTRmENQAewP_A8T6mdj9WaduurUD0oL`
6. **37 · Make opusplan the default model.** Has a real BLOCKER: one double-click on the PC. · `14ImUU8inZc4oSiocDe65Ye98Jm1DisqM`
7. **TEST · DECISION_TEST_DROPPER-FIX_APPROVE.** The file only says "TEST decision - proves the dropper now catches DECISION files." No work is needed; close it as NON-JOB. · `1ZfPBR_isSgJhAzribG3kMxSGywusR1E1`

## Section F — Root cause, so this is not misread again

1. The decision board was re-dropped on 2026-10-08 at about 10:10 PM. That created an `_APPROVE-1` copy of every decision from 01 to 40.
2. On 10-06, DECISIONS-FIRST-SELECTION-FIX (RI-056) auto-closed each older `_APPROVE` file with an `EXECUTED_` stub that says "SUPERSEDED". A file-name check therefore reads these as closed even when no work was ever done.
3. The executor then worked down the `-1` copies. It reached 01–14 and 38–40. It failed twice on 28–37 and stopped ("left alone"). It never started 15–27.
4. **What to recognise in future:** an `EXECUTED_` file under about 500 bytes that contains "SUPERSEDED by" is a stub, not proof of work.

Shall I queue the 9 cloud-doable items next?

#decisions-census #VTES #JorgeValdes
