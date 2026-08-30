# WORK ORDER — HOA / management-portal registration (Twin Lakes · T&G Management)
**TRK-2026-9757 · issued by ☁️ CLOUD 2026-08-30 · for 🖥️ DESKTOP + 🐏 RAMBO + 1Password**

**Owner directive (verbatim intent):** register (if not already done) the homeowners-association /
management-company account for Jorge's **homestead** property. RAMBO and 1Password work on this
together; **ask Jorge if anything is needed or if any blocker is hit.**

## The facts as dictated (READ-BACK — Jorge to confirm the two flagged items)
- **Owner:** Jorge Valdes (homestead).
- **Property / homestead address:** **13633 SW 142 Terrace, Miami, FL 33186.**
  (County folio for this address, from prior county run: 30-5923-017-0050 · JORGE VALDES.)
- **Account number (as dictated "P as in Paul, H, 1 3 6 3 3 1 4 2"):** **`PH13633142`**
  — ⚠ **CONFIRM this exact string with Jorge before submitting anything.**
- **Community / HOA:** **Twin Lakes** (year **2026**).
- **Management company:** **T&G Management** — registration site **https://tgmgmt.com** → the
  **"Twin Lakes 2026"** registration page.
- **"for precious homes":** ⚠ **UNCLEAR from dictation** — possibly the builder/community name
  ("Precious Homes") or a homeowner-type field. **Ask Jorge what this refers to** before using it.

## Why this is a desktop + RAMBO job (cloud attempted, per EXHAUST-FIRST)
Cloud has **no browser** and is **egress-blocked from tgmgmt.com** (tested 2026-08-30 — the network
policy refuses it). Registration needs a real browser session + credentials from 1Password. That is
RAMBO's lane on the desktop.

## Steps (RAMBO + 1Password)
1. Open **https://tgmgmt.com**, find the **Twin Lakes 2026** homeowner/resident registration.
2. Check 1Password first — **an account may already exist.** If a Twin Lakes / T&G login is stored,
   the registration is likely already done → report that to Jorge and STOP (no duplicate account).
3. If not registered: fill the form with the confirmed account number `PH13633142`, the homestead
   address above, and Jorge's contact details. **Pull any needed values from 1Password; store the new
   login back into 1Password** under a clear item name (e.g. "Twin Lakes HOA — T&G Management").
4. **RED — pause for Jorge's one action:** signups are RED. **Do NOT click final Submit, and do NOT
   enter any email/SMS verification code, on your own.** Fill everything, then hand the last click
   (and any verification code that lands in Jorge's email/phone) to Jorge. Ask him.
5. Report the outcome to TO-CLOUD.md: registered / already-existed / blocked-and-why.

## Guardrails
- No payment unless Jorge approves (RED); if a fee is required, stop and ask.
- Confirm the account number and "precious homes" meaning BEFORE submitting — a wrong account on an
  HOA portal is a real misfile.
- Store credentials only in 1Password; never write them to a repo file or TO-CLOUD.

## Blocker note
This cannot run until the repo **branch conflict is settled** (RAMBO/desktop can't pull work orders
across the merge conflict in OPEN-ITEMS.md / PASTE-LOG.md — failing every cycle). Settling the branch
unblocks this registration together with the Alec books and the OCR sweep.

#TRK-2026-9757 #hoa #registration #twin-lakes #tgmgmt #rambo #1password
