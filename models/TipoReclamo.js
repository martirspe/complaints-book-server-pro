import { DataTypes } from "sequelize";
import db from "../db/connection";

const TipoReclamo = db.define('tipos_reclamo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default TipoReclamo;
