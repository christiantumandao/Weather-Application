import React, { useEffect, useState } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import Widget from './Components/WidgetContainer/WidgetContainer';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseConfig';
import { fetchUserData } from './util/users';
import { User } from 'firebase/auth';

type userData = {
  firstName: string,
  lastName: string,
  email: string
}

function App() {

  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<userData>({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(()=>{
    const loadUserData = async (u: User) => {
      const fetchedData = await fetchUserData(u) as userData;
      if (fetchedData) setUserData(fetchedData);
    }
    if (user) loadUserData(user);
  },[user])

  return (
    <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Widget userData = { userData } />}></Route>
          <Route path="/log-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
    </div>
  );
}

export default App;
