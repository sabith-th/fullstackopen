import React, { useEffect } from "react";
import { connect } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import anecdotesService from "./services/anecdotesService";

const App = ({ initializeAnecdotes }) => {
  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => initializeAnecdotes(anecdotes));
  });

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default connect(
  null,
  { initializeAnecdotes }
)(App);
