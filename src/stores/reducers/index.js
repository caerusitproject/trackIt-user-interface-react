import { combineReducers } from "redux";
import { userReducer } from "./users.reducers";
import { loginReducer } from "./login.reducers";
import { menubuilderReducers } from "./menubuilder.reducers";
import { ticketReducers } from "./ticket.reducer";
import { assetReducer } from "./assets.reducers";

// combineReducers returns a single reducer function ✅
const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  menubuilder: menubuilderReducers,
  ticket:ticketReducers,
  assets:assetReducer
});

export default rootReducer;
