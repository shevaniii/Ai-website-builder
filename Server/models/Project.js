const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  props: { type: mongoose.Schema.Types.Mixed, default: {} },
  children: [{ type: mongoose.Schema.Types.Mixed }],
  styles: { type: mongoose.Schema.Types.Mixed, default: {} },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    default: null
  },
  components: [componentSchema],
  settings: {
    theme: { type: String, default: 'light' },
    primaryColor: { type: String, default: '#007bff' },
    font: { type: String, default: 'Inter' },
    responsive: { type: Boolean, default: true }
  },
  metadata: {
    title: { type: String, default: 'My Website' },
    description: { type: String, default: '' },
    keywords: [String],
    favicon: { type: String, default: null }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedUrl: {
    type: String,
    default: null
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

projectSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

module.exports = mongoose.model('Project', projectSchema);