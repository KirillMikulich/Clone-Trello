import $api from '../http';

const DashBoardService = {
  getUserDashBoard(id){
    return $api.get(`/board/get-boards/${id}`).then(res => res.data);
  },
  addBoard(userId, isCreator, name ){
    return $api.post(`/board/add`, { userId, isCreator, name }).then(res => res.data);
  },
  deleteBoard(boardId){
    return $api.get(`/board/delete-board/${boardId}`).then(res => res.data);
  },
  addUserInBoard(email, boardId){
    return $api.get(`/board/add-user/${email}/${boardId}`).then(res => res.data);
  },
    deleteUserForId(userId, boardId) {
        return $api.get(`/board/delete-user/${userId}/${boardId}`).then(res => res.data);
    },
    getBoardById(boardId){
        return $api.get(`board/get-board/${boardId}`).then(res => res.data);
    },
    changeName(boardId, name) {
        return $api.post(`board/change-name/${boardId}`, {name}).then(res => res.data);
    }
};

export default  DashBoardService;
