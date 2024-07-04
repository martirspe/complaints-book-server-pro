const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Tutor = sequelize.define('Tutor', {
  t_documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  n_documento: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'tutores'
});

module.exports = Tutor;
