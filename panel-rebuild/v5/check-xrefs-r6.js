// check-xrefs-r6.js - fix round 6, flaw 13 (a wrong cross-reference: KNOWN-LIMITS said "DESKTOP-WORK item 9" for the Desktop shortcut, which is item 10) and charter Rule 4, Tier 3:
// every cross-reference between INSTALL-BY-HAND.md, DESKTOP-WORK.md, KNOWN-LIMITS.md and DATA-CONTRACT.md, every KNOWN-LIMITS item number, and the same references printed on the page (vtes5-ui.js) is checked by machine:
//   1. the item, file, rule or step it names must EXIST;
//   2. a reference to another document, or to a KNOWN-LIMITS item, must carry a tag in brackets right after the number, e.g. "DESKTOP-WORK item 10 (Desktop shortcut)", and every word of the tag must appear in the title of the item it points to.
// An untagged reference of those kinds fails. So a number that moves, or a wrong number, cannot go unnoticed. Usage: node check-xrefs-r6.js [out.txt]. TRK-2026-9910-B
const fs = require('fs'), path = require('path'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8');
const out = []; let bad = 0; const say = (ok, m) => { out.push((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) { bad++; } };
const strip = s => s.replace(/[`*]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
// ---- the targets
const T = { DW: {}, KL: {}, KLI: {}, DCF: {}, DCR: {}, IBH: {} };
{ const L = rd('DESKTOP-WORK.md').split('\n'); L.forEach(l => { const m = l.match(/^(\d+)\. \*\*(.+?)\*\*/); if (m) { T.DW[m[1]] = strip(m[2]); } }); }
{ let sec = ''; rd('KNOWN-LIMITS.md').split('\n').forEach(l => { const s = l.match(/^Section ([A-Z]) - /); if (s) { sec = s[1]; } const m = l.match(/^(\d+)\. (?:\*\*(.+?)\*\*|(.{1,120}))/); if (m) { (sec === 'I' ? T.KLI : T.KL)[m[1]] = strip(m[2] || m[3]); } }); }
{ let sec = ''; rd('DATA-CONTRACT.md').split('\n').forEach(l => { const h = l.match(/^## (.*)/); if (h) { sec = /seven files/.test(h[1]) ? 'F' : (/Rules for time/.test(h[1]) ? 'R' : ''); } const m = l.match(/^(\d+)\. (.*)/); if (m && sec === 'F') { T.DCF[m[1]] = strip(m[2].slice(0, 160)); } else if (m && sec === 'R') { T.DCR[m[1]] = strip(m[2].slice(0, 200)); } }); }
{ let inA = false; rd('INSTALL-BY-HAND.md').split('\n').forEach(l => { if (/^## Section A/.test(l)) { inA = true; } else if (/^## Section/.test(l)) { inA = false; } if (!inA) { return; } const m = l.match(/^(\d+)\. \*\*(.+?)\*\*/); if (m) { T.IBH[m[1]] = strip(m[2]); } const s = l.match(/^\s+- (\d+[a-z])\. \*\*(.+?)\*\*/); if (s) { T.IBH[s[1]] = strip(s[2]); } }); }
out.push('targets found: DESKTOP-WORK ' + Object.keys(T.DW).length + ' items, KNOWN-LIMITS ' + Object.keys(T.KL).length + ' items + Section I ' + Object.keys(T.KLI).length + ', DATA-CONTRACT ' + Object.keys(T.DCF).length + ' files + ' + Object.keys(T.DCR).length + ' rules, INSTALL-BY-HAND ' + Object.keys(T.IBH).length + ' steps');
// ---- the references
const SCAN = [['INSTALL-BY-HAND.md', 'IBH'], ['DESKTOP-WORK.md', 'DW'], ['KNOWN-LIMITS.md', 'KL'], ['DATA-CONTRACT.md', 'DC'], ['package/vtes5-ui.js', 'UI']];
const TAG = '(?:\\s*\\(([^()]*(?:\\([^()]*\\)[^()]*)*)\\))?';
const PATS = [
  { kind: 'DW', target: T.DW, re: new RegExp('DESKTOP-WORK(?:\\.md)? items? (\\d+)' + TAG, 'g'), need: doc => doc !== 'DW', name: 'DESKTOP-WORK item' },
  { kind: 'KLI', target: T.KLI, re: new RegExp('(?:KNOWN-LIMITS(?:\\.md)?,? )?Section I items? (\\d+)' + TAG, 'g'), need: () => true, name: 'KNOWN-LIMITS Section I item' },
  { kind: 'KL', target: T.KL, re: new RegExp('(?<!DESKTOP-WORK )(?<!Section I )\\bitems? (\\d+)' + TAG, 'g'), reOther: new RegExp('KNOWN-LIMITS(?:\\.md)?,? items? (\\d+)' + TAG, 'g'), need: () => true, name: 'KNOWN-LIMITS item' },
  { kind: 'DCF', target: T.DCF, re: new RegExp('DATA-CONTRACT(?:\\.md)? files? (\\d+)' + TAG, 'g'), need: doc => doc !== 'DC', name: 'DATA-CONTRACT file' },
  { kind: 'DCR', target: T.DCR, re: new RegExp('DATA-CONTRACT(?:\\.md)? rules? (\\d+)' + TAG, 'g'), need: doc => doc !== 'DC', name: 'DATA-CONTRACT rule' },
  { kind: 'IBH', target: T.IBH, re: new RegExp('INSTALL-BY-HAND(?:\\.md)?[, ]+(?:Section A[, ]+)?steps? (\\d+[a-z]?)' + TAG, 'g'), need: doc => doc !== 'IBH', name: 'INSTALL-BY-HAND step' }
];
let nrefs = 0, nok = 0;
for (const [f, doc] of SCAN) {
  const lines = rd(f).split('\n');
  lines.forEach((line, i) => {
    for (const P of PATS) {
      const re = (P.kind === 'KL' && doc !== 'KL' && doc !== 'UI') ? P.reOther : P.re; re.lastIndex = 0; let m;
      while ((m = re.exec(line)) !== null) {
        const num = m[1], tag = m[2], title = P.target[num], where = f + ':' + (i + 1) + ' "' + m[0].trim().slice(0, 70) + '"';
        nrefs++;
        if (title === undefined) { say(false, where + ' points to ' + P.name + ' ' + num + ', which does not exist'); continue; }
        const mustTag = P.need(doc) || P.kind === 'KL';
        if (mustTag && !tag) { say(false, where + ' has no tag: write ' + P.name + ' ' + num + ' (words from its title)'); continue; }
        if (tag) { const words = strip(tag).split(/[\s,;:-]+/).filter(w => w.length > 1); const ok = words.length > 0 && words.every(w => title.indexOf(w) >= 0); if (!ok) { say(false, where + ' tag "' + tag + '" does not match the title of ' + P.name + ' ' + num + ': "' + title.slice(0, 80) + '"'); continue; } }
        nok++; say(true, where + ' -> ' + P.name + ' ' + num + (tag ? ' [' + tag + ']' : '') + ' exists' + (tag ? ' and the tag matches its title' : ''));
      }
    }
  });
}
// the named flaw 13: the Desktop shortcut is DESKTOP-WORK item 10, and KNOWN-LIMITS item 3 must say so
say(/Desktop shortcut/i.test(T.DW['10'] || ''), 'DESKTOP-WORK item 10 is the Desktop shortcut');
say(/DESKTOP-WORK item 10 \(Desktop shortcut\)/.test(rd('KNOWN-LIMITS.md').split('\n').filter(l => /^3\. /.test(l)).join('\n')), 'KNOWN-LIMITS item 3 names DESKTOP-WORK item 10 (Desktop shortcut)');
say(nrefs >= 15, 'at least 15 cross-references were found and checked (found ' + nrefs + ')');
// every numbered list is gapless (a deleted item would renumber and break every pointer)
const gapless = (name, o) => { const k = Object.keys(o).map(Number).sort((a, b) => a - b); say(k.length > 0 && k.every((n, i) => n === i + 1), name + ' numbers run 1 to ' + k.length + ' with no gap'); };
gapless('DESKTOP-WORK items', T.DW); gapless('KNOWN-LIMITS Section I items', T.KLI); gapless('DATA-CONTRACT files', T.DCF); gapless('DATA-CONTRACT rules', T.DCR);
{ const k = Object.keys(T.KL).map(Number).sort((a, b) => a - b); say(k.every((n, i) => n === i + 1), 'KNOWN-LIMITS items A to H run 1 to ' + k.length + ' with no gap (' + k.length + ' items)'); }
out.push(''); out.push('CROSS-REFERENCES: ' + out.filter(l => l.startsWith('PASS')).length + ' of ' + out.filter(l => /^(PASS|FAIL)/.test(l)).length + ' checks pass (' + nok + ' of ' + nrefs + ' references resolve and match their tag)');
fs.writeFileSync(path.join(H, process.argv[2] || 'check-xrefs-r6-RESULT.txt'), out.join('\n') + '\n'); console.log(out.filter(l => l.startsWith('FAIL')).join('\n') + '\n' + out[out.length - 1]); process.exit(bad ? 1 : 0);
