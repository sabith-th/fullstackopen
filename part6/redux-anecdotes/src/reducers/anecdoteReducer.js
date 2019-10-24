import anecdotesService from "../services/anecdotesService";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data.sort((a, b) => b.votes - a.votes);
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "ADD_VOTE":
      const newState = state.map(anecdote =>
        anecdote.id === action.data.id ? action.data : anecdote
      );
      return newState.sort((a, b) => b.votes - a.votes);
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const addVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.addVote(
      anecdote.id,
      anecdote
    );
    dispatch({
      type: "ADD_VOTE",
      data: updatedAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export default reducer;
