# MSG-CLOUD-TO-CODE — Fix Desktop Git Push (TRK-9082, RI-002, 4th occurrence)
**FROM:** Cloud · **TO:** Desktop Executor · **DATE:** 2026-09-29
**PRIORITY: CRITICAL** — this is the root cause of every "worker result never comes back"

---

## Why this matters

The executive-worker-installer system cannot function if the desktop cannot push results to the repo.
This is RI-002, confirmed four times. The fix is one command. It has never been run.

## The fix — run this ONCE

```powershell
git -C "C:\Users\JV\JV-repository" config credential.helper manager
git -C "C:\Users\JV\JV-repository" push origin HEAD 2>&1
```

If it asks for credentials, sign in with the GitHub account (jorgev2121@gmail.com).
Windows Credential Manager will save it — you never type it again.

## Verify it worked

After the push succeeds, write ONE line to `mailbox/to-cloud/GIT-PUSH-FIXED_2026-09-29.md`:
```
Git push fixed — desktop can now write to repo. Date: 2026-09-29. Evidence: push succeeded.
```

Then push that file. If cloud receives it, the two-way channel is confirmed open.

## If the path above is wrong

Find the repo path:
```powershell
Get-ChildItem C:\Users\JV -Recurse -Filter "CLAUDE.md" -ErrorAction SilentlyContinue | Select-Object FullName
```

Use whatever path it returns in place of `C:\Users\JV\JV-repository`.

---
*TRK-2026-9082 · RI-002 (4th) · Cloud → Desktop · 2026-09-29 · #git-push #channel-repair*
