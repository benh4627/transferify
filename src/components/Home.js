import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import app from "../base";

import Menu from "./navbar.js"
import "./Home.css";
import StudentDirectoryPage from "./StudentDirectory.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import ClassCardGroup from './classcard.js';

import ProfilePage from './Profile.js'

import Logo from "./Logo.js";

const Home = () => {
  return (<div className="Home">
    <Router>
        <div>
          <Menu />
          <Route path="/studentdirectory" component={StudentDirectoryPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/classplanner" component={ClassCardGroup} />
        </div>
      <button className="button2" onClick={() => app.auth().signOut()}>Sign out</button>
    </Router></div>
  );
};

export default Home;
