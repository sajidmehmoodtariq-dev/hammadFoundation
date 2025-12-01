const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  transaction_id: {
    type: String,
    unique: true,
    sparse: true // Allows null values while maintaining uniqueness
  },
  order_number: {
    type: String,
    unique: true,
    sparse: true
  },
  donor_name: {
    type: String,
    required: true
  },
  donor_email: {
    type: String,
    required: true
  },
  donor_phone: {
    type: String,
    default: ''
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'PKR'
  },
  message: {
    type: String,
    default: ''
  },
  payment_status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  payment_method: {
    type: String,
    default: 'paypro'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);
