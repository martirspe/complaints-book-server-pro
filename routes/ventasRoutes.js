const express = require('express');
const ventasController = require('../controllers/ventasController');
const authController = require('../controllers/authController');
const router = express.Router();

// Obtener datos de ventas
router.get('/ventas', authController.verificarToken, ventasController.obtenerVentas);

// Obtener datos del cliente
router.get('/cliente', authController.verificarToken, ventasController.obtenerCliente);

module.exports = router;
