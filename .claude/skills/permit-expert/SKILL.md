# permit-expert — the jurisdiction expert: one MODULE per municipality
**TRK-2026-9782 (admin band) · owner directive 2026-09-13: "we must have a module for each of the municipalities and their particularities." Sourced from each county/city's OWN published procedure, never from memory.**

## Why this skill exists
Permit rules are **per-jurisdiction** — forms, fee schedules, field character limits, who signs, NOC rules,
subpermit rules, microfilm coverage, portals. The counties/cities publish these. This skill is the **method +
an index of per-municipality modules** so any seat (or an "expert bot") can work an application in that
jurisdiction cold. Pairs with `tax-jacket`, `portal-registration`, and DD-WRITEUP-TEMPLATE.

## Hard rule — every module fact is SOURCED, not remembered
Each module entry cites the municipality's own published document/page (title + URL/date). If it isn't sourced,
it's marked **UNVERIFIED** and must not be used to fill a real form. **Cloud is egress-blocked from county
sites (miamidade.gov etc.) — so RAMBO/browser fetches the source docs and quotes them; Cloud encodes.**

## Module shape (each municipality file, e.g. `modules/miami-dade.md`)
- **Forms** (name, revision date, where to get) · **Fee schedule** (rows + prices, per trade)
- **Field character limits** (count per field; abbreviate to fit)
- **Signatures** (owner vs contractor/qualifier, notary) · **NOC** (who records; does a sub need its own, or
  covered by GC's?) · **Subpermit rules** (electrical/plumbing/mechanical reference the MASTER permit #, placed [where])
- **Microfilm / records coverage + retention** (missing-year ranges) · **Portals** (URLs, login/reCAPTCHA gates)
- **Particularities / gotchas** (HVHZ, private-provider, legalization/after-the-fact path)

## Annexation & records custody — search BOTH municipalities across the annexation date (owner, 2026-09-16)
When a property sits in a **recently incorporated / annexed** municipality, **building records split by date**: the
**county (unincorporated MDC) keeps records only up to ~the incorporation/annexation date**; the **new city keeps them
after**. A complete search therefore may need **dual-municipality searches** — MDC for the pre-annexation period, the
city for the post-annexation period. **The added-square-footage + year figures on the PA tax jacket are the COUNTY's
(MDC) record — reliable for MDC-jurisdiction periods only; incorporated cities keep their own records and may not update
the county's.** So always **determine the incorporation/annexation date first**, then decide whether one search or two.
- **Cutler Bay** (worked, VERIFIED): town charter adopted by referendum **Nov 8, 2005, effective Nov 9, 2005** — 35th
  MDC municipality, formed from unincorporated Cutler Ridge / Lakes-by-the-Bay (source: Cutler Bay town history / Wikipedia).
  → **MDC holds a Cutler Bay property's building records through ~Nov 2005; Town of Cutler Bay after.** Example:
  10980 SW 202 Dr (folio 30-6007-009-0030) — 1966 build + 1989 permits are all MDC-era; any post-2005 work → Cutler Bay.

## Modules — build ONE municipality at a time (Rule 5: never grind all at once)
Priority = the municipalities with active jobs.
| Module | Jurisdiction | Status | Seed (VERIFIED so far) |
|---|---|---|---|
| `miami-dade` | Miami-Dade County (unincorporated) | SEED | Broward-style vs county forms; **microfilm: GS1-SL, 10 yrs after CO, "cannot guarantee all records" (VERIFIED, appointment email)**; microfilm order fees $18.75 res / $46.34 comm + $6.25/11x17, $0.15/8.5x11, $1.00 certify; EPS permit portal login/reCAPTCHA-gated; permit search by folio. Owner year-timeline (UNVERIFIED, RAMBO to quote from application). |
| `city-of-miami` | City of Miami | SEED | Open building-permit layer 2014→present (free, no login); pre-2014 = $44 microfilm; iBuild login-gated. |
| `pembroke-pines` | Pembroke Pines (Broward) | SEED | **Broward County Uniform Building Permit Application (rev 01-08-2026)**; Bldg Dept 601 City Center Way, Pembroke Pines FL 33025; HVHZ; separate ELECTRICAL subpermit required; master lists GC qualifier + license. (from the filled Einar 8621 Pasadena app — VERIFIED form fields.) |
| `broward-county` | Broward County (uniform app baseline) | SEED | Uniform Building Permit Application form fields (VERIFIED from filled app). |
| `cutler-bay` | Town of Cutler Bay (Miami-Dade) | SEED | Incorporated **Nov 9, 2005** (from unincorporated MDC). **Records split: MDC through ~Nov 2005, Cutler Bay after** → dual-municipality search for post-2005 work. Building/permits via Town of Cutler Bay Building Dept. (VERIFIED incorporation date; forms/portal UNVERIFIED — fetch per job.) |
| _more_ | (add per job) | — | — |

## Build procedure (per module)
1. RAMBO fetches the municipality's published permit/records procedure (browser).
2. Encode the module fields above, each with its source line.
3. Fill the gaps we hit on live jobs (e.g. Miami-Dade microfilm year ranges; electrical subpermit signature/NOC).
4. Owner ratifies; the module goes live for form-filling.

#permit-expert #per-municipality-module #sourced-not-remembered #TRK-2026-9782 #ratified-2026-09-13
`TRK-2026-9782 · v1 · p001 · 2026-09-13 · CURRENT`
