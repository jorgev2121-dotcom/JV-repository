// test-state-text-r8.js - fix round 8, CLASS "words that claim more than the page does", Tier 3 (enforce): STATE-TEXT CONSISTENCY. TRK-2026-9910-B
// For every data world, every tick state and every route, any sentence on the page that says a packet is ready, says "press X" or says "one click" must match the REAL enabled state of that button or link,
// and no card may say both "one click" and "no Open button". Also: every queued item, unticked and then ticked, must leave a status line that matches the Copy packet and open button.
// Rules (each instance counts as one check, reported N of N):
//   S1  a card whose text says "one click" has a visible vtes:// link; S2 a card whose text says "no Open button" has no Open link; S3 no card says both;
//   S4  the LLM-05 (iPhone) card never says "open ... with one click"; S5 the status line saying "ready" means Copy packet and open is enabled; S6 the status line saying "tick" means it is disabled (or the note is empty / LOCAL);
//   S7  a sentence "press <named button>" (without the word tick, switched off or NOT ALLOWED) names a button that is enabled; S8 a disabled gated button shows its reason line, an enabled one shows none.
// Usage: node test-state-text-r8.js <out.json>   (env PKG = package folder to test; default ./package)
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS, at, ALL } = L; const OUT = process.argv[2] || 'test-state-text-r8-RESULT.json';
const reg = fn => { const f = fresh(NOWMS); fn(f); return f; };
const FILLED = {}; ['LLM-01', 'LLM-02', 'LLM-03', 'LLM-04', 'LLM-05', 'LLM-06', 'LLM-07', 'LLM-08', 'LLM-09'].forEach(i => { FILLED[i] = true; });
const WORLDS = [
  ['shipped data (no data files)', null], ['fresh: registered, LLM-01 and LLM-03 filled', fresh(NOWMS)], ['registered, every address filled', reg(f => { f.heartbeat.addresses_filled = FILLED; })],
  ['registered, no address filled', reg(f => { f.heartbeat.addresses_filled = {}; })], ['shortcuts not registered', reg(f => { f.heartbeat.vtes_scheme_registered = false; })],
  ['heartbeat stale (5 hours)', reg(f => { f.heartbeat.at = at(300); f.heartbeat.addresses_filled = FILLED; })], ['heartbeat unreadable', reg(f => { f.heartbeat = { junk: 1 }; })],
  ['local folder confirmed, every address filled', reg(f => { f.heartbeat.addresses_filled = FILLED; f.heartbeat.local_only_folder.label = 'C:\\VTES-LOCAL-ONLY'; })], ['local folder not confirmed', reg(f => { f.heartbeat.local_only_folder = { ok: false }; })]
];
const TICKS = ['empty note', 'note, not ticked', 'note, ticked'];
const checks = []; let bad = 0;
const C = (grp, name, ok, why) => { checks.push({ grp, name, ok: !!ok }); if (!ok) { bad++; if (bad <= 40) { console.log('FAIL', grp, '|', name, '|', String(why || '').slice(0, 260)); } } };
const snapshot = p => p.evaluate(() => {
  const $ = i => document.getElementById(i), vis = e => !!e && e.style.display !== 'none' && (e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0);
  const cards = [...document.querySelectorAll('.card')].map(c => ({ id: c.id, text: c.innerText, vtesLink: !!c.querySelector('a[href^="vtes:"]'), openLink: [...c.querySelectorAll('a.btn')].some(a => /^open /i.test(a.textContent) || /^vtes:/.test(a.getAttribute('href') || '')), bigcopy: !!c.querySelector('button.bigcopy') }));
  const gated = [['go', $('go')], ['show', $('show')], ['top', $('v5rambobtn')]].concat([...document.querySelectorAll('button.bigcopy')].map(b => ['big:' + b.getAttribute('data-paste') + ':' + (b.closest('.card') || {}).id, b]));
  const btns = gated.map(([k, b]) => { const w = b && b.nextSibling && b.nextSibling.className === 'v5why' ? b.nextSibling : null; return { k, label: b ? b.textContent : '', disabled: !!(b && b.disabled), why: w ? w.textContent : '', whyVisible: w ? vis(w) && w.textContent !== '' : false, card: b && b.closest('.card') ? b.closest('.card').id : '' }; });
  const sentences = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) { const n = walker.currentNode, par = n.parentElement; if (!par || par.closest('script,style,textarea,noscript,.repair-log')) { continue; } const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) { const card = par.closest('.card'); sentences.push({ t, card: card ? card.id : '', top: !!par.closest('#v5top,#v5rambo') }); } }
  return { status: $('status').textContent, noteLen: $('note').value.trim().length, to: $('to').value, cards, btns, sentences };
});
const setState = (p, tickState, to) => p.evaluate(({ tickState, to }) => {
  const $ = i => document.getElementById(i); window.open = () => null;
  $('to').value = to; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('from').value = 'LLM-04';
  $('note').value = tickState === 'empty note' ? '' : 'Check the Bal Harbour permit summary'; $('note').dispatchEvent(new Event('input', { bubbles: true }));
  const c = $('v5ack'); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true }));
  if (tickState === 'note, ticked') { c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); }
}, { tickState, to });
const settle = p => p.clock.runFor(1500).catch(() => { });
const PRESS = /press (?:the )?(?:big )?(copy packet and open|just show|show packet|copy packet for [A-Za-z0-9 \-]+?(?=[.,;:]|$| then)|blue(?: RAMBO)? button)/i;
function analyse(world, ts, route, s) {
  const tag = world + ' / ' + ts + ' / To ' + route;
  const go = s.btns.find(b => b.k === 'go'), show = s.btns.find(b => b.k === 'show'), top = s.btns.find(b => b.k === 'top');
  // S1 to S4 depend on the world only; they are checked in the first tick state of each route (cheap, and they stay true in all)
  s.cards.forEach(c => {
    const one = /one click/i.test(c.text), noOpen = /no Open button/i.test(c.text);
    if (one) { C('S1 one click needs a link', tag + ' ' + c.id, c.vtesLink, c.id + ' says one click but has no vtes link'); }
    if (noOpen) { C('S2 no Open button needs no link', tag + ' ' + c.id, !c.openLink, c.id + ' says no Open button but has an Open link'); }
    if (one || noOpen) { C('S3 never both', tag + ' ' + c.id, !(one && noOpen), c.id + ' says both'); }
    if (c.id === 'card-LLM-05') { C('S4 phone card', tag, !/open[^.]*with one click/i.test(c.text), 'LLM-05 says open with one click'); }
  });
  const st = s.status || '';
  if (/ready/i.test(st)) { C('S5 status says ready', tag, !go.disabled, 'status "' + st + '" while Copy packet and open is disabled'); }
  if (/\btick\b/i.test(st)) { C('S6 status says tick', tag, go.disabled, 'status "' + st + '" while Copy packet and open is enabled'); }
  s.sentences.forEach(x => {
    const m = PRESS.exec(x.t); if (!m || /tick|switched off|not allowed|only after/i.test(x.t)) { return; }
    const what = m[1].toLowerCase(); let b = null;
    if (what.indexOf('copy packet and open') === 0) { b = go; } else if (what.indexOf('just show') === 0 || what.indexOf('show packet') === 0) { b = show; }
    else if (what.indexOf('blue') === 0) { b = x.card ? s.btns.find(q => q.card === x.card && /^big:/.test(q.k)) : top; }
    else { const lab = what.replace('copy packet for ', ''); b = s.btns.find(q => /^big:/.test(q.k) && q.label.toLowerCase().indexOf(lab.trim()) >= 0); }
    if (b) { C('S7 press X names an enabled button', tag + ' "' + x.t.slice(0, 70) + '"', !b.disabled, 'sentence "' + x.t.slice(0, 140) + '" but ' + b.k + ' is disabled'); }
  });
  s.btns.forEach(b => { if (b.k === 'go' || b.k === 'show' || b.k === 'top' || /^big:/.test(b.k)) { C('S8 reason line matches the button', tag + ' ' + b.k, b.disabled === b.whyVisible, b.k + ' disabled=' + b.disabled + ' reasonVisible=' + b.whyVisible); } });
}
(async () => {
  const br = await L.chromium.launch(); const routes = ['LLM-01', 'LLM-03', 'LLM-05', 'LLM-07', 'LOCAL', 'RAMBO', 'COWORK', 'GROK'];
  for (const [wn, files] of WORLDS) {
    const d = stage(files); const { ctx, p, errs } = await open(br, d); await settle(p);
    for (const ts of TICKS) { for (const r of routes) {
      const present = await p.evaluate(v => !![...document.querySelectorAll('#to option')].find(o => o.value === v), r); if (!present) { continue; }
      await setState(p, ts, r); await settle(p); analyse(wn, ts, r, await snapshot(p));
    } }
    C('page', wn + ': no page errors', errs.length === 0, errs.join(' | ')); await ctx.close();
  }
  // queued items: click, read the status, then tick and read it again
  for (const [wn, files] of [WORLDS[0], WORLDS[1], WORLDS[2]]) {
    const d = stage(files); const { ctx, p, errs } = await open(br, d); await settle(p);
    const n = await p.evaluate(() => document.querySelectorAll('[data-q]').length);
    for (let i = 0; i < n; i++) {
      for (const mode of ['unticked', 'ticked after the click']) {
        await p.evaluate(() => { const c = document.getElementById('v5ack'); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); window.open = () => null; });
        await p.evaluate(i => document.querySelectorAll('[data-q]')[i].click(), i); await settle(p);
        if (mode !== 'unticked') { await p.evaluate(() => { const c = document.getElementById('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); }); await settle(p); }
        const s = await snapshot(p), go = s.btns.find(b => b.k === 'go'), tag = wn + ' / queued item ' + (i + 1) + ' (to ' + s.to + ') / ' + mode;
        C('Q1 queued status matches the button', tag, !(/ready/i.test(s.status) && go.disabled) && !(/\btick\b/i.test(s.status) && !go.disabled), 'status "' + s.status + '" go disabled=' + go.disabled);
        C('Q2 a status is shown after a queued click', tag, s.status.trim().length > 0, 'empty status');
        if (mode !== 'unticked' || s.to === 'LOCAL') { C('Q3 when the button is enabled the status says ready', tag, go.disabled || /ready/i.test(s.status), 'status "' + s.status + '" with the button enabled'); }
      }
    }
    C('page', wn + ' (queued): no page errors', errs.length === 0, errs.join(' | ')); await ctx.close();
  }
  await br.close();
  const groups = {}; checks.forEach(c => { const g = groups[c.grp] = groups[c.grp] || { n: 0, ok: 0 }; g.n++; if (c.ok) { g.ok++; } });
  const pass = checks.filter(c => c.ok).length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-state-text-r8', worlds: WORLDS.length, tick_states: TICKS.length, routes: routes.length, groups, pass, total: checks.length }, null, 1));
  Object.keys(groups).sort().forEach(g => console.log('  ' + g + ': ' + groups[g].ok + ' of ' + groups[g].n));
  console.log('STATE-TEXT R8: ' + pass + ' of ' + checks.length + ' checks right (' + WORLDS.length + ' worlds x ' + TICKS.length + ' tick states x ' + routes.length + ' routes, plus queued items)');
  process.exit(pass === checks.length ? 0 : 1);
})();
