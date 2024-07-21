import React, { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';
import Greeting from './Greeting';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const apiKey = '96771e971243152d6b8948878c26adde';
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    setWeatherData(response.data);
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Type a city.."
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      {weatherData && (
        <>
          <Greeting data={weatherData} />
          <Weather data={weatherData} />
        </>
      )}
    </div>
  );
};

export default App;
