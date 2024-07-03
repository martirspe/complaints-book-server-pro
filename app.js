require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const reclamosRoutes = require('./routes/reclamosRoutes');
const authRoutes = require('./routes/authRoutes');
const ventasRoutes = require('./routes/ventasRoutes');

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear el cuerpo de la solicitud
app.use(express.json());

// Rutas
app.use('/api/reclamos', reclamosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/magento', ventasRoutes);

// Manejar errores 404
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
