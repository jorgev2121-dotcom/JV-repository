---
name: portal-registration
description: Register for, and set up payment/autopay on, a vendor / HOA / property-management online portal (e.g. T&G Management, ClickPay, CINC/cincwebaxis). Use whenever registering a new online account, being asked why 1Password won't autofill a signup form, setting up a one-time payment or recurring autopay from a bank account, or handling an HOA/association bill. Owner-ratified 2026-08-30.
---

# Portal registration & payment — the repeatable recipe

Any seat can follow this cold. It captures what was learned the hard way on the Precious Homes at
Twin Lakes / T&G Management registration (2026-08-30) so it is never re-derived.

## The flow (most vendor/HOA portals work this way)
1. **Register** — fill an identity form (name, address, account number, email) and click Register.
   The site does **not** give you a password here; it **verifies you, then emails a password.**
2. **Password email lands** → **sign in.**
3. **At first login, set a strong password** and let **1Password save the login as a vendor item.**
4. **Only now can you pay** — many associations disable guest/"quick" pay and require a signed-in
   account. Make the one-time payment, then enrol autopay.

So registration and payment are usually **two sittings**, split by the verification email. Tell the
owner that up front; do not promise payment in one pass.

## Why 1Password does NOT autofill a registration form (the recurring question)
- **1Password fills LOGINS — a saved username+password for a site you already have.** On a *new*
  registration there is no login yet, so there is nothing to fill from.
- Registration forms are **identity forms with non-standard fields** — they often split the address
  into **Street Number** and **Street Name**, and carry a custom **Account Number** 1Password has
  never seen. Even 1Password's Identity autofill can't map those.
- **So don't fight it — type the identity fields by hand.** It's a handful of boxes, one time.
- **1Password's real job is the step after:** once the account exists, it saves the login with a
  **strong auto-generated password**. That is where it earns its keep, not on the signup form.

## The three steps NO agent can (or should) do — always the owner's
1. **Tick "I'm not a robot."** It exists precisely to require a human; no software passes it.
2. **Type bank / routing numbers.** These are kept away from every agent. They go **into the portal
   page or into 1Password**, entered by the owner — **never into a chat, a repo file, TO-CLOUD.md, or
   any file.**
3. **The final Pay / Register / Enroll-autopay click** on money or account creation.
Everything else — finding the real portal, filling identity forms, verifying the payee, checking for
duplicate autopay, staging the payment — the agent does.

## Money guardrails
- A payment runs only on the **owner's explicit approval** (that is the RED "one click"). Owner
  approval for one payee/amount does **not** raise the standing spend caps (OD-BUDGET-01) for anything
  else.
- **Verify the payee is the CURRENT one before any charge.** Management companies change — confirm the
  live manager three ways where possible (the association's own site, the portal branding, a recent
  manager email). A wrong payee on a recurring debit is worse than a misfile.
- **Check for an OLD autopay before enrolling a new one** (e.g. a prior ClickPay mandate) so the owner
  is never double-charged. Report whether it is dormant/off.
- **Confirm the exact first amount and date back to the owner** immediately before it charges.

## Verify the REAL portal — domains lie
- The obvious domain may be **dead/parked.** (`tgmgmt.com` was a parked page; the live portal was
  `tgmgmt.cincwebaxis.com`.) Confirm the working URL and that it is branded to the right company
  before entering anything. Many management portals live on **CINC / `*.cincwebaxis.com`**.

## Privacy default
- On any **directory / opt-in** section ("list me in the community directory"), **check nothing**
  unless the owner explicitly wants to be listed. Default to not publishing name/address/email/phone.

## 1Password save — vendor login, strong password
- Save the item as a **vendor login**: real URL, username, tagged `vendor`.
- Use **1Password's auto-generated strong password.** If the site emailed a temporary password, store
  that to get in, then **change it to the strong one at first login** and update the item.

## Window hygiene (OD-WINDOW-HYGIENE-01)
- **Close any window/tab you open once its action is done** or the route is abandoned. Never close a
  window the owner is using or one holding a pending owner click. No orphan tabs.

## Identity field values (reuse for Jorge's own accounts)
Name **Jorge Valdes** · homestead **13633 SW 142 Terrace, Miami, FL 33186** (Street Number 13633,
Street Name "SW 142 Terrace", City Miami, State FL, Zip 33186) · login email **Jorge@TeamUsaSales.com**.
Do not invent a phone number — pull from 1Password or leave optional phone fields blank.

#portal-registration #1password #autopay #hoa #vendor #cincwebaxis
