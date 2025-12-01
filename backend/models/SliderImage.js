const mongoose = require('mongoose');

const sliderImageSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  display_order: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SliderImage', sliderImageSchema);
