const express = require('express');

// File upload controller
const { uploadLogo } = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Load a logo independently
router.post('/upload/logo', uploadLogo, (req, res) => {
    res.status(200).json(req.fileInfo);
  });

module.exports = router;
