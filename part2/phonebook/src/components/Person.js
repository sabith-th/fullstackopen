import React from "react";

const Person = ({ person, onDelete }) => {
  const handleClick = () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${person.name}?`
    );
    if (confirm) {
      onDelete(person);
    }
  };

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleClick}>Delete Contact </button>
    </div>
  );
};

export default Person;
