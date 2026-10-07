#!/bin/bash
# run-all-r9.sh <pwsh-dir> <scratch-dir> : runs EVERY test of every round on the package as it is (fix round 9) and writes every result file. TRK-2026-9910-B
# NOTE: the package is NOT rebuilt here (build-v5.js stamps the real build instant into the page, which changes the manifest hash INSTALL-BY-HAND.md carries). Run `node build-v5.js && node stamp-hashes.js` once, then this.
# Retired in round 9 (see FIX-ROUND-9.md, older tests that changed): test-claims-r8.js (replaced by test-claims-r9.js: its sentences were picked by topic keywords), check-xrefs-r6.js and check-xrefs-r7.js (replaced by check-xrefs-r9.js: the documents they read were cut down), check-docs-agree.js (replaced by check-docs-agree-r9.js).
HERE=$(cd "$(dirname "$0")" && pwd); PWD_DIR=${1:?pwsh dir}; W=${2:?scratch}; VW=${VERIFY_WORK:-/tmp/v5nobody-work}; cd "$HERE"; mkdir -p "$W"; export PWSH_DIR="$PWD_DIR"
JOBS=$W/jobs.txt; : > $JOBS
add() { echo "$1" >> $JOBS; }
add "node test-v5-click.js test-v5-click-RESULT.json"
add "node test-v5-worlds.js test-v5-worlds-RESULT.json"
add "node test-v3-survives.js test-v3-survives-RESULT.json"
add "node test-v3-before.js test-v3-before-RESULT.json"
add "node test-v3-packets.js test-v3-packets-RESULT.json"
add "node test-fixes-r4.js test-fixes-r4-AFTER-RESULT.json"
add "node test-fixes-r5.js test-fixes-r5-AFTER-RESULT.json"
add "node test-fixes-r6.js test-fixes-r6-RESULT.json"
add "node test-survival-92-r6.js test-survival-92-r6-RESULT.json"
add "node test-invariant-r6.js test-invariant-r6-RESULT.json"
add "node test-pii-unit-r6.js test-pii-unit-r6-RESULT.json"
add "node test-frozen-r7.js test-frozen-r7-RESULT.json"
add "node test-watchdog-r7.js test-watchdog-r7-RESULT.json"
add "node test-pii-unit-r7.js test-pii-unit-r7-RESULT.json"
add "node test-words-r7.js test-words-r7-RESULT.json"
add "node test-pii-unit-r8.js test-pii-unit-r8-RESULT.json"
add "node test-state-text-r8.js test-state-text-r8-RESULT.json"
add "node test-edge-r8.js test-edge-r8-RESULT.json"
add "node test-pii-unit-r9.js test-pii-unit-r9-RESULT.json"
add "node test-fixes-r9.js test-fixes-r9-RESULT.json"
add "node test-quotematch-r9.js test-quotematch-r9-RESULT.json"
add "node test-claims-r9.js test-claims-r9-RESULT.json"
add "node test-privacy-matrix-r6.js test-privacy-matrix-r6-RESULT.json"
add "node test-privacy-matrix-r7.js test-privacy-matrix-r7-RESULT.json"
add "node test-privacy-matrix-r8.js test-privacy-matrix-r8-RESULT.json"
add "node test-privacy-matrix-r9.js test-privacy-matrix-r9-RESULT.json"
add "env WORKERS=3 node test-fuzz-r7.js all test-fuzz-r7-RESULT.json"
cat $JOBS | xargs -P ${PAR:-3} -I{} bash -c 'n=$(echo "{}" | sed "s/^env [A-Z=0-9]* //" | cut -d" " -f2); {} > "'$W'/$n.log" 2>&1; echo "$n: $(tail -1 "'$W'/$n.log" | cut -c1-200)"'
node test-no-write-commands.js | tail -1
node check-xrefs-r9.js | tail -1
bash test-verify.sh "$PWD_DIR" "$VW" > test-verify-r8-RESULT.txt 2>&1; tail -2 test-verify-r8-RESULT.txt; rm -rf "$VW"
bash test-verify-r9.sh "$PWD_DIR" "$W/vw9" > test-verify-r9-RESULT.txt 2>&1; tail -2 test-verify-r9-RESULT.txt
bash run-mutations.sh "$W/mut" > mutation-RESULT.txt 2>&1; cat mutation-RESULT.txt
