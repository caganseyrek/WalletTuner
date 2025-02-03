#!/bin/bash

NODE_VERSION="22"
NVM_SOURCE="https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh"
PNPM_SOURCE="https://get.pnpm.io/install.sh"

# Uptade and upgrade the package manager
sudo apt update
sudo apt upgrade

# NVM AND NODE
echo "Info: Installing Node Version Manager..."

curl -o- "$NVM_SOURCE" | bash
nvm install "$NODE_VERSION"

echo "Info: Succesfully installed Node Version Manager."

# PNPM
echo "Info: Installing pnpm..."

curl -fsSL "$PNPM_SOURCE"| sh -

echo "Info: Successfully installed pnpm."
