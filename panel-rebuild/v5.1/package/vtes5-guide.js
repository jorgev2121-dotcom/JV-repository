/* vtes5-guide.js — panel v5.1 add-on (round 11). One colour scheme + colour key, greyed-out
   pages that are not built yet, and a hover/tap explanation on every tab, button, heading and
   abbreviation. Reads nothing, writes nothing, sends nothing. TRK-2026-9910-C · v5.1 · 2026-10-08 */
(function () {
  'use strict';

  /* Planned pages. Edit "eta" here when an estimate changes; never delete a row until the page is live. */
  var PLANNED = [
    { id: 'approvals-new', tab: 'NEEDS MY APPROVAL', what: 'Every item waiting for you, one card at a time, with two big buttons (recommended first). No typing.', eta: '2026-10-11', dep: 'Panel v5 installed first.' },
    { id: 'billing', tab: 'BILLING', what: 'Fees you paid for clients that were never billed. The red number at the top is money owed to you. One click approves each invoice.', eta: '2026-10-14', dep: 'BILLING SENTINEL phases 1 to 4 (bank feed, county monitor, matching).' },
    { id: 'books', tab: 'BOOKS', what: 'Profit and loss, balance sheet, what clients owe you (AR) and what you owe (AP). Refreshed daily.', eta: '2026-10-10 draft', dep: 'Draft from the files on your PC first. Daily refresh needs your yes to QuickBooks.' },
    { id: 'projects', tab: 'PROJECTS', what: 'Every build, job and pending task, with who is doing it and what it is waiting on.', eta: '2026-10-10', dep: 'Already runs on the PC as its own page; moving it into this panel.' },
    { id: 'county', tab: 'COUNTY MONITOR', what: 'Daily check of the county and city permit sites for every active job: new fees, inspections, citations.', eta: '2026-10-13', dep: 'Builds on the 22 Miami-Dade sources (section 7).' },
    { id: 'orangetree', tab: 'ORANGE TREE', what: 'Your master report for each job or property, with every document in one place.', eta: '2026-10-12', dep: 'RAMBO is upgrading the Plaza, Balmoral, Sugar Hill, Garden Walk and Edison pages.' },
    { id: 'library', tab: 'LLM LIBRARY', what: 'Read-only library of every AI chat and document, in date order.', eta: '2026-10-12', dep: 'Waiting on your yes to the three tiers.' },
    { id: 'protocols', tab: 'PROTOCOLS', what: 'Every rule and protocol, when it was written and changed, and any that conflict.', eta: '2026-10-15', dep: 'Built after the PROJECTS page.' }
  ];

  /* One colour scheme for the whole panel. */
  var KEY = [
    ['ok',    '#1d6b3b', '#e3f3e8', 'solid',  'Green', 'Working or done. Nothing for you to do.'],
    ['move',  '#173f66', '#e8f0f8', 'solid',  'Blue', 'In progress. Someone is working on it.'],
    ['you',   '#6b4100', '#fff1cc', 'solid',  'Amber', 'Waiting on you. Needs your click or answer.'],
    ['bad',   '#b3261e', '#fdeceb', 'solid',  'Red', 'Stalled, broken or blocked. Something is wrong.'],
    ['soon',  '#4a4a47', '#eceae4', 'dashed', 'Grey, dashed', 'Not built yet, or no data yet. Under development.'],
    ['old',   '#5a3e1b', '#f3e7d3', 'solid',  'Tan', 'Old snapshot from an earlier panel. Not live.']
  ];
  var WORDS = {
    ok: ['OK', 'DONE', 'FIXED', 'ADDED', 'LIVE', 'EXECUTED', 'EXECUTED-WITH-PROOF', 'PASS', 'CLOSED', 'CURRENT'],
    move: ['IN PROGRESS', 'IN_PROGRESS', 'MOVING', 'RUNNING', 'WORKING', 'PARTIAL'],
    you: ['NEEDS-YOU', 'NEEDS YOU', 'WAITING', 'WAITING ON YOU', 'WAITING ON JORGE'],
    bad: ['STALLED', 'BLOCKED', 'OPEN', 'FAILED', 'BROKEN', 'NO DATA'],
    soon: ['UNDER DEVELOPMENT', 'PLANNED', 'NOT STARTED', 'NOT_STARTED', 'UNKNOWN'],
    old: ['OLD PANEL', 'SNAPSHOT', 'SUPERSEDED']
  };

  /* Plain-English meaning of every abbreviation and in-house word. Longer keys first. */
  var GLOSS = {
    'VTES-Inbox': 'Google Drive folder where orders for RAMBO are dropped.',
    'VTES-Outbox': 'Google Drive folder where RAMBO writes its results (EXECUTED or BLOCKER files).',
    'Claude Max': 'Your Claude subscription. It has a weekly allowance; when it runs low, Claude windows slow down or stop.',
    'Orange Tree': 'Your master report format for a job or property, built from all of its documents.',
    'MIAMI-DADE': 'Miami-Dade County public websites (property, permits, code cases, courts).',
    'HAND OFF': 'Hand a task to another AI window: write what you want, press the button, paste once.',
    'PASTE-D': 'A block of text meant for the Desktop window (RAMBO). The number never repeats.',
    'PASTE-C': 'A block of text meant for the Cloud window. The number never repeats.',
    'PASTE-X': 'A block of text meant for any other window (Cowork, iPhone, other AIs).',
    'NEEDS-YOU': 'Amber: waiting on your click or answer.',
    'TRK': 'Tracking number. One number per job or project, like TRK-2026-1262. Clients see it.',
    'OPH': 'Orphan number. A document whose job is not known yet. Becomes a TRK once matched.',
    'RAMBO': 'Claude Code on your Windows PC (LLM-01). The only window that can touch your files, Chrome, 1Password and the county sites.',
    'LOCAL': 'A free AI model that runs on your own PC (Ollama). Uses no Claude allowance. Used for private client data.',
    'Ollama': 'The free program that runs AI models on your own PC.',
    'COWORK': 'Claude Cowork window (LLM-03). Long documents and analysis. It can send orders but cannot receive them from the Inbox.',
    'Cowork': 'Claude Cowork window (LLM-03). Long documents and analysis.',
    'CLOUD': 'Claude Code on the web (LLM-02). Keeps the records. Cannot touch your PC.',
    'LLM': 'An AI chat program, such as Claude, ChatGPT, Gemini or Grok. LLM-01 to LLM-09 are your windows.',
    'LLMS': 'The list of every AI window you have, with what each one is for.',
    'Codex': 'OpenAI’s coding helper, installed on your PC.',
    'Gemini': 'Google’s AI.',
    'Grok': 'The AI from xAI (Elon Musk’s company).',
    'Orchestrator': 'A script on your PC that reads every result in the Outbox and closes, re-sends or flags it.',
    'Dispatcher': 'A script that decides which worker (lane) gets each job.',
    'Governor': 'A script that watches usage and budget so no worker runs out.',
    'lane': 'One of the workers that can take a job: RAMBO, LOCAL, Cowork, Codex or Gemini.',
    'Heartbeat': 'A small file the PC rewrites every few minutes to prove it is alive.',
    'heartbeat': 'A small file the PC rewrites every few minutes to prove it is alive.',
    'capsule': 'One job’s folder in 01-JOBS on Google Drive, holding all of its documents.',
    'jacket': 'The county’s file folder on a property (tax or building records).',
    'MDC': 'Miami-Dade County.',
    'DD': 'Due diligence: a research report on a property (owners, permits, liens, cases).',
    'EPS': 'Miami-Dade’s Electronic Permits and Reviews System, the online permit portal.',
    'RER': 'Miami-Dade Regulatory and Economic Resources, the department that runs permits.',
    'DERM': 'Miami-Dade’s environmental department (Division of Environmental Resources Management).',
    'NOC': 'Notice of Commencement, the form recorded before permitted work starts.',
    'CU': 'Certificate of Use. Also short for CU Inspections of South Florida.',
    'OCR': 'Reading the text out of scanned pages so they can be searched.',
    'PII': 'Personal identifying information: Social Security, bank, card, licence, date of birth, home address.',
    'CDM': 'Comparative Decision Model, the funding model that lives in Cowork.',
    'FHFC': 'Florida Housing Finance Corporation.',
    'RFA': 'Request for Applications, a Florida Housing funding round.',
    'CAPTCHA': 'A “prove you are human” puzzle that blocks robots.',
    'Plaid': 'A service that links bank accounts using the bank’s own login screen. No password is stored.',
    'P&L': 'Profit and loss: money in minus money out, for a period.',
    'AR': 'Accounts receivable: money clients owe you.',
    'SBA': 'U.S. Small Business Administration (your SBA loan).',
    'ACH': 'An electronic bank-to-bank transfer.',
    'folio': 'The county’s ID number for a property.',
    'GREEN': 'Safe to run on its own, even at night.',
    'RED': 'Needs your yes first: filing, sending, money, passwords.',
    'MONEY': 'A job that brings money in. Flagged after 7 quiet days.',
    'ACK': 'A receipt saying a message arrived. It does not mean the work was done.',
    'HTA': 'A one-click Windows mini-program RAMBO leaves on your Desktop for you to double-click.',
    'Codex lane': 'The Codex worker on your PC.'
  };
  var PATTERNS = [
    [/\bTRK-\d{2,4}-\d{3,4}[A-Za-z0-9-]*/g, 'Tracking number: one job or project.'],
    [/\bOPH-\d{4}-\d{4}\b/g, 'Orphan number: a document whose job is not known yet.'],
    [/\bOD-\d+[A-Z]?\b/g, 'Owner directive: a standing order from you.'],
    [/\bAP-\d{4}\b/g, 'Approval item number: something waiting for your yes or no.'],
    [/\bLLM-0\d\b/g, 'One of your AI windows. See section 2, LLMs.'],
    [/\bRI-\d{3}\b/g, 'Recurring-issue number: a problem that has come back before.']
  ];

  /* Hover text for every tab, by its label. */
  var TABTIP = {
    'LLMS': 'Every AI window you have and what each one is for.',
    'EXECUTORS': 'The workers that take jobs off your hands, and which ones cost Claude allowance.',
    'BOTS': 'Scheduled jobs that run on your PC by themselves, and whether they ran.',
    'HAND OFF': 'Send a task to another window: say what you want, press the button, paste once.',
    'QUEUED': 'Jobs ready to send. One click fills the note box.',
    'STATUS': 'Live health of the PC, RAMBO and the Inbox/Outbox.',
    'REPAIRS': 'Log of what was fixed or added, and what is still open.',
    'MIAMI-DADE': 'The 22 public county websites and the proof file for each.',
    'APPROVALS': 'Old snapshot of approvals waiting for you. The live version will be NEEDS MY APPROVAL.',
    'SESSIONS': 'Old snapshot of which AI sessions were open.',
    'JOBS': 'Old snapshot of active jobs.',
    'CAPSULES': 'Old snapshot of job folders in 01-JOBS.',
    'BRIDGES': 'Old snapshot of the links between windows.',
    'AGENTS': 'Old snapshot of the AI helpers and what each does.',
    'USAGE': 'Old snapshot of how much Claude allowance was used.',
    'PLAUD': 'Old snapshot of your Plaud voice-recorder notes.',
    'CLIENTS': 'Old snapshot of the client list.',
    'RULES': 'Old snapshot of the standing rules.'
  };

  var CSS = [
    '.v51tip{position:fixed;z-index:100000;max-width:380px;background:#1d1d1b;color:#fff;font:600 1.0625rem/1.4 "Segoe UI",Arial,sans-serif;padding:10px 14px;border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,.3);pointer-events:none;display:none}',
    'abbr.v51g{text-decoration:underline dotted 2px;text-underline-offset:3px;cursor:help}',
    '.v51pill{display:inline-block;padding:1px 9px;border-radius:999px;font-weight:800;border-width:2px}',
    '.v51key{background:#fff;border:2px solid #1b5e9e;border-radius:12px;padding:6px 14px;margin:10px 0}',
    '.v51key summary{font-weight:800;font-size:1.125rem;cursor:pointer}',
    '.v51key ul{list-style:none;margin:6px 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:6px 16px}',
    '.v51key li{display:flex;gap:8px;align-items:center;font-size:1rem}',
    '.v51key .v51sw{flex:0 0 auto;min-width:118px;text-align:center}',
    '.v51key p{margin:6px 0;font-size:1rem}',
    '.tab.v51soon{order:3;background:#eceae4 !important;border:2px dashed #8a8a84 !important;color:#4a4a47 !important}',
    '.v5tabhint{background:#fff !important;color:#173f66 !important;border:2px solid #1b5e9e}',
    '#vtes-back-to-panel a{background:#f3e7d3 !important;color:#3d2a10 !important;border-color:#b08a55 !important}',
    '.tab.v51soon small{background:#dcd9d1 !important;color:#3a3a37 !important}',
    '.tab.panel{background:#f3e7d3 !important;border-color:#b08a55 !important}',
    '.tab.panel small{background:#e8d4b0 !important;color:#3d2a10 !important}',
    '.v51page{background:#eceae4;border:2px dashed #8a8a84;border-radius:14px;padding:12px 18px;margin:0 0 14px;color:#3a3a37}',
    '.v51page h3{margin:0 0 4px;font-size:1.3125rem;color:#4a4a47}',
    '.v51page .v51eta{font-weight:800}',
    '.v5st.neu{background:#e8f0f8 !important;color:#173f66 !important;border-color:#1b5e9e !important}',
    '.v5st.stk{background:#fdeceb !important;color:#b3261e !important;border-color:#b3261e !important}',
    '.v5st.unp,.v5b.na{background:#eceae4 !important;color:#4a4a47 !important;border:2px dashed #8a8a84 !important}',
    '.v5na{background:#eceae4 !important;border-color:#8a8a84 !important;color:#3a3a37 !important}',
    '.v5old{background:#f3e7d3 !important;border-color:#b08a55 !important;color:#3d2a10 !important}',
    '.repair-log .repair-open{background:#fdeceb !important;color:#b3261e !important}',
    '.repair-log .repair-open td:first-child{border-left-color:#b3261e !important}',
    '.btn.alt{background:#fff !important;color:#1b5e9e !important;border:2px solid #1b5e9e !important}'
  ];
  KEY.forEach(function (k) {
    CSS.push('.v51pill.' + k[0] + '{color:' + k[1] + ';background:' + k[2] + ';border:2px ' + k[3] + ' ' + k[1] + '}');
  });

  function $(i) { return document.getElementById(i); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function stateOf(txt) {
    var t = txt.trim().toUpperCase().replace(/\s+/g, ' ');
    for (var k in WORDS) { if (WORDS[k].indexOf(t) !== -1) return k; }
    return '';
  }
  function keyRow(k) { return KEY.filter(function (r) { return r[0] === k; })[0]; }

  /* tooltip */
  var tip;
  function showTip(el) {
    var txt = el.getAttribute('data-tip'); if (!txt) return;
    tip.textContent = txt; tip.style.display = 'block';
    var r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    var y = r.bottom + 8; if (y + h > window.innerHeight - 8) y = Math.max(8, r.top - h - 8);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() { if (tip) tip.style.display = 'none'; }
  function wireTips() {
    tip = document.createElement('div'); tip.className = 'v51tip'; tip.id = 'v51tip'; tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    document.addEventListener('mouseover', function (e) { var t = e.target.closest && e.target.closest('[data-tip]'); if (t) showTip(t); else hideTip(); });
    document.addEventListener('focusin', function (e) { var t = e.target.closest && e.target.closest('[data-tip]'); if (t) showTip(t); });
    document.addEventListener('focusout', hideTip);
    document.addEventListener('scroll', hideTip, true);
    document.addEventListener('click', function (e) { var t = e.target.closest && e.target.closest('abbr.v51g'); if (t) { showTip(t); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideTip(); });
  }

  /* abbreviations: wrap matches in visible text */
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1, ABBR: 1, CODE: 1, BUTTON: 1, NOSCRIPT: 1 };
  var keys = Object.keys(GLOSS).sort(function (a, b) { return b.length - a.length; });
  var wordRe = new RegExp('(^|[^A-Za-z0-9&-])(' + keys.map(function (k) { return k.replace(/[.*+?^${}()|[\]\\&]/g, '\\$&'); }).join('|') + ')(?=$|[^A-Za-z0-9&-])', 'g');
  function findMatches(s) {
    var out = [], m;
    PATTERNS.forEach(function (p) { p[0].lastIndex = 0; while ((m = p[0].exec(s))) out.push([m.index, m[0], p[1]]); });
    wordRe.lastIndex = 0;
    while ((m = wordRe.exec(s))) out.push([m.index + m[1].length, m[2], GLOSS[m[2]]]);
    out.sort(function (a, b) { return a[0] - b[0] || b[1].length - a[1].length; });
    var kept = [], end = -1;
    out.forEach(function (o) { if (o[0] >= end) { kept.push(o); end = o[0] + o[1].length; } });
    return kept;
  }
  function wrapText(node) {
    var s = node.nodeValue; if (!s || s.trim().length < 2) return;
    var ms = findMatches(s); if (!ms.length) return;
    var frag = document.createDocumentFragment(), pos = 0;
    ms.forEach(function (m) {
      if (m[0] > pos) frag.appendChild(document.createTextNode(s.slice(pos, m[0])));
      var a = document.createElement('abbr'); a.className = 'v51g'; a.setAttribute('data-tip', m[1] + ': ' + m[2]); a.tabIndex = 0;
      a.textContent = m[1]; frag.appendChild(a); pos = m[0] + m[1].length;
    });
    if (pos < s.length) frag.appendChild(document.createTextNode(s.slice(pos)));
    node.parentNode.replaceChild(frag, node);
  }
  function glossWalk(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        for (var p = n.parentNode; p && p !== document.body; p = p.parentNode) {
          if (SKIP[p.nodeName] || (p.classList && (p.classList.contains('tabs') || p.classList.contains('v51tip') || p.classList.contains('v51key')))) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var list = [], n; while ((n = w.nextNode())) list.push(n);
    list.forEach(wrapText);
  }

  /* status words become coloured pills, everywhere the whole cell or label is one status word */
  function pillWalk(root) {
    root.querySelectorAll('td, .v5b, .v5st').forEach(function (el) {
      if (el.querySelector('.v51pill')) return;
      var k = stateOf(el.textContent); if (!k || el.children.length > 1) return;
      var r = keyRow(k);
      if (el.nodeName === 'TD') { el.innerHTML = '<span class="v51pill ' + k + '" data-tip="' + esc(r[4] + ': ' + r[5]) + '">' + esc(el.textContent.trim()) + '</span>'; }
      else if (!el.getAttribute('data-tip')) { el.setAttribute('data-tip', r[4] + ': ' + r[5]); }
    });
  }

  /* tips on tabs, buttons, headings, cards */
  function tipWalk(root) {
    root.querySelectorAll('.tab').forEach(function (t) {
      if (t.getAttribute('data-tip')) return;
      var label = (t.firstChild && t.firstChild.nodeType === 3 ? t.firstChild.nodeValue : t.textContent).trim();
      var base = TABTIP[label] || ('Jumps to the ' + label + ' section.');
      if (t.classList.contains('panel')) base += ' Tan = old snapshot of 2026-09-02, opens the old panel, not live.';
      else if (!t.classList.contains('v51soon')) base += ' Blue = live page on this panel.';
      t.setAttribute('data-tip', base); t.removeAttribute('title');
    });
    root.querySelectorAll('button, a.btn').forEach(function (b) {
      if (b.getAttribute('data-tip')) return;
      var label = b.textContent.trim().replace(/\s+/g, ' ');
      var kind = b.classList.contains('alt') ? 'White button = optional or look-only.' : 'Blue button = does it now.';
      b.setAttribute('data-tip', (b.getAttribute('title') || ('Click to: ' + label + '.')) + ' ' + kind);
      b.removeAttribute('title');
    });
    root.querySelectorAll('h2, h3').forEach(function (h) {
      if (h.getAttribute('data-tip') || h.closest('.v51key')) return;
      var lead = h.nextElementSibling;
      var t = lead && lead.classList && (lead.classList.contains('lead') || lead.classList.contains('sub')) ? lead.textContent.trim() : '';
      if (t) h.setAttribute('data-tip', t.length > 240 ? t.slice(0, 237) + '...' : t);
    });
  }

  function buildKey() {
    var html = '<details class="v51key" id="v51key" open><summary data-tip="What each colour on this panel means. Click to fold away.">Colour key: what the colours mean</summary><ul>' +
      KEY.map(function (k) { return '<li><span class="v51pill v51sw ' + k[0] + '">' + esc(k[4]) + '</span><span>' + esc(k[5]) + '</span></li>'; }).join('') +
      '</ul><p><b>Buttons:</b> <span class="v51pill move">Blue button</span> does it now. <span class="v51pill" style="color:#1b5e9e;background:#fff;border:2px solid #1b5e9e">White button</span> optional or look-only. ' +
      '<b>Tabs:</b> blue = live page, tan = old snapshot, grey dashed = under development.</p>' +
      '<p><b>Hover</b> over anything, or <b>tap</b> a word with a dotted underline, to see what it means.</p></details>';
    var anchor = $('v5tabhint') || $('tabs');
    if (anchor) anchor.insertAdjacentHTML('afterend', html);
    try { var d = $('v51key'); if (localStorage.getItem('v51key') === 'closed') d.open = false; d.addEventListener('toggle', function () { try { localStorage.setItem('v51key', d.open ? 'open' : 'closed'); } catch (e) {} }); } catch (e) {}
  }

  function buildPlanned() {
    var tabs = $('tabs');
    if (tabs) {
      tabs.insertAdjacentHTML('beforeend', PLANNED.map(function (p) {
        return '<a class="tab v51soon" href="#v51-' + p.id + '" aria-disabled="true" data-tip="' + esc(p.tab + ': ' + p.what + ' UNDER DEVELOPMENT. Expected ' + p.eta + ' (estimate).') + '">' + esc(p.tab) + '<small>Under development, expected ' + esc(p.eta) + '</small></a>';
      }).join(''));
    }
    var foot = document.querySelector('p.sub[style]') || document.body.lastElementChild;
    var html = '<h2 id="v51-soon">8. Pages under development</h2><p class="lead">These pages are planned and greyed out until they are built. Each shows its expected date. Dates are estimates set 2026-10-08 and change only when this file changes.</p>' +
      PLANNED.map(function (p) {
        return '<div class="v51page" id="v51-' + p.id + '"><h3>' + esc(p.tab) + ' <span class="v51pill soon">UNDER DEVELOPMENT</span></h3><p>' + esc(p.what) + '</p><p><span class="v51eta">Expected: ' + esc(p.eta) + ' (estimate).</span> ' + esc(p.dep) + '</p></div>';
      }).join('');
    if (foot && foot.parentNode) foot.insertAdjacentHTML('beforebegin', html);
  }

  function fixHint() {
    var h = $('v5tabhint'), t = $('tabs'); if (!h || !t || !h.textContent) return;
    var n = t.querySelectorAll('a.tab').length;
    var want = 'There are ' + n + ' tabs. Some are off the right edge: drag the bar under the tabs to the right, swipe the tabs sideways, or hold Shift and turn the mouse wheel. Blue live tabs come first, then the tan OLD PANEL tabs, then the grey pages under development.';
    if (h.textContent !== want) h.textContent = want;
  }
  function backTips() {
    document.querySelectorAll('#vtes-back-to-panel a').forEach(function (a) {
      if (!a.getAttribute('data-tip')) a.setAttribute('data-tip', 'Opens the old panel from 2026-09-02 in a new view. Tan = old snapshot, not live.');
    });
  }

  function pass(root) { try { fixHint(); } catch (e) {} try { backTips(); } catch (e) {} try { pillWalk(root); } catch (e) {} try { tipWalk(root); } catch (e) {} try { glossWalk(root); } catch (e) {} }

  function start() {
    var st = document.createElement('style'); st.id = 'v51css'; st.textContent = CSS.join('\n'); document.head.appendChild(st);
    try { buildPlanned(); } catch (e) {}
    try { buildKey(); } catch (e) {}
    try { wireTips(); } catch (e) {}
    pass(document.body);
    window.addEventListener('resize', function () { setTimeout(fixHint, 50); });
    var timer = null;
    try {
      new MutationObserver(function () { if (timer) return; timer = setTimeout(function () { timer = null; pass(document.body); }, 400); })
        .observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
    window.VTES51 = { planned: PLANNED, key: KEY, gloss: GLOSS };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
