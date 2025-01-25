#!/bin/bash

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

ROOT_PATH="$SCRIPT_DIR/.."
CLIENT_PATH="$SCRIPT_DIR/client"
SERVER_PATH="$SCRIPT_DIR/server"

echo "Info: Running frontend tests..."

cd "$CLIENT_PATH"
pnpm test

echo "Info: Completed frontend tests."

echo "---"

echo "Info: Running server tests..."

cd "$SERVER_PATH"
pnpm test

echo "Info: Completed server tests."