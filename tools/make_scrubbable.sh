#!/bin/bash

# Find script directory to locate .env files at project root
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="$SCRIPT_DIR/.."

# Load .env.local if it exists
if [ -f "$ROOT_DIR/.env.local" ]; then
  # Use `set -a` to automatically export all variables defined in the file
  echo " sourcing .env.local"
  set -a
  source "$ROOT_DIR/.env.local"
  set +a
fi

# Load .env if it exists
if [ -f "$ROOT_DIR/.env" ]; then
  echo "sourcing .env"
  set -a
  source "$ROOT_DIR/.env"
  set +a
fi

### === CONFIGURATION SECTION === ###
# ACCOUNT_ID is now expected to be an environment variable
BUCKET_NAME="vayyar-care-new-site-videos"
PROFILE="r2"                               # aws-cli profile name (configured for R2)
OUTPUT_NAME="output_scrubbable.mp4"
ENDPOINT="https://$CLOUDFLARE_ACCOUNT_ID.r2.cloudflarestorage.com"
PUBLIC_URL="https://pub-b79e8d4ed1344c3d8baec84528f27e6a.r2.dev/$OUTPUT_NAME"
### ================================= ###

# === Step 0: Check for environment variable ===
if [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ Error: CLOUDFLARE_ACCOUNT_ID environment variable is not set."
    echo "   Please set it before running the script:"
    echo "   export CLOUDFLARE_ACCOUNT_ID=your-account-id"
    exit 1
fi

# === Step 1: Check for input ===
if [ $# -lt 1 ]; then
  echo "❌ Usage: $0 input.mov"
  exit 1
fi

INPUT=$1

echo "🎬 Encoding $INPUT for scrubbable playback..."

# === Step 2: Encode video for scrubbing ===
ffmpeg -i "$INPUT" \
  -vf scale=960:-1 \
  -movflags +faststart \
  -vcodec libx264 \
  -crf 20 \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p \
  -preset veryfast \
  "$OUTPUT_NAME"

if [ $? -ne 0 ]; then
  echo "❌ ffmpeg encoding failed"
  exit 1
fi

echo "✅ Encoding complete."

# === Step 3: Upload to R2 ===
echo "☁️ Uploading to Cloudflare R2..."
aws s3 cp "$OUTPUT_NAME" "s3://$BUCKET_NAME/$OUTPUT_NAME" \
  --endpoint-url "$ENDPOINT" \
  --profile "$PROFILE"

if [ $? -ne 0 ]; then
  echo "❌ Upload failed"
  exit 1
fi

echo "✅ Upload complete."

# === Step 4: Output final URL ===
echo "🌐 File URL (if bucket is public):"
echo "$PUBLIC_URL" 