/* vtes4-live.js - live status layer. TRK-2026-9910-B. Pure ASCII. No hand-typed status anywhere. Fix round 2. */
(function () {
  var D = window.VTES_DATA = window.VTES_DATA || {};
  var LIMIT_MIN = { heartbeat: 15, state: 26 * 60, health: 26 * 60, tokens: 30, housekeeping: 26 * 60, miamidade: 7 * 24 * 60 };
  var FILES = { heartbeat: 'data/vtes4-heartbeat.js', state: 'data/vtes4-state.js', health: 'data/vtes4-health.js', tokens: 'data/vtes4-tokens.js', housekeeping: 'data/vtes4-housekeeping.js', miamidade: 'data/vtes4-miamidade.js' };
  /* The existing writer Write-VtesStatus.ps1 documents a 10-minute schedule ("Run it on a schedule (every 10 minutes)"). Used only when the heartbeat file gives no interval_sec. */
  var STATUS_FILE_TICK_SEC = 600;
  /* interval_sec above this is invalid (flaw N5). 3600 s = one hour per tick. */
  var MAX_TICK_SEC = 3600;
  /* a data time more than this far ahead of the PC clock is a BAD CLOCK (flaw N1). Writer and page share one PC, so 2 minutes is generous. */
  var FUTURE_GRACE_MIN = 2;
  /* Windows nothing on the PC can see (chat sites, phone). They may be green only with a recorded proof (see DATA-CONTRACT). */
  var CHAT_ONLY = { 'LLM-04': 1, 'LLM-05': 1, 'LLM-07': 1, 'LLM-08': 1, 'LLM-10': 1 };
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
  /* a time text from older saved entries (browser local form, no zone) shown in the same Eastern form */
  function padTime(s) {
    s = String(s == null ? '' : s);
    if (/\b(EDT|EST)\b/.test(s)) { return s; }
    var t = Date.parse(s); return isNaN(t) ? s : fmt(new Date(t));
  }
  /* returns {state:'OK'|'NO DATA'|'STALE'|'NOT OK'|'BAD CLOCK', at:Date|null, text, data} */
  function status(name) {
    var d = D[name];
    if (!d || !d.at) { return { state: 'NO DATA', at: null, text: 'NO DATA', data: null }; }
    var at = new Date(d.at);
    if (isNaN(at.getTime())) { return { state: 'NO DATA', at: null, text: 'NO DATA (bad time in file)', data: null }; }
    if (isFuture(at)) { return { state: 'BAD CLOCK', at: at, text: 'BAD CLOCK - the file says ' + fmt(at) + ', which is in the future. Not trusted.', data: null }; }
    var ageMin = (NOW() - at) / 60000;
    if (name === 'heartbeat' && d.interval_sec !== undefined && d.interval_sec !== null) {
      var iv = d.interval_sec;
      if (typeof iv !== 'number' || !isFinite(iv) || iv <= 0 || iv > MAX_TICK_SEC) { return { state: 'NOT OK', at: at, text: 'NOT OK - interval_sec in the heartbeat file is not a number between 1 and ' + MAX_TICK_SEC + '. Not trusted.', data: null }; }
    }
    if (ageMin > LIMIT_MIN[name]) { return { state: 'STALE', at: at, text: 'STALE since ' + fmt(at), data: d }; }
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
  function tickSec() {
    var h = status('heartbeat');
    return (h.state === 'OK' && h.data && typeof h.data.interval_sec === 'number' && h.data.interval_sec > 0) ? h.data.interval_sec : STATUS_FILE_TICK_SEC;
  }
  /* the poller's own report for one window (heartbeat executors[id]); null when there is none */
  function hbReport(id) {
    var h = status('heartbeat'), he = h.data && h.data.executors && h.data.executors[id];
    if (!he || !he.last_seen) { return null; }
    return { state: he.state, seen: new Date(he.last_seen), proof: he.proof_at ? new Date(he.proof_at) : null, fileState: h.state };
  }
  /* the status-only writer (Write-VtesStatus.ps1 -> vtes-status.js). It stamps "up" on a timer and checks nothing: never proof. */
  function statusReport(id) {
    var vs = window.VTES_STATUS && window.VTES_STATUS[id];
    if (!vs || !vs.seen) { return null; }
    var seen = new Date(vs.seen); return isNaN(seen.getTime()) ? null : { state: String(vs.st || 'unknown'), seen: seen };
  }
  /* executor state. GREEN (OK) needs a poller report with proof: the heartbeat file is fresh and valid AND this window's own last_seen is within 3 ticks.
     Chat-only windows also need a fresh recorded proof. A report that comes only from vtes-status.js is UNPROVEN (grey), never green. */
  function executor(id) {
    var hs = status('heartbeat'), lim = tickSec() * 3 / 60, now = NOW();
    if (hs.state === 'BAD CLOCK' || (hs.state === 'NOT OK')) { return { state: hs.state, text: hs.text }; }
    var hb = hbReport(id);
    if (hb) {
      if (isNaN(hb.seen.getTime())) { return { state: 'NO DATA', text: 'NO DATA - bad time in this window\'s report' }; }
      if (isFuture(hb.seen)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - this window\'s report says ' + fmt(hb.seen) + ', which is in the future. Not trusted.' }; }
      if (hb.fileState !== 'OK' || (now - hb.seen) / 60000 > lim) { return { state: 'STALE', text: 'STALE since ' + fmt(hb.seen) }; }
      if (hb.state === 'down') { return { state: 'DOWN', text: 'DOWN - seen ' + fmt(hb.seen) }; }
      if (hb.state === 'up') {
        if (CHAT_ONLY[id]) {
          if (!hb.proof || isNaN(hb.proof.getTime())) { return { state: 'NO DATA', text: 'NO DATA - no recent test reply recorded for this window' }; }
          if (isFuture(hb.proof)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - the test-reply time says ' + fmt(hb.proof) + ', which is in the future. Not trusted.' }; }
          if ((now - hb.proof) / 60000 > lim * 4) { return { state: 'NO DATA', text: 'NO DATA - no recent test reply recorded for this window' }; }
        }
        return { state: 'OK', text: 'UP - seen ' + fmt(hb.seen) };
      }
      return { state: 'NO DATA', text: 'NO DATA - report says "' + String(hb.state || 'unknown') + '" (' + fmt(hb.seen) + ')' };
    }
    if (CHAT_ONLY[id]) { return { state: 'NO DATA', text: 'NO DATA - nothing on the PC can see this window; green only when a test reply is recorded' }; }
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
  function ageLine(builtIso) {
    var oldest = null, bad = false, clock = [];
    Object.keys(LIMIT_MIN).forEach(function (n) {
      var s = status(n); if (s.state !== 'OK') { bad = true; }
      if (s.state === 'BAD CLOCK') { clock.push(n); } else if (s.at && (!oldest || s.at < oldest)) { oldest = s.at; }
    });
    var built = fmtIso(builtIso) || 'unknown';
    var only = (!oldest && !clock.length && window.VTES_STATUS && Object.keys(window.VTES_STATUS).length) ? ' Only the status-only writer (vtes-status.js) has reported, and it cannot prove anything.' : '';
    return { bad: bad, text: 'Built ' + built + ', data as of ' + (oldest ? fmt(oldest) + ' (oldest file)' : 'NO DATA (no valid data file has been written yet)') +
      (clock.length ? '. BAD CLOCK: ' + clock.join(', ') + ' dated in the future, not trusted' : '') + '. Re-checked ' + fmt(NOW()) + '.' +
      (bad ? ' At least one data file is missing, stale, in the future or not OK: see the red marks below.' : '') + only };
  }
  /* reload every data file (cache-busted) and the status-only file, then call done. Missing file = deleted from memory = NO DATA. */
  function reload(done) {
    if (reload.busy) { return; } reload.busy = true;
    var stamp = Date.now(), jobs = Object.keys(FILES).map(function (n) { return { name: n, src: FILES[n], kind: 'data' }; });
    jobs.push({ name: 'status', src: 'vtes-status.js', kind: 'status' }, { name: 'reminders', src: 'vtes-reminders.js', kind: 'reminders' });
    var left = jobs.length, fin = false;
    function end() { if (fin) { return; } fin = true; reload.busy = false; try { done && done(); } catch (e) { } }
    var guard = setTimeout(end, 10000);
    jobs.forEach(function (j) {
      var s = document.createElement('script');
      function one(ok) {
        if (s.parentNode) { s.parentNode.removeChild(s); }
        if (!ok) { if (j.kind === 'data') { delete D[j.name]; } else if (j.kind === 'status') { window.VTES_STATUS = {}; } }
        if (--left === 0) { clearTimeout(guard); end(); }
      }
      s.onload = function () { one(true); }; s.onerror = function () { one(false); };
      s.src = j.src + '?t=' + stamp; document.head.appendChild(s);
    });
  }
  window.VTES4 = { status: status, badge: badge, executor: executor, tick: tick, ageLine: ageLine, esc: esc, fmt: fmt, fmtIso: fmtIso, padTime: padTime, now: NOW, reload: reload, addressFilled: addressFilled, schemeRegistered: schemeRegistered, LIMIT_MIN: LIMIT_MIN, ALL_IDS: ALL_IDS, CHAT_ONLY: CHAT_ONLY, MAX_TICK_SEC: MAX_TICK_SEC };
})();
