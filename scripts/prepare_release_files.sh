#!/usr/bin/env bash
set -euo pipefail

command -v python3 >/dev/null || { echo "python3 is required" >&2; exit 1; }
exec python3 "$(dirname -- "$0")/prepare_release_files.py" "$@"
