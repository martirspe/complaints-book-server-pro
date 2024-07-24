const multer = require('multer');
const createUpload = require('../config/multer');

// Create upload instances for different file types
const uploadLogos = createUpload('uploads/logos', /jpeg|jpg|png/, 'Only image files allowed');
const uploadClaims = createUpload('uploads/claims', /jpeg|jpg|png|pdf/, 'Only image and PDF files are allowed');

// Generic function to handle file uploads
const handleFileUpload = (upload, fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'The file is too large. The maximum size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }
    
    // If there is a file, add the file information to req
    if (req.file) {
      req.fileInfo = {
        message: 'File uploaded successfully',
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
exports.uploadClaim = uploadMiddleware(handleFileUpload(uploadClaims, 'attachment'));
exports.uploadResolveClaim = uploadMiddleware(handleFileUpload(uploadClaims, 'response_attachment'));