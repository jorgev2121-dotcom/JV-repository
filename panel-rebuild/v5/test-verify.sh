#!/bin/bash
# test-verify.sh <path-to-pwsh-dir> <work-dir>   (panel v5 fix round 4; extended in fix round 7, TRK-2026-9910-B)
# Proves VERIFY-v5.ps1 (PowerShell 7.4.6 for Linux): (1) it WRITES NOTHING - the SHA-256 of EVERY regular file, plus the type, mode, size, mtime and link target of EVERY entry of the whole fixture
# (the package copy, its parent, a fake Desktop holding the REAL v3 launcher, and VERIFY-v5.ps1 itself) is taken before and after every scenario and must be identical;
# (2) it finds edited, missing, extra, unreadable, linked, malformed, pipe, oversized, case-duplicated and badly-shaped-data things and NEVER answers OK for any of them.
# Unreadable files are made with chmod 000 and VERIFY is then run with the read-override rights dropped (AS=nobody; plain root can read anything, so a root run would not prove it).
# PowerShell's own cache lives under HOME=<work>/home, outside the fixture, and is not counted. Telemetry and update checks are switched off by the environment variables below.
# Fix round 7: every scenario runs under `timeout 60` (a hang is exit 124 and fails). The expected answer of every scenario is written on its V line in this file, before any run.
# Expectations are built from the package that is there NOW (file count from MANIFEST.sha256); no hash or count is hard-coded.
# Fix round 8 (TRK-2026-9910-B): scenarios X01-X92 added (exit codes, links never counted, UTF-16 words, non-ASCII refused, control characters escaped, status_dir_url). NOPATH, OKLINEONLY and LASTO are new harness switches.
# Environment: DOCDIR (folder holding the two documents the text checks read, default this folder), PKG (package folder), VSRC (the VERIFY script to test, default the one beside this file), AFTERSW (the switch name, default -AfterWriters).
PWD_DIR=${1:?pwsh dir}; W=${2:?work dir needed}; HERE=$(cd "$(dirname "$0")" && pwd); DOCDIR=${DOCDIR:-$HERE}; PKG=${PKG:-$HERE/package}
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
asnobody() { timeout 60 setpriv --bounding-set -dac_override,-dac_read_search "$PW" -NoProfile -File "$VER" "$@" </dev/null; }
asroot() { timeout 60 "$PW" -NoProfile -File "$VER" "$@" </dev/null; }
NOTS=(); MAXSEC=58; NOPATH=; OKLINEONLY=; LASTO=
# V <label> <expected exit> <must-contain...>  runs as root unless AS=nobody; NOTS=(...) lists text that must NOT appear; checks exit code, text, time, and that nothing in the fixture changed.
# A "scenario" is one V call. It counts as expected only if every assertion of that call passed. It counts as identical only if the whole fixture was the same before and after.
V() { local lab=$1 want=$2; shift 2; local f0=$FAIL; snap $W/b.snap; local O t0 t1 el; t0=$(date +%s)
  local PA=(-Path "$ARGP"); [ -n "$NOPATH" ] && PA=()   # round 8: NOPATH=1 leaves -Path out altogether
  if [ "$AS" = nobody ]; then O=$(asnobody "${PA[@]}" $EXTRA 2>&1; echo "exit=$?"); else O=$(asroot "${PA[@]}" $EXTRA 2>&1; echo "exit=$?"); fi; LASTO=$O
  t1=$(date +%s); el=$((t1-t0)); echo "$O" | grep -v '^Folder:\|^MANIFEST.sha256 SHA' | sed 's/^/    | /' | cut -c1-230; snap $W/a.snap
  has "$O" "exit=$want"; chk "$lab: exit code $want" $?; for m in "$@"; do has "$O" "$m"; chk "$lab: prints \"$m\"" $?; done
  for m in "${NOTS[@]}"; do hasnot "$O" "$m"; chk "$lab: does NOT print \"$m\"" $?; done
  if [ "$want" != "0" ] && [ -n "$OKLINEONLY" ]; then ! echo "$O" | grep -q '^OK'; chk "$lab: no output line starts with OK (a file name cannot fake one)" $?; hasnot "$O" "OK (after writers)"; chk "$lab: does NOT say OK (after writers)" $?
  elif [ "$want" != "0" ]; then hasnot "$O" "OK: all"; chk "$lab: does NOT say OK" $?; hasnot "$O" "OK (after writers)"; chk "$lab: does NOT say OK (after writers)" $?; fi
  hasnot "$O" "Nothing was written anywhere"; chk "$lab: does not claim \"Nothing was written anywhere\" (flaw N18: a script cannot know that)" $?
  [ "$el" -le "$MAXSEC" ]; chk "$lab: finished in $el s (limit $MAXSEC s, never hangs)" $?
  same $W/b.snap $W/a.snap; local idok=$?; chk "$lab: VERIFY wrote nothing (whole fixture identical before and after)" $idok
  SC=$((SC+1)); [ "$FAIL" = "$f0" ] && SCOK=$((SCOK+1)) || BADLIST="$BADLIST $lab"; [ $idok = 0 ] && SCID=$((SCID+1))
  echo "SCENARIO $lab: $([ "$FAIL" = "$f0" ] && echo 'AS EXPECTED' || echo 'NOT AS EXPECTED'); fixture identical before and after: $([ $idok = 0 ] && echo YES || echo NO)"
  NOTS=(); OKLINEONLY=; }
