import React, { useState } from "react";
import { connect } from "react-redux";
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
    <div className="blogs-section">
      <button onClick={sort}>
        sort {sortAscending ? "ascending" : "descending"}
      </button>
      <BlogList />
      <AddBlog />
    </div>
  );
};

export default connect(
  null,
  { sortBlogs }
)(Blogs);
