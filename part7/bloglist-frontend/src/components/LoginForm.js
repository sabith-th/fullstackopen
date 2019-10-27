import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { useField } from "../hooks";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ loginUser }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();
    loginUser({
      username: username.value,
      password: password.value
    });
    history.push("/blogs");
    resetUsername();
    resetPassword();
  };

  return (
    <div className="login-section">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: <input {...username} />
        </div>
        <div>
          password: <input {...password} />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { loginUser }
  )(LoginForm)
);
