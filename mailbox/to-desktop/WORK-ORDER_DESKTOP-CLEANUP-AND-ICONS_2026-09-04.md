# WORK ORDER — Desktop cleanup (file-by-type) + four Claude-window launcher icons
**TRK-2026-9771 · issued by ☁️ CLOUD 2026-09-04 · for 🖥️ DESKTOP + 🐏 RAMBO**
**Owner asked for both in-session 2026-09-04. Cloud cannot touch the desktop — this is RAMBO's lane.**

---

## PART A — Four Claude-window launcher icons (owner request)
Owner: *"provide icons on desktop tray for all Claude windows, for cloud and desktop: chat, cowork and code."*

**Recommended form (durable, Tier-2 — NOT another overlay):** four **real desktop shortcut
icons**, one per surface, each clearly labelled and with a distinct icon. This is the third pass at
"help me find the right window" — the beige window-selector and the ABCD overlay were both killed by
the owner as not working (RI-001 / RI-031). Do **not** rebuild an overlay. Use real OS objects.

Create these four shortcuts on the Desktop (and pin each to the taskbar so they persist):
1. **🖥️ CODE — DESKTOP (RAMBO)** → the Claude Code terminal launcher on this PC.
2. **☁️ CODE — CLOUD** → browser shortcut to https://claude.ai/code (open as its own window / PWA install so it is app-like, not a lost tab).
3. **💬 CHAT** → browser shortcut to https://claude.ai (PWA install if possible).
4. **🤝 COWORK** → the Cowork desktop app (or its launcher).

- Give each shortcut a **different icon** so they are distinguishable at a glance; label text exactly
  as above so it matches the emoji banners the seats already use.
- The two browser ones (Cloud, Chat) are **tabs, not apps** — install them as PWAs / "open as window"
  so they behave like real windows. That is the honest limit of a "tray icon" for a web surface.
- If a genuine **system-tray** presence is wanted later, that needs a small resident helper app —
  raise it with the owner before building; do not add a background process on your own.

## PART B — Desktop cleanup, filed by type (owner request)
Owner: *"clean up my desktop, take what is displayed on my desktop, file by type in the folder you
will create on my desktop and name with the type."*

**Do this:**
1. Enumerate everything currently **on the Desktop** (files + loose items). Report the count and list first.
2. Create type-named folders **on the Desktop** as the owner asked, e.g. `PDF`, `Images`,
   `Word`, `Excel`, `Installers`, `Screenshots`, `Text`, `Zips`, `Shortcuts`, `Other`.
3. Move each **non-client, safe** item into its type folder. GREEN, reversible (same-desktop move).

**HARD GUARDRAIL — do NOT blind-file client documents (RED, per Rule 9 / Night Protocol):**
- Any item that looks like a **client / job document** — a `TRK-2026-####` or `OPH-2026-####`
  file, a permit PDF, a job report, anything address- or owner-named — is a **filing decision, not a
  type sort.** Misfiling a client doc is the exact harm the charter warns about (`14598 SW 110 ST`
  was one digit from another client's folder).
- Put those in a single **`_NEEDS-JORGE-FILING`** folder on the Desktop and **list them for his one
  click** — do NOT sweep them into `PDF/` by extension, and do NOT move them to Drive/OneDrive on
  your own. Nights prepare filing decisions; the owner executes them.
- **Never delete anything.** No item leaves the Desktop tree except into the folders above.
- Do NOT touch the four new shortcut icons from Part A, or anything the owner is actively using.
- Back up first: write the enumerated "before" list, and a rollback script to
  `...\Undo_Manifests\Rollback_DesktopCleanup_2026-09-04.ps1`, before moving anything.

**Note for the owner (one line, from the charter):** the Desktop is a *launchpad, not storage* — so
the real home for any job file is its Drive `01-JOBS\TRK-####\` folder. The `_NEEDS-JORGE-FILING`
list is exactly the set that should end up there on his OK.

## Reporting
- Report both parts via the canonical VTES-Outbox (three-state: EXECUTED-WITH-PROOF / PARTIAL /
  BLOCKED), and post a line to TO-CLOUD.md so ☁️ relays to Jorge. Part B proof = the before-list,
  the folders created, the counts moved per type, and the `_NEEDS-JORGE-FILING` list awaiting his click.

#TRK-2026-9771 #desktop-cleanup #launcher-icons #RI-001 #RI-031 #rambo #RED-filing-guardrail
