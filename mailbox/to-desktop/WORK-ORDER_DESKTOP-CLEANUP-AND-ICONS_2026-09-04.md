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

**CLIENT DOCUMENTS — run the ORPHAN-ONBOARDING / OCR protocol so hashtags route each to its capsule
(owner instruction 2026-09-04). Follow `.claude/skills/orphan-onboarding/SKILL.md` exactly.**

Any item that looks like a **client / job document** — a `TRK-2026-####` / `OPH-2026-####` file, a
permit PDF, a job report, anything address-, folio-, permit- or owner-named — is NOT a type sort. For
each one, per the skill:
1. **Issue an OPH number first** and write its row in `ORPHAN-REGISTER.md` BEFORE any analysis (so a
   dead session still leaves the number + location).
2. **OCR it** if it is an image-only scan with no text layer (this is the piece Cloud cannot do and
   why it is on the desktop).
3. **Extract identity evidence** — literal strings: full address+unit, folio `NN-NNNN-NNN-NNNN`,
   permit number, party names, date on the document, issuing body, any TRK already in the body.
4. **Write the hashtag sidecar** — a `.SEARCH.txt` / `.TAGS.txt` next to the file carrying those
   identifiers + the footer stamp (`TRK/OPH · v · date · CURRENT`), so the page stays findable and
   can route to its capsule even after it is moved. **This tagging step is GREEN** (read-only, creates
   a new sidecar, moves nothing).
5. **Attempt an EXACT match** (folio → permit → full address+unit → party+address). Stop at the first
   exact hit.

**THE ONE RULE THAT OUTRANKS THE REST — never file against a fuzzy match.** `14598 SW 110 ST` was
one digit-match from landing in another client's folder. **`SW 110 ST` ≠ `SW 110 CT`; `Unit 143` ≠
no unit.** If two candidate TRKs survive, that is a NO-match — record the rejected candidates and why,
and it **stays an orphan.** An orphan is a success, not a failure.

**GREEN vs RED line on this:**
- **GREEN (do it now):** OCR, identity extraction, writing the `.SEARCH.txt` hashtag sidecar, and
  proposing the capsule each doc belongs to.
- **RED (owner's one click):** the actual **MOVE of a client doc into its TRK/capsule folder.** Stage
  the proposed moves in a **`_NEEDS-JORGE-FILING`** folder on the Desktop with, for each, its
  proposed capsule and the exact-match evidence — batch them so the owner approves with one word
  ("file 1–12: yes"). Do the moves only on that click.
- **Never delete anything.** DUPLICATE / DISCARD is `DISCARD-PENDING`, the owner's call alone.
- **Batch rule (Rule 5):** more than 5 client docs → one subagent per doc with a status registry,
  each result written the moment it completes. Report the denominator ("14 of 22 matched").
- Do NOT touch the four Part-A shortcuts or anything the owner is actively using. Back up first: the
  "before" list + a rollback script to `...\Undo_Manifests\Rollback_DesktopCleanup_2026-09-04.ps1`.

**Note for the owner (one line, from the charter):** the Desktop is a *launchpad, not storage* — so
the real home for any matched job file is its Drive `01-JOBS\TRK-####\` capsule. The
`_NEEDS-JORGE-FILING` list is exactly the set headed there on your OK.

## Reporting
- Report both parts via the canonical VTES-Outbox (three-state: EXECUTED-WITH-PROOF / PARTIAL /
  BLOCKED), and post a line to TO-CLOUD.md so ☁️ relays to Jorge. Part B proof = the before-list,
  the folders created, the counts moved per type, and the `_NEEDS-JORGE-FILING` list awaiting his click.

#TRK-2026-9771 #desktop-cleanup #launcher-icons #RI-001 #RI-031 #rambo #RED-filing-guardrail
