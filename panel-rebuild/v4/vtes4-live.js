/* vtes4-live.js - live status layer. TRK-2026-9910-B. Pure ASCII. No hand-typed status anywhere. Fix round 3. */
(function () {
  /* D, S and RM are the page's own copies of the data files, the status-only file and the reminders. A reload fills NEW objects and swaps them in
     only when every file has answered, so nothing on the page ever reads a half-empty state (flaw F9). */
  var D = window.VTES_DATA = window.VTES_DATA || {};
  var S = null, RM = null, RMAT = null, swapped = false;
  /* heartbeat: the real limit is 3 x interval_sec (see limitMin); the number here is only the one used when the file gives no interval_sec */
  var LIMIT_MIN = { heartbeat: 30, state: 26 * 60, health: 26 * 60, tokens: 30, housekeeping: 26 * 60, miamidade: 7 * 24 * 60 };
  var FILES = { heartbeat: 'data/vtes4-heartbeat.js', state: 'data/vtes4-state.js', health: 'data/vtes4-health.js', tokens: 'data/vtes4-tokens.js', housekeeping: 'data/vtes4-housekeeping.js', miamidade: 'data/vtes4-miamidade.js' };
  /* The existing writer Write-VtesStatus.ps1 documents a 10-minute schedule ("Run it on a schedule (every 10 minutes)"). Used only when the heartbeat file gives no interval_sec. */
  var STATUS_FILE_TICK_SEC = 600;
  /* interval_sec outside 1 to MAX_TICK_SEC is invalid (flaws N5, F13). 3600 s = one hour per tick. */
  var MAX_TICK_SEC = 3600;
  /* stale limit for the heartbeat file and for each window's last_seen = 3 ticks, never under 3 minutes (the page re-reads once a minute) and never over 3 hours (flaw F8) */
  var MIN_LIMIT_MIN = 3, MAX_LIMIT_MIN = 180;
  /* a data time more than this far ahead of the PC clock is a BAD CLOCK (flaw N1). Writer and page share one PC, so 2 minutes is generous. */
  var FUTURE_GRACE_MIN = 2;
  /* Windows nothing on the PC can see (chat sites, phone). They may be green only with a recorded proof (see DATA-CONTRACT). */
  var CHAT_ONLY = { 'LLM-04': 1, 'LLM-05': 1, 'LLM-07': 1, 'LLM-08': 1, 'LLM-10': 1 };
  /* windows that are green only with a recorded proof_at: the chat-only windows (a test reply) and the Grok bots (a finished bot task, flaw F4) */
  var NEEDS_PROOF = { 'LLM-04': 'test reply', 'LLM-05': 'test reply', 'LLM-07': 'test reply', 'LLM-08': 'test reply', 'LLM-10': 'test reply', 'BOTS': 'finished bot task' };
  var ALL_IDS = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
  var NOW = function () { return window.VTES4_NOW ? new Date(window.VTES4_NOW) : new Date(); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* every time on the page: Eastern, short form, with the zone, e.g. "Oct 6, 2:05 PM EDT"; the year is added whenever it is not the current year */
  function easternYear(d) { return d.toLocaleString('en-US', { timeZone: 'America/New_York', year: 'numeric' }); }
  function fmt(d) {
    try {
      var o = { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
      if (easternYear(d) !== easternYear(NOW())) { o.year = 'numeric'; }
      return d.toLocaleString('en-US', o);
    } catch (e) { return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'; }
  }
  function fmtIso(s) { var d = new Date(s); return isNaN(d.getTime()) ? null : fmt(d); }
  function isFuture(d) { return (d - NOW()) / 60000 > FUTURE_GRACE_MIN; }
  /* the build time comes from the real build instant (build-v4.js); it is held to the same BAD CLOCK rule as every other time (flaw F3) */
  function builtText(iso) {
    var d = new Date(iso); if (iso == null || isNaN(d.getTime())) { return 'unknown'; }
    if (isFuture(d)) { return 'BAD CLOCK (the build time says ' + fmt(d) + ', which is in the future: not trusted)'; }
    return fmt(d);
  }
  function builtBad(iso) { var d = new Date(iso); return iso == null || isNaN(d.getTime()) || isFuture(d); }
  /* a time text from older saved entries (browser local form, no zone) shown in the same Eastern form */
  function padTime(s) {
    s = String(s == null ? '' : s);
    if (/\b(EDT|EST)\b/.test(s)) { return s; }
    var t = Date.parse(s); return isNaN(t) ? s : fmt(new Date(t));
  }
  /* the status-only file and the reminders: the page's own copies after the first reload, the globals before it */
  function getS() { return swapped ? S : (window.VTES_STATUS || {}); }
  function getRM() { return swapped ? RM : window.VTES_REMINDERS; }
  function getRMAT() { return swapped ? RMAT : window.VTES_REMINDERS_AT; }
  /* a valid interval_sec is a number from 1 to 3600 (flaws N5, F13) */
  function intervalOk(iv) { return typeof iv === 'number' && isFinite(iv) && iv >= 1 && iv <= MAX_TICK_SEC; }
  /* the stale limit in minutes for a file. The heartbeat limit scales with its own interval_sec: 3 ticks, at least 3 minutes, at most 3 hours (flaw F8). */
  function limitMin(name) {
    if (name !== 'heartbeat') { return LIMIT_MIN[name]; }
    var d = D.heartbeat, sec = (d && intervalOk(d.interval_sec)) ? d.interval_sec : STATUS_FILE_TICK_SEC;
    return Math.min(Math.max(3 * sec / 60, MIN_LIMIT_MIN), MAX_LIMIT_MIN);
  }
  /* returns {state:'OK'|'NO DATA'|'STALE'|'NOT OK'|'BAD CLOCK', at:Date|null, text, data} */
  function status(name) {
    var d = D[name];
    if (!d || !d.at) { return { state: 'NO DATA', at: null, text: 'NO DATA', data: null }; }
    var at = new Date(d.at);
    if (isNaN(at.getTime())) { return { state: 'NO DATA', at: null, text: 'NO DATA (bad time in file)', data: null }; }
    if (isFuture(at)) { return { state: 'BAD CLOCK', at: at, text: 'BAD CLOCK - the file says ' + fmt(at) + ', which is in the future. Not trusted.', data: null }; }
    var ageMin = (NOW() - at) / 60000;
    if (name === 'heartbeat' && d.interval_sec !== undefined && d.interval_sec !== null && !intervalOk(d.interval_sec)) {
      return { state: 'NOT OK', at: at, text: 'NOT OK - interval_sec in the heartbeat file is not a number between 1 and ' + MAX_TICK_SEC + '. Not trusted.', data: null };
    }
    if (ageMin > limitMin(name)) { return { state: 'STALE', at: at, text: 'STALE since ' + fmt(at), data: d }; }
    if (name === 'health') {
      if (d.ok === false) { return { state: 'NOT OK', at: at, text: 'NOT OK - the report says there is a problem (as of ' + fmt(at) + ')', data: d }; }
      if (d.ok !== true) { return { state: 'NO DATA', at: at, text: 'NO DATA (the report has no ok field)', data: d }; }
    }
    return { state: 'OK', at: at, text: 'as of ' + fmt(at), data: d };
  }
  /* html badge: green only when OK */
  function badge(name, okLabel) {
    var s = status(name), cls = s.state === 'OK' ? 'ok' : 'bad';
    return '<span class="v4b ' + cls + '" data-src="' + name + '">' + esc(s.state === 'OK' ? (okLabel || 'OK') + ' - ' + s.text : s.text) + '</span>';
  }
  /* the tick in seconds: the heartbeat's own interval_sec when valid, else the 10-minute schedule Write-VtesStatus.ps1 documents */
  function tickSec() { var d = D.heartbeat; return (d && intervalOk(d.interval_sec)) ? d.interval_sec : STATUS_FILE_TICK_SEC; }
  /* the poller's own report for one window (heartbeat executors[id]); null when there is none */
  function hbReport(id) {
    var h = status('heartbeat'), he = h.data && h.data.executors && h.data.executors[id];
    if (!he || !he.last_seen) { return null; }
    return { state: he.state, seen: new Date(he.last_seen), proof: he.proof_at ? new Date(he.proof_at) : null, fileState: h.state };
  }
  /* the status-only writer (Write-VtesStatus.ps1 -> vtes-status.js). It stamps "up" on a timer and checks nothing: never proof. */
  function statusReport(id) {
    var vs = getS()[id];
    if (!vs || !vs.seen) { return null; }
    var seen = new Date(vs.seen); return isNaN(seen.getTime()) ? null : { state: String(vs.st || 'unknown'), seen: seen };
  }
  /* executor state. GREEN (OK) needs a poller report with proof: the heartbeat file is fresh and valid AND this window's own last_seen is within 3 ticks.
     Chat-only windows and the Grok bots also need a fresh recorded proof_at. A report that comes only from vtes-status.js is UNPROVEN (grey), never green. */
  function executor(id) {
    var hs = status('heartbeat'), lim = limitMin('heartbeat'), now = NOW(), noun = NEEDS_PROOF[id];
    if (hs.state === 'BAD CLOCK' || (hs.state === 'NOT OK')) { return { state: hs.state, text: hs.text }; }
    var hb = hbReport(id);
    if (hb) {
      if (isNaN(hb.seen.getTime())) { return { state: 'NO DATA', text: 'NO DATA - bad time in this window\'s report' }; }
      if (isFuture(hb.seen)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - this window\'s report says ' + fmt(hb.seen) + ', which is in the future. Not trusted.' }; }
      if (hb.fileState !== 'OK' || (now - hb.seen) / 60000 > lim) { return { state: 'STALE', text: 'STALE since ' + fmt(hb.seen) }; }
      if (hb.state === 'down') { return { state: 'DOWN', text: 'DOWN - seen ' + fmt(hb.seen) }; }
      if (hb.state === 'up') {
        if (noun) {
          if (!hb.proof || isNaN(hb.proof.getTime())) { return { state: 'NO DATA', text: 'NO DATA - no recent ' + noun + ' recorded for this window' }; }
          if (isFuture(hb.proof)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - the ' + noun + ' time says ' + fmt(hb.proof) + ', which is in the future. Not trusted.' }; }
          if ((now - hb.proof) / 60000 > lim * 4) { return { state: 'NO DATA', text: 'NO DATA - no recent ' + noun + ' recorded for this window' }; }
        }
        return { state: 'OK', text: 'UP - seen ' + fmt(hb.seen) };
      }
      return { state: 'NO DATA', text: 'NO DATA - report says "' + String(hb.state || 'unknown') + '" (' + fmt(hb.seen) + ')' };
    }
    if (noun) { return { state: 'NO DATA', text: 'NO DATA - nothing on the PC can see this window; green only when a ' + noun + ' is recorded' }; }
    var sr = statusReport(id);
    if (!sr) { return { state: 'NO DATA', text: 'NO DATA - no report from this window yet' }; }
    if (isFuture(sr.seen)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - the status writer says ' + fmt(sr.seen) + ', which is in the future. Not trusted.' }; }
    if ((now - sr.seen) / 60000 > lim) { return { state: 'STALE', text: 'STALE since ' + fmt(sr.seen) }; }
    if (sr.state === 'up') { return { state: 'UNPROVEN', text: 'WRITER SAYS UP, NOT PROVEN - the status writer (vtes-status.js) stamped up at ' + fmt(sr.seen) + ' but it checks nothing' }; }
    return { state: 'NO DATA', text: 'NO DATA - the status writer says "' + sr.state + '" (' + fmt(sr.seen) + ')' };
  }
  /* address book: the writer reads vtes-addresses.json each tick and records which entries have a url or run filled in */
  function addressFilled(id) { var h = status('heartbeat'); return h.state === 'OK' && !!(h.data.addresses_filled && h.data.addresses_filled[id] === true); }
  function schemeRegistered() { var h = status('heartbeat'); return h.state === 'OK' && h.data.vtes_scheme_registered === true; }
  /* "every N minutes" sentence read from heartbeat, never typed */
  function tick() {
    var h = status('heartbeat');
    if (h.state === 'NO DATA' || !h.data || !h.data.interval_sec) { return 'interval unknown (' + (h.state === 'OK' || h.state === 'STALE' ? 'NO DATA' : h.state) + ')'; }
    var s = h.data.interval_sec; return 'every ' + (s % 60 === 0 ? (s / 60) + ' minutes' : s + ' seconds') + (h.state === 'STALE' ? ' (STALE)' : '');
  }
  /* the age line in three parts, so the minute-by-minute "Re-checked" time can change without the rest being redrawn (flaw F16) */
  function ageLine(builtIso) {
    var oldest = null, bad = false, clock = [];
    Object.keys(LIMIT_MIN).forEach(function (n) {
      var s = status(n); if (s.state !== 'OK') { bad = true; }
      if (s.state === 'BAD CLOCK') { clock.push(n); } else if (s.at && (!oldest || s.at < oldest)) { oldest = s.at; }
    });
    var builtBadNow = builtBad(builtIso); if (builtBadNow) { bad = true; }
    var only = (!oldest && !clock.length && Object.keys(getS()).length) ? ' Only the status-only writer (vtes-status.js) has reported, and it cannot prove anything.' : '';
    var a = 'Built ' + builtText(builtIso) + ', data as of ' + (oldest ? fmt(oldest) + ' (oldest file)' : 'NO DATA (no valid data file has been written yet)') +
      (clock.length ? '. BAD CLOCK: ' + clock.join(', ') + ' dated in the future, not trusted' : '') + '. ';
    var b = 'Re-checked ' + fmt(NOW()) + '.';
    var c = (bad ? ' At least one data file is missing, stale, in the future or not OK (or the build time is not trusted): see the red marks below.' : '') + only;
    return { bad: bad, text: a + b + c, a: a, b: b, c: c };
  }
  /* ---- reminders: due dates (flaws F10, F11) ---- */
  var MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
  function ymdKey(y, m, d) {
    if (!(y >= 2000 && y <= 2100 && m >= 1 && m <= 12 && d >= 1)) { return null; }
    var dim = new Date(Date.UTC(y, m, 0)).getUTCDate(); if (d > dim) { return null; }
    return y + '-' + ('0' + m).slice(-2) + '-' + ('0' + d).slice(-2);
  }
  /* the forms read: YYYY-MM-DD (the form the reminders file really uses; a time after it is ignored), M/D/YYYY (US order), and "Oct 11, 2026" / "October 11 2026".
     Returns {none:true} for an empty date, {key:'YYYY-MM-DD'} for a readable one, {bad:true} for anything else. */
  function parseDue(v) {
    var s = String(v == null ? '' : v).replace(/^\s+|\s+$/g, ''), m;
    if (s === '') { return { none: true }; }
    if ((m = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ].*)?$/.exec(s))) { var k1 = ymdKey(+m[1], +m[2], +m[3]); return k1 ? { key: k1 } : { bad: true }; }
    if ((m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s))) { var k2 = ymdKey(+m[3], +m[1], +m[2]); return k2 ? { key: k2 } : { bad: true }; }
    if ((m = /^([A-Za-z]{3,9})\.?\s+(\d{1,2}),?\s+(\d{4})$/.exec(s))) { var mo = MONTHS[m[1].slice(0, 3).toLowerCase()], k3 = mo ? ymdKey(+m[3], mo, +m[2]) : null; return k3 ? { key: k3 } : { bad: true }; }
    return { bad: true };
  }
  function todayKey() { try { return NOW().toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); } catch (e) { var d = NOW(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); } }
  /* open = items not done. due = open items whose due DAY is today or earlier (Eastern). unreadable = open items with a due date this page cannot read; they count as due and are named. */
  function reminders() {
    var R = getRM(), out = { open: 0, due: 0, unreadable: [], listed: Array.isArray(R) }, t = todayKey();
    if (!out.listed) { return out; }
    R.forEach(function (r) {
      if (!r || r.done) { return; }
      out.open++;
      var p = parseDue(r.due);
      if (p.bad) { out.unreadable.push(String(r.id || '?')); out.due++; } else if (p.key && p.key <= t) { out.due++; }
    });
    return out;
  }
  function remindersAt() { return getRMAT(); }
  /* ---- redraw only what changed (flaw F16): a node whose html or text is already right is never touched, so a text selection inside it survives ---- */
  function setHtml(el, html) { if (!el) { return false; } if (el.__v4h === html) { return false; } el.innerHTML = html; el.__v4h = html; return true; }
  function setText(el, t) { if (!el) { return false; } if (el.textContent === t) { return false; } el.textContent = t; return true; }
  /* reload every data file (cache-busted), the status-only file and the reminders into NEW objects, then swap them in all at once, then call done.
     A missing file is simply absent from the new objects = NO DATA, and a deleted reminders file clears the bell (flaw F11). Nothing reads the new
     objects before the swap, so a probe answer that arrives mid-reload sees the old, complete state, never a half-empty one (flaw F9).
     The status-only file and the reminders live in the v3 folder; vtes4-config.js (written by INSTALL-v4.ps1) says where (a file: address only). */
  function baseUrl() {
    var c = window.VTES4_CONFIG, u = c && c.v3_dir_url;
    return (typeof u === 'string' && /^file:/i.test(u) && /\/$/.test(u)) ? u : '';
  }
  /* the page's own local links (the bell goes to VTES-REMINDERS.html, the house to VTES-PANEL.html) point at files that live in the v3 folder, not in this one:
     when vtes4-config.js names the v3 folder, those links are pointed there, so none is dead */
  function relinkLocal() {
    var b = baseUrl(); if (!b) { return; }
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      var h = a.getAttribute('href');
      if (!h || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(h) || h.charAt(0) === '#' || h.charAt(0) === '/') { return; }
      if (h.indexOf(b) !== 0) { a.setAttribute('href', b + h); }
    });
  }
  function reload(done) {
    if (reload.busy) { return; } reload.busy = true;
    var stamp = Date.now(), base = baseUrl(), fresh = {}, freshS = {};
    var oldD = D, oldS = getS(), oldRM = getRM(), oldRMAT = getRMAT();
    S = oldS; RM = oldRM; RMAT = oldRMAT; swapped = true; /* from now on the page reads its own copies, not the globals the loading files overwrite */
    var jobs = Object.keys(FILES).map(function (n) { return { name: n, src: FILES[n] }; });
    jobs.push({ name: 'status', src: base + 'vtes-status.js' }, { name: 'reminders', src: base + 'vtes-reminders.js' });
    var left = jobs.length, completed = false, tags = [];
    window.VTES_DATA = fresh; window.VTES_STATUS = freshS; window.VTES_REMINDERS = undefined; window.VTES_REMINDERS_AT = undefined;
    function end(swap) {
      /* the status file assigns window.VTES_STATUS itself (a new object), so take what the files left in the globals */
      if (swap) { D = window.VTES_DATA || fresh; S = window.VTES_STATUS || freshS; RM = window.VTES_REMINDERS; RMAT = window.VTES_REMINDERS_AT; swapped = true; }
      window.VTES_DATA = D; window.VTES_STATUS = getS(); window.VTES_REMINDERS = getRM(); window.VTES_REMINDERS_AT = getRMAT();
      reload.busy = false; try { done && done(); } catch (e) { }
    }
    /* if a file hangs for 10 seconds, give up on this reload: keep the old, complete state (it goes STALE by itself) and repaint */
    var guard = setTimeout(function () {
      if (completed) { return; } completed = true;
      tags.forEach(function (t) { if (t.parentNode) { t.parentNode.removeChild(t); } });
      end(false);
    }, 10000);
    jobs.forEach(function (j) {
      var s = document.createElement('script'); tags.push(s);
      function one() {
        if (s.parentNode) { s.parentNode.removeChild(s); }
        if (--left === 0 && !completed) { completed = true; clearTimeout(guard); end(true); }
      }
      s.onload = one; s.onerror = one;
      s.src = j.src + '?t=' + stamp; document.head.appendChild(s);
    });
  }
  window.VTES4 = { status: status, badge: badge, executor: executor, tick: tick, ageLine: ageLine, esc: esc, fmt: fmt, fmtIso: fmtIso, padTime: padTime, now: NOW, reload: reload, addressFilled: addressFilled, schemeRegistered: schemeRegistered,
    LIMIT_MIN: LIMIT_MIN, limitMin: limitMin, ALL_IDS: ALL_IDS, CHAT_ONLY: CHAT_ONLY, NEEDS_PROOF: NEEDS_PROOF, MAX_TICK_SEC: MAX_TICK_SEC,
    builtText: builtText, builtBad: builtBad, parseDue: parseDue, todayKey: todayKey, reminders: reminders, remindersAt: remindersAt, setHtml: setHtml, setText: setText, statusMap: getS, relinkLocal: relinkLocal };
})();
