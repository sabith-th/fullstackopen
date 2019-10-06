import axios from "axios";
import React, { useState } from "react";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = ({ target: { value: name } }) => {
    if (name !== "") {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(response => setCountries([...response.data]))
        .catch(e => {
          if (e.response.status === 404) {
            console.log("No countries found");
            setCountries([]);
          }
        });
    } else {
      setCountries([]);
    }
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find Countries: <input onChange={getCountries} />
        <CountriesList countries={countries} />
      </div>
    </div>
  );
};

export default App;
