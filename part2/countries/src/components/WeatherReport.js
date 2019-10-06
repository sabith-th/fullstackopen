import axios from "axios";
import React, { useEffect, useState } from "react";

const WeatherReport = ({ city }) => {
  const [weather, setWeather] = useState({});
  const APP_ID = "API_KEY";

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID}`
      )
      .then(response => setWeather(response.data))
      .catch(e => console.log(e));
  }, [city]);

  const buildWeatherWidget = () => {
    return (
      <>
        <p>
          <b>Temperature:</b> {weather.main.temp} Celsius
        </p>
        <p>
          <b>Pressure:</b> {weather.main.pressure} hPa
        </p>
        <h4>{weather.weather[0].main}</h4>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].main}
        />
        <p>{weather.weather[0].description}</p>
      </>
    );
  };

  return (
    <div>
      <h3>Weather in {city}</h3>
      {Object.keys(weather).length > 0 ? (
        buildWeatherWidget()
      ) : (
        <p>Couldn't fetch weather report</p>
      )}
    </div>
  );
};

export default WeatherReport;
