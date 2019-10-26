import React from "react";
import { connect } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  const buildBlogsList = blogs =>
    blogs.map(blog => <Blog key={blog.id} blog={blog} />);
  return blogs && buildBlogsList(blogs);
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps)(BlogList);
