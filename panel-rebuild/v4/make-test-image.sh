#!/bin/sh
# make-test-image.sh <outdir> : assembles what the PC folder will look like after INSTALL-v4:
# the unchanged v3 pages from tools/vtes-panel (branch executor-tray-icon-1cazza) + the v4 files on top.
set -e
OUT="$1"; HERE="$(cd "$(dirname "$0")" && pwd)"; rm -rf "$OUT"; mkdir -p "$OUT"
git -C "$HERE/../.." archive origin/claude/executor-tray-icon-1cazza tools/vtes-panel | tar -x -C "$OUT" --strip-components=2
cp "$HERE"/VTES-LLM-LAUNCHER_v4.html "$HERE"/vtes4-*.js "$OUT"/
mkdir -p "$OUT/data" && cp "$HERE"/data/*.js "$OUT/data/"
