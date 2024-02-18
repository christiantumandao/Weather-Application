import { hourlyWeather } from "../../util/types";

type hourlyWeatherProps = {
    hourlyWeather: hourlyWeather
}

const HourlyWeather = (props: hourlyWeatherProps) => {
    const { time, temperature, weather }= props.hourlyWeather;
    return (
        <div className="HourlyWeather--container">
            <h3>time</h3>
            <div>weather</div> 
            <h3>Temperature</h3>  
        </div>
    )
}

export default HourlyWeather;