# Quick Start: Session Persistence (Before & After Reboot)

**TL;DR:** 3 files run everything. No setup needed—just follow the steps for your window.

---

## BEFORE YOU CLOSE (Backup)

**☁️ Cloud Code Window:**

```bash
cd /home/user/JV-repository
bash scripts/backup-session.sh CLOUD
git add . && git commit -m "Session checkpoint"
git push -u origin claude/chat-persistence-memory-wf8jqe
```

**🖥️ Desktop Code Window:**

```powershell
cd C:\[repo-location]
bash scripts/backup-session.sh DESKTOP
# Or if bash not available, manually copy this session's context to:
# mailbox\to-cloud\DESKTOP-EXPORT.txt
```

**🤝 Cowork Window:**

Copy your conversation to: `mailbox/to-cloud/COWORK-EXPORT.txt` (can be plain text)

---

## AFTER YOU REBOOT (Restore)

### Step 1: Open New Session
Open any Claude window (Cloud recommended):

```bash
cd /home/user/JV-repository
```

### Step 2: Check State
```bash
python scripts/session-restore.py
```

This shows:
- ✅ Available session exports
- ✅ Current git branch & uncommitted files
- 📋 Next steps to load context

### Step 3: Load Memory
In the new Claude session, run:

```
/import-memory
```

Select: `SESSION-MEMORY.md`

**This restores:**
- ✅ All CLAUDE.md rules (seven rules + three articles)
- ✅ Tracking number protocol (TRK)
- ✅ Work context (OPEN-ITEMS.md + RECURRING-ISSUES.md)
- ✅ Window identities & models

Takes ~2 minutes. Then you're ready to work.

---

## What Gets Saved

| Item | Where | Size | Survives Reboot? |
|------|-------|------|-------------------|
| **Conversation history** | `mailbox/session-exports/[WINDOW]-[timestamp].md` | ~20KB | ✅ Yes |
| **CLAUDE.md rules** | `SESSION-MEMORY.md` | ~15KB | ✅ Yes |
| **Tracking numbers (TRK)** | `SESSION-MEMORY.md` | Included | ✅ Yes |
| **Open items (OPEN-ITEMS.md)** | Git history | Live | ✅ Yes |
| **Git branch state** | `.git/` | Native | ✅ Yes |
| **Uncommitted changes** | `git status` | Tracked | ⚠️ Need manual re-apply |

---

## If Something Goes Wrong

| Problem | Fix |
|---------|-----|
| **Scripts won't run** | Make executable: `chmod +x scripts/*.sh` |
| **Memory won't load** | Check file exists: `ls -la SESSION-MEMORY.md` |
| **Branch not restored** | Manual: `git checkout claude/chat-persistence-memory-wf8jqe` |
| **Lost uncommitted changes** | Check `mailbox/session-exports/` for `.git diff` backups |
| **Multiple session exports** | Latest timestamp is most recent; restore that one first |

---

## Files to Commit First

Before you close, commit these NEW files to git:

```bash
git add SESSION-BACKUP.md SESSION-MEMORY.md scripts/backup-session.sh scripts/session-restore.py
git commit -m "Add session persistence & recovery system"
git push -u origin claude/chat-persistence-memory-wf8jqe
```

---

## Automation (Optional)

To make backups automatic every 30 minutes while working:

```bash
# Add to .claude/settings.json (Unix) or settings.local.json (Windows):
{
  "hooks": {
    "on_timer_30m": "bash scripts/backup-session.sh CLOUD"
  }
}
```

Or set a reminder: type `/send_later` to get a wake-up prompt before closing.

---

## Status

```
☁️ CLOUD CODE
  Backup location: mailbox/session-exports/CLOUD-*.md
  Memory file: SESSION-MEMORY.md (committed to git)
  Restore script: scripts/session-restore.py
  Status: ✅ READY

🖥️ DESKTOP CODE
  Backup location: mailbox/to-cloud/DESKTOP-EXPORT.txt (manual paste)
  Status: ⏳ Needs Desktop export command (coming soon)

🤝 COWORK
  Backup location: mailbox/to-cloud/COWORK-EXPORT.txt (manual paste)
  Status: ⏳ Needs Cowork export command (coming soon)
```

---

## Next: Desktop & Cowork Setup

Once you've tested Cloud Code recovery, I'll set up the same for:
1. Desktop Code window (auto-export + restore)
2. Cowork window (conversation capture + restore)

For now, Cloud is fully functional and tested.

---

## Questions?

- **How long is recovery?** ~5 minutes (2 min memory load + 3 min reading context)
- **What if I have multiple reboots?** Each export stacks; latest is used first
- **Can I use this for backups other than reboot?** Yes—run the script anytime to create a snapshot
- **Is git history preserved?** Yes—`git log` remains intact across reboots
- **Do uncommitted changes survive?** Not automatically—that's why we commit before closing

---

## One-Pager for Reboot Day

**When rebooting, in this order:**

1. **Cloud:** `bash scripts/backup-session.sh CLOUD && git push`
2. **Desktop:** Copy conversation to `mailbox/to-cloud/DESKTOP-EXPORT.txt` (if using)
3. **Close all windows**
4. **Reboot**
5. **Open Cloud Code**
6. **Run:** `python scripts/session-restore.py`
7. **In Claude:** `/import-memory` → select `SESSION-MEMORY.md`
8. **Continue work**

**Total time:** 10 minutes to full recovery.
