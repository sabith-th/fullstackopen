import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification
} from "../reducers/notificationReducer";

const AnecdoteForm = ({ store }) => {
  const addAnecdote = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    store.dispatch(createAnecdote(content));
    store.dispatch(createNotification(`New anecdote ${content} created`));
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
