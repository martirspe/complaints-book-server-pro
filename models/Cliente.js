const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

// Modelo de datos
const TipoDocumento = require('./TipoDocumento');

const Cliente = sequelize.define('Cliente', {
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
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  m_edad: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false,
  tableName: 'clientes'
});

TipoDocumento.hasMany(Cliente, { foreignKey: 't_documento_id' });
Cliente.belongsTo(TipoDocumento, { foreignKey: 't_documento_id' });

module.exports = Cliente;
