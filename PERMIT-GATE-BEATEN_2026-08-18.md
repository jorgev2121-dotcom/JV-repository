# The county permit gate is beatable — and it was returning a false negative

**TRK-2026-9278 · found by desktop session B (`--chrome`) 2026-08-17 · mirrored into the repo
by the cloud session 2026-08-18 because the desktop's git push is broken (TRK-2026-9082)**

**This is the most valuable technical finding of the night and it has nothing to do with the
five sample properties. It applies to every job this business will ever run.**

---

## The method

**`msedge` + Playwright, `headless=False`.**

1. **Land on `/Apps/RER/ePermittingMenu/` first** to pick up the session cookie.
2. **Wait ~4 seconds** for `grecaptcha.enterprise` to score the session.
3. **Then submit.**

Working script: `C:\AI\state\proof5\_permits.py`.

**Result: 13 of 22 sources answered instead of 7.** SITE-06 permit history and SITE-07 EPS
both open up, and SITE-20 DBPR becomes runnable because the permits name the contractors.

---

## The part that matters more than the method

**A low reCAPTCHA score does not produce an error.**

**It silently re-renders the main menu — which reads exactly like "no permits found."**

**That is a false negative that looks like a clean result.** Any script that checked for an
error, or checked that the page loaded, would have recorded "no permit history on this
property" and been believed. **That sentence would then have gone into a client due-diligence
report as a finding.**

### How to detect it

**Look for the string _"Press one of the following selections to proceed"_ in the response.**
If it is there, the gate rejected you — **retry with a longer warm-up.** Do not record a
result.

---

## Why this belongs in RECURRING-ISSUES' family

**This is the same failure shape logged three times already in this repo:**

- **TRK-2026-9132** — PowerShell 5.1 returns a silent false zero.
- **TRK-2026-9097** — read the body, never the status code.
- **RI-022** — absence reported from the record instead of the artifact.

**Four different systems, one failure: a negative answer that means "I was blocked," delivered
in the same shape as "there is nothing there."**

**The general rule, now with a fourth instance behind it: a source that can refuse you without
saying so must be given a positive signature to prove it answered.** Not the absence of an
error. **A string that only appears on a real result.**

---

## What this unblocks

- **SITE-06 county permit history** — for every job, not just these five.
- **SITE-07 EPS plan review** — needs the process numbers SITE-06 returns.
- **SITE-20 DBPR** — needs the contractor names the permits carry.

**Still gated:** SITE-03 Tax Collector, SITE-04 Clerk Official Records (Turnstile captcha —
the biggest single gap, no deeds/mortgages/liens searched), and the Property Appraiser
building photo.

**SITE-04 is the one worth attacking next.** Liens and mortgages are the substance of a title
due-diligence package; permit history is context around them.

#TRK-2026-9278 #PermitGate #FalseNegative #RI-022 #JorgeValdes #CUInspections
