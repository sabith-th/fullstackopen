import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logoutUser } from "../reducers/userReducer";

const Navigation = ({ user, logoutUser }) => {
  return (
    <div>
      <Menu pointing>
        <Link to="/blogs">
          <Menu.Item data-cy="blogs-nav">Blogs</Menu.Item>
        </Link>
        <Link to="/users">
          <Menu.Item data-cy="users-nav">Users</Menu.Item>
        </Link>
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item>{user.name} logged in</Menu.Item>
              <Menu.Item onClick={() => logoutUser()} data-cy="logout-nav">
                Logout
              </Menu.Item>
            </>
          ) : (
            <Link to="/login">
              <Menu.Item data-cy="login-nav">Login</Menu.Item>
            </Link>
          )}
        </Menu.Menu>
      </Menu>
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
  { logoutUser }
)(Navigation);
