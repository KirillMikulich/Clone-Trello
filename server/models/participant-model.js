const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Participant = sequelize.define('participants', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  sprintId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sprints',
      key: 'id'
    }
  }
}, {timestamps: false, freezeTableName: true});

module.exports = Participant;
