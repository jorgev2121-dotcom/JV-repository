/* vtes5-approvals.js - panel v5.2 add-on: the NEEDS MY APPROVAL page. TRK-2026-9910-C (round 11 approval system) . v5.2 . 2026-10-08
   Reads data/vtes5-approvals.js (window.VTES5_APPROVALS, written by the PC) and shows ONE card at a time with big buttons,
   recommended first. An answer is written as one .md file into the VTES-Inbox folder (File System Access API) or, when the
   browser cannot do that, copied for Jorge to paste into the RAMBO window. It never says "saved" unless the write was read back.
   Nothing here sends, pays, files or renames anything: RAMBO does the work after it reads the answer file. */
(function () {
  'use strict';

  var DATA_SRC = 'data/vtes5-approvals.js';
  var LIMIT_MIN = 26 * 60;          /* the list is STALE after 26 hours (DATA-CONTRACT rule for daily files) */
  var FUTURE_GRACE_MIN = 2;         /* a time more than 2 minutes ahead of the PC clock is BAD CLOCK */
  var RELOAD_MS = 60000, LOAD_TIMEOUT_MS = 10000;
  var LS_KEY = 'v52answered';
  var INBOX_RE = /^vtes[-_ ]?inbox$/i;

  var S = {
    raw: undefined, data: null, status: null, bad: 0, loaded: false, sig: '',
    queue: [], pos: 0, view: 'loading', item: null, node: null, chain: [], result: null, msg: ''
  };
  var answered = loadAnswered();   /* id -> ISO time, only answers whose file write was read back */
  var sessionDone = {};            /* id -> true, answered this page session (copied, not proven saved) */
  var inbox = null;                /* the VTES-Inbox folder handle, kept in IndexedDB */

  /* ---------- small helpers ---------- */
  function $(i) { return document.getElementById(i); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function str(v, max) { return typeof v === 'string' && v.trim() ? v.trim().slice(0, max || 1000) : ''; }
  function easternYear(d) { return d.toLocaleString('en-US', { timeZone: 'America/New_York', year: 'numeric' }); }
  /* same form as the rest of the panel: Eastern, short, with the zone, e.g. "Oct 8, 2:05 PM EDT" */
  function fmt(d) {
    try {
      var o = { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
      if (easternYear(d) !== easternYear(new Date())) { o.year = 'numeric'; }
      return d.toLocaleString('en-US', o);
    } catch (e) { return d.toISOString().slice(0, 16).replace('T', ' ') + ' UTC'; }
  }
  function noZone(v) { return typeof v === 'string' && !/(?:Z|[+-]\d{2}:?\d{2})$/i.test(v.trim()); }
  function p2(n) { return (n < 10 ? '0' : '') + n; }
  function isoLocal(d) {
    var off = -d.getTimezoneOffset(), sign = off >= 0 ? '+' : '-', a = Math.abs(off);
    return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()) + 'T' + p2(d.getHours()) + ':' + p2(d.getMinutes()) + ':' + p2(d.getSeconds()) + sign + p2(Math.floor(a / 60)) + ':' + p2(a % 60);
  }
  function stamp(d) { return d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + '-' + p2(d.getHours()) + p2(d.getMinutes()) + p2(d.getSeconds()); }
  function money(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }); }
  function ascii(s) {
    return String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2026/g, '...').replace(/[^\x0a\x20-\x7e]/g, '?');
  }
  function loadAnswered() { try { var o = JSON.parse(localStorage.getItem(LS_KEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function saveAnswered() { try { localStorage.setItem(LS_KEY, JSON.stringify(answered)); } catch (e) { } }
  function fsaOK() { return typeof window.showDirectoryPicker === 'function'; }
  function speechOK() { return typeof window.speechSynthesis !== 'undefined' && window.speechSynthesis && typeof window.SpeechSynthesisUtterance === 'function'; }

  /* ---------- reading the list: one sanitiser ---------- */
  function cleanChoice(c, depth) {
    if (!c || typeof c !== 'object') { return null; }
    var label = str(c.label, 200); if (!label) { return null; }
    var o = { label: label, effect: str(c.effect, 600) || 'No next step was written for this choice.', recommended: c.recommended === true };
    if (depth < 3 && c.followup) { var f = cleanNode(c.followup, depth + 1); if (f) { o.followup = f; } }
    return o;
  }
  function cleanNode(n, depth) {
    if (!n || typeof n !== 'object') { return null; }
    var title = str(n.title, 300), list = Array.isArray(n.choices) ? n.choices : [], out = [];
    list.forEach(function (c) { var x = cleanChoice(c, depth); if (x) { out.push(x); } });
    if (!title || out.length < 2) { return null; }
    out = out.slice(0, 4);
    var seen = false; out.forEach(function (c) { if (c.recommended) { if (seen) { c.recommended = false; } seen = true; } });
    out = out.filter(function (c) { return c.recommended; }).concat(out.filter(function (c) { return !c.recommended; }));
    return { title: title, why: str(n.why, 600), choices: out };
  }
  function cleanItem(it, ids) {
    if (!it || typeof it !== 'object') { return null; }
    var id = str(it.id, 80).replace(/[^A-Za-z0-9-]/g, '-');
    var n = cleanNode(it, 0); if (!n || !id || ids[id]) { return null; }
    ids[id] = true;
    n.id = id; n.trk = str(it.trk, 60); n.source = str(it.source, 300); n.sample = it.sample === true;
    n.money = (typeof it.money === 'number' && isFinite(it.money) && it.money >= 0) ? it.money : null;
    if (it.followup && typeof it.followup === 'object') {     /* an item-level follow-up names the choice it belongs to with "for" */
      var f = cleanNode(it.followup, 1), forL = str(it.followup['for'], 200);
      if (f) { n.choices.forEach(function (c) { if (!c.followup && (forL ? c.label === forL : c.recommended)) { c.followup = f; } }); }
    }
    return n;
  }
  function judge(raw) {
    if (raw === undefined || raw === null) { return { state: 'NO DATA', cls: 'bad', show: false, text: 'NO DATA - the PC has not written the approvals list, or it is not there. This does not mean nothing needs your OK.' }; }
    if (typeof raw !== 'object') { return { state: 'NO DATA', cls: 'bad', show: false, text: 'NO DATA - the approvals list could not be read.' }; }
    var w = raw.written, at = typeof w === 'string' ? new Date(w) : null;
    if (!at || isNaN(at.getTime())) { return { state: 'NO DATA', cls: 'bad', show: false, text: 'NO DATA - the approvals list has no valid time, so it cannot be trusted.' }; }
    if (noZone(w)) { return { state: 'NO ZONE', cls: 'bad', show: false, text: 'NO ZONE - the time in the approvals list has no time zone, so this page cannot tell which clock it means. Not trusted.' }; }
    var ageMin = (Date.now() - at.getTime()) / 60000;
    if (ageMin < -FUTURE_GRACE_MIN) { return { state: 'BAD CLOCK', cls: 'bad', show: false, text: 'BAD CLOCK - the approvals list says ' + fmt(at) + ', which is in the future. Not trusted.' }; }
    if (ageMin > LIMIT_MIN) { return { state: 'STALE', cls: 'bad', show: true, at: at, text: 'STALE since ' + fmt(at) + ' - this list is old. Do not trust it. RAMBO should write a new one.' }; }
    return { state: 'OK', cls: 'ok', show: true, at: at, text: 'List written by the PC ' + fmt(at) + '.' };
  }
  function apply(raw) {
    S.raw = raw; S.loaded = true; S.bad = 0;
    var st = judge(raw), items = [], ids = {};
    if (st.show) {
      var list = Array.isArray(raw.items) ? raw.items : (raw.items && typeof raw.items === 'object' ? [raw.items] : []);
      if (raw.items !== undefined && !Array.isArray(raw.items) && typeof raw.items !== 'object') { S.bad++; }
      list.slice(0, 200).forEach(function (it) { var x = cleanItem(it, ids); if (x) { items.push(x); } else { S.bad++; } });
    }
    S.status = st; S.data = st.show ? { written: raw.written, items: items } : null;
    var sig = JSON.stringify([st.state, S.data]);
    var changed = sig !== S.sig; S.sig = sig;
    rebuildQueue();
    paintHead();
    if (S.view === 'loading' || S.view === 'empty' || S.view === 'nodata' || (S.view === 'card' && S.node === S.item && changed)) {
      var keep = S.item && S.queue.indexOf(S.item.id) >= 0 ? S.item.id : null;
      if (keep) { S.pos = S.queue.indexOf(keep); }
      showCard(false);
    }
  }

  /* ---------- the queue ---------- */
  function byId(id) { var d = S.data; if (!d) { return null; } for (var i = 0; i < d.items.length; i++) { if (d.items[i].id === id) { return d.items[i]; } } return null; }
  function answeredSinceList(it) {
    var t = answered[it.id]; if (!t || !S.data) { return false; }
    return new Date(t).getTime() > new Date(S.data.written).getTime();
  }
  function rebuildQueue() {
    var d = S.data;
    S.queue = d ? d.items.filter(function (it) { return !sessionDone[it.id] && !answeredSinceList(it); }).map(function (it) { return it.id; }) : [];
    if (S.pos >= S.queue.length) { S.pos = 0; }
  }
  function waitingCount() { var d = S.data; return d ? d.items.filter(function (it) { return sessionDone[it.id] || answeredSinceList(it); }).length : 0; }

  /* ---------- painting ---------- */
  function headInfo() {
    var st = S.status, n = S.queue.length;
    if (!S.loaded) { return { cls: 'soon', text: 'Needs your OK: checking the list...', tab: 'checking' }; }
    if (!st.show) { return { cls: 'bad', text: 'Needs your OK: ' + st.state, tab: st.state }; }
    var words = n === 1 ? '1 thing needs your OK' : n + ' things need your OK';
    if (st.state !== 'OK') { return { cls: n > 0 ? 'you' : 'bad', text: n > 0 ? words : words + ', but this list is old', tab: n + ' waiting, old list' }; }
    return { cls: n > 0 ? 'you' : 'ok', text: n > 0 ? words : words + '. All clear.', tab: n + ' waiting' };
  }
  function paintHead() {
    var h = headInfo(), head = $('v52head'), line = $('v52line'), extra = $('v52extra');
    if (head) { head.className = 'v52head ' + h.cls; $('v52-approvals').textContent = h.text; }
    if (line) {
      var st = S.status;
      if (!S.loaded) { line.className = 'v52line ok'; line.textContent = 'Reading the list from the PC...'; }
      else { line.className = 'v52line ' + (st.cls === 'ok' ? 'ok' : 'bad'); line.textContent = st.text; }
    }
    if (extra) {
      var parts = [];
      if (S.bad > 0) { parts.push('<p class="v52line bad">UNREADABLE - ' + S.bad + (S.bad === 1 ? ' item' : ' items') + ' in the list could not be read and ' + (S.bad === 1 ? 'is' : 'are') + ' not shown. Tell RAMBO.</p>'); }
      var w = waitingCount();
      if (w > 0) { parts.push('<p class="v52line ok">You answered ' + w + ' here. ' + (w === 1 ? 'It leaves' : 'They leave') + ' this list when the PC next writes it.</p>'); }
      extra.innerHTML = parts.join('');
    }
    var tab = document.querySelector('a.v52tab small');
    if (tab && tab.textContent !== h.tab) { tab.textContent = h.tab; }
    margin();
  }
  /* a jump to this section must not hide its header under the sticky tab bar: measure the bar itself (v5.1's --hdr is measured before the guide makes the bar taller) */
  function margin() {
    try {
      var t = $('tabs'), sec = $('v52sec'); if (!sec) { return; }
      var m = (t && getComputedStyle(t).position === 'sticky') ? Math.ceil(t.getBoundingClientRect().height) + 12 : 12;
      if (sec.style.scrollMarginTop !== m + 'px') { sec.style.scrollMarginTop = m + 'px'; $('v52-approvals').style.scrollMarginTop = (m + 13) + 'px'; }
    } catch (e) { }
  }
  function countLine(followup) {
    return '<p class="v52count">Card ' + (S.pos + 1) + ' of ' + S.queue.length + (followup ? ' - follow-up question' : '') + '</p>';
  }
  function sampleTag(it) { return it && it.sample ? '<p class="v52sample">SAMPLE - not real</p>' : ''; }
  function toolsRow(later) {
    var r = speechOK() ? '<button type="button" class="v52read" data-act="read" data-tip="Reads this card out loud.">Read aloud</button>'
      : '<span class="v52note">Read aloud does not work in this browser. Speechify still works.</span>';
    var l = later ? '<button type="button" class="v52later" data-act="later" data-tip="Skips this card for now and shows the next one. Nothing is answered.">Later</button>' : '';
    return '<div class="v52tools">' + r + l + '</div><p class="v52msg" id="v52msg" role="status">' + esc(S.msg) + '</p>';
  }
  function cardHtml() {
    var it = S.item, node = S.node, fu = node !== it, h = '';
    h += countLine(fu) + sampleTag(it);
    h += '<h3 class="v52title" id="v52focus" tabindex="-1">' + esc(node.title) + '</h3>';
    if (node.why) { h += '<p class="v52why">' + esc(node.why) + '</p>'; }
    if (!fu) {
      var meta = [];
      if (it.trk) { meta.push('Job: ' + esc(it.trk)); }
      if (it.money !== null) { meta.push('Money: ' + esc(money(it.money))); }
      if (meta.length) { h += '<p class="v52meta">' + meta.join(' &middot; ') + '</p>'; }
      if (answered[it.id]) { h += '<p class="v52line bad">You answered this on ' + esc(fmt(new Date(answered[it.id]))) + ', but the PC still lists it. Answer again only if RAMBO asked.</p>'; }
    } else {
      h += '<p class="v52meta">About: ' + esc(it.title) + '. You chose: ' + esc(S.chain.map(function (c) { return c.label; }).join(', then ')) + '.</p>';
    }
    if (!node.choices.some(function (c) { return c.recommended; })) { h += '<p class="v52norec">No recommendation: the records do not say which one is right. Pick the one you know is true.</p>'; }
    h += '<div class="v52choices">' + node.choices.map(function (c, i) {
      return '<button type="button" class="v52choice ' + (c.recommended ? 'rec' : 'alt') + '" data-act="choose" data-i="' + i + '" data-tip="' + esc('What happens next: ' + c.effect) + '">' +
        '<span class="v52lbl">' + esc(c.label) + (c.recommended ? ' (Recommended)' : '') + '</span><span class="v52eff">' + esc(c.effect) + '</span></button>';
    }).join('') + '</div>';
    h += toolsRow(true);
    if (!fu && it.source) { h += '<p class="v52src">Raised by: ' + esc(it.source) + '</p>'; }
    return '<div class="v52card">' + h + '</div>';
  }
  function setupHtml() {
    var h = countLine(false) + sampleTag(S.item);
    h += '<h3 class="v52title" id="v52focus" tabindex="-1">One-time setup: where should your answers go?</h3>';
    h += '<p class="v52why">Pick the folder called VTES-Inbox on your Google Drive (G: drive, then My Drive). Your answer is saved there so RAMBO can see it. You do this only once.</p>';
    if (S.msg && S.msgBad) { h += '<p class="v52line bad">' + esc(S.msg) + '</p>'; }
    h += '<div class="v52choices">' +
      '<button type="button" class="v52choice rec" data-act="pick"><span class="v52lbl">Pick the VTES-Inbox folder (Recommended)</span><span class="v52eff">A window opens. Click VTES-Inbox, then Select Folder, then Allow (or Edit files).</span></button>' +
      '<button type="button" class="v52choice alt" data-act="copyinstead"><span class="v52lbl">Copy my answer instead</span><span class="v52eff">Nothing is saved. You paste the answer into the RAMBO window yourself.</span></button></div>';
    S.msgBad = false;
    return '<div class="v52card">' + h + '</div>';
  }
  function doneHtml() {
    var r = S.result, last = S.chain[S.chain.length - 1], it = S.item, h = '';
    h += sampleTag(it);
    if (r.saved) { h += '<h3 class="v52title" id="v52focus" tabindex="-1">Done. Your answer is saved.</h3>'; }
    else { h += '<h3 class="v52title" id="v52focus" tabindex="-1">Not sent yet. One step left.</h3>'; }
    h += '<p class="v52why">You chose: <b>' + S.chain.map(function (c) { return esc(c.label); }).join('</b>, then <b>') + '</b>.</p>';
    h += '<p class="v52why"><b>What happens next:</b> ' + esc(last.effect) + '</p>';
    if (r.saved) {
      h += '<p class="v52meta">Saved in your VTES-Inbox folder as <code class="v52code">' + esc(r.name) + '</code>. RAMBO reads that folder.</p>';
    } else {
      h += '<div class="v52copybox"><p class="v52meta">' + esc(r.reason) + ' Nothing has reached RAMBO yet.</p>' +
        '<div class="v52choices"><button type="button" class="v52choice rec" data-act="copy"><span class="v52lbl">Copy answer</span><span class="v52eff">Copies your answer so you can paste it.</span></button></div>' +
        '<p class="v52meta"><b>Then paste it into the RAMBO window.</b></p>' +
        '<p class="v52copied" id="v52copied" role="status"></p><div id="v52manual"></div>' +
        (fsaOK() ? '<button type="button" class="v52read" data-act="pick">Save it in the VTES-Inbox folder instead</button>' : '') + '</div>';
    }
    if (it.sample) { h += '<p class="v52note">This was a SAMPLE card. The answer is marked as a test, so nothing real should happen.</p>'; }
    var left = S.queue.length;
    if (left > 0) { h += '<div class="v52choices"><button type="button" class="v52choice rec" data-act="next"><span class="v52lbl">Next card (' + left + ' left)</span></button></div>'; }
    else { h += '<p class="v52why"><b>That was the last card.</b> Nothing else needs your OK right now.</p>'; }
    h += toolsRow(false);
    return '<div class="v52card ' + (r.saved ? 'ok' : 'you') + '">' + h + '</div>';
  }
  function emptyHtml() {
    var st = S.status;
    if (!S.loaded) { return '<div class="v52card soon"><p class="v52why">Reading the list from the PC...</p></div>'; }
    if (!st.show) { return '<div class="v52card soon"><h3 class="v52title" id="v52focus" tabindex="-1">No list to show</h3><p class="v52why">The PC has not written a list this page can trust. This does not mean nothing needs your OK. RAMBO writes the list.</p></div>'; }
    var w = waitingCount();
    return '<div class="v52card ok"><h3 class="v52title" id="v52focus" tabindex="-1">Nothing left to answer</h3><p class="v52why">' + (w > 0 ? 'Every card on this list is answered.' : 'The list from the PC is empty.') + (st.state === 'OK' ? '' : ' But the list is old, so check with RAMBO.') + '</p></div>';
  }
  function paintCard(focus) {
    var box = $('v52card'); if (!box) { return; }
    var html = S.view === 'card' ? cardHtml() : S.view === 'setup' ? setupHtml() : S.view === 'done' ? doneHtml()
      : S.view === 'saving' ? '<div class="v52card"><h3 class="v52title" id="v52focus" tabindex="-1">Saving your answer...</h3><p class="v52why">Please wait a moment.</p></div>' : emptyHtml();
    box.innerHTML = html;
    if (focus) { var f = $('v52focus'); if (f) { try { f.focus(); } catch (e) { } } }
  }
  function showCard(focus) {
    S.chain = []; S.result = null; S.msg = '';
    if (!S.queue.length) { S.item = S.node = null; S.view = (S.loaded && !S.status.show) ? 'nodata' : 'empty'; paintCard(focus); return; }
    S.item = byId(S.queue[S.pos]); S.node = S.item; S.view = 'card'; paintCard(focus);
  }

  /* ---------- answering ---------- */
  function choose(i) {
    var c = S.node && S.node.choices[i]; if (!c) { return; }
    S.chain.push({ q: S.node.title, label: c.label, effect: c.effect });
    if (c.followup) { S.node = c.followup; S.view = 'card'; S.msg = ''; paintCard(true); return; }
    finish();
  }
  function answerText(when) {
    var it = S.item, last = S.chain[S.chain.length - 1], L = [];
    L.push('# APPROVE ' + it.id, '');
    if (it.sample) { L.push('SAMPLE - not real. This is a test answer from the sample list. Do not act on it.', ''); }
    L.push('Item id: ' + it.id, 'Item: ' + it.title);
    if (it.trk) { L.push('TRK: ' + it.trk); }
    if (it.money !== null) { L.push('Money: ' + money(it.money)); }
    L.push('Chosen: ' + S.chain[0].label);
    for (var k = 1; k < S.chain.length; k++) { L.push('Follow-up: ' + S.chain[k].q + ' -> Chosen: ' + S.chain[k].label); }
    L.push('What happens next: ' + last.effect);
    L.push('Answered at: ' + isoLocal(when) + ' (' + fmt(when) + ')');
    if (it.source) { L.push('Raised by: ' + it.source); }
    if (S.data) { L.push('List written: ' + S.data.written); }
    L.push('', 'Answered by Jorge in the panel.', '');
    return ascii(L.join('\n'));
  }
  function finish() {
    var when = new Date();
    S.result = { when: when, text: answerText(when), name: 'APPROVE_' + S.item.id + '_' + stamp(when) + '.md', saved: false, reason: '' };
    if (!fsaOK()) { S.result.reason = 'This browser cannot save to your Drive folder.'; done(); return; }
    if (!inbox) { S.view = 'setup'; S.msg = ''; paintCard(true); return; }
    save();
  }
  function done() {
    var id = S.item.id, idx = S.queue.indexOf(id);
    if (S.result.saved) { answered[id] = isoLocal(S.result.when); saveAnswered(); delete sessionDone[id]; } else { sessionDone[id] = true; }
    if (idx >= 0) { S.queue.splice(idx, 1); if (S.pos > idx || S.pos >= S.queue.length) { S.pos = Math.max(0, Math.min(S.pos, S.queue.length - 1)); } }
    S.view = 'done'; S.msg = ''; paintHead(); paintCard(true);
  }
  function reasonOf(err) {
    var n = err && err.name;
    if (n === 'AbortError') { return 'You closed the folder window, so nothing was saved.'; }
    if (n === 'NotAllowedError' || n === 'SecurityError') { return 'The browser was not allowed to save in that folder, so nothing was saved.'; }
    return 'Saving to the folder did not work (' + String(err && err.message || err).slice(0, 120) + '), so nothing was saved.';
  }
  function writeFile(dir, name, text) {
    var fh;
    return Promise.resolve(dir.queryPermission ? dir.queryPermission({ mode: 'readwrite' }) : 'granted').then(function (p) {
      if (p === 'granted') { return p; }
      return dir.requestPermission ? dir.requestPermission({ mode: 'readwrite' }) : p;
    }).then(function (p) {
      if (p !== 'granted') { var e = new Error('permission refused'); e.name = 'NotAllowedError'; throw e; }
      return dir.getFileHandle(name, { create: true });
    }).then(function (h) { fh = h; return fh.createWritable(); })
      .then(function (w) { return w.write(text).then(function () { return w.close(); }); })
      .then(function () { return fh.getFile(); })
      .then(function (f) { return f.text(); })
      .then(function (back) { if (back !== text) { throw new Error('the saved file did not match when read back'); } return true; });
  }
  function save() {
    var r = S.result;
    S.view = 'saving'; paintCard(true);
    writeFile(inbox, r.name, r.text).then(function () { r.saved = true; }, function (err) { r.saved = false; r.reason = reasonOf(err); })
      .then(done);
  }
  function pick() {
    var p;
    try { p = window.showDirectoryPicker({ id: 'vtesinbox', mode: 'readwrite' }); } catch (e) { p = Promise.reject(e); }
    Promise.resolve(p).then(function (h) {
      if (!h || !INBOX_RE.test(String(h.name || ''))) {
        S.msg = 'That folder is called "' + String(h && h.name || '') + '". Please pick the one called VTES-Inbox.'; S.msgBad = true;
        S.view = 'setup'; paintCard(true); return;
      }
      inbox = h; idbSet(h);
      save();
    }, function (err) {
      S.result.reason = reasonOf(err); done();
    });
  }
  function copyAnswer() {
    var text = S.result.text, out = $('v52copied');
    function ok() { if (out) { out.textContent = 'Copied. Now paste it into the RAMBO window.'; } }
    function manual() {
      if (out) { out.textContent = 'This browser would not copy by itself. The answer is in the box below and already selected: press Ctrl and C, then paste it into the RAMBO window.'; }
      var m = $('v52manual'); if (m) { m.innerHTML = '<textarea class="v52manualbox" readonly rows="8" aria-label="Your answer, to copy">' + esc(text) + '</textarea>'; var t = m.firstChild; t.focus(); t.select(); }
    }
    function legacy() {
      try {
        var t = document.createElement('textarea'); t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.left = '-9999px';
        document.body.appendChild(t); t.select(); var r = document.execCommand('copy'); document.body.removeChild(t);
        if (r) { ok(); } else { manual(); }
      } catch (e) { manual(); }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(ok, legacy); } else { legacy(); }
    } catch (e) { legacy(); }
  }
  function readAloud() {
    var t = '';
    if (S.view === 'card') {
      var n = S.node, it = S.item;
      t = (it.sample ? 'Sample, not real. ' : '') + n.title + '. ' + (n.why ? n.why + ' ' : '');
      n.choices.forEach(function (c, i) { t += 'Choice ' + (i + 1) + (c.recommended ? ', recommended' : '') + ': ' + c.label + '. ' + c.effect + ' '; });
      t += 'Or press Later to see the next card.';
    } else {
      var box = $('v52card'); t = box ? box.innerText.replace(/Read aloud|Later/g, '') : '';
    }
    try {
      if (!speechOK()) { setMsg('Read aloud does not work in this browser.'); return; }
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(t); u.rate = 0.95; window.speechSynthesis.speak(u);
      setMsg('Reading aloud...');
    } catch (e) { setMsg('Read aloud did not work in this browser.'); }
  }
  function setMsg(m) { S.msg = m; var el = $('v52msg'); if (el) { el.textContent = m; } }
  function later() {
    if (S.queue.length <= 1) { S.chain = []; S.node = S.item; S.msg = 'This is the only card. It stays here until you answer.'; paintCard(true); return; }
    S.pos = (S.pos + 1) % S.queue.length; showCard(true);
  }
  function onClick(e) {
    var b = e.target.closest && e.target.closest('[data-act]'); if (!b || !$('v52sec').contains(b)) { return; }
    var a = b.getAttribute('data-act');
    if (a === 'choose') {
      Array.prototype.forEach.call(document.querySelectorAll('#v52card .v52choice'), function (x) { x.disabled = true; });
      choose(parseInt(b.getAttribute('data-i'), 10));
    }
    else if (a === 'pick') { pick(); }
    else if (a === 'copyinstead') { S.result.reason = 'You chose to copy your answer instead of saving it.'; done(); }
    else if (a === 'copy') { copyAnswer(); }
    else if (a === 'next') { rebuildQueue(); showCard(true); }
    else if (a === 'later') { later(); }
    else if (a === 'read') { readAloud(); }
  }

  /* ---------- IndexedDB: remember the folder (per browser, never required) ---------- */
  function idbOpen() {
    return new Promise(function (res, rej) {
      try {
        var r = indexedDB.open('vtes52', 1);
        r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
        r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); };
      } catch (e) { rej(e); }
    });
  }
  function idbGet() {
    return idbOpen().then(function (db) {
      return new Promise(function (res) {
        try { var q = db.transaction('kv', 'readonly').objectStore('kv').get('inbox'); q.onsuccess = function () { res(q.result || null); db.close(); }; q.onerror = function () { res(null); db.close(); }; }
        catch (e) { res(null); }
      });
    });
  }
  function idbSet(h) {
    idbOpen().then(function (db) { try { db.transaction('kv', 'readwrite').objectStore('kv').put(h, 'inbox'); } catch (e) { } }, function () { });
  }

  /* ---------- loading the list (start, then every 60 seconds; a deleted file is NO DATA on the next tick) ---------- */
  function load() {
    var prev = window.VTES5_APPROVALS, s = document.createElement('script'), over = false;
    try { delete window.VTES5_APPROVALS; } catch (e) { window.VTES5_APPROVALS = undefined; }
    function end(v) { if (over) { return; } over = true; clearTimeout(t); try { s.parentNode.removeChild(s); } catch (e) { } apply(v); }
    var t = setTimeout(function () { if (over) { return; } over = true; window.VTES5_APPROVALS = prev; try { s.parentNode.removeChild(s); } catch (e) { } apply(prev); }, LOAD_TIMEOUT_MS);
    s.onload = function () { end(window.VTES5_APPROVALS); };
    s.onerror = function () { end(undefined); };
    s.src = DATA_SRC + '?t=' + Date.now();
    document.head.appendChild(s);
  }

  var CSS = [
    '.v52sec{margin:12px 0 18px}',
    '.v52head{display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px;border-radius:14px;padding:10px 16px;border:3px solid}',
    '.v52head h2{margin:0;font-size:1.875rem;line-height:1.25;overflow-wrap:anywhere}',
    '.v52head.you{background:#fff1cc;color:#6b4100;border-color:#6b4100}',
    '.v52head.ok{background:#e3f3e8;color:#1d6b3b;border-color:#1d6b3b}',
    '.v52head.bad{background:#fdeceb;color:#b3261e;border-color:#b3261e}',
    '.v52head.soon{background:#eceae4;color:#4a4a47;border:3px dashed #8a8a84}',
    '.v52head p{margin:0;font-size:1.0625rem;font-weight:600}',
    '.v52line{font-size:1.125rem;font-weight:700;margin:8px 0;padding:6px 12px;border-radius:10px;overflow-wrap:anywhere}',
    '.v52line.bad{background:#fdeceb;color:#b3261e;border:2px solid #b3261e}',
    '.v52line.ok{color:#4a4a47;font-weight:600;padding:2px 4px}',
    '.v52card{background:#fff;border:3px solid #6b4100;border-radius:16px;padding:18px 22px;margin:10px 0;max-width:860px;overflow-wrap:anywhere}',
    '.v52card.ok{border-color:#1d6b3b;background:#f4fbf6}.v52card.ok .v52title{color:#1d6b3b}',
    '.v52card.you{border-color:#6b4100;background:#fffaf0}.v52card.you .v52title{color:#6b4100}',
    '.v52card.soon{border:3px dashed #8a8a84;background:#eceae4}',
    '.v52count{font-size:1.125rem;font-weight:700;color:#4a4a47;margin:0 0 6px}',
    '.v52sample{display:inline-block;font-weight:800;font-size:1.1875rem;color:#b3261e;background:#fdeceb;border:2px dashed #b3261e;border-radius:8px;padding:2px 10px;margin:0 0 8px}',
    '.v52title{font-size:2.125rem;line-height:1.2;margin:0 0 10px;color:#1d1d1b}',
    '.v52why{font-size:1.4375rem;line-height:1.45;margin:0 0 12px}',
    '.v52meta{font-size:1.1875rem;margin:0 0 10px;color:#3a3a37}',
    '.v52norec{font-size:1.1875rem;font-weight:700;color:#6b4100;background:#fff1cc;border-radius:10px;padding:6px 12px}',
    '.v52choices{display:flex;flex-direction:column;gap:14px;margin:14px 0}',
    'button.v52choice{display:block;width:100%;text-align:left;font-family:inherit;font-size:1.5625rem;font-weight:800;line-height:1.3;padding:16px 20px;border-radius:14px;min-height:76px;cursor:pointer;overflow-wrap:anywhere;margin:0}',
    'button.v52choice.rec{background:#1b5e9e;color:#fff;border:3px solid #173f66}',
    'button.v52choice.rec:hover{background:#173f66}',
    'button.v52choice.alt{background:#fff;color:#173f66;border:3px solid #1b5e9e}',
    'button.v52choice.alt:hover{background:#e8f0f8}',
    '.v52lbl{display:block}.v52eff{display:block;font-size:1.125rem;font-weight:600;margin-top:6px;line-height:1.4}',
    '.v52tools{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;margin-top:6px}',
    'button.v52read{font-family:inherit;font-size:1.1875rem;font-weight:700;padding:10px 18px;border-radius:10px;background:#fff;color:#1b5e9e;border:2px solid #1b5e9e;cursor:pointer;margin:6px 0}',
    'button.v52later{font-family:inherit;font-size:1.1875rem;font-weight:700;background:none;border:0;color:#1b5e9e;text-decoration:underline;text-underline-offset:4px;cursor:pointer;padding:10px 6px}',
    '.v52sec button:focus-visible,.v52sec textarea:focus-visible{outline:4px solid #e0a100;outline-offset:3px}',
    '.v52sec [tabindex="-1"]:focus{outline:3px dashed #1b5e9e;outline-offset:4px}',
    '.v52msg{min-height:1.4em;font-size:1.0625rem;font-weight:700;color:#173f66;margin:4px 0}',
    '.v52copybox{background:#fff1cc;border:2px solid #6b4100;border-radius:12px;padding:10px 14px;margin:10px 0}',
    '.v52copied{font-size:1.25rem;font-weight:800;color:#1d6b3b;min-height:1.3em;margin:6px 0}',
    'textarea.v52manualbox{width:100%;font:1rem Consolas,monospace;padding:8px;border:2px solid #6b4100;border-radius:8px}',
    '.v52code{font:1rem Consolas,monospace;word-break:break-all}',
    '.v52src,.v52note{font-size:1.0625rem;color:#4a4a47;margin:8px 0 0}',
    '.tab.v52tab{order:0}',
    '@media(max-width:640px){.v52head h2{font-size:1.5rem}.v52title{font-size:1.75rem}.v52why{font-size:1.25rem}button.v52choice{font-size:1.3125rem;padding:14px 14px}.v52card{padding:14px 14px}}'
  ];

  /* ---------- start: take over the greyed-out placeholder that vtes5-guide.js drew ---------- */
  function start() {
    var st = document.createElement('style'); st.id = 'v52css'; st.textContent = CSS.join('\n'); document.head.appendChild(st);
    var html = '<section class="v52sec" id="v52sec" aria-labelledby="v52-approvals">' +
      '<div class="v52head soon" id="v52head"><h2 id="v52-approvals">Needs your OK: checking the list...</h2><p>One card at a time. The blue button is the recommended answer.</p></div>' +
      '<p class="v52line ok" id="v52line">Reading the list from the PC...</p><div id="v52extra"></div><div id="v52card"></div></section>';
    var anchor = $('v51key') || $('v5tabhint') || $('tabs');
    if (anchor) { anchor.insertAdjacentHTML('afterend', html); } else { document.body.insertAdjacentHTML('afterbegin', html); }
    var ph = $('v51-approvals-new'); if (ph && ph.parentNode) { ph.parentNode.removeChild(ph); }
    var tab = document.querySelector('a.tab[href="#v51-approvals-new"]');
    if (tab) {
      tab.className = 'tab here v52tab'; tab.removeAttribute('aria-disabled'); tab.setAttribute('href', '#v52sec');
      tab.innerHTML = 'NEEDS MY APPROVAL<small>checking</small>';
      tab.setAttribute('data-tip', 'NEEDS MY APPROVAL: every item waiting for your OK, one card at a time, with big buttons (recommended first). Blue = live page on this panel.');
    }
    $('v52sec').addEventListener('click', onClick);
    window.addEventListener('resize', function () { setTimeout(margin, 60); });
    paintHead(); paintCard(false);
    idbGet().then(function (h) { if (h && !inbox) { inbox = h; } }, function () { });
    load();
    setInterval(load, RELOAD_MS);
    window.VTES52 = { state: S, reload: load, answered: answered, version: 'v5.2' };
  }
  function boot() { setTimeout(start, 0); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); } else { boot(); }
})();
