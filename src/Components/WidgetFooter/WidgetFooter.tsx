import DailyWeather from "./DailyWeather";
import "./WidgetFooter.css";

type WidgetFooterProps = {
    
}

const days: DailyWeather[] = [1,2,3,4,5,6,7,8];

const WidgetFooter = (props: WidgetFooterProps) => {
    return (
        <footer>
            <div className="WidgetFooter--daysContainer">
            {
                days.map((day)=>(
                    <DailyWeather />
                ))
            }
            </div>
        </footer>
    )
}

export default WidgetFooter;