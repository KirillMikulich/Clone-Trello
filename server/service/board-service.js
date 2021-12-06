const bcrypt = require('bcrypt');
const models = require('../database/models/index');
const uuid = require('uuid');

module.exports = {
  async getBoardsByUserId(id) {
    const boardIds = await models.BoardUser.findAll({ where: {
      userId: id
    }});

    let boards = [];

    if(boardIds !== null) {

      for(let i=0; i<boardIds.length; i++){
        const boardFind = await models.Board.findOne({ where: {
          id: boardIds[i].boardId
        }});

        if(boardFind !== null)
          boards.push({
            id: boardIds[i].id,
            isCreator:  boardIds[i].isCreator,
            boardId: boardIds[i].boardId,
            number: boardFind.number,
            name: boardFind.name
          });
      }
    }

    return boards;
  },
  async addBoardByUser(userId, isCreator, name) {

    const board = await models.Board.create({number: uuid.v4(), name });

    if(board == null) {
      throw new Error('Не удалось добавить доску');
    }

    await models.BoardUser.create({isCreator, userId, boardId: board.id });

    return board;
  },
  async deleteBoardById(boardId) {
    const destroyBoardUser = await models.BoardUser.destroy({ where: {
      boardId
    }});

    if( destroyBoardUser == null) throw new Error("Не удалось удалить доску");

    const destroyBoard = await models.Board.destroy({ where: {
      id: boardId
    }});

    if(destroyBoard == null) throw new Error("Не удалось удалить доску");

    return true;
  },
  async addUserInBoard(email, boardId) {

    const user = await models.User.findOne({ where: {
            email
    }})

    const board = await models.BoardUser.create({ isCreator: false, userId: user.id, boardId });

    if(board == null) throw new Error("Не удалось добавить пользователя");

    return board;
  },

  async deleteBoardForUser(userId, boardId) {
      const board =await models.BoardUser.destroy({ where: { userId, boardId }});
      if(board == null) throw new Error("Не удалось удалить пользователя из доски");

  },

    async getBoardById(boardId) {
      let board = await models.Board.findOne({where: { id: boardId}});

      if(board === null) throw new Error("Error");
      let newObj = { board: board, users: []};
      let accessUsers = await models.BoardUser.findAll({where: { boardId, isCreator: false}});

      for(let user in accessUsers) {
          newObj.users.push(await models.User.findOne({where: {id: accessUsers[user].userId}}))
      }

      return newObj;
    },

    async changeName(boardId, name) {
        let board = await models.Board.findOne({where: { id: boardId}});
        board.name = name;
        await board.save();
        return board;
  }
};
