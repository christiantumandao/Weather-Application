import axios from "axios"; 
import { location, currentWeather, hourlyWeather, Weather, dailyWeather } from "./types";
import DailyWeather from "../Components/WidgetFooter/DailyWeather";
const url = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;

const fetchWeather = async (lat: string, lon: string, units?: string) => {
    try {    
        const res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${weather_api_key}&units=imperial`)
        const resData = res.data;
        console.log(resData);
        const curr = resData.current;
        const current: currentWeather = {
            lat: resData.lat,
            lon: resData.lon,
            dt: new Date(curr.dt*1000),
            temp: Math.round(curr.temp),
            feels_like: curr.feels_like,
            pressure: curr.pressure,
            humidity: curr.humidity,
            weather_main: curr.weather[0].main,
            weather_icon: curr.weather[0].icon,
            wind_speed: curr.wind_speed,
            uvi: curr.uvi,
        }
        const dailyResults = resData.daily;
        const dailyWeathers: dailyWeather[] = dailyResults.map((day: any)=> (
            {
                dt: new Date(day.dt*1000),
                maxTemp: Math.round(day.temp.max),
                minTemp: Math.round(day.temp.min),
                weather_main: day.weather[0].main,
                weather_icon: day.weather[0].icon
            }
        ))
        
        const hourlyResults = resData.hourly;
        const hourlyWeathers: hourlyWeather[] = hourlyResults.map((hour:any) => (
            {
                dt: new Date(hour.dt*1000),
                temp: Math.round(hour.temp),
                weather_main: hour.weather[0].main,
                weather_icon: hour.weather[0].icon
            }
        ));

        const data: Weather = {
            current: current,
            hourly: hourlyWeathers,
            daily: dailyWeathers
        }
        console.log(data);

        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

const findLocations = async (location: string) => {
    try {
        const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${weather_api_key}`)
        return res.data as location[];
    } catch (e) {
        console.error(e);
    }
}


export { fetchWeather, findLocations };