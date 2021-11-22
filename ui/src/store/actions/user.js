
export const USER_ACTION = {
  SET_USER: 'SET_USER',
  DELETE_USER: 'DELETE_USER'
};

export const setUser = (user) => ({
  type: USER_ACTION.SET_USER,
  payload: user
});

export const deleteUser = () => ({
  type: USER_ACTION.DELETE_USER,
  payload: null
});
