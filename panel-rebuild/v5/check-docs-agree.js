// check-docs-agree.js - every number in the documents must agree with the result files, and no stale number may remain. TRK-2026-9910-B (fix round 6).
// Usage: node check-docs-agree.js [out.txt]. Reads the result files in this folder, computes each count, then checks FIX-ROUND-6.md, PORT-REPORT.md and TEST-REPORT.md state the same numbers
// and that no stale number or deleted-file name appears where it should not. FIX-ROUND-4.md and FIX-ROUND-5.md are history (older numbers, marked as superseded) and are only checked for that banner.
const fs = require('fs'), path = require('path'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8'); const js = f => JSON.parse(rd(f));
const out = []; let bad = 0; const say = (ok, m) => { out.push((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) { bad++; } };
const txt = (f, re) => { const m = rd(f).match(re); return m ? [+m[1], +m[2]] : null; };
const N = {};
{ const c = js('test-v5-click-RESULT.json'); N.click = [c.pass, c.total]; }
{ const c = js('test-v5-worlds-RESULT.json'); N.worlds = [c.pass, c.total]; }
{ const c = js('test-v3-survives-RESULT.json'); N.survives = [c.pass, c.total]; }
{ const c = js('test-v3-before-RESULT.json'); N.before16 = [c.fixed, c.total]; }
{ const c = js('test-v3-packets-RESULT.json'); N.packets = [c.pairs_identical, c.pairs_total]; }
{ const c = js('test-fixes-r4-AFTER-RESULT.json'); N.fixes4 = [c.pass, c.total]; }
{ const c = js('test-fixes-r5-AFTER-RESULT.json'); N.fixes5 = [c.pass, c.total]; }
{ const c = js('test-invariant-r6-RESULT.json'); N.invariant = [c.pass, c.total]; N.invWorlds = [c.named_worlds, c.random_worlds]; }
{ const c = js('test-privacy-matrix-r6-RESULT.json'); N.matrix = [c.pass, c.total]; N.matrixShape = [c.notes, c.routes]; }
{ const c = js('test-pii-unit-r6-RESULT.json'); N.piiunit = [c.pass, c.total]; }
{ const c = js('test-privacy-matrix-r6-BEFORE-RESULT.json'); N.matrixBefore = [c.pass, c.total]; }
N.verify = txt('test-verify-RESULT.txt', /VERIFY TESTS: (\d+) of (\d+) pass/);
N.nowrite = txt('test-no-write-commands-RESULT.txt', /NO-WRITE-COMMANDS: (\d+) of (\d+) checks pass/);
N.xrefs = txt('check-xrefs-r6-RESULT.txt', /CROSS-REFERENCES: (\d+) of (\d+) checks pass/);
const mut = rd('mutation-RESULT.txt').split('\n').filter(l => /^M\d+-/.test(l)); const caught = mut.filter(l => { const m = l.match(/(\d+) of (\d+) pass/); return m && +m[1] < +m[2]; }).length; N.mut = [caught, mut.length];
const BEFORE = ['matrixBefore'];
for (const k of Object.keys(N)) { say(N[k] && (N[k][0] === N[k][1] || BEFORE.indexOf(k) >= 0 || k === 'mut' || k === 'invWorlds' || k === 'matrixShape'), k + ' result file says ' + (N[k] ? N[k].join(' of ') : 'MISSING')); }
say(N.mut[0] === N.mut[1] && N.mut[1] === 26, 'deliberate breaks caught: ' + N.mut.join(' of '));
say(N.matrixShape[0] === 14 && N.matrixShape[1] === 369, 'the privacy matrix is 14 notes x 369 routes (' + N.matrixShape.join(' x ') + ')');
const checks = ['click', 'worlds', 'survives', 'before16', 'packets', 'fixes4', 'fixes5', 'invariant', 'matrix', 'piiunit', 'verify', 'nowrite', 'xrefs']; const total = checks.reduce((a, k) => a + N[k][1], 0), passed = checks.reduce((a, k) => a + N[k][0], 0);
say(total === passed, 'total checks ' + passed + ' of ' + total);
const j = k => N[k].join(' of ');
const must = {
  'FIX-ROUND-6.md': ['Total ' + passed + ' of ' + total, j('click'), j('worlds'), j('survives'), j('before16'), j('packets'), j('fixes4'), j('fixes5'), j('invariant'), j('matrix'), j('piiunit'), j('verify'), j('nowrite'), j('xrefs'), N.mut.join(' of '), N.matrixBefore.join(' of ') + ' pass', N.invWorlds[0] + ' named worlds', N.invWorlds[1] + ' random worlds'],
  'PORT-REPORT.md': ['Tests: ' + passed + ' of ' + total + ' pass'],
  'TEST-REPORT.md': [passed + ' checks, ' + passed + ' pass']
};
for (const f of Object.keys(must)) { const t = rd(f); for (const m of must[f]) { say(t.includes(m), f + ' states "' + m + '"'); } }
say(/superseded by FIX-ROUND-6\.md/i.test(rd('FIX-ROUND-5.md').slice(0, 900)), 'FIX-ROUND-5.md opens with a banner saying it is superseded by FIX-ROUND-6.md (its numbers are the round-5 numbers)');
say(/superseded by FIX-ROUND-5\.md/i.test(rd('FIX-ROUND-4.md').slice(0, 900)), 'FIX-ROUND-4.md opens with a banner saying it is superseded by FIX-ROUND-5.md (its numbers are the round-4 numbers)');
const docs = ['PORT-REPORT.md', 'TEST-REPORT.md', 'FIX-ROUND-6.md', 'KNOWN-LIMITS.md', 'DESKTOP-WORK.md', 'DATA-CONTRACT.md', 'INSTALL-BY-HAND.md'];
const stale = [[/\b490\b/, '490'], [/81 of 81|81 PowerShell|81 checks/, '81 PowerShell checks'], [/\b73 PowerShell|73 checks/, '73 PowerShell checks'], [/S1 to S17|S1 to S22/, 'old scenario range'], [/5 of 5 (deliberate|breaks|caught)|mutations 5 of 5/, 'old mutation count'], [/19 scenario groups|22 scenario groups|22 groups/, 'old scenario group count'], [/28,176 bytes/, 'old page size'],
  [/\b801 of 801|\b801 checks/, 'old total 801'], [/145 of 145/, 'old VERIFY count 145 of 145'], [/28 of 28/, 'old copy-and-delete count 28 of 28'], [/10 of 10 (deliberate|breaks|caught)|ten deliberate breaks/i, 'old mutation count 10'], [/29,859 bytes/, 'old page size 29,859'],
  [/\b1067\b/, 'old round-5 total 1067'], [/18 of 18 (deliberate|breaks|caught)/, 'old mutation count 18 of 18'], [/31,033 bytes/, 'old page size 31,033']];
for (const f of docs) { if (f === 'FIX-ROUND-6.md') { continue; } const t = rd(f); for (const [re, name] of stale) { say(!re.test(t), f + ' has no stale "' + name + '"'); } }
{ const t = rd('FIX-ROUND-6.md'); for (const [re, name] of stale.filter(x => !/1067|18 of 18|31,033/.test(x[0].source))) { say(!re.test(t), 'FIX-ROUND-6.md has no stale "' + name + '"'); } }
const gone = /INSTALL-AND-UNDO|INSTALL-v5\.ps1|ROLLBACK-v5\.ps1|INSTALL-v5\.md|ROLLBACK-v5\.md/; for (const f of docs) { say(!gone.test(rd(f)) || f === 'FIX-ROUND-6.md', f + ' does not point at a deleted installer, copy or delete file (INSTALL-AND-UNDO.md, INSTALL-v5, ROLLBACK-v5)'); }
const size = fs.statSync(path.join(H, 'package', 'VTES-LLM-LAUNCHER_v5.html')).size; say(rd('PORT-REPORT.md').includes(size.toLocaleString('en-US') + ' bytes') && rd('TEST-REPORT.md').includes(size.toLocaleString('en-US') + ' bytes') && rd('FIX-ROUND-6.md').includes(size.toLocaleString('en-US') + ' bytes'), 'PORT-REPORT, TEST-REPORT and FIX-ROUND-6 state the real page size ' + size.toLocaleString('en-US') + ' bytes');
const man = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(H, 'package', 'MANIFEST.sha256'))).digest('hex'); say(rd('INSTALL-BY-HAND.md').includes(man) && !/MANIFEST_SHA_PLACEHOLDER/.test(rd('INSTALL-BY-HAND.md')), 'INSTALL-BY-HAND.md carries the real manifest SHA-256 ' + man);
const ver = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(H, 'VERIFY-v5.ps1'))).digest('hex'); say(rd('INSTALL-BY-HAND.md').includes(ver) && !/VERIFY_SHA_PLACEHOLDER/.test(rd('INSTALL-BY-HAND.md')), 'INSTALL-BY-HAND.md carries the real SHA-256 of VERIFY-v5.ps1 ' + ver);
// the manifest lists every package file with its real hash (the package is whole and the manifest is current)
{ const lines = rd('package/MANIFEST.sha256').trim().split('\n'); let okm = 0; for (const l of lines) { const m = l.match(/^([0-9a-f]{64})  (.+)$/); if (m && require('crypto').createHash('sha256').update(fs.readFileSync(path.join(H, 'package', m[2]))).digest('hex') === m[1]) { okm++; } } say(okm === lines.length && lines.length === 11, 'MANIFEST.sha256 lists 11 files and every hash matches the file on disk (' + okm + ' of ' + lines.length + ')'); }
// the flaw list in FIX-ROUND-6.md: each of the 13 flaws and the five CHECK-6 partials is named once with a verdict
const fr = rd('FIX-ROUND-6.md'); const ids = []; for (let i = 1; i <= 13; i++) { ids.push('Flaw ' + i); } ['N1', 'N2', 'N3', 'N10', 'F14'].forEach(x => ids.push(x));
const re1 = id => new RegExp('^\\d+\\. \\*\\*' + id + '\\b[^\\n]*?\\b(FIXED|PARTIAL|NOT FIXED)\\b', 'm');
for (const id of ids) { const m = fr.match(re1(id)); say(!!m, 'FIX-ROUND-6.md gives ' + id + ' a verdict' + (m ? ': ' + m[1] : '')); }
const tally = { FIXED: 0, PARTIAL: 0, 'NOT FIXED': 0 }; for (const id of ids) { const m = fr.match(re1(id)); if (m) { tally[m[1]]++; } }
say(fr.includes('FIXED ' + tally.FIXED + ', PARTIAL ' + tally.PARTIAL + ', NOT FIXED ' + tally['NOT FIXED']), 'FIX-ROUND-6.md tally line says "FIXED ' + tally.FIXED + ', PARTIAL ' + tally.PARTIAL + ', NOT FIXED ' + tally['NOT FIXED'] + '"');
for (const id of ids) { const m = fr.match(new RegExp('^\\d+\\. \\*\\*' + id + '\\b[^\\n]*(?:\\n(?!\\d+\\. \\*\\*)[^\\n]*)*', 'm')); say(!!m && /Tier [123]/.test(m[0]) && /Test:/.test(m[0]) && /File:/.test(m[0]), 'FIX-ROUND-6.md ' + id + ' names a file, a test and a tier'); }
out.push(''); out.push('DOCS AGREE: ' + (out.filter(l => l.startsWith('PASS')).length) + ' of ' + (out.filter(l => /^(PASS|FAIL)/.test(l)).length) + ' checks pass');
fs.writeFileSync(path.join(H, process.argv[2] || 'check-docs-agree-RESULT.txt'), out.join('\n') + '\n'); console.log(out.filter(l => l.startsWith('FAIL')).join('\n') + '\n' + out[out.length - 1]); process.exit(bad ? 1 : 0);
