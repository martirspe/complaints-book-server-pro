import { DataTypes } from "sequelize";
import db from "../db/connection";

const Cliente = db.define('clientes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  t_documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  n_documento: {
    type: DataTypes.STRING,
    allowNull: false
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
    allowNull: false
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  m_edad: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  indexes: [
    { fields: ['n_documento'] },
    { fields: ['email'] },
    { fields: ['celular'] }
  ],
  timestamps: false
});

export default Cliente;
