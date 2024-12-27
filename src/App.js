import React, { useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay"; // Ensure correct path
import Searchbar from "./components/Searchbar"; 

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = (data) => {
    setWeatherData(data);
  };

  return (
    <div className="container mt-5" >
       <h1
          className=" text-center mb-4"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "purple", // Purple color applied
          }}
        >WeatherFinder</h1>
         <p className=" text-center mb-4" style={{ fontSize: "1.2rem", marginTop: "-20px" }}>
          Get instant weather updates for your location!
        </p>
      {!weatherData && <Searchbar onSearch={handleSearch} />} {/* Render Searchbar only if no weatherData */}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}
