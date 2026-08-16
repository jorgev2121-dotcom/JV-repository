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

## ⚠ BLOCKER FOUND 2026-08-15 — cloud cannot reach these sites at all

**Tested, not assumed.** A cloud session attempted three probes and all failed at the
network layer:

```
www.miamidadepa.gov   -> EGRESS_BLOCKED  (CONNECT tunnel failed, 403)
www.miamidade.gov     -> EGRESS_BLOCKED  (CONNECT tunnel failed, 403)
search.sunbiz.org     -> EGRESS_BLOCKED  (CONNECT tunnel failed, 403)
```

The cloud container's egress proxy refuses these domains. This is an environment
policy, not a site defence, and **it is not something to work around** — routing
around an access control the environment owner set is out of bounds.

**Consequence: the entire Miami-Dade scrape is impossible from cloud.** So is Sunbiz.

**This corrects a claim made earlier the same day.** Cloud told Jorge it would take
public web scraping as its half of the division of labour and deliver Phase 1 by
morning. **That was stated without testing a single county URL.** It is the same
error shape as RI-014 — confident capability claims made from assumption rather than
evidence.

**Reassignment: ALL 22 sites go to the DESKTOP executor.** It has unrestricted network
access and `claude-in-chrome` for the portals that need a real browser session.

**What cloud can still contribute:** the registry itself, the method, the per-site
status tracking, the report assembly once data comes back, and any source that turns
out to be reachable. **Cloud is the librarian here, not the field agent.**

---

## ✅ ROOT CAUSE FOUND 2026-08-16 — it is a setting Jorge owns, not a wall

**The earlier entry above diagnosed the symptom correctly and the cause wrongly.**
"The egress proxy refuses these domains" is true. "Therefore the scrape is impossible
from cloud" does not follow.

**Re-tested 2026-08-16 through a second, independent path.** The earlier probes used
`curl` and returned a bare `000`, which says only "no connection." `WebFetch` returns
the reason:

```
miamidade.gov                     -> EGRESS_BLOCKED "blocked by the network egress proxy"
miamidadepa.gov                   -> EGRESS_BLOCKED
search.sunbiz.org                 -> EGRESS_BLOCKED
onlineservices.miamidadeclerk.gov -> EGRESS_BLOCKED
code.claude.com                   -> 200 (control — fetched the full docs page)
```

**`EGRESS_BLOCKED` is not the county refusing. It is Jorge's own cloud environment
refusing**, under a setting he chose — or more precisely, one that was chosen for him
at onboarding and never revisited.

Per the Claude Code documentation, every cloud environment carries one **Network
access** level:

| Level | Outbound connections |
|---|---|
| **None** | nothing |
| **Trusted** | allowlisted domains only: package registries, GitHub, cloud SDKs |
| **Full** | any domain |
| **Custom** | your own allowlist, optionally including the defaults |

**This environment is on Trusted, the default.** Miami-Dade is not a package registry,
so it is not on that list. That single fact explains every failed probe.

### The distinction that matters — two different failures wearing one name

The desktop reported **403 bot-blocking** on Granicus portals and fixed it with
Chrome. **That is a different failure from this one**, and conflating them wastes
another cycle:

- **Desktop's 403** — the site answered and refused a non-browser client. Chrome fixes
  it, because the fix is *looking like a browser*.
- **Cloud's EGRESS_BLOCKED** — no connection was ever made. The request died inside
  Jorge's environment before it reached Miami-Dade. **Chrome cannot fix this, and
  neither can any tool, because there is nothing to look like.**

Both are real. Both have fixes. They are not the same fix.

### Tier 2 — remove the cause. Roughly six clicks.

Per Rule 4, the durability tier is named: **Tier 2, Removal.** It is a stored
environment setting, so it does not decay and does not need re-applying.

1. Go to **claude.ai/code**
2. Find the **environment selector** — the cloud icon
3. Hover the environment and click the **settings icon** on the right
4. Set **Network access** to **Custom**
5. Paste the domain list below into **Allowed domains**
6. Tick **"Also include default list of common package managers"** — without it,
   GitHub and the package registries stop working and this repo breaks
7. Save

```
*.miamidade.gov
*.miamidadeclerk.gov
*.miamidadepa.gov
*.sunbiz.org
*.floridados.gov
*.myfloridalicense.com
*.floridabuilding.org
*.miamigov.com
*.miamibeachfl.gov
*.ppines.com
*.broward.org
*.arcgis.com
*.granicus.com
```

**`Full` would also work and is one click instead of a paste.** Custom is
recommended over Full because it states what this environment is for; the practical
difference for Jorge is nil. Either is his call.

### What this does and does not buy — stated before testing, deliberately narrow

**Do not read this as "cloud can now do all 22."** That is exactly the claim shape
that produced RI-019, and it is not being made again.

Opening the allowlist gets cloud the **top three rungs of the desktop's own ladder** —
API, static endpoint, ArcGIS. Those are plain HTTP and work fine without a browser.
Miami-Dade publishes a substantial ArcGIS and open-data surface, so this is not a
small slice.

**The bottom rung stays with the desktop permanently.** Granicus portals, JavaScript-
rendered results and form-driven searches need a real browser. **Cloud has no browser
tool of any kind** — not a blocked one, none — so those remain the desktop's work
whatever the network setting says.

**The honest split, once the setting changes: cloud takes the machine-readable
sources, desktop takes the ones that need a browser.** Which sites fall on which side
is unknown until probed, and will be probed one agent per site per Rule 5 — not
guessed at here.

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
