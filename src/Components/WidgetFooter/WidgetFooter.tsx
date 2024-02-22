import { Weather } from "../../util/types";
import DailyWeather from "./DailyWeather";
import "./WidgetFooter.css";

type WidgetFooterProps = {
    weather: Weather | null
}


const WidgetFooter = (props: WidgetFooterProps) => {
    const { weather } = props;
    return (
        <footer>
            <div className="WidgetFooter--daysContainer">
            {
                (weather) ?
                weather.daily.map((day)=>(
                    <DailyWeather day = { day }/>
                )) : null
            }
            </div>
        </footer>
    )
}

export default WidgetFooter;