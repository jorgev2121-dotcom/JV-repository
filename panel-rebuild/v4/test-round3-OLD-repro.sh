#!/bin/bash
# test-round3-OLD-repro.sh <pwsh> <workdir> <old-package-dir>  - the BEFORE evidence for fix round 3 (TRK-2026-9910-B).
# Runs the OLD round-2 INSTALL/ROLLBACK/EDIT (commit 554aaf5, extracted into <old-package-dir>) through the checker's scenarios from CHECK-4 Section D,
# with SHA256 of every file in the v3 folder before and after. Every "BEFORE" line below is expected to show the flaw.
PW=$1; W=${2:?}; OLD=${3:?}; REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
rm -rf "${W:?}"; mkdir -p "$W"; export USERPROFILE=$W/home HOME=$W/home; mkdir -p "$W/home"
mk() { local L=${1:?}; rm -rf "${L:?}"; mkdir -p "$L" "${W:?}/tmp"; git -C "$REPO" archive origin/claude/executor-tray-icon-1cazza tools/vtes-panel | tar -x -C "$W/tmp"; cp -a "$W/tmp/tools/vtes-panel/." "$L/"; rm -rf "${W:?}/tmp"; cp "$L/VTES-LLM-LAUNCHER.html" "$L/VTES-CONTROL-PANEL.html"; }
snap() { (cd "$1" && find . -type f -print0 | sort -z | xargs -0 sha256sum; find . -type d | sort | sed 's/^/DIR /') > "$2"; }
ps() { "$PW" -NoProfile -File "$@"; }
INS() { ps "$OLD/INSTALL-v4.ps1" "$@"; }
ROL() { ps "$1/_Rollback/ROLLBACK-v4.ps1" -LiveDir "$1"; }
EDT() { ps "$OLD/EDIT-VtesStatus-v4.ps1" -LiveDir "$1"; }
diffs() { if cmp -s "$1" "$2"; then echo "    v3 folder identical"; else echo "    v3 folder DIFFERS:"; diff "$1" "$2" | grep '^[<>]' | sed 's/^/      /' | cut -c1-120 | head -8; fi; }
echo "== OLD S9 (F1): install, EDIT, legit change, rollback, redeploy writer B, install, EDIT, rollback"
L=$W/s9; mk $L; INS -LiveDir $L >/dev/null; EDT $L >/dev/null; echo "# change A" >> $L/Write-VtesStatus.ps1; ROL $L >/dev/null; git -C "$REPO" show origin/claude/executor-tray-icon-1cazza:tools/vtes-panel/Write-VtesStatus.ps1 > $L/Write-VtesStatus.ps1; echo "# writer B" >> $L/Write-VtesStatus.ps1; ps $L/Verify-VtesPanel.ps1 -Dir $L -Build >/dev/null; B=$(sha256sum $L/Write-VtesStatus.ps1 | cut -c1-12)
INS -LiveDir $L >/dev/null; EDT $L >/dev/null; ROL $L | tail -2 | cut -c1-160; A=$(sha256sum $L/Write-VtesStatus.ps1 | cut -c1-12); echo "  writer B sha $B, writer after the second rollback $A (they must be equal)"; [ "$A" = "$B" ] || echo "  FLAW F1 REPRODUCED: an old copy was put back over the newer writer"; echo "  Verify: $(ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1)"
echo "== OLD S13 (F2, F15): writer hand-edited before install; Verify already says PROBLEM; install, EDIT"
L=$W/s13; mk $L; sed -i "s/'LLM-10','BOTS'/'LLM-10','LLM-09','BOTS'/" $L/Write-VtesStatus.ps1; echo "  Verify before: $(ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1)"; INS -LiveDir $L > $W/s13.out; echo "  INSTALL exit code: $? ; last line: $(tail -1 $W/s13.out | cut -c1-100)"; grep -c PROBLEM $W/s13.out | sed 's/^/  PROBLEM lines printed by INSTALL (its own Verify run): /'
EDT $L >/dev/null; echo "  Verify after EDIT: $(ps $L/Verify-VtesPanel.ps1 -Dir $L | tail -1)"
echo "== OLD S6b (F5): symlink into a git checkout"
P=$W/s6b; mkdir -p $P/repo/tools; mk $P/repo/tools/vtes-panel; git -C $P/repo init -q; git -C $P/repo add -A >/dev/null 2>&1; git -C $P/repo -c user.email=a@b -c user.name=t commit -qm x; ln -s $P/repo/tools/vtes-panel $P/link
INS -LiveDir $P/link | head -3 | cut -c1-120; echo "  git status of the checkout:"; git -C $P/repo status --short | head -4 | sed 's/^/    /'; echo "    ($(git -C $P/repo status --short | wc -l) entries)"
echo "== OLD S10 (F6): CRLF manifest;  S11: manifest with a byte-order mark"
L=$W/s10; mk $L; sed -i 's/$/\r/' $L/MANIFEST.sha256; snap $L $W/s10.a; INS -LiveDir $L >/dev/null; ROL $L | grep -E "NOTE|rolled" | cut -c1-140; snap $L $W/s10.b; diffs $W/s10.a $W/s10.b; echo "    .pre-v4 files left: $(find $L -name '*.pre-v4' | wc -l)"
L=$W/s11; mk $L; printf '\xef\xbb\xbf' | cat - $L/MANIFEST.sha256 > $W/m.tmp; cp $W/m.tmp $L/MANIFEST.sha256; snap $L $W/s11.a; INS -LiveDir $L >/dev/null; ROL $L >/dev/null; snap $L $W/s11.b; diffs $W/s11.a $W/s11.b
echo "== OLD S4 (F7): install, EDIT, Verify (the documented proof step), rollback"
L=$W/s4; mk $L; snap $L $W/s4.a; INS -LiveDir $L >/dev/null; EDT $L >/dev/null; ps $L/Verify-VtesPanel.ps1 -Dir $L >/dev/null; ROL $L | tail -2 | cut -c1-170; snap $L $W/s4.b; diffs $W/s4.a $W/s4.b; echo "    .pre-v4 files left: $(find $L -name '*.pre-v4' | wc -l)"
echo "== OLD S12 (F14): empty data and _Rollback folders existed before"
L=$W/s12; mk $L; rm -rf "${L:?}/data" "${L:?}/_Rollback"; mkdir -p $L/data $L/_Rollback; snap $L $W/s12.a; INS -LiveDir $L >/dev/null; ROL $L >/dev/null; snap $L $W/s12.b; diffs $W/s12.a $W/s12.b
