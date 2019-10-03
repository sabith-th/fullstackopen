import React, { useState } from "react";

const PersonForm = ({ onSubmit, persons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const isDuplicate = name =>
    persons.filter(person => person.name.toLowerCase() === name.toLowerCase())
      .length > 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (isDuplicate(newName)) {
      alert(`${newName} is already on the phonebook!!!`);
    } else {
      onSubmit(newName, newNumber);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={e => setNewName(e.target.value)} />
      </div>
      <div>
        phone:{" "}
        <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
