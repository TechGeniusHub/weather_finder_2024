import React, { useState } from "react";
import axios from "axios";

export default function Searchbar({ onSearch }) {
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    const API_KEY = "f2d659eac643474f8e5130606242412"; 

    try {
      // Fetch weather for yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.toISOString().split("T")[0];
      const yesterdayURL = `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${yesterdayDate}`;
      const yesterdayResponse = await axios.get(yesterdayURL);
      const weatherYesterday = yesterdayResponse.data;

      // Fetch weather for today
      const todayURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
      const todayResponse = await axios.get(todayURL);
      const weatherToday = todayResponse.data;

      // Fetch weather forecast for the next 5 days (including tomorrow)
      const forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5`;
      const forecastResponse = await axios.get(forecastURL);
      const weatherFuture = forecastResponse.data.forecast;

      // Pass all weather data to the parent component
      onSearch({
        weatherYesterday,
        weatherToday,
        weatherFuture,
      });

     
      setErrorMessage("");
    } catch (error) {
      
      setErrorMessage("City not found or API error!");
    }
  };

  const buttonStyle = {
    background: "linear-gradient(135deg,rgb(166, 14, 183),rgb(102, 0, 139))", // Grid-theme purple color
    color: "white",
    border: "none",
    padding: "12px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    transform: "scale(1.1)", 
    boxShadow: "0px 4px 15px rgba(108, 99, 255, 0.4)", 
  };

  const buttonActiveStyle = {
    ...buttonStyle,
    transform: "scale(1.05)", 
  };

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
    {errorMessage && (
        <div className="text-danger mt-2" style={{textAlign:'center',marginBottom:"20px"}}>{errorMessage}</div> // Display error message below the input/button
      )}
    <form onSubmit={fetchWeather} className="d-flex justify-content-center mb-4" >   
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="form-control w-50"
        placeholder="Enter city"
      />
      <button
        type="submit"
        style={isHovered ? buttonHoverStyle : isActive ? buttonActiveStyle : buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className="ms-2"
      >
        Search
      </button><br/>
     
    </form>
    </>
    
  );
}
