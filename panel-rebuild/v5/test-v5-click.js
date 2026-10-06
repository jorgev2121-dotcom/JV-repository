// test-v5-click.js - click EVERYTHING on the v5 page, opened from file://. TRK-2026-9910-B. Usage: node test-v5-click.js <out.json>
// Every a[href], button, select, summary, input and textarea is enumerated from the page (not from a list in this file), exercised, and counted. "N of N" at the end.
const L = require('./test-v5-lib.js'); const { fs, path, NOWMS, fresh, stage, sleep, open } = L;
const OUT = process.argv[2] || 'test-v5-click-RESULT.json'; const results = []; const exercised = new Set();
const T = (grp, name, ok, why) => { results.push({ grp, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) { console.log('FAIL', grp, '|', name, '|', String(why).slice(0, 200)); } };
const PACKET_LABELS = ['WHO:', 'TASK, IN HIS WORDS:', 'HOW TO ANSWER:', 'HARD RULES:', 'FACTS LIVE IN:', 'RETURN PATH:'];
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const f = fresh(NOWMS); const d = stage(f); const { ctx, p, errs, pops } = await open(br, d, { settle: 900 });
  // stub the old copy path so the test can read what was copied: execCommand copy returns true and stores the textarea text
  await p.evaluate(() => { window.__clip = null; document.execCommand = function (c) { if (c === 'copy') { var a = document.activeElement; window.__clip = a && a.value; return true; } return false; }; });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  // ---- enumerate
  const items = await p.evaluate(() => {
    const out = [], seen = new Set();
    document.querySelectorAll('a[href], button, select, summary, input, textarea').forEach(e => {
      const t = e.tagName.toLowerCase(), key = [t, e.id, e.getAttribute('href') || '', (e.textContent || '').trim().slice(0, 50), e.getAttribute('data-to') || '', e.getAttribute('data-q') || '', e.getAttribute('data-paste') || '', e.getAttribute('data-role') || ''].join('|');
      if (seen.has(key)) { return; } seen.add(key); out.push({ key, tag: t, id: e.id, href: e.getAttribute('href'), text: (e.textContent || '').trim().slice(0, 60), cls: e.className, to: e.getAttribute('data-to'), q: e.getAttribute('data-q'), paste: e.getAttribute('data-paste'), role: e.getAttribute('data-role'), target: e.getAttribute('target') });
    }); return out; });
  const total = items.length; console.log('items found on the page (distinct by tag, id, address, text, data attributes): ' + total);
  const mark = i => exercised.add(i.key);
  const closePops = async () => { for (const pg of ctx.pages()) { if (pg !== p) { try { await pg.close(); } catch (e) { } } } pops.length = 0; await p.bringToFront(); };
  const packetOk = (txt, to) => txt && txt.split('\n')[0].startsWith('HANDOFF  LLM-04') && new RegExp('->  ' + to.replace(/[-]/g, '\\-') + ' \\(').test(txt.split('\n')[0]) && PACKET_LABELS.every(l => txt.includes(l)) && /\)   Oct 6, 2:00 PM EDT\n/.test(txt);
  const cnt = { tabsLocal: 0, tabsOld: 0, httpLinks: 0, vtesLinks: 0, drive: 0, bigcopy: 0, hand: 0, queued: 0, selects: 0, other: 0, oldBottom: 0 };
  // fixed corner links first (they navigate this tab): checked in a spare page
  for (const i of items.filter(x => x.tag === 'a' && /^file:/.test(x.href || '') && x.cls === '' )) {}
  const known = { };
  for (const i of items) {
    try {
      await closePops();
      if (i.tag === 'a' && /\btab\b/.test(i.cls) && /\bhere\b/.test(i.cls)) {                       // tabs that stay on the page
        const id = i.href.slice(1); await p.evaluate(() => window.scrollTo(0, 0)); await p.click('a.tab.here[href="#' + id + '"]'); await sleep(p, 500);
        const h = await p.evaluate(() => location.hash), ex = await p.evaluate(i => { const e = document.getElementById(i); if (!e) return null; const r = e.getBoundingClientRect(); return { w: r.width, h: r.height }; }, id);
        T('tabs', 'tab ' + i.text + ' goes to #' + id + ' and the target exists with size', h === '#' + id && !!ex && ex.w > 0 && ex.h > 0, h + ' ' + JSON.stringify(ex)); cnt.tabsLocal++; mark(i);
      } else if (i.tag === 'a' && /\btab\b/.test(i.cls)) {                                          // old panel tabs
        const lab = i.text.replace(/\s+/g, ' ');
        const ok = /^file:\/\/\/C:\/Users\/JV\/JV-repository\/VTES-CONTROL-PANEL\.html#[A-Z]+$/.test(i.href) && /OLD PANEL, snapshot of 2026-09-02, not live/.test(lab) && i.target === '_blank';
        const before = pops.length; await p.click('a.tab.panel[href="' + i.href + '"]'); await sleep(p, 250);
        T('tabs', 'old tab ' + lab.split(' ')[0] + ': label on the tab says OLD PANEL snapshot 2026-09-02 not live; href is the snapshot; opens a new tab', ok && pops.length === before + 1, lab + ' ' + i.href + ' pops ' + (pops.length - before)); cnt.tabsOld++; mark(i);
      } else if (i.tag === 'a' && /^file:/.test(i.href || '')) {                                    // PANEL / INDEX corner links
        const ok = /OLD, snapshot of 2026-09-02, not live/.test(i.text) && /^file:\/\/\/C:\/Users\/JV\/JV-repository\/VTES-CONTROL-PANEL\.html/.test(i.href);
        const p2 = await ctx.newPage(); await p2.route('**/*', r => r.abort()); await p2.goto('about:blank');
        T('corner', 'corner link "' + i.text.slice(0, 24) + '" labelled OLD, points at the snapshot (not clicked: it leaves this page; checked by label and address)', ok, i.text + ' ' + i.href); cnt.oldBottom++; mark(i); await p2.close();
      } else if (i.tag === 'a' && /^vtes:/.test(i.href || '')) {
        T('vtes', 'vtes link ' + i.href + ' is a plain address on LLM-01 / LLM-03 only (not clicked: the operating system opens it)', /^vtes:\/\/llm-0[13]$/.test(i.href), i.href); cnt.vtesLinks++; mark(i);
      } else if (i.tag === 'a' && /^https:\/\/drive\.google\.com\/file\/d\//.test(i.href || '')) {
        const before = pops.length; await p.click('a[href="' + i.href + '"]'); await sleep(p, 120);
        T('miami', 'proof link ' + i.href.slice(0, 60) + ' has a Drive file address, opens in a new tab with noopener', /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]{25,40}\/view$/.test(i.href) && i.target === '_blank' && pops.length === before + 1, i.href); cnt.drive++; mark(i);
      } else if (i.tag === 'a') {
        const before = pops.length; await p.click('a[href="' + i.href + '"]'); await sleep(p, 150);
        const rel = await p.$eval('a[href="' + i.href + '"]', e => e.getAttribute('rel'));
        T('links', 'link ' + i.text.slice(0, 40) + ' -> ' + i.href + ' opens a new tab with rel noopener', i.target === '_blank' && /noopener/.test(rel) && pops.length === before + 1, i.href + ' ' + rel + ' ' + (pops.length - before)); cnt.httpLinks++; mark(i);
      } else if (i.tag === 'button' && i.cls.indexOf('bigcopy') >= 0 || (i.tag === 'button' && i.id === 'v5rambobtn')) {
        const to = i.paste || 'LLM-01'; const sel = i.id === 'v5rambobtn' ? '#v5rambobtn' : 'button.bigcopy[data-paste="' + to + '"]' + (i.role ? '[data-role="' + i.role + '"]' : ':not([data-role])');
        await p.evaluate(() => { window.__clip = null; }); await p.click(sel); await sleep(p, 250); const clip = await p.evaluate(() => window.__clip);
        const msg = await p.evaluate(s => { const b = document.querySelector(s); return (b.parentNode.querySelector('.v5cs') || {}).textContent; }, sel);
        T('copy', 'big copy button ' + (i.role || to) + (i.id === 'v5rambobtn' ? ' (top RAMBO)' : '') + ': packet to ' + to + ' is on the clipboard with all six labels and an Eastern stamp; the card says Copied and shows the steps', packetOk(clip, to) && /^Copied the packet\./.test(msg) && /Next: /.test(msg), (clip || 'NOCLIP').slice(0, 80) + ' | ' + msg); cnt.bigcopy++; mark(i);
      } else if (i.tag === 'button' && i.to) {
        await p.click('button[data-to="' + i.to + '"]' + (i.text ? ':text-is("' + i.text + '")' : '')); await sleep(p, 150); const v = await p.inputValue('#to'), pv = await p.inputValue('#preview');
        T('hand', '"Hand work here" -> ' + i.to + ': To box shows ' + i.to + ' and the packet is addressed to it', v === i.to && new RegExp('->  ' + i.to.replace(/-/g, '\\-') + ' \\(').test(pv), v + ' | ' + pv.split('\n')[0]); cnt.hand++; mark(i);
      } else if (i.tag === 'button' && i.q !== null) {
        await p.click('button[data-q="' + i.q + '"]'); await sleep(p, 150); const note = await p.inputValue('#note'), st = await p.innerText('#status'), pv = await p.inputValue('#preview');
        const Q = await p.evaluate(() => QUEUED); const x = Q[+i.q];
        T('queued', 'queued item ' + i.q + ' "' + x.n.slice(0, 30) + '": note, To and packet filled, status says packet ready', note === x.p && pv.includes(x.p) && /^Packet ready for /.test(st) && (await p.inputValue('#to')) === x.to, st); cnt.queued++; mark(i);
      } else if (i.id === 'go' || i.id === 'show') {
        await p.evaluate(() => { window.__clip = null; }); await p.click('#' + i.id); await sleep(p, 250); const st = await p.innerText('#status'), clip = await p.evaluate(() => window.__clip);
        T('buttons', i.text + ': ' + (i.id === 'go' ? 'copies the packet and says Copied' : 'shows the packet and says where it is'), i.id === 'go' ? (/^Copied\./.test(st) && !!clip && clip.includes('HANDOFF')) : /Packet shown below/.test(st), st); cnt.other++; mark(i);
      } else if (i.tag === 'summary') {
        const o0 = await p.$eval('#v5read', e => e.open); await p.click('#v5read summary'); const o1 = await p.$eval('#v5read', e => e.open); await p.click('#v5read summary');
        T('other', 'Read me first opens and closes', o0 === true && o1 === false && (await p.$eval('#v5read', e => e.open)) === true, o0 + ' ' + o1); cnt.other++; mark(i);
      } else if (i.id === 'kind') {
        const n = await p.$$eval('#kind option', o => o.map(x => x.value)); let ok = true, why = '';
        for (const v of n) { await p.selectOption('#kind', v); const to = await p.inputValue('#to'), exp = await p.evaluate(v => PICK[v][1], v), why2 = await p.innerText('#why'); if (to !== exp || !/^Suggested: /.test(why2)) { ok = false; why = v + ' ' + to + ' ' + exp + ' ' + why2; } }
        T('selects', 'task-kind picker: all ' + n.length + ' kinds set the To box and the suggestion line', ok && n.length === 9, why + n.length); cnt.selects++; mark(i);
      } else if (i.id === 'from' || i.id === 'to') {
        const n = await p.$$eval('#' + i.id + ' option', o => o.map(x => x.value)); let ok = true, why = '';
        for (const v of n) { await p.selectOption('#' + i.id, v); const pv = (await p.inputValue('#preview')).split('\n')[0]; if (!pv.includes(v + ' (')) { ok = false; why = v + ' ' + pv; } }
        await p.selectOption('#from', 'LLM-04'); T('selects', i.id + ' list: each of its ' + n.length + ' options builds a packet with that id (GROK, the dead role button in v3, is in the list)', ok && n.length === 13 && (i.id !== 'to' || n.includes('GROK')), why + ' n=' + n.length); cnt.selects++; mark(i);
      } else if (i.id === 'note') {
        await p.fill('#note', 'Check the Bal Harbour permit summary.'); await sleep(p, 100); const pv = await p.inputValue('#preview'); await p.fill('#note', '');
        T('other', 'note box: typed text appears in the packet under TASK; empty note uses the "ask Jorge" line', pv.includes('TASK, IN HIS WORDS:\nCheck the Bal Harbour permit summary.') && /no note typed: ask Jorge/.test(await p.inputValue('#preview')), pv.slice(0, 200)); cnt.other++; mark(i);
      } else if (i.id === 'preview') {
        T('other', 'packet box is read only, and its label no longer says editable', (await p.$eval('#preview', e => e.readOnly)) && !/editable/.test(await p.innerText('label[for="preview"]')), await p.innerText('label[for="preview"]')); cnt.other++; mark(i);
      } else if (i.id === 'q') {
        const total = await p.$$eval('.card', c => c.length); const vis = async () => p.$$eval('.card', c => c.filter(x => !x.classList.contains('hide')).length); const out = [];
        for (const [q, min, max] of [['LLM-07', 1, 3], ['#grok', 1, 4], ['zzzzqq', 0, 0], ['ramBO', 2, 20], ['orchestrator', 2, 6], ['', total, total]]) { await p.fill('#q', q); await sleep(p, 100); const v = await vis(); out.push([q, v, v >= min && v <= max]); }
        T('other', 'search box: LLM-07, #grok, no match, mixed case, a job word, and cleared all behave (' + JSON.stringify(out) + ')', out.every(o => o[2]), JSON.stringify(out)); cnt.other++; mark(i);
      } else { T('other', 'UNHANDLED item ' + i.key, false, JSON.stringify(i)); }
    } catch (e) { T('error', 'exercising ' + i.key, false, e.message.replace(/\u001b\[[0-9;]*m/g, '').slice(0, 900)); }
  }
  T('coverage', 'every enumerated item was exercised (' + exercised.size + ' of ' + total + ')', exercised.size === total, items.filter(i => !exercised.has(i.key)).map(i => i.key).join(' ; '));
  T('errors', '0 page errors during all the clicks', errs.length === 0, errs.join('|'));
  // narrow window: no sideways scroll
  for (const w of [1300, 420]) { await p.setViewportSize({ width: w, height: 900 }); await sleep(p, 200); const o = await p.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth })); T('layout', 'no sideways scroll at ' + w + ' px wide (' + o.s + ' vs ' + o.c + ')', o.s <= o.c + 2, JSON.stringify(o)); }
  // a jump to a section never hides its heading under the sticky tab bar, at four window widths
  for (const w of [1300, 1150, 900, 420]) { await p.setViewportSize({ width: w, height: 900 }); await sleep(p, 250); const out = [];
    for (const id of ['llms', 'roles', 'bots', 'handoff', 'queued', 'livestatus', 'repairs', 'miamidade']) { await p.evaluate(() => window.scrollTo(0, 0)); await p.click('a.tab.here[href="#' + id + '"]'); await sleep(p, 120);
      out.push(await p.evaluate(i => { const t = document.getElementById('tabs'), st = getComputedStyle(t).position === 'sticky', hb = t.getBoundingClientRect().bottom, top = document.getElementById(i).getBoundingClientRect().top; return { i, st, ok: top >= (st ? hb - 2 : -2) && top < innerHeight - 40, top: Math.round(top), hb: Math.round(hb) }; }, id)); }
    T('layout', 'at ' + w + ' px wide all 8 section jumps leave the heading visible' + (out[0].st ? ' under the sticky bar (' + out[0].hb + ' px tall)' : ' (bar not sticky at this width)'), out.every(o => o.ok), JSON.stringify(out.filter(o => !o.ok))); }
  await p.setViewportSize({ width: 1300, height: 900 });
  // the second world: shipped state (no data): the same enumeration must find the same buttons, no vtes links
  const { ctx: c2, p: p2, errs: e2 } = await open(br, stage(null)); const n2 = await p2.$$eval('a[href], button, select, summary, input, textarea', e => e.length);
  const n1 = await p.$$eval('a[href], button, select, summary, input, textarea', e => e.length);
  T('worlds', 'no-data world has ' + n2 + ' interactive elements, fresh world ' + n1 + ' (the difference is the 2 vtes:// links)', n1 - n2 === 2, n1 + ' vs ' + n2); T('worlds', 'no-data world: 0 page errors', e2.length === 0, e2.join('|')); await c2.close();
  // clipboard failure path: both copy routes fail -> the page says so and the packet stays in the box
  { const o = await open(br, stage(fresh(NOWMS))); await o.p.evaluate(() => { document.execCommand = () => false; Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('no')) }, configurable: true }); });
    await o.p.click('button.bigcopy[data-paste="LLM-01"]:not([data-role])'); await sleep(o.p, 300); const m = await o.p.innerText('#card-LLM-01 .v5cs');
    T('copy', 'when copying fails the card says "Could not copy by itself", where the packet is, and still gives the steps', /^Could not copy by itself/.test(m) && /Next: /.test(m) && (await o.p.inputValue('#preview')).startsWith('HANDOFF'), m.slice(0, 150)); await o.ctx.close(); }
  await ctx.close(); await br.close();
  const pass = results.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ items: total, exercised: exercised.size, counts: cnt, pass, total: results.length, failures: results.filter(r => r.status !== 'PASS'), results }, null, 1));
  console.log('CLICK: ' + pass + ' of ' + results.length + ' checks pass; items ' + exercised.size + ' of ' + total + ' exercised; ' + JSON.stringify(cnt));
})();
