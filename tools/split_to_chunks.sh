#!/bin/bash

# Check if input file is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 input.mov"
  exit 1
fi

INPUT=$1

# Split video to 30s chunks
ffmpeg -i "$INPUT" -f segment -segment_time 30 -c:v copy -c:a copy -reset_timestamps 1 -map 0 output-%02d.mp4