import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";
import Select from "react-select";

export const ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
      bookCount
    }
  }
`;

const Authors = props => {
  const [born, setBorn] = useState("");
  const [selected, setSelected] = useState(null);
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( ${error}</p>;

  const submit = e => {
    e.preventDefault();
    editAuthor({
      variables: { name: selected.value, setBornTo: parseInt(born) }
    });
    setSelected(null);
    setBorn("");
  };

  const authors = data.allAuthors;
  const authorOptions = authors.map(a => ({ value: a.name, label: a.name }));

  const handleChange = selected => setSelected(selected);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>Set birthyear</h4>
        <form onSubmit={submit}>
          <Select
            value={selected}
            onChange={handleChange}
            options={authorOptions}
          />
          <div>
            born
            <input
              value={born}
              type="number"
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
