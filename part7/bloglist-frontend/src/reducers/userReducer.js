import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_USER":
      return action.data;
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedinUser", JSON.stringify(user));
      blogsService.setToken(user.token);
      dispatch({
        type: "LOGIN",
        data: user
      });
      dispatch(
        setNotification(`${user.name} successfully logged in`, "success", 5)
      );
    } catch (e) {
      console.log("Error logging in user", e);
      dispatch(setNotification("Invalid username or password", "error", 3));
    }
  };
};

export const logoutUser = () => {
  window.localStorage.removeItem("loggedinUser");
  blogsService.setToken(null);
  return {
    type: "LOGOUT"
  };
};

export const initUser = () => {
  const loggedinUser = window.localStorage.getItem("loggedinUser");
  if (loggedinUser) {
    const user = JSON.parse(loggedinUser);
    blogsService.setToken(user.token);
    return {
      type: "INIT_USER",
      data: user
    };
  }
  return {
    type: "NONE"
  };
};

export default reducer;
