import PropTypes from "prop-types";
import React, { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ loginUser, createNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUsername("");
      setPassword("");
      loginUser(user);
    } catch (e) {
      createNotification("Invalid username or password", "error");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username:{" "}
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
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
