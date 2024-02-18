import { hourlyWeather } from "../../util/types";
import HourlyWeather from "./HourlyWeather";
import "./WidgetBody.css";

type WidgetBodyProps = {

}

const defHourlyWeather = {
    time: "1pm",
    temperature: 24,
    weather: "sunny"
}

const times: hourlyWeather[] = Array.from({ length: 24 }, () => defHourlyWeather);

const WidgetBody = (props: WidgetBodyProps) => {

    return (
        <body className="WidgetBody--wrapper">
            <div className="WidgetBody--container">
                <div className="WidgetBody--currentLocation">
                    <div className="WidgetBody--left">
                        <h2>Brooklyn, NY</h2>
                        <h1>32</h1>
                        <p>Wind: 18mph gusts</p>
                        <p>Humidity: 64%</p>
                        <p>API: 40ppm</p>

                    </div>
                    <div className="WidgetBody--right">
                        <h3>Sunday 16, February</h3>
                        <h4>1600</h4>
                    </div>
                </div>
                

                <div className="WidgetBody--temperatureTimeline">
                    {
                        times.map((day)=>(
                            <HourlyWeather hourlyWeather={ day }/>
                        ))
                    }
                </div>
            </div>
        </body>
    )
}

export default WidgetBody;