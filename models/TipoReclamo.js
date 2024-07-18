const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

const TipoReclamo = sequelize.define('TipoReclamo', {
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
  tableName: 'tipos_reclamo'
});

module.exports = TipoReclamo;
