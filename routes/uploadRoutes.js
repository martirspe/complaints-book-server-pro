const express = require('express');

// Controlador de carga de archivos
const { uploadClaim, uploadLogo } = require('../controllers/uploadController');

const router = express.Router();

// Cargar un logo de forma independiente
router.post('/upload/logo', uploadLogo);

// Cargar un logo de forma independiente
router.post('/upload/claim', uploadClaim);

module.exports = router;
