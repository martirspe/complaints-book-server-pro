const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reclamo = sequelize.define('Reclamo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    t_documento: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50]
        }
    },
    n_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 20]
        }
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true,
            len: [1, 150]
        }
    },
    celular: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 15],
            isNumeric: true
        }
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    m_edad: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    t_documento_tutor: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    n_documento_tutor: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            len: [0, 20]
        }
    },
    nombres_tutor: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: [0, 100]
        }
    },
    apellidos_tutor: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            len: [0, 100]
        }
    },
    email_tutor: {
        type: DataTypes.STRING(150),
        allowNull: true,
        validate: {
            isEmail: true,
            len: [0, 150]
        }
    },
    celular_tutor: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            len: [0, 15],
            isNumeric: true
        }
    },
    t_reclamo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    t_consumo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 100]
        }
    },
    n_pedido: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    m_reclamado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    detalle: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    pedido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    a_adjunto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    a_condiciones: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    asignadoA: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resuelto: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    resolucion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    timestamps: true, // Incluye createdAt y updatedAt automáticos
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion',
    indexes: [
        {
            fields: ['n_documento'],
            unique: false
        },
        {
            fields: ['email'],
            unique: false
        },
        {
            fields: ['celular'],
            unique: false
        }
    ]
});

module.exports = Reclamo;
