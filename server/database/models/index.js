const User = require('./user-model');
const Token = require('./token-model');
const Comments = require('./comments-model');
const Board = require('./board-model');
const BoardUser = require('./board-user-model');
const Column = require('./column-model');
const Participant = require('./participant-model');
const Sprint = require('./sprint-model');

module.exports = { 
  User, 
  Token, 
  Comments, 
  Board, 
  BoardUser, 
  Column, 
  Participant, 
  Sprint
};

//Token.hasMany(User);

//BoardUser.hasMany(User);
//BoardUser.hasMany(Board);

//Column.hasMany(Board);

//Sprint.hasMany(Column);

//Participant.hasMany(User);
//Participant.hasMany(Sprint);

//Comments.hasMany(Sprint);
//Comments.hasMany(User);

//https://sequelize.org/master/class/lib/associations/base.js~Association.html
