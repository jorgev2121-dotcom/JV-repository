/* vtes4-cards.js - window and executor cards, rendered from one table + live data. TRK-2026-9910-B. ASCII only.
   Static facts only here (names, how to open). NO status words are typed: state comes from VTES4 (data files). */
(function () {
  var V = window.VTES4, esc = V.esc;
  var DRIVE_INBOX = 'https://drive.google.com/drive/folders/1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F';
  var DRIVE_OUTBOX = 'https://drive.google.com/drive/folders/1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN';
  /* id, e = emoji (numeric entities), name = plain name FIRST, prefix = paste ID */
  var CARDS = [
    { id: 'LLM-01', e: '&#128421;&#65039;', name: 'Claude Code Desktop Executor / RAMBO', role: 'The hands on your PC (tray icon: green D)', prefix: 'PASTE-D', paste: true,
      job: 'Files, OneDrive, Chrome, 1Password, printer, county sites, OCR. Executes anything dropped in VTES-Inbox. Polls ',
      tick: true, steps: 'Open the Claude desktop app, click the Code tab, click the RAMBO session, click in the message box, press Ctrl+V.',
      vtes: 'vtes://llm-01', fix: 'RAMBO runs VTES-Open.ps1 -Install once (no admin) and writes vtes_scheme_registered=true into the heartbeat file.' },
    { id: 'LLM-02', e: '&#9729;&#65039;', name: 'Claude Code Cloud Executor / Repo Keeper', role: 'QC, research, dispatch (tray icon: blue C). Cannot touch the PC.', prefix: 'PASTE-C', paste: true,
      job: 'Holds the repo, checks the desktop\'s work, does sourced research, sends orders to RAMBO through Drive.',
      url: 'https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf', openLabel: 'Open Cloud Executor (LLM-02)', steps: 'Opens in a new tab. Click in its message box and press Ctrl+V.' },
    { id: 'LLM-03', e: '&#129309;', name: 'Claude Cowork / Analyst', role: 'Long documents, CDM owner (tray icon: orange X)', prefix: 'PASTE-X', paste: true,
      job: 'Deep analysis and long write-ups. Can drive Chrome with your permission.',
      steps: 'Open the Claude desktop app, click the Cowork tab, click in the message box, press Ctrl+V.',
      vtes: 'vtes://llm-03', fix: 'Jorge copies the Cowork window address into vtes-addresses.json (or tells RAMBO), and RAMBO installs the vtes:// addresses.' },
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
    { id: 'LLM-07', e: '&#128302;', name: 'Grok (Fabian) / Second Opinion', role: 'Chat only. NO Grok bots exist.', prefix: 'PASTE-X', paste: true,
      job: 'Second opinion and live-web answers. Bots were requested many times and never built.',
      url: 'https://grok.com', openLabel: 'Open grok.com',
      note: 'Last known facts, dated 2026-10-06 from the registry brief (UNVERIFIED by this page): never proven working in 31 days; the old API key is dead.',
      next: 'Next step: RAMBO sends Grok one test message and writes the result into the heartbeat file; until then this card stays red.' },
    { id: 'LLM-08', e: '&#9802;', name: 'Gemini / Volume Drafter', role: 'Free, Drive-native', prefix: 'PASTE-X', paste: true,
      job: 'Cheap bulk drafting and summarizing.', url: 'https://gemini.google.com', openLabel: 'Open Gemini', steps: 'On the PC: Windows Terminal, type gemini.' },
    { id: 'LLM-10', e: '&#129695;', name: 'Microsoft Copilot / Edge and Microsoft 365', role: 'Chat only from here', prefix: 'PASTE-X', paste: true,
      job: 'Lives in Edge and Microsoft 365. Whether your plan includes full Copilot is UNVERIFIED.', url: 'https://copilot.microsoft.com', openLabel: 'Open Copilot' }
  ];
  function stateLine(c) {
    var e = V.executor(c.id), cls = e.state === 'OK' ? 'ok' : 'bad';
    return '<div class="v4st ' + cls + '" data-state="' + esc(c.id) + '"><b>State:</b> ' + esc(e.text) + '</div>';
  }
  function openBlock(c) {
    var h = V.status('heartbeat'), reg = h.state === 'OK' && h.data && h.data.vtes_scheme_registered === true;
    if (c.url) { return '<a class="btn" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.openLabel) + '</a>'; }
    if (c.vtes && reg) { return '<a class="btn" href="' + esc(c.vtes) + '">Open ' + esc(c.name) + '</a>'; }
    if (c.vtes) { return '<div class="v4na" data-na="' + esc(c.id) + '"><b>Open from this page: not available yet.</b> Address ' + esc(c.vtes) + ' is not registered on the PC. <b>One step:</b> ' + esc(c.fix) + '</div>'; }
    return '';
  }
  function render(c) {
    var btn = c.paste ? '<button class="btn pastebtn" type="button" data-to="' + c.id + '">Copy hand-off packet for ' + esc(c.name.split(' / ')[0]) + '</button>'
      : (c.copyOnly ? '<button class="btn copyonly" type="button" data-copy="' + esc(c.copyOnly) + '">' + esc(c.copyLabel) + '</button>' : '');
    return '<div class="card" id="card-' + c.id + '" data-k="' + esc((c.id + ' ' + c.name + ' ' + c.role + ' ' + c.job + ' ' + (c.prefix || '')).toLowerCase()) + '">' +
      '<div class="id">' + c.id + ' &middot; ' + c.e + (c.prefix ? ' &middot; ' + c.prefix : '') + '</div>' +
      '<div class="name">' + esc(c.name) + '</div><div class="role">' + esc(c.role) + '</div>' + stateLine(c) +
      '<p class="job">' + esc(c.job) + (c.tick ? '<span class="v4tick">' + esc(V.tick()) + '</span>.' : '') + '</p>' +
      (c.note ? '<p class="job v4note">' + esc(c.note) + '</p>' : '') + (c.next ? '<p class="job"><b>' + esc(c.next) + '</b></p>' : '') +
      '<div class="row">' + openBlock(c) + btn + '</div>' +
      (c.steps ? '<div class="paste"><b>How:</b> ' + esc(c.steps) + '</div>' : '') +
      '<div class="paste v4cs" id="cs-' + c.id + '" role="status"></div>' +
      (c.prefix ? '<div class="paste">Paste blocks for this window start with ' + c.prefix + '.</div>' : '') + '</div>';
  }
  function bus() {
    return '<div class="card" id="card-BUS" data-k="bus drive mailbox inbox outbox handoff"><div class="id">BUS &middot; &#128236;</div><div class="name">The Drive mailbox</div>' +
      '<div class="role">How every window hands off to the next</div><p class="job">Orders go into VTES-Inbox. Proof comes out of VTES-Outbox.</p>' +
      '<div class="row"><a class="btn" href="' + DRIVE_INBOX + '" target="_blank" rel="noopener">Open VTES-Inbox</a><a class="btn" href="' + DRIVE_OUTBOX + '" target="_blank" rel="noopener">Open VTES-Outbox</a></div></div>';
  }
  window.VTES4C = {
    CARDS: CARDS,
    renderCards: function (el) {
      el.innerHTML = CARDS.map(render).join('') + bus();
      Array.prototype.forEach.call(el.querySelectorAll('.pastebtn'), function (b) {
        b.addEventListener('click', function () {
          var to = b.getAttribute('data-to'), toSel = document.getElementById('to'), fromSel = document.getElementById('from'), cs = document.getElementById('cs-' + to);
          if (fromSel && !fromSel.value) { fromSel.value = 'LLM-04'; }
          if (toSel && Array.prototype.some.call(toSel.options, function (o) { return o.value === to; })) { toSel.value = to; }
          toSel.dispatchEvent(new Event('input')); document.getElementById('go').click();
          setTimeout(function () { cs.textContent = document.getElementById('status').textContent || 'Packet is in the box below. Select it and press Ctrl+C.'; }, 120);
        });
      });
      Array.prototype.forEach.call(el.querySelectorAll('.copyonly'), function (b) {
        b.addEventListener('click', function () {
          var t = b.getAttribute('data-copy'), cs = b.closest('.card').querySelector('.v4cs');
          try { var x = document.createElement('textarea'); x.value = t; document.body.appendChild(x); x.select(); document.execCommand('copy'); document.body.removeChild(x); } catch (e) { }
          cs.textContent = 'Copied the template. Save it as JOB-something.md in VTES-Inbox-LOCAL.';
        });
      });
    },
    /* effective() for the v3 chip/idcard code: {k,h,txt,why}; k in up|warn|down|nod */
    effective: function (id) {
      var e = V.executor(id);
      if (e.state === 'OK') { return { k: 'up', h: 0, txt: e.text, why: '' }; }
      if (e.state === 'STALE') { return { k: 'warn', h: null, txt: e.text, why: '' }; }
      if (e.state === 'DOWN') { return { k: 'down', h: null, txt: 'DOWN - ' + e.text, why: '' }; }
      return { k: 'nod', h: null, txt: e.text, why: 'Nothing has written this window\'s state yet.' };
    }
  };
})();
