import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import contactsService from "./services/contactsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    contactsService.getAll().then(persons => setPersons(persons));
  }, []);

  const createNotification = (message, status) => {
    setNotification({
      message,
      status
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

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
    createNotification(`${newName} added to contact`, "success");
    setSearchResult(null);
  };

  const deletePerson = ({ id, name }) => {
    contactsService
      .deleteContact(id)
      .then(response => {
        if (response.status === 204) {
          setPersons(persons.filter(person => person.id !== id));
          createNotification(`${name} deleted from contact`, "success");
        }
      })
      .catch(e => {
        if (e.response.status === 404) {
          createNotification(
            `${name} contact details not found on server`,
            "error"
          );
          setPersons(persons.filter(person => person.id !== id));
        } else {
          console.error(e);
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
    createNotification(`${contact.name} contact info updated`, "success");
    setSearchResult(null);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification !== null ? (
        <Notification notification={notification} />
      ) : null}
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
