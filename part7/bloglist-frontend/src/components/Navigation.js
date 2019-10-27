import React from "react";
import { connect } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Navigation = ({ user, logoutUser }) => {
  return (
    user && (
      <div>
        {user.name} logged in
        <button onClick={() => logoutUser()}>logout</button>
      </div>
    )
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
