const express = require('express');

// Controlador de tipos de documento
const {
  createTipoDocumento,
  getTiposDocumento,
  getTipoDocumentoById,
  updateTipoDocumento,
  deleteTipoDocumento
} = require('../controllers/tiposDocumentoController');

const router = express.Router();

// Crear un nuevo tipo de documento
router.post('/tipos_documento', createTipoDocumento);

// Obtener todos los tipos de documento
router.get('/tipos_documento', getTiposDocumento);

// Obtener un tipo de documento por ID
router.get('/tipos_documento/:id', getTipoDocumentoById);

// Actualizar un tipo de documento
router.put('/tipos_documento/:id', updateTipoDocumento);

// Eliminar un tipo de documento
router.delete('/tipos_documento/:id', deleteTipoDocumento);

module.exports = router;
