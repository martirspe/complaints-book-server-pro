const express = require('express');

// Middlewares
const { authMiddleware, cacheMiddleware } = require('../middlewares');

// Licence controller
const { checkLicense } = require('../controllers/licenseController');

const router = express.Router();

// License verification
router.get('/license/:userId', authMiddleware, cacheMiddleware, checkLicense);

module.exports = router;
