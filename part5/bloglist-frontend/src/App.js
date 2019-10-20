import React, { useEffect, useState } from "react";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogsService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sortAscending, setSortAscending] = useState(false);

  const fetchData = async () => {
    const blogs = await blogsService.getAll();
    setBlogs(blogs);
  };

  const logoutUser = () => {
    window.localStorage.removeItem("loggedinUser");
    setUser(null);
    blogsService.setToken(null);
  };

  const loginUser = user => {
    window.localStorage.setItem("loggedinUser", JSON.stringify(user));
    setUser(user);
    blogsService.setToken(user.token);
  };

  const updateBlogs = newBlog => {
    setBlogs([...blogs, newBlog]);
    createNotification(
      `A new blog ${newBlog.title} by ${newBlog.author} added`,
      "success"
    );
  };

  const sortBlogs = () => {
    blogs.sort((a, b) => {
      return sortAscending ? a.likes - b.likes : b.likes - a.likes;
    });
    setBlogs([...blogs]);
    setSortAscending(!sortAscending);
  };

  const updateBlogLikes = async blog => {
    try {
      const updatedBlog = await blogsService.updateLikes(blog);
      setBlogs(
        blogs.map(b =>
          b.id !== blog.id ? b : { ...b, likes: updatedBlog.likes }
        )
      );
    } catch (e) {
      console.log("Exception updating likes ", e);
    }
  };

  const deleteBlog = async blog => {
    try {
      const response = await blogsService.deleteBlog(blog);
      if (response.status === 204) {
        setBlogs(blogs.filter(b => b.id !== blog.id));
        createNotification(
          `${blog.title} by ${blog.author} deleted`,
          "success"
        );
      }
    } catch (e) {
      console.log("Exception deleting blog ", e);
    }
  };

  const createNotification = (message, status) => {
    setNotification({
      message,
      status
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem("loggedinUser");
    if (loggedinUser) {
      const user = JSON.parse(loggedinUser);
      setUser(user);
      blogsService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      {notification !== null ? (
        <Notification notification={notification} />
      ) : null}
      {user !== null ? (
        <div className="blogs-section">
          {user.name} logged in
          <button onClick={logoutUser}>logout</button>
          <br />
          <br />
          <button onClick={sortBlogs}>
            sort {sortAscending ? "ascending" : "descending"}
          </button>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogLikes={updateBlogLikes}
              user={user}
              deleteBlog={deleteBlog}
            />
          ))}
          <AddBlog updateBlogs={updateBlogs} />
        </div>
      ) : (
        <div className="login-section">
          <h2>Log in to application</h2>
          <LoginForm
            loginUser={loginUser}
            createNotification={createNotification}
            className="login-form"
          />
        </div>
      )}
    </div>
  );
};

export default App;
