const { Sequelize } = require('sequelize');

// Obtener datos de las variables de entorno
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL establecida.');
        await sequelize.sync(/* { force: true } */); // Sincronizar todos los modelos con la base de datos
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

module.exports = { sequelize, connectDB };

