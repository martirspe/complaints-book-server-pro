const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

const TipoDocumento = sequelize.define('TipoDocumento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'tipos_documento'
});

module.exports = TipoDocumento;
