import { useApolloClient } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";

export const ME_QUERY = gql`
  query Me {
    me {
      username
      favoriteGenre
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [me, setMe] = useState(null);
  const client = useApolloClient();

  const setUser = async () => {
    const { data } = await client.query({ query: ME_QUERY });
    console.log("User", data);
    setMe(data.me);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("library-user-token");
    if (userToken) {
      setToken(userToken);
      client
        .query({ query: ME_QUERY })
        .then(({ data }) => {
          setMe(data.me);
        })
        .catch(e => console.log("Error setting user", e));
    }
  }, [setToken, client]);

  const login = async token => {
    setToken(token);
    localStorage.setItem("library-user-token", token);
    setUser();
    setPage("books");
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} user={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} me={me} />

      <Login show={page === "login"} login={login} />
    </div>
  );
};

export default App;
