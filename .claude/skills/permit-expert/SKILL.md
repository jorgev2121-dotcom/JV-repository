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

## Modules — build ONE municipality at a time (Rule 5: never grind all at once)
Priority = the municipalities with active jobs.
| Module | Jurisdiction | Status | Seed (VERIFIED so far) |
|---|---|---|---|
| `miami-dade` | Miami-Dade County (unincorporated) | SEED | Broward-style vs county forms; **microfilm: GS1-SL, 10 yrs after CO, "cannot guarantee all records" (VERIFIED, appointment email)**; microfilm order fees $18.75 res / $46.34 comm + $6.25/11x17, $0.15/8.5x11, $1.00 certify; EPS permit portal login/reCAPTCHA-gated; permit search by folio. Owner year-timeline (UNVERIFIED, RAMBO to quote from application). |
| `city-of-miami` | City of Miami | SEED | Open building-permit layer 2014→present (free, no login); pre-2014 = $44 microfilm; iBuild login-gated. |
| `pembroke-pines` | Pembroke Pines (Broward) | SEED | **Broward County Uniform Building Permit Application (rev 01-08-2026)**; Bldg Dept 601 City Center Way, Pembroke Pines FL 33025; HVHZ; separate ELECTRICAL subpermit required; master lists GC qualifier + license. (from the filled Einar 8621 Pasadena app — VERIFIED form fields.) |
| `broward-county` | Broward County (uniform app baseline) | SEED | Uniform Building Permit Application form fields (VERIFIED from filled app). |
| _more_ | (add per job) | — | — |

## Build procedure (per module)
1. RAMBO fetches the municipality's published permit/records procedure (browser).
2. Encode the module fields above, each with its source line.
3. Fill the gaps we hit on live jobs (e.g. Miami-Dade microfilm year ranges; electrical subpermit signature/NOC).
4. Owner ratifies; the module goes live for form-filling.

#permit-expert #per-municipality-module #sourced-not-remembered #TRK-2026-9782 #ratified-2026-09-13
`TRK-2026-9782 · v1 · p001 · 2026-09-13 · CURRENT`
