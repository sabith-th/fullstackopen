import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  const buildBlogsList = blogs =>
    blogs.map(blog => (
      <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </li>
    ));

  return blogs ? <ul>{buildBlogsList(blogs)}</ul> : null;
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps)(BlogList);
