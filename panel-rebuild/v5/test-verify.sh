#!/bin/bash
# test-verify.sh <path-to-pwsh-dir> <work-dir>   (panel v5 fix round 4; extended in fix round 7, TRK-2026-9910-B)
# Proves VERIFY-v5.ps1 (PowerShell 7.4.6 for Linux): (1) it WRITES NOTHING - the SHA-256 of EVERY regular file, plus the type, mode, size, mtime and link target of EVERY entry of the whole fixture
# (the package copy, its parent, a fake Desktop holding the REAL v3 launcher, and VERIFY-v5.ps1 itself) is taken before and after every scenario and must be identical;
# (2) it finds edited, missing, extra, unreadable, linked, malformed, pipe, oversized, case-duplicated and badly-shaped-data things and NEVER answers OK for any of them.
# Unreadable files are made with chmod 000 and VERIFY is then run with the read-override rights dropped (AS=nobody; plain root can read anything, so a root run would not prove it).
# PowerShell's own cache lives under HOME=<work>/home, outside the fixture, and is not counted. Telemetry and update checks are switched off by the environment variables below.
# Fix round 7: every scenario runs under `timeout 60` (a hang is exit 124 and fails). The expected answer of every scenario is written on its V line in this file, before any run.
# Expectations are built from the package that is there NOW (file count from MANIFEST.sha256); no hash or count is hard-coded.
# Environment: PKG (package folder), VSRC (the VERIFY script to test, default the one beside this file), AFTERSW (the switch name, default -AfterWriters).
PWD_DIR=${1:?pwsh dir}; W=${2:?work dir needed}; HERE=$(cd "$(dirname "$0")" && pwd); PKG=${PKG:-$HERE/package}
REALV3=$(cd "$HERE/../v3-live" && pwd)/VTES-LLM-LAUNCHER_v3.html
V3SHA=28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3
VER=$W/VERIFY-v5.ps1
rm -rf "${W:?}"; mkdir -p "$W/fix" "$W/home" "$W/pw"; cp -a "$PWD_DIR"/. "$W/pw"/; cp "${VSRC:-$HERE/VERIFY-v5.ps1}" "$VER"; chmod -R a+rX "$W/pw" "$W"; chmod a+rwx "$W/home"
PW=$W/pw/pwsh; chmod a+x "$PW"; PASS=0; FAIL=0; SC=0; SCOK=0; SCID=0; BADLIST=""
export HOME=$W/home USERPROFILE=$W/home DOTNET_CLI_HOME=$W/home POWERSHELL_TELEMETRY_OPTOUT=1 POWERSHELL_UPDATECHECK=Off DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
NF=$(grep -c . "$PKG/MANIFEST.sha256"); NID=$((NF-8)); GOODMAN=$(sha256sum "$PKG/MANIFEST.sha256" | cut -c1-64)
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
has() { echo "$1" | grep -qF -- "$2"; }
hasnot() { ! echo "$1" | grep -qF -- "$2"; }
# the snapshot: SHA-256 of every regular file, then type/mode/size/mtime/link-target of every entry, then VERIFY itself. FIFOs, sockets and devices are never read (find -type f only).
snap() { (cd "$W/fix" && find . -type f -print0 | sort -z | xargs -0 sha256sum; find . -printf 'META %p %y %m %s %T@ -> %l\n' | sort; sha256sum "$VER") > "$1" 2>&1; }
same() { local n; n=$(grep -c '^[0-9a-f]\{64\}' "$1"); if cmp -s "$1" "$2"; then echo "  SHA-256 of $n files + type/mode/size/mtime/link target of every entry before == after: IDENTICAL"; return 0; else echo "  DIFFERS:"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
mk() { rm -rf "$W/fix"; mkdir -p "$W/fix/Desktop/old-stuff" "$W/fix/Docs"; cp "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"
  head -c 889 /dev/urandom | base64 -w0 | head -c 889 > "$W/fix/Desktop/VTES-CONTROL-PANEL-HOME.html"; echo "keep me" > "$W/fix/Desktop/old-stuff/notes.txt"
  cp -a "$PKG" "$W/fix/Docs/v5"; chmod -R a+rX "$W/fix"; chmod -R u+w "$W/fix"; N=$W/fix/Docs/v5; }
# "nobody" is simulated by dropping the read-override rights (CAP_DAC_OVERRIDE and CAP_DAC_READ_SEARCH) from the bounding set: the process is still root but cannot read a chmod 000 file or folder.
# (A setpriv --reuid=nobody run could not start here: the scratch path is under a root-only folder, and an exec after a uid change cannot resolve its own path.)
asnobody() { timeout 60 setpriv --bounding-set -dac_override,-dac_read_search "$PW" -NoProfile -File "$VER" "$@"; }
asroot() { timeout 60 "$PW" -NoProfile -File "$VER" "$@"; }
NOTS=(); MAXSEC=58
# V <label> <expected exit> <must-contain...>  runs as root unless AS=nobody; NOTS=(...) lists text that must NOT appear; checks exit code, text, time, and that nothing in the fixture changed.
# A "scenario" is one V call. It counts as expected only if every assertion of that call passed. It counts as identical only if the whole fixture was the same before and after.
V() { local lab=$1 want=$2; shift 2; local f0=$FAIL; snap $W/b.snap; local O t0 t1 el; t0=$(date +%s)
  if [ "$AS" = nobody ]; then O=$(asnobody -Path "$ARGP" $EXTRA 2>&1; echo "exit=$?"); else O=$(asroot -Path "$ARGP" $EXTRA 2>&1; echo "exit=$?"); fi
  t1=$(date +%s); el=$((t1-t0)); echo "$O" | grep -v '^Folder:\|^MANIFEST.sha256 SHA' | sed 's/^/    | /' | cut -c1-230; snap $W/a.snap
  has "$O" "exit=$want"; chk "$lab: exit code $want" $?; for m in "$@"; do has "$O" "$m"; chk "$lab: prints \"$m\"" $?; done
  for m in "${NOTS[@]}"; do hasnot "$O" "$m"; chk "$lab: does NOT print \"$m\"" $?; done
  if [ "$want" != "0" ]; then hasnot "$O" "OK: all"; chk "$lab: does NOT say OK" $?; hasnot "$O" "OK (after writers)"; chk "$lab: does NOT say OK (after writers)" $?; fi
  hasnot "$O" "Nothing was written anywhere"; chk "$lab: does not claim \"Nothing was written anywhere\" (flaw N18: a script cannot know that)" $?
  [ "$el" -le "$MAXSEC" ]; chk "$lab: finished in $el s (limit $MAXSEC s, never hangs)" $?
  same $W/b.snap $W/a.snap; local idok=$?; chk "$lab: VERIFY wrote nothing (whole fixture identical before and after)" $idok
  SC=$((SC+1)); [ "$FAIL" = "$f0" ] && SCOK=$((SCOK+1)) || BADLIST="$BADLIST $lab"; [ $idok = 0 ] && SCID=$((SCID+1))
  echo "SCENARIO $lab: $([ "$FAIL" = "$f0" ] && echo 'AS EXPECTED' || echo 'NOT AS EXPECTED'); fixture identical before and after: $([ $idok = 0 ] && echo YES || echo NO)"
  NOTS=(); }
GOODJSON='{ "schema": 1, "at": "2026-10-06T14:00:00-04:00", "writer": "test writer" }'
DW='window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.'
okdata() { printf '%s%s = %s;\n' "$DW" "$1" "$GOODJSON" > "$N/data/vtes5-$1.js"; }
okall() { for f in heartbeat bots state health tokens housekeeping miamidade; do okdata $f; done; printf 'window.VTES5_CONFIG = { "status_dir_url": "file:///C:/x/" };\n' > "$N/vtes5-config.js"; }
setdata() { printf '%s' "$2" > "$N/data/vtes5-$1.js"; }   # exact bytes, no added newline
NLC=$'\n'; AS=; EXTRA=; AW=${AFTERSW:--AfterWriters}
echo "PowerShell: $("$PW" -NoProfile -c '$PSVersionTable.PSVersion.ToString()'); real v3: $(sha256sum "$REALV3" | cut -c1-64); package files in the manifest: $NF (of which 8 are data or settings files)"
echo "Telemetry/update-check env: POWERSHELL_TELEMETRY_OPTOUT=$POWERSHELL_TELEMETRY_OPTOUT POWERSHELL_UPDATECHECK=$POWERSHELL_UPDATECHECK DOTNET_CLI_TELEMETRY_OPTOUT=$DOTNET_CLI_TELEMETRY_OPTOUT HOME=$HOME"
echo "== V01 intact package"; mk; ARGP=$N; V V01 0 "OK: all $NF of $NF package files"
echo "== V02 edited code file (one byte appended)"; mk; echo "x" >> $N/vtes5-ui.js; ARGP=$N; V V02 1 "EDITED: vtes5-ui.js" "$((NF-1)) of $NF package files are identical"
echo "== V03 edited file with the same size (one byte flipped)"; mk; python3 - "$N/vtes5-live.js" <<'PY'
import sys; p=sys.argv[1]; b=bytearray(open(p,'rb').read()); b[100]^=1; open(p,'wb').write(b)
PY
ARGP=$N; V V03 1 "EDITED: vtes5-live.js"
echo "== V04 (CHANGED IN ROUND 7) a data file rewritten with the OLD short wrapper, NO switch: day-one check is exact, so it is EDITED, PROBLEMS"; mk; echo 'window.VTES_DATA.heartbeat = {"at":"x"};' > $N/data/vtes5-heartbeat.js; ARGP=$N; NOTS=("expected" "OK:"); V V04 1 "PROBLEMS" "EDITED: data/vtes5-heartbeat.js (data file)"
echo "== V04c a data file rewritten with the OLD short wrapper, WITH $AW: not the one assignment the page expects, PROBLEMS"; mk; echo 'window.VTES_DATA.heartbeat = {"at":"x"};' > $N/data/vtes5-heartbeat.js; ARGP=$N; EXTRA=$AW; V V04c 1 'data\vtes5-heartbeat.js is not the one assignment "window.VTES_DATA.heartbeat = {...};"'; EXTRA=
echo "== V04d a data file properly rewritten by a writer, WITH $AW: allowed, OK, listed as changed by a PC writer"; mk; okdata heartbeat; ARGP=$N; EXTRA=$AW; NOTS=("expected edit" "which is expected" "EDITED"); V V04d 0 "OK (after writers): all $NF of $NF package files are present and readable. $((NF-1)) page and script files are identical (SHA-256). 1 data or settings file(s) were changed by a PC writer and pass the strict shape check" "changed by a PC writer (passes the strict shape check): data/vtes5-heartbeat.js"; EXTRA=
echo "== V04e the same properly rewritten data file WITHOUT the switch: EDITED, PROBLEMS (the manifest hash is exact)"; mk; okdata heartbeat; ARGP=$N; NOTS=("expected edit" "OK:" "changed by a PC writer"); V V04e 1 "PROBLEMS (1); $((NF-1)) of $NF package files are identical" "EDITED: data/vtes5-heartbeat.js (data file) has SHA-256"
echo "== V05 missing file"; mk; rm $N/vtes5-config.js; ARGP=$N; V V05 1 "MISSING: vtes5-config.js"
echo "== V06 missing data folder"; mk; rm -rf $N/data; ARGP=$N; V V06 1 "MISSING: data/vtes5-bots.js" "MISSING: data/vtes5-tokens.js"
echo "== V07 extra file"; mk; echo hi > $N/notes.txt; ARGP=$N; V V07 1 "EXTRA FILE: notes.txt"
echo "== V08 extra file inside data"; mk; echo hi > $N/data/old.bak; ARGP=$N; V V08 1 "EXTRA FILE: data/old.bak"
echo "== V09 extra empty folder"; mk; mkdir $N/empty-dir; ARGP=$N; V V09 1 "EXTRA FOLDER: empty-dir"
echo "== V10 extra folder with a file in it"; mk; mkdir -p $N/old/deep; echo hi > $N/old/deep/a.txt; ARGP=$N; V V10 1 "EXTRA FOLDER: old" "EXTRA FILE: old/deep/a.txt"
echo "== V11 UNREADABLE file (chmod 000, run as nobody)"; mk; chmod 000 $N/vtes5-ui.js; ARGP=$N; AS=nobody; V V11 1 "UNREADABLE: vtes5-ui.js"; AS=
echo "== V11b the same file IS readable by root (so the test needed nobody)"; [ "$(id -u)" = 0 ]; chk "V11b: this test run is root, which can read the chmod 000 file; only the nobody run proves UNREADABLE" $?
echo "== V12 UNREADABLE data file and several problems at once"; mk; chmod 000 $N/data/vtes5-state.js; echo hi > $N/extra.txt; rm $N/data/vtes5-health.js; ARGP=$N; AS=nobody; V V12 1 "UNREADABLE: data/vtes5-state.js" "(data file)" "MISSING: data/vtes5-health.js" "EXTRA FILE: extra.txt"; AS=
echo "== V13 UNREADABLE manifest (run as nobody)"; mk; chmod 000 $N/MANIFEST.sha256; ARGP=$N; AS=nobody; V V13 2 "CANNOT CHECK"; AS=
echo "== V14 (EXTENDED IN ROUND 7) UNREADABLE folder (data chmod 000, run as nobody): present-but-unreachable files are UNREACHABLE, never MISSING (CHECK-8 S76)"; mk; chmod 000 $N/data; ARGP=$N; AS=nobody; NOTS=("MISSING: data/vtes5"); V V14 1 "UNREADABLE" "UNREACHABLE: data/vtes5-bots.js (data file) cannot be reached" "UNREACHABLE: data/vtes5-tokens.js"; AS=; chmod 755 $N/data
echo "== V15 missing manifest"; mk; rm $N/MANIFEST.sha256; ARGP=$N; V V15 2 "MANIFEST.sha256 is missing"
echo "== V16 folder does not exist"; mk; ARGP=$W/fix/Docs/nope; V V16 2 "does not exist"
echo "== V17 relative path and short name"; mk; ARGP=Docs/v5; V V17 2 "is not a full path"; ARGP=v5; V V17b 2 "is not a full path"; ARGP=./v5; V V17c 2 "is not a full path"; ARGP=..; V V17d 2 "is not a full path"
echo "== V18 a file replaced by a link"; mk; cp $N/vtes5-ui.js $W/fix/Docs/real-ui.js; rm $N/vtes5-ui.js; ln -s $W/fix/Docs/real-ui.js $N/vtes5-ui.js; ARGP=$N; V V18 1 "LINK: vtes5-ui.js"
echo "== V19 an extra link to somewhere else"; mk; ln -s $W/fix/Desktop $N/to-desktop; ln -s $W/fix/Desktop/old-stuff/notes.txt $N/to-notes.txt; ARGP=$N; V V19 1 "LINK: the folder to-desktop" "LINK: to-notes.txt"
echo "== V20 manifest with a path that leaves the folder"; mk; echo "$(printf 'a%.0s' $(seq 64))  ../Desktop/VTES-LLM-LAUNCHER_v3.html" > $W/m.txt; sed -i 's/a/0/g' $W/m.txt; cat $W/m.txt >> $N/MANIFEST.sha256; ARGP=$N; V V20 1 "BAD MANIFEST LINE" "not a plain relative path"
echo "== V21 manifest with a garbage line"; mk; echo "this is not a hash" >> $N/MANIFEST.sha256; ARGP=$N; V V21 1 "BAD MANIFEST LINE"
echo "== V22 empty manifest"; mk; : > $N/MANIFEST.sha256; ARGP=$N; V V22 1 "BAD MANIFEST: it lists no files" "EXTRA FILE"
echo "== V23 manifest lists a file twice"; mk; head -1 $N/MANIFEST.sha256 >> $N/MANIFEST.sha256; ARGP=$N; V V23 1 "is listed twice"
echo "== V24 manifest edited to match an edited file (the order's expected manifest hash catches it)"; mk; echo x >> $N/vtes5-ui.js; (cd $N && grep -v ' vtes5-ui.js$' MANIFEST.sha256 > ../m2; echo "$(sha256sum vtes5-ui.js | cut -c1-64)  vtes5-ui.js" >> ../m2; mv ../m2 MANIFEST.sha256); GOOD=$GOODMAN
ARGP=$N; EXTRA=; V V24a 0 "OK: all $NF of $NF"; echo "  (without the expected manifest hash a doctored manifest passes: that is why the order carries the hash)"
EXTRA="-ExpectManifestSha256 $GOOD"; V V24b 1 "MANIFEST CHANGED"; EXTRA=
echo "== V25 the right expected manifest hash passes; a wrong one fails"; mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $GOODMAN"; V V25a 0 "OK: all $NF of $NF"; EXTRA="-ExpectManifestSha256 $(printf '0%.0s' $(seq 64))"; V V25b 1 "MANIFEST CHANGED"; EXTRA=
echo "== V26 trailing slash, spaces and brackets in the path"; mk; mv $N "$W/fix/Docs/My Drive [v5] copy"; ARGP="$W/fix/Docs/My Drive [v5] copy/"; V V26 0 "OK: all $NF of $NF"
echo "== V27 the real v3 launcher sits beside the package and is never read as part of it"; mk; ARGP=$N; V V27 0 "OK: all $NF of $NF"; cmp -s "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"; chk "V27b: the real v3 launcher in the fixture Desktop is byte-identical afterwards" $?
echo "== V28 Verify pointed at the Desktop folder (not a package): reports problems, writes nothing"; mk; ARGP=$W/fix/Desktop; V V28 2 "MANIFEST.sha256 is missing"
echo "== V29 a package file that is a folder"; mk; rm $N/vtes5-live.js; mkdir $N/vtes5-live.js; ARGP=$N; V V29 1 "NOT A FILE: vtes5-live.js"
echo "== V31 a path with .. in it (flaw N19): clear sentence, no scrambled names"; mk; ARGP="$W/fix/Docs/x/../v5"; V V31 2 "CANNOT CHECK" 'contains ".."' "Give the plain full path"; ARGP="$W/fix/Docs/./v5"; V V31b 2 'contains "."'; ARGP="$W/fix/Docs/v5/.."; V V31c 2 'contains ".."'
O=$(asroot -Path "$W/fix/Docs/x/../v5" 2>&1); hasnot "$O" "FEST.sha256"; chk "V31d: no scrambled file name such as FEST.sha256 in the answer" $?; hasnot "$O" "PROBLEMS"; chk "V31e: it does not print a PROBLEMS list for a path it refused" $?
echo "== V32 a doubled separator in the path is read correctly (not scrambled)"; mk; ARGP="$W/fix/Docs//v5"; V V32 0 "OK: all $NF of $NF"
echo "== V33 the folder is inside a Desktop folder (flaw N5, caught after the fact)"; mk; cp -a $N "$W/fix/Desktop/v5copy"; ARGP="$W/fix/Desktop/v5copy"; V V33 1 "WRONG PLACE: the folder is inside a Desktop folder"
echo "== V34 the folder is inside a git checkout (flaw N5, caught after the fact)"; mk; mkdir -p "$W/fix/Docs/repo/.git"; cp -a $N "$W/fix/Docs/repo/v5"; ARGP="$W/fix/Docs/repo/v5"; V V34 1 "WRONG PLACE: the folder is inside a git checkout"
echo "== V35 the OK line and the closing line say only what the script can know"; mk; ARGP=$N; O=$(asroot -Path "$N" 2>&1); has "$O" "This script contains no write command."; chk "V35a: OK answer closes with the sentence about the script's own source" $?; hasnot "$O" "Nothing was written"; chk "V35b: no claim about everything on the machine" $?
echo "== V36 (CHANGED IN ROUND 7) all seven data files and the settings file rewritten in the strict shape, NO switch: PROBLEMS (EDITED x8), exit 1"; mk; okall; ARGP=$N; NOTS=("expected" "OK:"); V V36 1 "PROBLEMS (8); $NID of $NF package files are identical" "EDITED: vtes5-config.js (settings file)" "EDITED: data/vtes5-miamidade.js (data file)"
echo "== V36b the same eight rewritten files WITH $AW: allowed, exit 0, all eight listed as changed by a PC writer"; mk; okall; ARGP=$N; EXTRA=$AW; NOTS=("expected edit" "which is expected" "EDITED" "PROBLEMS"); V V36b 0 "OK (after writers): all $NF of $NF package files are present and readable. $NID page and script files are identical (SHA-256). 8 data or settings file(s) were changed by a PC writer and pass the strict shape check" "changed by a PC writer (passes the strict shape check): vtes5-config.js" "changed by a PC writer (passes the strict shape check): data/vtes5-miamidade.js"; EXTRA=
echo "== V37 (CHANGED IN ROUND 7) a valid rewritten data file AND a code file changed, WITH $AW: code file is PROBLEMS, the data file is only listed as not a problem"; mk; okdata state; echo x >> $N/vtes5-ui.js; ARGP=$N; EXTRA=$AW; V V37 1 "EDITED: vtes5-ui.js" "(not a problem) changed by a PC writer (passes the strict shape check): data/vtes5-state.js"; O=$(asroot -Path "$N" $AW 2>&1); hasnot "$O" "EDITED: data/vtes5-state.js"; chk "V37b: the data file is not listed as a problem" $?; EXTRA=
echo "== V38 every page and script file has CRLF line endings (git for Windows, flaw 12): ONE plain sentence naming the cause, not 8 EDITED lines"; mk; python3 - "$N" <<'PY2'
import sys,os
root=sys.argv[1]
for rel in ['VTES-LLM-LAUNCHER_v5.html','vtes5-live.js','vtes5-ui.js','MANIFEST.sha256']:
    p=os.path.join(root,rel); b=open(p,'rb').read(); open(p,'wb').write(b.replace(b'\r\n',b'\n').replace(b'\n',b'\r\n'))
PY2
ARGP=$N; EXTRA="-ExpectManifestSha256 $GOODMAN"; V V38 1 "LINE ENDINGS CHANGED (CRLF)" "VTES-LLM-LAUNCHER_v5.html, vtes5-live.js, vtes5-ui.js" "git for Windows" "MANIFEST.sha256 differs from the package ONLY because its line endings"; O=$(asroot -Path "$N" $EXTRA 2>&1); hasnot "$O" "EDITED: "; chk "V38b: no EDITED line for a CRLF-only change" $?; hasnot "$O" "MANIFEST CHANGED"; chk "V38c: the manifest is not called 'changed' when only its line endings differ" $?; EXTRA=
echo "== V39 (CHANGED IN ROUND 7) CRLF in one data file plus an extra blank line, NO switch: EDITED, PROBLEMS"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY2'
import sys
p=sys.argv[1]; b=open(p,'rb').read(); open(p,'wb').write(b.replace(b'\n',b'\r\n')+b'\r\n')
PY2
ARGP=$N; V V39 1 "EDITED: data/vtes5-bots.js (data file)"
echo "== V39b the same file WITH $AW: a Windows line ending (CR) is refused by the strict shape check"; ARGP=$N; EXTRA=$AW; V V39b 1 'data\vtes5-bots.js holds a Windows line ending (CR)'; EXTRA=
echo "== V39c a data file that is the shipped one converted ONLY to CRLF, NO switch: named as one LINE ENDINGS CHANGED (CRLF) cause, PROBLEMS"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY2'
import sys
p=sys.argv[1]; b=open(p,'rb').read(); open(p,'wb').write(b.replace(b'\n',b'\r\n'))
PY2
ARGP=$N; V V39c 1 "LINE ENDINGS CHANGED (CRLF): 1 file(s)" "data/vtes5-bots.js"
echo "== V40 the folder ITSELF is a symbolic link to a real package (flaw 5): PROBLEMS, LINK IN PATH"; mk; ln -s $N $W/fix/Docs/v5link; ARGP=$W/fix/Docs/v5link; V V40 1 "LINK IN PATH: the folder itself is a link or junction"
echo "== V41 a PARENT folder is a link (flaw 5): PROBLEMS, LINK IN PATH, names the parent"; mk; mkdir -p $W/fix/Docs/real-parent; cp -a $N $W/fix/Docs/real-parent/v5; ln -s $W/fix/Docs/real-parent $W/fix/Docs/parent-link; ARGP=$W/fix/Docs/parent-link/v5; V V41 1 "LINK IN PATH: the parent folder" "parent-link"
echo "== V42 the folder is a link into the git checkout's package (flaw 5, the checker's S13b)"; mk; mkdir -p "$W/fix/Docs/repo2/.git" "$W/fix/Docs/repo2/panel-rebuild/v5"; cp -a $N "$W/fix/Docs/repo2/panel-rebuild/v5/package"; ln -s "$W/fix/Docs/repo2/panel-rebuild/v5/package" "$W/fix/Docs/v5-git-link"; ARGP="$W/fix/Docs/v5-git-link"; V V42 1 "LINK IN PATH: the folder itself"
echo "== V43 the folder is a link into the Desktop (flaw 5, the checker's S12)"; mk; cp -a $N "$W/fix/Desktop/v5"; ln -s "$W/fix/Desktop/v5" "$W/fix/Docs/v5-desk-link"; ARGP="$W/fix/Docs/v5-desk-link"; V V43 1 "LINK IN PATH: the folder itself"
echo "== V44 a data file replaced by a link is still a problem"; mk; cp $N/data/vtes5-state.js $W/fix/Docs/real-state.js; rm $N/data/vtes5-state.js; ln -s $W/fix/Docs/real-state.js $N/data/vtes5-state.js; ARGP=$N; V V44 1 "LINK: data/vtes5-state.js"
echo "== V45 a data file missing is still a problem, tagged (data file)"; mk; rm $N/data/vtes5-tokens.js; ARGP=$N; V V45 1 "MISSING: data/vtes5-tokens.js (data file)"

# ---------------- fix round 7: new scenarios (R01 ...). Expected answer is on each line. ----------------
echo "== R01 FRESH INSTALL is exact: day one prints the all-identical line and never any 'expected edit' wording"; mk; ARGP=$N; NOTS=("expected edit" "which is expected" "rewritten by a PC writer" "changed by a PC writer" "EDITED" "(after writers)"); V R01 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder." "This script contains no write command."
echo "== R01b fresh install WITH the switch: still the exact day-one line (nothing changed, so nothing is called changed)"; mk; ARGP=$N; EXTRA=$AW; NOTS=("expected edit" "which is expected" "changed by a PC writer" "(after writers)"); V R01b 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder."; EXTRA=
echo "== R01c fresh install with the right expected manifest hash AND the switch"; mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $GOODMAN $AW"; V R01c 0 "OK: all $NF of $NF package files are present, readable and identical"; EXTRA=
echo "== R02 (CHECK-8 S20) all eight data/settings files saved as UTF-16 with a BOM, WITH $AW: PROBLEMS, one plain sentence per file"; mk; okall; python3 - "$N" <<'PY3'
import sys,os,glob
root=sys.argv[1]
for p in glob.glob(root+'/data/vtes5-*.js')+[root+'/vtes5-config.js']:
    t=open(p,'rb').read().decode('utf-8'); open(p,'wb').write(b'\xff\xfe'+t.encode('utf-16-le'))
PY3
ARGP=$N; EXTRA=$AW; NOTS=("changed by a PC writer" "expected"); V R02 1 'data\vtes5-bots.js is saved as UTF-16 (a Windows PowerShell redirect does that); do not use this folder' 'vtes5-config.js is saved as UTF-16' 'data\vtes5-miamidade.js is saved as UTF-16' "PROBLEMS (8)"; EXTRA=
echo "== R02b the same eight UTF-16 files WITHOUT the switch: PROBLEMS (EDITED), each also named as not a valid data file"; ARGP=$N; V R02b 1 "PROBLEMS (8)" "EDITED: data/vtes5-bots.js (data file)" "It is also not a valid data file: data\\vtes5-bots.js is saved as UTF-16"
echo "== R03 UTF-16 without a BOM (NUL after every letter), WITH $AW: PROBLEMS UTF-16"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
p=sys.argv[1]; t=open(p,'rb').read().decode('utf-8'); open(p,'wb').write(t.encode('utf-16-le'))
PY3
ARGP=$N; EXTRA=$AW; V R03 1 'data\vtes5-state.js is saved as UTF-16'; EXTRA=
echo "== R04 (S61) a 0-byte data file, WITH $AW: PROBLEMS empty"; mk; : > $N/data/vtes5-health.js; ARGP=$N; EXTRA=$AW; V R04 1 'data\vtes5-health.js is empty (0 bytes); do not use this folder'; EXTRA=
echo "== R04b a 0-byte data file WITHOUT the switch: PROBLEMS EDITED"; ARGP=$N; V R04b 1 "EDITED: data/vtes5-health.js (data file)"
echo "== R04c a 0-byte settings file, WITH $AW: PROBLEMS empty"; mk; : > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V R04c 1 'vtes5-config.js is empty (0 bytes)'; EXTRA=
echo "== R05 (S63) a 200 MB page (sparse file): refused from its length in a few seconds, never read or hashed"; mk; truncate -s 200M "$N/VTES-LLM-LAUNCHER_v5.html"; ARGP=$N; MAXSEC=12; V R05 1 "TOO BIG: VTES-LLM-LAUNCHER_v5.html is 209715200 bytes, more than the limit of 2097152. It was not read and not hashed."; MAXSEC=58
echo "== R05b a 3 MB page is too big; a 1.5 MB page is only EDITED (the page cap is 2 MB)"; mk; truncate -s 3M "$N/VTES-LLM-LAUNCHER_v5.html"; ARGP=$N; V R05b 1 "TOO BIG: VTES-LLM-LAUNCHER_v5.html is 3145728 bytes"
mk; truncate -s 1500000 "$N/VTES-LLM-LAUNCHER_v5.html"; ARGP=$N; NOTS=("TOO BIG"); V R05c 1 "EDITED: VTES-LLM-LAUNCHER_v5.html"
echo "== R05d a 1.5 MB script is too big (script cap 1 MB)"; mk; truncate -s 1500000 "$N/vtes5-ui.js"; ARGP=$N; V R05d 1 "TOO BIG: vtes5-ui.js is 1500000 bytes, more than the limit of 1048576"
echo "== R06 (S64) a 200 MB data file, WITH $AW: refused from its length, fast"; mk; truncate -s 200M "$N/data/vtes5-bots.js"; ARGP=$N; EXTRA=$AW; MAXSEC=12; V R06 1 "TOO BIG: data/vtes5-bots.js (data file) is 209715200 bytes, more than the limit of 1048576. It was not read and not hashed."; MAXSEC=58; EXTRA=
echo "== R06b a 200 MB data file WITHOUT the switch: also TOO BIG, fast"; ARGP=$N; MAXSEC=12; V R06b 1 "TOO BIG: data/vtes5-bots.js"; MAXSEC=58
echo "== R06c a data file of exactly 1048577 bytes is too big; one of exactly 1048576 bytes is read (and fails the shape, not the size)"; mk; truncate -s 1048577 "$N/data/vtes5-bots.js"; ARGP=$N; EXTRA=$AW; V R06c 1 "TOO BIG: data/vtes5-bots.js (data file) is 1048577 bytes"
mk; truncate -s 1048576 "$N/data/vtes5-bots.js"; ARGP=$N; EXTRA=$AW; NOTS=("TOO BIG"); V R06d 1 'data\vtes5-bots.js contains NUL bytes'; EXTRA=
echo "== R06e a 200 MB MANIFEST.sha256: refused from its length, exit 2, fast"; mk; truncate -s 200M "$N/MANIFEST.sha256"; ARGP=$N; MAXSEC=12; V R06e 2 "CANNOT CHECK" "it was not read"; MAXSEC=58
echo "== R06f a valid 900 KB data file (many small values), WITH $AW: accepted, in time"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys,json
d={"schema":1,"at":"2026-10-06T14:00:00-04:00","writer":"big","items":[{"id":i,"name":"item %d"%i,"ok":True,"n":None,"v":[1,2.5,-3e2]} for i in range(11500)]}
s='window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = '+json.dumps(d)+';\n'
assert 900000<len(s)<1048576, len(s)
open(sys.argv[1],'w').write(s)
PY3
ARGP=$N; EXTRA=$AW; V R06f 0 "OK (after writers)" "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"; EXTRA=
echo "== R07 (S56) a named pipe in place of a package file: refused WITHOUT being opened, no hang"; mk; rm $N/vtes5-ui.js; mkfifo $N/vtes5-ui.js; ARGP=$N; V R07 1 "NOT A PLAIN FILE: vtes5-ui.js is a named pipe, not a plain file. It was not opened."
echo "== R07b a named pipe in place of a data file, WITH $AW: refused without opening"; mk; rm $N/data/vtes5-tokens.js; mkfifo $N/data/vtes5-tokens.js; ARGP=$N; EXTRA=$AW; V R07b 1 "NOT A PLAIN FILE: data/vtes5-tokens.js (data file) is a named pipe"; EXTRA=
echo "== R07c an EXTRA named pipe in the folder: reported, never opened"; mk; mkfifo $N/extra.pipe; ARGP=$N; V R07c 1 "EXTRA FILE: extra.pipe is a named pipe and is not part of the package (not opened)"
echo "== R07d a unix socket in place of a package file"; mk; rm $N/vtes5-live.js; python3 -c "import socket,sys,os; os.chdir(sys.argv[1]); s=socket.socket(socket.AF_UNIX); s.bind('vtes5-live.js')" $N; ARGP=$N; V R07d 1 "NOT A PLAIN FILE: vtes5-live.js is a socket"
echo "== R07e a device file (a copy of the null device) in place of a package file"; mk; rm $N/vtes5-live.js; if mknod $N/vtes5-live.js c 1 3 2>/dev/null; then ARGP=$N; V R07e 1 "NOT A PLAIN FILE: vtes5-live.js is a device"; else echo "  SKIPPED R07e: mknod is not permitted here (not counted as a scenario)"; fi
echo "== R08 (S57) a named pipe as MANIFEST.sha256: refused without opening, exit 1, no hang"; mk; rm $N/MANIFEST.sha256; mkfifo $N/MANIFEST.sha256; ARGP=$N; V R08 1 "PROBLEMS (1)" "MANIFEST.sha256 is a named pipe, not a plain file. It was not followed and not opened."
echo "== R09 (S65) MANIFEST.sha256 as a symbolic link to a good copy: PROBLEMS, not followed"; mk; cp $N/MANIFEST.sha256 $W/fix/Docs/real-manifest; rm $N/MANIFEST.sha256; ln -s $W/fix/Docs/real-manifest $N/MANIFEST.sha256; ARGP=$N; V R09 1 "PROBLEMS (1)" "MANIFEST.sha256 is a link, not a plain file. It was not followed and not opened."
echo "== R09b MANIFEST.sha256 as a dangling link: PROBLEMS (type is checked before it is followed)"; mk; rm $N/MANIFEST.sha256; ln -s $W/fix/Docs/nowhere $N/MANIFEST.sha256; ARGP=$N; V R09b 1 "MANIFEST.sha256 is a link"
echo "== R09c MANIFEST.sha256 is a folder: cannot check, exit 2"; mk; rm $N/MANIFEST.sha256; mkdir $N/MANIFEST.sha256; ARGP=$N; V R09c 2 "CANNOT CHECK" "a folder has that name"
echo "== R09d MANIFEST.sha256 saved as UTF-16: cannot check, exit 2 (NUL bytes)"; mk; python3 - "$N/MANIFEST.sha256" <<'PY3'
import sys
p=sys.argv[1]; t=open(p,'rb').read().decode('utf-8'); open(p,'wb').write(b'\xff\xfe'+t.encode('utf-16-le'))
PY3
ARGP=$N; V R09d 2 "CANNOT CHECK" "NUL bytes"
echo "== R10 (S66) an extra file VTES5-UI.JS beside vtes5-ui.js: CASE DUPLICATE and EXTRA FILE"; mk; echo hi > $N/VTES5-UI.JS; ARGP=$N; V R10 1 "CASE DUPLICATE" "differ only in upper and lower case" "EXTRA FILE: VTES5-UI.JS"
echo "== R10b a case duplicate inside data/"; mk; echo hi > $N/data/VTES5-BOTS.JS; ARGP=$N; V R10b 1 "CASE DUPLICATE" "EXTRA FILE: data/VTES5-BOTS.JS"
echo "== R10c a folder DATA beside data (a case duplicate of a folder)"; mk; mkdir $N/DATA; ARGP=$N; V R10c 1 "CASE DUPLICATE" "EXTRA FOLDER: DATA"
echo "== R10d a file manifest.sha256 beside MANIFEST.sha256"; mk; echo hi > $N/manifest.sha256; ARGP=$N; V R10d 1 "CASE DUPLICATE" "EXTRA FILE: manifest.sha256"
echo "== R10e the manifest lists a name in the wrong case: not found on Linux (MISSING) and the real file is EXTRA"; mk; sed -i 's/ vtes5-ui.js$/ VTES5-UI.JS/' $N/MANIFEST.sha256; ARGP=$N; V R10e 1 "MISSING: VTES5-UI.JS" "EXTRA FILE: vtes5-ui.js"
echo "== R10f the manifest lists the same name twice in different case"; mk; echo "$(grep ' vtes5-ui.js$' $N/MANIFEST.sha256 | cut -c1-64)  VTES5-UI.JS" >> $N/MANIFEST.sha256; ARGP=$N; V R10f 1 "is listed twice (upper and lower case are not told apart)"
echo "== R11 (S74) a data file with injected script appended after the closing semicolon, WITH $AW: PROBLEMS"; mk; setdata bots "$(printf '%s' "${DW}bots = $GOODJSON;")fetch('http://x');
"; ARGP=$N; EXTRA=$AW; NOTS=("changed by a PC writer"); V R11 1 'data\vtes5-bots.js does not hold one valid JSON object' "not JSON near character"; EXTRA=
echo "== R11b injected script on the same line without a space: ';fetch(...)' appended to the JSON"; mk; setdata bots "${DW}bots = $GOODJSON;fetch('http://x');
"; ARGP=$N; EXTRA=$AW; V R11b 1 'data\vtes5-bots.js does not hold one valid JSON object'; EXTRA=
echo "== R11c a different wrapper: a bare fetch call instead of the assignment"; mk; setdata bots "fetch('http://x');
"; ARGP=$N; EXTRA=$AW; V R11c 1 'data\vtes5-bots.js is not the one assignment'; EXTRA=
echo "== R11d the right wrapper but a function call instead of the object"; mk; setdata bots "${DW}bots = fetch('http://x');
"; ARGP=$N; EXTRA=$AW; V R11d 1 'data\vtes5-bots.js does not hold one valid JSON object'; EXTRA=
echo "== R11e a second assignment line after the real one (two statements)"; mk; setdata bots "${DW}bots = $GOODJSON;
window.x = 1;
"; ARGP=$N; EXTRA=$AW; V R11e 1 'data\vtes5-bots.js'; EXTRA=
echo "== R11f a leading comment or code line BEFORE the wrapper in a data file"; mk; setdata bots "/* hi */
${DW}bots = $GOODJSON;
"; ARGP=$N; EXTRA=$AW; V R11f 1 'data\vtes5-bots.js is not the one assignment'; EXTRA=
echo "== R11g a JSON object holding script-like text inside a string is just data: accepted"; mk; setdata bots "${DW}bots = { \"at\": null, \"note\": \"');fetch('http://x');//\" };
"; ARGP=$N; EXTRA=$AW; V R11g 0 "changed by a PC writer (passes the strict shape check): data/vtes5-bots.js"; EXTRA=
echo "== R11h a JSON comment inside the object"; mk; setdata bots "${DW}bots = { \"at\": null /* x */ };
"; ARGP=$N; EXTRA=$AW; V R11h 1 'data\vtes5-bots.js does not hold one valid JSON object'; EXTRA=
echo "== R11i an object closed early, then script glued with a comma: {...},fetch(1)"; mk; setdata bots "${DW}bots = {\"a\":1},fetch(1);
"; ARGP=$N; EXTRA=$AW; V R11i 1 'data\vtes5-bots.js does not hold one valid JSON object'; EXTRA=
echo "== R12 (S76) the data folder cannot be read (chmod 000, run as nobody): UNREACHABLE for the seven, never MISSING"; mk; chmod 000 $N/data; ARGP=$N; AS=nobody; NOTS=("MISSING"); V R12 1 "UNREACHABLE: data/vtes5-heartbeat.js (data file) cannot be reached" "UNREACHABLE: data/vtes5-miamidade.js" "UNREADABLE FOLDER"; AS=; chmod 755 $N/data
echo "== R12b the same with $AW: still PROBLEMS, UNREACHABLE"; mk; chmod 000 $N/data; ARGP=$N; AS=nobody; EXTRA=$AW; NOTS=("MISSING"); V R12b 1 "UNREACHABLE: data/vtes5-bots.js"; AS=; EXTRA=; chmod 755 $N/data
echo "== R13 a data file saved with a UTF-8 byte-order mark, WITH $AW: PROBLEMS BOM"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY3'
import sys
p=sys.argv[1]; b=open(p,'rb').read(); open(p,'wb').write(b'\xef\xbb\xbf'+b)
PY3
ARGP=$N; EXTRA=$AW; V R13 1 'data\vtes5-bots.js starts with a UTF-8 byte-order mark (BOM)'; EXTRA=
echo "== R14 a NUL byte in the middle of a data file, WITH $AW: PROBLEMS NUL"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY3'
import sys
p=sys.argv[1]; b=bytearray(open(p,'rb').read()); b[60]=0; open(p,'wb').write(b)
PY3
ARGP=$N; EXTRA=$AW; V R14 1 'data\vtes5-bots.js contains NUL bytes'; EXTRA=
echo "== R15 a JSON array instead of an object, WITH $AW: PROBLEMS"; mk; setdata bots "${DW}bots = [1,2,3];
"; ARGP=$N; EXTRA=$AW; V R15 1 'data\vtes5-bots.js does not hold one valid JSON object: the value is not one JSON object'; EXTRA=
echo "== R15b JSON null, a number, a string, true"; mk; setdata bots "${DW}bots = null;
"; ARGP=$N; EXTRA=$AW; V R15b 1 'data\vtes5-bots.js does not hold one valid JSON object'
mk; setdata bots "${DW}bots = 42;
"; V R15c 1 'data\vtes5-bots.js does not hold one valid JSON object'
mk; setdata bots "${DW}bots = \"x\";
"; V R15d 1 'data\vtes5-bots.js does not hold one valid JSON object'; EXTRA=
echo "== R16 the wrong property name: bots.js assigns .state"; mk; printf '%sstate = %s;\n' "$DW" "$GOODJSON" > $N/data/vtes5-bots.js; ARGP=$N; EXTRA=$AW; V R16 1 'data\vtes5-bots.js is not the one assignment "window.VTES_DATA.bots = {...};"'; EXTRA=
echo "== R16b the wrong namespace: window.VTES_DATAX"; mk; printf 'window.VTES_DATAX = window.VTES_DATAX || {}; window.VTES_DATAX.bots = %s;\n' "$GOODJSON" > $N/data/vtes5-bots.js; ARGP=$N; EXTRA=$AW; V R16b 1 'data\vtes5-bots.js is not the one assignment'; EXTRA=
echo "== R17 settings file with a function call instead of an object, WITH $AW"; mk; printf 'window.VTES5_CONFIG = fetch("http://x");\n' > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V R17 1 'vtes5-config.js does not hold one valid JSON object'; EXTRA=
echo "== R17b settings file with status_dir_url as a number; R17c without status_dir_url; R17d as null; R17e as an object"; mk; printf 'window.VTES5_CONFIG = { "status_dir_url": 5 };\n' > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V R17b 1 'vtes5-config.js must hold status_dir_url as a text string'
mk; printf 'window.VTES5_CONFIG = { "other": "x" };\n' > $N/vtes5-config.js; V R17c 1 'vtes5-config.js must hold status_dir_url as a text string'
mk; printf 'window.VTES5_CONFIG = { "status_dir_url": null };\n' > $N/vtes5-config.js; V R17d 1 'vtes5-config.js must hold status_dir_url as a text string'
mk; printf 'window.VTES5_CONFIG = { "status_dir_url": {"a":1} };\n' > $N/vtes5-config.js; V R17e 1 'vtes5-config.js must hold status_dir_url as a text string'; EXTRA=
echo "== R17f settings file: a valid string value (with and without the comment line, no trailing LF) is accepted WITH $AW"; mk; printf 'window.VTES5_CONFIG = { "status_dir_url": "file:///C:/Users/JV/status/" };' > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V R17f 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js"
mk; printf '/* a note */\nwindow.VTES5_CONFIG = { "status_dir_url": "" };\n' > $N/vtes5-config.js; V R17g 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js"
echo "== R17h settings file: a comment that closes early and then runs code; a script line before it"; mk; printf '/* a */ fetch(1); /* b */\nwindow.VTES5_CONFIG = { "status_dir_url": "" };\n' > $N/vtes5-config.js; V R17h 1 'vtes5-config.js is not the one assignment "window.VTES5_CONFIG = {...};"'
mk; printf 'fetch(1);\nwindow.VTES5_CONFIG = { "status_dir_url": "" };\n' > $N/vtes5-config.js; V R17i 1 'vtes5-config.js is not the one assignment'
mk; printf 'window.VTES5_CONFIG = { "status_dir_url": "" };fetch(1);\n' > $N/vtes5-config.js; V R17j 1 'vtes5-config.js'; EXTRA=
echo "== R18 JSON shape checks WITH $AW: trailing comma, single quotes, unquoted key, two objects, unclosed, depth 150"; mk; ARGP=$N; EXTRA=$AW
setdata state "${DW}state = {\"a\":1,};
"; V R18a 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {'a':1};
"; V R18b 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {a:1};
"; V R18c 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {\"a\":1}{\"b\":2};
"; V R18d 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {\"a\":[1,2;
"; V R18e 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'w').write('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":'+'['*150+']'*150+'};\n')
PY3
V R18f 1 'data\vtes5-state.js does not hold one valid JSON object: it is nested more than 100 levels deep'
mk; setdata state "${DW}state = {\"a\":\"line
break\"};
"; V R18g 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {\"a\":01};
"; V R18h 1 'data\vtes5-state.js does not hold one valid JSON object'
mk; setdata state "${DW}state = {\"a\":NaN};
"; V R18i 1 'data\vtes5-state.js does not hold one valid JSON object'; EXTRA=
echo "== R19 end-of-file shape WITH $AW: no trailing LF is accepted; ONE trailing LF is accepted; two LFs, a trailing space, or a missing semicolon are refused"; mk; ARGP=$N; EXTRA=$AW
setdata state "${DW}state = $GOODJSON;"; V R19a 0 "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"
mk; setdata state "${DW}state = $GOODJSON;

