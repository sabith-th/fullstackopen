import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const vote = type => {
    store.dispatch({
      type
    });
  };

  return (
    <div>
      <button onClick={() => vote("GOOD")}>good</button>
      <button onClick={() => vote("OK")}>neutral</button>
      <button onClick={() => vote("BAD")}>bad</button>
      <button onClick={() => vote("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
