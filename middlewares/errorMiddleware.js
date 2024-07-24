// Importar dependencias si es necesario
const { ValidationError } = require('sequelize');

/**
 * Middleware para manejo centralizado de errores
 * @param {Error} err - El error capturado
 * @param {Object} req - El objeto de solicitud de Express
 * @param {Object} res - El objeto de respuesta de Express
 * @param {Function} next - La función next de Express
 */
const errorMiddleware = (err, req, res, next) => {
  // Loggear el error para debugging
  console.error('Error:', err);

  // Objeto base para la respuesta de error
  let errorResponse = {
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err
  };

  // Manejar diferentes tipos de errores
  if (err instanceof ValidationError) {
    // Error de validación de Sequelize
    errorResponse.message = 'Validation error';
    errorResponse.error = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    res.status(400);
  } else if (err.name === 'UnauthorizedError') {
    // Error de autenticación (por ejemplo, de express-jwt)s
    errorResponse.message = 'Authentication error';
    res.status(401);
  } else if (err.statusCode) {
    // Errores con código de estado personalizado
    errorResponse.message = err.message;
    res.status(err.statusCode);
  } else {
    // Error del servidor para cualquier otro tipo de error
    res.status(500);
  }

  // Enviar la respuesta
  res.json(errorResponse);
};

module.exports = errorMiddleware;