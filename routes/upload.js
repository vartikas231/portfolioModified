const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Middleware for file validation
const validateFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validTypes.includes(file.mimetype)) {
    throw new Error('Invalid file format. Only JPG, JPEG, and PNG are allowed');
  }
  if (file.size > 1024 * 1024) {
    throw new Error('File size is too big (max 1MB)');
  }
};

router.post('/upload', async (req, res) => {
  try {
    console.log('Upload endpoint hit');
    console.log('Request files:', req.files);

    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    console.log('File details:', {
      name: file.name,
      size: file.size,
      mimetype: file.mimetype,
      tempFilePath: file.tempFilePath
    });

    // Validate file
    validateFile(file);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, { folder: "udemy" });

    return res.json({ 
      public_id: result.public_id, 
      url: result.secure_url 
    });

  } catch (error) {
    console.error('Error during upload:', error.message);
    return res.status(500).json({ 
      msg: 'Server error during upload',
      error: error.message 
    });
  } finally {
    // Clean up temporary file
    if (req.files?.file?.tempFilePath) {
      removeTmp(req.files.file.tempFilePath);
    }
  }
});

router.post('/destroy', async (req, res) => {
  try {
    const { public_id } = req.body;
    
    if (!public_id) {
      return res.status(400).json({ msg: 'No image selected' });
    }

    const result = await cloudinary.uploader.destroy(public_id);
    return res.json({ 
      msg: 'Image deleted successfully',
      result 
    });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ 
      msg: 'Error deleting image',
      error: error.message 
    });
  }
});

const removeTmp = (path) => {
  try {
    if (path && fs.existsSync(path)) {
      fs.unlinkSync(path); // Using sync version for simplicity
    }
  } catch (error) {
    console.error('Error removing temp file:', error);
  }
};

module.exports = router;