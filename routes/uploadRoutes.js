const express = require('express');

// File upload controller
const { uploadClaim, uploadLogo } = require('../controllers/uploadController');

const router = express.Router();

// Load a logo independently
router.post('/upload/logo', uploadLogo);

// Load a file independently
router.post('/upload/claim', uploadClaim);

module.exports = router;
