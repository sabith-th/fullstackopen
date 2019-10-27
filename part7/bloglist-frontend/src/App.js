import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import UserDetails from "./components/UserDetails";
import Users from "./components/Users";
import { initializeBlogs, sortBlogs } from "./reducers/blogsReducer";
import { initUser, logoutUser } from "./reducers/userReducer";

const App = ({ initUser }) => {
  useEffect(() => {
    initUser();
  }, [initUser]);

  return (
    <div>
      <h1>Blogs</h1>
      <Router>
        <Notification />
        <Navigation />
        <Route exact path="/">
          <Blogs />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id">
          <UserDetails />
        </Route>
        <Route exact path="/login">
          <LoginForm className="login-form" />
        </Route>
      </Router>
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
