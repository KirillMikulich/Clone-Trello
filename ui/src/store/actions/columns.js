
export const COLUMNS_ACTION = {
    SET_COLUMNS: 'SET_COLUMNS',
    DELETE_COLUMNS: 'DELETE_COLUMNS',
};

export const setColumns = (board) => ({
    type: COLUMNS_ACTION.SET_COLUMNS,
    payload: board
});

export const deleteColumns = () => ({
    type: COLUMNS_ACTION.DELETE_COLUMNS
});
