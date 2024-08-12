import React, { ChangeEvent, useState } from "react";
import "./App.css";

interface IWeather {
  city: string;
  temperature: number;
  precipitation: string;
  humidity: string;
  wind: string;
  atmosphericPressure: string;
  cloudiness: string;
  visibility: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setError(null); // Clear any previous errors when changing the city
    console.log("CITY", e.target.value);
  };

  const fetchWeather = (e: React.FormEvent) => {
    e.preventDefault();

    const apiKey = "c63ebd274f236222629409921efa3807";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setWeather(null);
          setError("City is not found");
        } else {
          setError(null);
          setWeather({
            city: city,
            temperature: json.main.temp,
            precipitation: json.weather[0].description,
            humidity: `${json.main.humidity}%`,
            wind: `${json.wind.speed} m/s`,
            atmosphericPressure: `${json.main.pressure} hPa`,
            cloudiness: `${json.clouds.all}%`,
            visibility: `${json.visibility / 1000} km`,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("An error occurred while fetching weather data.");
      });
  };

  return (
    <div className="App">
      <h1>The Weather</h1>
      <form onSubmit={fetchWeather}>
        <input
          type="text"
          onChange={handleChange}
          value={city}
          placeholder="Enter city"
        />
        {error ? (
          <p>{error}</p>
        ) : !weather ? (
          <p>No weather data available. Please enter a valid city.</p>
        ) : (
          <div className="weather-info">
            <h2>
              Weather in <span>{weather.city}</span>
            </h2>
            <p>Temperature: {weather.temperature} °C</p>
            <p>Precipitation: {weather.precipitation}</p>
            <p>Humidity: {weather.humidity}</p>
            <p>Wind: {weather.wind}</p>
            <p>Atmospheric Pressure: {weather.atmosphericPressure}</p>
            <p>Cloudiness: {weather.cloudiness}</p>
            <p>Visibility: {weather.visibility}</p>
          </div>
        )}
        <button type="submit">Get Weather</button>
      </form>
    </div>
  );
}

export default App;
