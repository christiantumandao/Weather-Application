import { FaCloudShowersHeavy } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaSun } from "react-icons/fa";



type DailyWeather = {

}

const DailyWeather = (props: DailyWeather) => {
    return (
        <div className="DailyWeather--container">
            <div className="DailyWeather--top">
                <div className="DailyWeather--left">
                    <h4>Wednesday</h4>
                    <p>Date</p>
                </div>
                <div className="DailyWeather--right">
                    <FaCloud />
                </div>
            </div>
            <div className="DailyWeather--bottom">
                range
            </div>
        </div>
    )


}
export default DailyWeather;