const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    email: { 
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
}, { timestamps: false, freezeTableName: true });

const Token = sequelize.define('token', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    refreshToken: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true});


User.hasOne(Token);
Token.belongsTo(User);

module.exports = { User, Token };