#!/bin/bash
# run-mutations.sh - proves the tests can FAIL: breaks the live layer in twenty-six ways (M1-M10 from round 4, M11-M18 added in round 5, M19-M26 added in round 6; M12, M13, M15, M17 and M18 were re-pointed at the round-6 code) on a scratch copy and runs the matching test against each; each must report failures. TRK-2026-9910-B
HERE=$(cd "$(dirname "$0")" && pwd); W=${1:?scratch dir}; rm -rf "$W"; mkdir -p "$W"
mut() { local name=$1 test=$2 file=$3 from=$4 to=$5; local d=$W/$name; mkdir -p "$d"; cp -a "$HERE"/. "$d"/; python3 - "$d/package/$file" "$from" "$to" <<'PY'
import sys
p,a,b=sys.argv[1:4]; s=open(p).read()
if a not in s: print('MUTATION TEXT NOT FOUND'); sys.exit(3)
open(p,'w').write(s.replace(a,b,1))
PY
  [ $? -eq 0 ] || { echo "$name: could not apply"; return; }
  local out; out=$(PKG=$d/package node "$HERE/$test.js" "$W/$name.json" 2>&1 | tail -1); echo "$name: $out" > "$W/$name.line"; }
mut M1-future-dates-trusted test-v5-worlds vtes5-live.js "function isFuture(d) { return (d - NOW()) / 60000 > FUTURE_GRACE_MIN; }" "function isFuture(d) { return false; }" &
mut M2-writer-counts-as-proof test-v5-worlds vtes5-live.js "return { state: 'UNPROVEN', text: 'WRITER SAYS UP" "return { state: 'OK', text: 'WRITER SAYS UP" &
mut M3-fixed-15-minute-limit test-v5-worlds vtes5-live.js "return Math.min(Math.max(3 * sec / 60, MIN_LIMIT_MIN), MAX_LIMIT_MIN);" "return 15;" &
mut M4-late-bot-still-green test-v5-worlds vtes5-live.js "if ((NOW() - run) / 1000 > BOT_LATE_FACTOR * iv) {" "if (false) {" &
mut M5-vtes-link-always test-v5-worlds vtes5-ui.js "if (V.schemeRegistered() && V.addressFilled(w.id)) {" "if (true) {" &
mut M6-267009-is-failed test-fixes-r4 vtes5-live.js "if (b.last_result === RES_RUNNING) {" "if (false) {" &
wait
mut M7-housekeeping-green-when-fresh test-fixes-r4 vtes5-live.js "if (d.report_delivered === false) {" "if (false) {" &
mut M8-daily-bot-capped-at-an-hour test-fixes-r4 vtes5-live.js "var MAX_BOT_SEC = 7 * 24 * 3600;" "var MAX_BOT_SEC = 3600;" &
mut M9-two-answers-on-a-card test-fixes-r4 vtes5-ui.js "cls = RANK[cb] > RANK[ce] ? cb : ce," "cls = ce," &
mut M10-search-reads-state-lines test-fixes-r4 vtes5-ui.js "c.setAttribute('data-s', t3[gi][i]" "c.setAttribute('data-x', t3[gi][i]" &
mut M11-bots-strip-ignores-failed-bots test-fixes-r5 vtes5-live.js "if (notFine.length) { return bad(" "if (false) { return bad(" &
mut M12-strip-ignores-the-cards test-invariant-r6 vtes5-ui.js "if (V.rankOf(w) > V.rankOf(baseCls)) {" "if (false) {" &
wait
mut M13-running-task-never-stuck test-fixes-r5 vtes5-live.js "if (heldMin > stuckLimit) {" "if (false) {" &
mut M14-impossible-count-green test-fixes-r5 vtes5-live.js "if (d.counted !== undefined && d.counted !== null && !isCount(d.counted, MD_TARGET)) {" "if (false) {" &
mut M15-personal-data-guard-removed test-fixes-r5 vtes5-ui.js "if (!why.length) { return note; }" "return note;" &
mut M16-tab-hint-never-shown test-fixes-r5 vtes5-ui.js "h.style.display = hidden ? 'block' : 'none';" "h.style.display = 'none';" &
mut M17-queued-is-no-data test-fixes-r5 vtes5-live.js "var waiting = (st === 'queued')," "var waiting = false," &
mut M18-old-report-time-trusted test-fixes-r5 vtes5-live.js "if ((NOW() - t) / 60000 > o.limitMin) {" "if (false) {" &
wait
mut M19-reset-time-in-the-past-trusted test-invariant-r6 vtes5-live.js "if (t <= NOW()) {" "if (false) {" &
mut M20-queued-without-a-time-never-stuck test-invariant-r6 vtes5-live.js "refAt = firstSeen(name, st + '|' + String(b.last_result), now);" "refAt = now;" &
mut M21-267010-called-failed test-invariant-r6 vtes5-live.js "if (b.last_result === RES_DISABLED) {" "if (false) {" &
mut M22-miami-check-date-ignored test-invariant-r6 vtes5-ui.js "if (!j) { return mark('ok', 'proof checked '" "if (true) { return mark('ok', 'proof checked '" &
mut M23-old-numbers-shown-plain test-invariant-r6 vtes5-ui.js "if (fresh === false) { return red('OLD ' + n, file); }" "if (false) { return red('OLD ' + n, file); }" &
mut M24-cloud-folder-accepted-for-local test-invariant-r6 vtes5-ui.js "var CLOUD_RE = /google" "var CLOUD_RE = /zzzzgoogle" &
wait
mut M25-nine-digit-rule-removed test-pii-unit-r6 vtes5-ui.js "if ((isNine && !zip4 && !permit) || inside) {" "if (false) {" &
mut M26-card-rule-removed test-pii-unit-r6 vtes5-ui.js "if (r.real >= 15 && r.real <= 19) {" "if (false) {" &
wait
cat "$W"/M*.line | sort -V
