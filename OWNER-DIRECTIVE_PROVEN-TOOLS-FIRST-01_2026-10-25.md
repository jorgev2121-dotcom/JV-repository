# OWNER-DIRECTIVE: PROVEN-TOOLS-FIRST-01

Date: 2026-10-25 · Issued by: Jorge Valdes (owner) · Tracking: TRK-2026-10057 (admin band)
Applies to: every Claude window, RAMBO, Cowork, Joey and every Grok Bot, Codex, and any agent added later.

## Owner's words

*"Whenever an agent detects that it is creating a program that is already proven resilient and can be used even if minor changes need to be made or minor compromises need to be made, that is always our first option."*

## In Cloud's words

**Before building anything, look for a proven tool that already does it. If one exists and fits with small changes or small compromises, use it.** Custom code is the last resort. Where it's needed, it is only thin glue between proven parts.

1. **Search first:** a built-in Windows, Google or Microsoft feature; then a widely used free or open-source tool; then a feature of a program Jorge already pays for.
2. **Write down the choice** in the job file: what was found, and the compromise accepted. If nothing fits, say why, then build.
3. **Paid tools are still Jorge's decision** (spend is RED). Agents recommend; Jorge says yes.

**Cloud's view:** sound. Home-made programs are what keeps breaking here (RI-002, RI-057). The one caution is that "proven" means widely used and maintained, not just "exists".

## Applied today (2026-10-25) to the queued desktop jobs

- **OCR:** Google Drive already reads the text in PDFs and images for search (`fullText contains`), so that comes first. For a text layer inside the file, use **OCRmyPDF** (built on Tesseract, open source and widely used), or **Adobe Acrobat's "Recognize Text"** if Acrobat Pro is installed.
- **Pop-ups and the flashing "NEEDS YOU" alert:** the **BurntToast** PowerShell module, a proven Windows toast library. Don't hand-build notifications.
- **Scheduling and "next free slot":** **Windows Task Scheduler**, with its own conditions and "do not start a new instance" setting. The dispatcher only adds the RAM and lane check.
- **Rule-based file sorting:** test **DropIt** (free, open source) for the "file by rule" part. Only the exact-ID match and rollback logging are custom.
- **File previews:** **PowerToys Peek** (already in the preview job).
- **Read-aloud fallback:** the built-in Windows voices and **Microsoft Edge "Read aloud"**. The READ IT overlay is just a box and a GO button on top of them.

Agents: does your job use a proven tool for each part?
