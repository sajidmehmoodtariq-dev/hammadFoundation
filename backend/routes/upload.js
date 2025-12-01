const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Upload image endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    // Compress and convert image using sharp
    const compressedImage = await sharp(req.file.buffer)
      .resize(1200, 800, { // Resize to reasonable dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();

    // Convert to base64
    const base64Image = `data:image/jpeg;base64,${compressedImage.toString('base64')}`;

    res.json({
      success: true,
      imageUrl: base64Image,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image'
    });
  }
});

module.exports = router;
