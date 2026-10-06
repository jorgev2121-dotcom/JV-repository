#!/bin/bash
# run-all-r7.sh <pwsh-dir> <scratch-dir> : runs every test (on the package as it is) of fix round 7 (all older suites plus the round-7 ones) and writes every result file. TRK-2026-9910-B
# The VERIFY scenarios run as the unprivileged user "nobody", which cannot read a scratch folder inside a private home, so VERIFY_WORK defaults to /tmp/v5nobody-work (deleted afterwards).
HERE=$(cd "$(dirname "$0")" && pwd); PWD_DIR=${1:?pwsh dir}; W=${2:?scratch}; VW=${VERIFY_WORK:-/tmp/v5nobody-work}; cd "$HERE"; mkdir -p "$W"
# NOTE: the package is NOT rebuilt here. build-v5.js stamps the real build instant into the page, so a rebuild changes the manifest hash that INSTALL-BY-HAND.md carries.
# Run `node build-v5.js && node stamp-hashes.js` once, then this.
node test-v5-click.js test-v5-click-RESULT.json | tail -1
node test-v5-worlds.js test-v5-worlds-RESULT.json | tail -1
node test-v3-survives.js test-v3-survives-RESULT.json | tail -1
node test-v3-before.js test-v3-before-RESULT.json | tail -1
node test-v3-packets.js test-v3-packets-RESULT.json | tail -1
node test-fixes-r4.js test-fixes-r4-AFTER-RESULT.json | tail -1
node test-fixes-r5.js test-fixes-r5-AFTER-RESULT.json | tail -1
node test-fixes-r6.js test-fixes-r6-RESULT.json | tail -1
node test-survival-92-r6.js test-survival-92-r6-RESULT.json | tail -1
node test-invariant-r6.js test-invariant-r6-RESULT.json | tail -1
node test-privacy-matrix-r6.js test-privacy-matrix-r6-RESULT.json | tail -1
node test-pii-unit-r6.js test-pii-unit-r6-RESULT.json | tail -1
node test-frozen-r7.js test-frozen-r7-RESULT.json | tail -1
WORKERS=${WORKERS:-5} node test-fuzz-r7.js all test-fuzz-r7-RESULT.json | tail -1
node test-watchdog-r7.js test-watchdog-r7-RESULT.json | tail -1
node test-privacy-matrix-r7.js test-privacy-matrix-r7-RESULT.json | tail -1
node test-pii-unit-r7.js test-pii-unit-r7-RESULT.json | tail -1
node test-words-r7.js test-words-r7-RESULT.json | tail -1
node check-xrefs-r7.js | tail -1
bash test-verify.sh "$PWD_DIR" "$VW" > test-verify-RESULT.txt 2>&1; tail -1 test-verify-RESULT.txt; rm -rf "$VW"
node test-no-write-commands.js | tail -1
node check-xrefs-r6.js | tail -1
bash run-mutations.sh "$W/mut" > mutation-RESULT.txt 2>&1; cat mutation-RESULT.txt
