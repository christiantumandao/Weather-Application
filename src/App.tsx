import React, { useEffect, useState } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import Widget from './Components/WidgetContainer/WidgetContainer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import { fetchUserData, fetchUserRegions } from './util/users';
import { User } from 'firebase/auth';
import Profile from './Components/Profile/Profile';
import Regions from './Components/Regions/Regions';
import { location, userData } from './util/types';

function App() {


  // searching does not work on mobile
  // profile ui is not media query adjusted

  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<userData>({
    firstName: '',
    lastName: '',
    email: '',
    units: "imperial"
  });
  const [usersRegions, setUsersRegions] = useState<location[]>([]);

  const [currLocation, setCurrLocation] = useState<location | null>({
    country: "US",
    lat:40.6526006,
    local_names: {},
    lon: -73.9497211,
    name: "Brooklyn",
    state: "New York"
});


  useEffect(()=>{

    const getUserData = async (u:User) => {
      const fetchedData = await fetchUserData(u) as userData;
      if (fetchedData) setUserData(fetchedData)
      // console.log(fetchedData)
    }

    const getUserRegions = async (u: User) => {
      const fetchedRegions = await fetchUserRegions(u) as location[];
      setUsersRegions(fetchedRegions);
    }

    if (user) {
      getUserData(user);
      getUserRegions(user);
    } else {
      setUserData({
        firstName: '',
        lastName: '',
        email: '',
        units: "imperial"
      })
    }

  },[user])

  return (
    <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Widget setCurrLocation ={setCurrLocation} currLocation ={ currLocation } usersRegions ={ usersRegions } userData = { userData } setUsersRegions={ setUsersRegions }/>}></Route>
          <Route path="/log-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile userData = { userData } setUserData={ setUserData }/>}></Route>
          <Route path="/regions" element={<Regions setCurrLocation ={ setCurrLocation } userData = { userData } regions = { usersRegions } setUsersRegions = { setUsersRegions } />}></Route>
        </Routes>
    </div>
  );
}

export default App;
