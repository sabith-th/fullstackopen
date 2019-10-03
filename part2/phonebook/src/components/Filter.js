import React from "react";

const Filter = ({ onChange }) => {
  return (
    <div>
      search: <input onChange={onChange} />
    </div>
  );
};

export default Filter;
