import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { deleteBlog, updateLikes } from "../reducers/blogsReducer";

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const history = useHistory();
  const likeBlog = () => {
    updateLikes({ ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author} ?`);
    if (confirm) {
      deleteBlog(blog);
      history.push("/blogs");
    }
  };

  return blog ? (
    <div className="blog-item">
      <div className="blog-title">
        {blog.title} by {blog.author}
      </div>
      <div className="blog-details">
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
    </div>
  ) : null;
};

Blog.propTypes = {
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    user: state.user,
    blog: state.blogs.find(blog => blog.id === id)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { updateLikes, deleteBlog }
  )(Blog)
);
