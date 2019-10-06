import React, { useState } from "react";

const PersonForm = ({ addNewContact, persons, updateContact }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const findDuplicate = name =>
    persons.find(person => person.name.toLowerCase() === name.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();
    const duplicate = findDuplicate(newName);

    if (duplicate) {
      const confirm = window.confirm(`Update ${newName} contact info?`);
      if (confirm) {
        updateContact(duplicate.id, { ...duplicate, number: newNumber });
      }
    } else {
      addNewContact(newName, newNumber);
    }
    setNewName("");
    setNewNumber("");
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
