const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt
});

module.exports = mongoose.model('AdminUser', adminUserSchema);
