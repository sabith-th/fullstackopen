import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, List, Segment } from "semantic-ui-react";
import { getAllUsers } from "../../reducers/usersReducer";

const UserDetails = ({ user }) => {
  const buildUserProfile = user => {
    return (
      <Segment>
        <Header>{user.name}</Header>
        <Header as="h4">Added Blogs</Header>
        <List divided>
          {user.blogs.map(blog => (
            <List.Item key={blog.id}>{blog.title}</List.Item>
          ))}
        </List>
      </Segment>
    );
  };

  return user ? buildUserProfile(user) : null;
};

const getUser = ({ users }, id) => users.find(user => user.id === id);

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    user: getUser(state, id)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getAllUsers }
  )(UserDetails)
);
