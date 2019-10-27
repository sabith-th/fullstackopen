import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUsers } from "../reducers/usersReducer";

const Users = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const buildUsersList = users =>
    users.map(user => {
      return (
        <tr key={user.id}>
          <td>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </td>
          <td>{user.blogs.length}</td>
        </tr>
      );
    });

  return (
    <div>
      <h2>Users</h2>
      {users && users.length && (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>{buildUsersList(users)}</tbody>
        </table>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Users);
