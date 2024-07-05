const express = require('express');
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

router.post('/reclamos', createReclamo);
router.get('/reclamos', getReclamos);
router.get('/reclamos/:id', getReclamoById);
router.put('/reclamos/:id', updateReclamo);
router.delete('/reclamos/:id', deleteReclamo);
router.patch('/reclamos/:id/asignar', assignReclamo);
router.patch('/reclamos/:id/resolver', resolveReclamo);

module.exports = router;
