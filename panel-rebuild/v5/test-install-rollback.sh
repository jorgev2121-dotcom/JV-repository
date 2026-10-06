#!/bin/bash
# test-install-rollback.sh <path-to-pwsh> <work-dir>   (panel v5 port, TRK-2026-9910-B)
# Runs INSTALL-v5.ps1 and ROLLBACK-v5.ps1 under PowerShell 7.4.6 for Linux. The "Desktop" fixture holds the REAL v3 launcher (panel-rebuild/v3-live, 24463 bytes,
# SHA-256 28d3ed5e...) plus three STAND-IN files named like the other Desktop pages (their real content has not been seen: random bytes of the sizes in the brief)
# and a sub-folder. For EVERY scenario the SHA-256 of EVERY file in the whole fixture (recursively, plus the folder list) is taken before and after.
PW=$1; W=${2:?work dir needed}; PKG=${PKG:-$(cd "$(dirname "$0")" && pwd)}
REALV3=$(cd "$PKG/../v3-live" && pwd)/VTES-LLM-LAUNCHER_v3.html
rm -rf "${W:?}"; mkdir -p "$W/home"; PASS=0; FAIL=0
export USERPROFILE=$W/home HOME=$W/home
mk() { local P=${1:?}; rm -rf "${P:?}"; mkdir -p "$P/Desktop/old-stuff" "$P/MY-DESK/VTES-PANEL"
  cp "$REALV3" "$P/Desktop/VTES-LLM-LAUNCHER_v3.html"
  head -c 889 /dev/urandom | base64 -w0 | head -c 889 > "$P/Desktop/VTES-CONTROL-PANEL-HOME.html"
  head -c 35553 /dev/urandom | base64 -w0 | head -c 35553 > "$P/Desktop/WAITING-ON-YOU_DECISIONS.html"
  head -c 9880 /dev/urandom | base64 -w0 | head -c 9880 > "$P/Desktop/ACTION-WINDOW.html"
  echo "keep me" > "$P/Desktop/old-stuff/notes.txt"; }
