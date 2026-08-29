# WORK-ORDER — CLOUD → DESKTOP — 2026-08-29
**TRK-2026-9716** · from ☁️ CODE · CLOUD/WEB · #M365 #1Password #PaperPort #overlay #JorgeValdes
**Jorge dictated three jobs today with 6 screenshots. Screenshots are committed beside this file in
`mailbox/to-desktop/screens_2026-08-29/`. Work them in the order below; report via TO-CLOUD.md.**

---

## JOB 1 — Microsoft 365 password reset, then into 1Password (HIGHEST — this is the OD-26 / Outlook / M365-connector blocker)

**Jorge's words:** *"describe the screens and the URL so 1Password can jump on all these and get them
done, fixed and in his control so they're not blockers to me anymore."*

**Account:** `jorge@teamusasales.com` (the Microsoft 365 / Office 365 work account — the same login
that blocks Outlook sign-in (9343), the Microsoft_365 connector (TRK-2026-9020), and OD-26).
**URL of the flow:** `https://passwordreset.microsoft.com` ("Get back into your account").

**Exactly where the attempt died — five screens, in order (files 1–5 in the screens folder):**

1. **"Who are you?"** — `jorge@teamusasales.com` entered. Fine.
2. **Verification step 1** — five options offered: email alternate email · text mobile · call mobile ·
   **approve a notification on my authenticator app (was selected, number-match "54" displayed)** ·
   enter a code from the authenticator app. So **Microsoft Authenticator IS enrolled on his phone.**
3. **Verification step 2** — "Email my alternate email" chosen; Microsoft sent a code to the alternate
   email. An **iCloud Passwords AutoFill popup** sits on top of the code box.
4. **Red error: "The verification code you entered does not match the code we sent."** The emailed
   code came back wrong — stale code, wrong inbox, or a re-send invalidated the first one.
5. **Terminal failure: "Reset your password — Please enable cookies in your browser."** That browser
   profile blocks the cookies the reset flow needs, so even a correct code dead-ends here.

**Diagnosis (three separate blockers, all small):**
- **B1 — cookies:** the browser profile used blocks cookies for the Microsoft reset domain. Fix: run
  the whole flow in a fresh **Edge InPrivate** window (or a Chrome profile with cookies allowed for
  `passwordreset.microsoft.com` + `login.microsoftonline.com`).
- **B2 — the emailed code path is fragile:** each re-send invalidates the previous code, and the
  alternate inbox is unidentified. **Skip email entirely — use "Approve a notification on my
  authenticator app"** (screen 2 proves it's enrolled; Jorge taps approve and matches the number).
- **B3 — autofill fight:** the **iCloud Passwords extension** is popping over Microsoft's fields. For
  the 1Password takeover it will fight 1Password on every site. Disable the iCloud Passwords browser
  extension (leave the app alone) so 1Password owns autofill.

**Execution (ATTENDED — credentials are owner-gated; needs Jorge + his phone, ~5 minutes):**
1. Open Edge InPrivate → `https://passwordreset.microsoft.com` → `jorge@teamusasales.com`.
2. At verification, pick **authenticator notification**; Jorge approves the number-match on his phone.
3. Set the new password **with Jorge**, and save it into **1Password immediately** as the
   `jorge@teamusasales.com` / Microsoft 365 entry (this is the "in his control" part).
4. Then, same sitting: sign into Outlook / Office 365 on the PC, and have Jorge authorize the
   **Microsoft 365 connector** at claude.ai → Settings → Connectors (unblocks 9020 + OneDrive read).
5. Log the entry in the 1Password takeover register (TRK-2026-9346 / ONE-PASSWORD-SITES status file):
   this account moves from BLOCKED to DONE.

**What this unblocks when done:** Outlook automation, OCR-on-arrival's front door (9343), the M365
connector for cloud, OneDrive reads, and OD-26 PST export. It is the single highest-leverage login on
the blocker list.

---

## JOB 2 — PaperPort: new items are generic blank thumbnails (screenshot 6)

Jorge's report: older items show real page thumbnails; **the newer attachments show only the generic
white-document icon**, and he suspects they're "being forwarded somewhere else."

This extends **PASTE-D-026** (the PaperPort intake sweep, already issued) and sits in the **RI-021
family** (PaperPort degradation — logged again today). Diagnose before touching:
1. Open `My PaperPort Documents` (BOTH locations — `C:\Users\JV\Documents\...` and the OneDrive one;
   RI-021 notes say two exist) and list the generic-icon items: real files or stubs? Report name,
   extension, size, dates. A 0-byte or .lnk entry = the content went elsewhere (Jorge's theory);
   a real PDF with no preview = PaperPort's thumbnail/link-module fault (RI-021's known failure).
2. Report which it is and the file list. **Move/delete nothing — filing is RED; mornings execute.**

---

## JOB 3 — Remove the dead "ABCD window labeler" overlay (Tier 2 removal, Jorge's direct order)

Jorge: *"get rid of this program that never worked, but keeps its button right over the corner of the
window, making it almost impossible to close. It was supposed to divide/display whether it was Chrome
or Edge, cloud or desktop — the ABCD labeling that never happened."*

- Find the always-on-top button/overlay that parks over window close corners (RI-027/RI-031 family —
  our own stacked HTAs/overlays are documented offenders; likely candidates: an ABCD/window-label HTA,
  Mic-Button-Overlay.ps1, or a sibling in the same script folder).
- **Tier 2, not Tier 1:** kill the process AND remove what relaunches it (startup entry / scheduled
  task / shortcut) so it cannot come back. Rename the script to `.disabled`, don't delete (deletion is
  Jorge-only). Record name, path, and launcher in TO-CLOUD.md and RECURRING-ISSUES.md.
- Its *purpose* (which window is which) is already solved the durable way: charter §10 banners +
  D-024 statusline + the browser-vs-terminal rule in `WINDOW-CONFIG_ALL-SURFACES_2026-08-24.md` §E.

---

**Report all three via TO-CLOUD.md. Which of the three did you start with, and is anything above
wrong on the machine's actual state?**
— ☁️ CLOUD, TRK-2026-9716, 2026-08-29
