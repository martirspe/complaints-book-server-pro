const { DataTypes } = require('sequelize');

// DB Configuration
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  license_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  license_expiration_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'staff'),
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'users',
});

module.exports = User;
