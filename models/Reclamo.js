const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Cliente = require('./Cliente');
const Tutor = require('./Tutor');
const TipoReclamo = require('./TipoReclamo');
const TipoConsumo = require('./TipoConsumo');

const Reclamo = sequelize.define('Reclamo', {
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  tutor_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Tutor,
      key: 'id'
    }
  },
  tipo_reclamo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoReclamo,
      key: 'id'
    }
  },
  tipo_consumo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoConsumo,
      key: 'id'
    }
  },
  n_pedido: {
    type: DataTypes.INTEGER
  },
  m_reclamado: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  detalle: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pedido: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  a_adjunto: {
    type: DataTypes.STRING
  },
  a_condiciones: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  asignadoA: {
    type: DataTypes.STRING
  },
  resuelto: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  resolucion: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'reclamos'
});

Reclamo.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Reclamo.belongsTo(Tutor, { foreignKey: 'tutor_id' });
Reclamo.belongsTo(TipoReclamo, { foreignKey: 'tipo_reclamo_id' });
Reclamo.belongsTo(TipoConsumo, { foreignKey: 'tipo_consumo_id' });

module.exports = Reclamo;
