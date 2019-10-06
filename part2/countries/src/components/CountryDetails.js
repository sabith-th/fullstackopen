import React, { useState } from "react";
import WeatherReport from "./WeatherReport";

const CountryDetail = ({ country, showDetails: defaultShowDetails }) => {
  const [showDetails, setShowDetails] = useState(defaultShowDetails);

  const buildLanguages = languages =>
    languages.map(language => <li key={language.iso639_2}>{language.name}</li>);

  return (
    <div>
      <p>{country.name}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails ? (
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h3>Languages</h3>
          <ul>{buildLanguages(country.languages)}</ul>
          <img
            src={country.flag}
            alt={`${country.name} flag`}
            width="150px"
            height="100px"
          />
          <WeatherReport city={country.capital} />
        </div>
      ) : null}
    </div>
  );
};

export default CountryDetail;
