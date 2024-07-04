const express = require('express');
const {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
} = require('../controllers/clientesController');

const router = express.Router();

router.post('/clientes', createCliente);
router.get('/clientes', getClientes);
router.get('/clientes/:id', getClienteById);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

module.exports = router;
