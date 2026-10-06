// test-watchdog-r7.js - fix round 7, CLASS 1: the paint is unable to stop, and the WATCHDOG turns the page red when it does. TRK-2026-9910-B
// Cases: (1) the first paint fails (a poisoned querySelectorAll): the top block is still there and the page says PAGE NOT REFRESHING at once; (2) a paint that fails later: red at once, and it recovers by itself when the failure goes;
// (3) the 60-second refresh stops (the reload never answers): green until 3 minutes, then PAGE NOT REFRESHING on the line, on every strip entry and in the banner; it clears when a paint works again;
// (4) one panel cannot be drawn: it shows its own failure box and the other panels and the cards still paint; (5) vtes5-ui.js missing: a plain red box. Usage: node test-watchdog-r7.js <out.json>
const L = require('./test-v5-lib.js'); const { fs, path, stage, open, fresh, NOWMS, sleep } = L; const OUT = process.argv[2] || 'test-watchdog-r7-RESULT.json';
const res = []; const T = (g, name, ok, why) => { res.push({ g, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) { console.log('FAIL', g, '|', name, '|', String(why).slice(0, 300)); } };
const snap = p => p.evaluate(() => { const Q = s => (window.__qsaOrig || Document.prototype.querySelectorAll).call(document, s); return ({ overall: (document.getElementById('v5overall') || {}).textContent || null, oc: (document.getElementById('v5overall') || {}).className || '', strip: [...Q('.v5b[data-src]')].map(b => b.textContent), stripCls: [...Q('.v5b[data-src]')].map(b => b.className),
  banner: (document.getElementById('v5watch') || { style: {} }).style.display === 'block' ? document.getElementById('v5watch').textContent : '', failbox: !!document.getElementById('v5failbox'), rambo: !!document.getElementById('v5rambobtn'), readme: !!document.getElementById('v5read'), live: !!document.getElementById('livestatus'),
  panels: ['v5health', 'v5tokens', 'v5house', 'v5miami', 'v5repairs'].map(i => (document.getElementById(i) || { innerHTML: '' }).innerHTML.length), panelFail: document.body.innerText.split('COULD NOT BE DRAWN').length - 1, cards: Q('.v5st[data-state]').length }); });
(async () => {
  const br = await L.chromium.launch(); const NOT = /PAGE NOT REFRESHING - DO NOT TRUST/;
  // (1) first paint fails
  { const d = stage(fresh(NOWMS)); const ctx = await br.newContext({ viewport: { width: 1300, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(() => { const q = Document.prototype.querySelectorAll; window.__qsaOrig = q; Document.prototype.querySelectorAll = function () { if (document.getElementById('v5rambobtn') || window.__poison) { throw new Error('poisoned'); } return q.apply(this, arguments); }; });
    await p.clock.install({ time: new Date(L.NOW) }); await p.goto('file://' + d + '/VTES-LLM-LAUNCHER_v5.html'); await sleep(p, 800); const s = await snap(p);
    T('first paint fails', 'the top block (RAMBO button, Read me first, Live status) is on the page although the first paint failed', s.rambo && s.readme && s.live, JSON.stringify(s));
    T('first paint fails', 'the page says PAGE NOT REFRESHING - DO NOT TRUST on the WHOLE PAGE line and in the banner at once', NOT.test(s.overall || '') && NOT.test(s.banner), JSON.stringify([s.overall, s.banner]));
    T('first paint fails', 'no uncaught error escapes', errs.length === 0, errs.join('|')); await ctx.close(); }
  // (2) a later paint fails, then recovers
  { const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d); let s = await snap(p); T('later failure', 'the page starts green-or-honest with a painted WHOLE PAGE line', /^WHOLE PAGE/.test(s.overall || ''), s.overall);
    await p.evaluate(() => { const q = Document.prototype.querySelectorAll; window.__qsaOrig = q; Document.prototype.querySelectorAll = function () { if (window.__poison) { throw new Error('poisoned'); } return q.apply(this, arguments); }; window.__poison = true; }); await p.clock.fastForward(61000); await sleep(p, 900); s = await snap(p);
    T('later failure', 'when a paint throws, WHOLE PAGE, every strip entry and the banner turn red PAGE NOT REFRESHING at once', NOT.test(s.overall || '') && s.strip.every(x => NOT.test(x)) && /bad/.test(s.oc) && s.stripCls.every(c => /bad/.test(c)) && NOT.test(s.banner), JSON.stringify(s));
    await p.evaluate(() => { window.__poison = false; }); await p.clock.fastForward(61000); await sleep(p, 900); s = await snap(p);
    T('later failure', 'after the failure goes the page recovers by itself on the next refresh (no reload)', !NOT.test(s.overall || '') && !s.banner && /^WHOLE PAGE/.test(s.overall || ''), JSON.stringify([s.overall, s.banner])); await ctx.close(); }
  // (3) the refresh stops
  { const d = stage(fresh(NOWMS)); const { ctx, p } = await open(br, d); await p.evaluate(() => { VTES5.reload = function () { }; });
    await p.clock.fastForward(2 * 60 * 1000); await sleep(p, 300); let s = await snap(p); T('refresh stops', 'after 2 minutes without a redraw the page is NOT yet marked (the limit is 3 minutes)', !NOT.test(s.overall || '') && !s.banner, JSON.stringify([s.overall, s.banner]));
    await p.clock.fastForward(2 * 60 * 1000); await sleep(p, 300); s = await snap(p);
    T('refresh stops', 'after 4 minutes without a redraw WHOLE PAGE, every strip entry and the banner say PAGE NOT REFRESHING - DO NOT TRUST', NOT.test(s.overall || '') && s.strip.every(x => NOT.test(x)) && NOT.test(s.banner), JSON.stringify(s));
    await p.evaluate(() => { delete VTES5.reload; }); await ctx.close(); }
  // (4) one panel cannot be drawn
  { const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d); await p.evaluate(() => { VTES5.dateJudge = function () { throw new Error('panel boom'); }; }); await p.clock.fastForward(61000); await sleep(p, 900); const s = await snap(p);
    T('one panel fails', 'a panel that cannot be drawn shows its own red box "THIS PANEL COULD NOT BE DRAWN" (' + s.panelFail + ' boxes)', s.panelFail >= 1, JSON.stringify(s));
    T('one panel fails', 'the repairs panel, the cards and the strip still paint (panel sizes ' + s.panels.join(',') + ', cards ' + s.cards + ')', s.panels[4] > 50 && s.cards >= 11 && /^WHOLE PAGE/.test(s.overall || ''), JSON.stringify(s));
    T('one panel fails', 'WHOLE PAGE is red while a panel is broken', /bad/.test(s.oc), s.oc); T('one panel fails', 'no uncaught error', errs.length === 0, errs.join('|')); await ctx.close(); }
  // (5) vtes5-ui.js is missing
  { const d = stage(fresh(NOWMS)); fs.unlinkSync(path.join(d, 'vtes5-ui.js')); const { ctx, p } = await open(br, d); const s = await snap(p);
    T('script missing', 'with vtes5-ui.js missing a plain red box says PAGE NOT REFRESHING - DO NOT TRUST', s.failbox && /PAGE NOT REFRESHING/.test(await p.evaluate(() => document.getElementById('v5failbox').textContent)), JSON.stringify(s)); await ctx.close(); }
  await br.close(); const pass = res.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-watchdog-r7', pass, total: res.length, results: res }, null, 1)); console.log('WATCHDOG R7: ' + pass + ' of ' + res.length + ' pass'); process.exit(pass === res.length ? 0 : 1);
})();
