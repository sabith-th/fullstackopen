import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = ({ show, login: loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { error }] = useMutation(LOGIN, {
    update(
      cache,
      {
        data: { login }
      }
    ) {
      const { value } = login;
      loginUser(value);
    }
  });

  if (!show) {
    return null;
  }

  const submit = e => {
    e.preventDefault();
    login({
      variables: { username, password }
    });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {error ? <div>{error.graphQLErrors[0].message}</div> : null}
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
