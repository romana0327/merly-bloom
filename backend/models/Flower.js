// ── Flower Model ─────────────────────────────────────────────
const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Flower name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number // For showing sale/discount
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    enum: ['Wedding', 'Birthday', 'Anniversary', 'Roses', 'Seasonal', 'Sympathy', 'Congratulations'],
    required: true
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 10
  }
}, { timestamps: true });

module.exports = mongoose.model('Flower', flowerSchema);
