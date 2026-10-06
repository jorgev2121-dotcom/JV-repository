// stamp-hashes.js - build tool (not shipped). After build-v5.js, writes the real SHA-256 of package/MANIFEST.sha256 and of VERIFY-v5.ps1 into INSTALL-BY-HAND.md
// (the one VERIFY command block and step 6d). Run it once after every build. TRK-2026-9910-B
const fs = require('fs'), crypto = require('crypto'), path = require('path'); const H = __dirname;
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(path.join(H, f))).digest('hex');
const man = sha('package/MANIFEST.sha256'), ver = sha('VERIFY-v5.ps1'); let d = fs.readFileSync(path.join(H, 'INSTALL-BY-HAND.md'), 'utf8');
d = d.replace(/-ExpectManifestSha256 (MANIFEST_SHA_PLACEHOLDER|[0-9a-f]{64})/, '-ExpectManifestSha256 ' + man).replace(/Its SHA-256 must be `(VERIFY_SHA_PLACEHOLDER|[0-9a-f]{64})`/, 'Its SHA-256 must be `' + ver + '`');
fs.writeFileSync(path.join(H, 'INSTALL-BY-HAND.md'), d); console.log('INSTALL-BY-HAND.md stamped: manifest ' + man + ', VERIFY-v5.ps1 ' + ver);
