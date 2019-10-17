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
        <div>
          {user.name} logged in
          <button onClick={logoutUser}>logout</button>
          <br />
          <br />
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <h2>Create new Blog</h2>
          <AddBlog updateBlogs={updateBlogs} />
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            loginUser={loginUser}
            createNotification={createNotification}
          />
        </div>
      )}
    </div>
  );
};

export default App;
