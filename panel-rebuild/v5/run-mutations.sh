#!/bin/bash
# run-mutations.sh - proves the tests can FAIL: breaks the live layer in ten ways on a scratch copy and runs the matching test against each; each must report failures. TRK-2026-9910-B
HERE=$(cd "$(dirname "$0")" && pwd); W=${1:?scratch dir}; rm -rf "$W"; mkdir -p "$W"
mut() { local name=$1 test=$2 file=$3 from=$4 to=$5; local d=$W/$name; mkdir -p "$d"; cp -a "$HERE"/. "$d"/; python3 - "$d/package/$file" "$from" "$to" <<'PY'
import sys
p,a,b=sys.argv[1:4]; s=open(p).read()
if a not in s: print('MUTATION TEXT NOT FOUND'); sys.exit(3)
open(p,'w').write(s.replace(a,b,1))
PY
  [ $? -eq 0 ] || { echo "$name: could not apply"; return; }
  local out; out=$(PKG=$d/package node "$HERE/$test.js" "$W/$name.json" 2>&1 | tail -1); echo "$name: $out"; }
mut M1-future-dates-trusted test-v5-worlds vtes5-live.js "function isFuture(d) { return (d - NOW()) / 60000 > FUTURE_GRACE_MIN; }" "function isFuture(d) { return false; }"
mut M2-writer-counts-as-proof test-v5-worlds vtes5-live.js "return { state: 'UNPROVEN', text: 'WRITER SAYS UP" "return { state: 'OK', text: 'WRITER SAYS UP"
mut M3-fixed-15-minute-limit test-v5-worlds vtes5-live.js "return Math.min(Math.max(3 * sec / 60, MIN_LIMIT_MIN), MAX_LIMIT_MIN);" "return 15;"
mut M4-late-bot-still-green test-v5-worlds vtes5-live.js "if ((NOW() - run) / 1000 > BOT_LATE_FACTOR * iv) {" "if (false) {"
mut M5-vtes-link-always test-v5-worlds vtes5-ui.js "if (V.schemeRegistered() && V.addressFilled(w.id)) {" "if (true) {"
mut M6-267009-is-failed test-fixes-r4 vtes5-live.js "if (b.last_result === RES_RUNNING) {" "if (false) {"
mut M7-housekeeping-green-when-fresh test-fixes-r4 vtes5-live.js "if (d.report_delivered === false) {" "if (false) {"
mut M8-daily-bot-capped-at-an-hour test-fixes-r4 vtes5-live.js "var MAX_BOT_SEC = 7 * 24 * 3600;" "var MAX_BOT_SEC = 3600;"
mut M9-two-answers-on-a-card test-fixes-r4 vtes5-ui.js "var cs = m.bot ? comboState(m) :" "var cs = false ? comboState(m) :"
mut M10-search-reads-state-lines test-fixes-r4 vtes5-ui.js "c.setAttribute('data-s', t3[gi][i]" "c.setAttribute('data-x', t3[gi][i]"
