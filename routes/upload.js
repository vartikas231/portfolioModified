const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File size is too big (max 1MB)' });
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.mimetype)) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ 
        msg: 'Invalid file format. Only JPG, JPEG, and PNG are allowed' 
      });
    }

    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "udemy" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      removeTmp(file.tempFilePath);
      return res.json({ 
        public_id: result.public_id, 
        url: result.secure_url 
      });

    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      removeTmp(file.tempFilePath);
      return res.status(500).json({ 
        msg: 'Error uploading to Cloudinary',
        error: uploadError.message 
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    if (req.files?.file?.tempFilePath) {
      removeTmp(req.files.file.tempFilePath);
    }
    return res.status(500).json({ 
      msg: 'Server error during upload',
      error: error.message 
    });
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