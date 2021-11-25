const sprintService = require('../service/sprints-service');

module.exports = {
    async addSprint(req, res) {
        try {
            const { columnId, name } = req.body;

            const sprint = await sprintService.addSprint(columnId, name);

            return res.json(sprint);

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

    async deleteSprint(req, res) {
        try {
            const { id } = req.params;

            const sprint = await sprintService.deleteSprint(id);

            return res.json(sprint);

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

    async addUserBySprint(req, res) {
        try {
            const { id, userId } = req.params;

            const sprint = await sprintService.addUserBySprint(id, userId);

            return res.json(sprint);

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

    async deleteUserInSprint(req, res) {
        try {
            const { id, userId } = req.params;

            const sprint = await sprintService.deleteUserInSprint(id, userId);

            return res.json(sprint);

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

    async allParticipantBySprint(req, res) {
        try {
            const { sprintId } = req.params;

            const sprint = await sprintService.allParticipantBySprint(sprintId);

            return res.json(sprint);

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

    async addComment(req, res) {
        try {
            const { comment, userId, sprintId } = req.body;

            const sprint = await sprintService.addComment(comment, userId, sprintId);

            return res.json(sprint);

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

    async deleteComment(req, res) {
        try {
            const { id } = req.params;

            const sprint = await sprintService.deleteComment(id);

            return res.json(sprint);

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

    async allCommentBySprint(req, res) {
        try {
            const { sprintId } = req.params;

            const sprint = await sprintService.allCommentBySprint(sprintId);

            return res.json(sprint);

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

    async allSprints(req, res) {
        try {
            const { columnId } = req.params;

            const sprint = await sprintService.allSprints(columnId);

            return res.json(sprint);

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
