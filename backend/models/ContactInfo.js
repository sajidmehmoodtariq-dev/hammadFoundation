const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  donationEmail: {
    type: String,
    required: true
  },
  officeHours: {
    type: String,
    required: true
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String
  },
  branches: [{
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    }
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
