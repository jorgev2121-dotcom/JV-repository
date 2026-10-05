# TASK FOR RAMBO — Microsoft 365 Passkey Setup
**From:** Cloud (☁️) · 2026-10-05  
**Priority:** HIGH — eliminates Microsoft login passwords permanently  
**Account:** Jorge@TEAMUSASALES.COM

---

## What this does

Registers Windows Hello (Jorge's PIN/face scan) as a passkey on Microsoft 365.
After this, Jorge logs into all Microsoft services with his PIN or face — no password,
no 1Password, no reset emails ever again for Microsoft.

---

## Step 1 — Open the Microsoft sign-in page

Open Chrome or Edge and go to:  
`https://mysignins.microsoft.com`

Sign in as: **Jorge@TEAMUSASALES.COM**

If it asks for a password, use the Microsoft 365 entry in 1Password.

---

## Step 2 — Go to Security info

Once signed in, look for the **"Security info"** tab or link.  
(It may also be at: `https://mysignins.microsoft.com/security-info`)

Click **"Security info"**.

---

## Step 3 — Add a new sign-in method

Click the button that says **"+ Add sign-in method"** (or "Add a method").

A dropdown will appear. Look for one of these options (any of them work):
- **"Passkey (device-bound)"**
- **"Passkey"**
- **"Windows Hello or external security key"**

Select it and click **"Add"** or **"Next"**.

---

## Step 4 — Complete Windows Hello enrollment

Windows Hello will launch a prompt asking for:
- Jorge's **PIN**, OR
- **Face scan** / fingerprint

Complete whichever one it requests.

If it asks to **name the passkey**, type:  
`Windows Hello - Jorge's PC`

Click **Done** / **Finish** / **OK**.

---

## Step 5 — Verify it was saved

You should now see the passkey listed under Security info.  
It will show something like:  
*"Windows Hello or external security key — [device name]"*  
or  
*"Passkey — Windows Hello - Jorge's PC"*

If it shows up: **success.**

---

## Step 6 — Test it (optional but recommended)

Open a private/incognito browser window.  
Go to `https://outlook.office.com` or `https://portal.office.com`.  
Sign in as Jorge@TEAMUSASALES.COM.

At the sign-in screen, look for **"Sign in with passkey"** or **"Use Windows Hello"**.  
Click it — Windows Hello should unlock with PIN or face scan, no password needed.

---

## When done

Write to `mailbox/to-cloud/MICROSOFT-PASSKEY-DONE_2026-10-05.md`:

```
DONE — Microsoft 365 passkey setup
- Passkey registered: YES/NO
- Method shown: [what it shows under Security info]
- Test login worked: YES/NO/NOT TESTED
- Any errors encountered: [describe or "none"]
```

---

## If it fails

Common problems:

**"Your organization doesn't allow passkeys"**  
→ This is a Microsoft 365 admin policy. Write BLOCKED in the result file with that exact message.

**Windows Hello prompt doesn't appear**  
→ Make sure Windows Hello is set up in Windows Settings → Accounts → Sign-in options.  
If not set up, that's a prerequisite — write BLOCKED.

**Page not loading or "access denied"**  
→ Try `https://account.microsoft.com/security` instead (personal Microsoft account portal).

---

*Issued by Cloud session · TRK-2026-9953 area · Permanent fix for recurring password-reset cycle*
