#!/usr/bin/env bash
set -euo pipefail
out="$(mktemp /tmp/heliocide-smoke-XXXXXX.png)"
trap 'rm -f "$out"' EXIT
node scripts/cdp-capture.mjs 0 A_NORMAL "$out" >/tmp/heliocide-smoke.json
node -e 'const r=JSON.parse(require("fs").readFileSync("/tmp/heliocide-smoke.json","utf8")); if(r.document?.runtimeOk!=="true"||r.consoleErrors?.length) process.exit(1); console.log("browser smoke PASS",r.document.phase,r.metrics.frames)'
