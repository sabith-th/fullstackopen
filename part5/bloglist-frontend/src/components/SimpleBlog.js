import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div className="simple-blog">
    <div className="simple-blog-title">
      {blog.title} {blog.author}
    </div>
    <div className="simple-blog-likes">
      blog has {blog.likes} likes
      <button onClick={onClick} className="like-btn">
        like
      </button>
    </div>
  </div>
);

export default SimpleBlog;