snap() { (cd "$1" && find . -type f -print0 | sort -z | xargs -0 sha256sum; find . -type d | sort | sed 's/^/DIR /') > "$2"; }
ps() { "$PW" -NoProfile -File "$@"; }
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
same() { local n; n=$(grep -vc '^DIR ' "$1"); if cmp -s "$1" "$2"; then echo "  SHA-256 of $n files (and the folder list) before == after: IDENTICAL"; return 0; else echo "  DIFFERS ($n files before):"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
has() { echo "$1" | grep -q "$2"; }
INS() { ps "$PKG/INSTALL-v5.ps1" "$@"; }
ROL() { ps "$PKG/ROLLBACK-v5.ps1" "$@"; }
SHA3=$(sha256sum "$REALV3" | cut -c1-64); echo "real v3 launcher: $(wc -c < "$REALV3") bytes, SHA-256 $SHA3"
echo "== S1: single install with -V3File, then rollback"
P=$W/s1; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s1.all0
O=$(INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "$O" | grep -E "^(v3 |Record|new folder|DONE|STOP|FAILED|exit)" | cut -c1-170
has "$O" "exit=0"; chk "S1a: install exits 0" $?; has "$O" "v3 untouched: SHA256 of all 4 files"; chk "S1b: INSTALL itself reports the 4 files directly in the v3 folder identical (the 5th fixture file is in a sub-folder; the whole-fixture check S1c covers it)" $?; has "$O" "equals the real v3 launcher"; chk "S1b2: INSTALL recognises the real v3 SHA-256" $?
snap $D $W/s1.v3b; snap $P $W/s1.all1; (cd $P && find Desktop -type f -print0 | sort -z | xargs -0 sha256sum) > $W/s1.d0; grep -v "MY-DESK" $W/s1.all0 | grep -v "^DIR \./MY-DESK" > $W/s1.a0; grep -v "MY-DESK" $W/s1.all1 | grep -v "^DIR \./MY-DESK" > $W/s1.a1; same $W/s1.a0 $W/s1.a1; chk "S1c: the whole Desktop fixture is identical after the install (outside the new folder nothing changed)" $?
[ "$(find $N -type f | wc -l)" = "12" ]; chk "S1d: new folder holds 12 files (10 package + config + record)" $?
LC_ALL=C grep -qP '[^\x00-\x7F]' $N/vtes5-config.js; [ $? -ne 0 ]; chk "S1e: config is pure ASCII" $?
for f in VTES-LLM-LAUNCHER_v5.html vtes5-live.js vtes5-ui.js data/vtes5-heartbeat.js data/vtes5-bots.js data/vtes5-state.js data/vtes5-health.js data/vtes5-tokens.js data/vtes5-housekeeping.js data/vtes5-miamidade.js; do cmp -s $PKG/$f $N/$f || { echo "  differs: $f"; BADCP=1; }; done; [ -z "$BADCP" ]; chk "S1f: all 10 copied files are byte-identical to the package" $?; BADCP=
O=$(ROL -NewDir $N; echo "exit=$?"); echo "$O" | tail -3 | cut -c1-170; [ ! -e $N ] && [ -d $P/MY-DESK/VTES-PANEL ]; chk "S1g: rollback removed the new folder and left its parent folder" $?; snap $P $W/s1.all2; same $W/s1.all0 $W/s1.all2; chk "S1h: the whole fixture (Desktop AND parent folders) is identical to before the install" $?
echo "== S2: second install onto the existing folder"
P=$W/s2; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s2.a; INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html >/dev/null; snap $N $W/s2.n1
O=$(INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "already exists" && has "$O" "exit=2"; chk "S2a: second install refused (already exists, exit 2)" $?
snap $N $W/s2.n2; cmp -s $W/s2.n1 $W/s2.n2; chk "S2b: the existing new folder is byte-identical after the refused install" $?
ROL -NewDir $N >/dev/null; snap $P $W/s2.b; same $W/s2.a $W/s2.b; chk "S2c: after rollback the whole fixture equals the start" $?
echo "== S3: install fails part-way (test hook), then rollback"
P=$W/s3; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s3.a
O=$(VTES5_TEST_FAIL_BEFORE='data\vtes5-state.js' INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "$O" | tail -2 | cut -c1-170; has "$O" "exit=5" && has "$O" "FAILED part-way"; chk "S3a: failed install exits 5 and says FAILED part-way" $?
echo "  files in the new folder after the failure: $(find $N -type f | wc -l)"; O=$(ROL -NewDir $N); echo "$O" | tail -1 | cut -c1-170; [ ! -e $N ]; chk "S3b: rollback of the half-failed install removed everything" $?; snap $P $W/s3.b; same $W/s3.a $W/s3.b; chk "S3c: whole fixture identical" $?
echo "== S4: Jorge edits his v3 file AFTER the install; the rollback must not touch it"
P=$W/s4; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html >/dev/null; echo "<!-- edited later -->" >> $D/VTES-LLM-LAUNCHER_v3.html; echo new > $D/NEW-FILE.txt; snap $P $W/s4.a
O=$(ROL -NewDir $N); [ ! -e $N ]; chk "S4a: rollback removed the new folder" $?; snap $P $W/s4.b; grep -v "MY-DESK" $W/s4.a > $W/s4.a1; grep -v "MY-DESK" $W/s4.b > $W/s4.b1; same $W/s4.a1 $W/s4.b1; chk "S4b: the edited v3 file and the new file are untouched by the rollback" $?
echo "== S5: install, rollback, install, rollback"
P=$W/s5; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s5.a
INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html >/dev/null; ROL -NewDir $N >/dev/null; INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html | grep -E "^(DONE|STOP|FAILED)" | cut -c1-70; O=$(ROL -NewDir $N); echo "$O" | tail -1 | cut -c1-120
[ ! -e $N ]; chk "S5a: second round rolled back completely" $?; snap $P $W/s5.b; same $W/s5.a $W/s5.b; chk "S5b: whole fixture identical after two rounds" $?
echo "== S6: git refusals (real paths)"
P=$W/s6a; mk $P; git -C $P init -q; snap $P $W/s6a.a; O=$(INS -TargetDir $P/MY-DESK/VTES-PANEL/v5 -V3File $P/Desktop/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6a: target inside a git checkout: refused" $?; [ ! -e $P/MY-DESK/VTES-PANEL/v5 ]; chk "S6a2: no new folder" $?; snap $P $W/s6a.b; grep -v '\.git' $W/s6a.a > $W/s6a.a1; grep -v '\.git' $W/s6a.b > $W/s6a.b1; same $W/s6a.a1 $W/s6a.b1; chk "S6a3: nothing changed" $?
P=$W/s6b; mk $P; mkdir -p $W/s6b-repo/inside; git -C $W/s6b-repo init -q; git -C $W/s6b-repo -c user.email=a@b -c user.name=t commit -q --allow-empty -m x; ln -s $W/s6b-repo/inside $P/link
O=$(INS -TargetDir $P/link/v5 -V3File $P/Desktop/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "git checkout" && has "$O" "(real path)" && has "$O" "exit=2"; chk "S6b: a symlink into a git checkout is refused (real path walk)" $?; [ ! -e $W/s6b-repo/inside/v5 ] && [ -z "$(git -C $W/s6b-repo status --porcelain)" ]; chk "S6b2: git status of the checkout is clean, nothing written there" $?
P=$W/s6c; mk $P; echo "gitdir: /nowhere" > $P/MY-DESK/.git; O=$(INS -TargetDir $P/MY-DESK/VTES-PANEL/v5; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6c: a .git FILE in a parent folder is refused" $?
P=$W/s6d; mk $P; mkdir -p $W/s6d-repo; git -C $W/s6d-repo init -q; ln -s $P/MY-DESK/VTES-PANEL $W/s6d-repo/typed; O=$(INS -TargetDir $W/s6d-repo/typed/v5; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6d: typed path inside git, real place outside: refused" $?; [ ! -e $P/MY-DESK/VTES-PANEL/v5 ]; chk "S6d2: no new folder" $?
P=$W/s6e; mk $P; mkdir -p $W/s6e-repo/inside; git -C $W/s6e-repo init -q; ln -s $W/s6e-repo/inside $P/link; O=$(PATH=/nonexistent INS -TargetDir $P/link/v5; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "(real path)" && has "$O" "found .git" && has "$O" "exit=2"; chk "S6e: with git NOT installed, the real-path walk alone still refuses (F5)" $?
echo "== S7: no -TargetDir"
P=$W/s7; mk $P; snap $P $W/s7.a; O=$(INS; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-120)"; has "$O" "exit=2"; chk "S7a: refused" $?; O=$(INS -DryRun; echo "exit=$?"); has "$O" "exit=2"; chk "S7b: -DryRun without -TargetDir refused" $?; snap $P $W/s7.b; same $W/s7.a $W/s7.b; chk "S7c: nothing changed" $?
echo "== S8: rollback with no record"
P=$W/s8; mk $P; mkdir -p $P/MY-DESK/VTES-PANEL/v5/data; echo keep > $P/MY-DESK/VTES-PANEL/v5/mine.txt; snap $P $W/s8.a; O=$(ROL -NewDir $P/MY-DESK/VTES-PANEL/v5; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "CHANGED NOTHING" && has "$O" "exit=2"; chk "S8a: refused, says it changed nothing" $?; snap $P $W/s8.b; same $W/s8.a $W/s8.b; chk "S8b: everything identical" $?
echo "== S9: target INSIDE the folder that holds the real v3 launcher"
P=$W/s9; mk $P; D=$P/Desktop; snap $P $W/s9.a; O=$(INS -TargetDir $D/v5 -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "inside the folder that holds the v3 launcher" && has "$O" "exit=2"; chk "S9a: refused" $?; O=$(INS -TargetDir $D/old-stuff/deeper/v5 -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); has "$O" "exit=2"; chk "S9b: a path under a sub-folder of the v3 folder: refused too (parent missing or inside)" $?; snap $P $W/s9.b; same $W/s9.a $W/s9.b; chk "S9c: nothing changed" $?
mkdir -p $D/old-stuff/deeper; snap $P $W/s9.a2; O=$(INS -TargetDir $D/old-stuff/deeper/v5 -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); has "$O" "inside the folder that holds the v3 launcher" && has "$O" "exit=2"; chk "S9d: parent exists but is inside the v3 folder: refused" $?; snap $P $W/s9.b2; same $W/s9.a2 $W/s9.b2; chk "S9e: nothing changed" $?
echo "== S10: -V3File problems"
P=$W/s10; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; O=$(INS -TargetDir $N -V3File $D/NOT-THERE.html; echo "exit=$?"); has "$O" "was not found" && has "$O" "exit=2"; chk "S10a: a missing -V3File is refused" $?; [ ! -e $N ]; chk "S10a2: no new folder" $?
echo "<!-- jorge edited this -->" >> $D/VTES-LLM-LAUNCHER_v3.html; snap $P $W/s10.a; O=$(INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); echo "$O" | grep -E "^NOTE" | cut -c1-170; has "$O" "NOTE: the v3 launcher SHA256 differs" && has "$O" "exit=0"; chk "S10b: an edited v3 launcher: NOTE printed, install still fine, v3 untouched" $?
ROL -NewDir $N >/dev/null; snap $P $W/s10.b; same $W/s10.a $W/s10.b; chk "S10c: whole fixture identical after rollback" $?
echo "== S11: -StatusDir"
P=$W/s11; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; mkdir -p "$P/status folder"; echo "window.VTES_STATUS={};" > "$P/status folder/vtes-status.js"; snap "$P/status folder" $W/s11.st0
O=$(INS -TargetDir $N -StatusDir "$P/status folder"; echo "exit=$?"); has "$O" "exit=0"; chk "S11a: install with -StatusDir works" $?; grep -o 'status_dir_url": "[^"]*"' $N/vtes5-config.js; grep -q 'status_dir_url": "file://' $N/vtes5-config.js && grep -q 'status%20folder/' $N/vtes5-config.js; chk "S11b: config holds a file: address with the space escaped" $?
snap "$P/status folder" $W/s11.st1; same $W/s11.st0 $W/s11.st1; chk "S11c: the status folder is untouched" $?; ROL -NewDir $N >/dev/null; [ ! -e $N ]; chk "S11d: rollback ok" $?
O=$(INS -TargetDir $N -StatusDir "$P/nope"; echo "exit=$?"); has "$O" "was not found" && has "$O" "exit=2"; chk "S11e: a missing -StatusDir is refused, nothing created" $?; [ ! -e $N ]; chk "S11f: no folder" $?
echo "== S12: a file Jorge or something else added to the new folder survives the rollback"
P=$W/s12; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; INS -TargetDir $N >/dev/null; echo "mine" > $N/data/my-own-report.js; echo "mine2" > $N/extra.txt
O=$(ROL -NewDir $N; echo "exit=$?"); echo "$O" | tail -3 | cut -c1-200; has "$O" "exit=4"; chk "S12a: exit 4, says what was left" $?; [ -f $N/data/my-own-report.js ] && [ -f $N/extra.txt ] && [ ! -e $N/vtes5-live.js ]; chk "S12b: both added files are still there; the package files are gone" $?
echo "== S13: a doctored record is refused (nothing removed)"
P=$W/s13; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; INS -TargetDir $N >/dev/null; echo "FILE|../../../Desktop/VTES-LLM-LAUNCHER_v3.html" >> $N/v5-install-record.txt; snap $P $W/s13.a; O=$(ROL -NewDir $N; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "REFUSED" && has "$O" "exit=3"; chk "S13a: a '..' path in the record: refused, exit 3" $?; snap $P $W/s13.b; same $W/s13.a $W/s13.b; chk "S13b: nothing removed" $?
sed -i '$d' $N/v5-install-record.txt; sed -i "s#^NEWDIR|.*#NEWDIR|$P/Desktop#" $N/v5-install-record.txt; snap $P $W/s13.c; O=$(ROL -NewDir $N; echo "exit=$?"); has "$O" "REFUSED" && has "$O" "exit=3"; chk "S13c: a record that names another folder: refused" $?; snap $P $W/s13.d; same $W/s13.c $W/s13.d; chk "S13d: nothing removed" $?
echo "== S14: dry runs change nothing"
P=$W/s14; mk $P; D=$P/Desktop; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s14.a; O=$(INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html -DryRun; echo "exit=$?"); echo "$O" | grep -E "DRY RUN|would write nothing" | cut -c1-120; has "$O" "exit=0"; chk "S14a: install -DryRun exits 0" $?; snap $P $W/s14.b; same $W/s14.a $W/s14.b; chk "S14b: nothing created" $?
INS -TargetDir $N >/dev/null; snap $P $W/s14.c; O=$(ROL -NewDir $N -DryRun; echo "exit=$?"); has "$O" "DRY RUN: nothing was removed" && has "$O" "exit=0"; chk "S14c: rollback -DryRun lists and removes nothing" $?; snap $P $W/s14.d; same $W/s14.c $W/s14.d; chk "S14d: unchanged" $?; ROL -NewDir $N >/dev/null
echo "== S15: pre-existing folders and links at the target"
P=$W/s15; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; mkdir -p $N; snap $P $W/s15.a; O=$(INS -TargetDir $N; echo "exit=$?"); has "$O" "already exists" && has "$O" "exit=2"; chk "S15a: an existing EMPTY folder at the target is refused and stays" $?; [ -d $N ]; chk "S15a2: the empty folder is still there" $?; snap $P $W/s15.b; same $W/s15.a $W/s15.b; chk "S15b: nothing changed" $?
rmdir $N; ln -s /nonexistent-target $N; O=$(INS -TargetDir $N; echo "exit=$?"); has "$O" "already exists" && has "$O" "exit=2"; chk "S15c: a dangling link at the target counts as existing: refused" $?; [ -L $N ]; chk "S15d: the link is still there" $?
echo "== S16: a folder name with a space and an e-acute"
P=$W/s16; mk $P; N="$P/MY-DESK/VTES-PANEL/v5 caf$(printf '\xc3\xa9')"; O=$(INS -TargetDir "$N" -StatusDir "$P/MY-DESK"; echo "exit=$?"); has "$O" "exit=0"; chk "S16a: install into a folder with a space and an accent" $?; LC_ALL=C grep -qP '[^\x00-\x7F]' "$N/vtes5-config.js"; [ $? -ne 0 ]; chk "S16b: config still pure ASCII" $?; ROL -NewDir "$N" >/dev/null; [ ! -e "$N" ]; chk "S16c: rollback ok" $?
echo "== S17: the Undo_Manifests stub"
P=$W/s17; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; U=$W/home/OneDrive/Documents/Reports/Undo_Manifests; mkdir -p $U; echo "other stub" > $U/Rollback_Something_else.ps1; snap $U $W/s17.u0
O=$(INS -TargetDir $N; echo "exit=$?"); [ "$(ls $U | grep -c '^Rollback_Panel-v5_')" = "1" ]; chk "S17a: one rollback stub written" $?; LC_ALL=C grep -qP '[^\x00-\x7F]' $U/Rollback_Panel-v5_*.ps1; [ $? -ne 0 ]; chk "S17b: stub is ASCII" $?
ROL -NewDir $N >/dev/null; snap $U $W/s17.u1; same $W/s17.u0 $W/s17.u1; chk "S17c: after rollback the Undo_Manifests folder is exactly as before (the other stub kept, ours removed)" $?
echo "== S18: package problems"
P=$W/s18; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; mkdir -p $W/s18-pkg/data; cp -a $PKG/INSTALL-v5.ps1 $PKG/VTES-LLM-LAUNCHER_v5.html $PKG/vtes5-live.js $W/s18-pkg/; cp -a $PKG/data/vtes5-heartbeat.js $W/s18-pkg/data/
O=$(ps $W/s18-pkg/INSTALL-v5.ps1 -TargetDir $N; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-120)"; has "$O" "package file missing" && has "$O" "exit=3"; chk "S18a: an incomplete package is refused with exit 3" $?; [ ! -e $N ]; chk "S18b: nothing created" $?
echo "== S20: the parent folder of the target does not exist"
P=$W/s20; mk $P; snap $P $W/s20.a; O=$(INS -TargetDir $P/NO-SUCH/v5; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "does not exist" && has "$O" "exit=2"; chk "S20a: refused, exit 2" $?; [ ! -e $P/NO-SUCH ]; chk "S20b: no folder was created for it" $?; snap $P $W/s20.b; same $W/s20.a $W/s20.b; chk "S20c: nothing changed" $?
echo "== S21: the new folder was renamed after the install, then rolled back"
P=$W/s21; mk $P; N=$P/MY-DESK/VTES-PANEL/v5; INS -TargetDir $N >/dev/null; mv $N $P/MY-DESK/VTES-PANEL/v5-renamed; snap $P $W/s21.a; O=$(ROL -NewDir $P/MY-DESK/VTES-PANEL/v5-renamed; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "REFUSED" && has "$O" "exit=3"; chk "S21a: a record that belongs to the old path is refused, nothing removed" $?; snap $P $W/s21.b; same $W/s21.a $W/s21.b; chk "S21b: nothing changed" $?
mv $P/MY-DESK/VTES-PANEL/v5-renamed $N; O=$(ROL -NewDir $N; echo "exit=$?"); has "$O" "exit=0"; chk "S21c: moved back, the rollback works" $?
echo "== S22: a v3 folder full of other files (200 files) and a big file are fingerprinted and untouched"
P=$W/s22; mk $P; D=$P/Desktop; for i in $(seq 1 200); do echo "file $i" > $D/f$i.txt; done; head -c 20000000 /dev/urandom > $D/big.bin; N=$P/MY-DESK/VTES-PANEL/v5; snap $P $W/s22.a; O=$(INS -TargetDir $N -V3File $D/VTES-LLM-LAUNCHER_v3.html; echo "exit=$?"); has "$O" "v3 untouched: SHA256 of all 205 files" && has "$O" "exit=0"; chk "S22a: INSTALL fingerprinted 205 files directly in the v3 folder, identical" $?; ROL -NewDir $N >/dev/null; snap $P $W/s22.b; same $W/s22.a $W/s22.b; chk "S22b: whole fixture identical after rollback" $?
echo "== S19: ASCII and syntax of the scripts"
for f in INSTALL-v5.ps1 ROLLBACK-v5.ps1; do LC_ALL=C grep -qP '[^\x00-\x7F]' $PKG/$f; [ $? -ne 0 ]; chk "S19: $f has no non-ASCII byte" $?; done
echo; echo "PowerShell scenarios: $PASS passed, $FAIL failed"; exit $FAIL
