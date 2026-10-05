# TASK FOR RAMBO — 1Password Permanent Fix
**From:** Cloud (☁️) · 2026-10-05  
**Priority:** HIGH — eliminates a recurring cycle that has cost hours across 12+ months  
**Logged in:** RECURRING-ISSUES.md (to be updated when done)

---

## The problem this fixes

Every time Jorge needs to reset a password, 1Password locks mid-session, autofill breaks, and RAMBO has to be called in. This has happened with MDC today, and will happen again with Windows and Microsoft. Root cause: aggressive auto-lock + duplicate entries per site.

---

## STEP 1 — Fix 1Password auto-lock (5 minutes)

Open the **1Password desktop app**.

Go to: **Settings → Security**

Change these two settings:
- **"Lock after computer is idle for"** → set to **4 hours**
- **"Lock when browser closes"** → turn **OFF**
- **"Lock when Windows lock screen activates"** → leave ON (this one is fine)

Click Save. This stops 1Password from locking itself mid-session.

---

## STEP 2 — Fix Windows login entries (5 minutes)

In 1Password, search for: `Windows`

You will likely find multiple entries. The goal: **one entry**, clearly named.

**Keep:** The entry for `Jorge@TEAMUSASALES.COM` that has the current working password.  
**Archive/delete:** Any duplicates or stale entries for the same account.

Rename the keeper to: **`Windows Login - Jorge@TeamUsaSales.com`**

Verify the website field points to: `https://login.microsoft.com` or `https://login.live.com`

---

## STEP 3 — Fix Microsoft / Microsoft 365 entries (5 minutes)

In 1Password, search for: `Microsoft`

Same process — there will be duplicates. Jorge's Microsoft 365 account is `Jorge@TEAMUSASALES.COM` (CU Inspections of South Florida Inc).

**Keep:** One entry with the current working password.  
**Archive/delete:** Duplicates, old entries, anything labeled "Last Pass" or with a stale email.

Rename the keeper to: **`Microsoft 365 - Jorge@TeamUsaSales.com`**

---

## STEP 4 — Verify MDC entry from today (2 minutes)

The MDC password was just set today. Confirm in 1Password:

- Search for `Miami-Dade`
- Find the entry that was just saved (it may be named `account.miamidade.gov`)
- Rename it to: **`MDC Permitting Portal - jorge@TeamUsaSales.com`**
- Delete or archive all other Miami-Dade duplicates EXCEPT:
  - Keep a separate entry for `Chris Portal Access` (chris@revitamaxx.com) — that is a different person's login, keep it labeled clearly as Chris's
  - Keep a separate entry for the **MDC Clerk** portal if there is one (DoNotReply@miamidadeclerk.gov sends resets — that is a different site)

---

## STEP 5 — The other known problem sites (5 minutes)

Jorge identified these as recurring. While 1Password is open, do the same duplicate cleanup for:

- Search `EPS` or `MDC Permit` — clean up
- Search `ANF` or `toconnor` — this may be a client login, label it clearly
- Search `Permit Portal` — verify which site this is and whether it duplicates MDC

**Rule for each:** One entry per site. Named so Jorge can say it out loud and know which one it is.

---

## STEP 6 — Set up Passkeys (replaces passwords permanently)

Jorge already has Windows Hello (PIN + face/fingerprint). This step registers it as a passkey on each site so he never needs a password or 1Password for them again.

### Microsoft 365 passkey (do this first — highest value)

1. Open Chrome/Edge and go to: `https://mysignins.microsoft.com`
2. Sign in as `Jorge@TEAMUSASALES.COM`
3. Click **"Security info"**
4. Click **"+ Add sign-in method"**
5. Choose **"Passkey (device-bound)"** or **"Windows Hello or external security key"**
6. Follow the prompts — Windows Hello will ask for PIN or face scan
7. Name it: `Windows Hello - Jorge's PC`
8. Done — Jorge can now log into all Microsoft services with just his PIN/face, no password

### MDC portal passkey (do this after getting logged in)

1. Log into `https://accounts.miamidade.gov` with the new password
2. Go to **Account Settings** or **Security Settings**
3. Look for **"Passkey"**, **"Security key"**, or **"Windows Hello"** option
4. If it exists: register Windows Hello the same way
5. If it does NOT exist: skip — MDC hasn't added passkey support yet. Note in the result file.

### 1Password passkey note

1Password can also store passkeys. If 1Password offers to save the passkey during setup, click **Save** — that gives a backup. But Windows Hello alone is sufficient.

---

## When done

Write to `mailbox/to-cloud/1PASSWORD-CLEANUP-DONE_2026-10-05.md`:

```
DONE — 1Password cleanup complete
- Auto-lock changed: YES/NO
- Windows entries: [how many kept, how many deleted]
- Microsoft entries: [how many kept, how many deleted]  
- MDC entry renamed: YES/NO
- Other sites cleaned: [list]
- Any entries RAMBO was unsure about: [list them — do not delete if unsure]
- Microsoft passkey set up: YES/NO
- MDC passkey supported: YES/NO — if YES, set up: YES/NO
```

---

## Important

- **Do NOT delete any entry you are unsure about** — archive it instead (1Password has an archive feature that hides it without deleting)
- **Do NOT change Chris's entry** — that belongs to a client/contractor
- **Do NOT delete the Clerk portal entry** — that is a different MDC site

*Issued by Cloud session · Recurring issue fix*
