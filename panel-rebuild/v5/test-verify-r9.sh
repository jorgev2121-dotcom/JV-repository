#!/bin/bash
# test-verify-r9.sh <path-to-pwsh-dir> <work-dir>   (panel v5 fix round 9, TRK-2026-9910-B). PowerShell 7.4.6 for Linux.
# 60 more scenarios for VERIFY-v5.ps1, on top of the 216 in test-verify.sh. Same harness (read from test-verify.sh up to its first scenario): the SHA-256 of every file of the whole fixture (the package copy, its parent,
# a fake Desktop holding the REAL v3 launcher, VERIFY itself) and the type, mode, size, mtime and link target of every entry are taken before and after every scenario and must be identical.
# CHECK-10 flaw 7: the "OK (after writers)" line must count only the files it compared by hash, page and script files apart from data and settings files, and the numbers must add up to the manifest.
# Every expected answer is written on its V line before any run. Counts come from the package that is there now (MANIFEST.sha256), never from a typed number.
HERE=$(cd "$(dirname "$0")" && pwd)
source <(awk '/^echo "== V01/{exit} {print}' "$HERE/test-verify.sh")
DATAF=(heartbeat bots state health tokens housekeeping miamidade config)
dfile() { if [ "$1" = config ]; then echo "vtes5-config.js"; else echo "data/vtes5-$1.js"; fi; }
okone() { if [ "$1" = config ]; then printf 'window.VTES5_CONFIG = { "status_dir_url": "status/" };\n' > "$N/vtes5-config.js"; else okdata "$1"; fi; }
echo "== R-A: after writers, k of the eight data and settings files rewritten (k = 1..8): the line counts page files, identical data files and changed data files apart, and they add up"
for k in 1 2 3 4 5 6 7 8; do
  mk; for ((i=0;i<k;i++)); do okone "${DATAF[$i]}"; done; ARGP=$N; EXTRA=$AW; NOTS=("EDITED" "PROBLEMS"); IDENT=$((8-k))
  V "RA$k" 0 "OK (after writers): all $NF of $NF package files are present and readable. $NID page and script files are identical (SHA-256). $IDENT data or settings file(s) are identical (SHA-256). $k data or settings file(s) were changed by a PC writer and pass the strict shape check"
  [ $((NID+IDENT+k)) -eq "$NF" ]; chk "RA$k: $NID + $IDENT + $k adds up to the $NF files of the manifest" $?
  L=$(echo "$LASTO" | grep -c '^  changed by a PC writer'); [ "$L" -eq "$k" ]; chk "RA$k: exactly $k files are listed as changed by a PC writer (found $L)" $?
