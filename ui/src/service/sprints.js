import $api from '../http';

const SprintService = {
    allSprints(columnId){
        return $api.get(`/sprint/all-sprint/${columnId}`).then(res => res.data);
    },
    deleteSprint(id) {
        return $api.get(`/sprint/delete-sprint/${id}`).then(res => res.data);
    },
    addSprint(columnId, name) {
        return $api.post(`/sprint/add-sprint`, {columnId, name}).then(res => res.data);
    }
};

export default  SprintService;
