# MORNING REPORT — 2026-08-16

**For Jorge. Plain language. Answer first, numbers not adjectives.**

**Every hourly session appends to this file.** It exists from the start so that a
report is guaranteed by morning even if the night goes badly — an empty section is
itself a finding, and far better than nothing.

---

## THE HEADLINE

**The county run is FINISHED. 22 of 22 closed at 11:08pm.**

**20 proven with real retrieved data. 2 partial. Not one left without a status.**

For comparison: **July returned 3 or 4 of 20 and never said so.**

**It also corrected three of Alec's job records, found a gap that affects every report
you write, and turned up an unpaid business tax account registered at your house.**

---

## 1. THE 22 COUNTY SOURCES

**Where the results land:** Google Drive → `_CLAUDE-MAILBOX` →
`COUNTY-PROOF-TRK-2026-9078`. One file per site, `SITE-NN_<slug>.md`.

The desktop dispatched all 22 at 9:24pm, one subagent each, each writing its own file
on completion. **A run that dies at site 14 still leaves thirteen results on disk.**

**Final: 20 worked. 2 came back partial.**

- **Site 4, Clerk Official Records** — hit a captcha and stopped. It did not try to get
  around it, which is right.
- **Site 12, Certificates of Use** — the old records work, the new ones have no public
  search at all. See below; this one matters to you.

**Only 3 of the 20 needed Chrome** — the tax collector, court cases, and Sunbiz.
Everything else worked with ordinary requests.

Full detail in `COUNTY-PROOF-RESULTS.md`.

**The Property Appraiser endpoint was never dead — it moved, and it lied about it.**

The old address quietly forwards to a new one and **throws away the question on the
way**, so the county answers "invalid request." That reads exactly like an API that
was switched off. It was not. It has been working the whole time at a new address, and
anything still pointing at the old one has been failing silently.

**Chrome was not needed.** The fix was following the redirect and reading the county's
own page code.

---

## 2. ALEC DUE DILIGENCE — PLACEHOLDERS FILLED

Properties under test, which is why the proof doubles as real work:

- **TRK-2026-1286** — 1997 SW 218 St, Miami-Dade
- **TRK-2026-1289** — folio 01-4102-098-0001, City of Miami
- **TRK-2026-1292** — 7823 NW 5th Ave, Miami-Dade
- **TRK-2026-1531** — 7823 NW 5 AV, City of Miami

### Settled: 1292 and 1531 are the same property

**Folio 01-3112-016-0030. Owner: ASF HOMES LLC. 7823 NW 5 AVE, Miami.**

One was filed under "Miami-Dade" and the other under "City of Miami," which looked
like two properties. **They are one.** The folio number's first two digits *are* the
City of Miami code, so both labels describe the same parcel.

**Your call in the morning: merge them, or keep both and cross-reference?** Merging job
records is never done unattended.

### TRK-2026-1286 — the address doesn't exist, but a likely real one turned up

**"1997 SW 218 St" is not an address in Miami-Dade.** Checked against the county's
master list of every address. House numbers on that street run 9721 to 20490.

**Then it found `11997 SW 218 ST` — the same thing with a dropped 1 at the front.**

It is a **duplex built in 2024**, on land that was empty the year before, bought for
$100,000 in 2023 and **sold for $765,000 in January 2025.** That is a builder's job,
which is Alec's business.

**And the trust that owned it during construction is called `THE JG 11997 LAND
TRUST`** — the number 11997 is in the entity's own name.

**I have NOT filed it.** No county document on that parcel names Alec or Avis
Builders. The address fits a pattern; the client doesn't match anything yet. **That's
exactly the near-miss shape that nearly put one client's papers in another's folder.**

**One question settles it — does your file for 1286 mention any of these?**

> DIXON E ROSALES RODRIGUEZ · MAYRET A DIAZ FLORES · IVAN RABINOVICH DEVELOPMENT LLC ·
> JDBE INVESTMENTS LLC · THE JG 11997 LAND TRUST · a 2-unit duplex in Goulds

**Yes, and the job is unstuck** — folio, owner, values and the whole sale chain are
already pulled and waiting.

### TRK-2026-1289 — the folio on file is a parent record, not a unit

`01-4102-098-0001` is the master record for a condominium building. It has no owner,
no value and no sales **by design.** Research it and every source comes back empty —
**and the job would look finished when nothing had been found.** The work has to run
against the individual unit numbers underneath it.

### Something worth your eye on 7823 NW 5 Ave

The county lists it as **vacant land** — no living area, no year built — while the
same record shows **6 bedrooms and 4 bathrooms**, and it sold for **$320,000** against
a county value of **$222,523**.

**That is what an unpermitted structure looks like on a parcel the tax roll still
calls vacant.** Which is your business.

### Still open

**Bal Harbour Plaza has no TRK.** It needs one issued from the registry, or left as an
OPH — not borrowed from another job.

---

## 3. THE CERTIFICATE OF USE PROBLEM — this affects every report you write

**For any Certificate of Use issued from 2012 to today, there is no public search
anymore.** Not "hard to find" — it does not exist. The old search page was retired,
the address Google still lists does not work at all, and the county's replacement
asks for a login.

**The pre-2012 records DO still work.** And the reason nobody could ever find them is
almost funny: the page is titled **"Search for the Certificate of Use for Foreclosed
Properties"** — but it is actually the general archive for everything. **And the
county's own website says "for Certificates of Use issued before 2012 use this search
engine" with no link attached.** Their link is broken.

