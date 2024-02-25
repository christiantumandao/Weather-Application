import { useEffect, useState } from "react";
import { getFullDate, getTime } from "../../util/format";
import { Weather, currentWeather, hourlyWeather, location, userData } from "../../util/types";
import countries from "i18n-iso-countries";

import HourlyWeather from "./HourlyWeather";
import "./WidgetBody.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { addRegion, checkIfRegionAdded } from "../../util/users";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type WidgetBodyProps = {
    currLocation: location | null
    weather: Weather | null
    userData: userData
    usersRegions: location[]
    setUsersRegions: (d: location[]) => void
}

const WidgetBody = (props: WidgetBodyProps) => {
    const [regionIsAdded, setRegionIsAdded] = useState(false);
    const { currLocation, weather, userData, setUsersRegions, usersRegions } = props;
    const current =(weather) ? weather.current : null;
    const [user] = useAuthState(auth);

    useEffect(()=>{
        const isAdded = (currLocation) ? checkIfRegionAdded(currLocation, usersRegions) : false;
        setRegionIsAdded(isAdded);
        
    })


    return (
        <body className="WidgetBody--wrapper">
            <div className="WidgetBody--container">
                <div className="WidgetBody--currentLocation">
                    <div className="WidgetBody--left">
                        <h2>{(currLocation) ? currLocation.name+", "+( (currLocation.state) ? currLocation.state : countries.getName(currLocation.country,"en"))
                        : "" }</h2>
                        {
                            (current)?
                            <>
                                <div className="current-weather">
                                    <h1>{`${current.temp}°${(userData.units === "imperial") ? "F" : "C"}`} </h1>
                                    <img src ={`https://openweathermap.org/img/wn/${current.weather_icon}@2x.png`} alt={current.weather_main} /> 
                                </div>

                                <p>{`Wind: ${current.wind_speed}${(userData.units==="imperial") ? "mph" : "m/s"}`}</p>
                                <p>Humidity: {current.humidity}%</p>
                                <p>UVI: {current.uvi}</p>
                            </> : null
                        }

                    </div>
                    <div className="WidgetBody--right">
                        {
                            (regionIsAdded) ? null :
                             <button
                                onClick = { ()=>{
                                     addRegion(currLocation, usersRegions, setUsersRegions);
                                     setRegionIsAdded(true);
                                }}
                            >Add region</button>
                        }
                        {
                            (current) ? 
                            <>
                                <h3>{getFullDate(current.dt)}</h3>
                                <h4>{getTime(current.dt)}</h4>
                            </> : null
                        }
                        
                    </div>
                </div>
                

                <div className="WidgetBody--temperatureTimeline">
                    {
                        (weather) ? 
                        weather.hourly.map((hour, idx)=>(
                            <HourlyWeather 
                                key = { idx }
                                userData = { userData }
                                hourData={ hour }/>
                        )) : null
                    }
                </div>
            </div>
        </body>
    )
}

export default WidgetBody;