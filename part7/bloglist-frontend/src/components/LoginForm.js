import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useField } from "../hooks";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ loginUser }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = async e => {
    e.preventDefault();
    loginUser({
      username: username.value,
      password: password.value
    });
    resetUsername();
    resetPassword();
  };

  return (
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
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { loginUser }
)(LoginForm);
