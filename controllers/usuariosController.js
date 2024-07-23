// Modelo de datos
const { Usuario } = require('../models');

// Biblioteca Bcrypt para JWT
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, email, password, rol } = req.body;

    // Verificar si el usuario ya existe en base al email
    const existingEmail = await Usuario.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    // Encriptar la contraseña antes de guardar el usuario
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombres,
      apellidos,
      email,
      password: hashedPassword,
      rol,
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    // Verificar si existen usuarios registrados
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios registrados' });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    // Verificar si existe el usuario registrado
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
    const { email, password } = req.body;

    // Verificar si el email ya está en uso por otro usuario (si se envía)
    if (email) {
      const existingEmail = await Usuario.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }
    }

    // Si se envía una nueva contraseña, encriptarla antes de guardar
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    // Actualizar el usuario con los datos enviados
    const [updated] = await Usuario.update(req.body, { where: { id } });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(id);
      return res.status(200).json(updatedUsuario);
    }

    throw new Error('Usuario no encontrado');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Usuario.destroy({ where: { id } });

    // Muestra un mensaje si el usuario es eliminado
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

    // Muestra un mensaje si los datos del usuario son incorrectos
    if (!usuario) {
      return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Compara la contraseña reciba y la cifrada
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
