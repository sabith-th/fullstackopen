import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Form, Header, Segment } from "semantic-ui-react";
import { useField } from "../hooks";
import { loginUser, signupUser } from "../reducers/userReducer";

const LoginForm = ({ loginUser, signupUser }) => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");
  const { reset: resetName, ...name } = useField("text");
  const [newUser, setNewUser] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value
    };
    if (newUser) {
      signupUser({ ...credentials, name: name.value });
    } else {
      loginUser(credentials);
    }
    resetName();
    resetUsername();
    resetPassword();
  };

  return (
    <Segment className="login-section">
      <Header as="h2">Log in to application</Header>
      <Form onSubmit={handleLogin}>
        {newUser ? (
          <Form.Field>
            <label>Name: </label>
            <input {...name} />
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>Username: </label>
          <input {...username} />
        </Form.Field>
        <Form.Field>
          <label>Password: </label>
          <input {...password} />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="New User?"
            onClick={() => setNewUser(!newUser)}
            checked={newUser}
          />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </Segment>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { loginUser, signupUser }
  )(LoginForm)
);
