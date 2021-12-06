
export const BOARD_ACTION = {
    SET_BOARD_ID: 'SET_BOARD_ID',
    DELETE_BOARD_ID: 'DELETE_BOARD_ID',
};

export const setBoardAction = (board) => ({
    type: BOARD_ACTION.SET_BOARD_ID,
    payload: board
});

export const deleteBoardAction = () => ({
    type: BOARD_ACTION.DELETE_BOARD_ID
});
