const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  display_order: {
    type: Number,
    default: 1
  },
  is_active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
