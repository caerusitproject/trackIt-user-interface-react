import { registerUser } from "../actions";

// src/reducers/userReducer.js
const initialState = {
  loading: false,
  data: null,
  error: null,
  captchadata:null,
  registerData:null,
  userProfileData:null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'USER_SUCCESS':
      return { ...state, loading: false, dataList: action.payload };
    case 'USER_FAILURE':
      return { ...state, loading: false, error: action.error };
    case 'REGISTER_USER':
      return { ...state, loading: false, registerData: action.payload };

    case 'USER_PROFILE_DATA':
      return { ...state, loading: false, userProfileData: action.payload };
     case 'CAPTCHA_DATA':
      return { ...state, captchadata:action.payload };
    case 'OPEN_LOADER':
        return {...state,loading: true}
    case 'CLOSE_LOADER':
        return {...state,loading: false}
    default:
      return state;
  }
};
