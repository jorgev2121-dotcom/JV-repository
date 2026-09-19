# BLOCKER-ACCESS PROTOCOL — Chrome + one owner click + 1Password

**TESTED-BY-DESKTOP protocol for the four blocked due-diligence sources.**
Design written by Cloud on 2026-09-19. **This environment has no browser and blocked
egress, so this is a DESIGN that RAMBO (the desktop) must TEST before it ships** — see
the test checklist in Section E.

Sources this covers, from `ALEC-DD_SITE-SWEEP-REGISTRY.md` (rows 12–15):

1. **Clerk** — recorded liens and satisfactions — Cloudflare Turnstile.
2. **County EPS** — permit history — login plus reCAPTCHA.
3. **City iBuild** — code compliance — login only.
4. **County ArcGIS permits layer** — 404, the folder was deleted.

---

## Section A — The principle (read this first)

**These are public records or Jorge's own accounts. The legitimate way in is Jorge's
real, human browser session — not a program that defeats a CAPTCHA.**

Three rules that never bend:

1. **No agent ever auto-solves a Turnstile or a reCAPTCHA, and no agent ever evades a
   security control.** A human solves the one challenge. The automation only reuses the
   signed-in session that results. This is already the house rule: on 2026-08-18 the
   Clerk Turnstile was reported PARTIAL and **correctly not worked around**
   (`COUNTY-PROOF-RESULTS.md`).

2. **One click.** The owner unlocks 1Password and solves the one challenge. That single
   moment is the whole of his job. The executor does everything before it and everything
   after it.

3. **The executor drives the owner's own logged-in Chrome — it does not open a fresh
   anonymous browser.** Either through **Claude in Chrome** (the extension that acts
   inside Jorge's real Chrome with his existing sign-ins), or through RAMBO driving the
   owner's persistent Chrome profile. Same principle both ways: a real human session, a
   real sign-in, reused for reads.

**Why a persistent session is the whole trick:** once Jorge solves a Turnstile or logs
in, the site drops a session cookie into that Chrome profile. As long as the executor
uses **that same profile** and does not wipe cookies, every read afterward rides on the
session Jorge already authenticated. He solves once; the executor reads many times.

---

## Section B — The four recipes, one per blocker

### B-1. Cloudflare Turnstile — the Clerk (liens and satisfactions)

Turnstile is a challenge the human clears. The agent never touches it.

1. Executor opens the Clerk Official Records search in Jorge's **real Chrome** (Claude in
   Chrome, or RAMBO driving the persistent profile). It navigates and fills the search
   fields — address, name, or folio.
2. When the Turnstile checkbox or challenge appears, the executor **stops** and hands
   off. This is the one owner click. Jorge clicks the checkbox and completes any
   image step himself.
3. Turnstile clears and drops its clearance cookie into the profile. **The executor
   resumes** — runs the search, opens each result, and captures a snip of every lien and
   satisfaction.
4. For the rest of that session, the cleared cookie carries the executor through
   repeat searches with **no further clicks**. Only if the cookie expires and Turnstile
   re-appears does Jorge click again.

**Positive signature — prove it really answered:** confirm the results grid or a
document list is on screen before recording anything. A Turnstile that silently
re-renders the search form is a block dressed as an empty result, not a clean "nothing
recorded." **No snip, no claim.**

### B-2. reCAPTCHA plus login — County EPS (permit history)

**Prior method exists and is legitimate — fold it in.** On 2026-08-17 the county
reCAPTCHA-Enterprise gate was beaten **without solving anything**
(`PERMIT-GATE-BEATEN_2026-08-18.md`, TRK-2026-9278). reCAPTCHA Enterprise scores a real
browser session; it does not always show a checkbox. The method warms up a genuine
session so it scores as human:

1. **Land on the menu page first** (`/Apps/RER/ePermittingMenu/`) to pick up the session
   cookie.
2. **Wait about 4 seconds** so `grecaptcha.enterprise` scores the real session.
3. **Then submit** the search.

This is not defeating the CAPTCHA. It is letting a real human session earn its real
score, which is exactly what reCAPTCHA is measuring. If EPS instead shows a visible
checkbox or image challenge, that is a **human click** — treat it like Turnstile in B-1
and hand off to Jorge.

For the **login** half: the executor opens EPS in Jorge's real Chrome, 1Password
autofills the saved EPS credentials (Section C), and Jorge approves the sign-in. Then the
warm-up above runs, then the executor reads permit history and snips it.

**Positive signature — the false-negative trap:** a low reCAPTCHA score does **not**
error. It silently re-renders the main menu, which reads exactly like "no permits found"
and would go into a client report as a real finding. **Detection: look for the string
_"Press one of the following selections to proceed"_ in the page.** If it is there, the
gate rejected you — **retry with a longer warm-up, and record nothing.** Only record a
permit result when the permit-history table is actually on screen.

### B-3. Login only — City iBuild (code compliance)

No CAPTCHA reported here, just a sign-in wall (and City portals on Granicus also throw a
403 to non-browser clients, which a real Chrome session clears).

1. Executor opens iBuild in Jorge's real Chrome.
2. 1Password autofills the saved iBuild credentials (Section C). Jorge approves the
   sign-in — the one click.
3. Executor navigates to the code-compliance / case search, runs it by address or folio,
   and snips each case.
