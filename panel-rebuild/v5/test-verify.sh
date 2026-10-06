#!/bin/bash
# test-verify.sh <path-to-pwsh-dir> <work-dir>   (panel v5 fix round 4, TRK-2026-9910-B)
# Proves VERIFY-v5.ps1 (PowerShell 7.4.6 for Linux): (1) it WRITES NOTHING - the SHA-256 of EVERY file, plus the folder list, permissions and sizes of the whole fixture
# (the package copy, its parent, a fake Desktop holding the REAL v3 launcher, and VERIFY-v5.ps1 itself) is taken before and after every scenario and must be identical;
# (2) it finds edited, missing, extra, unreadable, linked and malformed things and NEVER answers OK for any of them. Unreadable files are made with chmod 000 and VERIFY is run
# as the unprivileged user "nobody" (root can read anything, so a root run would not prove it). PowerShell's own cache under its HOME is outside the fixture and not counted.
PWD_DIR=${1:?pwsh dir}; W=${2:?work dir needed}; HERE=$(cd "$(dirname "$0")" && pwd); PKG=${PKG:-$HERE/package}
REALV3=$(cd "$HERE/../v3-live" && pwd)/VTES-LLM-LAUNCHER_v3.html
VER=$W/VERIFY-v5.ps1
rm -rf "${W:?}"; mkdir -p "$W/fix" "$W/home" "$W/pw"; cp -a "$PWD_DIR"/. "$W/pw"/; cp "$HERE/VERIFY-v5.ps1" "$VER"; chmod -R a+rX "$W/pw" "$W"; chmod a+rwx "$W/home"
PW=$W/pw/pwsh; chmod a+x "$PW"; PASS=0; FAIL=0
export HOME=$W/home USERPROFILE=$W/home DOTNET_CLI_HOME=$W/home
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
has() { echo "$1" | grep -qF -- "$2"; }
hasnot() { ! echo "$1" | grep -qF -- "$2"; }
snap() { (cd "$W/fix" && find . -type f -print0 | sort -z | xargs -0 sha256sum; find . | sort | xargs stat -c 'META %n %F %a %s'; sha256sum "$VER") > "$1" 2>&1; }
same() { local n; n=$(grep -c '^[0-9a-f]\{64\}' "$1"); if cmp -s "$1" "$2"; then echo "  SHA-256 of $n files + folder list + permissions + sizes before == after: IDENTICAL"; return 0; else echo "  DIFFERS:"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
mk() { rm -rf "$W/fix"; mkdir -p "$W/fix/Desktop/old-stuff" "$W/fix/Docs"; cp "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"
  head -c 889 /dev/urandom | base64 -w0 | head -c 889 > "$W/fix/Desktop/VTES-CONTROL-PANEL-HOME.html"; echo "keep me" > "$W/fix/Desktop/old-stuff/notes.txt"
  cp -a "$PKG" "$W/fix/Docs/v5"; chmod -R a+rX "$W/fix"; chmod -R u+w "$W/fix"; N=$W/fix/Docs/v5; }
asnobody() { setpriv --reuid=65534 --regid=65534 --clear-groups "$PW" -NoProfile -File "$VER" "$@"; }
asroot() { "$PW" -NoProfile -File "$VER" "$@"; }
# V <label> <expected exit> <must-contain...>   runs as root unless AS=nobody; checks exit code, text, and that nothing in the fixture changed
V() { local lab=$1 want=$2; shift 2; snap $W/b.snap; local O; if [ "$AS" = nobody ]; then O=$(asnobody -Path "$ARGP" $EXTRA 2>&1; echo "exit=$?"); else O=$(asroot -Path "$ARGP" $EXTRA 2>&1; echo "exit=$?"); fi
  echo "$O" | grep -v '^Folder:\|^MANIFEST.sha256 SHA' | sed 's/^/    | /' | cut -c1-200; snap $W/a.snap
  has "$O" "exit=$want"; chk "$lab: exit code $want" $?; for m in "$@"; do has "$O" "$m"; chk "$lab: prints \"$m\"" $?; done
  if [ "$want" != "0" ]; then hasnot "$O" "OK: all"; chk "$lab: does NOT say OK" $?; fi
  same $W/b.snap $W/a.snap; chk "$lab: VERIFY wrote nothing (whole fixture identical before and after)" $?; }
AS=; EXTRA=
echo "PowerShell: $("$PW" -NoProfile -c '$PSVersionTable.PSVersion.ToString()'); real v3: $(sha256sum "$REALV3" | cut -c1-64)"
echo "== V01 intact package"; mk; ARGP=$N; V V01 0 "OK: all 11 of 11 package files"
echo "== V02 edited code file (one byte appended)"; mk; echo "x" >> $N/vtes5-ui.js; ARGP=$N; V V02 1 "EDITED: vtes5-ui.js" "10 of 11 package files are identical"
echo "== V03 edited file with the same size (one byte flipped)"; mk; python3 - "$N/vtes5-live.js" <<'PY'
import sys; p=sys.argv[1]; b=bytearray(open(p,'rb').read()); b[100]^=1; open(p,'wb').write(b)
PY
ARGP=$N; V V03 1 "EDITED: vtes5-live.js"
echo "== V04 data file rewritten by a writer"; mk; echo 'window.VTES_DATA.heartbeat = {"at":"x"};' > $N/data/vtes5-heartbeat.js; ARGP=$N; V V04 1 "EDITED: data/vtes5-heartbeat.js" "(data file)"
echo "== V05 missing file"; mk; rm $N/vtes5-config.js; ARGP=$N; V V05 1 "MISSING: vtes5-config.js"
echo "== V06 missing data folder"; mk; rm -rf $N/data; ARGP=$N; V V06 1 "MISSING: data/vtes5-bots.js" "MISSING: data/vtes5-tokens.js"
echo "== V07 extra file"; mk; echo hi > $N/notes.txt; ARGP=$N; V V07 1 "EXTRA FILE: notes.txt"
echo "== V08 extra file inside data"; mk; echo hi > $N/data/old.bak; ARGP=$N; V V08 1 "EXTRA FILE: data/old.bak"
echo "== V09 extra empty folder"; mk; mkdir $N/empty-dir; ARGP=$N; V V09 1 "EXTRA FOLDER: empty-dir"
echo "== V10 extra folder with a file in it"; mk; mkdir -p $N/old/deep; echo hi > $N/old/deep/a.txt; ARGP=$N; V V10 1 "EXTRA FOLDER: old" "EXTRA FILE: old/deep/a.txt"
echo "== V11 UNREADABLE file (chmod 000, run as nobody)"; mk; chmod 000 $N/vtes5-ui.js; ARGP=$N; AS=nobody; V V11 1 "UNREADABLE: vtes5-ui.js"; AS=
echo "== V11b the same file IS readable by root (so the test needed nobody)"; [ "$(id -u)" = 0 ]; chk "V11b: this test run is root, which can read the chmod 000 file; only the nobody run proves UNREADABLE" $?
echo "== V12 UNREADABLE data file and several problems at once"; mk; chmod 000 $N/data/vtes5-state.js; echo hi > $N/extra.txt; rm $N/vtes5-health.js 2>/dev/null; rm $N/data/vtes5-health.js; ARGP=$N; AS=nobody; V V12 1 "UNREADABLE: data/vtes5-state.js" "(data file)" "MISSING: data/vtes5-health.js" "EXTRA FILE: extra.txt"; AS=
echo "== V13 UNREADABLE manifest (run as nobody)"; mk; chmod 000 $N/MANIFEST.sha256; ARGP=$N; AS=nobody; V V13 2 "CANNOT CHECK"; AS=
echo "== V14 UNREADABLE folder (data chmod 000, run as nobody): cannot prove nothing extra is in it"; mk; chmod 000 $N/data; ARGP=$N; AS=nobody; V V14 1 "UNREADABLE" ; AS=; chmod 755 $N/data
echo "== V15 missing manifest"; mk; rm $N/MANIFEST.sha256; ARGP=$N; V V15 2 "MANIFEST.sha256 is missing"
echo "== V16 folder does not exist"; mk; ARGP=$W/fix/Docs/nope; V V16 2 "does not exist"
echo "== V17 relative path and short name"; mk; ARGP=Docs/v5; V V17 2 "is not a full path"; ARGP=v5; V V17b 2 "is not a full path"; ARGP=./v5; V V17c 2 "is not a full path"; ARGP=..; V V17d 2 "is not a full path"
echo "== V18 a file replaced by a link"; mk; cp $N/vtes5-ui.js $W/fix/Docs/real-ui.js; rm $N/vtes5-ui.js; ln -s $W/fix/Docs/real-ui.js $N/vtes5-ui.js; ARGP=$N; V V18 1 "LINK: vtes5-ui.js"
echo "== V19 an extra link to somewhere else"; mk; ln -s $W/fix/Desktop $N/to-desktop; ln -s $W/fix/Desktop/old-stuff/notes.txt $N/to-notes.txt; ARGP=$N; V V19 1 "LINK: the folder to-desktop" "LINK: to-notes.txt"
echo "== V20 manifest with a path that leaves the folder"; mk; echo "$(printf 'a%.0s' $(seq 64))  ../Desktop/VTES-LLM-LAUNCHER_v3.html" > $W/m.txt; sed -i 's/a/0/g' $W/m.txt; cat $W/m.txt >> $N/MANIFEST.sha256; ARGP=$N; V V20 1 "BAD MANIFEST LINE" "not a plain relative path"
echo "== V21 manifest with a garbage line"; mk; echo "this is not a hash" >> $N/MANIFEST.sha256; ARGP=$N; V V21 1 "BAD MANIFEST LINE"
echo "== V22 empty manifest"; mk; : > $N/MANIFEST.sha256; ARGP=$N; V V22 1 "BAD MANIFEST: it lists no files" "EXTRA FILE"
echo "== V23 manifest lists a file twice"; mk; head -1 $N/MANIFEST.sha256 >> $N/MANIFEST.sha256; ARGP=$N; V V23 1 "is listed twice"
echo "== V24 manifest edited to match an edited file (the order's expected manifest hash catches it)"; mk; echo x >> $N/vtes5-ui.js; (cd $N && grep -v ' vtes5-ui.js$' MANIFEST.sha256 > ../m2; echo "$(sha256sum vtes5-ui.js | cut -c1-64)  vtes5-ui.js" >> ../m2; mv ../m2 MANIFEST.sha256); GOOD=$(sha256sum "$PKG/MANIFEST.sha256" | cut -c1-64)
ARGP=$N; EXTRA=; V V24a 0 "OK: all 11 of 11"; echo "  (without the expected manifest hash a doctored manifest passes: that is why the order carries the hash)"
EXTRA="-ExpectManifestSha256 $GOOD"; V V24b 1 "MANIFEST CHANGED"; EXTRA=
echo "== V25 the right expected manifest hash passes; a wrong one fails"; mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $(sha256sum "$PKG/MANIFEST.sha256" | cut -c1-64)"; V V25a 0 "OK: all 11 of 11"; EXTRA="-ExpectManifestSha256 $(printf '0%.0s' $(seq 64))"; V V25b 1 "MANIFEST CHANGED"; EXTRA=
echo "== V26 trailing slash, spaces and brackets in the path"; mk; mv $N "$W/fix/Docs/My Drive [v5] copy"; ARGP="$W/fix/Docs/My Drive [v5] copy/"; V V26 0 "OK: all 11 of 11"
echo "== V27 the real v3 launcher sits beside the package and is never read as part of it"; mk; ARGP=$N; V V27 0 "OK: all 11 of 11"; cmp -s "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"; chk "V27b: the real v3 launcher in the fixture Desktop is byte-identical afterwards" $?
echo "== V28 Verify pointed at the Desktop folder (not a package): reports problems, writes nothing"; mk; ARGP=$W/fix/Desktop; V V28 2 "MANIFEST.sha256 is missing"
echo "== V29 a package file that is a folder"; mk; rm $N/vtes5-live.js; mkdir $N/vtes5-live.js; ARGP=$N; V V29 1 "NOT A FILE: vtes5-live.js"
echo "== V30 the source script itself is ASCII only and has no write commands"
LC_ALL=C grep -qP '[^\x00-\x7F]' "$HERE/VERIFY-v5.ps1"; [ $? -ne 0 ]; chk "V30a: VERIFY-v5.ps1 is pure ASCII" $?
! grep -nEi 'Set-Content|Add-Content|Out-File|New-Item|Remove-Item|Copy-Item|Move-Item|Rename-Item|WriteAll|AppendAll|Start-Transcript|Set-ItemProperty|New-ItemProperty|\| *Set-|>>? *\$|FileMode\]::(Create|Append|Truncate|CreateNew|OpenOrCreate)' "$HERE/VERIFY-v5.ps1" | grep -v '^[0-9]*:#'; chk "V30b: no write command appears in VERIFY-v5.ps1 (outside comments)" $?
echo; echo "VERIFY TESTS: $PASS of $((PASS+FAIL)) pass"; [ $FAIL -eq 0 ]
