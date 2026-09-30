// TRK-2026-9910-B · #MUNICIPALITIES #permits #forms-library #folio-prefix · data for VTES-MUNICIPALITIES.html
// SOURCE: Drive "Municipality-Software-Map.xlsx" (id 1U-P8Mq7fXyPJraOfd5mKRY7F389aeazw, 2026-06-17, 19,677 bytes) read 2026-09-30 by cloud.
//         Rows typed from that read; checked by tools/vtes-panel/tests (36 rows, unique codes, family counts equal the sheet's own list).
// HONESTY: "VERIFY" in the sheet is kept as VERIFY. Cloud cannot reach any city site (egress blocked), so NOTHING here was re-checked against the live sites.
// Family = the sheet's own "Software Families" grouping. Biscayne Park and Cutler Bay are NOT in the sheet's family list; filed here as CUSTOM and flagged.
window.VTES_MUNI = {
  source: 'Municipality-Software-Map.xlsx (Drive id 1U-P8Mq7fXyPJraOfd5mKRY7F389aeazw)',
  asOf: '2026-06-17',
  families: {
    TYLER: { name: 'Tyler EnerGov / Civic Access / CSS', order: 1, note: 'BIGGEST: build the field map for this family first.' },
    ETRAKIT: { name: 'eTRAKiT / CSQR Cloud', order: 2, note: 'Second.' },
    CITIZENSERVE: { name: 'Citizenserve', order: 3, note: 'Third.' },
    ACCELA: { name: 'Accela Citizen Access', order: 4, note: 'Accela family.' },
    SMARTGOV: { name: 'SmartGov (CentralSquare)', order: 5, note: '' },
    CUSTOM: { name: 'Custom portals', order: 6, note: 'Each its own.' },
    NOPORTAL: { name: 'No portal (email / in person)', order: 7, note: 'Email or walk-in.' },
    DEFUNCT: { name: 'Dissolved', order: 8, note: 'Not a live jurisdiction.' }
  },
  // [n, name, folioCode, software, family, submittal, portal, seal, phone, address, notes, plansProcessor]
  rows: [
    [1, 'Aventura', '28', 'File-drop / in-person (no login portal)', 'NOPORTAL', 'File-drop / in person', 'share.cityofaventura.com/filedrop (register in person)', 'VERIFY', '305-466-8937', '19200 W Country Club Dr, 4th Fl, Aventura, FL 33180', 'App signed + notarized', 'No registry found. Owner\'s-agent authorization letter.'],
    [2, 'Bal Harbour', '12', 'SmartGov (CentralSquare)', 'SMARTGOV', 'Online', 'vlg-balharbour-fl.smartgovcommunity.com/Public/Home (call 305-865-7525 for login)', 'VERIFY', '305-865-7525', '655 96th St, Bal Harbour, FL 33154', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [3, 'Bay Harbor Islands', '13', 'Citizenserve', 'CITIZENSERVE', 'Online', 'citizenserve.com/bhi', 'Electronic OK (VERIFY)', '305-993-1786', '1030 95 St, Trailer #3, Bay Harbor Islands, FL 33154', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [4, 'Biscayne Park', '17', 'CAP Portal', 'CUSTOM', 'Online', 'biscayneparkfl.gov > Apply for a Permit (CAP)', 'Electronic OK (VERIFY)', '305-899-8000', '600 NE 114th St, Biscayne Park, FL 33161', 'Not in the sheet\'s family list (filed as CUSTOM by cloud).', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [5, 'Coral Gables', '03', 'Tyler EnerGov CSS', 'TYLER', 'Online', 'coralgables.com/department/development-services/services/apply-and-search-permits', 'Electronic OK (VERIFY)', '305-460-5242', '405 Biltmore Way, 3rd Fl, Coral Gables, FL 33134', '', 'No registry. Notarized Affidavit of Owner/Lessee/Authorized Agent (Ch.39), e-submitted.'],
    [6, 'Cutler Bay', '36', 'Online Services portal', 'CUSTOM', 'Online', 'cutlerbay-fl.gov/com-dev (online-services registration)', 'VERIFY', '305-234-4193', '10720 Caribbean Blvd, Ste 105, Cutler Bay, FL 33189', 'Not in the sheet\'s family list (filed as CUSTOM by cloud).', 'No. Owner\'s agent + POA; authorization letter (notarized where required).'],
    [7, 'Doral', '35', 'CSS (Tyler)', 'CUSTOM', 'Online', 'doral.powerappsportals.us (new reg: BuildingRecordsClerk@cityofdoral.com)', 'Electronic OK (VERIFY)', '305-593-6700', '8401 NW 53rd Ter, 2nd Fl, Doral, FL 33166', 'Sheet lists it under Custom although the platform says Tyler CSS: UNVERIFIED which family.', 'No registry found. Owner\'s-agent authorization / standard app.'],
    [8, 'El Portal', '18', 'No portal (email clerk)', 'NOPORTAL', 'Email / in person', 'No online portal; buildingclerk@villageofelportal.org', 'VERIFY', '305-795-7880', '500 NE 87th St, El Portal, FL 33138', 'No e-portal', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [9, 'Florida City', '16', 'eTRAKiT (CSQR)', 'ETRAKIT', 'Online', 'flc.csqrcloud.com/community-etrakit', 'VERIFY', '305-247-8222 x2', '404 W Palm Dr, Florida City, FL 33034', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [10, 'Golden Beach', '19', 'Email / appointment', 'NOPORTAL', 'Email', 'goldenbeach.us/contractor-registration-and-new-permit-appointment (onlinepermits@goldenbeach.us)', 'VERIFY (likely wet)', '305-932-0744', '100 Ocean Blvd, Golden Beach, FL 33160', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [11, 'Hialeah', '04', 'Citizen Self-Service (CSS)', 'CUSTOM', 'Online', 'apps.hialeahfl.gov/building', 'Electronic OK (VERIFY paper)', '305-883-5825', '501 Palm Ave, 2nd Fl, Hialeah, FL 33010', '', 'No registry found. Authorization + notarized Notice of Commencement.'],
    [12, 'Hialeah Gardens', '27', 'No portal (in person)', 'NOPORTAL', 'In person', 'cityofhialeahgardens.com/departments/building', 'VERIFY (likely wet)', '305-558-4114 x221', '10001 NW 87th Ave, Hialeah Gardens, FL 33016', 'Site bot-blocked', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [13, 'Homestead', '10', 'EPL-B.U.I.L.D / DigEplan', 'CUSTOM', 'Online', 'homesteadfl.gov/eplbuild (Register as Contractor)', 'Electronic OK', '305-224-4500', '100 Civic Court, Homestead, FL 33030', '', 'No. Owner\'s agent + POA; authorization letter (notarized where required).'],
    [14, 'Indian Creek', '21', 'Gov-Easy', 'CUSTOM', 'Online', 'apps.gov-easy.com (Indian Creek)', 'Electronic OK', '305-865-4121', '9080 Bay Dr, Indian Creek Village, FL 33154', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [15, 'Islandia', '29', 'DISSOLVED CITY (no government)', 'DEFUNCT', 'N/A', 'N/A', 'N/A', '', '', 'Defunct since 2012. Folio code kept for old Biscayne Bay island parcels; NOT an active permitting jurisdiction.', 'N/A, dissolved.'],
    [16, 'Key Biscayne', '24', 'Accela Citizen Access', 'ACCELA', 'Online', 'aca-prod.accela.com/keybiscayne', 'Electronic OK', '305-365-5511', '88 W McIntyre St, Key Biscayne, FL 33149', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [17, 'Medley', '22', 'No portal (in person)', 'NOPORTAL', 'In person', 'townofmedley.com/building-and-zoning-department', 'VERIFY (likely wet)', '305-887-6913', '7777 NW 72nd Ave, Medley, FL 33166', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [18, 'Miami (City of)', '01', 'iBuild / ePlan', 'CUSTOM', 'Online', 'miami.gov > Register as a Building Contractor / iBuild', 'Electronic OK', '305-416-1100', '444 SW 2nd Ave, 4th Fl, Miami, FL 33130', 'iBuild is login-blocked for cloud/DD runs (affects TRK-2026-1289, 1292, 1531).', 'YES, REQUIRED: one-time iBuild expediter registration (Ord. 14279): form + Business Tax Receipt + ID + linked contractor; no fee, about 2-3 days; issues an expediter number.'],
    [19, 'Miami Beach', '02', 'Civic Access (Accela)', 'TYLER', 'Online', 'miamibeachfl.gov/business/civicaccess (BuildingContractor@miamibeachfl.gov)', 'Electronic OK', '', '1700 Convention Center Dr, 2nd Fl, Miami Beach, FL 33139', 'The sheet lists Miami Beach in BOTH the Tyler group and the Accela group: UNVERIFIED which. County license line 786-315-2561 (VERIFY).', 'No expediter registry. Owner\'s-agent authorization + BTR. "Expedited Program" is pay-for-faster REVIEW, not a license.'],
    [20, 'Miami Gardens', '34', 'CSS (Tyler EnerGov)', 'TYLER', 'Online', 'miamigardensfl-energovpub.tylerhost.net', 'Electronic OK (VERIFY)', '305-622-8027', '18605 NW 27th Ave, Miami Gardens, FL 33056', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [21, 'Miami Lakes', '32', 'eTRAKiT', 'ETRAKIT', 'Online', 'trakit.miamilakes-fl.gov/etrakit', 'Electronic OK (VERIFY)', '305-364-6100', '6601 Main St, Miami Lakes, FL 33014', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [22, 'Miami Shores', '11', 'EnerGov CSS', 'TYLER', 'Online', 'bldg.msvfl.gov/energov_prod/selfservice', 'Electronic OK (VERIFY)', '305-795-2204', '10050 NE 2nd Ave, Miami Shores, FL 33138', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [23, 'Miami Springs', '05', 'eTRAKiT', 'ETRAKIT', 'Online', 'mias-trk.aspgov.com/eTRAKiT', 'Electronic OK (VERIFY)', '305-805-5030', '201 Westward Dr, 2nd Fl, Miami Springs, FL 33166', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [24, 'North Bay Village', '23', 'Email only', 'NOPORTAL', 'Email', 'buildingclerk@nbvillage.com (digital-only since 4/2022)', 'VERIFY', '305-754-6740', '1666 Kennedy Cswy, Ste 101, North Bay Village, FL 33141', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [25, 'North Miami', '06', 'eportal', 'CUSTOM', 'Online', 'eportal.northmiamifl.gov', 'Electronic OK (VERIFY)', '305-895-9820', '12340 NE 8th Ave, North Miami, FL 33161', '', 'No. Owner\'s agent + POA. Standard app; Certificate of Use / authorization.'],
    [26, 'North Miami Beach', '07', 'Tyler EnerGov / EDMS', 'TYLER', 'Online', 'citynmb.com/nmbedms', 'Electronic OK (VERIFY)', '305-948-2965', '17050 NE 19th Ave, 1st Fl, North Miami Beach, FL 33162', '', 'No registry found. Owner\'s-agent authorization / standard app.'],
    [27, 'Opa-locka', '08', 'No portal (paper)', 'NOPORTAL', 'In person', 'No online portal; opalockafl.gov DocumentCenter forms', 'VERIFY (likely wet)', '305-953-2868', '780 Fisherman St, 1st Fl, Opa-locka, FL 33054', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [28, 'Palmetto Bay', '33', 'CivicPlus Citizen Portal', 'CUSTOM', 'Online', 'civicgov4.com/fl_palmettobay_building/portal', 'Electronic OK (VERIFY)', '305-259-1250', '9705 E Hibiscus St, Palmetto Bay, FL 33157', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [29, 'Pinecrest', '20', 'eTRAKiT', 'ETRAKIT', 'Online', 'pine-trk.aspgov.com/eTRAKiT', 'Electronic OK (VERIFY)', '305-234-2121', '12645 Pinecrest Pkwy, Pinecrest, FL 33156', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [30, 'South Miami', '09', 'eTRAKiT (CSQR)', 'ETRAKIT', 'Online', 'smia.csqrcloud.com/community-etrakit', 'VERIFY', '305-663-6355', '6130 Sunset Dr, South Miami, FL 33143', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [31, 'Sunny Isles Beach', '31', 'SmartGov', 'SMARTGOV', 'Online', 'ci-sunnyislesbeach-fl.smartgovcommunity.com (code via 305-792-1735)', 'Electronic OK (VERIFY)', '305-792-1735', '18070 Collins Ave, 3rd Fl, Sunny Isles Beach, FL 33160', '', 'No registry found. Owner\'s-agent authorization.'],
    [32, 'Surfside', '14', 'Customer Self Service (CSS)', 'CUSTOM', 'Online', 'townofsurfsidefl.gov > Building > Customer Self Service', 'VERIFY', '305-861-4863', '9293 Harding Ave, Surfside, FL 33154', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [33, 'Sweetwater', '25', 'eSuite', 'CUSTOM', 'Online', 'cityofsweetwateresuite.miami/eSuite.Permits', 'VERIFY', '305-485-4526', '1701 NW 112 Ave #102, Sweetwater, FL 33172', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [34, 'Unincorporated Miami-Dade', '30', 'Tyler EnerGov (EPS Portal)', 'TYLER', 'Online', 'miamidade.gov/Apps/RER/EPSPortal', 'Electronic OK (no scanned wet seals)', '786-315-2000', '11805 SW 26 St, Miami, FL 33175', 'Herbert S. Saffir Permitting Center. This is the COUNTY layer (the 80%).', 'No. Owner / authorized agent / licensed contractor; authorization letter or notarized consent. BTR still needed.'],
    [35, 'Virginia Gardens', '26', 'In person (paper)', 'NOPORTAL', 'In person', 'No online portal', 'VERIFY (wet / raised)', '305-871-6104', '6498 NW 38th Ter, Virginia Gardens, FL 33166', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).'],
    [36, 'West Miami', '15', 'Citizenserve', 'CITIZENSERVE', 'Online', 'www7.citizenserve.com/Portal/?installationid=159', 'VERIFY', '305-266-4214', '901 SW 62 Ave, West Miami, FL 33144', '', 'Unknown, presumed owner\'s agent. Authorization letter (assumed).']
  ],
  // The sheet's own "Software Families" lists (codes), kept as an independent check on the rows above.
  sheetFamilies: {
    TYLER: ['07', '02', '34', '03', '11', '30'],
    ETRAKIT: ['16', '09', '20', '05', '32'],
    CITIZENSERVE: ['13', '15'],
    ACCELA: ['24', '02'],
    SMARTGOV: ['12', '31'],
    CUSTOM: ['01', '04', '10', '21', '06', '33', '25', '35', '14'],
    NOPORTAL: ['28', '18', '19', '27', '22', '23', '08', '26'],
    DEFUNCT: ['29']
  },
  // Universal field map (19 fields) from the sheet. "Default" values in the sheet hold business identity data; they are NOT copied here.
  // kind: job = typed per job · pa = from Property Appraiser · profile = your saved applicant profile (stays in this browser) · pick = click-down
  fields: [
    [1, 'Job address', 'property.address', 'job', ''],
    [2, 'Folio / parcel', 'property.folio', 'job', 'First 2 digits = municipal code'],
    [3, 'Lot', 'property.lot', 'job', ''],
    [4, 'Block', 'property.block', 'job', ''],
    [5, 'Subdivision', 'property.subdivision', 'job', ''],
    [6, 'Plat Book / Page', 'property.pb_page', 'job', ''],
    [7, 'Current use', 'property.use', 'pick', 'SFR / condo / commercial'],
    [8, 'Owner name', 'owner.name', 'job', ''],
    [9, 'Owner mailing address', 'owner.address', 'pa', 'From Property Appraiser'],
    [10, 'General contractor', 'gc.company', 'profile', ''],
    [11, 'Qualifier', 'gc.qualifier', 'profile', ''],
    [12, 'License / cert no.', 'gc.license', 'profile', ''],
    [13, 'Engineer of record', 'eng.firm', 'profile', ''],
    [14, 'Description of work', 'scope.description', 'job', ''],
    [15, 'Type of work (checkboxes)', 'scope.types', 'pick', 'Alteration / Repair / Electrical / Plumbing / Roof / Windows'],
    [16, 'Value of work', 'scope.value', 'job', ''],
    [17, 'Square feet', 'property.sqft', 'pa', 'From Property Appraiser'],
    [18, 'Applicant / contact', 'agent.contact', 'profile', ''],
    [19, 'Plans processor', 'processor', 'profile', 'In Miami-Dade a plans processor is CITY/COUNTY STAFF (a reviewer), not a role you register for. Florida does not license expediters; only City of Miami has a formal expediter registration.']
  ],
  // County record sites (MIAMI-DADE-SITES.md, SITE-01..22). Statuses as recorded 2026-08-26 from desktop RESULT-9765; cloud could not verify.
  sites: [
    [1, 'Property Appraiser: property search', 'PROOF'], [2, 'Property Appraiser: comparable sales', 'PROOF'], [3, 'Tax Collector', 'PROOF'],
    [4, 'Clerk Official Records (Cloudflare Turnstile captcha)', 'PARTIAL'], [5, 'Clerk civil cases', 'PROOF'], [6, 'Building Permit Selection Menu', 'PROOF'],
    [7, 'EPS e-permitting (folio search login-gated)', 'PROOF'], [8, 'Building Support Case Search', 'PROOF'], [9, 'Code Enforcement Online', 'PROOF'],
    [10, 'Neighborhood Code Cases', 'PROOF'], [11, 'Unsafe Structures', 'PROOF'], [12, 'Certificates of Use (modern search retired)', 'PARTIAL'],
    [13, 'DERM environmental code enforcement', 'PROOF'], [14, 'DERM public records', 'PROOF'], [15, 'Notice of Acceptance / product search', 'PROOF'],
    [16, 'Zoning and land use', 'PROOF'], [17, 'City of Miami permits (iBuild login-blocked)', 'PROOF'], [18, 'Miami Beach permits', 'PROOF'],
    [19, 'Florida Sunbiz', 'PROOF'], [20, 'DBPR licensee search', 'PROOF'], [21, 'Florida Product Approval', 'PROOF'], [22, 'Pembroke Pines / Broward permits (BROWARD, not Miami-Dade)', 'PROOF']
  ],
  sitesNote: 'Jorge said 31 county sites. The repo names 22. Nine are unnamed anywhere. Cloud cannot reach these sites (egress blocked), so none of this was re-checked.'
};
