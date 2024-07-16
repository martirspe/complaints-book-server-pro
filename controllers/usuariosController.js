const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const sendEmail = require('../services/emailService');

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

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await usuario.destroy();

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

    // Generar y devolver un token JWT (puedes usar cualquier biblioteca JWT)
    const token = generateJWT(usuario);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
