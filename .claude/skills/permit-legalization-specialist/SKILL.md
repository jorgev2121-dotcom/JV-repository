---
name: permit-legalization-specialist
description: Run Jorge's permit-processing and legalization workflow (work without permit, open or expired permits, code violations, unsafe structures) stage by stage for one job, using the 13-stage union workflow built from the #20001 and Art House (Medley) packages. Use when asked to process, advance, audit or build the portal/package for a permit or legalization job.
---

# Permit and legalization specialist

**Answer first:** work one job at a time through 13 stages; each stage has inputs, outputs, an owner, a typical blocker and a proof that it is finished. Nothing is done without the proof. The specialist drafts and tracks; **licensed humans seal and sign; Jorge approves, sends, pays and files.**

## The 13 stages (from agent-results/2026-09-30-research/W1_SAMPLE-PACKAGE-WORKFLOW.md)
1 Intake and number · 2 Identity and jurisdiction · 3 Violation and records search · 4 Scope, fee agreement and money terms · 5 Design team and sealed plans · 6 Authorizations and notarized signatures · 7 Contractor / qualifier · 8 File application and upfront fees · 9 Review cycle and rework · 10 Fee statement and permit issuance · 11 Inspections to final · 12 Violation closure · 13 Invoice, deliver, archive.
Machine-readable: `tools/vtes-panel/portal-workflow.js`. The job portal page `VTES-PORTAL.html` shows every job on this ladder.

## Rules
1. **Identity first:** TRK (or OPH), folio, owner of record, jurisdiction type (county, Town of Medley, Pembroke Pines/Broward…). Folio prefix 30 = unincorporated Miami-Dade; 22 = Medley. A county zero result does not clear a municipal violation.
2. **Three numbers are three fields:** tracking number, process number (C…), permit number. Never merge them. Closure needs the permit linked to the case.
3. **Proof per stage:** a dated file in the capsule, or a county page captured as a PDF (skill `county-status-capture`). No proof, no DONE.
4. **Human-only:** seals and signatures (architect/engineer), notarization, contractor licence and insurance, payments, sending, creating logins, price and acceptance, filing/merging client folders (RED). The specialist prepares the packet and the smallest owner action.
5. **Hashtags on every document body:** TRK, address digits (`#20001`, `#10980`), folio, owner, agency numbers, document type, stage. Never only in the filename.
6. **Hand-offs:** when the PC executor is red or silent, write a dispatch card (ROUNDTABLE-PROTOCOL.md): Desktop, then Codex, then Cowork, then Grok Bots; a different company reviews.
7. **Unsafe structures / expired permits:** the files hold no ordinance or board citation for these jobs. Chapter 8 (unsafe structures), Chapter 8CC and F.S. 162/713.13 are remembered, UNVERIFIED: check each before printing it in a document.
8. **Report** every job in the three states: DONE (with proof), BLOCKED (tried, why, the one small action), IN PROGRESS (what remains, when).
