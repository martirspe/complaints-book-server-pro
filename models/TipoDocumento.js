const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

const TipoDocumento = sequelize.define('TipoDocumento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tipos_documento'
});

module.exports = TipoDocumento;
