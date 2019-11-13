import { useApolloClient, useSubscription } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import { GENRE_QUERY } from "./Recommended";

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      name
    }
    published
    genres
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const genres = ["fantasy", "young adult", "fiction", "classic", "crime"];

const Books = ({ show }) => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const client = useApolloClient();
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded;
      window.alert(`${newBook.title} added`);
      updateCacheWith(newBook);
    }
  });

  useEffect(() => {
    client
      .query({ query: ALL_BOOKS, fetchPolicy: "network-only" })
      .then(({ data }) => setBooks([...data.allBooks]))
      .catch(e => console.log("Error getting all books", e));
  }, [client]);

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook);
      client.writeQuery({
        query: ALL_BOOKS,
        data: dataInStore
      });
      setBooks([...books, addedBook]);
    }
  };

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
