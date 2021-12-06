import $api from '../http';

const MoveService = {
    swipeColumns(dragId, dropId){
        return $api.get(`/move/columns/${dragId}/${dropId}`).then(res => res.data);
    },
    swipeSprints(dragId, dropId, columnId) {
        return $api.get(`/move/sprints/${dragId}/${dropId}/${columnId}`).then(res => res.data);
    },
    moveSprintToColumn(sprintId, columnId, position) {
        return $api.get(`/move/sprint-to-column/${sprintId}/${columnId}/${position}`).then(res => res.data);
    }
};

export default  MoveService;
