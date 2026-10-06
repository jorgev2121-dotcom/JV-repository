// check-docs-agree.js - every number in the documents must agree with the result files, and no stale number may remain. TRK-2026-9910-B (rewritten in fix round 7 for the round-7 result files and FIX-ROUND-7.md).
// Usage: node check-docs-agree.js [out.txt]. Reads the result files in this folder, computes each count, then checks FIX-ROUND-7.md, PORT-REPORT.md and TEST-REPORT.md state the same numbers.
// FIX-ROUND-4.md, FIX-ROUND-5.md and FIX-ROUND-6.md are history (older numbers, marked as superseded) and are only checked for that banner.
const fs = require('fs'), path = require('path'), crypto = require('crypto'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8'); const js = f => JSON.parse(rd(f));
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
{ const c = js('test-fixes-r6-RESULT.json'); N.fixes6 = [c.pass, c.total]; }
{ const c = js('test-survival-92-r6-RESULT.json'); N.survival92 = [c.pass, c.total]; }
{ const c = js('test-invariant-r6-RESULT.json'); N.invariant = [c.pass, c.total]; }
{ const c = js('test-privacy-matrix-r6-RESULT.json'); N.matrix6 = [c.pass, c.total]; }
{ const c = js('test-pii-unit-r6-RESULT.json'); N.piiunit6 = [c.pass, c.total]; }
{ const c = js('test-frozen-r7-RESULT.json'); N.frozen = [c.results.filter(r => r.pass).length, c.results.length]; }
{ const c = js('test-fuzz-r7-RESULT.json'); N.fuzz = [c.results.filter(r => r.pass).length, c.results.length]; N.fuzzGroups = c.groups; }
{ const c = js('test-watchdog-r7-RESULT.json'); N.watchdog = [c.pass, c.total]; }
{ const c = js('test-privacy-matrix-r7-RESULT.json'); N.matrix7 = [c.pass, c.total]; N.matrix7Detail = c; }
{ const c = js('test-pii-unit-r7-RESULT.json'); N.piiunit7 = [c.pass, c.total]; }
{ const c = js('test-words-r7-RESULT.json'); N.words = [c.pass, c.total]; }
N.verify = txt('test-verify-RESULT.txt', /VERIFY TESTS: (\d+) of (\d+) pass/);
N.verifyScen = txt('test-verify-RESULT.txt', /(\d+) of (\d+) scenarios as expected/);
N.nowrite = txt('test-no-write-commands-RESULT.txt', /NO-WRITE-COMMANDS: (\d+) of (\d+) checks pass/);
N.xrefs6 = txt('check-xrefs-r6-RESULT.txt', /CROSS-REFERENCES: (\d+) of (\d+) checks pass/);
N.xrefs7 = txt('check-xrefs-r7-RESULT.txt', /CROSS-REFERENCES R7: (\d+) of (\d+) checks pass/);
const mut = rd('mutation-RESULT.txt').split('\n').filter(l => /^M\d+-/.test(l)); const caught = mut.filter(l => { const m = l.match(/(\d+) of (\d+) pass|(\d+) of (\d+) /); return /FAIL|pass/.test(l) && (() => { const mm = l.match(/(\d+) of (\d+)/); return mm && +mm[1] < +mm[2]; })(); }).length; N.mut = [caught, mut.length];
const NOTCOUNTED = ['fuzzGroups', 'matrix7Detail'];
for (const k of Object.keys(N)) { if (NOTCOUNTED.indexOf(k) >= 0) { continue; } say(N[k] && (N[k][0] === N[k][1] || k === 'mut'), k + ' result file says ' + (N[k] ? N[k].join(' of ') : 'MISSING')); }
say(N.mut[0] === N.mut[1] && N.mut[1] === 37, 'deliberate breaks caught: ' + N.mut.join(' of ') + ' (37 expected)');
const checks = ['click', 'worlds', 'survives', 'before16', 'packets', 'fixes4', 'fixes5', 'fixes6', 'survival92', 'invariant', 'matrix6', 'piiunit6', 'frozen', 'fuzz', 'watchdog', 'matrix7', 'piiunit7', 'words', 'verify', 'nowrite', 'xrefs6', 'xrefs7'];
const total = checks.reduce((a, k) => a + N[k][1], 0), passed = checks.reduce((a, k) => a + N[k][0], 0);
say(total === passed, 'total checks ' + passed + ' of ' + total);
const j = k => N[k].join(' of ');
const must = {
  'FIX-ROUND-7.md': ['Total ' + passed + ' of ' + total, j('frozen'), j('fuzz'), j('watchdog'), j('matrix7') , j('piiunit7'), j('words'), j('verify'), j('verifyScen'), j('xrefs7'), N.mut.join(' of ')],
  'PORT-REPORT.md': ['Tests: ' + passed + ' of ' + total + ' pass'],
  'TEST-REPORT.md': [passed + ' checks, ' + passed + ' pass']
};
for (const f of Object.keys(must)) { const t = rd(f); for (const m of must[f]) { say(t.includes(m), f + ' states "' + m + '"'); } }
say(/superseded by FIX-ROUND-7\.md/i.test(rd('FIX-ROUND-6.md').slice(0, 900)), 'FIX-ROUND-6.md opens with a banner saying it is superseded by FIX-ROUND-7.md (its numbers are the round-6 numbers)');
say(/superseded by FIX-ROUND-6\.md/i.test(rd('FIX-ROUND-5.md').slice(0, 900)), 'FIX-ROUND-5.md opens with a banner saying it is superseded by FIX-ROUND-6.md');
say(/superseded by FIX-ROUND-5\.md/i.test(rd('FIX-ROUND-4.md').slice(0, 900)), 'FIX-ROUND-4.md opens with a banner saying it is superseded by FIX-ROUND-5.md');
const docs = ['PORT-REPORT.md', 'TEST-REPORT.md', 'FIX-ROUND-7.md', 'KNOWN-LIMITS.md', 'DESKTOP-WORK.md', 'DATA-CONTRACT.md', 'INSTALL-BY-HAND.md'];
const stale = [[/\b490\b/, '490'], [/\b801 of 801|\b801 checks/, 'old total 801'], [/\b1067\b/, 'old round-5 total 1067'], [/26 of 26 (deliberate|breaks|caught)|twenty-six deliberate/i, 'old mutation count 26'], [/29,859 bytes|31,033 bytes|31,591 bytes/, 'old page size'], [/\bchecks 6828\b|6828 of 6828/, 'old round-6 total 6828']];
for (const f of docs) { const t = rd(f); for (const [re, name] of stale) { say(!re.test(t) || (f !== 'FIX-ROUND-7.md' && /history|superseded/i.test(t.slice(0, 0))), f + ' has no stale "' + name + '"'); } }
const gone = /INSTALL-AND-UNDO|INSTALL-v5\.ps1|ROLLBACK-v5\.ps1|INSTALL-v5\.md|ROLLBACK-v5\.md/; for (const f of docs) { say(!gone.test(rd(f)), f + ' does not point at a deleted installer, copy or delete file'); }
const size = fs.statSync(path.join(H, 'package', 'VTES-LLM-LAUNCHER_v5.html')).size; const sz = size.toLocaleString('en-US') + ' bytes';
say(rd('PORT-REPORT.md').includes(sz) && rd('TEST-REPORT.md').includes(sz) && rd('FIX-ROUND-7.md').includes(sz), 'PORT-REPORT, TEST-REPORT and FIX-ROUND-7 give the real page size ' + sz);
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(path.join(H, f))).digest('hex');
const man = sha('package/MANIFEST.sha256'); say(rd('INSTALL-BY-HAND.md').includes(man) && !/MANIFEST_SHA_PLACEHOLDER/.test(rd('INSTALL-BY-HAND.md')), 'INSTALL-BY-HAND.md carries the real manifest SHA-256 ' + man);
const ver = sha('VERIFY-v5.ps1'); say(rd('INSTALL-BY-HAND.md').includes(ver) && !/VERIFY_SHA_PLACEHOLDER/.test(rd('INSTALL-BY-HAND.md')), 'INSTALL-BY-HAND.md carries the real SHA-256 of VERIFY-v5.ps1 ' + ver);
{ const lines = rd('package/MANIFEST.sha256').trim().split('\n'); let okm = 0; for (const l of lines) { const m = l.match(/^([0-9a-f]{64})  (.+)$/); if (m && sha('package/' + m[2]) === m[1]) { okm++; } } say(okm === lines.length && lines.length === 11, 'the manifest lists ' + lines.length + ' files and every hash is the real SHA-256 of that file (' + okm + ' of ' + lines.length + ')'); }
// FIX-ROUND-7.md: each of the 25 CHECK-8 flaws has a verdict, a file, a test and a tier; the tally line is right; the 13 CHECK-7 and 5 CHECK-6 re-checks are not repeated here (CHECK-8 did them)
const fr = rd('FIX-ROUND-7.md'); const ids = []; for (let i = 1; i <= 25; i++) { ids.push('Flaw ' + i); }
const verdicts = '(FIXED|PARTIAL|NOT FIXED|DOCUMENTED LIMIT)'; const re1 = id => new RegExp('^\\d+\\. \\*\\*' + id + '\\b[^\\n]*?\\b' + verdicts + '\\b', 'm');
for (const id of ids) { const m = fr.match(re1(id)); say(!!m, 'FIX-ROUND-7.md gives ' + id + ' a verdict' + (m ? ': ' + m[1] : '')); }
const tally = { FIXED: 0, PARTIAL: 0, 'NOT FIXED': 0, 'DOCUMENTED LIMIT': 0 }; for (const id of ids) { const m = fr.match(re1(id)); if (m) { tally[m[1]]++; } }
say(fr.includes('FIXED ' + tally.FIXED + ', PARTIAL ' + tally.PARTIAL + ', NOT FIXED ' + tally['NOT FIXED'] + ', DOCUMENTED LIMIT ' + tally['DOCUMENTED LIMIT']), 'FIX-ROUND-7.md tally line says "FIXED ' + tally.FIXED + ', PARTIAL ' + tally.PARTIAL + ', NOT FIXED ' + tally['NOT FIXED'] + ', DOCUMENTED LIMIT ' + tally['DOCUMENTED LIMIT'] + '"');
for (const id of ids) { const m = fr.match(new RegExp('^\\d+\\. \\*\\*' + id + '\\b[^\\n]*(?:\\n(?!\\d+\\. \\*\\*)[^\\n]*)*', 'm')); say(!!m && /Tier [123]/.test(m[0]) && /Test:/.test(m[0]) && /File:/.test(m[0]), 'FIX-ROUND-7.md ' + id + ' names a file, a test and a tier'); }
// every test file named in FIX-ROUND-7.md exists
{ const named = [...new Set([...fr.matchAll(/\b((?:test|check)-[a-z0-9\-]+\.(?:js|sh))\b/g)].map(m => m[1]))]; const missing = named.filter(f => !fs.existsSync(path.join(H, f))); say(missing.length === 0, 'every test file FIX-ROUND-7.md names exists (' + named.length + ' named' + (missing.length ? '; missing: ' + missing.join(', ') : '') + ')'); }
out.push(''); out.push('DOCS AGREE: ' + (out.filter(l => l.startsWith('PASS')).length) + ' of ' + (out.filter(l => /^(PASS|FAIL)/.test(l)).length) + ' checks pass');
fs.writeFileSync(path.join(H, process.argv[2] || 'check-docs-agree-RESULT.txt'), out.join('\n') + '\n'); console.log(out.filter(l => l.startsWith('FAIL')).join('\n') + '\n' + out[out.length - 1]); process.exit(bad ? 1 : 0);
