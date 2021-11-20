const initialState = null;

const userReducer = (state = initialState, action) => {
  switch(action){
    case 'SET_USER': {
      return {
        ...state,
        user: action.payload
      };
    }
    case 'DELETE_USER': {
      return {
        ...state,
        user: null
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;