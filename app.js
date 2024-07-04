// Cargar variables de entorno desde un archivo .env
require('dotenv').config();

// Importar Express y la función connectDB desde el archivo de configuración de la base de datos
const express = require('express');
const { connectDB } = require('./config/db');

// Importar el archivo de rutas principal
const routes = require('./routes/index');

// Conectar a la base de datos al inicio de la aplicación
connectDB();

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas: usar las rutas definidas en el archivo routes/index.js
app.use('/', routes);

// Manejar errores 404: responder con un mensaje JSON si la ruta solicitada no se encuentra
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor Express en el puerto definido en las variables de entorno o en el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
