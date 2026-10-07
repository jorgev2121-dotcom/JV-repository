// test-local-packet-r10.js - fix round 10, flaw F2 class fix (Tier 3, enforcement). Every To x From x task kind x tick state: no packet addressed to LOCAL may contain Claude, RAMBO, Cowork, Chat, Outbox or "paste it back" (case does not matter), except the ONE sentence
// the owner ordered for LOCAL ("RETURN PATH: write your answer in the local-only folder named in the card. Do not send it to any Claude window."), which is cut out of the packet before the scan and must be present exactly once. The note's own words are cut out too (a note is
// what Jorge typed; the test is about the page's own lines). Every packet NOT addressed to LOCAL must still end with the v3 RETURN PATH and FACTS LIVE IN lines. Usage: node test-local-packet-r10.js <out.json>. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { fs, stage } = L; const OUT = process.argv[2] || 'test-local-packet-r10-RESULT.json';
const ORDERED = 'RETURN PATH: write your answer in the local-only folder named in the card. Do not send it to any Claude window.';
const FORBID = /claude|rambo|cowork|chat|outbox|paste it back/i;
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); const d5 = stage(null);
  const ctx = await br.newContext({ viewport: { width: 1300, height: 900 } }); const p = await ctx.newPage(); await ctx.route(u => /^(https?|file:\/\/\/C:)/.test(u.toString()), r => r.abort()); await p.goto('file://' + d5 + '/VTES-LLM-LAUNCHER_v5.html'); await p.waitForTimeout(500);
  const ids = await p.$$eval('#from option', o => o.map(x => x.value)); const toIds = await p.$$eval('#to option', o => o.map(x => x.value));
  const kinds = await p.evaluate(() => PICK.map(k => k[0])); const queued = await p.evaluate(() => QUEUED.map(q => q.p));
  const notes = [''].concat(kinds.map(k => 'Please look at: ' + k + '. Order 2026-0412.'), queued);
  const run = (f, t, note, tick) => p.evaluate(([f, t, note, tick]) => { document.getElementById('from').value = f; document.getElementById('to').value = t; document.getElementById('note').value = note; const c = document.getElementById('v5ack'); if (c) { c.checked = !tick; c.dispatchEvent(new Event('change', { bubbles: true })); c.checked = !!tick; c.dispatchEvent(new Event('change', { bubbles: true })); } window.refresh(); return document.getElementById('preview').value; }, [f, t, note, tick]);
  let refused = 0, localN = 0, localBad = [], localBadN = 0, orderedMissing = 0, otherN = 0, otherBad = [], otherBadN = 0;
  for (const t of toIds) for (const f of ids) for (const n of notes) for (const tick of [false, true]) {
    const pk = await run(f, t, n, tick);
    if (t === 'LOCAL') { localN++; const hasOrdered = pk.split('\n').filter(l => l === ORDERED).length === 1; if (!hasOrdered) { orderedMissing++; } let s = pk.split('\n').filter(l => l !== ORDERED).join('\n'); if (n) { s = s.split(n.trim()).join(''); } const hit = s.match(FORBID); if (hit || !hasOrdered) { localBadN++; if (localBad.length < 20) { localBad.push(f + '->LOCAL tick=' + tick + ' note="' + n.slice(0, 20) + '": ' + (hit ? 'contains "' + hit[0] + '"' : 'ordered sentence missing')); } } }
    else if (!/^HANDOFF/.test(pk)) { refused++; } else if (/^HANDOFF/.test(pk)) { otherN++; const lines = pk.split('\n'); const ok = /^RETURN PATH: write your answer so Jorge can paste it back to /.test(lines[lines.length - 1]) && /^FACTS LIVE IN: JV-repository .*VTES-Outbox \(results\)\.$/.test(lines[lines.length - 2]); if (!ok) { otherBadN++; if (otherBad.length < 20) { otherBad.push(f + '->' + t); } } }
  }
  const badAll = localBadN + otherBadN;
  fs.writeFileSync(OUT, JSON.stringify({ combos_to_local: localN, to_local_clean: localN - localBadN, ordered_sentence_missing: orderedMissing, combos_to_other: otherN, to_other_with_v3_lines: otherN - otherBadN, from_entries: ids.length, to_entries: toIds.length, kinds: kinds.length, notes: notes.length, examples_bad: localBad.concat(otherBad) }, null, 1));
  console.log('LOCAL PACKETS: ' + (localN - localBadN) + ' of ' + localN + ' packets addressed to LOCAL are free of Claude, RAMBO, Cowork, Chat, Outbox and "paste it back" and carry the ordered sentence once; ' + (otherN - otherBadN) + ' of ' + otherN + ' packets (the other combinations show the refusal text of the page, not a packet) to every other To keep the v3 RETURN PATH and FACTS LIVE IN lines (' + refused + ' non-LOCAL combinations showed a refusal, not a packet; ' + ids.length + ' From x ' + toIds.length + ' To x ' + notes.length + ' notes x 2 tick states)');
  if (badAll) { console.log(localBad.concat(otherBad).slice(0, 6).join('\n')); } await br.close(); process.exit(badAll ? 1 : 0);
})();
