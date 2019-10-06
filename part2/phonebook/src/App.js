import axios from "axios";
import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons([...response.data]));
  }, []);

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
