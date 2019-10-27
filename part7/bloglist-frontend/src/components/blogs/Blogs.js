import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Segment } from "semantic-ui-react";
import { sortBlogs } from "../../reducers/blogsReducer";
import AddBlog from "./AddBlog";
import BlogList from "./BlogList";

const Blogs = ({ sortBlogs }) => {
  const [sortAscending, setSortAscending] = useState(false);

  const sort = () => {
    sortBlogs(sortAscending);
    setSortAscending(!sortAscending);
  };

  return (
    <Segment className="blogs-section">
      <Button onClick={sort}>
        Sort {sortAscending ? "Ascending" : "Descending"}
      </Button>
      <BlogList />
      <AddBlog />
    </Segment>
  );
};

export default connect(
  null,
  { sortBlogs }
)(Blogs);
