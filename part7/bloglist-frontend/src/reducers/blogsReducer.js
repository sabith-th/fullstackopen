import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return [...action.data];
    case "NEW_BLOG":
      return [...state, action.data];
    case "UPDATE_LIKES":
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      );
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.data.id);
    case "SORT_ASCENDING":
      return [...state].sort((a, b) => a.likes - b.likes);
    case "SORT_DESCENDING":
      return [...state].sort((a, b) => b.likes - a.likes);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogsService.getAll();
      dispatch({
        type: "INIT_BLOGS",
        data: blogs
      });
    } catch (e) {
      console.log("Error initializing blogs", e);
      dispatch(setNotification("Error getting blogs", "error", 3));
    }
  };
};

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogsService.create(blog);
      dispatch({
        type: "NEW_BLOG",
        data: newBlog
      });
      dispatch(
        setNotification(`${blog.title} by ${blog.author} created`, "success", 3)
      );
    } catch (e) {
      console.log("Error adding a new blog", e);
      dispatch(setNotification("Error creating a new blog", "error", 3));
    }
  };
};

export const updateLikes = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogsService.updateLikes(blog);
      dispatch({
        type: "UPDATE_LIKES",
        data: { ...blog, likes: updatedBlog.likes }
      });
      dispatch(
        setNotification(
          `You voted for ${blog.title} by ${blog.author}`,
          "success",
          3
        )
      );
    } catch (e) {
      console.log("Error updating likes", e);
      dispatch(
        setNotification(`Error updating likes for ${blog.title}`, "error", 3)
      );
    }
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    try {
      await blogsService.deleteBlog(blog);
      dispatch({
        type: "DELETE_BLOG",
        data: blog
      });
      dispatch(
        setNotification(`${blog.title} by ${blog.author} deleted`, "success", 3)
      );
    } catch (e) {
      console.log("Error deleting blog", e);
      dispatch(
        setNotification(`Error deleting blog ${blog.title}`, "error", 3)
      );
    }
  };
};

export const sortBlogs = (sortAscending = true) => {
  if (sortAscending) {
    return {
      type: "SORT_ASCENDING"
    };
  }
  return {
    type: "SORT_DESCENDING"
  };
};

export default reducer;
