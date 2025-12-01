const mongoose = require('mongoose');

const bankDetailSchema = new mongoose.Schema({
  account_title: {
    type: String,
    required: true
  },
  account_number: {
    type: String,
    required: true
  },
  bank_name: {
    type: String,
    required: true
  },
  branch_code: {
    type: String,
    default: ''
  },
  branch_name: {
    type: String,
    default: ''
  },
  iban: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BankDetail', bankDetailSchema);
