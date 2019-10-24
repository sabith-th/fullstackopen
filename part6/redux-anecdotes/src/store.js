import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  messages: notificationReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
