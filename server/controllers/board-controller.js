const { getBoardsByUserId, deleteBoardById } = require('../service/board-service');
const boardService = require('../service/board-service');

module.exports = {
  async addBoardByUser(req, res) {
    try {
      const { userId, isCreator, name } = req.body;

      const boardData = await boardService.addBoardByUser(userId, isCreator, name);

      return res.json(boardData);

    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }
      })
    }
  },

  async getBoardsByUserId(req, res) {
    try {
      const { userId } = req.params;

      const boardData = await boardService.getBoardsByUserId(userId);

      return res.json(boardData);

    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }
      })
    }
  },

  async addUserById(req, res) {
    try {
      const { email, boardId } = req.params;
      const boardData = await boardService.addUserInBoard(email, boardId);

      return res.json(boardData);

    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }
      })
    }
  },

  async deleteBoardById(req, res) {
    try {
      const { boardId } = req.params;

      const boardData = await boardService.deleteBoardById( boardId);

      return res.json(boardData);

    }
    catch (error) {
      res.status(400).send({
        error: true,
        data: {
          message: error.message
        }
      })
    }
  },
    async deleteBoardForUser(req, res) {
        try {
            const { userId, boardId } = req.params;

            await boardService.deleteBoardForUser(userId, boardId);

            return res.status(200).send();
        }
        catch (error) {
            res.status(400).send({
                error: true,
                data: {
                    message: error.message
                }
            })
        }
    },
    async getBoardbyId(req, res) {
        try {
            const { boardId } = req.params;

           const board  = await boardService.getBoardById(boardId);

            return res.json(board);
        }
        catch (error) {
            res.status(400).send({
                error: true,
                data: {
                    message: error.message
                }
            })
        }
    },

    async changeName(req, res) {
        try {
            const { boardId } = req.params;
            const { name } = req.body;

            const board  = await boardService.changeName(boardId, name);

            return res.json(board);
        }
        catch (error) {
            res.status(400).send({
                error: true,
                data: {
                    message: error.message
                }
            })
        }
    },
};
