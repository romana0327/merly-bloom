// ── Flowers Routes ────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const Flower = require('../models/Flower');

// GET /api/flowers - Get all flowers (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category, featured, bestseller } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (bestseller === 'true') filter.isBestSeller = true;

    const flowers = await Flower.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: flowers.length, data: flowers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/flowers/:id - Get single flower
router.get('/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    if (!flower) {
      return res.status(404).json({ success: false, message: 'Flower not found' });
    }
    res.json({ success: true, data: flower });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/flowers - Create a flower (admin use)
router.post('/', async (req, res) => {
  try {
    const flower = await Flower.create(req.body);
    res.status(201).json({ success: true, data: flower });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/flowers/:id - Update a flower
router.put('/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!flower) {
      return res.status(404).json({ success: false, message: 'Flower not found' });
    }
    res.json({ success: true, data: flower });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/flowers/:id - Delete a flower
router.delete('/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    if (!flower) {
      return res.status(404).json({ success: false, message: 'Flower not found' });
    }
    res.json({ success: true, message: 'Flower deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
