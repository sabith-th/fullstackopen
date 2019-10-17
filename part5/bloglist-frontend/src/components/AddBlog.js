import React, { useState } from "react";
import blogsService from "../services/blogs";

const AddBlog = ({ updateBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const newBlog = await blogsService.create({ title, author, url });
    updateBlogs(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title: <input value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        author:{" "}
        <input value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        url: <input value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AddBlog;
