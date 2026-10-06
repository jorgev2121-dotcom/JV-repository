// pii-notes-r8.js - the notes used by the round-8 personal-data tests (fix round 8, flaw 1). TRK-2026-9910-B. Test data only: every number here is made up (123-45-6789 style or a published test card).
// It holds every round-7 note PLUS the spellings the fifth independent check carried (CHECK-9, flaw 1) and the ones the round-8 guard extension is written for.
// PERSONAL: the guard must leave each of these out of every packet that is not for LOCAL. MISSES: spellings the guard still cannot catch; each has a CATEGORY, and the Read me must name every category that appears here (test-claims-r8.js).
// ORDINARY: notes with NO personal data (must be carried on every route). FALSE_ALARMS: ordinary-looking notes the guard blocks on purpose (disclosed).
const R7 = require('./pii-notes-r7.js');
const cp = (...a) => String.fromCodePoint(...a);
const NEW_PERSONAL = [
  // markdown and format characters around or inside the digits (flaw 1: "SSN **123**-45-6789")
  'SSN **123**-45-6789', '**SSN:** 123-45-6789', '_ssn_ 123456789', 'ssn ~~123~~-45-6789', '`123-45-6789`', 'ssn `123` `45` `6789`', '*1*2*3*4*5*6*7*8*9*', 'SSN __123__ __45__ __6789__',
  // up to four words between the label and the digit groups ("SSN 123 apples 45 pears 6789")
  'SSN 123 apples 45 pears 6789', 'ssn is 123 and then 45 and also 6789', 'social security number 123 abc 45 def 6789', 'SSN: 123 first 45 second 6789 third', 'ssn 123 x 45 y 6789',
  // Florida licence: a letter and 12 digits, with spaces or hyphens anywhere
  'FL DL S530 4607 5123 0', 'FL driver license S530-4607-5123-0', 'DL: S 530 460 75 123 0', 'licence S 530460751230', 'driver license number s530 4607 5123 0', 'FL license: S530 460 75 123 0', 'dl s530460751230',
  // date of birth spelled out
  'DOB: January second nineteen seventy', 'born on the 2nd of January 1970', 'DOB two January nineteen seventy', 'born the first of March nineteen eighty', 'date of birth: March third, nineteen eighty one', 'DOB 01 02 1970', 'birthday is the 15th of June 1985',
  // hex without 0x, with or without separators
  '31 32 33 34 35 36 37 38 39', '31:32:33:34:35:36:37:38:39', '0x31 0x32 0x33 0x34 0x35 0x36 0x37 0x38 0x39', '\\x31\\x32\\x33\\x34\\x35\\x36\\x37\\x38\\x39', 'ssn hex 3132333435363738393031 ok', '313233343536373839', 'ssn 313233 343536 373839 hex pieces',
  // passport with a lower-case letter, long digit runs
  'passport a12345678', 'pasaporte c03005988', '12345678901234567890', 'acct 123456789012345678901',
  // ZIP+4 after a capitalised word that is not a state or a Florida city
  'Maria Fakename 12345-6789', 'Contact Smith 98765-4321',
  // the same personal data with a ticked-by-mistake box in ordinary sentences
  'Please file this under his SSN 123-45-6789 and ignore the rest', 'The licence is V123-456-78-901-0 for the buyer'
];
// spellings the guard cannot catch, each with a category the Read me must name
const MISSES = [
  { t: 'ssn un deux trois quatre cinq six sept huit neuf', cat: 'other languages' },
  { t: 'ssn eins zwei drei vier fuenf sechs sieben acht neun', cat: 'other languages' },
  { t: 'ssn ' + cp(0x4e00, 0x4e8c, 0x4e09, 0x56db, 0x4e94, 0x516d, 0x4e03, 0x516b, 0x4e5d), cat: 'other scripts' },
  { t: 'ssn 1x2x3x4x5x6x7x8x9', cat: 'letters between the digits' },
  { t: 'ssn 1a2b3c4d5e6f7g8h9', cat: 'letters between the digits' },
  { t: 'SSN 123 is the first part then comes the middle part 45 and then the last part 6789', cat: 'more than four words between the digit groups' },
  { t: 'ssn MTIz NDU2 Nzg5', cat: 'encodings split into pieces' },
  { t: 'ssn Nzg5 NDU2 MTIz in the wrong order of pieces MTIzNDU2 Nzg5', cat: 'encodings split into pieces' }
];
const NEW_ORDINARY = [
  'Git commit a1b2c3d4e5f6 is merged', 'Meet Rosa at 14598 SW 110 ST, Miami FL 33176-1234 on Friday', 'Send the review to the Doral 33178-4400 office', 'Ship 24 units to Tampa FL 33602-1000',
  'Version 3.2.1 of v5 was built on 2026-10-06', 'Task REF-20261006 done, 12 of 12 tests pass', 'Remind me to *bold* the heading and use _italics_ in the report', 'The DOB column is missing in the sheet, fix the header',
  'Weather was 78 degrees, 45 percent humidity, 12 mph wind', 'The licence renewal is step 1 then step 2 then step 3', 'Born again hurricane shutters were installed on the 2nd floor', 'Account for the three permits on the list: 4 and 5 and 6',
  'Ship to Hialeah Gardens 33018-1234 on Monday', 'Send the plans to Opa-locka 33054-1234', 'Office is in Sunny Isles Beach 33160-1234', 'Mail to Cutler Bay 33189-1234 and Pembroke Pines 33025-1234'
];
const FALSE_ALARMS = R7.FALSE_ALARMS.concat(['tracking 94001118992233445566778']);
module.exports = {
  PERSONAL: R7.PERSONAL.concat(NEW_PERSONAL), NEW_PERSONAL, MISSES, CANNOT_CATCH: R7.CANNOT_CATCH.concat(MISSES.map(m => 'Check this one. ' + m.t)),
  ORDINARY: R7.ORDINARY.concat(NEW_ORDINARY), NEW_ORDINARY, FALSE_ALARMS
};
