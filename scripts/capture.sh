#!/usr/bin/env bash
set -euo pipefail
REVISION="${1:-0}"
CHECKPOINT="${2:-A_NORMAL}"
OUTPUT="${3:-/tmp/heliocide-r${REVISION}-${CHECKPOINT}.png}"
exec env HELIOCIDE_CDP_PORT="${HELIOCIDE_CDP_PORT:-9227}" node scripts/cdp-capture.mjs "$REVISION" "$CHECKPOINT" "$OUTPUT"
