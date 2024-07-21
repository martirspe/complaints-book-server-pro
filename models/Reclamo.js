const { DataTypes } = require('sequelize');

// Configuración de DB
const { sequelize } = require('../config/db');

// Modelos de datos
const Usuario = require('./Usuario');
const Cliente = require('./Cliente');
const Tutor = require('./Tutor');
const TipoReclamo = require('./TipoReclamo');
const TipoConsumo = require('./TipoConsumo');

const Reclamo = sequelize.define('Reclamo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
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
    allowNull: false,
    references: {
      model: Tutor,
      key: 'id'
    }
  },
  t_reclamo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoReclamo,
      key: 'id'
    }
  },
  t_consumo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoConsumo,
      key: 'id'
    }
  },
  n_pedido: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
    type: DataTypes.STRING,
    allowNull: true
  },
  a_condiciones: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  u_asignado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  respuesta: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  r_adjunto: {
    type: DataTypes.STRING,
    allowNull: true
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
  f_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  f_respuesta: {
    type: DataTypes.DATE,
  },
  f_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: 'f_creacion',
  updatedAt: 'f_actualizacion',
  tableName: 'reclamos',
  hooks: {
    beforeUpdate: (reclamo, options) => {
      reclamo.f_actualizacion = new Date();
      if (reclamo.resuelto) {
        reclamo.f_respuesta = new Date();
      }
    }
  }
});

Cliente.hasMany(Reclamo, { foreignKey: 'cliente_id' });
Reclamo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Tutor.hasMany(Reclamo, { foreignKey: 'tutor_id' });
Reclamo.belongsTo(Tutor, { foreignKey: 'tutor_id' });

TipoReclamo.hasMany(Reclamo, { foreignKey: 't_reclamo_id' });
Reclamo.belongsTo(TipoReclamo, { foreignKey: 't_reclamo_id' });

TipoConsumo.hasMany(Reclamo, { foreignKey: 't_consumo_id' });
Reclamo.belongsTo(TipoConsumo, { foreignKey: 't_consumo_id' });

Usuario.hasMany(Reclamo, { foreignKey: 'u_asignado', as: 'reclamosAsignados' });
Reclamo.belongsTo(Usuario, { foreignKey: 'u_asignado', as: 'asignadoUsuario' });

module.exports = Reclamo;
