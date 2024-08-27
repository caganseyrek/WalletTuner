#!/bin/bash
# "./setup help" for description about the usage.

SCRIPT_DIR="$(dirname "$(realpath "$0")")"

ROOT_PATH="$SCRIPT_DIR/.."
CLIENT_PATH="$SCRIPT_DIR/../client"
SERVER_PATH="$SCRIPT_DIR/../server"

install_dependencies() {
  local path="$1"
  local description

  if [ "$path" = "$CLIENT_PATH" ]; then
    description="client"
  elif [ "$path" = "$SERVER_PATH" ]; then
    description="server"
  else
    exit_with_error "Unknown path: $path"
  fi

  if [ -d "$path/node_modules" ]; then
    echo -e "\nDeleting existing node_modules in project root"
    rm -rf "$path/node_modules" || { exit_with_error "Failed to delete node_modules in $description. Stopping..."; }
  fi

  echo -e "\nInstalling dependencies into $description."
  cd "$path" || { exit_with_error "Failed to change directory to $description. Stopping..."; }
  pnpm install || { exit_with_error "Failed to install dependencies into $description. Stopping..."; }
}

check_env_files() {
  local path="$1"
  local env_file="$path/.env"
  local sample_file="$path/.env.sample"
  local description

  if [ "$path" = "$CLIENT_PATH" ]; then
    description="client"
  elif [ "$path" = "$SERVER_PATH" ]; then
    description="server"
  else
    exit_with_error "Unknown path: $path"
  fi

  if [ ! -f "$env_file" ]; then
    if [ -f "$sample_file" ]; then
      echo "Sample .env found in $description. Renaming the sample file..."
      mv "$sample_file" "$env_file"
      if [ -f "$env_file" ]; then
        echo "Successfully renamed sample .env file in $description. Now you can add variables."
        exit 0 # Stop the further checks because .env file is newly created and is empty
      else 
        exit_with_error "Failed to rename sample .env file in $description. Stopping..."
      fi
    else
      echo "Cannot find .env file in $description. Creating a new one..."
      if [ "$path" = "$CLIENT_PATH" ]; then
        echo -e "VITE_APP_BACKEND_URL=""\nVITE_APP_TOKEN_ENDPOINT=""\nVITE_APP_IS_DEV=""" > "$env_file"
      elif [ "$path" = "$SERVER_PATH" ]; then
        echo -e "PORT=""\n\nJWT_REFRESH_SECRET=""\nJWT_ACCESS_SECRET=""\nCOOKIE_SECRET=""\n\nIS_DEV=""\nDEV_LOCALHOST=""\n\nFRONTEND_URL=""\n\nDATABASE_URI_1=""\nDATABASE_URI_2=""" > "$env_file"
      fi
      if [ -f "$env_file" ]; then
        echo "Successfully created a new .env file in $description. Now you can add variables."
        exit 0 # Stop the further checks because .env file is newly created and is empty
      else
        exit_with_error "Failed to created a new .env file in $description. Stopping..."
      fi
    fi
  else
    echo ".env file is present in $description. Skipping content checks..."
    
    while IFS="=" read -r key value; do
      if [[ -z "$key" || "" =~ ^\s*# || "$value" =~ ^\s*$ ]]; then
        continue
      fi
      if [ -z "$value" ]; then
        exit_with_error "'$key' variable is empty in $description's .env file. Stopping..."
      fi
    done < "$env_file"

    echo "$description's .env file passed content checks."
  fi
}

show_usage() {
  echo "Usage: ./setup.sh [skip_install | help]"
  echo -e "\n1.The script deletes existing node_modules if there are any."
  echo "  Then installs the node_modules in project root, client and server."
  echo -e "\n2.The script checks if .env files exists in client and server folders."
  echo "  It renames the .env.sample file to .env if there are any."
  echo "  It creates new .env files with empty variables if neither .env or .env.sample are found."
  echo "  Checks .env files exists, it checks for empty variables."
  echo -e "\n[skip_install] (optional)"
  echo "> Skips the installation of node_modules."
  echo -e "\n[help] (optional)"
  echo "> Shows this description."
}

exit_with_error() {
  echo "$1"
  exit 1
}

if ! command -v pnpm &> /dev/null; then
  exit_with_error "pnpm is needed for the project. Please install it before running this script."
fi

if [ "$1" != "skip_install" ] && [ "$1" != "help" ]; then
  install_dependencies "$ROOT_PATH"
  install_dependencies "$CLIENT_PATH"
  install_dependencies "$SERVER_PATH"
elif [ "$1" = "help" ]; then
  show_usage
  exit 0
fi

check_env_files "$CLIENT_PATH"
check_env_files "$SERVER_PATH"

echo -e "\nSetups are complete. Now you can run the project with './run.sh <dev | build | preview>'"