"; V R19b 1 'data\vtes5-state.js is not the one assignment'
mk; setdata state "${DW}state = $GOODJSON; ${NLC}"; V R19c 1 'data\vtes5-state.js'
mk; setdata state "${DW}state = $GOODJSON
"; V R19d 1 'data\vtes5-state.js'
mk; setdata state "${DW}state = $GOODJSON;
// end
"; V R19e 1 'data\vtes5-state.js'; EXTRA=
echo "== R20 text and escapes WITH $AW: UTF-8 letters, escapes and a pretty-printed multi-line object (LF only) are accepted; invalid UTF-8 is refused"; mk; ARGP=$N; EXTRA=$AW
python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {\n  "schema": 1,\n  "name": "Jos\u00e9 \\u00e9 \\n \\"q\\" \\\\ \\/",\n  "list": [1, 2.5, -3e2, true, false, null, {"x": []}],\n  "empty": {}\n};\n').encode('utf-8'))
PY3
V R20a 0 "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"
mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"\xc3\x28"};\n')
PY3
V R20b 1 'data\vtes5-state.js is not valid UTF-8'
mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"\x01"};\n')
PY3
V R20c 1 'data\vtes5-state.js does not hold one valid JSON object'; EXTRA=
echo "== R21 a data file that is a folder, and a data file that is a link, WITH $AW"; mk; rm $N/data/vtes5-health.js; mkdir $N/data/vtes5-health.js; ARGP=$N; EXTRA=$AW; V R21a 1 "NOT A FILE: data/vtes5-health.js"
mk; cp $N/data/vtes5-health.js $W/fix/Docs/h.js; rm $N/data/vtes5-health.js; ln -s $W/fix/Docs/h.js $N/data/vtes5-health.js; V R21b 1 "LINK: data/vtes5-health.js"; EXTRA=
echo "== R22 -AfterWriters never relaxes anything else: a code file edited AND a valid data file, a missing data file, an extra file"; mk; okdata bots; echo x >> $N/vtes5-live.js; rm $N/data/vtes5-tokens.js; echo hi > $N/extra.txt; ARGP=$N; EXTRA=$AW; V R22 1 "EDITED: vtes5-live.js" "MISSING: data/vtes5-tokens.js (data file)" "EXTRA FILE: extra.txt" "(not a problem) changed by a PC writer (passes the strict shape check): data/vtes5-bots.js"; EXTRA=
echo "== R23 a data file that is IDENTICAL to a doctored manifest but is UTF-16: the shape check runs on every data file, so still PROBLEMS"; mk; python3 - "$N" <<'PY3'
import sys,hashlib,re
root=sys.argv[1]; p=root+'/data/vtes5-bots.js'
t=open(p,'rb').read().decode('utf-8'); b=b'\xff\xfe'+t.encode('utf-16-le'); open(p,'wb').write(b)
m=open(root+'/MANIFEST.sha256').read().split('\n'); out=[]
for l in m:
    if l.endswith('  data/vtes5-bots.js'): l=hashlib.sha256(b).hexdigest()+'  data/vtes5-bots.js'
    out.append(l)
