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
  var CLOUD_RE = /google\s*drive|my\s*drive|shared\s*drives?|onedrive|dropbox|icloud|box\s*sync|\bsync|^\s*[gG]:|^\s*\\\\|\bdesktop\b|\bdocuments\b/i;
  /* fix round 7 (class 4): an ALLOW-style rule. A folder is CONFIRMED only if its name is a plain C:\ path outside Users\<name>\Desktop, OneDrive and Documents,
     or the desktop executor writes local_only_verified_by AND not_synced_proof (a sentence that says how it checked the folder is not synced). G:\, shared drives, Desktop, Documents, OneDrive, Dropbox and My Drive are always refused. */
  var BAD_PATH = /^[a-zA-Z]:\\users\\[^\\]*\\(desktop|onedrive[^\\]*|documents|dropbox[^\\]*)(\\|$)/i;
  function pathOk(label) { return /^[cC]:\\/.test(label) && !BAD_PATH.test(label); }
  var LOCAL_LIMIT_MIN = 26 * 60;
  function localFolder() {
    var h = V.status('heartbeat'), lf = (h.state === 'OK' && h.data) ? h.data.local_only_folder : null, none = 'NOT CONFIRMED. ';
    if (h.state !== 'OK') { return { cls: 'bad', ok: false, text: none + 'The PC has not reported whether a local-only folder exists (PC check-in report: ' + h.state + '). Do not save client personal data in any file.' }; }
    if (!lf || lf.ok !== true) { return { cls: 'bad', ok: false, text: none + 'The desktop executor (RAMBO) has not confirmed a local-only folder: one that is NOT inside Google Drive, OneDrive or any other folder that uploads to the cloud. Until it does, do not save client personal data in any file.' }; }
    var label = String(lf.label == null ? '' : lf.label);
    var proven = !!(lf.local_only_verified_by && String(lf.local_only_verified_by).trim() && lf.not_synced_proof && String(lf.not_synced_proof).trim());
    if (label && !CLOUD_RE.test(label) && !pathOk(label) && !proven) { return { cls: 'bad', ok: false, text: none + 'The folder name the PC reports ("' + label + '") is not a plain C:\\ folder outside Desktop, Documents and OneDrive, and the PC has not given who checked it and how it knows the folder is not synced. Client personal data must not go there.' }; }
    if (!label || CLOUD_RE.test(label)) { return { cls: 'bad', ok: false, text: none + 'The folder the PC reports ("' + label + '") has no name or looks like a cloud-synced folder. Client personal data must not go there.' }; }
    var j = V.dateJudge(lf.checked_at, { type: 'past', limitMin: LOCAL_LIMIT_MIN, what: 'local-folder check time' }, null);
    if (j) { return { cls: 'bad', ok: false, text: none + 'The local-only folder check is not usable: ' + j.text + '.' }; }
    return { cls: 'ok', ok: true, label: label, text: 'CONFIRMED by the desktop executor as of ' + V.fmtIso(lf.checked_at) + ': a local-only folder exists, named "' + label + '" (outside Google Drive and OneDrive). The PC reports it; this page cannot see the folder itself.' };
  }
  function localSteps() {
    var lf = localFolder(), out = ['There is no window. Press the button to copy the packet. It then sits on this PC\'s clipboard until you paste it.',
      'Do NOT paste this packet into any Claude window, into Cowork, into Codex or Grok, and do not press the blue RAMBO button for it: client personal data goes to LOCAL only.'];
    if (!lf.ok) {
      out.push('STOP HERE. Do NOT save this packet as a file anywhere: no folder has been confirmed as safe for client personal data (see the LOCAL save step line above). Do NOT save it in Google Drive or OneDrive: they upload files to the cloud. Nothing for you to do: the desktop executor (RAMBO) checks for a safe folder and reports it, and the LOCAL save step line then changes by itself.');
      out.push('For RAMBO: create or confirm a local-only folder outside every syncing folder (a plain C:\\ path outside Users\\JV\\Desktop, OneDrive and Documents) and record it, with local_only_verified_by and not_synced_proof, under local_only_folder in the heartbeat file (DESKTOP-WORK item 11, local-only folder).');
    } else {
      out.push('Nothing more for you to do: the desktop executor (RAMBO) saves the packet in the confirmed local-only folder (the LOCAL save step line above names it).',
        'For RAMBO: FIRST turn on file name extensions (File Explorer, View, Show, File name extensions), so a name ending in .md is not saved as .md.txt and the job is not missed. Create the file with its exact name using your own file tools, read the name back, and write it in the report.');
    }
    out.push('For RAMBO: v3 says the job file needs a line starting CLASS: and a line starting PROMPT: (typed from v3, UNVERIFIED); the packet does not have them, and the helper that adds them is still to be built (DESKTOP-WORK item 9, LOCAL jobs). v3 says the bot CU-Local-Executor watches VTES-Inbox-LOCAL: if that folder is inside Google Drive, that lane uploads client data too (KNOWN-LIMITS item 35, LOCAL).');
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
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-02 and registers the window shortcuts. This card then turns into a link by itself.' },
    'LLM-03': { live: 'LLM-03', desk: 'Cowork',
      steps: ['On the PC, open the Claude desktop app (or click the orange X icon near the clock).', 'Click the Cowork tab.', 'Click in the message box.', 'Press Ctrl+V.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) finds the Claude desktop app shortcut on the PC, writes it into the address book entry for LLM-03, then registers the window shortcuts. Whether that shortcut lands on the Cowork tab is UNVERIFIED.' },
    'LLM-04': { live: 'LLM-04', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-04 and registers the window shortcuts.' },
    'LLM-05': { live: 'LLM-05', desk: 'the iPhone',
      steps: ['Press the blue button to copy the packet on this PC.', 'Paste it into a new email to yourself and press Send (this page never sends anything for you).', 'On the iPhone, open that email and copy the packet.', 'Open the Claude app, tap in the message box and paste the packet.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-05 and registers the window shortcuts.' },
    'LLM-06': { live: 'LLM-06', desk: 'Codex CLI',
      steps: ['First time only: double-click the desktop shortcut named "Codex - sign in (Jorge)" and follow the sign-in window that opens (typed from v3, UNVERIFIED on this PC).',
        'The desktop executor (RAMBO) opens Codex and runs the packet (UNVERIFIED that it can on this PC). You type no command. Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
        'Only if the note holds no client personal data. The page refuses to put an obvious Social Security number into this packet.'],
      fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-06 and registers the window shortcuts.' },
    'LLM-07': { live: 'LLM-07', grok: true, fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-07 and registers the window shortcuts.',
      next: 'Next step: RAMBO sends Grok one test message and records the result; until then this card stays red.' },
    'LLM-08': { live: 'LLM-08', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-08 and registers the window shortcuts.' },
    'LLM-09': { live: 'LLM-09', noaddr: true },
    'LOCAL': { live: 'LOCAL', bot: 'CU-Local-Executor', desk: 'LOCAL', localfolder: true, stepsFn: localSteps },
    'CODEX': { live: 'LLM-06', desk: 'CODEX',
      steps: ['First time only: double-click the desktop shortcut named "Codex - sign in (Jorge)" and follow the sign-in window that opens (typed from v3, UNVERIFIED on this PC).',
        'The desktop executor (RAMBO) opens Codex and runs the packet (UNVERIFIED that it can on this PC). You type no command. Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
        'Only if the note holds no client personal data. The page refuses to put an obvious Social Security number into this packet.'],
      s3: ' Proven 2026-10-01.',
      note: NOTE_PRE + 'v3 says "Proven 2026-10-01" (not checked by this page).' },
    'RAMBO': { live: 'LLM-01', tick: true, bot: 'CU-Inbox-Job-Watcher', desk: 'RAMBO',
      steps: ['On the PC, open the Claude desktop app (or click the green D icon near the clock).', 'Click the Code tab.', 'If the app lists several sessions, pick the one named RAMBO (typed advice, UNVERIFIED).', 'Click in the message box.', 'Press Ctrl+V.', 'For RAMBO: or, by hand: FIRST turn on file name extensions (File Explorer, click View, then Show, then File name extensions), so that a name ending in .md is not saved as .md.txt. Then open Google Drive, open the folder VTES-Inbox, right-click an empty spot, click New, click Text Document, name it JOB-something.md, press Enter, and check the name ends in .md and not in .md.txt. Open it, press Ctrl+V and save. (This is for a packet with no client personal data: it goes to RAMBO, which is Claude.)'],
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
      if (V.schemeRegistered() && V.addressFilled(w.id)) { return '<a class="btn" href="' + esc(w.a) + '">Open ' + esc(w.n) + ' with one click (a shortcut the PC set up)</a>'; }
      var hb = V.status('heartbeat'), why;
      if (hb.state !== 'OK') { why = 'the PC has not reported whether the shortcuts are set up (PC check-in report: ' + hb.state + ')'; }
      else if (!V.schemeRegistered()) { why = 'the shortcuts are not set up on the PC yet'; }
      else { why = 'the shortcuts are set up, but this window\'s entry is still empty'; }
      return '<span class="v5na" data-na="' + esc(w.id) + '">The one-click shortcut for ' + esc(w.n) + ' does not open yet: ' + esc(why) + '. ' + (m.fix ? 'What fixes it: ' + esc(m.fix) : '') + ' <i class="v5forrambo">For RAMBO: the address is ' + esc(w.a) + '.' + (m.rambo ? ' ' + esc(m.rambo.replace(/^For RAMBO: /, '')) : '') + '</i></span>';
    }
    return '<b>' + esc(w.a) + '</b>';
  }
  function stepLi(x) { return /^For RAMBO:/.test(x) ? '<li class="v5forrambo">' + esc(x) + '</li>' : '<li>' + esc(x) + '</li>'; }
  function steps(m) { var st = getSteps(m); return st ? '<ol class="v5steps"' + (m.stepsFn ? ' data-localsteps="1"' : '') + '>' + st.map(stepLi).join('') + '</ol>' : ''; }
  function botText(b) { return esc(b.text) + (b.tech ? ' <i class="v5forrambo">For RAMBO: ' + esc(b.tech) + '.</i>' : ''); }
  function botLine(name) { var b = V.bot(name); return '<div class="v5st ' + stCls(b) + '" data-files="bots" data-bot="' + esc(name) + '"><b>Bot ' + esc(name) + ':</b> ' + botText(b) + '</div>'; }
  function card(o, m, extra) {
    return '<div class="card" data-k="' + esc((o.k || '').toLowerCase()) + '" id="card-' + esc(o.id) + '"><div class="id">' + esc(o.id) + ' &middot; ' + (o.e || '') + '</div><div class="name">' + esc(o.n) + '</div><div class="role">' + esc(o.r) + '</div>' + (extra || '') + '</div>';
  }
  function hostOf(u) { var m = /^https?:\/\/([^\/]+)/.exec(String(u)); return m ? m[1] : 'a web page'; }
  function llmCard(w) {
    var m = META[w.id] || {}, e = V.executor(m.live || w.id);
    var j = esc(w.j) + (m.tick ? ' Check-in interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the PC check-in report).' : '');
    var open = w.url ? '<a class="btn" href="' + esc(w.url) + '" target="_blank" rel="noopener">' + esc(m.openLabel || ('Open ' + w.n + ' (' + hostOf(w.url) + ')')) + '</a>' : '';
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
    var m = META[w.id] || {}, e = V.executor(m.live), j = esc(w.j) + (m.tick ? ' Check-in interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the PC check-in report).' : '');
    var to = m.toId || w.id, big = (m.desk && !m.nobtn) ? '<button class="btn bigcopy" type="button" data-paste="' + esc(to) + '" data-role="' + esc(w.id) + '">Copy packet for ' + esc(m.desk) + '</button>' : '';
    var cs = m.bot ? comboState(m) : { cls: stCls(e), html: '<b>State of ' + esc(m.live) + ':</b> ' + esc(e.text) };
    var lfl = m.localfolder ? localFolder() : null;
    var body = '<div class="v5st ' + cs.cls + '" data-files="' + (m.bot ? 'heartbeat bots' : 'heartbeat') + '" data-state="' + esc(w.id) + '"' + (m.bot ? ' data-botname="' + esc(m.bot) + '"' : '') + '>' + cs.html + '</div>' +
      (lfl ? '<div class="v5st ' + lfl.cls + '" data-files="heartbeat" data-localfolder="1"><b>LOCAL save step:</b> ' + esc(lfl.text) + '</div>' : '') +
      (m.rambo ? '<p class="v5note v5forrambo">' + esc(m.rambo) + '</p>' : '') +
      '<p>' + j + '</p>' + (m.grok ? '<p class="v5note" data-grok="1">' + esc(grokText()) + '</p>' : '') + (m.note ? '<p class="v5note">' + esc(m.note) + '</p>' : '') +
      '<div class="pool ' + esc(w.cls) + '">Pool: ' + esc(w.pool) + '</div><div class="tags">' + esc(w.t) + '</div>' + (w.a ? (/^(codex exec|Second-Opinion\.ps1|Drop JOB-)/.test(w.a) ? '<div class="addr v5forrambo">For RAMBO only (typed in v3; the desktop executor runs it, you type nothing): <b>' + esc(w.a) + '</b></div>' : '<div class="addr">Address: <b>' + esc(w.a) + '</b></div>') : '') +
      big + (m.nobtn ? '' : '<button class="btn alt" data-to="' + esc(to === w.id ? w.id : to) + '" type="button">Hand work here</button>') +
      (big ? '<div class="v5na2">Steps:' + steps(m) + '</div>' : '') + '<div class="paste v5cs" data-cs="' + esc(w.id) + '" role="status"></div>';
    return card(w, m, body);
  }
  /* fix round 7 (CLASS 1): a card that cannot be drawn is a red box that says so, never an exception that stops the page */
  function safeCard(fn, x, id) {
    try { return fn(x); } catch (e) { return '<div class="card" id="card-' + esc(id) + '"><div class="v5st bad" data-files="heartbeat bots">THIS CARD (' + esc(id) + ') COULD NOT BE DRAWN. Do not trust this page for it.</div></div>'; }
  }
  function botCard(b) {
    var name = b[0], bk = BOTKEY[name] || {};
    return '<div class="card" data-k="bot scheduled agent ' + esc((name + ' ' + b[1]).toLowerCase()) + '" id="bot-' + esc(name) + '"><div class="id">BOT</div><div class="name">' + esc(name) + '</div><p>' + esc(b[1]) + '</p>' +
      botLine(name) + (bk.tick ? '<div class="v5note" data-hbtick="1">Check-in interval: <span class="v5tick">' + esc(V.tick()) + '</span> (read from the PC check-in report).</div>' : '') +
      '<div class="pool ' + esc(b[3]) + '">Pool: ' + esc(b[2]) + '</div></div>';
  }
  /* fills the hand-off packet for window `to` (global packet(), refresh() and copy() of the v3 page) and says plainly where it is */
  function pasteTo(to, outEl, stepsList) {
    var toSel = document.getElementById('to'), fromSel = document.getElementById('from');
    if (!fromSel.value) { fromSel.value = 'LLM-04'; }
    if (!allow(to)) { outEl.textContent = reasonFor(to); applyGate(); return; }
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
  /* each group of repaint work runs on its own: one failing card shows its own red line and the rest still paint */
  function guardEach(sel, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      try { fn(el); } catch (e) { try { el.__v4h = null; el.className = 'v5st bad'; el.setAttribute('data-files', 'heartbeat bots'); el.textContent = 'THIS LINE COULD NOT BE DRAWN. Do not trust it.'; } catch (e2) { } window.__v5errs = (window.__v5errs || 0) + 1; }
    });
  }
  function repaint() {
    guardEach('.v5st[data-state]', function (st) {
      var id = st.getAttribute('data-state'), m = META[id], live = m ? m.live : id;
      if (m && m.bot && st.getAttribute('data-botname')) { var cs = comboState(m), c2 = 'v5st ' + cs.cls; if (st.className !== c2) { st.className = c2; } V.setHtml(st, cs.html); return; }
      var e = V.executor(live), cls = 'v5st ' + stCls(e); if (st.className !== cls) { st.className = cls; }
      var isRole = !!(m && !/^LLM-/.test(id));
      V.setHtml(st, isRole ? '<b>State of ' + esc(live) + ':</b> ' + esc(e.text) : stateHtml(e));
    });
    guardEach('.v5st[data-localfolder]', function (st) {
      var lf = localFolder(), c2 = 'v5st ' + lf.cls; if (st.className !== c2) { st.className = c2; } V.setHtml(st, '<b>LOCAL save step:</b> ' + esc(lf.text));
    });
    guardEach('ol[data-localsteps]', function (ol) { V.setHtml(ol, localSteps().map(stepLi).join('')); });
    guardEach('.v5st[data-bot]', function (st) {
      var b = V.bot(st.getAttribute('data-bot')), cls = 'v5st ' + stCls(b); if (st.className !== cls) { st.className = cls; }
      V.setHtml(st, '<b>Bot ' + esc(st.getAttribute('data-bot')) + ':</b> ' + botText(b));
    });
    guardEach('.v5tick', function (t) { V.setText(t, V.tick()); });
    guardEach('[data-addr]', function (el) {
      var id = el.getAttribute('data-addr'), w = window.LLMS.filter(function (x) { return x.id === id; })[0]; V.setHtml(el, addrHtml(w, META[id] || {}));
    });
    guardEach('[data-grok]', function (el) { V.setText(el, grokText()); });
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
    'This page is built on your v3 launcher. Everything from v3 is still here except one link: the Open Codex CLI link to chatgpt.com, which was removed on purpose because Codex runs on your PC, not in a web page.',
    'A red box that says NO DATA means nothing on the PC has reported yet. Red is the truth, not a bug.',
    'Green appears only when a fresh report file with proof says so. Grey NOT PROVEN means only the simple status writer said up, and it checks nothing.',
    'To hand work to RAMBO, press the big blue RAMBO button directly under the page title. Then open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.',
    'A web page cannot open a desktop app. So desktop windows have a Copy packet button and the exact steps, not an Open button.',
    'Tabs marked OLD PANEL go to a snapshot made on 2026-09-02. They are not live.',
    'Client personal data goes to LOCAL only. Before a note goes anywhere else, you must tick the box under the note box: "This note has NO client personal data". Until it is ticked, the copy and show buttons for that destination are switched off. The tick clears itself when you change the note or the To choice.',
    'As a second check, this page looks at the DIGITS in your note. It leaves the note out when it finds a Social Security number, a card number, a bank, licence or passport number, or a date of birth written in many ways, including spelled out in words, split with commas, or hidden in base64 or hex. It can also leave out a harmless nine-digit number such as a permit number. It CANNOT catch names, home addresses, email addresses, phone numbers, or any identifier written without digits. Only the tick box and you stop those.',
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
     A phone number (10 or 11 digits) and a folio (13 digits shaped 30-4021-001-0010) are carried. The price is a false alarm on any other nine-digit number (KNOWN-LIMITS).
     FIX ROUND 7 (charter Rule 4: a pattern guard can never be complete, so it is now the SECOND layer): the first layer is the confirmation tick (see below). The guard was extended with a loose pass (commas, colons, brackets, many spaces,
     the words then/dash/hyphen, spelled and mixed digits in English and Spanish), base64 and hex, bank, licence and passport words and shapes, and date-of-birth phrases. Combining marks and invisible characters are dropped first. A note over 20,000 characters is blocked (it cannot be checked). */
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
  /* fix round 7: combining marks and every invisible format character (zero-width joiners, the invisible separator U+2063, and so on) are dropped, so digits cannot be pulled apart by them */
  function normNote(raw) {
    var t = String(raw == null ? '' : raw);
    try { t = t.normalize('NFKC'); } catch (e) { }
    t = t.replace(new RegExp('[\\u00ad\\u200b-\\u200f\\u2028\\u2029\\u2060\\ufeff]', 'g'), '');
    try { t = t.replace(/[\p{M}\p{Cf}]/gu, ''); } catch (e) { }
    t = asciiDigits(t);
    return t.replace(new RegExp('[\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000]', 'g'), ' ');
  }
  function luhn(d) { var sum = 0, alt = false; for (var i = d.length - 1; i >= 0; i--) { var n = +d.charAt(i); if (alt) { n *= 2; if (n > 9) { n -= 9; } } sum += n; alt = !alt; } return sum % 10 === 0; }
  var TOKC = '[0-9OoIl|SBZ]*[0-9][0-9OoIl|SBZ]*', SEPC = '(?:\\s*[-\\u2010-\\u2015\\u2212\\u2043\\ufe58\\ufe63.\\u00b7\\u2022_/]\\s*|\\s{1,3})';
  var SSN_WORD = /(?:^|[^a-z])(?:ssn|ss\s*#|s\.\s*s\.\s*n|social\s*sec|soc\.?\s*sec|seguro\s*social|itin|tax\s*id|ss)(?![a-z])/i;
  var ID_WORD = /(?:^|[^a-z])(?:passport|pasaporte|licen[cs]e|licencia|driver'?s?|dl\s*#|account|acct|a\/c|routing|aba|iban|swift|bank|cuenta|banco)(?![a-z])/i;
  var DOB_WORD = /(?:^|[^a-z])(?:dob|d\.o\.b|date\s+of\s+birth|birth\s*date|birthday|born|fecha\s+de\s+nacimiento|nacido|nacida)(?![a-z])/i;
  var MON = '(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';
  var DATE_PAT = new RegExp('\\d{1,2}\\s*[\\/\\-.]\\s*\\d{1,2}\\s*[\\/\\-.]\\s*\\d{2,4}|\\d{4}\\s*-\\s*\\d{1,2}\\s*-\\s*\\d{1,2}|' + MON + '\\s+\\d{1,2}|\\d{1,2}\\s+' + MON, 'i');
  var DW = '(?:zero|oh|one|two|three|four|five|six|seven|eight|nine)', WORDS = new RegExp('\\b' + DW + '(?:[\\s,.\\-]+(?:(?:dash|hyphen)[\\s,.\\-]+)?' + DW + '\\b){8,}', 'i');
  /* a phone number is carried, and it is taken out of the text first, so that a ZIP code written just before it ("Miami FL 33186 305-555-1234") does not join it into one long number */
  var PHONE_RE = /(?<![0-9])(?:\+?1[ .\-]?)?(?:\([0-9]{3}\)[ .\-]?|[0-9]{3}[ .\-])[0-9]{3}[ .\-][0-9]{4}(?![0-9])/g;
  function maskPhones(t) { try { return t.replace(PHONE_RE, ' PHONE '); } catch (e) { return t; } }
  var NOT_CITY = /^(?:Order|Ref|Reference|Invoice|Account|Acct|Number|Num|No|Id|Tax|Social|Ssn|Itin|Ein|Check|Case|Job|Folio|Permit|Item|Lot|Unit|Routing)$/;
  function runsOf(t) {
    var re = new RegExp('(?:' + TOKC + ')(?:' + SEPC + TOKC + ')*', 'g'), out = [], m;
    while ((m = re.exec(t)) !== null) {
      var txt = m[0], toks = txt.split(new RegExp(SEPC)), real = 0, like = 0, groups = [], realGroups = [];
      toks.forEach(function (k) { var r = k.replace(/[^0-9]/g, '').length; real += r; like += k.length; groups.push(k.length); realGroups.push(r); });
      out.push({ txt: txt, at: m.index, end: m.index + txt.length, real: real, like: like, groups: groups, realGroups: realGroups, digits: txt.replace(/[^0-9]/g, '') });
    }
    return out;
  }
  /* the strict-separator rules R1 to R5 (fix round 6), on text with phones taken out. Fix round 7: the ZIP+4 exception no longer needs a state code: a capital-letter word before it is enough ("Miami 33186-1234"), but never a word like Order or Ref. */
  function coreReasons(t, why) {
    var runs = runsOf(t);
    runs.forEach(function (r) {
      var before = t.slice(Math.max(0, r.at - 60), r.at), after = t.slice(r.end, r.end + 40), near = before.slice(-40) + ' ' + after;
      var isNine = (r.real === 9 || r.like === 9), folio = (r.real === 13 && r.realGroups.join('-') === '2-4-3-4');
      var wordBefore = (before.match(/([A-Za-z]+)[ ,]*$/) || [])[1] || '';
      var zipOk = new RegExp('(?:^|[^A-Za-z])(' + STATES.join('|') + ')[ ,]*$').test(before) || (/^[A-Z][a-z]{2,}$/.test(wordBefore) && !NOT_CITY.test(wordBefore));
      var zip4 = (r.realGroups.join('-') === '5-4' && /-/.test(r.txt) && zipOk && !SSN_WORD.test(near));
      var permit = (r.realGroups.join('-') === '4-5' && /^(19|20)\d\d/.test(r.digits) && !SSN_WORD.test(near));
      var shape = ' ' + r.realGroups.join(' ') + ' ', inside = /(^| )9 /.test(shape) || / 3 2 4 | 3 3 3 | 2 7 /.test(shape);
      if ((isNine && !zip4 && !permit) || inside) { why.push('a run of 9 digits'); }
      if (r.real >= 15 && r.real <= 19) { why.push('a card-like number'); }
      else if ((r.real === 13 || r.real === 14) && !folio && luhn(r.digits)) { why.push('a card-like number'); }
      if (r.real >= 9 && SSN_WORD.test(near)) { why.push('an SSN word beside 9 or more digits'); }
      if (r.real >= 8 && ID_WORD.test(near)) { why.push('a bank, licence or passport word beside 8 or more digits'); }
      if (r.real >= 8 && DOB_WORD.test(near + ' ' + t.slice(Math.max(0, r.at - 80), r.at)) && DATE_PAT.test(t)) { why.push('a date of birth beside a long number'); }
    });
    if (DOB_WORD.test(t) && DATE_PAT.test(t) && runs.some(function (r) { return r.real >= 8; }) && why.indexOf('a date of birth beside a long number') < 0) { why.push('a date of birth beside a long number'); }
    if (WORDS.test(t)) { why.push('nine spelled-out digits in a row'); }
  }
  /* ---- fix round 7: the LOOSE pass. Digit groups and number words (English and Spanish) joined by ANY run of separators (commas, colons, brackets, many spaces) or by the words then, dash, hyphen, and: the groups are read as numbers and counted. ---- */
  var NUMW = { zero: 0, oh: 0, cero: 0, one: 1, uno: 1, una: 1, two: 2, dos: 2, three: 3, tres: 3, four: 4, cuatro: 4, five: 5, cinco: 5, six: 6, seis: 6, seven: 7, siete: 7, eight: 8, ocho: 8, nine: 9, nueve: 9,
    ten: 10, diez: 10, eleven: 11, once: 11, twelve: 12, doce: 12, thirteen: 13, trece: 13, fourteen: 14, catorce: 14, fifteen: 15, quince: 15, sixteen: 16, dieciseis: 16, seventeen: 17, diecisiete: 17, eighteen: 18, dieciocho: 18, nineteen: 19, diecinueve: 19,
    veinte: 20, veintiuno: 21, veintidos: 22, veintitres: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintisiete: 27, veintiocho: 28, veintinueve: 29 };
  var TENSW = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90 };
  var HUNDW = { hundred: 100, cien: 100, ciento: 100 };
  var NUMW_ALT = Object.keys(NUMW).concat(Object.keys(TENSW), Object.keys(HUNDW)).sort(function (a, b) { return b.length - a.length; }).join('|');
  var LOOSE_NUM = '(?:[0-9]+|\\b(?:' + NUMW_ALT + ')\\b)';
  var LOOSE_GAP = '(?:[\\s,;:()\\[\\]{}\\-\\u2010-\\u2015\\u2212.\\u00b7\\u2022_/\\\\|#]|\\b(?:then|dash|hyphen|guion|luego|next|and|y)\\b){1,12}';
  function stripMarks(t) { try { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) { return t; } }
  /* the digits a spelled number stands for: tens + unit and unit + hundred join into one number (twenty three = 23 = 2 digits) */
  function wordGroups(items) {
    var out = [], i = 0, hasWord = false;
    function val(w) { return NUMW[w] !== undefined ? NUMW[w] : (TENSW[w] !== undefined ? TENSW[w] : null); }
    while (i < items.length) {
      var it = items[i];
      if (it.d !== undefined) { out.push(it.d.length); i++; continue; }
      hasWord = true; var w = it.w, n = null, used = 1;
      if (HUNDW[w] !== undefined) { n = 100; var nx = items[i + 1]; if (nx && nx.w !== undefined && TENSW[nx.w] !== undefined && nx.join) { n += TENSW[nx.w]; used++; var n3 = items[i + 2]; if (n3 && n3.w !== undefined && NUMW[n3.w] !== undefined && NUMW[n3.w] < 10 && n3.join) { n += NUMW[n3.w]; used++; } } }
      else if (TENSW[w] !== undefined) { n = TENSW[w]; var nx2 = items[i + 1]; if (nx2 && nx2.w !== undefined && NUMW[nx2.w] !== undefined && NUMW[nx2.w] > 0 && NUMW[nx2.w] < 10 && nx2.join) { n += NUMW[nx2.w]; used++; } }
      else { n = val(w); var nh = items[i + 1]; if (n !== null && n < 10 && nh && nh.w !== undefined && HUNDW[nh.w] !== undefined && nh.join) { n = n * 100; used++; var nt = items[i + 1 + 1]; if (nt && nt.w !== undefined && TENSW[nt.w] !== undefined && nt.join) { n += TENSW[nt.w]; used++; var nu = items[i + 3]; if (nu && nu.w !== undefined && NUMW[nu.w] !== undefined && NUMW[nu.w] < 10 && nu.join) { n += NUMW[nu.w]; used++; } } } }
      out.push(String(n === null ? 0 : n).length); i += used;
    }
    return { groups: out, hasWord: hasWord };
  }
  function looseReasons(t0, why) {
    var t = stripMarks(t0).toLowerCase();
    var re = new RegExp(LOOSE_NUM + '(?:' + LOOSE_GAP + LOOSE_NUM + ')*', 'g'), m;
    while ((m = re.exec(t)) !== null) {
      var txt = m[0], at = m.index, items = [], tre = new RegExp('(' + LOOSE_NUM + ')', 'g'), tm, lastEnd = 0;
      while ((tm = tre.exec(txt)) !== null) {
        var gap = txt.slice(lastEnd, tm.index), joinable = /^[\s\-\u2010-\u2015]*$/.test(gap) || /^\s+(?:and|y)\s+$/.test(gap);
        if (/^[0-9]+$/.test(tm[1])) { items.push({ d: tm[1] }); } else { items.push({ w: tm[1], join: items.length > 0 && joinable }); }
        lastEnd = tm.index + tm[1].length;
      }
      if (items.length < 3) { continue; }
      var wg = wordGroups(items), g = wg.groups, total = g.reduce(function (a, b) { return a + b; }, 0), shape = g.join('-');
      var near = t.slice(Math.max(0, at - 40), at) + ' ' + t.slice(at + txt.length, at + txt.length + 40);
      if (shape === '3-2-4') { why.push('a Social Security shape (3, 2 and 4 digits)'); }
      else if (shape === '4-4-4-4' || shape === '4-6-5') { why.push('a card-like number'); }
      else if (wg.hasWord && total >= 9 && items.length >= 4) { why.push('nine or more digits spelled out in words or mixed with digits'); }
      else if (total >= 9 && SSN_WORD.test(near)) { why.push('an SSN word beside 9 or more digits'); }
      else if (total >= 8 && ID_WORD.test(near)) { why.push('a bank, licence or passport word beside 8 or more digits'); }
    }
  }
  var ENC_NOTE = 'a number hidden in base64 or hex';
  function printable(s) { if (s.length < 9) { return false; } var ok = 0; for (var i = 0; i < s.length; i++) { var c = s.charCodeAt(i); if (c >= 32 && c <= 126) { ok++; } } return ok / s.length >= 0.95; }
  function encodedReasons(t, why) {
    var hit = false, m, re = /(?<![A-Za-z0-9+\/=])[A-Za-z0-9+\/]{12,}={0,2}(?![A-Za-z0-9+\/=])/g, n = 0;
    while (!hit && (m = re.exec(t)) !== null && n++ < 200) {
      try { var dec = atob(m[0].length % 4 ? m[0] + '===='.slice(m[0].length % 4) : m[0]); if (printable(dec)) { var w2 = []; coreReasons(normNote(dec), w2); looseReasons(normNote(dec), w2); if (w2.length || /[0-9]{9,}/.test(dec)) { hit = true; } } } catch (e) { }
    }
    var hre = /\b(?:[0-9a-fA-F]{2}){9,}\b/g; n = 0;
    while (!hit && (m = hre.exec(t)) !== null && n++ < 200) {
      var bytes = m[0].match(/../g).map(function (h) { return parseInt(h, 16); }), s = String.fromCharCode.apply(null, bytes.slice(0, 200));
      if (printable(s) && s.replace(/[^0-9]/g, '').length >= 9) { hit = true; }
    }
    var xre = /\b0x([0-9a-fA-F]{6,8})\b/g;
    while (!hit && (m = xre.exec(t)) !== null) { var v = parseInt(m[1], 16); if (v >= 100000000 && v <= 999999999) { hit = true; } }
    if (hit) { why.push(ENC_NOTE); }
  }
  function otherReasons(t, why) {
    if (/(?<![A-Za-z0-9])[A-Z]\d{8}(?!\d)/.test(t)) { why.push('a passport-style number (a letter and 8 digits)'); }
    if (/(?<![A-Za-z0-9])[A-Za-z][ \-]?\d{3}[ \-]?\d{3}[ \-]?\d{2}[ \-]?\d{3}[ \-]?\d(?!\d)/.test(t)) { why.push('a driver licence number (a letter and 12 digits)'); }
    if (/(?<![A-Za-z0-9])[A-Z]{2}\d{2}[ ]?[A-Z0-9]{4}[ ]?(?:[A-Z0-9]{4}[ ]?){1,7}[A-Z0-9]{1,4}(?![A-Za-z0-9])/.test(t) && (t.match(/[0-9]/g) || []).length >= 10 && /(?<![A-Za-z0-9])[A-Z]{2}\d{2}[ ]?\d{4}/.test(t)) { why.push('an IBAN-style bank number'); }
    var dob = DOB_WORD.exec(t), i = 0;
    while (dob) { var from = Math.max(0, dob.index - 60), seg = t.slice(from, dob.index + dob[0].length + 60); if (DATE_PAT.test(seg)) { why.push('a date of birth'); break; } dob = null; }
  }
  function piiReasons(raw) {
    var t0 = String(raw == null ? '' : raw), why = [];
    if (t0.length > 20000) { return ['a note longer than 20,000 characters, which cannot be checked']; }
    var t = normNote(t0);
    if (!t) { return why; }
    var tm = maskPhones(t);
    coreReasons(tm, why); looseReasons(tm, why); encodedReasons(t, why); otherReasons(tm, why);
    return why.filter(function (x, i, a) { return a.indexOf(x) === i; });
  }
  function guardNote(note, toId) {
    if (toId === 'LOCAL') { return note; }
    var why = piiReasons(note);
    if (!why.length) { return note; }
    return '(NOT INCLUDED: the note looks like client personal data (' + why.join('; ') + '). This page keeps it out of every packet except one for LOCAL. Client personal data goes to LOCAL only. If this is a false alarm, take the long number out of the note and press the button again.)';
  }

  /* ---- fix round 7, CLASS 2 (Tier 2): the CONFIRMATION TICK. A pattern guard can never be complete (every round found new spellings), so every route that is not LOCAL now needs a plain-English tick:
     "This note has NO client personal data (...)". Until it is ticked, every copy, open and show button for such a route is DISABLED and says why. The tick is bound to the exact note text AND the To choice:
     it clears itself when either changes. LOCAL needs no tick. An EMPTY note needs no tick (there is no free text that could hold personal data). The digit guard above stays on as the second layer. ---- */
  var ACK = { on: false, note: '', route: '' };
  function byId(i) { return document.getElementById(i); }
  function noteText() { var n = byId('note'); return n ? String(n.value).trim() : ''; }
  function toRoute() { var t = byId('to'); return t ? t.value : ''; }
  function needTick(route) { return route !== 'LOCAL' && noteText() !== ''; }
  function tickedFor(route) { var c = byId('v5ack'); return !!(c && c.checked && ACK.on && ACK.note === noteText() && ACK.route === route); }
  function allow(route) { return !needTick(route) || tickedFor(route); }
  function reasonFor(route) {
    return 'NOT ALLOWED YET: this note has not been confirmed. Tick the box under the note box in section 1: "This note has NO client personal data". ' + (toRoute() === route ? '' : 'Choose ' + route + ' as To first (press Hand work here on its card), then tick. ') + 'Client personal data goes to LOCAL only.';
  }
  function syncAck() { var c = byId('v5ack'); if (ACK.on && (ACK.note !== noteText() || ACK.route !== toRoute())) { ACK.on = false; if (c) { c.checked = false; } } if (!ACK.on && c && c.checked && (ACK.note !== noteText() || ACK.route !== toRoute())) { c.checked = false; } }
  function gated() {
    var out = []; if (byId('go')) { out.push({ el: byId('go'), route: function () { return toRoute(); } }); } if (byId('show')) { out.push({ el: byId('show'), route: function () { return toRoute(); } }); }
    if (byId('v5rambobtn')) { out.push({ el: byId('v5rambobtn'), route: function () { return 'LLM-01'; } }); }
    Array.prototype.forEach.call(document.querySelectorAll('button.bigcopy'), function (b) { out.push({ el: b, route: function () { return b.getAttribute('data-paste'); } }); });
    return out;
  }
  function whyEl(btn) {
    var n = btn.nextSibling; while (n && n.nodeType === 1 && n.className === 'v5why') { return n; }
    var d = document.createElement('div'); d.className = 'v5why'; d.setAttribute('role', 'status'); btn.parentNode.insertBefore(d, btn.nextSibling); return d;
  }
  function applyGate() {
    try {
      syncAck();
      gated().forEach(function (g) {
        var route = g.route(), ok = allow(route), w = whyEl(g.el);
        g.el.disabled = !ok; g.el.setAttribute('aria-disabled', ok ? 'false' : 'true'); g.el.title = ok ? '' : 'Tick the box under the note first';
        var txt = ok ? '' : reasonFor(route); if (w.textContent !== txt) { w.textContent = txt; } w.style.display = ok ? 'none' : 'block';
      });
      var m = byId('v5ackmsg'), route = toRoute(), msg;
      if (!m) { return; }
      if (route === 'LOCAL') { msg = 'To is LOCAL: no tick needed.'; } else if (noteText() === '') { msg = 'The note is empty: no tick needed.'; } else if (tickedFor(route)) { msg = 'Ticked for this note and for ' + route + '. If you change the note or To, the tick clears.'; } else { msg = 'NOT TICKED: the copy and show buttons for ' + route + ' are switched off until you tick.'; }
      if (m.textContent !== msg) { m.textContent = msg; }
    } catch (e) { }
  }
  function onAckChange() { var c = byId('v5ack'); if (c && c.checked) { ACK.on = true; ACK.note = noteText(); ACK.route = toRoute(); } else { ACK.on = false; } applyGate(); }
  function initGate() {
    var c = byId('v5ack'); if (!c || c.__v5wired) { return; } c.__v5wired = true;
    c.addEventListener('change', onAckChange);
    ['note', 'to', 'from', 'kind'].forEach(function (i) { var e = byId(i); if (e) { ['input', 'change'].forEach(function (ev) { e.addEventListener(ev, applyGate); }); } });
    document.addEventListener('click', function () { setTimeout(applyGate, 0); });
    setInterval(applyGate, 1000); applyGate();
  }
  function gatedPacket(route) { return allow(route) ? window.packet() : reasonFor(route); }
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
      (noNums(s) ? '<p>' + red(s.state === 'BAD CLOCK' ? 'BAD CLOCK' : 'NO DATA') + ' ' + (s.state === 'BAD CLOCK' ? 'The token report is dated in the future, so none of its numbers are shown.' : 'The token monitor has not reported yet. No burn rate is shown because none was measured.') + '</p>' :
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
      return '<li><b>' + r[0] + ' ' + esc(r[1]) + '</b> - <a href="' + drive(r[2]) + '" target="_blank" rel="noopener">Open the proof file for source ' + r[0] + ' (a file in Google Drive)</a>' + (r[3] ? ' - <i class="v5typed">typed note from 2026-08-16, not re-checked: ' + esc(r[3]) + '</i>' : '') + chk + '</li>';
    }).join('');
    return '<div class="pn" id="pn-miami" data-files="miamidade"><p>' + V.badge('miamidade', 'Counted') + '</p>' +
      '<p>Counted so far: ' + (impossible ? red('IMPOSSIBLE (' + counted + ')') + ' of 300' : (counted !== null && !fresh ? red('OLD ' + counted + ' of 300', 'miamidade') + ' ' + red(OLDSENT, 'miamidade') : '<b>' + (counted === null ? 'unknown' : counted) + ' of 300</b>')) + (counted === null ? ' (not counted yet)' : '') + '.</p>' +
      '<p>Each link opens that site\'s proof file in Drive. They are plain text files, not the Orange Tree portal. <a href="' + MD_INDEX + '" target="_blank" rel="noopener">Open the full index document (Google Docs)</a>.</p><ol class="md">' + items + '</ol></div>';
  }
  var DASHFILES = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'];
  function dash() { return '<span class="v5b na" id="v5overall" data-overall="1">WHOLE PAGE: checking</span>' + DASHFILES.map(function (n) { return '<span>' + esc(V.plainFile(n)) + ': ' + V.badge(n, 'OK') + '</span>'; }).join(''); }
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
        cls = V.stripCls(w); text = (cls === 'bad' ? 'NOT FINE' : 'NOT PROVEN') + ' - ' + reds + ' red and ' + greys + ' grey of ' + its.length + ' cards and marks on this page depend on the ' + V.plainFile(n) + ' report' + (v.cls === 'ok' ? ' (the report itself is fresh: ' + v.text + ')' : ': ' + v.text);
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
      V.setText(o, worst === 'ok' ? 'WHOLE PAGE: every one of ' + items.length + ' cards and marks and all 7 reports are green' : 'WHOLE PAGE: ' + (worst === 'bad' ? 'NOT FINE' : 'NOT PROVEN') + ' - ' + r + ' red and ' + g + ' grey of ' + items.length + ' cards and marks; ' + bf + ' of 7 reports red');
    }
    return worst;
  }
  function ageHtml(age) { return '<span id="v5age1">' + esc(age.a) + '</span><span id="v5age2">' + esc(age.b) + '</span><span id="v5age3">' + esc(age.c) + '</span>'; }
  function setBuilt(builtIso) { var f = document.getElementById('v5fb'); if (f) { V.setText(f, V.builtText(builtIso)); } }
  /* ---- fix round 7, CLASS 1 (Tier 2): the paint is UNABLE to stop. Each panel is drawn on its own; one that fails shows its own red box and the rest still paint.
     The WATCHDOG (Tier 3) turns the WHOLE PAGE line and every strip entry red when a paint threw or the last full paint is older than 3 minutes. ---- */
  var PANEL_FILES = { v5health: ['health', 'state'], v5tokens: ['tokens'], v5house: ['housekeeping'], v5miami: ['miamidade'], v5repairs: ['state'] };
  var PANEL_NAMES = { v5health: 'Health and state', v5tokens: 'Token monitor', v5house: 'Housekeeping agent', v5miami: 'Miami-Dade', v5repairs: 'Live repair rows' };
  function panelFailBox(id) {
    var files = PANEL_FILES[id] || [], n = 0; files.forEach(function (f) { try { n += V.badCount(f); } catch (e) { } });
    return '<div class="pn" data-files="' + files.join(' ') + '"><h3>' + esc(PANEL_NAMES[id] || id) + '</h3><span class="v5b bad">THIS PANEL COULD NOT BE DRAWN - ' + n + ' unreadable entries</span> Do not trust this part of the page.</div>';
  }
  function paintPanels() {
    PANELS.forEach(function (p) {
      var html; try { html = p[1](); } catch (e) { html = panelFailBox(p[0]); }
      try { V.setHtml(document.getElementById(p[0]), html); } catch (e) { }
    });
  }
  var PAINT = { lastOk: 0, start: Date.now(), threw: false, tripped: false };
  var WATCH_MS = 3 * 60 * 1000, WATCH_TEXT = 'PAGE NOT REFRESHING - DO NOT TRUST';
  /* the watchdog needs nothing but the page itself: it runs on its own timer, touches only the WHOLE PAGE line, the strip entries and the banner, and never throws */
  function watchdog() {
    try {
      var now = Date.now(), ref = PAINT.lastOk || PAINT.start, old = (now - ref) > WATCH_MS, trip = PAINT.threw || old;
      PAINT.tripped = trip;
      var banner = document.getElementById('v5watch');
      if (banner) { banner.style.display = trip ? 'block' : 'none'; banner.textContent = trip ? WATCH_TEXT + '. ' + (PAINT.threw ? 'The last redraw of this page failed.' : 'This page has not redrawn for more than 3 minutes.') + ' Everything below may be out of date. Press F5 to reload the page. If this stays, tell the desktop executor (RAMBO).' : ''; }
      if (!trip) { return; }
      var o = document.getElementById('v5overall'); if (o) { o.className = 'v5b bad'; o.textContent = 'WHOLE PAGE: ' + WATCH_TEXT; }
      try { Array.prototype.forEach.call(document.querySelectorAll('.v5b[data-src]'), function (b) { b.className = 'v5b bad'; b.textContent = WATCH_TEXT; }); } catch (e) { }
    } catch (e) { }
  }
  function paintFailed(e) { PAINT.threw = true; window.__v5lastError = String(e && e.message || e).slice(0, 200); watchdog(); }
  /* the one paint: cards, then panels, then the strip, then enforce, then the age line (which reads the enforced answer). Every step is separate; this function never throws. */
  function paintAll(builtIso) {
    var failed = false, worst = 'bad';
    function step(fn) { try { fn(); } catch (e) { failed = true; window.__v5lastError = String(e && e.message || e).slice(0, 200); } }
    window.__v5errs = 0;
    step(repaint); step(paintPanels);
    step(function () { V.setHtml(document.getElementById('v5dash'), dash()); });
    step(function () { worst = enforce(); });
    step(function () {
      var age = V.ageLine(builtIso, worst === 'bad'), a = document.getElementById('v5age');
      if (a) { var cls = 'v5age' + (age.bad ? ' bad' : ''); if (a.className !== cls) { a.className = cls; } V.setText(document.getElementById('v5age1'), age.a); V.setText(document.getElementById('v5age2'), age.b); V.setText(document.getElementById('v5age3'), age.c); }
    });
    step(function () { setBuilt(builtIso); });
    if (failed) { PAINT.threw = true; } else { PAINT.threw = false; PAINT.lastOk = Date.now(); }
    watchdog();
  }
  window.VTES5U = {
    guardNote: guardNote, piiReasons: piiReasons, enforce: enforce, pageItems: pageItems, MD: MD, META: META, grokText: grokText, botsBuilt: botsBuilt, botsSub: function () { return botsBuilt() ? 'UP (proof)' : 'NOT BUILT'; },
    pasteTo: pasteTo, repaint: repaint,
    /* builds the three card grids from the v3 arrays and the top block; wires the big copy buttons */
    renderAll: function (LLMS, ROLES, BOTS) {
      /* flaw F10: the search must match only the text v3 matched. v3's own render (still in the page) has just drawn the three grids; take each card's text before it is replaced. */
      var t3 = ['g-llm', 'g-roles', 'g-bots'].map(function (g) { return Array.prototype.map.call(document.querySelectorAll('#' + g + ' .card'), function (c) { return c.textContent; }); });
      document.getElementById('g-llm').innerHTML = LLMS.map(function (x) { return safeCard(llmCard, x, x.id); }).join('');
      document.getElementById('g-roles').innerHTML = ROLES.map(function (x) { return safeCard(roleCard, x, x.id); }).join('');
      document.getElementById('g-bots').innerHTML = BOTS.map(function (x) { return safeCard(botCard, x, x[0]); }).join('');
      /* the two sentences v3 printed inside a card and v5 moved into a labelled typed note stay searchable (META.s3), so the same words still find the same cards */
      var ids = [LLMS, ROLES, BOTS].map(function (a) { return a.map(function (x) { return Array.isArray(x) ? x[0] : x.id; }); });
      /* fix round 7 (flaw 20): the words the build removed from v3's typed intervals stay searchable, taken from v3's ORIGINAL strings, so "hourly" still finds CU-Propagation-Check */
      var SEARCHX = { 'LLM-01': ' Runs every 2 minutes and executes anything in VTES-Inbox.', 'CHIEF': ' Runs every 2 minutes on the free lane: closes', 'CU-Local-Executor': ', runs jobs on Ollama, every 5 minutes.', 'CU-Orchestrator': ' Every 15 minutes.', 'CU-Propagation-Check': ' Hourly. Finds any lane', 'VTES-LOCAL-POLLER': ' The 15-minute poller that wakes RAMBO' };
      ['g-llm', 'g-roles', 'g-bots'].forEach(function (g, gi) { Array.prototype.forEach.call(document.querySelectorAll('#' + g + ' .card'), function (c, i) { if (t3[gi][i] !== undefined) { c.setAttribute('data-s', t3[gi][i] + ((META[ids[gi][i]] || {}).s3 || '') + (SEARCHX[ids[gi][i]] || '')); } }); });
      Array.prototype.forEach.call(document.querySelectorAll('button.bigcopy'), function (b) {
        b.addEventListener('click', function () {
          var key = b.getAttribute('data-role') || b.getAttribute('data-paste'), m = META[key] || META[b.getAttribute('data-paste')] || {};
          pasteTo(b.getAttribute('data-paste'), b.parentNode.querySelector('.v5cs'), getSteps(m));
        });
      });
      try { applyGate(); } catch (e) { }
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
    /* fix round 7: the frame (RAMBO button, Read me first, Live status heading) is drawn FIRST and uses no data file, so a bad data file can never take it away */
    renderFrame: function (builtIso) {
      document.getElementById('v5rambo').innerHTML = '<button class="btn" type="button" id="v5rambobtn">Copy packet for RAMBO (Claude Code Desktop Executor)</button><div class="paste v5cs" id="v5ramboout" role="status"></div>';
      document.getElementById('v5top').innerHTML = '<div class="v5watch" id="v5watch" role="alert" style="display:none"></div><details class="v5read" id="v5read" open><summary>Read me first</summary><ol>' + READ.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></details>' +
        '<h2 id="livestatus">Live status</h2><div class="v5age" id="v5age"><span id="v5age1">Checking the data files...</span><span id="v5age2"></span><span id="v5age3"></span></div><div class="v5dash" id="v5dash"><span class="v5b na" id="v5overall" data-overall="1">WHOLE PAGE: checking</span></div><div id="v5health"></div>';
      document.getElementById('v5rambobtn').addEventListener('click', function () { pasteTo('LLM-01', document.getElementById('v5ramboout'), getSteps(META['LLM-01'])); });
      try { initGate(); } catch (e) { }
    },
    firstPaint: function (builtIso) { paintAll(builtIso); },
    allow: allow, reasonFor: reasonFor, applyGate: applyGate, initGate: initGate, paintFailed: paintFailed, watchdog: watchdog, paintState: function () { return { lastOk: PAINT.lastOk, threw: PAINT.threw, tripped: PAINT.tripped }; },
    renderTop: function (builtIso) { this.renderFrame(builtIso); paintAll(builtIso); },
    /* every 60 seconds: re-evaluate cards, panels, strip and age line together from the freshly loaded files; only what changed is redrawn (flaw F16) */
    refresh: function (builtIso) { paintAll(builtIso); }
  };
})();
