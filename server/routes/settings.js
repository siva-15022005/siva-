const express = require('express');
const { body, validationResult } = require('express-validator');
const Settings = require('../models/Settings');
const { protect, authorize } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer for logo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/logos/');
  },
  filename: function (req, file, cb) {
    cb(null, 'logo-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// @desc    Get branding settings
// @route   GET /api/settings/branding
// @access  Public
router.get('/branding', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    res.status(200).json({
      success: true,
      data: settings.branding
    });
  } catch (error) {
    console.error('Get branding settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting branding settings'
    });
  }
});

// @desc    Update branding settings
// @route   PUT /api/settings/branding
// @access  Private/Admin
router.put('/branding', protect, authorize('admin'), upload.single('logo'), [
  body('primaryColor').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Invalid primary color format'),
  body('secondaryColor').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).withMessage('Invalid secondary color format'),
  body('fontFamily').optional().isIn(['Arial', 'Helvetica', 'Georgia', 'Times New Roman', 'Roboto', 'Open Sans', 'Lato']).withMessage('Invalid font family'),
  body('customHtml').optional().isLength({ max: 2000 }).withMessage('Custom HTML cannot exceed 2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { primaryColor, secondaryColor, fontFamily, customHtml } = req.body;

    // Get current settings
    const settings = await Settings.getSettings();

    // Update branding fields
    const brandingUpdate = {};
    if (primaryColor) brandingUpdate.primaryColor = primaryColor;
    if (secondaryColor) brandingUpdate.secondaryColor = secondaryColor;
    if (fontFamily) brandingUpdate.fontFamily = fontFamily;
    if (customHtml !== undefined) brandingUpdate.customHtml = customHtml;

    // Add logo if uploaded
    if (req.file) {
      brandingUpdate.logo = `/uploads/logos/${req.file.filename}`;
    }

    // Update settings
    const updatedSettings = await Settings.findByIdAndUpdate(
      settings._id,
      { 
        branding: {
          ...settings.branding,
          ...brandingUpdate
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedSettings.branding
    });
  } catch (error) {
    console.error('Update branding settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating branding settings'
    });
  }
});

// @desc    Reset branding settings to default
// @route   POST /api/settings/branding/reset
// @access  Private/Admin
router.post('/branding/reset', protect, authorize('admin'), async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // Reset to defaults
    const defaultBranding = {
      logo: null,
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      fontFamily: 'Roboto',
      customHtml: ''
    };

    const updatedSettings = await Settings.findByIdAndUpdate(
      settings._id,
      { branding: defaultBranding },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Branding settings reset to default',
      data: updatedSettings.branding
    });
  } catch (error) {
    console.error('Reset branding settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error resetting branding settings'
    });
  }
});

module.exports = router;