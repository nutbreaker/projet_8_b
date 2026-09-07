# Kasa

![Kasa logo](/frontend/public/assets/kasa.svg)

Kasa, a platform for renting apartments and houses directly from private owners.
With more than 500 new listings added every day, Kasa is one of the market leaders in France.

## Tech Stack

- **Frontend:** Next.js 16, React 19, CSS
- **Backend:** Node.js, Express, SQLite
- **DevOps & Tooling:** Docker, Docker Compose, Git Submodules

## Prerequisites

Before running the project locally, ensure you have the following installed:

- **Node.js** (v20+ or v24 recommended)
- **npm** (or yarn / pnpm)
- **Git**
- **Docker & Docker Compose**

## Quick Start

### 1. Clone the repository

Clone the repository along with its backend submodule:

```bash
git clone --recurse-submodules git@github.com:nutbreaker/projet_8_b.git
cd projet_8_b
```

> If you have already cloned the repository without the `--recurse-submodules` flag, initialize submodules with:
>
> ```bash
> git submodule update --init --recursive
> ```

---

### 2. Running with Docker Compose

You can build and run the entire stack (both frontend and backend) in a single container using Docker Compose:

```bash
docker compose up --build
```

- Access the application at: `http://localhost:8082`
- To stop the containers:

  ```bash
  docker compose down
  ```

---

### 3. Demo Credentials

N/A

---

### 4. Local Development Setup

#### A. Backend Setup

N/A

#### B. Frontend Setup

N/A

## Project Architecture

```text
N/A
```

## Useful Commands

### Clean up Docker Images

To remove the project's Docker images and volumes:

```bash
docker compose down -v # stop the container and remove the volume
docker rmi kasa:latest # remove the image
```

### Deploy in Background

Run in detached mode:

```bash
docker compose up -d --build
```

### Deploy Updates

Pull latest code and redeploy (database is preserved in the volume):

```bash
git pull && git submodule update --init --recursive
docker compose up -d --build
```
