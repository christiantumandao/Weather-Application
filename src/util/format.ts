const formatHours = (hours: number) => {
    if (hours > 12) return `${hours-12}:00pm`;
    else if (hours === 12) return `12:00pm`;
    else if (hours===0) return "12:00am";
    else return `${hours}:00am`;
}

const getTime = (time: Date) => {
    let hours = time.getHours();

    if (hours > 12) return `${hours-12}:${time.getMinutes()}pm`;
    else if (hours === 12) return `${hours}:${time.getMinutes()}pm`
    else if (hours===0) return `12:${time.getMinutes()}am`
    else return `${hours}:${time.getMinutes()}am`;
}

const kelvinToCelcius = (temp: number) => {

}

const kelvinToFahrenheit = (temp: number) => {

}



export { formatHours, getTime };