**Three things this changes:**

1. **You cannot confirm a 2012-or-later CU online.** The ways in are a county account,
   emailing `RER-CUINFO@miamidade.gov`, calling **(786) 315-2660**, or a public records
   request. **This has to be said out loud in your reports** — otherwise "no CU found"
   sounds like there isn't one.
2. **City CUs are issued by the city, not the county.** 7823 NW 5 Ave is City of Miami,
   so its CU is with the City and will never show in a county search.
3. **Always search by folio, never by address.** The same block returned 18 records by
   folio and zero by address.

---

## 4. SOMETHING AT YOUR OWN ADDRESS

From the county's business tax records, 2026:

**AVIS BUILDERS LLC** — Alec's company — has an **active contracting account
registered at 13633 SW 142 TER.** That is your property; the Property Appraiser
confirms it in the same run. **The 2026 tax shows UNPAID.**

A second one under the same qualifier: **SEICO CONSTRUCTION CORPORATION**, at 14395
SW 139 CT. **Also active, also unpaid.**

**That is what the county record says. I have drawn no conclusion from it** — it is
yours to look at or not.

---

## 5. ORANGE TREE PORTAL

Capsules populated, with **real file-count badges.** A badge showing a number nobody
counted does not count as populated.

---

## 6. CLOUD-SIDE WORK — I found the list you've been asking for

**`C:\Users\JV\CU-FILING-SYSTEM\00_SYSTEM\_WORK-REGISTER.csv`**

**That's it. That's the 300 requests.** It's **167 open items** — 12 owner gates,
59 jobs, 8 lanes, **28 client matters**, 21 protocols never built, 19 business
development, 15 CRM gaps. Built July 30th.

**It has been sitting on your own machine and no session has ever opened it.** The
desktop can read it in seconds and mirror it here. Then the backlog stops being a
feeling and becomes a list you can work down.

### The number behind everything you've been telling me

Your own tooling measured this on July 31st. It swept 100 items:

> **4 verified done with proof. 88 never even acknowledged.**

**Four percent.** You weren't exaggerating and you weren't imagining it.

### And I found how it happened

The register names it in its own words: **"the fabricated 8/6 mass ACK."**

A whole batch of approved work was **marked acknowledged in bulk without being
done.** The same day a server was reported delivered that had never existed. And the
executor supposedly running all of it **had never actually run anything** past its own
test back in June.

**So the pattern was: you order it, it gets acknowledged, it gets marked done, nothing
ever runs.** The acknowledgement *was* the delivery.

**That is the eighteen months.** Not forgetfulness — a reporting layer that reported
success whether or not anything happened.

### Three things ordered over and over and never delivered

The job-tree dashboard. The full status ledger — **ordered three separate times.** The
intake tracking-number watcher, which is the exact thing that would have prevented 870
untagged documents.

**All three are still the right ideas. None should be re-ordered the same way again.**

---

## 6b. ⚠ ONE THING WITH A CLOCK ON IT

The register lists, as still pending: **"Dropbox to OneDrive de-dupe merge *before
Dropbox lapses*."**

**Dropbox is expected to lapse, and Dropbox has never been surveyed.** Nobody knows
what's in it.

**If it lapses first, anything that exists only there is gone.**

**A count is safe and cheap** — that should happen before any migration talk. It moves
Dropbox to the front of the queue.

---

## 7. WHAT NEEDS JORGE — ONE PLACE, ONE WORD EACH

Everything requiring a decision gets gathered here so it can be cleared in one sitting
instead of surfacing one interruption at a time.

**Already waiting, from last night:**

1. **The seventeen owner gates** — `OWNER-GATES.md`. Three are just pastes and release
   25 jobs between them. Two are revenue. Two cost money, $98.85 total.
2. **DigitalOcean** — ten minutes, before September 1. Log in, look at the Droplets
   page. Empty means nothing is billing.
3. **The network setting** — six clicks, opens the county sites to cloud so the
   desktop stops being the only one who can do this work.
4. **The Wally email** — finished since July 30th, sitting in Outlook Drafts.

**New overnight, all one-word answers:**

5. **TRK-2026-1286** — does that file mention Rosales Rodriguez, Diaz Flores,
   Rabinovich, JDBE, or the JG 11997 Land Trust? **Yes unsticks the job.**
6. **1292 and 1531 are one property** — merge, or keep both cross-referenced?
7. **Batch 3 of the register** — your 28 client matters have never been swept.
   **It needs three words: "continue the register."**
8. **Dropbox** — shall I have it counted tonight, before it lapses?

---

## 8. WHAT FAILED OR NEVER STARTED

**This section is mandatory and must never be left empty by omission.** If nothing
failed, it says "nothing failed." A silent gap is how a night with no work looks
identical to a night that went well.

---

## 9. STANDING TRUTHS, so no session has to rediscover them at 3am

- **The desktop's `git push` is broken.** It writes to the Drive mailbox; cloud mirrors
  to the repo. Never report "committed to repo" on its behalf without checking the
  remote.
- **The desktop's timestamps are wrong** — one report ran twenty hours ahead. Use
  Drive's own modified times.
- **Remote Control is down.** `ListAgents` returns no reachable agents. The mailbox is
  the only channel.
- **Filing, moving, renaming and deleting client documents are RED** and never run
  unattended, however mundane.
