import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer,
  filter: filterReducer
});

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
};

render();
store.subscribe(render);
