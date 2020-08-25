import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer, channelReducer } from "./reducers";

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
