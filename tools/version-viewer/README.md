# Version viewer (`tools/version-viewer/`)

#VTES #version-viewer #control-panel #my-office

**What it is.** One reusable header piece that shows which version of a document, program, report, form, order or result you are looking at, and lets you click down to the older ones. Plain HTML and JavaScript, no libraries, works at phone width, in light and dark mode, large text, no sideways scroll.

**Jorge's rules, as built (2026-11-07):**

1. Everything carries a **name** and a **tracking number**.
2. Any change makes a **new version, raised by exactly .1** (v1.0 becomes v1.1; v1.9 becomes v2.0). The code refuses versions that are out of order.
3. The version label in the header is a **click-down**. It always opens on the **CURRENT** version with its date.
4. The dropdown lists every prior version, newest first, each with **View** and **Use**.
5. When an older version is on screen, a banner says **"A newer version of this is available: vX.Y (date)"** with a button that jumps to it.

## Files

- `version-viewer.js` — the library. Exposes `window.VersionViewer` (and `module.exports` in Node).
- `demo.html` — the appointment demo (original time, then the revised time). Open it in any browser; tap the version button to view or use the old appointment.
- `test-shots/run-test.js` — the Playwright proof. `test-shots/RESULT.txt` and the PNGs are its output.

## Data model

```
{ id: "APPT-DEMO-001",
  name: "Appointment: site inspection",
  trk:  "TRK-2026-NNNN",
  versions: [                      // newest LAST
    { v: "1.0", date: "2026-11-03", html: "<p>…</p>", note: "Original time set" },
    { v: "1.1", date: "2026-11-06", html: "<p>…</p>", note: "Moved to the afternoon" }
  ] }
```

## Use it on a page

```html
<div id="slot"></div>
<script src="version-viewer.js"></script>
<script>
  var viewer = VersionViewer.mount(document.getElementById('slot'), doc, {
    onUse: function (ver, isCurrent, doc) { /* what "Use" means for this document */ },
    onShow: function (ver, isCurrent) { /* optional */ },
    theme: 'dark'   // optional; otherwise follows the phone or PC setting
  });
  viewer.show('1.0');          // show an older version (banner appears)
  viewer.showCurrent();        // jump to newest
  viewer.addVersion(html, note, date);   // records a change as the next .1 version and shows it
  VersionViewer.nextVersion('1.0');      // "1.1"
</script>
```

The viewer is only the screen. Storing versions is the caller's job (the panel db for the My Office page, `_VERSION-LOG.md` plus `_Superseded\` for job files, per CLAUDE.md section 9).

## Test proof (Playwright, Chromium, 2026-11-07 15:30 UTC)

Command: `node tools/version-viewer/test-shots/run-test.js`

**Result: 52 of 52 checks passed.** Three browser runs (phone 390 px light, phone 390 px dark, desktop 1200 px light) plus three Node checks of the version maths. Full list in `test-shots/RESULT.txt`. What each run proved:

1. Opens on v1.1 (current) with its date, banner hidden, body shows the revised 2:30 PM time.
2. Dropdown opens; lists v1.1 then v1.0; each row has View and Use.
3. Viewing v1.0 shows the exact banner text "A newer version of this is available: v1.1 (Nov 6, 2026)", the original 10:00 AM time, and the header reads "v1.0 (older)".
4. The banner button returns to v1.1 and hides the banner.
5. Use on v1.0 fires the `onUse` callback.
6. Add-a-change makes v1.2 current (exactly +.1).
7. No horizontal scroll (scrollWidth 390 of 390 on the phone), and the open dropdown's right edge stays inside the viewport (356 of 390).
8. Body text is 18 px.
9. Dark scheme really applies (background rgb(20,20,20)); light is white.
10. No page errors and no console errors.
11. Node: nextVersion 1.0 gives 1.1, 1.9 gives 2.0, and out-of-order versions are rejected.

Screenshots (deviceScaleFactor 1) in `test-shots/`: `phone-light-1-current.png`, `phone-light-2-dropdown.png`, `phone-light-3-old-version-banner.png`, the same three for `phone-dark-*` and `desktop-light-*`.

**Not verified:** Jorge's own iPhone and PC screens. The test browser is Chromium; Safari on iPhone was not run (UNVERIFIED).

---
TRK-TBD-ASSIGN-ON-REGISTRY · v1.0 · 2026-11-07 · CURRENT

Does the demo open and show the old appointment on your phone?
