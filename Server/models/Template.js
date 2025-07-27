const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['business', 'portfolio', 'blog', 'ecommerce', 'landing', 'personal']
  },
  thumbnail: {
    type: String,
    required: true
  },
  components: [{
    id: String,
    type: String,
    props: mongoose.Schema.Types.Mixed,
    children: [mongoose.Schema.Types.Mixed],
    styles: mongoose.Schema.Types.Mixed,
    position: {
      x: Number,
      y: Number
    }
  }],
  settings: {
    theme: { type: String, default: 'light' },
    primaryColor: { type: String, default: '#007bff' },
    font: { type: String, default: 'Inter' }
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  usage: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Template', templateSchema);