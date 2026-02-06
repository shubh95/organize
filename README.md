# Daily Organizer AI + dApp Monorepo

A full-stack monorepo for a **daily organizer + knowledge system** with:

- **React** frontend (`frontend/`) for tasks, goals, notes, concept search, and insights
- **Django + DRF** backend (`backend/`) for APIs, analytics, AI-driven recommendations, and knowledge graph primitives
- **Web3 / dApp layer** (`web3/`) with Solidity contract to notarize daily summary hashes on-chain
- **Multi-platform roadmap** for web app, Google extension, and Android client

## Core capabilities

- Task management (create, update, complete)
- Save notes with tags and source links
- Save mind maps as JSON
- Link concepts (`source -> relation -> target`)
- Unified search/query across tasks, notes, goals
- Daily insights, weekly insights, progress report, and actionable advice
- Short-term and long-term goal planning
- Structured information flow (capture → link → map → goal)

## Architecture

```text
frontend (React + Vite)  --->  backend API (Django + DRF) ---> SQLite/Postgres
           |                          |
           |                          +--> AI Insight Service (OpenAI or heuristics)
           |
           +--> Wallet connect + ethers.js ---> Smart contract (DailyOrganizerLog.sol)
```

## API overview

- `GET/POST /api/tasks/`
- `PATCH /api/tasks/<id>/`
- `GET/POST /api/notes/`
- `GET/POST /api/mind-maps/`
- `GET/POST /api/concept-links/`
- `GET/POST /api/goals/`
- `GET /api/search/?q=keyword`
- `GET /api/analysis/overview/`
- `POST /api/analysis/ai-insights/`
- `GET /api/analysis/periodic-insights/`

## How to run (local, without Docker)

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

Backend is available at `http://127.0.0.1:8000`.

### 2) Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend is available at `http://127.0.0.1:5173`.

### 3) Web3 (optional)

```bash
cd web3
npm install
npx hardhat compile
```

## How to run (Docker Compose)

```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api/`

## Can this be deployed?

Yes. I can’t deploy to your cloud account from this environment (no access to your credentials), but the project is ready for deployment with these setups:

### Option A: Render (simple)
- Deploy `backend/` as a Python web service (`python manage.py migrate && gunicorn config.wsgi:application`)
- Deploy `frontend/` as a static site (`npm run build`)
- Configure frontend API URL to point to your backend URL

### Option B: Fly.io / Railway
- Use the included Dockerfiles (`backend/Dockerfile`, `frontend/Dockerfile`)
- Deploy backend and frontend as separate services
- Set env vars (`DJANGO_SECRET_KEY`, `OPENAI_API_KEY`, `OPENAI_MODEL`)

### Option C: Single VM + Docker Compose
- Provision a VM
- Clone repo
- `cp backend/.env.example backend/.env`
- `docker compose up -d --build`
- Put Nginx/Caddy in front for HTTPS and domain routing

## AI provider setup

Set in `backend/.env`:

```bash
OPENAI_API_KEY=your_key
OPENAI_MODEL=gpt-4o-mini
```

Without API key, deterministic heuristic insights are returned.

## Publish strategy

- **Web app:** deploy React + Django (Vercel/Netlify + Render/Fly.io)
- **Google extension:** package key screens as extension UI with background sync to API
- **Android app:** React Native app consuming same Django APIs for tasks/notes/goals/insights
