// Modelo de datos
const Usuario = require('../models/Usuario');

// Biblioteca Bcrypt para JWT
const bcrypt = require('bcrypt');

// Servicio de correo
const sendEmail = require('../services/emailService');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, email, password, rol } = req.body;

    // Encriptar la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombres,
      apellidos,
      email,
      password: hashedPassword,
      rol,
    });

    // Enviar correo al crear un usuario
    await sendEmail(
      email,
      'Bienvenido',
      `Hola ${nombres}, su cuenta ha sido creada exitosamente.`,
      'nuevoUsuario',
      {
        nombreUsuario: nombres,
      }
    );

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email, password, rol } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await usuario.update(req.body);

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Usuario.destroy({ where: { id } });
    if (deleted) {
      return res.status(200).json({ message: "Usuario eliminado con éxito" });
    }
    throw new Error("Usuario no encontrado");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Generar y devolver un token JWT
    const token = generateJWT(usuario);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Función para generar un JWT
function generateJWT(usuario) {
  const jwt = require('jsonwebtoken');
  const secret = process.env.JWT_SECRET || 'your_jwt_secret';
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    },
    secret,
    { expiresIn: '1h' }
  );
}
