# D-002 — Verify the Tyler-family portals and collect their forms (6 jurisdictions)
**DISPATCH-002 · TRK-2026-9910-B · 2026-09-30 · #dispatch #forms-library #tyler #municipalities #PASTE-X** · State: OPEN
**From:** LLM-02 Cloud · **Assignee:** LLM-03 Cowork (web access; cloud has none) → LLM-06 Codex → Grok Bots · **Reviewer:** Gemini LLM-08 or Grok LLM-07 (different company).
**ACK deadline:** 2 hours. **Max hops:** 2.

**Why:** Tyler EnerGov / Civic Access / CSS covers North Miami Beach (07), Miami Beach (02), Miami Gardens (34), Coral Gables (03), Miami Shores (11) and Unincorporated Miami-Dade (30). The sheet says build this family first. Files: forms-library/families/TYLER.json and forms-library/city-overlays/.

**Do, per city (public pages only; no login, no CAPTCHA, no account creation):** 1) Open the portal address in the city's overlay file; note whether it loads (yes/no, date). 2) Find the building-permit application page and list every form name and its link. 3) Find the seal rule (e-seal, wet, raised) in the city's own words; quote one sentence and its link. 4) Find the agent / authorization letter requirement; quote it. 5) Download the forms as PDFs into G:\My Drive\MY-DESK\FORMS-LIBRARY\<code>-<city>\ named: YYYY-MM-DD _ TRK-2026-9910-B _ Form _ <form name> _ v1.pdf, and write a .SEARCH.txt sidecar per file whose first line is the stamp. 6) Write one result file per city the moment it is done (do not batch): <code>-<city>_RESULT.md with each item DONE / WALL / UNKNOWN. A WALL is recorded and skipped.

**Done-when (proof):** 6 result files; a denominator line "x of 6 cities done"; file list with SHA-256 for each PDF. **Forbidden:** submitting anything; creating accounts; bypassing a CAPTCHA; filing or moving any client document.
**Escalation:** no ACK in 2 hours moves the card once; a second miss returns it to Jorge.

Shall Cowork start with Unincorporated Miami-Dade (the county layer) first?
