#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

ROOT_PATH="$SCRIPT_DIR"
CLIENT_PATH="$SCRIPT_DIR/../client"
SERVER_PATH="$SCRIPT_DIR/../server"

pnpm concurrently -k \
  -n "client,server" \
  -c "bgBlue.bold,bgGreen.bold" \
  "cd $CLIENT_PATH && pnpm dev" \
  "cd $SERVER_PATH && pnpm dev"