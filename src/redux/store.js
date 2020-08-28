import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer, channelReducer, alertReducer } from "./reducers";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  alert: alertReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
