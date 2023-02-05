import { useState, useEffect } from "react";
import Loading from "./loading";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";

import styles from "./weatherApp.module.css";

export default function WeatherApp() {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = "Weather | " + weather?.location?.name ?? "";
    }, [weather]);

    async function loadInfo(city = "london") {
        console.log(
            `http://api.weatherapi.com/v1/current.json?aqi=no&key=621901eaf6e542df91b192602230502&q=${city}`
        );
        try {
            const request = await fetch(
                `http://api.weatherapi.com/v1/current.json?aqi=no&key=621901eaf6e542df91b192602230502&q=${city}`
            );
            const json = await request.json();
            console.log(json);

            setTimeout(() => {
                setWeather({ ...json });
            }, 2000);
        } catch (e) {
            console.error(e);
        }
    }

    function handleOnChangeCity(city) {
        setWeather(null);
        loadInfo(city);
    }

    return (
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleOnChangeCity} />
            {
                weather
                    ? <WeatherMainInfo weather={weather} />
                    : <Loading />
            }
        </div>
    );
}