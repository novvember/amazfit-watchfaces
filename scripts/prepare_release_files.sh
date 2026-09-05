#!/usr/bin/env bash
set -euo pipefail

# Extract device ZIP files from exactly one freshly built ZAB archive.
command -v unzip >/dev/null || { echo "unzip is required" >&2; exit 1; }
if [ "$#" -ne 1 ] || [ ! -d "$1" ]; then
  echo "Usage: $0 <dist-directory>" >&2
  exit 1
fi
cd "$1"
shopt -s nullglob
archives=(*.zab)
if [ "${#archives[@]}" -ne 1 ]; then
  echo "Expected exactly one ZAB archive" >&2
  exit 1
fi

zab_file="${archives[0]}"
tmp_dir=$(mktemp -d)
trap 'rm -rf -- "$tmp_dir"' EXIT
unzip -q "./$zab_file" -d "$tmp_dir/zab"
count=0
while IFS= read -r -d '' zpk_file; do
  zpk_base=$(basename "$zpk_file" .zpk)
  zpk_tmp="$tmp_dir/zpk-$count"
  unzip -q "$zpk_file" -d "$zpk_tmp"
  mapfile -d '' device_zips < <(find "$zpk_tmp" -type f -name device.zip -print0)
  if [ "${#device_zips[@]}" -ne 1 ]; then
    echo "Expected exactly one device.zip in $zpk_file" >&2
    exit 1
  fi
  new_name="${zab_file%.zab}-${zpk_base}.zip"
  cp -- "${device_zips[0]}" "./$new_name"
  echo "Created $new_name"
  count=$((count + 1))
done < <(find "$tmp_dir/zab" -type f -name '*.zpk' -print0)

if [ "$count" -eq 0 ]; then
  echo "No ZPK packages found in $zab_file" >&2
  exit 1
fi
echo "Prepared $count device ZIP files."
