# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: set the default app so job-portal .html files auto-open in the browser
**2026-09-13 · owner: "reset to auto-open with app you select" — the portal opened in the wrong app; he wants the picked app to stick.**

**WHAT / WHY IT'S YOURS:** Cloud can't change a Windows file association (no hands on the PC). This is a
GREEN desktop mechanic — reversible, no client file touched, no money, no outbound.

**EXACT NEXT ACTION (GREEN):**
1. Set the **`.html` default app to Google Chrome** (owner's main browser; the portals use `file:///G:/…`
   links and are built to open in a browser). Use the durable method — set the per-user
   `UserChoice`/`FTA` association (e.g. `SetUserFTA .html ChromeHTML`, or the DISM default-associations
   XML) so it survives and isn't a one-off "open with."
2. **Confirm** by launching `_PORTAL_UNASSIGNED_ALEC-VALDES-DD.html` and checking it opens in Chrome.
3. If the owner actually meant a different type (a `.pdf` jacket, a `.md`), note it and hold — don't guess
   past `.html`; report back and Cloud will confirm with him.
4. **Reversible:** record the prior association in the DONE report so it can be restored with one line.

**RED or GREEN:** GREEN. Don't change associations for client-document types (`.pdf`, `.docx`) without an
owner OK — only the `.html` portal type is authorized here.

**CLOSING QUESTION:** Did `.html` flip to Chrome and does the Alec portal now open in the browser — and was `.html` the type he meant, or a document type?

#default-app #file-association #html-portal #chrome #green #cloud-to-desktop
