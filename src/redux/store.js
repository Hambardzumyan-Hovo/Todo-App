import { combineReducers, compose, createStore } from "redux";
import todoReducer from "./todoReducer";

const reducers = combineReducers({
  todos: todoReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers());

export default store;
