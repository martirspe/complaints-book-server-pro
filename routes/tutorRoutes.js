const express = require('express');

// Tutor controller
const {
  createTutor,
  getTutors,
  getTutorByDocument,
  getTutorById,
  updateTutor,
  deleteTutor
} = require('../controllers/tutorController');

const router = express.Router();

// Create a new tutor
router.post('/tutors', createTutor);

// Get all tutors
router.get('/tutors', getTutors);

// Get a tutor by document number
router.get('/tutors/document/:document_number', getTutorByDocument);

// Get a tutor by ID
router.get('/tutors/:id', getTutorById);

// Update a tutor
router.put('/tutors/:id', updateTutor);

// Delete a tutor
router.delete('/tutors/:id', deleteTutor);

module.exports = router;
