import React, { useState } from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Logo from './Logo.js';
import app from "../base.js";
import "./PasswordReset.css"

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  
  const onChange = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);  
    }
  };
  
  const sendResetEmail = event => {
    event.preventDefault();
    app.auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
        setTimeout(() => {setEmailSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
        setTimeout(() => {setError(null)}, 3000);
      });
  };
  
  return (
    <div className="Reset">
      <Logo/>
      <h1> Reset your Password </h1>
      <div className="Confirm">
        <form onSubmit={sendResetEmail}>
          { emailSent && ( <h> An email has been sent to you! </h>) }
          {error !== null && ( <h> {error} </h> ) }
          
          <input type="email" name="userEmail" id="userEmail" value={email} placeholder="Input your email" onChange={onChange} />
          
          <button> Send reset link </button>
        </form>
        
        <a href="/">
         &larr; Back to sign in page
        </a>
        
      </div>
    </div>
  );
};

export default withRouter(PasswordReset);