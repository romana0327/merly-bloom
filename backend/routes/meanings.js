// ── Flower Meanings Routes ────────────────────────────────────
const express = require('express');
const router = express.Router();
const Meaning = require('../models/Meaning');

// GET /api/meanings - Get all flower meanings
router.get('/', async (req, res) => {
  try {
    const meanings = await Meaning.find().sort({ flowerName: 1 });
    res.json({ success: true, count: meanings.length, data: meanings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/meanings/:id - Get single meaning
router.get('/:id', async (req, res) => {
  try {
    const meaning = await Meaning.findById(req.params.id);
    if (!meaning) {
      return res.status(404).json({ success: false, message: 'Meaning not found' });
    }
    res.json({ success: true, data: meaning });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/meanings - Create meaning
router.post('/', async (req, res) => {
  try {
    const meaning = await Meaning.create(req.body);
    res.status(201).json({ success: true, data: meaning });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
