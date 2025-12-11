const express = require('express');
const router = express.Router();
const SliderImage = require('../models/SliderImage');
const DirectorInfo = require('../models/DirectorInfo');
const Statistic = require('../models/Statistic');
const BankDetail = require('../models/BankDetail');
const ContactInfo = require('../models/ContactInfo');
const GalleryItem = require('../models/GalleryItem');

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

// ===== CONTACT INFO =====
router.get('/contact', async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    
    // If no contact info exists, create default
    if (!contact) {
      contact = await ContactInfo.create({
        email: 'info@hammadfoundation.edu.pk',
        phone: '92 300 8099015',
        address: '[School Address Here]',
        donationEmail: 'donations@hammadfoundation.edu.pk',
        officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
        socialMedia: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      });
    }
    
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch contact info' });
  }
});

router.put('/contact', async (req, res) => {
  try {
    let contact = await ContactInfo.findOne();
    
    if (!contact) {
      contact = await ContactInfo.create(req.body);
    } else {
      contact = await ContactInfo.findByIdAndUpdate(contact._id, req.body, { new: true });
    }
    
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update contact info' });
  }
});

// ===== GALLERY ITEMS =====
router.get('/gallery', async (req, res) => {
  try {
    const gallery = await GalleryItem.find().sort({ display_order: 1 });
    res.json({ success: true, gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery items' });
  }
});

router.post('/gallery', async (req, res) => {
  try {
    const item = await GalleryItem.create(req.body);
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create gallery item' });
  }
});

router.put('/gallery/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update gallery item' });
  }
});

router.delete('/gallery/:id', async (req, res) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
});

module.exports = router;
