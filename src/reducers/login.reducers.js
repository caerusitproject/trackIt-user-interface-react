// src/reducers/userReducer.js
const storedUser = localStorage.getItem("user");
const initialState = {
 message:null,
 status:null,
 opener:false,
 collapsed: false,
 isAuthenticated: storedUser ? true : false,
 user: storedUser ? JSON.parse(storedUser) : null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_SNACK_BAR':
      return { 
        ...state, 
        message: action.payload.message,
        status: action.payload.status,
        opener:true
    };
    case 'CLOSE_SNACK_BAR':
      return { 
        ...state, 
        opener:false
    };
    case 'TOGGLE_SIDE_NAVBAR':
      return { 
        ...state, 
        collapsed:!(action.payload)
    };
    case "LOGIN_SUCCESS":
      localStorage.setItem('user',JSON.stringify(action.payload))
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOGOUT":
      localStorage.clear();
      return { ...state, isAuthenticated: false, user: null };
    
    default:
      return state;
  }
};
