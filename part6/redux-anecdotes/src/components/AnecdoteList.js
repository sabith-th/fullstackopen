import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification
} from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotesService";

const AnecdoteList = ({
  anecdotes,
  addVote,
  createNotification,
  removeNotification
}) => {
  const vote = async anecdote => {
    const newAnecdote = await anecdotesService.addVote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    addVote(newAnecdote);
    createNotification(`You voted for ${anecdote.content}`);
    setTimeout(() => {
      removeNotification();
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map(anecdote => (
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

const filterAnecdotes = ({ anecdotes, filter }) => {
  return filter
    ? anecdotes.filter(a =>
        a.content.toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes;
};

const mapStateToProps = state => {
  return {
    anecdotes: filterAnecdotes(state),
    filter: state.filter
  };
};

export default connect(
  mapStateToProps,
  { addVote, createNotification, removeNotification }
)(AnecdoteList);
