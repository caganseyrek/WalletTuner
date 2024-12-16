# WalletTuner

![GitHub License](https://img.shields.io/github/license/caganseyrek/WalletTuner)
![GitHub repo size](https://img.shields.io/github/repo-size/caganseyrek/WalletTuner)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/caganseyrek/WalletTuner)

## Overview

Wallet Tuner is a full-stack personal finance tracking app built with Vite, React, and TypeScript for frontend, and Express and TypeScript for the backend. It uses MongoDB with Mongoose for database operations.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (v20.14 or higher)
- pnpm (v9.15.0 or higher)
- Docker and Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/caganseyrek/WalletTuner.git
cd path/to/WalletTuner
```

### 2. Run the setup script

```bash
cd scripts/ # from the project root
./setup_project.sh
```

First, the script will download the required packages for frontend, backend, and the root folder, so you don't need to run `pnpm install` seperately.

Then, the script will check for `.env` files and rename the `.env.sample` files to `.env`.

Ensure you added valid configurations to both frontend and backend's `.env` files.

Backend's .env file only needs strings of random characters for secrets. You can generate these secrets running the `generate_secrets` script.

```bash
cd server/scripts
./generate_secrets.sh
```

### 3. Run the Application

After setting everything up, you can start the project with the run script.

```bash
cd scripts/ # from the project root
./run_app.sh (dev | build | preview)
```

This will:

- Run the frontend at `http://localhost:5173`.
- Run the backend at `http://localhost:3000`.

## Docker Usage

### Build and Run with Docker Compose

You can build and start the entire stack using Docker Compose:

```bash
docker-compose up --build
```

### Individual Dockerfiles

If you want to build and run the services seperately:

**Frontend**

```bash
cd client/ # from the project root
docker build -t wtclient .
docker run -p 5173:5173 wtclient
```

**Backend**

```bash
cd server/ # from the project root
docker build -t wtserver .
docker run -p 5173:5173 wtserver
```

## Bug Reports and Feature Requests

The project uses GitHub templates to streamline reporting bugs and requesting new features. To contribute:

- **Bug Reports:** Open a new issue and select "Bug Report" template. Provide as much detail as possible to help us reproduce the issue.
- **Feature Request:** Open a new issue and select "Feature Request" template. Describe the new feature and its intended purpose clearly.

## Documentation

For detailed documentation, please see the [project documentation](https://caganseyrek.com/projects/WalletTuner).

## License

This project is open-source and licensed under [MIT License](https://github.com/caganseyrek/WalletTuner/blob/main/LICENSE).
