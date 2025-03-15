import React, { useEffect, useState } from "react";
import "./WidgetContainer.css";
import { location, userData, Weather } from "../../util/types";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetFooter from "../WidgetFooter/WidgetFooter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { fetchWeather, findLocations } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type WidgetContainerProps = {
    userData: userData,
    usersRegions: location[]
    setUsersRegions: (d: location[]) => void
    currLocation: location | null
    setCurrLocation: (loc: location)=> void
}


const WidgetContainer = (props: WidgetContainerProps) => {
    const [regionQuery, setRegionQuery] = useState("");
    const [queryResults, setQueryResults] = useState<location[] | undefined>(undefined);
    const { userData, setUsersRegions, usersRegions, currLocation, setCurrLocation } = props;
    const [user] = useAuthState(auth);

    const [weather, setWeather] = useState<Weather | null>(null);

    const nav = useNavigate();

    useEffect(()=> {
        const fetchDefault = async () => {
            try {
                if (currLocation){
                    const defWeather = await fetchWeather(currLocation.lat.toString(), currLocation.lon.toString(), userData.units);
                    setWeather(defWeather);
                }
                
            } catch (e) {
                console.error(e);
            }
        }
        fetchDefault();

        
    },[currLocation, userData.units]);


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
        setCurrLocation(loc);
        setQueryResults(undefined);
        const weatherData: Weather | null = await fetchWeather(loc.lat.toString(), loc.lon.toString(), userData.units);
        setWeather(weatherData);
    }

    return (
        <div className="page">
            {
                (queryResults) ? <div className="blocker" onClick = { () => setQueryResults(undefined) }></div> : null
            }
            <div className="Widget--container">
                <header className="Widget--header">
                    {
                        (user)
                        ? <h2>Hello, { userData.firstName }</h2>
                        : <h2>Hello</h2>
                    }
                    
                    <form onSubmit = { handleSearch }
                        className={(queryResults) ? "search-region-container search-region-container-results" : "search-region-container"}
                    >
                        <input 
                            className="search-bar"
                            type="text"
                            placeholder="Region"
                            value = { regionQuery }
                            onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setRegionQuery(e.target.value)}
                        />
                        <button type='submit' className={(regionQuery.length > 0) ? "search-btn" : "search-btn display-none"}><CiSearch /></button>
                        {
                            (queryResults) ? 
                                <ul className="query-results-container">
                                    {
                                        queryResults.map((loc,idx) => (
                                            <li
                                                onClick = { () => handleSelectLocation(loc) }
                                                key = { idx+ loc.lat }>
                                                    {loc.name + ", " + ( (loc.state) ? loc.state : countries.getName(loc.country,"en"))}
                                            </li>
                                            ))

                                    }
                                </ul>
                        
                                : null
                        }
                    </form>        

                    <button
                        className="regions-weather-button"
                        onClick = { ()=> nav("/regions")}
                    >
                        Regions
                    </button>

                </header>
                
                <WidgetBody usersRegions = { usersRegions } currLocation = { currLocation } weather = { weather } userData={ userData } setUsersRegions={setUsersRegions} />
                <WidgetFooter weather = { weather } units = { userData.units }/>
                
            </div>
        </div>
    )
}

export default WidgetContainer;