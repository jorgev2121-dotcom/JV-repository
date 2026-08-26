# SMOOTH-TRANSITION CHECKLIST — what's still missing for the other LLMs
**TRK-2026-9203 · built 2026-08-26 by Cloud · #transition #handoff #owner-actions #JorgeValdes #CU-Inspections #TRK-2026-9203**

## THE HONEST HEADLINE
The **documents** are transferred (handoff, index, all 101 docs, the VTS panel). What's missing is
not paper — it's **hands**. Cloud can touch your Drive, Gmail, the git repo, and the desktop mailbox.
A fresh LLM has **none of that** until you connect it. Below is the exact, short list of what only
YOU can do to give the next LLM those hands. Each is small.

## GAP 1 — A working API key (without this, no LLM can act) — OWNER, ~2 min
Make the **FREE Gemini key**: aistudio.google.com/app/apikey → Get API key → Create → copy.
This is the single unlock for the VTS panel (TRK-2026-9200). Grok's key is dead (replace at
console.x.ai when you're ready); OpenAI is paid, later.

## GAP 2 — Connect the new LLM to your Google Drive + Gmail — OWNER (only you can click consent)
Cloud reads/writes your Drive and the `_CLAUDE-MAILBOX` because it's connected. A new LLM isn't.
To give it the same reach, YOU approve the Drive + Gmail connection (an OAuth "Allow" screen).
**Cloud cannot click that for you — it's your identity.** Until it's done, the new LLM can read the
files you paste it, but can't browse Drive or use the mailbox on its own.

## GAP 3 — Keep the desktop bridge (your only hands on your PC) — ALREADY DOCUMENTED
Anything on your Windows PC (1Password, printer, county sites, local files) still needs the
**desktop executor**. The new LLM reaches it the same way Cloud does: by writing a `TASK-C2D` file
into `_CLAUDE-MAILBOX` and reading `TO-CLOUD.md` back. That protocol is in the handoff.

## GAP 4 — An always-on engine (so it runs while you're away) — OWNER sets once
Today the work only moves when a window is open. A scheduled Routine (set from claude.ai → Routines,
or the desktop on a timer) is the missing "engine." This is the one real infrastructure piece left.

## GAP 5 — The accounts map (so the next LLM knows what exists) — SAFE, listed here
Accounts in play (logins live in 1Password; NO passwords written here):
Google (Drive/Gmail/Gemini) · xAI/Grok (console.x.ai) · OpenAI (paid) · Anthropic/Claude ·
QuickBooks Online (invoice 5975) · Airtable (the Wally CRM) · 1Password (the vault) · YubiKey (2FA).

## NEW-LLM QUICKSTART (first 5 minutes)
1. Read `001_LLM-HANDOFF_FULL` and `CLAUDE.md`.
2. Confirm the rules: end every message with a one-word question; never fake "done."
3. Ask Jorge for the Gemini key, or to connect Drive/Gmail.
4. Start taking over drafting/analysis so Claude stops being the bottleneck.

## WHAT'S DONE vs WHAT NEEDS YOU
- DONE (Cloud): handoff, master index, VTS panel (9200), all docs to the capsule.
- NEEDS YOU: Gap 1 (Gemini key) · Gap 2 (connect Drive/Gmail) · Gap 4 (the schedule).

---
*The files moved. The hands don't move until you connect them — and that's 3 small clicks.
#transition #TRK-2026-9203*
