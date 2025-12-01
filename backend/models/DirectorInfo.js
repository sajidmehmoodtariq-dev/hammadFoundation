const mongoose = require('mongoose');

const directorInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DirectorInfo', directorInfoSchema);
