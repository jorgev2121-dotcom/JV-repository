/* vtes5-live.js - live status layer for the v5 launcher (ported from vtes4-live.js after fix round 3). TRK-2026-9910-B. Pure ASCII. No hand-typed status anywhere. */
(function () {
  /* D and S are the page's own copies of the data files and of the status-only file. A reload fills NEW objects and swaps them in
     only when every file has answered, so nothing on the page ever reads a half-empty state (flaw F9). */
  var D = window.VTES_DATA = window.VTES_DATA || {};
  var S = null, swapped = false;
  /* heartbeat: the real limit is 3 x interval_sec (see limitMin); the number here is only the one used when the file gives no interval_sec */
  var LIMIT_MIN = { heartbeat: 30, bots: 30, state: 26 * 60, health: 26 * 60, tokens: 30, housekeeping: 26 * 60, miamidade: 7 * 24 * 60 };
  var FILES = { heartbeat: 'data/vtes5-heartbeat.js', bots: 'data/vtes5-bots.js', state: 'data/vtes5-state.js', health: 'data/vtes5-health.js', tokens: 'data/vtes5-tokens.js', housekeeping: 'data/vtes5-housekeeping.js', miamidade: 'data/vtes5-miamidade.js' };
  /* The existing writer Write-VtesStatus.ps1 documents a 10-minute schedule ("Run it on a schedule (every 10 minutes)"). Used only when the heartbeat file gives no interval_sec. */
  var STATUS_FILE_TICK_SEC = 600;
  /* interval_sec outside 1 to MAX_TICK_SEC is invalid (flaws N5, F13). 3600 s = one hour per tick. */
  var MAX_TICK_SEC = 3600;
  /* a single bot (a scheduled task) may run as rarely as once a week: its own interval_sec is valid from 1 s to 7 days (flaw F7). Only the heartbeat and bots FILE writers are held to MAX_TICK_SEC. */
  var MAX_BOT_SEC = 7 * 24 * 3600;
  /* a bot is LATE when its last run is older than this many of its own intervals (flaw F7: a daily bot is green while its last run is inside 1.5 days) */
  var BOT_LATE_FACTOR = 1.5;
  /* Windows Task Scheduler result codes that are not failures (flaw F2): 267009 = 0x41301 task is running now, 267011 = 0x41303 task has not run yet */
  var RES_RUNNING = 267009, RES_NOT_YET = 267011;
  /* flaw N2 (RI-002: a process in the task list is not a run making progress): a task shown as running for longer than 3 x its own interval, or 1 hour when no valid interval is known, is STUCK */
  var STUCK_FACTOR = 3, STUCK_FLOOR_MIN = 60;
  /* fix round 6 (flaws 4, 9): the ONE limit for "running", "queued" and "running with no start time" is 3 x the task's own interval or 1 hour, whichever is larger; with no valid interval it is 1 hour.
     267010 (0x41302) is the scheduler's "task is disabled" code: it is worded DISABLED, not FAILED. */
  var RES_DISABLED = 267010;
  /* the six bots on this page (the names v3 lists); a bot named in the bots file but not here is judged too (flaw N1) */
  var BOT_NAMES = ['CU-Inbox-Job-Watcher', 'CU-Local-Executor', 'CU-TokenMonitor-Hourly', 'CU-Orchestrator', 'CU-Propagation-Check', 'VTES-LOCAL-POLLER'];
  /* the Miami-Dade target the page shows ("n of 300") */
  var MD_TARGET = 300;
  /* stale limit for the heartbeat file and for each window's last_seen = 3 ticks, never under 3 minutes (the page re-reads once a minute) and never over 3 hours (flaw F8) */
  var MIN_LIMIT_MIN = 3, MAX_LIMIT_MIN = 180;
  /* a data time more than this far ahead of the PC clock is a BAD CLOCK (flaw N1). Writer and page share one PC, so 2 minutes is generous. */
  var FUTURE_GRACE_MIN = 2;
  /* Windows nothing on the PC can see (chat sites, phone). They may be green only with a recorded proof (see DATA-CONTRACT). */
  var CHAT_ONLY = { 'LLM-04': 1, 'LLM-05': 1, 'LLM-07': 1, 'LLM-08': 1, 'LLM-10': 1 };
  /* windows that are green only with a recorded proof_at: the chat-only windows (a test reply) and the Grok bots (a finished bot task, flaw F4) */
  var NEEDS_PROOF = { 'LLM-04': 'test reply', 'LLM-05': 'test reply', 'LLM-07': 'test reply', 'LLM-08': 'test reply', 'LLM-10': 'test reply', 'BOTS': 'finished bot task' };
  /* the windows and roles this page shows (LLM-10 Copilot is not on Jorge's v3 page) */
  var ALL_IDS = ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09', 'LOCAL', 'CHIEF'];
  var NOW = function () { return window.VTES5_NOW ? new Date(window.VTES5_NOW) : new Date(); };
  /* ---- fix round 6, Tier 2 + Tier 3 (charter Rule 4: "green means good" was broken four times, so no more patches) ----
     ONE function turns a state word into a colour class (clsOfState), ONE table ranks the classes, and ONE function (V.enforce, in vtes5-ui.js) re-reads the page after every paint and
     raises any badge or strip entry to the worst card or panel mark on the page that uses its file. A badge can no longer be greener than what is printed under it. */
  var STATE_CLS = { 'OK': 'ok', 'UNPROVEN': 'unp', 'NOT RUN': 'unp', 'RUNNING': 'neu', 'QUEUED': 'neu', 'STUCK': 'stk' };
  function clsOfState(state) { return STATE_CLS[state] || 'bad'; }
  var RANK = { ok: 0, neu: 1, unp: 1, na: 1, bad: 2, stk: 2 };
  function rankOf(c) { return RANK[c] === undefined ? 2 : RANK[c]; }
  function worstCls(list) { var w = 'ok'; (list || []).forEach(function (c) { if (rankOf(c) > rankOf(w)) { w = c; } }); return w; }
  function stripCls(c) { var r = rankOf(c); return r === 0 ? 'ok' : (r === 1 ? 'na' : 'bad'); }
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
  /* the status-only file: the page's own copy after the first reload, the global before it */
  function getS() { return swapped ? S : (window.VTES_STATUS || {}); }
  /* a valid interval_sec is a number from 1 to 3600 (flaws N5, F13) */
  function intervalOk(iv) { return typeof iv === 'number' && isFinite(iv) && iv >= 1 && iv <= MAX_TICK_SEC; }
  function botIntervalOk(iv) { return typeof iv === 'number' && isFinite(iv) && iv >= 1 && iv <= MAX_BOT_SEC; }
  function everyText(sec) {
    if (sec % 86400 === 0) { var d = sec / 86400; return d + (d === 1 ? ' day' : ' days'); }
    if (sec % 3600 === 0) { var h = sec / 3600; return h + (h === 1 ? ' hour' : ' hours'); }
    if (sec % 60 === 0) { var m = sec / 60; return m + (m === 1 ? ' minute' : ' minutes'); }
    return sec + ' seconds';
  }
  /* the stale limit in minutes for a file. The heartbeat limit scales with its own interval_sec: 3 ticks, at least 3 minutes, at most 3 hours (flaw F8). */
  function limitMin(name) {
    if (name !== 'heartbeat' && name !== 'bots') { return LIMIT_MIN[name]; }
    var d = D[name], sec = (d && intervalOk(d.interval_sec)) ? d.interval_sec : STATUS_FILE_TICK_SEC;
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
    if ((name === 'heartbeat' || name === 'bots') && d.interval_sec !== undefined && d.interval_sec !== null && !intervalOk(d.interval_sec)) {
      return { state: 'NOT OK', at: at, text: 'NOT OK - interval_sec in the ' + name + ' file is not a number between 1 and ' + MAX_TICK_SEC + '. Not trusted.', data: null };
    }
    if (ageMin > limitMin(name)) { return { state: 'STALE', at: at, text: 'STALE since ' + fmt(at), data: d }; }
    if (name === 'health') {
      if (d.ok === false) { return { state: 'NOT OK', at: at, text: 'NOT OK - the report says there is a problem (as of ' + fmt(at) + ')', data: d }; }
      if (d.ok !== true) { return { state: 'NO DATA', at: at, text: 'NO DATA (the report has no ok field)', data: d }; }
    }
    return { state: 'OK', at: at, text: 'as of ' + fmt(at), data: d };
  }
  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  /* the verdict for one data file: GREEN needs a fresh file AND content that says good (flaw F3).
     cls 'ok' = green, 'bad' = red, 'na' = grey (fresh file, but nothing was counted). Fresh alone is never green except for files whose only content is "I wrote this" (heartbeat, bots, state). */
  function isCount(x, max) { return isNum(x) && x >= 0 && Math.floor(x) === x && (max === undefined || x <= max); }
  function isPct(x) { return isNum(x) && x >= 0 && x <= 100; }
  /* fix round 6 (flaws 6, 7, 8): the ONE freshness rule for every date shown as a value.
     o.type 'past': a time an event happened (report sent, last report, proof checked) - older than o.limitMin is OLD.
     o.type 'due': a time something is due or resets - in the past is PAST. In the future (more than the grace) is BAD CLOCK for 'past' types. A missing or unreadable time is NO DATA.
     Returns null when fine, else {kind, text}. Nothing that fails this rule is ever shown green or as a plain value. */
  function dateJudge(iso, o, s) {
    var t = iso ? new Date(iso) : null, ctx = s && s.at ? ' (file as of ' + fmt(s.at) + ')' : '';
    if (!t || isNaN(t.getTime())) { return { kind: 'NO DATA', text: 'NO DATA - the report has no valid ' + o.what + ctx }; }
    if (o.type === 'due') {
      if (t <= NOW()) { return { kind: 'PAST', text: 'PAST - the ' + o.what + ' is ' + fmt(t) + ', which has already gone by, so the numbers beside it belong to a finished period' + ctx }; }
      return null;
    }
    if (isFuture(t)) { return { kind: 'BAD CLOCK', text: 'BAD CLOCK - the ' + o.what + ' says ' + fmt(t) + ', which is in the future. Not trusted.' }; }
    if ((NOW() - t) / 60000 > o.limitMin) { return { kind: 'OLD', text: 'OLD - the ' + o.what + ' is ' + fmt(t) + ', more than ' + (o.limitMin >= 120 ? Math.round(o.limitMin / 60) + ' hours' : Math.round(o.limitMin) + ' minutes') + ' ago' + ctx }; }
    return null;
  }
  /* the name the verdicts below use: a past-type check with a limit in minutes */
  function oldTime(iso, limitMinutes, what, s) { return dateJudge(iso, { type: 'past', limitMin: limitMinutes, what: what }, s); }
  function bad(kind, text) { return { cls: 'bad', kind: kind, text: text }; }
  /* the class one bot contributes to the bots strip: ok = fine, na = running, queued, not yet run or unproven, bad = anything else (failed, late, disabled, stuck, no data) */
  function botClass(st) { return st === 'OK' ? 'ok' : ((st === 'RUNNING' || st === 'QUEUED' || st === 'NOT RUN' || st === 'UNPROVEN') ? 'na' : 'bad'); }
  function botNames() {
    var names = BOT_NAMES.slice(), f = D.bots && D.bots.bots;
    if (f && typeof f === 'object') { Object.keys(f).forEach(function (n) { if (names.indexOf(n) < 0) { names.push(n); } }); }
    return names;
  }
  function verdict(name) {
    var s = status(name), d = s.data || {};
    if (s.state !== 'OK') { return { cls: 'bad', kind: s.state, text: s.text }; }
    var t;
    if (name === 'bots') {
      /* flaw N1: the strip reflects the WORST bot. Six FAILED bots can never sit under a green "bots: OK". */
      var names = botNames(), notFine = [], soft = [];
      names.forEach(function (n) { var c = botClass(bot(n).state); if (c === 'bad') { notFine.push(n); } else if (c === 'na') { soft.push(n); } });
      if (notFine.length) { return bad('BOTS NOT FINE', notFine.length + ' of ' + names.length + ' bots are not fine (' + notFine.join(', ') + '); see each bot card (file as of ' + fmt(s.at) + ')'); }
      if (soft.length) { return { cls: 'na', kind: 'BOTS NOT ALL PROVEN', text: soft.length + ' of ' + names.length + ' bots are running, queued, not yet run or cannot be judged (' + soft.join(', ') + '); none has failed (file as of ' + fmt(s.at) + ')' }; }
    }
    if (name === 'heartbeat') {
      /* fix round 6 (flaw 1): this verdict judges the FILE only. The windows it reports are cards on the page; the strip takes its colour from those cards (V.enforce), never from a second opinion here. */
      var ids = Object.keys(d.executors && typeof d.executors === 'object' ? d.executors : {});
      if (!ids.length) { return bad('NO WINDOWS', 'NO WINDOWS REPORTED - the heartbeat file is fresh (as of ' + fmt(s.at) + ') but lists no window'); }
    }
    if (name === 'state') {
      var badNum = ['open_items', 'in_progress', 'blocked'].filter(function (k) { return d[k] !== undefined && !isCount(d[k]); });
      if (badNum.length) { return bad('IMPOSSIBLE', 'IMPOSSIBLE - ' + badNum.join(', ') + ' in the state file is not a whole number of 0 or more (file as of ' + fmt(s.at) + ')'); }
    }
    if (name === 'health') {
      /* flaw N3: counts that cannot be true, a daily report that was not sent for days, and a pass rate under 100% are never green */
      if (!isCount(d.checks_total) || d.checks_total < 1 || !isCount(d.checks_passed, d.checks_total)) {
        return bad('IMPOSSIBLE', (isNum(d.checks_passed) || isNum(d.checks_total) ? 'IMPOSSIBLE - ' + d.checks_passed + ' of ' + d.checks_total + ' health checks passed cannot be true' : 'NO DATA - the health report has no check counts') + ' (file as of ' + fmt(s.at) + ')');
      }
      t = oldTime(d.report_sent_at, LIMIT_MIN.health, 'daily-report-sent time', s); if (t) { return bad(t.kind, t.text); }
      if (d.checks_passed === 0) { return bad('FAILING', 'FAILING - 0 of ' + d.checks_total + ' health checks passed (file as of ' + fmt(s.at) + ')'); }
      if (d.checks_passed < d.checks_total) { return { cls: 'na', kind: 'PARTIAL', text: 'PARTIAL - only ' + d.checks_passed + ' of ' + d.checks_total + ' health checks passed (file as of ' + fmt(s.at) + ')' }; }
    }
    if (name === 'housekeeping') {
      if (d.report_delivered === false) { return { cls: 'bad', kind: 'NOT DELIVERED', text: 'NOT DELIVERED - the report says it was not delivered (file as of ' + fmt(s.at) + ')' }; }
      if (d.report_delivered !== true) { return { cls: 'bad', kind: 'NO DATA', text: 'NO DATA - the report does not say whether it was delivered (file as of ' + fmt(s.at) + ')' }; }
      t = oldTime(d.last_report_at, LIMIT_MIN.housekeeping, 'last-report time', s); if (t) { return bad(t.kind, t.text); }
      if (d.items_cleaned !== undefined && !isCount(d.items_cleaned)) { return bad('IMPOSSIBLE', 'IMPOSSIBLE - items_cleaned is not a whole number of 0 or more (file as of ' + fmt(s.at) + ')'); }
    }
    if (name === 'miamidade') {
      if (d.counted !== undefined && d.counted !== null && !isCount(d.counted, MD_TARGET)) { return bad('IMPOSSIBLE', 'IMPOSSIBLE - the count says ' + d.counted + ' of ' + MD_TARGET + ', which cannot be true (file as of ' + fmt(s.at) + ')'); }
      if (!isNum(d.counted)) { return { cls: 'na', kind: 'NOT COUNTED', text: 'NOT COUNTED - the file is fresh (as of ' + fmt(s.at) + ') but holds no count' }; }
    }
    if (name === 'tokens') {
      var any = isNum(d.burn_per_hour) || isNum(d.window_used_pct) || isNum(d.week_used_pct) || (d.programs && d.programs.length);
      if (!any) { return { cls: 'bad', kind: 'NO DATA', text: 'NO DATA - the token report is fresh (file as of ' + fmt(s.at) + ') but holds no numbers' }; }
      var imp = [];
      if (d.burn_per_hour !== undefined && !(isNum(d.burn_per_hour) && d.burn_per_hour >= 0)) { imp.push('burn_per_hour'); }
      if (d.window_used_pct !== undefined && !isPct(d.window_used_pct)) { imp.push('window_used_pct'); }
      if (d.week_used_pct !== undefined && !isPct(d.week_used_pct)) { imp.push('week_used_pct'); }
      (d.programs || []).forEach(function (p) { if (p && p.tokens_today !== undefined && !(isNum(p.tokens_today) && p.tokens_today >= 0)) { imp.push('tokens_today of ' + p.name); } });
      if (imp.length) { return bad('IMPOSSIBLE', 'IMPOSSIBLE - ' + imp.join(', ') + ' in the token report is below 0 or above 100%, which cannot be true (file as of ' + fmt(s.at) + ')'); }
      if (!isNum(d.burn_per_hour) || !isNum(d.window_used_pct)) { return { cls: 'bad', kind: 'INCOMPLETE', text: 'INCOMPLETE - the token report lacks the burn rate or the window used (file as of ' + fmt(s.at) + ')' }; }
      /* flaw 7: a reset time that has already gone by means the numbers belong to a finished window */
      t = dateJudge(d.window_resets_at, { type: 'due', what: 'window reset time' }, s); if (t) { return bad(t.kind, t.text); }
    }
    return { cls: 'ok', kind: 'OK', text: s.text };
  }
  /* html badge: green only when the verdict is green */
  function badge(name, okLabel) {
    var v = verdict(name);
    return '<span class="v5b ' + v.cls + '" data-src="' + name + '" data-lbl="' + esc(okLabel || 'OK') + '">' + esc(v.cls === 'ok' ? (okLabel || 'OK') + ' - ' + v.text : v.text) + '</span>';
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
    if (h.state === 'NO DATA' || !h.data || !h.data.interval_sec) { return 'unknown (' + (h.state === 'OK' || h.state === 'STALE' ? 'NO DATA' : h.state) + ')'; }
    var s = h.data.interval_sec; return 'every ' + (s % 60 === 0 ? (s / 60) + ' minutes' : s + ' seconds') + (h.state === 'STALE' ? ' (STALE)' : '');
  }
  /* the age line in three parts, so the minute-by-minute "Re-checked" time can change without the rest being redrawn (flaw F16) */
  function ageLine(builtIso, pageBad) {
    var oldest = null, bad = false, clock = [];
    Object.keys(LIMIT_MIN).forEach(function (n) {
      var s = status(n), vd = verdict(n); if (s.state !== 'OK' || vd.cls === 'bad') { bad = true; }
      if (s.state === 'BAD CLOCK') { clock.push(n); } else if (s.at && (!oldest || s.at < oldest)) { oldest = s.at; }
    });
    var builtBadNow = builtBad(builtIso); if (builtBadNow || pageBad) { bad = true; }
    var only = (!oldest && !clock.length && Object.keys(getS()).length) ? ' Only the status-only writer (vtes-status.js) has reported, and it cannot prove anything.' : '';
    var a = 'Built ' + builtText(builtIso) + ', data as of ' + (oldest ? fmt(oldest) + ' (oldest file)' : 'NO DATA (no valid data file has been written yet)') +
      (clock.length ? '. BAD CLOCK: ' + clock.join(', ') + ' dated in the future, not trusted' : '') + '. ';
    var b = 'Re-checked ' + fmt(NOW()) + '.';
    var c = (bad ? ' At least one data file or card is missing, stale, in the future or not OK (or the build time is not trusted): see the red marks below.' : '') + only;
    return { bad: bad, text: a + b + c, a: a, b: b, c: c };
  }
  /* ---- redraw only what changed (flaw F16): a node whose html or text is already right is never touched, so a text selection inside it survives ---- */
  function setHtml(el, html) { if (!el) { return false; } if (el.__v4h === html) { return false; } el.innerHTML = html; el.__v4h = html; return true; }
  function setText(el, t) { if (!el) { return false; } if (el.textContent === t) { return false; } el.textContent = t; return true; }
  /* reload every data file (cache-busted) and the status-only file into NEW objects, then swap them in all at once, then call done.
     A missing file is simply absent from the new objects = NO DATA. Nothing reads the new objects before the swap, so a probe answer that arrives
     mid-reload sees the old, complete state, never a half-empty one (flaw F9). The status-only file is read only when vtes5-config.js names a folder
     for it (a file: address); Jorge's v3 launcher has no vtes-status.js beside it, so by default there is none. */
  function baseUrl() {
    var c = window.VTES5_CONFIG, u = c && c.status_dir_url;
    return (typeof u === 'string' && /^file:/i.test(u) && /\/$/.test(u)) ? u : '';
  }
  function reload(done) {
    if (reload.busy) { return; } reload.busy = true;
    var stamp = Date.now(), base = baseUrl(), fresh = {}, freshS = {};
    var oldD = D, oldS = getS();
    S = oldS; swapped = true; /* from now on the page reads its own copy, not the globals the loading files overwrite */
    var jobs = Object.keys(FILES).map(function (n) { return { name: n, src: FILES[n] }; });
    if (base) { jobs.push({ name: 'status', src: base + 'vtes-status.js' }); }
    var left = jobs.length, completed = false, tags = [];
    window.VTES_DATA = fresh; window.VTES_STATUS = freshS;
    function end(swap) {
      /* the status file assigns window.VTES_STATUS itself (a new object), so take what the files left in the globals */
      if (swap) { D = window.VTES_DATA || fresh; S = base ? (window.VTES_STATUS || freshS) : freshS; swapped = true; }
      window.VTES_DATA = D; window.VTES_STATUS = getS();
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
  /* ---- one bot (a scheduled task) from the bots file: the Windows scheduler's own report, read by a writer on the PC. It proves the task ran and how it ended, not that its work was right. ---- */
  /* the first moment this page saw a task in a given state (in memory only; a reload starts the count again). Used only when the report itself gives no time. */
  var SEEN = {};
  function firstSeen(name, key, now) { var f = SEEN[name]; if (!f || f.key !== key) { f = SEEN[name] = { key: key, at: now }; } return f.at; }
  function bot(name) {
    var bs = status('bots');
    if (bs.state === 'NO DATA') { return { state: 'NO DATA', text: 'NO DATA - the bots report file has not been written yet' }; }
    if (bs.state === 'BAD CLOCK' || bs.state === 'NOT OK') { return { state: bs.state, text: bs.text }; }
    var b = bs.data && bs.data.bots && bs.data.bots[name];
    if (!b || typeof b !== 'object') { return { state: bs.state === 'STALE' ? 'STALE' : 'NO DATA', text: bs.state === 'STALE' ? 'STALE since ' + fmt(bs.at) : 'NO DATA - the bots report has no entry for this bot' }; }
    var run = b.last_run_at ? new Date(b.last_run_at) : null, runOk = !!(run && !isNaN(run.getTime()));
    if (bs.state === 'STALE') { return { state: 'STALE', text: 'STALE since ' + fmt(bs.at) + ' - the bots report is old' }; }
    var st = String(b.state == null ? '' : b.state).toLowerCase();
    var iv = botIntervalOk(b.interval_sec) ? b.interval_sec : null;
    var every = iv ? ' Scheduled every ' + everyText(iv) + ' (read from the task schedule).' : '';
    var badIv = (b.interval_sec !== undefined && b.interval_sec !== null && !iv) ? ' The interval_sec in the report is not a number from 1 to ' + MAX_BOT_SEC + ' (7 days), so lateness cannot be judged.' : '';
    var lastTxt = runOk ? ' (last ran ' + fmt(run) + ')' : '';
    if (runOk && isFuture(run)) { return { state: 'BAD CLOCK', text: 'BAD CLOCK - the last run says ' + fmt(run) + ', which is in the future. Not trusted.' }; }
    if (st === 'disabled') { return { state: 'DOWN', text: 'DISABLED - the scheduler says this task is turned off' + lastTxt + '.' + every }; }
    /* flaw 9: 267010 (0x41302) is the scheduler's own "this task is disabled" code. Red is right, FAILED is the wrong word. */
    if (b.last_result === RES_DISABLED) { return { state: 'DOWN', text: 'DISABLED - the scheduler says this task is turned off (result code ' + RES_DISABLED + ' means disabled, not failed)' + lastTxt + '.' + every }; }
    if (st !== 'ready' && st !== 'running' && st !== 'queued') { return { state: 'NO DATA', text: 'NO DATA - the scheduler state is "' + (st || 'missing') + '"' + lastTxt }; }
    /* flaws N2, N17 and 4 (RI-002: a process in the task list is not a run making progress). "Running", "queued" and "running with no start time" are good news only for a while:
       one limit for all three = 3 x the task's own interval or 1 hour, whichever is larger (1 hour when no valid interval is known), counted from the best time the report gives:
       the start of the run (running), the scheduler's last-run time (queued), or, when the report gives no time at all, the moment this page first saw that state (lost when the page is reloaded; KNOWN-LIMITS). */
    var waiting = (st === 'queued'), running = (st === 'running' || b.last_result === RES_RUNNING);
    if (waiting || running) {
      var stuckLimit = iv ? Math.max(STUCK_FACTOR * iv / 60, STUCK_FLOOR_MIN) : STUCK_FLOOR_MIN, now = NOW(), refAt, how;
      if (runOk) { refAt = run; how = waiting ? 'its last scheduled run was ' + fmt(run) : 'Started ' + fmt(run) + ' (the scheduler\'s last-run time)'; }
      else { refAt = firstSeen(name, st + '|' + String(b.last_result), now); how = 'the report gives no ' + (waiting ? 'last-run' : 'start') + ' time, so this page counts from ' + fmt(refAt) + ', when it first saw this state (a reload of the page restarts that count)'; }
      var heldMin = (now - refAt) / 60000;
      if (heldMin > stuckLimit) {
        var heldFor = heldMin >= 60 ? Math.floor(heldMin / 60) + (Math.floor(heldMin / 60) === 1 ? ' HOUR' : ' HOURS') : Math.max(1, Math.floor(heldMin)) + (Math.floor(heldMin) <= 1 ? ' MINUTE' : ' MINUTES');
        var limTxt = 'more than ' + (iv ? '3 x its ' + everyText(iv) + ' interval or 1 hour, whichever is larger' : '1 hour') + ' (' + Math.round(stuckLimit) + ' minutes)';
        if (running && runOk) { return { state: 'STUCK', text: 'RUNNING FOR ' + heldFor + ' - CHECK. ' + how + '. That is ' + limTxt + ', so it may be hung: a task in the scheduler list is not proof it is making progress.' }; }
        return { state: 'STUCK', text: 'STUCK - CHECK. ' + (waiting ? 'QUEUED for ' : 'RUNNING for ') + heldFor + ': ' + how + '. That is ' + limTxt + ', so it may be hung: a task in the scheduler list is not proof it is making progress.' }; }
      if (waiting) { return { state: 'QUEUED', text: 'QUEUED - the scheduler says this task is queued to start' + lastTxt + '.' + every + ' It turns red STUCK - CHECK after ' + Math.round(stuckLimit) + ' minutes of waiting.' }; }
    }
    if (typeof b.last_result === 'number' && isFinite(b.last_result)) {
      /* flaw F2: 267009 is "running now" (neutral) and 267011 is "not yet run" (grey); any other non-zero code is a failure */
      if (b.last_result === RES_RUNNING) { return { state: 'RUNNING', text: 'RUNNING NOW - the scheduler says this task is running (result code ' + RES_RUNNING + ' means running, not failed)' + (runOk ? lastTxt : ' (no start time given: this page counts how long it has been running from when it first saw this state)') + '.' + every + ' It turns red STUCK - CHECK after ' + Math.round(stuckLimit) + ' minutes.' }; }
      if (b.last_result === RES_NOT_YET) { return { state: 'NOT RUN', text: 'NOT YET RUN - the scheduler says this task has not run yet (result code ' + RES_NOT_YET + ')' + '.' + every }; }
    }
    if (!runOk) { return { state: 'NO DATA', text: 'NO DATA - no last-run time for this bot' + (st ? ' (scheduler says "' + st + '")' : '') }; }
    if (typeof b.last_result !== 'number' || !isFinite(b.last_result)) { return { state: 'NO DATA', text: 'NO DATA - no result code for the last run (' + fmt(run) + ')' }; }
    if (b.last_result !== 0) { return { state: 'DOWN', text: 'FAILED - the last run (' + fmt(run) + ') ended with result code ' + b.last_result + '.' + every }; }
    if (!iv) { return { state: 'UNPROVEN', text: 'RAN ' + fmt(run) + ' with result 0, but no valid schedule interval is given, so lateness cannot be judged.' + badIv }; }
    if ((NOW() - run) / 1000 > BOT_LATE_FACTOR * iv) { return { state: 'DOWN', text: 'LATE - last ran ' + fmt(run) + ', more than ' + BOT_LATE_FACTOR + ' x its interval ago.' + every }; }
    return { state: 'OK', text: 'RAN ' + fmt(run) + ', result 0, scheduler says ' + st + '.' + every };
  }
  window.VTES5 = { status: status, verdict: verdict, badge: badge, executor: executor, bot: bot, tick: tick, tickSec: tickSec, ageLine: ageLine, esc: esc, fmt: fmt, fmtIso: fmtIso, padTime: padTime, now: NOW, reload: reload, addressFilled: addressFilled, schemeRegistered: schemeRegistered,
    LIMIT_MIN: LIMIT_MIN, limitMin: limitMin, ALL_IDS: ALL_IDS, CHAT_ONLY: CHAT_ONLY, NEEDS_PROOF: NEEDS_PROOF, MAX_TICK_SEC: MAX_TICK_SEC, MAX_BOT_SEC: MAX_BOT_SEC, BOT_LATE_FACTOR: BOT_LATE_FACTOR,
    clsOfState: clsOfState, rankOf: rankOf, worstCls: worstCls, stripCls: stripCls, dateJudge: dateJudge, STUCK_FLOOR_MIN: STUCK_FLOOR_MIN, isFuture: isFuture,
    builtText: builtText, builtBad: builtBad, setHtml: setHtml, setText: setText, statusMap: getS };
})();
