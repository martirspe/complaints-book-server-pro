const express = require('express');

// Controlador de tutores
const {
  createTutor,
  getTutores,
  getTutorById,
  updateTutor,
  deleteTutor
} = require('../controllers/tutoresController');

const router = express.Router();

// Crear un nuevo tutor
router.post('/tutores', createTutor);

// Obtener todos los tutores
router.get('/tutores', getTutores);

// Obtener un tutor por ID
router.get('/tutores/:id', getTutorById);

// Actualizar un tutor
router.put('/tutores/:id', updateTutor);

// Eliminar un tutor
router.delete('/tutores/:id', deleteTutor);

module.exports = router;
