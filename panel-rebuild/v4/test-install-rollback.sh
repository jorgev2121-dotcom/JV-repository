#!/bin/bash
# test-install-rollback.sh <path-to-pwsh> <work-dir>   (fix round 3, TRK-2026-9910-B)
# Runs INSTALL-v4.ps1 and ROLLBACK-v4.ps1 under PowerShell for Linux against a copy of the v3 panel folder (branch claude/executor-tray-icon-1cazza,
# tools/vtes-panel). For EVERY scenario it takes the SHA256 of every file in the v3 folder before and after (must be identical) and of the new folder.
# The scenario names follow CHECK-4 Section D (S1 to S14) plus new ones. PKG can be set to test an older package: PKG=/path/to/old/v4 ./test-install-rollback.sh ...
PW=$1; W=${2:?work dir needed}; PKG=${PKG:-$(cd "$(dirname "$0")" && pwd)}; REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
rm -rf "${W:?}"; mkdir -p "$W"; PASS=0; FAIL=0
export USERPROFILE=$W/home HOME=$W/home; mkdir -p "$W/home"
mk_v3() { local P=${1:?}; rm -rf "${P:?}"; mkdir -p "$P/vtes-panel" "${W:?}/tmp"; git -C "$REPO" archive origin/claude/executor-tray-icon-1cazza tools/vtes-panel | tar -x -C "$W/tmp"; cp -a "$W/tmp/tools/vtes-panel/." "$P/vtes-panel/"; rm -rf "${W:?}/tmp"; cp "$P/vtes-panel/VTES-LLM-LAUNCHER.html" "$P/vtes-panel/VTES-CONTROL-PANEL.html"; }
snap() { (cd "$1" && find . -type f -print0 | sort -z | xargs -0 sha256sum; find . -type d | sort | sed 's/^/DIR /') > "$2"; }
ps() { "$PW" -NoProfile -File "$@"; }
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
same() { local n; n=$(grep -vc '^DIR ' "$1"); if cmp -s "$1" "$2"; then echo "  v3 folder: SHA256 of $n files (and the folder list) before == after: IDENTICAL"; return 0; else echo "  v3 folder DIFFERS ($n files before):"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
has() { echo "$1" | grep -q "$2"; }
INS() { ps "$PKG/INSTALL-v4.ps1" "$@"; }
ROL() { ps "$PKG/ROLLBACK-v4.ps1" "$@"; }
echo "== S1: single install, then rollback"
P=$W/s1; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; snap $L $W/s1.v3a
O=$(INS -LiveDir $L); echo "$O" | grep -E "^(Record|v3 folder fingerprinted|new folder|v3 untouched|DONE|STOP|FAILED)" | cut -c1-150; snap $L $W/s1.v3b; same $W/s1.v3a $W/s1.v3b; chk "S1a: install left the v3 folder identical" $?
snap $N $W/s1.new; echo "  new folder: $(grep -vc '^DIR ' $W/s1.new) files; config: $(sed -n 2p $N/vtes4-config.js | cut -c1-120)"
[ "$(grep -vc '^DIR ' $W/s1.new)" = "12" ]; chk "S1b: new folder holds 12 files (10 package + config + record)" $?
LC_ALL=C grep -qP '[^\x00-\x7F]' $N/vtes4-config.js; [ $? -ne 0 ]; chk "S1c: config is pure ASCII" $?
O=$(ROL -NewDir $N); echo "$O" | tail -3 | cut -c1-170; [ ! -e $N ]; chk "S1d: rollback removed the new folder" $?; snap $L $W/s1.v3c; same $W/s1.v3a $W/s1.v3c; chk "S1e: v3 folder identical after rollback" $?
echo "== S2: second install while the first is there (CHECK-4 S2)"
P=$W/s2; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; snap $L $W/s2.v3a; INS -LiveDir $L >/dev/null; snap $N $W/s2.n1
O=$(INS -LiveDir $L); echo "  $(echo "$O" | head -1 | cut -c1-160)"; has "$O" "already exists"; chk "S2a: second install refused ('already exists')" $?
snap $N $W/s2.n2; cmp -s $W/s2.n1 $W/s2.n2; chk "S2b: the new folder is byte-identical after the refused second install" $?
snap $L $W/s2.v3b; same $W/s2.v3a $W/s2.v3b; chk "S2c: v3 identical" $?
echo "== S3: install fails part-way (test hook stops before data/vtes4-state.js), then rollback (CHECK-4 S3)"
P=$W/s3; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; snap $L $W/s3.v3a
O=$(VTES4_TEST_FAIL_BEFORE='data\vtes4-state.js' INS -LiveDir $L; echo "exit=$?"); echo "$O" | tail -3 | cut -c1-170; has "$O" "exit=5"; chk "S3a: failed install exits 5 and says FAILED" $?
echo "  files in the new folder after the failure: $(find $N -type f | wc -l)"
O=$(ROL -NewDir $N); echo "$O" | tail -2 | cut -c1-170; [ ! -e $N ]; chk "S3b: rollback of the half-failed install removed everything" $?; snap $L $W/s3.v3b; same $W/s3.v3a $W/s3.v3b; chk "S3c: v3 identical" $?
echo "== S4: after install, run Verify-VtesPanel.ps1 in the v3 folder (the old DESKTOP-WORK proof step), then rollback (CHECK-4 S4, F7)"
P=$W/s4; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; snap $L $W/s4.v3a; INS -LiveDir $L >/dev/null; snap $L $W/s4.v3b; same $W/s4.v3a $W/s4.v3b; chk "S4a: v3 identical right after install" $?
ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1; snap $L $W/s4.v3v
O=$(ROL -NewDir $N); echo "$O" | tail -1 | cut -c1-170; [ ! -e $N ]; chk "S4b: rollback removed the new folder" $?; snap $L $W/s4.v3c; same $W/s4.v3v $W/s4.v3c; chk "S4c: the rollback did not touch v3 (same as just after Verify; v4 leaves nothing in vtes-verify.js because it never writes there)" $?
echo "== S5: install, rollback, install, rollback (two rounds) (CHECK-4 S5, F7)"
P=$W/s5; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; snap $L $W/s5.v3a
INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; INS -LiveDir $L | grep -E "^(DONE|STOP|FAILED)" | cut -c1-80; O=$(ROL -NewDir $N); echo "$O" | tail -1 | cut -c1-120
[ ! -e $N ]; chk "S5a: second round rolled back completely" $?; snap $L $W/s5.v3b; same $W/s5.v3a $W/s5.v3b; chk "S5b: v3 identical after two rounds" $?
echo "== S6: git refusals (CHECK-4 S6a, S6b, S6c)"
P=$W/s6a; mk_v3 $P; L=$P/vtes-panel; git -C $P init -q; snap $L $W/s6a.a; O=$(INS -LiveDir $L; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6a: v3 folder inside a git checkout: refused" $?; [ ! -e $P/vtes-panel-v4 ]; chk "S6a2: no new folder created" $?; snap $L $W/s6a.b; same $W/s6a.a $W/s6a.b; chk "S6a3: v3 identical" $?
P=$W/s6b; mk_v3 $P; mkdir -p $W/s6b-repo/tools; mv $P/vtes-panel $W/s6b-repo/tools/vtes-panel; git -C $W/s6b-repo init -q; git -C $W/s6b-repo add -A >/dev/null 2>&1; git -C $W/s6b-repo -c user.email=a@b -c user.name=t commit -qm x; ln -s $W/s6b-repo/tools/vtes-panel $P/link
snap $W/s6b-repo/tools/vtes-panel $W/s6b.a; O=$(INS -LiveDir $P/link; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6b: a symlink into a git checkout is refused (F5)" $?
snap $W/s6b-repo/tools/vtes-panel $W/s6b.b; same $W/s6b.a $W/s6b.b; chk "S6b2: v3 identical" $?; [ -z "$(git -C $W/s6b-repo status --porcelain)" ]; chk "S6b3: git status of the checkout is clean (nothing written there)" $?; [ ! -e $P/vtes-panel-v4 ] && [ ! -e $W/s6b-repo/tools/vtes-panel-v4 ]; chk "S6b4: no new folder anywhere" $?
P=$W/s6c; mk_v3 $P; echo "gitdir: /nowhere" > $P/.git; O=$(INS -LiveDir $P/vtes-panel; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6c: a .git FILE in a parent is refused" $?
P=$W/s6d; mk_v3 $P; mkdir -p $W/s6d-repo; git -C $W/s6d-repo init -q; ln -s $P/vtes-panel $W/s6d-repo/typed; O=$(INS -LiveDir $W/s6d-repo/typed; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-170)"; has "$O" "git checkout" && has "$O" "exit=2"; chk "S6d: typed path inside git, real path outside: refused" $?; [ ! -e $P/vtes-panel-v4 ]; chk "S6d2: no new folder" $?
P=$W/s6e; mk_v3 $P; mkdir -p $W/s6e-repo/tools; mv $P/vtes-panel $W/s6e-repo/tools/vtes-panel; git -C $W/s6e-repo init -q; ln -s $W/s6e-repo/tools/vtes-panel $P/link; O=$(PATH=/nonexistent INS -LiveDir $P/link; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "(real path)" && has "$O" "found .git" && has "$O" "exit=2"; chk "S6e: with git NOT installed, the walk over the REAL path alone still refuses the link (F5)" $?
echo "== S7: no -LiveDir (CHECK-4 S7, S7b)"
P=$W/s7; mk_v3 $P; snap $P $W/s7.a; O=$(INS; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-120)"; has "$O" "exit=2"; chk "S7: refused" $?; O=$(INS -DryRun; echo "exit=$?"); has "$O" "exit=2"; chk "S7b: -DryRun without -LiveDir refused" $?; snap $P $W/s7.b; same $W/s7.a $W/s7.b; chk "S7c: nothing changed" $?
echo "== S8: rollback with no record (CHECK-4 S8)"
P=$W/s8; mk_v3 $P; mkdir -p $P/vtes-panel-v4/data; echo keep > $P/vtes-panel-v4/mine.txt; snap $P $W/s8.a; O=$(ROL -NewDir $P/vtes-panel-v4; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "CHANGED NOTHING" && has "$O" "exit=2"; chk "S8: refused, says it changed nothing" $?; snap $P $W/s8.b; same $W/s8.a $W/s8.b; chk "S8b: everything identical, the folder and its file are still there" $?
echo "== S9: F1 - a later change to the v3 writer is never overwritten by an old backup"
P=$W/s9; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; echo "# writer version B" >> $L/Write-VtesStatus.ps1; B=$(sha256sum $L/Write-VtesStatus.ps1 | cut -c1-64); snap $L $W/s9.a
INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; snap $L $W/s9.b; same $W/s9.a $W/s9.b; chk "S9a: v3 identical, the writer is still version B" $?; [ "$(sha256sum $L/Write-VtesStatus.ps1 | cut -c1-64)" = "$B" ]; chk "S9b: Write-VtesStatus.ps1 is still the version B hash ($B)" $?
echo "== S10 and S11: F6 - a manifest with Windows line ends, or with a byte-order mark"
P=$W/s10; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; sed -i 's/$/\r/' $L/MANIFEST.sha256; snap $L $W/s10.a; INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; snap $L $W/s10.b; same $W/s10.a $W/s10.b; chk "S10: CRLF manifest byte-identical" $?
P=$W/s11; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; printf '\xef\xbb\xbf' | cat - $L/MANIFEST.sha256 > $W/m.tmp; cp $W/m.tmp $L/MANIFEST.sha256; snap $L $W/s11.a; INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; snap $L $W/s11.b; same $W/s11.a $W/s11.b; chk "S11: BOM manifest byte-identical" $?
echo "== S12: F14 - folders that already exist stay (empty data and _Rollback inside v3; an empty vtes-panel-v4 beside it)"
P=$W/s12; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; rm -rf "${L:?}/data" "${L:?}/_Rollback"; mkdir -p $L/data $L/_Rollback; snap $L $W/s12.a; INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; snap $L $W/s12.b; same $W/s12.a $W/s12.b; chk "S12a: empty data and _Rollback folders in v3 still there" $?
mkdir -p $N; O=$(INS -LiveDir $L; echo "exit=$?"); has "$O" "already exists" && has "$O" "exit=2"; chk "S12b: an existing empty vtes-panel-v4 is refused" $?; O=$(ROL -NewDir $N; echo "exit=$?"); [ -d $N ]; chk "S12c: rollback does not remove a folder that has no record" $?
echo "== S13: F2 and F15 - v3 writer already hand-edited before install (Verify already says PROBLEM)"
P=$W/s13; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; sed -i "s/'LLM-10','BOTS'/'LLM-10','LLM-09','BOTS'/" $L/Write-VtesStatus.ps1; V1=$(ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1); echo "  Verify before: $V1"; snap $L $W/s13.a
INS -LiveDir $L >/dev/null; snap $L $W/s13.b; V2=$(ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1); echo "  Verify after install: $V2"; same $W/s13.a $W/s13.b; chk "S13a: v3 identical (manifest and writer untouched)" $?; [ "$V1" = "$V2" ]; chk "S13b: the tamper alarm is exactly as loud as before (install did not hide it)" $?
echo "== S14: rollback twice"
P=$W/s14; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; ROL -NewDir $N >/dev/null; O=$(ROL -NewDir $N; echo "exit=$?"); has "$O" "exit=2"; chk "S14: second rollback says folder not found, changes nothing" $?
echo "== S15: a stranger file in the new folder is never removed"
P=$W/s15; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; echo mine > $N/notes.txt; echo mine > $N/data/extra.js; H=$(sha256sum $N/notes.txt | cut -c1-64)
O=$(ROL -NewDir $N; echo "exit=$?"); echo "$O" | grep -E "LEFT|exit" | cut -c1-200; has "$O" "exit=4"; chk "S15a: exit 4, says what is left" $?; [ "$(sha256sum $N/notes.txt | cut -c1-64)" = "$H" ] && [ -f $N/data/extra.js ]; chk "S15b: both stranger files untouched" $?; [ ! -e $N/vtes4-live.js ]; chk "S15c: everything in the record was removed" $?
echo "== S16: a record that lists a path outside the folder is refused, nothing removed"
P=$W/s16; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; echo canary > $P/canary.txt; echo 'FILE|../canary.txt' >> $N/v4-install-record.txt; snap $P $W/s16.a
O=$(ROL -NewDir $N; echo "exit=$?"); echo "  $(echo "$O" | head -1 | cut -c1-200)"; has "$O" "REFUSED" && has "$O" "exit=3"; chk "S16a: refused (..)" $?; snap $P $W/s16.b; cmp -s $W/s16.a $W/s16.b; chk "S16b: nothing removed, canary still there" $?
sed -i '$d' $N/v4-install-record.txt; echo "FILE|/etc/hostname" >> $N/v4-install-record.txt; O=$(ROL -NewDir $N; echo "exit=$?"); has "$O" "REFUSED" && has "$O" "exit=3"; chk "S16c: refused (absolute path)" $?; [ -f /etc/hostname ]; chk "S16d: /etc/hostname still there" $?
echo "== S17: a record that belongs to another folder is refused"
P=$W/s17; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; sed -i "s#^NEWDIR|.*#NEWDIR|/somewhere/else#" $N/v4-install-record.txt; O=$(ROL -NewDir $N; echo "exit=$?"); has "$O" "REFUSED" && has "$O" "exit=3"; chk "S17: refused" $?; [ -f $N/vtes4-live.js ]; chk "S17b: nothing removed" $?
echo "== S18: rollback -DryRun lists and removes nothing"
P=$W/s18; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; INS -LiveDir $L >/dev/null; snap $N $W/s18.a; O=$(ROL -NewDir $N -DryRun); echo "$O" | head -4 | cut -c1-130; snap $N $W/s18.b; cmp -s $W/s18.a $W/s18.b; chk "S18: dry run printed the list, new folder unchanged" $?
echo "== S19: non-ASCII folder name is written as \\u escapes and percent codes"
P=$W/s19; mk_v3 $P; mv $P/vtes-panel "$P/Jos$(printf '\xc3\xa9')"; L="$P/Jos$(printf '\xc3\xa9')"; N=$P/vtes-panel-v4; INS -LiveDir "$L" >/dev/null; sed -n 2p $N/vtes4-config.js | cut -c1-200; LC_ALL=C grep -qP '[^\x00-\x7F]' $N/vtes4-config.js; [ $? -ne 0 ] && grep -q 'Jos%C3%A9/' $N/vtes4-config.js && grep -q 'u00e9' $N/vtes4-config.js; chk "S19: ASCII config, url has %C3%A9, string has \\u00e9" $?
echo "== S20: dangling link where the new folder would go, and v3 typed through a link"
P=$W/s20; mk_v3 $P; L=$P/vtes-panel; ln -s /nonexistent-target $P/vtes-panel-v4; O=$(INS -LiveDir $L; echo "exit=$?"); has "$O" "already exists" && has "$O" "exit=2"; chk "S20a: a dangling link counts as existing: refused" $?
P=$W/s21; mk_v3 $P; mkdir -p $W/s21-elsewhere; ln -s $P/vtes-panel $W/s21-elsewhere/viaLink; snap $P/vtes-panel $W/s21.a; INS -LiveDir $W/s21-elsewhere/viaLink | grep -E "^(DONE|STOP)" | cut -c1-100; [ -d $P/vtes-panel-v4 ] && [ ! -e $W/s21-elsewhere/vtes-panel-v4 ]; chk "S20b: v3 typed through a link: the new folder goes next to the REAL v3 folder" $?; snap $P/vtes-panel $W/s21.b; same $W/s21.a $W/s21.b; chk "S20c: v3 identical" $?
echo "== S21: Undo_Manifests stub is listed in the record and removed by the rollback"
P=$W/s22; mk_v3 $P; L=$P/vtes-panel; N=$P/vtes-panel-v4; mkdir -p $W/home/OneDrive/Documents/Reports/Undo_Manifests; INS -LiveDir $L | grep -c "DONE" | sed 's/^/  DONE lines: /'; ls $W/home/OneDrive/Documents/Reports/Undo_Manifests | sed 's/^/  stub: /'; ROL -NewDir $N | grep "stub" | cut -c1-140; [ -z "$(ls $W/home/OneDrive/Documents/Reports/Undo_Manifests)" ]; chk "S21: stub removed" $?
echo "== ASCII check of the two scripts"
LC_ALL=C grep -qP '[^\x00-\x7F]' $PKG/INSTALL-v4.ps1 $PKG/ROLLBACK-v4.ps1; [ $? -ne 0 ]; chk "INSTALL and ROLLBACK are pure ASCII" $?
echo "RESULT: $PASS passed, $FAIL failed"
