const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Comments = sequelize.define('comments', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  comment: { 
    type: DataTypes.TEXT, 
    allowNull: false
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

module.exports = Comments;
