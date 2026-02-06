# Deployment Guide

## Prerequisites
- Docker + Docker Compose (for containerized run)
- Domain + TLS termination (recommended for production)
- Cloud account (Render, Fly.io, Railway, AWS, GCP, etc.)

## Environment variables

### Backend (`backend/.env`)
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=false` in production
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `OPENAI_API_KEY` (optional)
- `OPENAI_MODEL`

### Frontend (`frontend/.env`)
- `VITE_API_BASE=https://your-api-domain/api`

## Production hardening checklist
- Set a strong `DJANGO_SECRET_KEY`
- Disable debug mode
- Restrict CORS origins and allowed hosts
- Use PostgreSQL instead of SQLite
- Add HTTPS termination and secure headers
- Add backups for DB and artifacts
- Add uptime checks using `GET /api/health/`

## Deploy with Docker Compose

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up -d --build
```

Then place a reverse proxy in front:
- `/` -> frontend on port 5173
- `/api/` -> backend on port 8000

## Deploy backend separately (gunicorn)

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## Deploy frontend separately

```bash
cd frontend
cp .env.example .env
npm install
npm run build
```

Serve `frontend/dist/` via static host/CDN.
