#!/bin/bash
# Supervised headless adjudication. `claude -p` sessions die on transient API
# errors; each adjudicated page is atomic (expected.md + --done), so the safe
# recovery is simply to relaunch. Stops when an attempt ends with no new
# adjudications — that means the queue is done, the session reported normally,
# or something non-transient is wrong (read the log either way).
#
# Usage: ./run-adjudication.sh [max_attempts]   (default 4)

set -u
cd "$(dirname "$0")/../.."
MAX_ATTEMPTS="${1:-4}"

count() {
  python3 -c "import json; print(sum(1 for e in json.load(open('tests/corpus/review-queue.json'))['queue'] if e.get('adjudicated')))"
}

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  before=$(count)
  echo "[supervisor] attempt $attempt/$MAX_ATTEMPTS starting (adjudicated so far: $before)"
  claude --model sonnet --permission-mode acceptEdits -p "$(cat tests/harness/adjudicate-prompt.txt)"
  status=$?
  after=$(count)
  echo "[supervisor] attempt $attempt ended (exit $status, adjudicated: $before -> $after)"
  if [ "$after" -le "$before" ]; then
    echo "[supervisor] no progress this attempt — stopping."
    break
  fi
done

echo "[supervisor] finished. total adjudicated: $(count)"
