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

**JOB 6 (Jorge, later 2026-08-29) — ADOPT THE RIDER AND GO.** Pull the repo and read
`AGENT-RIDER_EXECUTOR-01_2026-08-29.md` (TRK-2026-9724). Jorge's "let's go" is the standing YES for:
1. **Turn the JOB-0079 §D.1 watcher ON** (the DIR-0079-D1 YES that's been sitting unused) — that IS
   onboarding the overnight agent. Log it with proof.
2. **Execute the popup bundle** (typing shield ON, wrap the 10 noisy tasks, nudge → board) — undo
   script first, as you offered.
3. **Run EXECUTOR-01's first lane** under the rider: Amazon return of the USB-C drive + label print
   + ≤$40 USB-A reorder on the signed-in Amazon session, card-on-file, everything logged. Jorge has
   delegated the Pay click inside the cap (OD-BUDGET-01). His two physical moments (Authenticator
   tap for M365, vault Hello/PIN) get batched into ONE ~10-minute window — tell him when.
4. **Outlook Classic button incident (screenshot in Jorge's chat):** the button launched
   `OUTLOOK (3).EXE` → "OutlookServicing.dll not found". That's a stray copied exe, not a broken
   Office. Repoint the shortcut to the real `OUTLOOK.EXE` under Program Files, rename the stray
   `ZZ-BROKEN-…`, test-fire it per the rider's TEST-BEFORE-SHIP law, log PASS/FAIL. No reinstall
   unless the REAL exe also fails.
5. **TEST-BEFORE-SHIP is now law** (rider §1): test-fire every button/link/panel before it reaches
   Jorge's screen — starting with every link on the VTES panel and every HTA still live.

**JOB 7 (Jorge, evening 2026-08-29) — FULL TEST SWEEP TONIGHT, with a report.** The 3-in-1 hub is
broken AGAIN (post-BOM-fix — log the recurrence) and "many other tabs not active." Per rider §1
TEST-BEFORE-SHIP: test-fire EVERY link/button on the VTES panel, the 3-in-1 hub, and every live HTA;
report **N of M PASS** with the failure list and fixes applied. Also: Jorge says the browser mic is
substandard — check the Windows default input device (webcam mic vs. the good mic) and set the right
default. Report via TO-CLOUD; cloud relays.

**JOB 8 (PRIORITY — the Alec account).** Jorge fears losing Alec. The record: microfilm DONE (421
files/517MB, TRK-1534/1535/1536) but `REPLY-ALEC_Microfilm-RETRIEVED_2026-08-16.eml` still UNSENT
(18+ days); the 218 ST address blocker is ANSWERED (11997 SW 218 ST; Yaira Campbell 08-24 "no bldg
jacket" — unread); two jackets arrived 08-21 unread/uncapsuled. **Tonight: stage the corrected email
ready-to-send + read the two unread county replies + capsule the two new jackets (prep only, filing
decisions wait for morning). Jorge's one click sends it; then the $100.25 invoice.**

**JOB 9 (Wally/Priority-Zero lane — tonight, GREEN read-only).** From the CODE-9712 call sheet
(1,287 open private recert-driven Unsafe Structures cases): build **TOP-20 DEEP POCKETS** — rank by
corporate/institutional owner + lien size already reflected in RER. Per row: owner name · case/
process number · date initiated · permit number if any · **flag: permit expired AFTER citation**
(the already-hired-someone-and-stalled tell) · lien amount. No phones/emails needed — Jorge
qualifies manually. Deliver as a file in Drive + note the path; cloud will link it on the panel.

**JOB 10 — jacket pipeline batch.** 10980's ORIGINAL+ENHANCED+FINAL pipeline = the standard Jorge
just ratified (original always stays; enhanced right under it). He reviews 10980 NOW (stop-work
gate). **On his GO: run the remaining 12 of 13 properties through the same pipeline overnight**
(GREEN — writes only new files). Report denominator: X of 12 complete.

**JOB 10 AMENDMENT (Jorge, owner directive) — NOA / Florida Product Approval rule.** In every
jacket: **identify NOA / FL product-approval sections, EXCLUDE them from the ENHANCED deliverable
(they're huge and not needed for review), but FLAG their presence on the cover/proof sheet** — e.g.
"NOA present: pp. 44–96 (53 pp), excluded, in ORIGINAL." Original keeps everything, always.

**JOB 11 — blue stack-count badges, built to LAST.** Jorge wants back the blue circles showing the
window count on each stack, and notes "they always disappear." Diagnose WHY they decay (overlay
killed on restart = the usual), then rebuild Tier-2/3: into the Trio-Hub/stack switcher itself or
with a relauncher task via Run-Hidden.vbs — not another orphan overlay. TEST-BEFORE-SHIP applies.

**JOB 12 — Alec contiguous-reader inventory.** For the Orange-Tree-style review window cloud will
build: produce the file list (name · pages · Drive link · ORIGINAL/ENHANCED pair · NOA flag) for
TRK-1534/1535/1536 jackets AND the 07-Microfilm-Records sets (421 files). Drop it as
`ALEC-READER-INVENTORY_2026-08-29.tsv` in the 1534 capsule; cloud builds the reader from it.
**Also answer in your report: were the MICROFILM sets ever enhanced, or ORIGINAL-only?** (Cloud
verified the 1534 TAX JACKET is fully enhanced side-by-side; the microfilm was never in the 8/24
pipeline — confirm.) And verify page-completeness of the enhanced jackets vs originals (Jorge's
"pages missing" bet — settle it with counts).

**JORGE CORRECTION 2026-08-29 (typo resolved): "J drive" was a dictation typo for G: — Google
Drive.** There is no J: drive and none is coming. The board is already in its right home
(`G:\My Drive\00-CONTINUITY-BOARD\`). **Delete the "if a J: ever appears, mirror to
J:\TeamUSA\LIBRARY" clauses from SIT-DOWN.md and CHARTER.md §1.83** so no future seat hunts for a
phantom drive.

---

**Report all three via TO-CLOUD.md. Which of the three did you start with, and is anything above
wrong on the machine's actual state?**
— ☁️ CLOUD, TRK-2026-9716, 2026-08-29
