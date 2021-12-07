import $api from '../http';

const SprintService = {
    allSprints(columnId) {
        return $api.get(`/sprint/all-sprint/${columnId}`).then(res => res.data);
    },
    deleteSprint(id) {
        return $api.get(`/sprint/delete-sprint/${id}`).then(res => res.data);
    },
    addSprint(columnId, name) {
        return $api.post(`/sprint/add-sprint`, {columnId, name}).then(res => res.data);
    },
    getSprintInfo(boardId, sprintId) {
        return $api.get(`/sprint/sprint/${boardId}/${sprintId}`).then(res => res.data);
    },
    changeName(sprintId, name) {
        return $api.get(`/sprint/change-name/${sprintId}/${name}`).then(res => res.data);
    },
    addUserInSprint(userId, sprintId) {
        return $api.get(`/sprint/add-user/${sprintId}/${userId}`).then(res => res.data);
    },
    deleteUser(userId, sprintId) {
        return $api.get(`/sprint/delete-user/${sprintId}/${userId}`).then(res => res.data);
    },
    addComment(comment, userId, sprintId) {
        return $api.post(`/sprint/add-comment`, {comment, userId, sprintId}).then(res => res.data);
    },
    deleteComment(id){
        return $api.get(`/sprint/delete-comment/${id}`).then(res => res.data);
    }
};

export default  SprintService;
