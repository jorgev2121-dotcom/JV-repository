/* vtes5-ui.js - live parts of Jorge's v3 launcher: state lines on every card, big copy buttons, address lines, bot lines, panels, Miami-Dade. TRK-2026-9910-B. ASCII only.
   Static facts only here (names, how to open, typed notes with their date). NO status words are typed: state comes from VTES5 (data files). */
(function () {
  var V = window.VTES5, esc = V.esc;
  /* flaw N13: the Grok history is a typed note, labelled with its date. The live sentence is the only part this page knows. */
  var GROK_TYPED = 'Typed note, dated 2026-10-06 (carried from the v4 build, which cites the registry brief of 2026-10-06; not checked by this page): no Grok bot had been built, although one was asked for many times, and Grok chat had been unproven for 31 days.';
  function botsBuilt() { return V.executor('BOTS').state === 'OK'; }
  function grokText() { return 'Grok is chat only. Live check: ' + (botsBuilt() ? 'a Grok bot is reporting UP with proof.' : 'no Grok bot is reporting UP with proof (' + V.executor('BOTS').text + ').') + ' ' + GROK_TYPED; }
  var NOTE_PRE = 'Typed note, not live: ';
  /* fix round 6, flaw 2 (Tier 2: the instruction to save client data into G:\My Drive\VTES-Inbox-LOCAL is REMOVED: Google Drive for desktop uploads every file in that folder to Google).
     The page now says plainly that the LOCAL save step is BLOCKED / UNVERIFIED until the desktop executor (RAMBO) records, in the heartbeat file, a folder that is NOT inside Google Drive, OneDrive or another syncing folder. */
  var CLOUD_RE = /google\s*drive|my\s*drive|onedrive|dropbox|icloud|box\s*sync|\bsync/i;
  var LOCAL_LIMIT_MIN = 26 * 60;
  function localFolder() {
    var h = V.status('heartbeat'), lf = (h.state === 'OK' && h.data) ? h.data.local_only_folder : null, none = 'BLOCKED - UNVERIFIED. ';
    if (h.state !== 'OK') { return { cls: 'bad', ok: false, text: none + 'The PC has not reported whether a local-only folder exists (heartbeat file: ' + h.state + '). Do not save client personal data in any file.' }; }
    if (!lf || lf.ok !== true) { return { cls: 'bad', ok: false, text: none + 'The desktop executor (RAMBO) has not confirmed a local-only folder: one that is NOT inside Google Drive, OneDrive or any other folder that uploads to the cloud. Until it does, do not save client personal data in any file.' }; }
    var label = String(lf.label == null ? '' : lf.label);
    if (!label || CLOUD_RE.test(label)) { return { cls: 'bad', ok: false, text: none + 'The folder the PC reports ("' + label + '") has no name or looks like a cloud-synced folder. Client personal data must not go there.' }; }
    var j = V.dateJudge(lf.checked_at, { type: 'past', limitMin: LOCAL_LIMIT_MIN, what: 'local-folder check time' }, null);
    if (j) { return { cls: 'bad', ok: false, text: none + 'The local-only folder confirmation is not usable: ' + j.text + '.' }; }
    return { cls: 'ok', ok: true, label: label, text: 'CONFIRMED by the desktop executor as of ' + V.fmtIso(lf.checked_at) + ': a local-only folder exists, named "' + label + '" (outside Google Drive and OneDrive). The PC reports it; this page cannot see the folder itself.' };
  }
  function localSteps() {
    var lf = localFolder(), out = ['There is no window. Press the button to copy the packet. It then sits on this PC\'s clipboard until you paste it.',
      'Do NOT paste this packet into any Claude window, into Cowork, into Codex or Grok, and do not press the blue RAMBO button for it: client personal data goes to LOCAL only.'];
    if (!lf.ok) {
      out.push('STOP HERE. Saving it as a file is BLOCKED (UNVERIFIED): no local-only folder is confirmed. Do NOT save it in Google Drive or OneDrive (they upload files to the cloud), and do not use the folder VTES-Inbox-LOCAL while it is inside Google Drive. Nothing for you to do: the desktop executor (RAMBO) creates or confirms a folder outside every syncing folder and records it in the heartbeat file (DESKTOP-WORK item 11 (local-only folder)). This line then says CONFIRMED.');
    } else {
      out.push('In File Explorer, open the local-only folder named "' + lf.label + '" (the desktop executor confirmed it is outside Google Drive and OneDrive).',
        'FIRST turn on file name extensions: click View, then Show, then File name extensions. Otherwise a name ending in .md is saved as .md.txt and the job is never picked up.',
        'Right-click an empty spot, click New, click Text Document, name it JOB-something.md, press Enter (click Yes if Windows asks about changing the extension). Check the name ends in .md and not in .md.txt. Open it, press Ctrl+V and save.');
    }
    out.push('The v3 page says the job file needs a line starting CLASS: and a line starting PROMPT: (typed from v3, UNVERIFIED). The packet does not have them. A helper that adds them, running only on this PC, is still to be built (DESKTOP-WORK item 9 (LOCAL jobs)). Note: v3 says the bot CU-Local-Executor watches VTES-Inbox-LOCAL; if that folder is inside Google Drive, that lane uploads client data too (KNOWN-LIMITS item 35 (LOCAL)).');
    return out;
  }
  function getSteps(m) { return m.stepsFn ? m.stepsFn() : m.steps; }
  /* META: which data-file key gives the card its state (live), the plain click path for windows a web page cannot open (steps), the vtes:// fix sentence, typed notes.
     Every steps text is the v3 "how to open" line written out in plain words; whether it is still right on the PC is UNVERIFIED. */
  var META = {
    'LLM-01': { live: 'LLM-01', tick: true, desk: 'RAMBO',
      steps: ['On the PC, open the Claude desktop app (or click the green D icon near the clock).', 'Click the Code tab.', 'If the app lists several sessions, pick the one named RAMBO (typed advice, UNVERIFIED).', 'Click in the message box.', 'Press Ctrl+V.'],
      fix: 'Nothing for you to do. The desktop executor (RAMBO) sets this up. This card then turns into a link by itself.',
      rambo: 'For RAMBO: fill in the address book entry for LLM-01, run VTES-Open.ps1 -Install once (no admin) and record both in the heartbeat file.' },
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
      steps: ['First time only: double-click the desktop shortcut named "Codex - sign in (Jorge)" and follow the sign-in window that opens (typed from v3, UNVERIFIED on this PC).',
        'The desktop executor (RAMBO) opens Codex and runs the packet (UNVERIFIED that it can on this PC). You type no command. Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
        'Only if the note holds no client personal data. The page refuses to put an obvious Social Security number into this packet.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-06 and registers the vtes:// addresses.' },
    'LLM-07': { live: 'LLM-07', grok: true, fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-07 and registers the vtes:// addresses.',
      next: 'Next step: RAMBO sends Grok one test message and writes the result into the heartbeat file; until then this card stays red.' },
    'LLM-08': { live: 'LLM-08', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-08 and registers the vtes:// addresses.' },
    'LLM-09': { live: 'LLM-09', noaddr: true },
    'LOCAL': { live: 'LOCAL', bot: 'CU-Local-Executor', desk: 'LOCAL', localfolder: true, stepsFn: localSteps },
    'CODEX': { live: 'LLM-06', desk: 'CODEX',
      steps: ['First time only: double-click the desktop shortcut named "Codex - sign in (Jorge)" and follow the sign-in window that opens (typed from v3, UNVERIFIED on this PC).',
        'The desktop executor (RAMBO) opens Codex and runs the packet (UNVERIFIED that it can on this PC). You type no command. Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
        'Only if the note holds no client personal data. The page refuses to put an obvious Social Security number into this packet.'],
      s3: ' Proven 2026-10-01.',
      note: NOTE_PRE + 'v3 says "Proven 2026-10-01" (not checked by this page).' },
    'RAMBO': { live: 'LLM-01', tick: true, bot: 'CU-Inbox-Job-Watcher', desk: 'RAMBO',
      steps: ['On the PC, open the Claude desktop app (or click the green D icon near the clock).', 'Click the Code tab.', 'If the app lists several sessions, pick the one named RAMBO (typed advice, UNVERIFIED).', 'Click in the message box.', 'Press Ctrl+V.', 'Or, by hand: FIRST turn on file name extensions (File Explorer, click View, then Show, then File name extensions), so that a name ending in .md is not saved as .md.txt. Then open Google Drive, open the folder VTES-Inbox, right-click an empty spot, click New, click Text Document, name it JOB-something.md, press Enter, and check the name ends in .md and not in .md.txt. Open it, press Ctrl+V and save. (This is for a packet with no client personal data: it goes to RAMBO, which is Claude.)'],
      rambo: 'For RAMBO: when you create a JOB file yourself, create it with its exact name using your own file tools, then read the name back and write it in the report. Never use a New Text Document with hidden extensions.',
      s3: ' About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday.',
      note: NOTE_PRE + 'on 2026-10-01 v3 said about 75% of the Max quota was used and forecast it to run out on a Saturday. That date has passed. The live burn rate is in the Token monitor panel under Bots.' },
    'GROK': { live: 'LLM-07', grok: true, desk: 'GROK',
      steps: ['Press the button to copy the packet.', 'Open grok.com in your browser, click in the message box and press Ctrl+V.', 'Never for client personal data: that goes to LOCAL only. The page refuses to put an obvious Social Security number into this packet.'] },
    'COWORK': { live: 'LLM-03', desk: 'Cowork', toId: 'LLM-03',
      steps: ['On the PC, open the Claude desktop app (or click the orange X icon near the clock).', 'Click the Cowork tab.', 'Click in the message box.', 'Press Ctrl+V.'] },
    'CHIEF': { live: 'CHIEF', bot: 'CU-Orchestrator', nobtn: true }
  };
  var BOTKEY = { 'CU-Inbox-Job-Watcher': { live: null }, 'CU-Local-Executor': {}, 'CU-TokenMonitor-Hourly': {}, 'CU-Orchestrator': {}, 'CU-Propagation-Check': {}, 'VTES-LOCAL-POLLER': { tick: true } };
  /* green only for OK; grey for UNPROVEN and NOT RUN; neutral blue for RUNNING and QUEUED (flaws F2, N17); grey-red for STUCK (flaw N2); everything else is red */
  /* fix round 6: the colour of a state comes from ONE function in vtes5-live.js (V.clsOfState); nothing here decides a colour on its own */
  function stCls(e) { return V.clsOfState(e.state); }
  var RANK = { ok: 0, neu: 1, unp: 1, bad: 2, stk: 2 };
  /* flaw F6: a role card with its own bot shows ONE answer. The class is the worse of the window and the bot; the sentence names both. */
  function comboState(m) {
    var e = V.executor(m.live), b = V.bot(m.bot), ce = stCls(e), cb = stCls(b), cls = RANK[cb] > RANK[ce] ? cb : ce, txt;
    /* flaw N14: one sentence, one answer. "not fine" is said only when the bot really is red (failed, late, disabled, stuck, no data); a running, queued or not-yet-run bot is described by its own words. */
    if (e.state === 'OK' && (cb === 'bad' || cb === 'stk')) { txt = 'The window is up (' + e.text + '), but its bot ' + m.bot + ' is NOT FINE: ' + b.text; }
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
      return '<span class="v5na" data-na="' + esc(w.id) + '">Address ' + esc(w.a) + ' does not open yet: ' + esc(why) + '. ' + (m.fix ? 'What fixes it: ' + esc(m.fix) : '') + (m.rambo ? ' <i class="v5forrambo">' + esc(m.rambo) + '</i>' : '') + '</span>';
    }
    return '<b>' + esc(w.a) + '</b>';
  }
  function steps(m) { var st = getSteps(m); return st ? '<ol class="v5steps"' + (m.stepsFn ? ' data-localsteps="1"' : '') + '>' + st.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' : ''; }
  function botLine(name) { var b = V.bot(name); return '<div class="v5st ' + stCls(b) + '" data-files="bots" data-bot="' + esc(name) + '"><b>Bot ' + esc(name) + ':</b> ' + esc(b.text) + '</div>'; }
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
    var body = '<div class="v5st ' + stCls(e) + '" data-files="heartbeat" data-state="' + esc(w.id) + '">' + stateHtml(e) + '</div>' +
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
    var lfl = m.localfolder ? localFolder() : null;
    var body = '<div class="v5st ' + cs.cls + '" data-files="' + (m.bot ? 'heartbeat bots' : 'heartbeat') + '" data-state="' + esc(w.id) + '"' + (m.bot ? ' data-botname="' + esc(m.bot) + '"' : '') + '>' + cs.html + '</div>' +
      (lfl ? '<div class="v5st ' + lfl.cls + '" data-files="heartbeat" data-localfolder="1"><b>LOCAL save step:</b> ' + esc(lfl.text) + '</div>' : '') +
      (m.rambo ? '<p class="v5note v5forrambo">' + esc(m.rambo) + '</p>' : '') +
      '<p>' + j + '</p>' + (m.grok ? '<p class="v5note" data-grok="1">' + esc(grokText()) + '</p>' : '') + (m.note ? '<p class="v5note">' + esc(m.note) + '</p>' : '') +
      '<div class="pool ' + esc(w.cls) + '">Pool: ' + esc(w.pool) + '</div><div class="tags">' + esc(w.t) + '</div>' + (w.a ? (/^(codex exec|Second-Opinion\.ps1)/.test(w.a) ? '<div class="addr v5forrambo">For RAMBO only (typed in v3; the desktop executor runs it, you type nothing): <b>' + esc(w.a) + '</b></div>' : '<div class="addr">Address: <b>' + esc(w.a) + '</b></div>') : '') +
      big + (m.nobtn ? '' : '<button class="btn alt" data-to="' + esc(to === w.id ? w.id : to) + '" type="button">Hand work here</button>') +
      (big ? '<div class="v5na2">Steps:' + steps(m) + '</div>' : '') + '<div class="paste v5cs" data-cs="' + esc(w.id) + '" role="status"></div>';
    return card(w, m, body);
  }
  function botCard(b) {
    var name = b[0], bk = BOTKEY[name] || {};
    return '<div class="card" data-k="bot scheduled agent ' + esc((name + ' ' + b[1]).toLowerCase()) + '" id="bot-' + esc(name) + '"><div class="id">BOT</div><div class="name">' + esc(name) + '</div><p>' + esc(b[1]) + '</p>' +
      botLine(name) + (bk.tick ? '<div class="v5note" data-hbtick="1">Heartbeat interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the heartbeat file).</div>' : '') +
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
    Array.prototype.forEach.call(document.querySelectorAll('.v5st[data-localfolder]'), function (st) {
      var lf = localFolder(), c2 = 'v5st ' + lf.cls; if (st.className !== c2) { st.className = c2; } V.setHtml(st, '<b>LOCAL save step:</b> ' + esc(lf.text));
    });
    Array.prototype.forEach.call(document.querySelectorAll('ol[data-localsteps]'), function (ol) { V.setHtml(ol, localSteps().map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('')); });
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
    'Client personal data goes to LOCAL only. This page checks the DIGITS of your note before it builds any packet except one for LOCAL: it leaves the note out when it finds nine digits in a row (written any way: with dashes, dots, spaces, full-width digits or letters stuck on), a long card-like number, or a date of birth beside a long number. It can also leave out a harmless nine-digit number such as a permit number. The packet then says why. It cannot catch a name or an address.',
    'The line "WHOLE PAGE" at the top of Live status is never greener than the worst card or panel on this page. If one card is red, it is not green.',
    'Words marked typed note were typed by hand on the date shown. This page does not check them.',
    'Every time is Eastern time with the zone. The year is added when it is not this year.'
  ];
  /* ---- fix round 6, flaw 3 (Tier 3, fail closed): the personal-data guard works on the DIGITS, not on a pattern.
     The note is normalised (NFKC: full-width and compatibility digits and spaces become plain ones; every other-script decimal digit becomes 0-9; zero-width characters are dropped), then every run of digit groups
     joined by single separators (hyphen, any dash, dot, middle dot, underscore, space, tab) is measured. Letters that look like digits (O o I l | S B Z) count only when stuck to real digits, and the run is measured twice,
     once with them and once without, so letters glued on in front or behind cannot hide it. It BLOCKS (leaves the note out of every packet except one for LOCAL):
       R1 a run of exactly 9 digits (an SSN, ITIN or EIN written any way), except a ZIP+4 after a state code or a year-first permit number (2024-12345);
       R2 a run of 15 to 19 digits (a card number), or 13 or 14 digits that pass the Luhn check and are not shaped like a Miami-Dade folio (2-4-3-4);
       R3 an SSN word (ssn, ss#, s.s.n, social security, soc sec) within 40 characters of 9 or more digits;
       R4 nine spelled-out digit words in a row ("one two three ...");
       R5 a date-of-birth word with a date and any run of 8 or more digits.
     A phone number (10 or 11 digits) and a folio (13 digits shaped 30-4021-001-0010) are carried. The price is a false alarm on any other nine-digit number (KNOWN-LIMITS). */
  var STATES = 'AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY PR GU VI'.split(' ');
  var NDRUNS = null;
  /* every Unicode decimal digit (category Nd) -> 0..9: the digits come in runs of ten, the value is the offset in the run */
  function ndInit() {
    NDRUNS = []; var re = /^\p{Nd}$/u, start = -1;
    for (var code = 0x30; code <= 0x1FFFF; code++) {
      var isNd = re.test(String.fromCodePoint(code));
      if (isNd && start < 0) { start = code; }
      if (!isNd && start >= 0) { NDRUNS.push([start, code - 1]); start = -1; }
    }
  }
  function asciiDigits(str) {
    if (!NDRUNS) { try { ndInit(); } catch (e) { NDRUNS = []; } }
    return str.replace(/\p{Nd}/gu, function (ch) {
      var code = ch.codePointAt(0);
      for (var i = 0; i < NDRUNS.length; i++) { if (code >= NDRUNS[i][0] && code <= NDRUNS[i][1]) { return String((code - NDRUNS[i][0]) % 10); } }
      return '0';
    });
  }
  function normNote(raw) {
    var t = String(raw == null ? '' : raw);
    try { t = t.normalize('NFKC'); } catch (e) { }
    t = t.replace(new RegExp('[\\u00ad\\u200b-\\u200f\\u2028\\u2029\\u2060\\ufeff]', 'g'), '');
    t = asciiDigits(t);
    return t.replace(new RegExp('[\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000]', 'g'), ' ');
  }
  function luhn(d) { var sum = 0, alt = false; for (var i = d.length - 1; i >= 0; i--) { var n = +d.charAt(i); if (alt) { n *= 2; if (n > 9) { n -= 9; } } sum += n; alt = !alt; } return sum % 10 === 0; }
  var TOKC = '[0-9OoIl|SBZ]*[0-9][0-9OoIl|SBZ]*', SEPC = '(?:[ \\t]*[-\\u2010-\\u2015\\u2212\\u2043\\ufe58\\ufe63.\\u00b7\\u2022_][ \\t]*|[ \\t]{1,3})';
  var SSN_WORD = /(?:^|[^a-z])(?:ssn|ss\s*#|s\.\s*s\.\s*n|social\s*sec|soc\.?\s*sec|ss)(?![a-z])/i;
  var DOB_WORD = /(?:^|[^a-z])(?:dob|d\.o\.b|date\s+of\s+birth|born)(?![a-z])/i, DATE_PAT = /\d{1,2}\s*[\/\-.]\s*\d{1,2}\s*[\/\-.]\s*\d{2,4}|\d{4}\s*-\s*\d{1,2}\s*-\s*\d{1,2}|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{1,2}/i;
  var WORDS = /\b(?:zero|oh|one|two|three|four|five|six|seven|eight|nine)(?:[\s,.\-]+(?:zero|oh|one|two|three|four|five|six|seven|eight|nine)\b){8,}/i;
  function runsOf(t) {
    var re = new RegExp('(?:' + TOKC + ')(?:' + SEPC + TOKC + ')*', 'g'), out = [], m;
    while ((m = re.exec(t)) !== null) {
      var txt = m[0], toks = txt.split(new RegExp(SEPC)), real = 0, like = 0, groups = [], realGroups = [];
      toks.forEach(function (k) { var r = k.replace(/[^0-9]/g, '').length; real += r; like += k.length; groups.push(k.length); realGroups.push(r); });
      out.push({ txt: txt, at: m.index, end: m.index + txt.length, real: real, like: like, groups: groups, realGroups: realGroups, digits: txt.replace(/[^0-9]/g, '') });
    }
    return out;
  }
  function piiReasons(raw) {
    var t = normNote(raw), why = [];
    if (!t) { return why; }
    var runs = runsOf(t);
    runs.forEach(function (r) {
      var before = t.slice(Math.max(0, r.at - 60), r.at), after = t.slice(r.end, r.end + 40), near = before.slice(-40) + ' ' + after;
      var isNine = (r.real === 9 || r.like === 9), folio = (r.real === 13 && r.realGroups.join('-') === '2-4-3-4');
      var zip4 = (r.realGroups.join('-') === '5-4' && /-/.test(r.txt) && new RegExp('(?:^|[^A-Za-z])(' + STATES.join('|') + ')[ ,]*$').test(before) && !SSN_WORD.test(near));
      var permit = (r.realGroups.join('-') === '4-5' && /^(19|20)\d\d/.test(r.digits) && !SSN_WORD.test(near));
      if (isNine && !zip4 && !permit) { why.push('a run of 9 digits'); }
      if (r.real >= 15 && r.real <= 19) { why.push('a card-like number'); }
      else if ((r.real === 13 || r.real === 14) && !folio && luhn(r.digits)) { why.push('a card-like number'); }
      if (r.real >= 9 && SSN_WORD.test(near)) { why.push('an SSN word beside 9 or more digits'); }
      if (r.real >= 8 && DOB_WORD.test(near + ' ' + t.slice(Math.max(0, r.at - 80), r.at)) && DATE_PAT.test(t)) { why.push('a date of birth beside a long number'); }
    });
    if (DOB_WORD.test(t) && DATE_PAT.test(t) && runs.some(function (r) { return r.real >= 8; }) && why.indexOf('a date of birth beside a long number') < 0) { why.push('a date of birth beside a long number'); }
    if (WORDS.test(t)) { why.push('nine spelled-out digits in a row'); }
    return why.filter(function (x, i, a) { return a.indexOf(x) === i; });
  }
  function guardNote(note, toId) {
    if (toId === 'LOCAL') { return note; }
    var why = piiReasons(note);
    if (!why.length) { return note; }
    return '(NOT INCLUDED: the note looks like client personal data (' + why.join('; ') + '). This page keeps it out of every packet except one for LOCAL. Client personal data goes to LOCAL only. If this is a false alarm, take the long number out of the note and press the button again.)';
  }
  function mark(cls, t, file) { return '<span class="v5b ' + cls + '"' + (file ? ' data-files="' + file + '"' : '') + '>' + esc(t) + '</span>'; }
  function num(x, suffix) { return (typeof x === 'number' && isFinite(x)) ? x + (suffix || '') : null; }
  function red(t, file) { return mark('bad', t, file); }
  function val(x, suffix) { var n = num(x, suffix); return n === null ? red('NO DATA') : '<b>' + esc(n) + '</b>'; }
  /* a number outside the range that can be true is IMPOSSIBLE (flaw N3); a number from a file that is not fresh is OLD (flaw 8): never a plain value, never green */
  function valR(x, suffix, min, max, whole, fresh, file) {
    var n = num(x, suffix); if (n === null) { return red('NO DATA', file); }
    if (x < min || (max !== undefined && x > max) || (whole && Math.floor(x) !== x)) { return red('IMPOSSIBLE (' + n + ')', file); }
    if (fresh === false) { return red('OLD ' + n, file); }
    return '<b>' + esc(n) + '</b>';
  }
  /* flaws 6, 7, 8: a date shown as a value goes through the ONE rule V.dateJudge: fine = plain bold time, anything else = a red mark that says why (never green, never plain) */
  function dateVal(iso, o, file) {
    var j = V.dateJudge(iso, o, null), t = V.fmtIso(iso);
    if (!j) { return '<b>' + esc(t) + '</b>'; }
    return red(j.kind === 'NO DATA' || !t ? 'NO DATA' : j.kind + ' - ' + t, file);
  }
  var OLDSENT = 'These numbers are old. Do not trust them.';
  function noNums(s) { return s.state === 'NO DATA' || s.state === 'BAD CLOCK' || (s.state === 'NOT OK' && !s.data); }
  function tokens() {
    var s = V.status('tokens'), d = s.data || {}, ok = s.state === 'OK', pastReset = ok && V.dateJudge(d.window_resets_at, { type: 'due', what: 'x' }, null);
    var rows = (d.programs || []).map(function (p) { return '<tr><td>' + esc(p.name) + '</td><td>' + valR(p.tokens_today, '', 0, undefined, false, ok) + '</td></tr>'; }).join('');
    return '<div class="pn" id="pn-tokens" data-files="tokens"><h3>Token monitor (bot CU-TokenMonitor-Hourly)</h3><p>' + V.badge('tokens', 'Reporting') + '</p>' +
      (noNums(s) ? '<p>' + red(s.state === 'BAD CLOCK' ? 'BAD CLOCK' : 'NO DATA') + ' ' + (s.state === 'BAD CLOCK' ? 'The token report is dated in the future, so none of its numbers are shown.' : 'The token monitor has not written its report file (data\\vtes5-tokens.js). No burn rate is shown because none was measured.') + '</p>' :
        '<p>Burn rate per hour: ' + valR(d.burn_per_hour, '', 0, undefined, false, ok) + ' tokens. This window used: ' + valR(d.window_used_pct, '%', 0, 100, false, ok) + '. This week used: ' + valR(d.week_used_pct, '%', 0, 100, false, ok) + '. Window resets: ' + dateVal(d.window_resets_at, { type: 'due', what: 'window reset time' }) + '.' +
        (pastReset ? ' ' + red('The reset time has already gone by, so these numbers belong to a finished window. Do not trust them.') : '') + '</p>' +
        '<table><tr><th>Program</th><th>Tokens today</th></tr>' + (rows || '<tr><td colspan="2">' + red('NO DATA') + '</td></tr>') + '</table>' +
        (ok ? '' : '<p>' + red(OLDSENT) + '</p>')) + '</div>';
  }
  function housekeeping() {
    var s = V.status('housekeeping'), d = s.data || {}, ok = s.state === 'OK';
    return '<div class="pn" id="pn-house" data-files="housekeeping"><h3>Housekeeping agent</h3><p>' + V.badge('housekeeping', 'Reported') + '</p>' +
      (noNums(s) ? '<p>' + red(s.state === 'BAD CLOCK' ? 'BAD CLOCK' : 'NO DATA') + ' ' + (s.state === 'BAD CLOCK' ? 'The housekeeping report is dated in the future, so it is not shown.' : 'No housekeeping report has ever been recorded here.') + ' Last report time: ' + red('NONE') + '.</p>' :
        '<p>Last report: ' + dateVal(d.last_report_at, { type: 'past', limitMin: V.LIMIT_MIN.housekeeping, what: 'last-report time' }) + '. Delivered: ' + (d.report_delivered === true ? '<b>yes</b>' : (d.report_delivered === false ? red('NO - not delivered') : red('UNKNOWN'))) + (d.delivered_to ? ' to ' + esc(d.delivered_to) : '') + '. Items cleaned: ' + valR(d.items_cleaned, '', 0, undefined, true, ok) + '.</p>' + (ok ? '' : '<p>' + red(OLDSENT) + '</p>')) + '</div>';
  }
  function health() {
    var s = V.status('health'), d = s.data || {}, st = V.status('state'), sd = (st.state === 'OK' || st.state === 'STALE') ? (st.data || {}) : {}, hOk = s.state === 'OK', sOk = st.state === 'OK';
    var okCounts = typeof d.checks_passed === 'number' && typeof d.checks_total === 'number' && d.checks_total > 0 && d.checks_passed >= 0 && d.checks_passed <= d.checks_total && Math.floor(d.checks_passed) === d.checks_passed && Math.floor(d.checks_total) === d.checks_total;
    var pct = okCounts ? d.checks_passed + ' of ' + d.checks_total + ' health checks passed (' + Math.round(100 * d.checks_passed / d.checks_total) + '%)' : null;
    var impossible = (typeof d.checks_passed === 'number' && typeof d.checks_total === 'number' && !okCounts);
    var up = 0, seen = 0; V.ALL_IDS.forEach(function (id) { var e = V.executor(id); if (e.state === 'OK') { up++; } if (e.state !== 'NO DATA') { seen++; } });
    var money = (sd.money || []).map(function (m) { return '<li>' + (sOk ? '' : red('OLD', 'state') + ' ') + esc(m.item) + ': ' + esc(m.status) + '</li>'; }).join('');
    var upTxt = up + ' of ' + V.ALL_IDS.length;
    return '<div class="pn" id="pn-health" data-files="health"><h3>Health and state</h3><p>' + V.badge('health', 'Report') + ' ' + V.badge('state', 'State') + '</p>' +
      '<p>Windows confirmed up now: ' + (seen === 0 ? red('NO DATA', 'heartbeat') + ' (no window has reported)' : (up === V.ALL_IDS.length ? '<b>' + upTxt + '</b>' : red(upTxt, 'heartbeat'))) + '. This counts the windows and roles on this page, not tasks.</p>' +
      '<p>Health report: ' + (pct ? (hOk ? '<b>' + esc(pct) + '</b>' : red('OLD ' + pct)) : (impossible ? red('IMPOSSIBLE (' + d.checks_passed + ' of ' + d.checks_total + ')') : red('NO DATA'))) + '. Daily report sent: ' + dateVal(d.report_sent_at, { type: 'past', limitMin: V.LIMIT_MIN.health, what: 'daily-report-sent time' }) + '.' + (hOk || !pct ? '' : ' ' + red(OLDSENT)) + '</p>' +
      '<p>Open items: ' + valR(sd.open_items, '', 0, undefined, true, sOk, 'state') + '. In progress: ' + valR(sd.in_progress, '', 0, undefined, true, sOk, 'state') + '. Blocked: ' + valR(sd.blocked, '', 0, undefined, true, sOk, 'state') + '.' + (st.state === 'STALE' ? ' ' + red(OLDSENT, 'state') : '') + '</p>' +
      '<p>Money items (read from the state file, not typed):</p>' + (money ? '<ul>' + money + '</ul>' : '<p>' + red('NO DATA', 'state') + '</p>') + '</div>';
  }
  function repairsLive() {
    var st = V.status('state'), sd = (st.state === 'OK' || st.state === 'STALE') ? (st.data || {}) : {}, rep = sd.repairs || [], sOk = st.state === 'OK';
    var li = rep.map(function (r) { return '<li>' + (sOk ? '' : red('OLD') + ' ') + esc(r.status) + ': ' + esc(r.text) + '</li>'; }).join('');
    return '<div class="pn" id="pn-repairs-live" data-files="state"><h3>Live repair rows (read from the state data file, none typed)</h3><p>' + V.badge('state', 'State') + '</p>' + (li ? '<ul>' + li + '</ul>' + (sOk ? '' : '<p>' + red(OLDSENT) + '</p>') : '<p>' + red('NO DATA') + ' No data file supplies repair rows, so none are shown. The table above is the hand-typed log.</p>') + '</div>';
  }
  /* flaw 6: a source is "proof checked" (green) only when proof_ok is true AND its own checked_at is a valid time within 7 days. No date = grey. Older = red. Future = red BAD CLOCK. */
  function mdProof(p) {
    if (p.proof_ok !== true) { return red('PROOF NOT OK'); }
    var j = V.dateJudge(p.checked_at, { type: 'past', limitMin: V.LIMIT_MIN.miamidade, what: 'proof check date' }, null);
    if (!j) { return mark('ok', 'proof checked ' + V.fmtIso(p.checked_at)); }
    if (j.kind === 'NO DATA') { return mark('na', 'PROOF OK BUT NO CHECK DATE: not counted as checked'); }
    return red('PROOF ' + (j.kind === 'BAD CLOCK' ? 'DATE IN THE FUTURE (BAD CLOCK)' : 'OLD (checked ' + V.fmtIso(p.checked_at) + ', more than 7 days ago)'));
  }
  function miami() {
    var s = V.status('miamidade'), d = s.data || {}, counted = (!noNums(s) && typeof d.counted === 'number') ? d.counted : null, impossible = counted !== null && (counted < 0 || counted > 300 || Math.floor(counted) !== counted);
    var fresh = s.state === 'OK', proof = {}; (fresh ? (d.sources || []) : []).forEach(function (x) { var k = ('0' + String(x.id).replace(/\D/g, '')).slice(-2); proof[k] = x; });
    var items = MD.map(function (r) {
      var p = proof[r[0]], chk = fresh ? (p ? ' ' + mdProof(p) : ' ' + red('NOT RE-CHECKED')) : ' ' + mark('na', 'proof not current (the Miami-Dade file is ' + s.state + ')');
      return '<li><b>' + r[0] + ' ' + esc(r[1]) + '</b> - <a href="' + drive(r[2]) + '" target="_blank" rel="noopener">open proof file</a>' + (r[3] ? ' - <i class="v5typed">typed note from 2026-08-16, not re-checked: ' + esc(r[3]) + '</i>' : '') + chk + '</li>';
    }).join('');
    return '<div class="pn" id="pn-miami" data-files="miamidade"><p>' + V.badge('miamidade', 'Counted') + '</p>' +
      '<p>Counted so far: ' + (impossible ? red('IMPOSSIBLE (' + counted + ')') + ' of 300' : '<b>' + (counted === null ? 'unknown' : counted) + ' of 300</b>') + (counted === null ? ' (not counted yet)' : '') + '.</p>' +
      '<p>Each link opens that site\'s proof file in Drive. They are plain text files, not the Orange Tree portal. <a href="' + MD_INDEX + '" target="_blank" rel="noopener">Open the full index document</a>.</p><ol class="md">' + items + '</ol></div>';
  }
  var DASHFILES = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'];
  function dash() { return '<span class="v5b na" id="v5overall" data-overall="1">WHOLE PAGE: checking</span>' + DASHFILES.map(function (n) { return '<span>' + esc(n) + ': ' + V.badge(n, 'OK') + '</span>'; }).join(''); }
  var PANELS = [['v5health', health], ['v5tokens', tokens], ['v5house', housekeeping], ['v5miami', miami], ['v5repairs', repairsLive]];
  /* ---- fix round 6, Tier 3 (enforcement): ONE function reads the page itself, after every paint.
     Items = every state line (.v5st: window cards, role cards, bot lines, the LOCAL save line) and every mark inside a panel (.v5b without data-src). Each item names the data file(s) it uses (data-files).
     A badge for a file (the strip entry and the badge inside its panel) is its own verdict, RAISED to the worst item that uses that file. WHOLE PAGE is the worst of everything.
     So no strip entry, badge or summary can be greener than a card or a mark printed on the same page, whatever the verdict code says. ---- */
  function elCls(el) { var c = (' ' + el.className + ' '); var names = ['stk', 'bad', 'neu', 'unp', 'na', 'ok']; for (var i = 0; i < names.length; i++) { if (c.indexOf(' ' + names[i] + ' ') >= 0) { return names[i]; } } return 'ok'; }
  function filesOf(el) { var f = el.getAttribute('data-files'); if (!f) { var pn = el.closest ? el.closest('.pn[data-files]') : null; f = pn ? pn.getAttribute('data-files') : ''; } return (f || '').split(/\s+/).filter(Boolean); }
  function pageItems() {
    var out = [];
    Array.prototype.forEach.call(document.querySelectorAll('.v5st[data-files]'), function (el) { out.push({ el: el, cls: elCls(el), files: filesOf(el) }); });
    Array.prototype.forEach.call(document.querySelectorAll('.pn .v5b:not([data-src])'), function (el) { out.push({ el: el, cls: elCls(el), files: filesOf(el) }); });
    return out;
  }
  function enforce() {
    var items = pageItems(), all = [], summary = {};
    DASHFILES.forEach(function (n) { summary[n] = items.filter(function (it) { return it.files.indexOf(n) >= 0; }); });
    Array.prototype.forEach.call(document.querySelectorAll('.v5b[data-src]'), function (b) {
      var n = b.getAttribute('data-src'), v = V.verdict(n), lbl = b.getAttribute('data-lbl') || 'OK', its = summary[n] || [];
      var baseCls = V.stripCls(v.cls), baseText = v.cls === 'ok' ? lbl + ' - ' + v.text : v.text, w = V.worstCls(its.map(function (it) { return it.cls; })), cls = baseCls, text = baseText;
      if (V.rankOf(w) > V.rankOf(baseCls)) {
        var reds = its.filter(function (it) { return V.rankOf(it.cls) === 2; }).length, greys = its.filter(function (it) { return V.rankOf(it.cls) === 1; }).length;
        cls = V.stripCls(w); text = 'NOT FINE - ' + reds + ' red and ' + greys + ' grey of ' + its.length + ' cards and marks on this page use the ' + n + ' file' + (v.cls === 'ok' ? ' (the file itself is fresh: ' + v.text + ')' : ': ' + v.text);
      }
      var c2 = 'v5b ' + cls; if (b.className !== c2) { b.className = c2; } V.setText(b, text);
      all.push(cls);
    });
    items.forEach(function (it) { all.push(it.cls); });
    var worst = V.stripCls(V.worstCls(all)), o = document.getElementById('v5overall');
    if (o) {
      var r = items.filter(function (it) { return V.rankOf(it.cls) === 2; }).length, g = items.filter(function (it) { return V.rankOf(it.cls) === 1; }).length;
      var bf = DASHFILES.filter(function (n) { return V.stripCls(V.verdict(n).cls) === 'bad'; }).length;
      var oc = 'v5b ' + worst; if (o.className !== oc) { o.className = oc; }
      V.setText(o, worst === 'ok' ? 'WHOLE PAGE: every one of ' + items.length + ' cards and marks and all 7 files are green' : 'WHOLE PAGE: ' + (worst === 'bad' ? 'NOT FINE' : 'NOT ALL PROVEN') + ' - ' + r + ' red and ' + g + ' grey of ' + items.length + ' cards and marks; ' + bf + ' of 7 files red');
    }
    return worst;
  }
  function ageHtml(age) { return '<span id="v5age1">' + esc(age.a) + '</span><span id="v5age2">' + esc(age.b) + '</span><span id="v5age3">' + esc(age.c) + '</span>'; }
  function setBuilt(builtIso) { var f = document.getElementById('v5fb'); if (f) { V.setText(f, V.builtText(builtIso)); } }
  function paintPanels() { PANELS.forEach(function (p) { V.setHtml(document.getElementById(p[0]), p[1]()); }); }
  /* the one paint: cards, then panels, then the strip, then enforce, then the age line (which reads the enforced answer) */
  function paintAll(builtIso) {
    repaint(); paintPanels(); V.setHtml(document.getElementById('v5dash'), dash());
    var worst = enforce(), age = V.ageLine(builtIso, worst === 'bad'), a = document.getElementById('v5age');
    if (a) { var cls = 'v5age' + (age.bad ? ' bad' : ''); if (a.className !== cls) { a.className = cls; } V.setText(document.getElementById('v5age1'), age.a); V.setText(document.getElementById('v5age2'), age.b); V.setText(document.getElementById('v5age3'), age.c); }
    setBuilt(builtIso);
  }
  window.VTES5U = {
    guardNote: guardNote, piiReasons: piiReasons, enforce: enforce, pageItems: pageItems, MD: MD, META: META, grokText: grokText, botsBuilt: botsBuilt, botsSub: function () { return botsBuilt() ? 'UP (proof)' : 'NOT BUILT'; },
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
          pasteTo(b.getAttribute('data-paste'), b.parentNode.querySelector('.v5cs'), getSteps(m));
        });
      });
    },
    /* measures the tab bar so anchor jumps leave the heading visible (see vtes5.css) */
    measureHeader: function () {
      var t = document.getElementById('tabs'), h = document.getElementById('v5tabhint');
      if (t) { document.documentElement.style.setProperty('--hdr', t.offsetHeight + 'px'); }
      /* flaw N11: when the bar scrolls sideways (some tabs are off the right edge), say so in plain words, under the bar */
      if (t && h) {
        var hidden = t.scrollWidth > t.clientWidth + 2;
        h.style.display = hidden ? 'block' : 'none';
        V.setText(h, hidden ? 'There are ' + t.querySelectorAll('a.tab').length + ' tabs. Some are off the right edge: drag the bar under the tabs to the right, swipe the tabs sideways, or hold Shift and turn the mouse wheel. The amber OLD PANEL tabs are at the end.' : '');
      }
    },
    renderTop: function (builtIso) {
      var age = V.ageLine(builtIso, false);
      /* flaw F5: the RAMBO button sits in its own slot directly under the page title (the build puts #v5rambo right after the h1), above "Read me first" */
      document.getElementById('v5rambo').innerHTML = '<button class="btn" type="button" id="v5rambobtn">Copy packet for RAMBO (Claude Code Desktop Executor)</button><div class="paste v5cs" id="v5ramboout" role="status"></div>';
      document.getElementById('v5top').innerHTML = '<details class="v5read" id="v5read" open><summary>Read me first</summary><ol>' + READ.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></details>' +
        '<h2 id="livestatus">Live status</h2><div class="v5age' + (age.bad ? ' bad' : '') + '" id="v5age">' + ageHtml(age) + '</div><div class="v5dash" id="v5dash"></div><div id="v5health"></div>';
      document.getElementById('v5rambobtn').addEventListener('click', function () { pasteTo('LLM-01', document.getElementById('v5ramboout'), getSteps(META['LLM-01'])); });
      paintAll(builtIso);
    },
    /* every 60 seconds: re-evaluate cards, panels, strip and age line together from the freshly loaded files; only what changed is redrawn (flaw F16) */
    refresh: function (builtIso) { paintAll(builtIso); }
  };
})();
