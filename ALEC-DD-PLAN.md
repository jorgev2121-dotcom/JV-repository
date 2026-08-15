# ALEC-DD-PLAN.md — TRK-2026-9047

**Job:** scrape the public-records sources for Alec Valdes's properties, populate the
ORANGETREE report, section it by source, set placeholders where blocked.

**Built by a cloud session 2026-08-15. Not started — this is the plan and the
anticipated blockers, written before any work, per Jorge's request.**

---

## 1. PROTECTED — do not modify, do not reinvent

Jorge's instruction: the tax-jacket image standard **took a long time to build and
stays in place.** It is reproduced verbatim from
`NOTE_20260806_TAX-JACKET-INTAKE-HANDLING.md` so no session ever rebuilds it from
memory:

> Watch the inbox for any Property Appraiser / e-Microfilm delivery of the requested
> Property Tax Jacket materials. When it lands:
> **1.** attach it to the job's Master tracking number (TRK) capsule in 01-JOBS;
> **2.** apply the owner's enhancement/cleanup standard — **strip solid black
> perimeter/border lines to white on every page, never alter photos, omit
> blank/separator/solid-black pages with a brief note folded onto the preceding
> page** — and organize for readability before delivering;
> **3.** confirm to VTES-Outbox with the TRK it was attached to.

**Classification: RED under `AUTONOMY.md`.** No executor rewrites this pipeline. It is
consumed, not modified.

**Related protocols that also stay:**
- `PROTOCOL_MICROFILM-ORDERS-v1.0_MERGED_CONFIRMED-BY-CODE_2026-08-06.md`
- `OWNER-DIRECTIVE_MICROFILM-PAY-01_20260806.md` and `-01-A`
- `CLARIFICATION_MICROFILM-PAY-01-A_PER-PROPERTY_20260806.md`

**Read them before touching microfilm. Do not invent a new ordering process.**

---

## 2. The properties

| TRK | Property | Jurisdiction | Notes |
|---|---|---|---|
| TRK-2026-1286 | 1997 SW 218 St | Miami-Dade | Avis Builders |
| TRK-2026-1289 | folio 01-4102-098-0001 | **City of Miami** | Microfilm order X2026148681 already placed 2026-08-10 |
| TRK-2026-1292 | 7823 NW 5th Ave | Miami-Dade | Avis Builders |
| TRK-2026-1531 | 7823 NW 5 AV | City of Miami | Charges/invoices — likely the same asset as 1292 |
| — | Bal Harbour Plaza | Bal Harbour | From `ORANGETREE-POPULATE_ALEC-BALHARBOUR-PLAZA`, 2026-08-13. **No TRK found** |

**Two things to resolve before scraping:** whether 1292 and 1531 are one property or
two, and whether Bal Harbour Plaza needs a TRK issued.

---

## 3. ORANGETREE — the output format

Confirmed as a real named process, not a guess:
`ACK_MSG-CHAT-TO-CODE_ORANGETREE-POPULATE_ALEC-BALHARBOUR-PLAZA_30MIN-WATCH_2026-08-13_AUTO.md`

**That job was acknowledged on 2026-08-13, ended with the question "Is this job
already superseded, or should it stay in the queue?", and appears never to have been
answered.** It is a live specimen of RI-003 and of why OD-01 exists: the question was
asked, nobody replied, the work stopped.

**Cloud has not yet seen an ORANGETREE template.** The format must be read from an
existing populated example before generating anything. Guessing the format and
producing a plausible-looking wrong artifact is the failure mode to avoid.

---

## 4. Anticipated blockers, stated before starting

**Expected to work from cloud:**
Property Appraiser, Tax Collector, Sunbiz, DBPR, Florida Product Approval, zoning.

**Expected to need the desktop's browser (`claude-in-chrome`):**
Clerk of Courts official records, the EPS permitting portal, several county code
systems. County portals commonly need a session, a form POST, or defeat plain fetches.
**This is anticipated, not a failure.**

**Expected to be impossible from any automation:**
- **Microfilm** — an *order* process, not a lookup. Records are pulled and delivered
  after payment. Order X2026148681 is already in flight for 1289. **Placeholder.**
- **Tax jackets** — delivered as images by the Property Appraiser, then processed
  through the protected pipeline above. **Placeholder.**
- **City of Miami (1289)** — separate municipal system with thinner public access than
  the county. **Partial data expected; say so rather than pad it.**

**Every placeholder states what is missing, why, and what would unblock it.** A
placeholder that just says "TBD" is a defect.

---

## 5. A finding that changes AUTONOMY.md

The ORANGETREE ack reveals infrastructure cloud did not know existed:

> `VTES-LOCAL-POLLER on DESKTOP-OTB90LR` — "Ratified routine items execute there;
> owner-gate items (credentials, spend, email, signup) get a pop-up."

**Jorge already has a working autonomy model with a permission gate**, and a local
poller that queues jobs for Claude Code's next session.

`AUTONOMY.md` was written today without knowledge of it. **The two must be reconciled,
not run in parallel** — that is the sprawl problem again. His existing gate list
(credentials, spend, email, signup) maps closely onto RED and should probably become
the canonical list. Tracked as TRK-2026-9048.

---

## 6. Order of work

1. Read the microfilm protocols and any ORANGETREE template. **Do not generate before
   reading.**
2. Resolve the 1292/1531 question and the Bal Harbour TRK.
3. Scrape the cloud-reachable sources per property, writing each result to disk as it
   lands.
4. Hand the browser-required sources to the desktop with a specific list.
5. Assemble into ORANGETREE, sectioned by source, placeholders explicit.

**Question for Jorge: is the Bal Harbour Plaza ORANGETREE job from 2026-08-13 still
live, or superseded? That question was asked twelve days ago and never answered.**
