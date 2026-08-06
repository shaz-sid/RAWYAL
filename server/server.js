import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.routes.js';

dotenv.config();

// ── Startup validation ────────────────────────────────────────────────────
const REQUIRED_ENV = ['EMAIL_USER', 'EMAIL_PASSWORD'];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`✗ Missing required env var: ${key}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// ── Security headers ──────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,   // SPA serves from separate origin
  crossOriginEmbedderPolicy: false,
}));

// ── CORS — strict allowlist ───────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

if (!isProduction) {
  allowedOrigins.push(
    'http://localhost:5173', 'http://localhost:5174',
    'http://127.0.0.1:5173', 'http://127.0.0.1:5174',
  );
}

app.use(cors({
  origin: (origin, callback) => {
    // allow server-to-server (no origin) and allowlisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ── Body parsing with size limits ─────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ── Rate limiting — global + contact-specific ─────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,      // 15 minutes
  max: 100,                       // 100 requests per window
  standardHeaders: true,          // Return RateLimit-* headers
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(globalLimiter);

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,            // 1 minute
  max: parseInt(process.env.CONTACT_RATE_LIMIT || '5', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many quote requests. Please try again in a minute.' },
});

// ── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api/contact', contactLimiter, contactRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

// ── Error handling (no stack leak in production) ──────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(isProduction ? {} : { error: err.message }),
  });
});

// ── Graceful shutdown ─────────────────────────────────────────────────────
const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT} [${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received — shutting down gracefully…`);
  server.close(() => {
    console.log('✓ HTTP server closed');
    process.exit(0);
  });
  // Force exit after 10s
  setTimeout(() => process.exit(1), 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
