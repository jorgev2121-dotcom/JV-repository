# WORK ORDER — 1Password becomes the SINGLE source of credential truth (site by site)
**TRK-2026-9762 · issued by ☁️ CLOUD 2026-09-04 · for 🖥️ RAMBO · owner: "1Password logs in, makes its own password, auto-saves; archive the other stores per website; single source; kill the other password stores as we take control of each site. You tell me how — let's do it."**

**YES, this is possible. It's a per-site migration loop, done incrementally as each website is touched —
not a big-bang.** Cloud can't touch 1Password/browsers; this is your lane. Batch rule (Rule 5): **one
subagent per site + a registry**, never one session grinding ~300 credentials.

## The per-site loop (run each time you're in a website)
1. **Get in** with whatever credential works today (browser-saved, old manager, or a reset).
2. **1Password captures the login** — save it as a `vendor` item (real URL, username).
3. **Rotate to strong** — change the site's password to a **1Password-generated** one, update the item.
   Now 1Password holds the authoritative credential.
4. **Archive the duplicates** — for that site, remove the copy from **every other store** (Chrome/Edge
   saved passwords, any other manager, any file). **ARCHIVE, do not delete** (RI-032): move to a
   `ZZ-ARCHIVE` state / export a backup first; **Jorge batch-approves the actual deletion.**
5. **Block re-creation** — turn OFF "offer to save passwords" in that browser so it stops minting new
   duplicates. One-time per browser. (This is the "kill the other password servers" step.)
6. **Log it** in `CREDENTIAL-MIGRATION-REGISTER.md`: site | in-vault? | rotated? | other-stores-archived? | browser-save-off? | date.

When every touched site shows all-yes and browser-save is off everywhere, 1Password is the single source
and the others are empty and retired.

## Durability tiers (Rule 4 — this is the recurring credential problem)
- **Tier-1 (patch):** fix one login at a time as you hit it — what's happened, ~10% in weeks, never finishes.
- **Tier-2 (removal — DO THIS):** the loop above, run as a real batched project + browser-save turned OFF
  so no new duplicates appear. Permanent per site.
- **Tier-3 (enforcement):** once the Conductor exists, it periodically flags any credential living outside
  1Password (new sites, a browser that re-enabled saving) for migration — keeps it single-source over time.

## Guardrails
- **Never auto-delete a credential** (RI-032) — archive, owner confirms the purge in batches.
- **Never touch personal / family (girlfriend's) accounts.**
- Robot-tick, bank numbers, and the final delete clicks stay **Jorge's**.
- No password/key value is ever written to the repo, a mailbox, or a chat — 1Password only.
- This **subsumes** the open T&G-portal 1Password fix — start with that site as case #1.

## First, this cycle
Run the loop on **T&G / Precious Homes** (`tgmgmt.cincwebaxis.com`) as the pilot site, and report the
diagnosis of why 1Password had no access there. Then propose the next 5 sites by frequency-of-use.

**CLOSING QUESTION:** After the T&G pilot, how many total credentials are we migrating, and where do they live now (Chrome? Edge? another manager? loose files?) — so we can size the batch?

#TRK-2026-9762 #1password #single-source #credential-migration #RI-032 #Tier-2 #cloud-to-desktop
