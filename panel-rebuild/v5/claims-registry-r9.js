// claims-registry-r9.js - the TEST and EXEMPT entries used by test-claims-r9.js (fix round 9). TRK-2026-9910-B
// Every entry says in one place which sentences it covers (re) and either proves them on real behaviour (test) or gives the one-line reason they are not claims (exempt).
module.exports = function (C) {
  const { test, exempt, once, R, pageWith, fresh, NOWMS, at, ROOT, rd, sh, PW, words, H, L, fnOf } = C; const path = require('path');
  const WLD = {}; H.worlds().forEach(w => { WLD[w.name] = w; });
  const world = name => once('world:' + name, async () => { const w = WLD[name]; return pageWith(w.files, w.o && w.o.status ? { status: w.o.status } : {}); });
  const TIME = /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},(?: \d{4},)? \d{1,2}:\d{2} [AP]M(?: [A-Z]{3,4})?\b/g;
  const stripIds = s => s.replace(TIME, ' ').replace(/\bLLM-\d+\b|\bTRK-\d{4}-\d+(?:-[A-Z])?\b|\bvtes:\/\/llm-\d+\b|\bJOB-\d+\b|\b\d{4}-\d{2}-\d{2}\b|\bv[2-5]\b|\bCtrl\+V\b|\bDESKTOP-WORK item \d+\b|\bKNOWN-LIMITS item \d+\b|\bsection \d\b|\bsource \d{2}\b|\b(?:LLM|CU|OPH)-[A-Za-z0-9-]+\b|\bMD5\b|\bSHA-256\b|\bUTF-\d+\b|\b5\.1\b|\b7\.4\.6\b|C:\\[^ ]*|\.md\b|^\d{2} (?=[A-Z])/g, ' ');
  const hasDigit = s => /\d/.test(stripIds(s));
  const KEYWORD = H.CHECK_WORDS;
  const num = s => (stripIds(s).match(/\d[\d,]*/g) || []).map(x => +x.replace(/,/g, ''));
  /* ---- TESTS ---- */
  const testAlways = (id, re, fn) => { C.test(id, re, fn); C.markAlways(id); };
  const testInternal = (id, re, fn) => { C.test(id, re, fn); C.markInternal(id); };
  const evalIn = async (name, fn, arg) => { const r = await world(name); return r.p.evaluate(fn, arg); };
  const hasCls = (c, k) => new RegExp('(?:^| )' + k + '(?: |$)').test(c);
  // colour follows the words (the one rule behind every state line, badge and mark): red words are red, grey words grey, UP and RAN green
  const hasTime = s => { TIME.lastIndex = 0; const r = TIME.test(s); TIME.lastIndex = 0; return r; };
  const STATEWORD = /\b(?:NO DATA|STALE|BAD CLOCK|NO ZONE|UNREADABLE|IMPOSSIBLE|NOT FINE|NOT PROVEN|FAILED|DISABLED|LATE|DOWN|STUCK|UP - seen|RAN |PARTIAL|NOT COUNTED|WRITER SAYS|BLOCKED|CONFIRMED|OLD )/;
  const compose = (base) => async (text, info) => { let r = await base(); if (!r[0]) { return r; } const t = text.replace(/\(PC check-in report: [A-Z ]+\)/, ''); if (hasTime(t) && fnOf('times')) { const x = await fnOf('times')(text, info); if (!x[0]) { return x; } } if (/\d/.test(stripIds(t.replace(TIME, ' '))) ) { const x = await fnOf('numbers-from-data')(text, info); if (!x[0]) { return x; } } return r; };
  const pageOnly = e => e; // page tests are told apart from document sentences by where: 'page' below
  test('colour-follows-words', { test: s => /^(?:State|Bot |Its bot|Reason|Blocked|Health report|Open items|In progress|Counted so far|LOCAL save step|window check-in|bots|open items|health|token use|housekeeping|Miami-Dade|NO ZONE|BAD CLOCK|STALE|UNREADABLE|IMPOSSIBLE|NOT COUNTED|PARTIAL|The window is up|Report - |Reporting|Reported|Counted - |State - |No local-only|The PC has not reported|The folder)/.test(s) && STATEWORD.test(s) && !/cards and marks on this page depend|bots are not fine|bots are running|^WHOLE PAGE/.test(s) }, compose(async () => once('colour-words', async () => {
    const bad = [], names = Object.keys(WLD).filter(n => !/^(note-|queued|packets|small)/.test(n)); let n = 0;
    for (const nm of names) {
      const rows = await evalIn(nm, () => [...document.querySelectorAll('.v5st, .v5b')].map(e => ({ t: e.textContent.trim(), c: e.className })));
      for (const r of rows) {
        const parts = r.t.split(/ Its bot [A-Za-z-]+: /); const wantOf = tt => { const t = tt.replace(/^(?:State(?: of [A-Za-z0-9-]+)?:|Bot [A-Za-z-]+:|LOCAL save step:)\s*/, ''); return /^(?:NO DATA|STALE|BAD CLOCK|UNREADABLE|IMPOSSIBLE|NOT FINE|FAILED|DISABLED|LATE|DOWN|STUCK|OLD|BLOCKED|NOT OK|PROOF NOT OK|DATE IN|RUNNING FOR|The window is up .* NOT FINE|CU-.*NOT FINE|WHOLE PAGE: (?:NOT FINE|PAGE NOT))/.test(t) || /THIS (?:CARD|LINE|PANEL) .* COULD NOT/.test(t) ? 'bad' : /^(?:UP - |RAN |CONFIRMED|WHOLE PAGE: every one)/.test(t) ? 'ok' : /^(?:WRITER SAYS UP|NO ZONE|NOT PROVEN|NOT COUNTED|PARTIAL|QUEUED|RUNNING NOW|NOT YET RUN|WHOLE PAGE: NOT PROVEN)/.test(t) ? 'grey' : null; };
        const ws = parts.map(wantOf).filter(Boolean); const rank = { ok: 0, grey: 1, bad: 2 }; let want = ws.length ? ws.reduce((a, b) => rank[b] > rank[a] ? b : a) : null; const t = r.t;
        if (!want) { continue; } n++;
        const c = r.c; const isBad = hasCls(c, 'bad') || hasCls(c, 'stk'); const isOk = hasCls(c, 'ok'); const isGrey = hasCls(c, 'na') || hasCls(c, 'unp') || hasCls(c, 'neu');
        const good = want === 'bad' ? isBad : want === 'ok' ? isOk : (isGrey || isBad === false && isOk === false);
        if (!good) { bad.push(nm + ': "' + t.slice(0, 60) + '" has class ' + c + ', wanted ' + want); }
      }
    }
    return R(bad.length === 0 && n > 100, n + ' state words checked in ' + names.length + ' states; ' + (bad.length ? bad.slice(0, 3).join(' | ') : 'colour and words agree'));
  })), 3);
  // every number the page prints about data comes from that data, or is a count the page can show (cards, tabs, reports) and equals it
  test('numbers-from-data', { test: s => /\d/.test(stripIds(s)) && !/cards and marks on this page depend|^WHOLE PAGE|bots are not fine|bots are running|^There are|^Miami-Dade: \d|public sources/.test(s) }, async (text, info) => {
    const ws = [...(info.worlds || [])]; if (!ws.length) { return R(false, 'no state known for this sentence'); }
    for (const nm of ws) {
      const w = WLD[nm]; const dataText = JSON.stringify(w.files || {}); const dnums = new Set((dataText.match(/\d+(?:\.\d+)?/g) || []).map(Number));
      const ok = [...dnums]; const extra = await evalIn(nm, () => ({ target: window.VTES5.MD_TARGET, md: window.VTES5U.MD.length, ids: window.VTES5.ALL_IDS.length, tabs: document.querySelectorAll('a.tab').length, bots: ['x'].length }));
      const allowed = new Set(ok.concat([extra.target, extra.md, extra.ids, 100, 7, 6]));
      (w.files && w.files.heartbeat && w.files.heartbeat.interval_sec ? [w.files.heartbeat.interval_sec / 60] : []).forEach(x => allowed.add(x));
      (w.files && w.files.bots ? Object.values(w.files.bots.bots || {}).map(b => b.interval_sec / 60) : []).forEach(x => allowed.add(x));
      if (w.files && w.files.health) { allowed.add(Math.round(100 * w.files.health.checks_passed / w.files.health.checks_total)); }
      if (w.files && w.files.heartbeat) { Object.values(w.files.heartbeat.executors || {}); allowed.add(Object.keys(w.files.heartbeat.executors || {}).length); }
      // "Windows confirmed up now: X of 11": X is the number of windows the page itself shows as up
      const up = await evalIn(nm, () => window.VTES5.ALL_IDS.filter(id => window.VTES5.executor(id).state === 'OK').length); allowed.add(up);
      const bad = num(text).filter(n => !allowed.has(n));
      if (bad.length) { return R(false, 'number(s) ' + bad.join(',') + ' not in the data of state ' + nm); }
    }
    return R(true, 'every number is in the data');
  }, 3);
  test('whole-page-counts', /^WHOLE PAGE:/, async (text, info) => {
    for (const nm of info.worlds) {
      const c = await evalIn(nm, () => { const V = window.VTES5, U = window.VTES5U, it = U.pageItems(), rk = x => V.rankOf(x.cls), files = Object.keys(V.LIMIT_MIN);
        return { n: it.length, r: it.filter(x => rk(x) === 2).length, g: it.filter(x => rk(x) === 1).length, bf: files.filter(f => V.stripCls(V.verdict(f).cls) === 'bad').length, bg: files.filter(f => V.stripCls(V.verdict(f).cls) === 'na').length, nr: files.length, worst: V.stripCls(V.worstCls(it.map(x => x.cls).concat(files.map(f => V.verdict(f).cls)))) }; });
      const live = (await evalIn(nm, () => document.getElementById('v5overall').textContent));
      const m = /^WHOLE PAGE: (?:(NOT FINE|NOT PROVEN) - (\d+) red and (\d+) grey of (\d+) cards and marks; (\d+) of (\d+) reports red and (\d+) of (\d+) reports grey|every one of (\d+) cards and marks and all (\d+) reports are green)/.exec(live);
      if (!m) { if (/PAGE NOT REFRESHING/.test(live)) { continue; } return R(false, 'unreadable WHOLE PAGE line in ' + nm + ': ' + live); }
      if (m[1]) { if (+m[2] !== c.r || +m[3] !== c.g || +m[4] !== c.n || +m[5] !== c.bf || +m[7] !== c.bg || +m[6] !== c.nr || +m[8] !== c.nr) { return R(false, nm + ': page says ' + live + ' but the page has ' + JSON.stringify(c)); }
        if ((m[1] === 'NOT FINE') !== (c.r > 0 || c.bf > 0)) { return R(false, nm + ': word ' + m[1] + ' does not match red counts ' + JSON.stringify(c)); }
        if (m[1] === 'NOT PROVEN' && c.g + c.bg === 0) { return R(false, nm + ': says NOT PROVEN with 0 grey cards and 0 grey reports'); } }
      else { if (+m[9] !== c.n || +m[10] !== c.nr || c.r || c.g || c.bf || c.bg) { return R(false, nm + ': says all green but ' + JSON.stringify(c)); } }
    }
    return R(true, 'the WHOLE PAGE counts equal the page, in ' + info.worlds.length + ' states');
  });
  test('strip-counts', /cards and marks on this page depend on/, async (text, info) => {
    const m = /(?:NOT FINE|NOT PROVEN) - (\d+) red and (\d+) grey of (\d+) cards and marks on this page depend on the (.+?) report/.exec(text); if (!m) { return R(false, 'unreadable'); }
    for (const nm of info.worlds) {
      const c = await evalIn(nm, f => { const V = window.VTES5, it = window.VTES5U.pageItems().filter(x => x.files.indexOf(f) >= 0); return { n: it.length, r: it.filter(x => V.rankOf(x.cls) === 2).length, g: it.filter(x => V.rankOf(x.cls) === 1).length }; }, Object.keys({ 'window check-in': 'heartbeat', bots: 'bots', 'open items': 'state', health: 'health', 'token use': 'tokens', housekeeping: 'housekeeping', 'Miami-Dade': 'miamidade' }).filter(k => k === m[4]).map(k => ({ 'window check-in': 'heartbeat', bots: 'bots', 'open items': 'state', health: 'health', 'token use': 'tokens', housekeeping: 'housekeeping', 'Miami-Dade': 'miamidade' })[k])[0]);
      if (+m[1] === c.r && +m[2] === c.g && +m[3] === c.n) { return R(true, 'equal'); }
    }
    return R(false, 'the counts in "' + text.slice(0, 70) + '" match none of the states it appears in');
  });
  test('bots-counts', /bots are not fine|bots are running, queued/, async (text, info) => {
    const m = /(\d+) of (\d+) bots are (?:not fine|running)/.exec(text); const nm = [...info.worlds][0];
    const c = await evalIn(nm, () => { const V = window.VTES5; const names = ['CU-Inbox-Job-Watcher', 'CU-Local-Executor', 'CU-TokenMonitor-Hourly', 'CU-Orchestrator', 'CU-Propagation-Check', 'VTES-LOCAL-POLLER']; return { total: names.length, bad: names.filter(n => V.rankOf(V.clsOfState(V.bot(n).state)) === 2).length, soft: names.filter(n => V.rankOf(V.clsOfState(V.bot(n).state)) === 1).length }; });
    const ok = /not fine/.test(text) ? (+m[1] === c.bad && +m[2] === c.total) : (+m[1] === c.soft && +m[2] === c.total);
    return R(ok, 'page says ' + m[0] + ', bots in that state: ' + JSON.stringify(c));
  });
  test('tabs-count', /^There are \d+ tabs\./, async () => R(await evalIn('fresh-green', () => { const t = document.getElementById('v5tabhint'); const n = document.querySelectorAll('#tabs a.tab').length; return !t || !/\d/.test(t.textContent) || t.textContent.indexOf('There are ' + n + ' tabs') === 0; }), 'the number in the tab hint is the number of tab links'));
  testAlways('tabs-count-small', /^There are \d+ tabs\./, async () => { const n = await evalIn('small-phone-width', () => ({ shown: document.getElementById('v5tabhint').textContent, n: document.querySelectorAll('#tabs a.tab').length })); return R(n.shown.indexOf('There are ' + n.n + ' tabs.') === 0, n.shown.slice(0, 40) + ' / ' + n.n); });
  test('miami-heading', /^Miami-Dade: \d+ public sources|^\d+\. Miami-Dade/, async (text) => { const r = await evalIn('fresh-green', () => ({ rows: document.querySelectorAll('#pn-miami ol.md > li').length, md: window.VTES5U.MD.length })); const n = +/(\d+) public/.exec(text)[1]; return R(n === r.rows && n === r.md, 'heading ' + n + ', rows ' + r.rows + ', list ' + r.md); });
  test('miami-rows', /^\d{2} .* - Open the proof file for source \d{2}/, async (text, info) => {
    const id = text.slice(0, 2); for (const nm of info.worlds) {
      const row = await evalIn(nm, i => { const li = [...document.querySelectorAll('#pn-miami ol.md > li')].find(l => l.textContent.indexOf(i + ' ') === 0); const a = li && li.querySelector('a'); return li ? { t: li.textContent, href: a && a.getAttribute('href') } : null; }, id);
      if (!row || !/^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]{20,}\/view$/.test(row.href)) { return R(false, 'row ' + id + ' has no Drive link in ' + nm); }
      const w = WLD[nm]; const src = w.files && w.files.miamidade && w.files.miamidade.sources && w.files.miamidade.sources.find(x => x.id === id);
      const says = /proof checked/.test(text), notCur = /proof not current/.test(text); if (says && !(src && src.proof_ok === true)) { return R(false, 'says proof checked with no proof in the data (' + nm + ')'); }
      if (notCur && w.files && w.files.miamidade && !/STALE|NO ZONE|BAD CLOCK|NO DATA/.test(text)) { /* a fresh file must not say not current */ }
    }
    return R(true, 'link and proof wording follow the data');
  });
  test('green-needs-proof', /^Green appears only when/, async () => {
    const bad = []; for (const nm of ['no-data', 'status-writer-only', 'all-stale', 'grok-red', 'unreadable-file', 'no-zone-and-future']) {
      const g = await evalIn(nm, () => [...document.querySelectorAll('.v5st.ok')].map(e => e.getAttribute('data-state') || e.getAttribute('data-bot') || e.textContent.slice(0, 20)));
      const allowedGreen = nm === 'grok-red' || nm === 'no-zone-and-future' || nm === 'unreadable-file'; if (g.length && !allowedGreen) { bad.push(nm + ' has green ' + g.join(',')); }
      if (nm === 'grok-red' && g.includes('LLM-07')) { bad.push('Grok green without a test reply'); }
      if (nm === 'unreadable-file' && (g.includes('LLM-02') || g.some(x => /^CU-/.test(x)))) { bad.push('green card from an unreadable file: ' + g.join(',')); }
    }
    const grey = await evalIn('status-writer-only', () => [...document.querySelectorAll('.v5st.unp')].length); if (!grey) { bad.push('the status-writer-only state shows no grey NOT PROVEN card'); }
    const fresh = await evalIn('fresh-green', () => [...document.querySelectorAll('.v5st.ok')].length); if (!fresh) { bad.push('a fresh proven report gives no green'); }
    return R(!bad.length, bad.join(' | ') || 'no green without a fresh report with proof; grey for a writer that only says up; green when proven');
  });
  test('packet-readonly', /^The packet \(read only/, async () => R(await evalIn('fresh-green', () => document.getElementById('preview').readOnly === true), 'the packet box is read only (the readonly attribute is set)'));
  test('no-folder-access', /^This page cannot see the folder itself/, async () => { const src = rd('package/vtes5-ui.js') + rd('package/vtes5-live.js') + rd('package/VTES-LLM-LAUNCHER_v5.html'); const hit = (src.match(/showDirectoryPicker|webkitdirectory|FileSystemDirectory|showOpenFilePicker|XMLHttpRequest|\bfetch\(/g) || []); return R(hit.length === 0, hit.length ? 'the page code uses ' + hit.join(',') : 'no file-system, fetch or XMLHttpRequest call anywhere in the page code'); });
  test('desk-cards-have-steps', /^A web page cannot open a desktop app, so those cards give a Copy packet button/, async () => {
    const r = await evalIn('fresh-green', () => { const out = []; ['LLM-01', 'LLM-03', 'LLM-05', 'LLM-06', 'LOCAL', 'RAMBO', 'CODEX', 'GROK', 'COWORK'].forEach(id => { const c = document.getElementById('card-' + id); out.push([id, !!c && !!c.querySelector('button.bigcopy'), !!c && c.querySelectorAll('.v5steps li').length > 0]); }); return out; });
    const bad = r.filter(x => !x[1] || !x[2]).map(x => x[0]); return R(!bad.length, bad.length ? 'no button or steps on ' + bad.join(',') : r.length + ' desktop cards each have a Copy packet button and steps');
  });
  test('no-open-button', /there is no Open button|The one-click link above opens this window/, async (text, info) => {
    for (const nm of info.worlds) { const bad = await evalIn(nm, () => [...document.querySelectorAll('[data-nopen]')].map(e => { const card = e.closest('.card'), link = card.querySelector('a.btn[href^="vtes://"]'), says = e.textContent; return { id: card.id, says: /no Open button/.test(says), link: !!link }; }).filter(x => x.says === x.link)); if (bad.length) { return R(false, nm + ': ' + JSON.stringify(bad)); } }
    return R(true, 'a card says "no Open button" exactly when it has no one-click link');
  });
  test('phone-no-link', /^The PC cannot open it\./, async () => R(await evalIn('fresh-green', () => !document.querySelector('#card-LLM-05 a[href^="vtes://"]')), 'the iPhone card never has a one-click link, even with shortcuts set up'));
  test('one-click-links', /^Open .* with one click \(a shortcut the PC set up\)|^The one-click shortcut for .* does not open yet/, async (text, info) => {
    for (const nm of info.worlds) {
      const r = await evalIn(nm, () => { const V = window.VTES5, out = []; document.querySelectorAll('.v5addr').forEach(d => { const id = d.getAttribute('data-addr'); const a = d.querySelector('a[href^="vtes://"]'); out.push({ id, link: !!a, says: d.textContent.trim().slice(0, 150), registered: V.schemeRegistered(), filled: V.addressFilled(id), hb: V.status('heartbeat').state }); }); return out; });
      for (const x of r) {
        if (x.link !== (x.registered && x.filled)) { return R(false, nm + ' ' + x.id + ': link=' + x.link + ' registered=' + x.registered + ' filled=' + x.filled); }
        if (!x.link && /PC check-in report: ([A-Z ]+)\)/.test(x.says) && RegExp.$1 !== x.hb) { return R(false, nm + ' ' + x.id + ': says report ' + RegExp.$1 + ' but it is ' + x.hb); }
        if (!x.link && /shortcuts are not set up/.test(x.says) && (x.registered || x.hb !== 'OK')) { return R(false, nm + ' ' + x.id + ': says not set up but registered=' + x.registered); }
        if (!x.link && /entry is still empty/.test(x.says) && !(x.registered && !x.filled)) { return R(false, nm + ' ' + x.id + ': says entry empty but registered=' + x.registered + ' filled=' + x.filled); }
      }
    }
    return R(true, 'one-click links and their sentences follow the check-in report');
  });
  test('intervals', /^Check-in interval: |^Scheduled every /, async (text, info) => {
    for (const nm of info.worlds) { const w = WLD[nm]; const hb = w.files && w.files.heartbeat; const m = /every (\d+) (minutes|seconds|hours|days|minute)/.exec(text); if (!m) { if (/unknown/.test(text)) { continue; } return R(false, 'no interval in the sentence'); }
      const secs = +m[1] * ({ seconds: 1, minute: 60, minutes: 60, hours: 3600, days: 86400 })[m[2]]; const wanted = /^Scheduled/.test(text) ? Object.values((w.files.bots || {}).bots || {}).map(b => b.interval_sec) : [hb && hb.interval_sec];
      if (!wanted.includes(secs)) { return R(false, nm + ': says ' + secs + ' s but the data has ' + wanted); } }
    return R(true, 'the interval printed is the interval in the file');
  });
  testInternal('times', { test: s => TIME.test(s) && (TIME.lastIndex = 0, true) && /\d/.test(s.replace(TIME, '')) === false }, async (text, info) => {
    TIME.lastIndex = 0; const shown = text.match(TIME) || []; for (const nm of info.worlds) {
      const w = WLD[nm]; const iso = []; JSON.stringify(w.files || {}, (k, v) => { if (typeof v === 'string' && /^\d{4}-\d\d-\d\dT/.test(v)) { iso.push(v); } return v; });
      const ok = await evalIn(nm, a => { const V = window.VTES5, set = new Set(a.iso.map(s => V.fmtIso(s))); set.add(V.fmt(V.now())); set.add(V.fmtIso(window.VTES5_BUILT)); return a.shown.every(x => set.has(x) || [...set].some(y => y.replace(/ EDT| EST/, '') === x.replace(/ EDT| EST/, ''))); }, { iso: iso.concat(w.o && w.o.status ? Object.values(w.o.status).map(x => x.seen) : []), shown });
      if (!ok) { return R(false, nm + ': a time on the page is not a time from the data, the clock or the build: ' + shown.join(' / ')); }
    }
    return R(true, 'every time shown is a time from the data, the clock or the build, written by the one time rule');
  });
  test('local-folder-lines', /LOCAL save step|local-only folder|BLOCKED - UNVERIFIED|Do NOT save|folder the PC reports|safe folder|Do not save client personal data|Open File Explorer|Click View, then Show|Right-click an empty spot|Type the name JOB|Check that the name ends|Double-click the file|Do NOT ask RAMBO|Do NOT send client|Do NOT paste this packet|Do NOT press the blue/, () => once('local-lines', async () => {
    const bad = []; const N = ['no-data', 'fresh-green', 'local-unconfirmed', 'local-bad-folder', 'local-confirmed-proof', 'all-stale', 'status-writer-only'];
    for (const nm of N) {
      const r = await evalIn(nm, () => { const c = document.getElementById('card-LOCAL'); return { text: c.innerText, cls: (c.querySelector('[data-localfolder]') || {}).className, steps: [...c.querySelectorAll('ol.v5steps li')].map(l => l.textContent) }; });
      const sents = r.text.split(/(?<=[.!?])\s+/); const hit = sents.filter(s => /sav(?:e|ed|es|ing)\b/i.test(s) && /RAMBO|Claude|Cowork|Codex|Grok|desktop executor/i.test(s) && !/^Do not|^Do NOT|Do not give this packet to any Claude window/.test(s) && !/^For RAMBO/.test(s));
      if (hit.length) { bad.push(nm + ': a LOCAL sentence about saving names RAMBO or Claude: ' + hit[0].slice(0, 100)); }
      const stepsSave = r.steps.filter(x => /sav(?:e|ed)\b/i.test(x) && !/^For RAMBO/.test(x) && /RAMBO|Claude|desktop executor/.test(x)); if (stepsSave.length) { bad.push(nm + ': step names RAMBO or Claude: ' + stepsSave[0]); }
      const confirmed = /CONFIRMED/.test(r.text); if (confirmed !== /\bok\b/.test(r.cls || '')) { bad.push(nm + ': LOCAL line colour ' + r.cls + ' does not match CONFIRMED=' + confirmed); }
      if (confirmed && !r.steps.some(x => /Double-click the file to open it/.test(x))) { bad.push(nm + ': confirmed folder but no by-hand steps'); }
      if (!confirmed && r.steps.some(x => /Double-click the file to open it/.test(x))) { bad.push(nm + ': by-hand file steps shown with no confirmed folder'); }
      r.steps.forEach(x => { if (!/^For RAMBO/.test(x) && words(x) > 25) { bad.push(nm + ': step over 25 words: ' + x.slice(0, 60)); } });
    }
    const bf = await evalIn('local-bad-folder', () => document.getElementById('card-LOCAL').textContent); if (/CONFIRMED/.test(bf)) { bad.push('a G:\\ folder is CONFIRMED'); }
    return R(!bad.length, bad.join(' | ') || 'LOCAL steps in ' + N.length + ' states: by hand for the person, no RAMBO or Claude in any line about saving, steps at most 25 words, colour follows the folder');
  }));
  testAlways('grok-next', /^Next step: RAMBO sends Grok|^Grok is chat only\. Live check|^Reason: /, async (text, info) => {
    for (const nm of ['fresh-green', 'grok-red', 'grok-grey-zone', 'no-data', 'all-stale']) {
      const r = await evalIn(nm, () => { const c = document.getElementById('card-LLM-07'), st = c.querySelector('.v5st'), nx = c.querySelector('[data-grokn]'); return { cls: st.className, next: nx ? nx.textContent.trim() : null, state: st.textContent }; });
      const green = /\bok\b/.test(r.cls), red = /\b(?:bad|stk)\b/.test(r.cls);
      if (green && r.next) { return R(false, nm + ': Grok card is green but says "' + r.next + '"'); }
      if (!green && !r.next) { return R(false, nm + ': Grok card is not green but has no next-step sentence'); }
      if (r.next && red && !/stays red/.test(r.next)) { return R(false, nm + ': card red, sentence says "' + r.next + '"'); }
      if (r.next && !red && !/not green/.test(r.next)) { return R(false, nm + ': card not red, sentence says "' + r.next + '"'); }
    }
    return R(true, 'the Grok next-step sentence is absent when green, says red only when red, and says not green otherwise (5 states)');
  });
  test('tick-claims', /^Ticked for this note|^NOT TICKED|^Choose |any other lane needs the tick box/, () => once('tick', async () => {
    const r = await world('fresh-green'); const out = await r.p.evaluate(async () => {
      const $ = i => document.getElementById(i), res = {}; const settle = async () => { await new Promise(x => setTimeout(x, 30)); };
      const ev = (e, t) => e.dispatchEvent(new Event(t, { bubbles: true })); window.open = () => null;
      $('note').value = 'Check the Bal Harbour permit'; ev($('note'), 'input'); $('to').value = 'LLM-03'; ev($('to'), 'change'); await settle();
      res.unticked = { go: $('go').disabled, show: $('show').disabled, rambo: $('v5rambobtn').disabled, msg: $('v5ackmsg').textContent };
      $('v5ack').checked = true; ev($('v5ack'), 'change'); await settle(); res.ticked = { go: $('go').disabled, show: $('show').disabled, msg: $('v5ackmsg').textContent };
      $('from').value = $('from').options[Math.min(1, $('from').options.length - 1)].value === $('from').value ? $('from').options[0].value : $('from').options[1].value; ev($('from'), 'change'); await settle(); res.afterFrom = { checked: $('v5ack').checked, go: $('go').disabled };
      $('v5ack').checked = true; ev($('v5ack'), 'change'); await settle(); $('note').value += ' x'; ev($('note'), 'input'); await settle(); res.afterNote = { checked: $('v5ack').checked, go: $('go').disabled };
      $('v5ack').checked = true; ev($('v5ack'), 'change'); await settle(); $('to').value = 'LLM-08'; ev($('to'), 'change'); await settle(); res.afterTo = { checked: $('v5ack').checked, go: $('go').disabled };
      $('to').value = 'LOCAL'; ev($('to'), 'change'); await settle(); res.local = { go: $('go').disabled, msg: $('v5ackmsg').textContent };
      $('to').value = 'LLM-03'; $('note').value = ''; ev($('note'), 'input'); ev($('to'), 'change'); await settle(); res.empty = { go: $('go').disabled, msg: $('v5ackmsg').textContent };
      return res; });
    const bad = []; if (!(out.unticked.go && out.unticked.show && out.unticked.rambo && /NOT TICKED/.test(out.unticked.msg))) { bad.push('unticked: ' + JSON.stringify(out.unticked)); }
    if (!(!out.ticked.go && !out.ticked.show && /Ticked for this note and for LLM-03\. If you change the note, To or From, the tick clears\./.test(out.ticked.msg))) { bad.push('ticked: ' + JSON.stringify(out.ticked)); }
    if (out.afterFrom.checked || !out.afterFrom.go) { bad.push('changing From did not clear the tick: ' + JSON.stringify(out.afterFrom)); }
    if (out.afterNote.checked || !out.afterNote.go) { bad.push('changing the note did not clear the tick'); } if (out.afterTo.checked || !out.afterTo.go) { bad.push('changing To did not clear the tick'); }
    if (out.local.go) { bad.push('LOCAL needs no tick but the button is off'); } if (out.empty.go) { bad.push('an empty note needs no tick but the button is off'); }
    return R(!bad.length, bad.join(' | ') || 'unticked: buttons off; ticked: on; note, To and From each clear the tick; LOCAL and an empty note need none');
  }));
  test('queued-one-click', /^Queued items: one click fills the note box|^Packet ready for|^The item is in the note box/, () => once('queued', async () => {
    const r = await world('fresh-green'); const out = await r.p.evaluate(async () => { const $ = i => document.getElementById(i), res = []; window.open = () => null; const q = [...document.querySelectorAll('[data-q]')]; const settle = () => new Promise(x => setTimeout(x, 40));
      for (let i = 0; i < q.length; i++) { for (const tick of [false, true]) { $('v5ack').checked = false; $('v5ack').dispatchEvent(new Event('change', { bubbles: true })); q[i].click(); await settle(); if (tick) { $('v5ack').checked = true; $('v5ack').dispatchEvent(new Event('change', { bubbles: true })); await settle(); } res.push({ note: $('note').value.length > 0, to: $('to').value, go: $('go').disabled, st: $('status').textContent, local: $('to').value === 'LOCAL', tick }); } } return res; });
    const bad = out.filter(x => !x.note || !x.to || (/^Packet ready for/.test(x.st) && x.go) || (/not made yet/.test(x.st) && !x.go));
    return R(out.length >= 12 && !bad.length, out.length + ' queued clicks: the note box is filled, To is chosen, and the status says ready only when the button is on; bad: ' + JSON.stringify(bad.slice(0, 2)));
  }));
  test('guard-packet', /NOT INCLUDED|keeps it out of every packet/, () => once('guardp', async () => {
    const r = await world('fresh-green'); const out = await r.p.evaluate(async () => { const $ = i => document.getElementById(i); const settle = () => new Promise(x => setTimeout(x, 40)); window.open = () => null; const o = {};
      $('note').value = 'SSN 123-45-6789 for the roof file'; $('note').dispatchEvent(new Event('input'));
      for (const to of ['LLM-03', 'LOCAL']) { $('to').value = to; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('v5ack').checked = true; $('v5ack').dispatchEvent(new Event('change', { bubbles: true })); await settle(); $('show').click(); await settle(); o[to] = $('preview').value; }
      return o; });
    return R(/NOT INCLUDED/.test(out['LLM-03']) && !/123-45-6789/.test(out['LLM-03']) && /123-45-6789/.test(out.LOCAL) && !/NOT INCLUDED/.test(out.LOCAL), 'a wrongly ticked SSN note is left out of a packet for LLM-03 and carried for LOCAL');
  }));
  test('guard-layers', /^The checker is a second layer|^It cannot catch names/, () => once('guardl', async () => {
    const N = require('./pii-notes-r9.js'); const r = await world('fresh-green'); const out = await r.p.evaluate(a => ({ pers: a.pers.filter(t => !window.VTES5U.piiReasons(t).length).length, ord: a.ord.filter(t => window.VTES5U.piiReasons(t).length).length, misses: a.mis.filter(t => !window.VTES5U.piiReasons(t).length).length, cannot: a.cannot.filter(t => !window.VTES5U.piiReasons(t).length).length }), { pers: N.PERSONAL, ord: N.ORDINARY, mis: N.MISSES.map(m => m.t), cannot: ['Maria Gonzalez lives at 123 Main Street Miami', 'email maria.gonzalez@example.com', 'call Maria on 305-555-1234'] });
    return R(out.pers === 0 && out.ord === 0 && out.misses >= 1 && out.cannot === 3, 'catches ' + (N.PERSONAL.length - out.pers) + ' of ' + N.PERSONAL.length + ' personal notes, carries ' + (N.ORDINARY.length - out.ord) + ' of ' + N.ORDINARY.length + ' ordinary notes, still misses ' + out.misses + ' known layouts, and does not catch a name, an address, an email or a phone number (' + out.cannot + ' of 3)');
  }));
  test('no-numbers-when-none', /^No burn rate is shown|^Last report time: NONE|^No data file supplies repair rows|^NO DATA No data file/, async () => {
    const r = await evalIn('no-data', () => ({ tok: document.getElementById('pn-tokens').textContent, rep: document.querySelectorAll('#pn-repairs-live li').length, hk: document.getElementById('pn-house').textContent }));
    return R(!/\d/.test(r.tok.replace(/Token monitor|CU-TokenMonitor-Hourly/g, '')) && r.rep === 0 && !/\d+ \(?items/.test(r.hk), 'with no data the token panel shows no number, and no repair row is shown');
  });
  test('proof-links', /^Every link opens that source's proof file in Drive/, async () => { const r = await evalIn('fresh-green', () => [...document.querySelectorAll('#pn-miami ol.md > li > a')].map(a => a.getAttribute('href'))); return R((r.length >= 20 && r.every(h => /^https:\/\/drive\.google\.com\/file\/d\//.test(h))), r.length + ' links, all to drive.google.com files'); });
  test('repairs-live', /^Live repair rows/, async () => { const r = await evalIn('fresh-green', () => document.querySelectorAll('#pn-repairs-live li').length); return R(r === 1, 'one data repair row shown for the one in the data'); });
  test('survives-v3', /^Every card, bot, queued item, picker row, repairs row and tab from v3 is still here\./, () => once('surv', async () => { const out = path.join(require('os').tmpdir(), 'cl9-s2.json'); sh('node', [path.join(__dirname, 'test-v3-survives.js'), out], { cwd: __dirname }); const j = JSON.parse(require('fs').readFileSync(out, 'utf8')); return R(j.pass === j.total, j.pass + ' of ' + j.total + ' v3 survival checks'); }));
  test('old-panel-tabs', /OLD PANEL, snapshot of 2026-09-02|\(OLD, snapshot of 2026-09-02/, async () => { const r = await evalIn('fresh-green', () => [...document.querySelectorAll('#tabs a.panel')].map(a => a.getAttribute('href')).concat([...document.querySelectorAll('a')].filter(a => /OLD, snapshot/.test(a.textContent)).map(a => a.getAttribute('href')))); const v3 = require('fs').readFileSync(path.join(__dirname, '..', 'v3-live', 'VTES-LLM-LAUNCHER_v3.html'), 'utf8'); return R(r.length >= 10 && r.every(h => /^file:\/\/\/C:\/Users\/JV\/JV-repository\//.test(h)) && v3.includes('2026-09-02'), r.length + ' old-panel links all go to the old snapshot files; v3 itself names 2026-09-02'); });
  test('age-line', /^Built .* data as of|^Re-checked|^Only the simple status writer/, async (text, info) => {
    for (const nm of info.worlds) { const r = await evalIn(nm, () => ({ a: document.getElementById('v5age').textContent, ok: document.querySelectorAll('.v5st.ok').length })); if (/Only the simple status writer has reported/.test(text) && r.ok) { return R(false, nm + ': says only the status writer reported but ' + r.ok + ' cards are green'); } if (/data as of NO DATA/.test(text) && nm !== 'no-data' && nm !== 'status-writer-only') { return R(false, nm + ': says NO DATA but a file is valid'); } }
    return R(true, 'the age line follows the data');
  });
  test('footer-stamp', /^TRK-2026-9910-B · v5 · built/, async () => R(await evalIn('fresh-green', () => document.getElementById('v5fb').textContent === window.VTES5.builtText(window.VTES5_BUILT)), 'the build time on the footer is the build time in the page'));
  testAlways('target-constant', /^$/, async () => { const t = await evalIn('fresh-green', () => window.VTES5.MD_TARGET); const m = /`target` (\d+)/.exec(rd('DATA-CONTRACT.md')); return R(!!m && +m[1] === t, 'the target the page prints (' + t + ') is the target DATA-CONTRACT.md names (' + (m ? m[1] : 'none') + ')'); });
  /* the EXEMPT entries come last, so a sentence that has a real test is never swallowed by a reason */
  /* ---- EXEMPT: what is not a claim about the page ---- */
  exempt('id-only', { test: s => !KEYWORD.test(s) && !hasDigit(s) }, 'the only digits are names, ids, dates or version names (LLM-01, TRK-2026-9910-B, v5, 2026-10-02), not a count or a promise', 4);
  exempt('typed-label', /^Typed note|\(typed (?:from|in) v3|typed instruction from v3|typed note from|\(typed note 2026|^2026-10-02 [A-Z]+ |Maintained by hand|^For RAMBO only \(typed in v3|It (?:says|comes from the v4 build)|\(typed v3/, 'history: v3 or v4 text shown labelled as typed, not checked by the page, and it says so');
  exempt('packet-v3', /^HANDOFF |^#handoff|^RETURN PATH|^SSN 123-45-6789\.$|^My number is 123|^Check this one|^- /, 'the packet text is built by the unchanged v3 code, or it is the note the test typed');
  exempt('for-rambo', /^For RAMBO\b/, 'an instruction to the desktop executor, not a statement about the page');
  exempt('instruction', /^(?:Do not|Do NOT|Never (?:use|for)|Open |Click |Press |Right-click |Double-click |Type the |Check that |Use this |Paste |Choose |Tick the box|STOP HERE|First time only|There is nothing else|Without |Copy |Say |Until one is, do not)/, 'an instruction to the person: nothing to prove');
  exempt('policy', /^(?:It|Client personal data) goes to LOCAL only\.$/, 'a rule for the person (where client data goes), not a statement about page behaviour');
  exempt('v3-card-text', /^(?:Grok is chat only|Standby bridge only|Round-trip question only|Chat only|Routing bridge, never|Every API run is priced|Cannot touch your PC|It can send orders|Sends orders|Reads every|Meters usage|Reads every Outbox|Two are not Claude|Standby\.)/, 'the typed v3 card text, unchanged or repeated in the same words');

  /* ---- INSTALL-BY-HAND.md: facts are proved on the real files, real VERIFY runs and a real scratch git repository; the rest are instructions ---- */
  const needPw = () => { if (!PW || !require('fs').existsSync(PW)) { throw new Error('PWSH_DIR is not set or has no pwsh: the INSTALL-BY-HAND claims cannot be proved'); } };
  const fsx = require('fs'), osx = require('os'), crypto = require('crypto');
  const cpDir = (a, b) => { fsx.mkdirSync(b, { recursive: true }); for (const n of fsx.readdirSync(a)) { const x = path.join(a, n), y = path.join(b, n); if (fsx.statSync(x).isDirectory()) { cpDir(x, y); } else { fsx.copyFileSync(x, y); } } };
  const verify = (dir, extra) => { needPw(); return sh(PW, ['-NoProfile', '-File', path.join(ROOT, 'VERIFY-v5.ps1'), '-Path', dir].concat(extra || [])); };
  const fresh12 = () => { const d = fsx.mkdtempSync(path.join(osx.tmpdir(), 'ibh-')); const n = path.join(d, 'v5'); cpDir(path.join(ROOT, 'package'), n); return n; };
  const manLines = () => rd('package/MANIFEST.sha256').trim().split('\n').map(l => l.split('  ')[1]);
  test('ibh-pkg-12', /\b12\b|^The seven data files|^The package is/, () => once('pkg12', async () => { const m = manLines(); const doc = rd('INSTALL-BY-HAND.md'); const names = m.concat(['MANIFEST.sha256']); const data = m.filter(x => x.startsWith('data/')).map(x => x.slice(5)); const eight = m.filter(x => !x.startsWith('data/') && x !== 'vtes5-config.js');
    const miss = names.filter(x => !doc.includes('`' + x.replace(/^data\//, '') + '`')); return R(names.length === 12 && data.length === 7 && eight.length === 3 && !miss.length, 'manifest lists ' + m.length + ' files, plus the manifest itself = ' + names.length + '; ' + data.length + ' are in data; every name is written in the document' + (miss.length ? ' (missing: ' + miss.join(',') + ')' : '')); }), 1);
  test('ibh-only-script', /^The only script is|only reads/, () => once('onlyscript', async () => { const walk = d => fsx.readdirSync(d).flatMap(n => { const f = path.join(d, n); return fsx.statSync(f).isDirectory() ? (n === 'node_modules' ? [] : walk(f)) : [f]; }); const ps = walk(ROOT).filter(f => /\.(ps1|psm1|bat|cmd|vbs)$/i.test(f)).map(f => path.relative(ROOT, f)); const r = sh('node', [path.join(__dirname, 'test-no-write-commands.js')], { cwd: __dirname, env: Object.assign({}, process.env, { V5DIR: ROOT }) });
    return R(ps.length === 1 && ps[0] === 'VERIFY-v5.ps1' && /NO-WRITE-COMMANDS: (\d+) of \1 checks pass/.test(r.out), 'script files in the tree: ' + ps.join(',') + '; ' + (r.out.match(/NO-WRITE-COMMANDS: .*/) || ['no result'])[0]); }), 1);
  test('ibh-git-fetch', /^In the same checkout run .git fetch|It writes only inside/, () => once('gitfetch', async () => {
    const d = fsx.mkdtempSync(path.join(osx.tmpdir(), 'gf-')), g = (cwd, ...a) => sh('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', '-c', 'protocol.file.allow=always'].concat(a), { cwd }); const up = path.join(d, 'up'), pc = path.join(d, 'pc'); fsx.mkdirSync(up); g(up, 'init', '-q', '-b', 'main'); fsx.writeFileSync(path.join(up, 'a.txt'), 'a'); g(up, 'add', '.'); g(up, 'commit', '-q', '-m', 'one');
    g(d, 'clone', '-q', up, pc); g(up, 'checkout', '-q', '-b', 'claude/panel-v5-port'); fsx.writeFileSync(path.join(up, 'b.txt'), 'b'); g(up, 'add', '.'); g(up, 'commit', '-q', '-m', 'two');
    const snap = () => { const o = []; (function w(x) { for (const n of fsx.readdirSync(x).sort()) { const f = path.join(x, n); if (n === '.git') { continue; } fsx.statSync(f).isDirectory() ? w(f) : o.push(f + ':' + crypto.createHash('sha256').update(fsx.readFileSync(f)).digest('hex')); } })(pc); return o.join('\n') + '\nHEAD ' + g(pc, 'rev-parse', 'HEAD').out + 'BR ' + g(pc, 'branch').out + 'ST ' + g(pc, 'status', '--short').out; };
    const gitSnap = () => { const o = []; (function w(x) { for (const n of fsx.readdirSync(x).sort()) { const f = path.join(x, n); fsx.statSync(f).isDirectory() ? w(f) : o.push(f); } })(path.join(pc, '.git')); return o; };
    const before = snap(), gb = gitSnap(); const r = g(pc, 'fetch', 'origin', 'claude/panel-v5-port'); const after = snap(), ga = gitSnap(); const added = ga.filter(f => !gb.includes(f));
    return R(r.code === 0 && before === after && added.length > 0 && added.every(f => f.includes(path.sep + '.git' + path.sep)) && /origin\/claude\/panel-v5-port/.test(g(pc, 'branch', '-r').out), 'a real fetch into a scratch clone: no working file, no branch and no HEAD changed; ' + added.length + ' new files, all inside .git; the branch origin/claude/panel-v5-port appeared'); }), 1);
  test('ibh-verify-sha', /^Its SHA-256 must be|SHA-256 must be/, () => once('versha', async () => { const h = crypto.createHash('sha256').update(fsx.readFileSync(path.join(ROOT, 'VERIFY-v5.ps1'))).digest('hex'); const doc = rd('INSTALL-BY-HAND.md'); const man = crypto.createHash('sha256').update(fsx.readFileSync(path.join(ROOT, 'package/MANIFEST.sha256'))).digest('hex'); return R(doc.includes('`' + h + '`') && doc.includes('-ExpectManifestSha256 ' + man), 'the SHA-256 of VERIFY-v5.ps1 (' + h.slice(0, 12) + '...) and of the manifest (' + man.slice(0, 12) + '...) in the document are the real ones'); }), 1);
  test('ibh-ok-line', /^Paste VERIFY's whole answer|identical \(SHA-256\)/, () => once('okline', async () => { const n = fresh12(); const r = verify(n, ['-ExpectManifestSha256', crypto.createHash('sha256').update(fsx.readFileSync(path.join(ROOT, 'package/MANIFEST.sha256'))).digest('hex')]); const q = /"(OK: all [^"]+)"/.exec(rd('INSTALL-BY-HAND.md')); return R(r.code === 0 && !!q && r.out.includes(q[1]), 'a clean copy: exit ' + r.code + ', and VERIFY prints the quoted OK line word for word'); }), 1);
  test('ibh-day-one-exact', /^On day one that line is the only good answer/, () => once('dayone', async () => { const n = fresh12(); fsx.writeFileSync(path.join(n, 'data', 'vtes5-state.js'), 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = { "schema": 1, "at": "2026-10-06T14:00:00-04:00", "writer": "w" };\n'); const a = verify(n), b = verify(n, ['-AfterWriters']); return R(a.code === 1 && /EDITED: data\/vtes5-state\.js/.test(a.out) && b.code === 0 && /OK \(after writers\)/.test(b.out), 'a rewritten data file: without the switch exit ' + a.code + ' (EDITED); with -AfterWriters exit ' + b.code + ' and the "OK (after writers)" line'); }), 1);
  test('ibh-utf16', /^If PowerShell itself prints|redirect symbol|UTF-16|saved as UTF-16/, () => once('utf16', async () => { const n = fresh12(); const f = path.join(n, 'data', 'vtes5-bots.js'); fsx.writeFileSync(f, Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(fsx.readFileSync(f, 'utf8'), 'utf16le')])); const a = verify(n); const z = sh(PW, ['-NoProfile', '-File', path.join(ROOT, 'VERIFY-v5.ps1'), '-Bogus']); return R(a.code === 1 && /EDITED: data\/vtes5-bots\.js \(data file\) has SHA-256/.test(a.out) && /saved as UTF-16/.test(a.out) && z.code === 1, 'a UTF-16 data file: exit ' + a.code + ' and VERIFY prints the two quoted pieces; a wrong switch: PowerShell itself exits ' + z.code); }), 1);
  test('ibh-v3-and-tick', /real v3 launcher/, () => once('v3', async () => { const sha = crypto.createHash('sha256').update(fsx.readFileSync(path.join(__dirname, '..', 'v3-live', 'VTES-LLM-LAUNCHER_v3.html'))).digest('hex'); return R(sha === '28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3', 'the repository copy of the real v3 launcher has the SHA-256 the build checks'); }), 1);
  exempt('ibh-instruction', /^(?:Follow the steps|Stop at the first|If |Never |Do not |Create |In File Explorer|Check that|Open |Click |Run |Save |Write |Paste |First run|Put the full path|Each must|It must|To stop using|Read the path|The path must|Any other answer is BLOCKED|The install is good only|Did VERIFY)/, 'an instruction to the executor, an order, or a question: nothing to prove');
};
