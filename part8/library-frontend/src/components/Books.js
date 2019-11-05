import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import { GENRE_QUERY } from "./Recommended";

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
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

const genres = ["fantasy", "young adult", "fiction", "classic", "crime"];

const Books = ({ show }) => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({ query: ALL_BOOKS, fetchPolicy: "network-only" })
      .then(({ data }) => setBooks([...data.allBooks]))
      .catch(e => console.log("Error getting all books", e));
  }, [client]);

  if (!show) {
    return null;
  }

  const filterBooks = genre => {
    setSelectedGenre(genre);
    if (genre) {
      client
        .query({
          query: GENRE_QUERY,
          variables: { genre },
          fetchPolicy: "network-only"
        })
        .then(({ data }) => setBooks([...data.allBooks]))
        .catch(e => console.log("Error getting filtered books", e));
    } else {
      client
        .query({ query: ALL_BOOKS, fetchPolicy: "network-only" })
        .then(({ data }) => setBooks([...data.allBooks]))
        .catch(e => console.log("Error getting all books", e));
    }
  };

  return (
    <div>
      <h2>Books</h2>
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
      <div>
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => filterBooks(genre)}
            style={{
              backgroundColor: selectedGenre === genre ? "green" : null
            }}
          >
            {genre}
          </button>
        ))}

        <button onClick={() => filterBooks(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
