import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { initializeBlogs, sortBlogs } from "./reducers/blogsReducer";
import { initUser, logoutUser } from "./reducers/userReducer";

const App = ({ initializeBlogs, user, initUser, logoutUser, sortBlogs }) => {
  const [sortAscending, setSortAscending] = useState(false);

  const sort = () => {
    sortBlogs(sortAscending);
    setSortAscending(!sortAscending);
  };

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      {user !== null ? (
        <div className="blogs-section">
          {user.name} logged in
          <button onClick={() => logoutUser()}>logout</button>
          <br />
          <br />
          <button onClick={sort}>
            sort {sortAscending ? "ascending" : "descending"}
          </button>
          <BlogList />
          <AddBlog />
        </div>
      ) : (
        <div className="login-section">
          <h2>Log in to application</h2>
          <LoginForm className="login-form" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { initializeBlogs, initUser, logoutUser, sortBlogs }
)(App);
