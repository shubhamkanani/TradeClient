import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import headerReducer from "./headerReducer";
import tradeReducer from "./tradeReducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  header: headerReducer,
  trade: tradeReducer,
});
