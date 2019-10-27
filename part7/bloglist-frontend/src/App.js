import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import Blog from "./components/blogs/Blog";
import Blogs from "./components/blogs/Blogs";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import Notification from "./components/Notification";
import UserDetails from "./components/users/UserDetails";
import Users from "./components/users/Users";
import { initializeBlogs, sortBlogs } from "./reducers/blogsReducer";
import { initUser, logoutUser } from "./reducers/userReducer";

const App = ({ initUser, initializeBlogs, user }) => {
  useEffect(() => {
    initUser();
  }, [initUser]);

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

  return (
    <Container>
      <Header as="h1">Blogs</Header>
      <Router>
        <Navigation />
        <Route exact path="/">
          <Blogs />
        </Route>
        <Route exact path="/blogs">
          <Blogs />
        </Route>
        <Route exact path="/blogs/:id">
          <Blog />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/users/:id">
          <UserDetails />
        </Route>
        <Route
          exact
          path="/login"
          render={() => (user ? <Redirect to="/blogs" /> : <LoginForm />)}
        />
      </Router>
      <Notification />
    </Container>
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
