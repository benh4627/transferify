import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";

import Menu from './components/navbar2.js';
import Home from './components/Home.js';
import './App.css'


firebase.initializeApp(firebaseConfig);

export const AuthContext = React.createContext(null);


function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    return(
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
           <div className="App">
               <div className="HomeModule"><Home /></div>

           </div>
        </AuthContext.Provider>
    );
    
}

export default App;