import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger";
import { rootReducers } from "./reducer";

const configureStore = (reducers = {}, preLoadedState = {}, midlewares = []) =>
  createStore(
    combineReducers({ ...rootReducers, ...reducers }),
    preLoadedState,
    compose(
      applyMiddleware(...midlewares, thunk, reduxLogger),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export const store = configureStore();
