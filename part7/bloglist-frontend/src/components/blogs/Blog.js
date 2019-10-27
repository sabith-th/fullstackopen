import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { deleteBlog, updateLikes } from "../../reducers/blogsReducer";

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
    <Segment>
      <Header>
        {blog.title} by {blog.author}
      </Header>
      <p>
        URL: <a href={blog.url}>{blog.url}</a>
      </p>
      <Label as="a" basic horizontal>
        Added by {blog.user.name}
      </Label>
      <Divider />
      <Button as="div" labelPosition="right">
        <Button icon onClick={likeBlog}>
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic pointing="left">
          {blog.likes}
        </Label>
      </Button>

      {user && user.username === blog.user.username ? (
        <Button icon labelPosition="left" onClick={handleDelete} color="red">
          <Icon name="delete" />
          Delete
        </Button>
      ) : null}
    </Segment>
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
