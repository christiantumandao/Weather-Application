import { useEffect, useState } from "react";
import { formatHours } from "../../util/format";
import { hourlyWeather, userData } from "../../util/types";

type hourlyWeatherProps = {
    hourData: hourlyWeather
    userData: userData
}

const HourlyWeather = (props: hourlyWeatherProps) => {
    const { userData, hourData }= props;

    const [weatherIcon, setWeatherIcon] = useState()

    return (
        <div className="HourlyWeather--container">
            {
                (hourData) ? 
                <>
                    <h3>{ formatHours(hourData.dt.getUTCHours()) }</h3>
                    <img src ={`https://openweathermap.org/img/wn/${hourData.weather_icon}@2x.png`} alt={hourData.weather_main} /> 
                    <h3>{ `${hourData.temp}°${(userData.units === "imperial") ? "F" : "C"}` } </h3> 
                </> : null 
            }
             
        </div>
    )
}

export default HourlyWeather;