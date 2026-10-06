#!/bin/bash
# run-mutations.sh - proves the tests can FAIL: breaks the live layer in five ways on a scratch copy and runs the data-world tests against each; each must report failures. TRK-2026-9910-B
HERE=$(cd "$(dirname "$0")" && pwd); W=${1:?scratch dir}; rm -rf "$W"; mkdir -p "$W"
mut() { local name=$1 file=$2 from=$3 to=$4; local d=$W/$name; mkdir -p "$d"; cp -a "$HERE"/. "$d"/; python3 - "$d/$file" "$from" "$to" <<'PY'
import sys
p,a,b=sys.argv[1:4]; s=open(p).read()
if a not in s: print('MUTATION TEXT NOT FOUND'); sys.exit(3)
open(p,'w').write(s.replace(a,b,1))
PY
  [ $? -eq 0 ] || { echo "$name: could not apply"; return; }
  local out; out=$(PKG=$d node "$HERE/test-v5-worlds.js" "$W/$name.json" 2>&1 | tail -1); echo "$name: $out"; }
mut M1-future-dates-trusted vtes5-live.js "function isFuture(d) { return (d - NOW()) / 60000 > FUTURE_GRACE_MIN; }" "function isFuture(d) { return false; }"
mut M2-writer-counts-as-proof vtes5-live.js "return { state: 'UNPROVEN', text: 'WRITER SAYS UP" "return { state: 'OK', text: 'WRITER SAYS UP"
mut M3-fixed-15-minute-limit vtes5-live.js "return Math.min(Math.max(3 * sec / 60, MIN_LIMIT_MIN), MAX_LIMIT_MIN);" "return 15;"
mut M4-late-bot-still-green vtes5-live.js "if ((NOW() - run) / 60000 > 3 * iv / 60) {" "if (false) {"
mut M5-vtes-link-always vtes5-ui.js "if (V.schemeRegistered() && V.addressFilled(w.id)) {" "if (true) {"
