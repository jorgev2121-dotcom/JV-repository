// pii-notes-r7.js - the notes used by the round-7 personal-data tests (fix round 7, CLASS 2). TRK-2026-9910-B. Test data only: every number here is made up (123-45-6789 style or a published test card).
// PERSONAL: notes with client personal data that the DIGIT GUARD is meant to catch (must be left out of every packet that is not for LOCAL).
// CANNOT_CATCH: personal data written with no digits or no fixed shape. The guard cannot catch these and the page says so; they are stopped only by the tick box. They are reported separately and are NOT counted as guard failures.
// ORDINARY: notes with NO personal data (must be carried on every route). FALSE_ALARMS: ordinary-looking notes the guard blocks on purpose (disclosed).
const cp = (...a) => String.fromCodePoint(...a);
const FW = s => s.replace(/[0-9]/g, c => cp(c.charCodeAt(0) + 0xFEE0)).replace(/-/g, cp(0xFF0D));
const AR = s => s.replace(/[0-9]/g, c => cp(0x0660 + +c)), DEV = s => s.replace(/[0-9]/g, c => cp(0x0966 + +c)), MATH = s => s.replace(/[0-9]/g, c => cp(0x1D7CE + +c));
const P = 'Check this one. ';
const PERSONAL = [
  // the 53 forms that were already blocked (CHECK-8 list, re-created)
  'SSN 123-45-6789', 'Social Security Number: 123 45 6789', '123456789', 'SSN123-45-6789', 'ss# 123456789', 'S.S.N. 123456789', 'SSN 123-45-6789ext', '123.45.6789', '123 - 45 - 6789',
  '123' + cp(0x2013) + '45' + cp(0x2013) + '6789', '123' + cp(0x2011) + '45' + cp(0x2011) + '6789', '123' + cp(0x2014) + '45' + cp(0x2014) + '6789', '123' + cp(0x2212) + '45' + cp(0x2212) + '6789', FW('123-45-6789'), FW('123456789'),
  AR('123-45-6789'), DEV('123 45 6789'), MATH('123456789'), '1' + cp(0xa0) + '23' + cp(0xa0) + '45' + cp(0xa0) + '6789', '123' + cp(0x200b) + '456' + cp(0x200b) + '789', '123' + cp(0x200d) + '45' + cp(0x200d) + '6789',
  'l23-45-6789', 'I23 45 6789', 'ssn 123\t45\t6789', '123/45/6789', '123_45_6789', 'line1\n123\n45\n6789', '123\r\n45\r\n6789', 'one two three four five six seven eight nine', 'One, Two, Three, Four, Five, Six, Seven, Eight, Nine',
  'one two three dash four five dash six seven eight nine', '4111 1111 1111 1111', '4111-1111-1111-1111', '4111111111111111', FW('4111 1111 1111 1111'), '378282246310005', '5555 5555 5555 4444', '6011000990139424',
  'my ssn is 123 45 6789 ok', 'Job 1262 123-45-6789', '(123-45-6789)', 'ssn=123456789;', 'Card 4111 1111 1111 1111, date of birth 04/12/1975, 123 Main St, Miami FL 33143',
  '1 2 3 4 5 6 7 8 9', '123 456 789', 'ssn: 1 2 3 - 4 5 - 6 7 8 9', 'zero one two three four five six seven eight', 'itin 912-70-1234', 'tax id 12-3456789', '4111 1111 1111 1111 exp 12/29', 'social 123 45 6789',
  // the 14 forms that were CARRIED (CHECK-8 flaw 2)
  'SSN 123, 45, 6789', 'his number is 123, 45, 6789', '4111, 1111, 1111, 1111', '123:45:6789', '123    45    6789', '(123) 45-6789', 'ssn starts 123 then 45 then 6789', 'one 2 three 4 five 6 seven 8 nine',
  'one twenty three, forty five, sixty seven eighty nine', 'uno dos tres cuatro cinco seis siete ocho nueve', 'ssn 1́ 2 3 4 5 6 7 8 9'.replace(/ (?=\d)/g, '') , '123' + cp(0x2063) + '45' + cp(0x2063) + '6789', 'MTIzNDU2Nzg5', '313233343536373839',
  // the other personal-data kinds (CHECK-8 flaw 3) that have digits or a fixed shape
  'driver licence V123-456-78-901-0', 'FL licence V123456789012', 'passport A12345678', 'passport C03005988', 'bank account 1234567890', 'acct no 0012345678 routing 021000021', 'IBAN GB82 WEST 1234 5698 7654 32', 'DE89370400440532013000 is the account',
  'born March 3, 1980', 'DOB 1/2/80', 'DOB 1/2/80 ssn last four 6789', 'date of birth: 04/12/1975', 'John was born on 3 March 1980', 'fecha de nacimiento 3/4/1980',
  // more spellings
  'ssn, one two three, four five, six seven eight nine', 'number 123 45 6789 is the ssn', '123-45-6789.', 'ssn:123456789', 'SS# 123 45 6789', 'Soc Sec 123-45-6789', 'seguro social 123-45-6789', 'ssn uno veintitres, cuarenta y cinco, sesenta y siete ochenta y nueve',
  '0x75BCD15', 'SSN 123 45 67 89', 'card number 4111 1111 1111 1111 cvv 123', 'visa: 4111-1111-1111-1111', 'amex 3782 822463 10005', 'account 12345678 at the bank', 'licencia 123456789012', 'pasaporte A12345678'
].map(x => x.indexOf('Check') === 0 ? x : P + x);
const CANNOT_CATCH = [
  'Check this one. Her name is Maria Gonzalez and she lives at 14598 SW 110 ST, Miami FL 33186',
  'Check this one. Email jorge.client@example.com about the loan',
  'Check this one. Mother maiden name Rodriguez, first pet Rex, first school Coral Park',
  'Check this one. The client is Pedro Alvarez, the buyer of unit 143',
  'Check this one. Password is Tr0ub4dor and the user is jv',
  'Check this one. Her first name is Ana and her last name is Lopez and she was born in Havana',
  'Check this one. Phone 305-555-1234 for the owner',
  'Check this one. Home address 14598 SW 110 ST Miami'
];
const ORDINARY = [
  'Check the Bal Harbour permit summary for anything Claude missed.', 'Call 305-555-1234 about the Medley invoice', 'Folio 30-4021-001-0010 needs the zoning letter', 'Folio 01-4120-001-0010 and folio 30-4021-001-0010 are on the list',
  'Permit 2024-12345 was issued on 10/06/2026', 'Permit 2024 12345 final inspection', 'Permit BP2021-12345 expired', 'TRK-2026-1262 needs the cover page', 'OPH-2026-0042 has no job yet', 'TRK-2026-0708-JULIA is the Julia file',
  'Miami 33186-1234', 'Miami FL 33186 305-555-1234', 'Miami, FL 33143-1234 and call 305-555-1234', '14598 SW 110 ST, Miami, FL 33186', 'The invoice is for $8,000.00 due on 2026-10-15', 'Pay $100.25 to Alec for the DD delivery',
  'UPS 1Z999AA10123456784 shipped Monday', 'FedEx 123456789012 is out for delivery', 'Case number CE-2024-000123 is open', 'Case 24-CC-012345 hearing set for 11/04/2026',
  'Room 12, lot 34, block 56', 'Units 143, 144 and 145 are vacant', 'Call me at five five five', 'One two three, easy as that', 'Three bedrooms, two baths, 1,500 sq ft, built in 1998', 'Meeting at 2:00 PM on October 6, 2026',
  'Percent complete: 73%. Score 88 of 100.', 'Ticket 4471 and ticket 4472 are done', 'Call 1-800-555-0100 or (305) 555-0100', '+1 305 555 1234 is the office', 'See pages 12, 34, 56 and 78 of the report', 'Version v12 of TRK-2026-1250 is current',
  'The Orange Tree population is 120 of 300 so far', 'Send the review links for Avis Builders to Alec', 'No client names in this note, just the plan', 'Latitude 25.7617, longitude -80.1918', 'Order total 1,234.56 on 2026-10-06',
  'Remind me about the Einar overdue matter on Friday', 'Plans were rev 3 dated 2024-03-04 and rev 4 dated 2024-05-06'
];
/* ROUND 9 CHANGE (FIX-ROUND-9.md, older tests that changed): the USPS tracking number moved from ORDINARY to FALSE_ALARMS. CHECK-10 flaw 1 makes the guard test every stretch of whole digit groups of 13 to 19 digits with the Luhn check, wherever it sits; some stretch of this 22-digit number passes it, so the note is held back (fail closed) and named only as 'some ordinary notes with long numbers may be held back'. */
const FALSE_ALARMS = ['USPS 9400 1118 9922 3197 4284 90 delivered', 'Order 12345 6789', 'invoice 123456789 sent', 'ref 98765-4321', 'the number 987654321 on the permit card', 'lot 1 2 3 4 5 6 7 8 9'];
module.exports = { PERSONAL, CANNOT_CATCH, ORDINARY, FALSE_ALARMS };
