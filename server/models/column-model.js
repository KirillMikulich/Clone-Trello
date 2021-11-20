const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Sprint = sequelize.define('columns', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  boardId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'boards',
      key: 'id'
    }
  }
}, {timestamps: false, freezeTableName: true});

module.exports = Sprint;
