type userData = {
    firstName: string,
    lastName: string,
    email: string
}

type hourlyWeather = {
    time: string,
    temperature: number,
    weather: string
} 

type dailyWeather = {
    day: string,
    date: string,
    range: string,
    avgWeather: string
}

export { userData, hourlyWeather };