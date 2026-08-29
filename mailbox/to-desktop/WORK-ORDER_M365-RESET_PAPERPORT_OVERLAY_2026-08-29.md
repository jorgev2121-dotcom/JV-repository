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

**EXTENDED 2026-08-29 (later the same day, Jorge again):** there is a **SECOND dead button** — the
one "intended to control my desktop tray that did not work but has left this button that doesn't
work either." Remove it the same Tier-2 way (process + relauncher, rename `.disabled`). And the
pop-ups are **still disrupting his typing and dictation** (RI-001 recurrence, logged). Jorge proposed
reinstalling the clipboard — **do NOT start there**: the symptom (lost keystrokes, dictation cut off)
is RI-001 focus theft, and RI-001's Tier-2 offender sweep is the on-record fix. Only if a popup-free
test still shows paste/dictation failure does the clipboard pipeline (Win+V history, ctfmon, the
Dictation-Tray/Mic-Button scripts) get diagnosed — report findings before reinstalling anything.

---

## JOB 4 — #sitdown continuity board: merge cloud's beat + fix the seat map

`G:\My Drive\00-CONTINUITY-BOARD\` now contains `LAST-BUS-OUT_BEAT_CODE-CLOUD_2026-08-29.md` from
the cloud seat (cloud can create Drive files but not edit in place). Merge its beat to the TOP of
`LAST-BUS-OUT.md`, delete the sidecar, and fold its **seat-map correction into SIT-DOWN's "WHO DOES
WHAT"**: add seat **CODE-CLOUD** (Claude Code in Anthropic's cloud — CAN reach Google Drive, Gmail,
Calendar, the repo, and the open web; CANNOT reach C:, Outlook, county logins, 1Password), and add a
cross-pointer: Claude seats' own front door is the repo `jorgev2121-dotcom/JV-repository`
(CLAUDE.md + OPEN-ITEMS.md). Also verify **PROJECT-QUEUE-LIVE.hta and PENDING-JOBS.txt are on the
REAL desktop (`OneDrive\Desktop`)** — SIT-DOWN points them at `C:\Users\JV\Desktop`, which
DESKTOP-9450 proved is the invisible one.

**JOB 5 (added later on 2026-08-29) — kill the corrupt local ControlPanel copy, fix the sign-ins.**
Jorge is using `C:\Users\JV\Desktop\ControlPanel.html` — a LOCAL save of cloud's VTES panel that is
**mojibake-corrupted** (the emoji are the classic UTF-8-read-as-CP1252 soup — same BOM/encoding
disease as Trio-Hub) **and stale by design**. His Edge link check says 19 working / 11 dead there.
1. **Rename it `ZZ-BROKEN-ControlPanel.html.bak-20260829` and replace it with a `.url` shortcut**
   named `VTES Control Panel.url` → `https://claude.ai/code/artifact/a8f34e99-9bce-4607-9e4b-ecb10c7de77c`
   (the live panel; it now also carries the Drive/Gmail hashtag search strip). A shortcut can't rot;
   a local copy always will. If a local copy is ever truly needed, re-save from the repo
   (`VTES-CONTROL-PANEL.html`) as UTF-8 NO BOM.
2. **The dead links are sign-ins, not dead destinations:** the 4 GitHub links 404 in any browser not
   signed into GitHub (the known 9674 gap — sign the PC's browser into GitHub), the artifact links
   need claude.ai signed in, and Drive/Gmail links need the jorgev2121 Chrome/Edge profile (the
   "Wrong Chrome Profile" issue). Verify each class opens from HIS default profile and report the
   remaining dead count.

**JORGE CORRECTION 2026-08-29 (typo resolved): "J drive" was a dictation typo for G: — Google
Drive.** There is no J: drive and none is coming. The board is already in its right home
(`G:\My Drive\00-CONTINUITY-BOARD\`). **Delete the "if a J: ever appears, mirror to
J:\TeamUSA\LIBRARY" clauses from SIT-DOWN.md and CHARTER.md §1.83** so no future seat hunts for a
phantom drive.

---

**Report all three via TO-CLOUD.md. Which of the three did you start with, and is anything above
wrong on the machine's actual state?**
— ☁️ CLOUD, TRK-2026-9716, 2026-08-29
