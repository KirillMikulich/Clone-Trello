import {  combineReducers } from 'redux';
import userReducers from './user';
import columnsReducer from './columns';
import boardReducer from './board';

const rootReducer = combineReducers({
    user: userReducers,
    boardId: boardReducer,
    columns: columnsReducer
});

export default rootReducer;
