import { useState } from "react";
import { userData } from "../../util/types"
import "./Profile.css";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

type ProfileProps = {
    userData: userData
}

const Profile = (props : ProfileProps) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const nav = useNavigate();

    const handleSignOut = () => {
        auth.signOut();
        nav('/');
    }

    return (
        <div className="page">
            <div className="profile-container">
                <header>
                    <h1>Profile</h1>
                </header>

                <body>
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
                </body>
            </div>
            <footer className="profile-container">
                <div className="profile-buttonContainer">
                    <button
                        onClick={ handleSignOut }
                    >
                        Sign Out
                    </button>
                    <button>Delete Profile</button>
                </div>
            </footer>
        </div>
    )
}


export default Profile