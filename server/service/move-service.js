const models = require('../database/models/index');

module.exports = {
    async moveColumns(dragId, dropId) {
        let column1 = await models.Column.findOne({ where: { id: dragId } });
        let column2 = await models.Column.findOne({ where: { id: dropId } });

        let order = column1.order;
        column1.order = column2.order;
        column2.order = order;

        await column1.save();
        await column2.save();
    },

    async moveSprint(dragId, dropId) {
        let sprints = await models.Sprint.findAll();
        sprints = sprints
            .sort((a, b) => a.order - b.order);
        let sprint1 = sprints[dropId];
        let sprint2 = sprints[dragId];

        let order = sprint1.order;
        sprint1.order = sprint2.order;
        sprint2.order = order;

        await sprint1.save();
        await sprint2.save();
    },

    async moveSprintToOtherColumn(sprintId, columnId, position) {
        let sprint  = await models.Sprint.findOne({where: {id: sprintId}});
        let sprintsColumn = await models.Sprint.findAll({where: {columnId}});
        sprintsColumn = sprintsColumn
            .sort((a, b) => a.order - b.order);
        let isIncrement = false;


        if(sprintsColumn.length.toString() === position)
        {
            sprint.order = sprintsColumn[sprintsColumn.length -1].order + 1;
            sprint.columnId = columnId;
            await sprint.save();
        }
        else
        {

            for (const item of sprintsColumn) {
                const index = sprintsColumn.indexOf(item);

                let changeSprint  = await models.Sprint.findOne({where: {id: item.id}});
                if(index.toString() === position)
                {
                    sprint.columnId = columnId;
                    sprint.order = changeSprint.order;
                    changeSprint.order += 1;
                    await changeSprint.save();
                    await sprint.save();
                    isIncrement = true;
                }

                if(isIncrement) {
                    changeSprint.order += 1;
                    await changeSprint.save();
                }
            }
        }
    }

};
