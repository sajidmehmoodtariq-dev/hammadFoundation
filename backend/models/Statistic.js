const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
  stat_key: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: ''
  },
  number: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  display_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Statistic', statisticSchema);
