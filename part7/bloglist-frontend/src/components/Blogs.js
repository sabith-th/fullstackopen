import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initializeBlogs, sortBlogs } from "../reducers/blogsReducer";
import AddBlog from "./AddBlog";
import BlogList from "./BlogList";

const Blogs = ({ sortBlogs, initializeBlogs }) => {
  const [sortAscending, setSortAscending] = useState(false);

  const sort = () => {
    sortBlogs(sortAscending);
    setSortAscending(!sortAscending);
  };

  useEffect(() => {
    initializeBlogs();
  }, [initializeBlogs]);

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
  { sortBlogs, initializeBlogs }
)(Blogs);
