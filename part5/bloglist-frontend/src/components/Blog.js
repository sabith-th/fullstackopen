import React, { useState } from "react";

const Blog = ({ blog, updateBlogLikes, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const updateLikes = () => {
    updateBlogLikes({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author} ?`);
    if (confirm) {
      deleteBlog(blog);
    }
  };

  const detailsBox = () => {
    return (
      <div className="blog-details">
        <p>
          {blog.title} by {blog.author}
        </p>
        <a href={blog.url}>{blog.url}</a>
        <p>
          Likes: {blog.likes}
          <button onClick={updateLikes}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <button onClick={handleDelete}>remove</button>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className="blog-title" onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
      {showDetails ? detailsBox() : null}
    </div>
  );
};

export default Blog;
