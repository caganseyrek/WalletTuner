#!/bin/bash

if [ -z "$1" ] || ! [[ "$1" =~ ^(dev|build|preview)$ ]]; then
  echo "Usage: ./run.sh <dev | build | preview>"
  exit 1
fi

pnpm concurrently -k \
  -n "client,server" \
  -c "bgBlue.bold,bgGreen.bold" \
  "pnpm --filter {client} $1" \
  "pnpm --filter {server} $1"
