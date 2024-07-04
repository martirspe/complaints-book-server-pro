const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TipoReclamo = sequelize.define('TipoReclamo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'tipos_reclamo'
});

module.exports = TipoReclamo;
