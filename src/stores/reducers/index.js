import { combineReducers } from "redux";
import { userReducer } from "./users.reducers";
import { loginReducer } from "./login.reducers";
import { menubuilderReducers } from "./menubuilder.reducers";

// combineReducers returns a single reducer function ✅
const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  menubuilder: menubuilderReducers
});

export default rootReducer;
