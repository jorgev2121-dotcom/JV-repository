# OPERATIONS ARCHITECTURE — one source of truth for all seats
**TRK-2026-9784 (admin band) · Cloud set the architecture per owner 2026-09-13 ("I leave that up to you"). Building is assigned to Cowork, not Code.**

## The problem this solves
Not every seat can read the git repo (Cowork can't). So the shared source of truth must be somewhere **every
seat reaches** — that's **Google Drive.** But two hand-edited copies drift (the charter's repeated wound:
the mojibake twin, the four-tree problem). So: ONE canonical copy per item + a one-way mirror. Never two trees
both edited by hand.

## The design (recommended, single option — not a menu)
1. **Google Drive = the shared SOURCE OF TRUTH all seats read.** A module library, one block per thing, like
   `LLM-SUBSCRIPTIONS.md`: **programs, tools, connectors, communication methodology, contacts, subscriptions,
   permit modules.** Home: `G:\...\VTES-OPERATIONS\` (Cowork can read/write Drive).
2. **OneDrive = automatic BACKUP** of that library (RAMBO sets the sync/copy job; backup only, not a second editable tree).
3. **The git repo stays the CODE seats' MACHINE layer** — skills, hooks, the executable stuff that MUST live in
   the repo to function — and **references** the Drive modules rather than duplicating them. Where a doc must
   exist both places, **one side is canonical and the other is a generated mirror**, stamped which is which.
4. **One canonical copy per item.** Every module carries its TRK + `CANONICAL: Drive` (or `CANONICAL: repo`) so
   no future session hand-edits the mirror. A nightly mirror keeps them aligned; drift is a defect to log.

## Who builds what (Rule 10 — one hand on the machine, many brains)
- **Cowork BUILDS the Drive module library A-to-Z** (it reaches Drive; owner wants Code out of it). Owner watches it go.
- **RAMBO** does the machine parts only RAMBO can: the **OneDrive backup/mirror job**, and any **install**.
- **Cloud** set this architecture and assigns; it does not build the library (owner's instruction: "Code forgets").

## The turnkey infrastructure program (owner: "plug in our modules, get ahead")
- **Not recorded in the repo** — Cloud has no memory of the two options (one superior/harder-setup, one
  inferior/easier-setup). So **Cowork re-scouts both off-the-shelf options**, presents the same easy-vs-superior
  tradeoff, and recommends.
- **Installation is RAMBO's** (only RAMBO touches the machine). **Decision rule (owner):** if RAMBO can install
  the **superior** one with **no owner intervention**, do that; otherwise install the **easier** one.

#operations-architecture #source-of-truth #google-drive-primary #onedrive-backup #one-canonical-copy #TRK-2026-9784
`TRK-2026-9784 · v1 · p001 · 2026-09-13 · CURRENT`
