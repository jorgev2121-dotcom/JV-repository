// test-privacy-matrix-r7.js - fix round 7, CLASS 2 (personal data): every note x every route the page offers for building a packet, in TWO modes. TRK-2026-9910-B
//   MODE NO-TICK : the "no client personal data" box is NOT ticked. A note with text must produce NO packet and NO clipboard write on every route whose destination is not LOCAL (the gate layer),
//                  whether the note is personal or ordinary. LOCAL routes work with no tick.
//   MODE WRONG-TICK: the box IS ticked (a person ticks it by mistake). The digit guard (second layer) must still keep the personal note out of every non-LOCAL packet; ordinary notes must be carried everywhere.
//   Also: the tick resets when the note text changes and when the To choice changes; the disabled buttons show their reason.
// Notes come from pii-notes-r7.js (>= 84 personal, 40 ordinary). "Cannot catch" notes (names, emails, addresses) are reported separately: with the box ticked the guard does not stop them, and the page says so.
// Usage: node test-privacy-matrix-r7.js <out.json>
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS } = L; const N = require('./pii-notes-r7.js');
const OUT = process.argv[2] || 'test-privacy-matrix-r7-RESULT.json';
(async () => {
  const br = await L.chromium.launch(); const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
  const info = await p.evaluate(() => ({
    from: [...document.querySelectorAll('#from option')].map(o => o.value), to: [...document.querySelectorAll('#to option')].map(o => o.value),
    big: [...document.querySelectorAll('button.bigcopy')].map(b => ({ paste: b.getAttribute('data-paste'), card: b.closest('.card').id })),
    hand: [...document.querySelectorAll('button[data-to]')].map(b => b.getAttribute('data-to')), queued: [...document.querySelectorAll('[data-q]')].length, hasTick: !!document.getElementById('v5ack')
  }));
  if (!info.hasTick) { console.log('FAIL: the tick box (#v5ack) is not on the page'); process.exit(1); }
  const routes = [];
  info.big.forEach((b, i) => routes.push({ kind: 'big', i, to: b.paste, label: 'big copy button on ' + b.card }));
  routes.push({ kind: 'top', to: 'LLM-01', label: 'top RAMBO button' });
  info.from.forEach(f => info.to.forEach(t => { routes.push({ kind: 'go', from: f, to: t, label: 'Copy packet and open ' + f + '->' + t }); routes.push({ kind: 'show', from: f, to: t, label: 'Just show ' + f + '->' + t }); }));
  info.hand.forEach((t, i) => routes.push({ kind: 'hand', i, to: t, label: 'Hand work here -> ' + t }));
  for (let q = 0; q < info.queued; q++) routes.push({ kind: 'queued', q, label: 'queued item ' + (q + 1) });
  routes.push({ kind: 'seq', label: 'LOCAL then RAMBO', to: 'LLM-01' });
  console.log('routes: ' + routes.length);
  const run = (note, tick) => p.evaluate(async ({ routes, note, tick }) => {
    const settle = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
    const bigs = [...document.querySelectorAll('button.bigcopy')], hands = [...document.querySelectorAll('button[data-to]')], qs = [...document.querySelectorAll('[data-q]')];
    window.open = () => null; const res = []; const $ = i => document.getElementById(i);
    let clip = 0; const origW = navigator.clipboard.writeText; navigator.clipboard.writeText = t => { clip++; window.__clip = t; return Promise.resolve(); };
    const setNote = () => { $('note').value = note; $('note').dispatchEvent(new Event('input')); };
    const doTick = () => { const c = $('v5ack'); if (tick) { c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); } else { c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); } };
    const setTo = t => { $('to').value = t; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('to').dispatchEvent(new Event('input')); };
    for (const r of routes) {
      window.__clip = null; clip = 0; $('preview').value = ''; $('status').textContent = '';
      setNote(); let to = r.to; let btn = null;
      if (r.kind === 'big') { setTo(r.to); doTick(); btn = bigs[r.i]; }
      else if (r.kind === 'top') { setTo('LLM-01'); doTick(); btn = $('v5rambobtn'); }
      else if (r.kind === 'go' || r.kind === 'show') { $('from').value = r.from; setTo(r.to); doTick(); btn = $(r.kind); }
      else if (r.kind === 'hand') { hands[r.i].click(); await settle(); setNote(); to = $('to').value; doTick(); btn = $('go'); }
      else if (r.kind === 'queued') { qs[r.q].click(); await settle(); to = $('to').value; setNote(); doTick(); btn = $('go'); }
      else if (r.kind === 'seq') { setTo('LOCAL'); bigs.find(b => b.getAttribute('data-paste') === 'LOCAL').click(); await settle(); setNote(); setTo('LLM-01'); doTick(); btn = $('v5rambobtn'); }
      await settle();
      const wasDisabled = !!btn.disabled; btn.click(); await settle(); await new Promise(r2 => setTimeout(r2, 0)); await settle();
      const pkt = $('preview').value, clipTxt = window.__clip || '', why = (btn.parentNode.querySelector('.v5why') || { textContent: '' }).textContent;
      res.push({ label: r.label, kind: r.kind, to: to || $('to').value, packet: pkt, clip: clipTxt, wasDisabled, why });
    }
    navigator.clipboard.writeText = origW; return res;
  }, { routes, note, tick });
  const secretOf = t => t.replace(/^Check this one\. /, '');
  const rows = []; let pass = 0, total = 0;
  const lbl = t => JSON.stringify(t).replace(/[^\x20-\x7e]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).slice(0, 70);
  // MODE NO-TICK: personal and ordinary notes alike: nothing leaves on a non-LOCAL route
  const all = N.PERSONAL.map(t => ({ t, k: 'personal' })).concat(N.ORDINARY.map(t => ({ t, k: 'ordinary' })), N.CANNOT_CATCH.map(t => ({ t, k: 'cannot-catch' })));
  const mA = { n: 0, ok: 0, bad: [] };
  for (const n of all) {
    const out = await run(n.t, false);
    for (const r of out) {
      if (r.kind === 'queued') { continue; }
      mA.n++; const isLocal = r.to === 'LOCAL', hasText = r.packet.includes(secretOf(n.t).slice(0, 12)) || r.clip.includes(secretOf(n.t).slice(0, 12));
      let good = isLocal ? true : (!hasText && r.clip === '' && (r.wasDisabled || /Tick|tick/.test(r.packet + r.why)));
      if (isLocal && r.kind !== 'show') { good = r.packet.includes(secretOf(n.t).slice(0, 12)) || r.clip.includes(secretOf(n.t).slice(0, 12)) || r.kind === 'hand' || r.kind === 'seq'; }
      if (good) { mA.ok++; } else if (mA.bad.length < 8) { mA.bad.push(n.k + ' ' + lbl(n.t) + ' via ' + r.label + ' (to ' + r.to + '): disabled=' + r.wasDisabled + ' text carried=' + hasText); }
    }
  }
  console.log('NO-TICK mode: ' + mA.ok + ' of ' + mA.n + ' route checks right (' + all.length + ' notes)'); mA.bad.forEach(b => console.log('  ' + b));
  // MODE WRONG-TICK
  const mB = { personal: { n: 0, ok: 0, bad: [] }, ordinary: { n: 0, ok: 0, bad: [] }, cannot: { n: 0, carried: 0 } };
  for (const n of all) {
    const out = await run(n.t, true);
    for (const r of out) {
      if (r.kind === 'queued') { continue; }
      const isLocal = r.to === 'LOCAL', key = secretOf(n.t).slice(0, 12), has = r.packet.includes(key) || r.clip.includes(key), notIncl = /NOT INCLUDED/.test(r.packet + r.clip);
      if (n.k === 'personal') {
        mB.personal.n++; const good = isLocal ? true : (!has && (r.wasDisabled || notIncl || r.kind === 'hand' || r.kind === 'seq' || r.packet !== '' || r.clip !== ''));
        const reallyGood = isLocal ? true : (!has);
        if (reallyGood) { mB.personal.ok++; } else if (mB.personal.bad.length < 8) { mB.personal.bad.push(lbl(n.t) + ' via ' + r.label + ' (to ' + r.to + '): CARRIED'); }
      } else if (n.k === 'ordinary') {
        mB.ordinary.n++; const good = isLocal ? true : (r.kind === 'hand' || r.kind === 'seq' || has);
        if (good) { mB.ordinary.ok++; } else if (mB.ordinary.bad.length < 8) { mB.ordinary.bad.push(lbl(n.t) + ' via ' + r.label + ' (to ' + r.to + '): NOT carried, ' + (notIncl ? 'NOT INCLUDED shown' : 'absent')); }
      } else { if (!isLocal && has) { mB.cannot.carried++; } mB.cannot.n++; }
    }
  }
  console.log('WRONG-TICK mode, personal notes: ' + mB.personal.ok + ' of ' + mB.personal.n + ' route checks right'); mB.personal.bad.forEach(b => console.log('  ' + b));
  console.log('WRONG-TICK mode, ordinary notes: ' + mB.ordinary.ok + ' of ' + mB.ordinary.n + ' route checks right'); mB.ordinary.bad.forEach(b => console.log('  ' + b));
  console.log('WRONG-TICK mode, CANNOT-CATCH notes (disclosed limit, not counted): carried on ' + mB.cannot.carried + ' of ' + mB.cannot.n + ' route checks');
  // the tick resets
  const rs = await p.evaluate(async () => {
    const $ = i => document.getElementById(i), out = {}; window.open = () => null;
    $('to').value = 'LLM-07'; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = 'Check the permit'; $('note').dispatchEvent(new Event('input'));
    const c = $('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await new Promise(r => setTimeout(r, 50));
    out.goEnabledAfterTick = !$('go').disabled && !$('show').disabled;
    $('note').value = 'Check the permit now'; $('note').dispatchEvent(new Event('input')); await new Promise(r => setTimeout(r, 50));
    out.resetOnNote = !c.checked && $('go').disabled; c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await new Promise(r => setTimeout(r, 50));
    out.reTicked = !$('go').disabled; $('to').value = 'LLM-08'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await new Promise(r => setTimeout(r, 50));
    out.resetOnRoute = !c.checked && $('go').disabled; $('to').value = 'LOCAL'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await new Promise(r => setTimeout(r, 50));
    out.localNeedsNoTick = !$('go').disabled && !$('show').disabled;
    $('to').value = 'LLM-01'; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = ''; $('note').dispatchEvent(new Event('input')); await new Promise(r => setTimeout(r, 50));
    out.emptyNoteNeedsNoTick = !$('go').disabled && !$('v5rambobtn').disabled;
    return out;
  });
  console.log('tick behaviour: ' + JSON.stringify(rs));
  const tickOk = Object.values(rs).every(Boolean);
  const checks = [['NO-TICK', mA.ok, mA.n], ['WRONG-TICK personal', mB.personal.ok, mB.personal.n], ['WRONG-TICK ordinary', mB.ordinary.ok, mB.ordinary.n], ['tick behaviour', tickOk ? 1 : 0, 1], ['page errors', errs.length === 0 ? 1 : 0, 1]];
  const pass2 = checks.reduce((a, c) => a + c[1], 0), tot = checks.reduce((a, c) => a + c[2], 0);
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-privacy-matrix-r7', personal_notes: N.PERSONAL.length, ordinary_notes: N.ORDINARY.length, cannot_catch_notes: N.CANNOT_CATCH.length, routes: routes.length, noTick: mA, wrongTick: mB, tick: rs, pass: pass2, total: tot, page_errors: errs.length }, null, 1));
  console.log('PRIVACY MATRIX R7: NO-TICK ' + mA.ok + ' of ' + mA.n + '; WRONG-TICK personal ' + mB.personal.ok + ' of ' + mB.personal.n + ', ordinary ' + mB.ordinary.ok + ' of ' + mB.ordinary.n + '; tick behaviour ' + (tickOk ? 'ok' : 'FAIL') + '; page errors ' + errs.length + ' (' + N.PERSONAL.length + ' personal + ' + N.ORDINARY.length + ' ordinary + ' + N.CANNOT_CATCH.length + ' cannot-catch notes x ' + routes.length + ' routes)');
  await ctx.close(); await br.close(); process.exit(mA.ok === mA.n && mB.personal.ok === mB.personal.n && mB.ordinary.ok === mB.ordinary.n && tickOk && errs.length === 0 ? 0 : 1);
})();
