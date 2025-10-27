// src/reducers/userReducer.js
const storedUser = localStorage.getItem("user");
const initialState = {
 categories:null,
 subcategories:null,
//  status:null,
//  opener:false,
//  collapsed: false,
//  isAuthenticated: storedUser ? true : false,
//  user: storedUser ? JSON.parse(storedUser) : null,
//  drawerMessage:null,
//  toggle:false
};

export const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'CREATE_CATEGORY_ITEM':
    //   return { 
    //     ...state, 
    //     categories: [...state.categories, action.payload],
    //   };
    case 'VIEW_CATEGORIES':
      return { 
        ...state, 
        categories:action.payload
    };
    case 'VIEW_SUB_CATEGORIES':
      return { 
        ...state, 
        subcategories:action.payload
    };
    // case "LOGIN_SUCCESS":
    //   localStorage.setItem('user',JSON.stringify(action.payload))
    //   return { ...state, isAuthenticated: true, user: action.payload };

    // case "OPEN_SIDE_DRAWER":
    //   return { 
    //     ...state, 
    //     drawerMessage:action.payload.message,
    //     toggle:action.payload.toggle
    // };

    // case "LOGOUT":
    //   localStorage.clear();
    //   return { ...state, isAuthenticated: false, user: null };
    
    default:
      return state;
  }
};