open(root+'/MANIFEST.sha256','w').write('\n'.join(out))
PY3
ARGP=$N; V R23 1 'BAD DATA FILE: data\vtes5-bots.js is saved as UTF-16'
echo "== R24 the unknown-switch and usage case: a wrong switch name is refused by PowerShell with a non-zero exit"; mk; ARGP=$N; EXTRA="-AfterWriterz"; V R24 1 "AfterWriterz"; EXTRA=
echo "== R25 junction-like link for the folder together with the switch: still LINK IN PATH"; mk; ln -s $N $W/fix/Docs/v5alias; ARGP=$W/fix/Docs/v5alias/; EXTRA=$AW; V R25 1 "LINK IN PATH: the folder itself"; EXTRA=
echo "== R26 trailing slashes and doubled slashes with the switch and a valid change"; mk; okdata miamidade; ARGP="$W/fix/Docs//v5//"; EXTRA=$AW; V R26 0 "changed by a PC writer (passes the strict shape check): data/vtes5-miamidade.js"; EXTRA=
echo "== R27 a path with .. and the switch: refused, exit 2"; mk; ARGP="$W/fix/Docs/v5/../v5"; EXTRA=$AW; V R27 2 'contains ".."'; EXTRA=
echo "== R28 a hidden extra file and a hidden extra folder (dot names)"; mk; echo hi > $N/.hidden; mkdir $N/.hid-dir; ARGP=$N; V R28 1 "EXTRA FILE: .hidden" "EXTRA FOLDER: .hid-dir"
echo "== R29 a big extra file (200 MB) is listed as EXTRA but never read or hashed (fast)"; mk; truncate -s 200M $N/big.bin; ARGP=$N; MAXSEC=12; V R29 1 "EXTRA FILE: big.bin is not part of the package"; MAXSEC=58
echo "== R30 the unreadable data folder run as root (root can read it): a chmod 000 folder is still listed fine, so this is OK"; mk; chmod 000 $N/data; ARGP=$N; V R30 0 "OK: all $NF of $NF"; chmod 755 $N/data
echo "== V30 the source script itself is ASCII only and has no write commands"
LC_ALL=C grep -qP '[^\x00-\x7F]' "$VER"; [ $? -ne 0 ]; chk "V30a: VERIFY-v5.ps1 is pure ASCII" $?
! grep -c $'\r' "$VER" | grep -qv '^0$'; chk "V30c: VERIFY-v5.ps1 has no CR (LF line endings only)" $?
! grep -nEi 'Set-Content|Add-Content|Out-File|New-Item|Remove-Item|Copy-Item|Move-Item|Rename-Item|WriteAll|AppendAll|Start-Transcript|Set-ItemProperty|New-ItemProperty|\| *Set-|>>? *\$|FileMode\]::(Create|Append|Truncate|CreateNew|OpenOrCreate)' "$VER" | grep -v '^[0-9]*:#'; chk "V30b: no write command appears in VERIFY-v5.ps1 (outside comments)" $?
cmp -s "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"; chk "V30d: the fake Desktop's copy of the real v3 launcher is byte-identical after the last scenario" $?
[ "$(sha256sum "$REALV3" | cut -c1-64)" = "$V3SHA" ]; chk "V30e: the real v3 launcher in the repository has SHA-256 $V3SHA" $?
echo; echo "VERIFY TESTS: $PASS of $((PASS+FAIL)) pass"
[ -n "$BADLIST" ] && echo "SCENARIOS NOT AS EXPECTED:$BADLIST"
echo "$SCOK of $SC scenarios as expected; fixture identical before and after in $SCID of $SC"
[ $FAIL -eq 0 ]
