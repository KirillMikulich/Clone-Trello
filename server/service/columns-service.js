const models = require('../database/models/index');

module.exports = {
  async addColumn(boardId, name) {
    let columns = await models.Column.findAll({ where: {
      boardId
    }});

    if(columns.length === 0){
        return await models.Column.create({ name, boardId, order: 0 });
    }

    columns = columns.sort((a, b) => a.order - b.order);
    console.log(columns);
      return await models.Column.create({
        name,
        boardId,
        order: (columns[columns.length - 1].order + 1)
    });
  },
  async getColumns(boardId) {
    let columns = await models.Column.findAll({ where: {
      boardId
    }});
    columns = columns.sort((a, b) => a.order - b.order);
    let returnColumns = [];

    for(let column of columns){

        let sprints = await models.Sprint.findAll({where: {columnId: column.id}});
        sprints.sort((a, b) => a.order - b.order);
        returnColumns.push({...column.dataValues, sprints: sprints});
    }
    return returnColumns;
  },

    async deleteColumn(columnId) {
      let columns = await models.Column.destroy({ where: {
          id: columnId
      }});

      if(columns === null) throw new Error("Error delete");

      return true;
    }
};
