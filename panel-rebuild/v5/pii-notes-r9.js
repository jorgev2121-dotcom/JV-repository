// pii-notes-r9.js - the notes used by the round-9 personal-data tests (fix round 9, CHECK-10 flaws 1 to 3). TRK-2026-9910-B. Test data only: every number is made up or a published test card (4111 1111 1111 1111 and the like).
// It holds every round-8 note PLUS the forms checker 6 carried: a card number with its expiry date, Spanish number words and dates, and plain IDs beside their own label.
// PERSONAL: the guard must leave each of these out of every packet that is not for LOCAL. ORDINARY: no personal data, must be carried on every route.
// FALSE_ALARMS: ordinary-looking notes the guard still holds back on purpose (fail closed). The page names them only as "some ordinary notes with long numbers may be held back".
const R8 = require('./pii-notes-r8.js');
const CARDS = [
  '4111 1111 1111 1111 12/29', 'card: 4111 1111 1111 1111 / 12 / 29', '4111.1111.1111.1111.1229', '4111-1111-1111-1111 exp 12-29', 'Visa 4111111111111111 exp 12/2029 cvv 123', '5500 0055 5555 5559 12/29', '5500005555555559 05/31',
  'amex 3782 822463 10005 exp 11/28', '378282246310005 11/28', '6011 1111 1111 1117 01/30', '3530 1113 3330 0000 07/27', '4012 8888 8888 1881 09/28 zip 33186', 'card 4222222222222 03/30', 'pay with 4111 1111 1111 1111 and 12 29',
  'CC 5555 5555 5555 4444 exp 0829', '2026 order 4111 1111 1111 1111 total 52', 'card 4111 1111 1111 1111 123', '4111 1111 1111 1111 1229', 'master 5105 1051 0510 5100 / 08 / 31', '4111/1111/1111/1111 12/29'
];
const SPANISH = [
  'SSN novecientos ochenta y siete sesenta y cinco cuatro tres dos uno', 'seguro social novecientos ochenta y siete sesenta y cinco cuatro tres dos uno', 'ssn doscientos treinta y cuatro cincuenta y seis setenta y ocho noventa',
  'ochocientos uno cuarenta y dos nueve ocho siete seis', 'ssn seiscientos cincuenta y uno cuarenta y cinco ocho siete seis cinco', 'fecha de nacimiento: 3 de marzo de 1980', 'DOB enero 2 1970', 'nacido el 15 de agosto de 1975',
  'nacida el 4 de julio de 1990', 'fecha de nacimiento 12 de diciembre de 1966', 'DOB: 7 de abril 1981', 'nacido el primero de mayo de 1979', 'DOB 9 de septiembre de 1955'
];
const LABELLED = [
  'DL 12345678', "driver's license A1234567", "driver's licence number D123456789", 'passport AB1234567', 'passport number: 123456789', 'bank account 123456789012', 'routing 021000021', 'acct number 4567890123', 'account: 98765432101',
  'birth: 04/12/1975', 'DOB 4/12/75', 'born 04-12-1975', 'date of birth 12-31-1960', 'DL# FL1234567', 'licence S5304607', 'pasaporte C0300598', 'cuenta bancaria 12345678901', 'banco account 345678901234', 'Bank routing 123456789',
  'driver license number 987654321', 'DL: B 4321 5678', 'DL B1234567 exp 2030', 'passport no X1234567 issued 2020', 'born on 03/22/1988'
];
const NEW_ORDINARY = [
  'Bank of America appointment 10/12/2026', 'ZIPs 33186 33187 33189', 'The driver dropped 2 boxes at 14598 SW 110 ST', 'Amazon order 113-1234567-1234567', 'FedEx 123456789012', 'Meeting with the bank at 3 pm about the loan application',
  'Account manager is on vacation until 10/25', 'The driver license office closes at 5 pm', 'Passport photos are due Friday', 'Born in the USA playlist for the party', 'Send permit 2026-12345 to the building department',
  'Invoice 20261006 total 1,250.00', 'Call 305-555-1234 before 5 pm', 'Order 12345678 shipped Tuesday', 'Reference number 1234567 was filed', 'Unit 143 at 14598 SW 110 ST needs a second look', 'Roof area 1,840 sq ft and 22 squares',
  'Permit fee $450.00 due 10/15/2026', 'The balance on the account is positive', 'Bank statement for September attached', 'Check the routing of the permit through the plan reviewer', 'The account number field is missing on the form',
  'Meeting at 10:30 on 10/12/2026 with the driver', 'ZIP codes 33186, 33187 and 33189', 'Miami-Dade folio 30-4021-001-0010', 'Gate code is 4471 for the south entrance', 'Truck 7 arrives 10/12/2026', 'Inspection on 03/22/2027 at the Doral office',
  'Born in March, the permit was filed in April', 'Bank holiday on 10/14/2026', 'Passport and licence copies were not requested', 'Account 5 of 9 is closed', 'Driver 7 loaded 14 boxes and 22 bags'
];
// still held back (fail closed): generic wording on the page, named here for the matrix. Each is an ordinary note whose long number looks like a card.
// CHECK-10 flaw 1 makes the guard test every stretch of 13 to 19 digits with the Luhn check, so a 22-digit tracking number written in groups of four is held back when some stretch passes it by chance (older tests changed: see FIX-ROUND-9.md)
const MOVED = ['USPS 9400 1118 9922 3197 4284 90 delivered'];
const FALSE_ALARMS = R8.FALSE_ALARMS.concat(MOVED, ['FedEx tracking 7712 3456 7890 1234', 'FedEx 1234567890123456', 'Pallet ids 1111 2222 3333 4444']);
module.exports = {
  PERSONAL: R8.PERSONAL.concat(CARDS, SPANISH, LABELLED), NEW_PERSONAL: CARDS.concat(SPANISH, LABELLED), CARDS, SPANISH, LABELLED, MISSES: R8.MISSES, CANNOT_CATCH: R8.CANNOT_CATCH,
  ORDINARY: R8.ORDINARY.filter(t => !MOVED.includes(t)).concat(NEW_ORDINARY), NEW_ORDINARY, FALSE_ALARMS
};
