import { useState } from "react";
import axios from "axios";
import useGlobalState from "./useGlobalState";
import dayjs from "dayjs";

const useWeather = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { API_KEY } = useGlobalState();
    const formatTime = (time) => {
        const formattedTime = dayjs(time * 1000).format('hh:mm a');
        return formattedTime;
    }


    const getWeather = async (city = null, latitude = null, longitude = null) => {
    
        setIsLoading(true);
        setError(null);
        let weather;
        if (!city && !latitude && !longitude) return;
        // //(latitude, longitude);
        try {
            if (city) {
                weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            }
            else { weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`); }

            if (weather) {
                const transformedData = [
                    { title: 'City', value: weather.data.name || null },
                    { title: 'Country', value: weather.data.sys.country || null },
                    { title: 'Icon', value: `https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png` || null },
                    { title: 'Description', value: weather.data.weather[0].description || null },
                    { title: 'Temperature', value: weather.data.main.temp ? `${weather.data.main.temp} °C` : null },
                    { title: 'Feels Like', value: weather.data.main.feels_like ? `${weather.data.main.feels_like} °C` : null },
                    { title: 'Sunrise', value: weather.data.sys.sunrise ? formatTime(weather.data.sys.sunrise) : null },
                    { title: 'Sunset', value: weather.data.sys.sunset ? formatTime(weather.data.sys.sunset) : null },
                    { title: 'Max Temperature', value: weather.data.main.temp_max ? `${weather.data.main.temp_max} °C` : null },
                    { title: 'Min Temperature', value: weather.data.main.temp_min ? `${weather.data.main.temp_min} °C` : null },
                    { title: 'Humidity', value: weather.data.main.humidity ? `${weather.data.main.humidity} %` : null },
                    { title: 'Wind', value: weather.data.wind.speed ? `${weather.data.wind.speed} m/s` : null },
                    { title: 'Visibility', value: weather.data.visibility ? `${weather.data.visibility} m` : null },
                    { title: 'Ground Level', value: weather.data.main.grnd_level ? `${weather.data.main.grnd_level} hPa` : null },
                    { title: 'Pressure', value: weather.data.main.pressure ? `${weather.data.main.pressure} hPa` : null },
                    { title: 'Sea Level', value: weather.data.main.sea_level ? `${weather.data.main.sea_level} hPa` : null },
                ];
                setIsLoading(false);
                return transformedData;
            }
        } catch (error) {
            if (error.response.status === 404) {
                setIsLoading(false);
                setError('City not found');
            }
            else {
                setIsLoading(false);
                setError("Network Error");
            }

        }
    };


    return { error, setError, isLoading, getWeather };
}
export default useWeather;