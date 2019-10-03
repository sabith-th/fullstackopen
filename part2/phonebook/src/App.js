import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const contacts = [
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" }
  ];
  const [persons, setPersons] = useState(contacts);
  const [searchResult, setSearchResult] = useState(null);

  const searchName = e => {
    const result = persons.filter(person =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult([...result]);
  };

  const addName = (newName, newNumber) => {
    setPersons([...persons, { name: newName, number: newNumber }]);
    setSearchResult(null);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={searchName} />
      <PersonForm onSubmit={addName} persons={persons} />
      <h2>Numbers</h2>
      <Persons persons={searchResult !== null ? searchResult : persons} />
    </div>
  );
};

export default App;
