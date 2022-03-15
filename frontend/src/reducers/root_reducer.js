import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import UsersReducer from "./users_reducer";
// import listitems from './listitems_reducer';

const RootReducer = combineReducers({
  session,
  errors,
  users: UsersReducer,
  // listitems,
});

export default RootReducer;
