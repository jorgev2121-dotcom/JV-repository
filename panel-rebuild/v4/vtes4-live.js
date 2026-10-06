/* vtes4-live.js - live status layer. TRK-2026-9910-B. Pure ASCII. No hand-typed status anywhere. */
(function () {
  var D = window.VTES_DATA = window.VTES_DATA || {};
  var LIMIT_MIN = { heartbeat: 15, state: 26 * 60, health: 26 * 60, tokens: 30, housekeeping: 26 * 60, miamidade: 7 * 24 * 60 };
  /* The existing writer Write-VtesStatus.ps1 documents a 10-minute schedule ("Run it on a schedule (every 10 minutes)"). Used only when the heartbeat file gives no interval_sec. */
  var STATUS_FILE_TICK_SEC = 600;
  /* Windows nothing on the PC can see (chat sites, phone). They may be green only with a recorded proof (see DATA-CONTRACT). */
  var CHAT_ONLY = { 'LLM-04': 1, 'LLM-05': 1, 'LLM-07': 1, 'LLM-08': 1, 'LLM-10': 1 };
  var ALL_IDS = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LLM-10', 'LOCAL', 'CHIEF'];
  var NOW = function () { return window.VTES4_NOW ? new Date(window.VTES4_NOW) : new Date(); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* every time on the page: Eastern, short form, with the zone, e.g. "Oct 6, 2:05 PM EDT" (reads well aloud) */
  function fmt(d) {
    try { return d.toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }); }
    catch (e) { return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'; }
  }
  function fmtIso(s) { var d = new Date(s); return isNaN(d.getTime()) ? null : fmt(d); }
  /* returns {state:'OK'|'NO DATA'|'STALE'|'NOT OK', at:Date|null, text, data} */
  function status(name) {
    var d = D[name];
    if (!d || !d.at) { return { state: 'NO DATA', at: null, text: 'NO DATA', data: null }; }
    var at = new Date(d.at);
    if (isNaN(at.getTime())) { return { state: 'NO DATA', at: null, text: 'NO DATA (bad time in file)', data: null }; }
    var ageMin = (NOW() - at) / 60000;
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
  /* candidate reports for one window: the poller heartbeat (executors[id]) and the existing writer's vtes-status.js (VTES_STATUS[id]) */
  function candidates(id) {
    var out = [], h = status('heartbeat'), he = h.data && h.data.executors && h.data.executors[id];
    if (he && he.last_seen) { out.push({ src: 'heartbeat', state: he.state, seen: new Date(he.last_seen), proof: he.proof_at ? new Date(he.proof_at) : null, fileStale: h.state !== 'OK' }); }
    var vs = window.VTES_STATUS && window.VTES_STATUS[id];
    if (vs && vs.seen) { out.push({ src: 'status', state: vs.st === 'up' ? 'up' : String(vs.st || 'unknown'), seen: new Date(vs.seen), proof: null, fileStale: false }); }
    return out.filter(function (c) { return !isNaN(c.seen.getTime()); });
  }
  /* executor state: green only when a fresh report says up. Chat-only windows also need a fresh recorded proof. */
  function executor(id) {
    var c = candidates(id);
    if (CHAT_ONLY[id]) { c = c.filter(function (x) { return x.src === 'heartbeat'; }); }
    if (!c.length) {
      return { state: 'NO DATA', text: CHAT_ONLY[id] ? 'NO DATA - nothing on the PC can see this window; green only when a test reply is recorded' : 'NO DATA - no report from this window yet' };
    }
    c.sort(function (a, b) { return b.seen - a.seen; });
    var best = c[0], lim = tickSec() * 3 / 60, ageMin = (NOW() - best.seen) / 60000;
    if (best.fileStale || ageMin > lim) { return { state: 'STALE', text: 'STALE since ' + fmt(best.seen) }; }
    if (best.state === 'down') { return { state: 'DOWN', text: 'DOWN - seen ' + fmt(best.seen) }; }
    if (best.state === 'up') {
      if (CHAT_ONLY[id] && (!best.proof || (NOW() - best.proof) / 60000 > lim * 4)) { return { state: 'NO DATA', text: 'NO DATA - no recent test reply recorded for this window' }; }
      return { state: 'OK', text: 'UP - seen ' + fmt(best.seen) };
    }
    return { state: 'NO DATA', text: 'NO DATA - report says "' + String(best.state || 'unknown') + '" (' + fmt(best.seen) + ')' };
  }
  /* address book: the writer reads vtes-addresses.json each tick and records which entries have a url or run filled in */
  function addressFilled(id) { var h = status('heartbeat'); return h.state === 'OK' && !!(h.data.addresses_filled && h.data.addresses_filled[id] === true); }
  function schemeRegistered() { var h = status('heartbeat'); return h.state === 'OK' && h.data.vtes_scheme_registered === true; }
  /* "every N minutes" sentence read from heartbeat, never typed */
  function tick() {
    var h = status('heartbeat');
    if (h.state === 'NO DATA' || !h.data || !h.data.interval_sec) { return 'interval unknown (NO DATA)'; }
    var s = h.data.interval_sec; return 'every ' + (s % 60 === 0 ? (s / 60) + ' minutes' : s + ' seconds') + (h.state === 'STALE' ? ' (STALE)' : '');
  }
  function ageLine(builtIso) {
    var oldest = null, bad = false;
    Object.keys(LIMIT_MIN).forEach(function (n) { var s = status(n); if (s.state !== 'OK') { bad = true; } if (s.at && (!oldest || s.at < oldest)) { oldest = s.at; } });
    var built = fmtIso(builtIso) || 'unknown';
    return { bad: bad, text: 'Built ' + built + ', data as of ' + (oldest ? fmt(oldest) + ' (oldest file)' : 'NO DATA (no data file has been written yet)') + (bad && oldest ? '. At least one data file is missing, stale or not OK: see the red marks below.' : '') };
  }
  window.VTES4 = { status: status, badge: badge, executor: executor, tick: tick, ageLine: ageLine, esc: esc, fmt: fmt, fmtIso: fmtIso, addressFilled: addressFilled, schemeRegistered: schemeRegistered, LIMIT_MIN: LIMIT_MIN, ALL_IDS: ALL_IDS, CHAT_ONLY: CHAT_ONLY };
})();
