const express = require('express');
const {
  createTipoConsumo,
  getTiposConsumo,
  getTipoConsumoById,
  updateTipoConsumo,
  deleteTipoConsumo
} = require('../controllers/tiposConsumoController');

const router = express.Router();

router.post('/tipos_consumo', createTipoConsumo);
router.get('/tipos_consumo', getTiposConsumo);
router.get('/tipos_consumo/:id', getTipoConsumoById);
router.put('/tipos_consumo/:id', updateTipoConsumo);
router.delete('/tipos_consumo/:id', deleteTipoConsumo);

module.exports = router;
