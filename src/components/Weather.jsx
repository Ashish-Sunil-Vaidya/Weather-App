import WeatherInfo from "./WeatherInfo";
import useWeather from "../hooks/useWeather";
import { useEffect, useState } from "react";
import useGlobalState from "../hooks/useGlobalState";
import { FaSpinner } from "react-icons/fa";

export default function Weather() {
  const { error, isLoading, getWeather } = useWeather();
  const { city } = useGlobalState();
  const [weather, setWeather] = useState(null);

  const setWeatherData = async (city) => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
  };

  const setWeatherByCoordinates = async (latitude, longitude) => {
    const weatherData = await getWeather(null, latitude, longitude);
    setWeather(weatherData);
  };

  useEffect(() => {
    if (city) {
      setWeatherData(city);
    }
  }, [city]);

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location && !city && !weather) {
      const { latitude, longitude } = JSON.parse(
        localStorage.getItem("location")
      );
      setWeatherByCoordinates(latitude, longitude);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-1 h-[100svh] sm:h-auto ">
        <FaSpinner className=" animate-spin" size={50} />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="h-[calc(100svh-50px)] w-[100svw] flex justify-center items-center  bg-gradient-light dark:bg-gradient-dark">
        <p className="text-red-500 text-2xl animate-pulse">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-col sm:flex-row md:w-[1000px] justify-center pt-5 px-5">
      <div className="flex-1 text-center flex flex-col items-center justify-center">
        <strong className="text-2xl">{weather[0].value}</strong>
        {weather[1].value}
        <img
          loading="lazy"
          src={weather[2].value}
          alt=""
          width="100px"
          height="100px"
        />
        {weather[3].value}
        <strong className="text-3xl">{weather[4].value}</strong>
        <div>
          <strong>Feels Like:</strong> {weather[5].value}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 justify-center p-2 sm:p-0">
        {weather &&
          weather
            .slice(6)
            .map(
              (item, i) =>
                item.value && (
                  <WeatherInfo key={i} title={item.title} value={item.value} />
                )
            )}
      </div>
    </div>
  );
}
