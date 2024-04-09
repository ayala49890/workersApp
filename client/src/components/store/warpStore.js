import { createStore, combineReducers, applyMiddleware } from "redux";
import User from "./reducerUser";
import Worker from "./reducerWorker";
import Role from "./reducerRole";
import { thunk } from "redux-thunk";
const reducers = combineReducers({
  user: User,
  workers: Worker,
  roles: Role,
  selectedWorker: Worker,
});
export const store = createStore(reducers, applyMiddleware(thunk));
