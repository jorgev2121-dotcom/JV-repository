# SHIFT BRIEF SPEC — LLM Handoff Protocol
**TRK-2026-9953 · #shift-brief · Adopted 2026-09-30**

---

## The Disney Rule

When one cast member's shift ends and the replacement sits down, the handoff takes
60 seconds. The incoming model is immediately effective. Jorge never notices the swap.

---

## The Six Fields (no more, no less)

| # | Field | What it contains |
|---|---|---|
| 1 | **WHO** | Which model is handing off; which model is receiving |
| 2 | **WINDOW** | Desktop / Cloud / Cowork / iPhone |
| 3 | **DONE** | Bullet list — what was completed this shift, with file paths |
| 4 | **PENDING** | Bullet list — what is in progress or blocked, with file paths |
| 5 | **DO NOT** | Things the incoming model must not redo, re-decide, or overwrite |
| 6 | **NEXT ACTION** | The one thing to do first — specific, no ambiguity |

---

## File Locations

- **Live brief:** `shift-brief/CURRENT.md` — overwritten every handoff
- **Archive:** `shift-brief/archive/BRIEF-[DATE]-[FROM]-[TO].md`
  - Example: `BRIEF-2026-09-30-Claude-Gemini.md`
- **Read it:** before starting any session when context is not fresh
- **Write it:** before ending a session or hitting quota

---

## Template

```markdown
# SHIFT BRIEF
WHO: [model handing off] → [model receiving]
WINDOW: [Desktop / Cloud / Cowork / iPhone]
DATE: [YYYY-MM-DD HH:MM UTC]

## DONE THIS SHIFT
- [file path or task name] — [one-line result]

## PENDING / BLOCKED
- [file path or task name] — [status: IN PROGRESS / BLOCKED / WAITING-ON-JORGE]

## DO NOT
- [specific action that must not be repeated]

## NEXT ACTION
[One sentence. What to do first, where the file is.]

TRK-2026-9953
```

---

## Rules — What IS in a brief

- File paths to every artifact created or modified this shift
- The exact status of any BLOCKED item (what you tried, what you need)
- Names of mailbox files awaiting action
- The single highest-priority next step

## Rules — What is NOT in a brief

- Full file contents (link to the file, never paste it)
- Project history (that belongs in OPEN-ITEMS.md)
- Decisions still open (resolve them or name them BLOCKED)
- More than 200 words total

---

*TRK-2026-9953 · Cowork 2026-09-30*
