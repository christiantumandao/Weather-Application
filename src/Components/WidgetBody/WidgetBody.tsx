import { getFullDate, getTime } from "../../util/format";
import { Weather, currentWeather, hourlyWeather, location } from "../../util/types";
import HourlyWeather from "./HourlyWeather";
import "./WidgetBody.css";

type WidgetBodyProps = {
    currLocation: location | null
    weather: Weather | null
}

const WidgetBody = (props: WidgetBodyProps) => {
    const { currLocation, weather } = props;
    const current =(weather) ? weather.current : null;
    return (
        <body className="WidgetBody--wrapper">
            <div className="WidgetBody--container">
                <div className="WidgetBody--currentLocation">
                    <div className="WidgetBody--left">
                        <h2>{(currLocation) ? currLocation.name+", "+currLocation.state : "" }</h2>
                        {
                            (current)?
                            <>
                                <div className="current-weather">
                                    <h1>{`${current.temp}°F`} </h1>
                                    <img src ={`https://openweathermap.org/img/wn/${current.weather_icon}@2x.png`} alt={current.weather_main} /> 
                                    
                                </div>
                                <p>Wind: {current.wind_speed}mph</p>
                                <p>Humidity: {current.humidity}%</p>
                                <p>UVI: {current.uvi}</p>
                            </> : null
                        }

                    </div>
                    <div className="WidgetBody--right">
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
                        weather.hourly.map((hour)=>(
                            <HourlyWeather hourData={ hour }/>
                        )) : null
                    }
                </div>
            </div>
        </body>
    )
}

export default WidgetBody;