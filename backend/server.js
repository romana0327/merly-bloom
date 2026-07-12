// ============================================================
// Merly Bloom - Main Server Entry Point
// ============================================================
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/flowers',  require('./routes/flowers'));
app.use('/api/meanings', require('./routes/meanings'));
app.use('/api/orders',   require('./routes/orders'));
app.use('/api/auth',     require('./routes/auth'));

// ── Health check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🌸 Merly Bloom API is running', status: 'ok' });
});

// ── 404 handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Error handler ───────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// ── Database connection ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merlybloom';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🌸 Merly Bloom API running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
