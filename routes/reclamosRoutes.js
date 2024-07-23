const express = require('express');
const { uploadClaim, uploadResolveClaim } = require('../controllers/uploadController');

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
router.post('/reclamos', uploadClaim, createReclamo);

// Obtener todos los reclamos
router.get('/reclamos', getReclamos);

// Obtener un reclamo por ID
router.get('/reclamos/:id', getReclamoById);

// Actualizar un reclamo
router.put('/reclamos/:id', uploadClaim, updateReclamo);

// Eliminar un reclamo
router.delete('/reclamos/:id', deleteReclamo);

// Asignar un reclamo
router.patch('/reclamos/:id/asignar', assignReclamo);

// Resolver un reclamo
router.patch('/reclamos/:id/resolver', uploadResolveClaim, resolveReclamo);

module.exports = router;
