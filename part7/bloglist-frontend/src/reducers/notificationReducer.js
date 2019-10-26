const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return [...state, action.data];
    case "REMOVE_NOTIFICATION":
      return state.filter(notification => notification.id !== action.data);
    default:
      return state;
  }
};

let nextNotificationId = 0;

export const setNotification = (message, status, timeout = 10) => {
  const id = nextNotificationId++;
  return dispatch => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: {
        message,
        status,
        id
      }
    });

    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        data: id
      });
    }, timeout * 1000);
  };
};

export default reducer;
