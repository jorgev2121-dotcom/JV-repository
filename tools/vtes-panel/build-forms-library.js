// build-forms-library.js · TRK-2026-9910-B · #forms-library #generator
// Generates forms-library/ (field map, family files, one overlay file per city) from tools/vtes-panel/municipalities-data.js.
// Run:  node tools/vtes-panel/build-forms-library.js      (overwrites only files inside forms-library/ that it generated)
const fs = require('fs'), path = require('path');
global.window = {}; require('./municipalities-data.js'); const M = window.VTES_MUNI;
const root = path.join(__dirname, '..', '..', 'forms-library');
const slug = s => s.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '');
fs.mkdirSync(path.join(root, 'city-overlays'), { recursive: true }); fs.mkdirSync(path.join(root, 'families'), { recursive: true });
const w = (f, o) => fs.writeFileSync(path.join(root, f), typeof o === 'string' ? o : JSON.stringify(o, null, 2) + '\n');
const fields = M.fields.map(f => ({ n: f[0], name: f[1], key: f[2], source: f[3], note: f[4] }));
w('field-map.json', { trk: 'TRK-2026-9910-B', layer: 'universal', source: M.source, asOf: M.asOf, note: 'Business-identity defaults (contractor, license, engineer) are NOT stored here; they live in the applicant profile on the PC.', fields });
const famFiles = {};
Object.keys(M.families).forEach(f => {
  const cities = M.rows.filter(r => r[4] === f).map(r => ({ code: r[2], name: r[1] }));
  w('families/' + f + '.json', { trk: 'TRK-2026-9910-B', family: f, name: M.families[f].name, buildOrder: M.families[f].order, note: M.families[f].note, cities, fieldMapStatus: f === 'DEFUNCT' || f === 'NOPORTAL' ? 'NOT APPLICABLE (no portal)' : 'NOT BUILT', portalScreensCollected: 0, hashtags: ['#forms-library', '#' + f.toLowerCase(), '#TRK-2026-9910-B'] });
  famFiles[f] = cities.length;
});
let n = 0;
M.rows.forEach(r => {
  const verify = [];
  if (/VERIFY/i.test(r[7])) verify.push('seal policy');
  if (/VERIFY/i.test(r[11]) || /presumed|assumed/i.test(r[11])) verify.push('agent / plans-processor rule (presumed)');
  if (r[4] !== 'DEFUNCT' && r[4] !== 'NOPORTAL') verify.push('portal address still loads');
  if (r[10] && /UNVERIFIED|not in the sheet/i.test(r[10])) verify.push('family assignment');
  const file = 'city-overlays/' + r[2] + '-' + slug(r[1]) + '.json';
  w(file, { trk: 'TRK-2026-9910-B', cityCode: r[2], name: r[1], family: r[4], software: r[3], submittal: r[5], portal: r[6], seal: r[7], phone: r[8], office: r[9], notes: r[10], plansProcessorRule: r[11], live: r[4] !== 'DEFUNCT', verifyBeforeRelying: verify, overlayFields: [], forms: [], layerNote: 'overlayFields lists ONLY what differs from the county layer (code 30). Empty until forms are collected.', source: M.source, asOf: M.asOf, hashtags: ['#forms-library', '#city-' + r[2], '#' + r[4].toLowerCase(), '#municipality', '#TRK-2026-9910-B'] });
  n++;
});
w('README.md', `# forms-library — one layer for the county, one per software family, one small file per city
**TRK-2026-9910-B · generated from tools/vtes-panel/municipalities-data.js · ${M.asOf} data · #forms-library #permits #municipalities**

**Layers.** (1) State and county: the Unincorporated Miami-Dade row (code 30) and the statutory forms: the big shared part. (2) Platform family: one field map per portal software (\`families/\`). (3) City overlay: only what differs (\`city-overlays/\`).

**Status, honestly.** ${n} city files and ${Object.keys(M.families).length} family files exist and hold the facts from Drive's Municipality-Software-Map.xlsx. **Zero actual city forms are collected.** The 80/20 split is Jorge's hypothesis until they are. Cloud cannot reach city sites (egress blocked), so collection is a dispatch job (\`dispatch/\`).

**Rules.** No business identity (license numbers, contractor names) is stored here. No file is marked verified unless a dated proof file sits beside it. Regenerate with \`node tools/vtes-panel/build-forms-library.js\` after the data file changes.

**Files.** \`field-map.json\` (19 universal fields) · \`families/*.json\` · \`city-overlays/NN-City.json\` (NN = folio prefix) · \`INDEX.md\`.

TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · Did the layers match how you think about it?
`);
w('INDEX.md', '# forms-library INDEX · TRK-2026-9910-B\n\n' + M.rows.map(r => '- ' + r[2] + ' · ' + r[1] + ' · ' + M.families[r[4]].name + ' · ' + r[5] + ' · city-overlays/' + r[2] + '-' + slug(r[1]) + '.json').join('\n') + '\n\nTRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #forms-library #index\n');
console.log('city files', n, 'families', JSON.stringify(famFiles));
