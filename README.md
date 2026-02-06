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
- Unified search/query across tasks, notes, goals, concept links, and mind maps
- Daily insights, weekly insights, progress report, and actionable advice
- Short-term and long-term goal planning
- Structured information flow (capture → link → map → goal)

## API overview

- `GET /api/health/`
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

## How to run (local)

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

Backend: `http://127.0.0.1:8000`  
Health check: `http://127.0.0.1:8000/api/health/`

### 2) Frontend

In another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://127.0.0.1:5173`

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

## Deploy

Yes—deployable now. This environment cannot deploy to your cloud account directly (no cloud credentials), but use one of these:

1. **Render**: backend service + frontend static site
2. **Fly.io/Railway**: deploy `backend/Dockerfile` and `frontend/Dockerfile` as separate apps
3. **VM + Docker Compose**: run both apps and place Nginx/Caddy in front for HTTPS

See `docs/deployment.md` for production hardening details.

## Environment variables

### Backend (`backend/.env`)

```bash
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

### Frontend (`frontend/.env`)

```bash
VITE_API_BASE=http://127.0.0.1:8000/api
```
