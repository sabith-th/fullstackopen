import React from "react";
import CountryDetail from "./CountryDetails";

const CountriesList = ({ countries }) => {
  if (countries.length === 0) {
    return <p>No Countries found, use different query</p>;
  } else if (countries.length === 1) {
    return <CountryDetail country={countries[0]} showDetails={true} />;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    const buildCountryItem = countries =>
      countries.map(country => (
        <CountryDetail
          key={country.alpha3Code}
          country={country}
          showDetails={false}
        />
      ));
    return buildCountryItem(countries);
  }
};

export default CountriesList;
