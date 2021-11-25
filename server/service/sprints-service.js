const models = require('../database/models/index');

module.exports = {
    async addSprint(columnId, name) {
        let sprints = await models.Sprint.findAll({ where: {
                columnId
            }});
        if(sprints.length === 0){
            const sprint = await models.Sprint.create({name, columnId, order: 0});
            return sprint;
        }
        sprints = sprints.sort((a, b) => a.order - b.order);
        const column = await models.Sprint.create({name, columnId, order: (sprints[sprints.length-1].order+1)});
        return column;
    },

    async deleteSprint(id) {
        let sprints = await models.Sprint.destroy({where: {
            id
        }});
        if(sprints == null) throw new Error("Error delete sprint");
        return sprints;
    },

    async addUserBySprint(id, userId) {
        let participants = await models.Participant.create({userId, sprintId: id});
        return participants;
    },

    async deleteUserInSprint(id, userId) {
        let participants = await models.Participant.destroy({ where: {userId, sprintId: id}});
        return participants;
    },

    async allParticipantBySprint(sprintId) {
      let participants = await models.Participant.findAll({where: { sprintId }});
      return participants;
    },

    async addComment(comment, userId, sprintId) {
        let newComment = await models.Comments.create({comment, userId, sprintId});
        return newComment;
    },

    async deleteComment(id) {
        let deleteComment = await models.Comments.destroy({ where: { id }});
        return deleteComment;
    },

    async allCommentBySprint(sprintId) {
        let comments = await models.Comments.findAll({ where: { sprintId }});
        return comments;
    },

    async allSprints(columnId) {
        let sprints = await models.Sprint.findAll({where: {columnId}});
        return sprints.sort((a, b) => a.order - b.order);;
    }
};
