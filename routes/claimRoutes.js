const express = require('express');

// Upload middleware
const { uploadClaim, uploadResolveClaim } = require('../middlewares/uploadMiddleware');

// Claims controller
const {
  createClaim,
  getClaims,
  getClaimById,
  updateClaim,
  deleteClaim,
  assignClaim,
  resolveClaim
} = require('../controllers/claimController');

const router = express.Router();

// Create a new claim
router.post('/claims', uploadClaim, createClaim);

// Get all claims
router.get('/claims', getClaims);

// Get a claim by ID
router.get('/claims/:id', getClaimById);

// Update a claim
router.put('/claims/:id', uploadClaim, updateClaim);

// Delete a claim
router.delete('/claims/:id', deleteClaim);

// Assign a claim
router.patch('/claims/:id/assign', assignClaim);

// Resolve a claim
router.patch('/claims/:id/resolve', uploadResolveClaim, resolveClaim);

module.exports = router;
