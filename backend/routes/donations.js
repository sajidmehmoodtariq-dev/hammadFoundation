const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations (admin)
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json({ success: true, donations });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch donations' });
  }
});

// Get donation by transaction ID
router.get('/:transactionId', async (req, res) => {
  try {
    const donation = await Donation.findOne({ 
      transaction_id: req.params.transactionId 
    });
    
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    
    res.json({ success: true, donation });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch donation' });
  }
});

// Create donation record
router.post('/', async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.json({ success: true, donation });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create donation' });
  }
});

// Update donation status
router.patch('/:id', async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation not found' });
    }
    
    res.json({ success: true, donation });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ success: false, message: 'Failed to update donation' });
  }
});

module.exports = router;
