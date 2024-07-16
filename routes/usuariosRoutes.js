const express = require('express');
const {
  createUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  loginUsuario
} = require('../controllers/usuariosController');

const router = express.Router();

// Crear un nuevo usuario
router.post('/usuarios', createUsuario);

// Obtener todos los usuarios
router.get('/usuarios', getUsuarios);

// Obtener un usuario por ID
router.get('/usuarios/:id', getUsuarioById);

// Actualizar un usuario
router.put('/usuarios/:id', updateUsuario);

// Eliminar un usuario
router.delete('/usuarios/:id', deleteUsuario);

// Login de usuario
router.post('/usuarios/login', loginUsuario);

module.exports = router;
