import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotesService";

const AnecdoteForm = ({
  createAnecdote,
  createNotification,
  removeNotification
}) => {
  const addAnecdote = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    const newAnecdote = await anecdotesService.createNew(content);
    createAnecdote(newAnecdote);
    createNotification(`New anecdote ${content} created`);
    setTimeout(() => {
      removeNotification();
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

export default connect(
  null,
  { createAnecdote, createNotification, removeNotification }
)(AnecdoteForm);
