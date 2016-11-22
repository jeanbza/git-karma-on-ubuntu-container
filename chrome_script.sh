#!/usr/bin/env bash
set -ex

echo "Starting"
URL_TO_NAVIGATE=$1
SESSION_ID=`curl -XPOST http://127.0.0.1:9515/session -d '{"desiredCapabilities": {"chromeOptions": {"args": ["disable-gpu", "no-sandbox"]}}}' | jq '.sessionId' --raw-output`
echo "Session ID is $SESSION_ID"
curl -XPOST "http://127.0.0.1:9515/session/$SESSION_ID/url" -d "{\"url\": \"$URL_TO_NAVIGATE\"}"
echo "Done"