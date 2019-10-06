import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/contactsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    contactsService.getAll().then(persons => setPersons(persons));
  }, []);

  const searchName = e => {
    const result = persons.filter(person =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResult([...result]);
  };

  const addNewContact = (newName, newNumber) => {
    const newContact = {
      name: newName,
      number: newNumber
    };
    contactsService
      .saveContact(newContact)
      .then(savedContact => setPersons([...persons, savedContact]));
    setSearchResult(null);
  };

  const deletePerson = id => {
    contactsService.deleteContact(id).then(response => {
      if (response.status === 200) {
        setPersons(persons.filter(person => person.id !== id));
      }
    });
  };

  const updateContact = (id, contact) => {
    contactsService
      .updateContact(id, contact)
      .then(updatedContact =>
        setPersons(
          persons.map(person => (person.id !== id ? person : updatedContact))
        )
      );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={searchName} />
      <PersonForm
        addNewContact={addNewContact}
        persons={persons}
        updateContact={updateContact}
      />
      <h2>Numbers</h2>
      <Persons
        persons={searchResult !== null ? searchResult : persons}
        onDelete={deletePerson}
      />
    </div>
  );
};

export default App;
