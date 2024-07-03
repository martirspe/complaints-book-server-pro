const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

exports.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const esPasswordValido = await bcrypt.compare(req.body.password, usuario.password);
        if (!esPasswordValido) return res.status(401).json({ auth: false, token: null });

        const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
        res.status(200).json({ auth: true, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.verificarToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
};
