const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const AccessPeople = sequelize.define('access_people', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
}, { timestamps: false, freezeTableName: true });

module.exports = User;