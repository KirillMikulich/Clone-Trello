const moveService = require('../service/move-service');

module.exports = {
    async moveColumns(req, res) {
        try {
            const { dragId, dropId } = req.params;
            await moveService.moveColumns(dragId, dropId);

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

    async moveSprint(req, res) {
        try {
            const { dragId, dropId } = req.params;
            await moveService.moveSprint(dragId, dropId);

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

    async moveSprintToOtherColumn(req, res) {
        try {
            const { sprintId, columnId, position } = req.params;
            await moveService.moveSprintToOtherColumn(sprintId, columnId, position);

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
    }

};
