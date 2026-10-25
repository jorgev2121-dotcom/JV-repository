# OWNER-DIRECTIVE: SPEECHIFY-PRIORITY-01

Date: 2026-10-25
Issued by: Jorge Valdes (owner), in his own words, to the Cloud window
Applies to: every Claude window (Code DESKTOP, Code CLOUD, Cowork, Chat), Joey and every Grok Bot, Codex, and RAMBO
Tracking: TRK-2026-10014 (admin band)

## Owner's words

> "When RAM or clipboard issues occur, I select Speechify to prevail over all others. This is an owner's directive and to be added to protocol."

## Why it matters

Jorge has dyslexia and listens to his work through Speechify. When Speechify stops reading, he cannot do his job. So reading aloud comes before every other program on the PC.

## The rule

1. **Speechify wins.** When memory (RAM) runs low or the clipboard is fought over, Speechify keeps working and other programs give way.
2. **What "give way" means, in this order:**
   - Clipboard: no agent, script or helper app may hold, clear, poll or rewrite the clipboard while Speechify is reading. Clipboard watchers (clipboard managers, sync tools, automation scripts) pause or stand down.
   - Memory: free RAM by closing **idle, unsaved-work-free** helper processes first (background browser tabs, duplicate AI windows, stale script windows). Speechify's own processes get normal-or-higher priority.
   - Audio: Speechify keeps the default playback device. No agent switches the audio device while it is reading.
3. **The safety limit (not optional):** "prevail" never means force-closing a program with unsaved work, a file transfer in progress, or an open client document. If memory can't be freed without doing that, **stop and show Jorge one line** naming the program, and he decides.
4. **The fallback:** if Speechify itself fails, a read-aloud fallback built into Windows takes over automatically, so reading never stops completely. See the job file for the overlay.

## Strongest objection, recorded per Rule 3

If an agent takes "Speechify prevails over all others" literally and kills other processes to free RAM, it can destroy unsaved work in Word, Acrobat or Outlook. That would be worse than a frozen reader. **Alternative adopted:** the soft order above. Pause clipboard watchers first, close only idle helpers, raise Speechify's priority, and never force-close anything holding unsaved work.

## Acceptance

DONE needs evidence: a screenshot or log showing Speechify reading after a clipboard-heavy or low-RAM moment, and the list of programs that gave way. Close out in three states only.
