import React from "react";
import Person from "./Person";

const Persons = ({ persons }) => {
  const buildPersonsList = persons =>
    persons.map(person => <Person key={person.name} person={person} />);

  return <div>{buildPersonsList(persons)}</div>;
};

export default Persons;