GOODJSON='{ "schema": 1, "at": "2026-10-06T14:00:00-04:00", "writer": "test writer" }'
DW='window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.'
okdata() { printf '%s%s = %s;\n' "$DW" "$1" "$GOODJSON" > "$N/data/vtes5-$1.js"; }
okall() { for f in heartbeat bots state health tokens housekeeping miamidade; do okdata $f; done; printf 'window.VTES5_CONFIG = { "status_dir_url": "status/" };\n' > "$N/vtes5-config.js"; }
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
echo "== R08 (S57) a named pipe as MANIFEST.sha256: refused without opening, exit 1, no hang"; mk; rm $N/MANIFEST.sha256; mkfifo $N/MANIFEST.sha256; ARGP=$N; V R08 1 "PROBLEMS (1)" "MANIFEST.sha256 is a named pipe, not a plain file. It was not opened."
echo "== R09 (S65) MANIFEST.sha256 as a symbolic link to a good copy: PROBLEMS, not followed"; mk; cp $N/MANIFEST.sha256 $W/fix/Docs/real-manifest; rm $N/MANIFEST.sha256; ln -s $W/fix/Docs/real-manifest $N/MANIFEST.sha256; ARGP=$N; V R09 1 "PROBLEMS (1)" "MANIFEST.sha256 is a link, not a plain file. It was not opened."
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
echo "== R17f settings file: a valid string value (with and without the comment line, no trailing LF) is accepted WITH $AW"; mk; printf 'window.VTES5_CONFIG = { "status_dir_url": "status/" };' > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V R17f 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js"
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
echo "== R20 text and escapes WITH $AW: ASCII text with \u escapes and a pretty-printed multi-line object (LF only) are accepted (round 8: a real accent byte is refused, see X40); invalid UTF-8 is refused as not plain ASCII"; mk; ARGP=$N; EXTRA=$AW
python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {\n  "schema": 1,\n  "name": "Jose \\u00e9 \\n \\"q\\" \\\\ \\/",\n  "list": [1, 2.5, -3e2, true, false, null, {"x": []}],\n  "empty": {}\n};\n').encode('utf-8'))
PY3
V R20a 0 "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"
mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"\xc3\x28"};\n')
PY3
V R20b 1 'data\vtes5-state.js contains characters that are not plain ASCII'
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
# ---------------- fix round 8: new scenarios (X01 ...). The expected answer is written on each V line, BEFORE any run. ----------------
setcfg() { printf 'window.VTES5_CONFIG = { "status_dir_url": %s };\n' "$1" > "$N/vtes5-config.js"; }   # $1 = the JSON text of the value, quotes included
NOTLINKCOUNT=("package files are identical" "not followed")
# ===== F5: exit codes. A wrong switch and a missing -Path are refused by PowerShell itself with exit 1; a relative path, a missing folder: exit 2 (VERIFY's own)
echo "== X01 (F5) a wrong switch: PowerShell itself refuses, exit 1, and it names the switch"; mk; ARGP=$N; EXTRA="-Bogus"; NOTS=("CANNOT CHECK" "PROBLEMS"); V X01 1 "Bogus"
echo "== X02 (F5) a second wrong switch spelling, together with the right switch: exit 1"; mk; ARGP=$N; EXTRA="$AW -Nonsense"; NOTS=("PROBLEMS"); V X02 1 "Nonsense"
echo "== X03 (F5) no -Path at all (no keyboard input here): PowerShell itself refuses, exit 1, and it names Path"; mk; ARGP=$N; NOPATH=1; EXTRA=; NOTS=("CANNOT CHECK" "PROBLEMS"); V X03 1 "Path"; NOPATH=
echo "== X04 (F5) a relative path: VERIFY's own exit 2, CANNOT CHECK"; mk; ARGP=Docs/v5; V X04 2 "CANNOT CHECK" "is not a full path"
echo "== X05 (F5) a missing folder: VERIFY's own exit 2, CANNOT CHECK"; mk; ARGP=$W/fix/Docs/not-there; V X05 2 "CANNOT CHECK" "does not exist"
echo "== X06 (F5) the header states exactly these three exit codes (a text check on the script)"
grep -q '^#   Exit codes (each one is tested): 0 = OK. 1 = ' "$VER"; chk "X06a: the header has an Exit codes line" $?
grep -q 'PowerShell itself' "$VER" && sed -n '1,20p' "$VER" | grep -q 'wrong switch' && sed -n '1,20p' "$VER" | grep -q 'no -Path'; chk "X06b: the header says a wrong switch and a missing -Path are refused by PowerShell itself (exit 1)" $?
sed -n '1,20p' "$VER" | grep -q 'relative path'; chk "X06c: the header says a relative path is exit 2" $?
! sed -n '1,20p' "$VER" | grep -q 'or a wrong switch)'; chk "X06d: the old false sentence (wrong switch = exit 2) is gone from the header" $?
# ===== F6: a link anywhere in the answer means NO count of identical files is printed
echo "== X10 (F6) the folder ITSELF is a link: exit 1, LINK IN PATH, files were read through it, no count"; mk; ln -s $N $W/fix/Docs/v5link; ARGP=$W/fix/Docs/v5link; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X10 1 "PROBLEMS (1); no count of identical files is given, because a link was found:" "LINK IN PATH: the folder itself is a link or junction" "files were read through it, so no count of identical files is given"
echo "== X11 (F6) a PARENT folder is a link: exit 1, names the parent, no count"; mk; mkdir -p $W/fix/Docs/rp; cp -a $N $W/fix/Docs/rp/v5; ln -s $W/fix/Docs/rp $W/fix/Docs/plink; ARGP=$W/fix/Docs/plink/v5; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X11 1 "no count of identical files is given, because a link was found:" "LINK IN PATH: the parent folder" "plink" "files were read through it, so no count of identical files is given"
echo "== X12 (F6) a DATA file is a link: exit 1, says it was not opened, no count"; mk; cp $N/data/vtes5-state.js $W/fix/Docs/rs.js; rm $N/data/vtes5-state.js; ln -s $W/fix/Docs/rs.js $N/data/vtes5-state.js; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X12 1 "no count of identical files is given, because a link was found:" "LINK: data/vtes5-state.js is a link, not a plain file (it was not opened)"
echo "== X13 (F6) the MANIFEST is a link: exit 1, not opened, the package files were not checked, no count"; mk; cp $N/MANIFEST.sha256 $W/fix/Docs/rm; rm $N/MANIFEST.sha256; ln -s $W/fix/Docs/rm $N/MANIFEST.sha256; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X13 1 "PROBLEMS (1); the package files were not checked" "MANIFEST.sha256 is a link, not a plain file. It was not opened."
echo "== X14 (F6) an EXTRA file is a link: exit 1, no count"; mk; ln -s $W/fix/Desktop/old-stuff/notes.txt $N/to-notes.txt; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X14 1 "no count of identical files is given, because a link was found:" "LINK: to-notes.txt is a link and is not in the manifest"
echo "== X15 (F6) an EXTRA folder is a link (to the Desktop): exit 1, no count, and the Desktop's files are not listed as extra files"; mk; ln -s $W/fix/Desktop $N/to-desktop; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package" "EXTRA FILE: to-desktop/"); V X15 1 "no count of identical files is given, because a link was found:" "LINK: the folder to-desktop is a link, not a real folder, and it is not in the manifest"
echo "== X16 (F6) a CODE file is a link: exit 1, no count"; mk; cp $N/vtes5-ui.js $W/fix/Docs/ru.js; rm $N/vtes5-ui.js; ln -s $W/fix/Docs/ru.js $N/vtes5-ui.js; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X16 1 "no count of identical files is given, because a link was found:" "LINK: vtes5-ui.js is a link, not a plain file (it was not opened)"
echo "== X17 (F6) a link AND an edited file AND an extra file: all three are listed, and still no count"; mk; ln -s $W/fix/Desktop $N/to-desktop; echo x >> $N/vtes5-live.js; echo hi > $N/extra.txt; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}"); V X17 1 "PROBLEMS (3); no count of identical files is given, because a link was found:" "EDITED: vtes5-live.js" "EXTRA FILE: extra.txt" "LINK: the folder to-desktop"
echo "== X18 (F6) the folder is a link WITH $AW and a valid rewritten data file: exit 1, no OK, no count"; mk; okdata bots; ln -s $N $W/fix/Docs/v5link; ARGP=$W/fix/Docs/v5link; EXTRA=$AW; NOTS=("${NOTLINKCOUNT[@]}" "changed by a PC writer and pass"); V X18 1 "LINK IN PATH: the folder itself" "no count of identical files is given, because a link was found:" "(not a problem) changed by a PC writer (passes the strict shape check): data/vtes5-bots.js"; EXTRA=
echo "== X19 (F6) CONTROL: a plain problem with NO link still prints its count (extra file: all of them are identical; edited file: one fewer)"; mk; echo hi > $N/extra.txt; ARGP=$N; V X19 1 "PROBLEMS (1); $NF of $NF package files are identical:"
mk; echo x >> $N/vtes5-ui.js; ARGP=$N; V X19b 1 "PROBLEMS (1); $((NF-1)) of $NF package files are identical:"
echo "== X20 (F6) a dangling extra link (points nowhere): exit 1, no count"; mk; ln -s $W/fix/Docs/nowhere $N/dangling; ARGP=$N; NOTS=("${NOTLINKCOUNT[@]}"); V X20 1 "LINK: dangling is a link and is not in the manifest" "no count of identical files is given, because a link was found:"
echo "== X21 (F6) link to the folder, path given with a trailing slash: still LINK IN PATH, no count"; mk; ln -s $N $W/fix/Docs/v5link; ARGP=$W/fix/Docs/v5link/; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X21 1 "LINK IN PATH: the folder itself" "no count of identical files is given, because a link was found:"
echo "== X22 (F6) a link to a link to the real folder: exit 1, no count"; mk; ln -s $N $W/fix/Docs/hop1; ln -s $W/fix/Docs/hop1 $W/fix/Docs/hop2; ARGP=$W/fix/Docs/hop2; NOTS=("${NOTLINKCOUNT[@]}" "of $NF package"); V X22 1 "LINK IN PATH: the folder itself" "no count of identical files is given, because a link was found:"
echo "== X23 (F6) a link to a package that is also edited (folder link AND an edited file): the edit is named, no count"; mk; echo x >> $N/vtes5-ui.js; ln -s $N $W/fix/Docs/v5link; ARGP=$W/fix/Docs/v5link; NOTS=("${NOTLINKCOUNT[@]}"); V X23 1 "EDITED: vtes5-ui.js" "LINK IN PATH: the folder itself" "no count of identical files is given, because a link was found:"
echo "== X24 (F6) the word 'not followed' appears nowhere in VERIFY's printed text (a text check on the script)"
! grep -v '^ *#' "$VER" | grep -q 'not followed'; chk "X24: no printed sentence of VERIFY-v5.ps1 says 'not followed'" $?
# ===== F7: a UTF-16 data file on day one prints EDITED (with the UTF-16 reason); BAD DATA FILE appears only with -AfterWriters
echo "== X30 (F7) day one, NO switch, one data file saved as UTF-16: EDITED line that also says it is saved as UTF-16; no BAD DATA FILE line"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY3'
import sys
p=sys.argv[1]; t=open(p,'rb').read().decode('utf-8'); open(p,'wb').write(b'\xff\xfe'+t.encode('utf-16-le'))
PY3
ARGP=$N; NOTS=("BAD DATA FILE"); V X30 1 "EDITED: data/vtes5-bots.js (data file) has SHA-256" "It is also not a valid data file: data\\vtes5-bots.js is saved as UTF-16"
echo "== X31 (F7) the same file WITH $AW: BAD DATA FILE line that says UTF-16; no EDITED line"; ARGP=$N; EXTRA=$AW; NOTS=("EDITED"); V X31 1 "BAD DATA FILE: data\\vtes5-bots.js is saved as UTF-16"; EXTRA=
echo "== X32 (F7) the document quotes the real day-one words and does not promise BAD DATA FILE on day one"
grep -q 'EDITED' "$DOCDIR/INSTALL-BY-HAND.md" && grep -q 'It is also not a valid data file' "$DOCDIR/INSTALL-BY-HAND.md"; chk "X32a: INSTALL-BY-HAND.md quotes the day-one words (EDITED ... It is also not a valid data file)" $?
! grep -q 'BAD DATA FILE ... saved as UTF-16' "$DOCDIR/INSTALL-BY-HAND.md"; chk "X32b: INSTALL-BY-HAND.md no longer promises 'BAD DATA FILE ... saved as UTF-16' on day one" $?
grep -q 'is what you see with `-AfterWriters`' "$DOCDIR/INSTALL-BY-HAND.md"; chk "X32c: INSTALL-BY-HAND.md says the BAD DATA FILE line is what you see with -AfterWriters (and on day one only if the manifest lists the UTF-16 bytes, scenario R23)" $?
echo "== X33 (F8) the document no longer says VERIFY says OK when only the eight files changed"
! grep -q 'VERIFY now says OK when only the eight' "$DOCDIR/INSTALL-BY-HAND.md"; chk "X33: that round-6 sentence (false since round 7) is gone from INSTALL-BY-HAND.md" $?
# ===== F9: any byte above 127 in a data or settings file is refused (UTF-16, BOM and NUL are named first)
ACCENT='window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = { "schema": 1, "at": "2026-10-06T14:00:00-04:00", "writer": "Jos'$'\xc3\xa9'' writer" };'
echo "== X40 (F9) an accent (UTF-8 e-acute) in a data file WITH $AW: refused, names the file, with the escape advice"; mk; setdata state "$ACCENT"; ARGP=$N; EXTRA=$AW; NOTS=("changed by a PC writer" "OK (after writers)"); V X40 1 'data\vtes5-state.js contains characters that are not plain ASCII (a writer must write accents as \u00e9 escapes); do not use this folder' "BAD DATA FILE"; EXTRA=
echo "== X41 (F9) the same accent file WITHOUT the switch: EDITED, and it also says not plain ASCII"; ARGP=$N; V X41 1 "EDITED: data/vtes5-state.js (data file)" 'It is also not a valid data file: data\vtes5-state.js contains characters that are not plain ASCII'
echo "== X42 (F9) a UTF-8 BOM in front of ASCII text WITH $AW: the BOM sentence, not the ASCII one"; mk; python3 - "$N/data/vtes5-bots.js" <<'PY3'
import sys
p=sys.argv[1]; b=open(p,'rb').read(); open(p,'wb').write(b'\xef\xbb\xbf'+b)
PY3
ARGP=$N; EXTRA=$AW; NOTS=("not plain ASCII"); V X42 1 'data\vtes5-bots.js starts with a UTF-8 byte-order mark (BOM)'; EXTRA=
echo "== X43 (F9) a JSON escape backslash-u00e9 (pure ASCII bytes) WITH $AW: accepted"; mk; setdata state "${DW}state = { \"schema\": 1, \"at\": \"2026-10-06T14:00:00-04:00\", \"writer\": \"Jos\\u00e9 writer\" };"; ARGP=$N; EXTRA=$AW; NOTS=("not plain ASCII"); V X43 0 "OK (after writers)" "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"; EXTRA=
echo "== X44 (F9) pure ASCII data file WITH $AW: accepted"; mk; okdata state; ARGP=$N; EXTRA=$AW; NOTS=("not plain ASCII"); V X44 0 "OK (after writers)" "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"; EXTRA=
echo "== X45 (F9) a single Latin-1 byte (0xE9, not valid UTF-8) WITH $AW: also refused as not plain ASCII"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"Jos\xe9"};\n')
PY3
ARGP=$N; EXTRA=$AW; V X45 1 'data\vtes5-state.js contains characters that are not plain ASCII (a writer must write accents as \u00e9 escapes); do not use this folder'; EXTRA=
echo "== X46 (F9) UTF-16 with an accent WITH $AW: the UTF-16 sentence comes first"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
t='window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"Jos\u00e9"};\n'
open(sys.argv[1],'wb').write(b'\xff\xfe'+t.encode('utf-16-le'))
PY3
ARGP=$N; EXTRA=$AW; NOTS=("not plain ASCII"); V X46 1 'data\vtes5-state.js is saved as UTF-16'; EXTRA=
echo "== X47 (F9) an accent in the comment line of the settings file WITH $AW: refused, names vtes5-config.js"; mk; python3 - "$N/vtes5-config.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write('/* Jos\u00e9 */\nwindow.VTES5_CONFIG = { "status_dir_url": "" };\n'.encode('utf-8'))
PY3
ARGP=$N; EXTRA=$AW; V X47 1 'vtes5-config.js contains characters that are not plain ASCII (a writer must write accents as \u00e9 escapes); do not use this folder'; EXTRA=
echo "== X48 (F9) an accent in a JSON KEY WITH $AW: refused"; mk; python3 - "$N/data/vtes5-health.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.health = {"caf\u00e9": 1};\n'.encode('utf-8'))
PY3
ARGP=$N; EXTRA=$AW; V X48 1 'data\vtes5-health.js contains characters that are not plain ASCII'; EXTRA=
echo "== X49 (F9) a NUL byte AND an accent: the NUL sentence comes first"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"\xc3\xa9\x00"};\n')
PY3
ARGP=$N; EXTRA=$AW; NOTS=("not plain ASCII"); V X49 1 'data\vtes5-state.js contains NUL bytes'; EXTRA=
echo "== X50 (F9) a byte 0x80 alone (the smallest non-ASCII value) and 0x7F (DEL, which is ASCII): 0x80 refused, 0x7F is plain ASCII and a valid JSON string character, so it is accepted"; mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"x\x80"};\n')
PY3
ARGP=$N; EXTRA=$AW; V X50 1 'data\vtes5-state.js contains characters that are not plain ASCII'
mk; python3 - "$N/data/vtes5-state.js" <<'PY3'
import sys
open(sys.argv[1],'wb').write(b'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"a":"x\x7f"};\n')
PY3
NOTS=("not plain ASCII"); V X50b 0 "changed by a PC writer (passes the strict shape check): data/vtes5-state.js"; EXTRA=
echo "== X51 (F9) the contract says the same words (a text check on DATA-CONTRACT.md)"
grep -q 'not plain ASCII' "$DOCDIR/DATA-CONTRACT.md"; chk "X51a: DATA-CONTRACT.md says a non-ASCII byte is refused as 'not plain ASCII'" $?
grep -q '\\u00e9' "$DOCDIR/DATA-CONTRACT.md"; chk "X51b: DATA-CONTRACT.md tells writers to write accents as \\u00e9 escapes" $?
# ===== E14: control characters in names are printed escaped, so a name cannot fake a line
FAKE="x"$'\n'"OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder."
echo "== X60 (E14) an extra FILE whose name holds a newline and then 'OK: all ...': exit 1, shown escaped as \\n, and NO output line starts with OK"; mk; echo hi > "$N/$FAKE"; ARGP=$N; OKLINEONLY=1; V X60 1 'EXTRA FILE: x\nOK: all' "PROBLEMS (1)"
echo "== X61 (E14) an extra file with byte 0x01 in its name: shown as \\x01, and the raw byte 0x01 is not in the output"; mk; echo hi > "$N/a"$'\x01'"b"; ARGP=$N; V X61 1 'EXTRA FILE: a\x01b is not part of the package'
! printf '%s' "$LASTO" | LC_ALL=C grep -q $'\x01'; chk "X61b: no raw 0x01 byte in the output" $?
echo "== X62 (E14) an extra FOLDER whose name holds a newline and OK: escaped"; mk; mkdir "$N/d"$'\n'"OK: fake"; ARGP=$N; OKLINEONLY=1; V X62 1 'EXTRA FOLDER: d\nOK: fake'
echo "== X63 (E14) an extra LINK whose name holds a newline: escaped, with the link wording"; mk; ln -s $W/fix/Desktop/old-stuff/notes.txt "$N/l"$'\n'"OK: fake"; ARGP=$N; OKLINEONLY=1; V X63 1 'LINK: l\nOK: fake is a link and is not in the manifest'
echo "== X64 (E14) a CASE DUPLICATE pair whose names hold byte 0x01: both escaped"; mk; echo a > "$N/q"$'\x01'"r"; echo b > "$N/Q"$'\x01'"R"; ARGP=$N; V X64 1 'CASE DUPLICATE' 'q\x01r' 'Q\x01R'
echo "== X65 (E14) a manifest line whose path holds byte 0x01 (file not there): MISSING, escaped"; mk; echo "$(printf '0%.0s' $(seq 64))  m"$'\x01'"n" >> $N/MANIFEST.sha256; ARGP=$N; V X65 1 'MISSING: m\x01n (not in the folder)'
! printf '%s' "$LASTO" | LC_ALL=C grep -q $'\x01'; chk "X65b: no raw 0x01 byte in the output" $?
echo "== X66 (E14) an ESC byte (0x1b, a screen-control start) and a tab in a name: escaped, no raw ESC in the output"; mk; echo hi > "$N/e"$'\x1b'"[2Jf"$'\t'"g"; ARGP=$N; V X66 1 'EXTRA FILE: e\x1b[2Jf\tg is not part of the package'
! printf '%s' "$LASTO" | LC_ALL=C grep -q $'\x1b'; chk "X66b: no raw ESC byte in the output" $?
echo "== X67 (E14) a carriage return in a name: escaped as \\r, no raw CR in the output"; mk; echo hi > "$N/c"$'\r'"OK: fake"; ARGP=$N; OKLINEONLY=1; V X67 1 'EXTRA FILE: c\rOK: fake'
! printf '%s' "$LASTO" | grep -q $'\r'; chk "X67b: no raw CR in the output" $?
echo "== X68 (E14) the -Path folder NAME holds a newline and OK (package copied there, plus one extra file): exit 1, the Folder line shows the escaped name, no line starts with OK"; mk; cp -a $N "$W/fix/Docs/v5"$'\n'"OK: fake"; echo hi > "$W/fix/Docs/v5"$'\n'"OK: fake/extra.txt"; ARGP="$W/fix/Docs/v5"$'\n'"OK: fake"; OKLINEONLY=1; V X68 1 "PROBLEMS (1)" 'v5\nOK: fake' "EXTRA FILE: extra.txt"
echo "== X68b (E14) the same folder name with the package intact: exit 0, exactly ONE output line starts with OK (the real one), and the Folder line shows the escaped name"; mk; cp -a $N "$W/fix/Docs/v5"$'\n'"OK: fake"; ARGP="$W/fix/Docs/v5"$'\n'"OK: fake"; V X68b 0 "OK: all $NF of $NF package files"; has "$LASTO" 'Folder: '; chk "X68c: a Folder line is printed" $?; has "$LASTO" 'v5\nOK: fake'; chk "X68d: the folder name is printed escaped (v5\\nOK: fake)" $?; [ "$(echo "$LASTO" | grep -c '^OK')" = 1 ]; chk "X68e: exactly one line starts with OK" $?
echo "== X69 (E14) a name with a newline inside data/: escaped, with the folder part kept"; mk; echo hi > "$N/data/z"$'\n'"OK: fake"; ARGP=$N; OKLINEONLY=1; V X69 1 'EXTRA FILE: data/z\nOK: fake'
# ===== E15: status_dir_url must be empty or a relative folder path (checked in the exact check too)
echo "== X70 (E15) status_dir_url = file://other-pc/share/ WITH $AW: refused"; mk; setcfg '"file://other-pc/share/"'; ARGP=$N; EXTRA=$AW; NOTS=("OK (after writers)" "changed by a PC writer"); V X70 1 'vtes5-config.js holds a status_dir_url that is not allowed' "BAD DATA FILE"
echo "== X71 (E15) http://x/ WITH $AW: refused"; mk; setcfg '"http://x/"'; V X71 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X72 (E15) a network path \\\\host\\share WITH $AW: refused"; mk; setcfg '"\\\\host\\share"'; V X72 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X73 (E15) C:/x (a drive letter) WITH $AW: refused"; mk; setcfg '"C:/x"'; V X73 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X74 (E15) ../x WITH $AW: refused"; mk; setcfg '"../x"'; V X74 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X75 (E15) /abs WITH $AW: refused"; mk; setcfg '"/abs"'; V X75 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X76 (E15) status/ WITH $AW: accepted (exit 0)"; mk; setcfg '"status/"'; NOTS=("is not allowed"); V X76 0 "OK (after writers)" "changed by a PC writer (passes the strict shape check): vtes5-config.js"
echo "== X77 (E15) the empty string WITH $AW: accepted (exit 0)"; mk; setcfg '""'; NOTS=("is not allowed"); V X77 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js" "OK"
echo "== X78 (E15) a deeper relative path with dot, underscore and dash, no trailing slash: accepted"; mk; setcfg '"a/b-c_d.e/f"'; NOTS=("is not allowed"); V X78 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js"
echo "== X79 (E15) a .. segment in the middle (a/../b) WITH $AW: refused"; mk; setcfg '"a/../b"'; V X79 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X80 (E15) two slashes in a row (a//b) WITH $AW: refused"; mk; setcfg '"a//b"'; V X80 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X81 (E15) a backslash path C:\\x\\ WITH $AW: refused"; mk; setcfg '"C:\\x\\"'; V X81 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X82 (E15) file: with nothing after it WITH $AW: refused"; mk; setcfg '"file:"'; V X82 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X83 (E15) a space in the path WITH $AW: refused"; mk; setcfg '"my status/"'; V X83 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X84 (E15) the exact check (NO switch) also reports it: EDITED with the reason"; mk; setcfg '"http://x/"'; ARGP=$N; EXTRA=; NOTS=("changed by a PC writer"); V X84 1 "EDITED: vtes5-config.js (settings file)" 'It is also not a valid data file: vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X85 (E15) the old documented value file:///C:/x/ is refused now WITH $AW"; mk; setcfg '"file:///C:/x/"'; EXTRA=$AW; V X85 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X86 (E15) a single dot (.) WITH $AW: refused (a part made only of dots)"; mk; setcfg '"."'; V X86 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X87 (E15) a leading ./ WITH $AW: refused (the part '.' is made only of dots)"; mk; setcfg '"./status/"'; V X87 1 'vtes5-config.js holds a status_dir_url that is not allowed'
echo "== X88 (E15) digits and capitals are letters and digits: accepted"; mk; setcfg '"Status2026/Daily"'; NOTS=("is not allowed"); V X88 0 "changed by a PC writer (passes the strict shape check): vtes5-config.js"
echo "== X89 (E15) a tilde (not in the allowed list) WITH $AW: refused"; mk; setcfg '"~/status"'; V X89 1 'vtes5-config.js holds a status_dir_url that is not allowed'; EXTRA=
echo "== X89b (E15) the contract states the same rule (a text check on DATA-CONTRACT.md)"
grep -q 'relative folder path' "$DOCDIR/DATA-CONTRACT.md"; chk "X89b: DATA-CONTRACT.md says status_dir_url is empty or a relative folder path" $?
# ===== re-run of the shipped package
echo "== X90 the shipped package, nothing changed: exit 0, the exact OK line and the closing sentence"; mk; ARGP=$N; NOTS=("changed by a PC writer" "PROBLEMS"); V X90 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder." "This script contains no write command."
echo "== X91 the shipped package with the expected manifest hash AND $AW: exit 0, the same exact OK line"; mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $GOODMAN $AW"; NOTS=("changed by a PC writer" "PROBLEMS" "(after writers)"); V X91 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder."; EXTRA=
echo "== X92 (F9/E15) the shipped data files and settings file pass the new checks even WITH $AW and a rewrite of each in the same bytes (no change: OK line)"; mk; ARGP=$N; EXTRA=$AW; NOTS=("is not allowed" "not plain ASCII"); V X92 0 "OK: all $NF of $NF package files"; EXTRA=
echo "== X34 (F10) what 'git fetch origin <branch>' really changes in a checkout (a real git run in a scratch repo, not VERIFY): objects are written inside .git; no working file and no branch changes"
G=$W/gitproof; rm -rf "$G"; mkdir -p "$G"; GI="git -c user.name=t -c user.email=t@t -c init.defaultBranch=main"
$GI init -q "$G/origin" && (cd "$G/origin" && echo a > a.txt && $GI add a.txt && $GI commit -q -m one && $GI clone -q "$G/origin" "$G/pc" && $GI checkout -q -b claude/panel-v5-port && echo b > b.txt && $GI add b.txt && $GI commit -q -m two && $GI checkout -q main)
(cd "$G/pc" && find .git -type f | wc -l > "$G/files-before"; find . -path ./.git -prune -o -type f -print0 | sort -z | xargs -0 sha256sum > "$G/work-before"; git branch -a > "$G/br-before"; git rev-parse HEAD > "$G/head-before"; git count-objects > "$G/obj-before"
  git fetch -q origin claude/panel-v5-port; find .git -type f | wc -l > "$G/files-after"; find . -path ./.git -prune -o -type f -print0 | sort -z | xargs -0 sha256sum > "$G/work-after"; git branch > "$G/brl-after"; git rev-parse HEAD > "$G/head-after"; git count-objects > "$G/obj-after"; git branch -a > "$G/br-after")
[ "$(cat $G/files-after)" -gt "$(cat $G/files-before)" ]; chk "X34a: after the fetch there are MORE files inside the checkout's .git folder ($(cat $G/files-before) before, $(cat $G/files-after) after)" $?
! cmp -s "$G/obj-before" "$G/obj-after"; chk "X34b: git's own object count changed (before: $(tr '\n' ' ' < $G/obj-before); after: $(tr '\n' ' ' < $G/obj-after))" $?
cmp -s "$G/work-before" "$G/work-after"; chk "X34c: no working file changed (SHA-256 of every file outside .git is the same)" $?
cmp -s "$G/head-before" "$G/head-after"; chk "X34d: the checked-out commit is the same" $?
(cd "$G/pc" && [ "$(git branch | tr -d ' *')" = "main" ]); chk "X34e: no local branch was created or switched (only 'main' exists locally)" $?
grep -q 'origin/claude/panel-v5-port' "$G/br-after" && ! grep -q 'origin/claude/panel-v5-port' "$G/br-before"; chk "X34f: the list of remote branches gained origin/claude/panel-v5-port" $?
rm -rf "$G"
echo "== X35 (F11) the document's step 6d tests for the file first and never overwrites, moves or deletes it (text checks on INSTALL-BY-HAND.md)"
D6=$(grep -F -- '- 6d.' "$DOCDIR/INSTALL-BY-HAND.md"; sed -n '/^   - 6d\./,/^7\. /p' "$DOCDIR/INSTALL-BY-HAND.md")
has "$D6" 'Test-Path -LiteralPath'; chk "X35a: 6d tells the executor to test for the file with Test-Path -LiteralPath" $?
has "$D6" 'never overwrite it, never move it, never delete it'; chk "X35b: 6d says never overwrite, never move, never delete an existing file" $?
has "$D6" 'Get-FileHash'; chk "X35c: 6d reads the existing file's SHA-256" $?
has "$D6" 'VERIFY-v5.ps1.new-'; chk "X35d: 6d names the beside-copy VERIFY-v5.ps1.new-<YYYYMMDD-HHMM>" $?
has "$D6" 'BLOCKED'; chk "X35e: 6d reports BLOCKED when the hashes differ" $?
has "$D6" 'Do not run step 9 with the old file'; chk "X35f: 6d forbids step 9 with the old file" $?
has "$D6" 'not BLOCKED'; chk "X35g: 6d says an existing file with the pinned hash is used as it is (not BLOCKED)" $?
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
