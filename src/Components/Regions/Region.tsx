import { useNavigate } from "react-router-dom"
import { location } from "../../util/types"

type RegionProps = {
    region: location
    setCurrLocation: (loc: location) => void
}

export const Region = (props: RegionProps) => {

    const { region, setCurrLocation } = props;
    const nav = useNavigate();

    const selectRegion = () => {
        setCurrLocation(region);
        nav("/");
        
    }

    return(
        <div className="Region--container"
            onClick={ selectRegion }
        >
            <h3>{`${region.name}, ${region.state}`}</h3>
            <p>{region.country}</p>
        </div>
    )
}