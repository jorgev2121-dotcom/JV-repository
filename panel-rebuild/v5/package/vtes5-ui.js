/* vtes5-ui.js - live parts of Jorge's v3 launcher: state lines on every card, big copy buttons, address lines, bot lines, panels, Miami-Dade. TRK-2026-9910-B. ASCII only.
   Static facts only here (names, how to open, typed notes with their date). NO status words are typed: state comes from VTES5 (data files). */
(function () {
  var V = window.VTES5, esc = V.esc;
  var GROK_NOT_BUILT = 'Grok is chat only. No Grok bot has been built (asked for many times, never built). Typed note, registry brief of 2026-10-06: Grok chat has been unproven for 31 days (not checked by this page).';
  var GROK_BUILT = 'Grok is chat only. A Grok bot is reporting UP with proof. Typed note, registry brief of 2026-10-06: Grok chat has been unproven for 31 days (not checked by this page).';
  function botsBuilt() { return V.executor('BOTS').state === 'OK'; }
  function grokText() { return botsBuilt() ? GROK_BUILT : GROK_NOT_BUILT; }
  var NOTE_PRE = 'Typed note, not live: ';
  /* META: which data-file key gives the card its state (live), the plain click path for windows a web page cannot open (steps), the vtes:// fix sentence, typed notes.
     Every steps text is the v3 "how to open" line written out in plain words; whether it is still right on the PC is UNVERIFIED. */
  var META = {
    'LLM-01': { live: 'LLM-01', tick: true, desk: 'RAMBO',
      steps: ['On the PC, open the Claude desktop app (or click the green D icon near the clock).', 'Click the Code tab.', 'If the app lists several sessions, pick the one named RAMBO (typed advice, UNVERIFIED).', 'Click in the message box.', 'Press Ctrl+V.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-01, runs VTES-Open.ps1 -Install once (no admin) and records both in the heartbeat file. This card then turns into a link by itself.' },
    'LLM-02': { live: 'LLM-02', openLabel: 'Open Claude Code sessions list (claude.ai/code)',
      how: 'This opens your list of Claude Code sessions. Pick the Repo Keeper session. Which session is the current one is UNVERIFIED: the single session address typed in v3 was removed because it may be an old session.',
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-02 and registers the vtes:// addresses. This card then turns into a link by itself.' },
    'LLM-03': { live: 'LLM-03', desk: 'Cowork',
      steps: ['On the PC, open the Claude desktop app (or click the orange X icon near the clock).', 'Click the Cowork tab.', 'Click in the message box.', 'Press Ctrl+V.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) finds the Claude desktop app shortcut on the PC, writes it into the address book entry for LLM-03, then registers the vtes:// addresses. Whether that shortcut lands on the Cowork tab is UNVERIFIED.' },
    'LLM-04': { live: 'LLM-04', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-04 and registers the vtes:// addresses.' },
    'LLM-05': { live: 'LLM-05', desk: 'the iPhone',
      steps: ['Press the blue button to copy the packet on this PC.', 'Paste it into a new email to yourself and press Send (this page never sends anything for you).', 'On the iPhone, open that email and copy the packet.', 'Open the Claude app, tap in the message box and paste the packet.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-05 and registers the vtes:// addresses.' },
    'LLM-06': { live: 'LLM-06', desk: 'Codex CLI',
      steps: ['On the PC, open Windows Terminal.', 'Type codex and press Enter.', 'Press Ctrl+V.', 'First time only: double-click the desktop shortcut named "Codex - sign in (Jorge)" and follow the sign-in window that opens (typed from v3, UNVERIFIED on this PC).'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-06 and registers the vtes:// addresses.' },
    'LLM-07': { live: 'LLM-07', grok: true, fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-07 and registers the vtes:// addresses.',
      next: 'Next step: RAMBO sends Grok one test message and writes the result into the heartbeat file; until then this card stays red.' },
    'LLM-08': { live: 'LLM-08', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-08 and registers the vtes:// addresses.' },
    'LLM-09': { live: 'LLM-09', noaddr: true },
    'LOCAL': { live: 'LOCAL', bot: 'CU-Local-Executor', desk: 'LOCAL',
      steps: ['There is no window. Press the button to copy the packet.', 'Hand it to the desktop executor (RAMBO): use the blue RAMBO button at the top, then tell it "save this as a LOCAL job". The desktop executor (RAMBO) writes the job file with its CLASS and PROMPT lines. You do not write the file or type a command.'] },
    'CODEX': { live: 'LLM-06', desk: 'CODEX',
      steps: ['On the PC, open Windows Terminal.', 'Type codex and press Enter.', 'Press Ctrl+V.'],
      s3: ' Proven 2026-10-01.',
      note: NOTE_PRE + 'v3 says "Proven 2026-10-01" (not checked by this page).' },
    'RAMBO': { live: 'LLM-01', tick: true, bot: 'CU-Inbox-Job-Watcher', desk: 'RAMBO',
      steps: ['On the PC, open the Claude desktop app (or click the green D icon near the clock).', 'Click the Code tab.', 'If the app lists several sessions, pick the one named RAMBO (typed advice, UNVERIFIED).', 'Click in the message box.', 'Press Ctrl+V.', 'Or, in File Explorer, open Google Drive, open the folder VTES-Inbox, right-click an empty spot, click New, click Text Document, name it JOB-something.md, open it, press Ctrl+V and save.'],
      s3: ' About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday.',
      note: NOTE_PRE + 'on 2026-10-01 v3 said about 75% of the Max quota was used and forecast it to run out on a Saturday. That date has passed. The live burn rate is in the Token monitor panel under Bots.' },
    'GROK': { live: 'LLM-07', grok: true, desk: 'GROK',
      steps: ['Press the button to copy the packet.', 'Open grok.com in your browser, click in the message box and press Ctrl+V.', 'If you want the Second-Opinion script used instead, hand the packet to the desktop executor (RAMBO) with the blue RAMBO button at the top. The desktop executor (RAMBO) runs it; you type nothing.'] },
    'COWORK': { live: 'LLM-03', desk: 'Cowork', toId: 'LLM-03',
      steps: ['On the PC, open the Claude desktop app (or click the orange X icon near the clock).', 'Click the Cowork tab.', 'Click in the message box.', 'Press Ctrl+V.'] },
    'CHIEF': { live: 'CHIEF', bot: 'CU-Orchestrator', nobtn: true }
  };
  var BOTKEY = { 'CU-Inbox-Job-Watcher': { live: null }, 'CU-Local-Executor': {}, 'CU-TokenMonitor-Hourly': {}, 'CU-Orchestrator': {}, 'CU-Propagation-Check': {}, 'VTES-LOCAL-POLLER': { tick: true } };
  /* green only for OK; grey for UNPROVEN and NOT RUN; neutral blue for RUNNING (flaw F2); everything else is red */
  function stCls(e) { return e.state === 'OK' ? 'ok' : ((e.state === 'UNPROVEN' || e.state === 'NOT RUN') ? 'unp' : (e.state === 'RUNNING' ? 'neu' : 'bad')); }
  var RANK = { ok: 0, neu: 1, unp: 1, bad: 2 };
  /* flaw F6: a role card with its own bot shows ONE answer. The class is the worse of the window and the bot; the sentence names both. */
  function comboState(m) {
    var e = V.executor(m.live), b = V.bot(m.bot), ce = stCls(e), cb = stCls(b), cls = RANK[cb] > RANK[ce] ? cb : ce, txt;
    if (e.state === 'OK' && b.state !== 'OK') { txt = 'The window is up (' + e.text + '), but its bot ' + m.bot + ' is not fine: ' + b.text; }
    else { txt = e.text + ' Its bot ' + m.bot + ': ' + b.text; }
    return { cls: cls, html: '<b>State of ' + esc(m.live) + ':</b> ' + esc(txt) };
  }
  function stateHtml(e, label) { return '<b>' + esc(label || 'State:') + '</b> ' + esc(e.text); }
  /* the address line: a link only when the PC says the vtes:// address is registered AND the address book entry is filled; otherwise one plain sentence saying what is missing */
  function addrHtml(w, m) {
    if (!w.a || m.noaddr) { return ''; }
    if (/^vtes:\/\//.test(w.a)) {
      if (V.schemeRegistered() && V.addressFilled(w.id)) { return '<a class="btn" href="' + esc(w.a) + '">Open ' + esc(w.a) + '</a>'; }
      var hb = V.status('heartbeat'), why;
      if (hb.state !== 'OK') { why = 'the PC has not reported whether it is registered (heartbeat file: ' + hb.state + ')'; }
      else if (!V.schemeRegistered()) { why = 'it is not registered on the PC yet'; }
      else { why = 'it is registered, but the address book entry for ' + w.id + ' is empty'; }
      return '<span class="v5na" data-na="' + esc(w.id) + '">Address ' + esc(w.a) + ' does not open yet: ' + esc(why) + '. ' + (m.fix ? 'What fixes it: ' + esc(m.fix) : '') + '</span>';
    }
    return '<b>' + esc(w.a) + '</b>';
  }
  function steps(m) { return m.steps ? '<ol class="v5steps">' + m.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' : ''; }
  function botLine(name) { var b = V.bot(name); return '<div class="v5st ' + stCls(b) + '" data-bot="' + esc(name) + '"><b>Bot ' + esc(name) + ':</b> ' + esc(b.text) + '</div>'; }
  function card(o, m, extra) {
    return '<div class="card" data-k="' + esc((o.k || '').toLowerCase()) + '" id="card-' + esc(o.id) + '"><div class="id">' + esc(o.id) + ' &middot; ' + (o.e || '') + '</div><div class="name">' + esc(o.n) + '</div><div class="role">' + esc(o.r) + '</div>' + (extra || '') + '</div>';
  }
  function llmCard(w) {
    var m = META[w.id] || {}, e = V.executor(m.live || w.id);
    var j = esc(w.j) + (m.tick ? ' Check-in interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the heartbeat file).' : '');
    var open = w.url ? '<a class="btn" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + esc(m.openLabel || ('Open ' + w.n)) + '</a>' : '';
    var big = (!w.url && m.desk) ? '<button class="btn bigcopy" type="button" data-paste="' + esc(w.id) + '">Copy packet for ' + esc(m.desk) + '</button>' : '';
    var nopen = (!w.url && m.desk) ? '<div class="v5na2">A web page cannot open a desktop app, so there is no Open button. Press the blue button, then follow these steps:' + steps(m) + '</div>' : '';
    var how = (w.how || m.how) ? '<div class="addr">How to open (typed instruction from v3, not checked by this page): ' + esc(m.how || w.how) + '</div>' : '';
    var body = '<div class="v5st ' + stCls(e) + '" data-state="' + esc(w.id) + '">' + stateHtml(e) + '</div>' +
      '<p>' + j + '</p>' + (m.grok ? '<p class="v5note" data-grok="1">' + esc(grokText()) + '</p><p><b>' + esc(m.next) + '</b></p>' : '') +
      '<div class="pool ' + esc(w.cls) + '">Pool: ' + esc(w.pool) + '</div><div class="tags">' + esc(w.t) + '</div>' +
      (w.a ? '<div class="addr v5addr" data-addr="' + esc(w.id) + '">' + addrHtml(w, m) + '</div>' : '') +
      open + big + '<button class="btn alt" data-to="' + esc(w.id) + '" type="button">Hand work here</button>' + nopen + how + '<div class="paste v5cs" data-cs="' + esc(w.id) + '" role="status"></div>';
    return card(w, m, body);
  }
  function roleCard(w) {
    var m = META[w.id] || {}, e = V.executor(m.live), j = esc(w.j) + (m.tick ? ' Check-in interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the heartbeat file).' : '');
    var to = m.toId || w.id, big = (m.desk && !m.nobtn) ? '<button class="btn bigcopy" type="button" data-paste="' + esc(to) + '" data-role="' + esc(w.id) + '">Copy packet for ' + esc(m.desk) + '</button>' : '';
    var cs = m.bot ? comboState(m) : { cls: stCls(e), html: '<b>State of ' + esc(m.live) + ':</b> ' + esc(e.text) };
    var body = '<div class="v5st ' + cs.cls + '" data-state="' + esc(w.id) + '"' + (m.bot ? ' data-botname="' + esc(m.bot) + '"' : '') + '>' + cs.html + '</div>' +
      '<p>' + j + '</p>' + (m.grok ? '<p class="v5note" data-grok="1">' + esc(grokText()) + '</p>' : '') + (m.note ? '<p class="v5note">' + esc(m.note) + '</p>' : '') +
      '<div class="pool ' + esc(w.cls) + '">Pool: ' + esc(w.pool) + '</div><div class="tags">' + esc(w.t) + '</div>' + (w.a ? '<div class="addr">Address: <b>' + esc(w.a) + '</b></div>' : '') +
      big + (m.nobtn ? '' : '<button class="btn alt" data-to="' + esc(to === w.id ? w.id : to) + '" type="button">Hand work here</button>') +
      (big ? '<div class="v5na2">Steps:' + steps(m) + '</div>' : '') + '<div class="paste v5cs" data-cs="' + esc(w.id) + '" role="status"></div>';
    return card(w, m, body);
  }
  function botCard(b) {
    var name = b[0], bk = BOTKEY[name] || {};
    return '<div class="card" data-k="bot scheduled agent ' + esc((name + ' ' + b[1]).toLowerCase()) + '" id="bot-' + esc(name) + '"><div class="id">BOT</div><div class="name">' + esc(name) + '</div><p>' + esc(b[1]) + '</p>' +
      botLine(name) + (bk.tick ? '<div class="v5st" data-hbtick="1">Heartbeat interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the heartbeat file).</div>' : '') +
      '<div class="pool ' + esc(b[3]) + '">Pool: ' + esc(b[2]) + '</div></div>';
  }
  /* fills the hand-off packet for window `to` (global packet(), refresh() and copy() of the v3 page) and says plainly where it is */
  function pasteTo(to, outEl, stepsList) {
    var toSel = document.getElementById('to'), fromSel = document.getElementById('from');
    if (!fromSel.value) { fromSel.value = 'LLM-04'; }
    toSel.value = to;
    if (toSel.value !== to) { outEl.textContent = 'Cannot build a packet for ' + to + ': it is not in the To list.'; return; }
    window.refresh();
    var txt = window.packet(); document.getElementById('preview').value = txt;
    window.copy(txt).then(function (ok) {
      outEl.textContent = (ok ? 'Copied the packet. ' : 'Could not copy by itself: the packet is in the box in section 1 (Hand work); select it and press Ctrl+C. ') +
        (stepsList && stepsList.length ? 'Next: ' + stepsList.join(' ') : '');
    });
  }
  /* re-evaluate every card in place (state line, tick sentence, address line, bot lines, Grok note); only what changed is redrawn (flaw F16) */
  function repaint() {
    Array.prototype.forEach.call(document.querySelectorAll('.v5st[data-state]'), function (st) {
      var id = st.getAttribute('data-state'), m = META[id], live = m ? m.live : id;
      if (m && m.bot && st.getAttribute('data-botname')) { var cs = comboState(m), c2 = 'v5st ' + cs.cls; if (st.className !== c2) { st.className = c2; } V.setHtml(st, cs.html); return; }
      var e = V.executor(live), cls = 'v5st ' + stCls(e); if (st.className !== cls) { st.className = cls; }
      var isRole = !!(m && !/^LLM-/.test(id));
      V.setHtml(st, isRole ? '<b>State of ' + esc(live) + ':</b> ' + esc(e.text) : stateHtml(e));
    });
    Array.prototype.forEach.call(document.querySelectorAll('.v5st[data-bot]'), function (st) {
      var b = V.bot(st.getAttribute('data-bot')), cls = 'v5st ' + stCls(b); if (st.className !== cls) { st.className = cls; }
      V.setHtml(st, '<b>Bot ' + esc(st.getAttribute('data-bot')) + ':</b> ' + esc(b.text));
    });
    Array.prototype.forEach.call(document.querySelectorAll('.v5tick'), function (t) { V.setText(t, V.tick()); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-addr]'), function (el) {
      var id = el.getAttribute('data-addr'), w = window.LLMS.filter(function (x) { return x.id === id; })[0]; V.setHtml(el, addrHtml(w, META[id] || {}));
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-grok]'), function (el) { V.setText(el, grokText()); });
  }
  /* ---- panels ---- */
  function drive(id) { return 'https://drive.google.com/file/d/' + id + '/view'; }
  /* The 22 sources and their proof files: ids read from the Drive index doc 1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o on 2026-10-06 (copied from the v4 package). */
  var MD = [
    ['01', 'Property Appraiser - property search', '1t48b9mvp53sicxbsYvd3mBjuBo8xfY0_', ''],
    ['02', 'Property Appraiser - comparable sales', '1dnVieZEEC2H3xNI2lVqAnWfme0mK98kO', ''],
    ['03', 'Tax Collector - real estate tax', '1xzBT1GCYkFsNpCsC5FFpaCMwBrisGQAZ', ''],
    ['04', 'Clerk - Official Records', '1Z5m-8lQdDyroTYNqEl5VzeSOn4pUOn3s', 'PARTIAL: Cloudflare captcha, not worked around'],
    ['05', 'Clerk - civil cases', '1YlTorY-w6Gff0TBiHmMAtkccEaWz1qvj', ''],
    ['06', 'Building permit menu', '103RjsXYBPMTB7RXrVca93QRPFPMfae9l', ''],
    ['07', 'EPS e-permitting', '1Sett3KYNpxOwcW2ddSDkeOlZe9xUg9Nu', 'permit status public; folio search needs a login'],
    ['08', 'Building support cases', '1xCFNgzvou6vsE82Bm65QaXT3Ns6wIc1n', ''],
    ['09', 'Code enforcement online', '12CCgmd1jcFomJZDLnDL0-3anuHiy0XYK', ''],
    ['10', 'Neighborhood code cases', '1IU-wcx_5fVuKEJPAJw0j-2_zbEC5lubz', ''],
    ['11', 'Unsafe structures', '1ArxF3o9ZfdHRB9cagpo6aLYsumG_hesk', ''],
    ['12', 'Certificates of Use', '1aMjJj4B_RTnsuEK7zpUoAz2JRj1rTUWH', 'PARTIAL: before 2012 works, newer search retired'],
    ['13', 'DERM code enforcement', '1wGKsjrwvo7q34eTKAO7rlYvroASMVElX', ''],
    ['14', 'DERM public records', '1mSp3dlmvxCkk80fGYOAe3po3-kRwDGmn', ''],
    ['15', 'Product approval (NOA) search', '1U6DHLvirKxeYc8P18-9TV6A4K-O4Qnp4', ''],
    ['16', 'Zoning and land use', '1CJWObVncV2WtWtghlVyXQs5mWuSdsW0D', ''],
    ['17', 'City of Miami permits', '1206ihC17HIk2IFKnYDJrFqySLpKml_gv', 'login-blocked per registry banner'],
    ['18', 'Miami Beach permits', '1eZlpGm5o_QhS-ymx_A-Lnrsjk8yrKRMl', ''],
    ['19', 'Sunbiz (state business records)', '1xqnUBSml1puN0caJAeiWZCcBo85QHS2L', ''],
    ['20', 'DBPR licenses', '1c1dTYOoPHHXHGBu__dPUNQuwjUPDwU8p', ''],
    ['21', 'Florida product approval', '1wRPHDSjnRZtF5_0JkIInLFm4J3rFLA4x', ''],
    ['22', 'Pembroke Pines / Broward', '1xDlwM42EFkLEyskPEmMh_LRRgp-WFVQ5', '']
  ];
  var MD_INDEX = 'https://docs.google.com/document/d/1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o/edit';
  var READ = [
    'This page is built on your v3 launcher. Every card, tab and button from v3 is still here.',
    'A red box that says NO DATA means nothing on the PC has reported yet. Red is the truth, not a bug.',
    'Green appears only when a fresh report file with proof says so. Grey NOT PROVEN means only the simple status writer said up, and it checks nothing.',
    'To hand work to RAMBO, press the big blue RAMBO button directly under the page title. Then open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
    'A web page cannot open a desktop app. So desktop windows have a Copy packet button and the exact steps, not an Open button.',
    'Tabs marked OLD PANEL go to a snapshot made on 2026-09-02. They are not live.',
    'Words marked typed note were typed by hand on the date shown. This page does not check them.',
    'Every time is Eastern time with the zone. The year is added when it is not this year.'
  ];
  function num(x, suffix) { return (typeof x === 'number' && isFinite(x)) ? x + (suffix || '') : null; }
  function red(t) { return '<span class="v5b bad">' + esc(t) + '</span>'; }
  function val(x, suffix) { var n = num(x, suffix); return n === null ? red('NO DATA') : '<b>' + esc(n) + '</b>'; }
  function noNums(s) { return s.state === 'NO DATA' || s.state === 'BAD CLOCK' || (s.state === 'NOT OK' && !s.data); }
  function tokens() {
    var s = V.status('tokens'), d = s.data || {}, ok = s.state === 'OK';
    var rows = (d.programs || []).map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td>' + val(p.tokens_today) + '</td></tr>'; }).join('');
    return '<div class="pn" id="pn-tokens"><h3>Token monitor (bot CU-TokenMonitor-Hourly)</h3><p>' + V.badge('tokens', 'Reporting') + '</p>' +
      (noNums(s) ? '<p>' + red(s.state === 'BAD CLOCK' ? 'BAD CLOCK' : 'NO DATA') + ' ' + (s.state === 'BAD CLOCK' ? 'The token report is dated in the future, so none of its numbers are shown.' : 'The token monitor has not written its report file (data\\vtes5-tokens.js). No burn rate is shown because none was measured.') + '</p>' :
        '<p>Burn rate per hour: ' + val(d.burn_per_hour) + ' tokens. This window used: ' + val(d.window_used_pct, '%') + '. This week used: ' + val(d.week_used_pct, '%') + '. Window resets: ' + (V.fmtIso(d.window_resets_at) ? esc(V.fmtIso(d.window_resets_at)) : red('NO DATA')) + '.</p>' +
        '<table><tr><th>Program</th><th>Tokens today</th></tr>' + (rows || '<tr><td colspan="2">' + red('NO DATA') + '</td></tr>') + '</table>' +
        (ok ? '' : '<p>' + red('These numbers are old. Do not trust them.') + '</p>')) + '</div>';
  }
  function housekeeping() {
    var s = V.status('housekeeping'), d = s.data || {};
    return '<div class="pn" id="pn-house"><h3>Housekeeping agent</h3><p>' + V.badge('housekeeping', 'Reported') + '</p>' +
      (noNums(s) ? '<p>' + red(s.state === 'BAD CLOCK' ? 'BAD CLOCK' : 'NO DATA') + ' ' + (s.state === 'BAD CLOCK' ? 'The housekeeping report is dated in the future, so it is not shown.' : 'No housekeeping report has ever been recorded here.') + ' Last report time: ' + red('NONE') + '.</p>' :
        '<p>Last report: ' + (V.fmtIso(d.last_report_at) ? '<b>' + esc(V.fmtIso(d.last_report_at)) + '</b>' : red('NO DATA')) + '. Delivered: ' + (d.report_delivered === true ? '<b>yes</b>' : (d.report_delivered === false ? red('NO - not delivered') : red('UNKNOWN'))) + (d.delivered_to ? ' to ' + esc(d.delivered_to) : '') + '. Items cleaned: ' + val(d.items_cleaned) + '.</p>') + '</div>';
  }
  function health() {
    var s = V.status('health'), d = s.data || {}, st = V.status('state'), sd = (st.state === 'OK' || st.state === 'STALE') ? (st.data || {}) : {};
    var pct = (typeof d.checks_passed === 'number' && typeof d.checks_total === 'number' && d.checks_total > 0) ? d.checks_passed + ' of ' + d.checks_total + ' health checks passed (' + Math.round(100 * d.checks_passed / d.checks_total) + '%)' : null;
    var up = 0, seen = 0; V.ALL_IDS.forEach(function (id) { var e = V.executor(id); if (e.state === 'OK') { up++; } if (e.state !== 'NO DATA') { seen++; } });
    var money = (sd.money || []).map(function (m) { return '<li>' + esc(m.item) + ': ' + esc(m.status) + '</li>'; }).join('');
    return '<div class="pn" id="pn-health"><h3>Health and state</h3><p>' + V.badge('health', 'Report') + ' ' + V.badge('state', 'State') + '</p>' +
      '<p>Windows confirmed up now: ' + (seen === 0 ? red('NO DATA') + ' (no window has reported)' : '<b>' + up + ' of ' + V.ALL_IDS.length + '</b>') + '. This counts the windows and roles on this page, not tasks.</p>' +
      '<p>Health report: ' + (pct ? '<b>' + esc(pct) + '</b>' : red('NO DATA')) + '. Daily report sent: ' + (V.fmtIso(d.report_sent_at) ? '<b>' + esc(V.fmtIso(d.report_sent_at)) + '</b>' : red('NO DATA')) + '.</p>' +
      '<p>Open items: ' + val(sd.open_items) + '. In progress: ' + val(sd.in_progress) + '. Blocked: ' + val(sd.blocked) + '.</p>' +
      '<p>Money items (read from the state file, not typed):</p>' + (money ? '<ul>' + money + '</ul>' : '<p>' + red('NO DATA') + '</p>') + '</div>';
  }
  function repairsLive() {
    var st = V.status('state'), sd = (st.state === 'OK' || st.state === 'STALE') ? (st.data || {}) : {}, rep = sd.repairs || [];
    var li = rep.map(function (r) { return '<li>' + esc(r.status) + ': ' + esc(r.text) + '</li>'; }).join('');
    return '<div class="pn" id="pn-repairs-live"><h3>Live repair rows (read from the state data file, none typed)</h3><p>' + V.badge('state', 'State') + '</p>' + (li ? '<ul>' + li + '</ul>' : '<p>' + red('NO DATA') + ' No data file supplies repair rows, so none are shown. The table above is the hand-typed log.</p>') + '</div>';
  }
  function miami() {
    var s = V.status('miamidade'), d = s.data || {}, counted = (!noNums(s) && typeof d.counted === 'number') ? d.counted : null;
    var fresh = s.state === 'OK', proof = {}; (fresh ? (d.sources || []) : []).forEach(function (x) { var k = ('0' + String(x.id).replace(/\D/g, '')).slice(-2); proof[k] = x; });
    var items = MD.map(function (r) {
      var p = proof[r[0]], chk = fresh ? (p ? (p.proof_ok === true ? ' <span class="v5b ok">proof checked</span>' : ' ' + red('PROOF NOT OK')) : ' ' + red('NOT RE-CHECKED')) : ' <span class="v5b na">proof not current (the Miami-Dade file is ' + esc(s.state) + ')</span>';
      return '<li><b>' + r[0] + ' ' + esc(r[1]) + '</b> - <a href="' + drive(r[2]) + '" target="_blank" rel="noopener">open proof file</a>' + (r[3] ? ' - <i class="v5typed">typed note from 2026-08-16, not re-checked: ' + esc(r[3]) + '</i>' : '') + chk + '</li>';
    }).join('');
    return '<div class="pn" id="pn-miami"><p>' + V.badge('miamidade', 'Counted') + '</p>' +
      '<p>Counted so far: <b>' + (counted === null ? 'unknown' : counted) + ' of 300</b>' + (counted === null ? ' (not counted yet)' : '') + '.</p>' +
      '<p>Each link opens that site\'s proof file in Drive. They are plain text files, not the Orange Tree portal. <a href="' + MD_INDEX + '" target="_blank" rel="noopener">Open the full index document</a>.</p><ol class="md">' + items + '</ol></div>';
  }
  var DASHFILES = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'];
  function dash() { return DASHFILES.map(function (n) { return '<span>' + esc(n) + ': ' + V.badge(n, 'OK') + '</span>'; }).join(''); }
  var PANELS = [['v5health', health], ['v5tokens', tokens], ['v5house', housekeeping], ['v5miami', miami], ['v5repairs', repairsLive]];
  function ageHtml(age) { return '<span id="v5age1">' + esc(age.a) + '</span><span id="v5age2">' + esc(age.b) + '</span><span id="v5age3">' + esc(age.c) + '</span>'; }
  function setBuilt(builtIso) { var f = document.getElementById('v5fb'); if (f) { V.setText(f, V.builtText(builtIso)); } }
  function paintPanels() { PANELS.forEach(function (p) { V.setHtml(document.getElementById(p[0]), p[1]()); }); }
  window.VTES5U = {
    MD: MD, META: META, grokText: grokText, botsBuilt: botsBuilt, botsSub: function () { return botsBuilt() ? 'UP (proof)' : 'NOT BUILT'; },
    pasteTo: pasteTo, repaint: repaint,
    /* builds the three card grids from the v3 arrays and the top block; wires the big copy buttons */
    renderAll: function (LLMS, ROLES, BOTS) {
      /* flaw F10: the search must match only the text v3 matched. v3's own render (still in the page) has just drawn the three grids; take each card's text before it is replaced. */
      var t3 = ['g-llm', 'g-roles', 'g-bots'].map(function (g) { return Array.prototype.map.call(document.querySelectorAll('#' + g + ' .card'), function (c) { return c.textContent; }); });
      document.getElementById('g-llm').innerHTML = LLMS.map(llmCard).join('');
      document.getElementById('g-roles').innerHTML = ROLES.map(roleCard).join('');
      document.getElementById('g-bots').innerHTML = BOTS.map(botCard).join('');
      /* the two sentences v3 printed inside a card and v5 moved into a labelled typed note stay searchable (META.s3), so the same words still find the same cards */
      var ids = [LLMS, ROLES, BOTS].map(function (a) { return a.map(function (x) { return Array.isArray(x) ? x[0] : x.id; }); });
      ['g-llm', 'g-roles', 'g-bots'].forEach(function (g, gi) { Array.prototype.forEach.call(document.querySelectorAll('#' + g + ' .card'), function (c, i) { if (t3[gi][i] !== undefined) { c.setAttribute('data-s', t3[gi][i] + ((META[ids[gi][i]] || {}).s3 || '')); } }); });
      Array.prototype.forEach.call(document.querySelectorAll('button.bigcopy'), function (b) {
        b.addEventListener('click', function () {
          var key = b.getAttribute('data-role') || b.getAttribute('data-paste'), m = META[key] || META[b.getAttribute('data-paste')] || {};
          pasteTo(b.getAttribute('data-paste'), b.parentNode.querySelector('.v5cs'), m.steps);
        });
      });
    },
    /* measures the tab bar so anchor jumps leave the heading visible (see vtes5.css) */
    measureHeader: function () { var t = document.getElementById('tabs'); if (t) { document.documentElement.style.setProperty('--hdr', t.offsetHeight + 'px'); } },
    renderTop: function (builtIso) {
      var age = V.ageLine(builtIso);
      /* flaw F5: the RAMBO button sits in its own slot directly under the page title (the build puts #v5rambo right after the h1), above "Read me first" */
      document.getElementById('v5rambo').innerHTML = '<button class="btn" type="button" id="v5rambobtn">Copy packet for RAMBO (Claude Code Desktop Executor)</button><div class="paste v5cs" id="v5ramboout" role="status"></div>';
      document.getElementById('v5top').innerHTML = '<details class="v5read" id="v5read" open><summary>Read me first</summary><ol>' + READ.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></details>' +
        '<h2 id="livestatus">Live status</h2><div class="v5age' + (age.bad ? ' bad' : '') + '" id="v5age">' + ageHtml(age) + '</div><div class="v5dash" id="v5dash"></div><div id="v5health"></div>';
      document.getElementById('v5rambobtn').addEventListener('click', function () { pasteTo('LLM-01', document.getElementById('v5ramboout'), META['LLM-01'].steps); });
      paintPanels(); V.setHtml(document.getElementById('v5dash'), dash()); setBuilt(builtIso);
    },
    /* every 60 seconds: re-evaluate the age line, the strip and every panel from the freshly loaded files; only what changed is redrawn (flaw F16) */
    refresh: function (builtIso) {
      var age = V.ageLine(builtIso), a = document.getElementById('v5age'), d = document.getElementById('v5dash');
      if (a) { var cls = 'v5age' + (age.bad ? ' bad' : ''); if (a.className !== cls) { a.className = cls; } V.setText(document.getElementById('v5age1'), age.a); V.setText(document.getElementById('v5age2'), age.b); V.setText(document.getElementById('v5age3'), age.c); }
      if (d) { V.setHtml(d, dash()); }
      paintPanels(); setBuilt(builtIso);
    }
  };
})();
