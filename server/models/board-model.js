const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Boards = sequelize.define('boards', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  number: { 
    type: DataTypes.UUID, 
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {timestamps: false, freezeTableName: true});

module.exports = Boards;