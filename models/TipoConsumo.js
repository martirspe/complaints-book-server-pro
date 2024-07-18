const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

const TipoConsumo = sequelize.define('TipoConsumo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'tipos_consumo'
});

module.exports = TipoConsumo;
