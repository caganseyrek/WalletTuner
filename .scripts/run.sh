#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./run.sh <dev | build | preview>"
  exit 1
fi

if [ "$1" = "dev" ] || [ "$1" = "build" ] || [ "$1" = "preview" ]; then
  pnpm concurrently -k \
    -n "client,server" \
    -c "bgBlue.bold,bgGreen.bold" \
    "pnpm --filter ../client $1" \
    "pnpm --filter ../server $1"
else
  echo "Usage: ./run.sh <dev | build | preview>"
  exit 1
fi
