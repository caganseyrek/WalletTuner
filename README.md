# WalletTuner

![GitHub License](https://img.shields.io/github/license/caganseyrek/WalletTuner)
![GitHub repo size](https://img.shields.io/github/repo-size/caganseyrek/WalletTuner)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/caganseyrek/WalletTuner)

## Overview

WalletTuner is a flexible personal finance tracking application designed to help users manage and monitor their financial activities effectively.

## Features

- **Finance Accounts**: Open and manage multiple finance accounts to track separate bank accounts and/or financial sources.
- **Transaction Logging**: Record income and expenses while associating them with specific accounts.
- **Milestones**: Set savings goals for accounts to reach a target balance.
- **Subscriptions**: Automate recurring expenses by scheduling subscriptions that deduct a specific amount at set intervals.
- **Comprehensive Overview**: View all incomes, expenses, total balance, active milestones, and upcoming subscriptions in an interactive dashboard with charts.

## Prerequisites

Before setting up and running the project, ensure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/)

Additionally, if you plan to use the provided scripts, ensure your system supports running Bash scripts.

## Installation

1. Clone the repository

```bash
git clone https://github.com/caganseyrek/WalletTuner.git
cd path/to/WalletTuner
```

2. Run the installation script to install the prerequisites

```bash
cd scripts/ # from the project root
./install_apps.sh
```

3. Setup the environment variables

Each app/package in the project that uses environment variables has a `.env.sample` in their folder. You can generate random strings of characters for server's .env file by running the `generate_secrets` script.

```bash
cd scripts/
./generate_secrets.sh
```

### 3. Run the Application

After setting everything up, you can start the project:

```bash
pnpm dev # from the project root
```

This will:

- Run the frontend at `http://localhost:3000`.
- Run the backend at `http://localhost:3001`.
- Run the landing site at `http://localhost:3002`.

## Docker Usage

### Build and Run with Docker Compose

You can build and start the entire stack using Docker Compose:

```bash
docker-compose up --build
```

## Bug Reports and Feature Requests

The project uses GitHub templates to streamline reporting bugs and requesting new features. To contribute:

- **Bug Reports:** Open a new issue and select "Bug Report" template. Provide as much detail as possible to help us reproduce the issue.
- **Feature Request:** Open a new issue and select "Feature Request" template. Describe the new feature and its intended purpose clearly.

## License

This project is open-source and licensed under [MIT License](https://github.com/caganseyrek/WalletTuner/blob/main/LICENSE).
