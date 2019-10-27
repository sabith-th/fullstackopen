import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List } from "semantic-ui-react";

const BlogList = ({ blogs }) => {
  const buildBlogsList = blogs =>
    blogs.map(blog => (
      <List.Item key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          <List.Content>
            <List.Header>
              {blog.title} by {blog.author}
            </List.Header>
          </List.Content>
        </Link>
      </List.Item>
    ));

  return blogs ? (
    <List divided animated size="large">
      {buildBlogsList(blogs)}
    </List>
  ) : null;
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(mapStateToProps)(BlogList);
