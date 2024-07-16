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

router.post('/usuarios', createUsuario);
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.put('/usuarios/:id', updateUsuario);
router.delete('/usuarios/:id', deleteUsuario);
router.post('/usuarios/login', loginUsuario);

module.exports = router;
