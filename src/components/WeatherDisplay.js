import React from "react";

export default function WeatherDisplay({ data }) {
  const styles = {
    container: {
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: "40px 20px",
      borderRadius: "10px",
      color: "black",
      maxWidth: "1000px", 
      margin: "0 auto",
    },
    currentWeather: {
      borderRadius: "15px",
      padding: "30px",
      textAlign: "left", 
      border: "2px solid purple",
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
    },
    leftSection: {
      textAlign: "left", 
    },
    rightSection: {
      textAlign: "right", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "flex-end", 
    },
    forecastSection: {
      marginTop: "30px",
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      overflowX: "auto",
    },
    forecastCard: {
      width: "150px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      textAlign: "center", 
      color: "#333",
      transition: "transform 0.3s ease-in-out",
    },
    forecastImage: {
      width: "50px",
      height: "50px",
      marginBottom: "10px",
    },
    tempText: {
      fontSize: "1.4rem",
      fontWeight: "bold",
    },
    headerText: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "15px",
      color: "#333",
    },
    subheaderText: {
      fontSize: "1.5rem",
      margin: "0px 0",
      color: "#666",
    },
    textStyle: {
      fontSize: "1.2rem",
      color: "#333",
    },
  };

  return (
    <div style={styles.container}>
      {/* Current Weather Section */}
      {data.weatherToday && data.weatherToday.current && (
        <div style={styles.currentWeather}>
          <div style={styles.leftSection}>
            <h2 style={styles.headerText}>
              {data.weatherToday.location.name}
            </h2>

            {/* Temperature and Humidity */}
            <div style={{ display: "flex", justifyContent: "flex-start", gap: "40px" }}>
              <p style={styles.tempText}>
                <span style={{ color: "#FF4500" }}>Temp:</span> {data.weatherToday.current.temp_c}°C
              </p>
              <p style={styles.tempText}>
                <span style={{ color: "#4682B4" }}>Humidity:</span> {data.weatherToday.current.humidity}%
              </p>
            </div>
          </div>

          <div style={styles.rightSection}>
            <h3 style={styles.subheaderText}>Today's Weather</h3>

            {/* Weather Condition Icon and Text */}
            <img
              src={data.weatherToday.current.condition.icon}
              alt={data.weatherToday.current.condition.text}
              style={styles.forecastImage}
            />
            <p style={styles.textStyle}>
              {data.weatherToday.current.condition.text}
            </p>
          </div>
        </div>
      )}

      {/* Forecast Section */}
      <div style={styles.forecastSection}>
        {data.weatherFuture && data.weatherFuture.forecastday && data.weatherFuture.forecastday.length > 0 ? (
          data.weatherFuture.forecastday.map((day, index) => (
            <div
              key={index}
              style={styles.forecastCard}
              className="forecast-card"
            >
              <h5 style={{ color: "#333" }}>{new Date(day.date).toDateString()}</h5>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                style={styles.forecastImage}
              />
              <p style={{ color: "#333" }}>{day.day.condition.text}</p>
              <p style={styles.textStyle}>
                <strong>Avg Temp:</strong> {day.day.avgtemp_c}°C
              </p>
              <p style={styles.textStyle}>
                <strong>Max:</strong> {day.day.maxtemp_c}°C | <strong>Min:</strong> {day.day.mintemp_c}°C
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#D3D3D3" }}>No forecast data available</p>
        )}
      </div>
    </div>
  );
}

