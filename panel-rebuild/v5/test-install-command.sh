#!/bin/bash
# test-install-command.sh <path-to-pwsh-dir> <work-dir>   (panel v5 fix round 4, TRK-2026-9910-B)
# Runs the INSTALL-CMD, VERIFY-CMD and UNDO-CMD blocks of INSTALL-AND-UNDO.md, taken from the document itself, under PowerShell 7.4.6 for Linux.
# The only change: the drive-letter test '^[A-Za-z]:[\\/]' becomes '^/' (Linux has no drive letters); the document says so. SHA-256 of EVERY file in the whole fixture
# (a fake Desktop holding the REAL v3 launcher, a git checkout, the package source, the parent folders) is taken before and after every scenario.
PWD_DIR=${1:?pwsh dir}; W=${2:?work dir}; HERE=$(cd "$(dirname "$0")" && pwd); PKG=$HERE/package; DOC=$HERE/INSTALL-AND-UNDO.md
REALV3=$(cd "$HERE/../v3-live" && pwd)/VTES-LLM-LAUNCHER_v3.html
rm -rf "${W:?}"; mkdir -p "$W/home" "$W/pw"; cp -a "$PWD_DIR"/. "$W/pw"/; PW=$W/pw/pwsh; export HOME=$W/home USERPROFILE=$W/home; PASS=0; FAIL=0
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
has() { echo "$1" | grep -qF -- "$2"; }
blk() { python3 - "$DOC" "$1" <<'PY'
import sys,re
t=open(sys.argv[1]).read(); m=re.search(r'<!-- '+sys.argv[2]+r' -->\s*```\n(.*?)\n```',t,re.S); print(m.group(1))
PY
}
INSTALL=$(blk INSTALL-CMD | sed "s#'\^\[A-Za-z\]:\[\\\\\\\\/\]'#'^/'#"); UNDO=$(blk UNDO-CMD | sed "s#'\^\[A-Za-z\]:\[\\\\\\\\/\]\.+\[\\\\\\\\/\]\.+'#'^/.+/.+'#")
echo "$INSTALL" | grep -q "'^/'"; chk "T00a: the drive-letter test in INSTALL-CMD was swapped for the Linux test (the only edit)" $?
echo "$UNDO" | grep -q "'^/.+/.+'"; chk "T00b: the same swap in UNDO-CMD" $?
mk() { rm -rf "$W/fix"; mkdir -p "$W/fix/Desktop/old-stuff" "$W/fix/Docs" "$W/fix/Repo"; cp "$REALV3" "$W/fix/Desktop/VTES-LLM-LAUNCHER_v3.html"; echo keep > "$W/fix/Desktop/old-stuff/n.txt"; echo keep > "$W/fix/Docs/other.txt"; mkdir -p "$W/fix/Docs/other-folder"; echo keep > "$W/fix/Docs/other-folder/f.txt"; git -C "$W/fix/Repo" init -q; cp -a "$PKG" "$W/fix/pkgsrc"; }
snap() { (cd "$W/fix" && find . -type f -not -path './Repo/.git/*' -print0 | sort -z | xargs -0 sha256sum; find . -not -path './Repo/.git*' | sort | xargs stat -c 'META %n %F %a %s') > "$1" 2>&1; }
same() { local n; n=$(grep -c '^[0-9a-f]\{64\}' "$1"); if cmp -s "$1" "$2"; then echo "  SHA-256 of $n files + folder list before == after: IDENTICAL"; return 0; else echo "  DIFFERS:"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
run() { local cmd=$1 new=$2 pkg=$3; local c=${cmd/FULL PATH OF THE NEW FOLDER/$new}; c=${c/FULL PATH OF THE package FOLDER/$pkg}; "$PW" -NoProfile -Command "$c" 2>&1; echo "exit=$?"; }
runfile() { "$PW" -NoProfile -File "$HERE/VERIFY-v5.ps1" "$@" 2>&1; echo "exit=$?"; }
GOOD=$(sha256sum "$PKG/MANIFEST.sha256" | cut -c1-64)
echo "== T01 install into a new folder, then verify with the expected manifest hash"
mk; N=$W/fix/Docs/VTES-PANEL-v5; snap $W/b; O=$(run "$INSTALL" "$N" "$W/fix/pkgsrc"); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "exit=0"; chk "T01a: install exits 0" $?
[ "$(find $N -type f | wc -l)" = "12" ]; chk "T01b: the new folder holds 12 files (11 package files + MANIFEST.sha256)" $?
O=$(runfile -Path "$N" -ExpectManifestSha256 $GOOD); echo "$O" | tail -3 | sed 's/^/    | /'; has "$O" "OK: all 11 of 11"; chk "T01c: VERIFY says OK" $?
snap $W/a; grep -v "VTES-PANEL-v5" $W/b > $W/b1; grep -v "VTES-PANEL-v5" $W/a | grep -v 'META ./Docs ' > $W/a1; grep -v 'META ./Docs ' $W/b1 > $W/b2; same $W/b2 $W/a1; chk "T01d: everything outside the new folder is identical (Desktop with the real v3, repo, package source, sibling folders)" $?
echo "== T02 install onto an EXISTING folder: stops, copies nothing, existing folder untouched"
mk; N=$W/fix/Docs/other-folder; snap $W/b; O=$(run "$INSTALL" "$N" "$W/fix/pkgsrc"); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "already exists"; chk "T02a: the error says it already exists" $?; has "$O" "exit=1"; chk "T02b: exit code is not 0" $?; snap $W/a; same $W/b $W/a; chk "T02c: the whole fixture is identical (nothing copied into the existing folder)" $?
echo "== T03 install with a missing parent folder"
mk; N=$W/fix/Docs/nope/deeper/v5; snap $W/b; O=$(run "$INSTALL" "$N" "$W/fix/pkgsrc"); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "the parent folder does not exist"; chk "T03a: refused, says the parent is missing" $?; snap $W/a; same $W/b $W/a; chk "T03b: nothing created (no stray parent folders)" $?
echo "== T04 install with a short name"
mk; snap $W/b; O=$(cd $W/fix/Desktop && run "$INSTALL" "v5" "$W/fix/pkgsrc"); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "not a full path"; chk "T04a: refused" $?; snap $W/a; same $W/b $W/a; chk "T04b: nothing written, the Desktop is identical" $?
echo "== T05 install when the package folder is wrong (missing): stops after the folder is made? it must not leave a half install silently"
mk; N=$W/fix/Docs/v5; O=$(run "$INSTALL" "$N" "$W/fix/no-such-package"); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "exit=1"; chk "T05a: the copy error is reported, exit not 0" $?
O=$(runfile -Path "$N" -ExpectManifestSha256 $GOOD); echo "$O" | sed 's/^/    | /' | cut -c1-160; has "$O" "CANNOT CHECK"; chk "T05b: VERIFY does not call the empty folder OK" $?
echo "== T06 undo: removes exactly the one folder"
mk; N=$W/fix/Docs/VTES-PANEL-v5; run "$INSTALL" "$N" "$W/fix/pkgsrc" >/dev/null; snap $W/b; O=$(run "$UNDO" "$N" ""); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "exit=0"; chk "T06a: undo exits 0" $?; [ ! -e "$N" ] && [ -d "$W/fix/Docs" ]; chk "T06b: the folder is gone and its parent is still there" $?
snap $W/a; grep -v "VTES-PANEL-v5" $W/b > $W/b1; grep -v "VTES-PANEL-v5" $W/a > $W/a1; grep -v 'META ./Docs ' $W/b1 > $W/b2; grep -v 'META ./Docs ' $W/a1 > $W/a2; same $W/b2 $W/a2; chk "T06c: nothing else changed (Desktop, repo, siblings identical)" $?
echo "== T07 undo refuses a short name"
mk; snap $W/b; O=$(cd $W/fix/Docs && run "$UNDO" "other-folder" ""); echo "$O" | sed 's/^/    | /' | cut -c1-200; has "$O" "not a full path"; chk "T07a: refused" $?; snap $W/a; same $W/b $W/a; chk "T07b: nothing deleted" $?
echo "== T08 undo refuses a folder that is not a v5 folder (the Desktop, a sibling)"
mk; snap $W/b; O=$(run "$UNDO" "$W/fix/Desktop" ""); has "$O" "this is not a v5 folder"; chk "T08a: the Desktop folder is refused" $?; O=$(run "$UNDO" "$W/fix/Docs/other-folder" ""); has "$O" "this is not a v5 folder"; chk "T08b: a sibling folder is refused" $?; snap $W/a; same $W/b $W/a; chk "T08c: nothing deleted" $?
echo "== T09 undo of a folder that does not exist"
mk; snap $W/b; O=$(run "$UNDO" "$W/fix/Docs/ghost" ""); has "$O" "this is not a v5 folder"; chk "T09a: refused" $?; snap $W/a; same $W/b $W/a; chk "T09b: nothing changed" $?
echo "== T10 install, edit a file, undo still removes only the one folder (the order saves the edited file first)"
mk; N=$W/fix/Docs/VTES-PANEL-v5; run "$INSTALL" "$N" "$W/fix/pkgsrc" >/dev/null; echo "x" >> $N/vtes5-ui.js; O=$(runfile -Path "$N" -ExpectManifestSha256 $GOOD); has "$O" "EDITED: vtes5-ui.js"; chk "T10a: VERIFY names the edited file before the undo" $?
echo
echo "INSTALL/UNDO COMMAND TESTS: $PASS of $((PASS+FAIL)) pass"; [ $FAIL -eq 0 ]
