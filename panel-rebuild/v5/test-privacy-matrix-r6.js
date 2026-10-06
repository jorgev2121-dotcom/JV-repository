// test-privacy-matrix-r6.js - fix round 6, flaw 3 (personal data): every note x every route the page offers for building a packet.
// Routes (counted from the page itself, not typed): every big "Copy packet for ..." button, the top RAMBO button, "Copy packet and open" and "Just show the packet" for every From x To pair of the hand-off form,
// every "Hand work here" button (followed by "Copy packet and open"), every queued item, and LOCAL followed by RAMBO.
// A note that holds client personal data must be absent from the packet of EVERY route whose destination is not LOCAL, and present for LOCAL. The control note (a phone number and a folio) must be carried everywhere.
// Usage: node test-privacy-matrix-r6.js <out.json>. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS } = L; const OUT = process.argv[2] || 'test-privacy-matrix-r6-RESULT.json';
const FW = s => s.replace(/[0-9]/g, c => String.fromCharCode(c.charCodeAt(0) + 0xFEE0)).replace(/-/g, String.fromCharCode(0xFF0D));
const NOTES = [
  { id: 'N01', text: 'Check this one. SSN 123-45-6789', secret: '123-45-6789', pii: true },
  { id: 'N02', text: 'Check this one. Social Security Number: 123 45 6789', secret: '123 45 6789', pii: true },
  { id: 'N03', text: 'Check this one. 123456789', secret: '123456789', pii: true },
  { id: 'N04', text: 'Check this one. SSN123-45-6789', secret: '123-45-6789', pii: true },
  { id: 'N05', text: 'Check this one. ss# 123456789', secret: '123456789', pii: true },
  { id: 'N06', text: 'Check this one. S.S.N. 123456789', secret: '123456789', pii: true },
  { id: 'N07', text: 'Check this one. SSN 123-45-6789ext', secret: '123-45-6789', pii: true },
  { id: 'N08', text: 'Check this one. 123.45.6789', secret: '123.45.6789', pii: true },
  { id: 'N09', text: 'Check this one. 123 - 45 - 6789', secret: '123 - 45 - 6789', pii: true },
  { id: 'N10', text: 'Check this one. 123–45–6789 (en dashes)', secret: '123–45–6789', pii: true },
  { id: 'N11', text: 'Check this one. 123‑45‑6789 (non-breaking hyphens)', secret: '123‑45‑6789', pii: true },
  { id: 'N12', text: 'Check this one. ' + FW('123-45-6789') + ' (full-width digits)', secret: FW('123-45-6789'), pii: true },
  { id: 'N13', text: 'Card 4111 1111 1111 1111, date of birth 04/12/1975, 123 Main St, Miami FL 33143', secret: '4111 1111 1111 1111', pii: true },
  { id: 'N14', text: 'Call 305-555-1234 about folio 30-4021-001-0010 on 14598 SW 110 ST, permit 2024-12345', secret: '305-555-1234', pii: false, also: ['30-4021-001-0010', '2024-12345'] }
];
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
  // the routes, discovered from the page
  const info = await p.evaluate(() => ({
    from: [...document.querySelectorAll('#from option')].map(o => o.value), to: [...document.querySelectorAll('#to option')].map(o => o.value),
    big: [...document.querySelectorAll('button.bigcopy')].map(b => ({ paste: b.getAttribute('data-paste'), role: b.getAttribute('data-role'), card: b.closest('.card').id })),
    hand: [...document.querySelectorAll('button[data-to]')].map(b => b.getAttribute('data-to')), queued: [...document.querySelectorAll('[data-q]')].length
  }));
  const routes = [];
  info.big.forEach((b, i) => routes.push({ kind: 'big', i, to: b.paste, label: 'big copy button on ' + b.card }));
  routes.push({ kind: 'top', to: 'LLM-01', label: 'top RAMBO button' });
  info.from.forEach(f => info.to.forEach(t => { routes.push({ kind: 'go', from: f, to: t, label: 'Copy packet and open ' + f + '->' + t }); routes.push({ kind: 'show', from: f, to: t, label: 'Just show ' + f + '->' + t }); }));
  info.hand.forEach((t, i) => routes.push({ kind: 'hand', i, to: t, label: 'Hand work here -> ' + t }));
  for (let q = 0; q < info.queued; q++) routes.push({ kind: 'queued', q, label: 'queued item ' + (q + 1) });
  routes.push({ kind: 'seq', label: 'LOCAL then RAMBO', to: 'LLM-01' });
  console.log('routes: ' + routes.length + ' (big ' + info.big.length + ', top 1, from ' + info.from.length + ' x to ' + info.to.length + ' x 2, hand ' + info.hand.length + ', queued ' + info.queued + ', sequence 1)');
  const results = []; let pass = 0, total = 0;
  for (const note of NOTES) {
    const out = await p.evaluate(async ({ routes, note }) => {
      const sleepM = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
      const bigs = [...document.querySelectorAll('button.bigcopy')], hands = [...document.querySelectorAll('button[data-to]')], qs = [...document.querySelectorAll('[data-q]')];
      window.open = () => null; const res = [];
      const setNote = () => { const n = document.getElementById('note'); n.value = note.text; n.dispatchEvent(new Event('input')); };
      /* ROUND 7 CHANGE (see FIX-ROUND-7.md, older tests that changed): every non-LOCAL route now needs the confirmation tick, and a big button works only when To already equals its destination. This test plays a person who TICKS BY MISTAKE, so it still tests the digit guard (the second layer). The no-tick case is tested by test-privacy-matrix-r7.js. */
      const setTo = t2 => { const s = document.getElementById('to'); s.value = t2; s.dispatchEvent(new Event('change', { bubbles: true })); };
      const tickIt = () => { const c = document.getElementById('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); };
      const preview = () => document.getElementById('preview').value;
      for (const r of routes) {
        setNote(); let to = r.to; document.getElementById('preview').value = '';
        if (r.kind === 'big') { setTo(r.to); tickIt(); bigs[r.i].click(); }
        else if (r.kind === 'top') { setTo('LLM-01'); tickIt(); document.getElementById('v5rambobtn').click(); }
        else if (r.kind === 'go' || r.kind === 'show') { document.getElementById('from').value = r.from; document.getElementById('to').value = r.to; document.getElementById('to').dispatchEvent(new Event('input')); document.getElementById('to').dispatchEvent(new Event('change', { bubbles: true })); tickIt(); document.getElementById(r.kind).click(); }
        else if (r.kind === 'hand') { hands[r.i].click(); setNote(); to = document.getElementById('to').value; tickIt(); document.getElementById('go').click(); }
        else if (r.kind === 'queued') { qs[r.q].click(); to = document.getElementById('to').value; tickIt(); document.getElementById('go').click(); }
        else if (r.kind === 'seq') { bigs.find(b => b.getAttribute('data-paste') === 'LOCAL').click(); await sleepM(); setNote(); setTo('LLM-01'); tickIt(); document.getElementById('v5rambobtn').click(); }
        await sleepM(); res.push({ label: r.label, kind: r.kind, to: to || document.getElementById('to').value, packet: preview() });
      }
      return res;
    }, { routes, note });
    let ok = 0, bad = [];
    for (const r of out) {
      total++;
      const has = r.packet.includes(note.secret), isLocal = r.to === 'LOCAL', sawNotIncl = /NOT INCLUDED/.test(r.packet);
      let good;
      if (r.kind === 'queued') { good = !r.packet.includes(note.secret); }                 /* a queued item replaces the note with its own typed text: the note is not in the packet at all */
      else if (!note.pii) { good = has && (note.also || []).every(a => r.packet.includes(a)); } /* control: carried everywhere */
      else if (isLocal) { good = has; }                                                       /* the one legitimate route */
      else { good = !has && !(note.also || []).some(a => r.packet.includes(a)) && sawNotIncl; }
      if (good) { pass++; ok++; } else if (bad.length < 4) { bad.push(r.label + ' (to ' + r.to + '): ' + (has ? 'CARRIED' : 'absent') + (sawNotIncl ? ' / NOT INCLUDED shown' : '')); }
    }
    results.push({ note: note.id, text: note.text, pii: note.pii, routes: out.length, ok, bad });
    console.log(note.id + ' ' + (note.pii ? 'personal data' : 'control      ') + ' ' + ok + ' of ' + out.length + ' routes right' + (bad.length ? '  e.g. ' + bad[0] : ''));
  }
  await ctx.close(); await br.close();
  const lines = results.map(r => r.note + ' (' + (r.pii ? 'personal data' : 'control') + '): ' + r.ok + ' of ' + r.routes + ' routes behave correctly');
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-privacy-matrix-r6', notes: NOTES.length, routes: routes.length, actions: total, pass, total, page_errors: errs.length, results }, null, 1));
  console.log('PRIVACY MATRIX R6: ' + pass + ' of ' + total + ' route checks pass (' + NOTES.length + ' notes x ' + routes.length + ' routes), page errors ' + errs.length);
  process.exit(pass === total && errs.length === 0 ? 0 : 1);
})();
