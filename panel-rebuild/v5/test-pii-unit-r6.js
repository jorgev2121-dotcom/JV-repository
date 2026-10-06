// test-pii-unit-r6.js - fix round 6, flaw 3: the digit guard (VTES5U.piiReasons) on its own, with many more spellings than the 14-note matrix, the keep-carrying list, and the KNOWN false alarms (which must be blocked: that is the fail-closed price, and KNOWN-LIMITS says so).
// Usage: node test-pii-unit-r6.js <out.json>. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS } = L; const OUT = process.argv[2] || 'test-pii-unit-r6-RESULT.json';
const cp = (...a) => String.fromCodePoint(...a); const FW = s => s.replace(/[0-9]/g, c => cp(c.charCodeAt(0) + 0xFEE0));
const AR = s => s.replace(/[0-9]/g, c => cp(0x0660 + +c)), DEV = s => s.replace(/[0-9]/g, c => cp(0x0966 + +c)), MATH = s => s.replace(/[0-9]/g, c => cp(0x1D7CE + +c));
const BLOCK = [
  '123456789', 'SSN 123-45-6789', 'social 123 45 6789', 'Social Security Number: 123 45 6789', '123.45.6789', '123 - 45 - 6789', '123' + cp(0x2013) + '45' + cp(0x2013) + '6789', '123' + cp(0x2011) + '45' + cp(0x2011) + '6789', '123' + cp(0x2014) + '45' + cp(0x2014) + '6789',
  '123' + cp(0x2212) + '45' + cp(0x2212) + '6789', FW('123-45-6789'), FW('123456789'), AR('123-45-6789'), DEV('123 45 6789'), MATH('123456789'), '1' + cp(0x00a0) + '23' + cp(0x00a0) + '45' + cp(0x00a0) + '6789', '123' + cp(0x200b) + '456' + cp(0x200b) + '789',
  'l23-45-6789', 'I23 45 6789', '123-45-678g'.replace('g', '9'), 'ss#123456789', 'ss# 123456789', 'S.S.N. 123456789', 'S.S.N.123456789', 'SSN123-45-6789', 'xSSN123456789y', 'SSN:123-45-6789ext', 'SSN 123-45-6789ext', 'ssn=123456789;', 'my ssn is 123 45 6789 ok',
  '1 2 3 4 5 6 7 8 9', '123 456 789', 'TRK 1262 123456789', 'ssn: 1 2 3 - 4 5 - 6 7 8 9', 'Social: 12345-6789', '(123-45-6789)', 'Social Security 123-45-678 9', 'Job 1262 123-45-6789', 'order 5 12 3456789', 'line1\n123\n45\n6789', '123\r\n45\r\n6789', 'one two three dash four five dash six seven eight nine', 'One Two Three hyphen Four Five hyphen Six Seven Eight Nine', '123/45/6789', '123 / 45 / 6789', '12-3456789', 'EIN 12-3456789', 'tax id 123456789', 'ITIN 912-70-1234', 'SSN 123-45-6789 12', 'SSN 123-45-6789 and more words after it', 'prefix ABC123456789',
  '4111111111111111', '4111-1111-1111-1111', '4111 1111 1111 1111', '4111 1111 1111 1111 exp 12/29', '4111.1111.1111.1111', FW('4111 1111 1111 1111'), '378282246310005', '3782 822463 10005', '5555555555554444', '6011 0009 9013 9424',
  '4222222222222', 'DOB 04/12/1975 acct 123456789012', 'born 1975-04-12, card 4111 1111 1111 1111', 'date of birth 04/12/1975 and number 12345678',
  'one two three four five six seven eight nine', 'One, Two, Three, Four, Five, Six, Seven, Eight, Nine', 'zero one two three four five six seven eight',
  'folio 30-4021-001-0010 ssn 123456789', 'call 305-555-1234 ssn 123-45-6789', 'line1\n123-45-6789\nline3', '   123456789   '
];
const CARRY = [
  'Call 305-555-1234', 'Call (305) 555-1234 today', '+1 305 555 1234', '305.555.1234', '1-800-555-0100', 'folio 30-4021-001-0010', 'folio 01-4120-001-0010', 'Check permit 123 and call 305-555-0100 about folio 01-4120-001-0010',
  '1 800 555 1234', 'FL 33143-1234', 'Miami, FL 33143-1234 and call 305-555-1234', 'call 305 555 1234 then 305 555 0100', 'call me at five five five', 'one two three', 'permit 2024-12345', 'permit 2024 12345', 'permit 2024/12345', 'Permit BP2021-12345', 'Miami FL 33143-1234', '123 Main St, Miami, FL 33143', 'unit 143, 2026-10-06', '14598 SW 110 ST', 'Order 12345', 'amount $1,234,567', 'Invoice 2026-1250', 'TRK-2026-1262',
  'Check the Bal Harbour permit summary for anything Claude missed.', 'on 10/06/2026 at 2:00 PM', 'room 12, lot 34, block 56', 'ref 12345-ABC', '(no note typed)', '3040210010011'
];
const FALSE_ALARMS = ['Order 12345 6789', 'ref 98765-4321', 'invoice 123456789 sent', 'the number 987654321 on the permit card', 'lot 1 2 3 4 5 6 7 8 9'];
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
  const run = list => p.evaluate(l => l.map(t => ({ t, why: VTES5U.piiReasons(t) })), list);
  const res = []; const T = (g, name, ok, why) => { res.push({ g, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : why }); if (!ok) { console.log('FAIL', g, '|', name, '|', why); } };
  const lbl = t => JSON.stringify(t).replace(/[^\x20-\x7e]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).slice(0, 80);
  for (const r of await run(BLOCK)) { T('block', 'blocks ' + lbl(r.t), r.why.length > 0, 'carried'); }
  for (const r of await run(CARRY)) { T('carry', 'carries ' + lbl(r.t), r.why.length === 0, 'blocked: ' + r.why.join('; ')); }
  for (const r of await run(FALSE_ALARMS)) { T('false alarm', 'KNOWN false alarm, blocked on purpose (fail closed): ' + lbl(r.t), r.why.length > 0, 'carried (then KNOWN-LIMITS item 34 is wrong)'); }
  // the block message never echoes the digits
  const msg = await p.evaluate(() => VTES5U.guardNote('SSN 123-45-6789', 'LLM-01')); T('message', 'the "NOT INCLUDED" message does not repeat the number', /NOT INCLUDED/.test(msg) && !/6789|123/.test(msg), msg);
  const loc = await p.evaluate(() => VTES5U.guardNote('SSN 123-45-6789', 'LOCAL')); T('message', 'for LOCAL the note is returned unchanged', loc === 'SSN 123-45-6789', loc);
  T('page', '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); await br.close();
  const pass = res.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ test: 'test-pii-unit-r6', blocks: BLOCK.length, carries: CARRY.length, false_alarms: FALSE_ALARMS.length, pass, total: res.length, results: res }, null, 1));
  console.log('PII UNIT R6: ' + pass + ' of ' + res.length + ' pass (' + BLOCK.length + ' blocked spellings, ' + CARRY.length + ' carried notes, ' + FALSE_ALARMS.length + ' documented false alarms)'); process.exit(pass === res.length ? 0 : 1);
})();
