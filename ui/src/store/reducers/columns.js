import { COLUMNS_ACTION } from '../actions/columns';

const columnsReducer = (state = [], action) => {
    switch(action.type){
        case COLUMNS_ACTION.SET_COLUMNS: {
            return [
                ...action.payload
            ];
        }
        case COLUMNS_ACTION.DELETE_COLUMNS: {
            return [];
        }
        default: {
            return state;
        }
    }
};

export default columnsReducer;
