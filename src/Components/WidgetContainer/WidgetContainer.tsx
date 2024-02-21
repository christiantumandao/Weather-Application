import React, { useState } from "react";
import "./WidgetContainer.css";
import { userData } from "../../util/types";
import WidgetBody from "../WidgetBody/WidgetBody";
import WidgetFooter from "../WidgetFooter/WidgetFooter";

type WidgetContainerProps = {
    userData: userData
}


const WidgetContainer = (props: WidgetContainerProps) => {
    const [regionQuery, setRegionQuery] = useState("");
    const { userData } = props;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('search')
    }

    return (
        <div className="page">
            <div className="Widget--container">
                <header className="Widget--header">
                    <h2>Hello, { userData.firstName } </h2>
                    <form onSubmit = { handleSearch }>
                        <input 
                            type="text"
                            placeholder="Region"
                            value = { regionQuery }
                            onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setRegionQuery(e.target.value)}
                        />
                        <button type='submit'>search</button>
                    </form>
                    

                    <button>
                        Regions
                    </button>

                </header>
                <WidgetBody />
                <WidgetFooter />
            </div>
        </div>
    )
}

export default WidgetContainer;