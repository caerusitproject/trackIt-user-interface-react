import { combineReducers } from "redux";
import { userReducer } from "./users.reducers";
import { loginReducer } from "./login.reducers";

// combineReducers returns a single reducer function ✅
const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
});

export default rootReducer;
