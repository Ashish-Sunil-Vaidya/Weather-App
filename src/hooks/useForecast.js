import { useState } from "react"
import axios from "axios"
import useGlobalState from "./useGlobalState"
import dayjs from "dayjs"

const useForecast = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { API_KEY } = useGlobalState()

    const formatTime = (time) => {
        const formattedTime = dayjs(time * 1000).format('hh:mm a');
        return formattedTime;
    }

    const getForecast = async (city = null, latitude = null, longitude = null) => {
        
        setError(null);
        setIsLoading(true);
        let forecastList = null;
        //(latitude, longitude);
        if (!city && !latitude && !longitude) return;
        // //('=== city weatherController.js [61] ===', city);
        try {
            if (city) {
                forecastList = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            }
            if (latitude && longitude) {
                forecastList = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            }
            if (forecastList) {
                const transformedData = forecastList.data.list.map((item) => {
                    return {
                        date: dayjs(item.dt_txt).format('d MMM'),
                        time: formatTime(item.dt),
                        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                        description: item.weather[0].description,
                        temperature: `${item.main.temp} °C`,
                        feels_like: `${item.main.feels_like} °C`,
                        max_temp: `${item.main.temp_max} °C`,
                        min_temp: `${item.main.temp_min} °C`,
                        humidity: `${item.main.humidity} %`,
                        wind: `${item.wind.speed} m/s`,
                        visibility: `${item.visibility} m`,
                        ground_level: `${item.main.grnd_level} hPa`,
                        pressure: `${item.main.pressure} hPa`,
                        sea_level: `${item.main.sea_level} hPa`,
                    };
                });
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

    return { error, isLoading, getForecast }
}

export default useForecast