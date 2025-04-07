#!/bin/bash

# Check if input file is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 input.mov"
  exit 1
fi

INPUT=$1
OUTPUT="${INPUT%.*}.mp4"

# Convert MOV to MP4
ffmpeg -i "$INPUT" -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 192k "$OUTPUT" 