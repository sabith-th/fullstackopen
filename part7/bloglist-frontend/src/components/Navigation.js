import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Navigation = ({ user, logoutUser }) => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <Link to="/blogs" style={padding}>
        Blogs
      </Link>
      <Link to="/users" style={padding}>
        Users
      </Link>
      {user ? (
        <p>
          {user.name} logged in
          <button onClick={() => logoutUser()}>logout</button>
        </p>
      ) : (
        <Link to="/login" style={padding}>
          Login
        </Link>
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
  { logoutUser }
)(Navigation);
