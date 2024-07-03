const express = require('express');
const reclamosController = require('../controllers/reclamosController');
const router = express.Router();

// Crear reclamo
router.post('/', reclamosController.crearReclamo);

// Obtener todos los reclamos
router.get('/', reclamosController.obtenerReclamos);

// Obtener reclamos por ID
router.get('/:id', reclamosController.obtenerReclamosPorID);

// Actualizar reclamo por ID
router.put('/:id', reclamosController.actualizarReclamo);

// Asignar reclamo a personal
router.patch('/:id/asignar', reclamosController.asignarReclamo);

// Registrar resolución de un reclamo
router.patch('/:id/resolver', reclamosController.resolverReclamo);

module.exports = router;
