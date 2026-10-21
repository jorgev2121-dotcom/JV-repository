# SESSION BACKUP & RECOVERY — Multi-Window Persistence

**Last backed up:** [auto-updated on export]  
**Covered windows:** Cloud Code, Desktop Code, Cowork  
**Recovery time after reboot:** ~5 minutes

---

## Part 1: Backup BEFORE Reboot

### Cloud Code (this window)
1. Take the **context snapshot** below
2. Copy `SESSION-MEMORY.md` to Google Drive
3. Run: `git add mailbox/session-export.txt && git commit -m "Session export: [timestamp]"`

### Desktop Code
1. Run the Desktop export command (provided when Desktop session starts)
2. Paste result to `mailbox/to-cloud/DESKTOP-EXPORT.txt`
3. Push to this cloud session

### Cowork Session
1. Copy the conversation to a text file
2. Name it `COWORK-EXPORT-[date].txt`
3. Paste to `mailbox/to-cloud/COWORK-EXPORT.txt`

---

## Part 2: What Gets Backed Up

Each window exports:
- **Full conversation history** (markdown)
- **Current context** (files open, work in progress)
- **Memory snapshot** (CLAUDE.md rules, tracking numbers, open items)
- **Git state** (current branch, uncommitted changes, recent commits)

**Total size:** ~50–100KB per session. Lives in `/mailbox/session-exports/`.

---

## Part 3: Recovery AFTER Reboot

**Restore order (matters):**
1. Clone repo if needed
2. Run: `python scripts/session-restore.py`
3. Choose which session to restore first (usually Cloud, then Desktop, then Cowork)
4. Script loads memory into new session
5. Pastes back the conversation thread for context

**Automatic merge:** If multiple sessions changed the same file, you pick which version wins.

---

## Current Session Export

Generated at: **[timestamp]**

```
WINDOW: Cloud Code (☁️)
MODEL: Claude Haiku 4.5
BRANCH: claude/chat-persistence-memory-wf8jqe
LAST COMMIT: [latest]
UNCOMMITTED: [count] files

ACTIVE CONTEXT:
- Rule 1: No upward delegation (attempt, research, workaround, escalate)
- Rule 2: Three states (DONE, BLOCKED, IN PROGRESS)
- Rule 7: Write for TTS and dyslexia
- Session start: Window emoji + model name
- Session end: Update OPEN-ITEMS.md + RECURRING-ISSUES.md

OPEN ITEMS STATUS:
[loaded from OPEN-ITEMS.md top 20 items]

BLOCKING ITEMS:
[loaded from OPEN-ITEMS.md where state=BLOCKED]
```

---

## How to Use This File

1. **Every night before sleep:** Paste `git status && git log --oneline -5` into the "Current Session Export" section
2. **Before a major reboot:** Run the full backup (Part 1)
3. **After reboot:** Run restore (Part 3) and pick up from the memory snapshot

The recovery script will:
- ✅ Reload memory (so you remember why you started this)
- ✅ Restore file state (uncommitted changes, branch position)
- ✅ Paste back the last 20 lines of conversation (pick-up point)

---

## Files Involved

```
/mailbox/
├── session-exports/          (all backups, auto-pruned after 7 days)
│   ├── cloud-[date-time].md
│   ├── desktop-[date-time].md
│   └── cowork-[date-time].md
├── to-cloud/
│   ├── DESKTOP-EXPORT.txt    (pasted from Desktop)
│   └── COWORK-EXPORT.txt     (pasted from Cowork)
├── session-export.txt        (this session's live snapshot)
└── SESSION-MEMORY.md         (unified memory - survives reboot)

/scripts/
└── session-restore.py        (run after reboot)
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **Memory not loading** | Check `SESSION-MEMORY.md` exists and is valid YAML |
| **Git won't restore branch** | Manual: `git checkout [branch-name]` then run restore again |
| **Multiple sessions conflict** | Restore picks the latest; manual merge prompt if needed |
| **Files marked uncommitted but not shown** | Run `git status --ignored` — they may be in `.gitignore` |

---

## Protocol

**Automatic backup:** Every 30 minutes, snapshot is written to `mailbox/session-export.txt` (no action needed).  
**Manual backup:** Type `snapshot` or call the backup function.  
**Recovery:** Single command `python scripts/session-restore.py` → follow prompts.
