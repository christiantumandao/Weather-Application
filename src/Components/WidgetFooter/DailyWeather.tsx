import { FaCloudShowersHeavy } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { dailyWeather } from "../../util/types";



type DailyWeatherProps = {
    day: dailyWeather
}
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = [
    'Jan', 
    'Feb', 
    'Mar', 
    'Apr', 
    'May', 
    'Jun', 
    'Jul', 
    'Aug', 
    'Sep', 
    'Oct', 
    'Nov', 
    'Dec'
];

const DailyWeather = (props: DailyWeatherProps) => {
    const { day } = props;

    return (
        <div className="DailyWeather--container">
            <div className="DailyWeather--top">
                <div className="DailyWeather--left">
                    {
                        (day) ? 
                        <>
                            <h4>{daysOfWeek[day.dt.getDay()]}</h4>
                            <p>{`${monthsOfYear[day.dt.getMonth()]} - ${day.dt.getDate()}`}</p> 
                       
                        </> : null
                    }
                    
                </div>
                <div className="DailyWeather--right">
                <img src ={`https://openweathermap.org/img/wn/${day.weather_icon}@2x.png`} alt={day.weather_main} /> 
                   
                </div>
            </div>
            <div className="DailyWeather--bottom">
            {`${day.minTemp} - ${day.maxTemp}°F`}
            </div>
        </div>
    )


}
export default DailyWeather;