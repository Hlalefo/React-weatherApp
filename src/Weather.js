// src/Weather.js
import React from 'react';
import './Weather.css';

const Weather = ({ data }) => {
  const { name, main, weather, wind } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p>{weather[0].description}</p>
      <p>Temperature: {main.temp} °C</p>
      <p>Humidity: {main.humidity} %</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
