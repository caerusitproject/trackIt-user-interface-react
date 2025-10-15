// src/reducers/userReducer.js
const initialState = {
 allUsers:[],
 ticketObj:null,
 loading:false
};

export const ticketReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_USERS':
      return { ...state, loading: true, allUsers: action.payload };

    case 'CREATE_TICKET':
      return { ...state, loading: true, ticketObj: action.payload };
    
    default:
      return state;
  }
};
