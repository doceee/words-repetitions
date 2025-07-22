#!/bin/sh

set -e
set -u

if [ ! -x ./wait-for-db.sh ]; then
  echo "Error: ./wait-for-db.sh not found or not executable."
  exit 1
fi

./wait-for-db.sh

npx prisma migrate status --schema=./prisma/schema.prisma

if npx prisma migrate status --schema=./prisma/schema.prisma | grep -q "Database schema is up to date!"; then
  echo "No pending migrations. Database schema is up to date!"
else
  echo "Running pending migrations..."
  npx prisma migrate deploy
fi

SEED_MODE=prod node dist/scripts/seed/seed.js

if [ ! -f dist/main.js ]; then
  echo "Error: dist/main.js not found."
  exit 1
fi

exec node dist/main.js
