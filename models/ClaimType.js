const { DataTypes } = require('sequelize');

// DB Configuration
const { sequelize } = require('../config/db');

const ClaimType = sequelize.define('ClaimType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'claim_types'
});

module.exports = ClaimType;
