import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteBlog, updateLikes } from "../reducers/blogsReducer";

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const likeBlog = () => {
    updateLikes({ ...blog, likes: blog.likes + 1 });
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
          <button onClick={likeBlog}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user && user.username === blog.user.username ? (
          <button onClick={handleDelete}>remove</button>
        ) : null}
      </div>
    );
  };

  return (
    <div className="blog-item">
      <div className="blog-title" onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
      {showDetails ? detailsBox() : null}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { updateLikes, deleteBlog }
)(Blog);
