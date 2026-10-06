#!/bin/bash
# run-all-r4.sh <pwsh-dir> <scratch-dir> : builds the package, then runs every test of fix round 4 and writes every result file. TRK-2026-9910-B
HERE=$(cd "$(dirname "$0")" && pwd); PWD_DIR=${1:?pwsh dir}; W=${2:?scratch}; cd "$HERE"; mkdir -p "$W"
node build-v5.js
node test-v5-click.js test-v5-click-RESULT.json | tail -1
node test-v5-worlds.js test-v5-worlds-RESULT.json | tail -1
node test-v3-survives.js test-v3-survives-RESULT.json | tail -1
node test-v3-before.js test-v3-before-RESULT.json | tail -1
node test-v3-packets.js test-v3-packets-RESULT.json | tail -1
node test-fixes-r4.js test-fixes-r4-AFTER-RESULT.json | tail -1
bash test-verify.sh "$PWD_DIR" "$W/verify" > test-verify-RESULT.txt 2>&1; tail -1 test-verify-RESULT.txt
bash test-install-command.sh "$PWD_DIR" "$W/instcmd" > test-install-command-RESULT.txt 2>&1; sed -i 's/\x1b\[[0-9;]*m//g' test-install-command-RESULT.txt; tail -1 test-install-command-RESULT.txt
bash run-mutations.sh "$W/mut" > mutation-RESULT.txt 2>&1; cat mutation-RESULT.txt
