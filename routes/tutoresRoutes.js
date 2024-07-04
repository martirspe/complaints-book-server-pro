const express = require('express');
const {
  createTutor,
  getTutores,
  getTutorById,
  updateTutor,
  deleteTutor
} = require('../controllers/tutoresController');

const router = express.Router();

router.post('/tutores', createTutor);
router.get('/tutores', getTutores);
router.get('/tutores/:id', getTutorById);
router.put('/tutores/:id', updateTutor);
router.delete('/tutores/:id', deleteTutor);

module.exports = router;
