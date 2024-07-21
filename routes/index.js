const express = require('express');

// Configuración de rutas
const usuariosRoutes = require('./usuariosRoutes');
const clientesRoutes = require('./clientesRoutes');
const tutoresRoutes = require('./tutoresRoutes');
const tiposDocumentoRoutes = require('./tiposDocumentoRoutes');
const tiposConsumoRoutes = require('./tiposConsumoRoutes');
const tiposReclamoRoutes = require('./tiposReclamoRoutes');
const reclamosRoutes = require('./reclamosRoutes');
const uploadRoutes = require('./uploadRoutes');

const router = express.Router();

// Rutas API de usuarios
router.use('/api', usuariosRoutes);

// Rutas API de clientes
router.use('/api', clientesRoutes);

// Rutas API de tutores
router.use('/api', tutoresRoutes);

// Rutas API de tipos de documento
router.use('/api', tiposDocumentoRoutes);

// Rutas API de tipos de consumo
router.use('/api', tiposConsumoRoutes);

// Rutas API de tipos de reclamo
router.use('/api', tiposReclamoRoutes);

// Rutas API de reclamos
router.use('/api', reclamosRoutes);

// Rutas API de upload
router.use('/api', uploadRoutes);

module.exports = router;
