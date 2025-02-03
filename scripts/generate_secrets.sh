#!/bin/bash

echo ""
echo "[INFO] Generating random strings for secrets using openssl library."
echo "(https://github.com/openssl/openssl)"
echo ""

openssl rand -base64 64
openssl rand -base64 64
openssl rand -base64 64

echo ""