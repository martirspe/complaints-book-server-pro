const express = require('express');
const {
  createTipoConsumo,
  getTiposConsumo,
  getTipoConsumoById,
  updateTipoConsumo,
  deleteTipoConsumo
} = require('../controllers/tiposConsumoController');

const router = express.Router();

// Crear un nuevo tipo de consumo
router.post('/tipos_consumo', createTipoConsumo);

// Obtener todos los tipos de consumo
router.get('/tipos_consumo', getTiposConsumo);

// Obtener un tipo de consumo por ID
router.get('/tipos_consumo/:id', getTipoConsumoById);

// Actualizar un tipo de consumo
router.put('/tipos_consumo/:id', updateTipoConsumo);

// Eliminar un tipo de consumo
router.delete('/tipos_consumo/:id', deleteTipoConsumo);

module.exports = router;
