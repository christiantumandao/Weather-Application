import { useNavigate } from "react-router-dom"
import { location } from "../../util/types"
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type RegionProps = {
    region: location
    setCurrLocation: (loc: location) => void
}

export const Region = (props: RegionProps) => {
    const { region, setCurrLocation } = props;
    console.log(`${region.country} => ${countries.getName(region.country, "en")}`)
    const nav = useNavigate();

    const selectRegion = () => {
        setCurrLocation(region);
        nav("/");
        
    }
// alpha-2 => 
    return(
        <div className="Region--container"
            onClick={ selectRegion }
        >
            <h3>{`${region.name}, ${countries.getName(region.country, "en")}`}</h3>
            <p>{`${region.lat}, ${region.lon}`}</p>
        </div>
    )
}