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

const formatHours = (hours: number) => {
    if (hours > 12) return `${hours-12}:00pm`;
    else if (hours === 12) return `12:00pm`;
    else if (hours===0) return "12:00am";
    else return `${hours}:00am`;
}

const getTime = (time: Date) => {
    let hours = time.getHours();
    let minutes: string | number = time.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes.toString()}`;
    }

    if (hours > 12) return `${hours-12}:${minutes}pm`;
    else if (hours === 12) return `${hours}:${minutes}pm`
    else if (hours===0) return `12:${minutes}am`
    else return `${hours}:${minutes}am`;
}

const getFullDate = (time: Date) => {
    let month: string | number = time.getMonth();
    month = monthsOfYear[month];
    let day: number | string = time.getDay();
    day = daysOfWeek[day];
    

    return `${day}, ${month} ${time.getDate()}`
}

const kelvinToCelcius = (temp: number) => {

}

const kelvinToFahrenheit = (temp: number) => {

}



export { formatHours, getTime, getFullDate };