// TODO using the configureStore method of the @reduxjs/toolkit package
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  AnyAction,
} from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import reduxLogger from "redux-logger";
import { rootReducers } from "./reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({ ...rootReducers });

const configureStore = (reducers = {}, preLoadedState = {}, midlewares = []) =>
  createStore(
    rootReducer, // combineReducers({ ...rootReducers, ...reducers }),
    preLoadedState,
    compose(
      applyMiddleware(...midlewares, thunk) //reduxLogger
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );

export const store = configureStore();

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
