const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const BoardUser = sequelize.define('board_user', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  isCreator: { 
    type: DataTypes.BOOLEAN, 
    allowNull: false,
    defaultValue: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  boardId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'boards',
      key: 'id'
    }
  }
}, {timestamps: false, freezeTableName: true});

module.exports = BoardUser;
