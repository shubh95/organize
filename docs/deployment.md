# Deployment Guide

## Prerequisites
- Docker + Docker Compose (for containerized run)
- Domain + TLS termination (recommended for production)
- Cloud account (Render, Fly.io, Railway, AWS, GCP, etc.)

## Environment variables (backend)
Copy `backend/.env.example` to `backend/.env` and set:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=false` in production
- `OPENAI_API_KEY` (optional)
- `OPENAI_MODEL`

## Production hardening checklist
- Set a strong `DJANGO_SECRET_KEY`
- Disable debug mode
- Restrict CORS origins in `config/settings.py`
- Use PostgreSQL instead of SQLite
- Add HTTPS termination and secure headers
- Add backups for DB and artifacts

## Deploy with Docker Compose

```bash
cp backend/.env.example backend/.env
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
npm install
npm run build
```

Serve `frontend/dist/` via static host/CDN.
