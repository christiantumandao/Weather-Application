import { Weather } from "../../util/types";
import DailyWeather from "./DailyWeather";
import "./WidgetFooter.css";

type WidgetFooterProps = {
    weather: Weather | null
    units: "imperial" | "metric"
}


const WidgetFooter = (props: WidgetFooterProps) => {
    const { weather, units } = props;
    return (
        <footer>
            <div className="WidgetFooter--daysContainer">
            {
                (weather) ?
                weather.daily.map((day, idx)=>(
                    <DailyWeather key ={idx} day = { day } units = { units }/>
                )) : null
            }
            </div>
        </footer>
    )
}

export default WidgetFooter;