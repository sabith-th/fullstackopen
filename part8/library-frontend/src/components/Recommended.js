import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";

export const GENRE_QUERY = gql`
  query GenreQuery($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const Recommended = ({ show, me }) => {
  const client = useApolloClient();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (me && me.favoriteGenre) {
      client
        .query({
          query: GENRE_QUERY,
          variables: { genre: me.favoriteGenre },
          fetchPolicy: "network-only"
        })
        .then(({ data }) => {
          setBooks([...data.allBooks]);
        })
        .catch(e => console.log("Error getting recommended books", e));
    }
  }, [client, me]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommended Books</h2>
      {me !== null ? <h4>Books of genre: {me.favoriteGenre}</h4> : null}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
