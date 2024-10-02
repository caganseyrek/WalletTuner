# WalletTuner

Flexible personal finance tracking app

## Running Locally

### Setting Up the Project

1. First, clone the repository.

   ```bash
   git clone https://github.com/caganseyrek/WalletTuner.git
   cd path/to/WalletTuner
   ```

2. Then, you can run the `setup` script.

   First, the script will download the required packages so you don't need to run `pnpm i` seperately.

   Then, the script will check for .env files and set up the necessary .env files for both client and server with empty variables.

   ```bash
   ./.scripts/setup.sh
   ```

3. **Setup environment variables**

   After running the `setup` script, you need to add all the environment variables into both client and server folders.

   Client's .env file include variety of variables such as database uri and password, but server's .env file only needs strings of random characters for secrets. You can generate secrets for server's .env file by running the `generate_secrets` script.

   ```bash
   ./server/config/generate_secrets.sh
   ```

### Starting the Project

After setting everything up, you can start the project by running the `run` script.

```bash
./.scripts/run.sh (dev | build | preview)
```

## Documentation

You can find the documentation on how to use the app and details about how it works at ~~https://caganseyrek.com/projects/WalletTuner/docs~~
