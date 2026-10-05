# Situation Brief — 1Password & MDC Recurring Cycle
**Date:** 2026-10-05  
**Author:** Cloud session (☁️)  
**For:** All AI sessions — Cloud, Cowork, RAMBO (Desktop), Chat, iPhone  
**TRK:** TRK-2026-9953 area  

---

## What happened today, and why it keeps happening

Jorge needed to reset his Miami-Dade County (MDC) permitting portal password.
This is a routine task. It took three hours. Here is exactly why.

### The vicious circle

1. **MDC session times out.** The portal kicks Jorge out after inactivity.
2. **Password reset is required.** MDC sends a verification code by email.
3. **The email goes to jorge@teamUSAsales.com** — his Microsoft 365 / Outlook account —
   not to jorgev2121@gmail.com (Gmail). This catches every AI off guard because Gmail
   is his default. The reset email is NOT in Gmail.
4. **1Password locks mid-session.** Auto-lock kicks in after a short idle period,
   exactly when the reset flow is active.
5. **Browser extension stops responding.** 1Password's Chrome extension goes silent.
   The desktop app still works, but the in-browser fill does not.
6. **Multiple duplicate entries exist.** When the flow resumes, 1Password has several
   "Miami-Dade" entries. It is not obvious which one is current. Picking the wrong one
   fails the login silently.
7. **Jorge is non-technical.** Each of these steps requires knowing which window to
   use, which entry is correct, and how to manually fill a form. That is not his
   skill set. He calls in RAMBO (the desktop AI executor) to physically operate the
   desktop for him.
8. **RAMBO was not running.** The desktop Claude Code session was not open.
   So the call for help went to the Cloud window (this session), which cannot touch
   Jorge's desktop.
9. **Loop repeats.** Without a permanent fix, this exact sequence will happen again
   with Windows login, Microsoft 365, and every other site that has duplicate entries.

### What was done today

- Cloud found the MDC verification code by searching Outlook directly
  (code was 282056, sent from accounts@miamidade.gov to jorge@teamUSAsales.com)
- RAMBO was eventually reached and set the new MDC password
- Three task files were written for RAMBO and committed to the repo:
  - `mailbox/to-desktop/TASK-RAMBO_MDC-PASSWORD-SET_2026-10-05.md`
  - `mailbox/to-desktop/TASK-RAMBO_1PASSWORD-CLEANUP_2026-10-05.md`
  - `mailbox/to-desktop/TASK-RAMBO_MICROSOFT-PASSKEY_2026-10-05.md`

### The permanent fix

**Passkeys.** A passkey replaces a password with Windows Hello (the PIN or face scan
Jorge already has set up). Once registered:

- No password. No 1Password entry. No reset email. No vicious circle.
- When the site asks Jorge to log in, Windows Hello pops up automatically.
  Jorge enters his PIN or scans his face. Done in 3 seconds.
- The passkey lives in Windows, not in 1Password. 1Password can also store a backup
  copy, but the primary authenticator is Windows Hello itself.

**Highest value targets for passkeys:**
1. Microsoft 365 / Outlook (jorge@TEAMUSASALES.COM) — registers at mysignins.microsoft.com
2. MDC portal (accounts.miamidade.gov) — check if passkeys are supported after login
3. Any other site Jorge hits 2+ times a year on password resets

**Until passkeys are registered:** RAMBO must complete the 1Password cleanup
(auto-lock → 4 hours, one entry per site, correct names) per the task files above.

---

## What every AI session needs to know

### Email routing
- **Password reset emails → jorge@teamUSAsales.com (Outlook / Microsoft 365)**
- Gmail (jorgev2121@gmail.com) does NOT receive these — do not search Gmail for reset codes
- To find a reset email: use the Microsoft 365 MCP tool, search `from:noreply accounts`
  or `from:miamidade.gov` or similar

### Window routing
- **☁️ Cloud** = this session = browser-based = cannot touch Jorge's desktop
- **🖥️ RAMBO** = desktop Claude Code = must be installed, then always open in taskbar
- **🤝 Cowork** = scheduled sessions, connected to Outlook + Drive
- Tasks for the desktop go in `mailbox/to-desktop/` — RAMBO pulls them

### 1Password current state (as of today)
- Auto-lock is too aggressive — being fixed by RAMBO
- Duplicate entries exist for: Windows login, Microsoft 365, MDC portal
- After RAMBO cleanup: one entry per site, named clearly
- After passkey setup: 1Password entries for Microsoft + MDC become backup only

### The RAMBO install status
- As of 2026-10-05: RAMBO (desktop Claude Code) was not installed / not running
- Jorge is installing it via claude.ai/download
- Once installed: pin to taskbar permanently, never close it

---

## Standing rule for all sessions

**Before asking Jorge to reset a password:**
1. Check if a passkey exists for the site first
2. If no passkey: search Outlook for the reset email (NOT Gmail)
3. If RAMBO is needed: check `mailbox/to-cloud/` for RAMBO's status first
4. If RAMBO is not running: the task must be written to `mailbox/to-desktop/`
   and Jorge must open the Claude Code desktop app to execute it

**Do not route desktop tasks to the Cloud window.** Cloud cannot execute them.

---

*Written by Cloud session · TRK-2026-9953 · End with a question: did this brief land where you needed it?*
