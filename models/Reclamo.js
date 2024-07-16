const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Usuario = require('./Usuario');
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
    allowNull: false,
    defaultValue: false
  },
  asignadoA: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  resolucion: {
    type: DataTypes.TEXT
  },
  resuelto: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion',
  tableName: 'reclamos',
  hooks: {
    beforeUpdate: (reclamo, options) => {
      reclamo.fecha_actualizacion = new Date();
      if (reclamo.resuelto) {
        reclamo.fecha_resolucion = new Date();
      }
    }
  }
});

Cliente.hasMany(Reclamo, { foreignKey: 'cliente_id' });
Reclamo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Tutor.hasMany(Reclamo, { foreignKey: 'tutor_id' });
Reclamo.belongsTo(Tutor, { foreignKey: 'tutor_id' });

TipoReclamo.hasMany(Reclamo, { foreignKey: 'tipo_reclamo_id' });
Reclamo.belongsTo(TipoReclamo, { foreignKey: 'tipo_reclamo_id' });

TipoConsumo.hasMany(Reclamo, { foreignKey: 'tipo_consumo_id' });
Reclamo.belongsTo(TipoConsumo, { foreignKey: 'tipo_consumo_id' });

Usuario.hasMany(Reclamo, { foreignKey: 'asignadoA', as: 'reclamosAsignados' });
Reclamo.belongsTo(Usuario, { foreignKey: 'asignadoA', as: 'asignadoUsuario' });


module.exports = Reclamo;
