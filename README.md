# WalletTuner

Flexible personal finance tracking app

## Setting Up Locally

1. **Run the setup script**

   This script will download the required packages so you don't need to run `pnpm i`.
   After that, the script will check for .env files and will rename the .env.sample file to .env if there are any or
   will create a new .env files with empty variables if neither .env or .env.sample are found.

   ```bash
   ./.scripts/setup.sh
   ```

2. **Setup environment variables**

   After running the setup script, you need to add all the environment variables into both client and server folders.
   Client's .env file include variety of variables such as database uri and password, but server's .env file only needs strings of random characters for secrets. You can generate secrets for server's .env file by running the generate_secrets script.

   ```bash
   ./server/config/generate_secrets.sh
   ```

3. **Start the project**

   After setting everything up, you can start the project by running the run script.

   ```bash
   ./.scripts/run.sh (dev | build | preview)
   ```
