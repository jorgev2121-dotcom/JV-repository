# COUNTY-PROOF-RESULTS.md — TRK-2026-9078

**Run started 2026-08-16 ~9:24pm Miami by the desktop executor. One subagent per
site, per charter Rule 5.**

**Source of record:** Google Drive → `_CLAUDE-MAILBOX` → `COUNTY-PROOF-TRK-2026-9078`.
One `SITE-NN_<slug>.md` per source, written the moment each agent finished.

**Mirrored into the repo by cloud** because the desktop's `git push` is broken
(TRK-2026-9082). **Cloud has not independently verified these results — it cannot
reach the county sites.** What follows is the desktop's reporting, with literal
quotes preserved. Where a claim is checkable later, it should be.

---

## Score at the 10pm check

**12 of 22 EXECUTED-WITH-PROOF. 1 PARTIAL. 9 still running.**

| Status | Sites |
|---|---|
| **EXECUTED-WITH-PROOF** | 01, 02, 08, 09, 10, 11, 13, 14, 15, 16, 19, 20, 21 |
| **PARTIAL** | 04 Clerk Official Records — Cloudflare Turnstile captcha on the search form |
| **Still running** | 03, 05, 06, 07, 12, 17, 18, 22 |

**Site 19 (Sunbiz) required Chrome. Site 01 did not** — see below.

---

## 1. The endpoint was never dead. It moved, and it lied about it.

The `county-data-sources` skill pointed at a host that returns **HTTP 200 with an
error page**, which read as "the API was retired."

```
OLD (dead):  https://www.miamidade.gov/Apps/PA/PApublicServiceProxy/PaServicesProxy.ashx
NEW (live):  https://apps.miamidadepa.gov/PApublicServiceProxy/PaServicesProxy.ashx
```

**The old host 301-redirects and silently drops the query string.** The request
arrives with no parameters, so the server answers "Invalid request. No Valid URL is
found." — which looks exactly like a removed endpoint and is not one.

**Chrome was never needed.** The fix was `curl -L` to follow the redirect, then
reading the site's own JavaScript bundle to see how it builds the call.

**This is the same lesson as the egress block, from the other direction: a failure
message is not a diagnosis.** Both tonight's blockers were something other than what
the first error suggested.

**Action: update the skill file** — every occurrence of the old host. Anything still
pointing at it fails in a way that looks like the county's fault.

---

## 2. Three of Alec's job records are wrong, and one is not a real address

### TRK-2026-1292 and TRK-2026-1531 are the same property

**Folio `01-3112-016-0030`. Owner: `ASF HOMES LLC`. Site: `7823 NW 5 AVE`, Miami FL
33150.**

One was filed as "Miami-Dade," the other as "City of Miami," which read as two
jurisdictions. **Folio prefix `01` IS the City of Miami municipality code** — so the
two labels describe one parcel. Three independent proofs in `SITE-01`, including the
county address index returning exactly one row.

**Recommendation: merge into one capsule keyed on the folio; mark 1531 a duplicate of
1292.** Not actioned — merging job records is RED and waits for Jorge.

**Worth Jorge's eye, and it is his actual line of work:** the county carries this
parcel as **VACANT RESIDENTIAL**, living area 0, year built 9999 — while the same
record lists **6 bedrooms and 4 bathrooms**, and it sold for **$320,000** against a
county value of **$222,523**. That combination is the signature of **unpermitted
structure on a parcel the tax roll still shows as vacant.**

### TRK-2026-1286 — "1997 SW 218 St" does not exist

Not an endpoint failure. **The address is not in Miami-Dade County**, proven against
the county's authoritative address index:

- Streets named 218: `SW 218TH` AVE, CT, LN, ST, TER — all SW, no other quadrant
- House numbers on SW 218TH ST run **9721–20490**. There is no 1997.
- `hse_num=1997 AND st_name='218TH'` → **zero rows**
- Ruled out a truncated 19970–19979 → **zero rows**
- Every real `1997` house number in the county is on a different street entirely

Cross-check: `GetOwners` for `VALDES ALEC` returns **exactly 2 properties countywide**,
neither on SW 218 — `5780 SW 153 CT` and `9167 FONTAINEBLEAU BLVD Unit 6`.

**The address on file is bad data and must be corrected at source before this job can
be researched.** Correcting it is Jorge's call — an executor must never guess an
address.

### TRK-2026-1289 — folio 01-4102-098-0001 is a master folio, not a unit

```
STATUS : RO Reference
DOR    : 0000 / REFERENCE FOLIO
LEGAL  : 1658 NW 1 STREET CONDO
OWNER  : (none — reference folios carry no owner)
```

**No owner, no assessment, no sale history — because it is the parent record for a
condominium declaration.** It is unrelated to 7823 NW 5 Ave.

**Due diligence on 1289 must run against the individual unit folios beneath this
parent.** Run against the master, every source returns empty and the job looks
researched when nothing was.

---

## 3. A new source worth more than some of the twenty-two

```
https://gisweb.miamidade.gov/arcgis/rest/services/AddressSearchMap_PropertiesWithZip/MapServer/0/query
```

Open ArcGIS REST endpoint exposing the county's **master address table** — folio,
house number, street, ZIP, municipality. Supports SQL `where`, `LIKE`,
`returnDistinctValues`, `outStatistics`.

**It does the one thing the Property Appraiser search cannot: prove an address does
not exist.** That is what settled TRK-2026-1286, and it is the right tool for
validating an address *before* a job is opened — which is upstream of the entire
orphan and misfiling problem.

**Gotcha:** street names are stored ordinal — **`218TH`, not `218`** — the opposite of
the PA search convention.

---

## 4. Working recipe, recorded so it is not rediscovered

**Property Appraiser** — `apps.miamidadepa.gov/PApublicServiceProxy/PaServicesProxy.ashx`

- By folio: `?Operation=GetPropertySearchByFolio&clientAppName=PropertySearch&folioNumber=<13 digits, no dashes>`
- By address: `?Operation=GetAddress&clientAppName=PropertySearch&myUnit=&from=1&to=200&myAddress=<ABBREVIATED>`
- By owner: `?Operation=GetOwners&clientAppName=PropertySearch&ownerName=<NAME>&from=1&to=50`

**No login, no cookie, no User-Agent spoof, no Referer. Anonymous GET.**

Traps that produce silent wrong answers rather than errors:

- **`from=1` is mandatory** on `GetAddress`. `from=0` returns an **empty body**, not an
  error — reads as "no such address" when the address exists.
- **Address must be abbreviated**: no city, no state, no ZIP.
- The value field is **`TotalValue`**. `JustValue` does not exist in this payload.
- **JSON shape differs by operation.** `GetAddress`/`GetOwners` return a flat
  `MinimumPropertyInfos` array; `GetPropertySearchByFolio` returns nested
  `PropertyInfo` / `OwnerInfos` / `SalesInfos` / `Assessment` / `LegalDescription`.
  **Code written for one silently returns blanks against the other.**
- Owner name is `OwnerInfos.Name` on the folio call but `Owner1` on address/owner calls.
- Mailing street is `MailingAddress.Address1`, not `.Address`.

---

## 5. Safety

All requests were anonymous GETs against public endpoints. No login, no account, no
payment, no security setting touched. **Site 04 stopped at a Cloudflare Turnstile
captcha and was reported PARTIAL rather than worked around** — which is correct.

---

**Open question for the morning: 1292 and 1531 are proven the same parcel. Merge them,
or leave both and cross-reference?**
