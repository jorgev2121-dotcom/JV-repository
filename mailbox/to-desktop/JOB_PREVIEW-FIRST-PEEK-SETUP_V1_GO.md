# JOB_PREVIEW-FIRST-PEEK-SETUP_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10054 (admin band) · #ADHD #Preview #Visual
Directive: CLAUDE.md §16, Preview first.
Paste pointer: PASTE-D-070 (one block, shared with the filing-engine and pop-up jobs)
Return path: `REPLY-TO-CHAT_JOB_PREVIEW-FIRST-PEEK-SETUP_V1.md` in VTES-Outbox, with proof.

## What Jorge asked for

Before he opens a file, he wants to **see** what's inside, so he knows at a glance it's the right page or the right link. He works visually (ADHD, dyslexia).

## What already exists (Cloud's research; nothing new needs to be written)

1. **Microsoft PowerToys "Peek"** (free, from Microsoft). Click a file in File Explorer and press **Ctrl+Space**: a big preview window opens at once for PDFs, Word, Excel, images, text and folders. Press Ctrl+Space again to close it.
2. **The File Explorer preview pane** (built into Windows). Press **Alt+P** in File Explorer and a side panel shows the selected file.
3. **Large thumbnails.** File Explorer's "Large icons" view shows page 1 of each PDF as its icon, which helps when picking from a list.
4. **QuickLook** (free, open source; spacebar preview, like a Mac) is the fallback if Peek won't install.

## Tasks

1. **Check what's already installed:** PowerToys and its version, whether Peek is turned on, and whether a PDF preview handler is registered (Adobe Acrobat or Reader provides one).
2. **Install PowerToys** with `winget install --id Microsoft.PowerToys -e` if it's missing. It's a free Microsoft program and needs no account. **Jorge clicks the Windows admin (UAC) prompt himself.**
3. **Turn on Peek** with the shortcut **Ctrl+Space**. Turn off every other PowerToys module that would watch the clipboard or the keyboard, so Speechify keeps priority (SPEECHIFY-PRIORITY-01).
4. **In File Explorer:** turn on the preview pane (Alt+P), and set `G:\My Drive\01-JOBS`, `G:\My Drive\00-INTAKE` and the Desktop to "Large icons".
5. **If PDFs show blank in the preview:** in Adobe Acrobat, go to Preferences, then General, and turn on "Enable PDF thumbnail previews in Windows Explorer". Change nothing else.
6. **Test it on three real files** (a PDF, a Word file and an image from one job folder), and take a screenshot of each Peek window.

## RED — not without Jorge's typed YES

- Uninstalling anything. Any paid program, signup or account.
- Startup or registry changes beyond PowerToys' own normal "run at login" setting.

## Proof for DONE

1. The PowerToys version and a screenshot of the Peek settings showing Ctrl+Space.
2. Three Peek screenshots of real files.
3. A screenshot of a job folder in "Large icons" view with page-1 thumbnails.

Close out in three states only.

RAMBO: when will the three Peek screenshots be in VTES-Outbox?
