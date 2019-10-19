import PropTypes from "prop-types";
import React, { useState } from "react";
import blogsService from "../services/blogs";

const AddBlog = ({ updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      toggleVisibility();
      const newBlog = await blogsService.create({ title, author, url });
      updateBlogs(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
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
          title:{" "}
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          author:{" "}
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={e => setUrl(e.target.value)} />
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
  updateBlogs: PropTypes.func.isRequired
};

export default AddBlog;
