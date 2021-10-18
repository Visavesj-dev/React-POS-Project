import { combineReducers } from "redux";
import loginReducer from "./login.reducer";
import stockReducer from "./stock.reducer";
import shopReducer from "./shop.reducer";
import transactionReducer from "./transaction.reducer";

export default combineReducers({
  loginReducer,
  stockReducer,
  shopReducer,
  transactionReducer
});
