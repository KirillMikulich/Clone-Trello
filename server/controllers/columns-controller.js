const columnsService = require('../service/columns-service');

module.exports = {
    async addColumn(req, res) {
    try {
      const { boardId, name } = req.body;

      const column = await columnsService.addColumn(boardId, name);

      return res.json(column);

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
    async getColumns(req, res) {
    try {
      const { boardId} = req.params;

      const column = await columnsService.getColumns(boardId);

      return res.json(column);

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

    async deleteColumn(req, res){
        try {
            const { columnId} = req.params;

            const column = await columnsService.deleteColumn(columnId);

            return res.json(column);

        }
        catch (error) {
            res.status(400).send({
                error: true,
                data: {
                    message: error.message
                }
            })
        }
    }
};
