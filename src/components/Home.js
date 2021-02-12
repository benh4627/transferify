import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './Home.css';
import Logo from './Logo.js';
import Login from './login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Signup from './Signup.js';

function Home() {
  return (
    <div className="Home center">
          {/*This will be the homepage -- all other components will be on other pages*/}
        <Logo />
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>  
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default Home;
