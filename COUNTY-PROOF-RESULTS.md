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

## FINAL — 22 of 22 closed at 11:08pm

**20 EXECUTED-WITH-PROOF. 2 PARTIAL. 0 without a status.**

**This is the first complete run.** July returned 3 or 4 of 20 and announced nothing.

| Status | Sites |
|---|---|
| **EXECUTED-WITH-PROOF** | 01, 02, 03, 05, 06, 07, 08, 09, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22 |
| **PARTIAL** | **04** Clerk Official Records — Cloudflare Turnstile captcha, correctly not worked around · **12** Certificates of Use — pre-2012 archive works, modern search retired |

**Chrome required for 3 of 20:** site 03 Tax Collector, site 05 Clerk civil cases,
site 19 Sunbiz. **Everything else worked with plain anonymous requests** — including
site 01, where Chrome was expected to be necessary and was not.

**Site 07 EPS:** permit status is public; folio search is login-gated.

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

---

## 6. Site 12 — the Certificate of Use gap. This one is about the business itself.

**For any Certificate of Use issued 2012 to today, there is currently NO public
search.** Confirmed, not assumed:

- The host Google still indexes, `www8.miamidade.gov`, **does not resolve at all.**
- Every modern CU search path 301-redirects to an **apply-only page with no search
  box** — checked twice, headless and in Chrome.
- The county's "Advanced Search" 302-redirects to a **login wall.** Not attempted —
  public, non-authenticated sources only.

**The pre-2012 archive does work**, and the reason nobody could find it is worth
recording: it sits at a page titled **"Search for the Certificate of Use for
Foreclosed Properties"** — which is not what it is; it is the general archived CU
search. And **the county's own page says "For Certificates of Use issued before 2012
use this search engine" with no link attached at all.** The anchor is broken in their
CMS.

**Proof it works — folio `3030230010470` returned `Total Records Found: 18`**, spanning
1990 to 2012, with certificate numbers, business names and application dates.

**Three things this changes for CU Inspections work:**

1. **A 2012-or-later CU cannot be confirmed online.** The routes are a registered
   miamidade.gov account, `RER-CUINFO@miamidade.gov` / (786) 315-2660, or a
   public-records request. **This gap must be stated in any due-diligence report** —
   silence would read as "no CU found."
2. **Municipal CUs are issued by the city, not the county**, and never appear in
   either county engine. **7823 NW 5 AVE is City of Miami**, so its CU lives with the
   City.
3. The archive's business-address field is **exact-match only.** The same block that
   returned 18 records by folio returned **zero** by address string. **Always search by
   folio.**

---

## 7. A live finding on Jorge's own address

From the BusinessTracker layer, 2026 tax year, quoted literally:

```
BUSNAME=AVIS BUILDERS LLC
OWNERNAME=AVIS BUILDERS LLC ALEC J VALDES, QUALIFIER
ADDR=13633 SW 142ND TER , MIAMI 33186-8347
RECEIPTNO=7522092 | ACCSTATUS=Active | RCPTSTATUS=Active | PAIDSTATUS=Unpaid
BUSSDATE=2017-06-30 | CLASSDESC=Contracting
```

**`13633 SW 142 TER` is Jorge's own property** — confirmed in the same run by the
Property Appraiser: `30-5923-017-0050 | 13633 SW 142 TER | JORGE VALDES`.

So: **an active contracting business tax account, registered at Jorge's residential
address, showing UNPAID for 2026.**

A second entity under the same qualifier:

```
BUSNAME=SEICO CONSTRUCTION CORPORATION
OWNERNAME=SEICO CONSTRUCTION CORPORATION C/O ALEC J VALDES QUALIFIER
ADDR=14395 SW 139TH CT STE 101 , MIAMI 33186-5583
ACCSTATUS=Active | PAIDSTATUS=Unpaid | BUSSDATE=2011-11-01 | CLASSDESC=Contracting
```

**Both active, both unpaid for 2026.** Reported as the county records them — no
inference drawn. **Jorge's to act on or not.**

---

## 8. New sources found along the way

**BusinessTracker — live local business tax accounts:**
```
https://gisweb.miamidade.gov/arcgis/rest/services/BusinessTracker/MapServer/0/query
```
46 fields including business name, owner, address, folio, receipt number, account
status and paid status. **Answers "who holds a live business licence at this
address" — and surfaces commercial activity at residential addresses**, which is
directly the red flag CU work looks for.

**PA Property Records via ArcGIS** — `EnerGov/MD_LandMgtViewer/MapServer/12` resolves
address to folio with no key and no interstitial page.

---

## 9. The technical lesson worth keeping

**Read the body, never the status code.**

`miamidade.gov` returns **HTTP 200** with a Citrix NetScaler auto-submitting
JavaScript form where JSON is expected. A script checking only the status code
records success and stores garbage. **Both of tonight's false walls — the "dead"
Property Appraiser endpoint and the "retired" CU search — were 200s and 301s that
looked like refusals and were not.**

