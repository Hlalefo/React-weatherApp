import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ data }) => {
  const { name, main, weather, wind, dt, coord, sys } = data;
  const [unit, setUnit] = useState('metric');
  const [forecast, setForecast] = useState([]);
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  useEffect(() => {
    const fetchForecast = async () => {
      const apiKey = '96771e971243152d6b8948878c26adde';
      const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${apiKey}`;
      const response = await axios.get(forecastUrl);
      setForecast(response.data.daily.slice(1, 4)); // Get the next 3 days
    };

    fetchForecast();
  }, [coord, unit]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  const getTemperature = () => {
    if (unit === 'metric') {
      return `${Math.round(main.temp)} °C`;
    } else {
      return `${Math.round(main.temp * 9/5 + 32)} °F`;
    }
  };

  const getBackgroundClass = () => {
    const description = weather[0].description.toLowerCase();
    const isDay = dt >= sys.sunrise && dt <= sys.sunset;
    let backgroundClass = '';

    if (description.includes('clear')) {
      backgroundClass = isDay ? 'weather-clear-day' : 'weather-clear-night';
    } else if (description.includes('cloud')) {
      backgroundClass = isDay ? 'weather-cloudy-day' : 'weather-cloudy-night';
    } else if (description.includes('rain')) {
      backgroundClass = isDay ? 'weather-rainy-day' : 'weather-rainy-night';
    } else if (description.includes('storm')) {
      backgroundClass = isDay ? 'weather-storm-day' : 'weather-storm-night';
    } else {
      backgroundClass = isDay ? 'weather-default-day' : 'weather-default-night';
    }

    return backgroundClass;
  };

  return (
    <div className={`weather ${getBackgroundClass()}`}>
      <div className="overview">
        <h2>{name}</h2>
        <ul>
          <li>Last updated: {formatDate(dt)}</li>
          <li>{weather[0].description}</li>
        </ul>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="clearfix weather-temperature d-flex align-items-center">
            <img src={iconUrl} alt={weather[0].description} className="float-left" />
            <div className="float-left">
              <strong>{getTemperature()}</strong>
              <span className="units">{unit === 'metric' ? '°C' : '°F'}</span>
            </div>
          </div>
        </div>
        <div className="col-6" id="temperature-description">
          <ul>
            <li>Humidity: {main.humidity}%</li>
            <li>Wind: {Math.round(wind.speed * 3.6)} km/h</li>
          </ul>
        </div>
      </div>
      <div className="forecast">
        <div className="row">
          {forecast.map(day => (
            <div className="col-4" key={day.dt}>
              <div className="forecast-day">{formatDay(day.dt)}</div>
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
              <div className="forecast-temp">
                <span className="max">{Math.round(day.temp.max)}°</span>
                <span className="min">{Math.round(day.temp.min)}°</span>
              </div>
              <div className="forecast-details">
                <div>Humidity: {day.humidity}%</div>
                <div>Wind: {Math.round(day.wind_speed * 3.6)} km/h</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="unit-toggle">
        <button className="btn btn-secondary" onClick={() => handleUnitChange('metric')}>°C</button>
        <button className="btn btn-secondary" onClick={() => handleUnitChange('imperial')}>°F</button>
      </div>
    </div>
  );
};

export default Weather;
