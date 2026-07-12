// ── Flower Meaning Model ──────────────────────────────────────
const mongoose = require('mongoose');

const meaningSchema = new mongoose.Schema({
  flowerName: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  occasions: {
    type: [String], // Array of occasions e.g. ['Valentine\'s Day', 'Weddings']
    required: true
  },
  color: {
    type: String // Main color accent for UI
  },
  funFact: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Meaning', meaningSchema);
