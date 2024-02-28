import { useNavigate } from "react-router-dom";
import { location, userData } from "../../util/types";
import "../WidgetContainer/WidgetContainer.css";
import "./Regions.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { Region } from "./Region";

type RegionsProps = {
    userData: userData
    regions: location[]
    setCurrLocation: (loc: location) => void
    setUsersRegions: (regions: location[]) => void
}

const Regions = (props: RegionsProps) => {
    const nav = useNavigate();
    const { userData, regions, setCurrLocation } = props;
    const [user] = useAuthState(auth);

    return(
        <div className="page">
            <div className="Widget--container Regions--container">
                <header className="Widget--header Regions--header">
                    <h2>Regions</h2>
                    <button 
                        className="regions-weather-button"
                        onClick = { ()=> nav("/")}>
                        Weather
                    </button>
                </header>
                {
                    (!user) ? 
                    <h2>You need to be signed in to add regions</h2> :
                    (!userData) ? null :
                    (regions.length === 0) ? 
                    <h2>You don't have any regions added</h2> :
                    <div className="regions--container">
                        {
                        regions.map((region,idx)=>(
                            <Region
                                regions = { regions }
                                setCurrLocation = { setCurrLocation }
                                setUsersRegions = { props.setUsersRegions }
                                region={region}
                                key = { idx }
                            />
                        ))}
                    </div>
                }
               
            </div>

        </div>
        
    )
}

export default Regions;