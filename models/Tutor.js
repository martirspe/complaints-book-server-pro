const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

// Modelo de datos
const TipoDocumento = require('./TipoDocumento');

const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  t_documento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoDocumento,
      key: 'id'
    }
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

TipoDocumento.hasMany(Tutor, { foreignKey: 't_documento_id' });
Tutor.belongsTo(TipoDocumento, { foreignKey: 't_documento_id' });

module.exports = Tutor;
