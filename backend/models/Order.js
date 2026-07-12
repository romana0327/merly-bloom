// ── Order Model ───────────────────────────────────────────────
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  flower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flower',
    required: true
  },
  name: String,
  price: Number,
  image: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // Guest info if user is not logged in
  guestEmail: String,
  guestName: String,

  items: [orderItemSchema],

  total: {
    type: Number,
    required: true
  },

  deliveryAddress: {
    street: String,
    city: String,
    zipCode: String
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  },

  note: String // Special delivery note
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