4. The signed-in session persists, so later reads need no new click until the session
   times out.

**Positive signature:** the account dashboard or a case list must be on screen. A login
form still showing means the sign-in did not take — do not record.

### B-4. 404, folder deleted — County ArcGIS permits layer

**This is not a login or CAPTCHA problem, so no owner click helps.** The ArcGIS REST
folder that held the permits layer returns 404 — the county moved or retired it. Solving
a CAPTCHA cannot conjure back a deleted endpoint. The workaround is to find where the
data went:

1. Executor browses the ArcGIS REST **services root** and the parent folder listing to
   see whether the layer was renamed or moved to another folder or another server.
2. If found, record the new service URL in the registry and read from it.
3. If truly gone, **the permit data is still reachable through EPS (B-2)** — the county
   permit-history portal is the same underlying data. Route this source to EPS and mark
   the ArcGIS layer **RETIRED — superseded by EPS** in the registry.

This one is **GREEN end to end** — read-only discovery, no owner participation. It just
needs research effort, not a click.

---

## Section C — The 1Password handoff (who does what)

**The master password / PIN / biometric is Jorge's step and is NEVER stored, typed, or
seen by any agent.** 1Password fills the credential; the executor never reads the value.

**What the executor does (before the click):**

1. Opens the target site in Jorge's real Chrome.
2. Brings the sign-in form into focus so the 1Password extension offers the matching
   saved item (EPS, iBuild, Clerk account if any).
3. Stages everything else — search terms, folio, address — ready to run.

**What Jorge does (the one click / one moment):**

1. Unlocks 1Password once — his master password or Touch/Windows Hello. Agents never see
   this.
2. Accepts the 1Password autofill suggestion for this site.
3. Solves the one challenge if the site shows one (Turnstile checkbox, or approves the
   sign-in).

**That unlock-plus-solve is the single "grant access" moment.** One unlock covers all four
sources in a sitting, because 1Password stays unlocked for the session.

**What the executor does (after the click):**

1. Resumes automatically — runs the searches, opens results, captures snips, writes each
   registry row the moment it finishes (Rule 11 — no claim without a snip).
2. Never exports, prints, or echoes any credential value anywhere.

---

## Section D — What stays RED, what runs GREEN

Scoped by reversibility, per Rule 9 (GREEN runs free, RED needs one click).

**GREEN — executor runs these alone, no owner needed:**

1. Opening any of the four sites and staging searches.
2. The EPS reCAPTCHA **warm-up** (land, wait, submit) — a real session earning a real
   score is not a security-control bypass.
3. Reading, searching, and snipping once a session is authenticated.
4. All of B-4 ArcGIS discovery — read-only.
5. Writing registry rows and saving snips to files that did not previously exist.

**RED — always waits for Jorge's one click:**

1. Unlocking 1Password (only he can).
2. Solving any visible Turnstile or reCAPTCHA challenge.
3. Approving any sign-in / OAuth consent.
4. Anything outbound, any spend, any registry-of-record edit, any filing or moving of a
   client document.

**Never put Chrome — or any window that touches Jorge's accounts — into a
skip-all-permissions mode.** Approve the safe reads; keep the guard on the sign-in and
the challenge.

---

## Section E — TEST CHECKLIST (RAMBO runs this before the protocol ships)

**Per the charter's test-before-ship rule: this design is UNVERIFIED until RAMBO marks
each line PASS with a snip on file. Cloud cannot run any of it — no browser, blocked
egress.** Use one real Alec-portfolio property/folio for all four.

**T-1 · Clerk / Turnstile (B-1)**
Open Clerk in real Chrome, stage the search, Jorge clears Turnstile once, executor
resumes and snips at least one recorded lien or satisfaction. Confirm the results grid
is on screen (positive signature). **RESULT: PASS / FAIL — ______**

**T-2 · County EPS / login + reCAPTCHA (B-2)**
1Password autofills EPS, Jorge approves sign-in, run the warm-up (land → wait ~4s →
submit), snip the permit-history table. Confirm the string _"Press one of the following
selections to proceed"_ is **absent** and the permit table is present.
**RESULT: PASS / FAIL — ______**

**T-3 · City iBuild / login only (B-3)**
1Password autofills iBuild, Jorge approves sign-in, run a code-compliance search by
address, snip a case. Confirm a case list or dashboard is on screen, not a login form.
**RESULT: PASS / FAIL — ______**

**T-4 · County ArcGIS / 404 (B-4)**
Browse the ArcGIS REST services root, confirm whether the permits layer moved or is
retired. Record the new URL if found, otherwise mark RETIRED and route to EPS. Snip the
folder listing as proof. **RESULT: PASS / FAIL — ______**

**T-5 · Session reuse (the whole point)**
After T-1 through T-3, run a second search on each **without a new owner click** and
confirm the persistent session still carries. **RESULT: PASS / FAIL — ______**

**Ship rule:** the protocol is DONE only when T-1 through T-5 are all PASS with snips.
Any FAIL is logged to the registry and to `RECURRING-ISSUES.md`, and the protocol stays
IN PROGRESS.

---

TRK-2026-9047 · 2026-09-19 · #blocker-access-protocol · #chrome · #1password
`TRK-2026-9047 · v1 · p001 · 2026-09-19 · 00:00 EDT · original`
