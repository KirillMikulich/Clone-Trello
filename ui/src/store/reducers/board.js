import { BOARD_ACTION } from '../actions/board';

const boardReducer = (state = null, action) => {
    switch(action.type){
        case BOARD_ACTION.SET_BOARD_ID: {
            return action.payload;
        }
        case BOARD_ACTION.DELETE_BOARD_ID: {
            return null;
        }
        default: {
            return state;
        }
    }
};

export default boardReducer;
