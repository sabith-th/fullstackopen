import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const handleChange = e => {
    const filter = e.target.value;
    setFilter(filter);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default connect(
  null,
  { setFilter }
)(Filter);
