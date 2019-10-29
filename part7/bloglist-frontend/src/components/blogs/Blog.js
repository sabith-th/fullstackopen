import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Input,
  Label,
  List,
  Segment
} from "semantic-ui-react";
import { useField } from "../../hooks";
import {
  addComment,
  deleteBlog,
  updateLikes
} from "../../reducers/blogsReducer";

const Blog = ({ blog, updateLikes, user, deleteBlog, addComment }) => {
  const { reset: resetComment, ...comment } = useField("text");
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

  const handleAddComment = () => {
    addComment(blog.id, comment.value);
    resetComment();
  };

  const buildCommentsList = comments =>
    comments.map((comment, index) => (
      <List.Item key={comment + index}>
        <Icon name="comment" /> {comment}
      </List.Item>
    ));

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
        <Button icon onClick={likeBlog} data-cy="like-btn">
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic pointing="left" data-cy="like-count">
          {blog.likes}
        </Label>
      </Button>
      {user && user.username === blog.user.username ? (
        <Button
          icon
          labelPosition="left"
          onClick={handleDelete}
          color="red"
          data-cy="delete-btn"
        >
          <Icon name="delete" />
          Delete
        </Button>
      ) : null}
      <Divider />
      <Header as="h4">Comments</Header>
      <List>{buildCommentsList(blog.comments)}</List>
      <Input
        fluid
        action={{
          icon: "plus",
          onClick: handleAddComment,
          "data-cy": "comment-btn"
        }}
        placeholder="Add new comment"
        {...comment}
        data-cy="comment-box"
      />
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
    { updateLikes, deleteBlog, addComment }
  )(Blog)
);
