import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useField } from "../../hooks";
import { createBlog } from "../../reducers/blogsReducer";
import blogsService from "../../services/blogs";

const AddBlog = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");

  const [visible, setVisible] = useState(false);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      toggleVisibility();
      const newBlog = await blogsService.create({
        title: title.value,
        author: author.value,
        url: url.value
      });
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
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input {...title} />
        </div>
        <div>
          author: <input {...author} />
        </div>
        <div>
          url: <input {...url} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={toggleVisibility}>
          cancel
        </button>
      </form>
    </div>
  ) : (
    <button onClick={toggleVisibility}>new note</button>
  );
};

AddBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
};

export default connect(
  null,
  { createBlog }
)(AddBlog);
