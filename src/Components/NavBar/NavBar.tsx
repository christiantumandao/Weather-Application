import React from "react";
import "./NavBar.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebaseConfig";
import { Link } from "react-router-dom";

type NavBarProps = {
    
}

const NavBar = (props: NavBarProps) => {

    const [user] = useAuthState(auth);

    return (
        <div className="NavBar--container">

        <nav className="NavBar--navigationContainer">
            <ul>
                <li className="nav-title">Weather</li>
                <li><Link to="/">Home</Link></li>
                { (!user) ? 
                    <li><Link to="log-in">Login</Link></li> 
                    : 
                    <li><Link to="profile">Profile</Link></li> }
                <li className="regionsNavTab"><Link to="regions">Regions</Link></li>
            </ul>
        </nav>
        </div>
    );
}


export default NavBar;