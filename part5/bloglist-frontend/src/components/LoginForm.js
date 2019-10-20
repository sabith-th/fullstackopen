import PropTypes from "prop-types";
import React from "react";
import { useField } from "../hooks";
import loginService from "../services/login";

const LoginForm = ({ loginUser, createNotification }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });
      resetUsername();
      resetPassword();
      loginUser(user);
    } catch (e) {
      createNotification("Invalid username or password", "error");
    }
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
  loginUser: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired
};

export default LoginForm;
