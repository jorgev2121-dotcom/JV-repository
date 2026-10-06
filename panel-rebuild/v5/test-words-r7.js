// test-words-r7.js - fix round 7, CLASS 4 (words on the page disagree with the facts), page side. TRK-2026-9910-B
// Checks, on the rendered page: (1) no jargon outside "For RAMBO" lines; (2) no typed BLOCKED beside a live CONFIRMED (and no CONFIRMED beside a live NOT CONFIRMED);
// (3) every external link names its destination; (4) the search word "hourly" finds CU-Propagation-Check (and the other removed interval words still find their cards);
// (5) the LLM-05 and LLM-06 status lines name the right place; (6) a data file cannot set the page clock; (7) grey strip entries say NOT PROVEN, never NOT FINE;
// (8) the local-folder allow rule; (9) a stale Miami-Dade count carries the OLD mark; (10) layout: tab bar at most a quarter of a 1536x730 screen, footer not covered on a phone, text follows the browser text size, RAMBO button on the first screen at 200% zoom and at 200% text size.
// Exemption: the hand-typed repairs log (.repair-log) is Jorge's own typed history and keeps its words (it is labelled TYPED LOG on the page).
// Usage: node test-words-r7.js <out.json>
const L = require('./test-v5-lib.js'); const { fs, path, stage, open, fresh, NOWMS, at, sleep, tick } = L; const OUT = process.argv[2] || 'test-words-r7-RESULT.json';
const res = []; const T = (g, name, ok, why) => { res.push({ g, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 400) }); if (!ok) { console.log('FAIL', g, '|', name, '|', String(why).slice(0, 300)); } };
const JARGON = [/heartbeat/i, /result code/i, /vtes:\/\//i, /GEMINI\.md/, /vtes5-/i, /vtes-status/i, /\.js\b/, /\.ps1\b/, /\.md\b/, /interval_sec/, /data\\/, /\.sha256/];
const textOutsideRambo = p => p.evaluate(() => {
  const out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) { const n = w.currentNode, par = n.parentElement; if (!par || par.closest('.v5forrambo,.repair-log,script,style,noscript')) { continue; } const t = n.textContent.trim(); if (t) { out.push(t); } }
  const titles = [...document.querySelectorAll('[title]')].filter(e => !e.closest('.v5forrambo')).map(e => e.getAttribute('title')); return out.concat(titles);
});
const sets = () => [
  ['shipped data', null], ['fresh data', fresh(NOWMS)],
  ['local folder confirmed (plain C: path)', (() => { const f = fresh(NOWMS); f.heartbeat.local_only_folder.label = 'C:\\VTES-LOCAL-ONLY'; return f; })()],
  ['bots disabled, running, failed', (() => { const f = fresh(NOWMS); f.bots.bots['CU-Orchestrator'].state = 'Disabled'; f.bots.bots['CU-Local-Executor'] = { state: 'Running', last_result: 267009, last_run_at: at(5), interval_sec: 600 }; f.bots.bots['CU-TokenMonitor-Hourly'].last_result = 1; f.bots.bots['CU-Propagation-Check'].last_result = 267010; f.bots.bots['VTES-LOCAL-POLLER'] = { state: 'Ready', last_result: 267011 }; return f; })()],
  ['stale and unreadable data', (() => { const f = fresh(NOWMS); f.tokens.programs = { name: 'x', tokens_today: 1 }; f.state.at = at(60 * 40); f.miamidade.at = at(60 * 24 * 8); f.heartbeat.at = at(60 * 5); return f; })()]
];
(async () => {
  const br = await L.chromium.launch();
  // (1) jargon
  for (const [nm, files] of sets()) {
    const d = stage(files); const { ctx, p, errs } = await open(br, d); const texts = await textOutsideRambo(p); const bad = [];
    texts.forEach(t => JARGON.forEach(re => { if (re.test(t) && bad.length < 6) { bad.push(re + ' in "' + t.slice(0, 120) + '"'); } }));
    T('jargon', 'no jargon outside "For RAMBO" lines (' + nm + '; ' + texts.length + ' text pieces)', bad.length === 0, bad.join(' || ')); await ctx.close();
  }
  // (2) contradiction BLOCKED vs CONFIRMED
  {
    const f = fresh(NOWMS); f.heartbeat.local_only_folder.label = 'C:\\VTES-LOCAL-ONLY';
    const d = stage(f); const { ctx, p } = await open(br, d); window_open: await p.evaluate(() => { window.open = () => null; });
    const live = await p.evaluate(() => document.querySelector('[data-localfolder]').textContent); T('contradiction', 'live LOCAL line says CONFIRMED with a C:\\ folder', /CONFIRMED/.test(live) && !/NOT CONFIRMED/.test(live), live);
    await p.evaluate(() => { document.getElementById('to').value = 'LOCAL'; document.getElementById('to').dispatchEvent(new Event('change', { bubbles: true })); document.getElementById('go').click(); }); await sleep(p, 300);
    const blocked = await p.evaluate(() => { const o = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const n = w.currentNode, par = n.parentElement; if (!par || par.closest('script,style,[data-localfolder]')) { continue; } if (/BLOCKED/.test(n.textContent)) { o.push(n.textContent.trim().slice(0, 140)); } } return o; });
    T('contradiction', 'with the folder CONFIRMED no other line on the page says BLOCKED (LOCAL card, status after Copy packet and open)', blocked.length === 0, blocked.join(' || ')); await ctx.close();
    const d2 = stage(fresh(NOWMS)); const c2 = await open(br, d2); const t2 = await c2.p.evaluate(() => { document.getElementById('to').value = 'LOCAL'; document.getElementById('to').dispatchEvent(new Event('change', { bubbles: true })); window.open = () => null; document.getElementById('go').click(); return ''; }); await sleep(c2.p, 300);
    const conf = await c2.p.evaluate(() => { const o = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const n = w.currentNode, par = n.parentElement; if (!par || par.closest('script,style,[data-localfolder],.v5forrambo')) { continue; } if (/CONFIRMED/.test(n.textContent) && !/NOT CONFIRMED|until|then says|Until|confirms|confirmed as safe|confirm/i.test(n.textContent)) { o.push(n.textContent.trim().slice(0, 140)); } } return o; });
    T('contradiction', 'with no folder confirmed no typed line claims CONFIRMED', conf.length === 0, conf.join(' || ')); await c2.ctx.close();
  }
  // (3) links name their destination
  {
    const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d);
    const links = await p.evaluate(() => [...document.querySelectorAll('a[href^="http"]')].map(a => ({ t: a.textContent.trim(), h: a.getAttribute('href') })));
    const need = { 'claude.ai': /claude\.ai/i, 'grok.com': /grok\.com/i, 'gemini.google.com': /gemini\.google\.com/i, 'drive.google.com': /Google Drive/i, 'docs.google.com': /Google Docs/i };
    const bad = links.filter(l => { const host = new URL(l.h).host; const re = need[host]; return !re || !re.test(l.t); });
    T('links', links.length + ' external links, each names where it goes', links.length >= 20 && bad.length === 0, bad.slice(0, 5).map(b => b.t + ' -> ' + b.h).join(' || ') + ' (' + bad.length + ' bad)'); await ctx.close();
  }
  // (4) search words
  {
    const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d);
    const find = async w => { await p.fill('#q', w); await sleep(p, 150); return p.evaluate(() => [...document.querySelectorAll('.card:not(.hide)')].map(c => (c.id || c.querySelector('.name').textContent))); };
    const h = await find('hourly'); T('search', '"hourly" finds the CU-Propagation-Check card (' + h.join(',') + ')', h.some(x => /Propagation/.test(x)), h.join(','));
    const m2 = await find('2 minutes'); T('search', '"2 minutes" still finds LLM-01 (' + m2.join(',') + ')', m2.some(x => /LLM-01/.test(x)), m2.join(','));
    const m15 = await find('15 minutes'); T('search', '"15 minutes" still finds CU-Orchestrator (' + m15.join(',') + ')', m15.some(x => /Orchestrator/.test(x)), m15.join(','));
    const m5 = await find('5 minutes'); T('search', '"5 minutes" still finds CU-Local-Executor (' + m5.join(',') + ')', m5.some(x => /Local-Executor/.test(x)), m5.join(','));
    await ctx.close();
  }
  // (5) LLM-05 and LLM-06 status lines
  {
    const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d);
    for (const id of ['LLM-05', 'LLM-06']) {
      const st = await p.evaluate(async id => { window.open = () => null; document.getElementById('to').value = id; document.getElementById('to').dispatchEvent(new Event('change', { bubbles: true })); document.getElementById('go').click(); await new Promise(r => setTimeout(r, 200)); return document.getElementById('status').textContent; }, id);
      T('pointers', id + ' status line points to the ' + id + ' card in section 2: "' + st.slice(0, 160) + '"', new RegExp(id + ' card in section 2').test(st), st);
    }
    await ctx.close();
  }
  // (6) the clock cannot be set from a data file
  {
    const f = fresh(NOWMS); const d = stage(f); fs.appendFileSync(path.join(d, 'data', 'vtes5-heartbeat.js'), 'window.VTES5_NOW="2026-09-01T00:00:00Z";window.VTES5_CLOCK="2026-09-01";window.__now="2026-09-01T00:00:00Z";');
    const { ctx, p } = await open(br, d); const r = await p.evaluate(() => ({ now: window.VTES5.now().toISOString(), live: window.VTES5.now() instanceof Date })); T('clock', 'a data file that sets VTES5_NOW does not change the page clock (' + r.now + ')', r.now.slice(0, 10) === '2026-10-06', JSON.stringify(r));
    const st = await p.evaluate(() => document.querySelector('.v5st[data-state="LLM-01"]').textContent); T('clock', 'the LLM-01 card still reads UP as of Oct 6 (not as of Sep 1)', /Oct 6/.test(st) && !/Sep 1/.test(st), st); await ctx.close();
  }
  // (7) NOT PROVEN
  {
    const f = fresh(NOWMS); delete f.miamidade.counted; const d = stage(f); const { ctx, p } = await open(br, d);
    const strip = await p.evaluate(() => [...document.querySelectorAll('.v5b[data-src]')].map(b => ({ c: b.className, t: b.textContent })));
    const greyFine = strip.filter(s => /\bna\b/.test(s.c) && /NOT FINE/.test(s.t)); const grey = strip.filter(s => /\bna\b/.test(s.c));
    T('wording', 'a grey strip entry says NOT PROVEN, never NOT FINE (' + grey.length + ' grey entries)', greyFine.length === 0, greyFine.map(s => s.t).join(' || '));
    const ov = await p.evaluate(() => document.getElementById('v5overall').textContent); T('wording', 'WHOLE PAGE line uses NOT PROVEN or NOT FINE words correctly: ' + ov.slice(0, 80), !/NOT ALL PROVEN/.test(ov), ov); await ctx.close();
  }
  // (8) local-folder allow rule
  {
    const cases = [['G:\\VTES-LOCAL', false], ['G:\\Shared drives\\VTES-LOCAL', false], ['G:\\My Drive\\VTES-LOCAL', false], ['C:\\Users\\JV\\Desktop\\VTES-LOCAL', false], ['C:\\Users\\JV\\OneDrive\\VTES-LOCAL', false], ['C:\\Users\\JV\\Documents\\VTES-LOCAL', false], ['C:\\Users\\JV\\Dropbox\\x', false], ['D:\\VTES-LOCAL', false], ['\\\\server\\share\\x', false],
      ['VTES-LOCAL-ONLY', false], ['C:\\VTES-LOCAL-ONLY', true], ['C:\\Data\\VTES-LOCAL', true], ['C:\\Users\\JV\\VTES-LOCAL', true]];
    for (const [label, expect] of cases) {
      const f = fresh(NOWMS); f.heartbeat.local_only_folder.label = label; const d = stage(f); const { ctx, p } = await open(br, d);
      const t = await p.evaluate(() => { const e = document.querySelector('[data-localfolder]'); return { c: e.className, t: e.textContent }; });
      T('local folder', JSON.stringify(label) + (expect ? ' is CONFIRMED' : ' is refused'), expect ? (/\bok\b/.test(t.c) && /CONFIRMED/.test(t.t) && !/NOT CONFIRMED/.test(t.t)) : (/\bbad\b/.test(t.c) && /NOT CONFIRMED/.test(t.t)), t.c + ' ' + t.t.slice(0, 150)); await ctx.close();
    }
    const withProof = (label, who, proof) => { const f = fresh(NOWMS); Object.assign(f.heartbeat.local_only_folder, { label, local_only_verified_by: who, not_synced_proof: proof }); return f; };
    for (const [nm, f, expect] of [['non-path label, verified_by and not_synced_proof given', withProof('VTES-LOCAL-ONLY', 'RAMBO 2026-10-06', 'Get-Item shows no reparse point and no sync client path'), true], ['non-path label, verified_by only', withProof('VTES-LOCAL-ONLY', 'RAMBO', ''), false], ['G: label even with a proof', withProof('G:\\VTES-LOCAL', 'RAMBO', 'proof text'), false]]) {
      const d = stage(f); const { ctx, p } = await open(br, d); const t = await p.evaluate(() => { const e = document.querySelector('[data-localfolder]'); return { c: e.className, t: e.textContent }; });
      T('local folder', nm + (expect ? ' is CONFIRMED' : ' is refused'), expect ? (/\bok\b/.test(t.c)) : /\bbad\b/.test(t.c), t.c + ' ' + t.t.slice(0, 150)); await ctx.close();
    }
  }
  // (9) stale Miami-Dade count
  {
    const f = fresh(NOWMS); f.miamidade.at = at(60 * 24 * 8); const d = stage(f); const { ctx, p } = await open(br, d);
    const m = await p.evaluate(() => { const p2 = document.getElementById('pn-miami'); const first = [...p2.querySelectorAll('p')].find(x => /Counted so far/.test(x.textContent)); return { html: first.innerHTML, red: !!first.querySelector('.v5b.bad') }; });
    T('stale count', 'a Miami-Dade count from an 8-day-old file is an OLD red mark, not plain bold: ' + m.html.slice(0, 160), m.red && /OLD/.test(m.html), m.html); await ctx.close();
  }
  // (10) layout
  {
    const d = stage(fresh(NOWMS)); let o = await open(br, d, { viewport: { width: 1536, height: 730 } });
    let r = await o.p.evaluate(() => ({ bar: document.getElementById('tabs').offsetHeight, btn: document.getElementById('v5rambobtn').getBoundingClientRect().bottom })); T('layout', 'tab bar at 1536x730 is at most 25% of the height (' + r.bar + ' of 730 px; limit 182)', r.bar <= 182, r.bar); await o.ctx.close();
    o = await open(br, d, { viewport: { width: 390, height: 800 } });
    r = await o.p.evaluate(async () => { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }); await new Promise(r => setTimeout(r, 100)); const foot = [...document.querySelectorAll('p.sub')].pop().getBoundingClientRect(), box = document.getElementById('vtes-back-to-panel').getBoundingClientRect(); return { footBottom: foot.bottom, boxTop: box.top }; });
    T('layout', 'on a phone (390 px) the PANEL/INDEX corner box does not cover the footer (footer bottom ' + Math.round(r.footBottom) + ', box top ' + Math.round(r.boxTop) + ')', r.footBottom <= r.boxTop - 1, JSON.stringify(r)); await o.ctx.close();
    o = await open(br, d, { viewport: { width: 1300, height: 900 } });
    await o.p.addStyleTag({ content: 'html{font-size:200%}' }); await sleep(o.p, 300);
    r = await o.p.evaluate(() => ({ body: parseFloat(getComputedStyle(document.body).fontSize), readme: parseFloat(getComputedStyle(document.querySelector('.v5read ol')).fontSize), btn: document.getElementById('v5rambobtn').getBoundingClientRect().bottom, cs: parseFloat(getComputedStyle(document.querySelector('.v5st')).fontSize), minSmall: Math.min(...[...document.querySelectorAll('.v5st,.v5b,.tab small')].map(e => parseFloat(getComputedStyle(e).fontSize))) }));
    T('layout', 'with the browser text size at 200%, body text doubles (' + r.body + ' px, state lines ' + r.cs + ' px, smallest ' + r.minSmall + ' px)', r.body >= 35 && r.cs >= 30 && r.readme >= 35, JSON.stringify(r));
    T('layout', 'at 200% text size the RAMBO button is still on the first screen (bottom ' + Math.round(r.btn) + ' of 900)', r.btn <= 900, r.btn); await o.ctx.close();
    o = await open(br, d, { viewport: { width: 650, height: 450 } });
    r = await o.p.evaluate(() => ({ btn: document.getElementById('v5rambobtn').getBoundingClientRect().bottom, top: document.getElementById('v5rambobtn').getBoundingClientRect().top }));
    T('layout', 'at 200% page zoom (650x450 viewport) the RAMBO button is on the first screen (' + Math.round(r.top) + ' to ' + Math.round(r.btn) + ' of 450)', r.btn <= 450, JSON.stringify(r)); await o.ctx.close();
  }
  await br.close();
  const pass = res.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ test: 'test-words-r7', pass, total: res.length, results: res }, null, 1));
  console.log('WORDS R7: ' + pass + ' of ' + res.length + ' pass'); process.exit(pass === res.length ? 0 : 1);
})();
