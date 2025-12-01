const express = require('express');
const router = express.Router();
const SliderImage = require('../models/SliderImage');
const DirectorInfo = require('../models/DirectorInfo');
const Statistic = require('../models/Statistic');
const BankDetail = require('../models/BankDetail');

// ===== SLIDER IMAGES =====
router.get('/slider', async (req, res) => {
  try {
    const slides = await SliderImage.find({ is_active: true }).sort({ display_order: 1 });
    res.json({ success: true, slides });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch slider images' });
  }
});

router.post('/slider', async (req, res) => {
  try {
    const slide = await SliderImage.create(req.body);
    res.json({ success: true, slide });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create slide' });
  }
});

router.put('/slider/:id', async (req, res) => {
  try {
    const slide = await SliderImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, slide });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update slide' });
  }
});

router.delete('/slider/:id', async (req, res) => {
  try {
    await SliderImage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Slide deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete slide' });
  }
});

// ===== DIRECTOR INFO =====
router.get('/director', async (req, res) => {
  try {
    const director = await DirectorInfo.findOne();
    res.json({ success: true, director });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch director info' });
  }
});

router.put('/director/:id', async (req, res) => {
  try {
    const director = await DirectorInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, director });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update director info' });
  }
});

// ===== STATISTICS =====
router.get('/stats', async (req, res) => {
  try {
    const stats = await Statistic.find().sort({ display_order: 1 });
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
});

router.put('/stats/:id', async (req, res) => {
  try {
    const stat = await Statistic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, stat });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update statistic' });
  }
});

// ===== BANK DETAILS =====
router.get('/bank', async (req, res) => {
  try {
    const bank = await BankDetail.findOne();
    res.json({ success: true, bank });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch bank details' });
  }
});

router.put('/bank/:id', async (req, res) => {
  try {
    const bank = await BankDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, bank });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update bank details' });
  }
});

module.exports = router;
