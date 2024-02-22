import React, { useEffect, useState } from "react";
import "./WidgetContainer.css";
import { location, currentWeather, userData, Weather } from "../../util/types";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetFooter from "../WidgetFooter/WidgetFooter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { fetchWeather, findLocations } from "../../util/api";

type WidgetContainerProps = {
    userData: userData
}


const WidgetContainer = (props: WidgetContainerProps) => {
    const [regionQuery, setRegionQuery] = useState("");
    const [queryResults, setQueryResults] = useState<location[] | undefined>(undefined);
    const { userData } = props;
    const [user] = useAuthState(auth);

    const [currLocation, setCurrLocation] = useState<location | null>({
        country: "US",
        lat:40.6526006,
        local_names: {},
        lon: -73.9497211,
        name: "Brooklyn",
        state: "New York"
    });
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(()=> {
        const fetchDefault = async () => {
            try {
                if (currLocation){
                    const defWeather = await fetchWeather(currLocation.lat.toString(), currLocation.lon.toString());
                    setWeather(defWeather)
                }
                
            } catch (e) {
                console.error(e);
            }
        }
        fetchDefault();
    },[])


    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const locations: location[] | undefined = await findLocations(regionQuery);
            setQueryResults(locations);
        } catch (e) {
            console.error(e);
        }

        
        setRegionQuery("");
    }

    const handleSelectLocation = async (loc: location) => {
        console.log(loc)
        setCurrLocation(loc);
        setQueryResults(undefined);
        const weatherData: Weather | null = await fetchWeather(loc.lat.toString(), loc.lon.toString());
        setWeather(weatherData);
    }

    return (
        <div className="page">
            <div className="Widget--container">
                <header className="Widget--header">
                    {
                        (user)
                        ? <h2>Hello, { userData.firstName }</h2>
                        : <h2>Hello</h2>
                    }
                    
                    <form onSubmit = { handleSearch }>
                        <input 
                            type="text"
                            placeholder="Region"
                            value = { regionQuery }
                            onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setRegionQuery(e.target.value)}
                        />
                        <button type='submit'>search</button>
                        {
                            (queryResults) ? 
                            <ul>
                                {
                                     queryResults.map((loc,idx)=>(
                                        <li
                                            onClick = { () => handleSelectLocation(loc) }
                                            key = { idx+ loc.lat }
                                        >{loc.name + ", " + loc.state}</li>
                                        ))
                                }
                            </ul>
                            : null
                        }
                    </form>
                    

                    <button>
                        Regions
                    </button>

                </header>
                <WidgetBody currLocation = { currLocation } weather = { weather } />
                <WidgetFooter weather = { weather }/>
            </div>
        </div>
    )
}

export default WidgetContainer;