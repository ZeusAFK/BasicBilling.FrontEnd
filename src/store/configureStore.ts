import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import billingReducer from "./reducers/billingReducer";

const rootReducer = combineReducers({ billing: billingReducer });

export interface Store {
  billing: any;
}

const configureStore = createStore(rootReducer, composeWithDevTools());

export default configureStore;
