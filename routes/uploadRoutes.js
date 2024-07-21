const express = require('express');

// Controlador de carga de archivos
const { uploadFile } = require('../controllers/uploadController');

const router = express.Router();

// Cargar un archivo de forma independiente
router.post('/upload', uploadFile);

module.exports = router;
