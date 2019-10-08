import React from "react";
import Person from "./Person";

const Persons = ({ persons, onDelete }) => {
  const buildPersonsList = persons =>
    persons.map(person => (
      <Person key={person.id} person={person} onDelete={onDelete} />
    ));

  return <div>{buildPersonsList(persons)}</div>;
};

export default Persons;
