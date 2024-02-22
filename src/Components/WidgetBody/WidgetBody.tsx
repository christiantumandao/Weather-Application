import { getTime } from "../../util/format";
import { Weather, currentWeather, hourlyWeather, locationData } from "../../util/types";
import HourlyWeather from "./HourlyWeather";
import "./WidgetBody.css";

type WidgetBodyProps = {
    currLocation: locationData | null
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
                                <h1>{`${current.temp}°F`}</h1>
                                <p>Wind: {current.wind_speed}</p>
                                <p>Humidity: {current.humidity}</p>
                                <p>UVI: {current.uvi}</p>
                            </> : null
                        }

                    </div>
                    <div className="WidgetBody--right">
                        {
                            (current) ? 
                            <>
                                <h3>{current.dt.toLocaleDateString()}</h3>
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