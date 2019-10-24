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

export const createAnecdote = data => {
  return {
    type: "NEW_ANECDOTE",
    data
  };
};

export const addVote = data => {
  return {
    type: "ADD_VOTE",
    data
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  };
};

export default reducer;
