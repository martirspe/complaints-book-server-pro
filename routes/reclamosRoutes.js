const express = require('express');
const upload = require('../config/multer');

// Controlador de reclamos
const {
  createReclamo,
  getReclamos,
  getReclamoById,
  updateReclamo,
  deleteReclamo,
  assignReclamo,
  resolveReclamo
} = require('../controllers/reclamosController');

const router = express.Router();

// Crear un nuevo reclamo
router.post('/reclamos', upload.single('a_adjunto'), createReclamo);

// Obtener todos los reclamos
router.get('/reclamos', getReclamos);

// Obtener un reclamo por ID
router.get('/reclamos/:id', getReclamoById);

// Actualizar un reclamo
router.put('/reclamos/:id', upload.single('a_adjunto'), updateReclamo);

// Eliminar un reclamo
router.delete('/reclamos/:id', deleteReclamo);

// Asignar un reclamo
router.patch('/reclamos/:id/asignar', assignReclamo);

// Resolver un reclamo
router.patch('/reclamos/:id/resolver', upload.single('r_adjunto'), resolveReclamo);

module.exports = router;
