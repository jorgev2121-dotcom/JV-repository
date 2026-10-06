/* vtes4-cards.js - window and executor cards, rendered from one table + live data. TRK-2026-9910-B. ASCII only.
   Static facts only here (names, how to open). NO status words are typed: state comes from VTES4 (data files). */
(function () {
  var V = window.VTES4, esc = V.esc;
  var DRIVE_INBOX = 'https://drive.google.com/drive/folders/1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F';
  var DRIVE_OUTBOX = 'https://drive.google.com/drive/folders/1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN';
  /* ONE statement about Grok, used by the card, the Map and the Subscriptions tab (never a second version). */
  var GROK_NOT_BUILT = 'Grok is chat only. No Grok bot has been built (asked for many times, never built). The registry brief of 2026-10-06 says Grok has been unproven for 31 days (typed note, not checked by this page).';
  var GROK_BUILT = 'Grok is chat only. A Grok bot is reporting UP with proof (see the Grok Bots box on the Map). The registry brief of 2026-10-06 says Grok chat has been unproven for 31 days (typed note, not checked by this page).';
  /* a Grok bot counts as built only while the poller reports BOTS up WITH proof; a status-only report never counts (flaw N4) */
  function botsBuilt() { return V.executor('BOTS').state === 'OK'; }
  function grokText() { return botsBuilt() ? GROK_BUILT : GROK_NOT_BUILT; }
  /* id, e = emoji (numeric entities), name = plain name FIRST, prefix = paste ID */
  var CARDS = [
    { id: 'LLM-01', e: '&#128421;&#65039;', name: 'Claude Code Desktop Executor / RAMBO', role: 'The hands on your PC (tray icon: green D)', prefix: 'PASTE-D', paste: true,
      job: 'Files, OneDrive, Chrome, 1Password, printer, county sites, OCR. Executes anything dropped in VTES-Inbox. Polls ',
      tick: true, steps: 'Open the Claude desktop app, click the Code tab, click the RAMBO session, click in the message box, press Ctrl+V.',
      vtes: 'vtes://llm-01', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) fills in the address book entry for LLM-01, runs VTES-Open.ps1 -Install once (no admin) and records both in the heartbeat file. This card then turns into a link by itself.' },
    { id: 'LLM-02', e: '&#9729;&#65039;', name: 'Claude Code Cloud Executor / Repo Keeper', role: 'QC, research, dispatch (tray icon: blue C). Cannot touch the PC.', prefix: 'PASTE-C', paste: true,
      job: 'Holds the repo, checks the desktop\'s work, does sourced research, sends orders to RAMBO through Drive.',
      url: 'https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf', openLabel: 'Open Cloud Executor (LLM-02)', steps: 'Opens in a new tab. Click in its message box and press Ctrl+V.' },
    { id: 'LLM-03', e: '&#129309;', name: 'Claude Cowork / Analyst', role: 'Long documents, CDM owner (tray icon: orange X)', prefix: 'PASTE-X', paste: true,
      job: 'Deep analysis and long write-ups. Can drive Chrome with your permission.',
      steps: 'Open the Claude desktop app, click the Cowork tab, click in the message box, press Ctrl+V.',
      vtes: 'vtes://llm-03', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) finds the Claude desktop app shortcut on the PC, writes it into the address book entry for LLM-03, then registers the vtes:// addresses. This card turns into a link by itself. Whether that shortcut lands on the Cowork tab is UNVERIFIED.' },
    { id: 'LLM-04', e: '&#128172;', name: 'Claude Chat / Cockpit', role: 'Your seat: decide, approve, dictate', prefix: 'PASTE-X', paste: true,
      job: 'Your main conversation. It reads the same ledger and tells the executors what to do.',
      url: 'https://claude.ai', openLabel: 'Open claude.ai (home page, not one chat)', steps: 'Or the Claude desktop app, Chat tab.' },
    { id: 'LLM-05', e: '&#128241;', name: 'Claude iPhone / Voice', role: 'Dictation on the go', prefix: 'PASTE-X', paste: true,
      job: 'Same account as the cockpit. Say "AP-0088: GO" from the car and it counts.',
      steps: 'The packet stays on this PC. Copy it, paste it into Notes or AirDrop it, then open the Claude app on the iPhone.' },
    { id: 'LLM-06', e: '&#129517;', name: 'Codex CLI Executor / Backup Hands', role: 'Second pair of hands when Claude\'s limit is hit', prefix: 'PASTE-X', paste: true,
      job: 'OpenAI\'s agent on your PC, on your ChatGPT subscription. Same VTES-Inbox orders, same GREEN/RED rules.',
      url: 'https://chatgpt.com', openLabel: 'Open ChatGPT (account page only)', steps: 'To run it on the PC: Windows Terminal, type codex, press Enter, then Ctrl+V.' },
    { id: 'LOCAL', e: '&#128187;', name: 'Local Executor / Ollama (free)', role: 'On-machine, free, nothing leaves the PC', prefix: 'PASTE-X', paste: false,
      job: 'Classify, tag, extract, summarise and anything with personal data. Task CU-Local-Executor watches G:\\My Drive\\VTES-Inbox-LOCAL.',
      steps: 'No window to paste into. Put a JOB-*.md file with CLASS: and PROMPT: lines in VTES-Inbox-LOCAL.', copyOnly: 'CLASS: \nPROMPT: ', copyLabel: 'Copy JOB template' },
    { id: 'LLM-07', e: '&#128302;', name: 'Grok (Fabian) / Second Opinion', role: 'Chat only, second opinion', prefix: 'PASTE-X', paste: true,
      job: 'Second opinion and live-web answers.',
      url: 'https://grok.com', openLabel: 'Open grok.com',
      note: 'GROK',
      next: 'Next step: RAMBO sends Grok one test message and writes the result into the heartbeat file; until then this card stays red.' },
    { id: 'LLM-08', e: '&#9802;', name: 'Gemini / Volume Drafter', role: 'Free, Drive-native', prefix: 'PASTE-X', paste: true,
      job: 'Cheap bulk drafting and summarizing.', url: 'https://gemini.google.com', openLabel: 'Open Gemini', steps: 'On the PC: Windows Terminal, type gemini.' },
    { id: 'LLM-09', e: '&#129518;', name: 'Governor / Token and LLM Manager', role: 'Watches spend, recommends who takes each job', prefix: 'PASTE-D', paste: true,
      job: 'Lives on the PC (ClaudeMemory\\Governor). Watches spend, keeps the lineup map, files spending motions for your yes. (Description copied from the page\'s own Map note of 2026-09-30: UNVERIFIED now.)',
      steps: 'No window of its own from this page. Copy the packet and give it to the Desktop Executor (RAMBO), which hands it to the Governor.',
      vtes: 'vtes://llm-09', fix: 'Nothing for you to do. The Desktop Executor (RAMBO) adds an address book entry for LLM-09 and registers the vtes:// addresses. This card turns into a link by itself.' },
    { id: 'CHIEF', e: '&#127894;&#65039;', name: 'Chief / Orchestrator', role: 'Hands jobs between the executors', prefix: 'PASTE-X', paste: true,
      job: 'The Chief seat. It appears on the live v3 page as an executor role, as the bot CU-Orchestrator, and as a queued item (Orchestrator / Chief seat, LOCAL). (Read from text Jorge pasted on 2026-10-06; this page has not seen the live file: UNVERIFIED.)',
      steps: 'No window to paste into yet. Copy the packet and give it to the Desktop Executor (RAMBO).' },
    { id: 'LLM-10', e: '&#129695;', name: 'Microsoft Copilot / Edge and Microsoft 365', role: 'Chat only from here', prefix: 'PASTE-X', paste: true,
      job: 'Lives in Edge and Microsoft 365. Whether your plan includes full Copilot is UNVERIFIED.', url: 'https://copilot.microsoft.com', openLabel: 'Open Copilot' }
  ];
  var SITE_IDS = { 'LLM-04': 1, 'LLM-07': 1, 'LLM-08': 1, 'LLM-10': 1 };
  function stateDiv(c) {
    var e = V.executor(c.id), cls = e.state === 'OK' ? 'ok' : (e.state === 'UNPROVEN' ? 'unp' : 'bad');
    return '<div class="v4st ' + cls + '" data-state="' + esc(c.id) + '"><b>State:</b> ' + esc(e.text) + '</div>';
  }
  function stateLine(c) {
    return stateDiv(c) + (SITE_IDS[c.id] ? '<div class="v4site" data-site="' + c.id + '">Site answers from this browser: checking. (A small extra mark, not the status light.)</div>' : '');
  }
  /* a vtes:// link shows only when the address is registered on the PC AND the address book entry for this window is filled in */
  function openBlock(c) {
    if (c.url) { return '<a class="btn" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.openLabel) + '</a>'; }
    if (c.vtes && V.schemeRegistered() && V.addressFilled(c.id)) { return '<a class="btn" href="' + esc(c.vtes) + '">Open ' + esc(c.name) + '</a>'; }
    if (c.vtes) {
      var why = !V.schemeRegistered() ? 'Address ' + c.vtes + ' is not registered on the PC.' : 'Address ' + c.vtes + ' is registered, but the address book entry for ' + c.id + ' is empty (nothing to open).';
      return '<div class="v4na" data-na="' + esc(c.id) + '"><b>Open from this page: not available yet.</b> ' + esc(why) + ' <b>One step:</b> ' + esc(c.fix) + '</div>';
    }
    return '';
  }
  function render(c) {
    var btn = c.paste ? '<button class="btn pastebtn" type="button" data-to="' + c.id + '">Copy hand-off packet for ' + esc(c.name.split(' / ')[0]) + '</button>'
      : (c.copyOnly ? '<button class="btn copyonly" type="button" data-copy="' + esc(c.copyOnly) + '">' + esc(c.copyLabel) + '</button>' : '');
    return '<div class="card" id="card-' + c.id + '" data-k="' + esc((c.id + ' ' + c.name + ' ' + c.role + ' ' + c.job + ' ' + (c.prefix || '')).toLowerCase()) + '">' +
      '<div class="id">' + c.id + ' &middot; ' + c.e + (c.prefix ? ' &middot; ' + c.prefix : '') + '</div>' +
      '<div class="name">' + esc(c.name) + '</div><div class="role">' + esc(c.role) + '</div>' + stateLine(c) +
      '<p class="job">' + esc(c.job) + (c.tick ? '<span class="v4tick">' + esc(V.tick()) + '</span>.' : '') + '</p>' +
      (c.note ? '<p class="job v4note" data-note="' + c.id + '">' + esc(c.note === 'GROK' ? grokText() : c.note) + '</p>' : '') + (c.next ? '<p class="job"><b>' + esc(c.next) + '</b></p>' : '') +
      '<div class="row"><div class="v4ob" data-ob="' + c.id + '">' + openBlock(c) + '</div>' + btn + '</div>' +
      (c.steps ? '<div class="paste"><b>How:</b> ' + esc(c.steps) + '</div>' : '') +
      '<div class="paste v4cs" id="cs-' + c.id + '" role="status"></div>' +
      (c.prefix ? '<div class="paste">Paste blocks for this window start with ' + c.prefix + '.</div>' : '') + '</div>';
  }
  /* fills the hand-off packet for window `to` and reports plainly where it is; outEl receives the message */
  function pasteTo(to, outEl) {
    var toSel = document.getElementById('to'), fromSel = document.getElementById('from');
    if (fromSel && !fromSel.value) { fromSel.value = 'LLM-04'; }
    if (toSel && Array.prototype.some.call(toSel.options, function (o) { return o.value === to; })) { toSel.value = to; }
    toSel.dispatchEvent(new Event('input')); document.getElementById('go').click();
    var c = CARDS.filter(function (x) { return x.id === to; })[0];
    setTimeout(function () {
      var st = document.getElementById('status').textContent || '';
      if (outEl) { outEl.textContent = (st ? st + ' ' : '') + 'The packet is in the box on the Console tab. ' + (c && c.steps ? 'Next: ' + c.steps : ''); }
    }, 120);
  }
  function paintSites(probe) {
    Array.prototype.forEach.call(document.querySelectorAll('.v4site'), function (el) {
      var p = probe && probe[el.getAttribute('data-site')];
      V.setText(el, 'Site answers from this browser: ' + (!p ? 'checking' : (p.ok ? 'yes' : 'no')) + '. (A small extra mark, not the status light.)');
    });
  }
  function bus() {
    return '<div class="card" id="card-BUS" data-k="bus drive mailbox inbox outbox handoff"><div class="id">BUS &middot; &#128236;</div><div class="name">The Drive mailbox</div>' +
      '<div class="role">How every window hands off to the next</div><p class="job">Orders go into VTES-Inbox. Proof comes out of VTES-Outbox.</p>' +
      '<div class="row"><a class="btn" href="' + DRIVE_INBOX + '" target="_blank" rel="noopener">Open VTES-Inbox</a><a class="btn" href="' + DRIVE_OUTBOX + '" target="_blank" rel="noopener">Open VTES-Outbox</a></div></div>';
  }
  /* re-evaluate every card in place (state line, tick sentence, open block, Grok note) without touching the packet messages (flaw N2).
     Only what changed is redrawn, so a text selection inside an unchanged card survives the 60-second tick (flaw F16). */
  function repaint() {
    CARDS.forEach(function (c) {
      var card = document.getElementById('card-' + c.id); if (!card) { return; }
      var st = card.querySelector('.v4st');
      if (st) {
        var e = V.executor(c.id), cls = 'v4st ' + (e.state === 'OK' ? 'ok' : (e.state === 'UNPROVEN' ? 'unp' : 'bad'));
        if (st.className !== cls) { st.className = cls; }
        V.setHtml(st, '<b>State:</b> ' + esc(e.text));
      }
      var tk = card.querySelector('.v4tick'); if (tk) { V.setText(tk, V.tick()); }
      var ob = card.querySelector('.v4ob'); if (ob) { V.setHtml(ob, openBlock(c)); }
      var nt = card.querySelector('[data-note]'); if (nt && c.note === 'GROK') { V.setText(nt, grokText()); }
    });
  }
  /* the bell: colour and count come from the reminders and today's date (Eastern), never fixed. Red only when something is due today or overdue,
     or has a due date this page cannot read (flaws F10, F11). A missing or deleted reminders file shows no count. */
  function paintBell() {
    try {
      var r = V.reminders(), n = r.open, due = r.due, bad = r.unreadable, now = V.now().getTime();
      var a = document.getElementById('t_rem'), b = document.getElementById('remn'); if (!a) { return; }
      if (b) { V.setText(b, n ? ' ' + n : ''); }
      var stampRaw = V.remindersAt(), stamp = stampRaw ? new Date(stampRaw) : null, stampOk = stamp && !isNaN(stamp.getTime()), stale = stampOk && (((now - stamp) / 60000 > 26 * 60) || ((stamp - now) / 60000 > 2));
      var col = due > 0 ? '#b3261e' : (n > 0 ? '#1b5e9e' : '#6b6b66');
      a.style.background = col; a.style.borderColor = col; a.style.color = '#fff'; a.style.animation = due > 0 ? 'vtesflash 1s steps(2) infinite' : '';
      a.style.borderStyle = (stampOk && !stale) ? 'solid' : 'dashed';
      var t = 'Things waiting for you: ' + n + ' open, ' + due + ' due today or overdue (' + (due > 0 ? 'red' : (n > 0 ? 'blue: none is due' : 'grey: nothing open')) + '). ' +
        (r.listed ? '' : 'The reminders file is missing or has no list, so no count is shown. ') +
        (bad.length ? 'Due date not readable for ' + bad.join(', ') + ': counted as due until the date is fixed. ' : '') +
        (!stampOk ? 'The reminders file has no time stamp, so this count may be old (dashed border).' : (stale ? 'The reminders file is STALE or dated in the future (' + V.fmt(stamp) + '): the count may be wrong (dashed border).' : 'Reminders file as of ' + V.fmt(stamp) + '.'));
      if (a.title !== t) { a.title = t; }
    } catch (e) { }
  }
  /* the Map has no box for LOCAL or CHIEF (flaw N13): say so on the page and show their live state in words */
  function mapNote() {
    var l = V.executor('LOCAL'), c = V.executor('CHIEF');
    return '<div class="v4typedbox" id="v4mapnote"><b>The Map does not draw LOCAL (Local Executor) or CHIEF (Chief / Orchestrator).</b> Their lights are in the strip at the top and their cards are on the Console and Dir tabs. Live state now: LOCAL - ' + esc(l.text) + '. CHIEF - ' + esc(c.text) + '.</div>';
  }
  window.VTES4C = {
    CARDS: CARDS, get GROK() { return grokText(); }, grokText: grokText, botsBuilt: botsBuilt, botsSub: function () { return botsBuilt() ? 'UP (proof)' : 'NOT BUILT'; },
    repaint: repaint, paintBell: paintBell, mapNote: mapNote, pasteTo: pasteTo, paintSites: paintSites,
    renderCards: function (el) {
      el.innerHTML = CARDS.map(render).join('') + bus();
      Array.prototype.forEach.call(el.querySelectorAll('.pastebtn'), function (b) {
        b.addEventListener('click', function () { pasteTo(b.getAttribute('data-to'), document.getElementById('cs-' + b.getAttribute('data-to'))); });
      });
      Array.prototype.forEach.call(el.querySelectorAll('.copyonly'), function (b) {
        b.addEventListener('click', function () {
          var t = b.getAttribute('data-copy'), cs = b.closest('.card').querySelector('.v4cs');
          try { var x = document.createElement('textarea'); x.value = t; document.body.appendChild(x); x.select(); document.execCommand('copy'); document.body.removeChild(x); } catch (e) { }
          cs.textContent = 'Copied the template. Save it as JOB-something.md in VTES-Inbox-LOCAL.';
        });
      });
    },
    /* effective() for the v3 chip/idcard code: {k,h,txt,why,lab}; k in up|down|nod|fut. STALE is red (down) everywhere. */
    effective: function (id) {
      if (id === 'BOTS') {
        /* never UP and NOT BUILT at once: UP only with a poller report that has proof; anything else is NOT BUILT (violet) */
        var hb = V.executor('BOTS');
        if (hb.state === 'OK') { return { k: 'up', h: 0, txt: hb.text, why: '' }; }
        return { k: 'fut', h: null, txt: 'NOT BUILT', why: grokText() };
      }
      var e = V.executor(id);
      if (e.state === 'OK') { return { k: 'up', h: 0, txt: e.text, why: '' }; }
      if (e.state === 'UNPROVEN') { return { k: 'unk', h: null, txt: e.text, why: '', lab: 'NOT PROVEN' }; }
      if (e.state === 'STALE' || e.state === 'DOWN' || e.state === 'BAD CLOCK' || e.state === 'NOT OK') { return { k: 'down', h: null, txt: e.text, why: '', lab: e.state }; }
      return { k: 'nod', h: null, txt: e.text, why: 'Nothing has written this window\'s state yet.' };
    }
  };
})();
