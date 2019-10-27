import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllUsers } from "../../reducers/usersReducer";

const UserDetails = ({ user }) => {
  const buildUserProfile = user => {
    return (
      <div>
        <h3>{user.name}</h3>
        <h4>Added Blogs</h4>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
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
