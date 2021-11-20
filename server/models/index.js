const User = require('./user-model');
const Token = require('./token-model');

User.hasOne(Token);
Token.belongsTo(User);

//https://sequelize.org/master/class/lib/associations/base.js~Association.html

module.exports = User | Token;