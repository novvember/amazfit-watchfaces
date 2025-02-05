#!/bin/bash

# Script for processing ZAB archives with target directory parameter
# Usage: ./process_zab.sh /path/to/target_folder

# Check for required utilities
command -v unzip >/dev/null 2>&1 || {
  echo "× Error: unzip utility is required";
  exit 1;
}

# Validate input parameter
if [ $# -eq 0 ]; then
  echo "× Usage: $0 /path/to/target_folder"
  exit 1
fi

target_dir="$1"

# Check if target directory exists
if [ ! -d "$target_dir" ]; then
  echo "× Error: directory $target_dir does not exist"
  exit 1
fi

# Navigate to target directory
cd "$target_dir" || {
  echo "× Error: failed to enter directory $target_dir";
  exit 1;
}

# Find first ZAB file in directory
zab_file=$(ls *.zab 2>/dev/null | head -n 1)

# Check if ZAB file was found
if [ -z "$zab_file" ]; then
  echo "× Error: no ZAB file found in $target_dir"
  exit 1
fi

echo "✓ Found file: $zab_file"

# Create temporary directory for extraction
tmp_dir=$(mktemp -d -t zab_processing_XXXXXX)

# Extract ZAB archive
unzip -q "$zab_file" -d "$tmp_dir" || {
  echo "× Error extracting ZAB archive";
  rm -rf "$tmp_dir";
  exit 1;
}

# Process each ZPK file
find "$tmp_dir" -type f -name "*.zpk" | while read -r zpk_file; do
  # Get base filenames
  zab_base=$(basename "$zab_file" .zab)
  zpk_base=$(basename "$zpk_file" .zpk)
  
  # Create temporary directory for ZPK processing
  zpk_tmp=$(mktemp -d)
  
  # Extract ZPK archive
  unzip -q "$zpk_file" -d "$zpk_tmp" || {
    echo "× Error extracting $zpk_file";
    rm -rf "$zpk_tmp";
    continue;
  }
  
  # Find device.zip in extracted files
  device_zip=$(find "$zpk_tmp" -type f -name "device.zip" | head -n 1)
  
  if [ -n "$device_zip" ]; then
    # Generate new filename
    new_name="${zab_base}-${zpk_base}.zip"
    
    # Copy and rename the file
    cp "$device_zip" "./${new_name}" && echo "✓ Created file: ${new_name}"
  else
    echo "× Error: device.zip not found in $zpk_file"
  fi
  
  # Cleanup ZPK temporary files
  rm -rf "$zpk_tmp"
done

# Remove ZAB temporary directory
rm -rf "$tmp_dir"

echo "Processing complete! Results in directory: $target_dir"