done
echo "== R-B: after writers, k data files rewritten AND one page file edited: PROBLEMS, never OK"
for k in 1 2 3 4 5 6 7 8; do mk; for ((i=0;i<k;i++)); do okone "${DATAF[$i]}"; done; echo x >> $N/vtes5-live.js; ARGP=$N; EXTRA=$AW; V "RB$k" 1 "EDITED: vtes5-live.js" "package files are identical:"; done
EXTRA=; echo "== R-C: a single page file edited, no switch: that file is EDITED, the count of identical files is NF-1"
for f in VTES-LLM-LAUNCHER_v5.html vtes5-live.js vtes5-ui.js; do mk; echo x >> "$N/$f"; ARGP=$N; V "RC-$f" 1 "EDITED: $f" "$((NF-1)) of $NF package files are identical"; done
echo "== R-D: a single data or settings file rewritten, no switch: EDITED with its (data file) tag, exit 1, never OK"
for d in "${DATAF[@]}"; do mk; okone "$d"; ARGP=$N; V "RD-$d" 1 "EDITED: $(dfile $d)" "$((NF-1)) of $NF package files are identical"; done
echo "== R-E: a single package file missing: MISSING, exit 1"
for f in VTES-LLM-LAUNCHER_v5.html vtes5-live.js vtes5-ui.js data/vtes5-heartbeat.js data/vtes5-bots.js data/vtes5-state.js data/vtes5-health.js data/vtes5-tokens.js data/vtes5-housekeeping.js data/vtes5-miamidade.js vtes5-config.js; do mk; rm -f "$N/$f"; ARGP=$N; V "RE-$f" 1 "MISSING: $f" "$((NF-1)) of $NF package files are identical"; done
echo "== R-F: the answer on a clean copy, with and without the manifest hash, and with a wrong hash"
mk; ARGP=$N; V RF1 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256), and nothing else is in the folder"
mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $GOODMAN"; V RF2 0 "OK: all $NF of $NF package files"; EXTRA=
mk; ARGP=$N; EXTRA="-ExpectManifestSha256 $(printf '0%.0s' $(seq 64))"; NOTS=("OK: all"); V RF3 1 "MANIFEST CHANGED"; EXTRA=
mk; ARGP=$N; EXTRA=$AW; NOTS=("OK (after writers)"); V RF4 0 "OK: all $NF of $NF package files are present, readable and identical (SHA-256)"; EXTRA=
echo "== R-G: extra things, line endings, links, paths"
mk; echo x > $N/extra.txt; ARGP=$N; V RG1 1 "EXTRA FILE: extra.txt"
mk; mkdir $N/sub; ARGP=$N; V RG2 1 "EXTRA FOLDER: sub"
for f in VTES-LLM-LAUNCHER_v5.html vtes5-live.js vtes5-ui.js; do mk; perl -pi -e 's/\n/\r\n/' "$N/$f"; ARGP=$N; V "RG3-$f" 1 "LINE ENDINGS CHANGED (CRLF)"; done
mk; mv $N/data $W/fix/realdata; ln -s $W/fix/realdata $N/data; ARGP=$N; NOTS=("OK: all"); V RG4 1 "LINK"
mk; mkdir -p $W/fix/real/Docs2; cp -a $N $W/fix/real/Docs2/v5; ln -s $W/fix/real/Docs2 $W/fix/DocsLink; ARGP=$W/fix/DocsLink/v5; NOTS=("OK: all"); V RG5 1 "LINK IN PATH" "no count of identical files is given"
mk; ARGP="$N/../v5"; NOTS=("OK: all"); V RG6 2 "CANNOT CHECK"
mk; ARGP="relative/v5"; NOTS=("OK: all"); V RG7 2 "CANNOT CHECK"
mk; ARGP="$W/fix/nothere"; NOTS=("OK: all"); V RG8 2 "CANNOT CHECK"
mk; mkdir -p $W/fix/Desktop/v5x; cp -a $N/. $W/fix/Desktop/v5x/; ARGP=$W/fix/Desktop/v5x; NOTS=("OK: all"); V RG9 1 "WRONG PLACE"
mk; mkdir -p $W/fix/co/.git $W/fix/co/v5; cp -a $N/. $W/fix/co/v5/; ARGP=$W/fix/co/v5; NOTS=("OK: all"); V RG10 1 "WRONG PLACE"
echo "== R-H: data files that are not plain JSON assignments"
mk; printf '\xff\xfe' > $N/data/vtes5-bots.js; iconv -f UTF-8 -t UTF-16LE < $PKG/data/vtes5-bots.js >> $N/data/vtes5-bots.js; ARGP=$N; V RH1 1 "EDITED: data/vtes5-bots.js (data file)" "saved as UTF-16"
mk; printf '\xff\xfe' > $N/data/vtes5-bots.js; iconv -f UTF-8 -t UTF-16LE < $PKG/data/vtes5-bots.js >> $N/data/vtes5-bots.js; ARGP=$N; EXTRA=$AW; V RH2 1 "BAD DATA FILE" "saved as UTF-16"; EXTRA=
mk; printf 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = { "schema": 1, "writer": "caf\xc3\xa9" };\n' > $N/data/vtes5-state.js; ARGP=$N; EXTRA=$AW; V RH3 1 "contains characters that are not plain ASCII"; EXTRA=
mk; : > $N/data/vtes5-health.js; ARGP=$N; EXTRA=$AW; NOTS=("OK (after writers)"); V RH4 1 "BAD DATA FILE"; EXTRA=
mk; printf 'window.VTES5_CONFIG = { "status_dir_url": "/abs/path" };\n' > $N/vtes5-config.js; ARGP=$N; EXTRA=$AW; V RH5 1 "holds a status_dir_url that is not allowed"; EXTRA=
mk; printf 'garbage line\n' >> $N/MANIFEST.sha256; ARGP=$N; NOTS=("OK: all"); V RH6 1 "BAD MANIFEST LINE"
echo "== V30 the source script itself is ASCII only and has no write commands (read again after this file)"
LC_ALL=C grep -qP '[^\x00-\x7F]' "$VER"; [ $? -ne 0 ]; chk "R-Z1: VERIFY-v5.ps1 is pure ASCII" $?
! grep -nEi 'Set-Content|Add-Content|Out-File|New-Item|Remove-Item|Copy-Item|Move-Item|Rename-Item|WriteAll|AppendAll|Start-Transcript' "$VER" | grep -q .; chk "R-Z2: VERIFY-v5.ps1 holds no write command" $?
cmp -s "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"; chk "R-Z3: the fake Desktop's copy of the real v3 launcher is byte-identical after the last scenario" $?
echo; echo "VERIFY TESTS R9: $PASS of $((PASS+FAIL)) pass"
[ -n "$BADLIST" ] && echo "SCENARIOS NOT AS EXPECTED:$BADLIST"
echo "$SCOK of $SC scenarios as expected; fixture identical before and after in $SCID of $SC"
[ $FAIL -eq 0 ]
