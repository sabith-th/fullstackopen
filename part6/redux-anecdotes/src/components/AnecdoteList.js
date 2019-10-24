import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes, addVote, setNotification }) => {
  const vote = async anecdote => {
    addVote({ ...anecdote, votes: anecdote.votes + 1 });
    setNotification(`You voted for ${anecdote.content}`, 5);
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
  { addVote, setNotification }
)(AnecdoteList);
