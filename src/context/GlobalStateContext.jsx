import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [city, setCity] = useState(null);
  const [theme, setTheme] = useState("dark");
  // const [weather, setWeather] = useState(null);
  // const [forecast, setForecast] = useState(null);
  // const [location, setLocation] = useState(JSON.parse(localStorage.getItem("location")));
  const API_KEY = import.meta.env.VITE_API_KEY;

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const themeClass = theme === "dark" ? "dark text-white" : "text-white";
  return (
    <GlobalStateContext.Provider
      value={{
        city,
        setCity,
        theme,
        setTheme,
        toggleDarkMode,
        themeClass,
        // weather,
        // setWeather,
        // forecast,
        // setForecast,
        // location,
        // setLocation,
        API_KEY
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStateProvider;
