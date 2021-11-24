import $api from '../http';

const ColumnService = {
  addColumn(boardId, name){
    return $api.post(`/column/add`, {boardId, name}).then(res => res.data);
  },
  getAllColumns(boardId) {
    return $api.get(`/column/all-columns/${boardId}`).then(res => res.data);
  }
};

export default  ColumnService;