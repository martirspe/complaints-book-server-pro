const multer = require('multer');
const upload = require('../config/multer');

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'El archivo es demasiado grande. El tamaño máximo es 5MB.' });
      }
    } else if (err) {
      // General errors
      if (err.message === 'Solo se permiten archivos de imagen y PDF') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'Error al subir el archivo', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }

    res.status(200).json({ message: 'Archivo subido correctamente', filePath: req.file.path });
  });
};
