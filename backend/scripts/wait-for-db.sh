#!/bin/sh

set -e

# Load variables from .env if the file exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

HOST="${DB_HOST:-db}"
PORT="${DB_PORT:-5432}"
MAX_RETRIES=10
RETRY_COUNT=0

echo "Waiting for the database at ${HOST}:${PORT}..."

while ! nc -z "$HOST" "$PORT"; do
  RETRY_COUNT=$((RETRY_COUNT+1))
  
  if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
    echo "Database not available after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi

  echo "Database not available yet at ${HOST}:${PORT}, retrying in 3 seconds... (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep 3
done

echo "Database is available!"
