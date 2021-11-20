const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Token = sequelize.define('token', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  refreshToken: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {timestamps: false, freezeTableName: true});

module.exports = Token;
