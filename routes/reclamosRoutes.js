const express = require('express');
const {
  createReclamo,
  getReclamos,
  getReclamoById,
  updateReclamo,
  deleteReclamo
} = require('../controllers/reclamosController');

const router = express.Router();

router.post('/reclamos', createReclamo);
router.get('/reclamos', getReclamos);
router.get('/reclamos/:id', getReclamoById);
router.put('/reclamos/:id', updateReclamo);
router.delete('/reclamos/:id', deleteReclamo);

module.exports = router;
