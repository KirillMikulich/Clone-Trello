const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  email: { 
    type: DataTypes.TEXT, 
    unique: true, 
    allowNull: false
  },
  login: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  ident: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  }
}, { timestamps: false, freezeTableName: true });

module.exports = User;