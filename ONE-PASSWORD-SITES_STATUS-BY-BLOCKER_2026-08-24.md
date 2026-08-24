# 1PASSWORD SITES — working vs blocked, grouped by blocker
**Built 2026-08-24 by cloud. Sources: `ONE-PASSWORD-LINKS_TRK-2026-9347`, `MIAMI-DADE-SITES`, and this
session's live probes. NO passwords here — names and access status only.**
*#1Password #one-password #blockers #access-status #JorgeValdes*

> **Read this first — a "blocker" depends on which window.** ☁️ Cloud has no browser and a restricted
> network; 🖥️ Desktop has Chrome and full network but its own login gaps. The **same site is often
> BLOCKED for cloud and WORKING for desktop.** Each row says which. Also: this is the *intended door
> list* + *observed access* — the actual 1Password vault contents are only proven by running
> `op whoami` / `op item list` on the desktop with you present (that check hasn't been run yet).

---

## ✅ GROUP 0 — WORKING AS INTENDED (no blocker)
- **Anthropic / Claude** (claude.ai, console) — both windows run on it. ✅
- **Google — Drive + Gmail** (jorgev2121) — connected here via MCP; this is the source of truth. ✅
- **DBPR public licensee search** (myfloridalicense.com) — public search works; login only needed for an account. ✅
- **Miami-Dade RER Regulation Support** (case records) — scriptable, plain HTTP. ✅ *(desktop; cloud once the network setting below is changed)*
- **Property Appraiser contact form** (PA) — jacket orders submit through it. ✅ *(desktop)*
- **GitHub** — ✅ for **cloud** (this repo pushes fine). ⚠ **blocked for desktop** — see Group 3.

## 🤖 GROUP 1 — CAPTCHA / BOT-CHALLENGE (needs a real browser **and** a human to solve — desktop only, never cloud)
- **Miami-Dade Clerk — Official Records** (deeds, liens, judgments) — **Cloudflare Turnstile.** A "200"
  that isn't an answer. **The Friday-priority door.**
- **Miami-Dade permit-status page** (permit + inspection status by folio) — **reCAPTCHA Enterprise.**
- **City portals on Granicus** (City of Miami iBuild, Miami Beach CSS, Pembroke Pines/Broward) —
  **403 bot-block**; Chrome (a real browser session) clears it, so these are **desktop-only**.
- **Fix:** desktop + Chrome + your click to solve the challenge. Cloud cannot do these at all (no browser).

## 🌐 GROUP 2 — CLOUD EGRESS-BLOCKED (works on desktop today; one setting change opens cloud too)
These fail from **cloud only**, at the network layer, because this cloud environment is set to "Trusted":
- `*.miamidade.gov` · `*.miamidadeclerk.gov` · `*.miamidadepa.gov` · `*.sunbiz.org` ·
  `*.myfloridalicense.com` · `*.floridabuilding.org` · `*.miamigov.com` · `*.miamibeachfl.gov` ·
  `*.ppines.com` · `*.broward.org`.
- **This is why cloud couldn't open miamidade.gov today, but the desktop read it in seconds.**
- **Fix (Tier 2, ~6 clicks, yours):** claude.ai/code → environment settings → Network access →
  **Custom** → paste the domain allowlist (in `MIAMI-DADE-SITES.md`) → keep "include default package
  managers" ticked → Save. *(`Full` also works in one click.)* Does not fix Group 1 — a CAPTCHA is
  still a CAPTCHA.

## 🔑 GROUP 3 — SIGN-IN / OAUTH NOT COMPLETED (credential path unfinished)
- **Microsoft / M365 → Outlook** (Jorge@teamusasales.com) — **OAuth not authorized in this headless
  session.** This is why cloud can't read Outlook (the CC'd MDC email, contact folders). **Fix:** sign
  in interactively with 1Password; it can't be done from a headless cloud run.
- **GitHub — on the DESKTOP** — root-caused today (9674): the PC was **never signed into GitHub**, so
  the desktop can't push. Not "broken." **Fix:** one supervised sign-in (1Password suggests/saves), then
  desktop pushes like cloud.

## ⛔ GROUP 4 — 403 ACCESS WALL (site refuses a non-browser client; login also required)
- **Miami-Dade Tax Collector** (miamidade.county-taxes.com) — 403 wall on the account/sign-in page.
- **Fix:** desktop browser + a 1Password-saved sign-in.

## 🙋 GROUP 5 — NO TECHNICAL BLOCKER, just needs ONE supervised login (you + 1Password, nobody reads the value)
These aren't broken — they simply haven't had the account signed in through 1Password yet:
- **Intuit / QuickBooks** (accounts.intuit.com) — gates the ~$75k "can't-tell-if-paid" collections.
- **Miami-Dade ePermitting / EPS** — in-flight applications.
- **login.gov** (federal identity) — 8 April emails suggest an account attempt already exists; check first.
- **Zoho CRM · Airtable · Stripe (4 accounts) · Dropbox** (lapse decision pending) · **DigitalOcean** (decision before 9/1) · **xAI/Grok**.
- **Fix:** the Section-F protocol — desktop, you present, 1Password suggests + saves, the item gets its
  hashtag + a TRK in notes. Top priority in this group: **QuickBooks** (money) and **Dropbox** (before it lapses).

---

## The one-line summary
**Working now:** Claude, Google Drive/Gmail, DBPR search, RER records, PA form (+ GitHub for cloud).
**Blocked by a CAPTCHA (desktop-only, needs your click):** Clerk records, permit-status, city Granicus portals.
**Blocked by cloud's network setting (6-click fix, works on desktop meanwhile):** all the county/state `.gov` sites.
**Blocked by an unfinished sign-in:** Outlook/M365 (cloud), GitHub (desktop), Tax Collector, and the Group-5 logins.

*Built by cloud 2026-08-24. Names + status only — no secrets. #1Password #blockers-by-type #TRK-2026-9346 #TRK-2026-9347*
