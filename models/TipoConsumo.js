import { DataTypes } from "sequelize";
import db from "../db/connection";

const TipoConsumo = db.define('tipos_consumo', {
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

export default TipoConsumo;
