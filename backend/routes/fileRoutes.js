const express = require('express');
const multer = require('multer');
const cloudinary = require('../services/cloudinary');
const File = require('../models/File');
const Dashboard = require('../models/Dashboard');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// File Upload Route
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = await cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'File upload failed', error });
      }

      const file = new File({
        fileUrl: result.secure_url,
        fileType: result.resource_type,
        uploadedBy: req.user._id,
        dashboard: req.body.dashboardId,
      });

      await file.save();

      const dashboard = await Dashboard.findById(req.body.dashboardId);
      dashboard.files.push(file._id);
      await dashboard.save();

      res.status(200).json(file);
    });

    req.pipe(uploadedFile);
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error });
  }
});

module.exports = router;
