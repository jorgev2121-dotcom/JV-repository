// vtes-common.js · TRK-2026-9910-B · #VTES-control-panel #common
// Shared by every page of the panel. STATUS / effective() are sliced from VTES-LLM-LAUNCHER.html by the build (tests assert they stay equal).
(function () {
  var MAP_DATE = '2026-09-30';
  // STATUS: what is known. st = up | pending | future | unknown. seen = last time it was known alive (ISO, UTC).
  // An optional file vtes-status.js next to this page may replace it: window.VTES_STATUS = { 'LLM-01': { st:'up', seen:'2026-10-01T12:00:00Z', note:'…' }, … }
  var STATUS = {
    'LLM-01': { st: 'up', seen: '2026-09-24T12:00:00Z', approx: true, note: 'Last proof from the PC session was about 9/24. It has not acknowledged the 9/30 orders.' },
    'LLM-02': { st: 'up', seen: '2026-09-30T20:30:00Z', note: 'This cloud session stamped it alive on 9/30. It goes amber after 6 hours without a new stamp, red after 24.' },
    'LLM-03': { st: 'unknown', note: 'No signal from Cowork reaches this page. Needs a heartbeat line from the Cowork window.' },
    'LLM-04': { st: 'unknown', probe: 'https://claude.ai/', note: 'Checked live: is claude.ai reachable from this browser.' },
    'LLM-05': { st: 'unknown', note: 'The iPhone app cannot be seen from the PC. Unknown by design.' },
    'LLM-06': { st: 'pending', since: '2026-09-26T12:00:00Z', note: 'Installed 9/26 (codex-cli 0.157.1). Waiting for your ChatGPT sign-in. No ChatGPT receipt found in your email, so the plan itself is unverified.' },
    'LLM-07': { st: 'unknown', probe: 'https://grok.com/', note: 'Checked live: is grok.com reachable from this browser.' },
    'LLM-08': { st: 'unknown', probe: 'https://gemini.google.com/', note: 'Checked live: is gemini.google.com reachable from this browser.' },
    'LLM-10': { st: 'unknown', probe: 'https://copilot.microsoft.com/', note: 'Checked live: is copilot.microsoft.com reachable from this browser.' },
    'LLM-09': { st: 'up', seen: '2026-09-21T14:39:00Z', approx: true, note: 'Governor (token manager): last proof is GOVERNOR-STATUS.txt from 9/21 10:39 AM. It should run every hour (task CU-Governor-Hourly). Nothing newer has reached this page.' },
    'BOTS': { st: 'future', note: 'Grok Bot (xAI) was added to SuperGrok on 8/27. Not set up here yet.' }
  };
  try { if (window.VTES_STATUS) { for (var sk in window.VTES_STATUS) { STATUS[sk] = window.VTES_STATUS[sk]; } } } catch (e) { }

  function nowMs() { return typeof window.VTES_NOW === 'number' ? window.VTES_NOW : Date.now(); }
  var PROBE = {};
  function lastUp(id) { try { return +localStorage.getItem('vtes.lastup.' + id) || 0; } catch (e) { return 0; } }
  function setLastUp(id, t) { try { localStorage.setItem('vtes.lastup.' + id, String(t)); } catch (e) { } }
  function fmtH(h) { if (h == null) { return ''; } if (h < 1) { return '<1h'; } if (h < 48) { return Math.round(h) + 'h'; } return Math.round(h / 24) + 'd'; }
  // effective(id) -> { k: up|warn|down|pend|fut|unk, h: hours or null, txt, why }
  function effective(id) {
    var s = STATUS[id] || { st: 'unknown' }, now = nowMs(), hrs = function (t) { return (now - t) / 3600000; };
    if (s.st === 'future') { return { k: 'fut', h: null, txt: 'NOT CONNECTED (future)', why: s.note || '' }; }
    if (s.st === 'pending') { return { k: 'pend', h: s.since ? hrs(Date.parse(s.since)) : null, txt: 'SET UP, NOT SIGNED IN', why: s.note || '' }; }
    if (s.probe) {
      var pr = PROBE[id];
      if (pr && pr.ok) { return { k: 'up', h: 0, txt: 'UP · site reachable now (login not checked)', why: s.note || '' }; }
      if (pr && !pr.ok) { var lu = lastUp(id); return lu ? { k: 'down', h: hrs(lu), txt: 'DOWN ' + fmtH(hrs(lu)) + ' · site not reachable', why: 'Last reachable from this browser ' + new Date(lu).toLocaleString() + '.' } : { k: 'unk', h: null, txt: 'NOT REACHABLE · never seen up from this browser', why: s.note || '' }; }
      return { k: 'unk', h: null, txt: 'CHECKING…', why: s.note || '' };
    }
    if (s.seen) {
      var a = hrs(Date.parse(s.seen)), ap = s.approx ? '~' : '';
      if (a < 6) { return { k: 'up', h: a, txt: 'UP · seen ' + fmtH(a) + ' ago', why: s.note || '' }; }
      if (a < 24) { return { k: 'warn', h: a, txt: 'STALE ' + ap + fmtH(a) + ' · no sign of life', why: s.note || '' }; }
      return { k: 'down', h: a, txt: 'DOWN ' + ap + fmtH(a) + ' · no sign of life', why: s.note || '' };
    }
    return { k: 'unk', h: null, txt: 'UNKNOWN · no signal', why: s.note || '' };
  }
  var SYM = { up: '●', warn: '▲', down: '✖', pend: '◌', fut: '◌', unk: '?' };
  var KCOL = { up: '#2e7d4f', warn: '#b26a00', down: '#b3261e', pend: '#1b5e9e', fut: '#7a2e8e', unk: '#6b6b66' };

  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function copy(text) {
    var ok = false;
    try { var t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.focus(); t.select(); ok = document.execCommand('copy'); document.body.removeChild(t); } catch (e) { ok = false; }
    if (ok) { return Promise.resolve(true); }
    if (navigator.clipboard && navigator.clipboard.writeText) { return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return false; }); }
    return Promise.resolve(false);
  }
  // ---- OCR-tolerant search: folds look-alike characters, then allows one or two slips in longer words ----
  function fold(s) {
    s = String(s || '').toLowerCase().replace(/rn/g, 'm').replace(/vv/g, 'w');
    var map = { '0': 'o', '1': 'i', 'l': 'i', '|': 'i', '!': 'i', '5': 's', '$': 's', '8': 'b', '2': 'z', '6': 'g', '9': 'g' };
    return s.replace(/[01l|!5$8269]/g, function (c) { return map[c] || c; });
  }
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) { return max + 1; }
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) { prev[j] = j; }
    for (i = 1; i <= a.length; i++) {
      cur = [i];
      for (j = 1; j <= b.length; j++) { cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); }
      prev = cur;
    }
    return prev[b.length];
  }
  function toks(s) { return String(s || '').split(/[^A-Za-z0-9#\-\.]+/).filter(Boolean); }
  // returns 0 (no match) or a positive score; every query word must match
  function match(query, hay) {
    var qs = toks(query); if (!qs.length) { return 1; }
    var raw = String(hay || '').toLowerCase(), fh = fold(hay), ht = toks(hay).map(fold), score = 0;
    for (var i = 0; i < qs.length; i++) {
      var q = qs[i].toLowerCase(), fq = fold(q), hit = 0;
      if (raw.indexOf(q) > -1) { hit = 3; }
      else if (fh.indexOf(fq) > -1) { hit = 2; }
      else {
        var max = fq.length >= 8 ? 2 : (fq.length >= 5 ? 1 : 0);
        if (max) { for (var j = 0; j < ht.length; j++) { var t = ht[j]; if (lev(fq, t.length > fq.length + max ? t.slice(0, fq.length) : t, max) <= max) { hit = 1; break; } } }
      }
      if (!hit) { return 0; }
      score += hit;
    }
    return score;
  }
  // ---- reminders ----
  // whole calendar days from today (UTC date of nowMs) to a YYYY-MM-DD date; negative = overdue
  function daysUntil(d) { var t = new Date(nowMs()).toISOString().slice(0, 10); return Math.round((Date.parse(d + 'T00:00:00Z') - Date.parse(t + 'T00:00:00Z')) / 86400000); }
  // alerts = warnings written by the gas gauge, plus a built-in watchdog on the gauge itself ("never go dark")
  function gaugeState() {
    var B = window.VTES_BUDGET; if (!B || !B.at) { return { k: 'missing', msg: 'The gas gauge is not installed yet: nothing is watching your Claude plan.' }; }
    var age = (nowMs() - Date.parse(B.at)) / 3600000;
    if (age > 2) { return { k: 'stale', msg: 'The gas gauge stopped ' + fmtH(age) + ' ago: nothing is watching your Claude plan.', age: age }; }
    return { k: 'ok', msg: 'Gas gauge running (last reading ' + fmtH(age) + ' ago).', age: age };
  }
  function alerts() {
    var A = (window.VTES_ALERTS || []).concat(window.VTES_REVIEWS || []).filter(function (a) { return !a.done; }), g = gaugeState();
    if (g.k !== 'ok') { A = A.concat([{ id: 'A-gauge-watchdog', kind: 'gauge-watchdog', title: g.msg, detail: 'Fix: the PC must run VTES-Gauge.ps1 every 15 minutes (order TASK-C2D_GAUGE-AND-ROTATOR).', due: '', done: false }]); }
    return A;
  }
  function remCount() {
    var R = window.VTES_REMINDERS || [], open = 0, over = 0, soon = 0, now = nowMs(), A = alerts(), hot = 0;
    R.forEach(function (r) { if (r.done) { return; } open++; if (r.due) { var d = daysUntil(r.due); if (d < 0) { over++; } else if (d <= 7) { soon++; } } });
    A.forEach(function (a) { open++; if (a.kind === 'gauge' || a.kind === 'review') { hot++; } });
    return { open: open, overdue: over, soon: soon, alerts: A.length, hot: hot };
  }
  // ---- live probes (web chats): is the site reachable from this browser ----
  function runProbes(done) {
    var ids = Object.keys(STATUS).filter(function (id) { return STATUS[id].probe; }), left = ids.length;
    if (!left || typeof fetch !== 'function') { if (done) { done(); } return; }
    ids.forEach(function (id) {
      var fin = false, ctl = (typeof AbortController === 'function') ? new AbortController() : null;
      var end = function (ok) { if (fin) { return; } fin = true; PROBE[id] = { ok: ok, at: nowMs() }; if (ok) { setLastUp(id, nowMs()); } if (--left === 0 && done) { done(); } };
      setTimeout(function () { if (ctl) { ctl.abort(); } end(false); }, 7000);
      fetch(STATUS[id].probe, { mode: 'no-cors', cache: 'no-store', signal: ctl ? ctl.signal : undefined }).then(function () { end(true); }, function () { end(false); });
    });
  }
  // ---- the top bar every page shares ----
  function nav(activeId) {
    var M = window.VTES_MODULES || [], c = remCount();
    var css = document.createElement('style');
    css.textContent = '#vnav{position:sticky;top:0;z-index:50;display:flex;flex-wrap:wrap;gap:5px;align-items:center;background:#f6f4ef;border-bottom:2px solid #d9d5cc;padding:6px 10px;font:700 12.5px "Segoe UI",system-ui,sans-serif}' +
      '#vnav a,#vnav span.pl{padding:3px 7px;border-radius:8px;border:2px solid #d9d5cc;background:#fff;color:#1d1d1b;text-decoration:none;white-space:nowrap}' +
      '#vnav a.on{background:#dfeaf7;border-color:#1b5e9e}#vnav span.pl{border-style:dashed;border-color:#7a2e8e;color:#7a2e8e}' +
      '#vnav a.rem{background:#b3261e;border-color:#b3261e;color:#fff;margin-left:auto}#vnav a.rem.over{animation:vf 1s steps(2) infinite}@keyframes vf{50%{background:#ff5a4d}}' +
      '[hidden]{display:none!important}';
    document.head.appendChild(css);
    var bar = document.createElement('div'); bar.id = 'vnav'; bar.setAttribute('role', 'navigation');
    bar.innerHTML = M.filter(function (m) { return m.id !== 'reminders'; }).map(function (m) {
      var label = (m.emoji || '') + ' ' + (m.short || m.title);
      return m.state === 'live' && m.file ? '<a href="' + esc(m.file) + '" class="' + (m.id === activeId ? 'on' : '') + '" title="' + esc(m.what || '') + '">' + esc(label) + '</a>' : '<span class="pl" title="Planned, not built: ' + esc(m.what || '') + '">' + esc(label) + '</span>';
    }).join('') + '<a class="rem' + ((c.overdue || c.hot) ? ' over' : '') + '" id="vremind" href="VTES-REMINDERS.html" title="Things waiting for you">🔔 ' + (c.open ? c.open : '') + (c.overdue ? ' · ' + c.overdue + ' overdue' : '') + (c.hot ? ' · gauge warning' : '') + '</a>';
    document.body.insertBefore(bar, document.body.firstChild);
    return bar;
  }

  window.VTES = { STATUS: STATUS, effective: effective, PROBE: PROBE, fmtH: fmtH, SYM: SYM, KCOL: KCOL, nowMs: nowMs, esc: esc, copy: copy, fold: fold, match: match, lev: lev, remCount: remCount, daysUntil: daysUntil, alerts: alerts, gaugeState: gaugeState, runProbes: runProbes, nav: nav, lastUp: lastUp };
})();
