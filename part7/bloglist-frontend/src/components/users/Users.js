import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Segment, Table } from "semantic-ui-react";
import { getAllUsers } from "../../reducers/usersReducer";

const Users = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const buildUsersList = users =>
    users.map(user => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </Table.Cell>
          <Table.Cell>{user.blogs.length}</Table.Cell>
        </Table.Row>
      );
    });

  return (
    <Segment>
      <Header>Users</Header>
      {users && users.length && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Blogs Created</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{buildUsersList(users)}</Table.Body>
        </Table>
      )}
    </Segment>
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
