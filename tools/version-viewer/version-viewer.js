/* version-viewer.js — reusable version click-down for VTES documents.
 * Plain JS, no libraries. Works at phone width, light and dark mode.
 *
 * Data model (newest version LAST):
 *   { id, name, trk, versions: [ { v: "1.0", date: "2026-11-07", html: "<p>…</p>", note: "why it changed" }, … ] }
 *
 * Use:
 *   var viewer = VersionViewer.mount(document.getElementById('slot'), doc, { onUse: function(ver){ … } });
 *   viewer.show('1.0');     // show a prior version (banner appears)
 *   viewer.showCurrent();   // jump to the newest
 *   viewer.current();       // the newest version object
 *   VersionViewer.nextVersion('1.9')  -> "2.0"   (every change raises by exactly .1)
 *
 * Rules it enforces:
 *   1. Opens on the CURRENT (newest) version, with its date.
 *   2. The dropdown lists every version, newest first; each one has View and Use.
 *   3. When a prior version is on screen, a banner says a newer one exists and offers a one-tap jump.
 *
 * TRK-TBD-ASSIGN-ON-REGISTRY · tools/version-viewer · v1.0 · 2026-11-07 · CURRENT
 */
(function (root) {
  'use strict';

  var CSS = [
    '.vv{--vv-fg:#1a1a1a;--vv-bg:#ffffff;--vv-muted:#555;--vv-line:#d0d0d0;--vv-accent:#0b57d0;--vv-accent-fg:#fff;',
    '--vv-banner-bg:#fff4d6;--vv-banner-fg:#5a3d00;--vv-banner-line:#e3b341;--vv-hover:#eef3ff;',
    'color:var(--vv-fg);background:var(--vv-bg);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;font-size:18px;line-height:1.5;',
    'max-width:100%;box-sizing:border-box;overflow-wrap:anywhere}',
    '@media (prefers-color-scheme: dark){.vv:not([data-theme="light"]){--vv-fg:#f0f0f0;--vv-bg:#141414;--vv-muted:#b8b8b8;--vv-line:#444;',
    '--vv-accent:#8ab4f8;--vv-accent-fg:#101010;--vv-banner-bg:#3a2e08;--vv-banner-fg:#ffe08a;--vv-banner-line:#8a6d1c;--vv-hover:#23304a}}',
    '.vv[data-theme="dark"]{--vv-fg:#f0f0f0;--vv-bg:#141414;--vv-muted:#b8b8b8;--vv-line:#444;--vv-accent:#8ab4f8;--vv-accent-fg:#101010;',
    '--vv-banner-bg:#3a2e08;--vv-banner-fg:#ffe08a;--vv-banner-line:#8a6d1c;--vv-hover:#23304a}',
    '.vv *{box-sizing:border-box}',
    '.vv-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:12px 16px;border-bottom:2px solid var(--vv-line);position:relative}',
    '.vv-name{font-size:22px;font-weight:700;margin:0;flex:1 1 200px;min-width:0}',
    '.vv-trk{font-size:15px;color:var(--vv-muted);flex-basis:100%;letter-spacing:.02em}',
    '.vv-vbtn{font:inherit;font-size:18px;font-weight:700;padding:10px 14px;border:2px solid var(--vv-accent);border-radius:10px;',
    'background:var(--vv-bg);color:var(--vv-accent);cursor:pointer;min-height:48px;display:inline-flex;align-items:center;gap:8px;max-width:100%}',
    '.vv-vbtn:focus-visible{outline:3px solid var(--vv-accent);outline-offset:2px}',
    '.vv-vbtn .vv-caret{display:inline-block;transition:transform .15s}',
    '.vv-vbtn[aria-expanded="true"] .vv-caret{transform:rotate(180deg)}',
    '.vv-vdate{font-weight:400;color:var(--vv-muted);font-size:16px}',
    '.vv-menu{position:absolute;right:16px;top:calc(100% + 4px);z-index:20;background:var(--vv-bg);border:2px solid var(--vv-line);',
    'border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);min-width:260px;max-width:calc(100vw - 32px);width:max-content;padding:6px;margin:0;list-style:none;display:none}',
    '.vv-menu[data-open="true"]{display:block}',
    '.vv-item{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;padding:10px 10px;border-radius:8px}',
    '.vv-item+.vv-item{border-top:1px solid var(--vv-line)}',
    '.vv-item:hover{background:var(--vv-hover)}',
    '.vv-item .vv-label{flex:1 1 140px;font-weight:700}',
    '.vv-item .vv-sub{display:block;font-weight:400;font-size:15px;color:var(--vv-muted)}',
    '.vv-item .vv-tag{font-size:13px;font-weight:700;padding:2px 8px;border-radius:999px;background:var(--vv-accent);color:var(--vv-accent-fg)}',
    '.vv-item .vv-tag.vv-old{background:var(--vv-line);color:var(--vv-fg)}',
    '.vv-act{font:inherit;font-size:16px;font-weight:700;min-height:44px;padding:8px 14px;border-radius:8px;border:2px solid var(--vv-accent);',
    'background:transparent;color:var(--vv-accent);cursor:pointer}',
    '.vv-act.vv-primary{background:var(--vv-accent);color:var(--vv-accent-fg)}',
    '.vv-banner{display:none;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 16px;background:var(--vv-banner-bg);color:var(--vv-banner-fg);',
    'border-bottom:2px solid var(--vv-banner-line);font-weight:600}',
    '.vv-banner[data-show="true"]{display:flex}',
    '.vv-banner .vv-btext{flex:1 1 220px}',
    '.vv-banner .vv-act{border-color:var(--vv-banner-fg);color:var(--vv-banner-fg)}',
    '.vv-body{padding:16px}',
    '.vv-body img,.vv-body table{max-width:100%}',
    '.vv-note{margin:0 16px 16px;padding:10px 14px;border-left:4px solid var(--vv-line);color:var(--vv-muted);font-size:16px}',
    '.vv-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}'
  ].join('');

  var styleInjected = false;
  function injectStyle(docRef) {
    if (styleInjected) return;
    var s = docRef.createElement('style');
    s.id = 'vv-style';
    s.textContent = CSS;
    docRef.head.appendChild(s);
    styleInjected = true;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function parseV(v) {
    var m = /^v?(\d+)\.(\d+)$/.exec(String(v).trim());
    if (!m) throw new Error('Bad version label: ' + v + ' (expected N.N like 1.0)');
    return { major: +m[1], minor: +m[2] };
  }

  /* Every change raises the version by exactly .1; 1.9 -> 2.0 */
  function nextVersion(v) {
    var p = parseV(v);
    var minor = p.minor + 1, major = p.major;
    if (minor > 9) { minor = 0; major += 1; }
    return major + '.' + minor;
  }

  function compareV(a, b) {
    var pa = parseV(a), pb = parseV(b);
    return pa.major !== pb.major ? pa.major - pb.major : pa.minor - pb.minor;
  }

  function fmtDate(d) {
    if (!d) return '';
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d);
    if (!m) return String(d);
    var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var rest = String(d).slice(10).trim();
    return names[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1] + (rest ? ' ' + rest : '');
  }

  function validate(doc) {
    if (!doc || !doc.versions || !doc.versions.length) throw new Error('VersionViewer: doc.versions is empty');
    for (var i = 0; i < doc.versions.length; i++) {
      parseV(doc.versions[i].v);
      if (i > 0 && compareV(doc.versions[i].v, doc.versions[i - 1].v) <= 0) {
        throw new Error('VersionViewer: versions must be in rising order, newest last (' + doc.versions[i - 1].v + ' then ' + doc.versions[i].v + ')');
      }
    }
  }

  function mount(el, doc, opts) {
    opts = opts || {};
    var d = el.ownerDocument;
    injectStyle(d);
    validate(doc);

    var state = { shown: doc.versions.length - 1, open: false };
    var uid = 'vv' + Math.random().toString(36).slice(2, 8);

    el.classList.add('vv');
    if (opts.theme) el.setAttribute('data-theme', opts.theme);
    el.innerHTML =
      '<div class="vv-head">' +
        '<h2 class="vv-name"></h2>' +
        '<button type="button" class="vv-vbtn" aria-haspopup="listbox" aria-expanded="false" aria-controls="' + uid + '-menu">' +
          '<span class="vv-vlabel"></span><span class="vv-vdate"></span><span class="vv-caret" aria-hidden="true">&#9662;</span>' +
        '</button>' +
        '<div class="vv-trk"></div>' +
        '<ul class="vv-menu" id="' + uid + '-menu" role="listbox" aria-label="Versions"></ul>' +
      '</div>' +
      '<div class="vv-banner" role="status" aria-live="polite"><span class="vv-btext"></span><button type="button" class="vv-act vv-jump"></button></div>' +
      '<div class="vv-body"></div>' +
      '<div class="vv-note"></div>';

    var q = function (sel) { return el.querySelector(sel); };
    var nameEl = q('.vv-name'), trkEl = q('.vv-trk'), btn = q('.vv-vbtn'), vlabel = q('.vv-vlabel'), vdate = q('.vv-vdate');
    var menu = q('.vv-menu'), banner = q('.vv-banner'), btext = q('.vv-btext'), jump = q('.vv-jump'), body = q('.vv-body'), note = q('.vv-note');

    nameEl.textContent = doc.name || '(unnamed)';
    trkEl.textContent = doc.trk ? 'Tracking number ' + doc.trk : '';

    function current() { return doc.versions[doc.versions.length - 1]; }
    function isCurrent(i) { return i === doc.versions.length - 1; }

    function buildMenu() {
      menu.innerHTML = '';
      for (var i = doc.versions.length - 1; i >= 0; i--) {
        (function (i) {
          var ver = doc.versions[i];
          var li = d.createElement('li');
          li.className = 'vv-item';
          li.setAttribute('role', 'option');
          li.setAttribute('data-v', ver.v);
          li.setAttribute('aria-selected', String(i === state.shown));
          li.innerHTML =
            '<span class="vv-label">v' + esc(ver.v) + ' <span class="vv-tag' + (isCurrent(i) ? '' : ' vv-old') + '">' + (isCurrent(i) ? 'CURRENT' : 'older') + '</span>' +
              '<span class="vv-sub">' + esc(fmtDate(ver.date)) + (ver.note ? ' · ' + esc(ver.note) : '') + '</span></span>' +
            '<button type="button" class="vv-act vv-view" data-v="' + esc(ver.v) + '">View</button>' +
            '<button type="button" class="vv-act vv-primary vv-use" data-v="' + esc(ver.v) + '">Use</button>';
          menu.appendChild(li);
        })(i);
      }
    }

    function render() {
      var ver = doc.versions[state.shown];
      vlabel.textContent = 'v' + ver.v + (isCurrent(state.shown) ? ' (current)' : ' (older)');
      vdate.textContent = fmtDate(ver.date);
      body.innerHTML = ver.html || '';
      note.textContent = ver.note ? 'Note for v' + ver.v + ': ' + ver.note : '';
      note.style.display = ver.note ? '' : 'none';
      var cur = current();
      if (!isCurrent(state.shown)) {
        btext.textContent = 'A newer version of this is available: v' + cur.v + ' (' + fmtDate(cur.date) + ')';
        jump.textContent = 'Go to v' + cur.v;
        banner.setAttribute('data-show', 'true');
      } else {
        banner.setAttribute('data-show', 'false');
      }
      var items = menu.querySelectorAll('.vv-item');
      for (var i = 0; i < items.length; i++) items[i].setAttribute('aria-selected', String(items[i].getAttribute('data-v') === ver.v));
      el.setAttribute('data-shown', ver.v);
      if (typeof opts.onShow === 'function') opts.onShow(ver, isCurrent(state.shown));
    }

    function setOpen(open) {
      state.open = open;
      menu.setAttribute('data-open', String(open));
      btn.setAttribute('aria-expanded', String(open));
    }

    function indexOf(v) {
      for (var i = 0; i < doc.versions.length; i++) if (doc.versions[i].v === String(v).replace(/^v/, '')) return i;
      return -1;
    }

    function show(v) {
      var i = indexOf(v);
      if (i < 0) throw new Error('VersionViewer: no version ' + v);
      state.shown = i;
      render();
      setOpen(false);
      return doc.versions[i];
    }

    function use(v) {
      var ver = show(v);
      if (typeof opts.onUse === 'function') opts.onUse(ver, isCurrent(indexOf(v)), doc);
      return ver;
    }

    btn.addEventListener('click', function () { setOpen(!state.open); });
    jump.addEventListener('click', function () { show(current().v); });
    menu.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button') : null;
      if (!t) return;
      if (t.classList.contains('vv-view')) show(t.getAttribute('data-v'));
      else if (t.classList.contains('vv-use')) use(t.getAttribute('data-v'));
    });
    d.addEventListener('click', function (e) { if (state.open && !el.contains(e.target)) setOpen(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.open) { setOpen(false); btn.focus(); } });

    buildMenu();
    render();

    return {
      el: el,
      doc: doc,
      show: show,
      use: use,
      showCurrent: function () { return show(current().v); },
      current: current,
      shown: function () { return doc.versions[state.shown]; },
      /* Add a change: makes the next version (exactly +.1), appends it newest-last, and shows it. */
      addVersion: function (html, note, date) {
        var v = nextVersion(current().v);
        doc.versions.push({ v: v, date: date || new Date().toISOString().slice(0, 10), html: html, note: note || '' });
        buildMenu();
        return show(v);
      },
      open: function () { setOpen(true); },
      close: function () { setOpen(false); }
    };
  }

  var api = { mount: mount, nextVersion: nextVersion, compareVersions: compareV, formatDate: fmtDate, validate: validate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.VersionViewer = api;
})(typeof window !== 'undefined' ? window : this);
