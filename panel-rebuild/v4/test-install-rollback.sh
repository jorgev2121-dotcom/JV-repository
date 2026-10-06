#!/bin/bash
# test-install-rollback.sh <path-to-pwsh> <work-dir>  - runs INSTALL-v4.ps1 / ROLLBACK-v4.ps1 / EDIT-VtesStatus-v4.ps1 under PowerShell for Linux
# against a copy of the v3 panel folder (branch claude/executor-tray-icon-1cazza, tools/vtes-panel) and compares SHA256 of EVERY file before and after.
# Scenarios A, B, C are the second checker's (CHECK-3 Section C). D to G are new. TRK-2026-9910-B
PW=$1; W=$2; PKG=$(cd "$(dirname "$0")" && pwd); REPO=$(git -C "$PKG" rev-parse --show-toplevel)
rm -rf "$W"; mkdir -p "$W"; PASS=0; FAIL=0
mk_live() { rm -rf "$1"; mkdir -p "$1" "$W/tmp"; git -C "$REPO" archive origin/claude/executor-tray-icon-1cazza tools/vtes-panel | tar -x -C "$W/tmp"; cp -a "$W/tmp/tools/vtes-panel/." "$1/"; rm -rf "$W/tmp"; cp "$1/VTES-LLM-LAUNCHER.html" "$1/VTES-CONTROL-PANEL.html"; }
snap() { (cd "$1" && find . -type f -print0 | sort -z | xargs -0 sha256sum) > "$2"; }
ps() { "$PW" -NoProfile -File "$@"; }
chk() { if [ "$2" = "0" ]; then PASS=$((PASS+1)); echo "  PASS $1"; else FAIL=$((FAIL+1)); echo "  FAIL $1"; fi; }
cmpsnap() { local n; n=$(wc -l < "$1"); if cmp -s "$1" "$2"; then echo "  SHA256 of $n files before == after: IDENTICAL"; return 0; else echo "  SHA256 differs ($n files before):"; diff "$1" "$2" | sed 's/^/    /'; return 1; fi; }
echo "== A: verify, install, install, rollback (CHECK-3 run A)"
L=$W/A; mk_live $L; ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1; snap $L $W/A.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(Record|v3 untouched|OK:|DONE|STOP|FAILED)"; ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(v3 untouched|OK:|DONE|STOP|FAILED)"
ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -6; snap $L $W/A.after; cmpsnap $W/A.before $W/A.after; chk "A: every file identical, nothing left over" $?
echo "== A0: same, but vtes-verify.js did not exist before"
L=$W/A0; mk_live $L; rm -f $L/vtes-verify.js; snap $L $W/A0.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(OK:|DONE|STOP|FAILED)"; ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -3; snap $L $W/A0.after; cmpsnap $W/A0.before $W/A0.after; chk "A0: every file identical (vtes-verify.js removed again)" $?
echo "== B: MANIFEST.sha256 unreadable (run as the non-root user nobody), then INSTALL, then ROLLBACK (CHECK-3 run B)"
BW=/tmp/vtes-b-test; rm -rf $BW; mkdir -p $BW; chmod 755 $BW; L=$BW/live; mk_live $L; cp -a "$PKG" $BW/pkg
if [ ! -x /opt/pwsh-nobody/pwsh ]; then cp -a "$(dirname "$PW")" /opt/pwsh-nobody; chmod -R a+rX /opt/pwsh-nobody; fi
mkdir -p $BW/home; chown -R nobody $BW; chmod 000 $L/MANIFEST.sha256
(cd $L && find . -type f ! -name MANIFEST.sha256 -print0 | sort -z | xargs -0 sha256sum) > $W/B.before
RUNAS="runuser -u nobody -- env HOME=$BW/home DOTNET_CLI_HOME=$BW/home DOTNET_BUNDLE_EXTRACT_BASE_DIR=$BW/home"
echo "  as nobody, can the manifest be read? $($RUNAS cat $L/MANIFEST.sha256 >/dev/null 2>&1 && echo YES || echo NO)"
$RUNAS /opt/pwsh-nobody/pwsh -NoProfile -File $BW/pkg/INSTALL-v4.ps1 -LiveDir $L | tail -3
$RUNAS /opt/pwsh-nobody/pwsh -NoProfile -File $BW/pkg/ROLLBACK-v4.ps1 -LiveDir $L | tail -3
(cd $L && find . -type f ! -name MANIFEST.sha256 -print0 | sort -z | xargs -0 sha256sum) > $W/B.after; cmpsnap $W/B.before $W/B.after; chk "B: nothing changed or left over" $?
chmod 644 $L/MANIFEST.sha256; rm -rf $BW
echo "== C1: install; hand-edit Write-VtesStatus.ps1; Verify -Build in the live folder; install again; rollback; verify (CHECK-3 run C)"
L=$W/C1; mk_live $L; snap $L $W/C1.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(OK:|DONE|STOP|FAILED)"
sed -i "s/'LLM-10','BOTS'/'LLM-10','LLM-09','LOCAL','CHIEF','BOTS'/" $L/Write-VtesStatus.ps1; grep -c "CHIEF" $L/Write-VtesStatus.ps1
ps $L/Verify-VtesPanel.ps1 -Dir $L -Build | tail -1
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(OK:|DONE|STOP|FAILED)"
ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -6
echo "  Verify after rollback:"; ps $L/Verify-VtesPanel.ps1 -Dir $L | sed 's/^/    /'; V=$?; chk "C1: tamper check quiet after rollback" $(ps $L/Verify-VtesPanel.ps1 -Dir $L >/dev/null; echo $?)
snap $L $W/C1.after; echo "  (differences below are the two legitimate hand changes only: the edited writer and the rebuilt manifest; vtes-verify.js is rewritten by the Verify I just ran)"; cmpsnap $W/C1.before $W/C1.after
echo "== C2: install; EDIT-VtesStatus-v4.ps1 (the safe way, no -Build); install again; rollback"
L=$W/C2; mk_live $L; ps $L/Verify-VtesPanel.ps1 -Dir $L >/dev/null; snap $L $W/C2.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(OK:|DONE|STOP|FAILED)"
ps $PKG/EDIT-VtesStatus-v4.ps1 -LiveDir $L | head -2
ps $L/Verify-VtesPanel.ps1 -Dir $L | sed 's/^/    after edit: /'
ps $L/Write-VtesStatus.ps1 -SelfTest | tail -1 | sed 's/^/    writer self-test: /'
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(OK:|DONE|STOP|FAILED)"
ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -6; snap $L $W/C2.after; cmpsnap $W/C2.before $W/C2.after; chk "C2: every file identical, writer and manifest back" $?
echo "== D: install fails part-way (the folder name data is a plain file), then ROLLBACK"
L=$W/D; mk_live $L; echo x > $L/data; snap $L $W/D.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | tail -3; ls $L | grep -c "vtes4-" | sed 's/^/  v4 files left in folder after the failed install: /'
ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -3; snap $L $W/D.after; cmpsnap $W/D.before $W/D.after; chk "D: half-failed install rolled back exactly" $?
echo "== E: INSTALL with no -LiveDir"
L=$W/E; mk_live $L; snap $L $W/E.before; ps $PKG/INSTALL-v4.ps1 | head -2; snap $L $W/E.after; cmpsnap $W/E.before $W/E.after; chk "E: refused, nothing changed" $?
echo "== F: INSTALL into a git checkout"
L=$W/F; mk_live $L; git -C $L init -q; snap $L $W/F.before; ps $PKG/INSTALL-v4.ps1 -LiveDir $L | head -2; snap $L $W/F.after; grep -v '/.git/' $W/F.before > $W/F.b2; grep -v '/.git/' $W/F.after > $W/F.a2; cmpsnap $W/F.b2 $W/F.a2; chk "F: refused, nothing changed" $?
echo "== G: live folder with only the name VTES-CONTROL-PANEL.html is recognised"
L=$W/G; mk_live $L; rm $L/VTES-LLM-LAUNCHER.html $L/MANIFEST.sha256; snap $L $W/G.before
ps $PKG/INSTALL-v4.ps1 -LiveDir $L | grep -E "^(v3 untouched|FLAG|DONE|STOP)"; ps $L/_Rollback/ROLLBACK-v4.ps1 -LiveDir $L | tail -2; snap $L $W/G.after; cmpsnap $W/G.before $W/G.after; chk "G: recognised, installed, rolled back exactly" $?
echo "RESULT: $PASS passed, $FAIL failed"
