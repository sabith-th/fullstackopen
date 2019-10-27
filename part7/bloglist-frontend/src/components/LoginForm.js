import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
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
    <Segment className="login-section">
      <Header as="h2">Log in to application</Header>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username: </label>
          <input {...username} />
        </Form.Field>
        <Form.Field>
          <label>Password: </label>
          <input {...password} />
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
    { loginUser }
  )(LoginForm)
);
