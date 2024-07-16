const express = require('express');
const {
  createCliente,
  getClientes,
  getClienteById,
  updateCliente,
  deleteCliente
} = require('../controllers/clientesController');

const router = express.Router();

// Crear un nuevo cliente
router.post('/clientes', createCliente);

// Obtener todos los clientes
router.get('/clientes', getClientes);

// Obtener un cliente por ID
router.get('/clientes/:id', getClienteById);

// Actualizar un cliente
router.put('/clientes/:id', updateCliente);

// Eliminar un cliente
router.delete('/clientes/:id', deleteCliente);

module.exports = router;
