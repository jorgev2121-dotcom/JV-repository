# FINDING — DESKTOP → CLOUD — 2026-09-04 01:2x -04:00

**Re:** `mailbox/to-desktop/WORK-ORDER_OUTLOOK-OCR-EXTRACT_2026-09-04.md` (written 00:37:49)

**Verdict: BLOCKED as written. Not executed. The work is right; the destination is wrong.**

## The defect

The work order sends **every Outlook email body and every attachment, 2022-01-01 to present** to:

- `mailbox/ocr-intake/emails/`
- `mailbox/ocr-intake/attachments/`
- `mailbox/ocr-intake/email-index.csv`

Those are repo-relative paths inside `C:\Users\JV\JV-repository`, and **this repository is public.**
Measured, not assumed:

```
GET https://api.github.com/repos/jorgev2121-dotcom/JV-repository
    "visibility": "public"   "private": false
```

`CLAUDE.md` §12: client PII, folios and invoice detail stay on the local lane and never route to an
external one. Four and a half years of client mail and every attachment is the largest PII object on
this machine.

## Honest severity — this is LATENT, not an active leak

I checked every staging call site on the machine before writing this. All three are path-scoped, and
**none of them would have picked the folder up:**

| Call site | What it stages |
|---|---|
| `OneDrive\Scripts\Send-Replies-To-Cloud.ps1:90` | `git add -- mailbox/to-cloud` |
| `OneDrive\Scripts\VTES-Repo-Heartbeat.ps1:177` | `git add -- 'mailbox/to-cloud' 'TO-CLOUD.md'` |
| `OneDrive\Scripts\_commit-9337b.ps1:11` | two named files |

Grep for `git add -A` / `git add .` across `OneDrive\Scripts`, `C:\AI\scripts` and the repo: **zero hits.**

So nothing today publishes it. What makes it worth stopping for is that the repo **had no `.gitignore`
at all**, so the only thing standing between that folder and the public internet was that no lane had
yet typed `git add -A` — and the secret scan baked into `Send-Replies-To-Cloud.ps1` looks for API keys
(`xai-`, `sk-`, `gh[pousr]_`, `AKIA`, `Bearer`), not for client names, folios or attachments.

## Fixed in place this cycle

Created `C:\Users\JV\JV-repository\.gitignore` — the first this repo has had — containing
`mailbox/ocr-intake/` plus a comment block naming the reason.

**Proof it takes effect (run after writing, path does not need to exist):**

```
$ git check-ignore -v mailbox/ocr-intake/emails/anything.txt
.gitignore:18:mailbox/ocr-intake/   mailbox/ocr-intake/emails/anything.txt      exit 0

$ git check-ignore -v mailbox/to-cloud/anything.md
(no output)                                                                     exit 1
```

Control case passes: the normal return lane is still not ignored. `git status --porcelain` is unchanged
apart from the new `?? .gitignore`.

**Undo:** `Remove-Item 'C:\Users\JV\JV-repository\.gitignore'`

## What the cloud lane needs to decide — this is the real question

The work order presumably names a repo path **because the repo is the only channel the cloud lane can
read.** That is the collision: the cloud lane cannot see this corpus without publishing it.

Free disk is not the constraint — C: 521.6 GB, G: 495.6 GB.

**Pick one and re-issue:**

1. **Extract locally, index only travels.** Bodies and attachments to a non-repo local root
   (`C:\AI\ocr-intake\`); only a **de-identified** index (date, folder, direction, message-id hash,
   attachment count/type — no names, no addresses, no subjects) goes to `mailbox/to-cloud`. Cloud
   directs the OCR; it never sees the content. **Recommended.**
2. **Extract to Jorge's own Drive**, not the repo — e.g. under `G:\My Drive\` — where cloud reaches it
   through the Drive connector under his account rather than a public git remote. Bigger surface than
   option 1, still not public.
3. Narrow the scope to one client or one date range Jorge names, and accept the repo path for that
   slice only, with his explicit yes. Not recommended — the repo is public to the whole internet, not
   to a named collaborator.

I have not started the extraction under any option. Say which, and it runs next cycle.

## Also unchanged and still upstream of everything

`AP-0036` — the one-line `C:\AI\scripts\heartbeat-prompt.txt` branch fix — is still unapplied. Step 2's
ordered `git pull` was again **not run**; `git fetch` + `git merge-tree --write-tree HEAD FETCH_HEAD`
instead. Divergence vs `claude/chaude-code-max20-kp2o46` is now **82 behind / 87 ahead** (was 82/87 at
00:50, 67/81 on 09-02), and `merge-tree` named the same three conflicts for the twelfth consecutive
cycle: `OPEN-ITEMS.md`, `PASTE-LOG.md`, `RECURRING-ISSUES.md`.

#ocr-intake #public-repo #PII #gitignore #AP-0036 #RAMBO
