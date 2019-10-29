import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Header, Segment } from "semantic-ui-react";
import { sortBlogs } from "../../reducers/blogsReducer";
import AddBlog from "./AddBlog";
import BlogList from "./BlogList";

const Blogs = ({ user, sortBlogs }) => {
  const [sortAscending, setSortAscending] = useState(false);

  const sort = () => {
    sortBlogs(sortAscending);
    setSortAscending(!sortAscending);
  };

  return (
    <Segment className="blogs-section">
      <Button
        onClick={sort}
        floated="right"
        compact
        circular
        data-cy="sort-btn"
      >
        Sort {sortAscending ? "Ascending" : "Descending"}
      </Button>
      <Header>List of Blogs</Header>
      <BlogList />
      {user ? <AddBlog /> : null}
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { sortBlogs }
)(Blogs);
