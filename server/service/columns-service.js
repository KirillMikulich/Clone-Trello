const models = require('../database/models/index');

module.exports = {
  async addColumn(boardId, name) {
    let columns = await models.Column.findAll({ where: {
      boardId
    }});

    if(columns.length === 0){
      const column = await models.Column.create({name, boardId, order: 0});
      return column;
    }

    columns = columns.sort((a, b) => a.order - b.order);
    console.log(columns);
    const column = await models.Column.create({name, boardId, order: (columns[columns.length-1].order+1)});
    return column;
  },
  async getColumns(boardId) {
    let columns = await models.Column.findAll({ where: {
      boardId
    }});
    columns = columns.sort((a, b) => a.order - b.order);
    return columns;
  },

    async deleteColumn(columnId) {
      let columns = await models.Column.destroy({ where: {
          id: columnId
      }});

      if(columns === null) throw new Error("Error delete");

      return true;
    }
};
