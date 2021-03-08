import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import app from "../base";

import "./Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from "./navbar.js"
import StudentDirectoryPage from "./StudentDirectory.js"
import ClassCardGroup from './classcard.js';
import ProfilePage from "./ProfilePage.js";

import Logo from "./Logo.js";

const Home = () => {
  return (<div className="Home">
    <Router>
        <div>
          <Menu />
          <Route path="/studentdirectory" component={StudentDirectoryPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/classplanner" component={ClassCardGroup} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      <button className="button2" onClick={() => app.auth().signOut()}>Sign out</button>
    </Router></div>
  );
};

export default Home;
