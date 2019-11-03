import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useState } from "react";

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

const Books = props => {
  let books = [];
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, data } = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( ${error}</p>;
  if (data) {
    books = [...data.allBooks];
  }

  const booksToShow = selectedGenre
    ? books.filter(book => book.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map(a => (
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
            onClick={() => setSelectedGenre(genre)}
            style={{
              backgroundColor: selectedGenre === genre ? "green" : null
            }}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
