const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const createNotification = message => {
  return {
    type: "NEW_NOTIFICATION",
    data: message
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  };
};

export default reducer;
