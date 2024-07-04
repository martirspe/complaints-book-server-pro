const express = require('express');
const {
  createTipoReclamo,
  getTiposReclamo,
  getTipoReclamoById,
  updateTipoReclamo,
  deleteTipoReclamo
} = require('../controllers/tiposReclamoController');

const router = express.Router();

router.post('/tipos_reclamo', createTipoReclamo);
router.get('/tipos_reclamo', getTiposReclamo);
router.get('/tipos_reclamo/:id', getTipoReclamoById);
router.put('/tipos_reclamo/:id', updateTipoReclamo);
router.delete('/tipos_reclamo/:id', deleteTipoReclamo);

module.exports = router;
