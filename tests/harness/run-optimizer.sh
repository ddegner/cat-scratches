#!/bin/bash
# Supervised optimizer loop. Headless `claude -p` sessions stall on long chained
# workflows, so this keeps each session SHORT (5 patches) and owns the slow,
# stall-prone evidence+mine step itself. Per session:
#   1. regenerate evidence + mined candidates (plain node, cannot stall)
#   2. run one Haiku session (propose/apply only) with a wall-clock timeout
#   3. stop when a session adds no new ledger entries (queue dry / stuck)
#
# Usage: ./run-optimizer.sh [max_sessions] [session_timeout_seconds]

set -u
cd "$(dirname "$0")/../.."
HARNESS="tests/harness"
LEDGER="tests/corpus/experiments.jsonl"
MAX_SESSIONS="${1:-8}"
SESSION_TIMEOUT="${2:-1200}"   # 20 min; sessions do only fast ops so this is slack

count() { wc -l < "$LEDGER" | tr -d ' '; }
kill_session() { pkill -f "claude --model haiku" 2>/dev/null; pkill -f "max-old-space-size=8192" 2>/dev/null; }

trap 'echo "[supervisor] interrupted — cleaning up"; kill_session; exit 130' INT TERM

for s in $(seq 1 "$MAX_SESSIONS"); do
  before=$(count)
  # Re-pin the baseline FIRST. A prior session's timeout-kill can land between
  # apply-defaults and its write-baseline, leaving defaults.js and the baseline
  # inconsistent (stale-baseline). Re-pinning here guarantees a clean baseline
  # before the model runs, so sessions don't burn proposals recovering from it.
  echo "[supervisor] session $s/$MAX_SESSIONS: re-pinning baseline…"
  node --max-old-space-size=8192 "$HARNESS/evaluate.mjs" --write-baseline --quiet >/dev/null 2>&1
  echo "[supervisor] session $s/$MAX_SESSIONS: regenerating evidence + candidates…"
  node --max-old-space-size=8192 "$HARNESS/evaluate.mjs" --evidence --set all --quiet >/dev/null 2>&1
  node --max-old-space-size=8192 "$HARNESS/mine-evidence.mjs" >/dev/null 2>&1
  echo "[supervisor] session $s start (ledger $before)"

  claude --model haiku --permission-mode acceptEdits \
    -p "$(cat "$HARNESS/optimizer-session-prompt.txt")" > "/tmp/opt-session-$s.log" 2>&1 &
  pid=$!

  waited=0
  while kill -0 "$pid" 2>/dev/null; do
    sleep 15; waited=$((waited + 15))
    if [ "$waited" -ge "$SESSION_TIMEOUT" ]; then
      echo "[supervisor] session $s hit ${SESSION_TIMEOUT}s timeout — killing"
      kill_session
      break
    fi
  done
  wait "$pid" 2>/dev/null

  after=$(count)
  echo "[supervisor] session $s end (ledger $before -> $after)"
  if [ "$after" -le "$before" ]; then
    echo "[supervisor] no ledger progress this session — stopping."
    break
  fi
done

echo "[supervisor] finished. final ledger: $(count)"
