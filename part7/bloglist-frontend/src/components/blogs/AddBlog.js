import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Icon, Segment } from "semantic-ui-react";
import { useField } from "../../hooks";
import { createBlog } from "../../reducers/blogsReducer";

const AddBlog = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const [visible, setVisible] = useState(false);

  const handleSubmit = e => {
    try {
      e.preventDefault();
      toggleVisibility();
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      };
      createBlog(newBlog);
      resetTitle();
      resetAuthor();
      resetUrl();
    } catch (e) {
      console.log("Exception creating new blog", e);
    }
  };

  const toggleVisibility = () => setVisible(!visible);

  return visible ? (
    <Segment>
      <h2>Create new blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title: </label>
          <input {...title} />
        </Form.Field>
        <Form.Field>
          <label>Author: </label>
          <input {...author} />
        </Form.Field>
        <Form.Field>
          <label>URL: </label>
          <input {...url} />
        </Form.Field>
        <Button.Group>
          <Button onClick={toggleVisibility}>Cancel</Button>
          <Button.Or />
          <Button positive type="submit">
            Save
          </Button>
        </Button.Group>
      </Form>
    </Segment>
  ) : (
    <Button icon onClick={toggleVisibility}>
      <Icon name="blogger" />
      New Blog
    </Button>
  );
};

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBlog }
)(AddBlog);
