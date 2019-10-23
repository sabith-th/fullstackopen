import React from "react";
import { addVote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification
} from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState();
  const anecdotesToShow = filter
    ? anecdotes.filter(a =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes;

  const vote = anecdote => {
    store.dispatch(addVote(anecdote.id));
    store.dispatch(createNotification(`You voted for ${anecdote.content}`));
    setTimeout(() => {
      store.dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
