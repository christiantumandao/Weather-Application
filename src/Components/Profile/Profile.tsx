import { useEffect, useState } from "react";
import { userData } from "../../util/types"
import "./Profile.css";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { changeUserUnits } from "../../util/users";

type ProfileProps = {
    userData: userData,
    setUserData: (e: userData) => void
}

const Profile = (props : ProfileProps) => {
    const { userData, setUserData } = props
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [units, setUnits] = useState<"imperial" | "metric">(userData.units);
    const nav = useNavigate();


    useEffect(()=>{
        const handleChangeUnits = async () => {
            try {
                const status = await changeUserUnits(units);
                if (status) {
                    setUserData({...userData, units: units});
                }
            } catch (e) {
                console.error(e);
            }
        }

        if (units !== userData.units) handleChangeUnits();
    },[units, userData.units, props, userData, setUserData]);

    const handleSignOut = () => {
        auth.signOut();
        nav('/');
    }


    return (
        <div className="page">
            {
                (showModal) ? <Modal modalType = "Delete" setShowModal = { setShowModal }/> : null
            }
            <div className="profile-container">
                <header>
                    <h1>Profile</h1>
                </header>

                <div className="Profile--body">
                    <fieldset>
                        <label>E-mail</label>
                        <p>{ props.userData.email }</p>
                    </fieldset>
                    <fieldset>
                        <label>
                            First Name
                        </label>
                        <input 
                            type = "text"
                            placeholder={ props.userData.firstName }
                            value = { firstName }
                            onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Last Name</label>
                        <input 
                            type = "text"
                            placeholder={ props.userData.lastName }
                            value = { lastName }
                            onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                            />
                    </fieldset>
                    <fieldset>
                        <label>Units</label>
                        <div className="units-container">
                            <label>Metric</label>
                            <input 
                                type="checkbox" 
                                value = {units} 
                                checked = {units==="metric"}
                                onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setUnits("metric")}
                                />
                            <label>Imperial</label>
                            <input 
                                type="checkbox" 
                                value = {units} 
                                checked = {units==="imperial"}
                                onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setUnits("imperial")} />
                        </div>
                       

                        
                    </fieldset>
                </div>
            </div>
            <footer className="profile-container">
                <div className="profile-buttonContainer">
                    <button
                        onClick={ handleSignOut }
                    >
                        Sign Out
                    </button>
                    <button
                        onClick = { () => setShowModal(true)}
                    >Delete Profile</button>
                </div>
            </footer>
        </div>
    )
}


export default Profile