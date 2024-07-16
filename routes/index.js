const express = require('express');
const usuariosRoutes = require('./usuariosRoutes');
const clientesRoutes = require('./clientesRoutes');
const tutoresRoutes = require('./tutoresRoutes');
const tiposReclamoRoutes = require('./tiposReclamoRoutes');
const tiposConsumoRoutes = require('./tiposConsumoRoutes');
const reclamosRoutes = require('./reclamosRoutes');

const router = express.Router();

router.use('/api', usuariosRoutes);
router.use('/api', clientesRoutes);
router.use('/api', tutoresRoutes);
router.use('/api', tiposReclamoRoutes);
router.use('/api', tiposConsumoRoutes);
router.use('/api', reclamosRoutes);

module.exports = router;
