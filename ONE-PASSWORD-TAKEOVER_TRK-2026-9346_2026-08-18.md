# 1Password takes over everything — the protocol, the audit, and the proof

**TRK-2026-9346 · issued 2026-08-18 on Jorge's dictated order · supersedes the never-built
JOB-0023 (1Password session audit — confirmed absent in the register audit, ordered weeks
ago, nothing behind it). This time it carries a number, a test, and a deadline.**

---

## Section A — The one security line that governs all of it

**No executor ever sees, types, stores or transmits a password value. Ever.**

That is not a limitation on this plan — **it is why 1Password is the right answer.** It
generates the password, saves it, and fills it, and the secret never passes through any
Claude session, any file, any chat. **Credentials live in 1Password vaults and nowhere
else** — never in the Orange Tree, never in a due-diligence report (those go to clients),
never in Drive, never in this repo. **Reports carry the site's NAME and its vault
reference. The vault carries the secret.**

## Section B — Jorge's standing pre-approval, recorded

**Owner directive, dictated 2026-08-18, in his words:** *"I give it my automatic
pre-approval to always use the suggested password provided."*

**What this means in practice:** whenever a new account is registered or a password is
changed during supervised work, **1Password's generated suggestion is accepted without
asking Jorge each time.** He clicks; nobody reads the value. What it does NOT change:
sign-ins, spend, and account creation remain owner actions — this pre-approval covers the
*password choice*, not the *decision to register*.

## Section C — Why 1Password has been "reluctant," and the fix

**It is not reluctant. It is losing a fight with three built-in competitors** that grab
the password box first: Edge's manager, Chrome's manager, and Windows Hello's offer to
save. The fix is to fire the competitors and promote 1Password — six settings, one pass:

1. **Edge** → Settings → Passwords → **turn OFF** "Offer to save passwords" and autofill.
2. **Chrome** (if used) → same two switches OFF.
3. **1Password browser extension** → Settings → **"Make 1Password the default password
   manager" ON**, autofill ON.
4. **1Password app** → Settings → Security → **Unlock with Windows Hello ON** — his face
   or PIN opens the vault, which kills most of the friction that made it feel reluctant.
5. **1Password app** → Settings → Developer → **enable the CLI** (`op`) — ships inside the
   app, nothing new installed. This is what makes PROOF possible.
6. **iPhone:** Settings → Passwords → AutoFill → **1Password on, Keychain off** — the
   known open decision from the register, folded in here.

## Section D — The proof standard ("proof that he got into the program")

**Proof is command output, not a claim.** With the CLI enabled, the desktop runs — with
Jorge present to unlock — and pastes:

- **`op whoami`** → shows the signed-in account. **This is the "he got in" proof.**
- **`op vault list`** → the vaults that exist.
- **`op item list --format=json | count per vault`** → how many credentials are held,
  per category. **Counts only — never the items themselves.**

**Blockers reported the same way:** each one named with the exact screen it appears on and
the smallest owner action that clears it. The known possibles: the app signed out (only
Jorge's master password fixes that — nobody else may touch it), the extension not pinned,
Hello not enrolled, the M365 sign-in still pending for Outlook-linked accounts.

## Section E — The taxonomy, decided as he delegated

**One 1Password account. Five vaults, not five databases.** Separate databases would
recreate the two-sync-engines disease; vaults give grouping with one source of truth:

| Vault | What goes in | Hashtag family |
|---|---|---|
| **Municipalities** | Clerk, Tax Collector, EPS/permits, DBPR, city portals | `#municipalities-access` |
| **AI-Services** | Anthropic, xAI, OpenAI, GitHub, DigitalOcean | `#ai-access` |
| **Business-Core** | Google, Microsoft/M365, 1Password itself, banking-adjacent (names only) | `#business-core` |
| **Reports-Research** | Zoho, Airtable, data vendors, skip-trace | `#reports-research` |
| **Client-DD** | any per-client portal an HOA or county assigns | `#client-dd` |

**Every item gets:** its real site name · the hashtag · **a TRK in the item's notes field**
so a tracking number search inside 1Password finds it. **The registry of names (not
secrets) lives in `ONE-PASSWORD-LINKS_TRK-2026-9347.md`** and the Orange Tree's source rows
point at names only. **Merge-on-demand is automatic by design:** the DD report names the
source; the vault holds its key; nothing is ever copied between them.

## Section F — Order of execution

1. **Desktop, with Jorge present (10 minutes): the six settings + the three proof
   commands.** Queued as TRK-2026-9348.
2. **First credential through the new door: the Clerk of Court** — the Friday blocker.
   Register with 1Password suggesting and saving; nobody reads the value; the deed-chain
   search opens.
3. **Then the link list, top to bottom**, adding each named site as it is next used —
   never a bulk migration sprint, which is how password projects die.

#JorgeValdes #CU-Inspections #1Password #one-password #credentials #municipalities-access
#ai-access #business-core #reports-research #client-dd #TRK-2026-9346
