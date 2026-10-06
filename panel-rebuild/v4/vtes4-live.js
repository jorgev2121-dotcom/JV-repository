/* vtes4-live.js - live status layer. TRK-2026-9910-B. Pure ASCII. No hand-typed status anywhere. */
(function () {
  var D = window.VTES_DATA = window.VTES_DATA || {};
  var LIMIT_MIN = { heartbeat: 15, state: 26 * 60, health: 26 * 60, tokens: 30, housekeeping: 26 * 60, miamidade: 7 * 24 * 60 };
  var NOW = function () { return window.VTES4_NOW ? new Date(window.VTES4_NOW) : new Date(); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  /* returns {state:'OK'|'NO DATA'|'STALE', at:Date|null, text, data} */
  function status(name) {
    var d = D[name];
    if (!d || !d.at) { return { state: 'NO DATA', at: null, text: 'NO DATA', data: null }; }
    var at = new Date(d.at);
    if (isNaN(at.getTime())) { return { state: 'NO DATA', at: null, text: 'NO DATA (bad time in file)', data: null }; }
    var ageMin = (NOW() - at) / 60000;
    if (ageMin > LIMIT_MIN[name]) { return { state: 'STALE', at: at, text: 'STALE since ' + fmt(at), data: d }; }
    return { state: 'OK', at: at, text: 'as of ' + fmt(at), data: d };
  }
  /* html badge: green only when OK */
  function badge(name, okLabel) {
    var s = status(name), cls = s.state === 'OK' ? 'ok' : 'bad';
    return '<span class="v4b ' + cls + '" data-src="' + name + '">' + esc(s.state === 'OK' ? (okLabel || 'OK') + ' - ' + s.text : s.text) + '</span>';
  }
  /* executor state from heartbeat: 'up' only if heartbeat fresh AND executor says up AND its own last_seen fresh (limit = 3 ticks) */
  function executor(id) {
    var h = status('heartbeat');
    if (h.state !== 'OK') { return { state: h.state, text: h.state === 'STALE' ? h.text : 'NO DATA' }; }
    var e = (h.data.executors || {})[id];
    if (!e) { return { state: 'NO DATA', text: 'NO DATA (not in heartbeat)' }; }
    var seen = e.last_seen ? new Date(e.last_seen) : null;
    var lim = (h.data.interval_sec || 300) * 3 / 60;
    if (!seen || isNaN(seen.getTime())) { return { state: 'NO DATA', text: 'NO DATA (no last_seen)' }; }
    if ((NOW() - seen) / 60000 > lim) { return { state: 'STALE', text: 'STALE since ' + fmt(seen) }; }
    return { state: e.state === 'up' ? 'OK' : (e.state === 'down' ? 'DOWN' : 'NO DATA'), text: (e.state === 'up' ? 'UP' : String(e.state || 'unknown').toUpperCase()) + ' - seen ' + fmt(seen) };
  }
  /* "every N minutes" sentence read from heartbeat, never typed */
  function tick() {
    var h = status('heartbeat');
    if (h.state === 'NO DATA' || !h.data || !h.data.interval_sec) { return 'interval unknown (NO DATA)'; }
    var s = h.data.interval_sec; return 'every ' + (s % 60 === 0 ? (s / 60) + ' minutes' : s + ' seconds') + (h.state === 'STALE' ? ' (STALE)' : '');
  }
  function ageLine(builtAt) {
    var oldest = null, names = Object.keys(LIMIT_MIN);
    names.forEach(function (n) { var s = status(n); if (s.at && (!oldest || s.at < oldest)) { oldest = s.at; } });
    return 'Built ' + builtAt + ', data as of ' + (oldest ? fmt(oldest) + ' (oldest file)' : 'NO DATA (no data file has been written yet)');
  }
  window.VTES4 = { status: status, badge: badge, executor: executor, tick: tick, ageLine: ageLine, esc: esc, fmt: fmt, LIMIT_MIN: LIMIT_MIN };
})();
