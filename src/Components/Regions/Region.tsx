import { useNavigate } from "react-router-dom"
import { location } from "../../util/types"
import countries from "i18n-iso-countries";
import { FaTrash } from "react-icons/fa";
import { deleteRegion } from "../../util/users";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

type RegionProps = {
    region: location
    regions: location[]
    setCurrLocation: (loc: location) => void
    setUsersRegions: (regions: location[]) => void
}

export const Region = (props: RegionProps) => {
    const { region, setCurrLocation, regions, setUsersRegions } = props;
    
    const nav = useNavigate();

    const selectRegion = () => {
        setCurrLocation(region);
        nav("/");
        
    }

    const handleDeleteRegion = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
     
        await deleteRegion(region, regions, setUsersRegions);
    }
// alpha-2 => 
    return(
        <div className="Region--container"
            onClick={ selectRegion }
        >
            <div className="Region--content">
                <h3>{`${region.name}, ${countries.getName(region.country, "en")}`}</h3>
                <p>{`${region.lat}, ${region.lon}`}</p>
            </div>

            <button 
                onClick={ handleDeleteRegion }
                className="Region--deleteRegion">
                    <FaTrash />
            </button>
            
        </div>
    )
}