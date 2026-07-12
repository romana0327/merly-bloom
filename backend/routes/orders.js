// ── Orders Routes ─────────────────────────────────────────────
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { optionalAuth, protect } = require('../middleware/auth');

// POST /api/orders - Place an order (guest or logged-in user)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { items, total, deliveryAddress, guestEmail, guestName, note } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    const orderData = {
      items,
      total,
      deliveryAddress,
      note
    };

    // Attach user if logged in, otherwise use guest info
    if (req.user) {
      orderData.user = req.user._id;
    } else {
      if (!guestEmail || !guestName) {
        return res.status(400).json({
          success: false,
          message: 'Please provide your name and email for guest checkout'
        });
      }
      orderData.guestEmail = guestEmail;
      orderData.guestName = guestName;
    }

    const order = await Order.create(orderData);

    res.status(201).json({
      success: true,
      message: '🌸 Your order has been placed! We\'ll prepare it with love.',
      data: order
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/orders/my - Get logged-in user's orders
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.flower', 'name image');

    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:id - Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
