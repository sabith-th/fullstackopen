import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  request: operation => {
    const token = localStorage.getItem("library-user-token");
    operation.setContext({
      headers: {
        authorization: token ? `bearer ${token}` : null
      }
    });
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
