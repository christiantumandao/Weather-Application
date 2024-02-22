type userData = {
    firstName: string,
    lastName: string,
    email: string
}

type location = {
    lat: number,
    lon: number,
    country: string,
    name: string,
    state: string,
    local_names: any
}

type currentWeather = {
    lat: number,
    lon: number,
    dt: Date,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    weather_main: string,
    weather_icon: string,
    wind_speed: number,
    uvi: number,

    hourly?: hourlyWeather[],
    daily?: dailyWeather[]
}

type hourlyWeather = {
    dt: Date,
    temp: number,
    weather_main: string,
    weather_icon: string,
}

type dailyWeather = {
    dt: Date,
    maxTemp: number,
    minTemp: number,
    weather_main: string,
    weather_icon: string,
    [key: string]: any
}

type Weather = {
    current: currentWeather,
    hourly: hourlyWeather[],
    daily: dailyWeather[]
}


export { Weather, dailyWeather, currentWeather, userData, hourlyWeather, location };