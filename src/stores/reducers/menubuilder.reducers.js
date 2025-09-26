// src/reducers/userReducer.js
const initialState = {
 menusSubmenus:[]
};

export const menubuilderReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_ITEMS':
      return { ...state, loading: true, menusSubmenus: action.payload };
    
    default:
      return state;
  }
};
