const express = require('express');
const {
  createTipoReclamo,
  getTiposReclamo,
  getTipoReclamoById,
  updateTipoReclamo,
  deleteTipoReclamo
} = require('../controllers/tiposReclamoController');

const router = express.Router();

// Crear un nuevo tipo de reclamo
router.post('/tipos_reclamo', createTipoReclamo);

// Obtener todos los tipos de reclamo
router.get('/tipos_reclamo', getTiposReclamo);

// Obtener un tipo de reclamo por ID
router.get('/tipos_reclamo/:id', getTipoReclamoById);

// Actualizar un tipo de reclamo
router.put('/tipos_reclamo/:id', updateTipoReclamo);

// Eliminar un tipo de reclamo
router.delete('/tipos_reclamo/:id', deleteTipoReclamo);

module.exports = router;
