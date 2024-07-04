const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TipoConsumo = sequelize.define('TipoConsumo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'tipos_consumo'
});

module.exports = TipoConsumo;
