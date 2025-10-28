import { combineReducers } from "redux";
import { userReducer } from "./users.reducers";
import { loginReducer } from "./login.reducers";
import { menubuilderReducers } from "./menubuilder.reducers";
import { ticketReducers } from "./ticket.reducer";
import { assetsReducers } from "./assets.reducers";
import { categorySubCategoryReducers } from "./categorySubCategory.reducers";

// combineReducers returns a single reducer function ✅
const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
  menubuilder: menubuilderReducers,
  ticket: ticketReducers,
  CategorySubcategory: categorySubCategoryReducers,
  assets: assetsReducers
});

export default rootReducer;
