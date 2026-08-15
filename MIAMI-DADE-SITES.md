# MIAMI-DADE-SITES.md — TRK-2026-9007

**Built by a cloud session 2026-08-15 from public research. Jorge did not have to
supply the list.**

**Purpose:** ~20 public records sources for property due diligence. The July Phase 1
attempt returned 3–4 of 20 — a context-exhaustion signature (RI-004). This time:
**one agent per site**, results written to disk on completion, status tracked here.

**Scope rule:** public, non-authenticated pages only. No logins, no paywalled data,
no circumventing access controls. If a source requires an account, it is marked
BLOCKED and escalated rather than worked around.

---

## Site registry

| # | Source | What it yields | Status | Notes |
|---|---|---|---|---|
| 1 | Property Appraiser — property search | Folio, owner, legal, characteristics, values | NOT_STARTED | The spine. Folio drives most other lookups |
| 2 | Property Appraiser — comparable sales | Sales history, comps | NOT_STARTED | |
| 3 | Tax Collector — real estate tax | Bills, payment status, delinquency | NOT_STARTED | |
| 4 | Clerk of Courts — Official Records | Deeds, mortgages, liens, satisfactions | NOT_STARTED | Highest due-diligence value after #1 |
| 5 | Clerk of Courts — civil case search | Litigation, foreclosures | NOT_STARTED | |
| 6 | Building Permit Selection Menu | Permit + inspection history by folio, open permits | NOT_STARTED | Best source for permit history |
| 7 | EPS e-permitting portal | Application and plan review status | NOT_STARTED | Best for in-flight applications |
| 8 | Building Support Case Search | Building code enforcement cases | NOT_STARTED | |
| 9 | Code Enforcement Online System | Citations, appeals | NOT_STARTED | |
| 10 | Neighborhood Code Case Search | Code violations | NOT_STARTED | |
| 11 | Unsafe Structures search | Unsafe structure cases | NOT_STARTED | Directly relevant to CU Inspections work |
| 12 | Certificates of Use search | Active CU on file | NOT_STARTED | Pre-2012 needs the archived engine — treat as 12b |
| 13 | Environmental Code Enforcement (DERM) | Environmental violations | NOT_STARTED | |
| 14 | DERM environmental public records | 2M+ environmental records | NOT_STARTED | |
| 15 | Building products / NOA search | Notice of Acceptance by product | NOT_STARTED | |
| 16 | Zoning / land use lookup | Zoning designation, overlays | NOT_STARTED | |
| 17 | City of Miami permits | Municipal permits | NOT_STARTED | Live jobs: TRK-2026-1289, 1292, 1531 |
| 18 | Miami Beach permits | Municipal permits | NOT_STARTED | Live job: TRK-2026-1268, 1500 Ocean Dr |
| 19 | Florida Sunbiz | Entity status, officers, registered agent | NOT_STARTED | Owner-entity verification |
| 20 | DBPR licensee search | Contractor licence status | NOT_STARTED | Live use: M. Zaldivar CGC renewal |
| 21 | Florida Product Approval | FL##### approvals | NOT_STARTED | Matches his FL13872, FL20359, FL29078 files |
| 22 | Pembroke Pines / Broward permits | Municipal permits | NOT_STARTED | **BROWARD, not Miami-Dade.** Live job TRK-2026-1611 |

**Note on #22:** Jorge has active work in Pembroke Pines, which is Broward County.
The brief says "Miami-Dade" but the job list does not respect that boundary. Flagged
rather than silently dropped.

---

## Method — per CLAUDE.md Rule 5

**Phase 1 — feasibility probe. One agent per site.** For each: is it reachable, what
input does it need (folio / address / name / permit number), is the result server-
rendered or JavaScript-built, does it need a form POST or session cookie, does it
block automation. **Output: one short report per site, written on completion.**

**Phase 2 — extraction**, only for sites that pass Phase 1 cleanly.

**Phase 3 — the hard tier.** Sites needing a real browser session go to the DESKTOP
executor, which has `claude-in-chrome`. Cloud cannot drive a browser. **This is
expected for several county portals and is not a failure.**

**No silent drops.** Every site ends this process as DONE, BLOCKED with a reason, or
NEEDS-DESKTOP. A site with no status is a defect.

---

## Why the last attempt returned 3–4

Recorded so the architecture is not quietly abandoned later:

One session tried to hold twenty scrapers at once. Page structure, test output and
error handling for twenty different portals exhausts a single context window at around
item four or five. **The session did not announce failure — it silently lost earlier
work and drifted.** Nothing tracked which sixteen were missing.

**One agent per site, each with its own fresh memory, results on disk as they land.**
That is the fix, and it is now Rule 5 of the charter.

---

## Open question

Which of these did the July Phase 1 actually deliver? That was never recorded, so
work may be repeated. **The desktop executor's backlog inventory (ADDENDUM-02, Task A)
should surface it — is the Phase 1 output still on the PC?**
