const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Inicio de sesión
router.post('/login', authController.login);

module.exports = router;
