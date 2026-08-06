# Deployment Guide — The Rawyal

## Architecture

```
┌──────────────────┐     ┌──────────────────┐
│  Vite React SPA  │────▶│  Express API     │────▶ Gmail SMTP
│  (Static Build)  │     │  (Port 5001)     │
│  Port 5173 (dev) │     │  /api/contact/*  │
└──────────────────┘     └──────────────────┘
```

- **Frontend**: React 18 SPA built with Vite. Output: `dist/` directory.
- **Backend**: Express 5 server for contact form email delivery only.

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Required | Default | Description |
|---|---|---|---|
| `EMAIL_USER` | ✅ | — | Gmail address used as SMTP sender |
| `EMAIL_PASSWORD` | ✅ | — | Gmail App Password (16 chars, [generate here](https://myaccount.google.com/apppasswords)) |
| `EMAIL_FROM` | ❌ | `EMAIL_USER` | Display "from" address on outbound emails |
| `BUSINESS_EMAIL` | ❌ | `EMAIL_USER` | Where lead notifications are delivered |
| `PORT` | ❌ | `5000` | Express server port |
| `NODE_ENV` | ❌ | `development` | Set to `production` in deployment |
| `CORS_ORIGIN` | ❌ | `http://localhost:5173` | Comma-separated allowed origins |
| `CONTACT_RATE_LIMIT` | ❌ | `5` | Max contact submissions per IP per minute |

### Frontend (Vite)

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_URL` | ❌ | `http://localhost:5001` | Backend API base URL |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env
# Edit .env with your Gmail App Password

# 3. Start both servers
npm run dev      # Frontend → http://localhost:5173
npm run server   # Backend  → http://localhost:5001
```

---

## Production Build

```bash
# Build the frontend
npm run build
# Output → dist/

# The dist/ directory is a static SPA — deploy to any static host:
# Vercel, Netlify, Cloudflare Pages, S3+CloudFront, etc.
```

---

## Production Deployment

### Frontend (Static Host — Vercel/Netlify/Cloudflare)
1. Set build command: `npm run build`
2. Set output directory: `dist`
3. Set environment variable: `VITE_API_URL=https://api.therawyal.com` (your backend URL)

### Backend (VPS / Railway / Render / Fly.io)
1. Set `NODE_ENV=production`
2. Set `CORS_ORIGIN=https://therawyal.com` (your frontend domain)
3. Set all required email env vars
4. Run: `node server/server.js`

---

## Health Check

```
GET /api/health
→ { "status": "ok", "uptime": 123.456 }
```

Use this for load balancer health probes and uptime monitoring.

---

## Security Features

| Feature | Implementation |
|---|---|
| Security headers | `helmet` — HSTS, X-Content-Type-Options, Referrer-Policy, etc. |
| Rate limiting (global) | 100 req/15min per IP |
| Rate limiting (contact) | 5 req/min per IP (configurable via `CONTACT_RATE_LIMIT`) |
| Input validation | Server-side email format, length limits |
| XSS prevention | HTML-escaped user input in email templates |
| CORS | Strict allowlist (env-configurable) |
| Body size | 16KB limit on JSON/URL-encoded payloads |
| Error handling | No stack traces leaked in production |
| Graceful shutdown | SIGTERM/SIGINT handled with connection draining |
| Env validation | Server fails fast on missing required variables |

---

## Scaling Assumptions

- **Single instance** — rate limiting uses in-process memory (suitable for <1k MAU).
- If deploying multiple instances behind a load balancer, replace rate-limit store with Redis.
- Frontend is fully static — can be served from any CDN.

---

## Rollback

1. **Frontend**: Re-deploy previous `dist/` build or revert the Git commit and rebuild.
2. **Backend**: Revert the Git commit and restart the Node process.

No database migrations to worry about — there is no database.
