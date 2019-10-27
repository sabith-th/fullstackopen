import usersService from "../services/users";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ALL_USERS":
      return [...action.data];
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll();
    dispatch({
      type: "ALL_USERS",
      data: users
    });
  };
};

export default reducer;
