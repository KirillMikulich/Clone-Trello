export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
});

export const deleteUser = () => ({
  type: 'DELETE_USER',
  payload: null
});