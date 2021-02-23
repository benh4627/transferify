import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import app from "../base";

import Menu from "./navbar.js"
import "./Home.css";
import StudentDirectoryPage from "./StudentDirectory.js"
//import ClassCardGroup from "./classcard.js"

const Home = () => {
  return (
    <Router>
      <h1>Home</h1>
      <Menu />
        <div>
          <Route exact path="/studentdirectory" component={StudentDirectoryPage} />
        </div>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </Router>
  );
};

export default Home;
