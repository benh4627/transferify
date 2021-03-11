import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/Signup";
import PasswordReset from "./components/PasswordReset";
import Logo from "./components/Logo";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/passwordreset" component={PasswordReset} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
