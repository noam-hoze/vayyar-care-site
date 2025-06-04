#!/bin/bash

# Check if input file is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 input.mov"
  exit 1
fi

INPUT=$1

# Convert video with original size
# ffmpeg -i "$INPUT" -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output_vid.mp4

# Convert video with 960px width
ffmpeg -i "$INPUT" -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_vid_960_new_new.mp4 