#!/bin/bash

is_randombytes_available=0
is_openssl_available=0

USAGE_PARAMS=""
RANDOMBYTES_PATH="../node_modules/randombytes" # Relative path

print_info() {
  echo -e "\n"
  echo -e "\e[34mThere are three secrets required for;\e[0m"
  echo -e "\e[35m> refresh token\n> access token\n> the cookie that holds the refresh token\e[0m\n"
  echo -e "\e[34mYou can copy the generated values from the console into the .env file.\e[0m"
}

use_openssl() {
  echo -e "\n> Generating random strings for secrets using openssl library.\n> (https://github.com/openssl/openssl)\n"
  openssl rand -base64 64
  openssl rand -base64 64
  openssl rand -base64 64
  echo -e "\n"
}

use_randombytes() {
  echo -e "\n> Generating random strings for secrets using randomBytes library.\n> (https://github.com/browserify/randombytes)\n"
  node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
  node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
  node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
  echo -e "\n"
}

# Check if randombytes library is available
if command -v node &> /dev/null && [ -d "$RANDOMBYTES_PATH" ]; then
  is_randombytes_available=1
fi 

# Check if openssl library is available
if command -v openssl &> /dev/null; then
  is_openssl_available=1
fi

if [ "$is_openssl_available" -eq 1 ] || [ "$is_randombytes_available" -eq 1 ]; then
  if [ "$is_openssl_available" -eq 1 ]; then
    USAGE_PARAMS+="openssl"
  fi

  if [ "$is_randombytes_available" -eq 1 ]; then
    [ -n "$USAGE_PARAMS" ] && USAGE_PARAMS+=" | "
    USAGE_PARAMS+="randombytes"
  fi

  if [ -z "$1" ]; then
    echo "Usage: ./get_secrets.sh <$USAGE_PARAMS>"
    exit 1
  fi

  print_info

  if [ "$1" = "openssl" ] && [ "$is_openssl_available" -eq 1 ]; then
    use_openssl
  elif [ "$1" = "randombytes" ] && [ "$is_randombytes_available" -eq 1 ]; then
    use_randombytes
  else
    echo -e "\e[31mInvalid parameter: $1\e[0m"
    echo "Usage: ./get_secrets.sh <$USAGE_PARAMS>"
    exit 1
  fi
else
  echo -e "\e[31mYou need either openssl or randombytes to use this script.\e[0m"
  echo -e "\n> (https://github.com/openssl/openssl)\n> (https://github.com/browserify/randombytes)"
  exit 1
fi
