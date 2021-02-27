import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import app from "../base";

import Menu from "./navbar.js"
import "./Home.css";
import StudentDirectoryPage from "./StudentDirectory.js"

import 'bootstrap/dist/css/bootstrap.min.css';
import ClassCardGroup from './classcard.js';

import Logo from "./Logo.js";

const Home = () => {
  return (<div>
    <Router>
      <h1>Home</h1>
        <div>
          <Route path="/studentdirectory" component={StudentDirectoryPage} />
          <Route path="/classplanner" component={ClassCardGroup} />
        </div>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </Router></div>
  );
};

export default Home;
