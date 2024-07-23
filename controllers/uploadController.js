const multer = require('multer');
const createUpload = require('../config/multer');

// Crear instancias de upload para diferentes tipos de archivos
const uploadLogos = createUpload('uploads/logos', /jpeg|jpg|png/, 'Solo se permiten archivos de imagen');
const uploadClaims = createUpload('uploads/claims', /jpeg|jpg|png|pdf/, 'Solo se permiten archivos de imagen y PDF');

// Función genérica para manejar la carga de archivos
const handleFileUpload = (upload, fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'El archivo es demasiado grande. El tamaño máximo es 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Error al subir el archivo' });
    }
    
    // Si hay un archivo, añade la información del archivo a req
    if (req.file) {
      req.fileInfo = {
        message: 'Archivo subido correctamente',
        filePath: req.file.path
      };
    }
    
    next();
  });
};

const uploadMiddleware = (uploadFunction) => (req, res, next) => {
  uploadFunction(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

exports.uploadLogo = uploadMiddleware(handleFileUpload(uploadLogos, 'file'));
exports.uploadClaim = uploadMiddleware(handleFileUpload(uploadClaims, 'a_adjunto'));
exports.uploadResolveClaim = uploadMiddleware(handleFileUpload(uploadClaims, 'r_adjunto'));