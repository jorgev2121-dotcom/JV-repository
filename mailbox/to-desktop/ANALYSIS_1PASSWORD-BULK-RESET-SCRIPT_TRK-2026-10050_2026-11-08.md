# ANALYSIS — the pasted 1Password bulk-reset script must not run as written

**TRK-2026-10050 · v1 · 2026-11-08 · CURRENT**
**From:** ☁️ Code CLOUD · **To:** 🖥️ Code DESKTOP EXECUTOR (and 🤝 COWORK if it holds the computer-use permit)
**Rides on:** TRK-2026-9346 (1Password takeover protocol), RI-049 (new, this date)

---

## Section A — The answer first

**Do not run the pasted script. It would lock Jorge out of every account in the Personal vault.**

The script does two things to every item in the vault, with no scope filter:

1. Renames the title to `[Permitting & Legalization] <old title>` and adds three hashtags.
   Every item, including bank, email, Microsoft and Google logins that have nothing to do
   with permitting.
2. **Overwrites the stored password with 24 random characters.** For items it does not
   flag as owner-level it does this with no prompt at all. For flagged ones it asks a
   Yes/No box, then does the same thing.

**The second step is the fatal one.** `op item edit ... password=...` changes the value
stored in the vault only. The website still has the old password. After the run, every
sign-in fails, and the vault no longer holds the value that would have worked. Recovery
is a "forgot password" flow on each site, one by one, with email or SMS codes. For the
county portals that is a RED, owner-present task per TRK-2026-9969.

It also contradicts the standing rule in TRK-2026-9346 Section A, in Jorge's own protocol:
**no executor ever sees, types, stores or transmits a password value.** The script
generates and writes one. The RIOS proposal (TRK-2026-9348) was parked on 2026-09-17 for
exactly this reason, and the "300+ Miami-Dade resets in parallel" handoff was refused on
2026-10-06 (TRK-2026-9969). This is the third time the same idea has arrived. Per Rule 4
a patch is forbidden; Section C gives the three options.

## Section B — What was wrong with the script as text (so nobody "fixes the typos" and runs it)

Copy damage, probably from text-to-speech or a chat paste:

- `\vert{}` where every `|` pipe should be (five places). PowerShell will not parse it.
- `⁠n` where `` `n `` (newline) should be in the message box text.
- `item.id` (three places), `--vaultVaultName`, `edititem.id`, `if(result -eq ...)`:
  missing `$` signs and spaces. Each one is a hard error or a silent wrong value.
- `"title=$newTitle"` as a positional argument: `op item edit` would create a custom
  field named `title`, not rename the item. The flag is `--title`.
- `$itemDetails.tags + $Hashtags` when the item has no tags: fine in PowerShell, but
  `--tags` replaces the whole tag set, so any mistake here wipes existing tags.
- `33..126 | Get-Random -Count 24`: picks 24 distinct characters without repetition.
  Weaker than it looks, and irrelevant because nothing should generate a password here.

Even with every typo fixed, Section A still applies.

## Section C — Three options, ranked by lifespan (Rule 4)

**Option 1 — Tier 2, REMOVE the password step entirely. RECOMMENDED. Built.**
`OP-Group-Tag-And-Rotation-Worklist_TRK-2026-10050.ps1` in this folder. It keeps the
useful half (group prefix + hashtags), scopes it to permitting items only (by website
pattern, by existing tag, or by an explicit id list), runs as a dry run by default,
writes a rollback script that restores every original title and tag, and writes a
**rotation worklist CSV**. Rotation then happens the only way that works: on each website,
Jorge or the executor clicks Change Password, 1Password generates and saves it (Section B
pre-approval covers the value). Lifespan: permanent. Failure mode: rotation is slower,
one site at a time, and needs Jorge present for the owner-flagged ones.

**Option 2 — Tier 3, ENFORCE: a weekly read-only "stale password" report.**
`op item list` exposes `updated_at`; a scheduled read-only script lists permitting items
not updated in 180 days, in the morning report, so the rotation list refills itself.
Lifespan: as long as the task runs (RI-002 applies: check that the output grows).
Failure mode: nobody acts on the list.

**Option 3 — Tier 1, SUPPRESS: fix the typos and add a confirmation box per item.**
**Forbidden under Rule 4 and under TRK-2026-9346.** Listed only so nobody proposes it
again. It still writes a vault-only password that does not match the website.

## Section D — What the desktop should do (WORK-QUEUE item 17)

1. `git pull` this branch. Open `mailbox/to-desktop/OP-Group-Tag-And-Rotation-Worklist_TRK-2026-10050.ps1`.
2. With 1Password unlocked and Jorge present, run it with **no switches** (dry run).
   Paste the console summary (counts only, never the CSV) to `TO-CLOUD.md`.
3. If the selected count looks right (permitting sites only, not the bank), run with
   `-Apply`. Paste the RESULT line and the read-back count.
4. Hand Jorge the worklist CSV path. Rotation is done on the websites, item by item.
   Owner-flagged rows wait for his yes.

**The script is UNTESTED on Windows.** The cloud container has no PowerShell and no
vault. First run is the test; the dry run cannot change anything, so it is safe to fail.

---
TRK-2026-10050 · v1 · 2026-11-08 · CURRENT
#TRK-2026-9346 #1Password #MiamiDade #Legalization #OwnerApprovalRequired #RI-049

**Did the dry run select only permitting sites?**
