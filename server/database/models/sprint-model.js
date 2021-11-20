const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Sprint = sequelize.define('sprints', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name: { 
    type: DataTypes.TEXT, 
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  columnId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'columns',
      key: 'id'
    }
  }
}, {timestamps: false, freezeTableName: true});

module.exports = Sprint;
