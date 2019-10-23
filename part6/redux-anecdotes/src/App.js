import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = ({ store }) => {
  return (
    <div>
      <Notification store={store} />
      <h2>Anecdotes</h2>
      <Filter store={store} />
      <AnecdoteForm store={store} />
      <AnecdoteList store={store} />
    </div>
  );
};

export default App;
