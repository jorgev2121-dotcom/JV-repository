// numbers-r9.js - fix round 9. ONE place that reads every result file and produces the table of "N of N" numbers. FIX-ROUND-9.md carries this table between two marker lines, written by `node numbers-r9.js --write`;
// check-docs-agree-r9.js recomputes it and fails if the document differs or any test is not N of N. No number in FIX-ROUND-9.md or TEST-REPORT.md is typed by hand. TRK-2026-9910-B
const fs = require('fs'), path = require('path'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8'); const js = f => JSON.parse(rd(f));
const txt = (f, re) => { const m = rd(f).match(re); return m ? [+m[1], +m[2]] : null; };
const T = [
  ['test-v5-click.js', 'click everything', () => { const c = js('test-v5-click-RESULT.json'); return [c.pass, c.total]; }],
  ['test-v5-worlds.js', 'data worlds', () => { const c = js('test-v5-worlds-RESULT.json'); return [c.pass, c.total]; }],
  ['test-v3-survives.js', 'nothing of v3 is lost', () => { const c = js('test-v3-survives-RESULT.json'); return [c.pass, c.total]; }],
  ['test-v3-before.js', 'before and after rows', () => { const c = js('test-v3-before-RESULT.json'); return [c.fixed, c.total]; }],
  ['test-v3-packets.js', 'packet pairs identical to v3 apart from the stamp', () => { const c = js('test-v3-packets-RESULT.json'); return [c.pairs_identical, c.pairs_total]; }],
  ['test-fixes-r4.js', 'round-4 page fixes', () => { const c = js('test-fixes-r4-AFTER-RESULT.json'); return [c.pass, c.total]; }],
  ['test-fixes-r5.js', 'round-5 page fixes', () => { const c = js('test-fixes-r5-AFTER-RESULT.json'); return [c.pass, c.total]; }],
  ['test-fixes-r6.js', 'round-6 page and document fixes', () => { const c = js('test-fixes-r6-RESULT.json'); return [c.pass, c.total]; }],
  ['test-survival-92-r6.js', 'survival items', () => { const c = js('test-survival-92-r6-RESULT.json'); return [c.pass, c.total]; }],
  ['test-invariant-r6.js', 'colour rule in named and random worlds', () => { const c = js('test-invariant-r6-RESULT.json'); return [c.pass, c.total]; }],
  ['test-pii-unit-r6.js', 'digit checker, round 6', () => { const c = js('test-pii-unit-r6-RESULT.json'); return [c.pass, c.total]; }],
  ['test-frozen-r7.js', 'frozen-page scenarios', () => { const c = js('test-frozen-r7-RESULT.json'); return [c.results.filter(r => r.pass).length, c.results.length]; }],
  ['test-watchdog-r7.js', 'watchdog', () => { const c = js('test-watchdog-r7-RESULT.json'); return [c.pass, c.total]; }],
  ['test-pii-unit-r7.js', 'digit checker, round 7', () => { const c = js('test-pii-unit-r7-RESULT.json'); return [c.pass, c.total]; }],
  ['test-words-r7.js', 'words on the page', () => { const c = js('test-words-r7-RESULT.json'); return [c.pass, c.total]; }],
  ['test-pii-unit-r8.js', 'digit checker, round 8', () => { const c = js('test-pii-unit-r8-RESULT.json'); return [c.pass, c.total]; }],
  ['test-state-text-r8.js', 'sentences that say ready, Press or one click match the real button', () => { const c = js('test-state-text-r8-RESULT.json'); return [c.pass, c.total]; }],
  ['test-edge-r8.js', 'round-8 edge items', () => { const c = js('test-edge-r8-RESULT.json'); return [c.pass, c.total]; }],
  ['test-pii-unit-r9.js', 'digit checker, round 9', () => { const c = js('test-pii-unit-r9-RESULT.json'); return [c.pass, c.total]; }],
  ['test-fixes-r9.js', 'one test per CHECK-10 flaw and edge item', () => { const c = js('test-fixes-r9-RESULT.json'); return [c.pass, c.total]; }],
  ['test-quotematch-r9.js', 'double-quoted texts in the documents found word for word', () => { const c = js('test-quotematch-r9-RESULT.json'); return [c.pass, c.total]; }],
  ['test-claims-r9.js', 'independent claims extractor', () => { const c = js('test-claims-r9-RESULT.json'); return [c.pass, c.total]; }],
  ['test-privacy-matrix-r6.js', 'privacy matrix, round 6', () => { const c = js('test-privacy-matrix-r6-RESULT.json'); return [c.pass, c.total]; }],
  ['test-privacy-matrix-r7.js', 'privacy matrix, round 7', () => { const c = js('test-privacy-matrix-r7-RESULT.json'); return [c.pass, c.total]; }],
  ['test-privacy-matrix-r8.js', 'privacy matrix, round 8', () => { const c = js('test-privacy-matrix-r8-RESULT.json'); return [c.pass, c.total]; }],
  ['test-privacy-matrix-r9.js', 'privacy matrix, round 9 (unticked and wrongly ticked, every route)', () => { const c = js('test-privacy-matrix-r9-RESULT.json'); return [c.pass, c.total]; }],
  ['test-fuzz-r7.js', 'type-fuzz and random worlds', () => { const c = js('test-fuzz-r7-RESULT.json'); return [c.results.filter(r => r.pass).length, c.results.length]; }],
  ['test-verify.sh', 'VERIFY checks, 216 older scenarios', () => txt('test-verify-r8-RESULT.txt', /VERIFY TESTS: (\d+) of (\d+) pass/)],
  ['test-verify.sh (scenarios)', 'VERIFY scenarios as expected', () => txt('test-verify-r8-RESULT.txt', /(\d+) of (\d+) scenarios as expected/)],
  ['test-verify-r9.sh', 'VERIFY checks, new scenarios', () => txt('test-verify-r9-RESULT.txt', /VERIFY TESTS R9: (\d+) of (\d+) pass/)],
  ['test-verify-r9.sh (scenarios)', 'VERIFY new scenarios as expected', () => txt('test-verify-r9-RESULT.txt', /(\d+) of (\d+) scenarios as expected/)],
  ['test-no-write-commands.js', 'no write command anywhere', () => txt('test-no-write-commands-RESULT.txt', /NO-WRITE-COMMANDS: (\d+) of (\d+) checks pass/)],
  ['check-xrefs-r9.js', 'cross-references and document shape', () => txt('check-xrefs-r9-RESULT.txt', /CROSS-REFERENCES R9: (\d+) of (\d+) checks pass/)],
  ['run-mutations.sh', 'deliberate breaks caught', () => { const mut = rd('mutation-RESULT.txt').split('\n').filter(l => /^M\d+-/.test(l)); const caught = mut.filter(l => { const mm = l.match(/(\d+) of (\d+)/); return mm && +mm[1] < +mm[2]; }).length; return [caught, mut.length]; }]
];
function collect() { return T.map(([file, what, fn]) => { let r = null; try { r = fn(); } catch (e) { r = null; } return { file, what, pass: r ? r[0] : null, total: r ? r[1] : null }; }); }
function block(rows) {
  const f = n => n === null ? 'MISSING' : n.toLocaleString('en-US'); const sumRows = rows.filter(r => !/\(scenarios\)/.test(r.file) && r.file !== 'run-mutations.sh' && r.pass !== null);
  const P = sumRows.reduce((a, r) => a + r.pass, 0), TT = sumRows.reduce((a, r) => a + r.total, 0);
  const lines = ['<!-- NUMBERS-BEGIN -->', 'Generated by numbers-r9.js from the result files. Every row is N of N.', ''];
  rows.forEach((r, i) => lines.push((i + 1) + '. ' + r.file + ' - ' + r.what + ': ' + f(r.pass) + ' of ' + f(r.total)));
  const get = (f, fn) => { try { return fn(js(f)); } catch (e) { return null; } }; const pair = (f, g) => { const r = get(f, g); return r ? r[0].toLocaleString('en-US') + ' of ' + r[1].toLocaleString('en-US') : 'MISSING'; };
  const cl = get('test-claims-r9-RESULT.json', c => c.counts), clb = get('test-claims-r9-BEFORE-RESULT.json', c => c.counts);
  lines.push('', '**Claims surface (test-claims-r9.js, the independent extractor)**', '- AFTER (this build): sentences read ' + (cl ? cl.read : 'MISSING') + ', checkable ' + (cl ? cl.checkable : 'MISSING') + ', proven by a test ' + (cl ? cl.proven : 'MISSING') + ', exempt with a reason ' + (cl ? cl.exempt : 'MISSING') + ', unchanged text of the real v3 ' + (cl ? cl.v3 : 'MISSING') + ', unmapped ' + (cl ? cl.unmapped : 'MISSING') + ', false ' + (cl ? cl.failed : 'MISSING') + '.',
    '- BEFORE (the same test on the round-8 tree): sentences read ' + (clb ? clb.read : 'MISSING') + ', checkable ' + (clb ? clb.checkable : 'MISSING') + ', proven ' + (clb ? clb.proven : 'MISSING') + ', exempt ' + (clb ? clb.exempt : 'MISSING') + ', unchanged v3 ' + (clb ? clb.v3 : 'MISSING') + ', unmapped ' + (clb ? clb.unmapped : 'MISSING') + ', false ' + (clb ? clb.failed : 'MISSING') + '.',
    '', '**BEFORE and AFTER (the new tests run on the round-8 tree, then on this build)**',
    '- test-claims-r9.js: BEFORE ' + pair('test-claims-r9-BEFORE-RESULT.json', c => [c.pass, c.total]) + '; AFTER ' + pair('test-claims-r9-RESULT.json', c => [c.pass, c.total]) + '.',
    '- test-quotematch-r9.js: BEFORE ' + pair('test-quotematch-r9-BEFORE-RESULT.json', c => [c.pass, c.total]) + '; AFTER ' + pair('test-quotematch-r9-RESULT.json', c => [c.pass, c.total]) + '.',
    '- test-pii-unit-r9.js: BEFORE ' + pair('test-pii-unit-r9-BEFORE-RESULT.json', c => [c.pass, c.total]) + '; AFTER ' + pair('test-pii-unit-r9-RESULT.json', c => [c.pass, c.total]) + '.',
    '- test-privacy-matrix-r9.js: BEFORE ' + pair('test-privacy-matrix-r9-BEFORE-RESULT.json', c => [c.pass, c.total]) + '; AFTER ' + pair('test-privacy-matrix-r9-RESULT.json', c => [c.pass, c.total]) + '.',
    '- test-fixes-r9.js: BEFORE ' + pair('test-fixes-r9-BEFORE-RESULT.json', c => [c.pass, c.total]) + '; AFTER ' + pair('test-fixes-r9-RESULT.json', c => [c.pass, c.total]) + '.');
  const m9 = get('test-privacy-matrix-r9-RESULT.json', c => c);
  if (m9) { lines.push('', '**Privacy matrix r9, in detail:** ' + m9.personal_notes + ' personal-data notes, ' + m9.ordinary_notes + ' ordinary notes, ' + m9.cannot_catch_notes + ' cannot-catch notes, ' + m9.routes + ' routes; unticked: ' + m9.noTick.ok.toLocaleString('en-US') + ' of ' + m9.noTick.n.toLocaleString('en-US') + '; wrongly ticked, personal notes: ' + m9.wrongTick.personal.ok.toLocaleString('en-US') + ' of ' + m9.wrongTick.personal.n.toLocaleString('en-US') + '; wrongly ticked, ordinary notes: ' + m9.wrongTick.ordinary.ok.toLocaleString('en-US') + ' of ' + m9.wrongTick.ordinary.n.toLocaleString('en-US') + '; page errors ' + m9.page_errors + '.'); }
  lines.push('', 'Total checks (the rows above, scenario and break counts left out because they are counted inside the others): ' + f(P) + ' of ' + f(TT), '<!-- NUMBERS-END -->'); return lines.join('\n');
}
module.exports = { collect, block };
if (require.main === module && process.argv.includes('--write')) { const rows = collect(); const blk = block(rows); const f = path.join(H, 'FIX-ROUND-9.md'); let d = rd('FIX-ROUND-9.md'); d = d.replace(/<!-- NUMBERS-BEGIN -->[\s\S]*?<!-- NUMBERS-END -->/, () => blk); fs.writeFileSync(f, d); console.log(blk.split('\n').slice(-3).join('\n')); }
